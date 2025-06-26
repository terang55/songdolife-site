"""
논현동 정보 크롤러 실행 스크립트
간편한 크롤링 실행을 위한 래퍼 스크립트
"""

import sys
import os
from main_crawler import NonhyeonCrawler
from datetime import datetime

def print_banner():
    """크롤러 시작 배너 출력"""
    print("=" * 60)
    print("🏘️  논현동 정보 허브 크롤러")
    print("    인천 남동구 논현동 정보 수집 시스템")
    print("=" * 60)
    print(f"📅 시작 시간: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("=" * 60)

def print_menu():
    """메뉴 출력"""
    print("\n📋 크롤링 옵션을 선택하세요:")
    print("1. 전체 크롤링 (뉴스 + 카페)")
    print("2. 뉴스만 크롤링")
    print("3. 카페만 크롤링")
    print("4. 특정 키워드만 크롤링")
    print("5. 종료")
    print("-" * 40)

def run_full_crawling():
    """전체 크롤링 실행"""
    print("🔄 전체 크롤링을 시작합니다...")
    crawler = NonhyeonCrawler()
    success = crawler.run_full_crawl()
    
    if success:
        print("✅ 전체 크롤링이 완료되었습니다!")
    else:
        print("❌ 크롤링 중 오류가 발생했습니다.")
    
    return success

def run_news_only():
    """뉴스만 크롤링"""
    print("📰 뉴스 크롤링을 시작합니다...")
    crawler = NonhyeonCrawler()
    
    if not crawler.create_webdriver():
        print("❌ 웹드라이버 생성 실패")
        return False
    
    try:
        import config
        all_news = []
        
        for keyword in config.SEARCH_KEYWORDS:
            print(f"   🔍 키워드: {keyword}")
            news_data = crawler.crawl_naver_news(keyword)
            if news_data:
                crawler.save_data(news_data, "news", keyword)
                all_news.extend(news_data)
        
        print(f"✅ 뉴스 크롤링 완료: 총 {len(all_news)}개 기사")
        return True
        
    except Exception as e:
        print(f"❌ 뉴스 크롤링 오류: {str(e)}")
        return False
    finally:
        if crawler.driver:
            crawler.driver.quit()

def run_cafe_only():
    """카페만 크롤링"""
    print("☕ 카페 크롤링을 시작합니다...")
    crawler = NonhyeonCrawler()
    
    if not crawler.create_webdriver():
        print("❌ 웹드라이버 생성 실패")
        return False
    
    try:
        import config
        all_cafe = []
        
        for keyword in config.SEARCH_KEYWORDS:
            print(f"   🔍 키워드: {keyword}")
            cafe_data = crawler.crawl_naver_cafe_search(keyword)
            if cafe_data:
                crawler.save_data(cafe_data, "cafe", keyword)
                all_cafe.extend(cafe_data)
        
        print(f"✅ 카페 크롤링 완료: 총 {len(all_cafe)}개 글")
        return True
        
    except Exception as e:
        print(f"❌ 카페 크롤링 오류: {str(e)}")
        return False
    finally:
        if crawler.driver:
            crawler.driver.quit()

def run_custom_keyword():
    """특정 키워드로 크롤링"""
    keyword = input("🔍 크롤링할 키워드를 입력하세요: ").strip()
    
    if not keyword:
        print("❌ 유효한 키워드를 입력해주세요.")
        return False
    
    print(f"🔄 '{keyword}' 키워드로 크롤링을 시작합니다...")
    crawler = NonhyeonCrawler()
    
    if not crawler.create_webdriver():
        print("❌ 웹드라이버 생성 실패")
        return False
    
    try:
        # 뉴스 크롤링
        news_data = crawler.crawl_naver_news(keyword)
        if news_data:
            crawler.save_data(news_data, "news", keyword)
        
        # 카페 크롤링
        cafe_data = crawler.crawl_naver_cafe_search(keyword)
        if cafe_data:
            crawler.save_data(cafe_data, "cafe", keyword)
        
        total_items = len(news_data) + len(cafe_data)
        print(f"✅ '{keyword}' 크롤링 완료: 총 {total_items}개 항목")
        return True
        
    except Exception as e:
        print(f"❌ 크롤링 오류: {str(e)}")
        return False
    finally:
        if crawler.driver:
            crawler.driver.quit()

def main():
    """메인 실행 함수"""
    print_banner()
    
    while True:
        try:
            print_menu()
            choice = input("선택하세요 (1-5): ").strip()
            
            if choice == "1":
                run_full_crawling()
            elif choice == "2":
                run_news_only()
            elif choice == "3":
                run_cafe_only()
            elif choice == "4":
                run_custom_keyword()
            elif choice == "5":
                print("👋 크롤러를 종료합니다.")
                break
            else:
                print("❌ 잘못된 선택입니다. 1-5 사이의 숫자를 입력해주세요.")
            
            print("\n" + "=" * 60)
            
        except KeyboardInterrupt:
            print("\n\n⏹️ 사용자에 의해 프로그램이 중단되었습니다.")
            break
        except Exception as e:
            print(f"❌ 예상치 못한 오류: {str(e)}")
            print("프로그램을 다시 시작합니다...\n")

if __name__ == "__main__":
    main() 