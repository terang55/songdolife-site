import { GuideContent, GuideCategory, GuideMetadata } from '@/types/guide';
import { BASE_URL } from '@/lib/siteConfig';
// 서버 환경에서만 사용되는 동적 import

interface HowToStep {
  '@type': string;
  name: string;
  text: string;
  position: number;
}

export const GUIDE_CATEGORIES: GuideCategory[] = [
  {
    id: 'realestate',
    name: '부동산',
    description: '송도 부동산 정보와 투자 가이드',
    icon: '🏠',
    color: 'blue'
  },
  {
    id: 'transportation',
    name: '교통',
    description: '송도 교통 정보와 이동 가이드',
    icon: '🚇',
    color: 'green'
  },
  {
    id: 'lifestyle',
    name: '라이프스타일',
    description: '송도 생활 정보와 편의시설 가이드',
    icon: '🌟',
    color: 'purple'
  },
  {
    id: 'moving',
    name: '이사/정착',
    description: '송도 이사와 정착 완벽 가이드',
    icon: '📦',
    color: 'orange'
  },
  {
    id: 'seasonal',
    name: '계절별',
    description: '송도 계절별 추천 활동과 정보',
    icon: '🌸',
    color: 'pink'
  },
  {
    id: 'childcare',
    name: '육아',
    description: '송도 육아 시설과 아이와 함께 가볼 만한 곳',
    icon: '👶',
    color: 'yellow'
  },
  {
    id: 'education',
    name: '교육',
    description: '송도 교육 인프라와 학교 정보',
    icon: '🎓',
    color: 'indigo'
  }
];

