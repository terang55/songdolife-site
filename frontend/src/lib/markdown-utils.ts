

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
  <h2 style="margin: 0; font-size: 1.5rem;">실제 추천 맛집 총정리 📅</h2>
  <p style="margin: 0.5rem 0 0 0; font-size: 1.1rem; opacity: 0.9;">송도 주민들이 인정한 진짜 맛집들 🎯</p>
  <p style="margin: 0.5rem 0 0 0; font-size: 0.9rem; opacity: 0.8;">최종 업데이트: 2025년 7월</p>
</div>

<h2 style="font-size: 2rem; color: #92400e; border-left: 5px solid #f59e0b; padding-left: 1rem; margin: 3rem 0 1.5rem 0; background: #fef3c7; padding: 1rem 1rem 1rem 2rem; border-radius: 0.5rem;">🏆 센트럴파크 주변 TOP 맛집</h2>

<div style="display: grid; gap: 1.5rem;">
  <div style="background: #fff7ed; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #f59e0b;">
    <h3 style="color: #ea580c; margin: 0 0 1rem 0;">1. 속초코다리냉면</h3>
    <div style="background: white; padding: 1rem; border-radius: 0.5rem; margin-bottom: 0.8rem;">
      <p style="margin: 0; color: #374151; line-height: 1.6;">
        <strong>📍 위치:</strong> 센트럴파크 상가<br>
        <strong>🍜 추천메뉴:</strong> 코다리회냉면, 비빔냉면<br>
        <strong>💰 가격대:</strong> 12,000-15,000원<br>
        <strong>⭐ 특징:</strong> 코다리회가 푸짐하게 들어간 냉면 전문점
      </p>
    </div>
  </div>

  <div style="background: #fff7ed; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #f59e0b;">
    <h3 style="color: #ea580c; margin: 0 0 1rem 0;">2. 칭칭차이나</h3>
    <div style="background: white; padding: 1rem; border-radius: 0.5rem; margin-bottom: 0.8rem;">
      <p style="margin: 0; color: #374151; line-height: 1.6;">
        <strong>📍 위치:</strong> 센트럴파크 근처<br>
        <strong>🍜 추천메뉴:</strong> 양장피, 탕수육, 짬뽕<br>
        <strong>💰 가격대:</strong> 15,000-25,000원<br>
        <strong>⭐ 특징:</strong> 정통 중식당, 현지인들이 인정하는 맛
      </p>
    </div>
  </div>

  <div style="background: #fff7ed; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #f59e0b;">
    <h3 style="color: #ea580c; margin: 0 0 1rem 0;">3. 진시황뼈다귀감자탕</h3>
    <div style="background: white; padding: 1rem; border-radius: 0.5rem; margin-bottom: 0.8rem;">
      <p style="margin: 0; color: #374151; line-height: 1.6;">
        <strong>📍 위치:</strong> 센트럴파크 상가<br>
        <strong>🍜 추천메뉴:</strong> 뼈다귀감자탕, 돼지갈비<br>
        <strong>💰 가격대:</strong> 35,000-50,000원 (2-3인분)<br>
        <strong>⭐ 특징:</strong> 푸짐한 양과 진한 국물, 해장 최고
      </p>
    </div>
  </div>

  <div style="background: #fff7ed; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #f59e0b;">
    <h3 style="color: #ea580c; margin: 0 0 1rem 0;">4. 베테랑 종합어시장</h3>
    <div style="background: white; padding: 1rem; border-radius: 0.5rem; margin-bottom: 0.8rem;">
      <p style="margin: 0; color: #374151; line-height: 1.6;">
        <strong>📍 위치:</strong> 센트럴파크 근처<br>
        <strong>🍜 추천메뉴:</strong> 활어회, 대게, 바닷가재<br>
        <strong>💰 가격대:</strong> 50,000-100,000원<br>
        <strong>⭐ 특징:</strong> 신선한 해산물 전문점
      </p>
    </div>
  </div>

  <div style="background: #fff7ed; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #f59e0b;">
    <h3 style="color: #ea580c; margin: 0 0 1rem 0;">5. 메종드크루아상</h3>
    <div style="background: white; padding: 1rem; border-radius: 0.5rem; margin-bottom: 0.8rem;">
      <p style="margin: 0; color: #374151; line-height: 1.6;">
        <strong>📍 위치:</strong> 센트럴파크 상가<br>
        <strong>🍜 추천메뉴:</strong> 오리지날 크루아상, 허니고르곤졸라 먹물크루아상<br>
        <strong>💰 가격대:</strong> 3,000-8,000원<br>
        <strong>⭐ 특징:</strong> 크루아상 장인의 전문점, 바삭한 버터향
      </p>
    </div>
  </div>
</div>

<h2 style="font-size: 2rem; color: #92400e; border-left: 5px solid #f59e0b; padding-left: 1rem; margin: 3rem 0 1.5rem 0; background: #fef3c7; padding: 1rem 1rem 1rem 2rem; border-radius: 0.5rem;">🛍️ 트리플스트리트 맛집 BEST</h2>

<div style="display: grid; gap: 1.5rem;">
  <div style="background: #fef3c7; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #d97706;">
    <h3 style="color: #92400e; margin: 0 0 1rem 0;">1. 담솥 (솥밥 전문점)</h3>
    <div style="background: white; padding: 1rem; border-radius: 0.5rem;">
      <p style="margin: 0; color: #374151; line-height: 1.6;">
        <strong>🍜 추천메뉴:</strong> 전복솥밥, 스테이크솥밥<br>
        <strong>💰 가격대:</strong> 15,000-25,000원<br>
        <strong>⭐ 특징:</strong> 갓 지은 솥밥의 구수한 맛, 영양만점
      </p>
    </div>
  </div>

  <div style="background: #fef3c7; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #d97706;">
    <h3 style="color: #92400e; margin: 0 0 1rem 0;">2. 세나가족 서울에 오다</h3>
    <div style="background: white; padding: 1rem; border-radius: 0.5rem;">
      <p style="margin: 0; color: #374151; line-height: 1.6;">
        <strong>🍜 추천메뉴:</strong> 쌀국수, 분짜, 월남쌈<br>
        <strong>💰 가격대:</strong> 8,000-15,000원<br>
        <strong>⭐ 특징:</strong> 베트남인이 직접 운영하는 정통 베트남 음식점
      </p>
    </div>
  </div>

  <div style="background: #fef3c7; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #d97706;">
    <h3 style="color: #92400e; margin: 0 0 1rem 0;">3. 일식 덮밥&벤또 전문점</h3>
    <div style="background: white; padding: 1rem; border-radius: 0.5rem;">
      <p style="margin: 0; color: #374151; line-height: 1.6;">
        <strong>🍜 추천메뉴:</strong> 차슈벤또 8,500원, 가츠동 7,500원<br>
        <strong>💰 가격대:</strong> 7,000-12,000원<br>
        <strong>⭐ 특징:</strong> 합리적인 가격에 든든한 일식
      </p>
    </div>
  </div>
</div>

<h2 style="font-size: 2rem; color: #92400e; border-left: 5px solid #f59e0b; padding-left: 1rem; margin: 3rem 0 1.5rem 0; background: #fef3c7; padding: 1rem 1rem 1rem 2rem; border-radius: 0.5rem;">🎯 클리앙 추천 맛집</h2>

<div style="display: grid; gap: 1rem;">
  <div style="background: #f8fafc; padding: 1rem; border-radius: 0.5rem; border-left: 3px solid #10b981;">
    <h4 style="color: #065f46; margin: 0 0 0.5rem 0;">솟구쳐차기 (일본 라멘)</h4>
    <p style="margin: 0; color: #374151; font-size: 0.9rem;">돈코츠라멘, 매운돈코츠라멘 | 10,000-15,000원</p>
  </div>
  <div style="background: #f8fafc; padding: 1rem; border-radius: 0.5rem; border-left: 3px solid #10b981;">
    <h4 style="color: #065f46; margin: 0 0 0.5rem 0;">e99 (오무라이스 전문점)</h4>
    <p style="margin: 0; color: #374151; font-size: 0.9rem;">일본식 오무라이스 | 12,000-18,000원</p>
  </div>
  <div style="background: #f8fafc; padding: 1rem; border-radius: 0.5rem; border-left: 3px solid #10b981;">
    <h4 style="color: #065f46; margin: 0 0 0.5rem 0;">명품네모 (퓨전 중식)</h4>
    <p style="margin: 0; color: #374151; font-size: 0.9rem;">돼지갈비, 칠리새우, 베이컨볶음밥 | 20,000-30,000원</p>
  </div>
</div>

<div style="background: #fef3c7; padding: 1.5rem; border-radius: 1rem; margin: 2rem 0; border: 2px solid #f59e0b;">
  <h3 style="color: #92400e; margin: 0 0 1rem 0; font-size: 1.2rem;">🍴 맛집 이용 꿀팁</h3>
  <div style="display: grid; gap: 0.8rem;">
    <div style="display: flex; align-items: center; gap: 0.5rem;">
      <span style="background: #f59e0b; color: white; padding: 0.2rem 0.5rem; border-radius: 0.3rem; font-size: 0.8rem;">💡</span>
      <span>점심시간(12-1시) 피해서 방문하면 대기시간 단축</span>
    </div>
    <div style="display: flex; align-items: center; gap: 0.5rem;">
      <span style="background: #f59e0b; color: white; padding: 0.2rem 0.5rem; border-radius: 0.3rem; font-size: 0.8rem;">💡</span>
      <span>센트럴파크 주차장 이용시 식당에서 주차 할인 가능</span>
    </div>
    <div style="display: flex; align-items: center; gap: 0.5rem;">
      <span style="background: #f59e0b; color: white; padding: 0.2rem 0.5rem; border-radius: 0.3rem; font-size: 0.8rem;">💡</span>
      <span>트리플스트리트 맛집은 쇼핑과 함께 즐기기 좋음</span>
    </div>
  </div>
</div>

<p style="text-align: center; color: #6b7280; margin: 2rem 0;">송도에서의 맛있는 식사 되세요! 🍽️</p>

<p style="text-align: center; color: #6b7280; margin: 2rem 0; font-size: 0.8rem;">
  <em>📢 정보 업데이트: 모든 정보는 2025년 7월 기준이며, 실제 이용 시 변경사항이 있을 수 있으니 방문 전 확인 바랍니다.</em>
