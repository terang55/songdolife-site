'use client';

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';

interface TrainInfo {
  station: string;
  line: string;
  direction: string;
  destination: string;
  arrivalTime: string;
  trainType: string;
  status: string;
  currentLocation: string;
  stationsLeft?: string; // 몇 개 역 남았는지
  updatedAt: string;
}

interface StationInfo {
  name: string;
  code: string;
  exits: string[];
  facilities: string[];
  nearbyPlaces: string[];
}

const stations: StationInfo[] = [
  {
    name: '호구포역',
    code: 'K258',
    exits: ['1번 출구: 청능대로, 호구포길 사거리', '2번 출구: 논현2동 주민센터, 논현포대-논현포대근린공원, 인천동방중·초등학교'],
    facilities: ['엘리베이터', '에스컬레이터', '장애인화장실', '수유실'],
    nearbyPlaces: ['논현포대', '논현포대근린공원', '인천동방중학교', '인천동방초등학교', '논현2동 주민센터', '호구포길 사거리']
  },
  {
    name: '인천논현역',
    code: 'K259',
    exits: [
      '1번 출구: 고잔중학교, 논현고잔동주민센터, 원동초등학교, 에코메트로 5단지·12단지 아파트, 힐스테이트아파트',
      '2번 출구: 남동문화예술회관, 소래도서관, 소래휴먼시아1단지, 송천고등·초등학교',
      '3번 출구: 꿈에그린 6단지, 논현2동주민센터, 동방중·초등학교, 호구포근린공원, 휴먼시아5단지 아파트',
      '4번 출구: 남동고등학교, 냇마을신영지웰아파트, 논현고등학교, 뜨란채 8단지, 신일해피트리 7단지, 온현1동주민센터, 은봉초등학교'
    ],
    facilities: ['엘리베이터', '에스컬레이터', '장애인화장실', '수유실', '무인민원발급기'],
    nearbyPlaces: ['남동문화예술회관', '소래도서관', '에코메트로 아파트단지', '논현고등학교', '남동고등학교', '고잔중학교', '논현고잔동주민센터', '논현2동주민센터', '온현1동주민센터', '호구포근린공원']
  },
  {
    name: '소래포구역',
    code: 'K260',
    exits: [
      '1번 출구: 고잔중학교, 논현고잔동주민센터, 에코메트로 5단지·12단지 아파트, 원동초등학교, 힐스테이트아파트',
      '2번 출구: 냇마을신영지웰아파트, 논현고등·중·초등학교, 논현웰카운티, 논현주공뜨란채11단지, 뜨란채 8단지, 소래초·장도초교'
    ],
    facilities: ['엘리베이터', '에스컬레이터', '장애인화장실', '수유실', '관광안내소'],
    nearbyPlaces: ['소래포구', '소래수산시장', '고잔중학교', '논현고등학교', '논현중학교', '논현초등학교', '소래초등학교', '장도초등학교', '논현고잔동주민센터', '에코메트로 아파트단지']
  }
];

