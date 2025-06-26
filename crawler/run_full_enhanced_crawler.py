"""
전체 키워드 개선된 크롤러 실행 스크립트
설정된 모든 키워드로 고품질 뉴스 데이터 수집
"""

from enhanced_crawler import EnhancedNonhyeonCrawler
import config
from datetime import datetime

def main():
    """전체 키워드로 개선된 크롤링 실행"""
    print("🔥 논현동 정보 허브 - 전체 개선된 크롤링 시작!")
    print("=" * 80)
    print("📍 수집 대상 키워드:")
    
    for i, keyword in enumerate(config.SEARCH_KEYWORDS, 1):
        print(f"   {i}. {keyword}")
    
    print(f"\n📊 총 {len(config.SEARCH_KEYWORDS)}개 키워드로 크롤링을 진행합니다.")
    print("💡 각 키워드마다 실제 뉴스 기사로 이동해서 상세 정보를 추출합니다.")
    print("⏰ 예상 소요시간: 약 10-15분")
    print("=" * 80)
    
    # 사용자 확인
    try:
        confirm = input("계속 진행하시겠습니까? (y/N): ").strip().lower()
        if confirm not in ['y', 'yes', '예', 'ㅇ']:
            print("❌ 크롤링이 취소되었습니다.")
            return
    except KeyboardInterrupt:
        print("\n❌ 크롤링이 취소되었습니다.")
        return
    
    print("\n🚀 전체 크롤링을 시작합니다...\n")
    
    try:
        # 개선된 크롤러 인스턴스 생성
        crawler = EnhancedNonhyeonCrawler()
        
        # 전체 키워드로 크롤링 실행
        success = crawler.run_enhanced_crawl(config.SEARCH_KEYWORDS)
        
        if success:
            print("\n" + "=" * 80)
            print("🎉 전체 개선된 크롤링이 성공적으로 완료되었습니다!")
            print("=" * 80)
            
            # 결과 확인
            print("📊 수집 결과를 확인하고 있습니다...")
            
            # 결과 확인 스크립트 실행
            import os
            os.system("python check_enhanced_data.py")
            
        else:
            print("\n❌ 크롤링 중 오류가 발생했습니다.")
            print("📋 자세한 내용은 로그 파일을 확인해주세요.")
            
    except KeyboardInterrupt:
        print("\n\n⏹️ 사용자에 의해 크롤링이 중단되었습니다.")
        print("💾 이미 수집된 데이터는 저장되었습니다.")
        
    except Exception as e:
        print(f"\n❌ 예상치 못한 오류가 발생했습니다: {str(e)}")
        print("📋 자세한 내용은 로그 파일을 확인해주세요.")

if __name__ == "__main__":
    main() 