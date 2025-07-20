/**
 * API 성능 모니터링 유틸리티
 * API 응답 시간, 에러율, 캐시 히트율 등을 추적
 */

interface ApiMetrics {
  endpoint: string;
  method: string;
  responseTime: number;
  statusCode: number;
  cached: boolean;
  timestamp: number;
  error?: string;
}

interface AggregatedMetrics {
  endpoint: string;
  totalRequests: number;
  averageResponseTime: number;
  errorRate: number;
  cacheHitRate: number;
  lastError?: string;
  lastErrorTime?: number;
}

class ApiMonitor {
  private metrics: ApiMetrics[] = [];
  private maxMetrics = 1000; // 메모리 사용량 제한

  /**
   * API 호출 메트릭 기록
   */
  recordMetric(metric: Omit<ApiMetrics, 'timestamp'>) {
    this.metrics.push({
      ...metric,
      timestamp: Date.now()
    });

    // 메모리 사용량 제한
    if (this.metrics.length > this.maxMetrics) {
      this.metrics = this.metrics.slice(-this.maxMetrics);
    }
  }

  /**
   * 엔드포인트별 집계 메트릭 조회
   */
  getAggregatedMetrics(timeWindowMs = 3600000): Record<string, AggregatedMetrics> {
    const cutoff = Date.now() - timeWindowMs;
    const recentMetrics = this.metrics.filter(m => m.timestamp > cutoff);
    
    const grouped = recentMetrics.reduce((acc, metric) => {
      const key = `${metric.method} ${metric.endpoint}`;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(metric);
      return acc;
    }, {} as Record<string, ApiMetrics[]>);

    const aggregated: Record<string, AggregatedMetrics> = {};
    
    for (const [endpoint, metrics] of Object.entries(grouped)) {
      const totalRequests = metrics.length;
      const errorCount = metrics.filter(m => m.statusCode >= 400).length;
      const cachedCount = metrics.filter(m => m.cached).length;
      const totalResponseTime = metrics.reduce((sum, m) => sum + m.responseTime, 0);
      
      const lastError = metrics
        .filter(m => m.error)
        .sort((a, b) => b.timestamp - a.timestamp)[0];

      aggregated[endpoint] = {
        endpoint,
        totalRequests,
        averageResponseTime: totalResponseTime / totalRequests,
        errorRate: (errorCount / totalRequests) * 100,
        cacheHitRate: (cachedCount / totalRequests) * 100,
        lastError: lastError?.error,
        lastErrorTime: lastError?.timestamp
      };
    }

    return aggregated;
  }

  /**
   * 성능 임계값 확인
   */
  checkThresholds(): {
    slowEndpoints: string[];
    highErrorEndpoints: string[];
    lowCacheEndpoints: string[];
  } {
    const aggregated = this.getAggregatedMetrics();
    
    const thresholds = {
      responseTime: 2000,    // 2초
      errorRate: 5,          // 5%
      cacheHitRate: 50       // 50%
    };

    const slowEndpoints: string[] = [];
    const highErrorEndpoints: string[] = [];
    const lowCacheEndpoints: string[] = [];

    for (const [endpoint, metrics] of Object.entries(aggregated)) {
      if (metrics.averageResponseTime > thresholds.responseTime) {
        slowEndpoints.push(endpoint);
      }
      
      if (metrics.errorRate > thresholds.errorRate) {
        highErrorEndpoints.push(endpoint);
      }
      
      if (metrics.cacheHitRate < thresholds.cacheHitRate) {
        lowCacheEndpoints.push(endpoint);
      }
    }

    return { slowEndpoints, highErrorEndpoints, lowCacheEndpoints };
  }

  /**
   * 메트릭 정리
   */
  cleanup(olderThanMs = 86400000): void { // 24시간
    const cutoff = Date.now() - olderThanMs;
    this.metrics = this.metrics.filter(m => m.timestamp > cutoff);
  }

  /**
   * 전체 통계 조회
   */
  getOverallStats(): {
    totalRequests: number;
    averageResponseTime: number;
    errorRate: number;
    cacheHitRate: number;
    uptime: number;
  } {
    if (this.metrics.length === 0) {
      return {
        totalRequests: 0,
        averageResponseTime: 0,
        errorRate: 0,
        cacheHitRate: 0,
        uptime: 0
      };
    }

    const totalRequests = this.metrics.length;
    const errorCount = this.metrics.filter(m => m.statusCode >= 400).length;
    const cachedCount = this.metrics.filter(m => m.cached).length;
    const totalResponseTime = this.metrics.reduce((sum, m) => sum + m.responseTime, 0);
    
    const oldest = Math.min(...this.metrics.map(m => m.timestamp));
    const uptime = Date.now() - oldest;

    return {
      totalRequests,
      averageResponseTime: totalResponseTime / totalRequests,
      errorRate: (errorCount / totalRequests) * 100,
      cacheHitRate: (cachedCount / totalRequests) * 100,
      uptime
    };
  }
}

// 싱글톤 인스턴스
export const apiMonitor = new ApiMonitor();

/**
 * API 함수 래퍼 - 자동 메트릭 수집
 */
export async function withMonitoring<T>(
  endpoint: string,
  method: string,
  apiFunction: () => Promise<T>,
  cached = false
): Promise<T> {
  const startTime = Date.now();
  let statusCode = 200;
  let error: string | undefined;

  try {
    const result = await apiFunction();
    return result;
  } catch (err) {
    statusCode = 500;
    error = err instanceof Error ? err.message : String(err);
    throw err;
  } finally {
    const responseTime = Date.now() - startTime;
    
    apiMonitor.recordMetric({
      endpoint,
      method,
      responseTime,
      statusCode,
      cached,
      error
    });
  }
}

// 정기적인 메트릭 정리 (프로덕션 환경에서만)
if (typeof window === 'undefined' && process.env.NODE_ENV === 'production') {
  setInterval(() => {
    apiMonitor.cleanup();
  }, 3600000); // 1시간마다 정리
}