# 🤖 송도라이프 크롤링 자동화 완벽 가이드

매일 수동으로 실행하던 `crawl_sync_push.bat`를 완전 자동화하는 3가지 방법을 제공합니다.

## 📋 자동화 방법 비교

| 방법 | 난이도 | 안정성 | 비용 | 추천도 |
|------|--------|--------|------|--------|
| **Windows 작업 스케줄러** | ⭐ | ⭐⭐⭐⭐⭐ | 무료 | ⭐⭐⭐⭐⭐ |
| **Python 스케줄러** | ⭐⭐ | ⭐⭐⭐⭐ | 무료 | ⭐⭐⭐⭐ |
| **GitHub Actions** | ⭐⭐⭐ | ⭐⭐⭐ | 무료 | ⭐⭐⭐ |

## 🎯 1. Windows 작업 스케줄러 (권장)

### 장점
- Windows 내장 기능으로 별도 설치 불필요
- 컴퓨터 재부팅 후에도 자동 실행
- 서버급 안정성과 신뢰성
- 로그 및 오류 추적 기능

### 설정 방법
👉 **[상세 가이드: WINDOWS_SCHEDULER_GUIDE.md](./crawler/WINDOWS_SCHEDULER_GUIDE.md)**

### 빠른 설정
1. `Windows + R` → `taskschd.msc` 입력
2. "기본 작업 만들기" → 이름: "송도라이프 자동 업데이트"
3. 트리거: 매일 오전 6시, 오후 6시
4. 작업: `C:\Users\SS\Desktop\cursor\songdolife-info-site\crawler\crawl_sync_push.bat`

---

## 🐍 2. Python 스케줄러

### 장점
- 더 정교한 스케줄링 제어
- 실시간 모니터링 및 상태 확인
- 실패 시 자동 재시도 기능
- 이메일 알림 기능

### 설치 및 실행

#### 1단계: 의존성 설치
```bash
cd C:\Users\SS\Desktop\cursor\songdolife-info-site\crawler
pip install -r requirements.txt
```

#### 2단계: 스케줄러 실행
```bash
# 방법 1: 배치 파일로 실행 (더블클릭)
start_scheduler.bat

# 방법 2: Python 직접 실행
python enhanced_scheduler.py --daemon
```

#### 3단계: 즉시 테스트
```bash
# 즉시 크롤링 실행
crawl_now.bat

# 상태 확인
scheduler_status.bat
```

### 사용 가능한 명령어
```bash
# 대화형 메뉴
python enhanced_scheduler.py

# 데몬 모드 (백그라운드 실행)
python enhanced_scheduler.py --daemon

# 즉시 실행
python enhanced_scheduler.py --now

# 상태 확인
python enhanced_scheduler.py --status
```

---

## ☁️ 3. GitHub Actions (클라우드)

### 장점
- 서버 없이도 자동 실행
- GitHub에서 실행 기록 확인 가능
- 완전 무료 (공개 저장소는 무제한, 비공개 저장소는 월 2,000분 제공)
- 인프라 관리 불필요

### 설정 방법

#### 1단계: 워크플로우 파일 확인
파일이 이미 생성됨: `.github/workflows/auto-crawl.yml`

#### 2단계: GitHub 저장소 설정
1. GitHub 저장소 → Settings → Actions → General
2. "Allow all actions and reusable workflows" 선택
3. "Read and write permissions" 선택

#### 3단계: 수동 실행 테스트
1. GitHub 저장소 → Actions 탭
2. "🤖 송도라이프 자동 크롤링" 선택
3. "Run workflow" 버튼 클릭

#### 4단계: 스케줄 확인
- 매일 오전 6시 (한국시간)
- 매일 오후 6시 (한국시간)

---

## 🚀 추천 설정 프로세스

### 1단계: 즉시 사용 가능 (Windows 작업 스케줄러)
```
⏱️ 소요시간: 10분
🔧 난이도: 매우 쉬움
📊 안정성: 최고

✅ 지금 바로 설정 가능
✅ 별도 설치 불필요
✅ 가장 안정적인 방법
```

