import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

export interface GuideMetadata {
  title: string;
  slug: string;
  description: string;
  category: string;
  tags: string[];
  featured: boolean;
  difficulty: 'easy' | 'medium' | 'hard';
  readingTime: number;
  lastUpdated: string;
}

export interface GuideContent extends GuideMetadata {
  content: string;
  rawContent: string;
}

/**
 * 특별 블록을 HTML로 변환하는 함수
 */
function processSpecialBlocks(content: string): string {
  // :::info 블록 처리
  content = content.replace(/:::info\s*\n([\s\S]*?):::/g, (match, blockContent) => {
    const processedContent = parseBlockContent(blockContent);
    return `<div class="mb-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg">
      <div class="flex items-center mb-2">
        <span class="text-blue-600 text-lg mr-2">ℹ️</span>
        <h4 class="text-blue-800 font-semibold">정보</h4>
      </div>
      <div class="text-blue-700 text-sm leading-relaxed">${processedContent}</div>
    </div>`;
  });

  // :::warning 블록 처리
  content = content.replace(/:::warning\s*\n([\s\S]*?):::/g, (match, blockContent) => {
    const processedContent = parseBlockContent(blockContent);
    return `<div class="mb-6 p-4 bg-amber-50 border-l-4 border-amber-500 rounded-r-lg">
      <div class="flex items-center mb-2">
        <span class="text-amber-600 text-lg mr-2">⚠️</span>
        <h4 class="text-amber-800 font-semibold">주의사항</h4>
      </div>
      <div class="text-amber-700 text-sm leading-relaxed">${processedContent}</div>
    </div>`;
  });

  // :::tip 블록 처리
  content = content.replace(/:::tip\s*\n([\s\S]*?):::/g, (match, blockContent) => {
    const processedContent = parseBlockContent(blockContent);
    return `<div class="mb-6 p-4 bg-green-50 border-l-4 border-green-500 rounded-r-lg">
      <div class="flex items-center mb-2">
        <span class="text-green-600 text-lg mr-2">💡</span>
        <h4 class="text-green-800 font-semibold">팁</h4>
      </div>
      <div class="text-green-700 text-sm leading-relaxed">${processedContent}</div>
    </div>`;
  });

  // :::contact 블록 처리
  content = content.replace(/:::contact\s*\n([\s\S]*?):::/g, (match, blockContent) => {
    const processedContent = parseBlockContent(blockContent);
    return `<div class="mb-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
      <div class="flex items-center mb-3">
        <span class="text-gray-600 text-lg mr-2">📞</span>
        <h4 class="text-gray-800 font-semibold">연락처 정보</h4>
      </div>
      <div class="text-gray-700 text-sm space-y-1">${processedContent}</div>
    </div>`;
  });

  // :::price 블록 처리
  content = content.replace(/:::price\s*\n([\s\S]*?):::/g, (match, blockContent) => {
    const processedContent = parseBlockContent(blockContent);
    return `<div class="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
      <div class="flex items-center mb-3">
        <span class="text-emerald-600 text-lg mr-2">💰</span>
        <h4 class="text-emerald-800 font-semibold">가격 정보</h4>
      </div>
      <div class="text-emerald-700 text-sm space-y-1">${processedContent}</div>
    </div>`;
  });

  // :::schedule 블록 처리
  content = content.replace(/:::schedule\s*\n([\s\S]*?):::/g, (match, blockContent) => {
    const processedContent = parseBlockContent(blockContent);
    return `<div class="mb-6 p-4 bg-purple-50 border border-purple-200 rounded-lg">
      <div class="flex items-center mb-3">
        <span class="text-purple-600 text-lg mr-2">📅</span>
        <h4 class="text-purple-800 font-semibold">일정 정보</h4>
      </div>
      <div class="text-purple-700 text-sm space-y-1">${processedContent}</div>
    </div>`;
  });

  return content;
}

/**
 * 블록 내용을 파싱하여 HTML로 변환
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
 * 마크다운 파일을 로드하고 파싱하는 함수 (동기 버전)
 */
export function loadGuideContentSync(slug: string, category?: string): GuideContent | null {
  try {
    console.log(`🔍 Loading guide: ${slug}, category: ${category}`);
    const publicDir = path.join(process.cwd(), 'public');
    let filePath: string;
    
    // 카테고리별 디렉토리 매핑
    if (category) {
      if (category === 'lifestyle' && slug === 'songdo-childcare-guide') {
        filePath = path.join(publicDir, 'guides', 'lifestyle', 'songdo-childcare-guide.md');
      } else {
        filePath = path.join(publicDir, 'guides', category, `${slug}.md`);
      }
    } else {
      // 기본 경로들 시도
      const possiblePaths = [
        path.join(publicDir, 'guides', `${slug}.md`),
        path.join(publicDir, 'guides', 'lifestyle', `${slug}.md`),
        path.join(publicDir, 'guides', 'education', `${slug}.md`),
        path.join(publicDir, 'guides', 'moving', `${slug}.md`),
        path.join(publicDir, 'guides', 'seasonal', `${slug}.md`),
      ];
      
      filePath = possiblePaths.find(p => fs.existsSync(p)) || possiblePaths[0];
    }
    
    console.log(`📁 Trying to load file: ${filePath}`);
    
    if (!fs.existsSync(filePath)) {
      console.warn(`❌ Guide file not found: ${filePath}`);
      return null;
    }
    
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data: frontMatter, content: rawContent } = matter(fileContent);
    
    // Front matter에서 메타데이터 추출
    const metadata: GuideMetadata = {
      title: frontMatter.title || '제목 없음',
      slug: frontMatter.slug || slug,
      description: frontMatter.description || '',
      category: frontMatter.category || category || 'general',
      tags: frontMatter.tags || [],
      featured: frontMatter.featured || false,
      difficulty: frontMatter.difficulty || 'medium',
      readingTime: frontMatter.readingTime || 5,
      lastUpdated: frontMatter.lastUpdated || new Date().toISOString(),
    };
    
    // 특별 블록 처리
    const processedContent = processSpecialBlocks(rawContent);
    
    // 나머지 마크다운을 HTML로 변환 (동기 방식)
    const htmlContent = marked(processedContent);
    
    return {
      ...metadata,
      content: htmlContent,
      rawContent,
    };
  } catch (error) {
    console.error('Error loading guide content:', error);
    return null;
  }
}

