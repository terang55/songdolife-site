import { NextRequest, NextResponse } from 'next/server';
import { getAllGuides, getGuidesByCategory, getFeaturedGuides } from '@/lib/server-markdown-loader';
import { withCache, createCacheKey } from '@/lib/api-cache';
import { 
  createSuccessResponse, 
  createInternalError, 
  createValidationError,
  createPaginationMeta 
} from '@/lib/api-response';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');
    const featured = searchParams.get('featured') === 'true';
    const limitParam = searchParams.get('limit');
    const offsetParam = searchParams.get('offset');
    
    // 파라미터 검증 및 변환
    const limit = limitParam ? parseInt(limitParam) : 50;
    const offset = offsetParam ? parseInt(offsetParam) : 0;
    
    if (limit < 1 || limit > 100) {
      return createValidationError('limit은 1-100 범위여야 합니다.');
    }
    
    if (offset < 0) {
      return createValidationError('offset은 0 이상이어야 합니다.');
    }

    // 캐시 키 생성
    const cacheKey = createCacheKey('guides', {
      category: category || null,
      featured: featured.toString(),
      limit: limit.toString(),
      offset: offset.toString()
    });

    // 캐시된 데이터 사용 (120분 캐시)
    return await withCache(cacheKey, async () => {
      return await fetchGuidesData(category, featured, limit, offset);
    }, 120);

  } catch (error) {
    console.error('가이드 API 오류:', error);
    return createInternalError(error as Error, '가이드 데이터 조회');
  }
}

async function fetchGuidesData(
  category: string | null,
  featured: boolean,
  limit: number,
  offset: number
): Promise<NextResponse> {
  let guides;
  
  if (featured) {
    guides = await getFeaturedGuides();
  } else if (category) {
    guides = await getGuidesByCategory(category);
  } else {
    guides = await getAllGuides();
  }

  // 페이지네이션 적용
  const totalCount = guides.length;
  const paginatedGuides = guides.slice(offset, offset + limit);

  // 페이지네이션 메타데이터 생성
  const page = Math.floor(offset / limit) + 1;
  const paginationMeta = createPaginationMeta(totalCount, page, limit);

  return createSuccessResponse(paginatedGuides, {
    total: totalCount,
    page,
    limit,
    meta: {
      ...paginationMeta,
      offset,
      hasMore: offset + limit < totalCount,
      filters: {
        category: category || null,
        featured
      }
    }
  });
}