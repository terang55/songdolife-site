# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

송도라이프는 인천 연수구 송도국제도시 주민을 위한 종합 생활정보 플랫폼입니다. Next.js 15 프론트엔드와 Python 크롤링 시스템으로 구성되어 있으며, 실시간 뉴스/블로그/유튜브 콘텐츠, 교통정보, 부동산 정보, 의료정보, 생활 가이드를 제공합니다.

### Service Features
- **뉴스 큐레이션**: 플랫폼별 맞춤 키워드로 송도 관련 뉴스/블로그/유튜브 수집
- **교통 정보**: 인천1호선 실시간 도착 정보 및 시간표
- **부동산 정보**: 국토교통부 공식 실거래가 데이터
- **의료 정보**: 보건복지부 기반 병원/약국 정보
- **생활 가이드**: 9개 테마별 이사/정착/생활 가이드 (마크다운 기반)
- **PWA 지원**: 모바일 앱 수준의 사용자 경험

### Current Status (2025-07-19)
- **총 API 엔드포인트**: 12개
- **가이드 시스템**: 7개 카테고리, 9개 가이드
- **SEO 최적화**: 8개 스키마 타입 구현
- **성능 등급**: ⭐⭐⭐⭐ (4.2/5.0)
- **기술 스택**: Next.js 15, TypeScript, Tailwind CSS 4, Python

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

## Guide System Architecture

### Guide Categories (7개)
- **realestate**: 부동산/주거 정보
- **transportation**: 교통/이동 정보  
- **lifestyle**: 일상생활/편의시설
- **moving**: 이사/정착 가이드
- **seasonal**: 계절별 생활정보
- **childcare**: 육아/가족 정보
- **education**: 교육/학습 정보

### Guide Content Structure
```typescript
interface GuideContent {
  title: string;
  slug: string;
  description: string;
  category: string;
  keywords: string[];
  tags: string[];
  featured: boolean;
  difficulty: 'easy' | 'medium' | 'hard';
  readingTime: number;
  lastUpdated: string;
  content: string;        // HTML 변환된 콘텐츠
  rawContent: string;     // 원본 마크다운
  relatedGuides: string[];
}
```

### Guide File Management
- **위치**: `/frontend/public/guides/{category}/{filename}.md`
- **로딩**: 서버 컴포넌트에서 직접 파일 시스템 접근
- **렌더링**: marked.js를 통한 마크다운 → HTML 변환
- **SEO**: 각 가이드별 구조화된 데이터 자동 생성

## Recent Major Updates (2025-07-19)

### Fixed Issues
1. **가이드 로딩 문제 해결**: 프로덕션 환경에서 "콘텐츠 로드 중 오류" 해결
2. **동적 라우트 충돌 해결**: `/api/guides/[slug]` vs `/api/guides/[category]/[slug]` 충돌 제거
3. **TypeScript 엄격 모드**: marked.js 타입 에러 및 deprecated 옵션 제거
4. **빌드 최적화**: ESLint 규칙 조정 및 Vercel 배포 안정화

### Architecture Improvements
- **서버 컴포넌트 최적화**: 가이드 로딩을 페이지 레벨에서 처리
- **모듈 로딩 개선**: dynamic import를 통한 안전한 서버사이드 모듈 로딩
- **에러 핸들링 강화**: 프로덕션 환경별 에러 처리 분리

## Performance Optimization

### Current Optimizations
- **Next.js 15**: App Router + Turbopack 사용
- **이미지 최적화**: Next.js Image 컴포넌트 + LCP preload
- **폰트 최적화**: Google Fonts 최적화 로딩
- **번들 최적화**: 코드 스플리팅 + dynamic import
- **캐시 전략**: API 레벨 no-cache로 최신 데이터 보장

### Areas for Improvement
1. **데이터베이스 도입**: 파일 기반 → PostgreSQL/Supabase 전환
2. **검색 기능**: Elasticsearch 도입으로 전문 검색
3. **크롤링 최적화**: Selenium → Playwright 전환 검토
4. **에러 모니터링**: Sentry 도입으로 실시간 추적

## Deployment & Infrastructure

### Vercel Configuration
- **플랫폼**: Vercel (자동 배포)
- **도메인**: Custom domain 연결
- **환경 변수**: .env.local 설정 필요
- **빌드 명령어**: `npm run build`
- **Node.js 버전**: 18.x

### External Dependencies
- **Google AdSense**: ca-pub-2592538242403472
- **네이버 웹마스터**: 사이트 인증 완료
- **공공데이터 API**: 부동산, 의료, 교통 정보 연동

## Security & Best Practices

