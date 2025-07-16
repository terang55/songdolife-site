import { GuideContent, GuideCategory, GuideMetadata } from '@/types/guide';
import { BASE_URL } from '@/lib/siteConfig';
import { loadGuideContent } from '@/lib/markdown-utils';

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
  }
];

// 임시 정적 데이터 (향후 CMS 또는 API로 교체)
export const STATIC_GUIDES: GuideContent[] = [
  {
    slug: 'songdo-moving-checklist',
    title: '송도 이사 완벽 체크리스트',
    description: '송도국제도시로의 이사를 준비하는 모든 단계를 상세히 안내합니다.',
    keywords: ['송도 이사', '송도 이사 체크리스트', '송도 입주', '송도 정착', '송도 생활 준비'],
    content: '',
    category: 'moving',
    lastUpdated: '2025-07-12',
    relatedGuides: ['songdo-newlywed-guide', 'songdo-restaurant-guide'],
    readingTime: 10,
    difficulty: 'medium',
    tags: ['이사', '체크리스트', '정착', '생활정보'],
    featured: true
  },
  {
    slug: 'songdo-newlywed-guide',
    title: '송도 신혼부부 완벽 정착 가이드',
    description: '송도국제도시에서 신혼생활을 시작하는 부부를 위한 완벽 가이드입니다.',
    keywords: ['송도 신혼집', '송도 신혼부부', '송도 신혼생활', '송도 신혼 추천', '송도 신혼 아파트'],
    content: '',
    category: 'moving',
    lastUpdated: '2025-07-12',
    relatedGuides: ['songdo-moving-checklist', 'songdo-restaurant-guide'],
    readingTime: 8,
    difficulty: 'medium',
    tags: ['신혼', '생활정보', '정착', '부부'],
    featured: true
  },
  {
    slug: 'songdo-restaurant-guide',
    title: '송도 맛집 완벽 가이드',
    description: '송도국제도시의 다양한 맛집을 카테고리별로 정리한 완벽 가이드입니다.',
    keywords: ['송도 맛집', '송도 음식점', '센트럴파크 맛집', '트리플스트리트 맛집', '송도 카페', '송도 한식', '송도 중식', '송도 일식', '송도 양식'],
    content: '',
    category: 'lifestyle',
    lastUpdated: '2025-07-12',
    relatedGuides: ['songdo-shopping-guide', 'songdo-culture-guide'],
    readingTime: 12,
    difficulty: 'easy',
    tags: ['맛집', '음식', '카페', '레스토랑'],
    featured: true
  },
  {
    slug: 'songdo-shopping-guide',
    title: '송도 쇼핑 가이드',
    description: '트리플스트리트부터 프리미엄 아울렛까지, 송도의 모든 쇼핑 정보를 정리했습니다.',
    keywords: ['송도 쇼핑', '트리플스트리트', '현대프리미엄아울렛', '송도 쇼핑몰', '센트럴파크 쇼핑', '송도 마트', '송도 편의시설'],
    content: '',
    category: 'lifestyle',
    lastUpdated: '2025-07-12',
    relatedGuides: ['songdo-restaurant-guide', 'songdo-culture-guide'],
    readingTime: 10,
    difficulty: 'easy',
    tags: ['쇼핑', '쇼핑몰', '아울렛', '편의시설'],
    featured: true
  },
  {
    slug: 'songdo-culture-guide',
    title: '송도 문화생활 가이드',
    description: '송도국제도시의 공연, 전시, 여가활동 정보를 완벽 정리한 문화생활 가이드입니다.',
    keywords: ['송도 문화생활', '송도컨벤시아', '센트럴파크 공연', '송도 전시', '송도 공원', '송도 여가', '송도 축제', '송도 영화관'],
    content: '',
    category: 'lifestyle',
    lastUpdated: '2025-07-12',
    relatedGuides: ['songdo-restaurant-guide', 'songdo-shopping-guide', 'songdo-park-guide'],
    readingTime: 15,
    difficulty: 'medium',
    tags: ['문화', '공연', '전시', '여가활동'],
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
    category: 'lifestyle',
    lastUpdated: '2025-07-13',
    relatedGuides: ['songdo-moving-checklist', 'songdo-newlywed-guide', 'songdo-culture-guide'],
    readingTime: 25,
    difficulty: 'medium',
    tags: ['교육', '학교', '학원', '국제학교', '학군', 'IB', '유치원', '입학'],
    featured: true
  },
  {
    slug: 'songdo-spring-guide',
    title: '송도 봄 완벽 가이드',
    description: '송도국제도시의 봄을 만끽할 수 있는 벚꽃 명소, 축제, 나들이 코스를 완벽 정리한 가이드입니다.',
    keywords: ['송도 봄', '송도 벚꽃', '센트럴파크 벚꽃', '달빛축제공원', '봄 축제', '봄 나들이', '수상택시', '카누', 'G타워', '트라이볼'],
    content: '',
    category: 'seasonal',
    lastUpdated: '2025-07-13',
    relatedGuides: ['songdo-park-guide', 'songdo-culture-guide', 'songdo-summer-guide'],
    readingTime: 20,
    difficulty: 'easy',
    tags: ['봄', '벚꽃', '축제', '나들이', '수상활동', '산책', '피크닉'],
    featured: true,
    seasonal: {
      season: 'spring',
      months: [3, 4, 5]
    }
  },
  {
    slug: 'songdo-summer-guide',
    title: '송도 여름 완벽 가이드',
    description: '송도국제도시 여름 축제와 수상활동, 시원한 피서지까지 완벽 정리한 여름철 가이드입니다.',
    keywords: ['송도 여름', '펜타포트 락 페스티벌', '송도맥주축제', '센트럴파크 수상레저', '카누', '카약', '수상택시', '트리플스트리트', '현대아울렛'],
    content: '',
    category: 'seasonal',
    lastUpdated: '2025-07-13',
    relatedGuides: ['songdo-park-guide', 'songdo-culture-guide', 'songdo-spring-guide'],
    readingTime: 25,
    difficulty: 'medium',
    tags: ['여름', '축제', '수상활동', '피서', '락페스티벌', '맥주축제', '쇼핑'],
    featured: true,
    seasonal: {
      season: 'summer',
      months: [6, 7, 8]
    }
  },
  {
    slug: 'songdo-autumn-guide',
    title: '송도 가을 완벽 가이드',
    description: '송도국제도시의 단풍 명소와 가을 야외활동, 축제 정보를 완벽 정리한 가을철 가이드입니다.',
    keywords: ['송도 가을', '송도 단풍', '센트럴파크 단풍', '달빛공원', '해돋이공원', '자전거 투어', '조깅', '송도미래길', '가을 축제'],
    content: '',
    category: 'seasonal',
    lastUpdated: '2025-07-13',
    relatedGuides: ['songdo-park-guide', 'songdo-culture-guide', 'songdo-winter-guide'],
    readingTime: 22,
    difficulty: 'medium',
    tags: ['가을', '단풍', '야외활동', '자전거', '조깅', '산책', '사진'],
    featured: true,
    seasonal: {
      season: 'fall',
      months: [9, 10, 11]
    }
  },
  {
    slug: 'songdo-winter-guide',
    title: '송도 겨울 완벽 가이드',
    description: '송도국제도시의 따뜻한 실내 명소와 겨울 활동, 온천 정보를 완벽 정리한 겨울철 가이드입니다.',
    keywords: ['송도 겨울', '송도 실내 활동', '현대아울렛', '트리플스트리트', '송해온 온천', 'CGV', '찜질방', '따뜻한 카페', '겨울 쇼핑'],
    content: '',
    category: 'seasonal',
    lastUpdated: '2025-07-13',
    relatedGuides: ['songdo-shopping-guide', 'songdo-restaurant-guide', 'songdo-autumn-guide'],
    readingTime: 24,
    difficulty: 'easy',
    tags: ['겨울', '실내활동', '쇼핑', '온천', '영화', '카페', '따뜻함'],
    featured: true,
    seasonal: {
      season: 'winter',
      months: [12, 1, 2]
    }
  },
  {
    slug: 'songdo-childcare-guide',
    title: '송도 육아 완벽 가이드',
    description: '송도국제도시의 어린이집, 유치원, 놀이시설부터 의료진까지, 아이와 함께 살기 좋은 송도 육아 정보를 완벽 정리했습니다.',
    keywords: ['송도 육아', '송도 어린이집', '송도 유치원', '송도 놀이시설', '송도 키즈카페', '송도 소아과', '송도 아이', '송도 육아 정보'],
    content: '',
    category: 'childcare',
    lastUpdated: '2025-07-15',
    relatedGuides: ['songdo-park-guide', 'songdo-shopping-guide', 'songdo-restaurant-guide'],
    readingTime: 15,
    difficulty: 'easy',
    tags: ['육아', '어린이집', '유치원', '놀이시설', '의료', '아이', '가족'],
    featured: true
  }
];

