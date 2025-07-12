interface BreadcrumbItem {
  label: string;
  href: string;
  current?: boolean;
}

// 페이지별 브레드크럼 생성 헬퍼 함수들
export const getHomeBreadcrumb = (): BreadcrumbItem[] => [
  { label: '홈', href: '/', current: true }
];

export const getSubwayBreadcrumb = (stationName?: string): BreadcrumbItem[] => {
  const items: BreadcrumbItem[] = [
    { label: '홈', href: '/' },
    { label: '지하철 정보', href: '/subway', current: !stationName }
  ];
  
  if (stationName) {
    items.push({ label: stationName, href: `/subway/${stationName}`, current: true });
  }
  
  return items;
};

export const getRealEstateBreadcrumb = (): BreadcrumbItem[] => [
  { label: '홈', href: '/' },
  { label: '부동산 정보', href: '/realestate', current: true }
];

export const getAcademyBreadcrumb = (): BreadcrumbItem[] => [
  { label: '홈', href: '/' },
  { label: '학원 정보', href: '/academy', current: true }
];

export const getMedicalBreadcrumb = (): BreadcrumbItem[] => [
  { label: '홈', href: '/' },
  { label: '병원/약국 정보', href: '/medical', current: true }
];

// 카테고리별 브레드크럼
export const getCategoryBreadcrumb = (category: string): BreadcrumbItem[] => [
  { label: '홈', href: '/' },
  { label: `${category} 정보`, href: `/?category=${encodeURIComponent(category)}`, current: true }
];

export type { BreadcrumbItem }; 