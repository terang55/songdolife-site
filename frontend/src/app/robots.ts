import { MetadataRoute } from 'next'
import { BASE_URL } from '@/lib/siteConfig'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // 모든 봇에 대한 기본 설정
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/_next/',
          '/.next/',
          '/admin/',
          '/config/',
          '/data/',
          '/*.json$',
          '/*?sort=*',
          '/*?page=*',
          '/*?filter=*'
        ],
      },
      // Google 봇 - 최우선
      {
        userAgent: 'Googlebot',
        allow: '/',
        crawlDelay: 0,
      },
      {
        userAgent: 'Googlebot-Image',
        allow: '/',
      },
      // 네이버 봇 - 한국 시장 중요
      {
        userAgent: ['Yeti', 'NaverBot'],
        allow: '/',
        crawlDelay: 1,
      },
      // 다음 카카오 봇
      {
        userAgent: 'Daumoa',
        allow: '/',
        crawlDelay: 1,
      },
      // Bing 봇
      {
        userAgent: 'Bingbot',
        allow: '/',
        crawlDelay: 1,
      },
      // 소셜 미디어 봇들 (OG 태그 크롤링)
      {
        userAgent: ['facebookexternalhit', 'Twitterbot', 'LinkedInBot'],
        allow: '/',
      },
      // 바이두 봇 (중국) - 제한적 허용
      {
        userAgent: 'Baiduspider',
        allow: '/',
        disallow: '/api/',
        crawlDelay: 2,
      },
      // 악성 봇 차단
      {
        userAgent: ['SemrushBot', 'AhrefsBot', 'MJ12bot', 'DotBot'],
        disallow: '/',
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  }
}