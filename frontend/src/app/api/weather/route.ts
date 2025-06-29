import { NextResponse } from 'next/server';

// 논현동 좌표 (인천 남동구 논현동)
const NONHYEON_LAT = 37.3894;
const NONHYEON_LON = 126.7317;

// OpenWeather API 키 (환경변수에서만 가져오기)
const API_KEY = process.env.OPENWEATHER_API_KEY;

// 환경 변수 로드 확인 (개발용)
console.log('🔧 환경 변수 확인:', {
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
    console.log('🌤️ 논현동 날씨 정보 요청');
    
    // 모든 환경변수 확인 (디버깅용)
    console.log('🔍 전체 환경변수 디버깅:', {
      nodeEnv: process.env.NODE_ENV,
      hasOpenWeather: !!process.env.OPENWEATHER_API_KEY,
      openWeatherLength: process.env.OPENWEATHER_API_KEY?.length || 0,
      hasSeoul: !!process.env.SEOUL_OPEN_API_KEY,
      allKeys: Object.keys(process.env).filter(key => key.includes('API_KEY')),
      processEnvKeys: Object.keys(process.env).length
    });

    // API 키 확인
    if (!API_KEY) {
      console.error('❌ OpenWeather API 키가 설정되지 않았습니다');
      console.error('🔍 디버깅 정보:', {
        API_KEY_value: API_KEY,
        env_value: process.env.OPENWEATHER_API_KEY,
        typeof_env: typeof process.env.OPENWEATHER_API_KEY
      });
      throw new Error('API 키가 필요합니다');
    }

    // 현재 날씨 정보 가져오기
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${NONHYEON_LAT}&lon=${NONHYEON_LON}&appid=${API_KEY}&units=metric&lang=kr`;
    
    // 5일 예보 정보 가져오기
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${NONHYEON_LAT}&lon=${NONHYEON_LON}&appid=${API_KEY}&units=metric&lang=kr`;

    console.log('🔗 API 요청 URL:', {
      current: currentWeatherUrl.replace(API_KEY!, 'API_KEY_HIDDEN'),
      forecast: forecastUrl.replace(API_KEY!, 'API_KEY_HIDDEN')
    });

    const [currentResponse, forecastResponse] = await Promise.all([
      fetch(currentWeatherUrl),
      fetch(forecastUrl)
    ]);

    console.log('📡 API 응답 상태:', {
      current: currentResponse.status,
      forecast: forecastResponse.status,
      currentOk: currentResponse.ok,
      forecastOk: forecastResponse.ok
    });

    if (!currentResponse.ok || !forecastResponse.ok) {
      const currentError = !currentResponse.ok ? await currentResponse.text() : null;
      const forecastError = !forecastResponse.ok ? await forecastResponse.text() : null;
      
      console.error('❌ API 응답 에러:', {
        currentStatus: currentResponse.status,
        forecastStatus: forecastResponse.status,
        currentError,
        forecastError
      });
      
      throw new Error(`날씨 API 호출 실패: Current(${currentResponse.status}), Forecast(${forecastResponse.status})`);
    }

    const currentData = await currentResponse.json();
    const forecastData = await forecastResponse.json();

    console.log('🌡️ 현재 날씨 원본 데이터:', {
      온도: currentData.main.temp,
      체감온도: currentData.main.feels_like,
      습도: currentData.main.humidity,
      날씨: currentData.weather[0]
    });
    
    console.log('📅 예보 데이터 첫 5개 항목:', 
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
        
        console.log(`📊 ${day.date} 온도 분석:`, {
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

    const weatherData: WeatherData = {
      current: {
        temp: Math.round(currentData.main.temp),
        feels_like: Math.round(currentData.main.feels_like),
        humidity: currentData.main.humidity,
        weather: currentData.weather,
        wind: {
          speed: Math.round(currentData.wind.speed * 10) / 10 // 소수점 1자리
        }
      },
      forecast: dailyForecast
    };

    console.log('✅ 날씨 정보 조회 성공');

    return NextResponse.json({
      success: true,
      data: weatherData,
      location: '인천 남동구 논현동',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ 날씨 API 오류:', error);
    
    // 오류 시 더미 데이터 반환 (개발용)
    return NextResponse.json({
      success: false,
      error: '날씨 정보를 불러올 수 없습니다',
      data: {
        current: {
          temp: 22,
          feels_like: 25,
          humidity: 65,
          weather: [{
            main: 'Clear',
            description: '맑음',
            icon: '01d'
          }],
          wind: {
            speed: 2.1
          }
        },
        forecast: [
          {
            date: new Date().toLocaleDateString('ko-KR', {
              month: 'short',
              day: 'numeric',
              weekday: 'short'
            }),
            temp_max: 28,
            temp_min: 22,
            weather: {
              main: 'Clear',
              description: '맑음',
              icon: '01d'
            }
          },
          {
            date: new Date(Date.now() + 24 * 60 * 60 * 1000).toLocaleDateString('ko-KR', {
              month: 'short',
              day: 'numeric',
              weekday: 'short'
            }),
            temp_max: 26,
            temp_min: 19,
            weather: {
              main: 'Clouds',
              description: '구름많음',
              icon: '03d'
            }
          },
          {
            date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString('ko-KR', {
              month: 'short',
              day: 'numeric',
              weekday: 'short'
            }),
            temp_max: 24,
            temp_min: 17,
            weather: {
              main: 'Rain',
              description: '비',
              icon: '10d'
            }
          }
        ]
      },
      location: '인천 남동구 논현동',
      timestamp: new Date().toISOString()
    }, { status: 200 }); // 개발용이므로 200 상태 코드 유지
  }
} 