</p>

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
      <span>트리플스트리트 - 복합 문화 쇼핑 공간</span>
    </div>
    <div style="display: flex; align-items: center; gap: 0.5rem;">
      <span style="background: #3b82f6; color: white; padding: 0.2rem 0.5rem; border-radius: 0.3rem; font-size: 0.8rem;">✓</span>
      <span>현대프리미엄아울렛 - 명품 및 패션 브랜드 할인</span>
    </div>
    <div style="display: flex; align-items: center; gap: 0.5rem;">
      <span style="background: #3b82f6; color: white; padding: 0.2rem 0.5rem; border-radius: 0.3rem; font-size: 0.8rem;">✓</span>
      <span>코스트코, 이마트, 홈플러스 - 대형마트</span>
    </div>
    <div style="display: flex; align-items: center; gap: 0.5rem;">
      <span style="background: #3b82f6; color: white; padding: 0.2rem 0.5rem; border-radius: 0.3rem; font-size: 0.8rem;">✓</span>
      <span>롯데몰 송도 (예정) - 송도의 새로운 랜드마크</span>
    </div>
  </div>
</div>

<h2 style="font-size: 2rem; color: #1e40af; border-left: 5px solid #3b82f6; padding-left: 1rem; margin: 3rem 0 1.5rem 0; background: #eff6ff; padding: 1rem 1rem 1rem 2rem; border-radius: 0.5rem;">🛍️ 주요 쇼핑 명소 상세 정보</h2>

<div style="background: #f8fafc; padding: 2rem; border-radius: 1rem; margin: 1rem 0; border: 1px solid #e2e8f0;">
  <h3 style="color: #1e40af; margin-bottom: 1rem;">1. 트리플스트리트 (Triple Street)</h3>
  <div style="margin-bottom: 1.5rem; padding: 1rem; background: white; border-radius: 0.5rem; border-left: 3px solid #10b981;">
    <h4 style="color: #065f46; margin: 0 0 0.8rem 0;">📍 기본 정보</h4>
    <p style="margin: 0; color: #374151; line-height: 1.6;">
      <strong>주소:</strong> 인천광역시 연수구 송도과학로16번길 33-3<br>
      <strong>교통:</strong> 인천지하철 1호선 테크노파크역 2번 출구와 연결<br>
      <strong>영업시간:</strong> 10:30-22:00 (매장별 상이)<br>
      <strong>특징:</strong> 국내 최초의 스트리트형 쇼핑몰. 패션, F&B, 엔터테인먼트가 결합된 복합 문화 공간. 다양한 팝업 스토어와 야외 행사 진행.
    </p>
  </div>
  <div style="margin-bottom: 1.5rem; padding: 1rem; background: white; border-radius: 0.5rem; border-left: 3px solid #f59e0b;">
    <h4 style="color: #92400e; margin: 0 0 0.8rem 0;">✨ 주요 시설 및 브랜드</h4>
    <p style="margin: 0; color: #374151; line-height: 1.6;">
      • <strong>패션:</strong> ZARA, H&M, COS 등 SPA 브랜드 및 국내외 캐주얼 브랜드<br>
      • <strong>F&B:</strong> 다양한 레스토랑, 카페, 디저트 전문점 (예: 쉐이크쉑, 빌리엔젤)<br>
      • <strong>엔터테인먼트:</strong> 메가박스, VR 체험존, 키즈카페 등<br>
      • <strong>기타:</strong> 아트마켓, 플리마켓 등 주말 이벤트 상시 운영
    </p>
  </div>
</div>

<div style="background: #f8fafc; padding: 2rem; border-radius: 1rem; margin: 1rem 0; border: 1px solid #e2e8f0;">
  <h3 style="color: #1e40af; margin-bottom: 1rem;">2. 현대프리미엄아울렛 송도점 (Hyundai Premium Outlets Songdo)</h3>
  <div style="margin-bottom: 1.5rem; padding: 1rem; background: white; border-radius: 0.5rem; border-left: 3px solid #10b981;">
    <h4 style="color: #065f46; margin: 0 0 0.8rem 0;">📍 기본 정보</h4>
    <p style="margin: 0; color: #374151; line-height: 1.6;">
      <strong>주소:</strong> 인천광역시 연수구 송도국제대로 123<br>
      <strong>교통:</strong> 인천지하철 1호선 테크노파크역 2번 출구와 연결<br>
      <strong>영업시간:</strong> 10:30-21:00 (주말 21:00, 금토일 21:00, 공휴일 21:00)<br>
      <strong>특징:</strong> 명품, 해외 유명 브랜드, 국내 인기 브랜드 상품을 30~70% 할인된 가격으로 구매 가능. 도심형 아울렛으로 접근성 우수.
    </p>
  </div>
  <div style="margin-bottom: 1.5rem; padding: 1rem; background: white; border-radius: 0.5rem; border-left: 3px solid #f59e0b;">
    <h4 style="color: #92400e; margin: 0 0 0.8rem 0;">✨ 주요 시설 및 브랜드</h4>
    <p style="margin: 0; color: #374151; line-height: 1.6;">
      • <strong>명품:</strong> 구찌, 프라다, 버버리 등 (입점 브랜드는 시즌별 변동 가능)<br>
      • <strong>패션:</strong> 나이키, 아디다스, 코치, 마이클코어스 등<br>
      • <strong>F&B:</strong> 푸드코트, 전문 식당가, 카페 (예: 봉피양, 매드포갈릭)<br>
      • <strong>편의시설:</strong> 키즈카페, 유모차 대여, 수선실 등
    </p>
  </div>
</div>

<div style="background: #f8fafc; padding: 2rem; border-radius: 1rem; margin: 1rem 0; border: 1px solid #e2e8f0;">
  <h3 style="color: #1e40af; margin-bottom: 1rem;">3. 롯데몰 송도 (예정)</h3>
  <div style="margin-bottom: 1.5rem; padding: 1rem; background: white; border-radius: 0.5rem; border-left: 3px solid #10b981;">
    <h4 style="color: #065f46; margin: 0 0 0.8rem 0;">📍 기본 정보</h4>
    <p style="margin: 0; color: #374151; line-height: 1.6;">
      <strong>위치:</strong> 인천광역시 연수구 송도동 8-1 (인천대입구역 인근)<br>
      <strong>개점 예정:</strong> 2025년 하반기 (예정)<br>
      <strong>특징:</strong> 백화점, 쇼핑몰, 호텔, 영화관 등이 결합된 대규모 복합쇼핑몰. 송도의 새로운 랜드마크가 될 것으로 기대.
    </p>
  </div>
</div>

<div style="background: #f8fafc; padding: 2rem; border-radius: 1rem; margin: 1rem 0; border: 1px solid #e2e8f0;">
  <h3 style="color: #1e40af; margin-bottom: 1rem;">4. 대형마트 (코스트코, 이마트, 홈플러스)</h3>
  <div style="margin-bottom: 1.5rem; padding: 1rem; background: white; border-radius: 0.5rem; border-left: 3px solid #10b981;">
    <h4 style="color: #065f46; margin: 0 0 0.8rem 0;">📍 코스트코 송도점</h4>
    <p style="margin: 0; color: #374151; line-height: 1.6;">
      <strong>주소:</strong> 인천광역시 연수구 컨벤시아대로 230<br>
      <strong>영업시간:</strong> 10:00-22:00 (매월 2, 4째주 일요일 휴무)<br>
      <strong>특징:</strong> 회원제 창고형 할인매장. 대용량 상품, 수입 식료품, 가전 등 다양한 품목 취급.
    </p>
  </div>
  <div style="margin-bottom: 1.5rem; padding: 1rem; background: white; border-radius: 0.5rem; border-left: 3px solid #10b981;">
    <h4 style="color: #065f46; margin: 0 0 0.8rem 0;">📍 이마트 송도점</h4>
    <p style="margin: 0; color: #374151; line-height: 1.6;">
      <strong>주소:</strong> 인천광역시 연수구 송도동 168-1<br>
      <strong>영업시간:</strong> 10:00-23:00 (매월 2, 4째주 일요일 휴무)<br>
      <strong>특징:</strong> 신선식품, 가공식품, 생활용품 등 다양한 상품 구비.
    </p>
  </div>
  <div style="padding: 1rem; background: white; border-radius: 0.5rem; border-left: 3px solid #10b981;">
    <h4 style="color: #065f46; margin: 0 0 0.8rem 0;">📍 홈플러스 송도점</h4>
    <p style="margin: 0; color: #374151; line-height: 1.6;">
      <strong>주소:</strong> 인천광역시 연수구 송도국제대로 165<br>
      <strong>영업시간:</strong> 10:00-23:00 (매월 2, 4째주 일요일 휴무)<br>
      <strong>특징:</strong> 식료품, 의류, 가전 등 원스톱 쇼핑 가능.
    </p>
  </div>
</div>

<p style="text-align: center; color: #6b7280; margin: 2rem 0;">송도에서의 즐거운 쇼핑 되세요! 🛍️</p>

<p style="text-align: center; color: #6b7280; margin: 2rem 0; font-size: 0.8rem;">
  <em>📢 정보 업데이트: 모든 정보는 2025년 7월 기준이며, 실제 이용 시 변경사항이 있을 수 있으니 방문 전 확인 바랍니다.</em>
</p>

</div>`,

  'songdo-park-guide': `<div style="max-width: 100%; margin: 0 auto; line-height: 1.8; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">

<h1 style="font-size: 2.5rem; color: #10b981; text-align: center; margin-bottom: 1rem; border-bottom: 3px solid #34d399; padding-bottom: 1rem;">🌳 송도 공원 완벽 가이드</h1>

<div style="text-align: center; background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 1.5rem; border-radius: 1rem; margin: 2rem 0; box-shadow: 0 8px 25px rgba(16, 185, 129, 0.3);">
  <h2 style="margin: 0; font-size: 1.5rem;">센트럴파크부터 달빛축제공원까지 📅</h2>
  <p style="margin: 0.5rem 0 0 0; font-size: 1.1rem; opacity: 0.9;">송도의 모든 공원과 녹지공간 완벽 정리 🎯</p>
  <p style="margin: 0.5rem 0 0 0; font-size: 0.9rem; opacity: 0.8;">최종 업데이트: 2025년 7월</p>
</div>

<h2 style="font-size: 2rem; color: #065f46; border-left: 5px solid #10b981; padding-left: 1rem; margin: 3rem 0 1.5rem 0; background: #d1fae5; padding: 1rem 1rem 1rem 2rem; border-radius: 0.5rem;">🌊 센트럴파크 (Central Park)</h2>

<div style="background: #f0fdfa; padding: 2rem; border-radius: 1rem; margin: 1rem 0; border: 1px solid #5eead4;">
  <h3 style="color: #0f766e; margin-bottom: 1rem;">📍 기본 정보</h3>
  <div style="margin-bottom: 1.5rem; padding: 1rem; background: white; border-radius: 0.5rem; border-left: 3px solid #10b981;">
    <p style="margin: 0; color: #374151; line-height: 1.6;">
      <strong>위치:</strong> 인천광역시 연수구 센트럴로 160<br>
      <strong>면적:</strong> 414,926㎡ (약 12만 5천 평)<br>
      <strong>교통:</strong> 센트럴파크역 1,2번 출구 도보 5분<br>
      <strong>특징:</strong> 국내 최초 해수 공원, 40층 높이 분수, 뉴욕 센트럴파크를 모티브로 조성
    </p>
  </div>
