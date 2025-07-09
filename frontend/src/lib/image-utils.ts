/**
 * 이미지 최적화 유틸리티 함수들
 * - blur placeholder 생성
 * - 이미지 우선순위 관리
 * - 성능 최적화를 위한 도구들
 */

/**
 * base64로 인코딩된 blur placeholder 생성
 * 매우 작은 1x1 픽셀 투명한 이미지 데이터 URL
 */
export const DEFAULT_BLUR_DATA_URL = 
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx4f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R7ez/jJ4MA4wMY6kUg8dCRMk8lq4FrwbVLBPnX6/wB7l0/mEe5T3TF9j8VPcgz6OBqjKoE5z0KyGgc7UCL9z24FfXqJmZdw7YEybsGScWKa6Y1ShlxS9N1p8lpmcyNqjSx0U3xVVdL8jSHSMCqH0qhG9idL0THhWGqm9qrzCFgHQ/6h7lPdU/RuuKlYUNaNZBRAqXJfRdtEWXsRGRTF8Tf6lE8h5l0vUL5Mj6Q8VJI12dJgj1UVwWp1v2VhU+C2M5x0E6hn6EYLjBpY1EXPqxeIVjfL2HYH64q3pj+3VjTHOczUJPUZTgSZX8jFUn2xK2/kcUvFQ6JsLOKGdj6FRt05hy0sE8a0qeINLABLsZ4q3JftPJUKjH/Z";

/**
 * 색상별 blur placeholder URL 생성
 */
export const generateBlurDataURL = (color = '#f0f0f0', width = 8, height = 8): string => {
  const canvas = typeof window !== 'undefined' ? document.createElement('canvas') : null;
  
  if (!canvas) {
    // 서버 사이드에서는 기본 placeholder 반환
    return DEFAULT_BLUR_DATA_URL;
  }

  canvas.width = width;
  canvas.height = height;
  
  const ctx = canvas.getContext('2d');
  if (!ctx) return DEFAULT_BLUR_DATA_URL;
  
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, width, height);
  
  return canvas.toDataURL('image/jpeg', 0.1);
};

/**
 * 이미지 유형별 우선순위 정의
 */
export enum ImagePriority {
  CRITICAL = 'critical',    // Above the fold, LCP 후보
  HIGH = 'high',           // 중요한 컨텐츠 이미지
  NORMAL = 'normal',       // 일반 컨텐츠 이미지
  LOW = 'low'              // 스크롤 하단, 썸네일 등
}

/**
 * 이미지 위치 및 중요도에 따른 로딩 전략 결정
 */
export interface ImageOptimizationProps {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  sizes?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
}

/**
 * 이미지 타입별 최적화 설정 생성
 */
export const getImageConfig = (
  type: ImagePriority, 
  src: string, 
  alt: string,
  customConfig?: Partial<ImageOptimizationProps>
): ImageOptimizationProps => {
  const baseConfig: ImageOptimizationProps = {
    src,
    alt,
    quality: 85,
    placeholder: 'blur',
    blurDataURL: DEFAULT_BLUR_DATA_URL,
    ...customConfig
  };

  switch (type) {
    case ImagePriority.CRITICAL:
      return {
        ...baseConfig,
        priority: true,
        quality: 90,
        sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
      };
      
    case ImagePriority.HIGH:
      return {
        ...baseConfig,
        priority: false,
        quality: 85,
        sizes: '(max-width: 768px) 100vw, 50vw'
      };
      
    case ImagePriority.NORMAL:
      return {
        ...baseConfig,
        priority: false,
        quality: 80,
        sizes: '(max-width: 768px) 50vw, 25vw'
      };
      
    case ImagePriority.LOW:
      return {
        ...baseConfig,
        priority: false,
        quality: 75,
        sizes: '(max-width: 768px) 25vw, 15vw'
      };
      
    default:
      return baseConfig;
  }
};

/**
 * 이미지 URL이 외부 링크인지 확인
 */
export const isExternalImage = (src: string): boolean => {
  return src.startsWith('http://') || src.startsWith('https://');
};

/**
 * 썸네일 이미지에 대한 기본 blur placeholder
 */
export const THUMBNAIL_BLUR_DATA_URL = 
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx4f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R7ez/jJ4MA4wMY6kUg8dCRMk8lq4FrwbVLBPnX6/wB7l0/mEe5T3TF9j8VPcgz6OBqjKoE5z0KyGgc7UCL9z24FfXqJmZdw7YEybsGScWKa6Y1ShlxS9N1p8lpmcyNqjSx0U3xVVdL8jSHSMCqH0qhG9idL0THhWGqm9qrzCFgHQ/6h7lPdU/RuuKlYUNaNZBRAqXJfRdtEWXsRGRTF8Tf6lE8h5l0vUL5Mj6Q8VJI12dJgj1UVwWp1v2VhU+C2M5x0E6hn6EYLjBpY1EXPqxeIVjfL2HYH64q3pj+3VjTHOczUJPUZTgSZX8jFUn2xK2/kcUvFQ6JsLOKGdj6FRt05hy0sE8a0qeINLABLsZ4q3JftPJUKjH/Z";

/**
 * 새소식/블로그 썸네일 처리를 위한 헬퍼 함수
 */
export const getNewsImageConfig = (thumbnail?: string) => {
  if (!thumbnail) {
    return getImageConfig(ImagePriority.LOW, '/og-image.jpg', '송도라이프 기본 이미지');
  }

  return getImageConfig(ImagePriority.NORMAL, thumbnail, '뉴스 썸네일', {
    blurDataURL: THUMBNAIL_BLUR_DATA_URL
  });
}; 