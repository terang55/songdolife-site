'use client';

import { useState, useEffect } from 'react';

// BeforeInstallPromptEvent 타입 정의 (표준화되지 않은 브라우저 이벤트)
interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

interface PWAStatus {
  isInstalled: boolean;
  isOnline: boolean;
  canInstall: boolean;
  hasUpdate: boolean;
  isLoading: boolean;
}

interface PWAActions {
  install: () => Promise<boolean>;
  update: () => Promise<void>;
  enableNotifications: () => Promise<boolean>;
  syncData: () => Promise<void>;
}

export function usePWA(): PWAStatus & PWAActions {
  const [isInstalled, setIsInstalled] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [canInstall, setCanInstall] = useState(false);
  const [hasUpdate, setHasUpdate] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null);

  useEffect(() => {
    // Service Worker 등록
    const registerSW = async () => {
      if ('serviceWorker' in navigator) {
        try {
          const reg = await navigator.serviceWorker.register('/sw.js');
          setRegistration(reg);
          
          console.log('✅ Service Worker 등록 성공:', reg);

          // 업데이트 확인
          reg.addEventListener('updatefound', () => {
            const newWorker = reg.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  setHasUpdate(true);
                  console.log('🔄 새 버전이 사용 가능합니다');
                }
              });
            }
          });

          // 활성화된 Service Worker 메시지 수신
          navigator.serviceWorker.addEventListener('message', (event) => {
            if (event.data?.type === 'SW_UPDATED') {
              setHasUpdate(true);
            }
          });

        } catch (error) {
          console.error('❌ Service Worker 등록 실패:', error);
        }
      }
      setIsLoading(false);
    };

    registerSW();

    // 설치 상태 확인
    const checkInstallStatus = () => {
      const standalone = window.matchMedia('(display-mode: standalone)').matches;
      const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && Boolean((window.navigator as unknown as { standalone?: boolean }).standalone);
      setIsInstalled(standalone || iOS);
    };

    checkInstallStatus();

    // 온라인/오프라인 상태 감지
    const updateOnlineStatus = () => setIsOnline(navigator.onLine);
    updateOnlineStatus();

    // 설치 프롬프트 이벤트
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setCanInstall(true);
    };

    // 설치 완료 이벤트
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setCanInstall(false);
      setDeferredPrompt(null);
      console.log('✅ PWA 설치 완료');
    };

    // 이벤트 리스너 등록
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  // PWA 설치
  const install = async (): Promise<boolean> => {
    if (!deferredPrompt) {
      console.warn('설치 프롬프트를 사용할 수 없습니다');
      return false;
    }

    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        console.log('✅ 사용자가 PWA 설치를 수락했습니다');
        return true;
      } else {
        console.log('❌ 사용자가 PWA 설치를 거부했습니다');
        return false;
      }
    } catch (error) {
      console.error('PWA 설치 오류:', error);
      return false;
    } finally {
      setDeferredPrompt(null);
      setCanInstall(false);
    }
  };

  // Service Worker 업데이트
  const update = async (): Promise<void> => {
    if (!registration) {
      console.warn('Service Worker가 등록되지 않았습니다');
      return;
    }

    try {
      await registration.update();
      
      if (registration.waiting) {
        // 새 Service Worker에게 활성화 요청
        registration.waiting.postMessage({ type: 'SKIP_WAITING' });
        
        // 페이지 새로고침
        window.location.reload();
      }
      
      setHasUpdate(false);
      console.log('✅ Service Worker 업데이트 완료');
    } catch (error) {
      console.error('Service Worker 업데이트 오류:', error);
    }
  };

  // 푸시 알림 권한 요청
  const enableNotifications = async (): Promise<boolean> => {
    if (!('Notification' in window)) {
      console.warn('이 브라우저는 알림을 지원하지 않습니다');
      return false;
    }

    if (!registration) {
      console.warn('Service Worker가 등록되지 않았습니다');
      return false;
    }

    try {
      const permission = await Notification.requestPermission();
      
      if (permission === 'granted') {
        console.log('✅ 알림 권한이 허용되었습니다');
        
        // Push 구독 생성 (실제 프로젝트에서는 VAPID 키 필요)
        // const subscription = await registration.pushManager.subscribe({
        //   userVisibleOnly: true,
        //   applicationServerKey: 'YOUR_VAPID_PUBLIC_KEY'
        // });
        
        return true;
      } else {
        console.log('❌ 알림 권한이 거부되었습니다');
        return false;
      }
    } catch (error) {
      console.error('알림 권한 요청 오류:', error);
      return false;
    }
  };

  // 백그라운드 데이터 동기화
  const syncData = async (): Promise<void> => {
    if (!registration || !('sync' in window.ServiceWorkerRegistration.prototype)) {
      console.warn('백그라운드 동기화를 지원하지 않습니다');
      return;
    }

    try {
      // TypeScript 타입 오류 회피를 위한 타입 단언
      const syncManager = (registration as unknown as { sync?: { register: (tag: string) => Promise<void> } }).sync;
      if (syncManager) {
        await syncManager.register('news-sync');
        console.log('✅ 백그라운드 동기화 등록 완료');
      }
    } catch (error) {
      console.error('백그라운드 동기화 등록 오류:', error);
    }
  };

  return {
    // 상태
    isInstalled,
    isOnline,
    canInstall,
    hasUpdate,
    isLoading,
    
    // 액션
    install,
    update,
    enableNotifications,
    syncData
  };
}

 