</div>

<h3 style="color: #0f766e; margin: 2rem 0 1rem 0;">🏛️ 주요 시설 및 즐길 거리</h3>
<div style="display: grid; gap: 1rem;">
  <div style="background: #ecfdf5; padding: 1rem; border-radius: 0.5rem; border-left: 3px solid #22c55e;">
    <h4 style="color: #065f46; margin: 0 0 0.5rem 0;">해수 운하 (Waterway)</h4>
    <p style="margin: 0; color: #374151; font-size: 0.9rem;">길이 1.8km, 카약·카누·패밀리보트·문보트 등 수상 레저 체험 가능 (이스트 보트하우스 운영)</p>
  </div>
  <div style="background: #ecfdf5; padding: 1rem; border-radius: 0.5rem; border-left: 3px solid #22c55e;">
    <h4 style="color: #065f46; margin: 0 0 0.5rem 0;">G타워 전망대</h4>
    <p style="margin: 0; color: #374151; font-size: 0.9rem;">32층 전망 라운지, 송도 국제도시와 서해바다 조망. 입장료 무료. 평일 10:00-21:00, 주말 및 공휴일 13:00-21:00 (입장 마감 20:30), 월요일 휴무.</p>
  </div>
  <div style="background: #ecfdf5; padding: 1rem; border-radius: 0.5rem; border-left: 3px solid #22c55e;">
    <h4 style="color: #065f46; margin: 0 0 0.5rem 0;">음악분수</h4>
    <p style="margin: 0; color: #374151; font-size: 0.9rem;">최대 40m 높이의 시원한 물줄기. 매일 20:00, 21:00 (여름철 추가 운영) 음악과 조명이 어우러진 환상적인 쇼. 무료 관람.</p>
  </div>
  <div style="background: #ecfdf5; padding: 1rem; border-radius: 0.5rem; border-left: 3px solid #22c55e;">
    <h4 style="color: #065f46; margin: 0 0 0.5rem 0;">사슴농장 & 토끼섬</h4>
    <p style="margin: 0; color: #374151; font-size: 0.9rem;">사슴농장: 송도 한옥마을 옆 경원재 맞은편에 위치, 꽃사슴을 가까이에서 볼 수 있는 생태 학습 공간.</p>
    <p style="margin: 0; color: #374151; font-size: 0.9rem;">토끼섬: 센트럴파크 호수 내 인공섬, 토끼 서식 환경 개선 후 운영 중. 자연 친화적인 공간.</p>
  </div>
  <div style="background: #ecfdf5; padding: 1rem; border-radius: 0.5rem; border-left: 3px solid #22c55e;">
    <h4 style="color: #065f46; margin: 0 0 0.5rem 0;">산책로 및 자전거 도로</h4>
    <p style="margin: 0; color: #374151; font-size: 0.9rem;">공원 전체를 아우르는 잘 정비된 산책로와 자전거 도로. 조깅, 산책, 자전거 라이딩에 최적.</p>
  </div>
  <div style="background: #ecfdf5; padding: 1rem; border-radius: 0.5rem; border-left: 3px solid #22c55e;">
    <h4 style="color: #065f46; margin: 0 0 0.5rem 0;">송도 한옥마을</h4>
    <p style="margin: 0; color: #374151; font-size: 0.9rem;">전통 한옥의 아름다움을 느낄 수 있는 공간. 전통 음식점, 카페, 기념품점 등이 위치.</p>
  </div>
</div>

<h2 style="font-size: 2rem; color: #065f46; border-left: 5px solid #10b981; padding-left: 1rem; margin: 3rem 0 1.5rem 0; background: #d1fae5; padding: 1rem 1rem 1rem 2rem; border-radius: 0.5rem;">🌕 달빛축제공원 (Moonlight Festival Park)</h2>

<div style="background: #f0fdfa; padding: 2rem; border-radius: 1rem; margin: 1rem 0; border: 1px solid #5eead4;">
  <h3 style="color: #0f766e; margin-bottom: 1rem;">📍 기본 정보</h3>
  <div style="margin-bottom: 1.5rem; padding: 1rem; background: white; border-radius: 0.5rem; border-left: 3px solid #10b981;">
    <p style="margin: 0; color: #374151; line-height: 1.6;">
      <strong>위치:</strong> 인천광역시 연수구 송도동 26-1 (송도달빛축제공원역 인근)<br>
      <strong>면적:</strong> 2,928,692㎡ (약 88만 평) - 송도에서 가장 큰 공원<br>
      <strong>교통:</strong> 송도달빛축제공원역 4번 출구 도보 5분<br>
      <strong>특징:</strong> 대규모 야외 공연 및 축제 개최에 최적화된 공간. 펜타포트 록 페스티벌 등 대형 행사 개최지.
    </p>
  </div>
</div>

<h3 style="color: #0f766e; margin: 2rem 0 1rem 0;">🎵 주요 시설 및 활용</h3>
<div style="display: grid; gap: 1rem;">
  <div style="background: #ecfdf5; padding: 1rem; border-radius: 0.5rem; border-left: 3px solid #22c55e;">
    <h4 style="color: #065f46; margin: 0 0 0.5rem 0;">펜타포트 야외공연장</h4>
    <p style="margin: 0; color: #374151; font-size: 0.9rem;">최대 8만 명 수용 가능한 대규모 야외 공연장. 최첨단 사운드 시스템과 넓은 잔디밭.</p>
  </div>
  <div style="background: #ecfdf5; padding: 1rem; border-radius: 0.5rem; border-left: 3px solid #22c55e;">
    <h4 style="color: #065f46; margin: 0 0 0.5rem 0;">스포츠 시설</h4>
    <p style="margin: 0; color: #374151; font-size: 0.9rem;">테니스장 17면, 농구장 2면, 다목적 운동장 등 다양한 스포츠 시설 완비.</p>
  </div>
  <div style="background: #ecfdf5; padding: 1rem; border-radius: 0.5rem; border-left: 3px solid #22c55e;">
    <h4 style="color: #065f46; margin: 0 0 0.5rem 0;">산책 및 휴식 공간</h4>
    <p style="margin: 0; color: #374151; font-size: 0.9rem;">넓은 잔디밭과 산책로, 휴식 공간이 조성되어 있어 시민들의 여가 활동에 적합.</p>
  </div>
</div>

<h2 style="font-size: 2rem; color: #065f46; border-left: 5px solid #10b981; padding-left: 1rem; margin: 3rem 0 1.5rem 0; background: #d1fae5; padding: 1rem 1rem 1rem 2rem; border-radius: 0.5rem;">🌅 해돋이공원 (Haedoji Park)</h2>

<div style="background: #f0fdfa; padding: 2rem; border-radius: 1rem; margin: 1rem 0; border: 1px solid #5eead4;">
  <h3 style="color: #0f766e; margin-bottom: 1rem;">📍 기본 정보</h3>
  <div style="margin-bottom: 1.5rem; padding: 1rem; background: white; border-radius: 0.5rem; border-left: 3px solid #10b981;">
    <p style="margin: 0; color: #374151; line-height: 1.6;">
      <strong>위치:</strong> 인천광역시 연수구 송도동 해돋이로 51<br>
      <strong>면적:</strong> 210,468㎡ (약 6만 4천 평)<br>
      <strong>특징:</strong> 정보화 신도시를 상징하는 현대적 공원. 다양한 조형물과 분수 시설이 특징.
    </p>
  </div>
</div>

<h3 style="color: #0f766e; margin: 2rem 0 1rem 0;">🏗️ 주요 조형물 및 시설</h3>
<div style="display: grid; gap: 1rem;">
  <div style="background: #ecfdf5; padding: 1rem; border-radius: 0.5rem; border-left: 3px solid #22c55e;">
    <h4 style="color: #065f46; margin: 0 0 0.5rem 0;">고래의 꿈</h4>
    <p style="margin: 0; color: #374151; font-size: 0.9rem;">높이 15m의 대형 고래 조형물. 야간에는 LED 조명으로 아름다운 경관 연출.</p>
  </div>
  <div style="background: #ecfdf5; padding: 1rem; border-radius: 0.5rem; border-left: 3px solid #22c55e;">
    <h4 style="color: #065f46; margin: 0 0 0.5rem 0;">바닥분수</h4>
    <p style="margin: 0; color: #374151; font-size: 0.9rem;">1,087㎡ 규모의 물놀이 공간. 여름철 어린이들에게 인기. (운영 기간 확인 필요)</p>
  </div>
  <div style="background: #ecfdf5; padding: 1rem; border-radius: 0.5rem; border-left: 3px solid #22c55e;">
    <h4 style="color: #065f46; margin: 0 0 0.5rem 0;">음악분수 광장</h4>
    <p style="margin: 0; color: #374151; font-size: 0.9rem;">폭 91m의 대형 분수. 매일 19:00/20:00/21:00 운영. 음악과 함께하는 분수 쇼.</p>
  </div>
  <div style="background: #ecfdf5; padding: 1rem; border-radius: 0.5rem; border-left: 3px solid #22c55e;">
    <h4 style="color: #065f46; margin: 0 0 0.5rem 0;">장미원 및 산책로</h4>
    <p style="margin: 0; color: #374151; font-size: 0.9rem;">다양한 종류의 장미가 식재된 장미원과 잘 조성된 산책로.</p>
  </div>
</div>

<div style="background: #d1fae5; padding: 1.5rem; border-radius: 1rem; margin: 2rem 0; border: 2px solid #10b981;">
  <h3 style="color: #065f46; margin: 0 0 1rem 0; font-size: 1.2rem;">🚌 교통 정보</h3>
  <div style="display: grid; gap: 0.8rem;">
    <div style="display: flex; align-items: center; gap: 0.5rem;">
      <span style="background: #10b981; color: white; padding: 0.2rem 0.5rem; border-radius: 0.3rem; font-size: 0.8rem;">지하철</span>
      <span>센트럴파크역 → 센트럴파크 (도보 5분)</span>
    </div>
    <div style="display: flex; align-items: center; gap: 0.5rem;">
      <span style="background: #10b981; color: white; padding: 0.2rem 0.5rem; border-radius: 0.3rem; font-size: 0.8rem;">지하철</span>
      <span>송도달빛축제공원역 → 달빛축제공원 (도보 5분)</span>
    </div>
    <div style="display: flex; align-items: center; gap: 0.5rem;">
      <span style="background: #10b981; color: white; padding: 0.2rem 0.5rem; border-radius: 0.3rem; font-size: 0.8rem;">버스</span>
      <span>인천대입구역 → 해돋이공원 (버스 10분)</span>
    </div>
  </div>
</div>

