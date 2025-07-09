'use client';

import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href: string;
  current?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumb({ items, className = '' }: BreadcrumbProps) {
  // 구조화된 데이터 생성
  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      "item": item.current ? undefined : `https://songdo.life${item.href}`
    }))
  };

  return (
    <>
      {/* 구조화된 데이터 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData)
        }}
      />
      
      {/* 브레드크럼 네비게이션 */}
      <nav 
        aria-label="브레드크럼 네비게이션"
        className={`flex items-center space-x-1 text-sm text-gray-500 mb-4 sm:mb-6 ${className}`}
      >
        <ol className="flex items-center space-x-1">
          {items.map((item, index) => (
            <li key={index} className="flex items-center">
              {index === 0 && (
                <span className="mr-1 text-gray-400" aria-hidden="true">🏠</span>
              )}
              
              {item.current ? (
                <span 
                  className="font-medium text-gray-900"
                  aria-current="page"
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="hover:text-blue-600 transition-colors duration-200"
                  title={`${item.label} 페이지로 이동`}
                >
                  {item.label}
                </Link>
              )}
              
              {index < items.length - 1 && (
                <span className="mx-2 text-gray-400" aria-hidden="true">›</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
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