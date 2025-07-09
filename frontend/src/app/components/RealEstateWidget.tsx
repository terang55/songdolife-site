'use client';

import { useState, useEffect } from 'react';

interface RealEstateData {
  unique_id: string;
  법정동: string;
  아파트: string;
  전용면적: string;
  거래금액: string;
  거래년월: string;
  거래일: string;
  층: string;
  deal_date: string;
}

interface ApiResponse {
  success: boolean;
  data: RealEstateData[];
  total_count: number;
  is_new_deals: boolean;
  new_deals_count?: number;
}

interface ApartmentGroup {
  name: string;
  deals: RealEstateData[];
  avgPrice: number;
  count: number;
  isExpanded: boolean;
}

export default function RealEstateWidget() {
  const [allDeals, setAllDeals] = useState<RealEstateData[]>([]);
  const [newDeals, setNewDeals] = useState<RealEstateData[]>([]);
  const [apartmentGroups, setApartmentGroups] = useState<ApartmentGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [newDealsLoading, setNewDealsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 전체 실거래가 데이터 로드
  const fetchAllDeals = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/realestate');
      if (!response.ok) {
        throw new Error('데이터를 불러오는데 실패했습니다');
      }
      
      const result: ApiResponse = await response.json();
      if (result.success) {
        setAllDeals(result.data);
        groupDealsByApartment(result.data);
      } else {
        setError('데이터를 불러오는데 실패했습니다');
      }
    } catch (error) {
      console.error('실거래가 데이터 로드 실패:', error);
      setError('네트워크 오류가 발생했습니다');
    } finally {
      setLoading(false);
    }
  };

  // 신규 거래 데이터 로드
  const fetchNewDeals = async () => {
    try {
      setNewDealsLoading(true);
      
      const response = await fetch('/api/realestate?checkNew=true');
      if (!response.ok) {
        throw new Error('신규거래 확인에 실패했습니다');
      }
      
      const result: ApiResponse = await response.json();
      if (result.success) {
        setNewDeals(result.data);
      }
    } catch (error) {
      console.error('신규거래 확인 실패:', error);
    } finally {
      setNewDealsLoading(false);
    }
  };

  // 아파트별 그룹화 함수
  const groupDealsByApartment = (deals: RealEstateData[]) => {
    const groups: Record<string, RealEstateData[]> = {};
    
    deals.forEach(deal => {
      if (!groups[deal.아파트]) {
        groups[deal.아파트] = [];
      }
      groups[deal.아파트].push(deal);
    });

    const apartmentGroups: ApartmentGroup[] = Object.entries(groups).map(([name, deals]) => {
      const prices = deals.map(deal => parseInt(deal.거래금액.replace(/,/g, '')));
      const avgPrice = Math.round(prices.reduce((sum, price) => sum + price, 0) / prices.length);
      
      return {
        name,
        deals: deals.sort((a, b) => new Date(b.deal_date).getTime() - new Date(a.deal_date).getTime()),
        avgPrice,
        count: deals.length,
        isExpanded: false
      };
    });

    // 평균가 높은 순으로 정렬
    apartmentGroups.sort((a, b) => b.avgPrice - a.avgPrice);
    setApartmentGroups(apartmentGroups);
  };

  // 아파트 그룹 펼치기/접기
  const toggleApartmentExpand = (apartmentName: string) => {
    setApartmentGroups(groups => 
      groups.map(group => 
        group.name === apartmentName 
          ? { ...group, isExpanded: !group.isExpanded }
          : group
      )
    );
  };

  // 컴포넌트 마운트 시 자동으로 데이터 로드
  useEffect(() => {
    fetchAllDeals();
    fetchNewDeals();
  }, []);

  const formatPrice = (price: string) => {
    const numPrice = parseInt(price.replace(/,/g, ''));
    if (numPrice >= 10000) {
      const eon = Math.floor(numPrice / 10000);
      const thousand = numPrice % 10000;
      return thousand > 0 ? `${eon}억 ${thousand}만원` : `${eon}억원`;
    }
    return `${numPrice}만원`;
  };

  const formatAvgPrice = (avgPrice: number) => {
    if (avgPrice >= 10000) {
      const eon = Math.floor(avgPrice / 10000);
      const thousand = avgPrice % 10000;
      return thousand > 0 ? `${eon}억 ${thousand}만원` : `${eon}억원`;
    }
    return `${avgPrice}만원`;
  };

  const DealCard = ({ deal }: { deal: RealEstateData }) => (
    <div className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-medium text-gray-900 text-sm">{deal.아파트}</h4>
        <span className="text-xs text-gray-500">{deal.법정동}</span>
      </div>
      <div className="space-y-1">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">거래금액</span>
          <span className="font-semibold text-blue-600">{formatPrice(deal.거래금액)}</span>
        </div>
        <div className="flex justify-between text-xs text-gray-500">
          <span>전용면적: {deal.전용면적}㎡</span>
          <span>{deal.층}층</span>
        </div>
        <div className="text-xs text-gray-400">
          {deal.거래년월}.{deal.거래일}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* 신규 거래 섹션 */}
      <div className="bg-white rounded-lg shadow-sm border p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <span className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></span>
            신규 거래
          </h3>
          <button
            onClick={fetchNewDeals}
            disabled={newDealsLoading}
            className="text-sm px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50 transition-colors"
          >
            {newDealsLoading ? '확인중...' : '새로고침'}
          </button>
        </div>

        {newDealsLoading ? (
          <div className="text-center py-8 text-gray-500">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-red-500 mx-auto mb-2"></div>
            신규거래 확인중...
          </div>
        ) : newDeals.length > 0 ? (
          <div className="space-y-3">
            <div className="text-sm text-red-600 font-medium mb-3">
              📍 새로 등록된 거래 {newDeals.length}건
            </div>
            <div className="grid gap-3 max-h-80 overflow-y-auto">
              {newDeals.map((deal, index) => (
                <DealCard key={`new-${deal.unique_id}-${index}`} deal={deal} />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <div className="text-2xl mb-2">✅</div>
            <div className="text-sm">신규 거래가 없습니다</div>
            <div className="text-xs text-gray-400 mt-1">모든 거래가 이미 확인되었습니다</div>
          </div>
        )}
      </div>

      {/* 전체 실거래가 섹션 */}
      <div className="bg-white rounded-lg shadow-sm border p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">전체 실거래가</h3>
          <button
            onClick={fetchAllDeals}
            disabled={loading}
            className="text-sm px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 transition-colors"
          >
            {loading ? '로딩중...' : '새로고침'}
          </button>
        </div>

        {loading ? (
          <div className="text-center py-8 text-gray-500">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mx-auto mb-2"></div>
            실거래가 데이터 로딩중...
          </div>
        ) : error ? (
          <div className="text-center py-8 text-red-500">
            <div className="text-2xl mb-2">⚠️</div>
            <div className="text-sm">{error}</div>
            <button
              onClick={fetchAllDeals}
              className="mt-2 text-xs px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              다시 시도
            </button>
          </div>
        ) : allDeals.length > 0 ? (
          <div className="space-y-3">
            <div className="text-sm text-gray-600 mb-3">
              📊 총 {allDeals.length}건의 거래 정보
            </div>
            
            {/* 좌우 2단 레이아웃 */}
            <div className="flex flex-col md:flex-row gap-4">
              {/* 왼쪽: 전체 거래 목록 */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-blue-700">최신 거래</h4>
                  <span className="text-xs text-gray-500">{allDeals.length}건</span>
                </div>
                <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
                  {allDeals.map((deal, index) => (
                    <div 
                      key={`recent-${deal.unique_id}-${index}`} 
                      className="border-l-4 border-blue-500 pl-3 py-2 bg-gray-50 rounded-r transition-colors hover:bg-gray-100"
                    >
                      <div className="flex justify-between items-start mb-1">
                        <h5 className="font-semibold text-gray-800 text-sm">{deal.아파트}</h5>
                        <span className="text-xs text-gray-500">{deal.거래년월}.{deal.거래일}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="text-xs text-gray-600">
                          <span>{deal.전용면적}㎡ • {deal.층}층</span>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-blue-600 text-sm">{formatPrice(deal.거래금액)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 오른쪽: 아파트별 통계 */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-green-700">아파트별 통계</h4>
                  <span className="text-xs text-gray-500">{apartmentGroups.length}개 단지</span>
                </div>
                <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
                  {apartmentGroups.map((group, index) => (
                    <div 
                      key={group.name} 
                      className="border border-gray-200 rounded-lg overflow-hidden"
                    >
                      <div 
                        className="p-2.5 hover:bg-gray-50 transition-colors cursor-pointer"
                        onClick={() => toggleApartmentExpand(group.name)}
                      >
                        <div className="flex justify-between items-center mb-1.5">
                          <div className="flex items-center space-x-2">
                            <h5 className="font-semibold text-gray-800 text-sm">{group.name}</h5>
                            <span className={`text-xs transition-transform ${group.isExpanded ? 'rotate-90' : ''}`}>
                              ▶️
                            </span>
                          </div>
                          <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                            {group.count}건
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-600">평균 거래가</span>
                          <span className="font-bold text-blue-600 text-sm">{formatAvgPrice(group.avgPrice)}</span>
                        </div>
                      </div>
                      
                      {/* 확장된 거래 내역 */}
                      {group.isExpanded && (
                        <div className="border-t bg-gray-50 p-2.5">
                          <h6 className="text-xs font-semibold text-gray-700 mb-2">
                            {group.name} 거래 내역 ({group.deals.length}건)
                          </h6>
                          <div className="space-y-1 max-h-60 overflow-y-auto">
                            {group.deals.map((deal, dealIndex) => (
                              <div key={`${group.name}-detail-${deal.unique_id}-${dealIndex}`} className="bg-white p-2 rounded border text-xs">
                                <div className="flex justify-between items-start mb-1">
                                  <div className="flex-1">
                                    <div className="font-medium text-gray-800">
                                      {deal.전용면적}㎡ • {deal.층}층
                                    </div>
                                    <div className="text-gray-500">
                                      {deal.거래년월}.{deal.거래일}
                                    </div>
                                  </div>
                                  <div className="text-right ml-2">
                                    <div className="font-bold text-blue-600">
                                      {formatPrice(deal.거래금액)}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <div className="text-2xl mb-2">📊</div>
            <div className="text-sm">거래 데이터가 없습니다</div>
          </div>
        )}
      </div>
    </div>
  );
} 