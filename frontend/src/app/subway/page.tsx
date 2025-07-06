'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { generateBreadcrumbSchema } from '@/lib/seo';

interface TrainSchedule {
  time: string; // "HH:MM" 형식
  destination: string; // 종착역
  direction: '상행' | '하행'; // 진행 방향
  trainType: '일반' | '급행'; // 열차 종류
  isLast?: boolean; // 막차 여부
  isFirst?: boolean; // 첫차 여부
}

interface NextTrainInfo {
  current: TrainSchedule | null;
  next: TrainSchedule | null;
  afterNext: TrainSchedule | null;
  minutesToNext: number | null;
  isServiceTime: boolean;
  serviceStatus: 'running' | 'ended' | 'not_started';
}

interface BusArrival {
  routeId: string; // 항상 'M6405'
  stationName: string; // 버스번호 → 정류장명
  direction: string; // 다음 정류장 안내 문구
  remainingStops: number; // 현재 정류장 순번(1~)
  lowFloor: boolean; // 저상버스 여부
  congestion: string; // 혼잡도
  towards: '강남행' | '인천행'; // 진행 방향
  updatedAt: string; // 갱신 시각
}

const stations = [
  {
    name: '인천대입구역',
    code: 'I136',
    line: '인천1호선',
    coordinates: { lat: 37.3726, lon: 126.6589 },
    nearbyPlaces: ['인천대학교', '송도컨벤시아', '연세대학교 국제캠퍼스', '송도국제도시']
  }
];

// 인천대입구역 시간표 데이터 (예시 - 실제로는 API에서 가져와야 함)
const SAMPLE_SCHEDULE: TrainSchedule[] = [
  // 상행 (검단호수공원 방향)
  { time: "05:30", destination: "검단호수공원", direction: "상행", trainType: "일반", isFirst: true },
  { time: "05:45", destination: "검단호수공원", direction: "상행", trainType: "일반" },
  { time: "06:00", destination: "검단호수공원", direction: "상행", trainType: "일반" },
  { time: "06:15", destination: "검단호수공원", direction: "상행", trainType: "일반" },
  { time: "06:30", destination: "검단호수공원", direction: "상행", trainType: "일반" },
  { time: "06:45", destination: "검단호수공원", direction: "상행", trainType: "일반" },
  { time: "07:00", destination: "검단호수공원", direction: "상행", trainType: "일반" },
  { time: "07:15", destination: "검단호수공원", direction: "상행", trainType: "일반" },
  { time: "07:30", destination: "검단호수공원", direction: "상행", trainType: "일반" },
  { time: "07:45", destination: "검단호수공원", direction: "상행", trainType: "일반" },
  { time: "08:00", destination: "검단호수공원", direction: "상행", trainType: "일반" },
  // ... 더 많은 시간표 데이터
  { time: "23:30", destination: "검단호수공원", direction: "상행", trainType: "일반" },
  { time: "23:45", destination: "검단호수공원", direction: "상행", trainType: "일반", isLast: true },
  
  // 하행 (송도달빛축제공원 방향)
  { time: "05:35", destination: "송도달빛축제공원", direction: "하행", trainType: "일반", isFirst: true },
  { time: "05:50", destination: "송도달빛축제공원", direction: "하행", trainType: "일반" },
  { time: "06:05", destination: "송도달빛축제공원", direction: "하행", trainType: "일반" },
  { time: "06:20", destination: "송도달빛축제공원", direction: "하행", trainType: "일반" },
  { time: "06:35", destination: "송도달빛축제공원", direction: "하행", trainType: "일반" },
  { time: "06:50", destination: "송도달빛축제공원", direction: "하행", trainType: "일반" },
  { time: "07:05", destination: "송도달빛축제공원", direction: "하행", trainType: "일반" },
  { time: "07:20", destination: "송도달빛축제공원", direction: "하행", trainType: "일반" },
  { time: "07:35", destination: "송도달빛축제공원", direction: "하행", trainType: "일반" },
  { time: "07:50", destination: "송도달빛축제공원", direction: "하행", trainType: "일반" },
  { time: "08:05", destination: "송도달빛축제공원", direction: "하행", trainType: "일반" },
  // ... 더 많은 시간표 데이터
  { time: "23:35", destination: "송도달빛축제공원", direction: "하행", trainType: "일반" },
  { time: "23:50", destination: "송도달빛축제공원", direction: "하행", trainType: "일반", isLast: true },
];

