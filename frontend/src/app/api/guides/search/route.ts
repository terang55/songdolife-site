import { NextRequest, NextResponse } from 'next/server';
import { getAllGuides } from '@/lib/server-markdown-loader';

// 검색 결과 캐시
const SEARCH_CACHE_TTL = 30 * 60 * 1000; // 30분
const searchCache = new Map<string, { data: any; timestamp: number }>();

function getCachedSearch(key: string) {
  const cached = searchCache.get(key);
  if (cached && Date.now() - cached.timestamp < SEARCH_CACHE_TTL) {
    return cached.data;
  }
  searchCache.delete(key);
  return null;
}

function setCachedSearch(key: string, data: any) {
  searchCache.set(key, { data, timestamp: Date.now() });
}

function normalizeText(text: string): string {
  return text.toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
}

function calculateRelevanceScore(guide: any, searchTerms: string[]): number {
  let score = 0;
  const normalizedTitle = normalizeText(guide.title);
  const normalizedDescription = normalizeText(guide.description);
  const normalizedKeywords = guide.keywords.map((k: string) => normalizeText(k));
  const normalizedTags = guide.tags.map((t: string) => normalizeText(t));

  searchTerms.forEach(term => {
    const normalizedTerm = normalizeText(term);
    
    // 제목에서 발견: 가장 높은 점수
    if (normalizedTitle.includes(normalizedTerm)) {
      score += 10;
      // 정확히 일치하는 경우 추가 점수
      if (normalizedTitle === normalizedTerm) score += 15;
    }
    
    // 키워드에서 발견: 높은 점수
    normalizedKeywords.forEach(keyword => {
      if (keyword.includes(normalizedTerm)) {
        score += 8;
        if (keyword === normalizedTerm) score += 12;
      }
    });
    
    // 태그에서 발견: 중간 점수
    normalizedTags.forEach(tag => {
      if (tag.includes(normalizedTerm)) {
        score += 5;
        if (tag === normalizedTerm) score += 7;
      }
    });
    
    // 설명에서 발견: 낮은 점수
    if (normalizedDescription.includes(normalizedTerm)) {
      score += 2;
    }
  });

  // 인기도 보정 (featured 가이드에 보너스)
  if (guide.featured) score += 3;
  
  // 최신성 보정 (최근 업데이트된 가이드에 보너스)
  const daysSinceUpdate = (Date.now() - new Date(guide.lastUpdated).getTime()) / (1000 * 60 * 60 * 24);
  if (daysSinceUpdate < 30) score += 2; // 한 달 이내 업데이트
  if (daysSinceUpdate < 7) score += 1;  // 일주일 이내 업데이트

  return score;
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q')?.trim();
    const category = searchParams.get('category');
    const limit = parseInt(searchParams.get('limit') || '10');
    const minScore = parseFloat(searchParams.get('minScore') || '1');

    if (!query || query.length < 2) {
      return NextResponse.json({
        success: false,
        error: 'Search query must be at least 2 characters long',
        data: []
      }, { status: 400 });
    }

    // 캐시 키 생성
    const cacheKey = `search_${query}_${category || 'all'}_${limit}_${minScore}`;
    
    // 캐시된 결과 확인
    const cachedResult = getCachedSearch(cacheKey);
    if (cachedResult) {
      return NextResponse.json({
        ...cachedResult,
        cached: true,
        timestamp: new Date().toISOString()
      });
    }

    // 모든 가이드 가져오기
    const allGuides = await getAllGuides();
    
    // 카테고리 필터링
    const filteredGuides = category 
      ? allGuides.filter(guide => guide.category === category)
      : allGuides;

    // 검색어를 단어별로 분리
    const searchTerms = query.split(/\s+/).filter(term => term.length > 0);

    // 각 가이드에 대해 관련성 점수 계산
    const scoredGuides = filteredGuides.map(guide => ({
      ...guide,
      relevanceScore: calculateRelevanceScore(guide, searchTerms)
    }));

    // 최소 점수 이상인 가이드만 필터링하고 정렬
    const searchResults = scoredGuides
      .filter(guide => guide.relevanceScore >= minScore)
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, limit);

    // 검색 결과에 하이라이트 정보 추가
    const highlightedResults = searchResults.map(guide => {
      const highlights = {
        title: false,
        description: false,
        keywords: [] as string[],
        tags: [] as string[]
      };

      searchTerms.forEach(term => {
        const normalizedTerm = normalizeText(term);
        
        if (normalizeText(guide.title).includes(normalizedTerm)) {
          highlights.title = true;
        }
        
        if (normalizeText(guide.description).includes(normalizedTerm)) {
          highlights.description = true;
        }
        
        guide.keywords.forEach(keyword => {
          if (normalizeText(keyword).includes(normalizedTerm)) {
            highlights.keywords.push(keyword);
          }
        });
        
        guide.tags.forEach(tag => {
          if (normalizeText(tag).includes(normalizedTerm)) {
            highlights.tags.push(tag);
          }
        });
      });

      return {
        ...guide,
        highlights
      };
    });

    const result = {
      success: true,
      data: highlightedResults,
      total: highlightedResults.length,
      query: {
        original: query,
        terms: searchTerms,
        category,
        limit,
        minScore
      },
      suggestions: highlightedResults.length === 0 ? generateSearchSuggestions(query, allGuides) : []
    };

    // 결과 캐시 (검색 결과는 자주 변하지 않으므로)
    setCachedSearch(cacheKey, result);

    return NextResponse.json({
      ...result,
      cached: false,
      timestamp: new Date().toISOString()
    }, {
      headers: {
        'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=3600', // 30분
        'X-Cache-Status': 'MISS'
      }
    });

  } catch (error) {
    console.error('검색 API 오류:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Search failed',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}

function generateSearchSuggestions(query: string, allGuides: any[]): string[] {
  const suggestions: string[] = [];
  const normalizedQuery = normalizeText(query);
  
  // 키워드에서 유사한 단어 찾기
  const allKeywords = allGuides.flatMap(guide => guide.keywords);
  const keywordSuggestions = allKeywords
    .filter(keyword => {
      const normalizedKeyword = normalizeText(keyword);
      return normalizedKeyword.includes(normalizedQuery) || 
             normalizedQuery.includes(normalizedKeyword);
    })
    .slice(0, 3);
    
  suggestions.push(...keywordSuggestions);
  
  // 인기 검색어 (featured 가이드의 키워드)
  const popularKeywords = allGuides
    .filter(guide => guide.featured)
    .flatMap(guide => guide.keywords)
    .slice(0, 2);
    
  suggestions.push(...popularKeywords);
  
  // 중복 제거 및 원본 쿼리 제외
  return [...new Set(suggestions)].filter(s => s !== query).slice(0, 5);
}