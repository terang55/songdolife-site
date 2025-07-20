/**
 * SEO 최적화 유틸리티
 * 카테고리별 고유 메타태그 생성 및 중복 콘텐츠 방지
 */

import { BASE_URL } from './siteConfig';

export interface SEOConfig {
  title: string;
  description: string;
  keywords: string[];
  canonicalUrl: string;
  ogTitle: string;
  ogDescription: string;
  ogImage?: string;
  twitterTitle: string;
  twitterDescription: string;
}

// 카테고리별 고유 콘텐츠 정의
const CATEGORY_CONTENT = {
  '전체': {
    title: '송도라이프 | 인천 연수구 송도국제도시 생활정보 플랫폼',
    description: '송도국제도시 주민들을 위한 실시간 뉴스, 지하철 정보, 부동산 정보, 의료 정보를 한눈에 확인하세요. 센트럴파크, 인천1호선, 송도동 맛집까지 모든 정보를 제공합니다.',
    keywords: ['송도국제도시', '송도동', '인천 연수구', '센트럴파크', '인천1호선', '송도 생활정보', '송도 뉴스', '송도 맛집', '송도 카페', '송도 부동산', '송도 병원', '송도 약국', '송도 교통'],
    canonicalPath: '/'
  },
  '뉴스': {
    title: '송도 뉴스 | 송도국제도시 최신 소식 및 정책 뉴스',
    description: '송도국제도시 최신 뉴스와 정책 소식을 실시간으로 확인하세요. 송도지구 개발 현황, 인천경제자유구역 정책, 센트럴파크 이벤트 등 송도 주민이 알아야 할 모든 뉴스를 제공합니다.',
    keywords: ['송도 뉴스', '송도국제도시 뉴스', '인천경제자유구역', '송도 개발', '송도 정책', '센트럴파크 뉴스', '국제업무지구 소식', '송도 언론', '송도 미디어'],
    canonicalPath: '/?category=뉴스'
  },
  '블로그': {
    title: '송도 블로그 | 송도국제도시 주민 생활 후기 및 맛집 정보',
    description: '송도 주민들의 생생한 생활 후기와 맛집 정보를 확인하세요. 송도 카페, 레스토랑, 쇼핑몰 후기부터 육아, 교육 정보까지 실제 거주자들의 솔직한 리뷰를 만나보세요.',
    keywords: ['송도 블로그', '송도 맛집', '송도 카페', '송도 생활', '송도 후기', '송도 육아', '송도 교육', '송도 쇼핑', '송도 레스토랑', '송도 주민'],
    canonicalPath: '/?category=블로그'
  },
  '유튜브': {
    title: '송도 유튜브 | 송도국제도시 영상 콘텐츠 및 vlog',
    description: '송도국제도시를 소개하는 영상 콘텐츠를 만나보세요. 송도 여행 vlog, 맛집 탐방, 카페 리뷰, 아파트 단지 소개 등 영상으로 보는 생생한 송도 이야기를 확인하세요.',
    keywords: ['송도 유튜브', '송도 영상', '송도 vlog', '송도 여행', '송도 맛집 영상', '송도 카페 영상', '송도 아파트', '송도 리뷰', '송도국제도시 영상'],
    canonicalPath: '/?category=유튜브'
  },
  '병원': {
    title: '송도 병원 | 송도국제도시 의료기관 및 응급실 정보',
    description: '송도국제도시 병원 및 의료기관 정보를 실시간으로 확인하세요. 길병원, 연세의료원 등 대형 병원부터 동네 의원까지, 진료과목별 병원 위치와 응급실 운영 현황을 제공합니다.',
    keywords: ['송도 병원', '송도 의료', '송도 응급실', '길병원', '연세의료원', '송도 내과', '송도 소아과', '송도 치과', '송도 산부인과', '송도 정형외과'],
    canonicalPath: '/?category=병원'
  },
  '약국': {
    title: '송도 약국 | 송도국제도시 24시간 약국 및 처방전 조제',
    description: '송도국제도시 약국 정보를 실시간으로 확인하세요. 24시간 운영 약국, 처방전 조제 가능 약국, 응급의약품 구비 현황 등 송도 주민에게 필요한 모든 약국 정보를 제공합니다.',
    keywords: ['송도 약국', '송도 24시간 약국', '송도 처방전', '송도 의약품', '송도 조제', '송도 응급약', '송도 한약', '송도 건강식품', '송도 의료용품'],
    canonicalPath: '/?category=약국'
  },
  '학원': {
    title: '송도 학원 | 송도국제도시 교육 및 학원 정보',
    description: '송도국제도시 학원 및 교육 정보를 확인하세요. 영어학원, 수학학원, 예체능 학원부터 국제학교, 외국인학교까지 송도 교육의 모든 정보를 한곳에서 제공합니다.',
    keywords: ['송도 학원', '송도 교육', '송도 영어학원', '송도 수학학원', '송도 국제학교', '송도 외국인학교', '송도 예체능', '송도 입시', '송도 과외', '송도 유치원'],
    canonicalPath: '/academy'
  }
} as const;

