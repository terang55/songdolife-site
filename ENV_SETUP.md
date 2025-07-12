# 송도라이프 환경변수 설정 가이드

## 📊 분석 도구 분리를 위한 환경변수 설정

### 1. `.env.local` 파일 생성
프로젝트 루트에 `.env.local` 파일을 생성하고 다음 내용을 추가하세요:

```bash
# 송도라이프 전용 분석 도구 설정

# Google Analytics 4 측정 ID (새로 생성한 GA4 속성의 측정 ID)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Google Search Console 검증 코드 (새로 생성한 속성의 검증 코드)
NEXT_PUBLIC_GOOGLE_VERIFICATION=google-verification-code

# 네이버 서치어드바이저 검증 코드 (새로 등록한 사이트의 검증 코드)
NEXT_PUBLIC_NAVER_VERIFICATION=naver-verification-code

# Bing 웹마스터 도구 검증 코드 (선택사항)
NEXT_PUBLIC_BING_VERIFICATION=bing-verification-code

# Google AdSense 계정 ID (수익화 시 사용)
NEXT_PUBLIC_ADSENSE_ID=ca-pub-XXXXXXXXXX
```

### 2. Vercel 환경변수 설정
Vercel 대시보드에서도 동일한 환경변수를 설정해야 합니다:

1. Vercel 프로젝트 설정 → Environment Variables
2. 위의 모든 변수를 Production, Preview, Development 환경에 추가

### 3. 새로운 분석 도구 생성 단계

#### Google Analytics 4
1. [analytics.google.com](https://analytics.google.com) → 관리 → 속성 만들기
2. 속성 이름: `송도라이프 - 송도국제도시 생활정보`
3. 웹 데이터 스트림 생성: `https://songdo-life-site.vercel.app`
4. 측정 ID (G-XXXXXXXXXX) 복사

#### Google Search Console
1. [search.google.com/search-console](https://search.google.com/search-console) → 속성 추가
2. URL 접두어: `https://songdo-life-site.vercel.app`
3. HTML 태그 방식으로 소유권 확인
4. 검증 코드 복사

#### 네이버 서치어드바이저
1. [searchadvisor.naver.com](https://searchadvisor.naver.com) → 웹마스터 도구
2. 사이트 등록: `https://songdo-life-site.vercel.app`
3. HTML 태그 방식으로 소유권 확인
4. 검증 코드 복사

### 4. 주의사항
- `.env.local` 파일은 git에 커밋하지 마세요 (이미 .gitignore에 포함됨)
- 환경변수 변경 후 개발 서버 재시작 필요
- Vercel 배포 시 환경변수가 자동으로 적용됨

### 5. 기존 인천논현라이프와의 분리
이 설정으로 다음이 완전히 분리됩니다:
- Google Analytics 데이터
- Search Console 검색 성능 데이터  
- 네이버 검색 최적화 데이터
- 광고 수익 (AdSense 사용 시) 