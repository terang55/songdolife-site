import { MetadataRoute } from 'next'
import { BASE_URL } from '@/lib/siteConfig'
import { STATIC_GUIDES } from '@/lib/guide-utils'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = BASE_URL
  
  // 현재 날짜
  const now = new Date()
  const lastWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
  
  // 1. 핵심 페이지들 (최고 우선순위)
  const corePages = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'hourly' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/guides`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
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
      lastModified: lastWeek,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
  ];

  // 2. 콘텐츠 카테고리 페이지들
  const contentPages = [
    {
      url: `${baseUrl}/?category=뉴스`,
      lastModified: now,
      changeFrequency: 'hourly' as const,
      priority: 0.85,
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
      priority: 0.75,
    },
    {
      url: `${baseUrl}/?category=약국`,
      lastModified: now,
      changeFrequency: 'daily' as const,
      priority: 0.75,
    },
  ];
  
  // 3. 지하철 역별 세부 페이지들
  const subwayStations = [
    { name: '센트럴파크역', priority: 0.8 },
    { name: '인천대입구역', priority: 0.75 },
    { name: '국제업무지구역', priority: 0.7 },
    { name: '테크노파크역', priority: 0.65 },
    { name: '캠퍼스타운역', priority: 0.6 },
  ];
  
  const subwayPages = subwayStations.map(station => ({
    url: `${baseUrl}/subway?station=${encodeURIComponent(station.name)}`,
    lastModified: now,
    changeFrequency: 'hourly' as const,
    priority: station.priority,
  }));

  // 4. 가이드 카테고리별 메인 페이지들
  const guideCategories = [
    { category: 'lifestyle', name: '생활정보', priority: 0.85 },
    { category: 'moving', name: '이사/정착', priority: 0.8 },
    { category: 'realestate', name: '부동산', priority: 0.8 },
    { category: 'transportation', name: '교통', priority: 0.75 },
    { category: 'seasonal', name: '계절별', priority: 0.75 },
    { category: 'education', name: '교육', priority: 0.7 },
    { category: 'childcare', name: '육아', priority: 0.7 },
  ];

  const guideCategoryPages = guideCategories.map(cat => ({
    url: `${baseUrl}/guides?category=${cat.category}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: cat.priority,
  }));

  // 5. 정책 및 기타 페이지들
  const staticPages = [
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date('2025-07-01'),
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date('2025-07-01'),
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/offline`,
      lastModified: new Date('2025-07-01'),
      changeFrequency: 'yearly' as const,
      priority: 0.1,
    },
  ];

  // 6. 개별 가이드 페이지들
  const guideRoutes = STATIC_GUIDES.map(guide => ({
    url: `${baseUrl}/guides/${guide.slug}`,
    lastModified: new Date(guide.lastUpdated),
    changeFrequency: 'weekly' as const,
    priority: guide.featured ? 0.85 : 0.7,
  }));

  // 7. 구조화된 페이지 그룹별 조합
  const allPages = [
    ...corePages,          // 핵심 페이지 (우선순위 1.0~0.8)
    ...contentPages,       // 콘텐츠 카테고리 (우선순위 0.85~0.75)
    ...subwayPages,        // 지하철 역별 (우선순위 0.8~0.6)
    ...guideCategoryPages, // 가이드 카테고리 (우선순위 0.85~0.7)
    ...guideRoutes,        // 개별 가이드 (우선순위 0.85~0.7)
    ...staticPages,        // 정책 페이지 (우선순위 0.3~0.1)
  ];

  // 우선순위별 정렬 (높은 우선순위 먼저)
  allPages.sort((a, b) => (b.priority || 0) - (a.priority || 0));

  return allPages;
} 