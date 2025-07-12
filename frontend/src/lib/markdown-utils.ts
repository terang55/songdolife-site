

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
  'songdo-restaurant-guide': `<div style="max-width: 100%; margin: 0 auto; line-height: 1.8; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">

<h1 style="font-size: 2.5rem; color: #f59e0b; text-align: center; margin-bottom: 1rem; border-bottom: 3px solid #fbbf24; padding-bottom: 1rem;">🍽️ 송도 맛집 완벽 가이드</h1>

<div style="text-align: center; background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 1.5rem; border-radius: 1rem; margin: 2rem 0; box-shadow: 0 8px 25px rgba(245, 158, 11, 0.3);">
  <h2 style="margin: 0; font-size: 1.5rem;">2025년 최신판 📅</h2>
  <p style="margin: 0.5rem 0 0 0; font-size: 1.1rem; opacity: 0.9;">카테고리별 추천 맛집 총정리 🎯</p>
  <p style="margin: 0.5rem 0 0 0; font-size: 0.9rem; opacity: 0.8;">최종 업데이트: 2025년 7월</p>
</div>

<div style="background: #fef3c7; padding: 1.5rem; border-radius: 1rem; margin: 2rem 0; border: 2px solid #f59e0b;">
  <h3 style="color: #92400e; margin: 0 0 1rem 0; font-size: 1.2rem;">🍴 가이드 특징</h3>
  <div style="display: grid; gap: 0.8rem;">
    <div style="display: flex; align-items: center; gap: 0.5rem;">
      <span style="background: #f59e0b; color: white; padding: 0.2rem 0.5rem; border-radius: 0.3rem; font-size: 0.8rem;">✓</span>
      <span>한식부터 세계요리까지 카테고리별 분류</span>
    </div>
    <div style="display: flex; align-items: center; gap: 0.5rem;">
      <span style="background: #f59e0b; color: white; padding: 0.2rem 0.5rem; border-radius: 0.3rem; font-size: 0.8rem;">✓</span>
      <span>상황별 맛집 추천 (데이트, 가족, 혼밥)</span>
    </div>
    <div style="display: flex; align-items: center; gap: 0.5rem;">
      <span style="background: #f59e0b; color: white; padding: 0.2rem 0.5rem; border-radius: 0.3rem; font-size: 0.8rem;">✓</span>
      <span>주차 정보와 할인 혜택 포함</span>
    </div>
  </div>
</div>

<h2 style="font-size: 2rem; color: #92400e; border-left: 5px solid #f59e0b; padding-left: 1rem; margin: 3rem 0 1.5rem 0; background: #fef3c7; padding: 1rem 1rem 1rem 2rem; border-radius: 0.5rem;">🍚 한식 맛집</h2>

<div style="background: #f8fafc; padding: 2rem; border-radius: 1rem; margin: 1rem 0; border: 1px solid #e2e8f0;">
  <h3 style="color: #1e40af; margin-bottom: 1rem;">갈비전문점</h3>
  <div style="margin-bottom: 1.5rem; padding: 1rem; background: white; border-radius: 0.5rem; border-left: 3px solid #10b981;">
    <h4 style="color: #065f46; margin: 0 0 0.8rem 0;">📍 송도 갈비왕</h4>
    <p style="margin: 0; color: #374151; line-height: 1.6;">
      <strong>위치:</strong> 연수구 송도동 센트럴파크 인근<br>
      <strong>추천메뉴:</strong> 양념갈비, 생갈비<br>
      <strong>가격대:</strong> 1인당 2-3만원
    </p>
  </div>
</div>

<p style="text-align: center; color: #6b7280; margin: 2rem 0;">송도에서의 맛있는 식사 되세요! 🍽️</p>

</div>`,

  'songdo-shopping-guide': `<div style="max-width: 100%; margin: 0 auto; line-height: 1.8; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">

<h1 style="font-size: 2.5rem; color: #3b82f6; text-align: center; margin-bottom: 1rem; border-bottom: 3px solid #60a5fa; padding-bottom: 1rem;">🛍️ 송도 쇼핑 가이드</h1>

<div style="text-align: center; background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; padding: 1.5rem; border-radius: 1rem; margin: 2rem 0; box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3);">
  <h2 style="margin: 0; font-size: 1.5rem;">2025년 최신판 📅</h2>
  <p style="margin: 0.5rem 0 0 0; font-size: 1.1rem; opacity: 0.9;">트리플스트리트부터 아울렛까지 완벽 정리 🎯</p>
  <p style="margin: 0.5rem 0 0 0; font-size: 0.9rem; opacity: 0.8;">최종 업데이트: 2025년 7월</p>
</div>

<div style="background: #eff6ff; padding: 1.5rem; border-radius: 1rem; margin: 2rem 0; border: 2px solid #3b82f6;">
  <h3 style="color: #1e40af; margin: 0 0 1rem 0; font-size: 1.2rem;">🏬 주요 쇼핑몰</h3>
  <div style="display: grid; gap: 0.8rem;">
    <div style="display: flex; align-items: center; gap: 0.5rem;">
      <span style="background: #3b82f6; color: white; padding: 0.2rem 0.5rem; border-radius: 0.3rem; font-size: 0.8rem;">✓</span>
      <span>트리플스트리트 - 센트럴파크역 도보 3분</span>
    </div>
    <div style="display: flex; align-items: center; gap: 0.5rem;">
      <span style="background: #3b82f6; color: white; padding: 0.2rem 0.5rem; border-radius: 0.3rem; font-size: 0.8rem;">✓</span>
      <span>현대프리미엄아울렛 - 명품 브랜드 30-70% 할인</span>
    </div>
    <div style="display: flex; align-items: center; gap: 0.5rem;">
      <span style="background: #3b82f6; color: white; padding: 0.2rem 0.5rem; border-radius: 0.3rem; font-size: 0.8rem;">✓</span>
      <span>대형마트 및 편의시설 완비</span>
    </div>
  </div>
</div>

<h2 style="font-size: 2rem; color: #1e40af; border-left: 5px solid #3b82f6; padding-left: 1rem; margin: 3rem 0 1.5rem 0; background: #eff6ff; padding: 1rem 1rem 1rem 2rem; border-radius: 0.5rem;">🏬 대형 쇼핑몰</h2>

<div style="background: #f8fafc; padding: 2rem; border-radius: 1rem; margin: 1rem 0; border: 1px solid #e2e8f0;">
  <h3 style="color: #1e40af; margin-bottom: 1rem;">트리플스트리트 (Tri-Bowl)</h3>
  <div style="margin-bottom: 1.5rem; padding: 1rem; background: white; border-radius: 0.5rem; border-left: 3px solid #10b981;">
    <h4 style="color: #065f46; margin: 0 0 0.8rem 0;">📍 기본 정보</h4>
    <p style="margin: 0; color: #374151; line-height: 1.6;">
      <strong>주소:</strong> 인천광역시 연수구 센트럴로 123<br>
      <strong>교통:</strong> 센트럴파크역 1번 출구 도보 3분<br>
      <strong>영업시간:</strong> 10:30-22:00 (일요일 ~21:00)
    </p>
  </div>
</div>

<p style="text-align: center; color: #6b7280; margin: 2rem 0;">송도에서의 즐거운 쇼핑 되세요! 🛍️</p>

</div>`,

  'songdo-culture-guide': `<div style="max-width: 100%; margin: 0 auto; line-height: 1.8; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">

<h1 style="font-size: 2.5rem; color: #8b5cf6; text-align: center; margin-bottom: 1rem; border-bottom: 3px solid #a78bfa; padding-bottom: 1rem;">🎭 송도 문화생활 가이드</h1>

<div style="text-align: center; background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); color: white; padding: 1.5rem; border-radius: 1rem; margin: 2rem 0; box-shadow: 0 8px 25px rgba(139, 92, 246, 0.3);">
  <h2 style="margin: 0; font-size: 1.5rem;">2025년 최신판 📅</h2>
  <p style="margin: 0.5rem 0 0 0; font-size: 1.1rem; opacity: 0.9;">공연, 전시, 여가활동 완벽 정리 🎯</p>
  <p style="margin: 0.5rem 0 0 0; font-size: 0.9rem; opacity: 0.8;">최종 업데이트: 2025년 7월</p>
</div>

<div style="background: #f3e8ff; padding: 1.5rem; border-radius: 1rem; margin: 2rem 0; border: 2px solid #8b5cf6;">
  <h3 style="color: #6b21a8; margin: 0 0 1rem 0; font-size: 1.2rem;">🎪 주요 문화시설</h3>
  <div style="display: grid; gap: 0.8rem;">
    <div style="display: flex; align-items: center; gap: 0.5rem;">
      <span style="background: #8b5cf6; color: white; padding: 0.2rem 0.5rem; border-radius: 0.3rem; font-size: 0.8rem;">✓</span>
      <span>송도컨벤시아 - 3,000석 대극장</span>
    </div>
    <div style="display: flex; align-items: center; gap: 0.5rem;">
      <span style="background: #8b5cf6; color: white; padding: 0.2rem 0.5rem; border-radius: 0.3rem; font-size: 0.8rem;">✓</span>
      <span>센트럴파크 - 야외 공연장과 산책로</span>
    </div>
    <div style="display: flex; align-items: center; gap: 0.5rem;">
      <span style="background: #8b5cf6; color: white; padding: 0.2rem 0.5rem; border-radius: 0.3rem; font-size: 0.8rem;">✓</span>
      <span>다양한 갤러리와 전시공간</span>
    </div>
  </div>
</div>

<h2 style="font-size: 2rem; color: #6b21a8; border-left: 5px solid #8b5cf6; padding-left: 1rem; margin: 3rem 0 1.5rem 0; background: #f3e8ff; padding: 1rem 1rem 1rem 2rem; border-radius: 0.5rem;">🎭 공연 & 음악</h2>

<div style="background: #f8fafc; padding: 2rem; border-radius: 1rem; margin: 1rem 0; border: 1px solid #e2e8f0;">
  <h3 style="color: #6b21a8; margin-bottom: 1rem;">송도컨벤시아</h3>
  <div style="margin-bottom: 1.5rem; padding: 1rem; background: white; border-radius: 0.5rem; border-left: 3px solid #10b981;">
    <h4 style="color: #065f46; margin: 0 0 0.8rem 0;">📍 기본 정보</h4>
    <p style="margin: 0; color: #374151; line-height: 1.6;">
      <strong>주소:</strong> 인천광역시 연수구 센트럴로 123<br>
      <strong>교통:</strong> 센트럴파크역 1번 출구 도보 5분<br>
      <strong>좌석:</strong> 대극장 3,000석, 소극장 600석
    </p>
  </div>
</div>

<p style="text-align: center; color: #6b7280; margin: 2rem 0;">송도에서의 풍성한 문화생활 되세요! 🎭</p>

</div>`,
  'songdo-moving-checklist': `<div style="max-width: 100%; margin: 0 auto; line-height: 1.8; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">

<h1 style="font-size: 2.5rem; color: #2563eb; text-align: center; margin-bottom: 1rem; border-bottom: 3px solid #3b82f6; padding-bottom: 1rem;">🏠 송도 이사 완벽 체크리스트</h1>

<div style="text-align: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 1.5rem; border-radius: 1rem; margin: 2rem 0; box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);">
  <h2 style="margin: 0; font-size: 1.5rem;">2025년 최신판 📅</h2>
  <p style="margin: 0.5rem 0 0 0; font-size: 1.1rem; opacity: 0.9;">송도국제도시 맞춤형 이사 가이드 🎯</p>
  <p style="margin: 0.5rem 0 0 0; font-size: 0.9rem; opacity: 0.8;">최종 업데이트: 2025년 7월</p>
</div>

<div style="background: #f0f9ff; padding: 1.5rem; border-radius: 1rem; margin: 2rem 0; border: 2px solid #0ea5e9;">
  <h3 style="color: #0369a1; margin: 0 0 1rem 0; font-size: 1.2rem;">📌 이 가이드의 특징</h3>
  <div style="display: grid; gap: 0.8rem;">
    <div style="display: flex; align-items: center; gap: 0.5rem;">
      <span style="background: #0ea5e9; color: white; padding: 0.2rem 0.5rem; border-radius: 0.3rem; font-size: 0.8rem;">✓</span>
      <span>2025년 최신 정보 및 연락처 반영</span>
    </div>
    <div style="display: flex; align-items: center; gap: 0.5rem;">
      <span style="background: #0ea5e9; color: white; padding: 0.2rem 0.5rem; border-radius: 0.3rem; font-size: 0.8rem;">✓</span>
      <span>송도 스마트시티 맞춤 디지털 서비스 안내</span>
    </div>
    <div style="display: flex; align-items: center; gap: 0.5rem;">
      <span style="background: #0ea5e9; color: white; padding: 0.2rem 0.5rem; border-radius: 0.3rem; font-size: 0.8rem;">✓</span>
      <span>단계별 체크리스트로 놓치는 일 없이 진행</span>
    </div>
  </div>
</div>

<br>

<h2 style="font-size: 2rem; color: #1e40af; border-left: 5px solid #3b82f6; padding-left: 1rem; margin: 3rem 0 1.5rem 0; background: #eff6ff; padding: 1rem 1rem 1rem 2rem; border-radius: 0.5rem;">📋 이사 3개월 전 준비사항</h2>

<div style="margin: 2rem 0;">
  <h3 style="font-size: 1.4rem; color: #1e40af; margin-bottom: 1rem; padding: 1rem; background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 0.8rem; border-left: 4px solid #3b82f6; box-shadow: 0 2px 8px rgba(59, 130, 246, 0.1);">🏠 집 구하기</h3>
  
  <div style="background: #f8fafc; padding: 2rem; border-radius: 1rem; margin: 1rem 0; border: 1px solid #e2e8f0; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
    
    <div style="margin-bottom: 1.5rem; padding: 1rem; background: white; border-radius: 0.5rem; border-left: 3px solid #10b981;">
      <h4 style="color: #065f46; margin: 0 0 0.8rem 0; font-size: 1.1rem;">📍 송도 아파트 단지별 특성 파악</h4>
      <p style="margin: 0; color: #374151; line-height: 1.6;">
        주요 단지: <a href="#" style="color: #2563eb; text-decoration: none; font-weight: 500;">아이파크</a>, 
        <a href="#" style="color: #2563eb; text-decoration: none; font-weight: 500;">더샵</a>, 
        <a href="#" style="color: #2563eb; text-decoration: none; font-weight: 500;">롯데캐슬</a>, 
        <a href="#" style="color: #2563eb; text-decoration: none; font-weight: 500;">센트럴파크 푸르지오</a>
      </p>
    </div>

    <div style="margin-bottom: 1.5rem; padding: 1rem; background: white; border-radius: 0.5rem; border-left: 3px solid #f59e0b;">
      <h4 style="color: #92400e; margin: 0 0 0.8rem 0; font-size: 1.1rem;">💰 예산 대비 적정 매물 선정</h4>
      <p style="margin: 0; color: #374151; line-height: 1.6;">
        2025년 평균 전세: 84㎡ 기준 <strong style="color: #dc2626; font-size: 1.1rem;">5-7억원</strong><br>
        <small style="color: #64748b;">※ 단지별, 층수별 차이 있음</small>
      </p>
    </div>

    <div style="margin-bottom: 1.5rem; padding: 1rem; background: white; border-radius: 0.5rem; border-left: 3px solid #8b5cf6;">
      <h4 style="color: #5b21b6; margin: 0 0 0.8rem 0; font-size: 1.1rem;">🚇 교통 접근성 확인</h4>
      <p style="margin: 0; color: #374151; line-height: 1.6;">
        • 지하철 1호선 (국제업무지구역, 센트럴파크역)<br>
        • 버스 M6405 (강남 직행), 306번 (인천공항)<br>
        • <a href="https://www.gttx.co.kr" target="_blank" style="color: #2563eb; text-decoration: none;">GTX-B 노선</a> 2025년 하반기 개통 예정
      </p>
    </div>

    <div style="margin-bottom: 1.5rem; padding: 1rem; background: white; border-radius: 0.5rem; border-left: 3px solid #ef4444;">
      <h4 style="color: #dc2626; margin: 0 0 0.8rem 0; font-size: 1.1rem;">🏪 주변 편의시설 확인</h4>
      <p style="margin: 0; color: #374151; line-height: 1.6;">
        대형마트, 병원, 국제학교, 문화시설 위치 파악<br>
        <small style="color: #64748b;">도보 10분 내 접근 가능한 시설 우선 체크</small>
      </p>
    </div>

    <div style="margin-bottom: 1.5rem; padding: 1rem; background: white; border-radius: 0.5rem; border-left: 3px solid #06b6d4;">
      <h4 style="color: #0e7490; margin: 0 0 0.8rem 0; font-size: 1.1rem;">📊 관리비 및 유지비용 계산</h4>
      <p style="margin: 0; color: #374151; line-height: 1.6;">
        월 관리비: <strong style="color: #dc2626;">20-35만원</strong> (84㎡ 기준)<br>
        <small style="color: #64748b;">※ 난방비, 주차비 포함 여부 확인 필수</small>
      </p>
    </div>

    <div style="padding: 1rem; background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-radius: 0.5rem; border: 1px solid #f59e0b;">
      <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
        <span style="background: #f59e0b; color: white; padding: 0.3rem 0.8rem; border-radius: 0.4rem; font-weight: bold; font-size: 0.9rem;">🆕 NEW</span>
        <h4 style="color: #92400e; margin: 0; font-size: 1.1rem;">GTX-B 개통 예정 지역 고려</h4>
      </div>
      <p style="margin: 0; color: #92400e; line-height: 1.6;">
        2025년 하반기 개통 예정으로 <strong>교통 편의성 대폭 향상</strong> 예상<br>
        <small>서울 강남권까지 30분 내 접근 가능</small>
      </p>
    </div>

  </div>
</div>

<br>

<h3 style="font-size: 1.4rem; color: #1e40af; margin: 2rem 0 1rem 0; padding: 1rem; background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 0.8rem; border-left: 4px solid #f59e0b; box-shadow: 0 2px 8px rgba(245, 158, 11, 0.1);">💰 자금 계획 (2025년 기준)</h3>

<div style="background: #f8fafc; padding: 2rem; border-radius: 1rem; margin: 1rem 0; border: 1px solid #e2e8f0;">
  
  <div style="display: grid; gap: 1.5rem;">
    
    <div style="padding: 1.2rem; background: white; border-radius: 0.8rem; border-left: 4px solid #10b981; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
      <h4 style="color: #065f46; margin: 0 0 0.8rem 0; font-size: 1.1rem; display: flex; align-items: center; gap: 0.5rem;">
        📦 이사비용 예산 수립
      </h4>
      <div style="line-height: 1.8; color: #374151;">
        • <strong>포장이사:</strong> 150-300만원<br>
        • <strong>반포장이사:</strong> 100-200만원<br>
        • <strong>용달이사:</strong> 50-100만원<br>
        <small style="color: #6b7280;">※ 거리, 짐량, 업체에 따라 차이 있음</small>
      </div>
    </div>

    <div style="padding: 1.2rem; background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%); border-radius: 0.8rem; border: 1px solid #10b981;">
      <h4 style="color: #065f46; margin: 0 0 0.8rem 0; font-size: 1.1rem; display: flex; align-items: center; gap: 0.5rem;">
        🏦 신혼부부 대출 상품 (2025년 최신)
      </h4>
      <div style="line-height: 1.8; color: #065f46;">
        • <strong><a href="https://www.hf.go.kr" target="_blank" style="color: #059669; text-decoration: none;">디딤돌대출</a>:</strong> 최대 3억원, 금리 3.2-4.5%<br>
        • <strong><a href="https://www.hf.go.kr" target="_blank" style="color: #059669; text-decoration: none;">보금자리론</a>:</strong> 최대 5억원, 금리 3.8-5.2%<br>
        • <strong>부동산 중개수수료:</strong> 0.5-0.9% + 부가세<br>
        <small style="color: #059669;">※ 소득, 신용등급에 따라 금리 차등 적용</small>
      </div>
    </div>

  </div>
</div>

<div style="background: #fef2f2; padding: 1.5rem; border-radius: 1rem; margin: 2rem 0; border: 1px solid #fca5a5;">
  <h4 style="color: #b91c1c; margin: 0 0 1rem 0; font-size: 1.1rem; display: flex; align-items: center; gap: 0.5rem;">
    ⚠️ 중요 체크포인트
  </h4>
  <ul style="margin: 0; padding-left: 1.5rem; color: #7f1d1d; line-height: 1.8;">
    <li style="margin-bottom: 0.5rem;">대출 한도는 <strong>소득의 5-6배</strong> 이내로 제한</li>
    <li style="margin-bottom: 0.5rem;">전세가율 <strong>70% 이하</strong> 매물 우선 검토</li>
    <li style="margin-bottom: 0;">이사 후 <strong>비상금 3개월치</strong> 확보 권장</li>
  </ul>
</div>

<div style="text-align: center; margin: 3rem 0;">
  <div style="display: inline-flex; gap: 1rem; flex-wrap: wrap; justify-content: center;">
    <a href="https://www.gov.kr" target="_blank" style="background: #3b82f6; color: white; padding: 0.8rem 1.5rem; border-radius: 0.5rem; text-decoration: none; font-weight: 500; display: flex; align-items: center; gap: 0.5rem; box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3); transition: all 0.2s;">
      🏛️ 정부24 바로가기
    </a>
    <a href="https://www.hf.go.kr" target="_blank" style="background: #10b981; color: white; padding: 0.8rem 1.5rem; border-radius: 0.5rem; text-decoration: none; font-weight: 500; display: flex; align-items: center; gap: 0.5rem; box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3); transition: all 0.2s;">
      🏦 주택금융공사
    </a>
    <a href="https://www.reb.or.kr" target="_blank" style="background: #f59e0b; color: white; padding: 0.8rem 1.5rem; border-radius: 0.5rem; text-decoration: none; font-weight: 500; display: flex; align-items: center; gap: 0.5rem; box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3); transition: all 0.2s;">
      🏠 부동산원
    </a>
  </div>
</div>

<hr style="border: none; height: 2px; background: linear-gradient(90deg, #3b82f6, #10b981, #f59e0b); margin: 3rem 0; border-radius: 1px;">

<div style="text-align: center; padding: 2rem; background: #f8fafc; border-radius: 1rem; margin: 2rem 0;">
  <h3 style="color: #1e40af; margin: 0 0 1rem 0;">💡 추가 도움이 필요하신가요?</h3>
  <p style="color: #64748b; margin: 0 0 1.5rem 0; line-height: 1.6;">
    송도라이프 커뮤니티에서 실제 거주자들의 생생한 정보를 확인하세요!
  </p>
  <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
    <a href="#" style="background: #8b5cf6; color: white; padding: 0.6rem 1.2rem; border-radius: 0.4rem; text-decoration: none; font-size: 0.9rem;">💬 커뮤니티 참여</a>
    <a href="#" style="background: #06b6d4; color: white; padding: 0.6rem 1.2rem; border-radius: 0.4rem; text-decoration: none; font-size: 0.9rem;">📋 가이드 더보기</a>
  </div>
</div>

</div>`,

  'songdo-newlywed-guide': `<div style="max-width: 100%; margin: 0 auto; line-height: 1.8; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">

<h1 style="font-size: 2.5rem; color: #ec4899; text-align: center; margin-bottom: 1rem; border-bottom: 3px solid #f472b6; padding-bottom: 1rem;">💕 송도 신혼부부 완벽 정착 가이드</h1>

<div style="text-align: center; background: linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%); color: white; padding: 1.5rem; border-radius: 1rem; margin: 2rem 0; box-shadow: 0 8px 25px rgba(236, 72, 153, 0.3);">
  <h2 style="margin: 0; font-size: 1.5rem;">2025년 최신판 📅</h2>
  <p style="margin: 0.5rem 0 0 0; font-size: 1.1rem; opacity: 0.9;">송도에서 시작하는 행복한 신혼 라이프 💕</p>
  <p style="margin: 0.5rem 0 0 0; font-size: 0.9rem; opacity: 0.8;">최종 업데이트: 2025년 7월</p>
</div>

<div style="background: #fdf2f8; padding: 1.5rem; border-radius: 1rem; margin: 2rem 0; border: 2px solid #f472b6;">
  <h3 style="color: #be185d; margin: 0 0 1rem 0; font-size: 1.2rem;">💎 신혼부부 특별 혜택</h3>
  <div style="display: grid; gap: 0.8rem;">
    <div style="display: flex; align-items: center; gap: 0.5rem;">
      <span style="background: #ec4899; color: white; padding: 0.2rem 0.5rem; border-radius: 0.3rem; font-size: 0.8rem;">💰</span>
      <span>디딤돌대출 최대 <strong style="color: #be185d;">3억원</strong> (금리 3.2-4.5%)</span>
    </div>
    <div style="display: flex; align-items: center; gap: 0.5rem;">
      <span style="background: #ec4899; color: white; padding: 0.2rem 0.5rem; border-radius: 0.3rem; font-size: 0.8rem;">🏠</span>
      <span>신혼부부 특별공급 <strong style="color: #be185d;">소득 7분위 이하</strong></span>
    </div>
    <div style="display: flex; align-items: center; gap: 0.5rem;">
      <span style="background: #ec4899; color: white; padding: 0.2rem 0.5rem; border-radius: 0.3rem; font-size: 0.8rem;">✨</span>
      <span>송도 스마트시티 <strong style="color: #be185d;">프리미엄 라이프</strong></span>
    </div>
  </div>
</div>

<br>

<h2 style="font-size: 2rem; color: #be185d; border-left: 5px solid #f472b6; padding-left: 1rem; margin: 3rem 0 1.5rem 0; background: #fdf2f8; padding: 1rem 1rem 1rem 2rem; border-radius: 0.5rem;">💕 송도가 신혼부부에게 좋은 이유</h2>

<div style="margin: 2rem 0;">
  <h3 style="font-size: 1.4rem; color: #be185d; margin-bottom: 1rem; padding: 1rem; background: linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%); border-radius: 0.8rem; border-left: 4px solid #ec4899; box-shadow: 0 2px 8px rgba(236, 72, 153, 0.1);">🏙️ 계획도시의 장점</h3>
  
  <div style="background: #f8fafc; padding: 2rem; border-radius: 1rem; margin: 1rem 0; border: 1px solid #e2e8f0; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
    
    <div style="display: grid; gap: 1.5rem;">
      
      <div style="padding: 1.2rem; background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%); border-radius: 0.8rem; border-left: 4px solid #10b981;">
        <h4 style="color: #065f46; margin: 0 0 0.8rem 0; font-size: 1.1rem; display: flex; align-items: center; gap: 0.5rem;">
          🌿 깨끗한 환경
        </h4>
        <p style="margin: 0; color: #374151; line-height: 1.6;">
          체계적으로 계획된 <strong style="color: #059669;">친환경 스마트시티</strong><br>
          <small style="color: #64748b;">미세먼지 적고, 녹지공간 풍부한 쾌적한 환경</small>
        </p>
      </div>

      <div style="padding: 1.2rem; background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 0.8rem; border-left: 4px solid #3b82f6;">
        <h4 style="color: #1e40af; margin: 0 0 0.8rem 0; font-size: 1.1rem; display: flex; align-items: center; gap: 0.5rem;">
          🛡️ 안전한 거리
        </h4>
        <p style="margin: 0; color: #374151; line-height: 1.6;">
          CCTV 완비, <strong style="color: #2563eb;">24시간 스마트 보안 시스템</strong><br>
          <small style="color: #64748b;">여성 1인 심야 보행도 안전한 치안 좋은 지역</small>
        </p>
      </div>

      <div style="padding: 1.2rem; background: linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%); border-radius: 0.8rem; border-left: 4px solid #8b5cf6;">
        <h4 style="color: #6b21a8; margin: 0 0 0.8rem 0; font-size: 1.1rem; display: flex; align-items: center; gap: 0.5rem;">
          🚇 편리한 교통
        </h4>
        <p style="margin: 0; color: #374151; line-height: 1.6;">
          지하철, 버스, 공항 접근 용이<br>
          <span style="background: #fef3c7; color: #92400e; padding: 0.2rem 0.5rem; border-radius: 0.3rem; font-size: 0.85rem; font-weight: 500;">🆕</span>
          <strong style="color: #7c3aed; margin-left: 0.3rem;">GTX-B 개통 예정</strong> (2025년 하반기)
        </p>
      </div>

      <div style="padding: 1.2rem; background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-radius: 0.8rem; border-left: 4px solid #f59e0b;">
        <h4 style="color: #92400e; margin: 0 0 0.8rem 0; font-size: 1.1rem; display: flex; align-items: center; gap: 0.5rem;">
          🎭 문화생활
        </h4>
        <p style="margin: 0; color: #374151; line-height: 1.6;">
          다양한 문화시설과 <strong style="color: #d97706;">글로벌 쇼핑몰</strong><br>
          <small style="color: #64748b;">영화관, 전시관, 공연장, 프리미엄 아울렛 등</small>
        </p>
      </div>

      <div style="padding: 1.2rem; background: linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%); border-radius: 0.8rem; border: 2px solid #ec4899;">
        <h4 style="color: #be185d; margin: 0 0 0.8rem 0; font-size: 1.1rem; display: flex; align-items: center; gap: 0.5rem;">
          <span style="background: #ec4899; color: white; padding: 0.3rem 0.8rem; border-radius: 0.4rem; font-weight: bold; font-size: 0.9rem;">🆕 NEW</span>
          스마트시티 서비스
        </h4>
        <p style="margin: 0; color: #374151; line-height: 1.6;">
          <strong style="color: #be185d;">IoT 기반 편의서비스, 5G 네트워크 완비</strong><br>
          <small style="color: #64748b;">스마트홈, 원격제어, 모바일 통합서비스 등</small>
        </p>
      </div>

    </div>
  </div>
</div>

<div style="background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%); padding: 2rem; border-radius: 1rem; margin: 2rem 0; border: 1px solid #10b981;">
  <h3 style="color: #065f46; margin: 0 0 1.5rem 0; font-size: 1.3rem; text-align: center;">💰 2025년 신혼부부 지원 혜택</h3>
  
  <div style="display: grid; gap: 1.2rem;">
    
    <div style="background: white; padding: 1.2rem; border-radius: 0.8rem; border-left: 4px solid #10b981; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
      <h4 style="color: #065f46; margin: 0 0 0.8rem 0; font-size: 1rem; display: flex; align-items: center; gap: 0.5rem;">
        🏠 신혼부부 특별공급
      </h4>
      <p style="margin: 0; color: #374151; line-height: 1.6; font-size: 0.95rem;">
        소득 <strong style="color: #059669;">7분위 이하</strong>, 청약통장 <strong style="color: #059669;">1년 이상</strong><br>
        <small style="color: #6b7280;">혼인신고 7년 이내, 무주택 세대주</small>
      </p>
    </div>

    <div style="background: white; padding: 1.2rem; border-radius: 0.8rem; border-left: 4px solid #3b82f6; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
      <h4 style="color: #1e40af; margin: 0 0 0.8rem 0; font-size: 1rem; display: flex; align-items: center; gap: 0.5rem;">
        💳 디딤돌 대출
      </h4>
      <p style="margin: 0; color: #374151; line-height: 1.6; font-size: 0.95rem;">
        최대 <strong style="color: #2563eb;">3억원</strong>, 금리 <strong style="color: #2563eb;">3.2-4.5%</strong><br>
        <small style="color: #6b7280;">소득 6천만원 이하, 40년 상환 가능</small>
      </p>
    </div>

    <div style="background: white; padding: 1.2rem; border-radius: 0.8rem; border-left: 4px solid #8b5cf6; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
      <h4 style="color: #6b21a8; margin: 0 0 0.8rem 0; font-size: 1rem; display: flex; align-items: center; gap: 0.5rem;">
        🏦 보금자리론
      </h4>
      <p style="margin: 0; color: #374151; line-height: 1.6; font-size: 0.95rem;">
        최대 <strong style="color: #7c3aed;">5억원</strong>, 금리 <strong style="color: #7c3aed;">3.8-5.2%</strong><br>
        <small style="color: #6b7280;">신혼부부 우대금리 적용</small>
      </p>
    </div>

    <div style="background: white; padding: 1.2rem; border-radius: 0.8rem; border-left: 4px solid #f59e0b; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
      <h4 style="color: #92400e; margin: 0 0 0.8rem 0; font-size: 1rem; display: flex; align-items: center; gap: 0.5rem;">
        💸 세제 혜택
      </h4>
      <p style="margin: 0; color: #374151; line-height: 1.6; font-size: 0.95rem;">
        <strong style="color: #d97706;">양도소득세 감면</strong>, <strong style="color: #d97706;">취득세 감면</strong><br>
        <small style="color: #6b7280;">신혼부부 5년간 특별혜택</small>
      </p>
    </div>

    <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); padding: 1.2rem; border-radius: 0.8rem; border: 1px solid #f59e0b;">
      <h4 style="color: #92400e; margin: 0 0 0.8rem 0; font-size: 1rem; display: flex; align-items: center; gap: 0.5rem;">
        <span style="background: #f59e0b; color: white; padding: 0.3rem 0.8rem; border-radius: 0.4rem; font-weight: bold; font-size: 0.9rem;">🆕 NEW</span>
        인천시 신혼부부 지원
      </h4>
      <p style="margin: 0; color: #92400e; line-height: 1.6; font-size: 0.95rem;">
        전세보증금 이자 지원, 월 최대 <strong>30만원</strong><br>
        <small>3년간 지원, 소득 기준 충족 시</small>
      </p>
    </div>

  </div>
</div>

<div style="text-align: center; margin: 3rem 0;">
  <div style="display: inline-flex; gap: 1rem; flex-wrap: wrap; justify-content: center;">
    <a href="https://www.hf.go.kr" target="_blank" style="background: #10b981; color: white; padding: 0.8rem 1.5rem; border-radius: 0.5rem; text-decoration: none; font-weight: 500; display: flex; align-items: center; gap: 0.5rem; box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3); transition: all 0.2s;">
      🏦 주택금융공사
    </a>
    <a href="https://www.lh.or.kr" target="_blank" style="background: #3b82f6; color: white; padding: 0.8rem 1.5rem; border-radius: 0.5rem; text-decoration: none; font-weight: 500; display: flex; align-items: center; gap: 0.5rem; box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3); transition: all 0.2s;">
      🏠 LH공사
    </a>
    <a href="https://www.applyhome.co.kr" target="_blank" style="background: #8b5cf6; color: white; padding: 0.8rem 1.5rem; border-radius: 0.5rem; text-decoration: none; font-weight: 500; display: flex; align-items: center; gap: 0.5rem; box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3); transition: all 0.2s;">
      📝 청약홈
    </a>
  </div>
</div>

<hr style="border: none; height: 2px; background: linear-gradient(90deg, #ec4899, #8b5cf6, #3b82f6); margin: 3rem 0; border-radius: 1px;">

<div style="text-align: center; padding: 2rem; background: #fdf2f8; border-radius: 1rem; margin: 2rem 0;">
  <h3 style="color: #be185d; margin: 0 0 1rem 0;">💕 신혼부부 전용 상담</h3>
  <p style="color: #64748b; margin: 0 0 1.5rem 0; line-height: 1.6;">
    송도 신혼부부 커뮤니티에서 선배 부부들의 조언을 받아보세요!
  </p>
  <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
    <a href="#" style="background: #ec4899; color: white; padding: 0.6rem 1.2rem; border-radius: 0.4rem; text-decoration: none; font-size: 0.9rem;">💬 신혼부부 카페</a>
    <a href="#" style="background: #8b5cf6; color: white; padding: 0.6rem 1.2rem; border-radius: 0.4rem; text-decoration: none; font-size: 0.9rem;">🏠 집구하기 팁</a>
  </div>
</div>

</div>

<hr style="border: none; height: 2px; background: linear-gradient(90deg, #ec4899, #8b5cf6, #3b82f6); margin: 3rem 0; border-radius: 1px;">

<h2 style="font-size: 2rem; color: #be185d; border-left: 5px solid #ec4899; padding-left: 1rem; margin: 3rem 0 1.5rem 0; background: #fdf2f8; padding: 1rem 1rem 1rem 2rem; border-radius: 0.5rem;">🏠 신혼집 선택 가이드 (2025년 시세)</h2>

<h3 style="font-size: 1.4rem; color: #be185d; margin-bottom: 1rem; padding: 1rem; background: linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%); border-radius: 0.8rem; border-left: 4px solid #ec4899;">🔍 추천 아파트 단지</h3>

<div style="background: #f8fafc; padding: 2rem; border-radius: 1rem; margin: 1rem 0; border: 1px solid #e2e8f0;">

  <div style="margin-bottom: 2rem; padding: 1.5rem; background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-radius: 1rem; border-left: 4px solid #f59e0b;">
    <h4 style="color: #92400e; margin: 0 0 1rem 0; font-size: 1.2rem; display: flex; align-items: center; gap: 0.5rem;">
      🌟 1. 송도 센트럴파크 푸르지오
    </h4>
    <div style="display: grid; gap: 0.8rem; margin-bottom: 1rem;">
      <div style="display: flex; align-items: center; gap: 0.5rem;">
        <span style="background: #f59e0b; color: white; padding: 0.2rem 0.5rem; border-radius: 0.3rem; font-size: 0.8rem; font-weight: bold;">특징</span>
        <span style="color: #374151;">센트럴파크 조망, 지하철역 도보 5분</span>
      </div>
      <div style="display: flex; align-items: center; gap: 0.5rem;">
        <span style="background: #10b981; color: white; padding: 0.2rem 0.5rem; border-radius: 0.3rem; font-size: 0.8rem; font-weight: bold;">평수</span>
        <span style="color: #374151;">59㎡, 84㎡ 위주</span>
      </div>
      <div style="display: flex; align-items: center; gap: 0.5rem;">
        <span style="background: #3b82f6; color: white; padding: 0.2rem 0.5rem; border-radius: 0.3rem; font-size: 0.8rem; font-weight: bold;">장점</span>
        <span style="color: #374151;">산책로 인접, 문화시설 가까움, 관리 우수</span>
      </div>
    </div>
    <div style="background: white; padding: 1rem; border-radius: 0.5rem; margin-top: 1rem;">
      <p style="margin: 0; color: #374151; line-height: 1.6;">
        <strong style="color: #dc2626;">🆕 2025년 시세:</strong> 전세 <span style="color: #dc2626; font-weight: bold;">5.5-7억원</span>, 매매 <span style="color: #dc2626; font-weight: bold;">8-11억원</span><br>
        <strong style="color: #059669;">관리비:</strong> 월 <span style="color: #059669; font-weight: bold;">25-35만원</span>
      </p>
    </div>
  </div>

  <div style="margin-bottom: 2rem; padding: 1.5rem; background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 1rem; border-left: 4px solid #3b82f6;">
    <h4 style="color: #1e40af; margin: 0 0 1rem 0; font-size: 1.2rem; display: flex; align-items: center; gap: 0.5rem;">
      ⭐ 2. 송도 아이파크
    </h4>
    <div style="display: grid; gap: 0.8rem; margin-bottom: 1rem;">
      <div style="display: flex; align-items: center; gap: 0.5rem;">
        <span style="background: #3b82f6; color: white; padding: 0.2rem 0.5rem; border-radius: 0.3rem; font-size: 0.8rem; font-weight: bold;">특징</span>
        <span style="color: #374151;">대단지 (총 6,500세대), 편의시설 완비</span>
      </div>
      <div style="display: flex; align-items: center; gap: 0.5rem;">
        <span style="background: #10b981; color: white; padding: 0.2rem 0.5rem; border-radius: 0.3rem; font-size: 0.8rem; font-weight: bold;">평수</span>
        <span style="color: #374151;">84㎡, 101㎡ 위주</span>
      </div>
      <div style="display: flex; align-items: center; gap: 0.5rem;">
        <span style="background: #8b5cf6; color: white; padding: 0.2rem 0.5rem; border-radius: 0.3rem; font-size: 0.8rem; font-weight: bold;">장점</span>
        <span style="color: #374151;">단지 내 상가, 커뮤니티 활발, 어린이집 운영</span>
      </div>
    </div>
    <div style="background: white; padding: 1rem; border-radius: 0.5rem; margin-top: 1rem;">
      <p style="margin: 0; color: #374151; line-height: 1.6;">
        <strong style="color: #dc2626;">🆕 2025년 시세:</strong> 전세 <span style="color: #dc2626; font-weight: bold;">6-8억원</span>, 매매 <span style="color: #dc2626; font-weight: bold;">9-13억원</span><br>
        <strong style="color: #059669;">관리비:</strong> 월 <span style="color: #059669; font-weight: bold;">30-40만원</span>
      </p>
    </div>
  </div>

  <div style="margin-bottom: 2rem; padding: 1.5rem; background: linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%); border-radius: 1rem; border-left: 4px solid #8b5cf6;">
    <h4 style="color: #6b21a8; margin: 0 0 1rem 0; font-size: 1.2rem; display: flex; align-items: center; gap: 0.5rem;">
      💎 3. 송도 더샵 센트럴파크
    </h4>
    <div style="display: grid; gap: 0.8rem; margin-bottom: 1rem;">
      <div style="display: flex; align-items: center; gap: 0.5rem;">
        <span style="background: #8b5cf6; color: white; padding: 0.2rem 0.5rem; border-radius: 0.3rem; font-size: 0.8rem; font-weight: bold;">특징</span>
        <span style="color: #374151;">고급 브랜드, 프리미엄 시설</span>
      </div>
      <div style="display: flex; align-items: center; gap: 0.5rem;">
        <span style="background: #10b981; color: white; padding: 0.2rem 0.5rem; border-radius: 0.3rem; font-size: 0.8rem; font-weight: bold;">평수</span>
        <span style="color: #374151;">101㎡, 135㎡ 위주</span>
      </div>
      <div style="display: flex; align-items: center; gap: 0.5rem;">
        <span style="background: #f59e0b; color: white; padding: 0.2rem 0.5rem; border-radius: 0.3rem; font-size: 0.8rem; font-weight: bold;">장점</span>
        <span style="color: #374151;">시설 최고급, 브랜드 가치, 센트럴파크 전망</span>
      </div>
    </div>
    <div style="background: white; padding: 1rem; border-radius: 0.5rem; margin-top: 1rem;">
      <p style="margin: 0; color: #374151; line-height: 1.6;">
        <strong style="color: #dc2626;">🆕 2025년 시세:</strong> 전세 <span style="color: #dc2626; font-weight: bold;">8-12억원</span>, 매매 <span style="color: #dc2626; font-weight: bold;">13-18억원</span><br>
        <strong style="color: #059669;">관리비:</strong> 월 <span style="color: #059669; font-weight: bold;">35-50만원</span>
      </p>
    </div>
  </div>

  <div style="margin-bottom: 1rem; padding: 1.5rem; background: linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%); border-radius: 1rem; border: 2px solid #ec4899;">
    <h4 style="color: #be185d; margin: 0 0 1rem 0; font-size: 1.2rem; display: flex; align-items: center; gap: 0.5rem;">
      <span style="background: #ec4899; color: white; padding: 0.3rem 0.8rem; border-radius: 0.4rem; font-weight: bold; font-size: 0.9rem;">🆕</span>
      ✨ 4. 송도 롯데캐슬
    </h4>
    <div style="display: grid; gap: 0.8rem; margin-bottom: 1rem;">
      <div style="display: flex; align-items: center; gap: 0.5rem;">
        <span style="background: #ec4899; color: white; padding: 0.2rem 0.5rem; border-radius: 0.3rem; font-size: 0.8rem; font-weight: bold;">특징</span>
        <span style="color: #374151;">신축 단지, 최신 스마트홈 시설</span>
      </div>
      <div style="display: flex; align-items: center; gap: 0.5rem;">
        <span style="background: #10b981; color: white; padding: 0.2rem 0.5rem; border-radius: 0.3rem; font-size: 0.8rem; font-weight: bold;">평수</span>
        <span style="color: #374151;">74㎡, 84㎡ 위주</span>
      </div>
      <div style="display: flex; align-items: center; gap: 0.5rem;">
        <span style="background: #3b82f6; color: white; padding: 0.2rem 0.5rem; border-radius: 0.3rem; font-size: 0.8rem; font-weight: bold;">장점</span>
        <span style="color: #374151;">최신 시설, 에너지 효율 우수</span>
      </div>
    </div>
    <div style="background: white; padding: 1rem; border-radius: 0.5rem; margin-top: 1rem;">
      <p style="margin: 0; color: #374151; line-height: 1.6;">
        <strong style="color: #dc2626;">🆕 2025년 시세:</strong> 전세 <span style="color: #dc2626; font-weight: bold;">6.5-8.5억원</span>, 매매 <span style="color: #dc2626; font-weight: bold;">10-14억원</span><br>
        <strong style="color: #059669;">관리비:</strong> 월 <span style="color: #059669; font-weight: bold;">25-35만원</span>
      </p>
    </div>
  </div>

</div>

<h3 style="font-size: 1.3rem; color: #be185d; margin: 2rem 0 1rem 0; padding: 1rem; background: linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%); border-radius: 0.8rem; border-left: 4px solid #ec4899;">🏡 신혼집 선택 체크리스트</h3>

<div style="background: #f8fafc; padding: 2rem; border-radius: 1rem; margin: 1rem 0; border: 1px solid #e2e8f0;">
  <div style="display: grid; gap: 1rem;">
    <div style="display: flex; align-items: center; gap: 0.8rem; padding: 0.8rem; background: white; border-radius: 0.5rem; border-left: 3px solid #10b981;">
      <span style="background: #10b981; color: white; padding: 0.3rem 0.6rem; border-radius: 0.3rem; font-weight: bold;">✅</span>
      <span style="color: #374151;">예산 대비 적정 가격 (전세가율 70% 이하 권장)</span>
    </div>
    <div style="display: flex; align-items: center; gap: 0.8rem; padding: 0.8rem; background: white; border-radius: 0.5rem; border-left: 3px solid #3b82f6;">
      <span style="background: #3b82f6; color: white; padding: 0.3rem 0.6rem; border-radius: 0.3rem; font-weight: bold;">✅</span>
      <span style="color: #374151;">출퇴근 교통편 확인 (GTX-B 개통 고려)</span>
    </div>
    <div style="display: flex; align-items: center; gap: 0.8rem; padding: 0.8rem; background: white; border-radius: 0.5rem; border-left: 3px solid #8b5cf6;">
      <span style="background: #8b5cf6; color: white; padding: 0.3rem 0.6rem; border-radius: 0.3rem; font-weight: bold;">✅</span>
      <span style="color: #374151;">향후 가족 계획 고려한 평수 (84㎡ 이상 추천)</span>
    </div>
    <div style="display: flex; align-items: center; gap: 0.8rem; padding: 0.8rem; background: white; border-radius: 0.5rem; border-left: 3px solid #f59e0b;">
      <span style="background: #f59e0b; color: white; padding: 0.3rem 0.6rem; border-radius: 0.3rem; font-weight: bold;">✅</span>
      <span style="color: #374151;">관리비 및 유지비 계산 (월 30만원 내외)</span>
    </div>
    <div style="display: flex; align-items: center; gap: 0.8rem; padding: 0.8rem; background: white; border-radius: 0.5rem; border-left: 3px solid #ef4444;">
      <span style="background: #ef4444; color: white; padding: 0.3rem 0.6rem; border-radius: 0.3rem; font-weight: bold;">✅</span>
      <span style="color: #374151;">주변 편의시설 확인 (마트, 병원, 학교)</span>
    </div>
    <div style="display: flex; align-items: center; gap: 0.8rem; padding: 0.8rem; background: white; border-radius: 0.5rem; border-left: 3px solid #06b6d4;">
      <span style="background: #06b6d4; color: white; padding: 0.3rem 0.6rem; border-radius: 0.3rem; font-weight: bold;">✅</span>
      <span style="color: #374151;">향과 채광 상태 확인 (남향, 동남향 선호)</span>
    </div>
    <div style="display: flex; align-items: center; gap: 0.8rem; padding: 0.8rem; background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-radius: 0.5rem; border: 1px solid #f59e0b;">
      <span style="background: #f59e0b; color: white; padding: 0.3rem 0.6rem; border-radius: 0.3rem; font-weight: bold;">🆕</span>
      <span style="color: #92400e; font-weight: 500;">IoT 스마트홈 시설 여부</span>
    </div>
    <div style="display: flex; align-items: center; gap: 0.8rem; padding: 0.8rem; background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-radius: 0.5rem; border: 1px solid #f59e0b;">
      <span style="background: #f59e0b; color: white; padding: 0.3rem 0.6rem; border-radius: 0.3rem; font-weight: bold;">🆕</span>
      <span style="color: #92400e; font-weight: 500;">공유 오피스, 피트니스 센터 등 커뮤니티 시설</span>
    </div>
  </div>
</div>

<p style="text-align: center; color: #6b7280; margin: 2rem 0;">송도에서의 행복한 신혼생활 되세요! 💕</p>

<h4>송도 내 주요 가전매장 (2025년 정보)</h4>
<ul>
<li><strong>하이마트 송도점</strong>: 032-832-1004 (무료배송, 설치서비스)</li>
<li><strong>전자랜드 송도점</strong>: 032-832-2345 (신혼 패키지 할인)</li>
<li><strong>코스트코 송도점</strong>: 032-727-2000 (대용량 가전제품)</li>
<li><strong>🆕 삼성 디지털프라자 송도점</strong>: 032-851-9999 (스마트홈 솔루션)</li>
<li><strong>🆕 LG 베스트샵 송도점</strong>: 032-851-8888 (에너지효율 가전)</li>
</ul>

<h4>🆕 2025년 신혼 필수 가전 (스마트홈 중심)</h4>
<ul>
<li><strong>냉장고</strong>: 500L 이상, 와이파이 연결 (삼성 비스포크, LG 오브제컬렉션)</li>
<li><strong>세탁기</strong>: 드럼세탁기 + 건조기 일체형 (AI 세탁 기능)</li>
<li><strong>에어컨</strong>: 인버터형 2-3대, 공기청정 기능 (스마트 제어)</li>
<li><strong>TV</strong>: 65인치 이상 스마트TV (8K, OLED 권장)</li>
<li><strong>🆕 스마트 오븐</strong>: 전자레인지 + 오븐 + 에어프라이어 올인원</li>
<li><strong>🆕 로봇청소기</strong>: 물걸레 겸용, 맵핑 기능</li>
<li><strong>🆕 공기청정기</strong>: IoT 연결, 실시간 공기질 모니터링</li>
</ul>

<h3>🛏️ 가구 쇼핑 가이드</h3>

<h4>송도 내 가구매장 (2025년 업데이트)</h4>
<ul>
<li><strong>이케아 송도점</strong>: 032-727-1234 (스칸디나비아 디자인, 조립서비스)</li>
<li><strong>한샘 송도점</strong>: 032-832-3456 (맞춤 가구, 토탈 인테리어)</li>
<li><strong>현대리바트 송도점</strong>: 032-832-4567 (프리미엄 가구)</li>
<li><strong>🆕 일룸 송도점</strong>: 032-851-7777 (모던 디자인 가구)</li>
<li><strong>🆕 템퍼 송도점</strong>: 032-851-6666 (메모리폼 매트리스)</li>
</ul>

<h4>🆕 2025년 신혼 필수 가구 (모던 라이프 스타일)</h4>
<ul>
<li><strong>침대</strong>: 킹사이즈 + 메모리폼 매트리스 (수면 질 개선)</li>
<li><strong>소파</strong>: 3인용 리클라이너 소파 (홈시어터 겸용)</li>
<li><strong>식탁</strong>: 확장형 4-6인용 (손님 초대 고려)</li>
<li><strong>🆕 스마트 화장대</strong>: LED 조명, 무선충전 패드 내장</li>
<li><strong>🆕 시스템 옷장</strong>: 맞춤 제작, 의류 관리 시스템</li>
<li><strong>🆕 높이조절 책상</strong>: 재택근무용, 서서 일하기 가능</li>
</ul>

<h2>🍽️ 송도 신혼부부 맛집 투어 (2025년 핫플레이스)</h2>

<h3>🥘 데이트 코스 맛집</h3>

<h4>센트럴파크 주변 (루프탑 & 뷰 맛집)</h4>
<ul>
<li><strong>🆕 더 테라스</strong>: 루프탑 이탈리안, 센트럴파크 전망 (032-851-2580)</li>
<li><strong>송도 스테이크하우스</strong>: 한우 프리미엄, 기념일 특화 (032-832-1357)</li>
<li><strong>🆕 소노마 와인바</strong>: 와인 + 안주, 로맨틱 분위기 (032-851-9900)</li>
<li><strong>카페 드롭탑</strong>: 루프탑 카페, 야경 맛집 (032-832-7788)</li>
</ul>

<h4>트리플스트리트 & 현대아울렛</h4>
<ul>
<li><strong>🆕 고메이494</strong>: 프리미엄 뷔페, 기념일 추천 (032-727-4949)</li>
<li><strong>아웃백 스테이크하우스</strong>: 스테이크 전문 (032-727-8899)</li>
<li><strong>🆕 딘타이펑</strong>: 대만 샤오롱바오 전문 (032-727-9988)</li>
<li><strong>🆕 블루보틀 송도점</strong>: 프리미엄 커피, 데이트 카페 (032-851-2468)</li>
</ul>

<h3>🏠 홈쿠킹 & 장보기</h3>
<ul>
<li><strong>이마트 송도점</strong>: 24시간 운영, 신선식품 (032-727-1234)</li>
<li><strong>홈플러스 송도점</strong>: 생활용품 원스톱 (032-727-5678)</li>
<li><strong>코스트코 송도점</strong>: 대용량 쇼핑, 수입식품 (032-727-2000)</li>
<li><strong>🆕 마켓컬리 송도 직배송</strong>: 새벽배송, 유기농 식품</li>
<li><strong>🆕 송도 전통시장</strong>: 로컬 맛집, 신선 해산물 (032-832-9876)</li>
</ul>

<h2>💕 신혼부부 데이트 코스 (2025년 추천)</h2>

<h3>🌸 로맨틱 산책 코스</h3>

<h4>센트럴파크 골든 코스 (3-4시간)</h4>
<ol>
<li><strong>센트럴파크 호수</strong>: 수상택시 체험, 조깅 트랙</li>
<li><strong>🆕 미디어 파사드</strong>: 건물벽면 디지털 아트쇼 (저녁 8시)</li>
<li><strong>G-타워 스카이가든</strong>: 33층 전망대, 인천공항 야경</li>
<li><strong>🆕 센트럴파크 카누</strong>: 호수 위 낭만 체험 (계절 운영)</li>
</ol>

<h4>해안 힐링 코스 (4-5시간)</h4>
<ol>
<li><strong>🆕 송도달빛축제공원</strong>: 계절별 꽃 축제, 포토존</li>
<li><strong>송도해변 산책로</strong>: 서해안 일몰 명소</li>
<li><strong>🆕 워터프론트 요트투어</strong>: 선셋 크루즈 (주말 운행)</li>
<li><strong>채널워크</strong>: 해안가 카페거리, 야경 명소</li>
</ol>

<h3>🎬 실내 데이트 코스</h3>

<h4>문화생활 코스</h4>
<ul>
<li><strong>🆕 CGV 송도 IMAX</strong>: 최신 영화 관람, 커플시트</li>
<li><strong>🆕 송도 VR 테마파크</strong>: 가상현실 체험, 게임존</li>
<li><strong>송도 컨벤시아</strong>: 전시회, 공연 관람</li>
<li><strong>🆕 송도 쿠킹스튜디오</strong>: 커플 요리 클래스</li>
</ul>

<h4>쇼핑 & 스파 코스</h4>
<ul>
<li><strong>현대프리미엄아울렛</strong>: 럭셔리 브랜드 쇼핑</li>
<li><strong>🆕 스파 1839</strong>: 커플 스파, 찜질방 (24시간)</li>
<li><strong>🆕 송도 골프존</strong>: 스크린 골프, 실내 스포츠</li>
<li><strong>트리플스트리트</strong>: 복합문화공간, 팝업스토어</li>
</ul>

<h2>👶 미래 계획 준비 (2025년 육아 인프라)</h2>

<h3>🏥 산부인과 & 소아과 (최신 시설)</h3>
<ul>
<li><strong>가천대 길병원</strong>: 산부인과 전문, 신생아 집중치료실 (032-460-3114)</li>
<li><strong>인천성모병원</strong>: 무통분만 전문, 산후조리 (032-280-5114)</li>
<li><strong>🆕 송도 여성병원</strong>: 신축 전문병원, 최신 장비 (032-851-5000)</li>
<li><strong>🆕 송도아이클리닉</strong>: 소아과 전문, 예방접종 (032-834-7582)</li>
</ul>

<h3>🎓 교육 환경 (글로벌 교육 특구)</h3>
<ul>
<li><strong>🆕 채드윅국제학교</strong>: 미국식 교육, K-12 과정</li>
<li><strong>송도국제학교</strong>: IB 프로그램, 다국적 학생</li>
<li><strong>연세대 송도캠퍼스</strong>: 대학 부설 교육 프로그램</li>
<li><strong>🆕 송도 글로벌 캠퍼스</strong>: 해외 대학 분교 집중</li>
</ul>

<h3>👨‍👩‍👧‍👦 육아 시설 (2025년 확장)</h3>
<ul>
<li><strong>🆕 국공립 어린이집</strong>: 8개소로 확장 (대기자 감소)</li>
<li><strong>민간 어린이집</strong>: 20개소, 영어 특화 프로그램</li>
<li><strong>🆕 송도 키즈 테마파크</strong>: 실내 놀이공간, 카페 결합형</li>
<li><strong>🆕 스마트 키즈케어</strong>: AI 기반 육아 서비스</li>
</ul>

<h2>💰 신혼부부 재정 관리 (2025년 맞춤 전략)</h2>

<h3>🏦 송도 내 주요 금융기관</h3>
<ul>
<li><strong>KB국민은행 송도지점</strong>: 032-832-1234 (신혼부부 전용 상담)</li>
<li><strong>신한은행 송도지점</strong>: 032-832-2345 (디지털 뱅킹 센터)</li>
<li><strong>우리은행 송도지점</strong>: 032-832-3456 (부동산 대출 전문)</li>
<li><strong>🆕 카카오뱅크 송도센터</strong>: 디지털 전용, 24시간 서비스</li>
</ul>

<h3>💳 2025년 신혼부부 대출 상품</h3>
<ul>
<li><strong>🆕 디딤돌 대출</strong>: 최대 3억원, 금리 3.2-4.5%, 40년 상환</li>
<li><strong>🆕 신혼희망타운 대출</strong>: 최대 2.7억원, 금리 2.9-3.8%</li>
<li><strong>🆕 보금자리론</strong>: 최대 5억원, 금리 3.8-5.2%</li>
<li><strong>🆕 인천시 청년 전세대출</strong>: 최대 2억원, 금리 2.5-3.5%</li>
</ul>

<h3>📊 2025년 월 예산 가이드 (송도 맞벌이 기준)</h3>
<ul>
<li><strong>주거비</strong>: 월 소득의 30% 이내 (전세 대출 포함)</li>
<li><strong>생활비</strong>: 월 소득의 35% 이내 (식비, 교통비, 통신비)</li>
<li><strong>저축/투자</strong>: 월 소득의 25% 이상 (비상금 + 투자)</li>
<li><strong>여가/문화</strong>: 월 소득의 10% 이내 (데이트, 취미)</li>
<li><strong>🆕 평균 월 지출</strong>: 250-350만원 (84㎡ 신혼부부 기준)</li>
</ul>

<h2>🤝 커뮤니티 활동 (2025년 네트워킹)</h2>

<h3>👥 신혼부부 모임 (온/오프라인 융합)</h3>
<ul>
<li><strong>🆕 송도 신혼부부 카페</strong>: 네이버 카페 2만명 (정보 공유)</li>
<li><strong>🆕 송도맘 & 송도대디</strong>: 육아 정보, 용품 나눔</li>
<li><strong>송도 런닝 클럽</strong>: 주말 모임, 건강 관리</li>
<li><strong>🆕 송도 쿠킹 클럽</strong>: 요리 레시피 공유, 홈파티</li>
</ul>

<h3>🎨 문화활동 (취미 개발)</h3>
<ul>
<li><strong>홈플러스 문화센터</strong>: 요가, 필라테스, 외국어</li>
<li><strong>🆕 송도 아트센터</strong>: 미술, 음악, 댄스 클래스</li>
<li><strong>연세대 평생교육원</strong>: 전문 교육 프로그램</li>
<li><strong>🆕 송도 메이커스페이스</strong>: 3D 프린팅, 목공 체험</li>
</ul>

<h2>🚨 신혼부부 생활 가이드</h2>

<h3>💸 스마트한 가계 관리</h3>
<ul>
<li>🆕 가계부 앱 활용 (토스, 뱅크샐러드 추천)</li>
<li>🆕 정기 구독 서비스 정리 (중복 방지)</li>
<li>🆕 카드 혜택 최적화 (송도 지역 특화 카드)</li>
<li>🆕 비상금 3-6개월치 준비 (CMA, 적금 활용)</li>
</ul>

<h3>🏠 주거 관리 팁</h3>
<ul>
<li>🆕 스마트홈 앱으로 에너지 절약</li>
<li>🆕 정기 안전점검 (가스, 전기, 보일러)</li>
<li>🆕 관리비 절약법 (공동 전기 절약, 분리수거)</li>
<li>🆕 화재·지진 보험 가입 필수</li>
</ul>

<h2>📱 송도 신혼부부 필수 앱</h2>
<ul>
<li><strong>🆕 송도 스마트시티</strong> - 송도 전용 통합 서비스</li>
<li><strong>🆕 송도라이프</strong> - 지역 커뮤니티, 맛집 정보</li>
<li><strong>배달의민족/요기요</strong> - 홈쿠킹 피곤할 때</li>
<li><strong>마켓컬리</strong> - 신선식품 새벽배송</li>
<li><strong>카카오T</strong> - 택시, 대중교통</li>
<li><strong>토스</strong> - 가계부, 투자, 대출 관리</li>
<li><strong>🆕 커플앱 (비트윈)</strong> - 추억 저장, 일정 공유</li>
</ul>

<h2>📞 유용한 연락처 (2025년 최신)</h2>

<h3>🏢 관공서 & 생활민원</h3>
<ul>
<li><strong>연수구청</strong>: 032-749-8114 (혼인신고, 전입신고)</li>
<li><strong>송도1동 주민센터</strong>: 032-749-8201</li>
<li><strong>송도2동 주민센터</strong>: 032-749-8221</li>
<li><strong>🆕 송도 스마트시티 통합상황실</strong>: 032-850-0000</li>
</ul>

<h3>🏠 생활 서비스</h3>
<ul>
<li><strong>송도IBD 통합관리</strong>: 032-727-8900</li>
<li><strong>🆕 송도 컨시어지 서비스</strong>: 032-850-1111 (생활 도우미)</li>
<li><strong>🆕 송도 반려동물 병원</strong>: 032-851-9595</li>
<li><strong>🆕 송도 케어 서비스</strong>: 032-851-2424 (청소, 육아)</li>
</ul>

<h3>🆘 응급상황</h3>
<ul>
<li><strong>종합상황실</strong>: 119 (화재/구급/구조)</li>
<li><strong>경찰신고</strong>: 112</li>
<li><strong>가스누설신고</strong>: 032-440-0700</li>
<li><strong>🆕 송도 24시간 콜센터</strong>: 032-850-9999</li>
</ul>

<hr>

<h2>🎯 신혼부부 1년 플랜</h2>

<h3>📅 신혼 1개월차 - 정착기</h3>
<ul>
<li>집 계약 및 이사 완료</li>
<li>기본 가전제품 구입 및 설치</li>
<li>주변 편의시설 파악</li>
<li>송도 커뮤니티 가입</li>
</ul>

<h3>📅 신혼 3개월차 - 적응기</h3>
<ul>
<li>가구 구입 및 인테리어 완성</li>
<li>동네 맛집 탐방</li>
<li>취미 활동 시작</li>
<li>비상금 적립 시작</li>
</ul>

<h3>📅 신혼 6개월차 - 안정기</h3>
<ul>
<li>가계부 정착 및 예산 관리</li>
<li>여행 계획 및 실행</li>
<li>미래 계획 논의</li>
<li>보험 가입 검토</li>
</ul>

<h3>📅 신혼 1년차 - 성숙기</h3>
<ul>
<li>장기 재정 계획 수립</li>
<li>부동산 투자 검토</li>
<li>가족 계획 구체화</li>
<li>송도 라이프 완전 정착</li>
</ul>

<hr>

<p><em>💕 축하합니다! 송도에서 시작하는 신혼생활이 행복으로 가득하길 바랍니다.</em></p>
<p><em>✨ 이 가이드는 송도 신혼부부들의 경험과 2025년 최신 정보를 담아 제작되었습니다.</em></p>

<p><small>📢 정보 업데이트: 모든 연락처와 가격 정보는 2025년 7월 기준입니다. 실제 이용 시 변경사항이 있을 수 있으니 사전 확인 바랍니다.</small></p>`
};

export function loadGuideContent(category: string, slug: string): string {
  return PREGENERATED_CONTENT[slug] || '';
}