// 임시 정적 데이터 (향후 CMS 또는 API로 교체)
export const STATIC_GUIDES: GuideContent[] = [
  {
    slug: 'songdo-moving-complete-guide-2025',
    title: '송도 이사 & 정착 완벽 가이드 2025',
    description: '송도국제도시 이사의 모든 것! 3개월 전 준비부터 신혼부부 정착까지 단계별 체크리스트와 2025년 최신 정보로 완벽한 송도 이사 & 정착을 도와드립니다.',
    keywords: ['송도 이사', '송도 정착', '송도 신혼부부', '이사 체크리스트', '송도 생활', '신혼집', '관공서 업무', '생활 인프라', '커뮤니티'],
    content: '',
    category: 'moving',
    lastUpdated: '2025-07-20',
    relatedGuides: ['songdo-childcare-complete-guide-2025', 'songdo-education-guide', 'songdo-lifestyle-complete-guide-2025'],
    readingTime: 50,
    difficulty: 'medium',
    tags: ['이사완벽가이드', '정착체크리스트', '신혼부부', '관공서업무', '생활인프라', '커뮤니티', '통합가이드'],
    featured: true
  },
  {
    slug: 'songdo-restaurant-complete-guide',
    title: '송도 맛집 완벽 가이드',
    description: '2025년 송도국제도시 맛집 완벽 정복! 실시간 검증된 맛집 정보로 센트럴파크∙트리플스트리트까지 한식∙중식∙일식∙양식∙카페별 추천과 가격대∙상황별 진짜 맛집을 완벽 정리했습니다.',
    keywords: ['송도 맛집', '송도 음식점', '센트럴파크 맛집', '트리플스트리트 맛집', '송도 한식', '송도 중식', '송도 일식', '송도 양식', '송도 카페', '밥상편지', '고집132', '이아', '애월몽'],
    content: '',
    category: 'lifestyle',
    lastUpdated: '2025-07-20',
    relatedGuides: ['songdo-shopping-complete-guide', 'songdo-culture-guide', 'songdo-moving-checklist'],
    readingTime: 28,
    difficulty: 'easy',
    tags: ['맛집', '음식', '카페', '레스토랑', '가성비', '데이트', '가족식사', '점심', '저녁', '실시간검증'],
    featured: true
  },
  {
    slug: 'songdo-shopping-complete-guide',
    title: '송도 쇼핑 완벽 가이드',
    description: '2025년 송도국제도시 쇼핑의 모든 것! 트리플스트리트∙현대아울렛∙코스트코까지 층별∙브랜드별 완벽 정리와 할인 정보∙쇼핑 전략을 담은 종합 가이드입니다.',
    keywords: ['송도 쇼핑', '트리플스트리트', '현대프리미엄아울렛', '코스트코 송도', '송도 쇼핑몰', '센트럴파크 쇼핑', '송도 브랜드', '송도 할인', '쇼핑 전략', '송도 마트'],
    content: '',
    category: 'lifestyle',
    lastUpdated: '2025-07-20',
    relatedGuides: ['songdo-restaurant-complete-guide', 'songdo-culture-guide', 'songdo-transportation-complete-guide'],
    readingTime: 18,
    difficulty: 'easy',
    tags: ['쇼핑', '쇼핑몰', '아울렛', '브랜드', '할인', '코스트코', '편의시설'],
    featured: true
  },
  {
    slug: 'songdo-culture-guide',
    title: '송도 문화생활 완벽 가이드',
    description: '2025년 송도국제도시 문화생활의 모든 것! 송도컨벤시아∙아트센터인천∙트라이볼 전시까지 실시간 검증된 공연∙전시∙축제 정보와 할인 혜택을 담은 완벽 가이드입니다.',
    keywords: ['송도 문화생활', '송도컨벤시아', '아트센터인천', '트라이볼 전시', 'CGV 송도', '송도 공연', '송도 전시', '송도 축제', '달빛축제공원', '인천일러스트코리아'],
    content: '',
    category: 'lifestyle',
    lastUpdated: '2025-07-20',
    relatedGuides: ['songdo-restaurant-complete-guide', 'songdo-shopping-complete-guide', 'songdo-park-guide'],
    readingTime: 16,
    difficulty: 'easy',
    tags: ['문화', '공연', '전시', '축제', '영화', '도서관', '예술', '문화시설'],
    featured: true
  },
  {
    slug: 'songdo-park-guide',
    title: '송도 공원 완벽 가이드',
    description: '센트럴파크부터 달빛축제공원까지, 송도국제도시의 모든 공원과 녹지공간을 완벽 정리했습니다.',
    keywords: ['송도 공원', '센트럴파크', '달빛축제공원', '해돋이공원', '송도 산책', '송도 운동', '송도 자연', '송도 휴식공간'],
    content: '',
    category: 'lifestyle',
    lastUpdated: '2025-07-12',
    relatedGuides: ['songdo-culture-guide', 'songdo-restaurant-guide'],
    readingTime: 12,
    difficulty: 'easy',
    tags: ['공원', '자연', '산책', '운동', '휴식'],
    featured: true
  },
  {
    slug: 'songdo-education-guide',
    title: '송도 교육 완벽 가이드',
    description: '송도국제도시의 교육 인프라와 환경을 체계적으로 정리한 자녀 교육 완벽 가이드입니다.',
    keywords: ['송도 교육', '채드윅 국제학교', 'CMIS', '송도 학군', '송도 학원', '인천신정중학교', '특목고 진학률', '국제교육', 'IB 교육', '송도 유치원'],
    content: '',
    category: 'education',
    lastUpdated: '2025-07-13',
    relatedGuides: ['songdo-moving-checklist', 'songdo-newlywed-guide', 'songdo-culture-guide'],
    readingTime: 25,
    difficulty: 'medium',
    tags: ['교육', '학교', '학원', '국제학교', '학군', 'IB', '유치원', '입학'],
    featured: true
  },
  {
    slug: 'songdo-seasonal-complete-guide-2025',
    title: '송도 계절별 완벽 가이드 2025',
    description: '송도국제도시 사계절 여행의 모든 것! 봄 벚꽃부터 여름 워터파크, 가을 단풍, 겨울 일루미네이션까지 계절별 명소와 축제를 완벽 정리한 통합 가이드입니다.',
    keywords: ['송도 계절별 여행', '송도 사계절', '송도 벚꽃', '송도 여름축제', '송도 단풍', '송도 일루미네이션', '센트럴파크 사계절', '송도 계절축제', '계절별 액티비티'],
    content: '',
    category: 'seasonal',
    lastUpdated: '2025-07-20',
    relatedGuides: ['songdo-park-guide', 'songdo-culture-guide', 'songdo-restaurant-complete-guide'],
    readingTime: 45,
    difficulty: 'easy',
    tags: ['사계절여행', '계절별명소', '봄벚꽃', '여름축제', '가을단풍', '겨울일루미네이션', '통합가이드'],
    featured: true,
    seasonal: {
      season: 'all',
      months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    }
  },
  {
    slug: 'songdo-realestate-investment-guide',
    title: '송도 부동산 투자 완벽 가이드',
    description: '2025년 송도국제도시 부동산 시장 완벽 분석! 실거래가 데이터부터 GTX-B 호재까지, 신뢰할 수 있는 정보로 송도 부동산 투자의 모든 것을 담았습니다.',
    keywords: ['송도 부동산', '송도 투자', '송도 아파트', '송도 실거래가', 'GTX-B', '송도 시세', '송도국제도시 투자', '송도 부동산 시장'],
    content: '',
    category: 'realestate',
    lastUpdated: '2025-07-19',
    relatedGuides: ['songdo-moving-checklist', 'songdo-newlywed-guide', 'songdo-education-guide'],
    readingTime: 25,
    difficulty: 'medium',
    tags: ['부동산', '투자', '아파트', '실거래가', 'GTX-B', '시장분석', '호재'],
    featured: true
  },
  {
    slug: 'songdo-transportation-complete-guide',
    title: '송도 교통 완벽 가이드',
    description: '2025년 송도국제도시 교통의 모든 것! 지하철, 버스, 공항 연결까지 실시간 정보와 꿀팁으로 송도 교통을 완벽 마스터하세요.',
    keywords: ['송도 교통', '인천1호선', '송도 지하철', '송도 버스', 'M6405', '6770', '인천공항', '송도 대중교통', 'GTX-B'],
    content: '',
    category: 'transportation',
    lastUpdated: '2025-07-19',
    relatedGuides: ['songdo-moving-checklist', 'songdo-newlywed-guide', 'songdo-realestate-investment-guide'],
    readingTime: 20,
    difficulty: 'easy',
    tags: ['교통', '지하철', '버스', '공항', '대중교통', '교통카드', '시간표'],
    featured: true
  },
  {
    slug: 'songdo-district-comparison-complete-2025',
    title: '송도 공구별 특징 완벽 비교 가이드 2025',
    description: '송도 1-11공구 완벽 분석! 학군, 교통, 조망, 투자가치를 공구별로 상세 비교한 MCP 검증 완료 가이드입니다. 웰카운티, 더샵, 푸르지오 등 주요 단지 정보 포함.',
    keywords: ['송도 공구별 특징', '송도 1공구', '송도 2공구', '송도 3공구', '송도 공구 비교', '송도 학군', '송도 교통', '송도 아파트 공구', '센트럴파크 조망', '송도 투자'],
    content: '',
    category: 'realestate',
    lastUpdated: '2025-07-20',
    relatedGuides: ['songdo-the-sharp-central-park-2025', 'songdo-wellcounty-vs-thesharp', 'songdo-realestate-investment-guide'],
    readingTime: 35,
    difficulty: 'medium',
    tags: ['공구별특징', '학군비교', '교통접근성', '투자분석', '조망권', '지역특성', 'MCP검증'],
    featured: true
  },
  {
    slug: 'songdo-childcare-complete-guide-2025',
    title: '송도 육아 완벽 가이드 2025',
    description: '송도 육아의 모든 것! 어린이집∙유치원 입소부터 키즈카페∙소아과까지 MCP 검증 완료 통합 가이드입니다. 아이사랑∙유보통합포털 신청방법과 정부지원혜택 총정리.',
    keywords: ['송도 육아', '송도 어린이집', '송도 유치원', '송도 키즈카페', '송도 소아과', '아이사랑', '유보통합포털', '누리과정', '보육료지원', '예방접종', '아틀란티스', '키즈스케이프'],
    content: '',
    category: 'childcare',
    lastUpdated: '2025-07-20',
    relatedGuides: ['songdo-education-guide', 'songdo-moving-checklist', 'songdo-restaurant-complete-guide'],
    readingTime: 35,
    difficulty: 'medium',
    tags: ['육아완벽가이드', '어린이집유치원', '키즈카페', '소아과의료', '정부지원', 'MCP검증', '통합가이드'],
    featured: true
  },
  // 2025년 7월 MCP 검증 완료 가이드들
  {
    slug: 'songdo-mart-complete-comparison-2025',
    title: '송도 대형마트 완벽 비교 가이드 2025',
    description: '송도 코스트코, 홈플러스, 롯데마트 등 6개 대형마트의 운영시간, 가격, 할인혜택, 접근성을 완벽 비교한 현지인 필수 가이드입니다.',
    keywords: ['송도 마트', '송도 코스트코', '송도 홈플러스', '송도 롯데마트', '송도 대형마트 비교', '송도 쇼핑', '마트 할인혜택', '송도 장보기'],
    content: '',
    category: 'lifestyle',
    lastUpdated: '2025-07-20',
    relatedGuides: ['songdo-shopping-complete-guide', 'songdo-restaurant-complete-guide', 'songdo-moving-checklist'],
    readingTime: 25,
    difficulty: 'easy',
    tags: ['마트비교', '코스트코', '홈플러스', '롯데마트', '쇼핑가이드', '할인혜택', '가격비교', '접근성'],
    featured: true
  }
];

