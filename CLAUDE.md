# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

송도라이프는 인천 연수구 송도국제도시 주민을 위한 종합 생활정보 플랫폼입니다. Next.js 15 프론트엔드와 Python 크롤링 시스템으로 구성되어 있으며, 실시간 뉴스/블로그/유튜브 콘텐츠, 교통정보, 부동산 정보, 의료정보를 제공합니다.

## Development Commands

### Frontend Development
```bash
cd frontend
npm install          # 의존성 설치
npm run dev          # 개발 서버 실행 (포트 3000)
npm run build        # 프로덕션 빌드
npm run start        # 프로덕션 서버 실행
npm run lint         # ESLint 검사
```

### Python Crawler
```bash
cd crawler
pip install -r requirements.txt    # 의존성 설치

# 크롤링 실행
python enhanced_crawler.py         # 메인 크롤러
python remove_duplicates.py        # 중복 제거
python sync_to_frontend.py         # 프론트엔드 동기화

# 배치 스크립트 (Windows)
crawl_and_sync.bat                 # 크롤링 + 동기화
remove_duplicates.bat              # 중복 제거만
```

## Architecture Overview

### Data Flow
1. **크롤링**: Python 크롤러가 플랫폼별(뉴스/블로그/유튜브) 데이터 수집
2. **중복 제거**: 유사도 기반 지능형 중복 검사 (제목 80%, 내용 70% 기준)
3. **동기화**: `sync_to_frontend.py`가 데이터를 frontend/public/data/로 복사
4. **API 제공**: Next.js API Routes가 JSON 파일 기반으로 데이터 제공
5. **렌더링**: React 컴포넌트가 API를 통해 실시간 데이터 표시

### Key Components

**Frontend (Next.js 15)**
- `src/app/page.tsx`: 메인 홈페이지 (카테고리별 뉴스 표시)
- `src/app/layout.tsx`: 루트 레이아웃 (SEO 메타태그, 구조화된 데이터)
- `src/app/api/`: API Routes (news, subway, realestate, medical, weather)
- `src/app/components/`: 재사용 컴포넌트들

**Backend/Crawler (Python)**
- `enhanced_crawler.py`: 메인 크롤링 엔진 (Selenium 기반)
- `config.py`: 플랫폼별 키워드 설정 및 크롤링 설정
- `sync_to_frontend.py`: 데이터 동기화 매니저
- `remove_duplicates.py`: 중복 제거 도구

### Data Structure
```typescript
interface NewsItem {
  title: string;
  content: string;
  source: string;
  date: string;
  url: string;
  keyword: string;
  type: 'news' | 'blog' | 'youtube';
  // 유튜브 전용
  channel?: string;
  views?: string;
  upload_time?: string;
  thumbnail?: string;
}
```

## Critical Development Rules

### Git Workflow Restrictions
- AI는 절대로 `git add`, `git commit`, `git push` 등 git 작업을 사용자 허락 없이 수행하지 않음
- 모든 git 작업 전에 반드시 사용자에게 명시적으로 허락을 요청: "git add/commit/push를 진행해도 될까요?"
- AI는 오직 코드 수정, 파일 생성/편집만 수행
- 로컬 실행(`npm run dev`, `npm run build` 등)은 사용자가 직접 수행

### Code Standards
- **언어**: 모든 코드 주석과 응답은 한국어
- **TypeScript**: 엄격한 타입 체크, `any` 타입 사용 금지
- **스타일링**: Tailwind CSS만 사용, 인라인 스타일 금지
- **반응형**: 모바일 우선 설계 (sm:, md:, lg: 브레이크포인트)

### Platform-Specific Keywords
`config.py`에서 플랫폼별로 다른 키워드 전략 사용:
- **뉴스**: 공식 지명 위주 ("인천 연수구 송도동", "송도국제도시")
- **블로그**: 생활정보 위주 ("송도 맛집", "송도 카페", "송도 아파트")
- **유튜브**: 영상 콘텐츠 적합 ("송도국제도시 맛집", "인천 송도 추천")

## File Structure Rules

### Data File Naming
- 형식: `{platform}_{keyword}_enhanced_news_{timestamp}.json`
- 통합 파일: `all_platforms_enhanced_news_{timestamp}.json`
- 동기화 정보: `sync_summary.json`

### API Response Format
```typescript
interface ApiResponse {
  success: boolean;
  data: NewsItem[];
  total: number;
  timestamp: string;
  note?: string;
}
```

## SEO Optimization Requirements

### Meta Tags
- 모든 페이지에 적절한 title, description, keywords 설정
- Open Graph 및 Twitter Card 메타태그 필수
- 네이버 SEO 최적화 메타태그 포함

### Structured Data
- JSON-LD 스키마 마크업 필수 (LocalBusiness, NewsArticle, FAQPage)
- 지역 정보 구조화 데이터 (geo coordinates 포함)
- 의료정보 및 교통정보 전용 스키마

### Performance
- Next.js Image 컴포넌트 사용
- LCP 이미지 preload 태그
- Core Web Vitals 최적화

## Error Handling Patterns

### Frontend
```typescript
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);

try {
  setLoading(true);
  setError(null);
  // API 호출
} catch (error) {
  console.error('Error:', error);
  setError('사용자 친화적인 에러 메시지');
} finally {
  setLoading(false);
}
```

### Python Crawler
```python
try:
    # 크롤링 로직
    pass
except TimeoutException:
    logger.warning(f"⏰ 타임아웃: {keyword}")
except NoSuchElementException:
    logger.warning(f"🔍 요소 없음: {keyword}")
except Exception as e:
    logger.error(f"❌ 예상치 못한 오류: {str(e)}")
```

## Important Notes

- 타겟 지역: 인천 연수구 송도국제도시
- 주요 키워드: 송도국제도시, 센트럴파크, 송도, 국제업무지구
- 배포: Vercel 자동 배포 (vercel.json 설정)
- PWA 지원: Service Worker 및 오프라인 기능 포함
- Google AdSense 설정: ca-pub-2592538242403472

## Testing

- 로컬 개발: `npm run dev`로 개발 서버 실행
- 빌드 테스트: `npm run build`로 프로덕션 빌드 확인
- 크롤러 테스트: 개별 스크립트 실행으로 데이터 수집 확인
- API 테스트: `/api/news`, `/api/subway` 등 엔드포인트 직접 테스트