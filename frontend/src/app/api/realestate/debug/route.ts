import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { createRealEstateLogger } from '@/lib/logger';

const logger = createRealEstateLogger();

// 날짜 함수들
function getTodayDateString(): string {
  const today = new Date();
  return today.getFullYear() + '-' + 
         String(today.getMonth() + 1).padStart(2, '0') + '-' + 
         String(today.getDate()).padStart(2, '0');
}

function getYesterdayDateString(): string {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return yesterday.getFullYear() + '-' + 
         String(yesterday.getMonth() + 1).padStart(2, '0') + '-' + 
         String(yesterday.getDate()).padStart(2, '0');
}

// 파일 접근 테스트 함수
async function testFileAccess(date: string): Promise<{
  date: string;
  url: string;
  accessible: boolean;
  status?: number;
  statusText?: string;
  fileSize?: number;
  totalCount?: number;
  error?: string;
}> {
  // 서버사이드에서는 절대 URL 필요
  const baseUrl = process.env.NODE_ENV === 'development' 
    ? 'http://localhost:3001' 
    : `https://${process.env.VERCEL_URL || 'songdolife.vercel.app'}`;
  const fileUrl = `${baseUrl}/data/realestate_${date}.json`;
  
  const result = {
    date,
    url: fileUrl,
    accessible: false
  };

  try {
    const response = await fetch(fileUrl);
    
    if (response.ok) {
      const data = await response.json();
      return {
        ...result,
        accessible: true,
        status: response.status,
        statusText: response.statusText,
        fileSize: JSON.stringify(data).length,
        totalCount: data.total_count || 0
      };
    } else {
      return {
        ...result,
        accessible: false,
        status: response.status,
        statusText: response.statusText
      };
    }
  } catch (error) {
    return {
      ...result,
      accessible: false,
      error: error instanceof Error ? error.message : String(error)
    };
  }
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const todayDate = getTodayDateString();
    const yesterdayDate = getYesterdayDateString();
    
    logger.info('부동산 디버그 정보 수집 시작');
    
    // 환경 정보
    const environment = {
      NODE_ENV: process.env.NODE_ENV,
      VERCEL_URL: process.env.VERCEL_URL,
      VERCEL_ENV: process.env.VERCEL_ENV,
      isServer: typeof window === 'undefined',
      currentTime: new Date().toISOString(),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    };
    
    // 날짜 정보
    const dateInfo = {
      today: todayDate,
      yesterday: yesterdayDate,
      serverTime: new Date().toISOString(),
      serverTimezone: new Date().getTimezoneOffset()
    };
    
    // 파일 접근 테스트
    const [todayFileTest, yesterdayFileTest] = await Promise.all([
      testFileAccess(todayDate),
      testFileAccess(yesterdayDate)
    ]);
    
    // 개발 환경에서 로컬 파일 시스템 테스트
    let localFileTest = null;
    if (process.env.NODE_ENV === 'development') {
      try {
        const fs = await import('fs/promises');
        const path = await import('path');
        
        const todayPath = path.join(process.cwd(), 'public', 'data', `realestate_${todayDate}.json`);
        const yesterdayPath = path.join(process.cwd(), 'public', 'data', `realestate_${yesterdayDate}.json`);
        
        const [todayExists, yesterdayExists] = await Promise.all([
          fs.access(todayPath).then(() => true).catch(() => false),
          fs.access(yesterdayPath).then(() => true).catch(() => false)
        ]);
        
        localFileTest = {
          todayPath,
          yesterdayPath,
          todayExists,
          yesterdayExists
        };
      } catch (error) {
        localFileTest = {
          error: error instanceof Error ? error.message : String(error)
        };
      }
    }
    
    const debugInfo = {
      success: true,
      environment,
      dateInfo,
      fileTests: {
        today: todayFileTest,
        yesterday: yesterdayFileTest
      },
      localFileTest,
      recommendations: []
    };
    
    // 문제 진단 및 권장사항
    if (!todayFileTest.accessible && !yesterdayFileTest.accessible) {
      debugInfo.recommendations.push('❌ 어제와 오늘 파일 모두 접근 불가 - GitHub Actions 실행 확인 필요');
    } else if (!yesterdayFileTest.accessible) {
      debugInfo.recommendations.push('⚠️ 어제 파일 없음 - 오늘 모든 거래가 신규로 표시됨');
    } else if (!todayFileTest.accessible) {
      debugInfo.recommendations.push('⚠️ 오늘 파일 없음 - 신규 거래 0건으로 표시됨');
    } else {
      debugInfo.recommendations.push('✅ 어제와 오늘 파일 모두 정상 접근 가능');
    }
    
    return NextResponse.json(debugInfo);
    
  } catch (error) {
    logger.error('디버그 정보 수집 실패:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : String(error),
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}