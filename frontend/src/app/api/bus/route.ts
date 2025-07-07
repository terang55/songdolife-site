import { NextResponse } from 'next/server';

// 인천광역시 버스위치정보 조회서비스 API
const API_KEY = 'aTgFhrZehAYOxHq4Z3z1iSYeysHfG9Tu43JQhF26U3mdGzr0H8%2BjR9MzrwPoqr8yOegDO5OO56GmvXzS7rwkdw%3D%3D';

// ------------------ 타입 정의 ------------------
interface IncheonBusLocation {
  ROUTEID: string;          // 노선 ID
  BUSID: string;            // 차량 고유 식별자
  BUS_NUM_PLATE: string;    // 차량 번호판
  LOW_TP_CD: string;        // 저상버스 여부 (0:일반, 1:저상)
  DIRCD: string;            // 진행방향코드 (0:상행, 1:하행, 2:순환)
  PATHSEQ: string;          // 현재 위치 노드 순번
  LATEST_STOPSEQ: string;   // 현재 위치 정류소 순번
  LATEST_STOP_ID: string;   // 현재 위치 정류소 ID
  LATEST_STOP_NAME: string; // 현재 위치정류소 명
  REMAIND_SEAT: string;     // 차량 내 빈자리 (255:사용안함)
  CONGESTION: string;       // 혼잡도 (1:여유, 2:보통, 3:혼잡, 255:사용안함)
  LASTBUSYN: string;        // 막차코드 (0:일반, 1:막차)
}

interface BusArrival {
  routeId: string;
  stationName: string;
  direction: string;
  remainingStops: number;
  lowFloor: boolean;
  congestion: string;
  towards: string;
  updatedAt: string;
}

// ------------------ 유틸리티 함수 ------------------
function parseXMLResponse<T>(xmlText: string, itemName: string): T[] {
  const regex = new RegExp(`<${itemName}>(.*?)</${itemName}>`, 'gs');
  const items: T[] = [];
  let match;
  
  while ((match = regex.exec(xmlText)) !== null) {
    const itemXml = match[1];
    const item = {} as T;
    
    // 각 필드 파싱
    const fieldRegex = /<(\w+)>(.*?)<\/\1>/g;
    let fieldMatch;
    
    while ((fieldMatch = fieldRegex.exec(itemXml)) !== null) {
      const [, fieldName, fieldValue] = fieldMatch;
      (item as Record<string, string>)[fieldName] = fieldValue.trim();
    }
    
    items.push(item);
  }
  
  return items;
}

