import fs from 'fs';
import path from 'path';
import { generateTableOfContents, TocItem } from './toc-utils';

/**
 * 가이드 슬러그로부터 목차 정보 생성
 */
export function getGuideTableOfContents(category: string, slug: string): TocItem[] {
  try {
    // 파일 경로 구성
    const publicDir = path.join(process.cwd(), 'public');
    let filePath: string;
    
    // 카테고리별 디렉토리 매핑
    if (category === 'lifestyle') {
      if (slug === 'songdo-childcare-guide') {
        filePath = path.join(publicDir, 'guides', 'lifestyle', 'songdo-childcare-guide.md');
      } else {
        filePath = path.join(publicDir, 'guides', 'lifestyle', `${slug}.md`);
      }
    } else {
      filePath = path.join(publicDir, 'guides', category, `${slug}.md`);
    }
    
    // 파일이 존재하지 않으면 빈 배열 반환
    if (!fs.existsSync(filePath)) {
      return [];
    }
    
    // 마크다운 파일 읽기
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    
    // Front matter 제거하고 본문만 추출
    const contentWithoutFrontmatter = fileContent.replace(/^---[\s\S]*?---\n/, '');
    
    // 목차 생성
    return generateTableOfContents(contentWithoutFrontmatter);
    
  } catch (error) {
    console.error('목차 생성 중 오류:', error);
    return [];
  }
}