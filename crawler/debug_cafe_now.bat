@echo off
chcp 65001 > nul
echo 🔧 네이버 카페 크롤링 디버깅 시작...
echo.

cd /d "%~dp0"

python debug_cafe_crawling.py

echo.
echo ✅ 카페 크롤링 디버깅 완료!
echo 📝 생성된 파일들:
echo   - debug_cafe_page.html (페이지 HTML)
echo   - debug_cafe_screenshot.png (스크린샷)
echo.
pause 