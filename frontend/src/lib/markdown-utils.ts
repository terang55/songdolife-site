
export interface MarkdownFrontMatter {
  slug: string;
  title: string;
  description: string;
  keywords: string[];
  lastUpdated: string;
  relatedGuides: string[];
  readingTime: number;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
  featured: boolean;
}

export interface ParsedMarkdown {
  frontMatter: MarkdownFrontMatter;
  content: string;
  htmlContent: string;
}

// 미리 생성된 HTML 콘텐츠 맵
const PREGENERATED_CONTENT: { [key: string]: string } = {
  'songdo-childcare-guide': ''
};

// 기존 PREGENERATED_CONTENT에서 새로운 파일 기반 시스템으로 점진적 마이그레이션
export async function loadGuideContent(category: string, slug: string): Promise<string> {
  // 서버 사이드에서는 새로운 마크다운 로더 시도
  if (typeof window === 'undefined') {
    try {
      const { loadGuideContent: newLoadGuideContent } = await import('./markdown-loader');
      const content = newLoadGuideContent(category, slug);
      if (content) {
        return content;
      }
    } catch (error) {
      console.warn('새로운 마크다운 로더 사용 중 오류:', error);
    }
  }
  
  // 클라이언트 사이드에서는 기존 PREGENERATED_CONTENT 사용
  return PREGENERATED_CONTENT[slug] || '';
}