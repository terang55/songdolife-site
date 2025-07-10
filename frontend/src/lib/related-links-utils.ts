interface RelatedLink {
  title: string;
  href: string;
  description: string;
  icon: string;
  category: 'primary' | 'secondary';
}

// 페이지별 관련 링크 설정
export const getHomeRelatedLinks = (): RelatedLink[] => [
  {
    title: '지하철 시간표',
    href: '/subway',
    description: '인천1호선 센트럴파크역, 인천대입구역, 국제업무지구역 실시간 정보',
    icon: '🚇',
    category: 'primary'
  },
  {
    title: '부동산 실거래가',
    href: '/realestate',
    description: '송도국제도시 아파트, 오피스텔 최신 거래 현황',
    icon: '🏠',
    category: 'primary'
  },
  {
    title: '학원 정보',
    href: '/academy',
    description: '송도동 지역 학원 및 교육기관 정보',
    icon: '📚',
    category: 'primary'
  },
  {
    title: '병원/약국 찾기',
    href: '/medical',
    description: '송도동 주변 의료기관 위치 및 진료 정보',
    icon: '🏥',
    category: 'secondary'
  },
  {
    title: '개인정보처리방침',
    href: '/privacy',
    description: '송도라이프 개인정보 보호 정책',
    icon: '🔒',
    category: 'secondary'
  },
  {
    title: '이용약관',
    href: '/terms',
    description: '송도라이프 서비스 이용 약관',
    icon: '📋',
    category: 'secondary'
  }
];

export const getSubwayRelatedLinks = (): RelatedLink[] => [
  {
    title: '메인 페이지',
    href: '/',
    description: '송도국제도시 종합 생활정보로 돌아가기',
    icon: '🏙️',
    category: 'primary'
  },
  {
    title: '부동산 정보',
    href: '/realestate',
    description: '지하철역 주변 부동산 실거래가 정보',
    icon: '🏠',
    category: 'primary'
  },
  {
    title: '맛집 정보',
    href: '/?category=맛집',
    description: '지하철역 주변 맛집 및 카페 정보',
    icon: '🍽️',
    category: 'secondary'
  },
  {
    title: '병원/약국',
    href: '/medical',
    description: '지하철역 접근성 좋은 의료기관',
    icon: '🏥',
    category: 'secondary'
  }
];

export const getRealEstateRelatedLinks = (): RelatedLink[] => [
  {
    title: '메인 페이지',
    href: '/',
    description: '송도국제도시 종합 생활정보로 돌아가기',
    icon: '🏙️',
    category: 'primary'
  },
  {
    title: '지하철 정보',
    href: '/subway',
    description: '교통 접근성 확인하기',
    icon: '🚇',
    category: 'primary'
  },
  {
    title: '학원 정보',
    href: '/academy',
    description: '자녀 교육환경 알아보기',
    icon: '📚',
    category: 'primary'
  },
  {
    title: '생활 정보',
    href: '/?category=생활',
    description: '주변 편의시설 및 생활정보',
    icon: '🛍️',
    category: 'secondary'
  },
  {
    title: '병원/약국',
    href: '/medical',
    description: '의료 접근성 확인하기',
    icon: '🏥',
    category: 'secondary'
  }
];

export const getAcademyRelatedLinks = (): RelatedLink[] => [
  {
    title: '메인 페이지',
    href: '/',
    description: '송도국제도시 종합 생활정보로 돌아가기',
    icon: '🏙️',
    category: 'primary'
  },
  {
    title: '부동산 정보',
    href: '/realestate',
    description: '교육환경 좋은 지역 부동산 정보',
    icon: '🏠',
    category: 'primary'
  },
  {
    title: '지하철 정보',
    href: '/subway',
    description: '학원까지 교통편 확인하기',
    icon: '🚇',
    category: 'secondary'
  },
  {
    title: '육아 정보',
    href: '/?category=육아',
    description: '송도동 육아 관련 정보',
    icon: '👶',
    category: 'secondary'
  }
];

export type { RelatedLink }; 