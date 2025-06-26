"""
논현동 정보 허브 - 개선된 크롤러
실제 뉴스 기사로 이동해서 고품질 데이터를 수집하는 크롤러
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

class EnhancedNonhyeonCrawler:
    def __init__(self):
        """개선된 크롤러 초기화"""
        self.setup_logging()
        self.driver = None
        self.data_dir = self.ensure_data_directory()
        
    def setup_logging(self):
        """로깅 설정"""
        log_file = f"{config.LOGS_DIR}/enhanced_crawler_{datetime.now().strftime('%Y%m%d')}.log"
        os.makedirs(config.LOGS_DIR, exist_ok=True)
        
        logger.add(
            log_file,
            format=config.LOG_FORMAT,
            level=config.LOG_LEVEL,
            rotation="1 day",
            retention="30 days"
        )
        logger.info("개선된 논현동 크롤러 시작")

    def ensure_data_directory(self):
        """데이터 저장 디렉토리 확인 및 생성"""
        os.makedirs(config.DATA_DIR, exist_ok=True)
        os.makedirs(f"{config.DATA_DIR}/enhanced_news", exist_ok=True)
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

    def extract_article_content(self, url):
        """실제 뉴스 기사 URL에서 상세 내용 추출"""
        try:
            self.driver.get(url)
            time.sleep(2)
            
            # 기사 본문 추출 (다양한 뉴스 사이트 대응)
            content_selectors = [
                "#newsct_article",  # 네이버 뉴스
                ".news_article",
                ".article_body",
                ".news_content",
                ".content",
                "#content",
                "article",
                ".post_content"
            ]
            
            content = ""
            for selector in content_selectors:
                try:
                    content_element = self.driver.find_element(By.CSS_SELECTOR, selector)
                    content = content_element.text.strip()
                    if content and len(content) > 100:
                        break
                except:
                    continue
            
            return content
            
        except Exception as e:
            logger.warning(f"기사 내용 추출 실패 {url}: {str(e)}")
            return ""

    def crawl_enhanced_naver_news(self, keyword):
        """개선된 네이버 뉴스 크롤링 - 관련도순, 최신 7일, 실제 기사 내용까지 수집"""
        try:
            logger.info(f"개선된 네이버 뉴스 크롤링 시작 (최신7일, 관련도순): {keyword}")
            
            news_data = []
            # 관련도순(0), 최신순(1) - 관련도순으로 변경, 최신 7일 필터 추가
            search_url = f"{config.NAVER_NEWS_BASE_URL}?where=news&query={keyword}&sort=0&pd=3&ds=&de="
            
            self.driver.get(search_url)
            time.sleep(config.DELAY_BETWEEN_REQUESTS)
            
            # 뉴스 기사 요소들 찾기
            news_items = self.driver.find_elements(By.CSS_SELECTOR, ".list_news .bx")
            
            if not news_items:
                news_items = self.driver.find_elements(By.CSS_SELECTOR, ".group_news .bx")
            
            logger.info(f"발견된 뉴스 아이템 수: {len(news_items)}")
            
            for idx, item in enumerate(news_items[:10]):  # 상위 10개만 상세 분석
                try:
                    print(f"   📰 기사 {idx+1}/10 처리 중...")
                    
                    # 제목과 링크 추출
                    title_element = item.find_element(By.CSS_SELECTOR, "a.news_tit")
                    title = title_element.text.strip()
                    link = title_element.get_attribute("href")
                    
                    # 요약문 추출
                    try:
                        summary_element = item.find_element(By.CSS_SELECTOR, ".news_dsc")
                        summary = summary_element.text.strip()
                    except:
                        summary = ""
                    
                    # 언론사 추출
                    try:
                        press_element = item.find_element(By.CSS_SELECTOR, ".info_group .press")
                        press = press_element.text.strip()
                    except:
                        press = ""
                    
                    # 날짜 추출
                    try:
                        date_element = item.find_element(By.CSS_SELECTOR, ".info_group .info")
                        date_text = date_element.text.strip()
                    except:
                        date_text = ""
                    
                    # 기본 데이터 검증
                    if not title or len(title) < 5:
                        continue
                    
                    # 제외 키워드 필터링
                    if any(exclude_word in title for exclude_word in config.EXCLUDE_KEYWORDS):
                        continue
                    
                    # 실제 기사 내용 추출
                    content = self.extract_article_content(link) if link else ""
                    
                    news_article = {
                        "title": title,
                        "url": link,
                        "content": content,
                        "summary": summary,
                        "press": press,
                        "date": date_text,
                        "crawled_at": datetime.now().isoformat(),
                        "content_length": len(content),
                        "keyword": keyword,
                        "search_rank": idx + 1,
                        "type": "news"
                    }
                    
                    news_data.append(news_article)
                    logger.debug(f"기사 수집 완료: {title[:50]}...")
                    
                except Exception as e:
                    logger.warning(f"뉴스 아이템 처리 중 오류: {str(e)}")
                    continue
            
            logger.info(f"개선된 네이버 뉴스 수집 완료: {len(news_data)}개 기사")
            return news_data
            
        except Exception as e:
            logger.error(f"개선된 네이버 뉴스 크롤링 오류: {str(e)}")
            return []

    def crawl_naver_blog_search(self, keyword):
        """네이버 블로그 검색 결과 크롤링 - 관련도순, 최신 7일"""
        try:
            logger.info(f"네이버 블로그 크롤링 시작 (최신7일, 관련도순): {keyword}")
            
            blog_data = []
            # 관련도순(0), 최신순(1) - 관련도순으로 변경, 최신 7일 필터 추가
            search_url = f"https://search.naver.com/search.naver?where=post&query={keyword}&sort=0&pd=3&ds=&de="
            
            self.driver.get(search_url)
            time.sleep(config.DELAY_BETWEEN_REQUESTS)
            
            # 블로그 포스트 요소들 찾기
            blog_items = self.driver.find_elements(By.CSS_SELECTOR, ".list_blog .bx")
            
            logger.info(f"발견된 블로그 아이템 수: {len(blog_items)}")
            
            for idx, item in enumerate(blog_items[:5]):  # 상위 5개만
                try:
                    # 제목과 링크 추출
                    title_element = item.find_element(By.CSS_SELECTOR, "a.title_link")
                    title = title_element.text.strip()
                    link = title_element.get_attribute("href")
                    
                    # 내용 추출
                    try:
                        content_element = item.find_element(By.CSS_SELECTOR, ".dsc_link")
                        content = content_element.text.strip()
                    except:
                        content = ""
                    
                    # 블로그명 추출
                    try:
                        source_element = item.find_element(By.CSS_SELECTOR, ".name")
                        source = source_element.text.strip()
                    except:
                        source = "네이버 블로그"
                    
                    if not title or len(title) < 5:
                        continue
                    
                    blog_post = {
                        "title": title,
                        "content": content,
                        "date": "",  # 블로그는 정확한 날짜 추출이 어려움
                        "url": link,
                        "source": source,
                        "type": "blog",
                        "keyword": keyword,
                        "search_rank": idx + 1
                    }
                    
                    blog_data.append(blog_post)
                    logger.debug(f"블로그 수집: {title[:50]}...")
                    
                except Exception as e:
                    logger.warning(f"블로그 아이템 처리 중 오류: {str(e)}")
                    continue
            
            logger.info(f"네이버 블로그 수집 완료: {len(blog_data)}개 포스트")
            return blog_data
            
        except Exception as e:
            logger.error(f"네이버 블로그 크롤링 오류: {str(e)}")
            return []

    def crawl_youtube_search(self, keyword):
        """유튜브 검색 결과 크롤링 - 관련도순, 최신 업로드"""
        try:
            logger.info(f"유튜브 크롤링 시작 (최신업로드, 관련도순): {keyword}")
            
            youtube_data = []
            # 유튜브 검색 URL - 관련도순, 이번 주 업로드
            search_url = f"https://www.youtube.com/results?search_query={keyword}&sp=EgQIBBAB"
            
            self.driver.get(search_url)
            time.sleep(3)  # 유튜브는 로딩이 좀 더 필요
            
            # 동의 버튼 클릭 (처음 방문시)
            try:
                accept_button = self.driver.find_element(By.CSS_SELECTOR, "button[aria-label*='모두 수락'], button[aria-label*='Accept all']")
                accept_button.click()
                time.sleep(2)
            except:
                pass
            
            # 스크롤을 통해 더 많은 비디오 로드
            self.driver.execute_script("window.scrollTo(0, 1000);")
            time.sleep(2)
            
            # 비디오 요소들 찾기
            video_items = self.driver.find_elements(By.CSS_SELECTOR, "div#contents ytd-video-renderer")
            
            logger.info(f"발견된 유튜브 비디오 수: {len(video_items)}")
            
            for idx, item in enumerate(video_items[:8]):  # 상위 8개
                try:
                    # 제목 추출
                    title_element = item.find_element(By.CSS_SELECTOR, "#video-title")
                    title = title_element.text.strip()
                    link = title_element.get_attribute("href")
                    
                    # 채널명 추출
                    try:
                        channel_element = item.find_element(By.CSS_SELECTOR, "#channel-info #text a")
                        channel = channel_element.text.strip()
                    except:
                        channel = ""
                    
                    # 조회수 추출
                    try:
                        views_element = item.find_element(By.CSS_SELECTOR, "#metadata-line span:first-child")
                        views = views_element.text.strip()
                    except:
                        views = ""
                    
                    # 업로드 시간 추출
                    try:
                        time_element = item.find_element(By.CSS_SELECTOR, "#metadata-line span:last-child")
                        upload_time = time_element.text.strip()
                    except:
                        upload_time = ""
                    
                    # 썸네일 URL 추출
                    try:
                        thumbnail_element = item.find_element(By.CSS_SELECTOR, "img")
                        thumbnail = thumbnail_element.get_attribute("src")
                    except:
                        thumbnail = ""
                    
                    if not title or len(title) < 3:
                        continue
                    
                    youtube_video = {
                        "title": title,
                        "url": link,
                        "channel": channel,
                        "views": views,
                        "upload_time": upload_time,
                        "thumbnail": thumbnail,
                        "type": "youtube",
                        "keyword": keyword,
                        "search_rank": idx + 1,
                        "date": upload_time  # 업로드 시간을 날짜로 사용
                    }
                    
                    youtube_data.append(youtube_video)
                    logger.debug(f"유튜브 비디오 수집: {title[:50]}...")
                    
                except Exception as e:
                    logger.warning(f"유튜브 비디오 처리 중 오류: {str(e)}")
                    continue
            
            logger.info(f"유튜브 비디오 수집 완료: {len(youtube_data)}개 비디오")
            return youtube_data
            
        except Exception as e:
            logger.error(f"유튜브 크롤링 오류: {str(e)}")
            return []

    def save_enhanced_data(self, data, keyword):
        """개선된 데이터를 JSON 파일로 저장"""
        try:
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            filename = f"{self.data_dir}/enhanced_news/{keyword}_enhanced_news_{timestamp}.json"
            
            with open(filename, 'w', encoding='utf-8') as f:
                json.dump(data, f, ensure_ascii=False, indent=2)
            
            logger.info(f"개선된 데이터 저장 완료: {filename} ({len(data)}개 항목)")
            return filename
            
        except Exception as e:
            logger.error(f"데이터 저장 오류: {str(e)}")
            return None

    def run_enhanced_crawl(self, keywords):
        """개선된 크롤링 실행"""
        try:
            if not self.create_webdriver():
                logger.error("웹드라이버 생성 실패")
                return False
            
            all_data = []
            total_keywords = len(keywords)
            
            for idx, keyword in enumerate(keywords, 1):
                print(f"\n🔍 [{idx}/{total_keywords}] 키워드: '{keyword}' 크롤링 중...")
                print(f"   📰 뉴스 수집 중 (최신7일, 관련도순)...")
                
                # 뉴스 크롤링
                news_data = self.crawl_enhanced_naver_news(keyword)
                
                print(f"   📝 블로그 수집 중 (최신7일, 관련도순)...")
                # 블로그 크롤링
                blog_data = self.crawl_naver_blog_search(keyword)
                
                print(f"   🎥 유튜브 수집 중 (최신업로드, 관련도순)...")
                # 유튜브 크롤링
                youtube_data = self.crawl_youtube_search(keyword)
                
                # 데이터 합치기
                combined_data = news_data + blog_data + youtube_data
                
                if combined_data:
                    # 키워드별 파일 저장
                    self.save_enhanced_data(combined_data, keyword)
                    all_data.extend(combined_data)
                    print(f"   ✅ 총 {len(combined_data)}개 항목 수집 완료 (뉴스: {len(news_data)}, 블로그: {len(blog_data)}, 유튜브: {len(youtube_data)})")
                else:
                    print(f"   ⚠️ 수집된 데이터 없음")
                
                # 요청 간 대기
                time.sleep(config.DELAY_BETWEEN_REQUESTS)
            
            # 전체 요약 저장
            if all_data:
                summary_file = f"{self.data_dir}/enhanced_crawl_summary_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
                with open(summary_file, 'w', encoding='utf-8') as f:
                    json.dump({
                        "total_items": len(all_data),
                        "keywords": keywords,
                        "crawl_time": datetime.now().isoformat(),
                        "summary": f"{len(all_data)}개 항목이 {len(keywords)}개 키워드로 수집됨"
                    }, f, ensure_ascii=False, indent=2)
            
            logger.info(f"전체 개선된 크롤링 완료: {len(all_data)}개 항목")
            return True
            
        except Exception as e:
            logger.error(f"개선된 크롤링 실행 오류: {str(e)}")
            return False
        finally:
            if self.driver:
                self.driver.quit()
                logger.info("웹드라이버 종료") 