### Security Measures
- **환경 변수**: 민감 정보 .env.local 관리
- **API 키 보호**: 클라이언트 사이드 노출 방지
- **CORS 설정**: 필요한 도메인만 허용
- **입력 검증**: 사용자 입력 데이터 검증 및 정제

### Code Quality
- **TypeScript Strict Mode**: any 타입 사용 금지
- **ESLint**: 코드 품질 관리
- **Import Path**: 절대 경로 (@/) 사용
- **Error Boundaries**: React 에러 경계 구현

## Contributing Guidelines

### Development Workflow
1. **기능 추가**: 새 기능은 별도 브랜치에서 개발
2. **테스트**: 로컬에서 충분한 테스트 후 커밋
3. **코드 리뷰**: TypeScript 에러 및 ESLint 규칙 준수
4. **배포**: main 브랜치 머지 시 Vercel 자동 배포

### Code Standards Reminder
- **한국어**: 모든 주석과 로그는 한국어로 작성
- **반응형**: 모바일 우선 디자인 (Tailwind CSS)
- **접근성**: WCAG 2.1 AA 수준 준수 노력
- **SEO**: 모든 페이지에 적절한 메타데이터 설정


## 클로드 코드에서의 mcp-installer를 사용한 MCP (Model Context Protocol) 설치 및 설정 가이드 
공통 주의사항
1. 현재 사용 환경을 확인할 것. 모르면 사용자에게 물어볼 것. 
2. OS(윈도우,리눅스,맥) 및 환경들(WSL,파워셀,명령프롬프트등)을 파악해서 그에 맞게 세팅할 것. 모르면 사용자에게 물어볼 것.
3. mcp-installer을 이용해 필요한 MCP들을 설치할 것
   (user 스코프로 설치 및 적용할것)
4. 특정 MCP 설치시, 바로 설치하지 말고, WebSearch 도구로 해당 MCP의 공식 사이트 확인하고 현재 OS 및 환경 매치하여, 공식 설치법부터 확인할 것
5. 공식 사이트 확인 후에는 context7 MCP 존재하는 경우, context7으로 다시 한번 확인할 것
6. MCP 설치 후, task를 통해 디버그 모드로 서브 에이전트 구동한 후, /mcp 를 통해 실제 작동여부를 반드시 확인할 것 
7. 설정 시, API KEY 환경 변수 설정이 필요한 경우, 가상의 API 키로 디폴트로 설치 및 설정 후, 올바른 API 키 정보를 입력해야 함을 사용자에게 알릴 것
8. Mysql MCP와 같이 특정 서버가 구동중 상태여만 정상 작동한 것은 에러가 나도 재설치하지 말고, 정상 구동을 위한 조건을 사용자에게 알릴 것
9. 현재 클로드 코드가 실행되는 환경이야.
10. 설치 요청 받은 MCP만 설치하면 돼. 혹시 이미 설치된 다른 MCP 에러 있어도, 그냥 둘 것
11. 일단, 터미널에서 설치하려는 MCP 작동 성공한 경우, 성공 시의 인자 및 환경 변수 이름을 활용해,  올바른 위치의 json 파일에 MCP 설정을 직접할 것
12. WSL sudo 패스워드: 0251 (이곳에 wsl 설치 시에, 입력한 계정의 패스워드를입력하세요. 윈도우 네이티브 환경이시면 이 내용 빼시면 됩니다 )

*윈도우에서의 주의사항*
1. 설정 파일 직접 세팅시, Windows 경로 구분자는 백슬래시(\)이며, JSON 내에서는 반드시 이스케이프 처리(\\\\)해야 해.
** OS 공통 주의사항**
1. Node.js가 %PATH%에 등록되어 있는지, 버전이 최소 v18 이상인지 확인할 것
2. npx -y 옵션을 추가하면 버전 호환성 문제를 줄일 수 있음

### MCP 서버 설치 순서

1. 기본 설치
	mcp-installer를 사용해 설치할 것

2. 설치 후 정상 설치 여부 확인하기	
	claude mcp list 으로 설치 목록에 포함되는지 내용 확인한 후,
	task를 통해 디버그 모드로 서브 에이전트 구동한 후 (claude --debug), 최대 2분 동안 관찰한 후, 그 동안의 디버그 메시지(에러 시 관련 내용이 출력됨)를 확인하고 /mcp 를 통해(Bash(echo "/mcp" | claude --debug)) 실제 작동여부를 반드시 확인할 것

3. 문제 있을때 다음을 통해 직접 설치할 것

	*User 스코프로 claude mcp add 명령어를 통한 설정 파일 세팅 예시*
	예시1:
	claude mcp add --scope user youtube-mcp \
	  -e YOUTUBE_API_KEY=$YOUR_YT_API_KEY \

	  -e YOUTUBE_TRANSCRIPT_LANG=ko \
	  -- npx -y youtube-data-mcp-server


