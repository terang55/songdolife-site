#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
송도라이프 정보 허브 - 고도화된 스케줄러
매일 정해진 시간에 크롤링을 자동 실행하고 Git에 업로드하는 스케줄러입니다.
"""

import os
import sys
import time
import schedule
import logging
import argparse
import subprocess
from datetime import datetime, timedelta
from pathlib import Path
import json
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

# 현재 스크립트 위치 기준으로 프로젝트 루트 설정
SCRIPT_DIR = Path(__file__).parent
PROJECT_ROOT = SCRIPT_DIR.parent
CRAWLER_DIR = SCRIPT_DIR

class SongdoScheduler:
    def __init__(self):
        self.setup_logging()
        self.config = self.load_config()
        self.last_run_file = CRAWLER_DIR / "last_run.json"
        
    def setup_logging(self):
        """로깅 설정"""
        log_dir = CRAWLER_DIR / "logs"
        log_dir.mkdir(exist_ok=True)
        
        today = datetime.now().strftime("%Y%m%d")
        log_file = log_dir / f"enhanced_scheduler_{today}.log"
        
        logging.basicConfig(
            level=logging.INFO,
            format='%(asctime)s - %(levelname)s - %(message)s',
            handlers=[
                logging.FileHandler(log_file, encoding='utf-8'),
                logging.StreamHandler(sys.stdout)
            ]
        )
        self.logger = logging.getLogger(__name__)
        
    def load_config(self):
        """설정 로드"""
        return {
            'schedule_times': ['06:00', '18:00'],  # 오전 6시, 오후 6시
            'max_retries': 3,
            'retry_delay_minutes': 30,
            'email_notifications': False,  # 이메일 알림 비활성화 (선택사항)
            'smtp_server': 'smtp.gmail.com',
            'smtp_port': 587,
            'email_user': '',  # 설정 필요
            'email_password': '',  # 설정 필요
            'notification_emails': []  # 알림 받을 이메일 목록
        }
    
    def save_last_run(self, success=True, error_msg=None):
        """마지막 실행 정보 저장"""
        run_info = {
            'timestamp': datetime.now().isoformat(),
            'success': success,
            'error': error_msg
        }
        
        try:
            with open(self.last_run_file, 'w', encoding='utf-8') as f:
                json.dump(run_info, f, ensure_ascii=False, indent=2)
        except Exception as e:
            self.logger.error(f"마지막 실행 정보 저장 실패: {e}")
    
    def get_last_run(self):
        """마지막 실행 정보 조회"""
        try:
            if self.last_run_file.exists():
                with open(self.last_run_file, 'r', encoding='utf-8') as f:
                    return json.load(f)
        except Exception as e:
            self.logger.error(f"마지막 실행 정보 조회 실패: {e}")
        return None
    
    def run_crawl_sync_push(self):
        """크롤링 + 동기화 + Git 푸시 실행"""
        self.logger.info("🚀 크롤링 작업 시작")
        
        try:
            # Windows 배치 파일 실행
            batch_file = CRAWLER_DIR / "crawl_sync_push.bat"
            
            if not batch_file.exists():
                raise FileNotFoundError(f"배치 파일을 찾을 수 없습니다: {batch_file}")
            
            # 배치 파일 실행
            result = subprocess.run(
                [str(batch_file)],
                cwd=str(CRAWLER_DIR),
                capture_output=True,
                text=True,
                encoding='utf-8'
            )
            
            if result.returncode == 0:
                self.logger.info("✅ 크롤링 작업 완료")
                self.save_last_run(success=True)
                return True
            else:
                error_msg = f"배치 파일 실행 실패 (코드: {result.returncode})\n{result.stderr}"
                self.logger.error(f"❌ {error_msg}")
                self.save_last_run(success=False, error_msg=error_msg)
                return False
                
        except Exception as e:
            error_msg = f"크롤링 실행 중 오류: {str(e)}"
            self.logger.error(f"❌ {error_msg}")
            self.save_last_run(success=False, error_msg=error_msg)
            return False
    
    def run_with_retry(self):
        """재시도 로직이 포함된 실행"""
        for attempt in range(self.config['max_retries']):
            self.logger.info(f"📋 시도 {attempt + 1}/{self.config['max_retries']}")
            
            if self.run_crawl_sync_push():
                return True
            
            if attempt < self.config['max_retries'] - 1:
                wait_minutes = self.config['retry_delay_minutes']
                self.logger.info(f"⏰ {wait_minutes}분 후 재시도...")
                time.sleep(wait_minutes * 60)
        
        # 모든 시도 실패
        error_msg = f"{self.config['max_retries']}번 시도 후 모두 실패"
        self.logger.error(f"❌ {error_msg}")
        self.send_failure_notification(error_msg)
        return False
    
    def send_failure_notification(self, error_msg):
        """실패 알림 전송 (이메일)"""
        if not self.config['email_notifications'] or not self.config['notification_emails']:
            return
        
        try:
            msg = MIMEMultipart()
            msg['From'] = self.config['email_user']
            msg['To'] = ', '.join(self.config['notification_emails'])
            msg['Subject'] = '🚨 송도라이프 크롤링 실패 알림'
            
            body = f"""
