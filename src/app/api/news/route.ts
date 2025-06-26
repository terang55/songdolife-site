import { NextRequest, NextResponse } from 'next/server';
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

interface NewsItem {
  title: string;
  content: string;
  source: string;
  date: string;
  url: string;
  keyword: string;
  content_length: number;
}

export async function GET(request: NextRequest) {
  try {
    // frontend/public/data/enhanced_news 디렉토리 경로
    const dataDir = join(process.cwd(), 'public', 'data', 'enhanced_news');
    
    // enhanced_news 디렉토리의 모든 JSON 파일 읽기
    const files = readdirSync(dataDir).filter(file => file.endsWith('.json'));
    
    let allNews: NewsItem[] = [];
    
    // 각 파일의 뉴스 데이터 읽기
    files.forEach(file => {
      try {
        const filePath = join(dataDir, file);
        const fileContent = readFileSync(filePath, 'utf-8');
        const newsData = JSON.parse(fileContent);
        
        if (Array.isArray(newsData)) {
          allNews = allNews.concat(newsData);
        }
      } catch (error) {
        console.error(`Error reading file ${file}:`, error);
      }
    });

    // 날짜 기준으로 최신 순 정렬
    allNews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    // URL 파라미터 처리
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const limit = parseInt(searchParams.get('limit') || '50');

    // 필터링
    let filteredNews = allNews;

    if (category && category !== '전체') {
      filteredNews = filteredNews.filter(item => item.keyword === category);
    }

    if (search) {
      const searchLower = search.toLowerCase();
      filteredNews = filteredNews.filter(item => 
        item.title.toLowerCase().includes(searchLower) || 
        item.content.toLowerCase().includes(searchLower)
      );
    }

    // 제한된 개수만 반환
    filteredNews = filteredNews.slice(0, limit);

    return NextResponse.json({
      success: true,
      data: filteredNews,
      total: filteredNews.length,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error in news API:', error);
    
    // 오류 시 더미 데이터 반환
    const mockData: NewsItem[] = [
      {
        title: "'약물 운전' 이경규 소식에…정신과 전문의 \"가뜩이나 편견 높은데\"",
        content: "정신건강의학과 전문의가 방송인 이경규씨의 약물 운전 사건과 관련해 \"정신과 약물 복용자 전체에 대한 사회적 낙인과 불필요한 오해가 확산할 수 있다\"고 우려했다.",
        source: "중앙일보",
        date: "2025-06-26T05:55:00",
        url: "https://n.news.naver.com/mnews/article/025/0003450871",
        keyword: "논현동",
        content_length: 1573
      },
      {
        title: "후루룩, 소리도 맛있다…끊을 수 없는 중독의 맛, 면 [Find Dining]",
        content: "속을 뻥 뚫어주는 냉면, 감칠맛 폭발 메밀, 진한 국물 칼국수까지. 삼시 세끼 면만 먹고도 살 수 있는 당신을 위해 소개한다. 특별하지 않지만 아주 특별한 면요리다.",
        source: "MBN",
        date: "2025-06-13T14:06:00",
        url: "https://n.news.naver.com/mnews/article/057/0001891292",
        keyword: "논현동 맛집",
        content_length: 1294
      },
      {
        title: "\"내년 수도권 입주 물량 10만 가구까지 줄어든다\"…공급 충격 예고한 건설산업연구원",
        content: "내년 수도권 입주 물량이 10만 가구 수준으로 줄어든다는 분석이 나왔다. 올해 입주 물량이 14만 가구로 예상되는데 이보다 4만 가구(28.5%)가 감소할 것이라는 의미다.",
        source: "조선비즈",
        date: "2025-06-24T16:04:00",
        url: "https://n.news.naver.com/mnews/article/366/0001087513",
        keyword: "논현동 부동산",
        content_length: 1117
      }
    ];

    return NextResponse.json({
      success: true,
      data: mockData,
      total: mockData.length,
      timestamp: new Date().toISOString(),
      note: "Using mock data due to file system error"
    });
  }
} 