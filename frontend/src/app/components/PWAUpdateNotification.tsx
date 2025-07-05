'use client';

import { useState, useEffect } from 'react';
import { usePWA } from '../hooks/usePWA';

export default function PWAUpdateNotification() {
  const { hasUpdate, update } = usePWA();
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    if (hasUpdate) {
      setShowNotification(true);
    }
  }, [hasUpdate]);

  const handleUpdate = async () => {
    try {
      await update();
      setShowNotification(false);
    } catch (error) {
      console.error('업데이트 실패:', error);
    }
  };

  const handleDismiss = () => {
    setShowNotification(false);
  };

  if (!showNotification) return null;

  return (
    <div className="fixed top-4 left-4 right-4 z-50 max-w-sm mx-auto">
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <span className="text-2xl">🔄</span>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-gray-900 mb-1">
              새 버전 업데이트
            </h3>
            <p className="text-xs text-gray-600 mb-3">
              논현라이프의 새로운 버전이 준비되었습니다. 업데이트하시겠습니까?
            </p>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleUpdate}
                className="flex-1 px-3 py-1.5 text-xs font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors"
              >
                지금 업데이트
              </button>
              <button
                onClick={handleDismiss}
                className="flex-1 px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
              >
                나중에
              </button>
            </div>
          </div>
          <button
            onClick={handleDismiss}
            className="flex-shrink-0 text-gray-400 hover:text-gray-600"
          >
            <span className="sr-only">닫기</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
} 