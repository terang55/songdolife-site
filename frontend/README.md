# 논현동 정보 허브

인천 남동구 논현동 지역 정보를 제공하는 Next.js 웹사이트입니다.

## 🚀 실제 API 연결 가이드

### 1. 서울시 열린데이터광장 API (추천)

**장점**: 공식 API, 안정적, 무료  
**단점**: 일일 호출 제한 (1,000회)

#### 설정 방법:
1. [서울 열린데이터광장](https://data.seoul.go.kr/) 회원가입
2. 인증키 발급 신청
3. `.env.local` 파일에 키 추가:
```bash
SEOUL_OPEN_API_KEY=your_api_key_here
```

#### API 엔드포인트:
```
http://swopenapi.seoul.go.kr/api/subway/{API_KEY}/json/realtimeStationArrival/0/10/{역명}
```

### 2. Tabriz.kr API (대안)

**장점**: 실시간 정보 제공  
**단점**: 비공식 API, 안정성 불확실

#### 사용법:
```javascript
const response = await fetch('https://tabriz.kr/live/수인분당선/');
// HTML 파싱 필요
```

### 3. 웹 스크래핑 방식

**장점**: API 키 불필요  
**단점**: 사이트 변경 시 동작 중단 가능

#### 대상 사이트들:
- `https://subway.saroro.dev/SU` - 수인분당선 실시간 정보
- `https://smss.seoulmetro.co.kr/traininfo/traininfoUserView.do` - 서울교통공사

### 4. 구현된 기능

현재 API는 **3단계 fallback** 시스템으로 구현되어 있습니다:

1. **1차**: 서울시 공식 API 시도
2. **2차**: 웹 스크래핑 시도  
3. **3차**: 더미 데이터 반환

### 5. 환경변수 설정

`frontend/.env.local` 파일을 생성하고 다음과 같이 설정하세요:

```bash
# 서울시 열린데이터광장 API 키
SEOUL_OPEN_API_KEY=your_seoul_api_key_here

# OpenWeather API 키 (날씨 정보용)
OPENWEATHER_API_KEY=your_openweather_api_key_here
```

### 6. 테스트 방법

```bash
# 개발 서버 실행
npm run dev

# API 테스트
curl "http://localhost:3000/api/subway?station=인천논현"
```

### 7. 에러 처리

- API 키 미설정: 더미 데이터 반환
- 네트워크 오류: 자동 fallback
- 역 정보 없음: 에러 메시지 반환

### 8. 향후 개선사항

- [ ] 코레일 API 연동 (수인분당선 전체 구간)
- [ ] 실시간 지연 정보 추가
- [ ] 캐싱 시스템 도입
- [ ] WebSocket 실시간 업데이트

---

## 📱 기존 기능들

### 개발 서버 실행
```bash
npm install
npm run dev
```

### 빌드
```bash
npm run build
npm start
```

### 기능 목록
- 📰 논현동 관련 뉴스 크롤링
- 🌤️ 실시간 날씨 정보
- 🚇 지하철 실시간 도착 정보
- 📱 반응형 웹 디자인
- 🔍 SEO 최적화

### 기술 스택
- **Frontend**: Next.js 15, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **크롤링**: Python (Selenium, BeautifulSoup)
- **배포**: Vercel

## 기능

- 📰 실시간 뉴스, 블로그, 유튜브 콘텐츠 수집
- 🌤️ 논현동 실시간 날씨 정보
- 📱 모바일 반응형 디자인
- 🔍 SEO 최적화
- 📊 Google Analytics & AdSense 연동

## 환경변수 설정

날씨 기능을 사용하려면 OpenWeather API 키가 필요합니다:

1. [OpenWeatherMap](https://openweathermap.org/api)에서 무료 계정 생성
2. API 키 발급 (무료 계정: 하루 1000회 호출 가능)
3. `.env.local` 파일 생성:

```bash
OPENWEATHER_API_KEY=your_api_key_here
```

## 개발 서버 실행

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
