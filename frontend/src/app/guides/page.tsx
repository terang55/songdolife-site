import Link from 'next/link';
import type { Metadata } from 'next';
import { getGuidesByCategory, GUIDE_CATEGORIES } from '@/lib/guide-utils';
import { BASE_URL } from '@/lib/siteConfig';
import Footer from '../components/Footer';
import { generateBreadcrumbSchema } from '@/lib/seo';
import Script from 'next/script';

export const metadata: Metadata = {
  title: '송도 생활 가이드 모음 | 송도라이프',
  description: '송도국제도시 생활에 필요한 모든 정보를 한곳에서 확인하세요. 부동산, 교통, 이사, 계절별 추천 활동까지 실용적인 가이드를 제공합니다.',
  keywords: [
    '송도 가이드',
    '송도 생활정보',
    '송도국제도시 가이드',
    '송도 이사 가이드',
    '송도 부동산 가이드',
    '송도 교통 가이드',
    '센트럴파크 가이드',
    '송도 정착 가이드',
    '송도 라이프스타일',
    '송도 계절별 활동'
  ],
  openGraph: {
    title: '송도 생활 가이드 모음 | 송도라이프',
    description: '송도국제도시 생활에 필요한 모든 정보를 한곳에서 확인하세요',
    url: `${BASE_URL}/guides`,
    siteName: '송도라이프',
    images: [
      {
        url: `${BASE_URL}/og-guides.jpg`,
        width: 1200,
        height: 630,
        alt: '송도라이프 - 송도 생활 가이드'
      }
    ],
    locale: 'ko_KR',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: '송도 생활 가이드 모음 | 송도라이프',
    description: '송도국제도시 생활에 필요한 모든 정보를 한곳에서 확인하세요',
    images: [`${BASE_URL}/og-guides.jpg`]
  }
};

