import React from 'react';
import Link from 'next/link';

interface FooterProps {
  variant?: 'light' | 'dark';
}

export default function Footer({ variant = 'light' }: FooterProps) {
  const isDark = variant === 'dark';
  
  return (
    <footer
      className={`mt-12 py-8 text-center text-xs sm:text-sm ${isDark ? 'bg-gray-800 text-gray-300' : 'border-t bg-white text-gray-500'}`}
      aria-label="사이트 푸터"
    >
      <div className="max-w-4xl mx-auto space-y-6">
        {/* 브랜드 및 설명 */}
        <div className="flex flex-col items-center space-y-2">
          <Link href="/" className="flex flex-col items-center space-y-1 hover:opacity-80 transition-opacity">
            <span className="text-2xl">🏙️</span>
            <div className={`text-lg sm:text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>송도라이프</div>
          </Link>
          <div className="text-sm text-gray-400">인천 연수구 송도국제도시 생활정보 플랫폼</div>
          <p className="text-sm text-gray-600 text-center max-w-md">
            송도국제도시 주민들을 위한 실시간 지역 정보를 제공합니다. 뉴스, 맛집, 카페, 부동산, 육아 정보를 한눈에 확인하세요.
          </p>
        </div>

        {/* 주요 서비스 링크 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">📰 정보 서비스</h3>
            <ul className="space-y-1">
              <li><Link href="/?category=뉴스" className="text-blue-600 hover:underline">송도 뉴스</Link></li>
              <li><Link href="/?category=블로그" className="text-blue-600 hover:underline">생활 블로그</Link></li>
              <li><Link href="/?category=유튜브" className="text-blue-600 hover:underline">유튜브 정보</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">🏢 생활 정보</h3>
            <ul className="space-y-1">
              <li><Link href="/realestate" className="text-blue-600 hover:underline">부동산 정보</Link></li>
              <li><Link href="/?category=병원" className="text-blue-600 hover:underline">병원 정보</Link></li>
              <li><Link href="/?category=약국" className="text-blue-600 hover:underline">약국 정보</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">🚇 교통 정보</h3>
            <ul className="space-y-1">
              <li><Link href="/subway" className="text-blue-600 hover:underline">지하철 정보</Link></li>
              <li><Link href="/subway?station=센트럴파크역" className="text-blue-600 hover:underline">센트럴파크역</Link></li>
              <li><Link href="/subway?station=인천대입구역" className="text-blue-600 hover:underline">인천대입구역</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">📖 생활 가이드</h3>
            <ul className="space-y-1">
              <li><Link href="/guides" className="text-blue-600 hover:underline">전체 가이드</Link></li>
              <li><Link href="/guides?category=moving" className="text-blue-600 hover:underline">이사 가이드</Link></li>
              <li><Link href="/guides?category=lifestyle" className="text-blue-600 hover:underline">생활 가이드</Link></li>
            </ul>
          </div>
        </div>
        {/* 주요 지역 키워드 */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-2">🗺️ 주요 지역</h3>
          <div className="flex flex-wrap justify-center gap-3 text-sm">
            <Link href="/?keyword=송도국제도시" className="bg-gray-100 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors">📍 송도국제도시</Link>
            <Link href="/?keyword=센트럴파크" className="bg-gray-100 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors">🌳 센트럴파크</Link>
            <Link href="/?keyword=국제업무지구" className="bg-gray-100 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors">🏢 국제업무지구</Link>
            <Link href="/?keyword=송도컨벤시아" className="bg-gray-100 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors">🎪 송도컨벤시아</Link>
          </div>
        </div>
        
        {/* 인기 가이드 */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-2">🔥 인기 가이드</h3>
          <div className="flex flex-wrap justify-center gap-2 text-sm">
            <Link href="/guides/songdo-moving-checklist" className="text-blue-600 hover:underline">송도 이사 체크리스트</Link>
            <span className="text-gray-300">•</span>
            <Link href="/guides/songdo-restaurant-guide" className="text-blue-600 hover:underline">송도 맛집 가이드</Link>
            <span className="text-gray-300">•</span>
            <Link href="/guides/songdo-newlywed-guide" className="text-blue-600 hover:underline">신혼부부 가이드</Link>
            <span className="text-gray-300">•</span>
            <Link href="/guides/songdo-childcare-guide" className="text-blue-600 hover:underline">육아 정보</Link>
          </div>
        </div>

        {/* 비즈니스 문의 */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-2">💼 사이트 문의</h3>
          <div className="flex flex-col items-center gap-1">
            <span className="text-sm">📧 <a href="mailto:rainbowcr55@gmail.com" className="text-blue-600 hover:underline">rainbowcr55@gmail.com</a></span>
            <span className="text-xs text-gray-500">광고 문의 및 협업 제안 환영</span>
          </div>
        </div>
        
        {/* 저작권 및 정책 */}
        <div className="flex flex-col items-center gap-2 mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center gap-4 text-sm">
            <Link href="/privacy" className="text-blue-600 hover:underline">개인정보처리방침</Link>
            <span className="text-gray-300">|</span>
            <Link href="/terms" className="text-blue-600 hover:underline">이용약관</Link>
            <span className="text-gray-300">|</span>
            <Link href="/sitemap.xml" className="text-blue-600 hover:underline">사이트맵</Link>
          </div>
          <span className="text-xs text-gray-400">© 2025 송도라이프. All rights reserved.</span>
          <span className="text-xs text-gray-400">인천 연수구 송도국제도시 생활정보 플랫폼</span>
        </div>
      </div>
    </footer>
  );
} 