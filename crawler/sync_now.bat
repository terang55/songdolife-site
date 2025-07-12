@echo off
chcp 65001 > nul
title 송도국제도시 정보 허브 - 데이터 동기화

echo.
echo =========================================
echo 🔄 송도국제도시 정보 허브 - 데이터 동기화
echo =========================================
echo.

cd /d "%~dp0"

echo 🔄 프론트엔드 데이터 동기화를 시작합니다...
echo.

python sync_to_frontend.py --sync

echo.
echo ✅ 동기화 완료!
echo.
echo 아무 키나 누르면 종료합니다...
pause > nul 