# 📊 송도라이프 성능 모니터링 실전 활용 가이드

> 2025-07-20 작성 | API 성능 최적화 시스템 활용법

## 🎯 개요

송도라이프의 API 성능 모니터링 시스템을 활용하여 서비스 품질을 지속적으로 개선하는 방법을 안내합니다.

## 📊 1. 일상적인 모니터링 루틴

### 매일 체크해야 할 것들

```bash
# 아침에 전날 성능 확인 (24시간 데이터)
curl "http://localhost:3000/api/performance?timeWindow=86400000"

# 점심시간 피크타임 확인 (1시간 데이터)
curl "http://localhost:3000/api/performance?timeWindow=3600000"

# 실시간 현재 상태
curl "http://localhost:3000/api/performance"
```

### 성능 지표 기준값

| 지표 | 양호 | 주의 | 위험 |
|------|------|------|------|
| 평균 응답시간 | < 500ms | 500ms - 1초 | > 1초 |
| 에러율 | < 1% | 1% - 3% | > 3% |
| 캐시 히트율 | > 70% | 50% - 70% | < 50% |

### 주간 리포트 생성

```bash
# 일주일 데이터 수집
curl "http://localhost:3000/api/performance?timeWindow=604800000" > weekly_report.json

# 분석할 항목들
# 1. 가장 많이 호출된 API 순위
# 2. 평균 응답시간 트렌드  
# 3. 에러 발생 패턴
# 4. 캐시 효율성
```

## 🚨 2. 문제 상황별 대응 매뉴얼

### ⚠️ 느린 응답시간 발견 시

**문제 징후:**
```json
{
  "alerts": {
    "slowEndpoints": ["GET /api/realestate"]
  },
  "endpoints": {
    "GET /api/realestate": {
      "averageResponseTime": 2500,  // 2.5초! 너무 느림
      "totalRequests": 50
    }
  }
}
```

**즉시 취할 액션:**

1. **캐시 TTL 늘리기**
   ```typescript
   // frontend/src/lib/api-cache.ts 수정
   private defaultTTL = {
     realestate: 60,  // 30분 → 60분으로 증가
   }
   ```

2. **외부 API 타임아웃 확인**
   ```typescript
   // API 호출 시 타임아웃 설정
   const response = await fetch(apiUrl, { 
     timeout: 5000  // 5초 타임아웃 설정
   });
   ```

3. **데이터 필터링 최적화**
   ```typescript
   // 불필요한 데이터 처리 제거
   const filteredData = rawData
     .filter(item => item.essential) // 필수 데이터만
     .slice(0, 100); // 개수 제한
   ```

### 🔥 높은 에러율 발견 시

**문제 징후:**
```json
{
  "alerts": {
    "highErrorEndpoints": ["GET /api/subway"]
  },
  "endpoints": {
    "GET /api/subway": {
      "errorRate": 8.5,  // 8.5% 에러! 위험
      "totalRequests": 100
    }
  }
}
```

**대응 단계:**

1. **로그 확인**
   ```bash
   # 개발 서버 로그에서 에러 패턴 확인
   tail -f logs/api.log | grep "subway"
   ```

2. **외부 API 상태 확인**
   ```bash
   # 서울교통공사 API 직접 테스트
   curl "http://swopenapi.seoul.go.kr/api/subway/[API_KEY]/xml/realtimeStationArrival/0/5/센트럴파크"
   ```

3. **폴백 로직 강화**
   ```typescript
   try {
     const realData = await fetchRealAPI();
     return realData;
   } catch (error) {
     // 에러 시 더미 데이터 제공
     return getDummyData();
   }
   ```

### 📉 낮은 캐시율 발견 시

**문제 징후:**
```json
{
  "alerts": {
    "lowCacheEndpoints": ["GET /api/news"]
  },
  "endpoints": {
    "GET /api/news": {
      "cacheHitRate": 35,  // 35%만 캐시 히트, 너무 낮음
      "totalRequests": 200
    }
  }
}
```

**개선 방법:**

1. **캐시 키 전략 변경**
   ```typescript
   // 너무 세분화된 캐시 키 → 일반화
   // 변경 전: "news_뉴스_category_limit_50_page_3"  
   // 변경 후: "news_뉴스_50"
   ```

2. **TTL 시간 조정**
   ```typescript
   // frontend/src/lib/api-cache.ts
   private defaultTTL = {
     news: 10,  // 5분 → 10분으로 증가
   }
   ```

## 📈 3. 성능 최적화 액션 플랜

### 호출량 기준 우선순위 결정

```json
// 이런 데이터를 보고 우선순위 결정
{
  "endpoints": {
    "GET /api/news": { "totalRequests": 1500 },      // 1순위: 가장 많이 사용
    "GET /api/guides": { "totalRequests": 800 },     // 2순위  
    "GET /api/subway": { "totalRequests": 600 },     // 3순위
    "GET /api/realestate": { "totalRequests": 300 }  // 4순위
  }
}
```

### 실제 최적화 작업 예시

**1단계: 뉴스 API 최적화**
```typescript
// frontend/src/lib/api-cache.ts
news: 15,  // 5분 → 15분으로 캐시 TTL 증가

// frontend/src/app/api/news/route.ts
const limit = parseInt(searchParams.get('limit') || '30'); // 50 → 30으로 기본값 조정

// 불필요한 데이터 필드 제거
const optimizedNews = allNews.map(item => ({
  title: item.title,
  source: item.source,
  date: item.date,
  url: item.url
  // content 필드 제거로 응답 크기 50% 감소
}));
```

**2단계: 결과 측정**
```bash
# 1주일 후 다시 측정
curl "http://localhost:3000/api/performance"
```

