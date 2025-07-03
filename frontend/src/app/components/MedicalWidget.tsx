'use client';

import React, { useState, useEffect, useCallback } from 'react';

interface MedicalInfo {
  id: string;
  name: string;
  category: string;
  address: string;
  roadAddress: string;
  phone?: string;
  distance: number;
  x: string;
  y: string;
  url?: string;
  type: 'hospital' | 'pharmacy';
  specialties?: string[];
  hasEmergency?: boolean;
  hasNightCare?: boolean;
}

interface MedicalApiResponse {
  success: boolean;
  data: MedicalInfo[];
  total: number;
  timestamp: string;
  params: {
    type: string;
    category?: string;
    emergency?: boolean;
    night?: boolean;
    radius: number;
  };
  note?: string;
}

const MedicalWidget: React.FC = () => {
  const [medicalData, setMedicalData] = useState<MedicalInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedType, setSelectedType] = useState<'all' | 'hospital' | 'pharmacy'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [emergencyOnly, setEmergencyOnly] = useState(false);
  const [nightOnly, setNightOnly] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const fetchMedicalData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams();
      if (selectedType !== 'all') params.append('type', selectedType);
      if (selectedCategory) params.append('category', selectedCategory);
      if (emergencyOnly) params.append('emergency', 'true');
      if (nightOnly) params.append('night', 'true');
      params.append('radius', '2000'); // 2km 반경

      const response = await fetch(`/api/medical?${params.toString()}`);
      const result: MedicalApiResponse = await response.json();

      if (result.success) {
        setMedicalData(result.data);
        setIsDataLoaded(true);
      } else {
        setError('의료기관 정보를 불러오는데 실패했습니다.');
      }
    } catch (error) {
      console.error('의료기관 API 오류:', error);
      setError('네트워크 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  }, [selectedType, selectedCategory, emergencyOnly, nightOnly]);

  useEffect(() => {
    if (isDataLoaded) {
      fetchMedicalData();
    }
  }, [isDataLoaded, fetchMedicalData]);

  const getTypeIcon = (type: 'hospital' | 'pharmacy') => {
    return type === 'hospital' ? '🏥' : '💊';
  };

  const getDistanceText = (distance: number) => {
    if (distance < 1000) {
      return `${distance}m`;
    } else {
      return `${(distance / 1000).toFixed(1)}km`;
    }
  };

  const getSpecialtyBadges = (specialties?: string[]) => {
    if (!specialties || specialties.length === 0) return null;
    
    return (
      <div className="flex flex-wrap gap-1.5 mt-2">
        {specialties.slice(0, 4).map((specialty, index) => (
          <span 
            key={index}
            className="px-2.5 py-1 text-xs sm:text-sm bg-blue-100 text-blue-800 rounded-full font-medium"
          >
            {specialty}
          </span>
        ))}
        {specialties.length > 4 && (
          <span className="px-2.5 py-1 text-xs sm:text-sm bg-gray-100 text-gray-600 rounded-full font-medium">
            +{specialties.length - 4}
          </span>
        )}
      </div>
    );
  };

  const categories = [
    '내과',
    '외과',
    '정형외과',
    '소아청소년과',
    '이비인후과',
    '안과',
    '치과',
    '피부과',
    '기타'
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-4 sm:mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg sm:text-xl font-bold text-gray-800 flex items-center">
          🏥 논현동 병원/약국 정보
        </h2>
        {isDataLoaded && (
          <button
            onClick={fetchMedicalData}
            disabled={loading}
            className="px-3 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 min-h-[36px] min-w-[80px]"
          >
            {loading ? '⟳' : '새로고침'}
          </button>
        )}
      </div>

      {!isDataLoaded && !loading ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🏥</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            논현동 주변 병원/약국 정보
          </h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto text-sm sm:text-base leading-relaxed">
            논현역 중심 2km 반경 내 병원과 약국 정보를 실시간으로 확인하세요. 
            진료과목, 응급실, 야간진료 여부까지 한눈에!
          </p>
          <button
            onClick={fetchMedicalData}
            className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors font-medium flex items-center gap-2 mx-auto text-sm sm:text-base min-h-[44px]"
          >
            <span>🔍</span>
            병원/약국 정보 보기
          </button>
          <div className="mt-4 text-xs sm:text-sm text-gray-500 space-y-1">
            <div>💡 실시간 정보 • 전화연결 • 지도보기</div>
            <div>진료과목 필터링 • 응급실/야간진료 검색</div>
          </div>
        </div>
      ) : (
        <>
          <div className="mb-4 space-y-4">
            {/* 타입 선택 */}
            <div className="overflow-x-auto">
              <div className="flex gap-2 pb-2 min-w-max">
                <button
                  onClick={() => setSelectedType('all')}
                  className={`px-4 py-2 text-sm font-medium rounded-full border whitespace-nowrap min-h-[36px] ${
                    selectedType === 'all'
                      ? 'bg-blue-500 text-white border-blue-500'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 active:bg-gray-100'
                  }`}
                >
                  전체
                </button>
                <button
                  onClick={() => setSelectedType('hospital')}
                  className={`px-4 py-2 text-sm font-medium rounded-full border whitespace-nowrap min-h-[36px] ${
                    selectedType === 'hospital'
                      ? 'bg-blue-500 text-white border-blue-500'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 active:bg-gray-100'
                  }`}
                >
                  🏥 병원
                </button>
                <button
                  onClick={() => setSelectedType('pharmacy')}
                  className={`px-4 py-2 text-sm font-medium rounded-full border whitespace-nowrap min-h-[36px] ${
                    selectedType === 'pharmacy'
                      ? 'bg-blue-500 text-white border-blue-500'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 active:bg-gray-100'
                  }`}
                >
                  💊 약국
                </button>
              </div>
            </div>

            {/* 진료과목 선택 */}
            {selectedType !== 'pharmacy' && (
              <div className="overflow-x-auto">
                <div className="flex gap-2 pb-2 min-w-max">
                  <button
                    onClick={() => setSelectedCategory('')}
                    className={`px-4 py-2 text-sm font-medium rounded-full border whitespace-nowrap min-h-[36px] ${
                      selectedCategory === ''
                        ? 'bg-green-500 text-white border-green-500'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 active:bg-gray-100'
                    }`}
                  >
                    전체과목
                  </button>
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 text-sm font-medium rounded-full border whitespace-nowrap min-h-[36px] ${
                        selectedCategory === category
                          ? 'bg-green-500 text-white border-green-500'
                          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 active:bg-gray-100'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 특수 옵션 */}
            <div className="flex flex-wrap gap-4">
              <label className="flex items-center text-sm text-gray-700 cursor-pointer min-h-[36px]">
                <input
                  type="checkbox"
                  checked={emergencyOnly}
                  onChange={(e) => setEmergencyOnly(e.target.checked)}
                  className="mr-3 w-4 h-4"
                />
                <span className="font-medium">🚨 응급실만</span>
              </label>
              <label className="flex items-center text-sm text-gray-700 cursor-pointer min-h-[36px]">
                <input
                  type="checkbox"
                  checked={nightOnly}
                  onChange={(e) => setNightOnly(e.target.checked)}
                  className="mr-3 w-4 h-4"
                />
                <span className="font-medium">🌙 야간진료만</span>
              </label>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500 mx-auto"></div>
              <p className="text-gray-600 mt-4 text-sm sm:text-base">의료기관 정보를 불러오는 중...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">⚠️</div>
              <p className="text-red-600 mb-4 text-sm sm:text-base">{error}</p>
              <button
                onClick={fetchMedicalData}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 active:bg-blue-700 font-medium min-h-[44px]"
              >
                다시 시도
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {medicalData.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-5xl mb-4">🔍</div>
                  <h3 className="text-base sm:text-lg font-medium text-gray-800 mb-2">
                    검색 결과가 없습니다
                  </h3>
                  <p className="text-sm text-gray-500 max-w-sm mx-auto">
                    검색 조건을 조정하거나 필터를 변경해보세요
                  </p>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-4 bg-gray-50 rounded-lg p-3">
                    <div className="text-sm sm:text-base font-medium text-gray-700">
                      💡 총 <span className="text-blue-600 font-bold">{medicalData.length}</span>개 의료기관 발견
                    </div>
                    <div className="text-xs text-gray-500">
                      거리순 정렬
                    </div>
                  </div>
                  {medicalData.map((place) => (
                    <div
                      key={place.id}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow bg-white"
                    >
                      {/* 헤더 정보 */}
                      <div className="flex items-start gap-3 mb-3">
                        <span className="text-xl sm:text-2xl">{getTypeIcon(place.type)}</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-base sm:text-lg text-gray-800 truncate">
                              {place.name}
                            </h3>
                            <span className="text-xs sm:text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full whitespace-nowrap">
                              {getDistanceText(place.distance)}
                            </span>
                          </div>
                          
                          {/* 특수 태그 */}
                          {(place.hasEmergency || place.hasNightCare) && (
                            <div className="flex items-center gap-2 mb-2">
                              {place.hasEmergency && (
                                <span className="text-xs font-medium text-red-600 bg-red-50 px-2 py-1 rounded-full">
                                  🚨 응급실
                                </span>
                              )}
                              {place.hasNightCare && (
                                <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                                  🌙 야간진료
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* 주소 정보 */}
                      <div className="space-y-2 mb-3">
                        <div className="flex items-start gap-2 text-sm text-gray-600">
                          <span className="text-base mt-0.5">📍</span>
                          <span className="flex-1 leading-relaxed">
                            {place.roadAddress || place.address}
                          </span>
                        </div>
                        
                        {place.phone && (
                          <div className="flex items-center gap-2 text-sm">
                            <span className="text-base">📞</span>
                            <a 
                              href={`tel:${place.phone}`}
                              className="text-blue-600 hover:text-blue-800 font-medium"
                            >
                              {place.phone}
                            </a>
                          </div>
                        )}
                      </div>

                      {/* 진료과목 배지 */}
                      {getSpecialtyBadges(place.specialties)}

                      {/* 액션 버튼들 */}
                      <div className="flex gap-2 mt-3 pt-3 border-t border-gray-100">
                        {place.phone && (
                          <a
                            href={`tel:${place.phone}`}
                            className="flex-1 px-4 py-2 text-sm font-medium bg-blue-500 text-white rounded-lg hover:bg-blue-600 active:bg-blue-700 text-center transition-colors min-h-[36px] flex items-center justify-center"
                          >
                            📞 전화걸기
                          </a>
                        )}
                        <a
                          href={`https://map.kakao.com/link/map/${place.name},${place.y},${place.x}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 px-4 py-2 text-sm font-medium bg-green-500 text-white rounded-lg hover:bg-green-600 active:bg-green-700 text-center transition-colors min-h-[36px] flex items-center justify-center"
                        >
                          🗺️ 지도보기
                        </a>
                        {place.url && (
                          <a
                            href={place.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 text-sm font-medium bg-gray-500 text-white rounded-lg hover:bg-gray-600 active:bg-gray-700 text-center transition-colors min-h-[36px] flex items-center justify-center"
                          >
                            ℹ️
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          )}

          <div className="mt-6 pt-4 border-t border-gray-200 text-center">
            <div className="text-xs sm:text-sm text-gray-500 space-y-1">
              <div className="font-medium">📍 논현역 중심 2km 반경 내 의료기관 정보</div>
              <div className="text-gray-400">실시간 업데이트 • 카카오맵 연동</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MedicalWidget; 