export default function SubwayPage() {
  const [selectedStation, setSelectedStation] = useState('인천논현역');
  const [trainInfo, setTrainInfo] = useState<TrainInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<string>('');
  const [isTestData, setIsTestData] = useState(false);
  const [isServiceEnded, setIsServiceEnded] = useState(false);

  // 실시간 정보 가져오기 (더미 데이터로 시작)
  const fetchTrainInfo = async (stationName: string) => {
    setLoading(true);
    try {
      console.log('🚇 지하철 정보 요청:', stationName);
      const response = await fetch(`/api/subway?station=${encodeURIComponent(stationName)}`);
      const result = await response.json();
      
      console.log('🚇 API 응답:', result);
      
      if (result.success) {
        console.log('✅ 열차 정보 수신:', result.data);
        setTrainInfo(result.data);
        setLastUpdate(new Date().toLocaleTimeString('ko-KR'));
        // 운행종료 및 테스트 데이터 여부 확인
        setIsServiceEnded(result.note && result.note.includes('운행종료'));
        setIsTestData(result.note && result.note.includes('테스트'));
      } else {
        console.error('❌ 지하철 API 오류:', result.error);
        // 오류 시 빈 배열로 설정
        setTrainInfo([]);
        setIsServiceEnded(false);
        setIsTestData(false);
      }
    } catch (error) {
      console.error('❌ 지하철 정보 로딩 오류:', error);
      setTrainInfo([]);
      setIsServiceEnded(false);
      setIsTestData(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrainInfo(selectedStation);
    
    // 30초마다 자동 갱신
    const interval = setInterval(() => {
      fetchTrainInfo(selectedStation);
    }, 30000);
    
    return () => clearInterval(interval);
  }, [selectedStation]);

  const selectedStationInfo = stations.find(s => s.name === selectedStation);

  return (
    <>
      <Head>
        <title>수인분당선 지하철 정보 - 호구포역, 인천논현역, 소래포구역 실시간 도착정보 | 논현동 정보 허브</title>
        <meta name="description" content="수인분당선 호구포역(K258), 인천논현역(K259), 소래포구역(K260) 실시간 열차 도착 정보, 역 출구 안내, 편의시설 정보를 확인하세요. 논현동 주민들을 위한 지하철 종합 정보." />
        <meta name="keywords" content="수인분당선, 호구포역, 인천논현역, 소래포구역, K258, K259, K260, 지하철 시간표, 실시간 도착정보, 논현동 지하철, 전철 정보, 지하철역 출구, 수인선, 분당선" />
        
        {/* Open Graph for Social Media */}
        <meta property="og:title" content="수인분당선 지하철 정보 - 논현동 정보 허브" />
        <meta property="og:description" content="호구포역, 인천논현역, 소래포구역의 실시간 열차 도착 정보와 역 정보를 한눈에 확인하세요." />
        <meta property="og:url" content="https://nonhyeon-info-site.vercel.app/subway" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://nonhyeon-info-site.vercel.app/og-image.jpg" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="수인분당선 지하철 정보 - 논현동 정보 허브" />
        <meta name="twitter:description" content="호구포역, 인천논현역, 소래포구역의 실시간 열차 도착 정보와 역 정보를 한눈에 확인하세요." />
        
        {/* 지역 정보 메타 태그 */}
        <meta name="geo.region" content="KR-28" />
        <meta name="geo.placename" content="인천광역시 남동구" />
        <meta name="geo.position" content="37.3894;126.7317" />
        
        {/* 구조화된 데이터 - 지하철 정보 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "수인분당선 지하철 정보",
              "description": "호구포역, 인천논현역, 소래포구역의 실시간 열차 도착 정보 및 역 상세 정보",
              "url": "https://nonhyeon-info-site.vercel.app/subway",
              "mainEntity": [
                {
                  "@type": "TrainStation",
                  "name": "호구포역",
                  "identifier": "K258",
                  "alternateName": ["호구포", "Hogupo"],
                  "address": {
                    "@type": "PostalAddress",
                    "addressCountry": "KR",
                    "addressRegion": "인천광역시",
                    "addressLocality": "남동구",
                    "streetAddress": "논현동"
                  },
                  "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": 37.3814,
                    "longitude": 126.7286
                  },
                  "amenityFeature": [
                    {"@type": "LocationFeatureSpecification", "name": "엘리베이터"},
                    {"@type": "LocationFeatureSpecification", "name": "에스컬레이터"},
                    {"@type": "LocationFeatureSpecification", "name": "장애인화장실"},
                    {"@type": "LocationFeatureSpecification", "name": "수유실"}
                  ]
                },
                {
                  "@type": "TrainStation",
                  "name": "인천논현역",
                  "identifier": "K259",
                  "alternateName": ["인천논현", "Incheon Nonhyeon"],
                  "address": {
                    "@type": "PostalAddress",
                    "addressCountry": "KR",
                    "addressRegion": "인천광역시",
                    "addressLocality": "남동구",
                    "streetAddress": "논현동"
                  },
                  "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": 37.3990,
                    "longitude": 126.7240
                  },
                  "amenityFeature": [
                    {"@type": "LocationFeatureSpecification", "name": "엘리베이터"},
                    {"@type": "LocationFeatureSpecification", "name": "에스컬레이터"},
                    {"@type": "LocationFeatureSpecification", "name": "장애인화장실"},
                    {"@type": "LocationFeatureSpecification", "name": "수유실"},
                    {"@type": "LocationFeatureSpecification", "name": "무인민원발급기"}
                  ]
                },
                {
                  "@type": "TrainStation",
                  "name": "소래포구역",
                  "identifier": "K260",
                  "alternateName": ["소래포구", "Soraepogu"],
                  "address": {
                    "@type": "PostalAddress",
                    "addressCountry": "KR",
                    "addressRegion": "인천광역시",
                    "addressLocality": "남동구",
                    "streetAddress": "논현동"
                  },
                  "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": 37.4067,
                    "longitude": 126.7194
                  },
                  "amenityFeature": [
                    {"@type": "LocationFeatureSpecification", "name": "엘리베이터"},
                    {"@type": "LocationFeatureSpecification", "name": "에스컬레이터"},
                    {"@type": "LocationFeatureSpecification", "name": "장애인화장실"},
                    {"@type": "LocationFeatureSpecification", "name": "수유실"},
                    {"@type": "LocationFeatureSpecification", "name": "관광안내소"}
                  ]
                }
              ],
              "provider": {
                "@type": "Organization",
                "name": "논현동 정보 허브",
                "url": "https://nonhyeon-info-site.vercel.app"
              },
              "dateModified": new Date().toISOString(),
              "inLanguage": "ko-KR"
            })
          }}
        />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* 네비게이션 바 */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-3 sm:py-4 min-h-[60px]">
              <div className="flex items-center space-x-2 sm:space-x-4">
                <Link 
                  href="/" 
                  className="flex items-center text-green-600 hover:text-green-800 transition-colors touch-manipulation"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  <span className="text-sm sm:text-base">홈으로</span>
                </Link>
                <span className="text-gray-300 hidden sm:inline">|</span>
                <span className="text-gray-700 font-medium text-sm sm:text-base">🚇 지하철 정보</span>
              </div>
              <Link 
                href="/"
                className="inline-flex items-center px-3 py-2 sm:px-4 sm:py-2 bg-green-600 text-white text-xs sm:text-sm font-medium rounded-lg hover:bg-green-700 transition-colors touch-manipulation min-h-[44px] justify-center"
              >
                <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span className="hidden sm:inline">메인 페이지로</span>
                <span className="sm:hidden">메인</span>
              </Link>
            </div>
          </div>
        </div>

        {/* 헤더 */}
        <div className="bg-gradient-to-r from-green-600 to-green-800 text-white py-6 sm:py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">🚇 수인분당선 지하철 정보</h1>
              <p className="text-sm sm:text-base lg:text-lg text-green-100 max-w-2xl mx-auto leading-relaxed">
                논현동 주변 지하철역의 실시간 도착 정보와 편의시설 안내
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
          {/* 역 선택 */}
          <div className="bg-white rounded-xl shadow-sm border p-4 sm:p-6 mb-6 sm:mb-8">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">📍 역 선택</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              {stations.map((station) => (
                <button
                  key={station.name}
                  onClick={() => setSelectedStation(station.name)}
                  className={`p-4 sm:p-4 rounded-xl border-2 transition-all touch-manipulation min-h-[72px] ${
                    selectedStation === station.name
                      ? 'border-green-600 bg-green-50 text-green-800 shadow-md'
                      : 'border-gray-200 hover:border-green-300 hover:bg-green-50 active:bg-green-50'
                  }`}
                >
                  <div className="text-base sm:text-lg font-semibold">{station.name}</div>
                  <div className="text-xs sm:text-sm text-gray-600 mt-1">{station.code}</div>
                </button>
              ))}
            </div>
          </div>

          {/* 실시간 도착 정보 */}
          <div className="bg-white rounded-xl shadow-sm border p-4 sm:p-6 mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3 sm:gap-4">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">🚄 실시간 도착 정보</h2>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
                {lastUpdate && (
                  <span className="text-xs sm:text-sm text-gray-600 order-2 sm:order-1">
                    <span className="hidden sm:inline">마지막 업데이트: </span>
                    <span className="sm:hidden">업데이트: </span>
                    {lastUpdate}
                  </span>
                )}
                <button
                  onClick={() => fetchTrainInfo(selectedStation)}
                  disabled={loading}
                  className="px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors text-sm font-medium touch-manipulation min-h-[44px] w-full sm:w-auto order-1 sm:order-2"
                >
                  {loading ? '새로고침 중...' : '새로고침'}
                </button>
              </div>
            </div>

            <div className="text-center text-xl sm:text-2xl font-bold text-green-800 mb-4 sm:mb-6 py-2 bg-green-50 rounded-lg">
              {selectedStation}
            </div>

            {/* 운행종료 알림 */}
            {isServiceEnded && (
              <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6 rounded-lg">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <span className="text-2xl">🚫</span>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">
                      운행 종료
                    </h3>
                    <div className="mt-2 text-sm text-red-700">
                      <p>현재 운행하지 않는 시간입니다. 운행시간은 오전 5시 30분부터 자정까지입니다.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 테스트 데이터 경고 */}
            {isTestData && !isServiceEnded && (
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded-lg">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <span className="text-2xl">⚠️</span>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800">
                      현재는 지하철 정보가 없습니다
                    </h3>
                    <div className="mt-2 text-sm text-yellow-700">
                      <p>운행이 종료 되었거나, 정보가 제공되지 않습니다.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {loading ? (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                <p className="mt-2 text-gray-600">실시간 정보 로딩 중...</p>
              </div>
            ) : (
              <>
                {/* 운행종료 시에는 열차 정보 표시하지 않음 */}
                {isServiceEnded ? (
                  <div className="text-center py-12">
                    <div className="text-gray-400 mb-4">
                      <span className="text-6xl">🌙</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">운행이 종료되었습니다</h3>
                    <p className="text-gray-600">내일 오전 5시 30분부터 운행을 재개합니다.</p>
                  </div>
                ) : trainInfo.length > 0 ? (
                  <>
                    {/* 방향별 분리 표시 */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                      {/* 상행 (서울 방향) */}
                      <div className="space-y-3 sm:space-y-4">
                        <div className="flex items-center justify-center bg-blue-50 py-2.5 sm:py-3 rounded-lg border-2 border-blue-200">
                          <span className="text-blue-700 font-bold text-base sm:text-lg">🔵 상행 (서울 방향)</span>
                        </div>
                        {trainInfo
                          .filter(train => train.direction === '상행')
                          .map((train, index) => (
                            <div key={`up-${index}`} className="bg-white rounded-xl shadow-md p-3 sm:p-4 border-l-4 border-blue-500 hover:shadow-lg transition-shadow">
                              <div className="flex flex-col sm:flex-row justify-between items-start mb-3 gap-2 sm:gap-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-1 rounded-full">
                                    {train.trainType}
                                  </span>
                                  <span className="text-blue-600 font-medium text-sm sm:text-base">↗️ {train.destination}</span>
                                </div>
                                <span className="text-xs text-gray-400 order-first sm:order-last">
                                  {new Date(train.updatedAt).toLocaleTimeString('ko-KR')}
                                </span>
                              </div>
                              
                              <div className="space-y-1.5 sm:space-y-2 mb-3">
                                <div className="text-xs sm:text-sm text-gray-600">
                                  🚇 현재 위치: {train.currentLocation}
                                </div>
                                {train.stationsLeft && (
                                  <div className="flex items-center gap-1">
                                    <span className="text-orange-500">📍</span>
                                    <span className="text-xs sm:text-sm font-medium text-orange-600">{train.stationsLeft}</span>
                                  </div>
                                )}
                              </div>
                              
                              <div className="flex justify-between items-center">
                                <span className="text-lg sm:text-xl font-bold text-blue-600">
                                  {train.arrivalTime}
                                </span>
                                <span className={`px-2.5 sm:px-3 py-1 rounded-full text-xs font-medium ${
                                  train.status === '도착' ? 'bg-green-100 text-green-800' :
                                  train.status === '진입' ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-blue-100 text-blue-800'
                                }`}>
                                  {train.status}
                                </span>
                              </div>
                            </div>
                          ))}
                        {trainInfo.filter(train => train.direction === '상행').length === 0 && (
                          <div className="text-center py-6 text-gray-500">
                            <span className="text-2xl">🚫</span>
                            <p className="mt-2">상행 열차 정보 없음</p>
                          </div>
                        )}
                      </div>

                      {/* 하행 (인천 방향) */}
                      <div className="space-y-3 sm:space-y-4">
                        <div className="flex items-center justify-center bg-red-50 py-2.5 sm:py-3 rounded-lg border-2 border-red-200">
                          <span className="text-red-700 font-bold text-base sm:text-lg">🔴 하행 (인천 방향)</span>
                        </div>
                        {trainInfo
                          .filter(train => train.direction === '하행')
                          .map((train, index) => (
                            <div key={`down-${index}`} className="bg-white rounded-xl shadow-md p-3 sm:p-4 border-l-4 border-red-500 hover:shadow-lg transition-shadow">
                              <div className="flex flex-col sm:flex-row justify-between items-start mb-3 gap-2 sm:gap-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className="inline-block bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-1 rounded-full">
                                    {train.trainType}
                                  </span>
                                  <span className="text-red-600 font-medium text-sm sm:text-base">↙️ {train.destination}</span>
                                </div>
                                <span className="text-xs text-gray-400 order-first sm:order-last">
                                  {new Date(train.updatedAt).toLocaleTimeString('ko-KR')}
                                </span>
                              </div>
                              
                              <div className="space-y-1.5 sm:space-y-2 mb-3">
                                <div className="text-xs sm:text-sm text-gray-600">
                                  🚇 현재 위치: {train.currentLocation}
                                </div>
                                {train.stationsLeft && (
                                  <div className="flex items-center gap-1">
                                    <span className="text-orange-500">📍</span>
                                    <span className="text-xs sm:text-sm font-medium text-orange-600">{train.stationsLeft}</span>
                                  </div>
                                )}
                              </div>
                              
                              <div className="flex justify-between items-center">
                                <span className="text-lg sm:text-xl font-bold text-red-600">
                                  {train.arrivalTime}
                                </span>
                                <span className={`px-2.5 sm:px-3 py-1 rounded-full text-xs font-medium ${
                                  train.status === '도착' ? 'bg-green-100 text-green-800' :
                                  train.status === '진입' ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-red-100 text-red-800'
                                }`}>
                                  {train.status}
                                </span>
                              </div>
                            </div>
                          ))}
                        {trainInfo.filter(train => train.direction === '하행').length === 0 && (
                          <div className="text-center py-6 text-gray-500">
                            <span className="text-2xl">🚫</span>
                            <p className="mt-2">하행 열차 정보 없음</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <div className="text-gray-500 mb-4">
                      <span className="text-4xl">🚫</span>
                    </div>
                    <p className="text-gray-600 mb-2">현재 운행 정보를 가져올 수 없습니다.</p>
                    <p className="text-sm text-gray-500">
                      API 연결 상태를 확인하거나 잠시 후 다시 시도해주세요.
                    </p>
                    <button
                      onClick={() => fetchTrainInfo(selectedStation)}
                      className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      다시 시도
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

          {/* 역 상세 정보 */}
          {selectedStationInfo && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
              {/* 출구 정보 */}
              <div className="bg-white rounded-xl shadow-sm border p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">🚪 출구 정보</h3>
                <div className="space-y-2 sm:space-y-3">
                  {selectedStationInfo.exits.map((exit, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg">
                      <div className="text-xs sm:text-sm font-medium text-gray-900 leading-relaxed">{exit}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 편의시설 */}
              <div className="bg-white rounded-xl shadow-sm border p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">🏢 편의시설</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedStationInfo.facilities.map((facility, index) => (
                    <div key={index} className="flex items-center gap-2 p-2.5 bg-blue-50 rounded-lg">
                      <span className="text-blue-600 text-sm">✓</span>
                      <span className="text-xs sm:text-sm text-gray-900">{facility}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 주변 명소 */}
              <div className="bg-white rounded-xl shadow-sm border p-4 sm:p-6 lg:col-span-2">
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">📍 주변 명소 및 시설</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-3">
                  {selectedStationInfo.nearbyPlaces.map((place, index) => (
                    <div key={index} className="p-2.5 sm:p-3 bg-yellow-50 rounded-lg text-center">
                      <div className="text-xs sm:text-sm font-medium text-gray-900">{place}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 수인분당선 노선 정보 */}
          <div className="bg-white rounded-xl shadow-sm border p-4 sm:p-6 mt-6 sm:mt-8">
            <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">🗺️ 수인분당선 노선 정보</h3>
            <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
              <div className="space-y-2 sm:space-y-3">
                <div className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  <strong className="text-gray-800">운행 구간:</strong> 인천역 ↔ 청량리역
                </div>
                <div className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  <strong className="text-gray-800">운행 시간:</strong> 첫차 약 05:00 ~ 막차 약 24:00 (역별로 다름)
                </div>
                <div className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  <strong className="text-gray-800">배차 간격:</strong> 평일 6-8분 / 주말 8-12분
                </div>
                <div className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-3 sm:mb-4">
                  <strong className="text-gray-800">주요 경유역:</strong> 인천, 송도, 수원, 분당, 왕십리, 청량리
                </div>
                
                <div className="flex flex-wrap gap-1.5 sm:gap-2 text-xs">
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded">논현동 구간</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded">호구포역</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded font-bold">인천논현역</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded">소래포구역</span>
                </div>
              </div>
            </div>
          </div>

          {/* 안내사항 */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 sm:p-4 mt-6 sm:mt-8">
            <div className="flex">
              <div className="flex-shrink-0">
                <span className="text-yellow-400 text-lg">⚠️</span>
              </div>
              <div className="ml-2 sm:ml-3">
                <h3 className="text-sm font-medium text-yellow-800 mb-2">안내사항</h3>
                <div className="space-y-1 text-xs sm:text-sm text-yellow-700">
                  <p>• 실시간 정보는 실제와 다를 수 있습니다.</p>
                  <p>• 지연 및 운행 중단 시 역내 안내방송을 확인해 주세요.</p>
                  <p>• 더 정확한 정보는 코레일톡 앱을 이용해 주세요.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <footer className="bg-gray-800 text-white py-8 sm:py-12 mt-8 sm:mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
              {/* 브랜드 정보 */}
              <div className="flex flex-col items-center md:items-start">
                <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
                  <span className="text-2xl sm:text-3xl">🏙️</span>
                  <div>
                    <div className="text-lg sm:text-xl font-bold">논현동 정보 허브</div>
                    <div className="text-sm text-gray-400">인천 남동구 논현동 지역 정보</div>
                  </div>
                </div>
                <p className="text-sm text-gray-300 text-center md:text-left max-w-sm">
                  논현동 주민들을 위한 실시간 지역 정보를 제공합니다. 뉴스, 맛집, 카페, 부동산, 육아 정보를 한눈에 확인하세요.
                </p>
              </div>

              {/* 주요 지역 */}
              <div className="text-center md:text-left">
                <h3 className="text-sm sm:text-base font-semibold mb-3 sm:mb-4">주요 지역</h3>
                <ul className="space-y-1 sm:space-y-2 text-sm text-gray-300">
                  <li>📍 논현동</li>
                  <li>🚇 에코메트로</li>
                  <li>🦐 소래포구</li>
                  <li>⚓ 호구포</li>
                  <li>🏗️ 논현지구</li>
                </ul>
              </div>

              {/* 비즈니스 문의 */}
              <div className="text-center md:text-left">
                <h3 className="text-sm sm:text-base font-semibold mb-3 sm:mb-4">비즈니스 문의</h3>
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
                  <div className="flex items-center justify-center md:justify-start space-x-2">
                    <span className="text-base">💼</span>
                    <span>제휴 및 사이트 문의</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 하단 구분선 및 저작권 */}
            <div className="border-t border-gray-700 pt-6 sm:pt-8">
              <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
                <div className="text-xs sm:text-sm text-gray-400">
                  © 2025 논현동 정보 허브. 모든 권리 보유.
                </div>
                <div className="flex items-center space-x-4 text-xs sm:text-sm">
                  <Link 
                    href="/privacy" 
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    개인정보처리방침
                  </Link>
                  <span className="text-gray-600">|</span>
                  <Link 
                    href="/terms" 
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    이용약관
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
} 