"""
크롤링 데이터를 프론트엔드로 자동 동기화
크롤링 완료 후 최신 데이터를 frontend/public/data/enhanced_news/로 복사
"""

import os
import shutil
import json
import glob
from datetime import datetime
from loguru import logger
import config

class DataSyncManager:
    def __init__(self):
        """데이터 동기화 매니저 초기화"""
        self.source_dir = os.path.join(config.DATA_DIR, "enhanced_news")
        self.target_dir = os.path.join("../frontend/public/data/enhanced_news")
        self.setup_logging()
        
    def setup_logging(self):
        """로깅 설정"""
        log_file = f"{config.LOGS_DIR}/data_sync_{datetime.now().strftime('%Y%m%d')}.log"
        os.makedirs(config.LOGS_DIR, exist_ok=True)
        
        logger.add(
            log_file,
            format=config.LOG_FORMAT,
            level=config.LOG_LEVEL,
            rotation="1 day",
            retention="30 days"
        )
        
    def ensure_target_directory(self):
        """타겟 디렉토리 확인 및 생성"""
        try:
            os.makedirs(self.target_dir, exist_ok=True)
            logger.info(f"타겟 디렉토리 확인: {self.target_dir}")
            return True
        except Exception as e:
            logger.error(f"타겟 디렉토리 생성 실패: {str(e)}")
            return False

    def get_all_files(self):
        """모든 JSON 파일들 가져오기"""
        try:
            all_files = {}
            
            # 모든 JSON 파일 스캔
            pattern = os.path.join(self.source_dir, "*_enhanced_news_*.json")
            file_paths = glob.glob(pattern)
            
            for file_path in file_paths:
                filename = os.path.basename(file_path)
                all_files[filename] = {
                    'path': file_path,
                    'filename': filename
                }
            
            logger.info(f"전체 파일 {len(all_files)}개 선택")
            return all_files
            
        except Exception as e:
            logger.error(f"파일 선택 오류: {str(e)}")
            return {}

    def get_latest_files_by_keyword(self):
        """all_platforms 통합 파일만 가져오기 (중복 방지)"""
        try:
            latest_files = {}
            
            # all_platforms로 시작하는 통합 파일만 스캔
            pattern = os.path.join(self.source_dir, "all_platforms_enhanced_news_*.json")
            all_files = glob.glob(pattern)
            
            for file_path in all_files:
                filename = os.path.basename(file_path)
                
                # 키워드 추출 (파일명에서 _enhanced_news_ 이전 부분)
                if "_enhanced_news_" in filename:
                    keyword = filename.split("_enhanced_news_")[0]
                    timestamp = filename.split("_enhanced_news_")[1].replace(".json", "")
                    
                    # all_platforms 파일만 선택 (중복 방지)
                    if keyword == "all_platforms":
                        # 키워드별로 가장 최신 파일만 선택
                        if keyword not in latest_files or timestamp > latest_files[keyword]['timestamp']:
                            latest_files[keyword] = {
                                'path': file_path,
                                'timestamp': timestamp,
                                'filename': filename
                            }
            
            logger.info(f"통합 파일 {len(latest_files)}개 선택 (중복 방지)")
            return latest_files
            
        except Exception as e:
            logger.error(f"최신 파일 선택 오류: {str(e)}")
            return {}

    def sync_all_data(self):
        """최신 데이터만 프론트엔드로 동기화 (실제로는 키워드별 최신 파일만)"""
        try:
            print(f"[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] 🔄 최신 데이터 동기화 시작...")
            
            if not self.ensure_target_directory():
                return False
                
            # 기존 파일들 정리
            self.cleanup_old_files()
            
            # 키워드별 최신 파일들만 가져오기 (과거 데이터 제외)
            latest_files = self.get_latest_files_by_keyword()
            
            if not latest_files:
                logger.warning("동기화할 파일이 없습니다")
                return False
            
            # 파일 복사
            synced_count = 0
            synced_files = {}
            for keyword, file_info in latest_files.items():
                try:
                    source_path = file_info['path']
                    target_path = os.path.join(self.target_dir, file_info['filename'])
                    
                    # 파일 복사
                    shutil.copy2(source_path, target_path)
                    synced_count += 1
                    synced_files[file_info['filename']] = file_info
                    
                    logger.debug(f"동기화 완료: {keyword} -> {file_info['filename']}")
                    
                except Exception as e:
                    logger.error(f"파일 복사 오류 {keyword}: {str(e)}")
                    continue
            
            logger.info(f"최신 데이터 동기화 완료: {synced_count}개 파일")
            print(f"[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] ✅ 최신 데이터 동기화 완료: {synced_count}개 파일")
            
            # 동기화 결과 요약 생성
            self.create_latest_sync_summary(synced_files)
            
            return True
            
        except Exception as e:
            logger.error(f"최신 데이터 동기화 오류: {str(e)}")
            print(f"[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] ❌ 최신 데이터 동기화 오류: {str(e)}")
            return False

    def sync_latest_data(self):
        """최신 데이터만 프론트엔드로 동기화"""
        try:
            print(f"[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] 🔄 데이터 동기화 시작...")
            
            if not self.ensure_target_directory():
                return False
                
            # 기존 파일들 정리 (선택적)
            self.cleanup_old_files()
            
            # 키워드별 최신 파일들 가져오기
            latest_files = self.get_latest_files_by_keyword()
            
            if not latest_files:
                logger.warning("동기화할 파일이 없습니다")
                return False
            
            # 파일 복사
            synced_count = 0
            for keyword, file_info in latest_files.items():
                try:
                    source_path = file_info['path']
                    target_path = os.path.join(self.target_dir, file_info['filename'])
                    
                    # 파일 복사
                    shutil.copy2(source_path, target_path)
                    synced_count += 1
                    
                    logger.debug(f"동기화 완료: {keyword} -> {file_info['filename']}")
                    
                except Exception as e:
                    logger.error(f"파일 복사 오류 {keyword}: {str(e)}")
                    continue
            
            logger.info(f"데이터 동기화 완료: {synced_count}개 파일")
            print(f"[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] ✅ 데이터 동기화 완료: {synced_count}개 파일")
            
            # 동기화 결과 요약 생성
            self.create_sync_summary(latest_files)
            
            return True
            
        except Exception as e:
            logger.error(f"데이터 동기화 오류: {str(e)}")
            print(f"[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] ❌ 데이터 동기화 오류: {str(e)}")
            return False

    def cleanup_old_files(self, keep_days=7):
        """기존 파일들 정리"""
        try:
            # 타겟 디렉토리의 모든 JSON 파일 삭제 (sync_summary.json 제외)
            pattern = os.path.join(self.target_dir, "*_enhanced_news_*.json")
            existing_files = glob.glob(pattern)
            
            deleted_count = 0
            for file_path in existing_files:
                try:
                    os.remove(file_path)
                    deleted_count += 1
                    logger.debug(f"기존 파일 삭제: {os.path.basename(file_path)}")
                except Exception as e:
                    logger.warning(f"파일 삭제 실패 {file_path}: {str(e)}")
            
            if deleted_count > 0:
                logger.info(f"기존 파일 {deleted_count}개 정리 완료")
            
        except Exception as e:
            logger.warning(f"파일 정리 오류: {str(e)}")

    def create_latest_sync_summary(self, synced_files):
        """최신 데이터 동기화 요약 정보 생성"""
        try:
            # 실제 데이터에서 사용된 키워드 추출
            unique_keywords = set()
            
            # all_platforms 파일에서 실제 키워드 추출
            for filename in synced_files.keys():
                if "all_platforms" in filename:
                    try:
                        file_path = os.path.join(self.target_dir, filename)
                        with open(file_path, 'r', encoding='utf-8') as f:
                            data = json.load(f)
                            for item in data:
                                if 'keyword' in item:
                                    unique_keywords.add(item['keyword'])
                    except Exception as e:
                        logger.warning(f"키워드 추출 실패: {str(e)}")
            
            # 실제 검색 키워드 리스트 (정렬)
            actual_keywords = sorted(list(unique_keywords))
            
            summary = {
                "sync_time": datetime.now().isoformat(),
                "total_files": len(synced_files),
                "total_keywords": len(actual_keywords),  # 실제 키워드 수
                "keywords": actual_keywords,  # 실제 검색 키워드들
                "file_types": list(synced_files.keys()),  # 파일 타입들
                "files": {k: k for k in synced_files.keys()},
                "sync_type": "latest_only"
            }
            
            summary_path = os.path.join(self.target_dir, "sync_summary.json")
            with open(summary_path, 'w', encoding='utf-8') as f:
                json.dump(summary, f, ensure_ascii=False, indent=2)
                
            logger.info(f"최신 데이터 동기화 요약 생성: {summary_path} (실제 키워드 {len(actual_keywords)}개)")
            
        except Exception as e:
            logger.warning(f"최신 데이터 동기화 요약 생성 오류: {str(e)}")

    def create_all_sync_summary(self, synced_files):
        """전체 동기화 요약 정보 생성"""
        try:
            # 키워드 추출
            keywords = set()
            for filename in synced_files.keys():
                if "_enhanced_news_" in filename:
                    keyword = filename.split("_enhanced_news_")[0]
                    keywords.add(keyword)
            
            summary = {
                "sync_time": datetime.now().isoformat(),
                "total_files": len(synced_files),
                "keywords": list(keywords),
                "files": {k: v['filename'] for k, v in synced_files.items()},
                "sync_type": "all_files"
            }
            
            summary_path = os.path.join(self.target_dir, "sync_summary.json")
            with open(summary_path, 'w', encoding='utf-8') as f:
                json.dump(summary, f, ensure_ascii=False, indent=2)
                
            logger.info(f"전체 동기화 요약 생성: {summary_path}")
            
        except Exception as e:
            logger.warning(f"전체 동기화 요약 생성 오류: {str(e)}")

    def create_sync_summary(self, synced_files):
        """동기화 요약 정보 생성"""
        try:
            # 실제 데이터에서 사용된 키워드 추출
            unique_keywords = set()
            
            # all_platforms 파일에서 실제 키워드 추출
            for keyword, file_info in synced_files.items():
                if "all_platforms" in keyword:
                    try:
                        source_path = file_info['path']
                        with open(source_path, 'r', encoding='utf-8') as f:
                            data = json.load(f)
                            for item in data:
                                if 'keyword' in item:
                                    unique_keywords.add(item['keyword'])
                    except Exception as e:
                        logger.warning(f"키워드 추출 실패: {str(e)}")
            
            # 실제 검색 키워드 리스트 (정렬)
            actual_keywords = sorted(list(unique_keywords))
            
            summary = {
                "sync_time": datetime.now().isoformat(),
                "total_files": len(synced_files),
                "total_keywords": len(actual_keywords),  # 실제 키워드 수
                "keywords": actual_keywords,  # 실제 검색 키워드들
                "file_types": list(synced_files.keys()),  # 파일 타입들 
                "files": {k: v['filename'] for k, v in synced_files.items()},
                "sync_type": "latest_only"
            }
            
            summary_path = os.path.join(self.target_dir, "sync_summary.json")
            with open(summary_path, 'w', encoding='utf-8') as f:
                json.dump(summary, f, ensure_ascii=False, indent=2)
                
            logger.info(f"동기화 요약 생성: {summary_path} (실제 키워드 {len(actual_keywords)}개)")
            
        except Exception as e:
            logger.warning(f"동기화 요약 생성 오류: {str(e)}")

    def get_sync_status(self):
        """동기화 상태 확인"""
        try:
            summary_path = os.path.join(self.target_dir, "sync_summary.json")
            
            if os.path.exists(summary_path):
                with open(summary_path, 'r', encoding='utf-8') as f:
                    summary = json.load(f)
                return summary
            else:
                return {"error": "동기화 정보가 없습니다"}
                
        except Exception as e:
            return {"error": f"상태 확인 오류: {str(e)}"}

