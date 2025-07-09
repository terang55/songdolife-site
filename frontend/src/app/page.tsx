'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
// 필요한 아이콘만 import (현재 사용 중인 아이콘 없음)
import Image from 'next/image';
import Head from 'next/head';
import WeatherWidget from './components/WeatherWidget';
import MedicalWidget from './components/MedicalWidget';
import Breadcrumb, { getHomeBreadcrumb } from './components/Breadcrumb';
import RelatedLinks, { getHomeRelatedLinks } from './components/RelatedLinks';
import { getNewsImageConfigWithSEO } from '@/lib/image-utils';

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
  '병원': <span className="text-base">🏥</span>,
  '약국': <span className="text-base">💊</span>,
  '부동산': <span className="text-base">🏠</span>,
  '학원': <span className="text-base">🎓</span>,
};

const categories = [
  '전체',
  '뉴스',
  '블로그', 
  '유튜브',
  '병원',
  '약국',
  '학원'
];

export default function HomePage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('전체');

  const [error, setError] = useState<string | null>(null);
  const [syncStatus, setSyncStatus] = useState<SyncStatus | null>(null);
  const [stats, setStats] = useState<StatsData | null>(null);

  const fetchNews = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const params = new URLSearchParams();
      if (selectedCategory !== '전체' && selectedCategory !== '병원' && selectedCategory !== '약국' && selectedCategory !== '학원') {
        params.append('category', selectedCategory);
      }
      params.append('limit', '100');
      // 캐시 우회를 위한 타임스탬프 추가
      params.append('_t', Date.now().toString());

      const response = await fetch(`/api/news?${params.toString()}`, {
        cache: 'no-store', // Next.js 캐시 무시
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      });
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
    // 병원, 약국, 부동산 카테고리가 아닐 때만 뉴스 로딩
    if (selectedCategory !== '병원' && selectedCategory !== '약국' && selectedCategory !== '부동산' && selectedCategory !== '학원') {
    fetchNews();
    fetchSyncStatus();
    fetchStats();
    } else {
      // 병원, 약국, 부동산 카테고리일 때는 로딩 상태 해제
      setLoading(false);
      setError(null);
      setNews([]);
    }
  }, [fetchNews, selectedCategory]);

  // URL 파라미터에서 카테고리 읽기
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
    if (categoryParam && categories.includes(categoryParam)) {
      setSelectedCategory(categoryParam);
    }
  }, []);

  // RSS 리디렉션 처리
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const externalUrl = urlParams.get('external');
    
    if (externalUrl) {
      // 3초 후 외부 링크로 리디렉션
      const timer = setTimeout(() => {
        window.open(decodeURIComponent(externalUrl), '_blank', 'noopener,noreferrer');
        // URL에서 파라미터 제거
        window.history.replaceState({}, document.title, window.location.pathname);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const fetchSyncStatus = async () => {
    try {
      const response = await fetch(`/api/sync?_t=${Date.now()}`, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      });
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
      const response = await fetch(`/api/stats?_t=${Date.now()}`, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      });
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
    // 유튜브 영상이고 날짜가 없는 경우
    if (item?.type === 'youtube' && (!dateString || dateString.trim() === '')) {
      return '유튜브 영상';
    }
    
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
    
    if (!dateString || dateString.trim() === '') return '날짜 없음';
    
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
    } else if (type === 'cafe') {
      return <span className="text-lg">☕</span>;
    }
    return <span className="text-lg">📰</span>;
  };

  const getTypeLabel = (type?: string) => {
    if (type === 'blog') {
      return '블로그';
    } else if (type === 'youtube') {
      return '유튜브';
    } else if (type === 'cafe') {
      return '카페';
    }
    return '뉴스';
  };

  const getCategoryColor = (type?: string) => {
    const colors: { [key: string]: string } = {
      'news': 'bg-blue-100 text-blue-800',
      'blog': 'bg-green-100 text-green-800',
      'youtube': 'bg-red-100 text-red-800',
      'cafe': 'bg-yellow-100 text-yellow-800',
    };
    return colors[type || 'news'] || 'bg-gray-100 text-gray-800';
  };

  const generateNewsStructuredData = (): Record<string, unknown> | undefined => {
    if (!news || news.length === 0) return undefined;

    const articles = news.slice(0, 10).map(item => ({
      "@type": "NewsArticle",
      "headline": item.title,
      "description": item.content.substring(0, 200) + "...",
      "url": item.url,
      "datePublished": item.date || new Date().toISOString(),
      "dateModified": item.date || new Date().toISOString(),
      "author": {
        "@type": "Organization",
        "name": item.source || "송도라이프"
      },
      "publisher": {
        "@type": "Organization",
        "name": "송도라이프",
        "logo": {
          "@type": "ImageObject",
          "url": "https://songdo.life/og-image.jpg"
        }
      },
      "image": item.thumbnail || "https://songdo.life/og-image.jpg",
      "keywords": [item.keyword, "송도국제도시", "송도동", "인천 연수구"],
      "articleSection": item.type === 'news' ? "뉴스" : item.type === 'blog' ? "블로그" : "유튜브",
      "about": {
        "@type": "Place",
        "name": "송도국제도시",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "KR",
          "addressRegion": "인천광역시",
          "addressLocality": "연수구",
          "streetAddress": "송도동"
        }
      }
    }));

    return {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "송도라이프 - 송도국제도시 최신 정보",
      "description": "송도국제도시 관련 최신 뉴스, 블로그, 유튜브 정보를 한곳에서 확인하세요",
      "url": "https://songdo.life",
      "numberOfItems": articles.length,
      "itemListElement": articles.map((article, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": article
      }))
    };
  };

  const generateWebsiteStructuredData = () => {
    return {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "송도라이프",
      "alternateName": "송도국제도시 생활정보 플랫폼",
      "description": "인천 연수구 송도국제도시 주민들을 위한 종합 정보 플랫폼. 실시간 뉴스, 지하철 정보, 병원/약국 정보, 부동산 정보를 제공합니다.",
      "url": "https://songdo.life",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://songdo.life/?q={search_term_string}",
        "query-input": "required name=search_term_string"
      },
      "publisher": {
        "@type": "Organization",
        "name": "송도라이프",
        "logo": {
          "@type": "ImageObject",
          "url": "https://songdo.life/og-image.jpg",
          "width": 1200,
          "height": 630
        }
      },
      "mainEntity": {
        "@type": "Organization",
        "@id": "https://songdo.life/#organization",
        "name": "송도라이프",
        "description": "송도국제도시 생활정보 플랫폼",
        "url": "https://songdo.life",
        "logo": "https://songdo.life/og-image.jpg",
        "sameAs": [
          "https://songdo.life"
        ],
        "areaServed": {
          "@type": "Place",
          "name": "송도국제도시",
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "KR",
            "addressRegion": "인천광역시",
            "addressLocality": "연수구",
            "streetAddress": "송도동"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 37.538603,
            "longitude": 126.722675
          }
        }
      }
    };
  };

  const generateBreadcrumbStructuredData = () => {
    const breadcrumbs = [
      { name: "홈", url: "https://songdo.life" }
    ];

    if (selectedCategory !== '전체') {
      breadcrumbs.push({
        name: selectedCategory,
        url: `https://songdo.life/?category=${selectedCategory}`
      });
    }

    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbs.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.name,
        "item": item.url
      }))
    };
  };

  // FAQ 구조화된 데이터 생성
  const generateFAQStructuredData = () => {
    const faqData = [
      {
        question: "송도동 지하철 정보는 얼마나 자주 업데이트되나요?",
        answer: "센트럴파크역, 인천대입구역, 국제업무지구역의 실시간 도착 정보를 1분 간격으로 갱신합니다. 평일과 휴일 시간표도 매월 최신 데이터로 업데이트하여 정확한 교통 정보를 제공합니다."
      },
      {
        question: "송도동 맛집·카페 추천 데이터는 어디서 수집하나요?",
        answer: "네이버 플레이스와 카카오맵 리뷰 데이터를 기반으로 매일 인기 지수를 분석해 선정합니다. 실제 방문 후기와 평점을 종합하여 송도 주민들에게 검증된 맛집과 카페 정보를 제공합니다."
      },
      {
        question: "병원·약국 정보의 정확도는 어느 정도인가요?",
        answer: "보건복지부 공공데이터 포털에서 제공하는 최신 의료기관 정보를 매일 동기화하여 제공합니다. 응급실 운영현황, 진료시간, 연락처 등은 공식 데이터를 기반으로 하므로 신뢰할 수 있습니다."
      },
      {
        question: "뉴스·블로그·유튜브 콘텐츠는 언제 수집되나요?",
        answer: "매일 자동으로 최신 콘텐츠를 수집하고 유사도 검사를 거쳐 중복을 제거한 후 반영합니다. 송도국제도시, 센트럴파크, 국제업무지구 관련 키워드로 맞춤형 정보만 선별하여 제공합니다."
      },
      {
        question: "부동산 실거래가 정보는 얼마나 최신인가요?",
        answer: "국토교통부 실거래가 공개시스템의 데이터를 기반으로 매월 업데이트됩니다. 송도국제도시 내 아파트, 오피스텔, 상업시설의 최근 거래 현황을 확인할 수 있습니다."
      }
    ];

    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqData.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };
  };

  return (
    <>
        <Head>
          {/* 기본 메타 태그 */}
          <title>
            {selectedCategory === '전체' 
              ? '송도라이프 | 인천 연수구 송도국제도시 생활정보 플랫폼' 
              : `송도라이프 | ${selectedCategory} 정보 - 송도국제도시`
            }
          </title>
          <meta 
            name="description" 
            content={
              selectedCategory === '전체'
                ? "송도국제도시 주민들을 위한 실시간 뉴스, 지하철 정보, 부동산 정보, 의료 정보를 한눈에 확인하세요. 센트럴파크, 인천1호선, 송도동 맛집까지 모든 정보를 제공합니다."
                : `송도국제도시 ${selectedCategory} 정보를 실시간으로 확인하세요. 송도동 지역의 최신 ${selectedCategory} 소식과 정보를 한곳에서 제공합니다.`
            } 
          />
          <meta 
            name="keywords" 
            content={`송도국제도시, 송도동, 인천 연수구, 센트럴파크, 인천1호선, 인천대입구역, 센트럴파크역, 국제업무지구역, 송도 ${selectedCategory}, ${selectedCategory} 정보, 송도 생활정보, 송도 뉴스, 송도 맛집, 송도 카페, 송도 부동산, 송도 병원, 송도 약국, 송도 육아, 송도 교통`} 
          />
          
          {/* Open Graph */}
          <meta 
            property="og:title" 
            content={
              selectedCategory === '전체' 
                ? '송도라이프 | 인천 연수구 송도국제도시 생활정보 플랫폼' 
                : `송도라이프 | ${selectedCategory} 정보 - 송도국제도시`
            } 
          />
          <meta 
            property="og:description" 
            content={
              selectedCategory === '전체'
                ? "송도국제도시 주민들을 위한 실시간 뉴스, 지하철 정보, 부동산 정보, 의료 정보를 한눈에 확인하세요."
                : `송도국제도시 ${selectedCategory} 정보를 실시간으로 확인하세요. 송도동 지역의 최신 정보를 제공합니다.`
            } 
          />
          <meta 
            property="og:url" 
            content={
              selectedCategory === '전체' 
                ? 'https://songdo.life' 
                : `https://songdo.life/?category=${encodeURIComponent(selectedCategory)}`
            } 
          />
          <meta property="og:type" content="website" />
          <meta property="og:image" content="https://songdo.life/og-image.jpg" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta property="og:locale" content="ko_KR" />
          <meta property="og:site_name" content="송도라이프" />
          
          {/* Twitter Card */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@songdo_life" />
          <meta name="twitter:creator" content="@songdo_life" />
          
          {/* 정규 URL */}
          <link 
            rel="canonical" 
            href={
              selectedCategory === '전체' 
                ? 'https://songdo.life' 
                : `https://songdo.life/?category=${encodeURIComponent(selectedCategory)}`
            } 
          />
          
          {/* 지역 정보 */}
          <meta name="geo.region" content="KR-28" />
          <meta name="geo.placename" content="인천광역시 연수구 송도동" />
          <meta name="geo.position" content="37.538603;126.722675" />
          <meta name="ICBM" content="37.538603, 126.722675" />
          
          {/* 구조화된 데이터 - 웹사이트 */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(generateWebsiteStructuredData())
            }}
          />
          
          {/* 구조화된 데이터 - 뉴스 목록 (뉴스가 있을 때만) */}
          {news.length > 0 && (
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify(generateNewsStructuredData())
              }}
            />
          )}
          
          {/* 구조화된 데이터 - 브레드크럼 */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(generateBreadcrumbStructuredData())
            }}
          />

          {/* 구조화된 데이터 - FAQ */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(generateFAQStructuredData())
            }}
          />
        </Head>
      
      <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <span className="text-2xl sm:text-3xl">🏙️</span>
              <div>
                <h1 className="text-lg sm:text-2xl font-bold text-gray-900">🏠 송도라이프</h1>
                <p className="text-xs sm:text-sm text-gray-500">송도에서의 매일매일</p>
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

      {/* 네비게이션 바 */}
      <section className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-center py-3 sm:py-4 gap-2 sm:gap-6">
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full sm:w-auto">
              <a 
                href="/realestate" 
                className="flex items-center space-x-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors min-h-[44px] w-full sm:w-auto justify-center"
              >
                <span className="text-lg">🏢</span>
                <span className="text-sm font-medium">부동산 정보</span>
              </a>
              <a 
                href="/subway" 
                className="flex items-center space-x-2 px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors min-h-[44px] w-full sm:w-auto justify-center"
              >
                <span className="text-lg">🚇</span>
                <span className="text-sm font-medium">실시간 교통</span>
              </a>
            </div>
            <div className="text-xs sm:text-sm text-gray-600 text-center">
              <span className="block sm:hidden">송도 아파트 실거래가. 송도교통 실시간 정보</span>
              <span className="hidden sm:block">송도 아파트 실거래가. 송도교통 실시간 정보</span>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-6 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 제목과 날씨 위젯 */}
          <div className="flex justify-between items-start mb-8">
            {/* 제목과 설명 */}
            <div className="flex-1 text-center">
              <h2 className="text-2xl sm:text-4xl font-bold mb-2 sm:mb-4">송도 생활을 더 편리하게</h2>
              <p className="text-sm sm:text-xl text-blue-100">
                우리 동네 소식, 부동산 정보, 맛집, 육아, 교통, 병원 정보까지 한번에
              </p>
            </div>
            
            {/* 날씨 위젯 */}
            <div className="hidden sm:block">
              <WeatherWidget />
            </div>
          </div>
          
          {/* 통계 정보 */}
          <div className="grid grid-cols-3 gap-3 sm:flex sm:justify-center sm:space-x-12 text-center max-w-md sm:max-w-none mx-auto">
            <div className="bg-white/10 rounded-lg p-3 sm:bg-transparent sm:p-0">
              <div className="text-lg sm:text-3xl font-bold flex items-center justify-center gap-1 sm:gap-2 mb-1">
                <span className="text-xl sm:text-4xl">📊</span>
                <span className="text-sm sm:text-3xl">{stats?.totalArticles || news.length}</span>
              </div>
              <div className="text-xs sm:text-sm text-blue-200">총 콘텐츠</div>
            </div>
            <div className="bg-white/10 rounded-lg p-3 sm:bg-transparent sm:p-0">
              <div className="text-lg sm:text-3xl font-bold flex items-center justify-center gap-1 sm:gap-2 mb-1">
                <span className="text-xl sm:text-4xl">🏷️</span>
                <span className="text-sm sm:text-3xl">{stats?.summary?.totalCategories || syncStatus?.keywords?.length || '10'}</span>
              </div>
              <div className="text-xs sm:text-sm text-blue-200">키워드</div>
            </div>
            <div className="bg-white/10 rounded-lg p-3 sm:bg-transparent sm:p-0">
              <div className="text-lg sm:text-3xl font-bold flex items-center justify-center gap-1 sm:gap-2 mb-1">
                <span className="text-xl sm:text-4xl">⚡</span>
                <span className="text-sm sm:text-3xl hidden sm:inline">실시간</span>
                <span className="text-xs sm:text-3xl sm:hidden">실시간</span>
              </div>
              <div className="text-xs sm:text-sm text-blue-200">자동 업데이트</div>
            </div>
          </div>
          
          {/* 모바일용 날씨 위젯 */}
          <div className="sm:hidden mt-6 flex justify-center">
            <WeatherWidget />
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
                  onClick={() => {
                    if (category === '학원') {
                      router.push('/academy');
                    } else {
                      setSelectedCategory(category);
                      // URL 파라미터 업데이트
                      const newUrl = category === '전체' ? '/' : `/?category=${encodeURIComponent(category)}`;
                      window.history.pushState({}, '', newUrl);
                    }
                  }}
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

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* 브레드크럼 네비게이션 */}
        <Breadcrumb items={getHomeBreadcrumb()} />

        {/* 병원/약국 정보 위젯 */}
        {selectedCategory === '병원' && <MedicalWidget initialType="hospital" />}
        {selectedCategory === '약국' && <MedicalWidget initialType="pharmacy" />}

        {/* 메인 콘텐츠: 뉴스/블로그/유튜브 */}
        {selectedCategory !== '병원' && selectedCategory !== '약국' && selectedCategory !== '학원' && (
          <div className="flex flex-col gap-8">
            <div className="flex-1">
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
        {loading && (
          <div className="text-center py-8 sm:py-12">
            <div className="inline-block animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-sm sm:text-base text-gray-600">데이터를 불러오는 중...</p>
          </div>
        )}
        {!loading && news.length > 0 && (
                <div className="grid gap-3 sm:gap-6 md:grid-cols-3 xl:grid-cols-3">
            {news.map((item, index) => (
              <div
                key={index}
                      className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-all duration-200 overflow-hidden"
              >
                {/* 유튜브 썸네일 */}
                {item.type === 'youtube' && item.thumbnail && (
                  <div className="aspect-video bg-gray-100 rounded-t-lg overflow-hidden relative">
                    <Image 
                      {...getNewsImageConfigWithSEO(item, item.thumbnail)}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                      <div className="p-3 sm:p-6">
                  {/* 헤더 */}
                  <div className="flex items-start justify-between mb-2 sm:mb-3">
                          <span className={`inline-flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-full text-xs font-medium ${
                      item.type === 'youtube' ? 'bg-red-100 text-red-800' :
                      item.type === 'blog' ? 'bg-green-100 text-green-800' :
                      getCategoryColor(item.type)
                    }`}>
                      {getTypeIcon(item.type)} {getTypeLabel(item.type)}
                    </span>
                          <span className="text-xs text-gray-500 flex-shrink-0 ml-2">
                            {item.type === 'youtube' ? item.views : ''}
                    </span>
                  </div>
                        <h3 className="text-sm sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3 line-clamp-2 leading-relaxed">
                    <a 
                      href={item.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                            className="hover:text-blue-600 transition-colors touch-manipulation"
                    >
                      {item.title}
                    </a>
                  </h3>
                  {item.type !== 'youtube' && (
                          <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-3 leading-relaxed">
                      {item.content}
                    </p>
                  )}
                        <div className="flex items-center justify-between text-xs sm:text-sm pt-2 border-t border-gray-100">
                          <span className="font-medium text-gray-900 truncate mr-2 flex items-center gap-1">
                            <span className="text-gray-400 text-xs">🏢</span>
                            <span className="min-w-0 truncate">{item.type === 'youtube' ? item.channel : item.source}</span>
                    </span>
                          <span className="text-gray-500 text-xs flex-shrink-0 flex items-center gap-1">
                            <span className="text-gray-400">🕒</span>
                      {item.type === 'youtube' ? 
                              (item.upload_time && item.upload_time.trim() !== '' && !item.upload_time.includes('불명') ? item.upload_time : '') : 
                        formatDate(item.date, item)
                      }
                    </span>
                  </div>
                        {item.keyword && (
                          <div className={`mt-2 sm:mt-3 pt-2 sm:pt-3 border-t`}>
                            <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                              item.type === 'youtube' ? 'bg-red-100 text-red-700' :
                              item.type === 'blog' ? 'bg-green-100 text-green-700' :
                              'bg-blue-100 text-blue-700'
                            }`}>
                        #{item.keyword}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
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
            </div>
          </div>
        )}

        {/* FAQ 섹션 */}
        <section className="mt-12 sm:mt-16 py-8 sm:py-12 bg-gray-50 rounded-2xl">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
                🤔 자주 묻는 질문
              </h2>
              <p className="text-base sm:text-lg text-gray-600">
                송도라이프 서비스에 대해 궁금한 점들을 확인해보세요
              </p>
            </div>
            
            <div className="space-y-4 sm:space-y-6">
              {/* FAQ 항목 1 */}
              <details className="bg-white rounded-xl shadow-sm border overflow-hidden group">
                <summary className="flex items-center justify-between p-4 sm:p-6 cursor-pointer hover:bg-gray-50 transition-colors">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 pr-4">
                    송도동 지하철 정보는 얼마나 자주 업데이트되나요?
                  </h3>
                  <span className="text-gray-400 group-open:rotate-180 transition-transform text-xl">▼</span>
                </summary>
                <div className="px-4 sm:px-6 pb-4 sm:pb-6 text-gray-700 border-t bg-gray-50">
                  <p className="pt-4">
                    센트럴파크역, 인천대입구역, 국제업무지구역의 실시간 도착 정보를 1분 간격으로 갱신합니다. 
                    평일과 휴일 시간표도 매월 최신 데이터로 업데이트하여 정확한 교통 정보를 제공합니다.
                  </p>
                </div>
              </details>

              {/* FAQ 항목 2 */}
              <details className="bg-white rounded-xl shadow-sm border overflow-hidden group">
                <summary className="flex items-center justify-between p-4 sm:p-6 cursor-pointer hover:bg-gray-50 transition-colors">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 pr-4">
                    송도동 맛집·카페 추천 데이터는 어디서 수집하나요?
                  </h3>
                  <span className="text-gray-400 group-open:rotate-180 transition-transform text-xl">▼</span>
                </summary>
                <div className="px-4 sm:px-6 pb-4 sm:pb-6 text-gray-700 border-t bg-gray-50">
                  <p className="pt-4">
                    네이버 플레이스와 카카오맵 리뷰 데이터를 기반으로 매일 인기 지수를 분석해 선정합니다. 
                    실제 방문 후기와 평점을 종합하여 송도 주민들에게 검증된 맛집과 카페 정보를 제공합니다.
                  </p>
                </div>
              </details>

              {/* FAQ 항목 3 */}
              <details className="bg-white rounded-xl shadow-sm border overflow-hidden group">
                <summary className="flex items-center justify-between p-4 sm:p-6 cursor-pointer hover:bg-gray-50 transition-colors">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 pr-4">
                    병원·약국 정보의 정확도는 어느 정도인가요?
                  </h3>
                  <span className="text-gray-400 group-open:rotate-180 transition-transform text-xl">▼</span>
                </summary>
                <div className="px-4 sm:px-6 pb-4 sm:pb-6 text-gray-700 border-t bg-gray-50">
                  <p className="pt-4">
                    보건복지부 공공데이터 포털에서 제공하는 최신 의료기관 정보를 매일 동기화하여 제공합니다. 
                    응급실 운영현황, 진료시간, 연락처 등은 공식 데이터를 기반으로 하므로 신뢰할 수 있습니다.
                  </p>
                </div>
              </details>

              {/* FAQ 항목 4 */}
              <details className="bg-white rounded-xl shadow-sm border overflow-hidden group">
                <summary className="flex items-center justify-between p-4 sm:p-6 cursor-pointer hover:bg-gray-50 transition-colors">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 pr-4">
                    뉴스·블로그·유튜브 콘텐츠는 언제 수집되나요?
                  </h3>
                  <span className="text-gray-400 group-open:rotate-180 transition-transform text-xl">▼</span>
                </summary>
                <div className="px-4 sm:px-6 pb-4 sm:pb-6 text-gray-700 border-t bg-gray-50">
                  <p className="pt-4">
                    매일 자동으로 최신 콘텐츠를 수집하고 유사도 검사를 거쳐 중복을 제거한 후 반영합니다. 
                    송도국제도시, 센트럴파크, 국제업무지구 관련 키워드로 맞춤형 정보만 선별하여 제공합니다.
                  </p>
                </div>
              </details>



              {/* FAQ 항목 6 */}
              <details className="bg-white rounded-xl shadow-sm border overflow-hidden group">
                <summary className="flex items-center justify-between p-4 sm:p-6 cursor-pointer hover:bg-gray-50 transition-colors">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 pr-4">
                    부동산 실거래가 정보는 얼마나 최신인가요?
                  </h3>
                  <span className="text-gray-400 group-open:rotate-180 transition-transform text-xl">▼</span>
                </summary>
                <div className="px-4 sm:px-6 pb-4 sm:pb-6 text-gray-700 border-t bg-gray-50">
                  <p className="pt-4">
                    국토교통부 실거래가 공개시스템의 데이터를 기반으로 매일 업데이트됩니다. 
                    송도국제도시 내 아파트 최근 거래 현황을 확인할 수 있습니다.
                  </p>
                </div>
              </details>
            </div>
          </div>
        </section>

        {/* 관련 링크 섹션 */}
        <RelatedLinks links={getHomeRelatedLinks()} />
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 sm:py-12 mt-8 sm:mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
            {/* 브랜드 정보 */}
            <div className="flex flex-col items-center md:items-start">
              <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
                <span className="text-2xl sm:text-3xl">🏙️</span>
                <div>
                  <div className="text-lg sm:text-xl font-bold">송도라이프</div>
                  <div className="text-sm text-gray-400">송도국제도시 주민들을 위한 실시간 지역 정보를 제공합니다. 뉴스, 맛집, 카페, 부동산, 육아 정보를 한눈에 확인하세요.</div>
                </div>
              </div>
              <p className="text-sm text-gray-300 text-center md:text-left max-w-sm">
                송도국제도시 주민들을 위한 실시간 지역 정보를 제공합니다. 뉴스, 맛집, 카페, 부동산, 육아 정보를 한눈에 확인하세요.
              </p>
            </div>

            {/* 주요 지역 */}
            <div className="text-center md:text-left">
              <h3 className="text-sm sm:text-base font-semibold mb-3 sm:mb-4">주요 지역</h3>
              <ul className="space-y-1 sm:space-y-2 text-sm text-gray-300">
                <li>📍 송도국제도시</li>
                <li>🚇 센트럴파크</li>

              </ul>
            </div>

            {/* 비즈니스 문의 */}
            <div className="text-center md:text-left">
              <h3 className="text-sm sm:text-base font-semibold mb-3 sm:mb-4">💼사이트 문의</h3>
              <div className="space-y-2 text-sm text-gray-300">
                <div className="flex items-center justify-center md:justify-start space-x-2">
                  <span className="text-base">📧</span>
                  <a 
                    href="mailto:rainbowcr55@gmail.com" 
                    className="hover:text-white transition-colors"
                  >
                    rainbowcr55@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* 하단 구분선 및 저작권 */}
          <div className="border-t border-gray-700 pt-6 sm:pt-8">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
              <div className="text-xs sm:text-sm text-gray-400">
                © 2025 송도라이프. 모든 권리 보유.
              </div>
              <div className="flex items-center space-x-4 text-xs sm:text-sm">
                <a 
                  href="/privacy" 
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  개인정보처리방침
                </a>
                <span className="text-gray-600">|</span>
                <a 
                  href="/terms" 
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  이용약관
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
    </>
  );
}
