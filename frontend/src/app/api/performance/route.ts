import { NextRequest, NextResponse } from 'next/server';
import { apiMonitor } from '@/lib/api-monitor';
import { apiCache } from '@/lib/api-cache';
import { createSuccessResponse, createInternalError } from '@/lib/api-response';

/**
 * API 성능 통계 조회 엔드포인트
 * 개발 환경에서만 접근 가능
 */
export async function GET(request: NextRequest) {
  try {
    // 프로덕션에서는 접근 제한
    if (process.env.NODE_ENV === 'production') {
      return new NextResponse('Forbidden', { status: 403 });
    }

    const searchParams = request.nextUrl.searchParams;
    const timeWindow = parseInt(searchParams.get('timeWindow') || '3600000'); // 기본 1시간

    // API 모니터링 통계
    const overallStats = apiMonitor.getOverallStats();
    const aggregatedMetrics = apiMonitor.getAggregatedMetrics(timeWindow);
    const thresholds = apiMonitor.checkThresholds();

    // 캐시 통계
    const cacheStats = apiCache.getStats();

    const stats = {
      overview: {
        ...overallStats,
        timeWindow: timeWindow,
        timestamp: new Date().toISOString()
      },
      endpoints: aggregatedMetrics,
      alerts: thresholds,
      cache: {
        ...cacheStats,
        hitRate: cacheStats.total > 0 ? (cacheStats.valid / cacheStats.total) * 100 : 0
      },
      recommendations: generateRecommendations(aggregatedMetrics, thresholds, cacheStats)
    };

    return createSuccessResponse(stats, {
      meta: {
        development_only: true,
        timeWindow: `${timeWindow}ms`,
        generated_at: new Date().toISOString()
      }
    });

  } catch (error) {
    return createInternalError(error as Error, 'API 성능 통계 조회');
  }
}

/**
 * 성능 개선 권장사항 생성
 */
function generateRecommendations(
  metrics: Record<string, any>,
  thresholds: any,
  cacheStats: any
): string[] {
  const recommendations: string[] = [];

  // 느린 엔드포인트
  if (thresholds.slowEndpoints.length > 0) {
    recommendations.push(
      `느린 응답 엔드포인트 최적화 필요: ${thresholds.slowEndpoints.join(', ')}`
    );
  }

  // 높은 에러율
  if (thresholds.highErrorEndpoints.length > 0) {
    recommendations.push(
      `높은 에러율 엔드포인트 점검 필요: ${thresholds.highErrorEndpoints.join(', ')}`
    );
  }

  // 낮은 캐시 히트율
  if (thresholds.lowCacheEndpoints.length > 0) {
    recommendations.push(
      `캐시 전략 개선 필요: ${thresholds.lowCacheEndpoints.join(', ')}`
    );
  }

  // 캐시 메모리 정리
  if (cacheStats.expired > cacheStats.valid) {
    recommendations.push('만료된 캐시 정리 필요');
  }

  // 전체적인 성능 권장사항
  const totalEndpoints = Object.keys(metrics).length;
  if (totalEndpoints > 10) {
    recommendations.push('API 엔드포인트 수가 많습니다. 통합 고려 필요');
  }

  if (recommendations.length === 0) {
    recommendations.push('현재 API 성능이 양호합니다.');
  }

  return recommendations;
}