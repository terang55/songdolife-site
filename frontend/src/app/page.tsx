'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
// 필요한 아이콘만 import (현재 사용 중인 아이콘 없음)
import Image from 'next/image';
import Head from 'next/head';

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

interface ApiResponse {
  success: boolean;
  data: NewsItem[];
  total: number;
  timestamp: string;
  note?: string;
}

interface SyncStatus {
  lastSync: string | null;
  totalFiles: number;
  keywords: string[];
  files: { [key: string]: string };
  status: 'synced' | 'never_synced';
}

interface StatsData {
  totalArticles: number;
  avgContentLength: number;
  lastUpdated: string;
  summary: {
    newsCount: number;
    blogCount: number;
    totalSources: number;
    totalCategories: number;
  };
}

const categoryIcons: { [key: string]: React.ReactNode } = {
  '뉴스': <span className="text-base">📰</span>,
  '블로그': <span className="text-base">📝</span>,
  '유튜브': <span className="text-base">🎥</span>,
};

const categories = [
  '전체',
  '뉴스',
  '블로그', 
  '유튜브'
];

export default function HomePage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('전체');

  const [error, setError] = useState<string | null>(null);
  const [syncStatus, setSyncStatus] = useState<SyncStatus | null>(null);
  const [stats, setStats] = useState<StatsData | null>(null);



  const fetchNews = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const params = new URLSearchParams();
      if (selectedCategory !== '전체') params.append('category', selectedCategory);
      params.append('limit', '100');

      const response = await fetch(`/api/news?${params.toString()}`);
      const result: ApiResponse = await response.json();

      if (result.success) {
        setNews(result.data);
        if (result.note) {
          console.log('API Note:', result.note);
        }
      } else {
        setError('데이터를 불러오는데 실패했습니다.');
      }
    } catch (error) {
      console.error('Error fetching news:', error);
      setError('네트워크 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  }, [selectedCategory]);

  useEffect(() => {
    fetchNews();
    fetchSyncStatus();
    fetchStats();
  }, [fetchNews]);

  const fetchSyncStatus = async () => {
    try {
      const response = await fetch('/api/sync');
      const result = await response.json();
      
      if (result.success) {
        setSyncStatus(result.data);
      }
    } catch (error) {
      console.error('Error fetching sync status:', error);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/stats');
      const result = await response.json();
      
      if (result.success) {
        setStats(result.data);
      } else {
        console.error('Stats API 오류:', result.error || 'Unknown error');
        // API 오류 시에도 기본값으로 표시하지 않고 실제 데이터 카운트 사용
      }
    } catch (error) {
      console.error('Stats API 호출 실패:', error);
    }
  };

  const formatDate = (dateString: string, item?: NewsItem) => {
    // 블로그 글이고 날짜가 없는 경우
    if (item?.type === 'blog' && (!dateString || dateString.trim() === '')) {
      // 네이버 블로그 URL에서 날짜 추출 시도
      if (item.url && item.url.includes('blog.naver.com')) {
        // 네이버 블로그 포스트 ID는 보통 시간 기반으로 생성되지만
        // 정확한 날짜 추출은 어려우므로 "블로그 글"로 표시
        return '블로그 글';
      }
      return '블로그 글';
    }
    
    if (!dateString) return '날짜 없음';
    
    try {
      // 한국어 날짜 형식 파싱: "2025.06.25. 오후 3:54"
      const koreanDateMatch = dateString.match(/(\d{4})\.(\d{1,2})\.(\d{1,2})\.\s*(오전|오후)\s*(\d{1,2}):(\d{2})/);
      
      if (koreanDateMatch) {
        const [, year, month, day, ampm, hour, minute] = koreanDateMatch;
        let hour24 = parseInt(hour);
        
        // 오후인 경우 12시간 추가 (단, 12시는 그대로)
        if (ampm === '오후' && hour24 !== 12) {
          hour24 += 12;
        }
        // 오전 12시는 0시로 변환
        if (ampm === '오전' && hour24 === 12) {
          hour24 = 0;
        }
        
        const parsedDate = new Date(
          parseInt(year),
          parseInt(month) - 1, // JavaScript의 월은 0부터 시작
          parseInt(day),
          hour24,
          parseInt(minute)
        );
        
        return parsedDate.toLocaleDateString('ko-KR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      }
      
      // 표준 ISO 날짜 형식도 시도
      const date = new Date(dateString);
      if (!isNaN(date.getTime())) {
        return date.toLocaleDateString('ko-KR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      }
      
      // 파싱 실패시 원본 반환
      return dateString;
    } catch {
      return dateString;
    }
  };

  const getTypeIcon = (type?: string) => {
    if (type === 'blog') {
      return <span className="text-lg">📝</span>;
    } else if (type === 'youtube') {
      return <span className="text-lg">🎥</span>;
    }
    return <span className="text-lg">📰</span>;
  };

  const getTypeLabel = (type?: string) => {
    if (type === 'blog') {
      return '블로그';
    } else if (type === 'youtube') {
      return '유튜브';
    }
    return '뉴스';
  };

  const getCategoryColor = (type?: string) => {
    const colors: { [key: string]: string } = {
      '뉴스': 'bg-blue-100 text-blue-800',
      '블로그': 'bg-green-100 text-green-800',
      '유튜브': 'bg-red-100 text-red-800'
    };
    return colors[getTypeLabel(type)] || 'bg-gray-100 text-gray-800';
  };

  // 구조화된 데이터 생성 함수
  const generateNewsStructuredData = () => {
    if (!news.length) return null;

    const newsArticles = news.slice(0, 10).map((item, index) => ({
      "@type": "NewsArticle",
      "headline": item.title,
      "description": item.content.substring(0, 200),
      "url": item.url,
      "datePublished": item.date,
      "author": {
        "@type": "Organization",
        "name": item.source || item.channel || "논현동 정보 허브"
      },
      "publisher": {
        "@type": "Organization",
        "name": "논현동 정보 허브",
        "url": "https://nonhyeon-info.vercel.app"
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://nonhyeon-info.vercel.app#article-${index}`
      },
      "articleSection": item.type === 'news' ? '뉴스' : item.type === 'blog' ? '블로그' : '유튜브',
      "keywords": [item.keyword, "논현동", "인천 남동구"],
      "about": {
        "@type": "Place",
        "name": "인천광역시 남동구 논현동"
      }
    }));

    return {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "논현동 지역 정보",
      "description": "인천 남동구 논현동 관련 최신 뉴스 및 정보",
      "url": "https://nonhyeon-info.vercel.app",
      "numberOfItems": newsArticles.length,
      "itemListElement": newsArticles.map((article, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": article
      }))
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const structuredData = generateNewsStructuredData();

  return (
    <>
      {/* 동적 구조화된 데이터 추가 */}
      {structuredData && (
        <Head>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(structuredData)
            }}
          />
        </Head>
      )}
      
      <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <span className="text-2xl sm:text-3xl">🏙️</span>
              <div>
                <h1 className="text-lg sm:text-2xl font-bold text-gray-900">🏠 인천 논현동 알리미</h1>
                <p className="text-xs sm:text-sm text-gray-500">인천 남동구 논현동 실시간 정보</p>
              </div>
            </div>
            <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-600">
              {/* 통합된 업데이트 상태 표시 */}
              <div className="flex items-center space-x-1">
                <span className="text-base">🔄</span>
                <span className="text-xs">
                  {syncStatus && syncStatus.status === 'synced' && syncStatus.lastSync 
                    ? `데이터 업데이트: ${new Date(syncStatus.lastSync).toLocaleDateString('ko-KR', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}`
                    : '동기화 대기중'
                  }
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-6 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl sm:text-4xl font-bold mb-2 sm:mb-4">인천 논현동 주민들을 위한 정보 허브</h2>
            <p className="text-sm sm:text-xl mb-4 sm:mb-8 text-blue-100">
              실시간 뉴스, 맛집, 카페, 부동산, 육아 정보를 한눈에 확인하세요
            </p>
            <div className="flex justify-center space-x-6 sm:space-x-12 text-center">
              <div>
                <div className="text-xl sm:text-3xl font-bold flex items-center justify-center gap-1 sm:gap-2">
                  <span className="text-2xl sm:text-4xl">📊</span>
                  {stats?.totalArticles || news.length}
                </div>
                <div className="text-xs sm:text-sm text-blue-200">총 콘텐츠 수</div>
              </div>
              <div>
                <div className="text-xl sm:text-3xl font-bold flex items-center justify-center gap-1 sm:gap-2">
                  <span className="text-2xl sm:text-4xl">🏷️</span>
                  {syncStatus?.keywords?.length || '17'}
                </div>
                <div className="text-xs sm:text-sm text-blue-200">수집 키워드</div>
              </div>
              <div>
                <div className="text-xl sm:text-3xl font-bold flex items-center justify-center gap-1 sm:gap-2">
                  <span className="text-2xl sm:text-4xl">⚡</span>
                  매일 2회
                </div>
                <div className="text-xs sm:text-sm text-blue-200">자동 업데이트</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter */}
      <section className="bg-white py-4 sm:py-6 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <div className="flex items-center space-x-1">
                    {category !== '전체' && categoryIcons[category as keyof typeof categoryIcons]}
                    <span>{category}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* News Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* 에러 메시지 */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
            <div className="flex">
              <div className="flex-shrink-0">
                <span className="text-red-400">⚠️</span>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">오류 발생</h3>
                <div className="mt-2 text-sm text-red-700">{error}</div>
              </div>
            </div>
          </div>
        )}

        {/* 로딩 */}
        {loading && (
          <div className="text-center py-8 sm:py-12">
            <div className="inline-block animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-sm sm:text-base text-gray-600">데이터를 불러오는 중...</p>
          </div>
        )}

        {/* 뉴스 목록 */}
        {!loading && news.length > 0 && (
          <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {news.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow duration-200"
              >
                {/* 유튜브 썸네일 */}
                {item.type === 'youtube' && item.thumbnail && (
                  <div className="aspect-video bg-gray-100 rounded-t-lg overflow-hidden relative">
                    <Image 
                      src={item.thumbnail} 
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                )}
                
                <div className="p-4 sm:p-6">
                  {/* 헤더 */}
                  <div className="flex items-start justify-between mb-2 sm:mb-3">
                    <span className={`inline-flex items-center gap-1 px-2 sm:px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      item.type === 'youtube' ? 'bg-red-100 text-red-800' :
                      item.type === 'blog' ? 'bg-green-100 text-green-800' :
                      getCategoryColor(item.type)
                    }`}>
                      {getTypeIcon(item.type)} {getTypeLabel(item.type)}
                    </span>
                    <span className="text-xs text-gray-500">
                      {item.type === 'youtube' ? item.views : `${item.content_length}자`}
                    </span>
                  </div>

                  {/* 제목 */}
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3 line-clamp-2 hover:text-blue-600 transition-colors">
                    <a 
                      href={item.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {item.title}
                    </a>
                  </h3>

                  {/* 내용 */}
                  {item.type !== 'youtube' && (
                    <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-3">
                      {item.content}
                    </p>
                  )}

                  {/* 하단 정보 */}
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="font-medium text-gray-900 truncate mr-2">
                      {item.type === 'youtube' ? item.channel : item.source}
                    </span>
                    <span className="text-gray-500 text-xs flex-shrink-0">
                      {item.type === 'youtube' ? item.upload_time : formatDate(item.date, item)}
                    </span>
                  </div>
                  
                  {/* 키워드 태그 (유튜브인 경우 하단에 별도 표시) */}
                  {item.type === 'youtube' && (
                    <div className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t">
                      <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${getCategoryColor(item.type)}`}>
                        #{item.keyword}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 데이터 없음 */}
        {!loading && news.length === 0 && !error && (
          <div className="text-center py-8 sm:py-12">
            <div className="text-4xl sm:text-6xl mb-3 sm:mb-4">🤔</div>
            <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">
              검색 결과가 없습니다
            </h3>
            <p className="text-sm sm:text-base text-gray-600">
              다른 키워드나 카테고리로 검색해보세요.
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 sm:py-8 mt-8 sm:mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4 md:mb-0">
              <span className="text-xl sm:text-2xl">🌐</span>
              <div>
                <div className="text-sm sm:text-base font-semibold">논현동 정보 허브</div>
                <div className="text-xs sm:text-sm text-gray-400">인천 남동구 논현동 지역 정보</div>
              </div>
            </div>
            <div className="text-xs sm:text-sm text-gray-400 text-center">
              © 2025 논현동 정보 허브. 모든 권리 보유.
            </div>
          </div>
        </div>
      </footer>
    </div>
    </>
  );
}
