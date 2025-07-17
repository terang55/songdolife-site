'use client';

import { useEffect, useState } from 'react';
import { TocItem } from '@/lib/toc-utils';

interface TableOfContentsProps {
  tocItems: TocItem[];
}

export default function TableOfContents({ tocItems }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0% -35% 0%',
        threshold: 0.1
      }
    );

    // 모든 헤더 요소 관찰
    tocItems.forEach((item) => {
      const element = document.getElementById(item.anchor);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [tocItems]);

  if (tocItems.length === 0) {
    return null;
  }

  const handleClick = (anchor: string) => {
    const element = document.getElementById(anchor);
    if (element) {
      const headerOffset = 80; // 고정 헤더 높이 고려
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="sticky top-24 bg-white rounded-xl shadow-sm border p-6 mb-8">
      <div className="flex items-center mb-4">
        <span className="text-lg mr-2">📋</span>
        <h3 className="text-lg font-semibold text-gray-900">목차</h3>
      </div>
      
      <nav className="space-y-2">
        {tocItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleClick(item.anchor)}
            className={`
              block w-full text-left py-2 px-3 rounded-lg transition-all duration-200
              ${item.level === 2 ? 'font-medium' : item.level === 3 ? 'ml-4 text-sm' : 'ml-8 text-xs'}
              ${
                activeId === item.anchor
                  ? 'bg-blue-50 text-blue-700 border-l-2 border-blue-500'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }
            `}
          >
            {item.text}
          </button>
        ))}
      </nav>
      
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center text-xs text-gray-500">
          <span className="mr-2">💡</span>
          <span>목차를 클릭하면 해당 섹션으로 이동합니다</span>
        </div>
      </div>
    </div>
  );
}