크롤링 작업이 실패했습니다.

실패 시간: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
오류 내용: {error_msg}

시스템을 확인해주세요.
            """
            
            msg.attach(MIMEText(body, 'plain', 'utf-8'))
            
            server = smtplib.SMTP(self.config['smtp_server'], self.config['smtp_port'])
            server.starttls()
            server.login(self.config['email_user'], self.config['email_password'])
            server.send_message(msg)
            server.quit()
            
            self.logger.info("📧 실패 알림 이메일 전송 완료")
            
        except Exception as e:
            self.logger.error(f"이메일 전송 실패: {e}")
    
    def schedule_jobs(self):
        """스케줄 작업 등록"""
        for time_str in self.config['schedule_times']:
            schedule.every().day.at(time_str).do(self.run_with_retry)
            self.logger.info(f"📅 스케줄 등록: 매일 {time_str}")
    
    def run_daemon(self):
        """데몬 모드로 실행"""
        self.logger.info("🤖 스케줄러 데몬 모드 시작")
        self.schedule_jobs()
        
        try:
            while True:
                schedule.run_pending()
                time.sleep(60)  # 1분마다 체크
                
        except KeyboardInterrupt:
            self.logger.info("🛑 스케줄러 중지됨")
        except Exception as e:
            self.logger.error(f"스케줄러 오류: {e}")
    
    def run_now(self):
        """즉시 실행"""
        self.logger.info("🚀 즉시 크롤링 실행")
        return self.run_with_retry()
    
    def show_status(self):
        """상태 정보 출력"""
        print("\n" + "="*50)
        print("📊 송도라이프 스케줄러 상태")
        print("="*50)
        
        # 마지막 실행 정보
        last_run = self.get_last_run()
        if last_run:
            status = "✅ 성공" if last_run['success'] else "❌ 실패"
            print(f"마지막 실행: {last_run['timestamp']}")
            print(f"실행 결과: {status}")
            if not last_run['success'] and last_run.get('error'):
                print(f"오류 내용: {last_run['error']}")
        else:
            print("마지막 실행: 기록 없음")
        
        # 다음 실행 예정
        next_runs = []
        for time_str in self.config['schedule_times']:
            next_run = datetime.now().replace(
                hour=int(time_str.split(':')[0]),
                minute=int(time_str.split(':')[1]),
                second=0,
                microsecond=0
            )
            if next_run <= datetime.now():
                next_run += timedelta(days=1)
            next_runs.append(next_run)
        
        next_runs.sort()
        print(f"다음 실행 예정: {next_runs[0].strftime('%Y-%m-%d %H:%M:%S')}")
        
        # 설정 정보
        print(f"실행 시간: {', '.join(self.config['schedule_times'])}")
        print(f"최대 재시도: {self.config['max_retries']}회")
        print(f"재시도 간격: {self.config['retry_delay_minutes']}분")
        
        print("="*50 + "\n")
    
    def interactive_menu(self):
        """대화형 메뉴"""
        while True:
            print("\n" + "="*40)
            print("🤖 송도라이프 스케줄러")
            print("="*40)
            print("1. 즉시 크롤링 실행")
            print("2. 데몬 모드 시작")
            print("3. 상태 확인")
            print("4. 설정 보기")
            print("0. 종료")
            print("-"*40)
            
            try:
                choice = input("선택하세요 (0-4): ").strip()
                
                if choice == '1':
                    print("\n🚀 즉시 크롤링을 시작합니다...")
                    success = self.run_now()
                    if success:
                        print("✅ 크롤링 완료!")
                    else:
                        print("❌ 크롤링 실패. 로그를 확인하세요.")
                
                elif choice == '2':
                    print("\n🤖 데몬 모드를 시작합니다...")
                    print("중지하려면 Ctrl+C를 누르세요.")
                    self.run_daemon()
                
                elif choice == '3':
                    self.show_status()
                
                elif choice == '4':
                    print("\n📋 현재 설정:")
                    for key, value in self.config.items():
                        if 'password' not in key.lower():
                            print(f"  {key}: {value}")
                
                elif choice == '0':
                    print("👋 종료합니다.")
                    break
                
                else:
                    print("❌ 잘못된 선택입니다.")
                    
            except KeyboardInterrupt:
                print("\n👋 종료합니다.")
                break
            except Exception as e:
                print(f"❌ 오류: {e}")

def main():
    parser = argparse.ArgumentParser(description='송도라이프 정보 허브 스케줄러')
    parser.add_argument('--daemon', action='store_true', help='데몬 모드로 실행')
    parser.add_argument('--now', action='store_true', help='즉시 크롤링 실행')
    parser.add_argument('--status', action='store_true', help='상태 확인')
    
    args = parser.parse_args()
    
    scheduler = SongdoScheduler()
    
    if args.daemon:
        scheduler.run_daemon()
    elif args.now:
        success = scheduler.run_now()
        sys.exit(0 if success else 1)
    elif args.status:
        scheduler.show_status()
    else:
        scheduler.interactive_menu()

if __name__ == "__main__":
    main()