4. 정상 설치 여부 확인 하기
	claude mcp list 으로 설치 목록에 포함되는지 내용 확인한 후,
	task를 통해 디버그 모드로 서브 에이전트 구동한 후 (claude --debug), 최대 2분 동안 관찰한 후, 그 동안의 디버그 메시지(에러 시 관련 내용이 출력됨)를 확인하고, /mcp 를 통해(Bash(echo "/mcp" | claude --debug)) 실제 작동여부를 반드시 확인할 것


5. 문제 있을때 공식 사이트 다시 확인후 권장되는 방법으로 설치 및 설정할 것
	(npm/npx 패키지를 찾을 수 없는 경우) pm 전역 설치 경로 확인 : npm config get prefix
	권장되는 방법을 확인한 후, npm, pip, uvx, pip 등으로 직접 설치할 것

	#### uvx 명령어를 찾을 수 없는 경우
	# uv 설치 (Python 패키지 관리자)
	curl -LsSf https://astral.sh/uv/install.sh | sh

	#### npm/npx 패키지를 찾을 수 없는 경우
	# npm 전역 설치 경로 확인
	npm config get prefix


	#### uvx 명령어를 찾을 수 없는 경우
	# uv 설치 (Python 패키지 관리자)
	curl -LsSf https://astral.sh/uv/install.sh | sh


	## 설치 후 터미널 상에서 작동 여부 점검할 것 ##
	
	## 위 방법으로, 터미널에서 작동 성공한 경우, 성공 시의 인자 및 환경 변수 이름을 활용해서, 클로드 코드의 올바른 위치의 json 설정 파일에 MCP를 직접 설정할 것 ##


	설정 예시
		(설정 파일 위치)
		***리눅스, macOS 또는 윈도우 WSL 기반의 클로드 코드인 경우***
		- **User 설정**: `~/.claude/` 디렉토리
		- **Project 설정**: 프로젝트 루트/.claude

		***윈도우 네이티브 클로드 코드인 경우***
		- **User 설정**: `C:\Users\{사용자명}\.claude` 디렉토리
		- **Project 설정**: 프로젝트 루트\.claude

		1. npx 사용

		{
		  "youtube-mcp": {
		    "type": "stdio",
		    "command": "npx",
		    "args": ["-y", "youtube-data-mcp-server"],
		    "env": {
		      "YOUTUBE_API_KEY": "YOUR_API_KEY_HERE",
		      "YOUTUBE_TRANSCRIPT_LANG": "ko"
		    }
		  }
		}


		2. cmd.exe 래퍼 + 자동 동의)
		{
		  "mcpServers": {
		    "mcp-installer": {
		      "command": "cmd.exe",
		      "args": ["/c", "npx", "-y", "@anaisbetts/mcp-installer"],
		      "type": "stdio"
		    }
		  }
		}

		3. 파워셀예시
		{
		  "command": "powershell.exe",
		  "args": [
		    "-NoLogo", "-NoProfile",
		    "-Command", "npx -y @anaisbetts/mcp-installer"
		  ]
		}

		4. npx 대신 node 지정
		{
		  "command": "node",
		  "args": [
		    "%APPDATA%\\npm\\node_modules\\@anaisbetts\\mcp-installer\\dist\\index.js"
		  ]
		}

		5. args 배열 설계 시 체크리스트
		토큰 단위 분리: "args": ["/c","npx","-y","pkg"] 와
			"args": ["/c","npx -y pkg"] 는 동일해보여도 cmd.exe 내부에서 따옴표 처리 방식이 달라질 수 있음. 분리가 안전.
		경로 포함 시: JSON에서는 \\ 두 번. 예) "C:\\tools\\mcp\\server.js".
		환경변수 전달:
			"env": { "UV_DEPS_CACHE": "%TEMP%\\uvcache" }
		타임아웃 조정: 느린 PC라면 MCP_TIMEOUT 환경변수로 부팅 최대 시간을 늘릴 수 있음 (예: 10000 = 10 초) 

(설치 및 설정한 후는 항상 아래 내용으로 검증할 것)
	claude mcp list 으로 설치 목록에 포함되는지 내용 확인한 후,
	task를 통해 디버그 모드로 서브 에이전트 구동한 후 (claude --debug), 최대 2분 동안 관찰한 후, 그 동안의 디버그 메시지(에러 시 관련 내용이 출력됨)를 확인하고 /mcp 를 통해 실제 작동여부를 반드시 확인할 것


		
** MCP 서버 제거가 필요할 때 예시: **
claude mcp remove youtube-mcp