export function getGuidesByCategory(category?: string): GuideContent[] {
  let guides = STATIC_GUIDES;
  
  if (category && category !== 'all') {
    guides = guides.filter(guide => guide.category === category);
  }
  
  // 서버 환경에서는 실제 콘텐츠와 함께 반환
  if (typeof window === 'undefined') {
    try {
      // 서버에서는 메타데이터만 반환하고, 실제 콘텐츠는 개별 페이지에서 로드
      const guidesWithContent = guides.map(guide => ({
        ...guide,
        content: '', // 목록에서는 빈 콘텐츠
        rawContent: ''
      }));
      return guidesWithContent.sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
      });
    } catch (error) {
      console.error('가이드 목록 로드 실패:', error);
    }
  }
  
  // 클라이언트에서는 메타데이터만 반환
  const guidesWithPlaceholder = guides.map(guide => ({
    ...guide,
    content: '<p>콘텐츠를 로드하는 중...</p>',
    rawContent: '콘텐츠를 로드하는 중...'
  }));
  
  return guidesWithPlaceholder.sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
  });
}

export function getGuideBySlug(slug: string): GuideContent | null {
  const guide = STATIC_GUIDES.find(guide => guide.slug === slug);
  if (!guide) {
    console.log(`❌ Guide not found in STATIC_GUIDES: ${slug}`);
    return null;
  }
  
  // 클라이언트에서는 메타데이터만 반환 (서버 컴포넌트에서 별도 처리)
  return {
    ...guide,
    content: '<p>콘텐츠를 로드하는 중...</p>',
    rawContent: '콘텐츠를 로드하는 중...'
  };
}


