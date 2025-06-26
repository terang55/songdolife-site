"""
논현동 크롤러 테스트 스크립트
간단한 기능 테스트를 위한 스크립트
"""

from main_crawler import NonhyeonCrawler
import config

def test_news_crawling():
    """뉴스 크롤링 테스트"""
    print("🧪 뉴스 크롤링 테스트 시작...")
    
    crawler = NonhyeonCrawler()
    
    # 웹드라이버 생성 테스트
    print("1️⃣ 웹드라이버 생성 테스트...")
    if not crawler.create_webdriver():
        print("❌ 웹드라이버 생성 실패")
        return False
    
    print("✅ 웹드라이버 생성 성공")
    
    try:
        # 단일 키워드로 뉴스 크롤링 테스트
        print("2️⃣ 뉴스 크롤링 테스트 (키워드: 논현동)...")
        news_data = crawler.crawl_naver_news("논현동")
        
        if news_data:
            print(f"✅ 뉴스 크롤링 성공: {len(news_data)}개 기사 수집")
            
            # 첫 번째 기사 정보 출력
            if len(news_data) > 0:
                print("📰 첫 번째 기사 샘플:")
                first_article = news_data[0]
                print(f"   제목: {first_article.get('title', '제목 없음')}")
                print(f"   언론사: {first_article.get('press', '언론사 없음')}")
                print(f"   날짜: {first_article.get('date', '날짜 없음')}")
                
            # 데이터 저장 테스트
            print("3️⃣ 데이터 저장 테스트...")
            save_result = crawler.save_data(news_data, "news", "test_논현동")
            if save_result:
                print(f"✅ 데이터 저장 성공: {save_result}")
            else:
                print("❌ 데이터 저장 실패")
        else:
            print("❌ 뉴스 크롤링 실패: 데이터 없음")
            return False
            
    except Exception as e:
        print(f"❌ 크롤링 테스트 중 오류: {str(e)}")
        return False
        
    finally:
        if crawler.driver:
            crawler.driver.quit()
            print("🔚 웹드라이버 종료")
    
    return True

def test_data_directory():
    """데이터 디렉토리 생성 테스트"""
    print("📁 데이터 디렉토리 테스트...")
    
    crawler = NonhyeonCrawler()
    data_dir = crawler.ensure_data_directory()
    
    import os
    required_dirs = [
        config.DATA_DIR,
        f"{config.DATA_DIR}/news",
        f"{config.DATA_DIR}/cafe", 
        f"{config.DATA_DIR}/community"
    ]
    
    all_exist = True
    for dir_path in required_dirs:
        if os.path.exists(dir_path):
            print(f"✅ {dir_path}")
        else:
            print(f"❌ {dir_path} - 생성되지 않음")
            all_exist = False
    
    return all_exist

def main():
    """테스트 메인 함수"""
    print("=" * 60)
    print("🧪 논현동 크롤러 테스트 시작")
    print("=" * 60)
    
    # 테스트 1: 데이터 디렉토리
    test1_result = test_data_directory()
    print()
    
    # 테스트 2: 뉴스 크롤링
    test2_result = test_news_crawling()
    print()
    
    # 결과 출력
    print("=" * 60)
    print("📊 테스트 결과 요약")
    print("=" * 60)
    print(f"📁 데이터 디렉토리: {'✅ 통과' if test1_result else '❌ 실패'}")
    print(f"📰 뉴스 크롤링: {'✅ 통과' if test2_result else '❌ 실패'}")
    
    if test1_result and test2_result:
        print("\n🎉 모든 테스트 통과! 크롤러가 정상 작동합니다.")
    else:
        print("\n⚠️ 일부 테스트 실패. 문제를 확인해주세요.")

if __name__ == "__main__":
    main() 