export default function GuidesPage() {
  const featuredGuides = getGuidesByCategory().filter(guide => guide.featured);
  const recentGuides = getGuidesByCategory().slice(0, 6);

  return (
    <>
      <Script
        id="breadcrumb-ldjson"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbSchema([
            { name: '홈', path: '/' },
            { name: '생활 가이드', path: '/guides' }
          ]))
        }}
      />

      {/* 메인 구조화된 데이터 */}
      <Script
        id="guides-ldjson"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "송도 생활 가이드 모음",
            "description": "송도국제도시 생활에 필요한 모든 정보를 한곳에서 확인하세요. 맛집, 카페, 생활편의시설, 교통정보 등 실용적인 가이드를 제공합니다.",
            "url": `${BASE_URL}/guides`,
            "mainEntity": {
              "@type": "ItemList",
              "name": "송도 생활 가이드 목록",
              "description": "송도국제도시 거주자를 위한 생활 정보 가이드 모음",
              "numberOfItems": featuredGuides.length + recentGuides.length,
              "itemListElement": [
                ...featuredGuides.map((guide, index) => ({
                  "@type": "ListItem",
                  "position": index + 1,
                  "item": {
                    "@type": "Article",
                    "name": guide.title,
                    "description": guide.description,
                    "url": `${BASE_URL}/guides/${guide.slug}`,
                    "author": {
                      "@type": "Organization",
                      "name": "송도라이프"
                    },
                    "publisher": {
                      "@type": "Organization",
                      "name": "송도라이프",
                      "url": `${BASE_URL}`
                    }
                  }
                })),
                ...recentGuides.slice(0, 6).map((guide, index) => ({
                  "@type": "ListItem", 
                  "position": featuredGuides.length + index + 1,
                  "item": {
                    "@type": "Article",
                    "name": guide.title,
                    "description": guide.description,
                    "url": `${BASE_URL}/guides/${guide.slug}`,
                    "author": {
                      "@type": "Organization",
                      "name": "송도라이프"
                    },
                    "publisher": {
                      "@type": "Organization",
                      "name": "송도라이프",
                      "url": `${BASE_URL}`
                    }
                  }
                }))
              ]
            },
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "홈",
                  "item": `${BASE_URL}/`
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "생활 가이드",
                  "item": `${BASE_URL}/guides`
                }
              ]
            }
          })
        }}
      />

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-14 sm:h-16">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <span className="text-2xl sm:text-3xl">📚</span>
                <div>
                  <Link href="/" className="text-lg sm:text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
                    🏠 송도라이프
                  </Link>
                  <p className="text-xs sm:text-sm text-gray-500">송도에서의 매일매일</p>
                </div>
              </div>
              <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <span className="text-base">📖</span>
                  <span className="text-xs">생활 가이드</span>
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
                <Link 
                  href="/realestate" 
                  className="flex items-center space-x-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors min-h-[44px] w-full sm:w-auto justify-center"
                >
                  <span className="text-lg">🏢</span>
                  <span className="text-sm font-medium">부동산 정보</span>
                </Link>
                <Link 
                  href="/subway" 
                  className="flex items-center space-x-2 px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors min-h-[44px] w-full sm:w-auto justify-center"
                >
                  <span className="text-lg">🚇</span>
                  <span className="text-sm font-medium">실시간 교통</span>
                </Link>
                <Link 
                  href="/guides" 
                  className="flex items-center space-x-2 px-4 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors min-h-[44px] w-full sm:w-auto justify-center"
                >
                  <span className="text-lg">📚</span>
                  <span className="text-sm font-medium">생활 가이드</span>
                </Link>
              </div>
              <div className="text-xs sm:text-sm text-gray-600 text-center">
                <span className="block sm:hidden">송도 아파트 실거래가. 송도교통 실시간 정보. 생활 가이드</span>
                <span className="hidden sm:block">송도 아파트 실거래가. 송도교통 실시간 정보. 생활 가이드</span>
              </div>
            </div>
          </div>
        </section>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* 페이지 헤더 */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              📚 송도 생활 가이드
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              송도국제도시에서의 생활에 필요한 모든 정보를 실용적인 가이드로 제공합니다
            </p>
          </div>

          {/* 추천 가이드 */}
          {featuredGuides.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                ⭐ 추천 가이드
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {featuredGuides.map((guide) => (
                  <Link
                    key={guide.slug}
                    href={`/guides/${guide.slug}`}
                    className="group bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow p-6"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xl">⭐</span>
                      <span className="text-xs text-gray-500">{guide.readingTime}분 읽기</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {guide.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {guide.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {guide.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <span className="text-xs text-gray-500">
                        {new Date(guide.lastUpdated).toLocaleDateString('ko-KR')}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* 카테고리별 가이드 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              📋 카테고리별 가이드
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {GUIDE_CATEGORIES.map((category) => {
                const categoryGuides = getGuidesByCategory(category.id);
                return (
                  <div
                    key={category.id}
                    className="bg-white rounded-xl shadow-sm border p-6"
                  >
                    <div className="flex items-center mb-4">
                      <span className="text-2xl mr-3">{category.icon}</span>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {category.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {category.description}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {categoryGuides.slice(0, 3).map((guide) => (
                        <Link
                          key={guide.slug}
                          href={`/guides/${guide.slug}`}
                          className="block text-sm text-gray-700 hover:text-blue-600 transition-colors"
                        >
                          • {guide.title}
                        </Link>
                      ))}
                      {categoryGuides.length > 3 && (
                        <Link
                          href={`/guides?category=${category.id}`}
                          className="block text-sm text-blue-600 hover:text-blue-700 font-medium"
                        >
                          + {categoryGuides.length - 3}개 더 보기
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* 최신 가이드 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              🆕 최신 가이드
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {recentGuides.map((guide) => (
                <Link
                  key={guide.slug}
                  href={`/guides/${guide.slug}`}
                  className="group bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow p-6"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                      {GUIDE_CATEGORIES.find(c => c.id === guide.category)?.name}
                    </span>
                    <span className="text-xs text-gray-500">{guide.readingTime}분</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {guide.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {guide.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-xs text-gray-500">
                      <span className="mr-2">📅</span>
                      {new Date(guide.lastUpdated).toLocaleDateString('ko-KR')}
                    </div>
                    <span className="text-xs text-blue-600 group-hover:text-blue-700">
                      읽기 →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </main>
      </div>

      <Footer />
    </>
  );
}