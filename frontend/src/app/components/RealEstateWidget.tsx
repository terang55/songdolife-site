'use client';

import React, { useState, useEffect, useRef } from 'react';

interface Deal {
  apartment_name: string;
  area: string;
  floor: string;
  price: string;
  price_numeric: number;
  deal_date: string;
  build_year: string;
  location: string;
  price_per_pyeong: string;
  unique_id?: string;
}

interface Statistics {
  total_deals: number;
  new_deals_count?: number;
  avg_price: string;
  max_price: string;
  min_price: string;
  period: string;
}

interface ApartmentStat {
  name: string;
  count: number;
  avg_price: string;
  avg_price_numeric: number;
}

interface RealEstateData {
  deals: Deal[];
  new_deals?: Deal[];
  statistics: Statistics;
  apartment_stats: ApartmentStat[];
  comparison_mode?: boolean;
}

interface RealEstateResponse {
  success: boolean;
  data: RealEstateData;
  location: string;
  timestamp: string;
}

export default function RealEstateWidget() {
  const [data, setData] = useState<RealEstateData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAllDeals, setShowAllDeals] = useState(false);
  const [expandedApartment, setExpandedApartment] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [highlight, setHighlight] = useState<string | null>(null);
  const [showNewDealsOnly, setShowNewDealsOnly] = useState(false);
  const [comparisonMode, setComparisonMode] = useState(false);
  const [lastUpdateTime, setLastUpdateTime] = useState<string | null>(null);
  const apartmentRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    fetchRealEstateData();
    loadLastUpdateTime();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // localStorage에서 이전 데이터 가져오기
  const getPreviousData = (): Deal[] => {
    if (typeof window === 'undefined') return [];
    
    try {
      const saved = localStorage.getItem('songdo_realestate_data');
      if (saved) {
        const parsed = JSON.parse(saved);
        // 24시간 이내 데이터만 사용
        const savedTime = new Date(parsed.timestamp);
        const now = new Date();
        const timeDiff = now.getTime() - savedTime.getTime();
        const hoursDiff = timeDiff / (1000 * 3600);
        
        if (hoursDiff <= 24) {
          return parsed.deals || [];
        }
      }
    } catch (error) {
      console.error('이전 데이터 로드 오류:', error);
    }
    return [];
  };

  // localStorage에 현재 데이터 저장
  const savePreviousData = (deals: Deal[]) => {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem('songdo_realestate_data', JSON.stringify({
        deals,
        timestamp: new Date().toISOString()
      }));
      const updateTime = new Date().toLocaleString('ko-KR');
      setLastUpdateTime(updateTime);
      localStorage.setItem('songdo_realestate_last_update', updateTime);
    } catch (error) {
      console.error('데이터 저장 오류:', error);
    }
  };

  // 마지막 업데이트 시간 로드
  const loadLastUpdateTime = () => {
    if (typeof window === 'undefined') return;
    
    try {
      const lastUpdate = localStorage.getItem('songdo_realestate_last_update');
      if (lastUpdate) {
        setLastUpdateTime(lastUpdate);
      }
    } catch (error) {
      console.error('업데이트 시간 로드 오류:', error);
    }
  };

  const fetchRealEstateData = async () => {
    try {
      setLoading(true);
      setError(null);
      setComparisonMode(false);
      setShowNewDealsOnly(false);
      
      const response = await fetch('/api/realestate?months=3');
      const result: RealEstateResponse = await response.json();
      
      if (result.success) {
        setData(result.data);
        // 새로 가져온 데이터를 저장
        savePreviousData(result.data.deals);
      } else {
        setError('실거래가 정보를 불러올 수 없습니다.');
      }
    } catch (error) {
      console.error('실거래가 데이터 로딩 오류:', error);
      setError('데이터 로딩 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 신규 거래 확인 함수 (서버 기준 24시간)
  const checkNewDeals = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/realestate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}) // 빈 객체 (서버에서 24시간 기준으로 비교)
      });
      
      const result: RealEstateResponse = await response.json();
      
      if (result.success) {
        setData(result.data);
        setComparisonMode(true);
        
        // 신규 거래가 있으면 자동으로 신규만 보기 모드로 전환
        if (result.data.new_deals && result.data.new_deals.length > 0) {
          setShowNewDealsOnly(true);
        }
      } else {
        setError('신규 거래 확인 중 오류가 발생했습니다.');
      }
    } catch (error) {
      console.error('신규 거래 확인 오류:', error);
      setError('신규 거래 확인 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 검색어가 단지명과 정확히 일치하면 해당 카드로 스크롤 & 강조
  useEffect(() => {
    const target = searchTerm.trim();
    if (target && apartmentRefs.current[target]) {
      apartmentRefs.current[target]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setExpandedApartment(target);
      setHighlight(target);
      const timer = setTimeout(() => setHighlight(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [searchTerm]);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="text-center text-red-600">
          <p className="text-lg font-semibold mb-2">🏠 실거래가 정보</p>
          <p className="text-sm">{error}</p>
          <button 
            onClick={fetchRealEstateData}
            className="mt-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  // 표시할 거래 데이터 결정
  const dealsToShow = (showNewDealsOnly && comparisonMode && data.new_deals) 
    ? data.new_deals 
    : data.deals;

  // 아파트 이름 배열 (중복 제거)
  const apartmentNames = Array.from(new Set(data.apartment_stats.map(stat => stat.name)));

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-800 flex items-center">
          🏠 송도동 아파트 실거래가
        </h2>
        <div className="flex items-center space-x-2">
          {lastUpdateTime && (
            <span className="text-xs text-gray-500">
              마지막 업데이트: {lastUpdateTime}
            </span>
          )}
        </div>
      </div>

      {/* 컨트롤 버튼들 */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={fetchRealEstateData}
          className="px-3 py-1.5 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors"
        >
          🔄 새로고침
        </button>
        <button
          onClick={checkNewDeals}
          className="px-3 py-1.5 bg-green-500 text-white text-sm rounded hover:bg-green-600 transition-colors"
        >
          🆕 24시간 내 신규거래
        </button>
        {comparisonMode && data.new_deals && data.new_deals.length > 0 && (
          <button
            onClick={() => setShowNewDealsOnly(!showNewDealsOnly)}
            className={`px-3 py-1.5 text-sm rounded transition-colors ${
              showNewDealsOnly 
                ? 'bg-orange-500 text-white hover:bg-orange-600' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {showNewDealsOnly ? '전체 보기' : `신규만 보기 (${data.new_deals.length}건)`}
          </button>
        )}
      </div>

      {/* 신규 거래 알림 */}
      {comparisonMode && data.statistics.new_deals_count !== undefined && (
        <div className={`mb-4 p-3 rounded-lg border ${
          data.statistics.new_deals_count > 0 
            ? 'bg-green-50 border-green-200' 
            : 'bg-blue-50 border-blue-200'
        }`}>
          <div className="flex items-center space-x-2">
            <span className="text-lg">
              {data.statistics.new_deals_count > 0 ? '🎉' : 'ℹ️'}
            </span>
            <span className={`font-semibold ${
              data.statistics.new_deals_count > 0 ? 'text-green-800' : 'text-blue-800'
            }`}>
              {data.statistics.new_deals_count > 0 
                ? `24시간 내 ${data.statistics.new_deals_count}건의 신규 거래가 발견되었습니다!`
                : '24시간 내 신규 거래가 없습니다.'
              }
            </span>
          </div>
          {data.statistics.new_deals_count > 0 && (
            <p className="text-sm text-green-700 mt-1">
              신규 거래만 보려면 위의 &ldquo;신규만 보기&rdquo; 버튼을 클릭하세요.
            </p>
          )}
        </div>
      )}

      {/* 검색 입력 */}
      <div className="mb-4">
        <label htmlFor="apartment-search" className="sr-only">단지 검색</label>
        <input
          id="apartment-search"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          list="apartment-options"
          placeholder="단지명을 입력하세요 (예: 송도센트럴파크)"
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
        />
        <datalist id="apartment-options">
          {apartmentNames.map((name) => (
            <option key={name} value={name} />
          ))}
        </datalist>
      </div>

      {/* 전체 통계 요약 */}
      <div className="grid grid-cols-3 gap-2 mb-2 p-2 bg-gray-50 rounded-lg">
        <div className="text-center">
          <p className="text-xs text-gray-600">평균가</p>
          <p className="text-xs sm:text-sm font-semibold text-blue-600 sm:whitespace-nowrap">{data.statistics.avg_price}</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-600">최고가</p>
          <p className="text-xs sm:text-sm font-semibold text-red-600 sm:whitespace-nowrap">{data.statistics.max_price}</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-600">최저가</p>
          <p className="text-xs sm:text-sm font-semibold text-green-600 sm:whitespace-nowrap">{data.statistics.min_price}</p>
        </div>
      </div>

      {/* 좌우 2단 레이아웃 */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* 최신 거래 (또는 신규 거래) */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-bold text-blue-700">
              {showNewDealsOnly && comparisonMode ? '🆕 신규 거래' : '최신 거래'}
            </h3>
            <button
              onClick={() => setShowAllDeals(!showAllDeals)}
              className="text-xs text-blue-600 hover:text-blue-800 transition-colors"
            >
              {showAllDeals ? '접기' : `전체보기 (${dealsToShow.length}건)`}
            </button>
          </div>
          
          {dealsToShow.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p className="text-sm">
                {showNewDealsOnly ? '24시간 내 신규 거래가 없습니다.' : '거래 데이터가 없습니다.'}
              </p>
            </div>
          ) : (
            <div className="space-y-2 max-h-96 overflow-y-auto custom-scrollbar pr-10 md:pr-6 pb-3">
              {dealsToShow.slice(0, showAllDeals ? dealsToShow.length : 10).map((deal, index) => (
                <div 
                  key={index} 
                  className={`border-l-4 pl-3 py-1.5 rounded-r transition-all duration-300 ${
                    showNewDealsOnly && comparisonMode 
                      ? 'border-green-500 bg-green-50 animate-pulse' 
                      : 'border-blue-500 bg-gray-50'
                  }`}
                >
                  <div className="flex justify-between items-start mb-0.5">
                    <h3 className="font-semibold text-gray-800 text-sm flex items-center">
                      {deal.apartment_name}
                      {showNewDealsOnly && comparisonMode && (
                        <span className="ml-1 text-xs bg-green-500 text-white px-1 rounded">NEW</span>
                      )}
                    </h3>
                    <span className="text-xs text-gray-500">{deal.deal_date}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-xs text-gray-600">
                      <span>{deal.area} • {deal.floor} • {deal.build_year}년</span>
                    </div>
                    <div className="text-right pr-1 md:pr-2 lg:pr-3">
                      <p className="font-bold text-blue-600 text-sm">{deal.price}</p>
                      <p className="text-xs text-gray-500">평당 {deal.price_per_pyeong}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {/* 아파트별 통계 */}
        <div className="flex-1 min-w-0">
          <h3 className="font-bold mb-1 text-green-700">아파트별 통계</h3>
          <div className="space-y-2 max-h-96 overflow-y-auto custom-scrollbar pr-10 md:pr-6 pb-3">
            {data.apartment_stats.map((stat, index) => {
              const apartmentDeals = data.deals.filter(deal => deal.apartment_name === stat.name);
              const isExpanded = expandedApartment === stat.name;
              
              return (
                <div
                  key={index}
                  ref={(el) => { apartmentRefs.current[stat.name] = el; }}
                  className={`border border-gray-200 rounded-lg overflow-hidden ${highlight === stat.name ? 'ring-2 ring-blue-400' : ''}`}
                >
                  <div 
                    className="p-2.5 hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => setExpandedApartment(isExpanded ? null : stat.name)}
                  >
                    <div className="flex justify-between items-center mb-1.5">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold text-gray-800 text-sm">{stat.name}</h3>
                        <span className={`text-xs transition-transform ${isExpanded ? 'rotate-90' : ''}`}>
                          ▶️
                        </span>
                      </div>
                      <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                        {stat.count}건
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-600">평균 거래가</span>
                      <span className="font-bold text-blue-600 text-sm">{stat.avg_price}</span>
                    </div>
                  </div>
                  
                  {/* 확장된 거래 내역 */}
                  {isExpanded && (
                    <div className="border-t bg-gray-50 p-2.5">
                      <h4 className="text-xs font-semibold text-gray-700 mb-2">
                        {stat.name} 거래 내역 ({apartmentDeals.length}건)
                      </h4>
                      <div className="space-y-1 max-h-80 overflow-y-auto custom-scrollbar pr-10 md:pr-6 pb-2">
                        {apartmentDeals.map((deal, dealIndex) => (
                          <div key={dealIndex} className="bg-white p-2 rounded border text-xs">
                            <div className="flex justify-between items-start mb-1">
                              <div className="flex-1">
                                <div className="font-medium text-gray-800">
                                  {deal.area} • {deal.floor} • {deal.build_year}년
                                </div>
                                <div className="text-gray-500">
                                  {deal.deal_date}
                                </div>
                              </div>
                              <div className="text-right ml-2 pr-1 md:pr-2 lg:pr-3">
                                <div className="font-bold text-blue-600">
                                  {deal.price}
                                </div>
                                <div className="text-gray-500">
                                  평당 {deal.price_per_pyeong}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/* 새로고침 버튼 */}
      <div className="mt-4 text-center">
        <button
          onClick={fetchRealEstateData}
          className="text-xs text-gray-500 hover:text-gray-700 transition-colors"
        >
          🔄 새로고침
        </button>
      </div>
    </div>
  );
} 