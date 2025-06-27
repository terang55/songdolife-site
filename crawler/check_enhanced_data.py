"""
개선된 크롤링 데이터 확인 스크립트
"""

import json
import os
from datetime import datetime

def check_enhanced_data():
    """개선된 크롤링 데이터 확인"""
    print("=" * 80)
    print("🔍 개선된 크롤링 데이터 분석")
    print("=" * 80)
    
    enhanced_dir = "../data/enhanced_news"
    
    if not os.path.exists(enhanced_dir):
        print("❌ enhanced_news 디렉토리가 없습니다.")
        return
    
    files = [f for f in os.listdir(enhanced_dir) if f.endswith('.json')]
    
    if not files:
        print("❌ 수집된 데이터 파일이 없습니다.")
        return
    
    print(f"📁 발견된 파일 수: {len(files)}개")
    print()
    
    total_articles = 0
    
    for file in files:
        file_path = os.path.join(enhanced_dir, file)
        
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                data = json.load(f)
            
            print(f"📄 파일: {file}")
            print(f"   📊 기사 수: {len(data)}개")
            
            if data:
                total_articles += len(data)
                
                # 첫 번째 기사 정보 출력
                first_article = data[0]
                print(f"   📰 첫 번째 기사:")
                print(f"      제목: {first_article.get('title', '제목 없음')[:80]}...")
                print(f"      언론사: {first_article.get('press', '언론사 없음')}")
                print(f"      날짜: {first_article.get('date', '날짜 없음')}")
                print(f"      내용 길이: {first_article.get('content_length', 0)}자")
                print(f"      키워드: {first_article.get('keyword', '키워드 없음')}")
                print(f"      URL: {first_article.get('url', 'URL 없음')[:100]}...")
                
                # 내용 미리보기
                content = first_article.get('content', '')
                if content:
                    preview = content[:200] + "..." if len(content) > 200 else content
                    print(f"      내용 미리보기: {preview}")
                
                print()
                
        except Exception as e:
            print(f"❌ 파일 읽기 오류 ({file}): {str(e)}")
    
    print("=" * 80)
    print(f"📊 전체 요약:")
    print(f"   총 파일 수: {len(files)}개")
    print(f"   총 기사 수: {total_articles}개")
    print("=" * 80)

def check_summary():
    """크롤링 요약 파일 확인"""
    print("\n📋 크롤링 요약 확인:")
    
    data_dir = "../data"
    summary_files = [f for f in os.listdir(data_dir) if f.startswith('enhanced_crawl_summary') and f.endswith('.json')]
    
    if summary_files:
        latest_summary = sorted(summary_files)[-1]
        summary_path = os.path.join(data_dir, latest_summary)
        
        try:
            with open(summary_path, 'r', encoding='utf-8') as f:
                summary = json.load(f)
            
            print(f"📅 크롤링 시간: {summary.get('crawl_time', '시간 정보 없음')}")
            print(f"🔧 크롤러 타입: {summary.get('crawler_type', '타입 정보 없음')}")
            print(f"📊 총 수집 항목: {summary.get('total_items', 0)}개")
            print(f"📝 요약: {summary.get('summary', '요약 정보 없음')}")
            print("📈 키워드 목록:")
            
            keywords = summary.get('keywords', [])
            for i, keyword in enumerate(keywords, 1):
                print(f"   {i}. {keyword}")
                
        except Exception as e:
            print(f"❌ 요약 파일 읽기 오류: {str(e)}")
    else:
        print("❌ 크롤링 요약 파일을 찾을 수 없습니다.")

if __name__ == "__main__":
    check_enhanced_data()
    check_summary() 