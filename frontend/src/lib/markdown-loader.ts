// Next.js에서 fs는 서버 사이드에서만 사용 가능
let fs: any;
let path: any;
let matter: any;
let marked: any;
let tocUtils: any;

// 서버 환경에서만 모듈 로드
if (typeof window === 'undefined') {
  fs = require('fs');
  path = require('path');
  matter = require('gray-matter');
  marked = require('marked');
  tocUtils = require('./toc-utils');
}

export interface GuideMetadata {
  title: string;
  slug: string;
  description: string;
  category: 'realestate' | 'transportation' | 'lifestyle' | 'moving' | 'seasonal' | 'childcare' | 'education';
  keywords: string[];
  lastUpdated: string;
  readingTime: number;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
  featured?: boolean;
  relatedGuides?: string[];
  author?: string;
  version?: string;
}

export interface ParsedGuide {
  metadata: GuideMetadata;
  content: string;
  htmlContent: string;
}

// 메모리 캐시
const guideCache = new Map<string, ParsedGuide>();
const cacheTimestamps = new Map<string, number>();
const CACHE_TTL = 1000 * 60 * 5; // 5분

/**
 * 가이드 파일 경로 생성
 */
function getGuidePath(category: string, slug: string): string {
  if (typeof window !== 'undefined' || !path) {
    return '';
  }
  const publicDir = path.join(process.cwd(), 'public', 'guides');
  return path.join(publicDir, category, `${slug}.md`);
}

/**
 * 고급 마크다운을 HTML로 변환 (marked 라이브러리 사용)
 */
