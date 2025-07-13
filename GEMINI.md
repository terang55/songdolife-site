# Gemini 프로젝트 컨텍스트: 송도라이프

## 1. 프로젝트 목표
- **송도라이프 (SongdoLife)**: 인천 송도국제도시 주민을 위한 종합 생활정보 플랫폼.
- **주요 기능**: 부동산, 교통, 의료, 지역 뉴스 등 실시간 정보 제공.
- **수익 모델**: Google AdSense 기반 광고 수익.

## 2. 기술 스택
- **프론트엔드**: Next.js 15, React 19, TypeScript, Tailwind CSS 4.
- **백엔드 (크롤러)**: Python (Selenium, BeautifulSoup4, Scikit-learn).
- **데이터 관리**: JSON 파일 시스템 (크롤링된 데이터를 저장하고 프론트엔드에서 직접 사용).
- **배포 및 자동화**: Vercel (프론트엔드), GitHub Actions (데이터 수집 및 동기화 자동화).

## 3. 핵심 아키텍처 및 데이터 흐름
1.  **스케줄링**: GitHub Actions가 매일 여러 차례 Python 크롤러를 실행.
2.  **크롤링**: `crawler/enhanced_crawler.py`가 `crawler/config.py`의 키워드를 기반으로 웹에서 데이터 수집.
3.  **데이터 저장**: 수집된 데이터는 `data/enhanced_news/`에 JSON 파일로 저장.
4.  **동기화**: `crawler/sync_to_frontend.py` 스크립트가 최신 JSON 데이터를 `frontend/public/data/enhanced_news/`로 복사.
5.  **배포**: 데이터 변경사항은 Git에 자동으로 커밋/푸시되며, Vercel을 통해 사이트에 반영됨.
6.  **렌더링**: Next.js 앱이 `public` 폴더의 정적 JSON 파일을 읽어 사용자에게 정보를 보여줌.

## 4. 주요 파일 위치
- **프론트엔드 소스**: `frontend/src/`
- **크롤러 소스**: `crawler/`
- **크롤링 설정**: `crawler/config.py`
- **자동화 워크플로우**: `.github/workflows/auto-crawl.yml`
- **크롤링 데이터 (원본)**: `data/enhanced_news/`
- **프론트엔드 데이터 (사본)**: `frontend/public/data/enhanced_news/`
- **프로젝트 계획**: `PROJECT_PLAN.md`
