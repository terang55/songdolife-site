import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import iconv from 'iconv-lite';

// 요일·방향별 CSV 파일 명 매핑
const FILE_MAP = {
  weekday: {
    up: '인천교통공사_1호선 평일상선 열차운행시각표_20250412.csv',
    down: '인천교통공사_1호선 평일하선 열차운행시각표_20250412.csv'
  },
  holiday: {
    up: '인천교통공사_1호선 휴일상선 열차운행시각표_20250412.csv',
    down: '인천교통공사_1호선 휴일하선 열차운행시각표_20250412.csv'
  }
} as const;

type DayType = keyof typeof FILE_MAP;
type Direction = keyof typeof FILE_MAP['weekday'];

// 헤더 기준 컬럼 인덱스 (시발역, 종착역, 열차번호 이후)
const STATION_INDEX_MAP: Record<string, number> = {
  '송도달빛축제공원역': 3,
  '국제업무지구역': 4,
  '센트럴파크역': 5,
  '인천대입구역': 6,
  '지식정보단지역': 7,
  '테크노파크역': 8,
  '캠퍼스타운역': 9
};

interface CacheEntry {
  ts: number;
  rows: string[][];
}

const cache: Partial<Record<string, CacheEntry>> = {};

function loadCsv(dayType: DayType, direction: Direction): string[][] {
  // 캐시 키 생성
  const cacheKey = `${dayType}_${direction}`;
  const now = Date.now();
  
  // 캐시 확인 (5분 유효)
  if (cache[cacheKey] && now - cache[cacheKey]!.ts < 5 * 60 * 1000) {
    return cache[cacheKey]!.rows;
  }

  const fileName = FILE_MAP[dayType][direction];
  console.log('🔍 찾는 파일:', fileName);
  console.log('🔍 현재 작업 디렉토리:', process.cwd());
  
  // 여러 경로 시도
  const possiblePaths = [
    path.join(process.cwd(), 'public', fileName),         // public 폴더 (Next.js 권장)
    path.join(process.cwd(), fileName),                    // 현재 디렉토리 (Vercel 배포시)
    path.join(process.cwd(), '..', fileName),             // 상위 디렉토리 (로컬 개발시)
    path.join(process.cwd(), '..', '..', fileName),       // 2단계 상위
  ];
  
  for (const filePath of possiblePaths) {
    try {
      console.log('🔄 시도하는 경로:', filePath);
      
      if (fs.existsSync(filePath)) {
        const buffer = fs.readFileSync(filePath);
        const decoded = iconv.decode(buffer, 'cp949');

        const rows = decoded
          .split('\n')
          .map(line => line.trim())
          .filter(line => line.length > 0)
          .map(line => line.split(',').map(cell => cell.trim()));

        // 캐시 저장
        cache[cacheKey] = { ts: now, rows };
        console.log(`✅ CSV 로드 성공: ${fileName} (${rows.length}행) - 경로: ${filePath}`);
        return rows;
      } else {
        console.log(`❌ 파일 없음: ${filePath}`);
      }
    } catch (error) {
      console.log(`❌ 경로 시도 실패: ${filePath}`, error);
    }
  }
  
  console.error(`❌ 모든 경로에서 파일을 찾을 수 없음: ${fileName}`);
  return [];
}

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;

  const station = params.get('station') ?? '인천대입구역';
  const dayType = (params.get('dayType') as DayType) ?? 'weekday';
  const direction = (params.get('direction') as Direction) ?? 'up';

  if (!STATION_INDEX_MAP[station]) {
    return NextResponse.json({ success: false, error: '지원하지 않는 역' }, { status: 400 });
  }

  const csv = loadCsv(dayType, direction);
  const idx = STATION_INDEX_MAP[station];
  const times: string[] = [];

  console.log(`📊 CSV 로드 완료: ${csv.length}행, 역 인덱스: ${idx}`);
  if (csv.length > 0) {
    console.log(`📋 CSV 헤더:`, csv[0]);
    console.log(`📍 ${station} 컬럼 내용 (처음 5개):`, csv.slice(1, 6).map(row => row[idx]));
  }

  // 헤더를 제외하고 해당 열의 시각 수집
  for (let i = 1; i < csv.length; i++) {
    const t = csv[i][idx];
    if (t && t.trim()) times.push(t.trim());
  }

  console.log(`⏰ 추출된 시간표: ${times.length}개`);
  console.log(`🔍 처음 5개 시간:`, times.slice(0, 5));

  return NextResponse.json({
    success: true,
    schedule: times,
    station: station,
    direction,
    dayType,
    timestamp: new Date().toISOString()
  }, {
    headers: {
      'Cache-Control': 'public, max-age=300, s-maxage=300', // 5분 캐시
      'CDN-Cache-Control': 'public, max-age=300'
    }
  });
} 