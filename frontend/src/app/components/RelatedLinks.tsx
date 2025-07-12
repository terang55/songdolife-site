'use client';

import React from 'react';
import Link from 'next/link';
import { RelatedLink } from '@/lib/related-links-utils';

interface RelatedLinksProps {
  links: RelatedLink[];
  title?: string;
}

export default function RelatedLinks({ links, title = '관련 정보' }: RelatedLinksProps) {
  if (!links.length) return null;

  const primaryLinks = links.filter(link => link.category === 'primary');
  const secondaryLinks = links.filter(link => link.category === 'secondary');

  return (
    <section className="mt-8 p-6 bg-gray-50 rounded-lg">
      <h2 className="text-xl font-bold text-gray-900 mb-4 text-center">
        {title}
      </h2>
      
      {/* 주요 링크 */}
      {primaryLinks.length > 0 && (
        <div className="mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {primaryLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200 hover:border-blue-300"
              >
                <div className="flex items-start space-x-3">
                  <span className="text-2xl" role="img" aria-label={link.title}>
                    {link.icon}
                  </span>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {link.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {link.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* 부가 링크 */}
      {secondaryLinks.length > 0 && (
        <div className="pt-4 border-t border-gray-200">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {secondaryLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center space-x-2 p-3 bg-white rounded-md hover:bg-blue-50 transition-colors duration-200 border border-gray-100 hover:border-blue-200"
              >
                <span className="text-lg" role="img" aria-label={link.title}>
                  {link.icon}
                </span>
                <span className="text-sm font-medium text-gray-700 hover:text-blue-600">
                  {link.title}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  );
} 