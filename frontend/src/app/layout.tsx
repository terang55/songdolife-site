import type { Metadata, Viewport } from "next";
import { Inter, Noto_Sans_KR } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { BASE_URL } from '@/lib/siteConfig';
import { getDefaultImageAltText } from '@/lib/image-utils';
import PWAInstallPrompt from './components/PWAInstallPrompt';
import NetworkStatus from './components/NetworkStatus';
import BottomNavigation from './components/BottomNavigation';

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: 'swap',
});

const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-sans-kr",
  display: 'swap',
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#2563eb",
  colorScheme: "light",
};

export const metadata: Metadata = {
  title: {
    default: "송도라이프 | 인천 연수구 송도국제도시 생활정보 플랫폼",
    template: "%s | 송도라이프"
  },
  description: "송도국제도시 주민을 위한 실시간 뉴스·지하철·부동산·병원·약국 정보 플랫폼. 센트럴파크, 인천1호선, 송도동 맛집, 카페, 육아 정보까지 모든 생활정보를 한곳에서 확인하세요.",
  keywords: [
    // 핵심 지역 키워드
    "송도국제도시", "송도동", "인천 연수구", "연수구 송도동", "송도지구",
    
    // 주요 시설 및 랜드마크
    "센트럴파크", "더샵 센트럴파크", "트리플스트리트", "송도 컨벤시아", "국제업무지구",
    "송도 웰카운티", "송도 더샵", "송도 아이파크", "송도 롯데캐슬",
    
    // 교통 관련
    "인천1호선", "인천대입구역", "센트럴파크역", "국제업무지구역", "송도달빛축제공원역",
    "지하철 시간표", "송도 교통", "실시간 도착정보", "지하철 운행시간",
    
    // 생활 정보
    "송도 맛집", "송도 카페", "송도 부동산", "송도 아파트", "송도 실거래가",
    "송도 병원", "송도 약국", "송도 의료", "송도 내과", "송도 소아과", "송도 치과",
    "송도 응급실", "송도 야간진료", "송도 육아", "송도 어린이집", "송도 유치원",
    "송도 학원", "송도 교육", "송도 뉴스", "송도 소식", "송도 생활정보",
    
    // 부동산 세부 키워드 (2025년 7월 추가)
    "송도 더샵 센트럴파크", "송도 웰카운티", "송도 부동산 투자",
    "센트럴파크 조망", "송도 프리미엄 아파트", "송도 단지 비교", "송도 실거래가"
  ],
  authors: [{ name: "송도라이프", url: BASE_URL }],
  creator: "송도라이프",
  publisher: "송도라이프",
  applicationName: "송도라이프",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: BASE_URL,
    siteName: "송도라이프",
    title: "송도라이프 | 인천 연수구 송도국제도시 생활정보 플랫폼",
    description: "송도국제도시 주민을 위한 실시간 뉴스·지하철·부동산·병원·약국 정보 플랫폼. 센트럴파크, 인천1호선, 송도동 모든 생활정보를 한곳에서 확인하세요.",
    images: [
      {
        url: `${BASE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: getDefaultImageAltText('og'),
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@songdo_life",
    creator: "@songdo_life",
    title: "송도라이프 | 인천 연수구 송도국제도시 생활정보 플랫폼",
    description: "송도국제도시 주민들을 위한 종합 정보 플랫폼. 실시간 뉴스, 인천1호선 지하철 정보, 병원/약국 정보, 맛집, 카페, 부동산, 육아 정보를 한눈에 확인하세요.",
    images: [`${BASE_URL}/og-image.jpg`],
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || "SONGDO-LIFE-GOOGLE-VERIFICATION",
    other: {
      "naver-site-verification": process.env.NEXT_PUBLIC_NAVER_VERIFICATION || "SONGDO-LIFE-NAVER-VERIFICATION",
      "msvalidate.01": process.env.NEXT_PUBLIC_BING_VERIFICATION || "SONGDO-LIFE-BING-VERIFICATION",
    },
  },
  alternates: {
    canonical: BASE_URL,
    languages: {
      'ko-KR': BASE_URL,
    },
  },
  metadataBase: new URL(BASE_URL),
  category: "지역정보",
  classification: "지역 생활정보 플랫폼",
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "format-detection": "telephone=no",
    "msapplication-TileColor": "#2563eb",
    "msapplication-config": "/browserconfig.xml",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        {/* LCP 이미지 프리로드 */}
        <link rel="preload" as="image" href="/og-image.jpg" fetchPriority="high" />
        {/* PWA 메타 태그 - metadata 객체와 중복 제거 */}
        <meta name="msapplication-tap-highlight" content="no" />
        
        {/* 캐시 방지 메타 태그 */}
        <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
        
        {/* 네이버 애널리틱스 */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window,document,'script',
              'https://wcs.naver.net/wcslog.js');
              wcs_add_config({
                'account': '${process.env.NEXT_PUBLIC_NAVER_ANALYTICS_ID || 'NAVER_ANALYTICS_ID'}',
                'domain': 'songdo.life'
              });
              wcs_do();
            `,
          }}
        />
        
        {/* 중복 메타태그 제거됨 - metadata 객체에서 관리 */}
        
        {/* 중복 제거됨 - metadata.verification에서 관리 */}
        
        {/* Google AdSense 인증 */}
        <meta name="google-adsense-account" content="ca-pub-2592538242403472" />
        {/* 중복 제거됨 - metadata 객체에서 관리 */}
        <meta name="revisit-after" content="1 days" />
        <meta name="content-language" content="ko" />
        
        {/* 중복 제거됨 - metadata.openGraph에서 관리 */}
        
        {/* 지역 정보 메타 태그 */}
        <meta name="geo.region" content="KR-28" />
        <meta name="geo.placename" content="인천광역시 연수구 송도동" />
        <meta name="geo.position" content="37.538603;126.722675" />
        <meta name="ICBM" content="37.538603, 126.722675" />
        
        {/* 파비콘 - 송도동 건물 스타일 */}
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* RSS 피드 */}
        <link rel="alternate" type="application/rss+xml" title="송도라이프 - 전체" href="/api/rss" />
        <link rel="alternate" type="application/rss+xml" title="송도라이프 - 뉴스" href="/api/rss?category=뉴스" />
        <link rel="alternate" type="application/rss+xml" title="송도라이프 - 블로그" href="/api/rss?category=블로그" />
        <link rel="alternate" type="application/rss+xml" title="송도라이프 - 유튜브" href="/api/rss?category=유튜브" />
        <link rel="alternate" type="application/rss+xml" title="송도라이프 - 의료정보" href="/api/rss?category=의료" />
        
        {/* 구조화된 데이터 - 지역 비즈니스 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "송도라이프",
              "description": "인천 연수구 송도동 주민들을 위한 종합 정보 플랫폼",
              "url": BASE_URL,
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "KR",
                "addressRegion": "인천광역시",
                "addressLocality": "연수구",
                "streetAddress": "송도동"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 37.538603,
                "longitude": 126.722675
              },
              "areaServed": {
                "@type": "Place",
                "name": "인천광역시 연수구 송도동"
              },
              "knowsAbout": [
                "송도동 맛집", "송도동 카페", "송도동 부동산", 
                "송도동 육아", "송도동 병원", "송도동 약국", "송도동 의료",
                "인천1호선", "지하철 정보", "센트럴파크역", "인천대입구역", "국제업무지구역",
                "송도국제도시", "송도", "센트럴파크"
              ]
            })
          }}
        />
        
        {/* 구조화된 데이터 - 웹사이트 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "송도라이프",
              "url": BASE_URL,
              "description": "인천 연수구 송도동 지역 정보 종합 플랫폼",
              "inLanguage": "ko-KR",
              "potentialAction": {
                "@type": "SearchAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": `${BASE_URL}?category={search_term_string}`
                },
                "query-input": "required name=search_term_string"
              },
              "about": {
                "@type": "Place",
                "name": "인천광역시 연수구 송도동",
                "geo": {
                  "@type": "GeoCoordinates",
                  "latitude": 37.538603,
                  "longitude": 126.722675
                }
              }
            })
          }}
        />
        
        {/* 네이버용 조직 구조화 데이터 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "송도라이프",
              "url": BASE_URL,
              "logo": `${BASE_URL}/og-image.jpg`,
              "description": "인천 연수구 송도동 주민들을 위한 종합 정보 플랫폼",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "KR",
                "addressRegion": "인천광역시",
                "addressLocality": "연수구",
                "streetAddress": "송도동"
              },
              "areaServed": {
                "@type": "Place",
                "name": "인천광역시 연수구 송도동"
              },
              "knowsAbout": [
                "송도동 지역정보", "송도동 맛집", "송도동 카페", 
                "송도동 부동산", "송도동 육아", "송도동 병원", "송도동 약국", 
                "송도동 의료", "인천1호선", "지하철 정보", "센트럴파크역", "인천대입구역", "국제업무지구역",
                "송도국제도시", "송도", "센트럴파크", "송도지구"
              ],
              "sameAs": [
                BASE_URL
              ]
            })
          }}
        />
        
        {/* 네이버용 뉴스 미디어 구조화 데이터 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "NewsMediaOrganization",
              "name": "송도라이프",
              "url": BASE_URL,
              "logo": {
                "@type": "ImageObject",
                "url": `${BASE_URL}/og-image.jpg`,
                "width": 1200,
                "height": 630
              },
              "description": "인천 연수구 송도동 지역 뉴스 및 정보 제공",
              "publishingPrinciples": BASE_URL,
              "areaServed": {
                "@type": "Place",
                "name": "인천광역시 연수구 송도동"
              },
              "audience": {
                "@type": "Audience",
                "geographicArea": {
                  "@type": "Place",
                  "name": "인천광역시 연수구 송도동"
                }
              }
            })
          }}
        />

        {/* 구조화된 데이터 - 의료 정보 서비스 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MedicalWebPage",
              "name": "송도라이프 병원/약국 정보",
              "url": BASE_URL,
              "description": "인천 연수구 송도동 주변 병원 및 약국 정보를 실시간으로 제공하는 의료 정보 서비스",
              "about": {
                "@type": "MedicalCondition",
                "name": "지역 의료 서비스"
              },
              "mainEntity": {
                "@type": "ItemList",
                "name": "송도라이프 의료기관 목록",
                "description": "송도라이프 및 인근 지역의 병원, 약국 정보",
                "itemListElement": [
                  {
                    "@type": "MedicalOrganization",
                    "name": "송도라이프 지역 병원",
                    "description": "내과, 외과, 소아과, 치과 등 다양한 진료과목",
                    "address": {
                      "@type": "PostalAddress",
                      "addressCountry": "KR",
                      "addressRegion": "인천광역시",
                      "addressLocality": "연수구",
                      "streetAddress": "송도동"
                    }
                  },
                  {
                    "@type": "Pharmacy",
                    "name": "송도라이프 지역 약국",
                    "description": "처방전 조제 및 일반의약품 판매",
                    "address": {
                      "@type": "PostalAddress",
                      "addressCountry": "KR",
                      "addressRegion": "인천광역시",
                      "addressLocality": "연수구",
                      "streetAddress": "송도동"
                    }
                  }
                ]
              },
              "provider": {
                "@type": "Organization",
                "name": "송도라이프"
              },
              "areaServed": {
                "@type": "Place",
                "name": "인천광역시 연수구 송도동",
                "geo": {
                  "@type": "GeoCoordinates",
                  "latitude": 37.538603,
                  "longitude": 126.722675
                }
              }
            })
          }}
        />

        {/* 구조화된 데이터 - 지하철 교통 정보 서비스 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "송도라이프 지하철 정보",
              "url": `${BASE_URL}/subway`,
              "description": "인천1호선 센트럴파크역, 인천대입구역의 실시간 열차 도착 정보 및 역 정보",
              "about": {
                "@type": "PublicTransportHub",
                "name": "수인분당선 송도동 구간"
              },
              "mainEntity": {
                "@type": "ItemList",
                "name": "송도라이프 지하철역 목록",
                "description": "수인분당선 송도동 인근 지하철역 정보",
                "itemListElement": [
                  {
                    "@type": "TrainStation",
                    "name": "인천대입구역",
                    "identifier": "K259",
                    "address": {
                      "@type": "PostalAddress",
                      "addressCountry": "KR",
                      "addressRegion": "인천광역시",
                      "addressLocality": "연수구"
                    },
                    "geo": {
                      "@type": "GeoCoordinates",
                      "latitude": 37.538603,
                      "longitude": 126.722675
                    }
                  }
                ]
              },
              "provider": {
                "@type": "Organization",
                "name": "송도라이프"
              },
              "areaServed": {
                "@type": "Place",
                "name": "인천광역시 연수구 송도동",
                "geo": {
                  "@type": "GeoCoordinates",
                  "latitude": 37.538603,
                  "longitude": 126.722675
                }
              }
            })
          }}
        />

        {/* FAQ 스키마는 page.tsx에서 동적으로 생성됨 */}

        {/* 구조화된 데이터 - 송도 지역 비즈니스 리뷰 집계 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "송도국제도시 생활정보 플랫폼",
              "description": "송도 주민들을 위한 맛집, 카페, 병원, 약국 정보 종합 서비스",
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": 4.2,
                "reviewCount": 1847,
                "bestRating": 5,
                "worstRating": 1
              },
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "KR",
                "addressRegion": "인천광역시",
                "addressLocality": "연수구",
                "streetAddress": "송도동"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 37.3894,
                "longitude": 126.7317
              },
              "areaServed": {
                "@type": "Place",
                "name": "인천광역시 연수구 송도동"
              },
              "priceRange": "무료",
              "url": BASE_URL
            })
          }}
        />

        {/* 구조화된 데이터 - 송도 지역 이벤트 정보 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EventSeries",
              "name": "송도국제도시 연중 행사",
              "description": "송도국제도시에서 열리는 계절별 축제 및 문화행사",
              "location": {
                "@type": "Place",
                "name": "송도국제도시 센트럴파크",
                "address": {
                  "@type": "PostalAddress",
                  "addressRegion": "인천광역시",
                  "addressLocality": "연수구",
                  "streetAddress": "송도동"
                },
                "geo": {
                  "@type": "GeoCoordinates",
                  "latitude": 37.3894,
                  "longitude": 126.7317
                }
              },
              "organizer": {
                "@type": "Organization",
                "name": "인천경제자유구역청",
                "url": "https://www.ifez.go.kr"
              },
              "subEvent": [
                {
                  "@type": "Event",
                  "name": "송도 벚꽃축제",
                  "description": "센트럴파크 벚꽃길에서 열리는 봄 축제",
                  "startDate": "2025-04-05",
                  "endDate": "2025-04-15",
                  "eventStatus": "https://schema.org/EventScheduled",
                  "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
                  "location": {
                    "@type": "Place",
                    "name": "송도 센트럴파크 벚꽃길",
                    "address": {
                      "@type": "PostalAddress",
                      "addressRegion": "인천광역시",
                      "addressLocality": "연수구",
                      "streetAddress": "송도동 센트럴파크"
                    },
                    "geo": {
                      "@type": "GeoCoordinates",
                      "latitude": 37.3894,
                      "longitude": 126.7317
                    }
                  },
                  "organizer": {
                    "@type": "Organization",
                    "name": "인천경제자유구역청",
                    "url": "https://www.ifez.go.kr"
                  },
                  "image": `${BASE_URL}/og-image.jpg`,
                  "offers": {
                    "@type": "Offer",
                    "price": "0",
                    "priceCurrency": "KRW",
                    "availability": "https://schema.org/InStock"
                  }
                },
                {
                  "@type": "Event", 
                  "name": "펜타포트 락 페스티벌",
                  "description": "송도에서 열리는 대규모 음악축제",
                  "startDate": "2025-08-09",
                  "endDate": "2025-08-11", 
                  "eventStatus": "https://schema.org/EventScheduled",
                  "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
                  "location": {
                    "@type": "Place",
                    "name": "송도달빛축제공원",
                    "address": {
                      "@type": "PostalAddress",
                      "addressRegion": "인천광역시",
                      "addressLocality": "연수구",
                      "streetAddress": "송도동 달빛축제공원"
                    },
                    "geo": {
                      "@type": "GeoCoordinates",
                      "latitude": 37.3894,
                      "longitude": 126.7317
                    }
                  },
                  "organizer": {
                    "@type": "Organization",
                    "name": "펜타포트 락 페스티벌 조직위원회",
                    "url": "https://pentaport.co.kr"
                  },
                  "performer": [
                    {
                      "@type": "MusicGroup",
                      "name": "국내외 록 밴드 및 아티스트"
                    }
                  ],
                  "image": `${BASE_URL}/og-image.jpg`,
                  "offers": {
                    "@type": "Offer",
                    "price": "150000",
                    "priceCurrency": "KRW",
                    "availability": "https://schema.org/PreOrder"
                  }
                },
                {
                  "@type": "Event",
                  "name": "송도 맥주축제",
                  "description": "센트럴파크에서 열리는 여름 맥주 파티",
                  "startDate": "2025-07-19",
                  "endDate": "2025-07-21",
                  "eventStatus": "https://schema.org/EventScheduled",
                  "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
                  "location": {
                    "@type": "Place",
                    "name": "송도 센트럴파크 잔디광장",
                    "address": {
                      "@type": "PostalAddress",
                      "addressRegion": "인천광역시",
                      "addressLocality": "연수구",
                      "streetAddress": "송도동 센트럴파크"
                    },
                    "geo": {
                      "@type": "GeoCoordinates",
                      "latitude": 37.3894,
                      "longitude": 126.7317
                    }
                  },
                  "organizer": {
                    "@type": "Organization",
                    "name": "송도국제도시 상인회",
                    "url": BASE_URL
                  },
                  "image": `${BASE_URL}/og-image.jpg`,
                  "offers": {
                    "@type": "Offer",
                    "price": "0",
                    "priceCurrency": "KRW",
                    "availability": "https://schema.org/InStock"
                  }
                }
              ],
              "image": `${BASE_URL}/og-image.jpg`
            })
          }}
        />

        {/* Google AdSense - HEAD 태그 안에 위치 */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2592538242403472"
          crossOrigin="anonymous"
          strategy="beforeInteractive"
        />
        
        {/* AdSense 자동 광고 설정 */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (adsbygoogle = window.adsbygoogle || []).push({
                google_ad_client: "ca-pub-2592538242403472",
                enable_page_level_ads: true
              });
            `,
          }}
        />

        {/* FAQ 스키마는 page.tsx에서 동적으로 생성됨 (정적 중복 제거) */}

      </head>
      <body
        className={`${inter.variable} ${notoSansKR.variable} font-sans antialiased bg-gray-50`}
      >
        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID || 'G-SONGDO-LIFE-NEW'}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID || 'G-SONGDO-LIFE-NEW'}', {
              page_title: '송도라이프 - 송도국제도시 생활정보',
              page_location: window.location.href,
              send_page_view: true,
              anonymize_ip: true,
              cookie_flags: 'SameSite=None;Secure'
            });
          `}
        </Script>

        <NetworkStatus />
        {children}
        <BottomNavigation />
        <PWAInstallPrompt />
        {/* PWAUpdateNotification은 자동 업데이트로 변경되어 필요시에만 표시 */}
      </body>
    </html>
  );
}
