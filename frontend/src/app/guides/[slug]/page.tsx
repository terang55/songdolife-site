import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getGuideBySlug, getRelatedGuides, generateGuideMetadata, getCategoryInfo } from '@/lib/guide-utils';
import Footer from '../../components/Footer';
import { generateBreadcrumbSchema } from '@/lib/seo';
import Script from 'next/script';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  
  if (!guide) {
    return {
      title: '가이드를 찾을 수 없습니다 | 송도라이프'
    };
  }

  const metadata = generateGuideMetadata(guide);
  
  return {
    title: metadata.title,
    description: metadata.description,
    keywords: metadata.keywords,
    openGraph: {
      title: metadata.openGraph.title,
      description: metadata.openGraph.description,
      url: metadata.canonicalUrl,
      siteName: '송도라이프',
      images: [
        {
          url: metadata.openGraph.image,
          width: 1200,
          height: 630,
          alt: guide.title
        }
      ],
      locale: 'ko_KR',
      type: 'article'
    },
    twitter: {
      card: 'summary_large_image',
      title: metadata.openGraph.title,
      description: metadata.openGraph.description,
      images: [metadata.openGraph.image]
    }
  };
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  
  if (!guide) {
    notFound();
  }

  const relatedGuides = getRelatedGuides(guide);
  const categoryInfo = getCategoryInfo(guide.category);
  const metadata = generateGuideMetadata(guide);

  return (
    <>
      <Script
        id="guide-structured-data"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(metadata.structuredData)
        }}
      />
      
      <Script
        id="breadcrumb-ldjson"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbSchema([
            { name: '홈', path: '/' },
            { name: '생활 가이드', path: '/guides' },
            { name: guide.title, path: `/guides/${slug}` }
          ]))
        }}
      />

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-14 sm:h-16">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <span className="text-2xl sm:text-3xl">{categoryInfo?.icon || '📚'}</span>
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
                  <span className="text-xs">{categoryInfo?.name} 가이드</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* 네비게이션 */}
        <section className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center py-3 sm:py-4 gap-4">
              <Link 
                href="/" 
                className="flex items-center space-x-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <span className="text-lg">🏠</span>
                <span className="text-sm font-medium">홈으로</span>
              </Link>
              <Link 
                href="/guides" 
                className="flex items-center space-x-2 px-4 py-2.5 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                <span className="text-lg">📚</span>
                <span className="text-sm font-medium">가이드 목록</span>
              </Link>
            </div>
          </div>
        </section>

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* 가이드 헤더 */}
          <div className="bg-white rounded-xl shadow-sm border p-8 mb-8">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                {categoryInfo?.name}
              </span>
              <span className="text-xs text-gray-500">
                {guide.readingTime}분 읽기
              </span>
              <span className="text-xs text-gray-500">
                {guide.difficulty === 'easy' ? '쉬움' : guide.difficulty === 'medium' ? '보통' : '어려움'}
              </span>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {guide.title}
            </h1>
            
            <p className="text-lg text-gray-600 mb-6">
              {guide.description}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-2">
                {guide.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              <div className="text-sm text-gray-500">
                최종 수정: {new Date(guide.lastUpdated).toLocaleDateString('ko-KR')}
              </div>
            </div>
          </div>

          {/* 가이드 내용 */}
          <div className="bg-white rounded-xl shadow-sm border p-8 mb-8">
            <div 
              className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700 prose-strong:text-gray-900 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline"
              dangerouslySetInnerHTML={{ __html: guide.content }}
            />
          </div>

          {/* 관련 가이드 */}
          {relatedGuides.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm border p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                🔗 관련 가이드
              </h2>
              <div className="grid gap-4 md:grid-cols-3">
                {relatedGuides.map((relatedGuide) => (
                  <Link
                    key={relatedGuide.slug}
                    href={`/guides/${relatedGuide.slug}`}
                    className="group p-4 border rounded-lg hover:shadow-sm transition-shadow"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        {getCategoryInfo(relatedGuide.category)?.name}
                      </span>
                      <span className="text-xs text-gray-500">{relatedGuide.readingTime}분</span>
                    </div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                      {relatedGuide.title}
                    </h3>
                    <p className="text-xs text-gray-600 line-clamp-2">
                      {relatedGuide.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>

      <Footer />
    </>
  );
}