const BUS_FEATURE_DISABLED = false; // 광역버스 실시간 정보 기능 활성화 (M6405 G-BIS API)

export default function SubwayPage() {
  const [selectedStation, setSelectedStation] = useState('인천대입구역');
  const [nextTrainInfo, setNextTrainInfo] = useState<NextTrainInfo>({
    current: null,
    next: null,
    afterNext: null,
    minutesToNext: null,
    isServiceTime: false,
    serviceStatus: 'not_started'
  });
  const [busInfo, setBusInfo] = useState<BusArrival[]>([]);
  const [loading, setLoading] = useState(false);
  const [busLoading, setBusLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<string>('');
  const [busLastUpdate, setBusLastUpdate] = useState<string>('');
  const [busServiceEnded, setBusServiceEnded] = useState(false);
  const [isRealBusAPI, setIsRealBusAPI] = useState(false);

  // 시간표 기반 다음 열차 정보 계산
  const calculateNextTrains = (): NextTrainInfo => {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes(); // 분 단위로 변환
    
    // 운행 시간 체크 (05:30 ~ 23:50)
    const serviceStart = 5 * 60 + 30; // 05:30
    const serviceEnd = 23 * 60 + 50; // 23:50
    
    let serviceStatus: 'running' | 'ended' | 'not_started' = 'running';
    if (currentTime < serviceStart) {
      serviceStatus = 'not_started';
    } else if (currentTime > serviceEnd) {
      serviceStatus = 'ended';
    }
    
    const isServiceTime = serviceStatus === 'running';
    
    if (!isServiceTime) {
      return {
        current: null,
        next: null,
        afterNext: null,
        minutesToNext: null,
        isServiceTime: false,
        serviceStatus
      };
    }
    
    // 현재 시간 이후의 열차들 찾기
    const upcomingTrains = SAMPLE_SCHEDULE
      .map(train => {
        const [hours, minutes] = train.time.split(':').map(Number);
        const trainTime = hours * 60 + minutes;
        return { ...train, timeInMinutes: trainTime };
      })
      .filter(train => train.timeInMinutes >= currentTime)
      .sort((a, b) => a.timeInMinutes - b.timeInMinutes);
    
    const nextUpTrains = upcomingTrains.filter(train => train.direction === '상행').slice(0, 3);
    const nextDownTrains = upcomingTrains.filter(train => train.direction === '하행').slice(0, 3);
    
    // 가장 가까운 열차 (상행/하행 중 더 가까운 것)
    const nextUpTrain = nextUpTrains[0];
    const nextDownTrain = nextDownTrains[0];
    
    let nextTrain = null;
    let minutesToNext = null;
    
    if (nextUpTrain && nextDownTrain) {
      if (nextUpTrain.timeInMinutes <= nextDownTrain.timeInMinutes) {
        nextTrain = nextUpTrain;
        minutesToNext = nextUpTrain.timeInMinutes - currentTime;
      } else {
        nextTrain = nextDownTrain;
        minutesToNext = nextDownTrain.timeInMinutes - currentTime;
      }
    } else if (nextUpTrain) {
      nextTrain = nextUpTrain;
      minutesToNext = nextUpTrain.timeInMinutes - currentTime;
    } else if (nextDownTrain) {
      nextTrain = nextDownTrain;
      minutesToNext = nextDownTrain.timeInMinutes - currentTime;
    }
    
    return {
      current: null,
      next: nextTrain,
      afterNext: null,
      minutesToNext,
      isServiceTime: true,
      serviceStatus: 'running'
    };
  };

  // 시간표 정보 가져오기
  const fetchTrainSchedule = useCallback(async (stationName: string) => {
    setLoading(true);
    try {
      console.log('🚇 지하철 시간표 정보 계산:', stationName);
      
      // 실제로는 API에서 시간표 데이터를 가져와야 하지만, 
      // 현재는 로컬 계산으로 처리
      const nextTrains = calculateNextTrains();
      
      console.log('🚇 다음 열차 정보:', nextTrains);
      setNextTrainInfo(nextTrains);
      setLastUpdate(new Date().toLocaleTimeString('ko-KR'));
    } catch (error) {
      console.error('❌ 지하철 시간표 계산 오류:', error);
      setNextTrainInfo({
        current: null,
        next: null,
        afterNext: null,
        minutesToNext: null,
        isServiceTime: false,
        serviceStatus: 'ended'
      });
    } finally {
      setLoading(false);
    }
  }, []);

  // 버스 정보 가져오기 (M6405 G-BIS API)
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
        
        // API 상태 정보 로깅
        if (result.apiStatus) {
          console.log('🔧 API 상태:', result.apiStatus);
        }
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

  // 페이지 진입 및 역 변경 시 한 번만 데이터 로드
  useEffect(() => {
    fetchTrainSchedule(selectedStation);
    if (!BUS_FEATURE_DISABLED) {
      fetchBusInfo();
    }
  }, [selectedStation, fetchTrainSchedule]);

  // 1분마다 시간표 정보 업데이트
  useEffect(() => {
    const interval = setInterval(() => {
      fetchTrainSchedule(selectedStation);
    }, 60000); // 1분마다 업데이트

    return () => clearInterval(interval);
  }, [selectedStation, fetchTrainSchedule]);

  const selectedStationInfo = stations.find(s => s.name === selectedStation);

  const formatTimeRemaining = (minutes: number): string => {
    if (minutes < 1) return '곧 도착';
    if (minutes === 1) return '1분 후';
    return `${minutes}분 후`;
  };

  const getUpcomingTrains = (direction: '상행' | '하행', count: number = 3): TrainSchedule[] => {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();
    
    return SAMPLE_SCHEDULE
      .filter(train => train.direction === direction)
      .map(train => {
        const [hours, minutes] = train.time.split(':').map(Number);
        const trainTime = hours * 60 + minutes;
        return { ...train, timeInMinutes: trainTime };
      })
      .filter(train => train.timeInMinutes >= currentTime)
      .sort((a, b) => a.timeInMinutes - b.timeInMinutes)
      .slice(0, count);
  };

  const breadcrumbData = generateBreadcrumbSchema([
    { name: '홈', path: '/' },
    { name: '실시간 교통', path: '/subway' }
  ]);

  return (
    <>
      <Head>
        <title>송도 교통정보 - 지하철·버스 시간표 및 실시간 정보 | 송도라이프</title>
        <meta name="description" content="송도국제도시 인천1호선 지하철 시간표와 M6405 광역급행버스의 실시간 도착 정보를 한눈에 확인하세요. 인천대입구역 시간표와 송도-강남 직행버스 정보를 제공합니다." />
        <meta name="keywords" content="송도 교통, 인천1호선, 인천대입구역, 지하철 시간표, M6405, 광역급행버스, 송도 강남 직행, 실시간 도착정보, 송도 버스, 송도 지하철, 대중교통, 연수구 송도동 교통, 인천시 연수구 송도동" />
        
        {/* Open Graph for Social Media */}
        <meta property="og:title" content="송도국제도시 교통정보 - 지하철 시간표 및 M6405 광역급행버스" />
        <meta property="og:description" content="송도국제도시 인천1호선 지하철 시간표와 M6405 광역급행버스(송도-강남 직행)의 실시간 도착 정보를 한눈에 확인하세요." />
        <meta property="og:url" content="https://songdo-life-site.vercel.app/subway" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://songdo-life-site.vercel.app/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="송도 교통정보 - 인천1호선 지하철 시간표 및 M6405 광역급행버스" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="송도 교통정보 - 지하철·M6405 광역급행버스 정보" />
        <meta name="twitter:description" content="송도국제도시 인천1호선 지하철 시간표와 M6405 광역급행버스(송도-강남 직행)의 실시간 도착 정보를 한눈에 확인하세요." />
        <meta name="twitter:image" content="https://songdo-life-site.vercel.app/og-image.jpg" />
        
        {/* 지역 정보 메타 태그 */}
        <meta name="geo.region" content="KR-28" />
        <meta name="geo.placename" content="인천광역시 연수구" />
        <meta name="geo.position" content="37.538603;126.722675" />
        <meta name="ICBM" content="37.538603, 126.722675" />
        
        {/* 추가 SEO 메타 태그 */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="bingbot" content="index, follow" />
        <meta name="yandex" content="index, follow" />
        <meta name="revisit-after" content="1 days" />
        <meta name="content-language" content="ko" />
        <meta name="author" content="송도라이프" />
        <meta name="publisher" content="송도라이프" />
        <meta name="copyright" content="© 2024 송도라이프. All rights reserved." />
        
        {/* 페이지 특화 메타 태그 */}
        <meta name="page-topic" content="교통정보" />
        <meta name="page-type" content="실시간 정보" />
        <meta name="audience" content="송도국제도시 주민, 대중교통 이용자" />
        <meta name="coverage" content="인천광역시 연수구 송도동" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />
        
        {/* 구조화된 데이터 - 교통정보 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "송도국제도시 교통정보",
              "description": "송도국제도시 인천1호선 지하철 시간표와 M6405 광역급행버스 실시간 정보",
              "url": "https://songdo-life-site.vercel.app/subway",
              "inLanguage": "ko-KR",
              "dateModified": new Date().toISOString(),
              "datePublished": "2024-01-01T00:00:00+09:00",
              "publisher": {
                "@type": "Organization",
                "name": "송도라이프",
                "url": "https://songdo-life-site.vercel.app",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://songdo-life-site.vercel.app/android-chrome-192x192.png"
                }
              },
              "mainEntity": [
                {
                  "@type": "TransitLine",
                  "name": "인천1호선",
                  "description": "검단호수공원역 ↔ 송도달빛축제공원역 (33개역)",
                  "provider": {
                    "@type": "Organization",
                    "name": "인천교통공사",
                    "url": "https://www.ictr.or.kr"
                  },
                  "operatingHours": "05:30-23:50",
                  "availableService": {
                    "@type": "Service",
                    "name": "지하철 시간표 서비스",
                    "description": "실시간 지하철 시간표 및 도착 정보 제공"
                  }
                },
                {
                  "@type": "BusRoute",
                  "name": "M6405 광역급행버스",
                  "description": "인천 송도 웰카운티 ↔ 서울 강남역 서초현대타워앞 직행",
                  "provider": {
                    "@type": "Organization",
                    "name": "인강여객",
                    "telephone": "032-885-6900"
                  },
                  "operatingHours": "송도 05:00-23:30, 강남 06:10-24:30",
                  "frequency": "평일 6-20분, 주말 15-30분 간격",
                  "availableService": {
                    "@type": "Service",
                    "name": "실시간 버스 도착 정보",
                    "description": "M6405 광역급행버스 실시간 위치 및 도착 예정 시간 제공"
                  }
                }
              ],
              "breadcrumb": {
                "@type": "BreadcrumbList",
                "itemListElement": [
                  {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "홈",
                    "item": "https://songdo-life-site.vercel.app"
                  },
                  {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "교통정보",
                    "item": "https://songdo-life-site.vercel.app/subway"
                  }
                ]
              },
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://songdo-life-site.vercel.app/subway?station={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }} />
        
        {/* 프리로드 중요 리소스 */}
        <link rel="preload" href="/android-chrome-192x192.png" as="image" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* 대체 언어 및 지역 버전 */}
        <link rel="alternate" hrefLang="ko-KR" href="https://songdo-life-site.vercel.app/subway" />
        <link rel="canonical" href="https://songdo-life-site.vercel.app/subway" />
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
        <header className="bg-gradient-to-r from-green-600 to-green-800 text-white py-6 sm:py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">🚌 송도 교통정보</h1>
              <p className="text-sm sm:text-base lg:text-lg text-green-100 max-w-2xl mx-auto leading-relaxed">
                지하철 시간표 · M6405 광역급행버스 실시간 정보
              </p>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
          {/* 역 선택 */}
          <section className="bg-white rounded-xl shadow-sm border p-4 sm:p-6 mb-6 sm:mb-8" aria-labelledby="station-selection">
            <h2 id="station-selection" className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">📍 역 선택</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4" role="radiogroup" aria-labelledby="station-selection">
              {stations.map((station) => (
                <button
                  key={station.name}
                  onClick={() => setSelectedStation(station.name)}
                  role="radio"
                  aria-checked={selectedStation === station.name}
                  aria-describedby={`station-${station.name.replace(/\s+/g, '-')}-desc`}
                  className={`p-4 sm:p-4 rounded-xl border-2 transition-all touch-manipulation min-h-[72px] ${
                    selectedStation === station.name
                      ? 'border-green-600 bg-green-50 text-green-800 shadow-md'
                      : 'border-gray-200 hover:border-green-300 hover:bg-green-50 active:bg-green-50'
                  }`}
                >
                  <div className="text-base sm:text-lg font-semibold">{station.name}</div>
                  <div id={`station-${station.name.replace(/\s+/g, '-')}-desc`} className="text-xs sm:text-sm text-gray-600 mt-1">{station.code}</div>
                </button>
              ))}
            </div>
          </section>

          {/* 지하철 시간표 정보 */}
          <section className="bg-white rounded-xl shadow-sm border p-4 sm:p-6 mb-6 sm:mb-8" aria-labelledby="subway-schedule">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3 sm:gap-4">
              <h2 id="subway-schedule" className="text-lg sm:text-xl font-bold text-gray-900">🚄 지하철 시간표</h2>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
                {lastUpdate && (
                  <span className="text-xs sm:text-sm text-gray-600 order-2 sm:order-1" aria-live="polite">
                    <span className="hidden sm:inline">마지막 업데이트: </span>
                    <span className="sm:hidden">업데이트: </span>
                    <time dateTime={new Date().toISOString()}>{lastUpdate}</time>
                  </span>
                )}
                <button
                  onClick={() => fetchTrainSchedule(selectedStation)}
                  disabled={loading}
                  aria-describedby="refresh-button-desc"
                  className="px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors text-sm font-medium touch-manipulation min-h-[44px] w-full sm:w-auto order-1 sm:order-2"
                >
                  {loading ? (
                    <>
                      <span className="sr-only">시간표 업데이트 중</span>
                      <span aria-hidden="true">업데이트 중...</span>
                    </>
                  ) : (
                    '🚇 시간표 새로고침'
                  )}
                </button>
                <div id="refresh-button-desc" className="sr-only">
                  지하철 시간표 정보를 새로고침합니다
                </div>
              </div>
            </div>

            <div className="text-center text-xl sm:text-2xl font-bold text-green-800 mb-4 sm:mb-6 py-2 bg-green-50 rounded-lg" role="status" aria-live="polite">
              {selectedStation}
            </div>

            {loading ? (
              <div className="text-center py-8" role="status" aria-live="polite">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600" aria-hidden="true"></div>
                <p className="mt-2 text-gray-600">
                  <span className="sr-only">시간표 정보를 로딩하고 있습니다</span>
                  <span aria-hidden="true">시간표 정보 로딩 중...</span>
                </p>
              </div>
            ) : (
              <div role="region" aria-labelledby="subway-schedule" aria-live="polite">
                {/* 운행 상태에 따른 표시 */}
                {nextTrainInfo.serviceStatus === 'not_started' && (
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6 rounded-lg" role="alert">
                    <div className="flex items-center">
                      <div className="flex-shrink-0" aria-hidden="true">
                        <span className="text-2xl">🌅</span>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-blue-800">운행 시작 전</h3>
                        <div className="mt-2 text-sm text-blue-700">
                          <p>첫차는 오전 5시 30분부터 운행을 시작합니다.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {nextTrainInfo.serviceStatus === 'ended' && (
                  <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6 rounded-lg" role="alert">
                    <div className="flex items-center">
                      <div className="flex-shrink-0" aria-hidden="true">
                        <span className="text-2xl">🚫</span>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-red-800">운행 종료</h3>
                        <div className="mt-2 text-sm text-red-700">
                          <p>운행이 종료되었습니다. 내일 오전 5시 30분부터 운행을 재개합니다.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {nextTrainInfo.serviceStatus === 'running' && (
                  <>
                    {/* 다음 열차 정보 */}
                    {nextTrainInfo.next && (
                      <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-6 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="flex-shrink-0">
                              <span className="text-2xl">🚇</span>
                            </div>
                            <div className="ml-3">
                              <h3 className="text-lg font-medium text-green-800">다음 열차</h3>
                              <div className="mt-1 text-sm text-green-700">
                                <p>
                                  <span className="font-semibold">{nextTrainInfo.next.time}</span> 
                                  {nextTrainInfo.next.direction === '상행' ? ' 🔵 상행' : ' 🔴 하행'} 
                                  ({nextTrainInfo.next.destination}행)
                                </p>
                              </div>
                            </div>
                          </div>
                          {nextTrainInfo.minutesToNext !== null && (
                            <div className="text-right">
                              <div className="text-lg font-bold text-green-600">
                                {formatTimeRemaining(nextTrainInfo.minutesToNext)}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* 방향별 시간표 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* 상행 (서울/부평 방향) */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-center bg-blue-50 py-3 rounded-lg border-2 border-blue-200">
                          <span className="text-blue-700 font-bold text-lg">🔵 상행 (검단호수공원 방향)</span>
                        </div>
                        <div className="space-y-2">
                          {getUpcomingTrains('상행', 5).map((train, index) => (
                            <div key={`up-${index}`} className="bg-white rounded-lg shadow-sm p-3 border-l-4 border-blue-500">
                              <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                  <span className="font-mono text-lg font-semibold text-blue-600">
                                    {train.time}
                                  </span>
                                  <span className="text-sm text-gray-600">→ {train.destination}</span>
                                  {train.isFirst && (
                                    <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full font-medium">
                                      첫차
                                    </span>
                                  )}
                                  {train.isLast && (
                                    <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-medium">
                                      막차
                                    </span>
                                  )}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {(() => {
                                    const now = new Date();
                                    const currentTime = now.getHours() * 60 + now.getMinutes();
                                    const [hours, minutes] = train.time.split(':').map(Number);
                                    const trainTime = hours * 60 + minutes;
                                    const diff = trainTime - currentTime;
                                    return diff > 0 ? formatTimeRemaining(diff) : '';
                                  })()}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* 하행 (연수/국제업무지구 방향) */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-center bg-red-50 py-3 rounded-lg border-2 border-red-200">
                          <span className="text-red-700 font-bold text-lg">🔴 하행 (송도달빛축제공원 방향)</span>
                        </div>
                        <div className="space-y-2">
                          {getUpcomingTrains('하행', 5).map((train, index) => (
                            <div key={`down-${index}`} className="bg-white rounded-lg shadow-sm p-3 border-l-4 border-red-500">
                              <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                  <span className="font-mono text-lg font-semibold text-red-600">
                                    {train.time}
                                  </span>
                                  <span className="text-sm text-gray-600">→ {train.destination}</span>
                                  {train.isFirst && (
                                    <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full font-medium">
                                      첫차
                                    </span>
                                  )}
                                  {train.isLast && (
                                    <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-medium">
                                      막차
                                    </span>
                                  )}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {(() => {
                                    const now = new Date();
                                    const currentTime = now.getHours() * 60 + now.getMinutes();
                                    const [hours, minutes] = train.time.split(':').map(Number);
                                    const trainTime = hours * 60 + minutes;
                                    const diff = trainTime - currentTime;
                                    return diff > 0 ? formatTimeRemaining(diff) : '';
                                  })()}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* 운행 안내 */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-2">📋 운행 안내</h3>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>• 운행시간: 05:30 ~ 23:50 (매일)</p>
                    <p>• 배차간격: 평시 약 7~10분 간격</p>
                    <p>• 상행: 검단호수공원역 방향 (부평, 계양 연결)</p>
                    <p>• 하행: 송도달빛축제공원역 방향 (송도국제도시)</p>
                    <p>• 주요 환승역: 계양(공항철도), 부평(1호선), 부평구청(7호선), 원인재(수인·분당선)</p>
                    <p className="text-yellow-700 font-medium">⚠️ 시간표는 실제 운행과 다를 수 있습니다</p>
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* 광역버스 실시간 정보 */}
          <section className="bg-white rounded-xl shadow-sm border p-4 sm:p-6 mb-6 sm:mb-8" aria-labelledby="bus-schedule">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3 sm:gap-4">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 id="bus-schedule" className="text-lg sm:text-xl font-bold text-gray-900">🚌 M6405 광역급행버스</h2>
                {isRealBusAPI && (
                  <span className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full">
                    ✅ 실시간
                  </span>
                )}
                {!isRealBusAPI && busInfo.length > 0 && (
                  <span className="inline-block bg-yellow-100 text-yellow-800 text-xs font-semibold px-2 py-1 rounded-full">
                    ⚠️ 임시 API
                  </span>
                )}
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
                {busLastUpdate && (
                  <span className="text-xs sm:text-sm text-gray-600 order-2 sm:order-1" aria-live="polite">
                    <span className="hidden sm:inline">마지막 업데이트: </span>
                    <span className="sm:hidden">업데이트: </span>
                    <time dateTime={new Date().toISOString()}>{busLastUpdate}</time>
                  </span>
                )}
                {!BUS_FEATURE_DISABLED && (
                  <button
                    onClick={() => fetchBusInfo()}
                    disabled={busLoading}
                    aria-describedby="bus-refresh-button-desc"
                    className="px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors text-sm font-medium touch-manipulation min-h-[44px] w-full sm:w-auto order-1 sm:order-2"
                  >
                    {busLoading ? (
                      <>
                        <span className="sr-only">버스 정보 업데이트 중</span>
                        <span aria-hidden="true">버스 새로고침 중...</span>
                      </>
                    ) : (
                      '🚌 버스 새로고침'
                    )}
                  </button>
                  <div id="bus-refresh-button-desc" className="sr-only">
                    광역버스 정보를 새로고침합니다
                  </div>
                )}
              </div>
            </div>

            {/* (중복 제거) 강남행 / 인천행 2컬럼 레이아웃 - 상위 섹션 비활성화 */}

            {/* 운행종료 알림 */}
            {busServiceEnded && (
              <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6 rounded-lg" role="alert">
                <div className="flex items-center">
                  <div className="flex-shrink-0" aria-hidden="true">
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
              <div className="text-center py-6 text-gray-500 text-sm sm:text-base leading-relaxed" role="alert">
                <p>M6405 광역버스 <span className="font-semibold">실시간 위치 정보</span>는&nbsp;
                  <span className="font-semibold text-red-600">API 변경 예정</span>입니다.</p>
                <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-400">
                  ※ 현재 <strong>경기도 G-BIS API</strong>를 사용 중이지만, M6405는 인천 운행 노선이므로<br />
                  <strong>인천광역시 버스정보시스템 API</strong>로 변경이 필요합니다.
                </p>
              </div>
            ) : busLoading ? (
              <div className="text-gray-500" role="alert">
                <span className="sr-only">버스 위치 정보를 불러오고 있습니다</span>
                <span aria-hidden="true">버스 위치 정보를 불러오는 중...</span>
              </div>
            ) : busInfo.length > 0 ? (
              <div role="region" aria-labelledby="bus-schedule" aria-live="polite">
                {/* 강남행 / 인천행 2컬럼 레이아웃 */}
                {(() => {
                  const toGangnam = busInfo.filter(b => b.towards === '강남행');
                  const toIncheon = busInfo.filter(b => b.towards === '인천행');

                  const BusCard = ({ bus }: { bus: BusArrival }) => (
                    <div className="bg-white rounded-xl shadow-md p-3 sm:p-4 border-l-4 border-red-500 hover:shadow-lg transition-shadow">
                      {/* 버스 번호 및 방향 */}
                      <div className="flex flex-col sm:flex-row justify-between items-start mb-3 gap-2 sm:gap-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="inline-block bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-1 rounded-full">{bus.routeId}</span>
                          {bus.lowFloor && (
                            <span className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-2 py-0.5 rounded">♿ 저상버스</span>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            bus.towards === '강남행' 
                              ? 'bg-blue-100 text-blue-800' 
                              : 'bg-purple-100 text-purple-800'
                          }`}>
                            {bus.towards}
                          </span>
                        </div>
                      </div>
                      
                      {/* 현재 위치 */}
                      <div className="mb-2">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs text-gray-500">📍 현재 위치</span>
                        </div>
                        <span className="text-sm sm:text-base text-gray-700 font-medium break-keep">
                          {bus.stationName.replace(/\s*\([^)]*\)$/, '')}
                        </span>
                      </div>
                      
                      {/* 좌석 정보 및 정류장 순번 */}
                      <div className="flex flex-col gap-1 mb-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm sm:text-base text-blue-700 font-semibold">
                            {bus.direction.includes('좌석') ? `🪑 ${bus.direction}` : bus.direction}
                          </span>
                          <span className="text-xs sm:text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                            {bus.remainingStops}번째 정류장
                          </span>
                        </div>
                      </div>
                      {/* 혼잡도 및 상태 */}
                      <div className="flex flex-row flex-wrap gap-1 items-center mt-1">
                        {bus.congestion !== '-' && (
                          <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            혼잡도: {bus.congestion}
                          </span>
                        )}
                        <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">운행중</span>
                        {isRealBusAPI && <span className="px-2 py-1 rounded text-xs font-medium bg-emerald-100 text-emerald-800">실시간</span>}
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
              </div>
            ) : (
              <div className="text-center py-8" role="alert">
                <div className="text-gray-500 mb-4">
                  <span className="text-4xl">🚫</span>
                </div>
                <p className="text-gray-600 mb-2">현재 버스 운행 정보를 가져올 수 없습니다.</p>
                <p className="text-sm text-gray-500 mb-2">
                  API 연결 상태를 확인하거나 잠시 후 다시 시도해주세요.
                </p>
                <p className="text-xs text-yellow-600 mb-4">
                  ※ 현재 경기도 G-BIS API를 사용 중이므로 M6405 정보가 정확하지 않을 수 있습니다.
                </p>
                <button
                  onClick={() => fetchBusInfo()}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  다시 시도
                </button>
              </div>
            )}
          </section>

          {/* 주변 명소만 표시 */}
          {selectedStationInfo && (
            <section className="bg-white rounded-xl shadow-sm border p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">📍 주변 명소 및 시설</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-3">
                {selectedStationInfo.nearbyPlaces.map((place, index) => (
                  <div key={index} className="p-2.5 sm:p-3 bg-yellow-50 rounded-lg text-center">
                    <div className="text-xs sm:text-sm font-medium text-gray-900">{place}</div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 교통수단 종합 정보 */}
          <section className="bg-white rounded-xl shadow-sm border p-4 sm:p-6 mt-6 sm:mt-8">
            <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">🗺️ 송도 교통정보</h3>
            
            {/* 지하철 정보 */}
            <div className="bg-gray-50 p-3 sm:p-4 rounded-lg mb-4">
              <h4 className="text-sm font-bold text-gray-800 mb-2">🚇 인천1호선 (연청색)</h4>
              <div className="space-y-2 sm:space-y-3">
                <div className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  <strong className="text-gray-800">운행 구간:</strong> 검단호수공원역 ↔ 송도달빛축제공원역
                </div>
                <div className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  <strong className="text-gray-800">총 역 수:</strong> 33개역 (약 37.1km)
                </div>
                <div className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  <strong className="text-gray-800">운영사:</strong> 인천교통공사
                </div>
                <div className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  <strong className="text-gray-800">배차 간격:</strong> 평시 약 7~10분 간격
                </div>
                <div className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  <strong className="text-gray-800">소요 시간:</strong> 검단호수공원~송도 전체 구간 약 54~57분
                </div>
                <div className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-3 sm:mb-4">
                  <strong className="text-gray-800">주요 환승역:</strong> 계양(공항철도), 부평(1호선), 부평구청(7호선), 원인재(수인·분당선)
                </div>
              
                <div className="flex flex-wrap gap-1.5 sm:gap-2 text-xs">
                  <span className="px-2 py-1 bg-cyan-100 text-cyan-800 rounded">연청색 노선</span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded">송도 구간</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded">인천대입구역</span>
                  <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded">33개역</span>
                </div>
              </div>
            </div>

            {/* 버스 정보 */}
            <div className="bg-blue-50 p-3 sm:p-4 rounded-lg">
              <h4 className="text-sm font-bold text-gray-800 mb-2">🚌 광역급행버스</h4>
              <div className="space-y-2 sm:space-y-3">
                <div className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  <strong className="text-gray-800">M6405:</strong> 인천 송도 웰카운티 ↔ 서울 강남역 서초현대타워앞 (직행)
                </div>
                <div className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  <strong className="text-gray-800">주요 경유지:</strong> 송도더샵퍼스트월드 → 연세대송도캠퍼스 → 선바위역 → 서초역 → 교대역 → 강남역 → 양재역
                </div>
                <div className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  <strong className="text-gray-800">총 정류소:</strong> 45개 (왕복 운행)
                </div>
                <div className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  <strong className="text-gray-800">운행 시간:</strong> 송도 05:00~23:30, 강남 06:10~24:30
                </div>
                <div className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  <strong className="text-gray-800">소요 시간:</strong> 송도 ↔ 강남 약 46~57분
                </div>
                <div className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  <strong className="text-gray-800">배차 간격:</strong> 평일 6~20분, 주말 15~30분
                </div>
                <div className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-3 sm:mb-4">
                  <strong className="text-gray-800">운수업체:</strong> 인강여객 (032-885-6900)
                </div>
              
                <div className="flex flex-wrap gap-1.5 sm:gap-2 text-xs">
                  <span className="px-2 py-1 bg-red-100 text-red-800 rounded">M6405</span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded">광역급행</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded">직행노선</span>
                  <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded">45개 정류소</span>
                  <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded">고속도로 이용</span>
                </div>
              </div>
            </div>
          </section>

          {/* 안내사항 */}
          <section className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 sm:p-4 mt-6 sm:mt-8">
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
                    <p>• M6405 버스 정보는 인천광역시 공식 API를 사용합니다.</p>
                  ) : (
                    <p>• 현재 M6405 버스 정보는 시범 서비스입니다.</p>
                  )}
                </div>
              </div>
            </div>
          </section>
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
          </footer>
      </div>
    </>
  );
} 