'use client';

import React from 'react';
import Link from 'next/link';
import RealEstateWidget from '../components/RealEstateWidget';

export default function RealEstatePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* 로고 및 제목 */}
            <div className="flex items-center space-x-3">
              <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
                <span className="text-2xl">🏙️</span>
                <div>
                  <div className="text-xl font-bold text-gray-900">인천논현라이프</div>
                  <div className="text-sm text-gray-500">부동산 정보</div>
                </div>
              </Link>
            </div>
            
            {/* 네비게이션 */}
            <nav className="hidden sm:flex items-center space-x-6">
              <Link 
                href="/" 
                className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
              >
                🏠 홈
              </Link>
              <Link 
                href="/realestate" 
                className="text-blue-600 font-medium border-b-2 border-blue-600 pb-1"
              >
                🏢 부동산
              </Link>
              <Link 
                href="/subway" 
                className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
              >
                🚇 지하철
              </Link>
            </nav>

            {/* 모바일 네비게이션 */}
            <div className="sm:hidden flex items-center space-x-4">
              <Link 
                href="/" 
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                🏠
              </Link>
              <Link 
                href="/subway" 
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                🚇
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 페이지 제목 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🏢 논현동 부동산 실거래가
          </h1>
          <p className="text-gray-600">
            인천 남동구 논현동 아파트 실거래가 정보를 실시간으로 확인하세요.
          </p>
        </div>

        {/* 부동산 위젯 (전체 너비로 확장) */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <RealEstateWidget />
        </div>

        {/* 추가 정보 섹션 */}
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {/* 지역 정보 */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              📍 논현동 주요 아파트 단지
            </h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">에코메트로 단지</span>
                <span className="text-sm text-gray-600">10개 단지</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">논현센트럴부</span>
                <span className="text-sm text-gray-600">대단지</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">논현힐스데이트</span>
                <span className="text-sm text-gray-600">신축</span>
              </div>
            </div>
          </div>

          {/* 교통 정보 */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              🚇 교통 접근성
            </h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div>
                  <span className="font-medium">인천논현역</span>
                  <div className="text-sm text-gray-600">수인분당선</div>
                </div>
                <span className="text-sm text-blue-600">도보 5-15분</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div>
                  <span className="font-medium">소래포구역</span>
                  <div className="text-sm text-gray-600">수인분당선</div>
                </div>
                <span className="text-sm text-green-600">도보 10-20분</span>
              </div>
            </div>
          </div>
        </div>

        {/* 안내 사항 */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2 flex items-center">
            💡 실거래가 정보 안내
          </h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• 국토교통부 실거래가 공개시스템 기준 데이터입니다.</li>
            <li>• 최근 6개월간의 거래 내역을 제공합니다.</li>
            <li>• 평당 가격은 3.3㎡ 기준으로 계산됩니다.</li>
            <li>• 데이터는 주기적으로 업데이트됩니다.</li>
          </ul>
        </div>
      </main>

      {/* 푸터 */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <span className="text-2xl">🏙️</span>
              <div className="text-lg font-bold">인천논현라이프</div>
            </div>
            <p className="text-sm text-gray-400">
              인천 남동구 논현동 지역 정보를 제공합니다.
            </p>
            <div className="mt-4 flex justify-center space-x-6">
              <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                홈
              </Link>
              <Link href="/realestate" className="text-gray-400 hover:text-white transition-colors">
                부동산
              </Link>
              <Link href="/subway" className="text-gray-400 hover:text-white transition-colors">
                지하철
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} 