export function getGuidesByCategory(category?: string): GuideContent[] {
  let guides = STATIC_GUIDES;
  
  if (category && category !== 'all') {
    guides = guides.filter(guide => guide.category === category);
  }
  
  return guides.sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
  });
}

export function getGuideBySlug(slug: string): GuideContent | null {
  const guide = STATIC_GUIDES.find(guide => guide.slug === slug);
  if (!guide) return null;
  
  const content = loadGuideContent(guide.category, slug);
  
  return {
    ...guide,
    content
  };
}


export function generateGuideMetadata(guide: GuideContent): GuideMetadata {
  const canonicalUrl = `${BASE_URL}/guides/${guide.slug}`;
  
  return {
    title: `${guide.title} | 송도라이프`,
    description: guide.description,
    keywords: [
      ...guide.keywords,
      '송도국제도시',
      '송도 가이드',
      '인천 연수구',
      '센트럴파크',
      '송도 생활정보'
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
      name: guide.title,
      description: guide.description,
      author: {
        '@type': 'Organization',
        name: '송도라이프'
      },
      datePublished: guide.lastUpdated,
      dateModified: guide.lastUpdated,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': canonicalUrl
      }
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
      guide.relatedGuides.includes(g.slug) ||
      g.tags.some(tag => guide.tags.includes(tag))
    )
    .slice(0, limit);
}