### 2단계: 고도화 (Python 스케줄러 추가)
```
⏱️ 소요시간: 30분
🔧 난이도: 쉬움
📊 기능성: 풍부

✅ 더 정교한 제어
✅ 실시간 모니터링
✅ 자동 재시도
```

### 3단계: 백업 (GitHub Actions)
```
⏱️ 소요시간: 15분
🔧 난이도: 보통
📊 독립성: 최고

✅ 서버 독립적
✅ 클라우드 백업
✅ 무료 운영
```

---

## 📊 실행 시간 최적화

### 권장 스케줄
- **오전 6시**: 밤새 업데이트된 뉴스 수집
- **오후 6시**: 오후에 업데이트된 블로그/유튜브 수집

### 트래픽 고려사항
- 대부분의 뉴스 사이트는 새벽에 업데이트
- 블로그는 오후~저녁 시간대 업데이트
- 유튜브는 저녁 시간대 업로드 집중

---

## 🔧 문제 해결

### 일반적인 문제들

#### 1. Python 가상환경 오류
```bash
# 가상환경 재생성
cd crawler
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

#### 2. Git 인증 오류
```bash
# Git credential helper 설정
git config --global credential.helper manager-core
```

#### 3. ChromeDriver 오류
```bash
# webdriver-manager가 자동으로 해결
pip install --upgrade webdriver-manager
```

### 로그 확인 위치
```
logs/
├── enhanced_scheduler_YYYYMMDD.log    # 스케줄러 로그
├── crawling_YYYYMMDD.log              # 크롤링 로그
└── git_sync_YYYYMMDD.log              # Git 동기화 로그
```

---

## 📈 모니터링 및 관리

### 실행 상태 확인 방법

#### Windows 작업 스케줄러
- 작업 스케줄러 → 작업 스케줄러 라이브러리
- 마지막 실행 결과 및 다음 실행 시간 확인

#### Python 스케줄러
```bash
# 상태 확인
python enhanced_scheduler.py --status

# 또는 배치 파일
scheduler_status.bat
```

#### GitHub Actions
- GitHub 저장소 → Actions 탭
- 실행 기록 및 로그 확인

### 성공/실패 알림 설정

#### 이메일 알림 (Python 스케줄러)
`enhanced_scheduler.py` 파일에서 이메일 설정:
```python
'email_notifications': True,
'smtp_server': 'smtp.gmail.com',
'email_user': 'your-email@gmail.com',
'email_password': 'your-app-password',
'notification_emails': ['admin@example.com']
```

---

## 🎯 권장 운영 방안

### 개발/테스트 환경
1. **즉시 실행**: `crawl_now.bat` 또는 `python enhanced_scheduler.py --now`
2. **상태 확인**: `scheduler_status.bat`
3. **로그 모니터링**: `logs/` 디렉토리

### 운영 환경
1. **주 방법**: Windows 작업 스케줄러 (안정성)
2. **부 방법**: Python 스케줄러 (모니터링)
3. **백업**: GitHub Actions (클라우드)

### 장애 대응
1. 로그 파일 확인
2. 수동 실행으로 문제 재현
3. 설정 파일 점검
4. 필요시 재시도 또는 복구

---

## 📞 지원 및 문의

### 설정 관련 도움
- Windows 스케줄러: [WINDOWS_SCHEDULER_GUIDE.md](./crawler/WINDOWS_SCHEDULER_GUIDE.md)
- Python 스케줄러: `python enhanced_scheduler.py` (대화형 메뉴)
- GitHub Actions: GitHub 저장소의 Actions 탭

### 로그 위치 및 확인
```
📁 crawler/logs/
📁 crawler/data/enhanced_news/
📁 frontend/public/data/enhanced_news/
📄 crawler/last_run.json (마지막 실행 상태)
```

**🎉 설정 완료 후 매일 자동으로 최신 송도 정보가 업데이트됩니다!**