<p style="text-align: center; color: #6b7280; margin: 2rem 0;">송도의 아름다운 공원에서 힐링과 휴식을 만끽하세요! 🌳🌊</p>

<p style="text-align: center; color: #6b7280; margin: 2rem 0; font-size: 0.8rem;">
  <em>📢 정보 업데이트: 모든 정보는 2025년 7월 기준이며, 실제 이용 시 변경사항이 있을 수 있으니 방문 전 확인 바랍니다.</em>
</p>

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
      <span>송도컨벤시아 - 국제회의 및 전시 전문 시설</span>
    </div>
    <div style="display: flex; align-items: center; gap: 0.5rem;">
      <span style="background: #8b5cf6; color: white; padding: 0.2rem 0.5rem; border-radius: 0.3rem; font-size: 0.8rem;">✓</span>
      <span>아트센터 인천 - 클래식 공연 전문 홀</span>
    </div>
    <div style="display: flex; align-items: center; gap: 0.5rem;">
      <span style="background: #8b5cf6; color: white; padding: 0.2rem 0.5rem; border-radius: 0.3rem; font-size: 0.8rem;">✓</span>
      <span>국립세계문자박물관 - 문자 관련 전시 및 교육</span>
    </div>
    <div style="display: flex; align-items: center; gap: 0.5rem;">
      <span style="background: #8b5cf6; color: white; padding: 0.2rem 0.5rem; border-radius: 0.3rem; font-size: 0.8rem;">✓</span>
      <span>트라이볼 - 독특한 건축미의 복합문화공간</span>
    </div>
  </div>
</div>

<h2 style="font-size: 2rem; color: #6b21a8; border-left: 5px solid #8b5cf6; padding-left: 1rem; margin: 3rem 0 1.5rem 0; background: #f3e8ff; padding: 1rem 1rem 1rem 2rem; border-radius: 0.5rem;">🎭 공연 & 전시</h2>

<div style="background: #f8fafc; padding: 2rem; border-radius: 1rem; margin: 1rem 0; border: 1px solid #e2e8f0;">
  <h3 style="color: #6b21a8; margin-bottom: 1rem;">1. 송도컨벤시아 (Songdo Convensia)</h3>
  <div style="margin-bottom: 1.5rem; padding: 1rem; background: white; border-radius: 0.5rem; border-left: 3px solid #10b981;">
    <h4 style="color: #065f46; margin: 0 0 0.8rem 0;">📍 기본 정보</h4>
    <p style="margin: 0; color: #374151; line-height: 1.6;">
      <strong>주소:</strong> 인천광역시 연수구 센트럴로 123<br>
      <strong>교통:</strong> 인천지하철 1호선 센트럴파크역 4번 출구 도보 5분<br>
      <strong>특징:</strong> 국제회의, 전시회, 박람회, 콘서트 등 다양한 대규모 행사 개최. 최첨단 시설과 넓은 공간.
    </p>
  </div>
  <div style="margin-bottom: 1.5rem; padding: 1rem; background: white; border-radius: 0.5rem; border-left: 3px solid #f59e0b;">
    <h4 style="color: #92400e; margin: 0 0 0.8rem 0;">✨ 주요 시설 및 활용</h4>
    <p style="margin: 0; color: #374151; line-height: 1.6;">
      • <strong>전시장:</strong> 최대 900부스 규모의 대형 전시장<br>
      • <strong>회의실:</strong> 2,000명 수용 가능한 그랜드볼룸 포함 20여 개 회의실<br>
      • <strong>이벤트:</strong> 코믹콘, 베이비페어, 건축박람회 등 연중 다양한 행사 개최
    </p>
  </div>
</div>

<div style="background: #f8fafc; padding: 2rem; border-radius: 1rem; margin: 1rem 0; border: 1px solid #e2e8f0;">
  <h3 style="color: #6b21a8; margin-bottom: 1rem;">2. 아트센터 인천 (Art Center Incheon)</h3>
  <div style="margin-bottom: 1.5rem; padding: 1rem; background: white; border-radius: 0.5rem; border-left: 3px solid #10b981;">
    <h4 style="color: #065f46; margin: 0 0 0.8rem 0;">📍 기본 정보</h4>
    <p style="margin: 0; color: #374151; line-height: 1.6;">
      <strong>주소:</strong> 인천광역시 연수구 아트센터대로 100<br>
      <strong>교통:</strong> 인천지하철 1호선 센트럴파크역 4번 출구 도보 10분<br>
      <strong>특징:</strong> 클래식 공연 전문 홀. 세계적인 수준의 음향 시설과 아름다운 건축미.
    </p>
  </div>
  <div style="margin-bottom: 1.5rem; padding: 1rem; background: white; border-radius: 0.5rem; border-left: 3px solid #f59e0b;">
    <h4 style="color: #92400e; margin: 0 0 0.8rem 0;">✨ 주요 시설 및 프로그램</h4>
    <p style="margin: 0; color: #374151; line-height: 1.6;">
      • <strong>콘서트홀:</strong> 1,413석 규모의 클래식 전용 홀<br>
      • <strong>다목적홀:</strong> 700석 규모의 다목적 공연장<br>
      • <strong>프로그램:</strong> 오케스트라, 오페라, 발레, 독주회 등 다양한 클래식 공연
    </p>
  </div>
</div>

<div style="background: #f8fafc; padding: 2rem; border-radius: 1rem; margin: 1rem 0; border: 1px solid #e2e8f0;">
  <h3 style="color: #6b21a8; margin-bottom: 1rem;">3. 국립세계문자박물관 (National Museum of World Writing)</h3>
  <div style="margin-bottom: 1.5rem; padding: 1rem; background: white; border-radius: 0.5rem; border-left: 3px solid #10b981;">
    <h4 style="color: #065f46; margin: 0 0 0.8rem 0;">📍 기본 정보</h4>
    <p style="margin: 0; color: #374151; line-height: 1.6;">
      <strong>주소:</strong> 인천광역시 연수구 송도동 24-8<br>
      <strong>교통:</strong> 인천지하철 1호선 센트럴파크역 4번 출구 도보 15분<br>
      <strong>특징:</strong> 세계 문자의 역사와 문화를 한눈에 볼 수 있는 국내 유일의 문자 전문 박물관.
    </p>
  </div>
  <div style="margin-bottom: 1.5rem; padding: 1rem; background: white; border-radius: 0.5rem; border-left: 3px solid #f59e0b;">
    <h4 style="color: #92400e; margin: 0 0 0.8rem 0;">✨ 주요 전시 및 교육</h4>
    <p style="margin: 0; color: #374151; line-height: 1.6;">
      • <strong>상설전시:</strong> 문자의 탄생, 발전, 확산 등 문자의 역사와 문화<br>
      • <strong>기획전시:</strong> 특정 문자 또는 문화권에 대한 심층 전시<br>
      • <strong>교육 프로그램:</strong> 어린이, 청소년, 성인을 위한 다양한 문자 교육 및 체험 프로그램
    </p>
  </div>
</div>

<div style="background: #f8fafc; padding: 2rem; border-radius: 1rem; margin: 1rem 0; border: 1px solid #e2e8f0;">
  <h3 style="color: #6b21a8; margin-bottom: 1rem;">4. 트라이볼 (Tri-Bowl)</h3>
  <div style="margin-bottom: 1.5rem; padding: 1rem; background: white; border-radius: 0.5rem; border-left: 3px solid #10b981;">
    <h4 style="color: #065f46; margin: 0 0 0.8rem 0;">📍 기본 정보</h4>
    <p style="margin: 0; color: #374151; line-height: 1.6;">
      <strong>주소:</strong> 인천광역시 연수구 센트럴로 232<br>
      <strong>교통:</strong> 인천지하철 1호선 센트럴파크역 4번 출구 도보 3분<br>
      <strong>특징:</strong> 세 개의 그릇을 엎어놓은 듯한 독특한 건축물. 공연, 전시, 교육 등 다양한 문화 행사가 열리는 복합문화공간.
    </p>
  </div>
  <div style="margin-bottom: 1.5rem; padding: 1rem; background: white; border-radius: 0.5rem; border-left: 3px solid #f59e0b;">
    <h4 style="color: #92400e; margin: 0 0 0.8rem 0;">✨ 주요 활용</h4>
    <p style="margin: 0; color: #374151; line-height: 1.6;">
      • <strong>공연:</strong> 소규모 음악회, 연극, 퍼포먼스 등<br>
      • <strong>전시:</strong> 현대 미술, 미디어 아트 등 다양한 장르의 전시<br>
      • <strong>교육:</strong> 문화 예술 교육 프로그램, 워크숍
    </p>
  </div>
</div>

<h2 style="font-size: 2rem; color: #6b21a8; border-left: 5px solid #8b5cf6; padding-left: 1rem; margin: 3rem 0 1.5rem 0; background: #f3e8ff; padding: 1rem 1rem 1rem 2rem; border-radius: 0.5rem;">📚 도서관 & 문화센터</h2>

<div style="background: #f8fafc; padding: 2rem; border-radius: 1rem; margin: 1rem 0; border: 1px solid #e2e8f0;">
  <h3 style="color: #6b21a8; margin-bottom: 1rem;">1. 송도국제도시 도서관 (예정)</h3>
  <div style="margin-bottom: 1.5rem; padding: 1rem; background: white; border-radius: 0.5rem; border-left: 3px solid #10b981;">
    <h4 style="color: #065f46; margin: 0 0 0.8rem 0;">📍 기본 정보</h4>
    <p style="margin: 0; color: #374151; line-height: 1.6;">
      <strong>주소:</strong> 인천광역시 연수구 송도동 20-1 (예정)<br>
      <strong>개관 예정:</strong> 2026년 (예정)<br>
      <strong>특징:</strong> 송도국제도시의 새로운 복합문화공간으로, 도서관 기능 외에도 다양한 문화 프로그램 운영 예정.
    </p>
  </div>
</div>

<div style="background: #f8fafc; padding: 2rem; border-radius: 1rem; margin: 1rem 0; border: 1px solid #e2e8f0;">
  <h3 style="color: #6b21a8; margin-bottom: 1rem;">2. 연수구립 송도국제어린이도서관</h3>
  <div style="margin-bottom: 1.5rem; padding: 1rem; background: white; border-radius: 0.5rem; border-left: 3px solid #10b981;">
    <h4 style="color: #065f46; margin: 0 0 0.8rem 0;">📍 기본 정보</h4>
    <p style="margin: 0; color: #374151; line-height: 1.6;">
      <strong>주소:</strong> 인천광역시 연수구 해돋이로 107<br>
      <strong>영업시간:</strong> 09:00-18:00 (월요일 휴관)<br>
      <strong>특징:</strong> 어린이 특화 도서관으로, 다양한 언어의 도서와 교육 프로그램 제공.
    </p>
  </div>
</div>

