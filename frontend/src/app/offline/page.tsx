"use client";

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '오프라인 상태 | 인천논현라이프',
  description: '인터넷 연결을 확인해주세요',
  robots: {
    index: false,
    follow: false,
  },
};

export default function OfflinePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-4xl">📶</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            오프라인 상태입니다
          </h1>
          <p className="text-gray-600 mb-6">
            인터넷 연결을 확인한 후 다시 시도해주세요.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            오프라인에서도 이용 가능한 기능
          </h2>
          <ul className="space-y-3 text-left">
            <li className="flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
              <span className="text-gray-700">최근 조회한 뉴스</span>
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
              <span className="text-gray-700">저장된 지하철 정보</span>
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
              <span className="text-gray-700">캐시된 병원·약국 정보</span>
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
              <span className="text-gray-700">이전 검색 결과</span>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            다시 시도
          </button>
          
          <button
            onClick={() => window.history.back()}
            className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            이전 페이지로
          </button>
        </div>

        <div className="mt-8 text-sm text-gray-500">
          <p>
            논현라이프는 PWA(Progressive Web App) 기술을 사용하여<br />
            오프라인에서도 일부 기능을 제공합니다.
          </p>
        </div>
      </div>
    </div>
  );
} 