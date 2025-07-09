import { NextResponse } from 'next/server';
import { XMLParser } from 'fast-xml-parser';
import { NextRequest } from 'next/server';

// 국토교통부 실거래가 API 설정
const MOLIT_API_KEY = 'aTgFhrZehAYOxHq4Z3z1iSYeysHfG9Tu43JQhF26U3mdGzr0H8+jR9MzrwPoqr8yOegDO5OO56GmvXzS7rwkdw==';
const MOLIT_BASE_URL = 'https://apis.data.go.kr/1613000/RTMSDataSvcAptTrade/getRTMSDataSvcAptTrade';

const AREA_CODE = '28185'; // 인천 연수구

interface ProcessedDeal {
  apartment_name: string;
  area: string;
  floor: string;
  price: string;
  price_numeric: number;
  deal_date: string;
  build_year: string;
  location: string;
  price_per_pyeong: string;
  unique_id?: string; // 거래 고유 식별자 추가
}

// 거래 고유 식별자 생성 함수
function generateDealId(deal: Omit<ProcessedDeal, 'unique_id'>): string {
  return `${deal.apartment_name}_${deal.area}_${deal.floor}_${deal.deal_date}_${deal.price_numeric}`;
}

// 가격 문자열을 숫자로 변환 (쉼표 제거)
function parsePrice(priceStr: string): number {
  return parseInt(priceStr.replace(/,/g, '').trim());
}

// 평당 가격 계산 (㎡를 평으로 변환: 1평 = 3.3㎡)
function calculatePricePerPyeong(price: number, area: string): string {
  const areaNum = parseFloat(area);
  const pyeong = areaNum / 3.3;
  const pricePerPyeong = Math.round(price / pyeong);
  return `${pricePerPyeong.toLocaleString()}만원`;
}

// 거래일 포맷팅
function formatDealDate(year: string | number, month: string | number, day: string | number): string {
  const formattedMonth = String(month).padStart(2, '0');
  const formattedDay = String(day).padStart(2, '0');
  return `${year}-${formattedMonth}-${formattedDay}`;
}

