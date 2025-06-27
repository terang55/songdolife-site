#!/usr/bin/env python3
"""
날짜 정보 포함 네이버 뉴스 크롤링 테스트
"""

import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from enhanced_crawler import EnhancedNonhyeonCrawler
import json

def test_news_with_date():
    """날짜 정보 추출 기능 테스트"""
    print("=== 날짜 정보 포함 네이버 뉴스 크롤링 테스트 ===")
    
    crawler = EnhancedNonhyeonCrawler()
    
    # 웹드라이버 생성
    if not crawler.create_webdriver():
        print("❌ 웹드라이버 생성 실패")
        return
    
    try:
        # 테스트 키워드
        test_keyword = "인천 논현동"
        print(f"\n🔍 테스트 키워드: {test_keyword}")
        
        # 네이버 뉴스 크롤링
        news_data = crawler._crawl_naver_news_search(test_keyword)
        
        print(f"\n📊 수집 결과: {len(news_data)}개 뉴스")
        
        for i, news in enumerate(news_data, 1):
            print(f"\n📰 뉴스 {i}:")
            print(f"   제목: {news.get('title', 'N/A')}")
            print(f"   언론사: {news.get('press', 'N/A')}")
            print(f"   📅 날짜: {news.get('date', 'N/A')}")  # 날짜 정보 확인
            print(f"   URL: {news.get('url', 'N/A')[:80]}...")
            print(f"   요약: {news.get('summary', 'N/A')[:100]}...")
        
        # JSON 파일로 저장해서 확인
        output_file = f"test_news_with_date_{test_keyword.replace(' ', '_')}.json"
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(news_data, f, ensure_ascii=False, indent=2)
        
        print(f"\n💾 결과를 {output_file}에 저장했습니다.")
        print("✅ 테스트 완료!")
        
    except Exception as e:
        print(f"❌ 테스트 중 오류: {str(e)}")
        import traceback
        traceback.print_exc()
    
    finally:
        if crawler.driver:
            crawler.driver.quit()

if __name__ == "__main__":
    test_news_with_date() 