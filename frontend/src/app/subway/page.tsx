'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

interface TrainSchedule {
  time: string;
  destination: string;
  direction: '상행' | '하행';
  trainType: '일반' | '급행';
  isLast?: boolean;
  isFirst?: boolean;
}

interface BusArrival {
  routeId: string;
  stationName: string;
  direction: string;
  remainingStops: number;
  lowFloor: boolean;
  congestion: string;
  towards: '강남행' | '인천행';
  updatedAt: string;
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

const SAMPLE_SCHEDULE: TrainSchedule[] = [
  // 상행 (검단호수공원 방향) - 더 많은 시간표
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
  { time: "08:15", destination: "검단호수공원", direction: "상행", trainType: "일반" },
  { time: "08:30", destination: "검단호수공원", direction: "상행", trainType: "일반" },
  { time: "08:45", destination: "검단호수공원", direction: "상행", trainType: "일반" },
  { time: "09:00", destination: "검단호수공원", direction: "상행", trainType: "일반" },
  { time: "09:15", destination: "검단호수공원", direction: "상행", trainType: "일반" },
  { time: "09:30", destination: "검단호수공원", direction: "상행", trainType: "일반" },
  { time: "09:45", destination: "검단호수공원", direction: "상행", trainType: "일반" },
  { time: "10:00", destination: "검단호수공원", direction: "상행", trainType: "일반" },
  { time: "10:15", destination: "검단호수공원", direction: "상행", trainType: "일반" },
  { time: "10:30", destination: "검단호수공원", direction: "상행", trainType: "일반" },
  { time: "10:45", destination: "검단호수공원", direction: "상행", trainType: "일반" },
  { time: "11:00", destination: "검단호수공원", direction: "상행", trainType: "일반" },
  { time: "11:15", destination: "검단호수공원", direction: "상행", trainType: "일반" },
  { time: "11:30", destination: "검단호수공원", direction: "상행", trainType: "일반" },
  { time: "11:45", destination: "검단호수공원", direction: "상행", trainType: "일반" },
  { time: "12:00", destination: "검단호수공원", direction: "상행", trainType: "일반" },
  { time: "12:15", destination: "검단호수공원", direction: "상행", trainType: "일반" },
  { time: "12:30", destination: "검단호수공원", direction: "상행", trainType: "일반" },
  { time: "12:45", destination: "검단호수공원", direction: "상행", trainType: "일반" },
  { time: "13:00", destination: "검단호수공원", direction: "상행", trainType: "일반" },
  { time: "13:15", destination: "검단호수공원", direction: "상행", trainType: "일반" },
  { time: "13:30", destination: "검단호수공원", direction: "상행", trainType: "일반" },
  { time: "13:45", destination: "검단호수공원", direction: "상행", trainType: "일반" },
  { time: "14:00", destination: "검단호수공원", direction: "상행", trainType: "일반" },
  { time: "14:15", destination: "검단호수공원", direction: "상행", trainType: "일반" },
  { time: "14:30", destination: "검단호수공원", direction: "상행", trainType: "일반" },
  { time: "14:45", destination: "검단호수공원", direction: "상행", trainType: "일반" },
  { time: "15:00", destination: "검단호수공원", direction: "상행", trainType: "일반" },
  { time: "15:15", destination: "검단호수공원", direction: "상행", trainType: "일반" },
  { time: "15:30", destination: "검단호수공원", direction: "상행", trainType: "일반" },
  { time: "15:45", destination: "검단호수공원", direction: "상행", trainType: "일반" },
  { time: "16:00", destination: "검단호수공원", direction: "상행", trainType: "일반" },
  { time: "16:15", destination: "검단호수공원", direction: "상행", trainType: "일반" },
  { time: "16:30", destination: "검단호수공원", direction: "상행", trainType: "일반" },
  { time: "16:45", destination: "검단호수공원", direction: "상행", trainType: "일반" },
  { time: "17:00", destination: "검단호수공원", direction: "상행", trainType: "일반" },
  { time: "17:15", destination: "검단호수공원", direction: "상행", trainType: "일반" },
  { time: "17:30", destination: "검단호수공원", direction: "상행", trainType: "일반" },
  { time: "17:45", destination: "검단호수공원", direction: "상행", trainType: "일반" },
  { time: "18:00", destination: "검단호수공원", direction: "상행", trainType: "일반" },
  { time: "18:15", destination: "검단호수공원", direction: "상행", trainType: "일반" },
  { time: "18:30", destination: "검단호수공원", direction: "상행", trainType: "일반" },
  { time: "18:45", destination: "검단호수공원", direction: "상행", trainType: "일반" },
  { time: "19:00", destination: "검단호수공원", direction: "상행", trainType: "일반" },
  { time: "19:15", destination: "검단호수공원", direction: "상행", trainType: "일반" },
  { time: "19:30", destination: "검단호수공원", direction: "상행", trainType: "일반" },
  { time: "19:45", destination: "검단호수공원", direction: "상행", trainType: "일반" },
  { time: "20:00", destination: "검단호수공원", direction: "상행", trainType: "일반" },
  { time: "20:15", destination: "검단호수공원", direction: "상행", trainType: "일반" },
  { time: "20:30", destination: "검단호수공원", direction: "상행", trainType: "일반" },
  { time: "20:45", destination: "검단호수공원", direction: "상행", trainType: "일반" },
  { time: "21:00", destination: "검단호수공원", direction: "상행", trainType: "일반" },
  { time: "21:15", destination: "검단호수공원", direction: "상행", trainType: "일반" },
  { time: "21:30", destination: "검단호수공원", direction: "상행", trainType: "일반" },
  { time: "21:45", destination: "검단호수공원", direction: "상행", trainType: "일반" },
  { time: "22:00", destination: "검단호수공원", direction: "상행", trainType: "일반" },
  { time: "22:15", destination: "검단호수공원", direction: "상행", trainType: "일반" },
  { time: "22:30", destination: "검단호수공원", direction: "상행", trainType: "일반" },
  { time: "22:45", destination: "검단호수공원", direction: "상행", trainType: "일반" },
  { time: "23:00", destination: "검단호수공원", direction: "상행", trainType: "일반" },
  { time: "23:15", destination: "검단호수공원", direction: "상행", trainType: "일반" },
  { time: "23:30", destination: "검단호수공원", direction: "상행", trainType: "일반" },
  { time: "23:45", destination: "검단호수공원", direction: "상행", trainType: "일반", isLast: true },
  
  // 하행 (송도달빛축제공원 방향) - 더 많은 시간표
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
  { time: "08:20", destination: "송도달빛축제공원", direction: "하행", trainType: "일반" },
  { time: "08:35", destination: "송도달빛축제공원", direction: "하행", trainType: "일반" },
  { time: "08:50", destination: "송도달빛축제공원", direction: "하행", trainType: "일반" },
  { time: "09:05", destination: "송도달빛축제공원", direction: "하행", trainType: "일반" },
  { time: "09:20", destination: "송도달빛축제공원", direction: "하행", trainType: "일반" },
  { time: "09:35", destination: "송도달빛축제공원", direction: "하행", trainType: "일반" },
  { time: "09:50", destination: "송도달빛축제공원", direction: "하행", trainType: "일반" },
  { time: "10:05", destination: "송도달빛축제공원", direction: "하행", trainType: "일반" },
  { time: "10:20", destination: "송도달빛축제공원", direction: "하행", trainType: "일반" },
  { time: "10:35", destination: "송도달빛축제공원", direction: "하행", trainType: "일반" },
  { time: "10:50", destination: "송도달빛축제공원", direction: "하행", trainType: "일반" },
  { time: "11:05", destination: "송도달빛축제공원", direction: "하행", trainType: "일반" },
  { time: "11:20", destination: "송도달빛축제공원", direction: "하행", trainType: "일반" },
  { time: "11:35", destination: "송도달빛축제공원", direction: "하행", trainType: "일반" },
  { time: "11:50", destination: "송도달빛축제공원", direction: "하행", trainType: "일반" },
  { time: "12:05", destination: "송도달빛축제공원", direction: "하행", trainType: "일반" },
  { time: "12:20", destination: "송도달빛축제공원", direction: "하행", trainType: "일반" },
  { time: "12:35", destination: "송도달빛축제공원", direction: "하행", trainType: "일반" },
  { time: "12:50", destination: "송도달빛축제공원", direction: "하행", trainType: "일반" },
  { time: "13:05", destination: "송도달빛축제공원", direction: "하행", trainType: "일반" },
  { time: "13:20", destination: "송도달빛축제공원", direction: "하행", trainType: "일반" },
  { time: "13:35", destination: "송도달빛축제공원", direction: "하행", trainType: "일반" },
  { time: "13:50", destination: "송도달빛축제공원", direction: "하행", trainType: "일반" },
  { time: "14:05", destination: "송도달빛축제공원", direction: "하행", trainType: "일반" },
  { time: "14:20", destination: "송도달빛축제공원", direction: "하행", trainType: "일반" },
  { time: "14:35", destination: "송도달빛축제공원", direction: "하행", trainType: "일반" },
  { time: "14:50", destination: "송도달빛축제공원", direction: "하행", trainType: "일반" },
  { time: "15:05", destination: "송도달빛축제공원", direction: "하행", trainType: "일반" },
  { time: "15:20", destination: "송도달빛축제공원", direction: "하행", trainType: "일반" },
  { time: "15:35", destination: "송도달빛축제공원", direction: "하행", trainType: "일반" },
  { time: "15:50", destination: "송도달빛축제공원", direction: "하행", trainType: "일반" },
  { time: "16:05", destination: "송도달빛축제공원", direction: "하행", trainType: "일반" },
  { time: "16:20", destination: "송도달빛축제공원", direction: "하행", trainType: "일반" },
  { time: "16:35", destination: "송도달빛축제공원", direction: "하행", trainType: "일반" },
  { time: "16:50", destination: "송도달빛축제공원", direction: "하행", trainType: "일반" },
  { time: "17:05", destination: "송도달빛축제공원", direction: "하행", trainType: "일반" },
  { time: "17:20", destination: "송도달빛축제공원", direction: "하행", trainType: "일반" },
  { time: "17:35", destination: "송도달빛축제공원", direction: "하행", trainType: "일반" },
  { time: "17:50", destination: "송도달빛축제공원", direction: "하행", trainType: "일반" },
  { time: "18:05", destination: "송도달빛축제공원", direction: "하행", trainType: "일반" },
  { time: "18:20", destination: "송도달빛축제공원", direction: "하행", trainType: "일반" },
  { time: "18:35", destination: "송도달빛축제공원", direction: "하행", trainType: "일반" },
  { time: "18:50", destination: "송도달빛축제공원", direction: "하행", trainType: "일반" },
  { time: "19:05", destination: "송도달빛축제공원", direction: "하행", trainType: "일반" },
  { time: "19:20", destination: "송도달빛축제공원", direction: "하행", trainType: "일반" },
  { time: "19:35", destination: "송도달빛축제공원", direction: "하행", trainType: "일반" },
  { time: "19:50", destination: "송도달빛축제공원", direction: "하행", trainType: "일반" },
  { time: "20:05", destination: "송도달빛축제공원", direction: "하행", trainType: "일반" },
  { time: "20:20", destination: "송도달빛축제공원", direction: "하행", trainType: "일반" },
  { time: "20:35", destination: "송도달빛축제공원", direction: "하행", trainType: "일반" },
  { time: "20:50", destination: "송도달빛축제공원", direction: "하행", trainType: "일반" },
  { time: "21:05", destination: "송도달빛축제공원", direction: "하행", trainType: "일반" },
  { time: "21:20", destination: "송도달빛축제공원", direction: "하행", trainType: "일반" },
  { time: "21:35", destination: "송도달빛축제공원", direction: "하행", trainType: "일반" },
  { time: "21:50", destination: "송도달빛축제공원", direction: "하행", trainType: "일반" },
  { time: "22:05", destination: "송도달빛축제공원", direction: "하행", trainType: "일반" },
  { time: "22:20", destination: "송도달빛축제공원", direction: "하행", trainType: "일반" },
  { time: "22:35", destination: "송도달빛축제공원", direction: "하행", trainType: "일반" },
  { time: "22:50", destination: "송도달빛축제공원", direction: "하행", trainType: "일반" },
  { time: "23:05", destination: "송도달빛축제공원", direction: "하행", trainType: "일반" },
  { time: "23:20", destination: "송도달빛축제공원", direction: "하행", trainType: "일반" },
  { time: "23:35", destination: "송도달빛축제공원", direction: "하행", trainType: "일반" },
  { time: "23:50", destination: "송도달빛축제공원", direction: "하행", trainType: "일반", isLast: true },
];

const BUS_FEATURE_DISABLED = false;

export default function SubwayPage() {
  const [selectedStation, setSelectedStation] = useState('인천대입구역');
  const [busInfo, setBusInfo] = useState<BusArrival[]>([]);
  const [busLoading, setBusLoading] = useState(false);
  const [busLastUpdate, setBusLastUpdate] = useState<string>('');
  const [busServiceEnded, setBusServiceEnded] = useState(false);
  const [isRealBusAPI, setIsRealBusAPI] = useState(false);

  // 다음 열차 정보 계산
  const getNextTrains = useCallback((direction: string) => {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();
    
    const trains = SAMPLE_SCHEDULE
      .filter(train => train.direction === direction)
      .map(train => {
        const [hours, minutes] = train.time.split(':').map(Number);
        const trainTime = hours * 60 + minutes;
        const timeDiff = trainTime - currentTime;
        
        return {
          ...train,
          minutesFromNow: timeDiff >= 0 ? timeDiff : timeDiff + 24 * 60
        };
      })
      .sort((a, b) => a.minutesFromNow - b.minutesFromNow);
    
    return trains.slice(0, 8); // 더 많은 시간표 표시 (8개)
  }, []);

  // 남은 시간 포맷팅
  const formatTimeRemaining = (minutes: number): string => {
    if (minutes === 0) return '곧 도착';
    if (minutes < 60) return `${minutes}분 후`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}시간 ${remainingMinutes}분 후`;
  };

  const fetchBusInfo = useCallback(async () => {
    setBusLoading(true);
    try {
      const response = await fetch('/api/bus?routeId=M6405');
      const data = await response.json();
      
      // 🔍 API 응답 디버깅 정보 출력
      console.log('🚌 M6405 API 전체 응답:', data);
      if (data.debug) {
        console.log('🪑 좌석 정보 디버깅:', data.debug);
        console.log('📊 좌석 데이터 상세:', data.debug.seatData);
      }
      
      if (data.success && data.data) {
        setBusInfo(data.data);
        setBusServiceEnded(false);
        setIsRealBusAPI(true);
        
        // 🔍 개별 버스의 좌석 정보 확인
        data.data.forEach((bus: BusArrival, index: number) => {
          console.log(`🚌 버스 ${index + 1} 좌석 정보:`, {
            stationName: bus.stationName,
            direction: bus.direction,
            towards: bus.towards,
            seatExtracted: bus.direction.match(/좌석\s*(\d+|정보없음|없음)석?/)?.[1] || 'Not Found'
          });
        });
      } else {
        console.log('❌ API 응답 실패 - 샘플 데이터 사용:', data);
        // API 실패 시 샘플 데이터 사용
        const sampleData: BusArrival[] = [
          {
            routeId: 'M6405',
            stationName: '송도국제도시역',
            direction: 'M6405',
            remainingStops: Math.floor(Math.random() * 5) + 1,
            lowFloor: true,
            congestion: '보통',
            towards: '강남행',
            updatedAt: new Date().toISOString()
          },
          {
            routeId: 'M6405',
            stationName: '송도국제도시역',
            direction: 'M6405',
            remainingStops: Math.floor(Math.random() * 8) + 3,
            lowFloor: false,
            congestion: '여유',
            towards: '인천행',
            updatedAt: new Date().toISOString()
          }
        ];
        setBusInfo(sampleData);
        setBusServiceEnded(false);
        setIsRealBusAPI(false);
      }
      
      setBusLastUpdate(new Date().toLocaleTimeString('ko-KR'));
    } catch (error) {
      console.error('❌ 버스 정보 조회 실패:', error);
      setBusServiceEnded(true);
      setIsRealBusAPI(false);
    } finally {
      setBusLoading(false);
    }
  }, []);

  // 버스 정보 업데이트
  useEffect(() => {
    fetchBusInfo();
    const interval = setInterval(fetchBusInfo, 30000); // 30초마다 업데이트

    return () => clearInterval(interval);
  }, [fetchBusInfo]);

  const selectedStationInfo = stations.find(s => s.name === selectedStation);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 네비게이션 바 */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-3 sm:py-4 min-h-[60px]">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Link href="/" className="flex items-center text-green-600 hover:text-green-800 transition-colors">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span className="text-sm sm:text-base">홈</span>
              </Link>
              <span className="text-gray-300 hidden sm:inline">|</span>
              <Link href="/realestate" className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
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
        <section className="bg-white rounded-xl shadow-sm border p-4 sm:p-6 mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">📍 역 선택</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            {stations.map((station) => (
              <button
                key={station.name}
                onClick={() => setSelectedStation(station.name)}
                className={`p-4 rounded-xl border-2 transition-all min-h-[72px] ${
                  selectedStation === station.name
                    ? 'border-green-600 bg-green-50 text-green-800 shadow-md'
                    : 'border-gray-200 hover:border-green-300 hover:bg-green-50'
                }`}
              >
                <div className="text-base sm:text-lg font-semibold">{station.name}</div>
                <div className="text-xs sm:text-sm text-gray-600 mt-1">{station.code}</div>
              </button>
            ))}
          </div>
        </section>

        {/* 지하철 시간표 */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800 flex items-center">
              🚇 지하철 시간표
            </h2>
            <div className="text-sm text-gray-500">
              마지막 업데이트: 오전 {new Date().toLocaleTimeString('ko-KR', { 
                hour: '2-digit', 
                minute: '2-digit', 
                second: '2-digit' 
              })}
            </div>
          </div>
          
          <div className="text-center mb-4">
            <h3 className="text-lg font-semibold text-blue-600">인천대입구역</h3>
          </div>

          {/* 방향 선택 버튼 제거 */}

          {/* 시간표 목록 - 상행/하행 모두 표시 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 상행 시간표 */}
            <div>
              <div className="flex items-center justify-center bg-blue-50 py-3 rounded-lg border-2 border-blue-200 mb-4">
                <span className="text-blue-700 font-bold text-lg">🔵 상행 (검단호수공원 방향)</span>
              </div>
              <div className="space-y-2">
                {getNextTrains('상행').map((train, index) => (
                  <div
                    key={`${train.time}-상행`}
                    className={`flex items-center justify-between p-3 rounded-lg border ${
                      index === 0
                        ? 'bg-blue-50 border-blue-200'
                        : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-lg font-bold text-blue-600">
                        {train.time}
                      </span>
                      <span className="text-gray-600">→ {train.destination}</span>
                    </div>
                    <span className={`text-sm font-semibold ${
                      index === 0 ? 'text-blue-600' : 'text-gray-500'
                    }`}>
                      {formatTimeRemaining(train.minutesFromNow)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 하행 시간표 */}
            <div>
              <div className="flex items-center justify-center bg-red-50 py-3 rounded-lg border-2 border-red-200 mb-4">
                <span className="text-red-700 font-bold text-lg">🔴 하행 (송도달빛축제공원 방향)</span>
              </div>
              <div className="space-y-2">
                {getNextTrains('하행').map((train, index) => (
                  <div
                    key={`${train.time}-하행`}
                    className={`flex items-center justify-between p-3 rounded-lg border ${
                      index === 0
                        ? 'bg-red-50 border-red-200'
                        : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-lg font-bold text-red-600">
                        {train.time}
                      </span>
                      <span className="text-gray-600">→ {train.destination}</span>
                    </div>
                    <span className={`text-sm font-semibold ${
                      index === 0 ? 'text-red-600' : 'text-gray-500'
                    }`}>
                      {formatTimeRemaining(train.minutesFromNow)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 버스 정보 */}
        <section className="bg-white rounded-xl shadow-sm border p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3 sm:gap-0">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">🚌 M6405 광역급행버스</h2>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
              {busLastUpdate && (
                <span className="text-xs sm:text-sm text-gray-500 order-2 sm:order-1">
                  마지막 업데이트: <time>{busLastUpdate}</time>
                </span>
              )}
              {!BUS_FEATURE_DISABLED && (
                <button
                  onClick={() => fetchBusInfo()}
                  disabled={busLoading}
                  className="px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors text-sm font-medium min-h-[44px] w-full sm:w-auto order-1 sm:order-2"
                >
                  {busLoading ? '버스 새로고침 중...' : '🚌 버스 새로고침'}
                </button>
              )}
            </div>
          </div>

          {busServiceEnded && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6 rounded-lg">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <span className="text-2xl">🚫</span>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">버스 운행 종료</h3>
                  <div className="mt-2 text-sm text-red-700">
                    <p>현재 운행하지 않는 시간입니다. 운행시간은 오전 5시부터 자정까지입니다.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {BUS_FEATURE_DISABLED ? (
            <div className="text-center py-6 text-gray-500 text-sm sm:text-base leading-relaxed">
              <p>M6405 광역버스 <span className="font-semibold">실시간 위치 정보</span>는&nbsp;
                <span className="font-semibold text-red-600">API 변경 예정</span>입니다.</p>
              <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-400">
                ※ 현재 <strong>경기도 G-BIS API</strong>를 사용 중이지만, M6405는 인천 운행 노선이므로<br />
                <strong>인천광역시 버스정보시스템 API</strong>로 변경이 필요합니다.
              </p>
            </div>
          ) : busLoading ? (
            <div className="text-gray-500">버스 위치 정보를 불러오는 중...</div>
          ) : busInfo.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {(() => {
                const toGangnam = busInfo.filter(b => b.towards === '강남행');
                const toIncheon = busInfo.filter(b => b.towards === '인천행');

                const BusCard = ({ bus }: { bus: BusArrival }) => {
                  // 좌석 정보 추출 (direction에서 좌석 정보 분리)
                  const seatMatch = bus.direction.match(/좌석\s*(\d+|정보없음|없음)석?/);
                  const seatInfo = seatMatch ? (seatMatch[1] === '정보없음' || seatMatch[1] === '없음' ? '정보없음' : `${seatMatch[1]}석`) : '정보없음';
                  
                  // direction에서 좌석 정보 제거한 나머지
                  const directionWithoutSeat = bus.direction.replace(/\s*•\s*좌석\s*(\d+|정보없음|없음)석?/, '').replace(/좌석\s*(\d+|정보없음|없음)석?\s*•?\s*/, '');
                  
                  return (
                    <div className="bg-white rounded-xl shadow-md p-3 sm:p-4 border-l-4 border-red-500">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-2">
                          <span className="bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-1 rounded-full">{bus.routeId}</span>
                          {bus.lowFloor && (
                            <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-0.5 rounded">♿ 저상버스</span>
                          )}
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          bus.towards === '강남행' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                        }`}>
                          {bus.towards}
                        </span>
                      </div>
                      
                      <div className="mb-2">
                        <span className="text-sm text-gray-700 font-medium">
                          {bus.stationName.replace(/\s*\([^)]*\)$/, '')}
                        </span>
                      </div>
                      
                      {/* 좌석 정보를 별도로 강조 표시 */}
                      <div className="mb-2 flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                          seatInfo === '정보없음' ? 'bg-gray-100 text-gray-600' : 'bg-orange-100 text-orange-800'
                        }`}>
                          🪑 {seatInfo}
                        </span>
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                          {bus.remainingStops}번째 정류장
                        </span>
                      </div>
                      
                      {/* 다음 정류장 정보 */}
                      {directionWithoutSeat && (
                        <div className="mb-2">
                          <span className="text-sm text-blue-700 font-medium">{directionWithoutSeat}</span>
                        </div>
                      )}
                      
                      <div className="flex gap-1 items-center mt-2">
                        {bus.congestion !== '-' && (
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            혼잡도: {bus.congestion}
                          </span>
                        )}
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">운행중</span>
                        {isRealBusAPI && <span className="px-2 py-1 rounded text-xs font-medium bg-emerald-100 text-emerald-800">실시간</span>}
                      </div>
                    </div>
                  );
                };

                return (
                  <>
                    <div>
                      <div className="flex items-center justify-center bg-blue-50 py-2.5 sm:py-3 rounded-lg border-2 border-blue-200 mb-3">
                        <span className="text-blue-700 font-bold text-base sm:text-lg">🔵 강남행</span>
                      </div>
                      <div className="space-y-3 sm:space-y-4">
                        {toGangnam.map((b, i) => <BusCard key={i} bus={b} />)}
                        {toGangnam.length === 0 && (
                          <div className="text-center py-4 text-gray-400 text-sm">버스 정보 없음</div>
                        )}
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-center bg-purple-50 py-2.5 sm:py-3 rounded-lg border-2 border-purple-200 mb-3">
                        <span className="text-purple-700 font-bold text-base sm:text-lg">🟣 인천행</span>
                      </div>
                      <div className="space-y-3 sm:space-y-4">
                        {toIncheon.map((b, i) => <BusCard key={i} bus={b} />)}
                        {toIncheon.length === 0 && (
                          <div className="text-center py-4 text-gray-400 text-sm">버스 정보 없음</div>
                        )}
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="text-gray-500 mb-4">
                <span className="text-4xl">🚫</span>
              </div>
              <p className="text-gray-600 mb-2">현재 버스 운행 정보를 가져올 수 없습니다.</p>
              <p className="text-sm text-gray-500 mb-2">API 연결 상태를 확인하거나 잠시 후 다시 시도해주세요.</p>
              <button
                onClick={() => fetchBusInfo()}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                다시 시도
              </button>
            </div>
          )}
        </section>

        {/* 주변 명소 */}
        {selectedStationInfo && (
          <section className="bg-white rounded-xl shadow-sm border p-4 sm:p-6 mb-6 sm:mb-8">
            <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">📍 주변 명소 및 시설</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-3">
              {selectedStationInfo.nearbyPlaces.map((place: string, index: number) => (
                <div key={index} className="p-2.5 sm:p-3 bg-yellow-50 rounded-lg text-center">
                  <div className="text-xs sm:text-sm font-medium text-gray-900">{place}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 교통수단 종합 정보 */}
        <section className="bg-white rounded-xl shadow-sm border p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">🗺️ 송도 교통정보</h3>
          
          <div className="bg-gray-50 p-3 sm:p-4 rounded-lg mb-4">
            <h4 className="text-sm font-bold text-gray-800 mb-2">🚇 인천1호선 (연청색)</h4>
            <div className="space-y-2 text-xs sm:text-sm text-gray-600">
              <div><strong>운행 구간:</strong> 검단호수공원역 ↔ 송도달빛축제공원역</div>
              <div><strong>총 역 수:</strong> 33개역 (약 37.1km)</div>
              <div><strong>운영사:</strong> 인천교통공사</div>
              <div><strong>배차 간격:</strong> 평시 약 7~10분 간격</div>
              <div><strong>소요 시간:</strong> 검단호수공원~송도 전체 구간 약 54~57분</div>
              <div><strong>주요 환승역:</strong> 계양(공항철도), 부평(1호선), 부평구청(7호선), 원인재(수인·분당선)</div>
            </div>
          </div>

          <div className="bg-blue-50 p-3 sm:p-4 rounded-lg">
            <h4 className="text-sm font-bold text-gray-800 mb-2">🚌 광역급행버스</h4>
            <div className="space-y-2 text-xs sm:text-sm text-gray-600">
              <div><strong>M6405:</strong> 인천 송도 웰카운티 ↔ 서울 강남역 서초현대타워앞 (직행)</div>
              <div><strong>주요 경유지:</strong> 송도더샵퍼스트월드 → 연세대송도캠퍼스 → 선바위역 → 서초역 → 교대역 → 강남역 → 양재역</div>
              <div><strong>총 정류소:</strong> 45개 (왕복 운행)</div>
              <div><strong>운행 시간:</strong> 송도 05:00~23:30, 강남 06:10~24:30</div>
              <div><strong>소요 시간:</strong> 송도 ↔ 강남 약 46~57분</div>
              <div><strong>배차 간격:</strong> 평일 6~20분, 주말 15~30분</div>
              <div><strong>운수업체:</strong> 인강여객 (032-885-6900)</div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
} 