// 가격 포맷팅 (만원 단위)
function formatPrice(price: number): string {
  if (price >= 10000) {
    const eok = Math.floor(price / 10000);
    const man = price % 10000;
    if (man === 0) {
      return `${eok}억원`;
    } else {
      return `${eok}억 ${man.toLocaleString()}만원`;
    }
  } else {
    return `${price.toLocaleString()}만원`;
  }
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const checkNew = searchParams.get('checkNew') === 'true';
    
    let previousDeals: ProcessedDeal[] = [];
    let previousUniqueIds: Set<string> = new Set();
    
    if (checkNew) {
      console.log('🔍 신규 거래 확인 모드');
      previousDeals = await loadPreviousData();
      previousUniqueIds = new Set(previousDeals.map(deal => deal.unique_id).filter(id => id !== undefined) as string[]);
      console.log(`📊 이전 데이터: ${previousDeals.length}건`);
    } else {
      console.log('🏠 인천 연수구 송도동 아파트 실거래가 최근 3개월 조회 시작');
    }
    
    const deals: ProcessedDeal[] = [];
    const parser = new XMLParser({ ignoreAttributes: false, trimValues: true });
    const now = new Date();
    // 최근 3개월 yearMonth 리스트 생성
    const yearMonths: string[] = [];
    for (let i = 0; i < 3; i++) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const y = d.getFullYear();
      const m = (d.getMonth() + 1).toString().padStart(2, '0');
      yearMonths.push(`${y}${m}`);
    }
    for (const yearMonth of yearMonths) {
      console.log(`📅 ${yearMonth} 데이터 수집 중...`);
      // 페이지네이션 처리: 100건(1페이지) 초과 시 다음 페이지 반복 호출
      let pageNo = 1;
      const numOfRows = 100;

      while (true) {
        const apiUrl = new URL(MOLIT_BASE_URL);
        apiUrl.searchParams.append('serviceKey', MOLIT_API_KEY);
        apiUrl.searchParams.append('LAWD_CD', AREA_CODE);
        apiUrl.searchParams.append('DEAL_YMD', yearMonth);
        apiUrl.searchParams.append('numOfRows', numOfRows.toString());
        apiUrl.searchParams.append('pageNo', pageNo.toString());

        try {
          const response = await fetch(apiUrl.toString());
          const xmlText = await response.text();
          const parsed = parser.parse(xmlText);
          const items = parsed?.response?.body?.items?.item;

          // items가 없으면 해당 월의 페이지 루프 종료
          if (!items) {
            break;
          }

          const itemArray = Array.isArray(items) ? items : [items];

          for (const item of itemArray) {
            try {
              const apartment = item.aptNm || '';
              const area = item.excluUseAr || '';
              const floor = item.floor || '';
              const priceStr = item.dealAmount || '';
              const year = item.dealYear || '';
              const month = item.dealMonth || '';
              const day = item.dealDay || '';
              const buildYear = item.buildYear || '';
              const dong = item.umdNm || '';

              if (apartment && priceStr) {
                const price = parsePrice(priceStr);
                const dealDate = formatDealDate(year, month, day);
                const pricePerPyeong = calculatePricePerPyeong(price, area);

                // 송도동 필터 적용
                if (dong === '송도동') {
                  const uniqueId = generateDealId({
                    apartment_name: apartment,
                    area: `${area}㎡`,
                    floor: `${floor}층`,
                    price: formatPrice(price),
                    price_numeric: price,
                    deal_date: dealDate,
                    build_year: buildYear,
                    location: dong,
                    price_per_pyeong: pricePerPyeong,
                  });

                  deals.push({
                    apartment_name: apartment,
                    area: `${area}㎡`,
                    floor: `${floor}층`,
                    price: formatPrice(price),
                    price_numeric: price,
                    deal_date: dealDate,
                    build_year: buildYear,
                    location: dong,
                    price_per_pyeong: pricePerPyeong,
                    unique_id: uniqueId,
                  });
                }
              }
            } catch (parseError) {
              console.error('❌ 개별 데이터 파싱 오류:', parseError);
            }
          }

          // 마지막 페이지 체크: 가져온 레코드 수가 페이지당 요청 수보다 적으면 종료
          if (itemArray.length < numOfRows) {
            break;
          }

          pageNo += 1;
        } catch (pageError) {
          console.error(`❌ ${yearMonth} ${pageNo}페이지 데이터 수집 실패:`, pageError);
          break; // 에러 발생 시 루프 탈출
        }
      }
    }
    // 최신 거래일 순으로 정렬
    deals.sort((a, b) => new Date(b.deal_date).getTime() - new Date(a.deal_date).getTime());
    // 중복 제거 (아파트명+면적+층+거래일 기준)
    const uniqueDeals = deals.filter((deal, idx, arr) =>
      arr.findIndex(d => d.apartment_name === deal.apartment_name && d.area === deal.area && d.floor === deal.floor && d.deal_date === deal.deal_date) === idx
    );
    // 통계 계산
    const totalDeals = uniqueDeals.length;
    const avgPrice = totalDeals > 0 ? Math.round(uniqueDeals.reduce((sum, deal) => sum + deal.price_numeric, 0) / totalDeals) : 0;
    const maxPrice = totalDeals > 0 ? Math.max(...uniqueDeals.map(deal => deal.price_numeric)) : 0;
    const minPrice = totalDeals > 0 ? Math.min(...uniqueDeals.map(deal => deal.price_numeric)) : 0;
    // 아파트별 통계 계산
    interface ApartmentStatMapEntry {
      name: string;
      count: number;
      totalPrice: number;
      deals: ProcessedDeal[];
    }

    const apartmentStatsMap: Record<string, ApartmentStatMapEntry> = {};

    for (const deal of uniqueDeals) {
      const key = deal.apartment_name;
      if (!apartmentStatsMap[key]) {
        apartmentStatsMap[key] = {
          name: key,
          count: 0,
          totalPrice: 0,
          deals: []
        };
      }
      apartmentStatsMap[key].count += 1;
      apartmentStatsMap[key].totalPrice += deal.price_numeric;
      apartmentStatsMap[key].deals.push(deal);
    }

    const apartmentStatsArray = Object.values(apartmentStatsMap).map((entry) => {
      const avgNumeric = Math.round(entry.totalPrice / entry.count);
      return {
        name: entry.name,
        count: entry.count,
        avg_price: formatPrice(avgNumeric),
        avg_price_numeric: avgNumeric,
      };
    }).sort((a, b) => b.avg_price_numeric - a.avg_price_numeric);
    console.log(`✅ 송도동 실거래가 최근 3개월 수집 완료: ${totalDeals}건`);
    
    if (checkNew) {
      // 신규 거래 확인 모드 (이미 로드된 이전 데이터 사용)
      const newDeals = uniqueDeals.filter(deal => 
        deal.unique_id && !previousUniqueIds.has(deal.unique_id)
      );
      
      console.log(`🆕 신규 거래: ${newDeals.length}건 (전체 ${uniqueDeals.length}건 중)`);
      
      // 현재 데이터를 다음 비교를 위해 저장
      await savePreviousData(uniqueDeals);
      
      // 신규 거래를 컴포넌트 형식에 맞게 변환
      const transformedNewDeals = newDeals.map(deal => ({
        unique_id: deal.unique_id || '',
        법정동: deal.location,
        아파트: deal.apartment_name,
        전용면적: deal.area.replace('㎡', ''),
        거래금액: deal.price_numeric.toString(),
        거래년월: deal.deal_date.substring(0, 7).replace('-', ''),
        거래일: deal.deal_date.substring(8, 10),
        층: deal.floor.replace('층', ''),
        deal_date: deal.deal_date
      }));
      
      return NextResponse.json({
        success: true,
        data: transformedNewDeals,
        total_count: newDeals.length,
        is_new_deals: true,
        new_deals_count: newDeals.length
      });
    } else {
      // 전체 거래 조회 모드 - 컴포넌트 형식에 맞게 변환
      const transformedDeals = uniqueDeals.map(deal => ({
        unique_id: deal.unique_id || '',
        법정동: deal.location,
        아파트: deal.apartment_name,
        전용면적: deal.area.replace('㎡', ''),
        거래금액: deal.price_numeric.toString(),
        거래년월: deal.deal_date.substring(0, 7).replace('-', ''),
        거래일: deal.deal_date.substring(8, 10),
        층: deal.floor.replace('층', ''),
        deal_date: deal.deal_date
      }));
      
      return NextResponse.json({
        success: true,
        data: transformedDeals,
        total_count: totalDeals,
        is_new_deals: false
      });
    }
  } catch (error) {
    console.error('❌ 실거래가 API 오류:', error);
    return NextResponse.json({
      success: false,
      error: 'Internal Server Error',
      message: '실거래가 정보를 가져오는데 실패했습니다.'
    }, { status: 500 });
  }
}

