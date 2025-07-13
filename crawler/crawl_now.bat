@echo off
chcp 65001 > nul
title 송도라이프 - 즉시 크롤링

echo.
echo ============================================================
echo 🚀 송도라이프 - 즉시 크롤링 실행
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

echo ⏰ 시작 시간: %date% %time%
echo.

python enhanced_scheduler.py --now

if %errorlevel% neq 0 (
    echo.
    echo ❌ 크롤링 실패. 로그를 확인하세요.
    echo.
) else (
    echo.
    echo ✅ 크롤링 완료!
    echo.
)

echo ⏰ 완료 시간: %date% %time%
echo.
echo 아무 키나 누르면 종료합니다...
pause > nul