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

  // 추가 SEO 키워드 페이지들 (해시태그 형태)
  const seoKeywordPages = [
    // 지역 관련
    { keyword: '송도국제도시', priority: 0.8 },
    { keyword: '센트럴파크', priority: 0.7 },
    { keyword: '송도-맛집', priority: 0.7 },
    { keyword: '송도-카페', priority: 0.7 },
    { keyword: '송도-부동산', priority: 0.7 },
    { keyword: '송도-육아', priority: 0.6 },
    { keyword: '더샵', priority: 0.6 },
    { keyword: '트리플스트리트', priority: 0.6 },
    
    // 의료 관련
    { keyword: '송도-병원', priority: 0.7 },
    { keyword: '송도-약국', priority: 0.7 },
    { keyword: '송도-내과', priority: 0.6 },
    { keyword: '송도-소아과', priority: 0.6 },
    { keyword: '송도-치과', priority: 0.6 },
    { keyword: '송도-응급실', priority: 0.6 },
    
    // 교통 관련
    { keyword: '인천1호선', priority: 0.7 },
    { keyword: '인천대입구역', priority: 0.7 },
    { keyword: '센트럴파크역', priority: 0.6 },
    { keyword: '국제업무지구역', priority: 0.6 },
  ];

  // SEO 키워드 페이지들을 사이트맵에 추가
  const keywordRoutes = seoKeywordPages.map(({ keyword, priority }) => ({
    url: `${baseUrl}/#${keyword}`,
    lastModified: now,
    changeFrequency: 'daily' as const,
    priority: priority,
  }));

  return [...routes, ...keywordRoutes];
} 