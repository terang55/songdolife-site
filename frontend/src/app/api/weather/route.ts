import { NextRequest, NextResponse } from 'next/server';

// 논현동 좌표 (인천 남동구 논현동)
const NONHYEON_LAT = 37.3894;
const NONHYEON_LON = 126.7317;

// OpenWeather API 키 (환경변수에서 가져오거나 임시로 사용)
const API_KEY = process.env.OPENWEATHER_API_KEY || 'fec0e5d8daec1747581d667dc08e95cb';

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

export async function GET(request: NextRequest) {
  try {
    console.log('🌤️ 논현동 날씨 정보 요청');

    // 현재 날씨 정보 가져오기
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${NONHYEON_LAT}&lon=${NONHYEON_LON}&appid=${API_KEY}&units=metric&lang=kr`;
    
    // 5일 예보 정보 가져오기
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${NONHYEON_LAT}&lon=${NONHYEON_LON}&appid=${API_KEY}&units=metric&lang=kr`;

    const [currentResponse, forecastResponse] = await Promise.all([
      fetch(currentWeatherUrl),
      fetch(forecastUrl)
    ]);

    if (!currentResponse.ok || !forecastResponse.ok) {
      throw new Error('날씨 API 호출 실패');
    }

    const currentData = await currentResponse.json();
    const forecastData = await forecastResponse.json();

    // 5일 예보 데이터 처리 (하루에 하나씩만)
    const dailyForecast = forecastData.list
      .filter((_: any, index: number) => index % 8 === 0) // 3시간마다 데이터가 오므로 8개씩 건너뛰어 하루 단위로
      .slice(0, 5)
      .map((item: any) => ({
        date: new Date(item.dt * 1000).toLocaleDateString('ko-KR', {
          month: 'short',
          day: 'numeric',
          weekday: 'short'
        }),
        temp_max: Math.round(item.main.temp_max),
        temp_min: Math.round(item.main.temp_min),
        weather: {
          main: item.weather[0].main,
          description: item.weather[0].description,
          icon: item.weather[0].icon
        }
      }));

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