// 지역별 키워드 최적화
const REGIONAL_KEYWORDS = {
  primary: ['송도국제도시', '인천 연수구', '송도동'],
  secondary: ['센트럴파크', '국제업무지구', '인천1호선', '인천대입구역', '센트럴파크역'],
  tertiary: ['송도 커낼워크', '송도 트리플스트리트', '송도 더샵', '송도 웰카운티', '송도 아이파크']
};

/**
 * 카테고리별 고유 SEO 설정 생성
 */
export function generateCategorySEO(category: string): SEOConfig {
  const categoryKey = category as keyof typeof CATEGORY_CONTENT;
  const config = CATEGORY_CONTENT[categoryKey] || CATEGORY_CONTENT['전체'];
  
  // 지역 키워드 결합
  const enhancedKeywords = [
    ...config.keywords,
    ...REGIONAL_KEYWORDS.primary,
    ...REGIONAL_KEYWORDS.secondary.slice(0, 3) // 너무 많은 키워드 방지
  ];
  
  return {
    title: config.title,
    description: config.description,
    keywords: enhancedKeywords,
    canonicalUrl: `${BASE_URL}${config.canonicalPath}`,
    ogTitle: config.title,
    ogDescription: config.description,
    ogImage: `${BASE_URL}/og-image.jpg`,
    twitterTitle: config.title,
    twitterDescription: config.description.length > 200 
      ? config.description.substring(0, 197) + '...' 
      : config.description
  };
}

/**
 * 메타태그 동적 업데이트
 */
export function updateMetaTags(seoConfig: SEOConfig): void {
  // 제목 업데이트
  document.title = seoConfig.title;
  
  // 기본 메타태그 업데이트
  updateMetaTag('description', seoConfig.description);
  updateMetaTag('keywords', seoConfig.keywords.join(', '));
  
  // Open Graph 태그
  updateMetaTag('og:title', seoConfig.ogTitle, true);
  updateMetaTag('og:description', seoConfig.ogDescription, true);
  updateMetaTag('og:url', seoConfig.canonicalUrl, true);
  if (seoConfig.ogImage) {
    updateMetaTag('og:image', seoConfig.ogImage, true);
  }
  
  // Twitter Card 태그
  updateMetaTag('twitter:title', seoConfig.twitterTitle, true);
  updateMetaTag('twitter:description', seoConfig.twitterDescription, true);
  
  // Canonical URL 설정
  updateCanonicalUrl(seoConfig.canonicalUrl);
}

/**
 * 개별 메타태그 업데이트 헬퍼 함수
 */
function updateMetaTag(name: string, content: string, property = false): void {
  const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
  let tag = document.querySelector(selector) as HTMLMetaElement;
  
  if (!tag) {
    tag = document.createElement('meta');
    if (property) {
      tag.setAttribute('property', name);
    } else {
      tag.setAttribute('name', name);
    }
    document.head.appendChild(tag);
  }
  
  tag.setAttribute('content', content);
}

/**
 * Canonical URL 업데이트
 */
function updateCanonicalUrl(url: string): void {
  let canonicalTag = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
  
  if (!canonicalTag) {
    canonicalTag = document.createElement('link');
    canonicalTag.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalTag);
  }
  
  canonicalTag.setAttribute('href', url);
}

/**
 * 구조화된 데이터 업데이트
 */
export function updateStructuredData(id: string, data: Record<string, unknown>): void {
  let script = document.querySelector(`script[data-schema="${id}"]`);
  
  if (!script) {
    script = document.createElement('script');
    script.setAttribute('type', 'application/ld+json');
    script.setAttribute('data-schema', id);
    document.head.appendChild(script);
  }
  
  script.textContent = JSON.stringify(data);
}

/**
 * 카테고리별 브레드크럼 구조화 데이터 생성
 */
