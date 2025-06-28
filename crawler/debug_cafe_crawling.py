#!/usr/bin/env python3
"""
네이버 카페 크롤링 디버깅 스크립트
- CSS 셀렉터 확인
- 페이지 구조 분석
- 상세한 로그 출력
"""

from enhanced_crawler import EnhancedNonhyeonCrawler
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import json
import time
import urllib.parse

def debug_cafe_crawling():
    """카페 크롤링 디버깅"""
    print("=== 네이버 카페 크롤링 디버깅 ===")
    
    # 크롤러 초기화
    crawler = EnhancedNonhyeonCrawler()
    
    try:
        # 웹드라이버 생성
        if not crawler.create_webdriver():
            print("❌ 웹드라이버 생성 실패")
            return
        
        keyword = "인천논현"
        print(f"🔍 '{keyword}' 카페 검색 디버깅 시작...")
        
        # 네이버 카페 검색 URL 생성
        encoded_keyword = urllib.parse.quote(keyword)
        search_url = f"https://search.naver.com/search.naver?ssc=tab.cafe.all&query={encoded_keyword}&sm=tab_opt&sort=1&photo=0&field=0&pd=0&ds=&de=&mynews=0&cluster_rank=41&start=1"
        
        print(f"🌐 검색 URL: {search_url}")
        
        # 페이지 로드
        crawler.driver.get(search_url)
        time.sleep(3)
        
        print(f"📄 페이지 제목: {crawler.driver.title}")
        
        # 현재 페이지 HTML 일부 저장 (디버깅용)
        page_source = crawler.driver.page_source
        with open("debug_cafe_page.html", "w", encoding="utf-8") as f:
            f.write(page_source)
        print("📝 페이지 HTML이 'debug_cafe_page.html'로 저장되었습니다.")
        
        # 기존 셀렉터로 요소 찾기 시도
        print("\n=== 기존 CSS 셀렉터 테스트 ===")
        
        selectors_to_test = [
            ".total_wrap .api_subject_bx",
            ".api_subject_bx",
            ".total_wrap",
            ".cafe_item",
            "[data-cr-area='cafe']",
            ".lst_total",
            ".api_ani_send",
            ".total_group"
        ]
        
        for selector in selectors_to_test:
            try:
                elements = crawler.driver.find_elements(By.CSS_SELECTOR, selector)
                print(f"✅ '{selector}': {len(elements)}개 요소 발견")
                if len(elements) > 0:
                    print(f"   첫 번째 요소 텍스트: {elements[0].text[:100]}...")
            except Exception as e:
                print(f"❌ '{selector}': 오류 - {str(e)}")
        
        # 카페 관련 모든 요소 찾기
        print("\n=== 카페 관련 요소 검색 ===")
        
        # 다양한 방법으로 카페 게시글 요소 찾기
        possible_selectors = [
            "div[data-cr-area='cafe']",
            ".result_area.cafe",
            ".cafe .total_wrap",
            "[class*='cafe']",
            "[class*='total']",
            ".lst_type",
            ".search_list",
            ".result"
        ]
        
        best_selector = None
        max_elements = 0
        
        for selector in possible_selectors:
            try:
                elements = crawler.driver.find_elements(By.CSS_SELECTOR, selector)
                if len(elements) > max_elements:
                    max_elements = len(elements)
                    best_selector = selector
                print(f"🔍 '{selector}': {len(elements)}개")
            except:
                continue
        
        if best_selector and max_elements > 0:
            print(f"\n🎯 최적 셀렉터: '{best_selector}' ({max_elements}개 요소)")
            
            # 최적 셀렉터로 상세 분석
            elements = crawler.driver.find_elements(By.CSS_SELECTOR, best_selector)
            
            for i, element in enumerate(elements[:3]):
                print(f"\n--- 요소 {i+1} 분석 ---")
                print(f"HTML: {element.get_attribute('outerHTML')[:200]}...")
                print(f"텍스트: {element.text[:100]}...")
                
                # 제목 찾기 시도
                title_selectors = [
                    "a[class*='tit']",
                    ".title a",
                    "a",
                    "[class*='title']",
                    "h3 a",
                    "h4 a"
                ]
                
                for title_sel in title_selectors:
                    try:
                        title_elements = element.find_elements(By.CSS_SELECTOR, title_sel)
                        if title_elements:
                            print(f"  제목 후보 ('{title_sel}'): {title_elements[0].text}")
                            break
                    except:
                        continue
        
        # 실제 크롤링 함수 테스트
        print(f"\n=== 실제 크롤링 함수 테스트 ===")
        cafe_data = crawler.crawl_naver_cafe_search(keyword)
        print(f"📊 수집된 데이터: {len(cafe_data)}개")
        
        if cafe_data:
            print("\n=== 수집된 데이터 샘플 ===")
            for i, post in enumerate(cafe_data):
                print(f"{i+1}. {post.get('title', 'No Title')}")
                print(f"   카페: {post.get('source', 'Unknown')}")
                print(f"   URL: {post.get('url', 'No URL')}")
        else:
            print("❌ 수집된 데이터가 없습니다.")
            
            # 페이지에 '카페' 텍스트가 있는지 확인
            if "카페" in page_source:
                print("✅ 페이지에 '카페' 텍스트가 존재합니다.")
            else:
                print("❌ 페이지에 '카페' 텍스트가 없습니다. 검색 결과가 없을 수 있습니다.")
        
        # 스크린샷 저장
        try:
            crawler.driver.save_screenshot("debug_cafe_screenshot.png")
            print("📸 스크린샷이 'debug_cafe_screenshot.png'로 저장되었습니다.")
        except:
            print("❌ 스크린샷 저장 실패")
        
    except Exception as e:
        print(f"❌ 전체 오류: {str(e)}")
    
    finally:
        # 웹드라이버 종료
        if crawler.driver:
            print("\n🔚 웹드라이버 종료 (5초 후)")
            time.sleep(5)  # 결과 확인 시간
            crawler.driver.quit()

if __name__ == "__main__":
    debug_cafe_crawling() 