/**
 * 마크다운 파일을 로드하고 파싱하는 함수 (비동기 버전)
 */
export async function loadGuideContent(slug: string, category?: string): Promise<GuideContent | null> {
  try {
    const publicDir = path.join(process.cwd(), 'public');
    let filePath: string;
    
    // 카테고리별 디렉토리 매핑
    if (category) {
      if (category === 'lifestyle' && slug === 'songdo-childcare-guide') {
        filePath = path.join(publicDir, 'guides', 'lifestyle', 'songdo-childcare-guide.md');
      } else {
        filePath = path.join(publicDir, 'guides', category, `${slug}.md`);
      }
    } else {
      // 기본 경로들 시도
      const possiblePaths = [
        path.join(publicDir, 'guides', `${slug}.md`),
        path.join(publicDir, 'guides', 'lifestyle', `${slug}.md`),
        path.join(publicDir, 'guides', 'education', `${slug}.md`),
        path.join(publicDir, 'guides', 'moving', `${slug}.md`),
        path.join(publicDir, 'guides', 'seasonal', `${slug}.md`),
      ];
      
      filePath = possiblePaths.find(p => fs.existsSync(p)) || possiblePaths[0];
    }
    
    if (!fs.existsSync(filePath)) {
      console.warn(`Guide file not found: ${filePath}`);
      return null;
    }
    
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data: frontMatter, content: rawContent } = matter(fileContent);
    
    // Front matter에서 메타데이터 추출
    const metadata: GuideMetadata = {
      title: frontMatter.title || '제목 없음',
      slug: frontMatter.slug || slug,
      description: frontMatter.description || '',
      category: frontMatter.category || category || 'general',
      tags: frontMatter.tags || [],
      featured: frontMatter.featured || false,
      difficulty: frontMatter.difficulty || 'medium',
      readingTime: frontMatter.readingTime || 5,
      lastUpdated: frontMatter.lastUpdated || new Date().toISOString(),
    };
    
    // 특별 블록 처리
    const processedContent = processSpecialBlocks(rawContent);
    
    // 나머지 마크다운을 HTML로 변환
    const htmlContent = await marked.parse(processedContent);
    
    return {
      ...metadata,
      content: htmlContent,
      rawContent,
    };
  } catch (error) {
    console.error('Error loading guide content:', error);
    return null;
  }
}

/**
 * 가이드 목록을 카테고리별로 가져오는 함수
 */
export async function getGuidesList(category?: string): Promise<GuideMetadata[]> {
  try {
    const publicDir = path.join(process.cwd(), 'public', 'guides');
    const guides: GuideMetadata[] = [];
    
    if (category) {
      const categoryDir = path.join(publicDir, category);
      if (fs.existsSync(categoryDir)) {
        const files = fs.readdirSync(categoryDir).filter(file => file.endsWith('.md'));
        
        for (const file of files) {
          const slug = file.replace('.md', '');
          const guide = await loadGuideContent(slug, category);
          if (guide) {
            guides.push({
              title: guide.title,
              slug: guide.slug,
              description: guide.description,
              category: guide.category,
              tags: guide.tags,
              featured: guide.featured,
              difficulty: guide.difficulty,
              readingTime: guide.readingTime,
              lastUpdated: guide.lastUpdated,
            });
          }
        }
      }
    } else {
      // 모든 카테고리 검색
      const categories = ['lifestyle', 'education', 'moving', 'seasonal'];
      
      for (const cat of categories) {
        const categoryGuides = await getGuidesList(cat);
        guides.push(...categoryGuides);
      }
    }
    
    return guides.sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime());
  } catch (error) {
    console.error('Error getting guides list:', error);
    return [];
  }
}

/**
 * 단일 가이드 로드 (API에서 사용)
 */
export async function loadGuide(category: string, slug: string): Promise<GuideContent | null> {
  return await loadGuideContent(slug, category);
}

/**
 * 카테고리별 가이드 목록 가져오기 (API에서 사용)
 */
export async function getGuidesByCategory(category?: string): Promise<GuideMetadata[]> {
  return await getGuidesList(category);
}

/**
 * 추천 가이드 목록 가져오기
 */
export async function getFeaturedGuides(): Promise<GuideMetadata[]> {
  const allGuides = await getGuidesList();
  return allGuides.filter(guide => guide.featured);
}

/**
 * 모든 가이드 목록 가져오기
 */
export async function getAllGuides(): Promise<GuideMetadata[]> {
  return await getGuidesList();
}