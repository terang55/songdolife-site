@echo off
chcp 65001 > nul
title 송도라이프 스케줄러 - 상태 확인

echo.
echo ============================================================
echo 📊 송도라이프 스케줄러 - 상태 확인
echo ============================================================
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

python enhanced_scheduler.py --status

echo.
echo 아무 키나 누르면 종료합니다...
pause > nul