<div style="background: #f8fafc; padding: 2rem; border-radius: 1rem; margin: 1rem 0; border: 1px solid #e2e8f0;">
  <h3 style="color: #6b21a8; margin-bottom: 1rem;">3. 홈플러스 송도점 문화센터</h3>
  <div style="margin-bottom: 1.5rem; padding: 1rem; background: white; border-radius: 0.5rem; border-left: 3px solid #10b981;">
    <h4 style="color: #065f46; margin: 0 0 0.8rem 0;">📍 기본 정보</h4>
    <p style="margin: 0; color: #374151; line-height: 1.6;">
      <strong>주소:</strong> 인천광역시 연수구 송도국제대로 165 (홈플러스 송도점 내)<br>
      <strong>특징:</strong> 요리, 미술, 음악, 외국어 등 다양한 연령대를 위한 문화 강좌 운영.
    </p>
  </div>
</div>

<p style="text-align: center; color: #6b7280; margin: 2rem 0;">송도에서의 풍성한 문화생활 되세요! 🎭</p>

<p style="text-align: center; color: #6b7280; margin: 2rem 0; font-size: 0.8rem;">
  <em>📢 정보 업데이트: 모든 정보는 2025년 7월 기준이며, 실제 이용 시 변경사항이 있을 수 있으니 방문 전 확인 바랍니다.</em>
</p>

</div>`,
  'songdo-moving-checklist': `<div style="max-width: 100%; margin: 0 auto; line-height: 1.8; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">

<h1 style="font-size: 2.5rem; color: #2563eb; text-align: center; margin-bottom: 1rem; border-bottom: 3px solid #3b82f6; padding-bottom: 1rem;">🏠 송도 이사 완벽 체크리스트</h1>

<div style="text-align: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 1.5rem; border-radius: 1rem; margin: 2rem 0; box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);">
  <h2 style="margin: 0; font-size: 1.5rem;">2025년 최신판 📅</h2>
  <p style="margin: 0.5rem 0 0 0; font-size: 1.1rem; opacity: 0.9;">송도국제도시 맞춤형 이사 가이드 🎯</p>
  <p style="margin: 0.5rem 0 0 0; font-size: 0.9rem; opacity: 0.8;">최종 업데이트: 2025년 7월 13일</p>
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

<p style="text-align: center; color: #6b7280; margin: 2rem 0; font-size: 0.8rem;">
  <em>📢 정보 업데이트: 모든 정보는 2025년 7월 기준이며, 실제 이용 시 변경사항이 있을 수 있으니 사전 확인 바랍니다.</em>
</p>

</div>
<br>

<h2 style="font-size: 2rem; color: #1e40af; border-left: 5px solid #3b82f6; padding-left: 1rem; margin: 3rem 0 1.5rem 0; background: #eff6ff; padding: 1rem 1rem 1rem 2rem; border-radius: 0.5rem;">🚚 이사 당일 체크리스트</h2>

<div style="margin: 2rem 0;">
  <h3 style="font-size: 1.4rem; color: #1e40af; margin-bottom: 1rem; padding: 1rem; background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 0.8rem; border-left: 4px solid #3b82f6; box-shadow: 0 2px 8px rgba(59, 130, 246, 0.1);">✅ 이사 전 최종 확인</h3>
  <div style="background: #f8fafc; padding: 2rem; border-radius: 1rem; margin: 1rem 0; border: 1px solid #e2e8f0; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
    <ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
      <li style="margin-bottom: 0.5rem;">가스, 전기, 수도 요금 정산 및 차단 확인</li>
      <li style="margin-bottom: 0.5rem;">우편물 주소 변경 및 전입신고 준비</li>
      <li style="margin-bottom: 0.5rem;">쓰레기 처리 및 분리수거 완료</li>
      <li style="margin-bottom: 0.5rem;">귀중품 및 중요 서류 별도 보관</li>
      <li>이사 업체 도착 시간 확인 및 동선 확보</li>
    </ul>
  </div>
</div>

<h2 style="font-size: 2rem; color: #1e40af; border-left: 5px solid #3b82f6; padding-left: 1rem; margin: 3rem 0 1.5rem 0; background: #eff6ff; padding: 1rem 1rem 1rem 2rem; border-radius: 0.5rem;">📦 이사 후 체크리스트</h2>

<div style="margin: 2rem 0;">
  <h3 style="font-size: 1.4rem; color: #1e40af; margin-bottom: 1rem; padding: 1rem; background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 0.8rem; border-left: 4px solid #3b82f6; box-shadow: 0 2px 8px rgba(59, 130, 246, 0.1);">🏠 새 집 정리</h3>
  <div style="background: #f8fafc; padding: 2rem; border-radius: 1rem; margin: 1rem 0; border: 1px solid #e2e8f0; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
    <ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
      <li style="margin-bottom: 0.5rem;">가전제품 및 가구 배치 확인</li>
      <li style="margin-bottom: 0.5rem;">인터넷, TV, 전화 설치 확인</li>
      <li style="margin-bottom: 0.5rem;">전입신고 및 확정일자 받기 (주민센터 또는 온라인)</li>
      <li style="margin-bottom: 0.5rem;">전기, 가스, 수도 명의 변경 및 계량기 확인</li>
      <li>주변 상가 및 편의시설 파악</li>
    </ul>
  </div>
</div>

<p style="text-align: center; color: #6b7280; margin: 2rem 0; font-size: 0.8rem;">
  <em>📢 정보 업데이트: 모든 정보는 2025년 7월 13일 기준이며, 실제 이용 시 변경사항이 있을 수 있으니 사전 확인 바랍니다.</em>
</p>

</div>`,

  'songdo-newlywed-guide': `<div style="max-width: 100%; margin: 0 auto; line-height: 1.8; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">

<h1 style="font-size: 2.5rem; color: #ec4899; text-align: center; margin-bottom: 1rem; border-bottom: 3px solid #f472b6; padding-bottom: 1rem;">💕 송도 신혼부부 완벽 정착 가이드</h1>

<div style="text-align: center; background: linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%); color: white; padding: 1.5rem; border-radius: 1rem; margin: 2rem 0; box-shadow: 0 8px 25px rgba(236, 72, 153, 0.3);">
  <h2 style="margin: 0; font-size: 1.5rem;">2025년 최신판 📅</h2>
  <p style="margin: 0.5rem 0 0 0; font-size: 1.1rem; opacity: 0.9;">송도에서 시작하는 행복한 신혼 라이프 💕</p>
  <p style="margin: 0.5rem 0 0 0; font-size: 0.9rem; opacity: 0.8;">최종 업데이트: 2025년 7월 13일</p>
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

<h2 style="font-size: 2rem; color: #be185d; border-left: 5px solid #ec4899; padding-left: 1rem; margin: 3rem 0 1.5rem 0; background: #fdf2f8; padding: 1rem 1rem 1rem 2rem; border-radius: 0.5rem;">🏠 신혼부부 주거 지원 정책 (2025년)</h2>

<div style="background: #f8fafc; padding: 2rem; border-radius: 1rem; margin: 1rem 0; border: 1px solid #e2e8f0;">
  <h3 style="color: #be185d; margin-bottom: 1rem;">1. 신혼부부 전세자금 대출</h3>
  <div style="margin-bottom: 1.5rem; padding: 1rem; background: white; border-radius: 0.5rem; border-left: 3px solid #10b981;">
    <h4 style="color: #065f46; margin: 0 0 0.8rem 0;">📍 버팀목 전세자금 대출</h4>
    <p style="margin: 0; color: #374151; line-height: 1.6;">
      <strong>대상:</strong> 부부합산 연소득 7천만원 이하, 순자산 3.25억원 이하 무주택 세대주<br>
      <strong>대출 한도:</strong> 수도권 2억원, 수도권 외 1.6억원 (2자녀 이상 가구는 각 2.2억원, 1.8억원)<br>
      <strong>금리:</strong> 연 1.8% ~ 2.4% (소득 및 보증금에 따라 차등)<br>
      <strong>특징:</strong> 최장 10년 (4회 연장), 자녀 수에 따라 우대금리 적용
    </p>
  </div>
  <div style="margin-bottom: 1.5rem; padding: 1rem; background: white; border-radius: 0.5rem; border-left: 3px solid #3b82f6;">
    <h4 style="color: #1e40af; margin: 0 0 0.8rem 0;">📍 중소기업 취업청년 전세자금 대출</h4>
    <p style="margin: 0; color: #374151; line-height: 1.6;">
      <strong>대상:</strong> 중소기업 재직 청년 (만 34세 이하), 부부합산 연소득 5천만원 이하<br>
      <strong>대출 한도:</strong> 1억원<br>
      <strong>금리:</strong> 연 1.2% (고정금리)<br>
      <strong>특징:</strong> 최장 10년 (4회 연장), 저금리로 신혼부부에게 유리
    </p>
  </div>
</div>

<div style="background: #f8fafc; padding: 2rem; border-radius: 1rem; margin: 1rem 0; border: 1px solid #e2e8f0;">
  <h3 style="color: #be185d; margin-bottom: 1rem;">2. 신혼부부 주택 구입자금 대출</h3>
  <div style="margin-bottom: 1.5rem; padding: 1rem; background: white; border-radius: 0.5rem; border-left: 3px solid #8b5cf6;">
    <h4 style="color: #6b21a8; margin: 0 0 0.8rem 0;">📍 디딤돌 대출</h4>
    <p style="margin: 0; color: #374151; line-height: 1.6;">
      <strong>대상:</strong> 부부합산 연소득 7천만원 이하, 순자산 4.69억원 이하 무주택 세대주<br>
      <strong>대출 한도:</strong> 2.5억원 (2자녀 이상 가구는 3.1억원)<br>
      <strong>금리:</strong> 연 2.15% ~ 3.0% (소득 및 만기에 따라 차등)<br>
      <strong>특징:</strong> 최장 30년 (거치기간 1년), 생애최초 주택 구입 시 우대금리 적용
    </p>
  </div>
  <div style="margin-bottom: 1.5rem; padding: 1rem; background: white; border-radius: 0.5rem; border-left: 3px solid #f59e0b;">
    <h4 style="color: #92400e; margin: 0 0 0.8rem 0;">📍 보금자리론</h4>
    <p style="margin: 0; color: #374151; line-height: 1.6;">
      <strong>대상:</strong> 부부합산 연소득 7천만원 이하, 주택가격 6억원 이하<br>
      <strong>대출 한도:</strong> 3.6억원<br>
      <strong>금리:</strong> 연 3.2% ~ 3.5% (만기에 따라 차등)<br>
      <strong>특징:</strong> 최장 40년, 고정금리로 안정적인 상환 가능
    </p>
  </div>
</div>

<h2 style="font-size: 2rem; color: #be185d; border-left: 5px solid #ec4899; padding-left: 1rem; margin: 3rem 0 1.5rem 0; background: #fdf2f8; padding: 1rem 1rem 1rem 2rem; border-radius: 0.5rem;">💡 신혼부부 생활 팁</h2>

