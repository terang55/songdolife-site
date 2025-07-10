import type { Metadata } from 'next';
import Footer from '../components/Footer';
import RealEstateWidget from '../components/RealEstateWidget';
import { generateBreadcrumbSchema } from '@/lib/seo';
import Breadcrumb from '../components/Breadcrumb';
import RelatedLinks from '../components/RelatedLinks';
import { getRealEstateBreadcrumb } from '@/lib/breadcrumb-utils';
import { getRealEstateRelatedLinks } from '@/lib/related-links-utils';
import Script from 'next/script';

export const metadata: Metadata = {
  title: '송도 부동산 실거래가 | 송도라이프',
  description: '송도국제도시 아파트 실거래가 정보를 실시간으로 확인하세요. 국토교통부 공식 데이터 기반 최신 거래 현황을 제공합니다.',
  keywords: '송도 부동산, 송도 아파트, 송도 실거래가, 센트럴파크 아파트, 국제업무지구 아파트, 송도 매매',
  openGraph: {
    title: '송도 부동산 실거래가 | 송도라이프',
    description: '송도국제도시 아파트 실거래가를 실시간으로 확인하세요',
    url: 'https://songdolife.info/realestate',
    siteName: '송도라이프',
    images: [
      {
        url: 'https://songdolife.info/og-image.jpg',
        width: 1200,
        height: 630,
        alt: '송도라이프 - 송도 부동산 정보'
      }
    ],
    locale: 'ko_KR',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: '송도 부동산 실거래가 | 송도라이프',
    description: '송도국제도시 아파트 실거래가를 실시간으로 확인하세요',
    images: ['https://songdolife.info/og-image.jpg']
  }
};

export default function RealEstatePage() {
  // 브레드크럼 및 관련 링크 데이터
  const breadcrumbItems = getRealEstateBreadcrumb();
  const relatedLinks = getRealEstateRelatedLinks();

  return (
    <>
      {/* 구조화된 데이터 */}
      <Script
        id="breadcrumb-ldjson"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbSchema([
            { name: '홈', path: '/' },
            { name: '부동산 정보', path: '/realestate' }
          ]))
        }}
      />

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-14 sm:h-16">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <span className="text-2xl sm:text-3xl">🏙️</span>
                <div>
                  <a href="/" className="text-lg sm:text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
                    🏠 송도라이프
                  </a>
                  <p className="text-xs sm:text-sm text-gray-500">송도에서의 매일매일</p>
                </div>
              </div>
              <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <span className="text-base">🏢</span>
                  <span className="text-xs">부동산 실거래정보</span>
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
                  href="/" 
                  className="flex items-center space-x-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors min-h-[44px] w-full sm:w-auto justify-center"
                >
                  <span className="text-lg">🏠</span>
                  <span className="text-sm font-medium">홈으로</span>
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
                <span className="block sm:hidden">송도 아파트 실거래가 정보</span>
                <span className="hidden sm:block">송도 아파트 실거래가 정보. 매월 업데이트되는 최신 시세</span>
              </div>
            </div>
          </div>
        </section>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* 브레드크럼 네비게이션 */}
          <Breadcrumb items={breadcrumbItems} />

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
                <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                  <h3 className="font-semibold text-purple-800 mb-2">시내버스</h3>
                  <ul className="space-y-1 list-disc list-inside">
                    <li>16, 82, 103, 780-1 등 송도 ↔ 인천 전역</li>
                  </ul>
                </div>
              </div>
            </div>
          </div> {/* end 현재 운행 노선 card */}

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
                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                  <h3 className="font-semibold text-red-800 mb-2">제3경인선(가칭)</h3>
                  <ul className="space-y-1 list-disc list-inside">
                    <li>부천 종합운동장 ↔ 송도(연장 검토)</li>
                    <li>경인남부 교통 분산 기대</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div> {/* end of grid wrapper */}

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
          <RelatedLinks links={relatedLinks} />
        </main>
      </div>

      <Footer />
    </>
  );
} 