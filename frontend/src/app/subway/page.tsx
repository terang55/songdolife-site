'use client';

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { generateBreadcrumbSchema } from '@/lib/seo';

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
  remainingMinutes?: number; // 남은 시간(분)
  updatedAt: string;
}

interface BusArrival {
  routeId: string; // 항상 'M6410'
  stationName: string; // 버스번호 → 정류장명
  direction: string; // 다음 정류장 안내 문구
  remainingStops: number; // 현재 정류장 순번(1~)
  lowFloor: boolean; // 저상버스 여부
  congestion: string; // 혼잡도
  towards: '강남행' | '인천행'; // 진행 방향
  updatedAt: string; // 갱신 시각
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
    name: '센트럴파크역',
    code: 'K258',
    exits: ['1번 출구: 센트럴파크, 트리플스트리트', '2번 출구: 송도 더샵 아파트, 현대프리미엄아울렛'],
    facilities: ['엘리베이터', '에스컬레이터', '장애인화장실', '수유실'],
    nearbyPlaces: ['센트럴파크', '트리플스트리트', '송도 더샵', '현대프리미엄아울렛', '송도국제도시']
  },
  {
    name: '송도역',
    code: 'K259',
    exits: ['1번 출구: 송도국제도시, 연세대 국제캠퍼스', '2번 출구: 송도 트리플스트리트, 센트럴파크'],
    facilities: ['엘리베이터', '에스컬레이터', '장애인화장실', '수유실', '무인민원발급기'],
    nearbyPlaces: ['송도국제도시', '연세대 국제캠퍼스', '트리플스트리트', '센트럴파크']
  }
];

const BUS_FEATURE_DISABLED = false; // 광역버스 실시간 정보 기능 활성화 (M6410 G-BIS API)

