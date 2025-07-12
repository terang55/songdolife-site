import { NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import { join } from 'path';

export async function GET() {
  try {
    // sync_summary.json 파일 읽기
    const summaryPath = join(process.cwd(), 'public', 'data', 'enhanced_news', 'sync_summary.json');
    
    try {
      const summaryContent = readFileSync(summaryPath, 'utf-8');
      const syncData = JSON.parse(summaryContent);
      
      return NextResponse.json({
        success: true,
        data: {
          lastSync: syncData.sync_time || null,
          totalFiles: syncData.total_files || 0,
          keywords: syncData.keywords || [],
          files: syncData.files || {},
          status: 'synced'
        },
        timestamp: new Date().toISOString()
      });
      
    } catch {
      // sync_summary.json이 없는 경우
      return NextResponse.json({
        success: true,
        data: {
          lastSync: null,
          totalFiles: 0,
          keywords: [],
          files: {},
          status: 'never_synced'
        },
        timestamp: new Date().toISOString()
      });
    }
    
  } catch (error) {
    console.error('Error in sync API:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Failed to check sync status',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
} 