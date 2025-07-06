# 송도국제도시 정보 허브

## 프로젝트 개요
인천 연수구 송도국제도시 지역의 실시간 정보를 제공하는 웹 플랫폼입니다.

## 주요 기능
- 🏠 **실거래가 정보**: 송도국제도시 아파트 매매/전세 실거래가
- 🚌 **교통 정보**: 실시간 버스 도착 정보 및 지하철 운행 상황
- 🏥 **의료 정보**: 주변 병원 및 약국 정보
- 📰 **지역 뉴스**: 송도국제도시 관련 최신 뉴스
- 🌤️ **날씨 정보**: 연수구 실시간 날씨 및 미세먼지

## 기술 스택
- **Frontend**: Next.js 15, TypeScript, Tailwind CSS 4
- **Backend**: Python (크롤링), Node.js API
- **배포**: Vercel
- **데이터**: 공공데이터포털 API, 웹 크롤링

## 디렉토리 구조
```
songdolife-info-site/
├── frontend/          # Next.js 프론트엔드
├── crawler/           # Python 크롤링 시스템  
├── data/             # 크롤링된 데이터
└── public/           # 정적 파일
```

## 로컬 개발
```bash
cd frontend
npm install
npm run dev
```

## 배포
Vercel을 통한 자동 배포가 설정되어 있습니다.

## 라이선스
MIT License 