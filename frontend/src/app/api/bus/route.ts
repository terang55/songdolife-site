import { NextRequest, NextResponse } from 'next/server';

interface BusLocationItem {
  BUSID: string;
  BUS_NUM_PLATE: string;
  CONGESTION: string;
  DIRCD: string;
  LASTBUSYN: string;
  LATEST_STOPSEQ: string;
  LATEST_STOP_ID: string;
  LATEST_STOP_NAME: string;
  LOW_TP_CD: string;
  PATHSEQ: string;
  REMAIND_SEAT: string;
  ROUTEID: string;
}

interface BusArrival {
  routeId: string; // 'M6410'
  stationName: string;
  direction: string; // 강남역 / 서울역
  remainingStops: number;
  lowFloor: boolean;
  congestion: string;
  updatedAt: string;
}

const SERVICE_KEY = 'aTgFhrZehAYOxHq4Z3z1iSYeysHfG9Tu43JQhF26U3mdGzr0H8%2BjR9MzrwPoqr8yOegDO5OO56GmvXzS7rwkdw%3D%3D';
const ROUTE_ID = '216000044'; // M6410


function parseXML(xml: string): BusLocationItem[] {
  const list: BusLocationItem[] = [];
  const blockRegex = /<itemList>([\s\S]*?)<\/itemList>/g;
  let m;
  while ((m = blockRegex.exec(xml)) !== null) {
    const raw = m[1];
    const obj: any = {};
    raw.replace(/<([^/][^>]*)>([\s\S]*?)<\/\1>/g, (_s, tag: string, val: string) => {
      obj[tag] = val.trim();
      return '';
    });
    list.push(obj as BusLocationItem);
  }
  return list;
}

async function fetchM6410(): Promise<BusArrival[]> {
  try {
    // 쿼리 문자열 직접 조립 (브라우저에서 정상 동작하는 방식)
    const url = `http://apis.data.go.kr/6280000/busLocationService/getBusRouteLocation?serviceKey=${SERVICE_KEY}&numOfRows=2&pageNo=1&routeid=${ROUTE_ID}`;
    console.log('M6410 request URL:', url);

    const res = await fetch(url, { headers: { Accept: 'application/xml' } });
    const xml = await res.text();
    console.log('M6410 raw XML slice:', xml.substring(0, 200));

    const codeMatch = xml.match(/<resultCode>(\d+)<\/resultCode>/);
    if (codeMatch && codeMatch[1] !== '0') {
      console.warn('M6410 API resultCode:', codeMatch[1]);
      return [];
    }

    const parsed = parseXML(xml);
    return parsed.map((p) => ({
      routeId: 'M6410',
      stationName: p.LATEST_STOP_NAME,
      direction: p.DIRCD === '0' ? '강남역' : '서울역',
      remainingStops: Number(p.PATHSEQ) || 0,
      lowFloor: p.LOW_TP_CD === '1',
      congestion: p.CONGESTION,
      updatedAt: new Date().toISOString(),
    }));
  } catch (err) {
    console.error('M6410 API error', err);
    return [];
  }
}

export async function GET(_req: NextRequest) {
  const now = new Date();
  const data = await fetchM6410();
  return NextResponse.json({
    success: true,
    data,
    note: data.length ? '실시간' : '데이터 없음',
    lastUpdate: now.toISOString(),
    dataSource: data.length ? 'incheon_api' : 'none',
  });
} 