def sync_data_to_frontend():
    """메인 동기화 함수 (최신 파일만)"""
    sync_manager = DataSyncManager()
    return sync_manager.sync_latest_data()

def sync_all_data_to_frontend():
    """전체 데이터 동기화 함수"""
    sync_manager = DataSyncManager()
    return sync_manager.sync_all_data()

def check_sync_status():
    """동기화 상태 확인"""
    sync_manager = DataSyncManager()
    status = sync_manager.get_sync_status()
    
    print("📊 데이터 동기화 상태:")
    print("=" * 40)
    
    if "error" in status:
        print(f"❌ {status['error']}")
    else:
        print(f"🕐 마지막 동기화: {status.get('sync_time', '알 수 없음')}")
        print(f"📁 동기화된 파일 수: {status.get('total_files', 0)}개")
        print(f"🏷️ 키워드: {', '.join(status.get('keywords', []))}")
        print(f"📄 동기화 타입: {status.get('sync_type', '알 수 없음')}")

def main():
    """메인 실행 함수"""
    import sys
    
    if len(sys.argv) > 1:
        if sys.argv[1] == "--sync":
            print("🔄 최신 데이터 동기화를 시작합니다...")
            success = sync_data_to_frontend()
            if success:
                print("✅ 동기화 완료!")
            else:
                print("❌ 동기화 실패!")
        elif sys.argv[1] == "--sync-all":
            print("🔄 전체 데이터 동기화를 시작합니다...")
            success = sync_all_data_to_frontend()
            if success:
                print("✅ 전체 동기화 완료!")
            else:
                print("❌ 전체 동기화 실패!")
        elif sys.argv[1] == "--status":
            check_sync_status()
        else:
            print("사용법: python sync_to_frontend.py [--sync|--sync-all|--status]")
    else:
        print("논현동 정보 허브 - 데이터 동기화 도구")
        print("=" * 40)
        print("1. 최신 데이터 동기화 실행")
        print("2. 전체 데이터 동기화 실행")
        print("3. 동기화 상태 확인")
        print("4. 종료")
        
        choice = input("선택하세요 (1-4): ").strip()
        
        if choice == "1":
            print("🔄 최신 데이터 동기화를 시작합니다...")
            success = sync_data_to_frontend()
            if success:
                print("✅ 동기화 완료!")
            else:
                print("❌ 동기화 실패!")
        elif choice == "2":
            print("🔄 전체 데이터 동기화를 시작합니다...")
            success = sync_all_data_to_frontend()
            if success:
                print("✅ 전체 동기화 완료!")
            else:
                print("❌ 전체 동기화 실패!")
        elif choice == "3":
            check_sync_status()
        elif choice == "4":
            print("종료합니다.")
        else:
            print("잘못된 선택입니다.")

if __name__ == "__main__":
    main() 