<div style="background: #f8fafc; padding: 2rem; border-radius: 1rem; margin: 1rem 0; border: 1px solid #e2e8f0;">
  <h3 style="color: #be185d; margin-bottom: 1rem;">1. 스마트한 가계부 관리</h3>
  <div style="margin-bottom: 1.5rem; padding: 1rem; background: white; border-radius: 0.5rem; border-left: 3px solid #10b981;">
    <h4 style="color: #065f46; margin: 0 0 0.8rem 0;">💰 공동 생활비 계좌 개설</h4>
    <p style="margin: 0; color: #374151; line-height: 1.6;">
      매월 일정 금액을 공동 계좌에 이체하여 식비, 공과금 등 공동 지출 관리<br>
      <small style="color: #64748b;">각자의 용돈은 개인 계좌에서 관리하여 투명성 확보</small>
    </p>
  </div>
  <div style="margin-bottom: 1.5rem; padding: 1rem; background: white; border-radius: 0.5rem; border-left: 3px solid #3b82f6;">
    <h4 style="color: #1e40af; margin: 0 0 0.8rem 0;">📊 가계부 앱 활용</h4>
    <p style="margin: 0; color: #374151; line-height: 1.6;">
      뱅크샐러드, 네이버 가계부 등 자동 연동되는 앱으로 지출 내역 편리하게 관리<br>
      <small style="color: #64748b;">월별 예산 설정 및 목표 달성 여부 확인</small>
    </p>
  </div>
</div>

<div style="background: #f8fafc; padding: 2rem; border-radius: 1rem; margin: 1rem 0; border: 1px solid #e2e8f0;">
  <h3 style="color: #be185d; margin-bottom: 1rem;">2. 건강한 신혼 생활</h3>
  <div style="margin-bottom: 1.5rem; padding: 1rem; background: white; border-radius: 0.5rem; border-left: 3px solid #8b5cf6;">
    <h4 style="color: #6b21a8; margin: 0 0 0.8rem 0;">🏋️‍♀️ 함께 운동하기</h4>
    <p style="margin: 0; color: #374151; line-height: 1.6;">
      송도 센트럴파크 조깅, 요가, 필라테스 등 함께 할 수 있는 운동 선택<br>
      <small style="color: #64748b;">건강도 챙기고 데이트도 즐기는 일석이조 효과</small>
    </p>
  </div>
  <div style="margin-bottom: 1.5rem; padding: 1rem; background: white; border-radius: 0.5rem; border-left: 3px solid #f59e0b;">
    <h4 style="color: #92400e; margin: 0 0 0.8rem 0;">🥗 건강한 식단 유지</h4>
    <p style="margin: 0; color: #374151; line-height: 1.6;">
      주 1회 이상 건강식 직접 요리, 제철 식재료 활용<br>
      <small style="color: #64748b;">배달 음식 줄이고 건강한 식습관 만들기</small>
    </p>
  </div>
</div>

<p class="text-center text-gray-600 text-sm mt-8">📢 정보 업데이트: 모든 정보는 2025년 7월 13일 기준이며, 실제 이용 시 변경사항이 있을 수 있으니 사전 확인 바랍니다.</p>
`,

  'seasonal-events': `<div style="max-width: 100%; margin: 0 auto; line-height: 1.8; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">

<h1 style="font-size: 2.5rem; color: #ec4899; text-align: center; margin-bottom: 1rem; border-bottom: 3px solid #f472b6; padding-bottom: 1rem;">🌸 송도 계절별 이벤트 가이드</h1>

<div style="text-align: center; background: linear-gradient(135deg, #ec4899 0%, #be185d 100%); color: white; padding: 1.5rem; border-radius: 1rem; margin: 2rem 0; box-shadow: 0 8px 25px rgba(236, 72, 153, 0.3);">
  <h2 style="margin: 0; font-size: 1.5rem;">사계절 송도 축제 & 이벤트 완벽 가이드 🎉</h2>
  <p style="margin: 0.5rem 0 0 0; font-size: 1.1rem; opacity: 0.9;">봄꽃부터 겨울 일루미네이션까지 ✨</p>
  <p style="margin: 0.5rem 0 0 0; font-size: 0.9rem; opacity: 0.8;">최종 업데이트: 2025년 7월 13일</p>
</div>

<div style="background: #fdf2f8; padding: 1.5rem; border-radius: 1rem; margin: 2rem 0; border-left: 4px solid #ec4899;">
  <h3 style="color: #be185d; margin: 0 0 1rem 0; font-size: 1.2rem;">📋 개요</h3>
  <p style="color: #374151; margin: 0; line-height: 1.7;">송도국제도시에서 사계절 내내 즐길 수 있는 다양한 이벤트와 축제, 계절별 추천 활동을 소개합니다. 국제도시답게 다채로운 문화 행사와 자연을 만끽할 수 있는 활동들이 가득합니다.</p>
</div>

<hr style="border: none; height: 2px; background: linear-gradient(90deg, #ec4899, #f472b6, #ec4899); margin: 3rem 0;">

<h2 style="font-size: 2rem; color: #059669; border-left: 5px solid #10b981; padding-left: 1rem; margin: 3rem 0 1.5rem 0; background: #d1fae5; padding: 1rem 1rem 1rem 2rem; border-radius: 0.5rem;">🌸 봄 (3월~5월)</h2>

<h3 style="color: #047857; font-size: 1.4rem; margin: 2rem 0 1rem 0;">주요 이벤트 & 축제</h3>

<div style="background: #ecfdf5; padding: 1.5rem; border-radius: 1rem; margin: 1.5rem 0; border-left: 4px solid #10b981;">
  <h4 style="color: #065f46; margin: 0 0 1rem 0; font-size: 1.2rem;">🌸 벚꽃 시즌 (4월 초~중순)</h4>
  <ul style="color: #374151; margin: 0; padding-left: 1.5rem;">
    <li><strong>센트럴파크 벚꽃 명소</strong>: 송도의 대표 벚꽃 명소로 고층 빌딩과 어우러진 도심 속 벚꽃 감상</li>
    <li><strong>수상택시 벚꽃투어</strong>: 센트럴파크 수로를 따라 벚꽃과 도시 경관을 동시에 즐기는 특별한 경험</li>
    <li><strong>산책로 벚꽃길</strong>: 센트럴파크 산책로를 따라 약 2시간 코스의 여유로운 벚꽃 산책</li>
  </ul>
</div>

<h3 style="color: #047857; font-size: 1.4rem; margin: 2rem 0 1rem 0;">봄 추천 활동</h3>

<div style="display: grid; gap: 1.5rem;">
  <div style="background: #f0fdf4; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #22c55e;">
    <h4 style="color: #166534; margin: 0 0 1rem 0;">🏃‍♂️ 아웃도어 액티비티</h4>
    <ul style="color: #374151; margin: 0; padding-left: 1.5rem;">
      <li><strong>센트럴파크 산책 & 피크닉</strong>: 해수공원에서 바닷바람을 맞으며 산책</li>
      <li><strong>카약 및 보트 체험</strong>: 이스트 보트하우스에서 구르미보트, 문보트, 패밀리보트 이용</li>
      <li><strong>G타워 전망대</strong>: 지상 33층에서 360도 송도 전경과 서해바다 조망</li>
      <li><strong>트라이볼 주변 산책</strong>: 독특한 건축물과 수변공간에서 포토존 활용</li>
    </ul>
  </div>

  <div style="background: #fef7ff; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #a855f7;">
    <h4 style="color: #7c2d12; margin: 0 0 1rem 0;">💕 데이트 코스</h4>
    <ul style="color: #374151; margin: 0; padding-left: 1.5rem;">
      <li><strong>센트럴파크 → 웨스트34 카페 → 리저브9 쇼핑</strong>: 봄날의 완벽한 데이트 코스</li>
      <li><strong>포레스트아웃팅스</strong>: 계절마다 바뀌는 실내장식과 야외 테리스에서 봄 분위기 만끽</li>
    </ul>
  </div>
</div>

<h3 style="color: #047857; font-size: 1.4rem; margin: 2rem 0 1rem 0;">봄 맛집 & 카페</h3>

<div style="background: #fffbeb; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #f59e0b;">
  <h4 style="color: #92400e; margin: 0 0 1rem 0;">🍃 계절 추천 메뉴</h4>
  <ul style="color: #374151; margin: 0; padding-left: 1.5rem;">
    <li><strong>테라송 루프탑</strong>: 봄가을철 야외 테라스가 가장 인기, 송도 야경과 함께 즐기는 음료</li>
    <li><strong>케이슨24</strong>: 솔찬공원 내 복합문화공간, 탁 트인 테라스에서 바다 전망과 함께 커피 타임</li>
    <li><strong>밥상편지</strong>: 봄나물을 활용한 계절 한상차림으로 유명</li>
  </ul>
</div>

<hr style="border: none; height: 2px; background: linear-gradient(90deg, #f59e0b, #fbbf24, #f59e0b); margin: 3rem 0;">

<h2 style="font-size: 2rem; color: #dc2626; border-left: 5px solid #ef4444; padding-left: 1rem; margin: 3rem 0 1.5rem 0; background: #fef2f2; padding: 1rem 1rem 1rem 2rem; border-radius: 0.5rem;">☀️ 여름 (6월~8월)</h2>

<h3 style="color: #991b1b; font-size: 1.4rem; margin: 2rem 0 1rem 0;">주요 이벤트 & 축제</h3>

<div style="display: grid; gap: 1.5rem;">
  <div style="background: #fef2f2; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #ef4444;">
    <h4 style="color: #991b1b; margin: 0 0 1rem 0;">🎸 인천 펜타포트 락 페스티벌 (8월 1-3일)</h4>
    <ul style="color: #374151; margin: 0; padding-left: 1.5rem;">
      <li><strong>장소</strong>: 송도달빛축제공원</li>
      <li><strong>특징</strong>: 대한민국 대표 록 페스티벌, 2025년 20주년 기념 특별 라인업</li>
      <li><strong>하이라이트</strong>: 9년 만에 내한하는 그래미 8관왕 BECK 헤드라이너</li>
    </ul>
  </div>

  <div style="background: #f0f9ff; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #0ea5e9;">
    <h4 style="color: #0c4a6e; margin: 0 0 1rem 0;">🏖️ 新송도해변축제 (8월 10-15일)</h4>
    <ul style="color: #374151; margin: 0; padding-left: 1.5rem;">
      <li><strong>장소</strong>: 송도달빛공원 일원</li>
      <li><strong>주요 시설</strong>: 어린이물놀이장, 인공백사장, 캠프닉(캠핑+피크닉)존</li>
      <li><strong>프로그램</strong>: 레크리에이션, 체험프로그램, 레트로게임, 버스킹, 야외극장</li>
      <li><strong>특징</strong>: 무료 입장, 가족 단위 방문객 최적화</li>
    </ul>
  </div>

  <div style="background: #fffbeb; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #f59e0b;">
    <h4 style="color: #92400e; margin: 0 0 1rem 0;">🍺 송도 맥주축제 (매년 여름)</h4>
    <ul style="color: #374151; margin: 0; padding-left: 1.5rem;">
      <li><strong>장소</strong>: 송도달빛축제공원</li>
      <li><strong>특징</strong>: 제15회를 맞는 전통 있는 맥주 축제</li>
    </ul>
  </div>

  <div style="background: #fef2f2; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #ef4444;">
    <h4 style="color: #991b1b; margin: 0 0 1rem 0;">🎶 송도 썸머 페스티벌 (8월 20-25일)</h4>
    <ul style="color: #374151; margin: 0; padding-left: 1.5rem;">
      <li><strong>장소</strong>: 송도 센트럴파크</li>
      <li><strong>특징</strong>: 다양한 장르의 음악 공연, 푸드트럭, 체험 부스 운영</li>
      <li><strong>하이라이트</strong>: 유명 K-POP 아티스트 초청 공연</li>
    </ul>
  </div>
