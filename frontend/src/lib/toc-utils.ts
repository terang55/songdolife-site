/**
 * 목차(Table of Contents) 유틸리티 함수들
 */

export interface TocItem {
  id: string;
  text: string;
  level: number;
  anchor: string;
}

/**
 * 마크다운 콘텐츠에서 헤더를 추출하여 목차 생성
 */
export function generateTableOfContents(markdownContent: string): TocItem[] {
  const tocItems: TocItem[] = [];
  
  // 마크다운 헤더 패턴 매칭 (## 부터 #### 까지)
  const headerPattern = /^(#{2,4})\s+(.+)$/gm;
  let match;
  let index = 0;
  
  while ((match = headerPattern.exec(markdownContent)) !== null) {
    const level = match[1].length; // # 개수로 레벨 결정
    const text = match[2].trim();
    
    // 이모지 제거 및 텍스트 정리
    const cleanText = text.replace(/[\u{1f300}-\u{1f5ff}\u{1f900}-\u{1f9ff}\u{1f600}-\u{1f64f}\u{1f680}-\u{1f6ff}\u{2600}-\u{26ff}\u{2700}-\u{27bf}]/gu, '').trim();
    
    // 앵커 생성 (한글 -> 영문 변환)
    const anchor = generateAnchor(cleanText, index);
    
    tocItems.push({
      id: `toc-${index}`,
      text: cleanText,
      level,
      anchor
    });
    
    index++;
  }
  
  return tocItems;
}

/**
 * 텍스트를 URL 친화적인 앵커로 변환
 */
function generateAnchor(text: string, index: number): string {
  // 한글 및 특수문자를 영문으로 변환하거나 제거
  const koreanToEnglish: { [key: string]: string } = {
    '송도': 'songdo',
    '어린이집': 'daycare',
    '유치원': 'kindergarten',
    '놀이시설': 'playground',
    '키즈카페': 'kidscafe',
    '소아과': 'pediatrics',
    '의료진': 'medical',
    '교육': 'education',
    '학교': 'school',
    '이사': 'moving',
    '정착': 'settlement',
    '맛집': 'restaurant',
    '쇼핑': 'shopping',
    '문화': 'culture',
    '공원': 'park',
    '봄': 'spring',
    '여름': 'summer',
    '가을': 'autumn',
    '겨울': 'winter',
    '축제': 'festival',
    '행사': 'event',
    '정보': 'info',
    '가이드': 'guide',
    '완벽': 'perfect',
    '추천': 'recommend',
    '필수': 'essential',
    '주의사항': 'caution',
    '준비': 'preparation',
    '체크리스트': 'checklist'
  };
  
  let anchor = text.toLowerCase();
  
  // 한글 단어 변환
  Object.keys(koreanToEnglish).forEach(korean => {
    anchor = anchor.replace(new RegExp(korean, 'g'), koreanToEnglish[korean]);
  });
  
  // 나머지 한글 및 특수문자 제거, 공백을 하이픈으로
  anchor = anchor
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  
  // 빈 문자열인 경우 인덱스 사용
  if (!anchor) {
    anchor = `section-${index}`;
  }
  
  return anchor;
}

/**
 * HTML 콘텐츠에 앵커 ID 추가
 */
export function addAnchorsToContent(htmlContent: string, tocItems: TocItem[]): string {
  let result = htmlContent;
  
  tocItems.forEach((item) => {
    // 더 유연한 헤더 태그 매칭 (이모지 포함)
    const headerPattern = new RegExp(
      `<h${item.level}([^>]*)>([^<]*)</h${item.level}>`,
      'gi'
    );
    
    result = result.replace(headerPattern, (match, attrs, content) => {
      // 이미 id가 있는지 확인
      if (attrs && attrs.includes('id=')) {
        return match;
      }
      
      // 헤더 내용이 TOC 아이템과 일치하는지 확인 (이모지 제거 후)
      const cleanContent = content.replace(/[\u{1f300}-\u{1f5ff}\u{1f900}-\u{1f9ff}\u{1f600}-\u{1f64f}\u{1f680}-\u{1f6ff}\u{2600}-\u{26ff}\u{2700}-\u{27bf}]/gu, '').trim();
      
      if (cleanContent.includes(item.text) || item.text.includes(cleanContent)) {
        return `<h${item.level}${attrs} id="${item.anchor}">${content}</h${item.level}>`;
      }
      
      return match;
    });
  });
  
  return result;
}

