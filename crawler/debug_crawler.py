"""
크롤러 디버깅 스크립트
네이버 뉴스 페이지 구조 확인
"""

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
import time
import config

def debug_naver_news():
    """네이버 뉴스 페이지 구조 디버깅"""
    print("🔍 네이버 뉴스 페이지 구조 확인...")
    
    # 웹드라이버 설정
    options = webdriver.ChromeOptions()
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    
    service = Service(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service, options=options)
    
    try:
        keyword = "논현동"
        search_url = f"https://search.naver.com/search.naver?where=news&query={keyword}&sort=1"
        
        print(f"📍 URL: {search_url}")
        driver.get(search_url)
        time.sleep(3)
        
        # 페이지 제목 확인
        print(f"📖 페이지 제목: {driver.title}")
        
        # 다양한 셀렉터로 뉴스 아이템 찾기
        selectors_to_try = [
            ".news_wrap",
            ".news_area",
            ".news_tit",
            ".list_news",
            ".bx",
            ".group_news",
            ".news",
            ".api_subject_bx"
        ]
        
        for selector in selectors_to_try:
            elements = driver.find_elements(By.CSS_SELECTOR, selector)
            print(f"🔍 '{selector}': {len(elements)}개 요소 발견")
            
            if len(elements) > 0:
                # 첫 번째 요소의 텍스트 일부 출력
                try:
                    text_sample = elements[0].text[:100] if elements[0].text else "텍스트 없음"
                    print(f"   📝 첫 번째 요소 텍스트: {text_sample}...")
                except:
                    print("   📝 텍스트 추출 실패")
        
        # 페이지 소스 일부 확인
        print("\n📄 페이지 소스 샘플 (처음 500자):")
        print(driver.page_source[:500])
        
        # 스크린샷 저장 (선택사항)
        try:
            driver.save_screenshot("debug_naver_news.png")
            print("📸 스크린샷 저장: debug_naver_news.png")
        except:
            print("📸 스크린샷 저장 실패")
            
    except Exception as e:
        print(f"❌ 디버깅 오류: {str(e)}")
        
    finally:
        driver.quit()
        print("🔚 브라우저 종료")

if __name__ == "__main__":
    debug_naver_news() 