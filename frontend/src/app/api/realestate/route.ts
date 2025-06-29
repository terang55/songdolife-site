import { NextRequest, NextResponse } from 'next/server';
import { XMLParser } from 'fast-xml-parser';

// 국토교통부 실거래가 API 설정
const MOLIT_API_KEY = 'aTgFhrZehAYOxHq4Z3z1iSYeysHfG9Tu43JQhF26U3mdGzr0H8+jR9MzrwPoqr8yOegDO5OO56GmvXzS7rwkdw==';
const MOLIT_BASE_URL = 'https://apis.data.go.kr/1613000/RTMSDataSvcAptTrade/getRTMSDataSvcAptTrade';

// 논현동 지역코드
const NONHYEON_AREA_CODE = '28200'; // 인천 남동구 전체

// 테스트용: 서울 종로구(11110), 2023년 11월로 고정
const TEST_AREA_CODE = '11110'; // 서울 종로구
const TEST_DEAL_YMD = '202311'; // 2023년 11월

const AREA_CODE = '28200'; // 인천 남동구

interface ApartmentDeal {
  아파트: string;
  전용면적: string;
  층: string;
  거래금액: string;
  거래년: string;
  거래월: string;
  거래일: string;
  건축년도: string;
  법정동: string;
  지번: string;
}

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

export async function GET(request: NextRequest) {
  try {
    console.log('🏠 인천 남동구 논현동 아파트 실거래가 최근 6개월 조회 시작');
    const deals: ProcessedDeal[] = [];
    const parser = new XMLParser({ ignoreAttributes: false, trimValues: true });
    const now = new Date();
    // 최근 6개월 yearMonth 리스트 생성
    const yearMonths: string[] = [];
    for (let i = 0; i < 6; i++) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const y = d.getFullYear();
      const m = (d.getMonth() + 1).toString().padStart(2, '0');
      yearMonths.push(`${y}${m}`);
    }
    for (const yearMonth of yearMonths) {
      console.log(`📅 ${yearMonth} 데이터 수집 중...`);
      const apiUrl = new URL(MOLIT_BASE_URL);
      apiUrl.searchParams.append('serviceKey', MOLIT_API_KEY);
      apiUrl.searchParams.append('LAWD_CD', AREA_CODE);
      apiUrl.searchParams.append('DEAL_YMD', yearMonth);
      apiUrl.searchParams.append('numOfRows', '100');
      apiUrl.searchParams.append('pageNo', '1');
      try {
        const response = await fetch(apiUrl.toString());
        const xmlText = await response.text();
        const parsed = parser.parse(xmlText);
        const items = parsed?.response?.body?.items?.item;
        if (items) {
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
              const jibun = item.jibun || '';
              if (apartment && priceStr) {
                const price = parsePrice(priceStr);
                const dealDate = formatDealDate(year, month, day);
                const pricePerPyeong = calculatePricePerPyeong(price, area);
                if (dong === '논현동') {
                  deals.push({
                    apartment_name: apartment,
                    area: `${area}㎡`,
                    floor: `${floor}층`,
                    price: formatPrice(price),
                    price_numeric: price,
                    deal_date: dealDate,
                    build_year: buildYear,
                    location: dong,
                    price_per_pyeong: pricePerPyeong
                  });
                }
              }
            } catch (parseError) {
              console.error('❌ 개별 데이터 파싱 오류:', parseError);
            }
          }
        }
      } catch (monthError) {
        console.error(`❌ ${yearMonth} 데이터 수집 실패:`, monthError);
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
    // 아파트별 통계
    const apartmentStats = uniqueDeals.reduce((acc: any, deal) => {
      if (!acc[deal.apartment_name]) {
        acc[deal.apartment_name] = {
          name: deal.apartment_name,
          count: 0,
          avg_price: 0,
          deals: []
        };
      }
      acc[deal.apartment_name].count++;
      acc[deal.apartment_name].deals.push(deal);
      return acc;
    }, {});
    // 아파트별 평균가 계산
    Object.values(apartmentStats).forEach((stat: any) => {
      const avgPrice = Math.round(stat.deals.reduce((sum: number, deal: ProcessedDeal) => sum + deal.price_numeric, 0) / stat.count);
      stat.avg_price = formatPrice(avgPrice);
      stat.avg_price_numeric = avgPrice;
    });
    // 아파트별 통계를 배열로 변환하고 평균가 순으로 정렬
    const apartmentStatsArray = Object.values(apartmentStats).sort((a: any, b: any) => b.avg_price_numeric - a.avg_price_numeric);
    console.log(`✅ 논현동 실거래가 최근 6개월 수집 완료: ${totalDeals}건`);
    return NextResponse.json({
      success: true,
      data: {
        deals: uniqueDeals.slice(0, 50), // 최신 50건만 반환
        statistics: {
          total_deals: totalDeals,
          avg_price: formatPrice(avgPrice),
          max_price: formatPrice(maxPrice),
          min_price: formatPrice(minPrice),
          period: `최근 6개월`
        },
        apartment_stats: apartmentStatsArray
      },
      location: '인천 남동구 논현동',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('❌ 실거래가 API 오류:', error);
    return NextResponse.json({
      success: false,
      error: 'Internal Server Error',
      message: '실거래가 정보를 가져오는데 실패했습니다.'
    }, { status: 500 });
  }
} 