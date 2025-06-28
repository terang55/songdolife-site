import { NextResponse } from 'next/server';

// 논현동 좌표 (인천 남동구 논현동)
const NONHYEON_LAT = 37.3894;
const NONHYEON_LON = 126.7317;

// OpenWeather API 키 (환경변수에서 가져오거나 임시로 사용)
const API_KEY = process.env.OPENWEATHER_API_KEY || 'fec0e5d8daec1747581d667dc08e95cb';

// 환경 변수 로드 확인 (개발용)
console.log('🔧 환경 변수 확인:', {
  hasApiKey: !!process.env.OPENWEATHER_API_KEY,
  keyLength: process.env.OPENWEATHER_API_KEY?.length || 0,
  usingFallback: !process.env.OPENWEATHER_API_KEY
});

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

    // 현재 날씨 정보 가져오기
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${NONHYEON_LAT}&lon=${NONHYEON_LON}&appid=${API_KEY}&units=metric&lang=kr`;
    
    // 5일 예보 정보 가져오기
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${NONHYEON_LAT}&lon=${NONHYEON_LON}&appid=${API_KEY}&units=metric&lang=kr`;

    console.log('🔗 API 요청 URL:', {
      current: currentWeatherUrl.replace(API_KEY, 'API_KEY_HIDDEN'),
      forecast: forecastUrl.replace(API_KEY, 'API_KEY_HIDDEN')
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

    // 5일 예보 데이터 처리 (하루에 하나씩만)
    const dailyForecast = forecastData.list
      .filter((_: unknown, index: number) => index % 8 === 0) // 3시간마다 데이터가 오므로 8개씩 건너뛰어 하루 단위로
      .slice(0, 5)
      .map((item: unknown) => {
        const forecastItem = item as {
          dt: number;
          main: { temp_max: number; temp_min: number };
          weather: Array<{ main: string; description: string; icon: string }>;
        };
        return {
          date: new Date(forecastItem.dt * 1000).toLocaleDateString('ko-KR', {
            month: 'short',
            day: 'numeric',
            weekday: 'short'
          }),
          temp_max: Math.round(forecastItem.main.temp_max),
          temp_min: Math.round(forecastItem.main.temp_min),
          weather: {
            main: forecastItem.weather[0].main,
            description: forecastItem.weather[0].description,
            icon: forecastItem.weather[0].icon
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
            date: '오늘',
            temp_max: 25,
            temp_min: 18,
            weather: {
              main: 'Clear',
              description: '맑음',
              icon: '01d'
            }
          },
          {
            date: '내일',
            temp_max: 23,
            temp_min: 16,
            weather: {
              main: 'Clouds',
              description: '구름많음',
              icon: '03d'
            }
          }
        ]
      },
      location: '인천 남동구 논현동',
      timestamp: new Date().toISOString()
    }, { status: 200 }); // 개발용이므로 200 상태 코드 유지
  }
} 