/**
 * API 응답 캐시 관리 유틸리티
 * 메모리 기반 캐시로 동일한 요청에 대한 중복 호출 방지
 */

interface CacheItem<T> {
  data: T;
  timestamp: number;
  expiry: number;
}

class ApiCache {
  private cache = new Map<string, CacheItem<any>>();
  
  // 기본 캐시 만료 시간 (분 단위)
  private defaultTTL = {
    news: 5,         // 뉴스: 5분
    realestate: 30,  // 부동산: 30분
    subway: 1,       // 지하철: 1분
    medical: 60,     // 의료정보: 60분
    weather: 10,     // 날씨: 10분
    guides: 120      // 가이드: 120분
  };

  /**
   * 캐시에서 데이터 조회
   */
  get<T>(key: string): T | null {
    const item = this.cache.get(key);
    
    if (!item) {
      return null;
    }
    
    // 만료 시간 확인
    if (Date.now() > item.expiry) {
      this.cache.delete(key);
      return null;
    }
    
    return item.data;
  }

  /**
   * 캐시에 데이터 저장
   */
  set<T>(key: string, data: T, ttlMinutes?: number): void {
    // 기본 TTL 결정
    const defaultTTL = this.getDefaultTTL(key);
    const ttl = ttlMinutes || defaultTTL;
    
    const item: CacheItem<T> = {
      data,
      timestamp: Date.now(),
      expiry: Date.now() + (ttl * 60 * 1000)
    };
    
    this.cache.set(key, item);
  }

  /**
   * 캐시 키별 기본 TTL 결정
   */
  private getDefaultTTL(key: string): number {
    if (key.includes('news')) return this.defaultTTL.news;
    if (key.includes('realestate')) return this.defaultTTL.realestate;
    if (key.includes('subway')) return this.defaultTTL.subway;
    if (key.includes('medical')) return this.defaultTTL.medical;
    if (key.includes('weather')) return this.defaultTTL.weather;
    if (key.includes('guides')) return this.defaultTTL.guides;
    
    return 5; // 기본값: 5분
  }

  /**
   * 특정 키 삭제
   */
  delete(key: string): void {
    this.cache.delete(key);
  }

  /**
   * 전체 캐시 삭제
   */
  clear(): void {
    this.cache.clear();
  }

  /**
   * 만료된 캐시 정리
   */
  cleanup(): void {
    const now = Date.now();
    for (const [key, item] of this.cache.entries()) {
      if (now > item.expiry) {
        this.cache.delete(key);
      }
    }
  }

  /**
   * 캐시 통계 조회
   */
  getStats() {
    const stats = {
      total: this.cache.size,
      expired: 0,
      valid: 0
    };
    
    const now = Date.now();
    for (const item of this.cache.values()) {
      if (now > item.expiry) {
        stats.expired++;
      } else {
        stats.valid++;
      }
    }
    
    return stats;
  }
}

// 싱글톤 인스턴스 생성
export const apiCache = new ApiCache();

/**
 * API 응답 캐시 래퍼 함수
 */
export async function withCache<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttlMinutes?: number
): Promise<T> {
  // 캐시된 데이터가 있는지 확인
  const cached = apiCache.get<T>(key);
  if (cached) {
    return cached;
  }
  
  // 캐시 미스: 새로 데이터 가져오기
  const data = await fetcher();
  
  // 캐시에 저장
  apiCache.set(key, data, ttlMinutes);
  
  return data;
}

/**
 * API 키 생성 유틸리티
 */
export function createCacheKey(endpoint: string, params?: Record<string, string | null>): string {
  if (!params) {
    return endpoint;
  }
  
  const sortedParams = Object.entries(params)
    .filter(([, value]) => value !== null && value !== undefined)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
    
  return `${endpoint}?${sortedParams}`;
}