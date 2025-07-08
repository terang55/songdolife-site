const CACHE_VERSION = Date.now(); // 항상 새로운 캐시 버전
const CACHE_NAME = `songdo-life-v${CACHE_VERSION}`;
const STATIC_CACHE = `static-v${CACHE_VERSION}`;
const DYNAMIC_CACHE = `dynamic-v${CACHE_VERSION}`;

// 캐시할 정적 파일들
const STATIC_FILES = [
  '/',
  '/favicon.ico',
  '/android-chrome-192x192.png',
  '/android-chrome-512x512.png',
  '/apple-touch-icon.png',
  '/og-image.jpg',
  '/site.webmanifest'
];

// 캐시할 API 엔드포인트들
const API_ENDPOINTS = [
  '/api/news',
  '/api/weather',
  '/api/medical',
  '/api/subway',
  '/api/stats',
  '/api/sync'
];

// Service Worker 설치
self.addEventListener('install', (event) => {
  console.log('🔧 Service Worker 설치 중...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('📦 정적 파일 캐시 중...');
        return cache.addAll(STATIC_FILES);
      })
      .then(() => {
        console.log('✅ Service Worker 설치 완료 - 자동 활성화');
        // 즉시 활성화하여 이전 버전을 대체
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('❌ Service Worker 설치 실패:', error);
      })
  );
});

// Service Worker 활성화
self.addEventListener('activate', (event) => {
  console.log('🚀 Service Worker 활성화 중...');
  
  event.waitUntil(
    Promise.all([
      // 이전 캐시 모두 삭제 (항상 최신 상태 유지)
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('🗑️ 이전 캐시 삭제:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      }),
      // 모든 클라이언트에게 즉시 제어권 가져오기
      self.clients.claim(),
      // 모든 클라이언트에게 업데이트 알림
      self.clients.matchAll().then((clients) => {
        clients.forEach((client) => {
          client.postMessage({ type: 'SW_UPDATED' });
        });
      })
    ]).then(() => {
      console.log('✅ Service Worker 활성화 완료 - 모든 탭에 알림 전송');
    })
  );
});

// 네트워크 요청 인터셉트
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // API 요청 처리 (Network First - 항상 최신 데이터 우선)
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.ok) {
            // 성공 시 즉시 반환 (캐시 없이 항상 최신 데이터)
            console.log('🌐 API 최신 데이터 반환:', url.pathname);
            
            // 백그라운드에서 캐시 업데이트 (오프라인 대비용)
            caches.open(DYNAMIC_CACHE).then((cache) => {
              cache.put(request, response.clone());
            });
            
            return response;
          }
          
          // 네트워크 응답이 실패하면 캐시에서 가져오기
          return caches.open(DYNAMIC_CACHE)
            .then((cache) => cache.match(request))
            .then((cachedResponse) => {
              if (cachedResponse) {
                console.log('📦 API 캐시 데이터 반환:', url.pathname);
                return cachedResponse;
              }
              return response; // 캐시도 없으면 실패 응답 반환
            });
        })
        .catch(() => {
          // 네트워크 오류 시 캐시에서 가져오기
          return caches.open(DYNAMIC_CACHE)
            .then((cache) => cache.match(request))
            .then((cachedResponse) => {
              if (cachedResponse) {
                console.log('📦 오프라인 - API 캐시 데이터 반환:', url.pathname);
                return cachedResponse;
              }
              // 캐시도 없으면 오프라인 응답
              return new Response(
                JSON.stringify({
                  success: false,
                  error: '오프라인 상태입니다. 인터넷 연결을 확인해주세요.',
                  offline: true
                }),
                {
                  status: 503,
                  headers: { 'Content-Type': 'application/json' }
                }
              );
            });
        })
    );
    return;
  }

  // 정적 파일 처리 (Network First for HTML, Cache First for assets)
  if (request.method === 'GET') {
    const isHTMLRequest = request.headers.get('accept')?.includes('text/html');
    
    if (isHTMLRequest) {
      // HTML 파일은 항상 최신 버전 우선 (Network First)
      event.respondWith(
        fetch(request)
          .then((response) => {
            if (response.ok) {
              console.log('🌐 HTML 최신 버전 반환:', url.pathname);
              // 백그라운드에서 캐시 업데이트
              caches.open(DYNAMIC_CACHE).then((cache) => {
                cache.put(request, response.clone());
              });
              return response;
            }
            return caches.match(request);
          })
          .catch(() => {
            // 오프라인 시 캐시된 버전 또는 기본 페이지
            return caches.match(request) || caches.match('/');
          })
      );
    } else {
      // CSS, JS, 이미지 등은 캐시 우선 (Cache First)
      event.respondWith(
        caches.match(request)
          .then((cachedResponse) => {
            if (cachedResponse) {
              return cachedResponse;
            }
            
            return fetch(request)
              .then((response) => {
                // 성공적인 응답만 캐시
                if (response.ok && response.type === 'basic') {
                  const responseClone = response.clone();
                  caches.open(DYNAMIC_CACHE)
                    .then((cache) => {
                      cache.put(request, responseClone);
                    });
                }
                return response;
              });
          })
      );
    }
  }
});

// 백그라운드 동기화
self.addEventListener('sync', (event) => {
  console.log('🔄 백그라운드 동기화:', event.tag);
  
  if (event.tag === 'news-sync') {
    event.waitUntil(syncNewsData());
  }
});

// 푸시 알림 수신
self.addEventListener('push', (event) => {
  console.log('📲 푸시 알림 수신:', event);
  
  const options = {
    body: event.data ? event.data.text() : '새로운 소식이 있습니다!',
    icon: '/android-chrome-192x192.png',
    badge: '/favicon-32x32.png',
    tag: 'news-notification',
    renotify: true,
    requireInteraction: false,
    actions: [
      {
        action: 'view',
        title: '확인하기',
        icon: '/android-chrome-192x192.png'
      },
      {
        action: 'close',
        title: '닫기'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('송도라이프', options)
  );
});

// 알림 클릭 처리
self.addEventListener('notificationclick', (event) => {
  console.log('🔔 알림 클릭:', event);
  
  event.notification.close();
  
  if (event.action === 'view') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// 뉴스 데이터 동기화 함수
async function syncNewsData() {
  try {
    const response = await fetch('/api/news?limit=50');
    if (response.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      await cache.put('/api/news', response.clone());
      console.log('✅ 뉴스 데이터 동기화 완료');
    }
  } catch (error) {
    console.error('❌ 뉴스 데이터 동기화 실패:', error);
  }
}

// 메시지 수신 처리
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
}); 