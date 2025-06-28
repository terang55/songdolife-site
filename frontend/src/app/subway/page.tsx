'use client';

import React, { useState, useEffect } from 'react';
import Head from 'next/head';

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
      } else {
        console.error('❌ 지하철 API 오류:', result.error);
        // 오류 시 빈 배열로 설정
        setTrainInfo([]);
      }
    } catch (error) {
      console.error('❌ 지하철 정보 로딩 오류:', error);
      setTrainInfo([]);
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
        <title>수인분당선 지하철 정보 - 논현동 정보 허브</title>
        <meta name="description" content="호구포역, 인천논현역, 소래포구역의 실시간 열차 도착 정보와 역 정보를 확인하세요." />
        <meta name="keywords" content="수인분당선, 호구포역, 인천논현역, 소래포구역, 지하철, 실시간, 논현동" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* 헤더 */}
        <div className="bg-gradient-to-r from-green-600 to-green-800 text-white py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-3xl sm:text-4xl font-bold mb-4">🚇 수인분당선 지하철 정보</h1>
              <p className="text-lg text-green-100">
                논현동 주변 지하철역의 실시간 도착 정보와 편의시설 안내
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* 역 선택 */}
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">📍 역 선택</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {stations.map((station) => (
                <button
                  key={station.name}
                  onClick={() => setSelectedStation(station.name)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    selectedStation === station.name
                      ? 'border-green-600 bg-green-50 text-green-800'
                      : 'border-gray-200 hover:border-green-300 hover:bg-green-50'
                  }`}
                >
                  <div className="text-lg font-semibold">{station.name}</div>
                  <div className="text-sm text-gray-600">{station.code}</div>
                </button>
              ))}
            </div>
          </div>

          {/* 실시간 도착 정보 */}
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">🚄 실시간 도착 정보</h2>
              <div className="flex items-center gap-4">
                {lastUpdate && (
                  <span className="text-sm text-gray-600">
                    마지막 업데이트: {lastUpdate}
                  </span>
                )}
                <button
                  onClick={() => fetchTrainInfo(selectedStation)}
                  disabled={loading}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
                >
                  {loading ? '새로고침 중...' : '새로고침'}
                </button>
              </div>
            </div>

            <div className="text-center text-2xl font-bold text-green-800 mb-6">
              {selectedStation}
            </div>

            {loading ? (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                <p className="mt-2 text-gray-600">실시간 정보 로딩 중...</p>
              </div>
            ) : (
              <>
                {trainInfo.length > 0 ? (
                  <>
                    {/* 방향별 분리 표시 */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* 상행 (서울 방향) */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-center bg-blue-50 py-3 rounded-lg border-2 border-blue-200">
                          <span className="text-blue-700 font-bold text-lg">🔵 상행 (서울 방향)</span>
                        </div>
                        {trainInfo
                          .filter(train => train.direction === '상행')
                          .map((train, index) => (
                            <div key={`up-${index}`} className="bg-white rounded-lg shadow-md p-4 border-l-4 border-blue-500 hover:shadow-lg transition-shadow">
                              <div className="flex justify-between items-start mb-3">
                                <div className="flex items-center gap-2">
                                  <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
                                    {train.trainType}
                                  </span>
                                  <span className="text-blue-600 font-medium">↗️ {train.destination}</span>
                                </div>
                                <span className="text-xs text-gray-400">
                                  {new Date(train.updatedAt).toLocaleTimeString('ko-KR')}
                                </span>
                              </div>
                              
                              <div className="space-y-2 mb-3">
                                <div className="text-sm text-gray-600">
                                  🚇 현재 위치: {train.currentLocation}
                                </div>
                                {train.stationsLeft && (
                                  <div className="flex items-center gap-1">
                                    <span className="text-orange-500">📍</span>
                                    <span className="text-sm font-medium text-orange-600">{train.stationsLeft}</span>
                                  </div>
                                )}
                              </div>
                              
                              <div className="flex justify-between items-center">
                                <span className="text-xl font-bold text-blue-600">
                                  {train.arrivalTime}
                                </span>
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
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
                      <div className="space-y-4">
                        <div className="flex items-center justify-center bg-red-50 py-3 rounded-lg border-2 border-red-200">
                          <span className="text-red-700 font-bold text-lg">🔴 하행 (인천 방향)</span>
                        </div>
                        {trainInfo
                          .filter(train => train.direction === '하행')
                          .map((train, index) => (
                            <div key={`down-${index}`} className="bg-white rounded-lg shadow-md p-4 border-l-4 border-red-500 hover:shadow-lg transition-shadow">
                              <div className="flex justify-between items-start mb-3">
                                <div className="flex items-center gap-2">
                                  <span className="inline-block bg-red-100 text-red-800 text-xs font-semibold px-3 py-1 rounded-full">
                                    {train.trainType}
                                  </span>
                                  <span className="text-red-600 font-medium">↙️ {train.destination}</span>
                                </div>
                                <span className="text-xs text-gray-400">
                                  {new Date(train.updatedAt).toLocaleTimeString('ko-KR')}
                                </span>
                              </div>
                              
                              <div className="space-y-2 mb-3">
                                <div className="text-sm text-gray-600">
                                  🚇 현재 위치: {train.currentLocation}
                                </div>
                                {train.stationsLeft && (
                                  <div className="flex items-center gap-1">
                                    <span className="text-orange-500">📍</span>
                                    <span className="text-sm font-medium text-orange-600">{train.stationsLeft}</span>
                                  </div>
                                )}
                              </div>
                              
                              <div className="flex justify-between items-center">
                                <span className="text-xl font-bold text-red-600">
                                  {train.arrivalTime}
                                </span>
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* 출구 정보 */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">🚪 출구 정보</h3>
                <div className="space-y-3">
                  {selectedStationInfo.exits.map((exit, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg">
                      <div className="text-sm font-medium text-gray-900">{exit}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 편의시설 */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">🏢 편의시설</h3>
                <div className="grid grid-cols-2 gap-2">
                  {selectedStationInfo.facilities.map((facility, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-blue-50 rounded-lg">
                      <span className="text-blue-600">✓</span>
                      <span className="text-sm text-gray-900">{facility}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 주변 명소 */}
              <div className="bg-white rounded-lg shadow-sm border p-6 lg:col-span-2">
                <h3 className="text-lg font-bold text-gray-900 mb-4">📍 주변 명소 및 시설</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {selectedStationInfo.nearbyPlaces.map((place, index) => (
                    <div key={index} className="p-3 bg-yellow-50 rounded-lg text-center">
                      <div className="text-sm font-medium text-gray-900">{place}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 수인분당선 노선 정보 */}
          <div className="bg-white rounded-lg shadow-sm border p-6 mt-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4">🗺️ 수인분당선 노선 정보</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600 mb-2">
                <strong>운행 구간:</strong> 인천역 ↔ 청량리역
              </div>
              <div className="text-sm text-gray-600 mb-2">
                <strong>운행 시간:</strong> 첫차 약 05:00 ~ 막차 약 24:00 (역별로 다름)
              </div>
              <div className="text-sm text-gray-600 mb-2">
                <strong>배차 간격:</strong> 평일 6-8분 / 주말 8-12분
              </div>
              <div className="text-sm text-gray-600 mb-4">
                <strong>주요 경유역:</strong> 인천, 송도, 수원, 분당, 왕십리, 청량리
              </div>
              
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded">논현동 구간</span>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded">호구포역</span>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded font-bold">인천논현역</span>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded">소래포구역</span>
              </div>
            </div>
          </div>

          {/* 안내사항 */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-8">
            <div className="flex">
              <div className="flex-shrink-0">
                <span className="text-yellow-400">⚠️</span>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">안내사항</h3>
                <div className="mt-2 text-sm text-yellow-700">
                  <p>• 실시간 정보는 실제와 다를 수 있습니다.</p>
                  <p>• 지연 및 운행 중단 시 역내 안내방송을 확인해 주세요.</p>
                  <p>• 더 정확한 정보는 코레일톡 앱을 이용해 주세요.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 