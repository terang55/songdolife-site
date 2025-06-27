@echo off
echo 🚀 논현동 정보 허브 - 즉시 크롤링 실행
echo ========================================

cd /d "%~dp0"

echo 필요한 패키지를 설치 중...
pip install -r requirements.txt

echo.
echo 크롤링을 시작합니다...
python enhanced_scheduler.py --now

pause 