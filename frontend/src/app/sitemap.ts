import { MetadataRoute } from 'next'
import { BASE_URL } from '@/lib/siteConfig'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = BASE_URL
  
  // 현재 날짜
  const now = new Date()
  
  // 기본 페이지들
  const routes = [
    // 메인 페이지 (최고 우선순위)
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'hourly' as const,
      priority: 1.0,
    },
    
    // 주요 서비스 페이지들
    {
      url: `${baseUrl}/subway`,
      lastModified: now,
      changeFrequency: 'hourly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/realestate`,
      lastModified: now,
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/academy`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    
    // 카테고리별 메인 페이지 변형
    {
      url: `${baseUrl}/?category=뉴스`,
      lastModified: now,
      changeFrequency: 'hourly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/?category=블로그`,
      lastModified: now,
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/?category=유튜브`,
      lastModified: now,
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/?category=병원`,
      lastModified: now,
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/?category=약국`,
      lastModified: now,
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    
    // 지하철 관련 세부 페이지들
    {
      url: `${baseUrl}/subway?station=인천대입구역`,
      lastModified: now,
      changeFrequency: 'hourly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/subway?station=센트럴파크역`,
      lastModified: now,
      changeFrequency: 'hourly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/subway?station=국제업무지구역`,
      lastModified: now,
      changeFrequency: 'hourly' as const,
      priority: 0.6,
    },
    
    // 정책 및 기타 페이지들
    {
      url: `${baseUrl}/privacy`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/offline`,
      lastModified: now,
      changeFrequency: 'yearly' as const,
      priority: 0.1,
    },
  ];

  // 🔧 해시(fragment) 기반 URL과 /api 경로는 SEO 상 불필요하여 제거
  // 키워드 해시 페이지 대신 핵심 페이지(route 목록)만 반환

  return routes;
} 