</div>

<h3 style="color: #991b1b; font-size: 1.4rem; margin: 2rem 0 1rem 0;">여름 추천 활동</h3>

<div style="display: grid; gap: 1.5rem;">
  <div style="background: #f0f9ff; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #0ea5e9;">
    <h4 style="color: #0c4a6e; margin: 0 0 1rem 0;">🚤 수상 액티비티</h4>
    <ul style="color: #374151; margin: 0; padding-left: 1.5rem;">
      <li><strong>센트럴파크 수상택시</strong>: 바닷물을 가르며 달리는 시원한 체험</li>
      <li><strong>카누 & 보트</strong>: 해수공원에서 즐기는 다양한 수상스포츠</li>
      <li><strong>수변 산책로</strong>: 약 1.8km 길이의 수로를 따라 시원한 산책</li>
    </ul>
  </div>

  <div style="background: #f3f4f6; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #6b7280;">
    <h4 style="color: #374151; margin: 0 0 1rem 0;">🌙 야간 활동</h4>
    <ul style="color: #374151; margin: 0; padding-left: 1.5rem;">
      <li><strong>센트럴파크 야경 산책</strong>: 여름 더위를 피해 밤에 즐기는 로맨틱한 야경</li>
      <li><strong>리저브9 야간 데이트</strong>: 고층 빌딩들의 화려한 조명과 함께하는 야경 명소</li>
      <li><strong>인천대교 야경</strong>: 송도에서 가장 아름다운 일몰과 야경 감상 포인트</li>
    </ul>
  </div>
</div>

<h3 style="color: #991b1b; font-size: 1.4rem; margin: 2rem 0 1rem 0;">여름 맛집 & 카페</h3>

<div style="background: #ecfdf5; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #10b981;">
  <h4 style="color: #065f46; margin: 0 0 1rem 0;">🧊 시원한 메뉴</h4>
  <ul style="color: #374151; margin: 0; padding-left: 1.5rem;">
    <li><strong>엉클인더키친</strong>: 쌀국수, 분짜 등 베트남 요리로 여름 더위 해소</li>
    <li><strong>람쁘</strong>: 송도 최고의 라멘집, 시원한 츠케멘과 냉라멘 추천</li>
    <li><strong>포레스트아웃팅스</strong>: 에어컨이 잘 되는 대형 카페, 계절별 시즌 음료</li>
  </ul>
</div>

<hr style="border: none; height: 2px; background: linear-gradient(90deg, #f97316, #fb923c, #f97316); margin: 3rem 0;">

<h2 style="font-size: 2rem; color: #ea580c; border-left: 5px solid #f97316; padding-left: 1rem; margin: 3rem 0 1.5rem 0; background: #fff7ed; padding: 1rem 1rem 1rem 2rem; border-radius: 0.5rem;">🍂 가을 (9월~11월)</h2>

<h3 style="color: #c2410c; font-size: 1.4rem; margin: 2rem 0 1rem 0;">주요 이벤트 & 축제</h3>

<div style="background: #fff7ed; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #f97316;">
  <h4 style="color: #c2410c; margin: 0 0 1rem 0;">🎵 가을 문화 행사</h4>
  <ul style="color: #374151; margin: 0; padding-left: 1.5rem;">
    <li><strong>송도달빛축제공원 가을 콘서트</strong>: 9월-10월 다양한 대중음악 공연</li>
    <li><strong>센트럴파크 가을 축제</strong>: 단풍과 억새가 어우러진 도심 속 가을 정취</li>
  </ul>
</div>

<h3 style="color: #c2410c; font-size: 1.4rem; margin: 2rem 0 1rem 0;">가을 추천 활동</h3>

<div style="display: grid; gap: 1.5rem;">
  <div style="background: #fef3c7; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #f59e0b;">
    <h4 style="color: #92400e; margin: 0 0 1rem 0;">🍁 자연 감상</h4>
    <ul style="color: #374151; margin: 0; padding-left: 1.5rem;">
      <li><strong>센트럴파크 단풍 산책</strong>: 해수공원 주변 단풍나무와 도시 경관의 조화</li>
      <li><strong>G타워 전망대 가을 조망</strong>: 가을빛으로 물든 송도 전경과 서해바다</li>
      <li><strong>월미공원 단풍길</strong>: 근처 월미도의 50년 만에 개방된 숲길에서 가을 정취</li>
    </ul>
  </div>

  <div style="background: #fdf2f8; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #ec4899;">
    <h4 style="color: #be185d; margin: 0 0 1rem 0;">📸 포토존 & 데이트</h4>
    <ul style="color: #374151; margin: 0; padding-left: 1.5rem;">
      <li><strong>트라이볼 가을 포토존</strong>: 독특한 건축물과 가을 단풍의 환상적 조화</li>
      <li><strong>센트럴파크 선셋정원</strong>: 가을 석양과 함께하는 로맨틱한 데이트 코스</li>
      <li><strong>송도미래길</strong>: 가을 산책하기 좋은 송도의 대표 산책로</li>
    </ul>
  </div>
</div>

<h3 style="color: #c2410c; font-size: 1.4rem; margin: 2rem 0 1rem 0;">가을 맛집 & 카페</h3>

<div style="background: #fef7ff; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #a855f7;">
  <h4 style="color: #7c2d12; margin: 0 0 1rem 0;">🌰 가을 제철 메뉴</h4>
  <ul style="color: #374151; margin: 0; padding-left: 1.5rem;">
    <li><strong>신계동장어</strong>: 가을 보양식으로 인기, 국내산 대물장어와 뚝배기 계란찜</li>
    <li><strong>시즈쿠</strong>: 가을 제철 해산물을 활용한 일식 코스 요리</li>
    <li><strong>테라송</strong>: 가을철 야외 테라스가 가장 쾌적한 시기</li>
  </ul>
</div>

<hr style="border: none; height: 2px; background: linear-gradient(90deg, #3b82f6, #60a5fa, #3b82f6); margin: 3rem 0;">

<h2 style="font-size: 2rem; color: #1d4ed8; border-left: 5px solid #3b82f6; padding-left: 1rem; margin: 3rem 0 1.5rem 0; background: #eff6ff; padding: 1rem 1rem 1rem 2rem; border-radius: 0.5rem;">❄️ 겨울 (12월~2월)</h2>

<h3 style="color: #1e40af; font-size: 1.4rem; margin: 2rem 0 1rem 0;">주요 이벤트 & 축제</h3>

<div style="display: grid; gap: 1.5rem;">
  <div style="background: #eff6ff; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #3b82f6;">
    <h4 style="color: #1e40af; margin: 0 0 1rem 0;">✨ 겨울 일루미네이션</h4>
    <ul style="color: #374151; margin: 0; padding-left: 1.5rem;">
      <li><strong>센트럴파크 겨울 조명</strong>: 고층 빌딩들의 화려한 조명과 겨울 정취</li>
      <li><strong>송도달빛축제공원 연말 이벤트</strong>: 겨울철 특별 공연 및 행사</li>
    </ul>
  </div>

  <div style="background: #fef7ff; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #a855f7;">
    <h4 style="color: #7c2d12; margin: 0 0 1rem 0;">🎄 송도 크리스마스 마켓 (12월 15일-31일)</h4>
    <ul style="color: #374151; margin: 0; padding-left: 1.5rem;">
      <li><strong>장소</strong>: 트리플스트리트</li>
      <li><strong>특징</strong>: 크리스마스 용품, 수공예품, 겨울 먹거리 판매</li>
      <li><strong>하이라이트</strong>: 대형 크리스마스 트리, 캐롤 공연</li>
    </ul>
  </div>
</div>

<h3 style="color: #1e40af; font-size: 1.4rem; margin: 2rem 0 1rem 0;">겨울 추천 활동</h3>

<div style="display: grid; gap: 1.5rem;">
  <div style="background: #f8fafc; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #64748b;">
    <h4 style="color: #475569; margin: 0 0 1rem 0;">🏢 실내 활동</h4>
    <ul style="color: #374151; margin: 0; padding-left: 1.5rem;">
      <li><strong>G타워 전망대</strong>: 겨울 서해바다와 설경 조망</li>
      <li><strong>트라이볼 실내 공연</strong>: 복합문화공간에서 즐기는 겨울 문화 행사</li>
      <li><strong>대형 카페 투어</strong>: 포레스트아웃팅스 등 겨울철 따뜻한 실내 공간</li>
    </ul>
  </div>

  <div style="background: #f1f5f9; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #475569;">
    <h4 style="color: #334155; margin: 0 0 1rem 0;">🌃 겨울 야경</h4>
    <ul style="color: #374151; margin: 0; padding-left: 1.5rem;">
      <li><strong>센트럴파크 겨울 야경</strong>: 겨울철 특별한 조명과 함께하는 야경 산책</li>
      <li><strong>인천대교 겨울 조망</strong>: 겨울 해넘이와 야경의 환상적 조화</li>
    </ul>
  </div>
</div>

<h3 style="color: #1e40af; font-size: 1.4rem; margin: 2rem 0 1rem 0;">겨울 맛집 & 카페</h3>

<div style="background: #fef2f2; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #ef4444;">
  <h4 style="color: #991b1b; margin: 0 0 1rem 0;">🍲 따뜻한 메뉴</h4>
  <ul style="color: #374151; margin: 0; padding-left: 1.5rem;">
    <li><strong>광명대창집</strong>: 겨울철 따뜻한 곱창과 대창으로 몸보신</li>
    <li><strong>보승회관</strong>: 뜨끈한 국밥으로 겨울 추위 해소</li>
    <li><strong>라멘나츠</strong>: 토리빠이탄 라멘으로 몸과 마음을 따뜻하게</li>
  </ul>
