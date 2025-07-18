import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import { generateTableOfContents, addAnchorsToContent } from './toc-utils';

export interface GuideMetadata {
  title: string;
  slug: string;
  description: string;
  category: string;
  keywords: string[];
  tags: string[];
  featured: boolean;
  difficulty: 'easy' | 'medium' | 'hard';
  readingTime: number;
  lastUpdated: string;
  relatedGuides: string[];
}

export interface GuideContent extends GuideMetadata {
  content: string;
  rawContent: string;
}

/**
 * 특별 블록을 표준 마크다운으로 변환하는 함수
 */
function convertSpecialBlocks(content: string): string {
  // :::tip 블록을 인용구로 변환
  content = content.replace(/:::tip\s*\n([\s\S]*?):::/g, (match, blockContent) => {
    return `> 💡 **팁**\n>\n${blockContent.trim().split('\n').map((line: string) => `> ${line}`).join('\n')}\n`;
  });

  // :::info 블록을 인용구로 변환
  content = content.replace(/:::info\s*\n([\s\S]*?):::/g, (match, blockContent) => {
    return `> ℹ️ **정보**\n>\n${blockContent.trim().split('\n').map((line: string) => `> ${line}`).join('\n')}\n`;
  });

  // :::warning 블록을 인용구로 변환
  content = content.replace(/:::warning\s*\n([\s\S]*?):::/g, (match, blockContent) => {
    return `> ⚠️ **주의사항**\n>\n${blockContent.trim().split('\n').map((line: string) => `> ${line}`).join('\n')}\n`;
  });

  // :::contact 블록을 인용구로 변환
  content = content.replace(/:::contact\s*\n([\s\S]*?):::/g, (match, blockContent) => {
    return `> 📞 **연락처**\n>\n${blockContent.trim().split('\n').map((line: string) => `> ${line}`).join('\n')}\n`;
  });

  // :::price 블록을 인용구로 변환
  content = content.replace(/:::price\s*\n([\s\S]*?):::/g, (match, blockContent) => {
    return `> 💰 **가격 정보**\n>\n${blockContent.trim().split('\n').map((line: string) => `> ${line}`).join('\n')}\n`;
  });

  // :::schedule 블록을 인용구로 변환
  content = content.replace(/:::schedule\s*\n([\s\S]*?):::/g, (match, blockContent) => {
    return `> 📅 **일정 정보**\n>\n${blockContent.trim().split('\n').map((line: string) => `> ${line}`).join('\n')}\n`;
  });

  return content;
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
    
    console.log(`✅ File exists, reading content from: ${filePath}`);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    console.log(`📄 File content length: ${fileContent.length}`);
    
    const { data: frontMatter, content: rawContent } = matter(fileContent);
    console.log(`📋 Front matter:`, frontMatter);
    console.log(`📝 Raw content length: ${rawContent.length}`);
    
    // Front matter에서 메타데이터 추출
    const metadata: GuideMetadata = {
      title: frontMatter.title || '제목 없음',
      slug: frontMatter.slug || slug,
      description: frontMatter.description || '',
      category: frontMatter.category || category || 'general',
      keywords: frontMatter.keywords || [],
      tags: frontMatter.tags || [],
      featured: frontMatter.featured || false,
      difficulty: frontMatter.difficulty || 'medium',
      readingTime: frontMatter.readingTime || 5,
      lastUpdated: frontMatter.lastUpdated || new Date().toISOString(),
      relatedGuides: frontMatter.relatedGuides || [],
    };
    
    // 특별 블록을 표준 마크다운으로 변환
    const processedContent = convertSpecialBlocks(rawContent);
    
    // 마크다운 렌더링 설정
    marked.use({
      breaks: true,        // 줄바꿈을 <br>로 변환
      gfm: true           // GitHub Flavored Markdown 사용
    });
    
    // 나머지 마크다운을 HTML로 변환 (동기 방식)
    const htmlContent = marked(processedContent);
    
    // 목차 생성
    const tocItems = generateTableOfContents(rawContent);
    
    // HTML 콘텐츠에 앵커 ID 추가
    const finalContent = addAnchorsToContent(htmlContent, tocItems);
    
    return {
      ...metadata,
      content: finalContent,
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
      keywords: frontMatter.keywords || [],
      tags: frontMatter.tags || [],
      featured: frontMatter.featured || false,
      difficulty: frontMatter.difficulty || 'medium',
      readingTime: frontMatter.readingTime || 5,
      lastUpdated: frontMatter.lastUpdated || new Date().toISOString(),
      relatedGuides: frontMatter.relatedGuides || [],
    };
    
    // 특별 블록을 표준 마크다운으로 변환
    const processedContent = convertSpecialBlocks(rawContent);
    
    // 마크다운 렌더링 설정
    marked.use({
      breaks: true,        // 줄바꿈을 <br>로 변환
      gfm: true           // GitHub Flavored Markdown 사용
    });
    
    // 나머지 마크다운을 HTML로 변환
    const htmlContent = await marked.parse(processedContent);
    
    // 목차 생성
    const tocItems = generateTableOfContents(rawContent);
    
    // HTML 콘텐츠에 앵커 ID 추가
    const finalContent = addAnchorsToContent(htmlContent, tocItems);
    
    return {
      ...metadata,
      content: finalContent,
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