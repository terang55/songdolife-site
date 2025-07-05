import { Metadata } from 'next';
import { BASE_URL } from './siteConfig';

// 인천논현동 관련 핵심 키워드 (서울 논현동과 구분)
export const CORE_KEYWORDS = [
  '인천논현동', '인천 논현동', '인천시 남동구 논현동', '남동구 논현동', '논현지구', '에코메트로',
  '인천논현역', '호구포역', '소래포구역', '수인분당선',
  '인천논현동 맛집', '인천논현동 카페', '인천논현동 부동산', '인천논현동 병원', '인천논현동 약국',
  '인천논현동 육아', '인천논현동 학원', '인천논현동 아파트', '소래포구', '호구포',
  '남동구 논현동 맛집', '남동구 논현동 부동산', '인천시 논현동'
];

// 지역별 키워드 맵핑 (서울 논현동과 구분)
export const LOCATION_KEYWORDS = {
  인천논현동: ['인천논현동', '인천 논현동', '인천시 남동구 논현동', '남동구 논현동', '논현지구'],
  에코메트로: ['에코메트로', '에코메트로 아파트', '인천논현 에코메트로'],
  소래포구: ['소래포구', '소래포구역', '소래포구 맛집'],
  호구포: ['호구포', '호구포역', '호구포 맛집'],
  인천논현역: ['인천논현역', '논현역', '수인분당선 논현역']
};

// 카테고리별 키워드 (서울 논현동과 구분)
export const CATEGORY_KEYWORDS = {
  뉴스: ['인천논현동 뉴스', '인천논현동 소식', '남동구 뉴스', '인천시 남동구 논현동 뉴스'],
  맛집: ['인천논현동 맛집', '인천논현동 맛집 추천', '논현지구 맛집', '에코메트로 맛집', '남동구 논현동 맛집'],
  카페: ['인천논현동 카페', '인천논현동 카페 추천', '인천논현역 카페', '소래포구 카페', '남동구 논현동 카페'],
  부동산: ['인천논현동 부동산', '인천논현동 아파트', '논현지구 아파트', '에코메트로 매매', '남동구 논현동 부동산'],
  의료: ['인천논현동 병원', '인천논현동 약국', '인천논현동 의료', '인천논현역 병원', '남동구 논현동 병원'],
  지하철: ['수인분당선', '인천논현역', '호구포역', '소래포구역', '지하철 시간표'],
  육아: ['인천논현동 육아', '인천논현동 어린이집', '인천논현동 학원', '인천논현동 초등학교', '남동구 논현동 육아']
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
  let dynamicKeywords = [...CORE_KEYWORDS];
  
  if (category && CATEGORY_KEYWORDS[category]) {
    dynamicKeywords.push(...CATEGORY_KEYWORDS[category]);
  }
  
  if (location && LOCATION_KEYWORDS[location]) {
    dynamicKeywords.push(...LOCATION_KEYWORDS[location]);
  }
  
  dynamicKeywords.push(...keywords);

  // 중복 제거
  const uniqueKeywords = [...new Set(dynamicKeywords)];

  // 기본 제목과 설명 (서울 논현동과 구분)
  const defaultTitle = '인천논현라이프 | 인천시 남동구 논현동 생활정보 플랫폼';
  const defaultDescription = '인천논현동 주민을 위한 실시간 뉴스·지하철·부동산·의료 정보 플랫폼. 에코메트로, 소래포구, 호구포 지역 맛집·카페·병원·약국 정보를 한눈에 확인하세요.';

  const finalTitle = title ? `${title} | 인천논현라이프` : defaultTitle;
  const finalDescription = description || defaultDescription;
  const currentUrl = `${BASE_URL}${path}`;

  return {
    title: finalTitle,
    description: finalDescription,
    keywords: uniqueKeywords,
    authors: [{ name: '인천논현라이프', url: BASE_URL }],
    creator: '인천논현라이프',
    publisher: '인천논현라이프',
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
      siteName: '인천논현라이프',
      title: finalTitle,
      description: finalDescription,
      images: [
        {
          url: `${BASE_URL}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: `${finalTitle} - 인천 남동구 논현동 생활정보`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: finalTitle,
      description: finalDescription,
      images: [`${BASE_URL}/og-image.jpg`],
      creator: '@nonhyeon_info',
    },
    alternates: {
      canonical: currentUrl,
    },
    other: {
      'last-modified': lastModified.toISOString(),
      'geo.region': 'KR-28',
      'geo.placename': '인천광역시 남동구 논현동',
      'geo.position': '37.3894;126.7317',
      'ICBM': '37.3894, 126.7317',
    },
  };
}

// 구조화된 데이터 생성 함수
export function generateStructuredData(type: string, data: any) {
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
      addressLocality: '남동구',
      streetAddress: '논현동'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 37.3894,
      longitude: 126.7317
    },
    areaServed: {
      '@type': 'Place',
      name: '인천광역시 남동구 논현동'
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
      name: article.author || '인천논현라이프'
    },
    publisher: {
      '@type': 'Organization',
      name: '인천논현라이프',
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
      addressLocality: '남동구'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: station.latitude,
      longitude: station.longitude
    }
  });
} 