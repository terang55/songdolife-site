@echo off
chcp 65001 > nul
echo.
echo ============================================================
echo 🔧 송도국제도시 정보 허브 - 중복 제거 도구
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

echo 🔍 중복 제거 스크립트 실행 중...
python remove_duplicates.py

echo.
echo 📊 작업 완료! 아무 키나 눌러서 종료하세요...
pause > nul 