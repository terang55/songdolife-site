import { NextResponse } from 'next/server';

// -------------------- 타입 정의 --------------------
interface GBISRouteItem {
  routeId: string;
  routeName: string;
  regionName: string;
  routeTypeCd: string;
  routeTypeName: string;
  startStationName: string;
  endStationName: string;
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
}

interface GBISArrivalItem {
  stationId: string;
  stationName: string;
  routeId: string;
  locationNo1: string; // 첫번째 차량 남은정류장 수
  predictTime1: string; // 첫번째 차량 도착예상 시간(분)
  plateNo1: string;
  lowPlateYn1: string;
  locationNo2: string;
  predictTime2: string;
  plateNo2: string;
  lowPlateYn2: string;
}

interface BusArrival {
  routeId: string; // 'M6410'
  stationName: string;
  direction: string; // 종점 방향명 표시
  remainingStops: number; // 남은 정류장 수
  lowFloor: boolean;
  congestion: string; // GBIS는 혼잡도 미제공 → '-'
  updatedAt: string;
}

// ------------------ 설정 ------------------

// GBIS v2 엔드포인트 (경기도 공공데이터포털)
const GBIS_BASE = 'https://apis.data.go.kr/6410000';
// TODO: 환경 변수를 사용하세요. (Vercel: process.env.GBIS_SERVICE_KEY)
const SERVICE_KEY = process.env.GBIS_SERVICE_KEY || 'YOUR_GBIS_SERVICE_KEY';
const ROUTE_NAME = 'M6410';
const ROUTE_ID = '216000044'; // 고정된 노선 ID

// 논현동 주요 정류소 (경기도 관할) - 사리울중, 소래포구역 등
// ※ 실제 stationId 는 GBIS 정류소 조회 서비스에서 확인 필요
const TARGET_STATIONS: { id: string; name: string; direction: string }[] = [
  { id: '228000555', name: '사리울중학교', direction: '강남역' },
  { id: '228000231', name: '소래포구역', direction: '강남역' },
];

// ------------------ 유틸 ------------------
function safeText(elem: string | undefined): string {
  return (elem || '').trim();
}

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

async function getRouteIdByName(routeName: string): Promise<string | null> {
  const url = `${GBIS_BASE}/busrouteservice?serviceKey=${SERVICE_KEY}&keyword=${routeName}`;
  const res = await fetch(url, { headers: { Accept: 'application/xml' } });
  const text = await res.text();
  const items = parseList<GBISRouteItem>(text, 'busRouteList');
  return items.length ? items[0].routeId : null;
}

async function fetchLocations(routeId: string): Promise<GBISLocationItem[]> {
  const url = `${GBIS_BASE}/buslocationservice/v2/getBusLocationList?serviceKey=${SERVICE_KEY}&routeId=${routeId}&format=xml`;
  const res = await fetch(url, { headers: { Accept: 'application/xml' } });
  const text = await res.text();
  return parseList<GBISLocationItem>(text, 'busLocationList');
}

async function fetchArrival(stationId: string, routeId: string): Promise<GBISArrivalItem | null> {
  const url = `${GBIS_BASE}/busarrivalservice/v2/getBusArrivalList?serviceKey=${SERVICE_KEY}&stationId=${stationId}&routeId=${routeId}&format=xml`;
  const res = await fetch(url, { headers: { Accept: 'application/xml' } });
  const text = await res.text();
  const items = parseList<GBISArrivalItem>(text, 'busArrivalList');
  return items.length ? items[0] : null;
}

async function buildArrivalObjects(): Promise<BusArrival[]> {
  try {
    const routeId = ROUTE_ID;

    // 실시간 위치 (혼잡도는 GBIS 미제공)
    const locations = await fetchLocations(routeId);

    // 3) 주요 정류소 도착정보
    const arrivalPromises = TARGET_STATIONS.map(async (st) => {
      const arr = await fetchArrival(st.id, routeId);
      if (!arr) return null;
      return {
        routeId: ROUTE_NAME,
        stationName: st.name,
        direction: st.direction,
        remainingStops: Number(safeText(arr.locationNo1)) || 0,
        lowFloor: safeText(arr.lowPlateYn1).toUpperCase() === 'Y',
        congestion: '-',
        updatedAt: new Date().toISOString(),
      } as BusArrival;
    });

    const arrivals = (await Promise.all(arrivalPromises)).filter(Boolean) as BusArrival[];

    // 4) 추가: 차량 위치로부터 현재 정차 정류장명 추출 (stations이 필요). 생략.

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