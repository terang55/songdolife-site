"""
논현동 정보 크롤러 스케줄러
정기적으로 크롤링을 실행하여 최신 정보를 수집
"""

import schedule
import time
import threading
from datetime import datetime
from main_crawler import NonhyeonCrawler
from loguru import logger
import config

class CrawlerScheduler:
    def __init__(self):
        """스케줄러 초기화"""
        self.running = False
        self.crawler = NonhyeonCrawler()
        self.setup_schedules()
        
    def setup_schedules(self):
        """크롤링 스케줄 설정"""
        # 매일 오전 8시에 전체 크롤링
        schedule.every().day.at("08:00").do(self.run_full_crawl)
        
        # 매일 오후 2시에 뉴스만 크롤링
        schedule.every().day.at("14:00").do(self.run_news_crawl)
        
        # 매일 오후 8시에 카페 크롤링
        schedule.every().day.at("20:00").do(self.run_cafe_crawl)
        
        # 매 3시간마다 핫 키워드 크롤링
        schedule.every(3).hours.do(self.run_hot_keywords_crawl)
        
        logger.info("크롤링 스케줄 설정 완료")
        logger.info("- 매일 08:00: 전체 크롤링")
        logger.info("- 매일 14:00: 뉴스 크롤링")
        logger.info("- 매일 20:00: 카페 크롤링")
        logger.info("- 매 3시간: 핫 키워드 크롤링")

    def run_full_crawl(self):
        """전체 크롤링 실행"""
        try:
            logger.info("📋 스케줄된 전체 크롤링 시작")
            success = self.crawler.run_full_crawl()
            
            if success:
                logger.info("✅ 스케줄된 전체 크롤링 완료")
            else:
                logger.error("❌ 스케줄된 전체 크롤링 실패")
                
        except Exception as e:
            logger.error(f"전체 크롤링 오류: {str(e)}")

    def run_news_crawl(self):
        """뉴스만 크롤링"""
        try:
            logger.info("📰 스케줄된 뉴스 크롤링 시작")
            
            if not self.crawler.create_webdriver():
                logger.error("웹드라이버 생성 실패")
                return
            
            total_news = 0
            for keyword in config.SEARCH_KEYWORDS:
                news_data = self.crawler.crawl_naver_news(keyword)
                if news_data:
                    self.crawler.save_data(news_data, "news", keyword)
                    total_news += len(news_data)
                    
                time.sleep(config.DELAY_BETWEEN_REQUESTS)
            
            logger.info(f"✅ 스케줄된 뉴스 크롤링 완료: {total_news}개 기사")
            
        except Exception as e:
            logger.error(f"뉴스 크롤링 오류: {str(e)}")
        finally:
            if self.crawler.driver:
                self.crawler.driver.quit()

    def run_cafe_crawl(self):
        """카페만 크롤링"""
        try:
            logger.info("☕ 스케줄된 카페 크롤링 시작")
            
            if not self.crawler.create_webdriver():
                logger.error("웹드라이버 생성 실패")
                return
            
            total_cafe = 0
            for keyword in config.SEARCH_KEYWORDS:
                cafe_data = self.crawler.crawl_naver_cafe_search(keyword)
                if cafe_data:
                    self.crawler.save_data(cafe_data, "cafe", keyword)
                    total_cafe += len(cafe_data)
                    
                time.sleep(config.DELAY_BETWEEN_REQUESTS)
            
            logger.info(f"✅ 스케줄된 카페 크롤링 완료: {total_cafe}개 글")
            
        except Exception as e:
            logger.error(f"카페 크롤링 오류: {str(e)}")
        finally:
            if self.crawler.driver:
                self.crawler.driver.quit()

    def run_hot_keywords_crawl(self):
        """핫 키워드 크롤링"""
        try:
            logger.info("🔥 핫 키워드 크롤링 시작")
            
            # 논현동 관련 인기 키워드들
            hot_keywords = [
                "논현동 맛집",
                "논현동 카페",
                "논현동 육아",
                "논현동 부동산"
            ]
            
            if not self.crawler.create_webdriver():
                logger.error("웹드라이버 생성 실패")
                return
            
            total_items = 0
            for keyword in hot_keywords:
                # 뉴스 수집
                news_data = self.crawler.crawl_naver_news(keyword)
                if news_data:
                    self.crawler.save_data(news_data, "news", f"hot_{keyword}")
                    total_items += len(news_data)
                
                # 카페 수집
                cafe_data = self.crawler.crawl_naver_cafe_search(keyword)
                if cafe_data:
                    self.crawler.save_data(cafe_data, "cafe", f"hot_{keyword}")
                    total_items += len(cafe_data)
                    
                time.sleep(config.DELAY_BETWEEN_REQUESTS)
            
            logger.info(f"✅ 핫 키워드 크롤링 완료: {total_items}개 항목")
            
        except Exception as e:
            logger.error(f"핫 키워드 크롤링 오류: {str(e)}")
        finally:
            if self.crawler.driver:
                self.crawler.driver.quit()

    def start_scheduler(self):
        """스케줄러 시작"""
        self.running = True
        logger.info("🕐 논현동 크롤러 스케줄러 시작")
        
        while self.running:
            try:
                schedule.run_pending()
                time.sleep(60)  # 1분마다 스케줄 확인
                
            except KeyboardInterrupt:
                logger.info("사용자에 의해 스케줄러 중단")
                break
            except Exception as e:
                logger.error(f"스케줄러 오류: {str(e)}")
                time.sleep(60)

    def stop_scheduler(self):
        """스케줄러 중지"""
        self.running = False
        logger.info("스케줄러 중지 요청")

    def get_next_run_times(self):
        """다음 실행 시간들 조회"""
        jobs = schedule.get_jobs()
        next_runs = []
        
        for job in jobs:
            next_runs.append({
                "job": str(job.job_func.__name__),
                "next_run": job.next_run.strftime("%Y-%m-%d %H:%M:%S") if job.next_run else "없음"
            })
        
        return next_runs

