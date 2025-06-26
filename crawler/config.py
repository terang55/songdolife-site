"""
논현동 정보 크롤러 설정 파일
"""

import os
from dotenv import load_dotenv

load_dotenv()

# 기본 설정
PROJECT_NAME = "논현동 정보 허브"
VERSION = "1.0.0"

# 크롤링 대상 키워드 (인천 남동구 지역 특화)
SEARCH_KEYWORDS = [
    "인천 논현지구", 
    "인천 논현동",
    "인천 논현고잔동",
    "인천 논현동 맛집",
    "인천 논현동 부동산",
    "에코메트로",
    "인천 논현동 카페",
    "인천 남동구 논현동",
    "인천 호구포",
    "소래포구"
]

# 네이버 검색 설정
NAVER_NEWS_BASE_URL = "https://search.naver.com/search.naver"
NAVER_CAFE_BASE_URL = "https://cafe.naver.com"

# 크롤링 간격 (초)
CRAWL_INTERVAL = 300  # 5분

# 데이터 저장 경로
DATA_DIR = "../data"
LOGS_DIR = "../data/logs"

# 크롤링 설정
MAX_PAGES = 5  # 최대 페이지 수
DELAY_BETWEEN_REQUESTS = 2  # 요청 간 대기시간 (초)

# 브라우저 설정
CHROME_OPTIONS = [
    "--no-sandbox",
    "--disable-dev-shm-usage", 
    "--disable-extensions",
    "--disable-plugins",
    "--disable-images",
    "--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
]

# 데이터 보존 기간 (일)
DATA_RETENTION_DAYS = 30

# 필터링 키워드 (제외할 내용)
EXCLUDE_KEYWORDS = [
    "광고",
    "홍보",
    "스팸",
    "영업"
]

# 로그 설정
LOG_LEVEL = "INFO"
LOG_FORMAT = "{time:YYYY-MM-DD HH:mm:ss} | {level} | {message}" 