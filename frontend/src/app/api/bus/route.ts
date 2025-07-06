import { NextResponse } from 'next/server';
import stationsData from './Station.json';

// -------------------- 타입 정의 --------------------

interface StationInfo {
  HIST_ID: string;
  ROUTE_ID: string;
  STATION_ID: string;
  ROUTE_NM: string;
  STATION_NM: string;
}

interface GBISLocationItem {
  stationId: string;
  stationName: string;
  stationSeq: string; // 정류소 순번 (1부터)
  remainSeatCnt: string; // 남은좌석
  plateNo: string;
  lowPlateYn: string; // 저상버스 여부 (Y/N)
  upFirstTime?: string; // 시작시간
  upLastTime?: string;
  downFirstTime?: string;
  downLastTime?: string;
  sectionSpeed?: string; // 구간속도
  fullSectDist?: string; // 전체구간거리 (km)
  fullSectTime?: string; // 전체구간소요시간 (min)
  nextStationId?: string;
  nextStationName?: string;
  crowded?: string; // 혼잡도
  lowPlate?: string; // 저상버스 여부 (Y/N)
}

interface BusArrival {
  routeId: string; // 'M6410'
  stationName: string;
  direction: string; // 다음 정류장 안내 문구
  remainingStops: number; // 현재 정류장 순번 (1~)
  lowFloor: boolean;
  congestion: string; // GBIS는 혼잡도 미제공 → '-'
  towards: '강남행' | '인천행'; // 진행 방향
  updatedAt: string;
}

// ------------------ 설정 ------------------

// GBIS v2 엔드포인트 (경기도 공공데이터포털)
const GBIS_BASE = 'https://apis.data.go.kr/6410000';
// 임시 하드코딩 (검증용)
const SERVICE_KEY = 'aTgFhrZehAYOxHq4Z3z1iSYeysHfG9Tu43JQhF26U3mdGzr0H8%2BjR9MzrwPoqr8yOegDO5OO56GmvXzS7rwkdw%3D%3D';
const ROUTE_NAME = 'M6410';
const ROUTE_ID = '216000044'; // 고정된 노선 ID

// 논현동 주요 정류소 상수는 현재 사용되지 않아 제거 → 송도동에 맞추어 업데이트 예정

// ------------------ 유틸 ------------------
// safeText 함수는 현재 사용되지 않아 제거