def run_scheduler_daemon():
    """데몬 모드로 스케줄러 실행"""
    scheduler = CrawlerScheduler()
    
    # 다음 실행 시간 출력
    print("📅 예정된 크롤링 일정:")
    for run_info in scheduler.get_next_run_times():
        print(f"   {run_info['job']}: {run_info['next_run']}")
    
    print("\n스케줄러가 백그라운드에서 실행됩니다...")
    print("종료하려면 Ctrl+C를 누르세요.\n")
    
    try:
        scheduler.start_scheduler()
    except KeyboardInterrupt:
        print("\n스케줄러를 종료합니다.")
        scheduler.stop_scheduler()

def run_scheduler_interactive():
    """인터랙티브 모드로 스케줄러 실행"""
    scheduler = CrawlerScheduler()
    
    print("🕐 논현동 크롤러 스케줄러")
    print("=" * 50)
    
    while True:
        print("\n📋 스케줄러 메뉴:")
        print("1. 스케줄러 시작")
        print("2. 다음 실행 시간 확인")
        print("3. 즉시 전체 크롤링 실행")
        print("4. 즉시 뉴스 크롤링 실행")
        print("5. 즉시 카페 크롤링 실행")
        print("6. 종료")
        
        choice = input("\n선택하세요 (1-6): ").strip()
        
        if choice == "1":
            print("스케줄러를 시작합니다...")
            thread = threading.Thread(target=scheduler.start_scheduler)
            thread.daemon = True
            thread.start()
            print("✅ 스케줄러가 백그라운드에서 실행 중입니다.")
            
        elif choice == "2":
            print("\n📅 다음 실행 예정:")
            for run_info in scheduler.get_next_run_times():
                print(f"   {run_info['job']}: {run_info['next_run']}")
                
        elif choice == "3":
            scheduler.run_full_crawl()
            
        elif choice == "4":
            scheduler.run_news_crawl()
            
        elif choice == "5":
            scheduler.run_cafe_crawl()
            
        elif choice == "6":
            scheduler.stop_scheduler()
            print("👋 스케줄러를 종료합니다.")
            break
            
        else:
            print("❌ 잘못된 선택입니다.")

def main():
    """메인 실행 함수"""
    import sys
    
    if len(sys.argv) > 1 and sys.argv[1] == "--daemon":
        run_scheduler_daemon()
    else:
        run_scheduler_interactive()

if __name__ == "__main__":
    main() 