function markdownToHtml(markdown: string): string {
  if (typeof window !== 'undefined' || !marked) {
    // 클라이언트 사이드에서는 기본 변환 유지
    return markdown
      .replace(/^### (.*$)/gm, '<h3>$1</h3>')
      .replace(/^## (.*$)/gm, '<h2>$1</h2>')
      .replace(/^# (.*$)/gm, '<h1>$1</h1>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n\n/g, '</p><p>')
      .replace(/^(?!<[h1-6]|<p)(.+)$/gm, '<p>$1</p>')
      .replace(/^\- (.+)$/gm, '<li>$1</li>')
      .replace(/(<li>[\s\S]*?<\/li>)/g, '<ul>$1</ul>');
  }

  try {
    // 특별 블록 처리를 먼저 수행
    const processedMarkdown = processSpecialBlocks(markdown);
    
    // 목차 생성 (원본 마크다운에서 추출)
    const tocItems = tocUtils ? tocUtils.generateTableOfContents(markdown) : [];
    
    // marked 기본 설정만 사용
    marked.setOptions({
      breaks: true,
      gfm: true,
      headerIds: false,
      mangle: false,
      sanitize: false
    });
    
    // marked로 파싱 (기본 렌더러 사용)
    let result = marked.parse(processedMarkdown);
    
    // 목차 앵커 추가
    if (tocUtils && tocItems.length > 0) {
      result = tocUtils.addAnchorsToContent(result, tocItems);
    }
    
    // 후처리: 스타일 클래스 추가
    result = result
      // 헤더 스타일링
      .replace(/<h1>/g, '<h1 class="text-3xl font-bold text-gray-900 mb-6 mt-8 pb-3 border-b-2 border-blue-200">')
      .replace(/<h2>/g, '<h2 class="text-2xl font-semibold text-gray-800 mb-4 mt-6 flex items-center gap-2">')
      .replace(/<h3>/g, '<h3 class="text-xl font-medium text-gray-700 mb-3 mt-5">')
      .replace(/<h4>/g, '<h4 class="text-lg font-medium text-gray-600 mb-2 mt-4">')
      .replace(/<h5>/g, '<h5 class="text-base font-medium text-gray-600 mb-2 mt-3">')
      .replace(/<h6>/g, '<h6 class="text-sm font-medium text-gray-600 mb-2 mt-3">')
      // 단락 스타일링
      .replace(/<p>/g, '<p class="text-gray-700 leading-relaxed mb-4">')
      // 리스트 스타일링
      .replace(/<ul>/g, '<ul class="list-disc list-inside space-y-2 ml-4 mb-4">')
      .replace(/<ol>/g, '<ol class="list-decimal list-inside space-y-2 ml-4 mb-4">')
      .replace(/<li>/g, '<li class="text-gray-700 leading-relaxed">')
      // 강조 스타일링
      .replace(/<strong>/g, '<strong class="font-semibold text-gray-900">')
      // 코드 스타일링
      .replace(/<code>/g, '<code class="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm font-mono">')
      // 블록쿼트 스타일링
      .replace(/<blockquote>/g, '<blockquote class="border-l-4 border-blue-400 bg-blue-50 p-4 my-4 rounded-r-lg">')
      // 테이블 스타일링
      .replace(/<table>/g, '<div class="overflow-x-auto my-6"><table class="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg">')
      .replace(/<\/table>/g, '</table></div>')
      .replace(/<thead>/g, '<thead class="bg-gray-50">')
      .replace(/<tbody>/g, '<tbody class="bg-white divide-y divide-gray-200">')
      .replace(/<tr>/g, '<tr class="hover:bg-gray-50">')
      .replace(/<th>/g, '<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">')
      .replace(/<td>/g, '<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">');
    
    // 최종 결과에서 [object Object] 제거 (후처리)
    if (typeof result === 'string') {
      result = result.replace(/\[object Object\]/g, '');
    }
    
    return result;
  } catch (error) {
    console.error('마크다운 변환 오류:', error);
    // 에러 시 기본 변환으로 폴백
    return markdown
      .replace(/^### (.*$)/gm, '<h3>$1</h3>')
      .replace(/^## (.*$)/gm, '<h2>$1</h2>')
      .replace(/^# (.*$)/gm, '<h1>$1</h1>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>');
  }
}

/**
 * 특별 블록 내용을 마크다운으로 파싱하는 헬퍼 함수
 */
function parseBlockContent(content: string): string {
  // 간단하고 확실한 변환만 사용
  return content
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/^- (.+)$/gm, '<div class="mb-1 p-1 bg-gray-100 rounded text-sm">• $1</div>')
    .replace(/\n\n/g, '<br/>')
    .replace(/\n/g, ' ');
}

/**
 * 연락처 정보를 구조화된 HTML로 변환
 */
function parseContactBlock(content: string): string {
  const lines = content.trim().split('\n');
  let html = '';
  let currentTitle = '';
  let currentInfo = [];
  
  for (const line of lines) {
    const trimmedLine = line.trim();
    if (!trimmedLine) continue;
    
    // 제목 라인 (** 로 감싸진 텍스트)
    if (trimmedLine.match(/^\*\*([^*]+)\*\*$/)) {
      // 이전 항목 정리
      if (currentTitle && currentInfo.length > 0) {
        html += generateContactCard(currentTitle, currentInfo);
        currentInfo = [];
      }
      currentTitle = trimmedLine.replace(/^\*\*|\*\*$/g, '');
    }
    // 정보 라인 (- 로 시작)
    else if (trimmedLine.startsWith('- ')) {
      const infoLine = trimmedLine.substring(2);
      currentInfo.push(infoLine);
    }
    // 일반 텍스트
    else {
      currentInfo.push(trimmedLine);
    }
  }
  
  // 마지막 항목 추가
  if (currentTitle && currentInfo.length > 0) {
    html += generateContactCard(currentTitle, currentInfo);
  }
  
  return html;
}

/**
 * 연락처 카드 HTML 생성
 */
function generateContactCard(title: string, info: string[]): string {
  let cardHtml = '<div class="bg-white border border-blue-200 rounded-lg p-4 mb-4 shadow-sm">';
  cardHtml += `<h4 class="text-lg font-bold text-blue-900 mb-3 pb-2 border-b border-blue-100">${title}</h4>`;
  
  // 모든 정보를 간단한 목록으로 표시
  cardHtml += '<div class="space-y-2">';
  for (const item of info) {
    let parsed = item.replace(/\*\*(.*?)\*\*/g, '<span class="font-medium text-gray-600">$1</span>');
    
    // 전화번호 링크 처리
    if (parsed.includes('문의') || parsed.includes('연락처')) {
      parsed = parsed.replace(/([\d-]+)/g, '<a href="tel:$1" class="text-blue-600 hover:text-blue-800 font-medium">$1</a>');
    }
    
    cardHtml += `<div class="bg-gray-50 rounded p-2 text-sm">${parsed}</div>`;
  }
  cardHtml += '</div>';
  cardHtml += '</div>';
  
  return cardHtml;
}

/**
 * 특별 블록 처리 함수 (:::info, :::warning 등)
 * 특별 블록만 HTML로 변환하고 나머지 마크다운은 그대로 유지
 */
function processSpecialBlocks(markdown: string): string {
  // :::contact 블록 - 구조화된 연락처 정보
  markdown = markdown.replace(
    /:::contact\s*([\s\S]*?):::/g,
    (match, content) => {
      const parsedContent = parseBlockContent(content);
      return `\n<div class="bg-blue-50 border border-blue-200 p-4 my-6 rounded-lg">
        <div class="flex items-center mb-4">
          <span class="text-blue-600 text-lg mr-2">📞</span>
          <span class="text-blue-800 font-semibold">연락처 정보</span>
        </div>
        <div class="bg-white rounded-lg p-4 space-y-2">
          <div class="text-blue-700 leading-relaxed">${parsedContent}</div>
        </div>
      </div>\n`;
    }
  );

  // :::warning 블록
  markdown = markdown.replace(
    /:::warning\s*([\s\S]*?):::/g,
    (match, content) => {
      const parsedContent = parseBlockContent(content);
      return `\n<div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-6 rounded-r-lg">
        <div class="flex items-center mb-3">
          <span class="text-yellow-600 text-lg mr-2">⚠️</span>
          <span class="text-yellow-800 font-semibold">주의사항</span>
        </div>
        <div class="text-yellow-700 leading-relaxed">${parsedContent}</div>
      </div>\n`;
    }
  );

  // :::info 블록
  markdown = markdown.replace(
    /:::info\s*([\s\S]*?):::/g,
    (match, content) => {
      const parsedContent = parseBlockContent(content);
      return `\n<div class="bg-blue-50 border-l-4 border-blue-400 p-4 my-6 rounded-r-lg">
        <div class="flex items-center mb-3">
          <span class="text-blue-600 text-lg mr-2">ℹ️</span>
          <span class="text-blue-800 font-semibold">정보</span>
        </div>
        <div class="text-blue-700 leading-relaxed">${parsedContent}</div>
      </div>\n`;
    }
  );

  // :::price 블록
  markdown = markdown.replace(
    /:::price\s*([\s\S]*?):::/g,
    (match, content) => {
      const parsedContent = parseBlockContent(content);
      return `\n<div class="bg-purple-50 border-l-4 border-purple-400 p-4 my-6 rounded-r-lg">
        <div class="flex items-center mb-3">
          <span class="text-purple-600 text-lg mr-2">💰</span>
          <span class="text-purple-800 font-semibold">가격 정보</span>
        </div>
        <div class="text-purple-700 leading-relaxed">${parsedContent}</div>
      </div>\n`;
    }
  );

  // :::tip 블록
  markdown = markdown.replace(
    /:::tip\s*([\s\S]*?):::/g,
    (match, content) => {
      const parsedContent = parseBlockContent(content);
      return `\n<div class="bg-green-50 border-l-4 border-green-400 p-4 my-6 rounded-r-lg">
        <div class="flex items-center mb-3">
          <span class="text-green-600 text-lg mr-2">💡</span>
          <span class="text-green-800 font-semibold">팁</span>
        </div>
        <div class="text-green-700 leading-relaxed">${parsedContent}</div>
      </div>\n`;
    }
  );

  // :::schedule 블록
  markdown = markdown.replace(
    /:::schedule\s*([\s\S]*?):::/g,
    (match, content) => {
      const parsedContent = parseBlockContent(content);
      return `\n<div class="bg-indigo-50 border-l-4 border-indigo-400 p-4 my-6 rounded-r-lg">
        <div class="flex items-center mb-3">
          <span class="text-indigo-600 text-lg mr-2">🕐</span>
          <span class="text-indigo-800 font-semibold">운영시간</span>
        </div>
        <div class="text-indigo-700 leading-relaxed">${parsedContent}</div>
      </div>\n`;
    }
  );

  return markdown;
}

/**
 * 캐시 유효성 검사
 */
function isCacheValid(cacheKey: string): boolean {
  const timestamp = cacheTimestamps.get(cacheKey);
  if (!timestamp) return false;
  return Date.now() - timestamp < CACHE_TTL;
}

/**
 * 가이드 로드 및 파싱
 */
export function loadGuide(category: string, slug: string): ParsedGuide | null {
  // 클라이언트 사이드에서는 null 반환
  if (typeof window !== 'undefined' || !fs || !matter) {
    return null;
  }

  const cacheKey = `${category}/${slug}`;
  
  // 캐시 확인
  if (guideCache.has(cacheKey) && isCacheValid(cacheKey)) {
    return guideCache.get(cacheKey)!;
  }

  try {
    const filePath = getGuidePath(category, slug);
    
    // 파일 존재 확인
    if (!filePath || !fs.existsSync(filePath)) {
      console.warn(`가이드 파일을 찾을 수 없습니다: ${filePath}`);
      return null;
    }

    // 파일 읽기 및 파싱
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data: frontMatter, content } = matter(fileContent);

    // 메타데이터 검증 및 기본값 설정
    const metadata: GuideMetadata = {
      title: frontMatter.title || `${slug} 가이드`,
      slug: frontMatter.slug || slug,
      description: frontMatter.description || '',
      category: frontMatter.category || category,
      keywords: frontMatter.keywords || [],
      lastUpdated: frontMatter.lastUpdated || new Date().toISOString().split('T')[0],
      readingTime: frontMatter.readingTime || 10,
      difficulty: frontMatter.difficulty || 'medium',
      tags: frontMatter.tags || [],
      featured: frontMatter.featured || false,
      relatedGuides: frontMatter.relatedGuides || [],
      author: frontMatter.author || '송도라이프',
      version: frontMatter.version || '1.0'
    };

    // HTML 변환
    const htmlContent = markdownToHtml(content);

    const parsedGuide: ParsedGuide = {
      metadata,
      content,
      htmlContent
    };

    // 캐시 저장
    guideCache.set(cacheKey, parsedGuide);
    cacheTimestamps.set(cacheKey, Date.now());

    return parsedGuide;

  } catch (error) {
    console.error(`가이드 로드 오류 (${category}/${slug}):`, error);
    return null;
  }
}

/**
 * 특정 카테고리의 모든 가이드 목록 가져오기
 */
export function getGuidesByCategory(category: string): GuideMetadata[] {
  // 클라이언트 사이드에서는 빈 배열 반환
  if (typeof window !== 'undefined' || !fs || !path) {
    return [];
  }

  try {
    const categoryPath = path.join(process.cwd(), 'public', 'guides', category);
    
    if (!fs.existsSync(categoryPath)) {
      return [];
    }

    const files = fs.readdirSync(categoryPath);
    const guides: GuideMetadata[] = [];

    for (const file of files) {
      if (file.endsWith('.md')) {
        const slug = file.replace('.md', '');
        const guide = loadGuide(category, slug);
        
        if (guide) {
          guides.push(guide.metadata);
        }
      }
    }

    // 최신 업데이트 순으로 정렬
    return guides.sort((a, b) => 
      new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
    );

  } catch (error) {
    console.error(`카테고리 가이드 로드 오류 (${category}):`, error);
    return [];
  }
}

/**
 * 모든 가이드 목록 가져오기
 */
export function getAllGuides(): GuideMetadata[] {
  const categories = ['realestate', 'transportation', 'lifestyle', 'moving', 'seasonal', 'childcare', 'education'];
  const allGuides: GuideMetadata[] = [];

  for (const category of categories) {
    const categoryGuides = getGuidesByCategory(category);
    allGuides.push(...categoryGuides);
  }

  return allGuides.sort((a, b) => 
    new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
  );
}

/**
 * 추천 가이드 가져오기
 */
export function getFeaturedGuides(): GuideMetadata[] {
  return getAllGuides().filter(guide => guide.featured);
}

/**
 * 캐시 클리어 (개발 시 유용)
 */
export function clearCache(): void {
  guideCache.clear();
  cacheTimestamps.clear();
}

/**
 * 기존 loadGuideContent 함수와의 호환성을 위한 함수
 */
export function loadGuideContent(category: string, slug: string): string {
  const guide = loadGuide(category, slug);
  return guide ? guide.htmlContent : '';
}