</div>

<hr style="border: none; height: 2px; background: linear-gradient(90deg, #ec4899, #f472b6, #ec4899); margin: 3rem 0;">

<h2 style="font-size: 2rem; color: #be185d; border-left: 5px solid #ec4899; padding-left: 1rem; margin: 3rem 0 1.5rem 0; background: #fdf2f8; padding: 1rem 1rem 1rem 2rem; border-radius: 0.5rem;">📅 연간 축제 달력</h2>

<div style="background: #fdf2f8; padding: 2rem; border-radius: 1rem; margin: 2rem 0;">
  <h3 style="color: #be185d; margin: 0 0 1.5rem 0;">정기 행사 일정</h3>
  <div style="display: grid; gap: 1rem;">
    <div style="background: white; padding: 1rem; border-radius: 0.5rem; border-left: 3px solid #10b981;">
      <strong style="color: #059669;">3-4월</strong>: 센트럴파크 벚꽃 시즌
    </div>
    <div style="background: white; padding: 1rem; border-radius: 0.5rem; border-left: 3px solid #22c55e;">
      <strong style="color: #16a34a;">5월</strong>: 송도 봄 축제 및 야외 활동 시즌
    </div>
    <div style="background: white; padding: 1rem; border-radius: 0.5rem; border-left: 3px solid #06b6d4;">
      <strong style="color: #0891b2;">6-7월</strong>: 여름 수상 액티비티 본격 시작
    </div>
    <div style="background: white; padding: 1rem; border-radius: 0.5rem; border-left: 3px solid #ef4444;">
      <strong style="color: #dc2626;">8월 1일-3일</strong>: 인천 펜타포트 락 페스티벌
    </div>
    <div style="background: white; padding: 1rem; border-radius: 0.5rem; border-left: 3px solid #0ea5e9;">
      <strong style="color: #0284c7;">8월 10-15일</strong>: 新송도해변축제
    </div>
    <div style="background: white; padding: 1rem; border-radius: 0.5rem; border-left: 3px solid #f59e0b;">
      <strong style="color: #d97706;">8월 22일-30일</strong>: 송도 맥주축제
    </div>
    <div style="background: white; padding: 1rem; border-radius: 0.5rem; border-left: 3px solid #f97316;">
      <strong style="color: #ea580c;">9-10월</strong>: 가을 문화 행사 및 단풍 시즌
    </div>
    <div style="background: white; padding: 1rem; border-radius: 0.5rem; border-left: 3px solid #a855f7;">
      <strong style="color: #9333ea;">11월</strong>: 겨울 준비 및 실내 활동 증가
    </div>
    <div style="background: white; padding: 1rem; border-radius: 0.5rem; border-left: 3px solid #3b82f6;">
      <strong style="color: #2563eb;">12월-2월</strong>: 겨울 일루미네이션 및 실내 문화 행사
    </div>
  </div>
</div>

<h3 style="color: #be185d; margin: 2rem 0 1rem 0;">🗓️ 월별 베스트 액티비티</h3>

<div style="display: grid; gap: 1rem; margin: 2rem 0;">
  <div style="background: #ecfdf5; padding: 1rem; border-radius: 0.5rem;">
    <strong style="color: #065f46;">3월</strong>: 봄맞이 센트럴파크 산책
  </div>
  <div style="background: #f0fdf4; padding: 1rem; border-radius: 0.5rem;">
    <strong style="color: #166534;">4월</strong>: 벚꽃 명소 투어 및 포토존 활용
  </div>
  <div style="background: #f0fdfa; padding: 1rem; border-radius: 0.5rem;">
    <strong style="color: #134e4a;">5월</strong>: 야외 피크닉 및 수상 액티비티 시작
  </div>
  <div style="background: #f0f9ff; padding: 1rem; border-radius: 0.5rem;">
    <strong style="color: #0c4a6e;">6월</strong>: 본격적인 수상스포츠 시즌
  </div>
  <div style="background: #fef2f2; padding: 1rem; border-radius: 0.5rem;">
    <strong style="color: #991b1b;">7월</strong>: 야간 활동 및 쿨링 스팟 탐방
  </div>
  <div style="background: #fdf2f8; padding: 1rem; border-radius: 0.5rem;">
    <strong style="color: #be185d;">8월</strong>: 대형 축제 참여 (펜타포트, 해변축제, 맥주축제)
  </div>
  <div style="background: #fffbeb; padding: 1rem; border-radius: 0.5rem;">
    <strong style="color: #92400e;">9월</strong>: 가을 초입 야외 활동 재개
  </div>
  <div style="background: #fff7ed; padding: 1rem; border-radius: 0.5rem;">
    <strong style="color: #c2410c;">10월</strong>: 단풍 명소 및 가을 정취 만끽
  </div>
  <div style="background: #fef7ff; padding: 1rem; border-radius: 0.5rem;">
    <strong style="color: #7c2d12;">11월</strong>: 겨울 준비 및 실내 카페 투어
  </div>
  <div style="background: #eff6ff; padding: 1rem; border-radius: 0.5rem;">
    <strong style="color: #1e40af;">12월</strong>: 연말 분위기 및 겨울 야경
  </div>
  <div style="background: #f8fafc; padding: 1rem; border-radius: 0.5rem;">
    <strong style="color: #475569;">1월</strong>: 신년 계획 및 실내 문화 활동
  </div>
  <div style="background: #f1f5f9; padding: 1rem; border-radius: 0.5rem;">
    <strong style="color: #334155;">2월</strong>: 겨울 마무리 및 봄 준비
  </div>
</div>

<hr style="border: none; height: 2px; background: linear-gradient(90deg, #10b981, #34d399, #10b981); margin: 3rem 0;">

<h2 style="font-size: 2rem; color: #065f46; border-left: 5px solid #10b981; padding-left: 1rem; margin: 3rem 0 1.5rem 0; background: #ecfdf5; padding: 1rem 1rem 1rem 2rem; border-radius: 0.5rem;">🚗 교통 및 접근성</h2>

<div style="display: grid; gap: 1.5rem;">
  <div style="background: #ecfdf5; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #10b981;">
    <h3 style="color: #065f46; margin: 0 0 1rem 0;">🚇 대중교통</h3>
    <ul style="color: #374151; margin: 0; padding-left: 1.5rem;">
      <li><strong>인천지하철 1호선</strong>: 센트럴파크역, 국제업무지구역, 송도달빛축제공원역</li>
      <li><strong>버스</strong>: 16, 82, 103, 780-1번 등 송도 전역 연결</li>
      <li><strong>광역급행버스 M6405</strong>: 송도 ↔ 서울 강남 직행</li>
    </ul>
  </div>

  <div style="background: #f0f9ff; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #0ea5e9;">
    <h3 style="color: #0c4a6e; margin: 0 0 1rem 0;">🅿️ 주차 정보</h3>
    <ul style="color: #374151; margin: 0; padding-left: 1.5rem;">
      <li><strong>센트럴파크</strong>: 인근 공영주차장 및 상업시설 주차장 이용</li>
      <li><strong>달빛축제공원</strong>: 축제 기간 중 임시 주차장 운영</li>
      <li><strong>G타워</strong>: 지하 주차장 이용 가능</li>
    </ul>
  </div>
</div>

<hr style="border: none; height: 2px; background: linear-gradient(90deg, #a855f7, #c084fc, #a855f7); margin: 3rem 0;">

<h2 style="font-size: 2rem; color: #7c2d12; border-left: 5px solid #a855f7; padding-left: 1rem; margin: 3rem 0 1.5rem 0; background: #fef7ff; padding: 1rem 1rem 1rem 2rem; border-radius: 0.5rem;">💡 여행 팁</h2>

<div style="display: grid; gap: 1.5rem;">
  <div style="background: #fef7ff; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #a855f7;">
    <h3 style="color: #7c2d12; margin: 0 0 1rem 0;">👔 계절별 복장 가이드</h3>
    <ul style="color: #374151; margin: 0; padding-left: 1.5rem;">
      <li><strong>봄/가을</strong>: 가디건이나 얇은 자켓 추천 (해풍으로 인한 일교차 주의)</li>
      <li><strong>여름</strong>: 자외선 차단제 필수, 모자 및 선글라스 권장</li>
      <li><strong>겨울</strong>: 바람막이 및 목도리 필수 (해풍으로 체감온도 하락)</li>
    </ul>
  </div>

  <div style="background: #fdf2f8; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #ec4899;">
    <h3 style="color: #be185d; margin: 0 0 1rem 0;">📸 사진 촬영 포인트</h3>
    <ul style="color: #374151; margin: 0; padding-left: 1.5rem;">
      <li><strong>센트럴파크 수로</strong>: 고층 빌딩과 물의 반영이 아름다운 구도</li>
      <li><strong>G타워 전망대</strong>: 송도 전경 파노라마 사진</li>
      <li><strong>트라이볼</strong>: 독특한 건축미와 함께하는 인생샷</li>
      <li><strong>인천대교</strong>: 일몰 시간대 실루엣 사진</li>
    </ul>
  </div>

  <div style="background: #ecfdf5; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #10b981;">
    <h3 style="color: #065f46; margin: 0 0 1rem 0;">💰 예산 가이드</h3>
    <ul style="color: #374151; margin: 0; padding-left: 1.5rem;">
      <li><strong>무료 활동</strong>: 센트럴파크 산책, G타워 전망대, 해변 산책</li>
      <li><strong>저예산</strong>: 카페 음료 (5,000-10,000원), 대중교통비</li>
      <li><strong>중예산</strong>: 수상택시 (성인 5,000원), 보트 체험 (20,000-30,000원)</li>
      <li><strong>고예산</strong>: 축제 티켓, 고급 레스토랑 식사</li>
    </ul>
  </div>
</div>

<hr style="border: none; height: 2px; background: linear-gradient(90deg, #ec4899, #f472b6, #ec4899); margin: 3rem 0;">

<div style="text-align: center; background: linear-gradient(135deg, #ec4899 0%, #be185d 100%); color: white; padding: 2rem; border-radius: 1rem; margin: 3rem 0;">
  <p style="margin: 0; font-size: 1rem; opacity: 0.9; line-height: 1.6;">
    <em>본 가이드는 2024-2025년 기준으로 작성되었으며, 축제 일정이나 운영시간은 변경될 수 있으니 방문 전 공식 홈페이지를 확인해주세요.</em>
  </p>
</div>

<p class="text-center text-gray-600 text-sm mt-8">📢 정보 업데이트: 모든 축제 정보와 일정은 2025년 7월 기준입니다. 실제 참여 시 변경사항이 있을 수 있으니 사전 확인 바랍니다.</p>

</div>`
};

export function loadGuideContent(category: string, slug: string): string {
  return PREGENERATED_CONTENT[slug] || '';
}