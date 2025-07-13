@echo off
chcp 65001 > nul
title 송도라이프 스케줄러 - 데몬 모드

echo.
echo ============================================================
echo 🤖 송도라이프 스케줄러 - 데몬 모드 시작
echo ============================================================
echo.
echo 📅 매일 오전 6시, 오후 6시에 자동 크롤링을 실행합니다.
echo 🛑 중지하려면 Ctrl+C를 누르세요.
echo.

cd /d "%~dp0"

echo 🐍 Python 가상환경 활성화 중...
if exist "venv\Scripts\activate.bat" (
    call venv\Scripts\activate.bat
    echo ✅ 가상환경 활성화 완료
) else (
    echo ⚠️ 가상환경이 없습니다. 시스템 Python을 사용합니다.
)
echo.

echo 🚀 스케줄러 시작...
python enhanced_scheduler.py --daemon

echo.
echo 스케줄러가 종료되었습니다.
pause