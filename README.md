# 🏠 송도라이프 (Songdo Life)

인천 연수구 송도국제도시의 다양한 정보를 실시간으로 수집하고 제공하는 웹사이트입니다.

## 📋 주요 기능

- 📰 **실시간 뉴스 수집**: 송도 관련 최신 뉴스 자동 크롤링
- 🍽️ **맛집 정보**: 송도 맛집 및 카페 정보
- 🏘️ **부동산 정보**: 송도 부동산 시장 동향
- 👶 **육아 정보**: 송도 육아 관련 소식
- 🔍 **검색 기능**: 키워드별 정보 검색
- 📱 **반응형 디자인**: 모바일/데스크톱 최적화

## 🛠️ 기술 스택

### Frontend
- **Next.js 15**: React 프레임워크
- **TypeScript**: 타입 안전성
- **Tailwind CSS**: 스타일링
- **Lucide React**: 아이콘

### Backend
- **Python**: 크롤링 엔진
- **Selenium**: 웹 크롤링
- **BeautifulSoup**: HTML 파싱
- **Loguru**: 로깅

### 배포
- **Vercel**: 프론트엔드 배포
- **GitHub Actions**: CI/CD

## 📁 프로젝트 구조

```
nonhyeon-info-site/
├── frontend/           # Next.js 웹사이트
│   ├── src/
│   │   ├── app/
│   │   │   ├── api/    # API 라우트
│   │   │   └── ...
│   └── package.json
├── crawler/            # Python 크롤링 시스템
│   ├── main_crawler.py
│   ├── config.py
│   └── ...
├── data/              # 크롤링된 데이터
│   └── enhanced_news/
└── README.md
```

## 🚀 로컬 실행

### 1. 크롤러 실행 (Python)
```bash
cd crawler
pip install -r requirements.txt
python run_crawler.py
```

### 2. 웹사이트 실행 (Next.js)
```bash
cd frontend
npm install
npm run dev
```

웹사이트는 http://localhost:3000 에서 확인할 수 있습니다.

## 📊 데이터 수집

크롤러는 다음 키워드로 정보를 수집합니다:
- 인천 송도국제도시

## 🔄 자동 업데이트

- 크롤러는 매일 자동으로 실행되어 최신 정보를 수집합니다
- 웹사이트는 실시간으로 데이터를 반영합니다

## 📝 라이선스

이 프로젝트는 개인 사용 목적으로 제작되었습니다.

## 👥 기여

버그 리포트나 기능 제안은 Issues를 통해 제출해 주세요.

---

**송도라이프**

인천 연수구 송도국제도시 실시간 정보

인천 송도국제도시 주민들을 위한 정보 허브

실시간 뉴스, 맛집, 카페, 부동산, 육아 정보를 한눈에 확인하세요 