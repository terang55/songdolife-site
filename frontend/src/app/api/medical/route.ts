import { NextRequest, NextResponse } from 'next/server';

// 인천논현역 중심 좌표 (인천 남동구 논현동)
const NONHYEON_LAT = 37.3990;
const NONHYEON_LON = 126.7240;

// 카카오맵 API 키 (환경변수에서 가져오기)
const KAKAO_API_KEY = process.env.KAKAO_API_KEY;

// 디버깅용 로그
console.log('🔧 환경변수 디버깅:');
console.log('- process.env.KAKAO_API_KEY:', process.env.KAKAO_API_KEY ? '✅ 존재' : '❌ 없음');
console.log('- KAKAO_API_KEY 값:', KAKAO_API_KEY ? `✅ ${KAKAO_API_KEY.substring(0, 8)}...` : '❌ undefined');

interface MedicalInfo {
  id: string;
  name: string;
  category: string;
  address: string;
  roadAddress: string;
  phone?: string;
  distance: number;
  x: string; // 경도
  y: string; // 위도
  url?: string;
  isOpen?: boolean;
  openTime?: string;
  type: 'hospital' | 'pharmacy';
  specialties?: string[]; // 진료과목
  hasEmergency?: boolean; // 응급실 여부
  hasNightCare?: boolean; // 야간진료 여부
}

interface KakaoSearchResult {
  documents: Array<{
    id: string;
    place_name: string;
    category_name: string;
    address_name: string;
    road_address_name: string;
    phone: string;
    place_url: string;
    distance: string;
    x: string;
    y: string;
  }>;
  meta: {
    total_count: number;
    pageable_count: number;
    is_end: boolean;
  };
}

// 의료 카테고리 매핑
const MEDICAL_CATEGORIES = {
  hospital: [
    '의료,건강 > 병원 > 종합병원',
    '의료,건강 > 병원 > 내과',
    '의료,건강 > 병원 > 외과',
    '의료,건강 > 병원 > 정형외과',
    '의료,건강 > 병원 > 산부인과',
    '의료,건강 > 병원 > 소아과',
    '의료,건강 > 병원 > 이비인후과',
    '의료,건강 > 병원 > 안과',
    '의료,건강 > 병원 > 치과',
    '의료,건강 > 병원 > 피부과',
    '의료,건강 > 병원 > 비뇨기과',
    '의료,건강 > 병원 > 신경과',
    '의료,건강 > 병원 > 정신과',
    '의료,건강 > 응급실'
  ],
  pharmacy: [
    '의료,건강 > 약국'
  ]
};

// 진료과목 추출 함수
function extractSpecialties(categoryName: string): string[] {
  const specialties: string[] = [];
  
  if (categoryName.includes('종합병원')) specialties.push('종합진료');
  if (categoryName.includes('내과')) specialties.push('내과');
  if (categoryName.includes('외과')) specialties.push('외과');
  if (categoryName.includes('정형외과')) specialties.push('정형외과');
  if (categoryName.includes('산부인과')) specialties.push('산부인과');
  if (categoryName.includes('소아과')) specialties.push('소아과');
  if (categoryName.includes('이비인후과')) specialties.push('이비인후과');
  if (categoryName.includes('안과')) specialties.push('안과');
  if (categoryName.includes('치과')) specialties.push('치과');
  if (categoryName.includes('피부과')) specialties.push('피부과');
  if (categoryName.includes('비뇨기과')) specialties.push('비뇨기과');
  if (categoryName.includes('신경과')) specialties.push('신경과');
  if (categoryName.includes('정신과')) specialties.push('정신과');
  
  return specialties;
}

// 응급실 여부 확인
function hasEmergency(categoryName: string, placeName: string): boolean {
  return categoryName.includes('응급실') || 
         placeName.includes('응급') || 
         placeName.includes('24시간') ||
         categoryName.includes('종합병원');
}

