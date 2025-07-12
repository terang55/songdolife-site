'use client';

import Head from 'next/head';
import { getDefaultImageAltText } from '@/lib/image-utils';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string[];
  canonicalUrl?: string;
  ogImage?: string;
  structuredData?: Record<string, unknown>;
  category?: string;
}

// Google Analytics(GA4) 하드코딩
const GA_ID = 'G-F2WTCGPWCK';
// Google Search Console site verification 하드코딩
const GOOGLE_VERIFICATION = 'boZhl5PMBpsnoWzLu-lTOSOGVvZhwawu6BTEkW3VduM';
const NAVER_VERIFICATION = '44c10a4e77ecf6146e4b0fed17a986909b229a38';

export default function SEOHead({
  title = "송도라이프 | 인천 연수구 송도국제도시 생활정보 플랫폼",
  description = "송도국제도시 주민을 위한 실시간 뉴스·지하철·부동산·병원·약국 정보 플랫폼. 센트럴파크, 인천1호선, 송도동 모든 생활정보를 한곳에서 확인하세요.",
  keywords = [],
  canonicalUrl = "https://songdo.life",
  ogImage = "https://songdo.life/og-image.jpg",
  structuredData,
  category = "전체"
}: SEOHeadProps) {
  
  const defaultKeywords = [
    "송도국제도시", "송도동", "인천 연수구", "센트럴파크", "인천1호선",
    "송도 맛집", "송도 카페", "송도 부동산", "송도 병원", "송도 약국",
    "송도 생활정보", "송도 뉴스", "송도 교통", "송도 육아"
  ];
  
  const allKeywords = [...defaultKeywords, ...keywords];
  
  // 카테고리별 동적 제목 생성
  const dynamicTitle = category === '전체' 
    ? title 
    : `송도라이프 | ${category} 정보 - 송도국제도시`;
    
  // 카테고리별 동적 설명 생성
  const dynamicDescription = category === '전체'
    ? description
    : `송도국제도시 ${category} 정보를 실시간으로 확인하세요. 송도동 지역의 최신 ${category} 소식과 정보를 한곳에서 제공합니다.`;

  return (
    <Head>
      {/* 기본 메타 태그 */}
      <title>{dynamicTitle}</title>
      <meta name="description" content={dynamicDescription} />
      <meta name="keywords" content={allKeywords.join(", ")} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="robots" content="index,follow" />
      <meta name="author" content="송도라이프" />
      <meta name="publisher" content="송도라이프" />
      <meta name="copyright" content="송도라이프" />
      <meta name="language" content="ko" />
      <meta name="revisit-after" content="1 days" />
      <meta httpEquiv="content-language" content="ko" />
      
      {/* Open Graph */}
      <meta property="og:title" content={dynamicTitle} />
      <meta property="og:description" content={dynamicDescription} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={getDefaultImageAltText('og')} />
      <meta property="og:locale" content="ko_KR" />
      <meta property="og:site_name" content="송도라이프" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@songdo_life" />
      <meta name="twitter:creator" content="@songdo_life" />
      <meta name="twitter:title" content={dynamicTitle} />
      <meta name="twitter:description" content={dynamicDescription} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* 정규 URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* 지역 정보 */}
      <meta name="geo.region" content="KR-28" />
      <meta name="geo.placename" content="인천광역시 연수구 송도동" />
      <meta name="geo.position" content="37.538603;126.722675" />
      <meta name="ICBM" content="37.538603, 126.722675" />
      
      {/* 네이버 최적화 */}
      <meta name="naver-site-verification" content={NAVER_VERIFICATION} />
      
      {/* 구조화된 데이터 */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData)
          }}
        />
      )}

      {/* Google Search Console site verification */}
      <meta name="google-site-verification" content={GOOGLE_VERIFICATION} />
      {/* Google Analytics(GA4) */}
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `,
        }}
      />
    </Head>
  );
} 