**3단계: 효과 분석**
```json
// 개선 후 결과
{
  "GET /api/news": {
    "averageResponseTime": 120,  // 180ms → 120ms (33% 개선!)
    "cacheHitRate": 85,         // 50% → 85% (70% 개선!)
    "totalRequests": 1500
  }
}
```

## 🎯 4. 비즈니스 인사이트 도출

### 사용자 행동 패턴 분석

```json
{
  "insights": {
    "peak_hours": "12:00-13:00, 18:00-19:00",  // 점심시간, 퇴근시간
    "popular_apis": ["news", "subway", "guides"],
    "user_journey": "뉴스 확인 → 지하철 시간 → 가이드 읽기"
  }
}
```

**활용 방안:**
- **피크 타임 캐시 강화**: 점심시간 전에 캐시 워밍업
- **인기 콘텐츠 우선 최적화**: 뉴스 > 지하철 > 가이드 순서
- **사용자 경험 개선**: 연관 API 프리로딩

### 서버 리소스 계획

```json
{
  "resource_planning": {
    "daily_requests": 5000,        // 일일 요청 수
    "peak_rps": 50,               // 최대 초당 요청
    "cache_save_rate": "70%",     // 캐시로 절약된 서버 부하
    "estimated_monthly": 150000   // 월간 예상 요청
  }
}
```

## 🛠️ 5. 자동화 모니터링 설정

### 간단한 모니터링 스크립트

```bash
#!/bin/bash
# monitor.sh

while true; do
  echo "=== $(date) ==="
  
  # 성능 데이터 가져오기
  PERF=$(curl -s "http://localhost:3000/api/performance")
  
  # 평균 응답시간 추출
  AVG_TIME=$(echo $PERF | jq '.data.overview.averageResponseTime')
  ERROR_RATE=$(echo $PERF | jq '.data.overview.errorRate')
  
  # 임계값 체크
  if (( $(echo "$AVG_TIME > 1000" | bc -l) )); then
    echo "🚨 응답시간 경고: ${AVG_TIME}ms"
    # 슬랙 알림, 이메일 등 추가 가능
  fi
  
  if (( $(echo "$ERROR_RATE > 5" | bc -l) )); then
    echo "🚨 에러율 경고: ${ERROR_RATE}%"
  fi
  
  echo "✅ 응답시간: ${AVG_TIME}ms, 에러율: ${ERROR_RATE}%"
  sleep 300  # 5분마다 체크
done
```

### 사용법

```bash
# 모니터링 스크립트 실행
chmod +x monitor.sh
./monitor.sh

# 백그라운드 실행
nohup ./monitor.sh > monitoring.log 2>&1 &
```

## 📝 6. 성능 모니터링 체크리스트

### 매일 체크 (Daily Checklist)

- [ ] 전체 평균 응답시간 < 500ms
- [ ] 에러율 < 1%
- [ ] 캐시 히트율 > 70%
- [ ] 신규 에러 패턴 없음
- [ ] 피크 시간대 성능 정상

### 주간 체크 (Weekly Checklist)

- [ ] API 호출량 트렌드 분석
- [ ] 가장 느린 API 순위 확인
- [ ] 캐시 효율성 개선 포인트 발굴
- [ ] 사용자 행동 패턴 변화 분석
- [ ] 외부 API 의존성 상태 점검

### 월간 체크 (Monthly Checklist)

- [ ] 성능 개선 효과 측정
- [ ] 서버 리소스 사용량 분석
- [ ] 새로운 최적화 기회 발굴
- [ ] 모니터링 시스템 자체 개선
- [ ] 성능 목표 달성도 평가

## 🔗 7. 주요 URL 및 명령어

### 모니터링 URL

```
개발환경: http://localhost:3000/api/performance
운영환경: https://songdo.life/api/performance (개발 환경에서만 접근 가능)
```

### 자주 사용하는 명령어

```bash
# 실시간 성능 확인
curl "http://localhost:3000/api/performance"

# 1시간 윈도우 성능 확인
curl "http://localhost:3000/api/performance?timeWindow=3600000"

# 24시간 윈도우 성능 확인
curl "http://localhost:3000/api/performance?timeWindow=86400000"

# JSON 포맷팅해서 보기
curl -s "http://localhost:3000/api/performance" | jq '.'

# 특정 데이터만 추출
curl -s "http://localhost:3000/api/performance" | jq '.data.overview.averageResponseTime'
```

## ⚡ 8. 긴급 상황 대응

### 서비스 장애 시 체크리스트

1. **즉시 확인**
   ```bash
   curl "http://localhost:3000/api/performance"
   ```

2. **에러율 높은 API 확인**
   ```bash
   curl -s "http://localhost:3000/api/performance" | jq '.data.alerts.highErrorEndpoints'
   ```

3. **로그 확인**
   ```bash
   tail -f logs/application.log
   ```

4. **외부 API 상태 확인**
   - 국토교통부 API
   - 서울교통공사 API
   - 기타 의존 서비스

5. **캐시 초기화** (필요시)
   ```bash
   # 개발 서버 재시작으로 캐시 초기화
   npm run dev
   ```

## 📚 9. 추가 자료

- **API 캐시 시스템**: `frontend/src/lib/api-cache.ts`
- **모니터링 시스템**: `frontend/src/lib/api-monitor.ts`
- **표준 응답 형식**: `frontend/src/lib/api-response.ts`
- **성능 통계 API**: `frontend/src/app/api/performance/route.ts`

---

**마지막 업데이트**: 2025-07-20  
**담당자**: 송도라이프 개발팀  
**문의**: 시스템 관련 문의는 이 가이드를 참고하여 해결하세요.

> 💡 **팁**: 이 가이드를 정기적으로 업데이트하여 새로운 최적화 방법과 모니터링 인사이트를 추가하세요.