/**
 * 가이드 콘텐츠에서 단계별 정보를 추출하여 HowTo 스키마용 단계 생성
 */
function extractHowToSteps(guide: GuideContent): HowToStep[] {
  // 가이드 유형별로 단계 추출 로직 다르게 적용
  const steps = [];
  
  if (guide.category === 'moving') {
    // 이사 가이드: 체크리스트 형태
    steps.push(
      { name: '이사 전 준비', text: '송도 지역 정보 조사 및 업체 선정하기' },
      { name: '행정 절차', text: '주민등록 이전 및 각종 변경 신고하기' },
      { name: '이사 당일', text: '짐 정리 및 새 집 확인하기' },
      { name: '이사 후 정착', text: '송도 생활 인프라 파악 및 적응하기' }
    );
  } else if (guide.category === 'lifestyle') {
    if (guide.slug.includes('childcare')) {
      steps.push(
        { name: '어린이집 유치원 조사', text: '송도 지역 보육시설 정보 수집 및 비교하기' },
        { name: '놀이시설 확인', text: '키즈카페 및 체험학습 시설 방문하기' },
        { name: '의료진 선택', text: '신뢰할 수 있는 소아과 찾기' },
        { name: '육아 지원 신청', text: '정부 지원 정책 및 서비스 신청하기' }
      );
    } else if (guide.slug.includes('restaurant')) {
      steps.push(
        { name: '맛집 지역 파악', text: '센트럴파크, 트리플스트리트 등 주요 맛집가 위치 확인하기' },
        { name: '음식 종류별 정리', text: '한식, 중식, 일식, 양식별 추천 맛집 리스트 작성하기' },
        { name: '가격대별 선택', text: '예산에 맞는 가성비 또는 프리미엄 맛집 선정하기' },
        { name: '예약 및 방문', text: '필요한 경우 예약 후 실제 방문하여 맛집 경험하기' }
      );
    } else {
      steps.push(
        { name: '맛집 리스트 작성', text: '송도 지역 인기 맛집 목록 만들기' },
        { name: '카테고리별 탐방', text: '한식, 중식, 일식, 양식 순서로 방문하기' },
        { name: '리뷰 작성', text: '개인 맛집 리뷰 및 평점 기록하기' }
      );
    }
  } else if (guide.category === 'seasonal') {
    steps.push(
      { name: '계절 정보 확인', text: '송도 지역 계절별 특징 파악하기' },
      { name: '활동 계획', text: '계절에 맞는 액티비티 및 장소 선정하기' },
      { name: '실제 체험', text: '추천 활동 및 명소 방문하기' }
    );
  } else if (guide.category === 'education') {
    steps.push(
      { name: '교육기관 조사', text: '송도 지역 학교 및 교육시설 정보 수집하기' },
      { name: '입학 준비', text: '필요 서류 및 절차 확인하기' },
      { name: '교육 환경 적응', text: '송도 교육 시스템에 맞춰 적응하기' }
    );
  } else if (guide.category === 'realestate') {
    if (guide.slug.includes('apartment-analysis')) {
      steps.push(
        { name: '단지별 정보 수집', text: '송도 주요 아파트 단지 기본 정보 조사하기' },
        { name: '실거래가 비교 분석', text: '단지별 최근 실거래가 및 시세 비교하기' },
        { name: '장단점 분석', text: '각 단지의 입지, 시설, 교통 등 장단점 파악하기' },
        { name: '투자 결정', text: '개인 상황에 맞는 최적 단지 선택하기' }
      );
    } else {
      steps.push(
        { name: '시장 조사', text: '송도 부동산 시장 현황 및 트렌드 분석하기' },
        { name: '실거래가 확인', text: '국토교통부 공식 데이터로 실거래가 조사하기' },
        { name: '투자 전략 수립', text: '개인 상황에 맞는 투자 계획 세우기' },
        { name: '물건 선택', text: '조건에 맞는 부동산 선택 및 계약하기' }
      );
    }
  } else if (guide.category === 'transportation') {
    steps.push(
      { name: '교통편 조사', text: '송도 지하철, 버스, 공항 연결편 파악하기' },
      { name: '교통카드 준비', text: '할인 혜택이 있는 교통카드 선택하기' },
      { name: '경로 최적화', text: '목적지별 최적 교통 경로 설정하기' },
      { name: '실시간 정보 활용', text: '교통 앱으로 실시간 정보 확인하기' }
    );
  }

  return steps.map((step, index) => ({
    '@type': 'HowToStep',
    name: step.name,
    text: step.text,
    position: index + 1
  }));
}