export default function SubwayPage() {
  const [selectedStation, setSelectedStation] = useState('센트럴파크역');
  const [trainInfo, setTrainInfo] = useState<TrainInfo[]>([]);
  const [busInfo, setBusInfo] = useState<BusArrival[]>([]);
  const [loading, setLoading] = useState(false);
  const [busLoading, setBusLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<string>('');
  const [busLastUpdate, setBusLastUpdate] = useState<string>('');
  const [isTestData, setIsTestData] = useState(false);
  const [isServiceEnded, setIsServiceEnded] = useState(false);
  const [busServiceEnded, setBusServiceEnded] = useState(false);
  const [isRealBusAPI, setIsRealBusAPI] = useState(false);

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

  // 버스 정보 가져오기 (M6410 G-BIS API)
  const fetchBusInfo = async () => {
    if (BUS_FEATURE_DISABLED) {
      console.log('🚌 버스 기능이 비활성화되어 있습니다.');
      return;
    }
    
    console.log('🚌 버스 정보 요청 시작...');
    setBusLoading(true);
    
    try {
      const response = await fetch('/api/bus');
      console.log('🚌 버스 API 응답 상태:', response.status);
      
      const result = await response.json();
      console.log('🚌 버스 API 응답 데이터:', result);
      
      if (result.success && result.data && result.data.length > 0) {
        console.log('✅ 버스 데이터 수신 성공:', result.data.length, '개');
        setBusInfo(result.data);
        setBusLastUpdate(new Date().toLocaleTimeString('ko-KR'));
        setBusServiceEnded(result.note && result.note.includes('운행종료'));
        setIsRealBusAPI(result.dataSource === 'gbis_api');
      } else {
        console.log('❌ 버스 데이터 없음 또는 실패:', result);
        setBusInfo([]);
        setBusServiceEnded(false);
        setIsRealBusAPI(false);
      }
    } catch (error) {
      console.error('❌ 버스 정보 로딩 오류:', error);
      setBusInfo([]);
      setBusServiceEnded(false);
      setIsRealBusAPI(false);
    } finally {
      setBusLoading(false);
    }
  };

  // 페이지 진입 및 역 변경 시 한 번만 데이터 로드 (자동 갱신 제거)
  useEffect(() => {
    fetchTrainInfo(selectedStation);
    if (!BUS_FEATURE_DISABLED) {
      fetchBusInfo();
    }
  }, [selectedStation]);

  const selectedStationInfo = stations.find(s => s.name === selectedStation);

  const getRemainingMinutes = (timeStr: string): number | null => {
    // 1) "HH:MM:SS" 형식
    let m = timeStr.match(/(\d{1,2}):(\d{2}):(\d{2})/);
    if (m) {
      const [ , hh, mm, ss ] = m;
      const now = new Date();
      const target = new Date();
      target.setHours(parseInt(hh), parseInt(mm), parseInt(ss), 0);
      let diff = (target.getTime() - now.getTime()) / 60000; // minutes
      if (diff < 0) diff += 1440; // 다음날 보정
      return Math.round(diff);
    }
    // 2) "N분 후" 패턴
    m = timeStr.match(/(\d+)\s*분/);
    if (m) {
      return parseInt(m[1], 10);
    }
    return null;
  };

  const breadcrumbData = generateBreadcrumbSchema([
    { name: '홈', path: '/' },
    { name: '실시간 교통', path: '/subway' }
  ]);

  return (
    <>
      <Head>
        <title>송도 교통정보 - 지하철·버스 실시간 도착정보 | 송도라이프</title>
        <meta name="description" content="송도국제도시 인천1호선 지하철과 주요 버스의 실시간 도착 정보를 한눈에 확인하세요. 센트럴파크역, 송도역과 주변 버스정류장 정보를 제공합니다." />
        <meta name="keywords" content="송도 교통, 인천1호선, 센트럴파크역, 송도역, 광역버스, 실시간 도착정보, 송도 버스, 송도 지하철, 대중교통, 연수구 송도동 교통, 인천시 연수구 송도동" />
        
        {/* Open Graph for Social Media */}
        <meta property="og:title" content="송도 교통정보 - 지하철·버스 실시간 도착정보" />
        <meta property="og:description" content="송도국제도시 인천1호선 지하철과 주요 버스의 실시간 도착 정보를 한눈에 확인하세요." />
        <meta property="og:url" content="https://nonhyeon-info-site.vercel.app/subway" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://nonhyeon-info-site.vercel.app/og-image.jpg" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="송도 교통정보 - 지하철·버스 실시간 도착정보" />
        <meta name="twitter:description" content="송도국제도시 인천1호선 지하철과 주요 버스의 실시간 도착 정보를 한눈에 확인하세요." />
        
        {/* 지역 정보 메타 태그 */}
        <meta name="geo.region" content="KR-28" />
        <meta name="geo.placename" content="인천광역시 연수구" />
        <meta name="geo.position" content="37.3894;126.7317" />
        
        {/* 구조화된 데이터 - 교통정보 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "송도 교통정보",
              "description": "송도국제도시 인천1호선 지하철과 주요 버스의 실시간 도착 정보",
              "url": "https://nonhyeon-info-site.vercel.app/subway",
              "mainEntity": [
                {
                  "@type": "TrainStation",
                  "name": "센트럴파크역",
                  "identifier": "K258",
                  "alternateName": ["센트럴파크", "Central Park"],
                  "address": {
                    "@type": "PostalAddress",
                    "addressCountry": "KR",
                    "addressRegion": "인천광역시",
                    "addressLocality": "연수구",
                    "streetAddress": "송도동"
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
                  "name": "송도역",
                  "identifier": "K259",
                  "alternateName": ["송도", "Songdo"],
                  "address": {
                    "@type": "PostalAddress",
                    "addressCountry": "KR",
                    "addressRegion": "인천광역시",
                    "addressLocality": "연수구",
                    "streetAddress": "송도동"
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
                }
              ],
              "provider": {
                "@type": "Organization",
                "name": "송도라이프",
                "url": "https://nonhyeon-info-site.vercel.app"
              },
              "dateModified": new Date().toISOString(),
              "inLanguage": "ko-KR"
            })
          }}
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }} />
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
                  <span className="text-sm sm:text-base">홈</span>
                </Link>
                <span className="text-gray-300 hidden sm:inline">|</span>
                <Link 
                  href="/realestate" 
                  className="flex items-center text-blue-600 hover:text-blue-800 transition-colors touch-manipulation"
                >
                  <span className="text-lg mr-1">🏢</span>
                  <span className="text-sm sm:text-base">부동산</span>
                </Link>
                <span className="text-gray-300 hidden sm:inline">|</span>
                <span className="text-gray-700 font-medium text-sm sm:text-base">🚌 교통정보</span>
              </div>
            </div>
          </div>
        </div>

        {/* 헤더 */}
        <div className="bg-gradient-to-r from-green-600 to-green-800 text-white py-6 sm:py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">🚌 송도 교통정보</h1>
              <p className="text-sm sm:text-base lg:text-lg text-green-100 max-w-2xl mx-auto leading-relaxed">
                지하철 · 버스 실시간 도착 정보와 역 안내
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
                  {loading ? '새로고침 중...' : '🚇 지하철 새로고침'}
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
                    <div className="grid grid-cols-1 gap-4 sm:gap-6">
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
                                {(() => {
                                  const rem = train.remainingMinutes ?? getRemainingMinutes(train.arrivalTime);
                                  return rem !== null && rem !== undefined ? (
                                    <span className="text-xs text-gray-500 ml-1">({rem}분)</span>
                                  ) : null;
                                })()}
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
                                {(() => {
                                  const rem = train.remainingMinutes ?? getRemainingMinutes(train.arrivalTime);
                                  return rem !== null && rem !== undefined ? (
                                    <span className="text-xs text-gray-500 ml-1">({rem}분)</span>
                                  ) : null;
                                })()}
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

          {/* 광역버스 실시간 정보 */}
          <div className="bg-white rounded-xl shadow-sm border p-4 sm:p-6 mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3 sm:gap-4">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900">🚌 M6410 실시간 정보</h2>
                {isRealBusAPI && (
                  <span className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full">
                    ✅ 실시간
                  </span>
                )}
                {!isRealBusAPI && busInfo.length > 0 && (
                  <span className="inline-block bg-yellow-100 text-yellow-800 text-xs font-semibold px-2 py-1 rounded-full">
                    ⚠️ 시범서비스
                  </span>
                )}
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
                {busLastUpdate && (
                  <span className="text-xs sm:text-sm text-gray-600 order-2 sm:order-1">
                    <span className="hidden sm:inline">마지막 업데이트: </span>
                    <span className="sm:hidden">업데이트: </span>
                    {busLastUpdate}
                  </span>
                )}
                {!BUS_FEATURE_DISABLED && (
                  <button
                    onClick={() => fetchBusInfo()}
                    disabled={busLoading}
                    className="px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors text-sm font-medium touch-manipulation min-h-[44px] w-full sm:w-auto order-1 sm:order-2"
                  >
                    🚌 버스 새로고침
                  </button>
                )}
              </div>
            </div>

            {/* (중복 제거) 강남행 / 인천행 2컬럼 레이아웃 - 상위 섹션 비활성화 */}

            {/* 운행종료 알림 */}
            {busServiceEnded && (
              <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6 rounded-lg">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <span className="text-2xl">🚫</span>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">
                      버스 운행 종료
                    </h3>
                    <div className="mt-2 text-sm text-red-700">
                      <p>현재 운행하지 않는 시간입니다. 운행시간은 오전 5시부터 자정까지입니다.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {BUS_FEATURE_DISABLED ? (
              <div className="text-center py-6 text-gray-500 text-sm sm:text-base leading-relaxed">
                <p>M6410 광역버스 <span className="font-semibold">실시간 위치 정보</span>는&nbsp;
                  <span className="font-semibold text-red-600">업데이트 예정</span>입니다.</p>
                <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-400">
                  ※ 현재 공공데이터포털 정책상 서버사이드에서의 실시간 호출이 제한되어 있습니다.<br />
                  추후 안정적인 데이터 수집 방법 확보 후 제공될 예정이니 양해 부탁드립니다.
                </p>
              </div>
            ) : busLoading ? (
              <div className="text-gray-500">버스 위치 정보를 불러오는 중...</div>
            ) : busInfo.length > 0 ? (
              <>
                {/* 강남행 / 인천행 2컬럼 레이아웃 */}
                {(() => {
                  const toGangnam = busInfo.filter(b => b.towards === '강남행');
                  const toIncheon = busInfo.filter(b => b.towards === '인천행');

                  const BusCard = ({ bus }: { bus: BusArrival }) => (
                    <div className="bg-white rounded-xl shadow-md p-3 sm:p-4 border-l-4 border-red-500 hover:shadow-lg transition-shadow">
                      {/* 버스 번호 및 현재 위치 */}
                      <div className="flex flex-col sm:flex-row justify-between items-start mb-2 gap-2 sm:gap-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="inline-block bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-1 rounded-full">{bus.routeId}</span>
                          <span className="text-gray-700 font-medium text-sm sm:text-base break-keep">{bus.stationName}</span>
                          {bus.lowFloor && (
                            <span className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-2 py-0.5 rounded ml-2">♿ 저상버스</span>
                          )}
                        </div>
                      </div>
                      {/* 다음 정류장 안내 */}
                      <div className="flex flex-col gap-1 mb-2">
                        <span className="text-sm sm:text-base text-blue-700 font-semibold truncate max-w-full">{bus.direction}</span>
                        <span className="text-xs sm:text-sm text-gray-500">정류장 순번: {bus.remainingStops}</span>
                      </div>
                      {/* 혼잡도 및 상태 */}
                      <div className="flex flex-row flex-wrap gap-1 items-center mt-1">
                        <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">혼잡도: {bus.congestion}</span>
                        <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">운행중</span>
                        {isRealBusAPI && <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">실시간</span>}
                      </div>
                    </div>
                  );

                  const renderColumn = (title: string, color: string, buses: BusArrival[]) => (
                    <div>
                      <div className={`flex items-center justify-center ${color}-50 py-2.5 sm:py-3 rounded-lg border-2 ${color}-200 mb-3`}>
                        <span className={`${color}-700 font-bold text-base sm:text-lg`}>{title}</span>
                      </div>
                      <div className="space-y-3 sm:space-y-4">
                        {buses.map((b, i) => <BusCard key={i} bus={b} />)}
                        {buses.length === 0 && (
                          <div className="text-center py-4 text-gray-400 text-sm">버스 정보 없음</div>
                        )}
                      </div>
                    </div>
                  );

                  return (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                      {renderColumn('🔵 강남행', 'bg-blue', toGangnam)}
                      {renderColumn('🟣 인천행', 'bg-purple', toIncheon)}
                    </div>
                  );
                })()}
              </>
            ) : (
              <div className="text-center py-8">
                <div className="text-gray-500 mb-4">
                  <span className="text-4xl">🚫</span>
                </div>
                <p className="text-gray-600 mb-2">현재 버스 운행 정보를 가져올 수 없습니다.</p>
                <p className="text-sm text-gray-500">
                  API 연결 상태를 확인하거나 잠시 후 다시 시도해주세요.
                </p>
                <button
                  onClick={() => fetchBusInfo()}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  다시 시도
                </button>
              </div>
            )}
              </div>

          {/* 주변 명소만 표시 */}
          {selectedStationInfo && (
            <div className="bg-white rounded-xl shadow-sm border p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">📍 주변 명소 및 시설</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-3">
                  {selectedStationInfo.nearbyPlaces.map((place, index) => (
                    <div key={index} className="p-2.5 sm:p-3 bg-yellow-50 rounded-lg text-center">
                      <div className="text-xs sm:text-sm font-medium text-gray-900">{place}</div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* 교통수단 종합 정보 */}
          <div className="bg-white rounded-xl shadow-sm border p-4 sm:p-6 mt-6 sm:mt-8">
            <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">🗺️ 송도 교통정보</h3>
            
            {/* 지하철 정보 */}
            <div className="bg-gray-50 p-3 sm:p-4 rounded-lg mb-4">
              <h4 className="text-sm font-bold text-gray-800 mb-2">🚇 인천1호선</h4>
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
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded">송도 구간</span>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded">센트럴파크역</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded">송도역</span>
                </div>
              </div>
            </div>

            {/* 버스 정보 */}
            <div className="bg-blue-50 p-3 sm:p-4 rounded-lg">
              <h4 className="text-sm font-bold text-gray-800 mb-2">🚌 광역버스</h4>
              <div className="space-y-2 sm:space-y-3">
                <div className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  <strong className="text-gray-800">M6410:</strong> 송도동 → 인천 → 서울 (강남역, 서울역 방면)
                </div>
                <div className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  <strong className="text-gray-800">운행 시간:</strong> 첫차 약 05:00 ~ 막차 약 24:00
                </div>
                <div className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-3 sm:mb-4">
                  <strong className="text-gray-800">배차 간격:</strong> 20-30분 (시간대별 상이)
                </div>
              
                <div className="flex flex-wrap gap-1.5 sm:gap-2 text-xs">
                  <span className="px-2 py-1 bg-red-100 text-red-800 rounded">M6410</span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded">광역급행</span>
                  <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded">저상버스</span>
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
                  <p>• 지연 및 운행 중단 시 역내/차내 안내방송을 확인해 주세요.</p>
                  <p>• 지하철: 코레일톡 앱, 버스: 시내버스 앱을 이용해 주세요.</p>
                  {isRealBusAPI ? (
                    <p>• M6410 버스 정보는 인천광역시 공식 API를 사용합니다.</p>
                  ) : (
                    <p>• 현재 M6410 버스 정보는 시범 서비스입니다.</p>
                  )}
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
                    <div className="text-lg sm:text-xl font-bold">송도라이프</div>
                    <div className="text-sm text-gray-400">송도동 지역 정보</div>
                  </div>
                </div>
                <p className="text-sm text-gray-300 text-center md:text-left max-w-sm">
                  송도동 주민들을 위한 실시간 지역 정보를 제공합니다. 뉴스, 맛집, 카페, 부동산, 육아 정보를 한눈에 확인하세요.
                </p>
              </div>

              {/* 주요 지역 */}
              <div className="text-center md:text-left">
                <h3 className="text-sm sm:text-base font-semibold mb-3 sm:mb-4">주요 지역</h3>
                <ul className="space-y-1 sm:space-y-2 text-sm text-gray-300">
                  <li>📍 송도국제도시</li>
                  <li>🌳 센트럴파크</li>
                </ul>
              </div>

              {/* 비즈니스 문의 */}
              <div className="text-center md:text-left">
                <h3 className="text-sm sm:text-base font-semibold mb-3 sm:mb-4">💼 사이트 문의</h3>
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
                  © 2025 송도라이프. All rights reserved.
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