import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "논현동 정보 허브 | 인천 남동구 논현동 지역 정보",
    template: "%s | 논현동 정보 허브"
  },
  description: "인천 남동구 논현동 주민들을 위한 종합 정보 플랫폼. 실시간 뉴스, 맛집, 카페, 부동산, 육아, 교통 정보를 한눈에 확인하세요. 에코메트로, 소래포구, 호구포 정보까지!",
  keywords: [
    "논현동", "인천 논현동", "남동구 논현동", "논현지구", "에코메트로",
    "논현동 맛집", "논현동 카페", "논현동 부동산", "논현동 육아",
    "소래포구", "호구포", "논현동 정보", "논현동 뉴스", "논현동 생활정보",
    "인천 남동구", "논현동 아파트", "논현동 교통", "논현동 병원", "논현동 학원"
  ],
  authors: [{ name: "논현동 정보 허브", url: "https://nonhyeon-info-site.vercel.app" }],
  creator: "논현동 정보 허브",
  publisher: "논현동 정보 허브",
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
    type: "website",
    locale: "ko_KR",
    url: "https://nonhyeon-info-site.vercel.app",
    siteName: "논현동 정보 허브",
    title: "논현동 정보 허브 | 인천 남동구 논현동 지역 정보",
    description: "인천 남동구 논현동 주민들을 위한 종합 정보 플랫폼. 실시간 뉴스, 맛집, 카페, 부동산, 육아 정보를 한눈에 확인하세요.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "논현동 정보 허브 - 인천 남동구 논현동 지역 정보",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "논현동 정보 허브 | 인천 남동구 논현동 지역 정보",
    description: "인천 남동구 논현동 주민들을 위한 종합 정보 플랫폼. 실시간 뉴스, 맛집, 카페, 부동산, 육아 정보를 한눈에 확인하세요.",
    images: ["/og-image.jpg"],
    creator: "@nonhyeon_info",
  },
  verification: {
    google: "e3VR6BkZXX1VtX4dm2Zx6q0L2bgHC1FFCPHpnJ6n_hI", // Google Search Console 인증 코드
    other: {
      "naver-site-verification": "naver-verification-code", // 네이버 서치어드바이저 코드
    },
  },
  alternates: {
    canonical: "https://nonhyeon-info-site.vercel.app",
  },
  category: "지역정보",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        
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
                'account': 'NAVER_ANALYTICS_ID',
                'domain': 'nonhyeon-info-site.vercel.app'
              });
              wcs_do();
            `,
          }}
        />
        
        {/* 추가 SEO 메타 태그 */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#2563eb" />
        <meta name="msapplication-TileColor" content="#2563eb" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="논현동정보허브" />
        
        {/* 네이버 SEO 최적화 메타 태그 */}
        <meta name="naver-site-verification" content="6f6f6592110192cd2491d3c5bf4133592c100558" />
        
        {/* Google AdSense 인증 */}
        <meta name="google-adsense-account" content="ca-pub-2592538242403472" />
        <meta name="description" content="인천 남동구 논현동 주민들을 위한 종합 정보 플랫폼. 실시간 뉴스, 맛집, 카페, 부동산, 육아, 교통 정보를 한눈에 확인하세요." />
        <meta name="keywords" content="논현동,인천논현동,남동구논현동,논현지구,에코메트로,논현동맛집,논현동카페,논현동부동산,논현동육아,소래포구,호구포" />
        <meta name="author" content="논현동 정보 허브" />
        <meta name="publisher" content="논현동 정보 허브" />
        <meta name="copyright" content="논현동 정보 허브" />
        <meta name="robots" content="index,follow" />
        <meta name="revisit-after" content="1 days" />
        <meta name="content-language" content="ko" />
        
        {/* Open Graph for Naver */}
        <meta property="og:locale" content="ko_KR" />
        <meta property="og:site_name" content="논현동 정보 허브" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="논현동 정보 허브 | 인천 남동구 논현동 지역 정보" />
        <meta property="og:description" content="인천 남동구 논현동 주민들을 위한 종합 정보 플랫폼. 실시간 뉴스, 맛집, 카페, 부동산, 육아 정보를 한눈에 확인하세요." />
        <meta property="og:url" content="https://nonhyeon-info-site.vercel.app" />
        <meta property="og:image" content="https://nonhyeon-info-site.vercel.app/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="논현동 정보 허브 - 인천 남동구 논현동 지역 정보" />
        
        {/* 지역 정보 메타 태그 */}
        <meta name="geo.region" content="KR-28" />
        <meta name="geo.placename" content="인천광역시 남동구 논현동" />
        <meta name="geo.position" content="37.3894;126.7317" />
        <meta name="ICBM" content="37.3894, 126.7317" />
        
        {/* 파비콘 */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* RSS 피드 */}
        <link rel="alternate" type="application/rss+xml" title="논현동 정보 허브 - 전체" href="/api/rss" />
        <link rel="alternate" type="application/rss+xml" title="논현동 정보 허브 - 뉴스" href="/api/rss?category=뉴스" />
        <link rel="alternate" type="application/rss+xml" title="논현동 정보 허브 - 블로그" href="/api/rss?category=블로그" />
        <link rel="alternate" type="application/rss+xml" title="논현동 정보 허브 - 유튜브" href="/api/rss?category=유튜브" />
        
        {/* 구조화된 데이터 - 지역 비즈니스 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "논현동 정보 허브",
              "description": "인천 남동구 논현동 주민들을 위한 종합 정보 플랫폼",
              "url": "https://nonhyeon-info-site.vercel.app",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "KR",
                "addressRegion": "인천광역시",
                "addressLocality": "남동구",
                "streetAddress": "논현동"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 37.3894,
                "longitude": 126.7317
              },
              "areaServed": {
                "@type": "Place",
                "name": "인천광역시 남동구 논현동"
              },
              "knowsAbout": [
                "논현동 맛집", "논현동 카페", "논현동 부동산", 
                "논현동 육아", "에코메트로", "소래포구", "호구포"
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
              "name": "논현동 정보 허브",
              "url": "https://nonhyeon-info-site.vercel.app",
              "description": "인천 남동구 논현동 지역 정보 종합 플랫폼",
              "inLanguage": "ko-KR",
              "potentialAction": {
                "@type": "SearchAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": "https://nonhyeon-info-site.vercel.app?category={search_term_string}"
                },
                "query-input": "required name=search_term_string"
              },
              "about": {
                "@type": "Place",
                "name": "인천광역시 남동구 논현동",
                "geo": {
                  "@type": "GeoCoordinates",
                  "latitude": 37.3894,
                  "longitude": 126.7317
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
              "name": "논현동 정보 허브",
              "url": "https://nonhyeon-info-site.vercel.app",
              "logo": "https://nonhyeon-info-site.vercel.app/og-image.jpg",
              "description": "인천 남동구 논현동 주민들을 위한 종합 정보 플랫폼",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "KR",
                "addressRegion": "인천광역시",
                "addressLocality": "남동구",
                "streetAddress": "논현동"
              },
              "areaServed": {
                "@type": "Place",
                "name": "인천광역시 남동구 논현동"
              },
              "knowsAbout": [
                "논현동 지역정보", "논현동 맛집", "논현동 카페", 
                "논현동 부동산", "논현동 육아", "에코메트로", 
                "소래포구", "호구포", "논현지구"
              ],
              "sameAs": [
                "https://nonhyeon-info-site.vercel.app"
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
              "name": "논현동 정보 허브",
              "url": "https://nonhyeon-info-site.vercel.app",
              "logo": {
                "@type": "ImageObject",
                "url": "https://nonhyeon-info-site.vercel.app/og-image.jpg",
                "width": 1200,
                "height": 630
              },
              "description": "인천 남동구 논현동 지역 뉴스 및 정보 제공",
              "publishingPrinciples": "https://nonhyeon-info-site.vercel.app",
              "areaServed": {
                "@type": "Place",
                "name": "인천광역시 남동구 논현동"
              },
              "audience": {
                "@type": "Audience",
                "geographicArea": {
                  "@type": "Place",
                  "name": "인천광역시 남동구 논현동"
                }
              }
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
      </head>
      <body
        className={`${inter.variable} font-sans antialiased bg-gray-50`}
      >
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-SSEDR2CED7"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-SSEDR2CED7', {
              page_title: document.title,
              page_location: window.location.href,
            });
          `}
        </Script>

        {children}
      </body>
    </html>
  );
}