function parseList<T = Record<string, string>>(xml: string, tag: string): T[] {
  const out: T[] = [];
  const regex = new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`, 'g');
  let m;
  while ((m = regex.exec(xml)) !== null) {
    const raw = m[1];
    const obj: Record<string, string> = {};
    raw.replace(/<([^\/][^>]*)>([\s\S]*?)<\/\1>/g, (_s, k: string, v: string) => {
      obj[k] = v.trim();
      return '';
    });
    out.push(obj as unknown as T);
  }
  return out;
}

// ------------------ API ------------------

// getRouteIdByName 함수는 현재 사용되지 않아 제거

async function fetchLocations(routeId: string): Promise<GBISLocationItem[]> {
  const url = `${GBIS_BASE}/buslocationservice/v2/getBusLocationListv2?serviceKey=${SERVICE_KEY}&routeId=${routeId}&format=xml`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      return [];
    }
    
    const xmlText = await response.text();
    console.log('📄 전체 XML 응답:', xmlText);
    const locations = parseList<GBISLocationItem>(xmlText, 'busLocationList');
    console.log('🚌 첫 번째 위치 데이터 전체 필드:', JSON.stringify(locations[0], null, 2));
    return locations;
  } catch (error) {
    console.error('❌ 위치 조회 에러', error);
    return [];
  }
}

// fetchArrival 함수는 현재 사용되지 않아 제거

// 노선 정류장 목록 캐시
let routeStationsCache: Array<{ stationId: string; stationName: string; stationSeq: number }> = [];

// 노선별 전체 정류장 목록 조회
async function fetchRouteStations(routeId: string): Promise<Array<{ stationId: string; stationName: string; stationSeq: number }>> {
  if (routeStationsCache.length > 0) {
    console.log(`📋 노선 정류장 캐시 사용: ${routeStationsCache.length}개 정류장`);
    return routeStationsCache;
  }

  console.log(`🔍 노선 정류장 목록 조회 시작: ${routeId}`);
  
  try {
    const url = `${GBIS_BASE}/busroutestation/v2/getBusRouteStationListv2?serviceKey=${SERVICE_KEY}&routeId=${routeId}&format=xml`;
    console.log(`📡 노선 정류장 API 호출: ${url}`);
    
    const response = await fetch(url);
    console.log(`📡 노선 정류장 API 응답 상태: ${response.status}`);
    
    if (!response.ok) {
      console.log(`❌ API 응답 실패: ${response.status}`);
      return [];
    }
    
    const xmlText = await response.text();
    console.log(`📄 노선 정류장 XML 응답 (처음 800자): ${xmlText.substring(0, 800)}`);
    
    const stationList = parseList<GBISRouteStationItem>(xmlText, 'busRouteStationList');
    console.log(`🔍 파싱된 정류장 수: ${stationList.length}`);
    
    if (stationList.length > 0) {
      console.log(`🚏 첫 번째 정류장 데이터:`, JSON.stringify(stationList[0], null, 2));
      
      routeStationsCache = stationList.map(station => ({
        stationId: station.stationId || '',
        stationName: station.stationName || '',
        stationSeq: Number(station.stationSeq) || 0
      }));
      
      console.log(`✅ 노선 정류장 목록 로딩 완료: ${routeStationsCache.length}개`);
      console.log(`🚏 처음 10개 정류장:`, routeStationsCache.slice(0, 10).map(s => `${s.stationSeq}. ${s.stationName}`));
      
      return routeStationsCache;
    } else {
      console.log(`⚠️ 정류장 목록이 비어있음`);
    }
    
  } catch (error) {
    console.error(`❌ 노선 정류장 조회 에러:`, error);
  }
  
  console.log(`❌ 노선 정류장 목록 로딩 실패`);
  return [];
}

// 노선 정류장 XML 아이템 타입
interface GBISRouteStationItem {
  stationId: string;
  stationName: string;
  stationSeq: string; // 문자열로 전달됨
}

// 정류장 상세 XML 아이템 타입
interface GBISBusStationInfoItem {
  stationName: string;
}

// 정류장 정보 조회 - GBIS busStationInfov2 API 사용
async function getStationInfo(stationId: string): Promise<{ stationName: string }> {
  console.log(`🔍 정류장 조회: ${stationId}`);
  
  // 1. 먼저 로컬 Station.json에서 찾아보기
  const stations = stationsData as StationInfo[];
  const foundStation = stations.find(station => station.STATION_ID === stationId);
  
  if (foundStation) {
    console.log(`🚏 정류장 발견 (로컬): ${foundStation.STATION_NM}`);
    return { stationName: foundStation.STATION_NM };
  }
  
  // 2. GBIS busStationInfov2 API 호출
  try {
    const url = `${GBIS_BASE}/busstationservice/v2/busStationInfov2?serviceKey=${SERVICE_KEY}&stationId=${stationId}&format=xml`;
    console.log(`📡 GBIS 정류장 정보 API 호출: ${url}`);
    
    const response = await fetch(url);
    if (!response.ok) {
      console.log(`❌ API 응답 실패: ${response.status}`);
      return { stationName: `정류장${stationId.slice(-3)}` };
    }
    
    const xmlText = await response.text();
    console.log(`📄 정류장 XML 응답 (처음 300자): ${xmlText.substring(0, 300)}`);
    
    // busStationInfo 태그에서 정류장명 추출
    const stationInfoList = parseList<GBISBusStationInfoItem>(xmlText, 'busStationInfo');
    
    if (stationInfoList.length > 0) {
      const stationName = stationInfoList[0].stationName || `정류장${stationId.slice(-3)}`;
      console.log(`🚏 정류장 발견 (API): ${stationName}`);
      return { stationName };
    }
    
  } catch (error) {
    console.error(`❌ 정류장 조회 에러 (${stationId}):`, error);
  }
  
  // 3. 모든 방법 실패시 기본값
  console.log(`❌ 정류장 정보 없음: ${stationId}`);
  return { stationName: `정류장${stationId.slice(-3)}` }; // 뒤 3자리만 표시
}

async function buildArrivalObjects(): Promise<BusArrival[]> {
  try {
    const routeId = ROUTE_ID;

    // 노선 정류장 목록 먼저 로딩
    const routeStations = await fetchRouteStations(routeId);
    
    // 실시간 위치
    const locations = await fetchLocations(routeId);

    // 위치 데이터를 BusArrival 형태로 변환 (정류장명 포함)
    const arrivals: BusArrival[] = await Promise.all(locations.map(async (loc) => {
      const crowdedLevel = Number(loc.crowded || '1');
      let congestionText = '-';
      if (crowdedLevel === 1) congestionText = '여유';
      else if (crowdedLevel === 2) congestionText = '보통';  
      else if (crowdedLevel === 3) congestionText = '혼잡';

      // 정류장 정보 조회
      const stationInfo = await getStationInfo(loc.stationId);
      const stationNameResolved = stationInfo?.stationName || `정류장${loc.stationSeq}`;

      // 다음 정류장 정보 계산
      const currentSeq = Number(loc.stationSeq) || 0;
      let directionText = `좌석 ${loc.remainSeatCnt}석`;
      
      if (routeStations.length > 0) {
        const nextStations = routeStations.filter(s => s.stationSeq > currentSeq).slice(0, 2);
        
        if (nextStations.length > 0) {
          const nextStation = nextStations[0];
          const remainingCount = nextStation.stationSeq - currentSeq;
          directionText = `다음: ${nextStation.stationName} (${remainingCount}개 정류장) • 좌석 ${loc.remainSeatCnt}석`;
        } else {
          // 종점에 가까운 경우
          directionText = `종점 근처 • 좌석 ${loc.remainSeatCnt}석`;
        }
      } else {
        // 노선 정보 로딩 실패시 기본 표시
        console.log(`⚠️ 노선 정보 없음 - 기본 표시 사용`);
        
        directionText = `좌석 ${loc.remainSeatCnt}석`;
      }

      const towards: '강남행' | '인천행' = currentSeq <= 26 ? '강남행' : '인천행';

      return {
        routeId: ROUTE_NAME,
        stationName: `${stationNameResolved} (${loc.plateNo})`,
        direction: directionText,
        remainingStops: currentSeq,
        lowFloor: (loc.lowPlate || '0') === '1',
        congestion: congestionText,
        towards,
        updatedAt: new Date().toISOString(),
      };
    }));

    return arrivals;
  } catch (err) {
    console.error('GBIS fetch error', err);
    return [];
  }
}

// ------------------ Next.js Route ------------------
export async function GET() {
  const data = await buildArrivalObjects();
  const now = new Date();
  return NextResponse.json({
    success: true,
    data,
    note: data.length ? '실시간(G-BIS)' : '데이터 없음',
    lastUpdate: now.toISOString(),
    dataSource: data.length ? 'gbis_api' : 'none',
  });
} 