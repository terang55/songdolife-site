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

interface PriceStats {
  avgPrice: number;
  maxPrice: number;
  minPrice: number;
  totalDeals: number;
}

export default function RealEstateWidget() {
  const [allDeals, setAllDeals] = useState<RealEstateData[]>([]);
  const [filteredDeals, setFilteredDeals] = useState<RealEstateData[]>([]);
  const [newDeals, setNewDeals] = useState<RealEstateData[]>([]);
  const [apartmentGroups, setApartmentGroups] = useState<ApartmentGroup[]>([]);
  const [filteredGroups, setFilteredGroups] = useState<ApartmentGroup[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [priceStats, setPriceStats] = useState<PriceStats | null>(null);
  const [showAllDeals, setShowAllDeals] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [newDealsLoading, setNewDealsLoading] = useState(true);
  const [expandNewDeals, setExpandNewDeals] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 신규 거래 여부 빠른 확인을 위한 Set 생성
  const newDealIdSet = new Set(newDeals.map((d) => d.unique_id));

  // 가격 통계 계산 함수
  const calculatePriceStats = (deals: RealEstateData[]): PriceStats => {
    const prices = deals.map(deal => parseInt(deal.거래금액.replace(/,/g, '')));
    
    return {
      avgPrice: Math.round(prices.reduce((sum, price) => sum + price, 0) / prices.length),
      maxPrice: Math.max(...prices),
      minPrice: Math.min(...prices),
      totalDeals: deals.length
    };
  };

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
        setFilteredDeals(result.data);
        setPriceStats(calculatePriceStats(result.data));
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
    setFilteredGroups(apartmentGroups);
  };

  // 검색 필터링 함수
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    
    if (!term.trim()) {
      setFilteredDeals(allDeals);
      setFilteredGroups(apartmentGroups);
      setPriceStats(calculatePriceStats(allDeals));
      return;
    }

    const filtered = allDeals.filter(deal => 
      deal.아파트.toLowerCase().includes(term.toLowerCase()) ||
      deal.법정동.toLowerCase().includes(term.toLowerCase())
    );
    
    const filteredGroupsData = apartmentGroups.filter(group =>
      group.name.toLowerCase().includes(term.toLowerCase())
    );

    setFilteredDeals(filtered);
    setFilteredGroups(filteredGroupsData);
    
    if (filtered.length > 0) {
      setPriceStats(calculatePriceStats(filtered));
    }
  };

  // 아파트 그룹 펼치기/접기
  const toggleApartmentExpand = (apartmentName: string) => {
    setFilteredGroups(groups => 
      groups.map(group => 
        group.name === apartmentName 
          ? { ...group, isExpanded: !group.isExpanded }
          : group
      )
    );
  };

  // 전체보기 토글
  const toggleShowAll = () => {
    setShowAllDeals(!showAllDeals);
  };

  // 표시할 거래 데이터 결정 (검색 중이면 모든 결과, 아니면 20개 제한)
  const getDisplayDeals = () => {
    if (searchTerm) {
      return filteredDeals; // 검색 중이면 모든 검색 결과 표시
    }
    return showAllDeals ? allDeals : allDeals.slice(0, 20);
  };

  // 컴포넌트 마운트 시 자동으로 데이터 로드
  useEffect(() => {
    fetchAllDeals();
    fetchNewDeals();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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

  const displayDeals = getDisplayDeals();

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
            <div className={`grid gap-3 ${expandNewDeals ? '' : 'max-h-80 overflow-y-auto'}`}>
              {newDeals.map((deal, index) => (
                <DealCard key={`new-${deal.unique_id}-${index}`} deal={deal} />
              ))}
            </div>
            {newDeals.length > 3 && (
              <div className="text-center mt-3">
                <button
                  onClick={() => setExpandNewDeals(!expandNewDeals)}
                  className="text-sm px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                  {expandNewDeals ? '접기' : '더보기'}
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <div className="text-2xl mb-2">✅</div>
            <div className="text-sm">신규 거래가 없습니다</div>
            <div className="text-xs text-gray-400 mt-1">모든 거래가 이미 확인되었습니다</div>
          </div>
        )}
      </div>

      {/* 검색 및 통계 섹션 */}
      <div className="bg-white rounded-lg shadow-sm border p-4">
        <div className="space-y-4">
          {/* 검색창 */}
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                🔍 단지명 검색
              </label>
              <input
                type="text"
                id="search"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="단지명을 입력하세요 (예: 송도센트럴파크)"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
            {searchTerm && (
              <button
                onClick={() => handleSearch('')}
                className="text-sm px-3 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
              >
                초기화
              </button>
            )}
          </div>

          {/* 가격 통계 */}
          {priceStats && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 rounded-lg p-3 text-center">
                <div className="text-lg font-bold text-blue-600">{formatAvgPrice(priceStats.avgPrice)}</div>
                <div className="text-sm text-blue-700">평균가</div>
              </div>
              <div className="bg-red-50 rounded-lg p-3 text-center">
                <div className="text-lg font-bold text-red-600">{formatAvgPrice(priceStats.maxPrice)}</div>
                <div className="text-sm text-red-700">최고가</div>
              </div>
              <div className="bg-green-50 rounded-lg p-3 text-center">
                <div className="text-lg font-bold text-green-600">{formatAvgPrice(priceStats.minPrice)}</div>
                <div className="text-sm text-green-700">최저가</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 text-center">
                <div className="text-lg font-bold text-gray-600">{priceStats.totalDeals}건</div>
                <div className="text-sm text-gray-700">총 거래</div>
              </div>
            </div>
          )}
          
          {/* 검색 결과 표시 */}
          {searchTerm && (
            <div className="text-sm text-gray-600">
              <span className="font-medium text-blue-600">&quot;{searchTerm}&quot;</span> 검색 결과: 
              <span className="font-semibold ml-1">{filteredDeals.length}건</span>
            </div>
          )}

          {/* 검색 결과 목록 */}
          {searchTerm && filteredDeals.length > 0 && (
            <div className="mt-4">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">
                &quot;{searchTerm}&quot; 검색 결과
              </h4>
              
              {/* 좌우 2단 레이아웃 */}
              <div className="flex flex-col md:flex-row gap-4">
                {/* 왼쪽: 검색된 거래 목록 */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-bold text-blue-700">거래 목록</h5>
                    <span className="text-xs text-gray-500">{filteredDeals.length}건</span>
                  </div>
                  <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
                    {filteredDeals.map((deal, index) => (
                      <div 
                        key={`search-${deal.unique_id}-${index}`} 
                        className="border-l-4 border-green-500 pl-3 py-2 bg-gray-50 rounded-r transition-colors hover:bg-gray-100"
                      >
                        <div className="flex justify-between items-start mb-1">
                          <h6 className="font-semibold text-gray-800 text-sm">{deal.아파트}</h6>
                          <span className="text-xs text-gray-500">{deal.거래년월}.{deal.거래일}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="text-xs text-gray-600">
                            <span>{deal.전용면적}㎡ • {deal.층}층</span>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-green-600 text-sm">{formatPrice(deal.거래금액)}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 오른쪽: 검색된 아파트별 통계 */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-bold text-green-700">단지별 통계</h5>
                    <span className="text-xs text-gray-500">{filteredGroups.length}개 단지</span>
                  </div>
                  <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
                    {filteredGroups.map((group) => (
                      <div 
                        key={`search-group-${group.name}`} 
                        className="border border-gray-200 rounded-lg overflow-hidden"
                      >
                        <div 
                          className="p-2.5 hover:bg-gray-50 transition-colors cursor-pointer"
                          onClick={() => toggleApartmentExpand(group.name)}
                        >
                          <div className="flex justify-between items-center mb-1.5">
                            <div className="flex items-center space-x-2">
                              <h6 className="font-semibold text-gray-800 text-sm">{group.name}</h6>
                              <span className={`text-xs transition-transform ${group.isExpanded ? 'rotate-90' : ''}`}>
                                ▶️
                              </span>
                            </div>
                            <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded">
                              {group.count}건
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-600">평균 거래가</span>
                            <span className="font-bold text-green-600 text-sm">{formatAvgPrice(group.avgPrice)}</span>
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
                                <div key={`search-${group.name}-detail-${deal.unique_id}-${dealIndex}`} className="bg-white p-2 rounded border text-xs">
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
                                      <div className="font-bold text-green-600">
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
          )}

          {/* 검색 결과 없음 */}
          {searchTerm && filteredDeals.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <div className="text-2xl mb-2">🔍</div>
              <div className="text-sm">검색 결과가 없습니다</div>
              <div className="text-xs text-gray-400 mt-1">다른 검색어를 시도해보세요</div>
            </div>
                     )}
         </div>
       </div>

       {/* 전체 실거래가 섹션 */}
       <div className="bg-white rounded-lg shadow-sm border p-4">
         <div className="flex items-center justify-between mb-4">
           <h3 className="text-lg font-semibold text-gray-900">전체 실거래가 (최근 3개월)</h3>
           <div className="flex items-center space-x-2">
             {!searchTerm && allDeals.length > 20 && (
               <button
                 onClick={toggleShowAll}
                 className="text-sm px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
               >
                 {showAllDeals ? `최근 20개만` : `전체보기 (${allDeals.length}건)`}
               </button>
             )}
             <button
               onClick={fetchAllDeals}
               disabled={loading}
               className="text-sm px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 transition-colors"
             >
               {loading ? '로딩중...' : '새로고침'}
             </button>
           </div>
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
         ) : displayDeals.length > 0 ? (
           <div className="space-y-3">
             <div className="text-sm text-gray-600 mb-3">
               📊 {searchTerm ? `검색 결과 ${displayDeals.length}건` : showAllDeals ? `전체 ${allDeals.length}건` : `최근 ${displayDeals.length}건`}
             </div>
             
             {/* 좌우 2단 레이아웃 */}
             <div className="flex flex-col md:flex-row gap-4">
               {/* 왼쪽: 전체 거래 목록 */}
               <div className="flex-1 min-w-0">
                 <div className="flex items-center justify-between mb-2">
                   <h4 className="font-bold text-blue-700">최신 거래</h4>
                   <span className="text-xs text-gray-500">{displayDeals.length}건</span>
                 </div>
                 <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
                   {displayDeals.map((deal, index) => {
                     const isNew = newDealIdSet.has(deal.unique_id);
                     return (
                       <div
                         key={`recent-${deal.unique_id}-${index}`}
                         className={`border-l-4 pl-3 py-2 rounded-r transition-colors hover:bg-gray-100 ${
                           isNew ? 'border-green-500 bg-green-50' : 'border-blue-500 bg-gray-50'
                         }`}
                       >
                         <div className="flex justify-between items-start mb-1">
                           <h5 className="font-semibold text-gray-800 text-sm flex items-center">
                             {deal.아파트}
                             {isNew && (
                               <span className="ml-1 text-[10px] font-semibold text-green-700 bg-green-100 px-1.5 py-0.5 rounded">
                                 NEW
                               </span>
                             )}
                           </h5>
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
                     );
                   })}
                 </div>
               </div>

               {/* 오른쪽: 아파트별 통계 */}
               <div className="flex-1 min-w-0">
                 <div className="flex items-center justify-between mb-2">
                   <h4 className="font-bold text-green-700">아파트별 통계</h4>
                   <span className="text-xs text-gray-500">{apartmentGroups.length}개 단지</span>
                 </div>
                 <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
                   {apartmentGroups.map((group) => (
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