// 야간진료 여부 확인 (추정)
function hasNightCare(placeName: string, categoryName: string): boolean {
  return placeName.includes('24시간') || 
         placeName.includes('야간') || 
         placeName.includes('24H') ||
         categoryName.includes('응급실');
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get('type') || 'all'; // hospital, pharmacy, all
    const category = searchParams.get('category'); // 내과, 외과 등
    const emergency = searchParams.get('emergency') === 'true';
    const night = searchParams.get('night') === 'true';
    const radius = parseInt(searchParams.get('radius') || '2000'); // 기본 2km

    console.log('🏥 의료기관 정보 요청:', {
      type,
      category,
      emergency,
      night,
      radius
    });

    // 환경변수 확인
    console.log('🔑 카카오 API 키 상태:', KAKAO_API_KEY ? '로드됨' : '❌ 로드 실패');

    if (!KAKAO_API_KEY) {
      // API 키 없이도 작동하도록 더미 데이터 제공
      console.log('⚠️ 카카오 API 키 없음, 더미 데이터 제공');
      return NextResponse.json({
        success: true,
        data: getDummyMedicalData(type),
        timestamp: new Date().toISOString(),
        note: '테스트 데이터 - 실제 서비스를 위해서는 카카오 API 키가 필요합니다'
      });
    }

    const results: MedicalInfo[] = [];

    // 카카오맵 API 카테고리 코드 매핑
    const categoryQueries = [];
    if (type === 'all' || type === 'hospital') {
      categoryQueries.push({ code: 'HP8', name: '병원' });
    }
    if (type === 'all' || type === 'pharmacy') {
      categoryQueries.push({ code: 'PM9', name: '약국' });
    }

    // 카테고리별로 카카오맵 API 호출 (페이징 포함)
    for (const categoryQuery of categoryQueries) {
      console.log(`🔍 ${categoryQuery.name} 검색 중... (${categoryQuery.code})`);
      
      // 최대 3페이지까지 호출 (15 x 3 = 45개)
      for (let page = 1; page <= 3; page++) {
        try {
          const apiUrl = `https://dapi.kakao.com/v2/local/search/category.json`;
          const params = new URLSearchParams({
            category_group_code: categoryQuery.code,
            x: NONHYEON_LON.toString(),
            y: NONHYEON_LAT.toString(),
            radius: radius.toString(),
            sort: 'distance',
            size: '15',
            page: page.toString()
          });

          const response = await fetch(`${apiUrl}?${params}`, {
            headers: {
              'Authorization': `KakaoAK ${KAKAO_API_KEY}`
            }
          });

          if (!response.ok) {
            const errorText = await response.text();
            console.error(`❌ ${categoryQuery.name} ${page}페이지 API 호출 실패 (${response.status}): ${errorText}`);
            break; // 이 카테고리는 중단하고 다음 카테고리로
          }

          const data: KakaoSearchResult = await response.json();
          console.log(`✅ ${categoryQuery.name} ${page}페이지: ${data.documents.length}개 발견`);
          
          // 더 이상 결과가 없으면 중단
          if (data.documents.length === 0 || data.meta.is_end) {
            console.log(`📄 ${categoryQuery.name} 검색 완료 (${page}페이지에서 종료)`);
            break;
          }
          
          data.documents.forEach(place => {
            const medicalType: 'hospital' | 'pharmacy' = 
              place.category_name.includes('약국') ? 'pharmacy' : 'hospital';
            
            // 타입 필터링
            if (type !== 'all' && type !== medicalType) return;
            
            // 카테고리 필터링
            if (category && !place.category_name.includes(category)) return;
            
            const specialties = extractSpecialties(place.category_name);
            const isEmergency = hasEmergency(place.category_name, place.place_name);
            const isNightCare = hasNightCare(place.place_name, place.category_name);
            
            // 응급실 필터링
            if (emergency && !isEmergency) return;
            
            // 야간진료 필터링
            if (night && !isNightCare) return;

            // 중복 제거 (같은 장소명과 주소)
            const isDuplicate = results.some(existing => 
              existing.name === place.place_name && 
              existing.address === place.address_name
            );
            
            if (!isDuplicate) {
              results.push({
                id: place.id,
                name: place.place_name,
                category: place.category_name,
                address: place.address_name,
                roadAddress: place.road_address_name,
                phone: place.phone || undefined,
                distance: parseInt(place.distance),
                x: place.x,
                y: place.y,
                url: place.place_url,
                type: medicalType,
                specialties: specialties.length > 0 ? specialties : undefined,
                hasEmergency: isEmergency,
                hasNightCare: isNightCare
              });
            }
          });

        } catch (error) {
          console.error('❌ 카테고리 검색 실패:', categoryQuery.name, `${page}페이지`, error);
          break; // 이 카테고리는 중단
        }
      }
    }

    // 거리순 정렬
    results.sort((a, b) => a.distance - b.distance);

    console.log(`✅ 의료기관 검색 완료: ${results.length}개 발견`);

    return NextResponse.json({
      success: true,
      data: results.slice(0, 50), // 최대 50개까지
      total: results.length,
      timestamp: new Date().toISOString(),
      params: {
        type,
        category,
        emergency,
        night,
        radius
      }
    });

  } catch (error) {
    console.error('🏥 의료기관 API 오류:', error);
    
    return NextResponse.json({
      success: false,
      error: '의료기관 정보를 가져오는데 실패했습니다.',
      details: error instanceof Error ? error.message : '알 수 없는 오류'
    }, { status: 500 });
  }
}

