import { NextRequest, NextResponse } from 'next/server';
import { createWeatherLogger } from '@/lib/logger';

const logger = createWeatherLogger();

// 인천 연수구 송도동 행정동 중심 좌표
const SONGDO_LAT = 37.538603;
const SONGDO_LON = 126.722675;

// OpenWeather API 키 (환경변수에서만 가져오기)
const API_KEY = process.env.OPENWEATHER_API_KEY;

// 환경 변수 로드 확인 (개발환경에서만)
logger.debug('환경 변수 확인', {
  hasApiKey: !!process.env.OPENWEATHER_API_KEY,
  keyLength: process.env.OPENWEATHER_API_KEY?.length || 0,
  usingFallback: !process.env.OPENWEATHER_API_KEY,
  allEnvKeys: Object.keys(process.env).filter(key => key.includes('OPENWEATHER')),
  nodeEnv: process.env.NODE_ENV
});

interface ForecastItem {
  dt: number;
  main: {
    temp: number;
    temp_max: number;
    temp_min: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
}

interface WeatherData {
  current: {
    temp: number;
    feels_like: number;
    humidity: number;
    weather: Array<{
      main: string;
      description: string;
      icon: string;
    }>;
    wind: {
      speed: number;
    };
    air_quality?: {
      pm10: number;
      pm25: number;
      status: string;
      color: string;
    };
  };
  forecast: Array<{
    date: string;
    temp_max: number;
    temp_min: number;
    weather: {
      main: string;
      description: string;
      icon: string;
    };
  }>;
}

export async function GET() {
  try {
    logger.info('송도동 날씨 정보 요청');
    
    // 모든 환경변수 확인 (개발환경에서만)
    logger.debug('전체 환경변수 디버깅', {
      nodeEnv: process.env.NODE_ENV,
      hasOpenWeather: !!process.env.OPENWEATHER_API_KEY,
      openWeatherLength: process.env.OPENWEATHER_API_KEY?.length || 0,
      hasSeoul: !!process.env.SEOUL_OPEN_API_KEY,
      allKeys: Object.keys(process.env).filter(key => key.includes('API_KEY')),
      processEnvKeys: Object.keys(process.env).length
    });

    // API 키 확인
    if (!API_KEY) {
      logger.error('OpenWeather API 키가 설정되지 않았습니다');
      logger.debug('API 키 디버깅 정보', {
        API_KEY_value: API_KEY,
        env_value: process.env.OPENWEATHER_API_KEY,
        typeof_env: typeof process.env.OPENWEATHER_API_KEY
      });
      throw new Error('API 키가 필요합니다');
    }

    // 현재 날씨 정보 가져오기
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${SONGDO_LAT}&lon=${SONGDO_LON}&appid=${API_KEY}&units=metric&lang=kr`;
    
    // 5일 예보 정보 가져오기
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${SONGDO_LAT}&lon=${SONGDO_LON}&appid=${API_KEY}&units=metric&lang=kr`;

    // 미세먼지 정보 가져오기
    const airPollutionUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${SONGDO_LAT}&lon=${SONGDO_LON}&appid=${API_KEY}`;

    // 미세먼지 상태 판단 함수
    const getAirQualityStatus = (pm10: number, pm25: number) => {
      // 한국 환경부 기준 (WHO 기준보다 엄격)
      const pm10Status = pm10 <= 30 ? 'good' : pm10 <= 80 ? 'moderate' : pm10 <= 150 ? 'unhealthy' : 'very_unhealthy';
      const pm25Status = pm25 <= 15 ? 'good' : pm25 <= 35 ? 'moderate' : pm25 <= 75 ? 'unhealthy' : 'very_unhealthy';
      
      // 더 나쁜 상태를 기준으로 설정
      const statusPriority = { 'good': 0, 'moderate': 1, 'unhealthy': 2, 'very_unhealthy': 3 };
      const finalStatus = statusPriority[pm10Status] >= statusPriority[pm25Status] ? pm10Status : pm25Status;
      
      const statusMap = {
        'good': { text: '좋음', color: '#3B82F6' },
        'moderate': { text: '보통', color: '#10B981' },
        'unhealthy': { text: '나쁨', color: '#F59E0B' },
        'very_unhealthy': { text: '매우나쁨', color: '#EF4444' }
      };
      
      return statusMap[finalStatus as keyof typeof statusMap];
    };

    logger.debug('API 요청 URL', {
      current: currentWeatherUrl.replace(API_KEY!, 'API_KEY_HIDDEN'),
      forecast: forecastUrl.replace(API_KEY!, 'API_KEY_HIDDEN'),
      airPollution: airPollutionUrl.replace(API_KEY!, 'API_KEY_HIDDEN')
    });

    const [currentResponse, forecastResponse, airPollutionResponse] = await Promise.all([
      fetch(currentWeatherUrl),
      fetch(forecastUrl),
      fetch(airPollutionUrl)
    ]);

    logger.debug('API 응답 상태', {
      current: currentResponse.status,
      forecast: forecastResponse.status,
      airPollution: airPollutionResponse.status,
      currentOk: currentResponse.ok,
      forecastOk: forecastResponse.ok,
      airPollutionOk: airPollutionResponse.ok
    });

    // 필수 API (날씨, 예보) 체크
    if (!currentResponse.ok || !forecastResponse.ok) {
      const currentError = !currentResponse.ok ? await currentResponse.text() : null;
      const forecastError = !forecastResponse.ok ? await forecastResponse.text() : null;
      
      logger.error('필수 API 응답 에러', {
        currentStatus: currentResponse.status,
        forecastStatus: forecastResponse.status,
        currentError,
        forecastError
      });
      
      throw new Error(`필수 API 호출 실패: Current(${currentResponse.status}), Forecast(${forecastResponse.status})`);
    }

    const currentData = await currentResponse.json();
    const forecastData = await forecastResponse.json();

    // 미세먼지 API는 선택적으로 처리
    let airPollutionData = null;
    if (airPollutionResponse.ok) {
      try {
        airPollutionData = await airPollutionResponse.json();
        logger.debug('미세먼지 API 성공');
      } catch (error) {
        logger.error('미세먼지 데이터 파싱 실패', error);
      }
    } else {
      const airPollutionError = await airPollutionResponse.text();
      logger.warn('미세먼지 API 실패', {
        status: airPollutionResponse.status,
        error: airPollutionError
      });
    }

    logger.debug('현재 날씨 원본 데이터', {
      온도: currentData.main.temp,
      체감온도: currentData.main.feels_like,
      습도: currentData.main.humidity,
      날씨: currentData.weather[0]
    });
    
    if (airPollutionData) {
      logger.debug('미세먼지 원본 데이터', {
        PM10: airPollutionData.list[0].components.pm10,
        PM25: airPollutionData.list[0].components.pm2_5,
        전체데이터: airPollutionData.list[0]
      });
    } else {
      logger.debug('미세먼지 데이터 없음 - 기본값 사용');
    }
    
    logger.debug('예보 데이터 첫 5개 항목', 
      forecastData.list.slice(0, 5).map((item: ForecastItem) => ({
        시간: new Date(item.dt * 1000).toLocaleString('ko-KR'),
        온도: item.main.temp,
        날씨: item.weather[0].description
      }))
    );

    // 5일 예보 데이터 처리 (하루별 최고/최저 온도 계산)
    const dailyForecastMap = new Map();
    
    forecastData.list.forEach((item: ForecastItem) => {
      const date = new Date(item.dt * 1000);
      const dateKey = date.toDateString(); // 날짜별로 그룹화
      
      if (!dailyForecastMap.has(dateKey)) {
        dailyForecastMap.set(dateKey, {
          date: date.toLocaleDateString('ko-KR', {
            month: 'short',
            day: 'numeric',
            weekday: 'short'
          }),
          temps: [],
          weather: item.weather[0], // 첫 번째 날씨 정보 사용
          dt: item.dt
        });
      }
      
      // 해당 날짜의 온도 데이터 추가
      dailyForecastMap.get(dateKey)!.temps.push(item.main.temp);
    });
    
    // 날짜별 최고/최저 온도 계산
    const dailyForecast = Array.from(dailyForecastMap.values())
      .slice(0, 5) // 5일치만
      .map(day => {
        const maxTemp = Math.round(Math.max(...day.temps));
        const minTemp = Math.round(Math.min(...day.temps));
        
        logger.debug(`${day.date} 온도 분석`, {
          원본온도들: day.temps,
          최고온도: maxTemp,
          최저온도: minTemp,
          온도차: maxTemp - minTemp
        });
        
        return {
          date: day.date,
          temp_max: maxTemp,
          temp_min: minTemp,
          weather: {
            main: day.weather.main,
            description: day.weather.description,
            icon: day.weather.icon
          }
        };
      });

    // 미세먼지 데이터 처리
    let airQuality;
    if (airPollutionData) {
      const pm10 = Math.round(airPollutionData.list[0].components.pm10);
      const pm25 = Math.round(airPollutionData.list[0].components.pm2_5);
      const airQualityStatus = getAirQualityStatus(pm10, pm25);
      
      airQuality = {
        pm10,
        pm25,
        status: airQualityStatus.text,
        color: airQualityStatus.color
      };
    }

    // 날씨 데이터 구성
    const weatherData: WeatherData = {
      current: {
        temp: Math.round(currentData.main.temp),
        feels_like: Math.round(currentData.main.feels_like),
        humidity: currentData.main.humidity,
        weather: currentData.weather.map((w: any) => ({
          main: w.main,
          description: w.description,
          icon: w.icon
        })),
        wind: {
          speed: parseFloat((currentData.wind.speed * 3.6).toFixed(1)) // m/s를 km/h로 변환
        },
        air_quality: airQuality
      },
      forecast: dailyForecast
    };

    logger.info('날씨 정보 조회 성공');

    return NextResponse.json({
      success: true,
      data: weatherData,
      location: '인천 연수구 송도동'
    });

  } catch (error) {
    console.error('날씨 API 오류:', error);
    
    return NextResponse.json({
      success: false,
      error: '날씨 정보를 가져올 수 없습니다.',
      data: null,
      location: '인천 연수구 송도동'
    }, { status: 500 });
  }
} 