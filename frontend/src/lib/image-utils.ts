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

/**
 * 뉴스 아이템 타입 정의 (alt 텍스트 생성용)
 */
interface NewsItemForAlt {
  title: string;
  type?: string;
  source?: string;
  channel?: string;
  views?: string;
  keyword?: string;
}

/**
 * 콘텐츠 타입별 한국어 라벨 반환
 */
const getTypeLabel = (type?: string): string => {
  switch (type) {
    case 'youtube': return '유튜브';
    case 'blog': return '블로그';
    case 'news': return '뉴스';
    default: return '콘텐츠';
  }
};

/**
 * SEO 최적화된 alt 텍스트 생성
 * 지역 키워드 + 카테고리 + 제목 + 브랜딩 조합
 */
export const generateSEOAltText = (item: NewsItemForAlt): string => {
  const location = "송도국제도시";
  const category = getTypeLabel(item.type);
  const source = item.type === 'youtube' ? item.channel : item.source;
  const brandName = "송도라이프";
  
  let altText = `${location} ${category}: ${item.title}`;
  
  if (source) {
    altText += ` - ${source}`;
  }
  
  altText += ` | ${brandName}`;
  
  // alt 텍스트 길이 제한 (검색엔진 최적화)
  if (altText.length > 125) {
    altText = altText.substring(0, 120) + '... | ' + brandName;
  }
  
  return altText;
};

/**
 * 접근성 고려 alt 텍스트 생성
 * 스크린 리더 사용자를 위한 상세한 설명
 */
export const generateAccessibleAltText = (item: NewsItemForAlt): string => {
  let description = item.title;
  
  if (item.type === 'youtube') {
    description += ` - ${item.channel || '유튜브'} 채널의 동영상`;
    if (item.views) {
      description += `, 조회수 ${item.views}`;
    }
  } else if (item.type === 'blog') {
    description += ` - ${item.source || '블로그'} 포스트`;
  } else if (item.type === 'news') {
    description += ` - ${item.source || '뉴스'} 기사`;
  }
  
  description += ' | 송도국제도시 정보';
  
  return description;
};

/**
 * 통합 alt 텍스트 생성 (SEO + 접근성 균형)
 * 기본적으로 SEO 최적화를 우선하되, 접근성도 고려
 */
export const generateOptimizedAltText = (item: NewsItemForAlt, prioritizeAccessibility = false): string => {
  if (prioritizeAccessibility) {
    return generateAccessibleAltText(item);
  }
  return generateSEOAltText(item);
};

/**
 * 기본 이미지별 최적화된 alt 텍스트
 */
export const getDefaultImageAltText = (type: 'og' | 'logo' | 'favicon' | 'thumbnail' = 'og'): string => {
  const brandName = "송도라이프";
  const location = "송도국제도시";
  
  switch (type) {
    case 'og':
      return `${location} 생활정보 플랫폼 - 부동산, 맛집, 교통, 육아 정보 | ${brandName}`;
    case 'logo':
      return `${brandName} 로고 - ${location} 지역정보 허브`;
    case 'favicon':
      return `${brandName} 파비콘`;
    case 'thumbnail':
      return `${location} 관련 썸네일 이미지 | ${brandName}`;
    default:
      return `${location} 관련 이미지 | ${brandName}`;
  }
};

/**
 * 향상된 뉴스 이미지 설정 (SEO 최적화된 alt 포함)
 */
export const getNewsImageConfigWithSEO = (item: NewsItemForAlt, thumbnail?: string) => {
  const optimizedAlt = generateOptimizedAltText(item);
  
  if (!thumbnail) {
    return getImageConfig(ImagePriority.LOW, '/og-image.jpg', getDefaultImageAltText('og'));
  }

  return getImageConfig(ImagePriority.NORMAL, thumbnail, optimizedAlt, {
    blurDataURL: THUMBNAIL_BLUR_DATA_URL
  });
}; 