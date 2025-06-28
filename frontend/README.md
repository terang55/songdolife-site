# 논현동 정보 허브

인천 남동구 논현동 지역 정보를 제공하는 Next.js 웹사이트입니다.

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
