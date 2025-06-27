"""
논현동 정보 허브 - 개선된 크롤러
실제 뉴스 기사로 이동해서 고품질 데이터를 수집하는 크롤러
"""

import os
import json
import time
import requests
import urllib.parse
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
        """실제 뉴스 기사 URL에서 상세 내용 추출 - 현재 사용하지 않음"""
        # 네이버 뉴스 검색 페이지에서 바로 요약을 사용하므로 이 메서드는 비활성화
        return ""

    def crawl_enhanced_naver_news(self, keyword):
        """개선된 네이버 뉴스 크롤링 - 네이버 뉴스 본 페이지에서 직접 수집"""
        try:
            logger.info(f"네이버 뉴스 본 페이지에서 직접 크롤링 시작: {keyword}")
            
            news_data = []
            
            # 네이버 뉴스 검색으로만 수집
            search_news = self._crawl_naver_news_search(keyword)
            news_data.extend(search_news)
            
            # 중복 제거 및 최종 정리
            unique_news = []
            seen_urls = set()
            
            for article in news_data:
                if article['url'] not in seen_urls:
                    unique_news.append(article)
                    seen_urls.add(article['url'])
            
            news_data = unique_news[:5]  # 최대 5개 뉴스만 유지
            
            logger.info(f"네이버 뉴스 직접 수집 완료: {len(news_data)}개 기사")
            return news_data
            
        except Exception as e:
            logger.error(f"네이버 뉴스 직접 크롤링 오류: {str(e)}")
            return []



    def _crawl_naver_news_search(self, keyword):
        """네이버 뉴스 검색 크롤링 - 실제 구조에 맞게 개선"""
        try:
            logger.debug(f"네이버 뉴스 검색으로 '{keyword}' 수집 중...")
            
            # 네이버 뉴스 검색 (관련도순, 1주일) - URL 인코딩 추가
            encoded_keyword = urllib.parse.quote(keyword)
            search_url = f"https://search.naver.com/search.naver?ssc=tab.news.all&query={encoded_keyword}&sm=tab_opt&sort=0&photo=0&field=0&pd=1&ds=&de=&docid=&related=0&mynews=0&office_type=0&office_section_code=0&news_office_checked=&nso=so%3Ar%2Cp%3A1w&is_sug_officeid=0&office_category=0&service_area=0"
            
            logger.debug(f"검색 URL: {search_url}")
            self.driver.get(search_url)
            time.sleep(config.DELAY_BETWEEN_REQUESTS)
            
            news_data = []
            
            # 네이버 뉴스 검색 결과 컨테이너 - 사용자 제공 구조에 맞게 수정
            news_containers = self.driver.find_elements(By.CSS_SELECTOR, "div.sds-comps-vertical-layout.sds-comps-full-layout.I6obO60yNcW8I32mDzvQ")
            
            logger.debug(f"네이버 뉴스 컨테이너 발견: {len(news_containers)}개")
            
            # 상위 5개만 선택
            for idx, container in enumerate(news_containers[:5]):
                try:
                    # 제목 링크 추출 - 사용자 제공 구조에 맞게 개선
                    title_link_element = container.find_element(By.CSS_SELECTOR, "a.rzROnhjF0RNNRoyDaO81.W035WwZVZIWyuG66e5iI")
                    title_span = title_link_element.find_element(By.CSS_SELECTOR, "span.sds-comps-text.sds-comps-text-ellipsis.sds-comps-text-ellipsis-1.sds-comps-text-type-headline1")
                    
                    # 제목 텍스트 추출 (mark 태그 제거)
                    title_html = title_span.get_attribute('innerHTML')
                    title = BeautifulSoup(title_html, 'html.parser').get_text(strip=True)
                    
                    # URL 추출
                    link = title_link_element.get_attribute("href")
                    
                    if not title or not link:
                        logger.debug(f"뉴스 {idx+1}: 제목 또는 링크 없음")
                        continue
                    
                    # 유효한 뉴스 URL인지 확인
                    if not self._is_valid_news_url_enhanced(link):
                        logger.debug(f"유효하지 않은 뉴스 URL: {link}")
                        continue
                    
                    # 광고성 콘텐츠 필터링
                    if self._is_ad_content(title):
                        logger.debug(f"광고성 콘텐츠 제외: {title[:30]}...")
                        continue
                    
                    # 요약문 추출 - 사용자 제공 구조에 맞게 개선
                    summary = ""
                    try:
                        summary_link_element = container.find_element(By.CSS_SELECTOR, "a.rzROnhjF0RNNRoyDaO81.ti6bfMWvbomDA5J1fNOX")
                        summary_span = summary_link_element.find_element(By.CSS_SELECTOR, "span.sds-comps-text.sds-comps-text-ellipsis.sds-comps-text-ellipsis-3.sds-comps-text-type-body1")
                        
                        # 요약문 텍스트 추출 (mark 태그 제거)
                        summary_html = summary_span.get_attribute('innerHTML')
                        summary = BeautifulSoup(summary_html, 'html.parser').get_text(strip=True)
                        
                        # 요약문이 너무 긴 경우 첫 200자로 제한
                        if len(summary) > 200:
                            summary = summary[:200] + "..."
                            
                    except NoSuchElementException:
                        logger.debug(f"뉴스 {idx+1}: 요약문 없음")
                        summary = ""
                    
                    # 날짜 정보 추출 - 새로운 기능 추가
                    date_info = ""
                    try:
                        # 프로필 정보 영역에서 날짜 정보 찾기 (더 구체적인 위치)
                        date_element = container.find_element(By.CSS_SELECTOR, ".sds-comps-profile-info-subtext span.sds-comps-text.sds-comps-text-type-body2.sds-comps-text-weight-sm")
                        date_text = date_element.text.strip()
                        
                        # "4일 전", "1시간 전" 등의 상대 시간을 실제 날짜로 변환
                        if "일 전" in date_text:
                            days_ago = int(date_text.replace("일 전", "").strip())
                            target_date = datetime.now() - timedelta(days=days_ago)
                            date_info = target_date.strftime("%Y-%m-%d")
                        elif "시간 전" in date_text:
                            hours_ago = int(date_text.replace("시간 전", "").strip())
                            target_date = datetime.now() - timedelta(hours=hours_ago)
                            date_info = target_date.strftime("%Y-%m-%d")
                        elif "분 전" in date_text:
                            # 분 전은 오늘 날짜로 처리
                            date_info = datetime.now().strftime("%Y-%m-%d")
                        else:
                            # 다른 형식의 날짜는 원본 텍스트 사용
                            date_info = date_text
                            
                    except NoSuchElementException:
                        logger.debug(f"뉴스 {idx+1}: 날짜 정보 없음")
                        date_info = datetime.now().strftime("%Y-%m-%d")
                    except Exception as e:
                        logger.debug(f"뉴스 {idx+1}: 날짜 처리 오류 - {str(e)}")
                        date_info = datetime.now().strftime("%Y-%m-%d")
                    
                    # 언론사 정보 추출 시도
                    press = ""
                    try:
                        # 먼저 HTML에서 언론사 정보 직접 추출 시도
                        try:
                            press_element = container.find_element(By.CSS_SELECTOR, "a.rzROnhjF0RNNRoyDaO81.iIKbAB3hQq_YoGhlYc24 span")
                            press = press_element.text.strip()
                        except NoSuchElementException:
                            pass
                        
                        # 언론사 정보가 없으면 URL에서 도메인 추출
                        if not press:
                            from urllib.parse import urlparse
                            parsed_url = urlparse(link)
                            domain = parsed_url.netloc
                            
                            # 주요 언론사 도메인 매핑 - 인천 지역 언론사 포함 확장
                            press_mapping = {
                                'sedaily.com': '서울경제',
                                'kyeongin.com': '경인일보',
                                'asiatime.co.kr': '아시아타임',
                                'm-i.kr': '매일일보',
                                'incheonilbo.com': '인천일보',
                                'incheonnews.com': '인천뉴스',
                                'incheonin.com': '인천인',
                                'joongdo.co.kr': '중도일보',
                                'newsis.com': '뉴시스',
                                'yonhapnews.co.kr': '연합뉴스',
                                'joongang.co.kr': '중앙일보',
                                'donga.com': '동아일보',
                                'chosun.com': '조선일보',
                                'hani.co.kr': '한겨레',
                                'khan.co.kr': '경향신문',
                                'mt.co.kr': '머니투데이',
                                'etnews.com': '전자신문',
                                'news1.kr': '뉴스1',
                                'nocutnews.co.kr': '노컷뉴스',
                                'ohmynews.com': '오마이뉴스',
                                'breaknews.com': '브레이크뉴스'
                            }
                            
                            for domain_key, press_name in press_mapping.items():
                                if domain_key in domain:
                                    press = press_name
                                    break
                                    
                            if not press:
                                press = domain
                            
                    except Exception:
                        press = ""
                    
                    # 뉴스 데이터 구성
                    news_data.append({
                        "title": title,
                        "url": link,
                        "content": summary,
                        "summary": summary,
                        "press": press,
                        "date": date_info,  # 실제 추출된 날짜 정보 사용 (YYYY-MM-DD 형식)
                        "crawled_at": datetime.now().strftime("%Y-%m-%d"),  # 시간 제거하고 날짜만
                        "content_length": len(summary),
                        "keyword": keyword,
                        "section": "검색 결과",
                        "type": "news"
                    })
                    
                    logger.debug(f"뉴스 {idx+1} 수집 성공: {title[:30]}... ({press})")
                    
                except Exception as e:
                    logger.debug(f"뉴스 아이템 {idx+1} 처리 중 오류: {str(e)}")
                    continue
            
            logger.info(f"네이버 뉴스 검색으로 {len(news_data)}개 수집 완료")
            return news_data
            
        except Exception as e:
            logger.warning(f"네이버 뉴스 검색 중 오류: {str(e)}")
            return []

    def _is_valid_news_url_enhanced(self, url):
        """강화된 뉴스 URL 유효성 검사 - 더 포용적으로 수정"""
        if not url:
            return False
        
        # 제외할 패턴만 확인 (광고, 프로모션 등)
        invalid_patterns = [
            "static/channelPromotion",
            "mkt.naver.com",
            "promotion",
            "ad.naver.com",
            "shopping.naver.com",
            "channelPromotion.html",
            "atrb?channel_id"
        ]
        
        # 기본적으로 http/https로 시작하는 URL이고 제외 패턴이 없으면 유효
        has_invalid_pattern = any(pattern in url for pattern in invalid_patterns)
        is_web_url = url.startswith(('http://', 'https://'))
        
        return is_web_url and not has_invalid_pattern

    def _is_ad_content(self, title):
        """광고성 콘텐츠 판별"""
        ad_keywords = [
            "언론사 선정",
            "언론사가 선정한",
            "네이버 메인에서", 
            "구독하세요",
            "클립 크리에이터",
            "피드형 콘텐츠",
            "창작자도 지원",
            "Ready, Set, Clip",
            "주요기사 혹은 심층기획"
        ]
        
        return any(keyword in title for keyword in ad_keywords)

    def crawl_naver_blog_search(self, keyword):
        """네이버 블로그 검색 결과 크롤링 - 관련도순, 최신 7일"""
        try:
            logger.info(f"네이버 블로그 크롤링 시작 (최신7일, 관련도순): {keyword}")
            
            blog_data = []
            # 관련도순, 최신 1주일 필터 - 사용자 제공 URL 구조 사용
            encoded_keyword = urllib.parse.quote(keyword)
            search_url = f"https://search.naver.com/search.naver?ssc=tab.blog.all&sm=tab_jum&query={encoded_keyword}&nso=so%3Ar%2Cp%3A1w"
            
            self.driver.get(search_url)
            time.sleep(config.DELAY_BETWEEN_REQUESTS)
            
            # 블로그 포스트 요소들 찾기 - 사용자 제공 구조에 맞게 수정  
            blog_containers = self.driver.find_elements(By.CSS_SELECTOR, "div.view_wrap")
            
            logger.info(f"발견된 블로그 컨테이너 수: {len(blog_containers)}")
            
            for idx, container in enumerate(blog_containers[:5]):  # 최신 5개만
                try:
                    # 제목과 링크 추출 - 사용자 제공 구조에 맞게 수정
                    title_element = container.find_element(By.CSS_SELECTOR, ".detail_box .title_area a.title_link")
                    title = title_element.text.strip()
                    # mark 태그 제거
                    title = BeautifulSoup(title_element.get_attribute('innerHTML'), 'html.parser').get_text(strip=True)
                    link = title_element.get_attribute("href")
                    
                    # 내용 추출
                    try:
                        content_element = container.find_element(By.CSS_SELECTOR, ".detail_box .dsc_area a.dsc_link")
                        content_html = content_element.get_attribute('innerHTML')
                        # mark 태그 제거
                        content = BeautifulSoup(content_html, 'html.parser').get_text(strip=True)
                    except:
                        content = ""
                    
                    # 블로그명 추출 - 사용자 제공 구조에서 추출
                    try:
                        blog_name_element = container.find_element(By.CSS_SELECTOR, ".user_box_inner .user_info a.name")
                        source = blog_name_element.text.strip()
                    except:
                        source = "네이버 블로그"
                    
                    # 날짜 정보 추출 - 새로운 기능 추가
                    date_info = ""
                    try:
                        date_element = container.find_element(By.CSS_SELECTOR, ".user_box_inner .user_info span.sub")
                        date_text = date_element.text.strip()
                        
                        # "X일 전" 형식을 실제 날짜로 변환
                        if "일 전" in date_text:
                            days_ago = int(date_text.replace("일 전", "").strip())
                            actual_date = datetime.now() - timedelta(days=days_ago)
                            date_info = actual_date.strftime("%Y-%m-%d")
                        elif "시간 전" in date_text:
                            # 시간 전인 경우 오늘 날짜
                            date_info = datetime.now().strftime("%Y-%m-%d")
                        else:
                            # 기타 경우 오늘 날짜로 설정
                            date_info = datetime.now().strftime("%Y-%m-%d")
                    except Exception as date_error:
                        logger.debug(f"블로그 날짜 추출 실패: {str(date_error)}")
                        date_info = datetime.now().strftime("%Y-%m-%d")
                    
                    if not title or len(title) < 5:
                        continue
                    
                    # 광고성 콘텐츠 강화 필터링
                    ad_keywords = [
                        "언론사 선정",
                        "클립 크리에이터",
                        "피드형 콘텐츠", 
                        "창작자도 지원",
                        "네이버 클립",
                        "Ready, Set, Clip",
                        "신청 기간",
                        "크리에이터라면"
                    ]
                    
                    if any(ad_word in title for ad_word in ad_keywords):
                        logger.debug(f"광고성 블로그 제외: {title[:50]}...")
                        continue
                        
                    # URL 패턴 필터링 강화
                    excluded_urls = [
                        "mkt.naver.com",
                        "news.naver.com/main/static/",
                        "channelPromotion.html",
                        "atrb?channel_id"
                    ]
                    
                    if any(excluded_url in link for excluded_url in excluded_urls):
                        logger.debug(f"광고 URL 제외: {link}")
                        continue
                        
                    # 제목 길이 체크
                    if len(title) < 8:
                        logger.debug(f"블로그 제목 너무 짧음: {title}")
                        continue
                    
                    blog_post = {
                        "title": title,
                        "content": content,
                        "date": date_info,  # 실제 날짜 정보 사용
                        "url": link,
                        "source": source,
                        "type": "blog",
                        "keyword": keyword,
                        "search_rank": idx + 1,
                        "crawled_at": datetime.now().strftime("%Y-%m-%d"),  # 시간 제거하고 날짜만
                        "press": source,  # 통일성을 위해 press 필드도 추가
                        "summary": content
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
            
            # 크롤링 완료 후 자동으로 프론트엔드에 동기화
            self.sync_to_frontend()
            
            return True
            
        except Exception as e:
            logger.error(f"개선된 크롤링 실행 오류: {str(e)}")
            return False
        finally:
            if self.driver:
                self.driver.quit()
                logger.info("웹드라이버 종료")
    
    def sync_to_frontend(self):
        """크롤링 완료 후 프론트엔드로 데이터 동기화"""
        try:
            print(f"\n🔄 프론트엔드 데이터 동기화 시작...")
            
            # sync_to_frontend 모듈 임포트
            from sync_to_frontend import sync_data_to_frontend
            
            # 동기화 실행
            success = sync_data_to_frontend()
            
            if success:
                print("✅ 프론트엔드 동기화 완료!")
                logger.info("프론트엔드 데이터 동기화 성공")
            else:
                print("❌ 프론트엔드 동기화 실패!")
                logger.warning("프론트엔드 데이터 동기화 실패")
                
        except Exception as e:
            print(f"❌ 동기화 중 오류 발생: {str(e)}")
            logger.error(f"프론트엔드 동기화 오류: {str(e)}") 