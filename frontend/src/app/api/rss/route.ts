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
  type?: string;
  channel?: string;
  views?: string;
  upload_time?: string;
  thumbnail?: string;
}

function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return new Date().toUTCString();
    }
    return date.toUTCString();
  } catch {
    return new Date().toUTCString();
  }
}

function getTypeLabel(type?: string): string {
  const typeMap: { [key: string]: string } = {
    'news': '뉴스',
    'blog': '블로그',
    'youtube': '유튜브'
  };
  return typeMap[type || ''] || '정보';
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const limit = parseInt(searchParams.get('limit') || '50');

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
          const processedData = newsData.map(item => ({
            ...item,
            date: item.date || item.upload_time || item.crawled_at || new Date().toISOString(),
            source: item.type === 'youtube' ? (item.channel || '유튜브') : (item.source || item.press || '알 수 없음')
          }));
          allNews = allNews.concat(processedData);
        }
      } catch (error) {
        console.error(`Error reading file ${file}:`, error);
      }
    });

    // 중복 제거 (URL 기준)
    const uniqueNews = allNews.filter((item, index, self) => 
      index === self.findIndex(t => t.url === item.url)
    );

    // 날짜순 정렬 (최신순)
    uniqueNews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    // 카테고리 필터링
    let filteredNews = uniqueNews;
    if (category && category !== '전체') {
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

    // 제한된 개수만 사용
    const limitedNews = filteredNews.slice(0, limit);

    // RSS XML 생성
    const baseUrl = 'https://nonhyeon-info-site.vercel.app';
    const currentDate = new Date().toUTCString();
    const categoryTitle = category ? ` - ${category}` : '';
    
    const rssItems = limitedNews.map((item, index) => {
      const itemDate = formatDate(item.date);
      const itemContent = escapeXml((item.content || item.title || '내용 없음').substring(0, 300));
      const itemType = getTypeLabel(item.type);
      const originalUrl = item.url || '#';
      
      // 네이버 RSS 호환을 위해 내부 링크 사용
      const internalLink = `${baseUrl}/?ref=rss&external=${encodeURIComponent(originalUrl)}`;
      const uniqueGuid = `${baseUrl}/rss-item/${Date.now()}-${index}`;
      
      return `    <item>
      <title>${escapeXml(`[${itemType}] ${item.title || '제목 없음'}`)}</title>
      <description>${itemContent}${itemContent.length >= 300 ? '...' : ''}</description>
      <link>${internalLink}</link>
      <guid isPermaLink="false">${uniqueGuid}</guid>
      <pubDate>${itemDate}</pubDate>
      <category>${escapeXml(itemType)}</category>
    </item>`;
    }).join('\n');
    
    const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(`논현동 정보 허브${categoryTitle}`)}</title>
    <description>${escapeXml('인천 남동구 논현동 주민들을 위한 종합 정보 플랫폼. 실시간 뉴스, 맛집, 카페, 부동산, 육아 정보를 한눈에 확인하세요.')}</description>
    <link>${baseUrl}</link>
    <language>ko-kr</language>
    <lastBuildDate>${currentDate}</lastBuildDate>
    <pubDate>${currentDate}</pubDate>
    <ttl>60</ttl>
    <managingEditor>rainbowcr55@gmail.com (논현동 정보 허브)</managingEditor>
    <webMaster>rainbowcr55@gmail.com (논현동 정보 허브)</webMaster>
    <category>지역정보</category>
    <image>
      <url>${baseUrl}/og-image.jpg</url>
      <title>${escapeXml(`논현동 정보 허브${categoryTitle}`)}</title>
      <link>${baseUrl}</link>
    </image>
${rssItems}
  </channel>
</rss>`;

    return new NextResponse(rssXml, {
      status: 200,
      headers: {
        'Content-Type': 'application/rss+xml; charset=utf-8',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });

  } catch (error) {
    console.error('RSS Feed Error:', error);
    
    // 에러 발생시 기본 RSS 반환
    const errorRss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>논현동 정보 허브</title>
    <description>인천 남동구 논현동 지역 정보</description>
    <link>https://nonhyeon-info-site.vercel.app</link>
    <language>ko-kr</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <item>
      <title>RSS 피드 오류</title>
      <description>RSS 피드를 생성하는 중 오류가 발생했습니다.</description>
      <link>https://nonhyeon-info-site.vercel.app</link>
      <pubDate>${new Date().toUTCString()}</pubDate>
    </item>
  </channel>
</rss>`;

    return new NextResponse(errorRss, {
      status: 500,
      headers: {
        'Content-Type': 'application/rss+xml; charset=utf-8',
      },
    });
  }
} 