/**
 * API 응답 표준화 유틸리티
 * 모든 API 엔드포인트에서 일관된 응답 형식 제공
 */

import { NextResponse } from 'next/server';

// 표준 API 응답 인터페이스
export interface StandardApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp: string;
  total?: number;
  page?: number;
  limit?: number;
  meta?: Record<string, any>;
}

// 에러 타입 정의
export enum ApiErrorType {
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  NOT_FOUND = 'NOT_FOUND',
  INTERNAL_ERROR = 'INTERNAL_ERROR',
  EXTERNAL_API_ERROR = 'EXTERNAL_API_ERROR',
  CACHE_ERROR = 'CACHE_ERROR',
  RATE_LIMIT = 'RATE_LIMIT'
}

// 성공 응답 생성
export function createSuccessResponse<T>(
  data: T,
  options?: {
    message?: string;
    total?: number;
    page?: number;
    limit?: number;
    meta?: Record<string, any>;
  }
): NextResponse {
  const response: StandardApiResponse<T> = {
    success: true,
    data,
    timestamp: new Date().toISOString(),
    ...options
  };

  return NextResponse.json(response, {
    headers: {
      'Cache-Control': 'public, max-age=60, s-maxage=300',
      'Content-Type': 'application/json'
    }
  });
}

// 에러 응답 생성
export function createErrorResponse(
  errorType: ApiErrorType,
  message: string,
  statusCode = 500,
  meta?: Record<string, any>
): NextResponse {
  const response: StandardApiResponse = {
    success: false,
    error: errorType,
    message,
    timestamp: new Date().toISOString(),
    meta
  };

  return NextResponse.json(response, {
    status: statusCode,
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

// 유효성 검사 에러 응답
export function createValidationError(message: string, meta?: Record<string, any>): NextResponse {
  return createErrorResponse(ApiErrorType.VALIDATION_ERROR, message, 400, meta);
}

// 404 에러 응답
export function createNotFoundError(resource: string): NextResponse {
  return createErrorResponse(
    ApiErrorType.NOT_FOUND,
    `${resource}을(를) 찾을 수 없습니다.`,
    404
  );
}

// 내부 서버 에러 응답
export function createInternalError(error: Error, context?: string): NextResponse {
  const message = context 
    ? `${context} 중 오류가 발생했습니다.`
    : '내부 서버 오류가 발생했습니다.';

  return createErrorResponse(
    ApiErrorType.INTERNAL_ERROR,
    message,
    500,
    { 
      errorDetails: process.env.NODE_ENV === 'development' ? error.message : undefined
    }
  );
}

// 외부 API 에러 응답
export function createExternalApiError(service: string, error?: Error): NextResponse {
  return createErrorResponse(
    ApiErrorType.EXTERNAL_API_ERROR,
    `${service} 연동 중 오류가 발생했습니다.`,
    502,
    {
      service,
      errorDetails: process.env.NODE_ENV === 'development' ? error?.message : undefined
    }
  );
}

// 페이지네이션 메타데이터 생성
export function createPaginationMeta(
  total: number,
  page: number,
  limit: number
) {
  const totalPages = Math.ceil(total / limit);
  
  return {
    pagination: {
      total,
      page,
      limit,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1
    }
  };
}

// 캐시 메타데이터 생성
export function createCacheMeta(
  cached: boolean,
  cacheKey?: string,
  ttl?: number
) {
  return {
    cache: {
      cached,
      cacheKey,
      ttl,
      timestamp: new Date().toISOString()
    }
  };
}

// API 요청 파라미터 검증
export function validateRequiredParams(
  params: Record<string, any>,
  required: string[]
): string[] {
  const missing: string[] = [];
  
  for (const param of required) {
    if (!params[param] || params[param] === '') {
      missing.push(param);
    }
  }
  
  return missing;
}

// API 요청 파라미터 정제
export function sanitizeParams(
  params: Record<string, any>,
  allowed: string[]
): Record<string, any> {
  const sanitized: Record<string, any> = {};
  
  for (const key of allowed) {
    if (params[key] !== undefined && params[key] !== null) {
      sanitized[key] = params[key];
    }
  }
  
  return sanitized;
}