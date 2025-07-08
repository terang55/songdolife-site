'use client';

import { useState, useEffect } from 'react';
import { usePWA } from '../hooks/usePWA';

export default function PWAUpdateNotification() {
  const { hasUpdate, update } = usePWA();
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    if (hasUpdate) {
      setShowNotification(true);
      
      // 3초 후 자동으로 업데이트 실행
      const timer = setTimeout(async () => {
        try {
          await update();
          console.log('✅ PWA 자동 업데이트 완료');
        } catch (error) {
          console.error('❌ PWA 자동 업데이트 실패:', error);
        } finally {
          setShowNotification(false);
        }
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [hasUpdate, update]);

  if (!showNotification) return null;

  return (
    <div className="fixed top-4 left-4 right-4 z-50 max-w-sm mx-auto">
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4">
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-gray-900 mb-1">
              새 버전 업데이트 중...
            </h3>
            <p className="text-xs text-gray-600">
              송도라이프의 새로운 버전을 자동으로 적용하고 있습니다.
            </p>
            <div className="mt-2 w-full bg-gray-200 rounded-full h-1">
              <div className="bg-blue-600 h-1 rounded-full animate-pulse" style={{ width: '70%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 