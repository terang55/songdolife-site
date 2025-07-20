import { NextRequest, NextResponse } from 'next/server';
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import { createNewsLogger } from '@/lib/logger';
import { withCache, createCacheKey } from '@/lib/api-cache';
import { 
  createSuccessResponse, 
  createInternalError, 
  createValidationError,
  createPaginationMeta 
} from '@/lib/api-response';

const logger = createNewsLogger();

interface NewsItem {
  title: string;
  content: string;
  source: string;
  date: string;
  url: string;
  keyword: string;
  content_length: number;
  type?: string; // 'news', 'blog', 'youtube'
  // 유튜브 전용 필드들
  channel?: string;
  views?: string;
  upload_time?: string;
  thumbnail?: string;
}

export async function GET(request: NextRequest) {
  try {
    // URL 파라미터 처리 및 검증
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const limit = parseInt(searchParams.get('limit') || '50');
    const page = parseInt(searchParams.get('page') || '1');

    // 파라미터 검증
    if (limit > 100 || limit < 1) {
      return createValidationError('limit은 1-100 범위여야 합니다.');
    }
    
    if (page < 1) {
      return createValidationError('page는 1 이상이어야 합니다.');
    }

    // 캐시 키 생성
    const cacheKey = createCacheKey('news', {
      category,
      search,
      limit: limit.toString(),
      page: page.toString()
    });

    // 캐시된 데이터 사용
    return await withCache(cacheKey, async () => {
      return await fetchNewsData(category, search, limit, page);
    }, 5); // 5분 캐시

  } catch (error) {
    logger.error('뉴스 API 오류', error);
    return createInternalError(error as Error, '뉴스 데이터 조회');
  }
}

async function fetchNewsData(
  category: string | null,
  search: string | null,
  limit: number,
  page: number
): Promise<NextResponse> {
  // frontend/public/data/enhanced_news 디렉토리 경로
  const dataDir = join(process.cwd(), 'public', 'data', 'enhanced_news');
  
  // all_platforms로 시작하는 통합 파일만 읽기 (중복 방지)
  const files = readdirSync(dataDir).filter(file => 
    file.startsWith('all_platforms') && file.endsWith('.json')
  );
  
  let allNews: NewsItem[] = [];
    
    // 통합 파일만 읽기
    files.forEach(file => {
      try {
        const filePath = join(dataDir, file);
        const fileContent = readFileSync(filePath, 'utf-8');
        const newsData = JSON.parse(fileContent);
        
        if (Array.isArray(newsData)) {
          // 날짜가 없는 항목들은 crawled_at을 사용하거나 기본값 설정
          const processedData = newsData.map(item => ({
            ...item,
            date: item.date || item.upload_time || item.crawled_at || new Date().toISOString(),
            // 유튜브의 경우 source를 channel로 설정
            source: item.type === 'youtube' ? (item.channel || '유튜브') : (item.source || item.press || '알 수 없음')
          }));
          allNews = allNews.concat(processedData);
        }
      } catch (error) {
        logger.error(`파일 읽기 실패 ${file}`, error);
      }
    });

    // 날짜 파싱 함수
    const parseDate = (dateString: string): Date => {
      if (!dateString) return new Date();
      
      // 한국어 날짜 형식 파싱: "2025.06.25. 오후 3:54"
      const koreanDateMatch = dateString.match(/(\d{4})\.(\d{1,2})\.(\d{1,2})\.\s*(오전|오후)\s*(\d{1,2}):(\d{2})/);
      
      if (koreanDateMatch) {
        const [, year, month, day, ampm, hour, minute] = koreanDateMatch;
        let hour24 = parseInt(hour);
        
        if (ampm === '오후' && hour24 !== 12) {
          hour24 += 12;
        }
        if (ampm === '오전' && hour24 === 12) {
          hour24 = 0;
        }
        
        return new Date(
          parseInt(year),
          parseInt(month) - 1,
          parseInt(day),
          hour24,
          parseInt(minute)
        );
      }
      
      // 표준 날짜 형식 시도
      const date = new Date(dateString);
      return isNaN(date.getTime()) ? new Date() : date;
    };

    // 타입별 우선순위와 날짜 기준으로 정렬 (뉴스 > 블로그 > 유튜브)
    allNews.sort((a, b) => {
      // 타입별 우선순위 설정
      const getTypePriority = (type?: string) => {
        if (type === 'news') return 1;
        if (type === 'blog') return 2;
        if (type === 'youtube') return 3;
        return 1; // 기본값은 뉴스로 처리
      };
      
      const priorityA = getTypePriority(a.type);
      const priorityB = getTypePriority(b.type);
      
      // 타입 우선순위가 다르면 타입으로 정렬
      if (priorityA !== priorityB) {
        return priorityA - priorityB;
      }
      
      // 같은 타입이면 날짜로 정렬 (최신순)
      return parseDate(b.date).getTime() - parseDate(a.date).getTime();
    });

    // 필터링
    let filteredNews = allNews;

    if (category && category !== '전체') {
      // 타입별 필터링으로 변경
      const typeMap: { [key: string]: string } = {
        '뉴스': 'news',
        '블로그': 'blog',
        '유튜브': 'youtube'
      };
      
      const targetType = typeMap[category];
      if (targetType) {
        filteredNews = filteredNews.filter(item => item.type === targetType);
      }
    }

    if (search) {
      const searchLower = search.toLowerCase().trim();
      
      // 검색어가 너무 짧으면 필터링하지 않음
      if (searchLower.length < 2) {
        return createValidationError("검색어는 최소 2글자 이상이어야 합니다.");
      }
      
      filteredNews = filteredNews.filter(item => {
        const title = item.title.toLowerCase();
        const content = item.content.toLowerCase();
        const keyword = item.keyword.toLowerCase();
        const source = item.source.toLowerCase();
        
        // 1. 완전 일치 (가장 높은 우선순위)
        if (title.includes(searchLower) || keyword.includes(searchLower)) {
          return true;
        }
        
        // 2. 단어 단위 검색 (공백으로 구분된 각 단어가 모두 포함되어야 함)
        const searchWords = searchLower.split(' ').filter(word => word.length > 0);
        const titleMatch = searchWords.every(word => title.includes(word));
        const contentMatch = searchWords.every(word => content.includes(word));
        const sourceMatch = searchWords.every(word => source.includes(word));
        
        return titleMatch || contentMatch || sourceMatch;
      });
    }

    // 페이지네이션 적용
    const totalCount = filteredNews.length;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedNews = filteredNews.slice(startIndex, endIndex);

    // 페이지네이션 메타데이터 생성
    const paginationMeta = createPaginationMeta(totalCount, page, limit);

    return createSuccessResponse(paginatedNews, {
      total: totalCount,
      page,
      limit,
      meta: paginationMeta
    });
} 