// ------------------ API 호출 함수 ------------------
async function fetchIncheonBusLocations(routeId: string): Promise<IncheonBusLocation[]> {
  // 🔧 URL 수동 구성 (fetch에서 자동 인코딩 방지)
  const baseUrl = 'https://apis.data.go.kr/6280000/busLocationService/getBusRouteLocation';
  const params = `serviceKey=${API_KEY}&pageNo=1&numOfRows=50&routeid=${routeId}`;
  const url = `${baseUrl}?${params}`;
  
  try {
    console.log('🚌 인천 버스 API 호출:', url.replace(API_KEY, 'API_KEY_HIDDEN'));
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': '*/*',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    
    if (!response.ok) {
      console.error('❌ 인천 API 응답 오류:', response.status, response.statusText);
      return [];
    }
    
    const xmlText = await response.text();
    console.log('📄 인천 API 원본 XML:', xmlText.substring(0, 500) + '...');
    
    // 공공데이터포털 에러 응답 체크
    if (xmlText.includes('SERVICE_KEY_IS_NOT_REGISTERED_ERROR')) {
      console.error('🚨 API 키 에러: 공공데이터포털에서 인천 버스 API 활용신청 필요');
      return [];
    }
    
    if (xmlText.includes('<returnReasonCode>')) {
      const errorMatch = xmlText.match(/<errMsg>(.*?)<\/errMsg>/);
      const reasonMatch = xmlText.match(/<returnAuthMsg>(.*?)<\/returnAuthMsg>/);
      const codeMatch = xmlText.match(/<returnReasonCode>(\d+)<\/returnReasonCode>/);
      console.error('🚨 API 에러:', `[${codeMatch?.[1]}] ${reasonMatch?.[1]} - ${errorMatch?.[1]}`);
      
      // 🔍 추가 디버깅: 실제 요청 URL과 브라우저 URL 비교
      console.error('🔍 디버깅 정보:');
      console.error('- 브라우저 성공 URL: https://apis.data.go.kr/6280000/busLocationService/getBusRouteLocation?serviceKey=aTgFhrZehAYOxHq4Z3z1iSYeysHfG9Tu43JQhF26U3mdGzr0H8%2BjR9MzrwPoqr8yOegDO5OO56GmvXzS7rwkdw%3D%3D&numOfRows=10&pageNo=1&routeid=165000215');
      console.error('- 현재 요청 URL:', url);
      
      return [];
    }
    
    // 정상 응답에서 오류 응답 체크
    if (xmlText.includes('<resultCode>')) {
      const resultCodeMatch = xmlText.match(/<resultCode>(\d+)<\/resultCode>/);
      const resultMsgMatch = xmlText.match(/<resultMsg>(.*?)<\/resultMsg>/);
      
      if (resultCodeMatch && resultCodeMatch[1] !== '0') {
        console.error('❌ 인천 API 오류:', resultCodeMatch[1], resultMsgMatch?.[1]);
        return [];
      }
    }
    
    const locations = parseXMLResponse<IncheonBusLocation>(xmlText, 'itemList');
    console.log(`🚌 인천 API에서 ${locations.length}대 버스 정보 수신`);
    
    // 🔍 좌석/혼잡도 정보 디버깅
    locations.forEach((loc, index) => {
      console.log(`🪑 버스 ${index + 1} 상세정보:`, {
        plateNo: loc.BUS_NUM_PLATE,
        stationName: loc.LATEST_STOP_NAME,
        remaindSeat: loc.REMAIND_SEAT,
        congestion: loc.CONGESTION,
        direction: loc.DIRCD === '0' ? '상행' : loc.DIRCD === '1' ? '하행' : '순환',
        lowFloor: loc.LOW_TP_CD === '1'
      });
    });
    
    return locations;
    
  } catch (error) {
    console.error('❌ 인천 버스 API 호출 실패:', error);
    return [];
  }
}

// M6405의 인천 API 노선 ID를 찾는 함수
function getIncheonRouteId(routeId: string): string {
  // M6405의 인천 시스템 내 실제 노선 ID (확인됨)
  if (routeId === 'M6405') {
    return '165000215'; // ✅ 실제 확인된 노선 ID
  }
  return routeId;
}

// ------------------ 메인 비즈니스 로직 ------------------
async function buildArrivalObjects(): Promise<BusArrival[]> {
  try {
    const incheonRouteId = getIncheonRouteId('M6405');
    const locations = await fetchIncheonBusLocations(incheonRouteId);
    
    if (locations.length === 0) {
      console.log('⚠️ 인천 API에서 버스 위치 정보 없음');
      return [];
    }
    
    const arrivals: BusArrival[] = locations.map((loc) => {
      // 좌석 정보 처리
      let seatInfo = '';
      if (loc.REMAIND_SEAT && loc.REMAIND_SEAT !== '255') {
        const seatCount = parseInt(loc.REMAIND_SEAT);
        if (seatCount > 0) {
          seatInfo = `좌석 ${seatCount}석`;
        } else {
          seatInfo = '만석';
        }
      } else {
        seatInfo = '좌석정보없음';
      }
      
      // 혼잡도 정보 처리
      let congestionInfo = '';
      if (loc.CONGESTION && loc.CONGESTION !== '255') {
        switch (loc.CONGESTION) {
          case '1': congestionInfo = '여유'; break;
          case '2': congestionInfo = '보통'; break;
          case '3': congestionInfo = '혼잡'; break;
          default: congestionInfo = '-';
        }
      } else {
        congestionInfo = '-';
      }
      
      // 방향 정보
      const towards = loc.DIRCD === '0' ? '강남행' : '인천행';
      
      // direction 필드에 좌석과 혼잡도 정보 결합
      const direction = seatInfo + (congestionInfo !== '-' ? ` • ${congestionInfo}` : '');
      
      // 남은 정류소 수 계산 (임시값, 실제로는 정류소 순번 기반 계산)
      const remainingStops = Math.max(1, parseInt(loc.LATEST_STOPSEQ) || 1);
      
      return {
        routeId: 'M6405',
        stationName: `${loc.LATEST_STOP_NAME} (${loc.BUS_NUM_PLATE})`,
        direction,
        remainingStops,
        lowFloor: loc.LOW_TP_CD === '1',
        congestion: congestionInfo,
        towards,
        updatedAt: new Date().toISOString()
      };
    });
    
    // 방향별로 정렬 (상행 먼저, 하행 나중)
    arrivals.sort((a, b) => {
      if (a.towards !== b.towards) {
        return a.towards === '강남행' ? -1 : 1;
      }
      return a.remainingStops - b.remainingStops;
    });
    
    console.log(`✅ ${arrivals.length}개 버스 도착 정보 생성 완료`);
    return arrivals;
    
  } catch (error) {
    console.error('❌ buildArrivalObjects 오류:', error);
    return [];
  }
}

// ------------------ Next.js Route ------------------
export async function GET() {
  const data = await buildArrivalObjects();
  const now = new Date();
  
  // 🔍 좌석 정보 디버깅용 추가 정보
  const debugInfo = {
    totalBuses: data.length,
    busesWithSeats: data.filter(b => b.direction.includes('좌석') && !b.direction.includes('정보없음')).length,
    busesWithoutSeats: data.filter(b => b.direction.includes('정보없음')).length,
    seatData: data.map(bus => ({
      routeId: bus.routeId,
      plateNo: bus.stationName.match(/\(([^)]+)\)$/)?.[1] || 'Unknown',
      direction: bus.direction,
      towards: bus.towards,
      remainingStops: bus.remainingStops,
      seatInfo: bus.direction.match(/좌석\s*(\d+|정보없음|만석)/)?.[1] || 'Not Found',
      congestion: bus.congestion
    }))
  };
  
  // API 상태 정보
  const apiStatus = {
    current: '인천광역시 버스위치정보 조회서비스',
    provider: '인천광역시',
    endpoint: '/getBusRouteLocation',
    features: ['실시간 위치', '좌석 정보', '혼잡도', '저상버스 여부'],
    seatDataAvailable: data.some(b => b.direction.includes('좌석') && !b.direction.includes('정보없음')),
    congestionDataAvailable: data.some(b => b.congestion !== '-'),
    lastApiCall: now.toISOString(),
    routeId: 'M6405 (인천 시스템 ID: 165000215)'
  };
  
  return NextResponse.json({
    success: true,
    data: data,
    lastUpdate: new Date().toISOString(),
    realAPI: data.length > 0
  }, {
    headers: {
      'Cache-Control': 'public, max-age=60, s-maxage=60', // 실시간 정보라서 1분만 캐시
      'CDN-Cache-Control': 'public, max-age=60'
    }
  });
} 