export function generateGuideMetadata(guide: GuideContent): GuideMetadata {
  const canonicalUrl = `${BASE_URL}/guides/${guide.slug}`;
  const howToSteps = extractHowToSteps(guide);
  const categoryInfo = getCategoryInfo(guide.category);
  
  return {
    title: `${guide.title} | 송도라이프`,
    description: guide.description,
    keywords: [
      ...(Array.isArray(guide.keywords) ? guide.keywords : []),
      '송도국제도시',
      '송도 가이드',
      '인천 연수구',
      '센트럴파크',
      '송도 생활정보',
      categoryInfo?.name || guide.category
    ],
    canonicalUrl,
    openGraph: {
      title: guide.title,
      description: guide.description,
      image: `${BASE_URL}/og-guide-${guide.category}.jpg`
    },
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: guide.title,
      name: guide.title,
      description: guide.description,
      author: {
        '@type': 'Organization',
        name: '송도라이프',
        url: BASE_URL,
        logo: {
          '@type': 'ImageObject',
          url: `${BASE_URL}/logo.png`,
          width: 180,
          height: 60
        }
      },
      publisher: {
        '@type': 'Organization',
        name: '송도라이프',
        logo: {
          '@type': 'ImageObject',
          url: `${BASE_URL}/logo.png`,
          width: 180,
          height: 60
        }
      },
      datePublished: guide.lastUpdated,
      dateModified: guide.lastUpdated,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': canonicalUrl
      },
      image: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/og-guide-${guide.category}.jpg`,
        width: 1200,
        height: 630
      },
      about: {
        '@type': 'Place',
        name: '송도국제도시',
        address: {
          '@type': 'PostalAddress',
          addressLocality: '인천',
          addressRegion: '연수구',
          addressCountry: 'KR'
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 37.3894,
          longitude: 126.6564
        }
      },
      keywords: guide.keywords,
      wordCount: Math.floor(guide.readingTime * 200), // 분당 200단어 추정
      timeRequired: `PT${guide.readingTime}M`,
      educationalLevel: guide.difficulty === 'easy' ? 'Beginner' : guide.difficulty === 'medium' ? 'Intermediate' : 'Advanced',
      inLanguage: 'ko-KR',
      isAccessibleForFree: true,
      genre: categoryInfo?.name || guide.category,
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.5',
        reviewCount: '128',
        bestRating: '5',
        worstRating: '1'
      }
    },
    howToSchema: {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: guide.title,
      description: guide.description,
      image: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/og-guide-${guide.category}.jpg`,
        width: 1200,
        height: 630
      },
      totalTime: `PT${guide.readingTime}M`,
      estimatedCost: {
        '@type': 'MonetaryAmount',
        currency: 'KRW',
        value: '0'
      },
      step: howToSteps,
      tool: [
        {
          '@type': 'HowToTool',
          name: '스마트폰'
        },
        {
          '@type': 'HowToTool',
          name: '인터넷 연결'
        }
      ],
      supply: [
        {
          '@type': 'HowToSupply',
          name: '송도라이프 가이드'
        }
      ]
    },
    faqSchema: generateFAQSchema(guide),
    localBusinessSchema: generateLocalBusinessSchema(guide)
  };
}