export function generateBreadcrumbStructuredData(category: string): Record<string, unknown> {
  const breadcrumbs = [
    { name: "홈", url: BASE_URL }
  ];

  if (category !== '전체') {
    const categoryConfig = CATEGORY_CONTENT[category as keyof typeof CATEGORY_CONTENT];
    if (categoryConfig) {
      breadcrumbs.push({
        name: category,
        url: `${BASE_URL}${categoryConfig.canonicalPath}`
      });
    }
  }

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
}

/**
 * 카테고리별 FAQ 구조화 데이터 생성
 */
export function generateCategoryFAQStructuredData(category: string): Record<string, unknown> {
  // 기본 송도 정보 FAQ (모든 카테고리에 포함)
  const baseFAQs = [
    {
      question: "송도국제도시는 어디에 위치하나요?",
      answer: "송도국제도시는 인천광역시 연수구 송도동에 위치한 계획도시입니다. 인천국제공항에서 차로 15분, 서울 강남에서 1시간 거리에 있습니다."
    },
    {
      question: "송도 센트럴파크는 무엇인가요?",
      answer: "센트럴파크는 송도국제도시의 중심에 위치한 대규모 공원으로, 해수를 이용한 인공호수와 다양한 문화시설이 있습니다. 수상택시, 사슴농장, 음악분수 등을 즐길 수 있습니다."
    },
    {
      question: "송도 지하철 노선은 어떻게 되나요?",
      answer: "송도는 인천지하철 1호선이 지나가며, 국제업무지구역, 센트럴파크역, 인천대입구역이 송도 지역 내 주요 역입니다. 2024년부터 GTX-B 노선도 건설 중입니다."
    }
  ];

  const categoryFAQs = {
    '뉴스': [
      {
        question: "송도 뉴스는 얼마나 자주 업데이트되나요?",
        answer: "송도국제도시 관련 뉴스는 매일 실시간으로 업데이트됩니다. 주요 정책 발표, 개발 현황, 지역 이벤트 등을 빠르게 확인할 수 있습니다."
      },
      {
        question: "송도 정책 뉴스는 어디서 확인할 수 있나요?",
        answer: "인천경제자유구역청, 인천시청, 연수구청의 공식 발표와 주요 언론사의 송도 관련 보도를 종합하여 제공합니다."
      }
    ],
    '블로그': [
      {
        question: "송도 맛집 블로그 정보는 신뢰할 수 있나요?",
        answer: "실제 송도 거주자들과 방문객들의 솔직한 후기를 바탕으로 한 블로그 정보를 수집하여 제공합니다. 다양한 관점의 리뷰를 통해 객관적인 정보를 확인할 수 있습니다."
      },
      {
        question: "송도 생활 정보는 어떤 내용을 다루나요?",
        answer: "송도 맛집, 카페, 쇼핑, 육아, 교육, 문화 시설 등 송도 주민들의 일상생활에 필요한 모든 정보를 블로그 형태로 제공합니다."
      }
    ],
    '유튜브': [
      {
        question: "송도 유튜브 영상은 어떤 내용인가요?",
        answer: "송도국제도시 소개, 맛집 탐방, 카페 리뷰, 아파트 단지 소개, 여행 vlog 등 송도를 영상으로 체험할 수 있는 다양한 콘텐츠를 제공합니다."
      }
    ],
    '병원': [
      {
        question: "송도 병원 정보는 실시간으로 업데이트되나요?",
        answer: "보건복지부 공공데이터와 각 의료기관의 공식 정보를 기반으로 매일 업데이트됩니다. 응급실 운영 현황, 진료 시간 등 실시간 정보를 제공합니다."
      }
    ],
    '약국': [
      {
        question: "송도 24시간 약국 정보를 확인할 수 있나요?",
        answer: "송도국제도시 내 24시간 운영 약국과 야간 응급 조제 가능한 약국 정보를 실시간으로 제공합니다."
      }
    ],
    '전체': [
      {
        question: "송도에는 어떤 쇼핑시설이 있나요?",
        answer: "트리플스트리트, 현대프리미엄아울렛 송도점, 코스트코 송도점 등 대형 쇼핑시설과 더불어 다양한 맛집과 카페가 집중되어 있습니다."
      },
      {
        question: "송도 부동산 시세는 어떤가요?",
        answer: "송도는 계획도시 특성상 신축 아파트가 많으며, 단지별로 다양한 가격대를 형성하고 있습니다. 정확한 시세는 국토교통부 실거래가 공개시스템에서 확인할 수 있습니다."
      }
    ]
  };

  const categorySpecificFAQs = categoryFAQs[category as keyof typeof categoryFAQs] || [];
  const faqList = [...baseFAQs, ...categorySpecificFAQs];

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqList.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}