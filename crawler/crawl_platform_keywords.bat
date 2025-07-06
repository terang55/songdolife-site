@echo off
chcp 65001 > nul
echo.
echo ============================================================
echo 🎯 송도국제도시 정보 허브 - 플랫폼별 키워드 크롤러
echo ============================================================
echo.

cd /d "%~dp0"

echo 📂 현재 디렉토리: %CD%
echo.

echo 🐍 Python 가상환경 활성화 중...
if exist "venv\Scripts\activate.bat" (
    call venv\Scripts\activate.bat
    echo ✅ 가상환경 활성화 완료
) else (
    echo ⚠️ 가상환경이 없습니다. 시스템 Python을 사용합니다.
)
echo.

echo 🎯 플랫폼별 키워드 크롤링 시작...
echo 📰 뉴스: 공식적이고 정확한 지명 위주
echo 📝 블로그: 생활 정보와 개인 경험 위주  
echo 🎥 유튜브: 영상 콘텐츠에 적합한 키워드
echo.

python run_platform_keywords_crawler.py

echo.
echo 📊 작업 완료! 아무 키나 눌러서 종료하세요...
pause > nul 