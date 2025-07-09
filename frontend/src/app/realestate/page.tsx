import React from 'react';
import Link from 'next/link';
import RealEstateWidget from '../components/RealEstateWidget';
import Head from 'next/head';
import type { Metadata } from 'next';
import { BASE_URL } from '@/lib/siteConfig';
import Footer from '../components/Footer';
import { generateBreadcrumbSchema } from '@/lib/seo';
import Breadcrumb, { getRealEstateBreadcrumb } from '../components/Breadcrumb';
import RelatedLinks, { getRealEstateRelatedLinks } from '../components/RelatedLinks';

export const metadata: Metadata = {
  title: '송도 부동산 실거래가 | 더샵·센트럴파크 아파트 시세 | 송도라이프',
  description: '송도 주요 단지 실거래가, 평당가, 거래 통계를 실시간 제공. 매매·전세·월세 가격 비교 및 시장 동향 분석.',
  keywords: [
    '송도 부동산', '송도 아파트', '송도 실거래가', '더샵', '센트럴파크', 
    '송도 아파트 매매', '평당가', '부동산 가격', '국토부 실거래', '연수구 부동산',
    '아파트 시세', '매매 가격', '전세 가격', '월세 정보', '부동산 시장', '송도지구 아파트',
    '인천 부동산', '아파트 매매', '주택 가격', '부동산 투자', '송도동 시세',
    '연수구 송도동 부동산', '인천시 연수구 송도동', '연수구 송도동 아파트'
  ],
  openGraph: {
    title: '송도 부동산 실거래가 | 더샵·센트럴파크 아파트 시세',
    description: '송도 주요 단지 실거래가, 평당가, 거래 통계를 실시간 제공. 매매·전세·월세 가격 비교 및 시장 동향 분석.',
    url: `${BASE_URL}/realestate`,
    type: 'website',
    siteName: '송도라이프',
    images: [
      {
        url: `${BASE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: '송도 부동산 실거래가 정보 - 송도라이프'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: '송도 부동산 실거래가 | 더샵·센트럴파크 아파트 시세',
    description: '송도 주요 단지 실거래가, 평당가, 거래 통계를 실시간 제공.',
    images: [`${BASE_URL}/og-image.jpg`]
  },
  alternates: { canonical: `${BASE_URL}/realestate` },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  other: {
    'geo.region': 'KR-28',
    'geo.placename': '인천광역시 연수구 송도동',
    'geo.position': '37.538603;126.722675',
    'ICBM': '37.538603, 126.722675',
  },
};

export default function RealEstatePage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: '송도 아파트 실거래가',
    description: '국토교통부 실거래가 공개시스템 기반 최신 3개월 데이터',
    url: `${BASE_URL}/realestate`,
    keywords: ['송도 실거래가','더샵','센트럴파크'],
    creator: { '@type': 'Organization', name: '송도라이프' },
    license: 'https://www.law.go.kr'
  };

  const breadcrumbData = generateBreadcrumbSchema([
    { name: '홈', path: '/' },
    { name: '부동산', path: '/realestate' }
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }} />
      </Head>
      {/* 헤더 */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* 로고 및 제목 */}
            <div className="flex items-center space-x-3">
              <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
                <span className="text-2xl">🏙️</span>
                <div>
                  <div className="text-xl font-bold text-gray-900">송도라이프</div>
                  <div className="text-sm text-gray-500">부동산 정보</div>
                </div>
              </Link>
            </div>
            
            {/* 네비게이션 */}
            <nav className="hidden sm:flex items-center space-x-6">
              <Link 
                href="/" 
                className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
              >
                🏠 홈
              </Link>
              <Link 
                href="/realestate" 
                className="text-blue-600 font-medium border-b-2 border-blue-600 pb-1"
              >
                🏢 부동산
              </Link>
              <Link 
                href="/subway" 
                className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
              >
                🚇 실시간 교통
              </Link>
            </nav>

            {/* 모바일 네비게이션 */}
            <div className="sm:hidden flex items-center space-x-4">
              <Link 
                href="/" 
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                🏠
              </Link>
              <Link 
                href="/subway" 
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                🚇
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 브레드크럼 네비게이션 */}
        <Breadcrumb items={getRealEstateBreadcrumb()} />

        {/* 페이지 제목 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🏢 송도 부동산 실거래가
          </h1>
          <p className="text-gray-600">
            송도국제도시 아파트 실거래가 정보를 실시간으로 확인하세요.
          </p>
        </div>

        {/* 부동산 위젯 (전체 너비로 확장) */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <RealEstateWidget />
        </div>

        {/* 추가 정보 섹션 */}
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {/* 현재 운행 노선 */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              ✅ 현재 운행 노선
            </h2>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-blue-800 mb-2 flex items-center">
                  🚇 인천 1호선
                </h3>
                <div className="text-sm text-gray-700 space-y-2">
                  <div>
                    <span className="font-medium">전체 구간:</span> 계양역 ↔ 송도달빛축제공원역 (37개 역)
                  </div>
                  <div>
                    <span className="font-medium">송도 구간:</span> 캠퍼스타운 → 테크노파크 → 지식정보단지 → 인천대입구 → 센트럴파크 → 국제업무지구 → 송도달빛축제공원
                  </div>
                  <div className="mt-3 p-2 bg-blue-100 rounded text-xs">
                    <div className="font-medium text-blue-900 mb-1">주요 환승역</div>
                    <div className="text-blue-800 space-y-1">
                      <div>• 원인재역: 수인·분당선 환승</div>
                      <div>• 부평구청역: 수도권 1호선 환승</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                <h4 className="font-medium text-gray-800 mb-2">운행 정보</h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <div>• <span className="font-medium">운행시간:</span> 05:30 ~ 00:10-00:30</div>
                  <div>• <span className="font-medium">배차간격:</span> 출퇴근 4-6분, 평시 7-10분</div>
                  <div>• <span className="font-medium">서울 시내까지:</span> 환승 1회로 접근</div>
                </div>
              </div>

              <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                <h3 className="font-semibold text-red-800 mb-2 flex items-center">
                  🚌 광역급행버스
                </h3>
                <div className="space-y-3">
                  <div className="p-2 bg-red-100 rounded">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-red-900">M6405</span>
                      <span className="text-xs bg-red-200 text-red-700 px-2 py-1 rounded">운행중</span>
                    </div>
                    <div className="text-xs text-gray-700 space-y-1">
                      <div>• 송도(웰카운티) → 서울 강남권(삼성역·교대역)</div>
                      <div>• 제3경인고속화도로 경유 직행</div>
                      <div>• 배차간격: 출퇴근 10-15분, 평시 15-30분</div>
                      <div>• 요금: 교통카드 3,400원</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 미래 운행 노선 */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              🚀 미래 교통 계획
            </h2>
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-semibold text-blue-800">GTX-B 노선 (수도권광역급행철도)</h4>
                  <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">2031년</span>
                </div>
                <div className="text-xs text-gray-600 space-y-1">
                  <div>• 송도(인천대입구역) → 마석역 (남양주)</div>
                  <div>• 총 연장: 82.7km, 14개 정거장</div>
                  <div>• 송도 → 서울역: 27-30분 (기존 80-110분)</div>
                  <div>• 최고속도: 180km/h, 평균 100km/h</div>
                </div>
              </div>

              <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-semibold text-green-800">송도트램 (순환형)</h4>
                  <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded">2032년</span>
                </div>
                <div className="text-xs text-gray-600 space-y-1">
                  <div>• 송도달빛축제공원역 → 인천대입구역 → 연세대 → 지식정보단지역</div>
                  <div>• 총 연장: 23.06km, 30개 정거장</div>
                  <div>• 도시 내 이동시간: 45분 → 28분 (38% 단축)</div>
                  <div>• 사업비: 4,429억원 (국비 60%)</div>
                </div>
              </div>

              <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-semibold text-purple-800">인천 1호선 연장 (8공구)</h4>
                  <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded">계획중</span>
                </div>
                <div className="text-xs text-gray-600 space-y-1">
                  <div>• GTX-B와 연계한 환승 허브 구축</div>
                  <div>• 송도 내부 접근성 강화</div>
                  <div>• 트램과의 환승 연계 시스템</div>
                </div>
              </div>
            </div>

            {/* 교통 허브 전망 */}
            <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border">
              <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                🌟 송도 교통 허브 전망
              </h4>
              <div className="text-sm text-gray-700 space-y-1">
                <div>• <strong>현재:</strong> 인천 1호선 1개 노선</div>
                <div>• <strong>미래:</strong> GTX-B + 송도트램 + 인천1호선 통합</div>
                <div>• <strong>효과:</strong> 수도권 서부 메가 허브 완성</div>
              </div>
              <div className="mt-2 p-2 bg-white rounded text-xs">
                <div className="text-center font-medium text-gray-800">
                  GTX-B ↔ 송도트램 ↔ 인천 1호선 환승 시스템
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 안내 사항 */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2 flex items-center">
            💡 실거래가 정보 안내
          </h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• 국토교통부 실거래가 공개시스템 기준 데이터입니다.</li>
            <li>• 최근 3개월간의 거래 내역을 제공합니다.</li>
            <li>• 평당 가격은 3.3㎡ 기준으로 계산됩니다.</li>
            <li>• 데이터는 주기적으로 업데이트됩니다.</li>
          </ul>
        </div>

        {/* 관련 링크 섹션 */}
        <RelatedLinks links={getRealEstateRelatedLinks()} />
      </main>

      {/* 공통 푸터 */}
      <Footer variant="dark" />
    </div>
  );
} 