// 더미 데이터 생성 함수
function getDummyMedicalData(type: string): MedicalInfo[] {
  const hospitals: MedicalInfo[] = [
    {
      id: 'dummy_1',
      name: '논현종합병원',
      category: '의료,건강 > 병원 > 종합병원',
      address: '인천 남동구 논현동 680-1',
      roadAddress: '인천 남동구 논현로 123',
      phone: '032-123-4567',
      distance: 500,
      x: '126.7327',
      y: '37.3904',
      type: 'hospital',
      specialties: ['종합진료', '내과', '외과'],
      hasEmergency: true,
      hasNightCare: true
    },
    {
      id: 'dummy_2',
      name: '미래내과의원',
      category: '의료,건강 > 병원 > 내과',
      address: '인천 남동구 논현동 834-5',
      roadAddress: '인천 남동구 논현로 89',
      phone: '032-234-5678',
      distance: 800,
      x: '126.7337',
      y: '37.3884',
      type: 'hospital',
      specialties: ['내과'],
      hasEmergency: false,
      hasNightCare: false
    },
    {
      id: 'dummy_3',
      name: '논현정형외과',
      category: '의료,건강 > 병원 > 정형외과',
      address: '인천 남동구 논현동 512-3',
      roadAddress: '인천 남동구 논현로 156',
      phone: '032-345-6789',
      distance: 1200,
      x: '126.7347',
      y: '37.3874',
      type: 'hospital',
      specialties: ['정형외과'],
      hasEmergency: false,
      hasNightCare: false
    }
  ];

  const pharmacies: MedicalInfo[] = [
    {
      id: 'dummy_4',
      name: '논현온누리약국',
      category: '의료,건강 > 약국',
      address: '인천 남동구 논현동 791-2',
      roadAddress: '인천 남동구 논현로 67',
      phone: '032-456-7890',
      distance: 300,
      x: '126.7317',
      y: '37.3894',
      type: 'pharmacy',
      hasEmergency: false,
      hasNightCare: false
    },
    {
      id: 'dummy_5',
      name: '24시간 미래약국',
      category: '의료,건강 > 약국',
      address: '인천 남동구 논현동 623-1',
      roadAddress: '인천 남동구 논현로 234',
      phone: '032-567-8901',
      distance: 900,
      x: '126.7357',
      y: '37.3864',
      type: 'pharmacy',
      hasEmergency: false,
      hasNightCare: true
    }
  ];

  if (type === 'hospital') return hospitals;
  if (type === 'pharmacy') return pharmacies;
  return [...hospitals, ...pharmacies];
} 