import { Metadata } from 'next';
import { BASE_URL } from './siteConfig';

// 인천송도국제도시 관련 핵심 키워드 (서울 송도동과 구분)
export const CORE_KEYWORDS = [
  '송도', '송도동', '송도국제도시', '인천 송도동', '인천 송도국제도시', '연수구 송도동',
  '송도역', '국제업무지구역', '센트럴파크역', '인천대입구역',
  '송도 맛집', '송도 카페', '송도 부동산', '송도 병원', '송도 약국',
  '송도 육아', '송도 학원', '송도 아파트', '송도 더샵', '송도 트리플스트리트',
  '연수구 송도동 맛집', '연수구 송도동 부동산', '인천시 송도동'
];

// 지역별 키워드 맵핑 (서울 송도동과 구분)
export const LOCATION_KEYWORDS = {
  송도: ['송도', '송도동', '송도국제도시', '인천 송도동', '연수구 송도동'],
  더샵: ['더샵', '송도 더샵', '송도 더샵 아파트'],
  센트럴파크: ['센트럴파크', '센트럴파크역', '송도 센트럴파크'],
  국제업무지구: ['국제업무지구', '국제업무지구역', '송도 국제업무지구'],
  인천대입구: ['인천대입구역', '경인교대입구역', '인천대학교']
};

// 카테고리별 키워드 (서울 송도동과 구분)
export const CATEGORY_KEYWORDS = {
  뉴스: ['송도 뉴스', '송도 소식', '연수구 뉴스', '인천시 연수구 송도 뉴스'],
  맛집: ['송도 맛집', '송도 맛집 추천', '송도동 맛집', '더샵 맛집', '연수구 송도동 맛집'],
  카페: ['송도 카페', '송도 카페 추천', '송도국제도시 카페', '센트럴파크 카페', '연수구 송도동 카페'],
  부동산: ['송도 부동산', '송도 아파트', '송도국제도시 아파트', '더샵 매매', '연수구 송도동 부동산'],
  의료: ['송도 병원', '송도 약국', '송도 의료', '송도국제도시 병원', '연수구 송도동 병원'],
  지하철: ['인천1호선', '인천대입구역', '국제업무지구역', '센트럴파크역', '지하철 시간표'],
  육아: ['송도 육아', '송도 어린이집', '송도 학원', '송도 초등학교', '연수구 송도동 육아']
};

// SEO 메타데이터 생성 함수
export function generateSEOMetadata(params: {
  title?: string;
  description?: string;
  keywords?: string[];
  category?: keyof typeof CATEGORY_KEYWORDS;
  location?: keyof typeof LOCATION_KEYWORDS;
  path?: string;
  lastModified?: Date;
}): Metadata {
  const {
    title,
    description,
    keywords = [],
    category,
    location,
    path = '',
    lastModified = new Date()
  } = params;

  // 동적 키워드 생성
  const dynamicKeywords: string[] = [...CORE_KEYWORDS];
  
  if (category && CATEGORY_KEYWORDS[category]) {
    dynamicKeywords.push(...CATEGORY_KEYWORDS[category]);
  }
  
  if (location && LOCATION_KEYWORDS[location]) {
    dynamicKeywords.push(...LOCATION_KEYWORDS[location]);
  }
  
  dynamicKeywords.push(...keywords);

  // 중복 제거
  const uniqueKeywords = [...new Set(dynamicKeywords)];

  // 기본 제목과 설명 (서울 송도동과 구분)
  const defaultTitle = '송도라이프 | 인천시 연수구 송도동 생활정보 플랫폼';
  const defaultDescription = '송도국제도시 주민을 위한 실시간 뉴스·지하철·부동산·의료 정보 플랫폼. 더샵, 센트럴파크, 트리플스트리트, 현대프리미엄아울렛 등 송도 지역 맛집·카페·병원·약국 정보를 한눈에 확인하세요.';

  const finalTitle = title ? `${title} | 송도라이프` : defaultTitle;
  const finalDescription = description || defaultDescription;
  const currentUrl = `${BASE_URL}${path}`;

  return {
    title: finalTitle,
    description: finalDescription,
    keywords: uniqueKeywords,
    authors: [{ name: '송도라이프', url: BASE_URL }],
    creator: '송도라이프',
    publisher: '송도라이프',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: 'website',
      locale: 'ko_KR',
      url: currentUrl,
      siteName: '송도라이프',
      title: finalTitle,
      description: finalDescription,
      images: [
        {
          url: `${BASE_URL}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: `${finalTitle} - 인천 연수구 송도동 생활정보`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: finalTitle,
      description: finalDescription,
      images: [`${BASE_URL}/og-image.jpg`],
      creator: '@songdo_life',
    },
    alternates: {
      canonical: currentUrl,
    },
    other: {
      'last-modified': lastModified.toISOString(),
      'geo.region': 'KR-28',
      'geo.placename': '인천광역시 연수구 송도동',
      'geo.position': '37.538603;126.722675',
      'ICBM': '37.538603, 126.722675',
    },
  };
}

// 구조화된 데이터 생성 함수
export function generateStructuredData<T extends Record<string, unknown>>(type: string, data: T) {
  const baseStructure = {
    '@context': 'https://schema.org',
    '@type': type,
    ...data
  };

  return JSON.stringify(baseStructure);
}

// 지역 비즈니스 구조화 데이터
export function generateLocalBusinessSchema(name: string, description: string) {
  return generateStructuredData('LocalBusiness', {
    name,
    description,
    url: BASE_URL,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'KR',
      addressRegion: '인천광역시',
      addressLocality: '연수구',
      streetAddress: '송도동'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 37.3894,
      longitude: 126.7317
    },
    areaServed: {
      '@type': 'Place',
      name: '인천광역시 연수구 송도동'
    }
  });
}

// 기사/뉴스 구조화 데이터
export function generateArticleSchema(article: {
  headline: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
  image?: string;
}) {
  return generateStructuredData('Article', {
    headline: article.headline,
    description: article.description,
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    author: {
      '@type': 'Organization',
      name: article.author || '송도라이프'
    },
    publisher: {
      '@type': 'Organization',
      name: '송도라이프',
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/android-chrome-512x512.png`
      }
    },
    image: article.image || `${BASE_URL}/og-image.jpg`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': BASE_URL
    }
  });
}

// FAQ 구조화 데이터
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return generateStructuredData('FAQPage', {
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  });
}

// 지하철역 구조화 데이터
export function generateTrainStationSchema(station: {
  name: string;
  identifier: string;
  latitude: number;
  longitude: number;
}) {
  return generateStructuredData('TrainStation', {
    name: station.name,
    identifier: station.identifier,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'KR',
      addressRegion: '인천광역시',
      addressLocality: '연수구'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 37.538603,
      longitude: 126.722675
    }
  });
} 

// BreadcrumbList 구조화 데이터 생성 함수
export function generateBreadcrumbSchema(crumbs: Array<{ name: string; path: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: c.name,
      item: `${BASE_URL}${c.path}`
    }))
  };
} 