// 서버 이전 데이터 파일 관리
const PREVIOUS_DATA_PATH = './public/data/realestate_previous.json';

interface PreviousDataFile {
  deals: ProcessedDeal[];
  timestamp: string;
  total_count: number;
}

// 이전 데이터 읽기
async function loadPreviousData(): Promise<ProcessedDeal[]> {
  try {
    const fs = await import('fs/promises');
    const data = await fs.readFile(PREVIOUS_DATA_PATH, 'utf-8');
    const parsed: PreviousDataFile = JSON.parse(data);
    console.log(`📖 이전 데이터 로드: ${parsed.total_count}건 (${parsed.timestamp})`);
    return parsed.deals || [];
  } catch (error) {
    console.log('📝 이전 데이터 파일이 없어서 새로 생성합니다.');
    return [];
  }
}

// 현재 데이터 저장
async function savePreviousData(deals: ProcessedDeal[]): Promise<void> {
  try {
    const fs = await import('fs/promises');
    const path = await import('path');
    
    // 디렉토리 생성
    const dir = path.dirname(PREVIOUS_DATA_PATH);
    await fs.mkdir(dir, { recursive: true });
    
    const dataToSave: PreviousDataFile = {
      deals,
      timestamp: new Date().toISOString(),
      total_count: deals.length
    };
    
    await fs.writeFile(PREVIOUS_DATA_PATH, JSON.stringify(dataToSave, null, 2));
    console.log(`💾 현재 데이터 저장: ${deals.length}건`);
  } catch (error) {
    console.error('❌ 데이터 저장 실패:', error);
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function POST(_request: NextRequest): Promise<NextResponse> {
  try {
    console.log('🏠 신규 거래 비교 모드 시작 (서버 파일 기준)');
    
    // 1. 이전 데이터 로드
    const previousDeals = await loadPreviousData();
    const previousUniqueIds = new Set(previousDeals.map(deal => deal.unique_id));
    console.log(`📊 이전 데이터: ${previousDeals.length}건`);

    // 2. 현재 데이터 수집 (GET과 동일한 로직)
    const deals: ProcessedDeal[] = [];
    const parser = new XMLParser({ ignoreAttributes: false, trimValues: true });
    const now = new Date();
    
    // 최근 3개월 yearMonth 리스트 생성
    const yearMonths: string[] = [];
    for (let i = 0; i < 3; i++) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const y = d.getFullYear();
      const m = (d.getMonth() + 1).toString().padStart(2, '0');
      yearMonths.push(`${y}${m}`);
    }

    for (const yearMonth of yearMonths) {
      console.log(`📅 ${yearMonth} 데이터 수집 중...`);
      let pageNo = 1;
      const numOfRows = 100;

      while (true) {
        const apiUrl = new URL(MOLIT_BASE_URL);
        apiUrl.searchParams.append('serviceKey', MOLIT_API_KEY);
        apiUrl.searchParams.append('LAWD_CD', AREA_CODE);
        apiUrl.searchParams.append('DEAL_YMD', yearMonth);
        apiUrl.searchParams.append('numOfRows', numOfRows.toString());
        apiUrl.searchParams.append('pageNo', pageNo.toString());

        try {
          const response = await fetch(apiUrl.toString());
          const xmlText = await response.text();
          const parsed = parser.parse(xmlText);
          const items = parsed?.response?.body?.items?.item;

          if (!items) break;

          const itemArray = Array.isArray(items) ? items : [items];

          for (const item of itemArray) {
            try {
              const apartment = item.aptNm || '';
              const area = item.excluUseAr || '';
              const floor = item.floor || '';
              const priceStr = item.dealAmount || '';
              const year = item.dealYear || '';
              const month = item.dealMonth || '';
              const day = item.dealDay || '';
              const buildYear = item.buildYear || '';
              const dong = item.umdNm || '';

              if (apartment && priceStr && dong === '송도동') {
                const price = parsePrice(priceStr);
                const dealDate = formatDealDate(year, month, day);
                const pricePerPyeong = calculatePricePerPyeong(price, area);

                const uniqueId = generateDealId({
                  apartment_name: apartment,
                  area: `${area}㎡`,
                  floor: `${floor}층`,
                  price: formatPrice(price),
                  price_numeric: price,
                  deal_date: dealDate,
                  build_year: buildYear,
                  location: dong,
                  price_per_pyeong: pricePerPyeong,
                });

                deals.push({
                  apartment_name: apartment,
                  area: `${area}㎡`,
                  floor: `${floor}층`,
                  price: formatPrice(price),
                  price_numeric: price,
                  deal_date: dealDate,
                  build_year: buildYear,
                  location: dong,
                  price_per_pyeong: pricePerPyeong,
                  unique_id: uniqueId,
                });
              }
            } catch (parseError) {
              console.error('❌ 개별 데이터 파싱 오류:', parseError);
            }
          }

          if (itemArray.length < numOfRows) break;
          pageNo += 1;
        } catch (pageError) {
          console.error(`❌ ${yearMonth} ${pageNo}페이지 데이터 수집 실패:`, pageError);
          break;
        }
      }
    }

    // 최신 거래일 순으로 정렬
    deals.sort((a, b) => new Date(b.deal_date).getTime() - new Date(a.deal_date).getTime());
    
    // 중복 제거
    const uniqueDeals = deals.filter((deal, idx, arr) =>
      arr.findIndex(d => d.apartment_name === deal.apartment_name && d.area === deal.area && d.floor === deal.floor && d.deal_date === deal.deal_date) === idx
    );

    // 3. 신규 거래 찾기 (이전 데이터에 없는 unique_id)
    const newDeals = uniqueDeals.filter(deal => 
      !previousUniqueIds.has(deal.unique_id)
    );

    console.log(`🆕 시스템 신규 추가 거래: ${newDeals.length}건 (전체 ${uniqueDeals.length}건 중)`);
    
    // 4. 현재 데이터를 다음 비교를 위해 저장
    await savePreviousData(uniqueDeals);

    // 통계 계산
    const totalDeals = uniqueDeals.length;
    const avgPrice = totalDeals > 0 ? Math.round(uniqueDeals.reduce((sum, deal) => sum + deal.price_numeric, 0) / totalDeals) : 0;
    const maxPrice = totalDeals > 0 ? Math.max(...uniqueDeals.map(deal => deal.price_numeric)) : 0;
    const minPrice = totalDeals > 0 ? Math.min(...uniqueDeals.map(deal => deal.price_numeric)) : 0;

    // 아파트별 통계 계산
    interface ApartmentStatMapEntry {
      name: string;
      count: number;
      totalPrice: number;
      deals: ProcessedDeal[];
    }

    const apartmentStatsMap: Record<string, ApartmentStatMapEntry> = {};

    for (const deal of uniqueDeals) {
      const key = deal.apartment_name;
      if (!apartmentStatsMap[key]) {
        apartmentStatsMap[key] = {
          name: key,
          count: 0,
          totalPrice: 0,
          deals: []
        };
      }
      apartmentStatsMap[key].count += 1;
      apartmentStatsMap[key].totalPrice += deal.price_numeric;
      apartmentStatsMap[key].deals.push(deal);
    }

    const apartmentStatsArray = Object.values(apartmentStatsMap).map((entry) => {
      const avgNumeric = Math.round(entry.totalPrice / entry.count);
      return {
        name: entry.name,
        count: entry.count,
        avg_price: formatPrice(avgNumeric),
        avg_price_numeric: avgNumeric,
      };
    }).sort((a, b) => b.avg_price_numeric - a.avg_price_numeric);

    return NextResponse.json({
      success: true,
      data: {
        deals: uniqueDeals,
        new_deals: newDeals, // 신규 거래만
        statistics: {
          total_deals: totalDeals,
          new_deals_count: newDeals.length,
          avg_price: formatPrice(avgPrice),
          max_price: formatPrice(maxPrice),
          min_price: formatPrice(minPrice),
          period: `최근 3개월`
        },
        apartment_stats: apartmentStatsArray,
        comparison_mode: true
      },
      location: '인천 연수구 송도동',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ 신규 거래 비교 API 오류:', error);
    return NextResponse.json({
      success: false,
      error: 'Internal Server Error',
      message: '신규 거래 비교 중 오류가 발생했습니다.'
    }, { status: 500 });
  }
} 