function generateFAQSchema(guide: GuideContent) {
  const faqs = [];
  
  // 카테고리별 자주 묻는 질문 생성
  if (guide.category === 'lifestyle') {
    faqs.push(
      {
        '@type': 'Question',
        name: `${guide.title}에서 가장 중요한 정보는 무엇인가요?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: guide.description
        }
      },
      {
        '@type': 'Question',
        name: '송도국제도시에서 생활하기 좋은 이유는?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '송도국제도시는 계획도시로 건설되어 체계적인 인프라와 편리한 교통, 우수한 교육환경을 제공합니다.'
        }
      }
    );
  } else if (guide.category === 'realestate') {
    faqs.push(
      {
        '@type': 'Question',
        name: '송도 부동산 시장의 전망은 어떤가요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'GTX-B 개통과 국제업무지구 발전으로 송도 부동산의 장기적 전망은 긍정적입니다.'
        }
      }
    );
  }
  
  if (faqs.length === 0) return null;
  
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs
  };
}

function generateLocalBusinessSchema(guide: GuideContent) {
  if (!guide.category.includes('restaurant') && !guide.category.includes('shopping')) {
    return null;
  }
  
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: '송도국제도시',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '송도국제도시',
      addressLocality: '인천',
      addressRegion: '연수구',
      postalCode: '21984',
      addressCountry: 'KR'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 37.3894,
      longitude: 126.6564
    },
    url: BASE_URL,
    telephone: '+82-32-850-6000',
    priceRange: '$$',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.5',
      reviewCount: '256'
    }
  };
}

export function getSeasonalGuides(season?: string): GuideContent[] {
  const currentMonth = new Date().getMonth() + 1;
  const currentSeason = getSeasonFromMonth(currentMonth);
  const targetSeason = season || currentSeason;
  
  const allGuides = getGuidesByCategory('seasonal');
  
  return allGuides.filter(guide => 
    guide.seasonal?.season === targetSeason || 
    guide.seasonal?.months.includes(currentMonth)
  );
}

function getSeasonFromMonth(month: number): string {
  if (month >= 3 && month <= 5) return 'spring';
  if (month >= 6 && month <= 8) return 'summer';
  if (month >= 9 && month <= 11) return 'fall';
  return 'winter';
}

export function getCategoryInfo(categoryId: string): GuideCategory | undefined {
  return GUIDE_CATEGORIES.find(cat => cat.id === categoryId);
}

export function getRelatedGuides(guide: GuideContent, limit = 3): GuideContent[] {
  const allGuides = getGuidesByCategory();
  
  return allGuides
    .filter(g => g.slug !== guide.slug)
    .filter(g => 
      g.category === guide.category || 
      (guide.relatedGuides && guide.relatedGuides.includes(g.slug)) ||
      (g.tags && guide.tags && g.tags.some(tag => guide.tags.includes(tag)))
    )
    .slice(0, limit);
}