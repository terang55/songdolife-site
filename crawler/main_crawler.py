"""
논현동 정보 허브 - 메인 크롤러
인천 남동구 논현동 관련 정보를 다양한 소스에서 수집하는 크롤러
"""

import os
import json
import time
import requests
from datetime import datetime, timedelta
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, NoSuchElementException
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from bs4 import BeautifulSoup
from loguru import logger
import config

class NonhyeonCrawler:
    def __init__(self):
        """크롤러 초기화"""
        self.setup_logging()
        self.driver = None
        self.data_dir = self.ensure_data_directory()
        
    def setup_logging(self):
        """로깅 설정"""
        log_file = f"{config.LOGS_DIR}/crawler_{datetime.now().strftime('%Y%m%d')}.log"
        os.makedirs(config.LOGS_DIR, exist_ok=True)
        
        logger.add(
            log_file,
            format=config.LOG_FORMAT,
            level=config.LOG_LEVEL,
            rotation="1 day",
            retention="30 days"
        )
        logger.info("논현동 크롤러 시작")

    def ensure_data_directory(self):
        """데이터 저장 디렉토리 확인 및 생성"""
        os.makedirs(config.DATA_DIR, exist_ok=True)
        os.makedirs(f"{config.DATA_DIR}/news", exist_ok=True)
        os.makedirs(f"{config.DATA_DIR}/cafe", exist_ok=True)
        os.makedirs(f"{config.DATA_DIR}/community", exist_ok=True)
        return config.DATA_DIR

    def create_webdriver(self):
        """안전한 웹드라이버 생성"""
        try:
            options = webdriver.ChromeOptions()
            for option in config.CHROME_OPTIONS:
                options.add_argument(option)
            
            # 개인정보 보호 설정
            prefs = {
                "profile.default_content_setting_values": {
                    "notifications": 2,
                    "media_stream": 2,
                }
            }
            options.add_experimental_option("prefs", prefs)
            
            service = Service(ChromeDriverManager().install())
            self.driver = webdriver.Chrome(service=service, options=options)
            self.driver.set_page_load_timeout(30)
            logger.info("웹드라이버 생성 완료")
            return True
            
        except Exception as e:
            logger.error(f"웹드라이버 생성 실패: {str(e)}")
            return False

    def crawl_naver_news(self, keyword="논현동"):
        """네이버 뉴스에서 논현동 관련 기사 수집"""
        try:
            logger.info(f"네이버 뉴스 크롤링 시작: {keyword}")
            
            news_data = []
            search_url = f"{config.NAVER_NEWS_BASE_URL}?where=news&query={keyword}&sort=1"
            
            self.driver.get(search_url)
            time.sleep(config.DELAY_BETWEEN_REQUESTS)
            
            # 뉴스 기사 요소들 찾기 (업데이트된 셀렉터)
            news_items = self.driver.find_elements(By.CSS_SELECTOR, ".api_subject_bx")
            
            # 만약 api_subject_bx가 없으면 다른 셀렉터 시도
            if not news_items:
                news_items = self.driver.find_elements(By.CSS_SELECTOR, ".group_news .bx")
            
            logger.info(f"발견된 뉴스 아이템 수: {len(news_items)}")
            
            for item in news_items[:20]:  # 최대 20개 기사만
                try:
                    # 제목과 링크 추출 (다양한 셀렉터 시도)
                    title_element = None
                    link = ""
                    
                    # 여러 가능한 셀렉터 시도
                    title_selectors = ["a.news_tit", ".news_tit", "a", ".title"]
                    for sel in title_selectors:
                        try:
                            title_element = item.find_element(By.CSS_SELECTOR, sel)
                            if title_element and title_element.text.strip():
                                break
                        except:
                            continue
                    
                    if not title_element:
                        continue
                        
                    title = title_element.text.strip()
                    link = title_element.get_attribute("href") or ""
                    
                    # 요약문 추출
                    summary = ""
                    summary_selectors = [".news_dsc", ".dsc", ".api_txt_lines"]
                    for sel in summary_selectors:
                        try:
                            summary_element = item.find_element(By.CSS_SELECTOR, sel)
                            summary = summary_element.text.strip()
                            break
                        except:
                            continue
                    
                    # 언론사 추출
                    press = ""
                    press_selectors = [".press", ".info_group .press", ".source"]
                    for sel in press_selectors:
                        try:
                            press_element = item.find_element(By.CSS_SELECTOR, sel)
                            press = press_element.text.strip()
                            break
                        except:
                            continue
                    
                    # 날짜 추출
                    date_text = ""
                    date_selectors = [".info", ".info_group .info", ".date"]
                    for sel in date_selectors:
                        try:
                            date_element = item.find_element(By.CSS_SELECTOR, sel)
                            date_text = date_element.text.strip()
                            break
                        except:
                            continue
                    
                    # 기본 데이터 검증
                    if not title or len(title) < 5:
                        continue
                    
                    # 제외 키워드 필터링
                    if any(exclude_word in title for exclude_word in config.EXCLUDE_KEYWORDS):
                        continue
                    
                    news_article = {
                        "title": title,
                        "link": link,
                        "summary": summary,
                        "press": press,
                        "date": date_text,
                        "keyword": keyword,
                        "crawled_at": datetime.now().isoformat()
                    }
                    
                    news_data.append(news_article)
                    logger.debug(f"기사 수집: {title[:50]}...")
                    
                except Exception as e:
                    logger.warning(f"뉴스 아이템 처리 중 오류: {str(e)}")
                    continue
            
            logger.info(f"네이버 뉴스 수집 완료: {len(news_data)}개 기사")
            return news_data
            
        except Exception as e:
            logger.error(f"네이버 뉴스 크롤링 오류: {str(e)}")
            return []

    def save_data(self, data, data_type, keyword):
        """수집된 데이터를 JSON 파일로 저장"""
        try:
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            filename = f"{self.data_dir}/{data_type}/{keyword}_{data_type}_{timestamp}.json"
            
            with open(filename, 'w', encoding='utf-8') as f:
                json.dump(data, f, ensure_ascii=False, indent=2)
            
            logger.info(f"데이터 저장 완료: {filename} ({len(data)}개 항목)")
            return filename
            
        except Exception as e:
            logger.error(f"데이터 저장 오류: {str(e)}")
            return None

    def run_full_crawl(self):
        """전체 크롤링 실행"""
        try:
            logger.info("전체 크롤링 시작")
            
            if not self.create_webdriver():
                logger.error("웹드라이버 생성 실패로 크롤링 중단")
                return False
            
            all_results = {}
            
            # 각 키워드에 대해 크롤링 수행
            for keyword in config.SEARCH_KEYWORDS:
                logger.info(f"키워드 크롤링 시작: {keyword}")
                
                # 네이버 뉴스 크롤링
                news_data = self.crawl_naver_news(keyword)
                if news_data:
                    news_file = self.save_data(news_data, "news", keyword)
                    all_results[f"{keyword}_news"] = len(news_data)
                
                time.sleep(config.DELAY_BETWEEN_REQUESTS)
            
            # 크롤링 결과 요약 저장
            summary = {
                "crawl_time": datetime.now().isoformat(),
                "results": all_results,
                "total_items": sum(all_results.values())
            }
            
            summary_file = f"{self.data_dir}/crawl_summary_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
            with open(summary_file, 'w', encoding='utf-8') as f:
                json.dump(summary, f, ensure_ascii=False, indent=2)
            
            logger.info(f"전체 크롤링 완료: 총 {summary['total_items']}개 항목 수집")
            return True
            
        except Exception as e:
            logger.error(f"전체 크롤링 오류: {str(e)}")
            return False
            
        finally:
            if self.driver:
                self.driver.quit()
                logger.info("웹드라이버 종료")

def main():
    """메인 실행 함수"""
    try:
        crawler = NonhyeonCrawler()
        success = crawler.run_full_crawl()
        
        if success:
            print("✅ 논현동 정보 크롤링이 성공적으로 완료되었습니다!")
        else:
            print("❌ 크롤링 중 오류가 발생했습니다. 로그를 확인해주세요.")
            
    except KeyboardInterrupt:
        print("\n⏹️ 사용자에 의해 크롤링이 중단되었습니다.")
    except Exception as e:
        print(f"❌ 예상치 못한 오류: {str(e)}")

if __name__ == "__main__":
    main() 