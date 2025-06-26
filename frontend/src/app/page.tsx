'use client';

import { useState, useEffect } from 'react';
import { MapPin, Coffee, Home, Baby, Newspaper, Search, Clock } from 'lucide-react';

interface NewsItem {
  title: string;
  content: string;
  source: string;
  date: string;
  url: string;
  keyword: string;
  content_length: number;
  type?: string; // 'news' 또는 'blog'
}

interface ApiResponse {
  success: boolean;
  data: NewsItem[];
  total: number;
  timestamp: string;
  note?: string;
}

const categoryIcons = {
  '논현동': <MapPin className="w-5 h-5" />,
  '논현동 맛집': <Coffee className="w-5 h-5" />,
  '논현동 카페': <Coffee className="w-5 h-5" />,
  '논현동 부동산': <Home className="w-5 h-5" />,
  '논현동 육아': <Baby className="w-5 h-5" />,
  '논현동 소식': <Newspaper className="w-5 h-5" />,
  '강남 논현동': <MapPin className="w-5 h-5" />,
  '논현역 맛집': <Coffee className="w-5 h-5" />,
  '논현역': <MapPin className="w-5 h-5" />,
  '인천 논현동': <MapPin className="w-5 h-5" />,
};



const categories = [
  '전체',
  '인천 남동구',
  '인천 남동구 소식',
  '인천 남동구 육아',
  '인천 남동구 부동산',
  '인천 논현동',
  '인천 논현지구',
  '인천 고잔동',
  '남동구 맛집',
  '남동구 카페'
];

export default function HomePage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState<string | null>(null);

  const fetchNews = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const params = new URLSearchParams();
      if (selectedCategory !== '전체') params.append('category', selectedCategory);
      if (searchQuery.trim()) params.append('search', searchQuery.trim());
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
  };

  useEffect(() => {
    fetchNews();
  }, [selectedCategory, searchQuery]);

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return dateString;
    }
  };

  const getTypeIcon = (type?: string) => {
    if (type === 'blog') {
      return '📝';
    }
    return '📰';
  };

  const getCategoryColor = (keyword: string) => {
    const colors: { [key: string]: string } = {
      '인천 남동구': 'bg-blue-100 text-blue-800',
      '인천 남동구 소식': 'bg-green-100 text-green-800',
      '인천 남동구 육아': 'bg-pink-100 text-pink-800',
      '인천 남동구 부동산': 'bg-orange-100 text-orange-800',
      '인천 논현동': 'bg-purple-100 text-purple-800',
      '인천 논현지구': 'bg-indigo-100 text-indigo-800',
      '인천 고잔동': 'bg-teal-100 text-teal-800',
      '남동구 맛집': 'bg-red-100 text-red-800',
      '남동구 카페': 'bg-yellow-100 text-yellow-800',
      '고잔신도시 육아': 'bg-pink-200 text-pink-900',
      '고잔신도시 부동산': 'bg-orange-200 text-orange-900'
    };
    return colors[keyword] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <MapPin className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">🏠 논현동 정보 허브</h1>
                <p className="text-sm text-gray-500">인천 남동구 논현동 실시간 정보</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              <span>마지막 업데이트: {new Date().toLocaleString('ko-KR')}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4">논현동 주민들을 위한 정보 허브</h2>
            <p className="text-xl mb-8 text-blue-100">
              실시간 뉴스, 맛집, 카페, 부동산, 육아 정보를 한눈에 확인하세요
            </p>
            <div className="flex justify-center space-x-8 text-center">
              <div>
                <div className="text-3xl font-bold">{news.length}</div>
                <div className="text-blue-200">총 기사 수</div>
              </div>
              <div>
                <div className="text-3xl font-bold">{categories.length - 1}</div>
                <div className="text-blue-200">카테고리</div>
              </div>
              <div>
                <div className="text-3xl font-bold">실시간</div>
                <div className="text-blue-200">업데이트</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="bg-white py-6 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="기사 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-gray-600">데이터를 불러오는 중...</p>
          </div>
        )}

        {/* 뉴스 목록 */}
        {!loading && news.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {news.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow duration-200"
              >
                <div className="p-6">
                  {/* 헤더 */}
                  <div className="flex items-start justify-between mb-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(item.keyword)}`}>
                      {getTypeIcon(item.type)} {item.keyword}
                    </span>
                    <span className="text-xs text-gray-500">
                      {item.content_length}자
                    </span>
                  </div>

                  {/* 제목 */}
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2 hover:text-blue-600 transition-colors">
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
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {item.content}
                  </p>

                  {/* 하단 정보 */}
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-gray-900">
                      {item.source}
                    </span>
                    <span className="text-gray-500">
                      {formatDate(item.date)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 데이터 없음 */}
        {!loading && news.length === 0 && !error && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              검색 결과가 없습니다
            </h3>
            <p className="text-gray-600">
              다른 키워드나 카테고리로 검색해보세요.
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <MapPin className="w-6 h-6" />
              <div>
                <div className="font-semibold">논현동 정보 허브</div>
                <div className="text-sm text-gray-400">인천 남동구 논현동 지역 정보</div>
              </div>
            </div>
            <div className="text-sm text-gray-400">
              © 2025 논현동 정보 허브. 모든 권리 보유.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
