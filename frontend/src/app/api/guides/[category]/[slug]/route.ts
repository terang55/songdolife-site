import { NextRequest, NextResponse } from 'next/server';
import { loadGuide } from '@/lib/server-markdown-loader';

// 가이드별 캐시 설정 (가이드는 자주 변경되지 않으므로 더 긴 캐시)
const GUIDE_CACHE_TTL = 4 * 60 * 60 * 1000; // 4시간
const guideCache = new Map<string, { data: any; timestamp: number; etag: string }>();

function getCachedGuide(key: string) {
  const cached = guideCache.get(key);
  if (cached && Date.now() - cached.timestamp < GUIDE_CACHE_TTL) {
    return cached;
  }
  guideCache.delete(key);
  return null;
}

function setCachedGuide(key: string, data: any) {
  const etag = `"${Date.now()}-${key.replace(/[^a-zA-Z0-9]/g, '')}"`;
  guideCache.set(key, { data, timestamp: Date.now(), etag });
  return etag;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ category: string; slug: string }> }
) {
  try {
    const { category, slug } = await params;
    const cacheKey = `guide_${category}_${slug}`;
    
    // ETag 지원을 위한 If-None-Match 헤더 확인
    const ifNoneMatch = request.headers.get('if-none-match');
    
    // 캐시된 데이터 확인
    const cachedResult = getCachedGuide(cacheKey);
    if (cachedResult) {
      // ETag가 일치하면 304 Not Modified 반환
      if (ifNoneMatch === cachedResult.etag) {
        return new NextResponse(null, { status: 304 });
      }
      
      return NextResponse.json({
        success: true,
        data: cachedResult.data,
        cached: true,
        timestamp: new Date().toISOString()
      }, {
        headers: {
          'Cache-Control': 'public, max-age=14400, stale-while-revalidate=86400', // 4시간
          'ETag': cachedResult.etag,
          'X-Cache-Status': 'HIT'
        }
      });
    }
    
    const guide = await loadGuide(category, slug);
    
    if (!guide) {
      return NextResponse.json(
        { success: false, error: 'Guide not found' },
        { status: 404 }
      );
    }
    
    // 캐시에 저장하고 ETag 생성
    const etag = setCachedGuide(cacheKey, guide);
    
    return NextResponse.json({
      success: true,
      data: guide,
      cached: false,
      timestamp: new Date().toISOString()
    }, {
      headers: {
        'Cache-Control': 'public, max-age=14400, stale-while-revalidate=86400',
        'ETag': etag,
        'X-Cache-Status': 'MISS'
      }
    });
  } catch (error) {
    console.error('가이드 API 오류:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal Server Error',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}