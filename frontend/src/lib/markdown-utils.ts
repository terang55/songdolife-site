

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

<h1 style="font-size: 2.5rem; color: #f59e0b; text-align: center; margin-bottom: 1rem; border-bottom: 3px solid #fbbf24; padding-bottom: 1rem;">🍽️ 송도 맛집 A to Z: 2025년 최신 추천 가이드</h1>

<div style="text-align: center; background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 1.5rem; border-radius: 1rem; margin: 2rem 0; box-shadow: 0 8px 25px rgba(245, 158, 11, 0.3);">
  <h2 style="margin: 0; font-size: 1.5rem;">송도, 어디서 먹어야 할지 고민되시나요? 🤔</h2>
  <p style="margin: 0.5rem 0 0 0; font-size: 1.1rem; opacity: 0.9;">현지인과 방문객 모두를 만족시킬 최신 맛집 리스트를 준비했습니다. 데이트, 가족 외식, 점심 식사 등 상황별 최고의 선택지를 만나보세요.</p>
  <p style="margin: 0.5rem 0 0 0; font-size: 0.9rem; opacity: 0.8;">최종 업데이트: 2025년 7월</p>
</div>

<h2 style="font-size: 2rem; color: #c2410c; border-left: 5px solid #f97316; padding-left: 1rem; margin: 3rem 0 1.5rem 0; background: #fff7ed; padding: 1rem 1rem 1rem 2rem; border-radius: 0.5rem;">💖 로맨틱 데이트 추천</h2>

<div style="display: grid; gap: 1.5rem;">
  <div style="background: #fffbeb; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #f59e0b;">
    <h3 style="color: #d97706; margin: 0 0 1rem 0;">1. 샹끄발레르 (베이커리 & 카페)</h3>
    <p style="margin: 0; color: #374151; line-height: 1.6;">
      <strong>분위기:</strong> 생활의 달인에 소개된 소금빵 맛집. 야외 테라스에서 여유로운 시간을 보낼 수 있습니다.<br>
      <strong>추천메뉴:</strong> 소금빵(시간 맞춰 방문 필수), 슈크림빵, 다양한 케이크<br>
      <strong>가격대:</strong> 빵 3,000원~, 커피 5,000원~<br>
      <strong>주소:</strong> 인천 연수구 컨벤시아대로130번길 14<br>
      <strong>⭐ Tip:</strong> 소금빵 나오는 시간(10:30, 12:00, 13:00, 14:00, 15:00, 16:00)을 확인하고 방문하세요.
    </p>
  </div>
  <div style="background: #fffbeb; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #f59e0b;">
    <h3 style="color: #d97706; margin: 0 0 1rem 0;">2. 임파스토 (이탈리안)</h3>
    <p style="margin: 0; color: #374151; line-height: 1.6;">
      <strong>분위기:</strong> 아늑하고 캐주얼한 분위기의 생면 파스타 전문점. 뇨끼의 달인으로 소개된 곳입니다.<br>
      <strong>추천메뉴:</strong> 구운 뇨끼, 생면 파스타, 라자냐<br>
      <strong>가격대:</strong> 2~3만원대<br>
      <strong>주소:</strong> 인천광역시 연수구 송도 센트럴파크 푸르지오시티 1층<br>
      <strong>⭐ Tip:</strong> 예약제로 운영되므로 캐치테이블 앱을 통한 사전 예약이 필수입니다.
    </p>
  </div>
    <div style="background: #fffbeb; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #f59e0b;">
    <h3 style="color: #d97706; margin: 0 0 1rem 0;">3. 이아 (일식)</h3>
    <p style="margin: 0; color: #374151; line-height: 1.6;">
      <strong>분위기:</strong> 모던하고 세련된 캐주얼 일식집. 한국조리기능장이 운영합니다.<br>
      <strong>추천메뉴:</strong> 한판 초밥, 참치 냉파스타<br>
      <strong>가격대:</strong> 런치 2만원대, 디너 4만원대<br>
      <strong>주소:</strong> 인천 연수구 컨벤시아대로 70 302동 106호<br>
      <strong>⭐ Tip:</strong> 매장이 아담하여 예약 후 방문하는 것을 추천합니다. (일요일 휴무)
    </p>
  </div>
</div>

<h2 style="font-size: 2rem; color: #059669; border-left: 5px solid #10b981; padding-left: 1rem; margin: 3rem 0 1.5rem 0; background: #ecfdf5; padding: 1rem 1rem 1rem 2rem; border-radius: 0.5rem;">👨‍👩‍👧‍👦 가족 외식 추천</h2>

<div style="display: grid; gap: 1.5rem;">
  <div style="background: #f0fdfa; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #14b8a6;">
    <h3 style="color: #0f766e; margin: 0 0 1rem 0;">1. 거궁 (한정식)</h3>
    <p style="margin: 0; color: #374151; line-height: 1.6;">
      <strong>특징:</strong> 넓고 쾌적한 공간에서 즐기는 정갈한 이천쌀밥 한정식. 상견례 장소로도 인기가 많습니다.<br>
      <strong>추천메뉴:</strong> 거한상, 특 거한상, 소중한 거한상<br>
      <strong>가격대:</strong> 1인 3~5만원대<br>
      <strong>주소:</strong> 인천 연수구 송도국제대로 157 오네스타 2층<br>
      <strong>⭐ Tip:</strong> 룸 예약이 가능하여 프라이빗한 가족 모임에 적합합니다.
    </p>
  </div>
  <div style="background: #f0fdfa; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #14b8a6;">
    <h3 style="color: #0f766e; margin: 0 0 1rem 0;">2. 송도들밥 (한식)</h3>
    <p style="margin: 0; color: #374151; line-height: 1.6;">
      <strong>특징:</strong> 건강하고 푸짐한 집밥 스타일의 한상차림. 청국장과 다양한 밑반찬, 솥밥이 제공됩니다.<br>
      <strong>추천메뉴:</strong> 들밥 밥상, 꼬막 밥상, 보리굴비 밥상, 제육볶음<br>
      <strong>가격대:</strong> 1인 17,000원~<br>
      <strong>주소:</strong> 인천 연수구 인천타워대로 257 아트포레 2층<br>
      <strong>⭐ Tip:</strong> 주말에는 대기가 길 수 있으니 캐치테이블 앱으로 원격 웨이팅을 이용하세요.
    </p>
  </div>
    <div style="background: #f0fdfa; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #14b8a6;">
    <h3 style="color: #0f766e; margin: 0 0 1rem 0;">3. 세컨디포레스트 (퓨전 이탈리안)</h3>
    <p style="margin: 0; color: #374151; line-height: 1.6;">
      <strong>특징:</strong> '휴식이 있는 다이닝'을 콘셉트로 한 편안한 분위기의 레스토랑. 아이들이 좋아하는 메뉴가 많습니다.<br>
      <strong>추천메뉴:</strong> 오이스터 치킨 쉬림프 리조또, 들깨크림 파스타, 포레스트 롱기 피자<br>
      <strong>가격대:</strong> 1~2만원대<br>
      <strong>주소:</strong> 인천광역시 연수구 인천타워대로 257 아트포레<br>
      <strong>⭐ Tip:</strong> 아기의자가 준비되어 있고, 야외 테라스 좌석도 이용 가능합니다.
    </p>
  </div>
</div>

<h2 style="font-size: 2rem; color: #1d4ed8; border-left: 5px solid #3b82f6; padding-left: 1rem; margin: 3rem 0 1.5rem 0; background: #eff6ff; padding: 1rem 1rem 1rem 2rem; border-radius: 0.5rem;">🍚 든든한 점심 추천</h2>

<div style="display: grid; gap: 1.5rem;">
  <div style="background: #eef2ff; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #4f46e5;">
    <h3 style="color: #4338ca; margin: 0 0 1rem 0;">1. 담솥 (솥밥)</h3>
    <p style="margin: 0; color: #374151; line-height: 1.6;">
      <strong>특징:</strong> 건강하고 맛있는 솥밥 전문점. 깔끔하고 정갈한 상차림으로 제공됩니다.<br>
      <strong>추천메뉴:</strong> 가지솥밥, 스테이크솥밥, 전복솥밥, 장어솥밥<br>
      <strong>가격대:</strong> 1~2만원대<br>
      <strong>주소:</strong> 인천 연수구 송도과학로16번길 33-2 트리플스트리트 B동 지하3층 (본점)<br>
      <strong>⭐ Tip:</strong> 점심시간에는 웨이팅이 길 수 있으니 조금 서두르는 것이 좋습니다.
    </p>
  </div>
  <div style="background: #eef2ff; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #4f46e5;">
    <h3 style="color: #4338ca; margin: 0 0 1rem 0;">2. 제일면옥 (냉면)</h3>
    <p style="margin: 0; color: #374151; line-height: 1.6;">
      <strong>특징:</strong> 한우 사골로 25시간 이상 우려낸 깊은 육수의 냉면 전문점. 면발이 굵고 탱탱합니다.<br>
      <strong>추천메뉴:</strong> 회냉면, 물냉면, 갈비탕<br>
      <strong>가격대:</strong> 1만원대<br>
      <strong>주소:</strong> 인천 연수구 컨벤시아대로 42번길 12 202동 107호<br>
      <strong>⭐ Tip:</strong> 해장이 필요하거나 빠른 식사를 원할 때 제격입니다. (월요일 휴무)
    </p>
  </div>
    <div style="background: #eef2ff; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #4f46e5;">
    <h3 style="color: #4338ca; margin: 0 0 1rem 0;">3. 삼산회관 (한식)</h3>
    <p style="margin: 0; color: #374151; line-height: 1.6;">
      <strong>특징:</strong> 100일 숙성 김치와 150시간 숙성 돼지고기로 만든 돼지김치구이가 유명한 한식 주점.<br>
      <strong>추천메뉴:</strong> 돼지김치구이, 돼지김치찌개<br>
      <strong>가격대:</strong> 1만원대<br>
      <strong>주소:</strong> 인천 연수구 하모니로 158 송도 타임스페이스 D동 1층<br>
      <strong>⭐ Tip:</strong> '줄 서는 식당'에 소개된 맛집으로, 점심시간에 직장인들에게 인기가 많습니다.
    </p>
  </div>
</div>

<h2 style="font-size: 2rem; color: #9333ea; border-left: 5px solid #a855f7; padding-left: 1rem; margin: 3rem 0 1.5rem 0; background: #f5f3ff; padding: 1rem 1rem 1rem 2rem; border-radius: 0.5rem;">🌮 특별한 요리가 생각날 때</h2>

<div style="display: grid; gap: 1.5rem;">
  <div style="background: #faf5ff; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #9333ea;">
    <h3 style="color: #7e22ce; margin: 0 0 1rem 0;">1. 스와갓 (인도 요리)</h3>
    <p style="margin: 0; color: #374151; line-height: 1.6;">
      <strong>요리:</strong> 인도/네팔<br>
      <strong>추천메뉴:</strong> 치킨 마크니, 탄두리 치킨, 갈릭 난<br>
      <strong>가격대:</strong> 2~3만원대<br>
      <strong>주소:</strong> 인천 연수구 하모니로 124 303호<br>
      <strong>⭐ Tip:</strong> 현지 셰프가 직접 요리하는 정통의 맛을 느낄 수 있으며, 이국적인 분위기가 매력적입니다.
    </p>
  </div>
  <div style="background: #faf5ff; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #9333ea;">
    <h3 style="color: #7e22ce; margin: 0 0 1rem 0;">2. 수블라키아 (그리스 요리)</h3>
    <p style="margin: 0; color: #374151; line-height: 1.6;">
      <strong>요리:</strong> 그리스<br>
      <strong>추천메뉴:</strong> 치킨 수블라키, 양고기 수블라키, 그릭 샐러드<br>
      <strong>가격대:</strong> 1~2만원대<br>
      <strong>주소:</strong> 인천 연수구 컨벤시아대로 100 601동 123호<br>
      <strong>⭐ Tip:</strong> 그리스 전통 꼬치 요리와 함께 다양한 와인을 즐길 수 있어 특별한 날에 좋습니다.
    </p>
  </div>
    <div style="background: #faf5ff; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #9333ea;">
    <h3 style="color: #7e22ce; margin: 0 0 1rem 0;">3. 버거룸181 (수제버거)</h3>
    <p style="margin: 0; color: #374151; line-height: 1.6;">
      <strong>요리:</strong> 수제버거<br>
      <strong>추천메뉴:</strong> 181룸 버거, 블루아보카룸 버거, 칠리치즈 프라이<br>
      <strong>가격대:</strong> 1~2만원대<br>
      <strong>주소:</strong> 인천 연수구 센트럴로 160 센트럴파크 푸르지오 상가 A동 2층<br>
      <strong>⭐ Tip:</strong> 센트럴파크 뷰를 감상할 수 있는 야외 테라스 좌석이 인기가 많습니다.
    </p>
  </div>
</div>

<div style="background: #fefce8; padding: 1.5rem; border-radius: 1rem; margin: 3rem 0; border: 2px solid #eab308;">
  <h3 style="color: #a16207; margin: 0 0 1rem 0; font-size: 1.2rem;">💡 맛집 이용 꿀팁</h3>
  <ul style="margin: 0; padding-left: 1.2rem; color: #422006;">
    <li style="margin-bottom: 0.5rem;"><strong>예약 필수:</strong> 인기 맛집은 주말, 저녁 시간에 대기가 길 수 있으니 방문 전 예약을 권장합니다. (캐치테이블, 네이버 예약 등)</li>
    <li style="margin-bottom: 0.5rem;"><strong>주차 정보 확인:</strong> 트리플스트리트, 아트포레, 오네스타 등 상가 이용 시 주차 지원이 되는 경우가 많습니다.</li>
    <li><strong>브레이크 타임:</strong> 오후 3시부터 5시 사이는 브레이크 타임인 곳이 많으니 미리 확인하세요.</li>
  </ul>
</div>

<p style="text-align: center; color: #6b7280; margin: 2rem 0;">송도에서의 맛있는 식사 되세요! 🍽️</p>

<p style="text-align: center; color: #6b7280; margin: 2rem 0; font-size: 0.8rem;">
  <em>📢 정보 업데이트: 모든 정보는 2025년 7월 기준이며, 실제 이용 시 변경사항이 있을 수 있으니 방문 전 확인 바랍니다.</em>
</p>

</div>`,

  'songdo-shopping-guide': `<div style="max-width: 100%; margin: 0 auto; line-height: 1.8; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">

<h1 style="font-size: 2.5rem; color: #3b82f6; text-align: center; margin-bottom: 1rem; border-bottom: 3px solid #60a5fa; padding-bottom: 1rem;">🛍️ 송도 쇼핑 A to Z: 2025년 최신 가이드</h1>

<div style="text-align: center; background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; padding: 1.5rem; border-radius: 1rem; margin: 2rem 0; box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3);">
  <h2 style="margin: 0; font-size: 1.5rem;">송도의 모든 쇼핑 명소, 한눈에 보기 🛒</h2>
  <p style="margin: 0.5rem 0 0 0; font-size: 1.1rem; opacity: 0.9;">아울렛부터 복합 쇼핑몰, 창고형 마트까지 최신 정보를 총정리했습니다.</p>
  <p style="margin: 0.5rem 0 0 0; font-size: 0.9rem; opacity: 0.8;">최종 업데이트: 2025년 7월</p>
</div>

<h2 style="font-size: 2rem; color: #1e40af; border-left: 5px solid #3b82f6; padding-left: 1rem; margin: 3rem 0 1.5rem 0; background: #eff6ff; padding: 1rem 1rem 1rem 2rem; border-radius: 0.5rem;">📍 주요 쇼핑 스팟 TOP 4</h2>

<div style="display: grid; gap: 1.5rem;">
  <div style="background: #f0f9ff; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #3b82f6;">
    <h3 style="color: #1e40af; margin: 0 0 1rem 0;">1. 현대 프리미엄 아울렛 송도점</h3>
    <p style="margin: 0; color: #374151; line-height: 1.6;">
      <strong>별칭:</strong> 송현아<br>
      <strong>특징:</strong> 명품부터 스포츠 브랜드까지 원스톱 쇼핑. 지하철과 바로 연결되어 접근성이 뛰어납니다.<br>
      <strong>층별 안내:</strong><br>
      - B1: 푸드코트, 서점, 스포츠/아동 브랜드<br>
      - 1F: 해외 명품, 패션 잡화<br>
      - 2F: 여성/남성 패션<br>
      - 3F: 리빙, 가전, 식당가<br>
      <strong>⭐ Tip:</strong> 지하 1층 푸드코트 맛집이 많아 쇼핑과 식사를 함께 해결하기 좋습니다. 주말에는 주차장이 혼잡할 수 있으니 대중교통 이용을 추천합니다.
    </p>
  </div>
  <div style="background: #f0f9ff; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #3b82f6;">
    <h3 style="color: #1e40af; margin: 0 0 1rem 0;">2. 트리플 스트리트</h3>
    <p style="margin: 0; color: #374151; line-height: 1.6;">
      <strong>특징:</strong> 개방적인 스트리트형 쇼핑몰. 트렌디한 패션, 뷰티, 라이프스타일 브랜드와 맛집, 영화관이 모여있습니다.<br>
      <strong>동별 안내:</strong><br>
      - A/B동: 글로벌 패션 브랜드, F&B<br>
      - C동: 메가박스 영화관, K-뷰티<br>
      - D동: 라이프스타일, 가구, F&B<br>
      <strong>⭐ Tip:</strong> 2025년 리뉴얼로 실내 브릿지와 루프탑 라운지가 추가되어 더욱 쾌적한 쇼핑이 가능합니다. 계절별로 열리는 플리마켓과 이벤트도 놓치지 마세요.
    </p>
  </div>
  <div style="background: #f0f9ff; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #3b82f6;">
    <h3 style="color: #1e40af; margin: 0 0 1rem 0;">3. 코스트코 송도점</h3>
    <p style="margin: 0; color: #374151; line-height: 1.6;">
      <strong>특징:</strong> 회원제 창고형 할인매장. 대용량 식료품과 생활용품을 저렴하게 구매할 수 있습니다.<br>
      <strong>주요 품목:</strong> 신선식품, 베이커리, 가전제품, 의류, 캠핑용품<br>
      <strong>⭐ Tip:</strong> 매월 둘째, 넷째 주 일요일은 의무 휴무일이니 방문 전 확인이 필요합니다. 푸드코트의 피자와 베이크는 가성비 좋은 메뉴로 인기가 많습니다.
    </p>
  </div>
  <div style="background: #f0f9ff; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #3b82f6;">
    <h3 style="color: #1e40af; margin: 0 0 1rem 0;">4. 롯데몰 송도 (2026년 말 완공 예정)</h3>
    <p style="margin: 0; color: #374151; line-height: 1.6;">
      <strong>특징:</strong> 도심형 럭셔리 리조트와 프리미엄 쇼핑몰이 결합된 형태로 개발 중입니다.<br>
      <strong>기대 효과:</strong> GTX-B 노선과 함께 송도의 새로운 교통, 상업, 관광의 중심지가 될 것으로 기대됩니다.<br>
      <strong>⭐ Tip:</strong> 완공 시 송도의 쇼핑 지도를 바꿀 핵심 시설이 될 것입니다.
    </p>
  </div>
</div>

<div style="background: #eef2ff; padding: 1.5rem; border-radius: 1rem; margin: 3rem 0; border: 2px solid #4f46e5;">
  <h3 style="color: #4338ca; margin: 0 0 1rem 0; font-size: 1.2rem;">💡 쇼핑 꿀팁</h3>
  <ul style="margin: 0; padding-left: 1.2rem; color: #312e81;">
    <li style="margin-bottom: 0.5rem;"><strong>통합 쇼핑 동선:</strong> 현대 프리미엄 아울렛과 트리플 스트리트는 서로 연결되어 있어 함께 둘러보기 좋습니다.</li>
    <li style="margin-bottom: 0.5rem;"><strong>주차:</strong> 대부분의 대형 쇼핑몰은 구매 금액에 따라 무료 주차를 지원합니다. 영수증을 꼭 챙기세요.</li>
    <li><strong>이벤트 확인:</strong> 방문 전 각 쇼핑몰의 홈페이지나 앱에서 할인 행사나 이벤트를 확인하면 더욱 알뜰한 쇼핑을 즐길 수 있습니다.</li>
  </ul>
</div>

<p style="text-align: center; color: #6b7280; margin: 2rem 0;">송도에서 즐거운 쇼핑 되세요! 🛍️</p>

<p style="text-align: center; color: #6b7280; margin: 2rem 0; font-size: 0.8rem;">
  <em>📢 정보 업데이트: 모든 정보는 2025년 7월 기준이며, 실제 이용 시 변경사항이 있을 수 있으니 방문 전 확인 바랍니다.</em>
</p>

</div>`,

  'songdo-park-guide': `<div style="max-width: 100%; margin: 0 auto; line-height: 1.8; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">

<h1 style="font-size: 2.5rem; color: #10b981; text-align: center; margin-bottom: 1rem; border-bottom: 3px solid #34d399; padding-bottom: 1rem;">🌳 송도 공원 완벽 가이드: 2025년 최신 정보</h1>

<div style="text-align: center; background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 1.5rem; border-radius: 1rem; margin: 2rem 0; box-shadow: 0 8px 25px rgba(16, 185, 129, 0.3);">
  <h2 style="margin: 0; font-size: 1.5rem;">도심 속 오아시스, 송도 공원에서 힐링하세요 🌿</h2>
  <p style="margin: 0.5rem 0 0 0; font-size: 1.1rem; opacity: 0.9;">휴식, 산책, 레저, 축제까지 모두 즐길 수 있는 송도의 대표 공원들을 소개합니다.</p>
  <p style="margin: 0.5rem 0 0 0; font-size: 0.9rem; opacity: 0.8;">최종 업데이트: 2025년 7월</p>
</div>

<h2 style="font-size: 2rem; color: #065f46; border-left: 5px solid #10b981; padding-left: 1rem; margin: 3rem 0 1.5rem 0; background: #d1fae5; padding: 1rem 1rem 1rem 2rem; border-radius: 0.5rem;">🌳 대표 공원 BEST 3</h2>

<div style="display: grid; gap: 1.5rem;">
  <div style="background: #ecfdf5; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #10b981;">
    <h3 style="color: #047857; margin: 0 0 1rem 0;">1. 송도 센트럴파크</h3>
    <p style="margin: 0; color: #374151; line-height: 1.6;">
      <strong>특징:</strong> 국내 최초의 해수공원. 이국적인 풍경과 다양한 수상 레저(문보트, 카누 등)를 즐길 수 있는 송도의 랜드마크입니다.<br>
      <strong>주요 시설:</strong> 수상택시, 문보트, 카누, 한옥마을, 사슴농장, 토끼섬, IFEZ 전망대<br>
      <strong>즐길 거리:</strong><br>
      - 이스트보트하우스에서 문보트, 구르미보트 등 다양한 보트 체험<br>
      - 송도 한옥마을에서 식사 또는 차 한잔의 여유<br>
      - G타워 33층 전망대에서 송도 전경 감상 (무료)<br>
      <strong>⭐ Tip:</strong> 밤이 되면 화려한 야경을 감상할 수 있어 데이트 코스로도 인기가 높습니다. 주차는 인근 공영주차장을 이용하세요.
    </p>
  </div>
  <div style="background: #ecfdf5; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #10b981;">
    <h3 style="color: #047857; margin: 0 0 1rem 0;">2. 해돋이공원</h3>
    <p style="margin: 0; color: #374151; line-height: 1.6;">
      <strong>특징:</strong> 넓은 잔디밭과 아름다운 장미원이 있어 피크닉과 산책에 최적화된 공원입니다.<br>
      <strong>주요 시설:</strong> 미로장미원, 음악분수, 바닥분수, 고래의 꿈 조형물, 인공폭포<br>
      <strong>즐길 거리:</strong><br>
      - 여름철 시원한 바닥분수에서 물놀이<br>
      - 저녁에는 음악분수 쇼 감상<br>
      - 잘 조성된 산책로와 자전거 도로에서 여유로운 시간 보내기<br>
      <strong>⭐ Tip:</strong> 주차장이 협소한 편이니, 주말에는 대중교통 이용이나 인근 갓길 주차를 고려해야 합니다.
    </p>
  </div>
  <div style="background: #ecfdf5; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #10b981;">
    <h3 style="color: #047857; margin: 0 0 1rem 0;">3. 달빛축제공원</h3>
    <p style="margin: 0; color: #374151; line-height: 1.6;">
      <strong>특징:</strong> 펜타포트 락 페스티벌 등 대규모 축제가 열리는 광활한 잔디 공원입니다. 평소에는 반려견과 산책하기 좋습니다.<br>
      <strong>주요 시설:</strong> 펜타포트 야외공연장, 도그파크, 체육시설(농구장, 족구장 등)<br>
      <strong>즐길 거리:</strong><br>
      - 넓은 잔디밭에서 연날리기나 피크닉<br>
      - 도그파크에서 반려견과 함께 뛰어놀기<br>
      - 대규모 축제 기간에 방문하여 열기 느끼기<br>
      <strong>⭐ Tip:</strong> 지하철 1호선 송도달빛축제공원역과 바로 연결되어 대중교통으로 방문하기 편리합니다. 그늘이 부족하니 햇볕이 강한 날에는 모자나 선크림을 챙기세요.
    </p>
  </div>
</div>

<div style="background: #f0fdfa; padding: 1.5rem; border-radius: 1rem; margin: 3rem 0; border: 2px solid #14b8a6;">
  <h3 style="color: #0f766e; margin: 0 0 1rem 0; font-size: 1.2rem;">💡 공원 이용 꿀팁</h3>
  <ul style="margin: 0; padding-left: 1.2rem; color: #115e59;">
    <li style="margin-bottom: 0.5rem;"><strong>자전거 대여:</strong> 센트럴파크 등 주요 공원 근처에서 공공자전거를 대여하여 공원을 둘러볼 수 있습니다.</li>
    <li style="margin-bottom: 0.5rem;"><strong>피크닉:</strong> 해돋이공원과 달빛축제공원은 돗자리를 펴고 피크닉을 즐기기에 좋습니다.</li>
    <li><strong>반려견 동반:</strong> 달빛축제공원 내 도그파크에서 반려견과 함께 즐거운 시간을 보낼 수 있습니다. (목줄 착용 필수)</li>
  </ul>
</div>

<p style="text-align: center; color: #6b7280; margin: 2rem 0;">송도의 아름다운 공원에서 힐링과 휴식을 만끽하세요! 🌳</p>

<p style="text-align: center; color: #6b7280; margin: 2rem 0; font-size: 0.8rem;">
  <em>📢 정보 업데이트: 모든 정보는 2025년 7월 기준이며, 실제 이용 시 변경사항이 있을 수 있으니 방문 전 확인 바랍니다.</em>
</p>

</div>`,

  'songdo-culture-guide': `<div style="max-width: 100%; margin: 0 auto; line-height: 1.8; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">

<h1 style="font-size: 2.5rem; color: #8b5cf6; text-align: center; margin-bottom: 1rem; border-bottom: 3px solid #a78bfa; padding-bottom: 1rem;">🎭 송도 문화생활 A to Z: 2025년 최신 가이드</h1>

<div style="text-align: center; background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); color: white; padding: 1.5rem; border-radius: 1rem; margin: 2rem 0; box-shadow: 0 8px 25px rgba(139, 92, 246, 0.3);">
  <h2 style="margin: 0; font-size: 1.5rem;">송도에서 즐기는 다채로운 문화생활 🎨</h2>
  <p style="margin: 0.5rem 0 0 0; font-size: 1.1rem; opacity: 0.9;">공연, 전시, 쇼핑, 휴식이 공존하는 송도의 문화 명소를 총정리했습니다.</p>
  <p style="margin: 0.5rem 0 0 0; font-size: 0.9rem; opacity: 0.8;">최종 업데이트: 2025년 7월</p>
</div>

<h2 style="font-size: 2rem; color: #6b21a8; border-left: 5px solid #8b5cf6; padding-left: 1rem; margin: 3rem 0 1.5rem 0; background: #f3e8ff; padding: 1rem 1rem 1rem 2rem; border-radius: 0.5rem;">🏛️ 꼭 가봐야 할 문화 명소</h2>

<div style="display: grid; gap: 1.5rem;">
  <div style="background: #faf5ff; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #9333ea;">
    <h3 style="color: #7e22ce; margin: 0 0 1rem 0;">1. 국립세계문자박물관</h3>
    <p style="margin: 0; color: #374151; line-height: 1.6;">
      <strong>특징:</strong> 세계 3번째 문자 전문 박물관. 두루마리를 펼친 듯한 아름다운 건축물과 함께 인류 문자의 역사를 탐험할 수 있습니다.<br>
      <strong>즐길 거리:</strong> 쐐기문자부터 한글까지 55종의 문자 관련 유물과 디지털 전시, 어린이 체험실<br>
      <strong>관람 시간:</strong> 10:00 ~ 18:00 (월요일 휴관)<br>
      <strong>관람료:</strong> 무료<br>
      <strong>⭐ Tip:</strong> 아이와 함께라면 디지털 ID 카드를 활용한 체험을 추천합니다. 센트럴파크 내에 위치하여 산책과 함께 즐기기 좋습니다.
    </p>
  </div>
  <div style="background: #faf5ff; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #9333ea;">
    <h3 style="color: #7e22ce; margin: 0 0 1rem 0;">2. 트라이보울(Tri-bowl)</h3>
    <p style="margin: 0; color: #374151; line-height: 1.6;">
      <strong>특징:</strong> 세 개의 그릇을 엎어놓은 듯한 독특한 건축미를 자랑하는 복합문화공간. 물 위에 떠 있는 듯한 모습이 인상적입니다.<br>
      <strong>즐길 거리:</strong> 다양한 기획 전시와 소규모 공연, 교육 프로그램이 연중 열립니다.<br>
      <strong>⭐ Tip:</strong> 야경이 특히 아름다워 사진 명소로도 유명합니다. 방문 전 홈페이지에서 진행 중인 전시/공연 정보를 확인하세요.
    </p>
  </div>
  <div style="background: #faf5ff; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #9333ea;">
    <h3 style="color: #7e22ce; margin: 0 0 1rem 0;">3. 송도 한옥마을</h3>
    <p style="margin: 0; color: #374151; line-height: 1.6;">
      <strong>특징:</strong> 고층 빌딩 숲 사이에서 만나는 고즈넉한 한국의 미. 센트럴파크와 인접해 있습니다.<br>
      <strong>즐길 거리:</strong> 한옥으로 지어진 호텔, 식당, 카페에서 특별한 식사나 차 한잔의 여유를 즐길 수 있습니다.<br>
      <strong>⭐ Tip:</strong> 한복을 대여해 입고 스냅 사진을 찍는 것도 좋은 추억이 됩니다. 전통 공예 체험 프로그램도 운영됩니다.
    </p>
  </div>
</div>

<h2 style="font-size: 2rem; color: #6b21a8; border-left: 5px solid #8b5cf6; padding-left: 1rem; margin: 3rem 0 1.5rem 0; background: #f3e8ff; padding: 1rem 1rem 1rem 2rem; border-radius: 0.5rem;">📚 책과 함께하는 휴식</h2>

<div style="display: grid; gap: 1.5rem;">
  <div style="background: #faf5ff; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #9333ea;">
    <h3 style="color: #7e22ce; margin: 0 0 1rem 0;">1. 송도국제어린이도서관</h3>
    <p style="margin: 0; color: #374151; line-height: 1.6;">
      <strong>위치:</strong> 연수구 컨벤시아대로 43<br>
      <strong>특징:</strong> 어린이들을 위한 특화 도서관으로, 다양한 체험 프로그램과 영어 원서 코너가 잘 갖춰져 있습니다.<br>
      <strong>이용 시간:</strong> 09:00 ~ 18:00 (월요일 휴관)<br>
      <strong>⭐ Tip:</strong> 아이들과 함께 독서 습관을 기르고, 문화 프로그램에 참여하기 좋습니다.
    </p>
  </div>
  <div style="background: #faf5ff; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #9333ea;">
    <h3 style="color: #7e22ce; margin: 0 0 1rem 0;">2. 송도국제기구도서관</h3>
    <p style="margin: 0; color: #374151; line-height: 1.6;">
      <strong>위치:</strong> G-타워 문화동 2층<br>
      <strong>특징:</strong> 국제기구 관련 전문 자료를 찾아볼 수 있는 특별한 도서관입니다. 일반인도 이용 가능합니다.<br>
      <strong>⭐ Tip:</strong> G-타워 전망대 방문 시 함께 둘러보면 좋습니다.
    </p>
  </div>
</div>

<div style="background: #f5f3ff; padding: 1.5rem; border-radius: 1rem; margin: 3rem 0; border: 2px solid #a78bfa;">
  <h3 style="color: #6d28d9; margin: 0 0 1rem 0; font-size: 1.2rem;">🎉 공연 및 축제 정보</h3>
  <ul style="margin: 0; padding-left: 1.2rem; color: #4c1d95;">
    <li style="margin-bottom: 0.5rem;"><strong>송도컨벤시아:</strong> 대규모 전시, 박람회, 콘서트가 연중 개최됩니다. 최신 행사 정보는 공식 홈페이지에서 확인하세요.</li>
    <li style="margin-bottom: 0.5rem;"><strong>달빛축제공원:</strong> 펜타포트 락 페스티벌, 송도 맥주 축제 등 대형 야외 축제가 열립니다.</li>
    <li><strong>연수문화재단:</strong> '송도문화살롱', '금요예술무대' 등 주민들을 위한 다채로운 무료 공연과 문화 프로그램을 운영합니다.</li>
  </ul>
</div>

<p style="text-align: center; color: #6b7280; margin: 2rem 0;">송도에서 풍성한 문화생활을 즐겨보세요! 🎭</p>

<p style="text-align: center; color: #6b7280; margin: 2rem 0; font-size: 0.8rem;">
  <em>📢 정보 업데이트: 모든 정보는 2025년 7월 기준이며, 행사 일정은 변경될 수 있으니 방문 전 공식 홈페이지를 확인 바랍니다.</em>
</p>

</div>`,
  'songdo-moving-checklist': `<div style="max-width: 100%; margin: 0 auto; line-height: 1.8; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">

<h1 style="font-size: 2.5rem; color: #2563eb; text-align: center; margin-bottom: 1rem; border-bottom: 3px solid #3b82f6; padding-bottom: 1rem;">🏠 송도 이사 완벽 체크리스트 (2025년 최신판)</h1>

<div style="text-align: center; background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); color: white; padding: 1.5rem; border-radius: 1rem; margin: 2rem 0; box-shadow: 0 8px 25px rgba(37, 99, 235, 0.3);">
  <h2 style="margin: 0; font-size: 1.5rem;">송도로 이사 오시나요? 이것만은 꼭 챙기세요! ✅</h2>
  <p style="margin: 0.5rem 0 0 0; font-size: 1.1rem; opacity: 0.9;">복잡한 이사 준비, 시기별 체크리스트로 스마트하게 해결하세요.</p>
  <p style="margin: 0.5rem 0 0 0; font-size: 0.9rem; opacity: 0.8;">최종 업데이트: 2025년 7월</p>
</div>

<h2 style="font-size: 2rem; color: #1e40af; border-left: 5px solid #3b82f6; padding-left: 1rem; margin: 3rem 0 1.5rem 0; background: #eff6ff; padding: 1rem 1rem 1rem 2rem; border-radius: 0.5rem;">🗓️ D-30: 이사 한 달 전</h2>

<div style="background: #f0f9ff; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #60a5fa;">
  <ul style="margin: 0; padding-left: 1.2rem; color: #1e3a8a; line-height: 1.8;">
    <li><strong>이사업체 선정 및 계약:</strong> 최소 3곳 이상에서 방문 견적을 받아 비교하고, 피해보상보험 가입 여부를 반드시 확인하세요. (국토교통부 허가업체 확인)</li>
    <li><strong>이사 날짜 확정:</strong> 손 없는 날이나 주말은 예약이 빨리 마감되므로, 최소 한 달 전에는 확정하고 계약금을 지불하는 것이 좋습니다.</li>
    <li><strong>불필요한 물품 정리:</strong> 버릴 가구나 가전제품은 미리 폐기물 스티커를 구매하여 처리하거나, 중고 판매 앱을 통해 판매 계획을 세우세요.</li>
    <li><strong>자녀 전학 준비:</strong> 재학 중인 학교에 전학 사실을 알리고, 전학에 필요한 서류(재학증명서, 생활기록부 등)를 미리 준비합니다.</li>
    <li><strong>인터넷, TV, 정수기 등 이전 설치 신청:</strong> 이사 날짜에 맞춰 이전 설치가 가능하도록 최소 2주 전에는 해당 업체에 연락하여 예약합니다.</li>
  </ul>
</div>

<h2 style="font-size: 2rem; color: #1e40af; border-left: 5px solid #3b82f6; padding-left: 1rem; margin: 3rem 0 1.5rem 0; background: #eff6ff; padding: 1rem 1rem 1rem 2rem; border-radius: 0.5rem;">🗓️ D-14: 이사 1~2주 전</h2>

<div style="background: #f0f9ff; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #60a5fa;">
  <ul style="margin: 0; padding-left: 1.2rem; color: #1e3a8a; line-height: 1.8;">
    <li><strong>우편물 주소 이전 신고:</strong> 우체국에 방문하거나 인터넷우체국(www.epost.go.kr)에서 주소 이전 서비스를 신청하여 새로운 주소로 우편물을 받을 수 있도록 합니다.</li>
    <li><strong>각종 청구서 주소 변경:</strong> 은행, 카드사, 보험사, 통신사 등 금융기관과 각종 요금 청구서(전기, 가스, 수도 등)의 주소를 변경합니다.</li>
    <li><strong>도시가스 이전 신청:</strong> 관할 도시가스 회사(인천도시가스 1600-0002)에 연락하여 이사 날짜에 맞춰 가스레인지 분리 및 설치를 예약합니다.</li>
    <li><strong>엘리베이터 사용 예약:</strong> 이사 갈 아파트 관리사무소에 연락하여 이사 당일 엘리베이터 사용 가능 여부와 시간을 미리 예약합니다. (사다리차 이용 시에도 미리 고지)</li>
    <li><strong>냉장고 음식물 정리:</strong> 이사 당일 짐을 줄이기 위해 냉장고 안의 음식물을 미리 정리하거나 소진합니다.</li>
  </ul>
</div>

<h2 style="font-size: 2rem; color: #1e40af; border-left: 5px solid #3b82f6; padding-left: 1rem; margin: 3rem 0 1.5rem 0; background: #eff6ff; padding: 1rem 1rem 1rem 2rem; border-radius: 0.5rem;">🗓️ D-1: 이사 전날</h2>

<div style="background: #f0f9ff; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #60a5fa;">
  <ul style="margin: 0; padding-left: 1.2rem; color: #1e3a8a; line-height: 1.8;">
    <li><strong>공과금 및 관리비 정산:</strong> 이사 나가는 집의 전기, 수도, 가스 요금 및 아파트 관리비를 최종 정산합니다. (자동이체 해지 확인)</li>
    <li><strong>귀중품 및 중요 서류 별도 보관:</strong> 현금, 보석, 계약서, 신분증 등 중요한 물품은 따로 챙겨서 직접 운반하는 것이 안전합니다.</li>
    <li><strong>세탁기 물 빼기:</strong> 이사 중 누수를 방지하기 위해 세탁기 호스의 물을 완전히 제거합니다.</li>
    <li><strong>새집 쓰레기봉투 준비:</strong> 이사 후 바로 사용할 수 있도록 새로운 거주지의 쓰레기봉투를 미리 준비합니다. (송도 지역은 음식물 쓰레기 봉투도 별도)</li>
    <li><strong>최종 점검:</strong> 모든 창문과 문이 잠겼는지, 가스 밸브가 잠겼는지 등 마지막으로 확인합니다.</li>
  </ul>
</div>

<h2 style="font-size: 2rem; color: #1e40af; border-left: 5px solid #3b82f6; padding-left: 1rem; margin: 3rem 0 1.5rem 0; background: #eff6ff; padding: 1rem 1rem 1rem 2rem; border-radius: 0.5rem;">🚚 이사 당일 & 이사 후</h2>

<div style="background: #eef2ff; padding: 1.5rem; border-radius: 1rem; margin: 2rem 0; border: 2px solid #4f46e5;">
  <h3 style="color: #4338ca; margin: 0 0 1rem 0; font-size: 1.2rem;">🔑 가장 중요한 마무리 절차</h3>
  <ul style="margin: 0; padding-left: 1.2rem; color: #312e81;">
    <li style="margin-bottom: 0.5rem;"><strong>이사 직후:</strong> 이사 온 짐의 수량과 상태를 꼼꼼히 확인하고, 이사 비용 잔금을 정산합니다. 전기/수도/가스 계량기 수치를 확인하고 사진을 찍어둡니다.</li>
    <li style="margin-bottom: 0.5rem;"><strong>14일 이내:</strong> 새로운 거주지 관할 행정복지센터(송도1~5동 주민센터)에 방문하거나 '정부24' 웹사이트를 통해 <strong>전입신고</strong>를 해야 합니다.</li>
    <li style="margin-bottom: 0.5rem;"><strong>임대차 계약 시:</strong> 전입신고 시 계약서를 지참하여 <strong>확정일자</strong>를 받아야 보증금을 법적으로 보호받을 수 있습니다. (주민센터 또는 등기소)</li>
    <li><strong>자동차/이륜차 소유 시:</strong> 전입신고 후 14일 이내에 차량 등록사업소 또는 구청에서 주소 변경 등록 신고를 해야 합니다. (미신고 시 과태료 부과)</li>
    <li><strong>건강보험/국민연금 주소 변경:</strong> 자동으로 변경되기도 하지만, 혹시 모를 누락을 위해 직접 확인하는 것이 좋습니다.</li>
  </ul>
</div>

<p style="text-align: center; color: #6b7280; margin: 2rem 0;">성공적인 송도 입성을 응원합니다! 🎉</p>

<p style="text-align: center; color: #6b7280; margin: 2rem 0; font-size: 0.8rem;">
  <em>📢 정보 업데이트: 모든 정보는 2025년 7월 기준이며, 실제 이용 시 변경사항이 있을 수 있으니 방문 전 확인 바랍니다.</em>
</p>

</div>`,

  'songdo-newlywed-guide': `<div style="max-width: 100%; margin: 0 auto; line-height: 1.8; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">

<h1 style="font-size: 2.5rem; color: #ec4899; text-align: center; margin-bottom: 1rem; border-bottom: 3px solid #f472b6; padding-bottom: 1rem;">💕 송도 신혼부부 완벽 정착 가이드 (2025년 최신판)</h1>

<div style="text-align: center; background: linear-gradient(135deg, #ec4899 0%, #d946ef 100%); color: white; padding: 1.5rem; border-radius: 1rem; margin: 2rem 0; box-shadow: 0 8px 25px rgba(236, 72, 153, 0.3);">
  <h2 style="margin: 0; font-size: 1.5rem;">송도에서 시작하는 우리, 지원 혜택 다 챙기셨나요? 💑</h2>
  <p style="margin: 0.5rem 0 0 0; font-size: 1.1rem; opacity: 0.9;">최신 주거 지원부터 건강검진, 생활 꿀팁까지 신혼부부를 위한 모든 정보를 담았습니다.</p>
  <p style="margin: 0.5rem 0 0 0; font-size: 0.9rem; opacity: 0.8;">최종 업데이트: 2025년 7월</p>
</div>

<h2 style="font-size: 2rem; color: #a12599; border-left: 5px solid #e879f9; padding-left: 1rem; margin: 3rem 0 1.5rem 0; background: #fdf4ff; padding: 1rem 1rem 1rem 2rem; border-radius: 0.5rem;">🏠 주거 지원: '인천 천원주택'을 아시나요?</h2>

<div style="background: #fcf5ff; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #d946ef;">
  <h3 style="color: #a855f7; margin: 0 0 1rem 0;">1. 인천 천원주택 (2025년 500세대 공급 예정)</h3>
  <p style="margin: 0; color: #374151; line-height: 1.6;">
    <strong>혜택:</strong> 하루 1,000원 (월 3만원)의 저렴한 임대료로 최장 10년간 거주 가능한 공공임대주택<br>
    <strong>대상:</strong> 혼인 7년 이내 신혼부부, 예비 신혼부부, 신생아 출산 가구 (소득 및 자산 기준 충족 시)<br>
    <strong>신청 방법:</strong> 인천도시공사(iH) 홈페이지 공고 확인<br>
    <strong>⭐ Tip:</strong> 신생아 출산 가구에 최우선 순위가 부여되니, 출산 계획이 있다면 꼭 확인하세요. 2025년 공급 예정 물량을 놓치지 마세요!
  </p>
</div>

<div style="background: #fcf5ff; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #d946ef; margin-top: 1rem;">
  <h3 style="color: #a855f7; margin: 0 0 1rem 0;">2. 전세임대주택</h3>
  <p style="margin: 0; color: #374151; line-height: 1.6;">
    <strong>특징:</strong> 신혼부부가 원하는 주택(전용면적 85㎡ 이하)을 직접 고르면, 인천시가 집주인과 계약 후 저렴하게 재임대하는 방식<br>
    <strong>대상:</strong> 무주택 신혼부부 (소득 및 자산 기준 충족 시)<br>
    <strong>공급 예정:</strong> 2025년 8월부터 500가구 입주 시작 예정<br>
    <strong>⭐ Tip:</strong> 아파트뿐만 아니라 오피스텔, 빌라 등 원하는 형태의 주택을 선택할 수 있어 자유도가 높습니다. LH 또는 인천도시공사 공고를 주시하세요.
  </p>
</div>

<div style="background: #fcf5ff; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #d946ef; margin-top: 1rem;">
  <h3 style="color: #a855f7; margin: 0 0 1rem 0;">3. 주택 융자 및 대출이자 지원</h3>
  <p style="margin: 0; color: #374151; line-height: 1.6;">
    <strong>특징:</strong> 인천시 및 연수구에서 신혼부부를 위한 주택 구입/전세자금 융자 및 대출이자 지원 사업을 운영합니다.<br>
    <strong>⭐ Tip:</strong> 주택금융공사(HF)의 디딤돌대출, 보금자리론 등 국가 정책 대출과 연계하여 추가 혜택을 받을 수 있는지 확인해보세요.
  </p>
</div>

<h2 style="font-size: 2rem; color: #059669; border-left: 5px solid #10b981; padding-left: 1rem; margin: 3rem 0 1.5rem 0; background: #ecfdf5; padding: 1rem 1rem 1rem 2rem; border-radius: 0.5rem;">❤️ 건강 지원: 무료 웨딩 검진</h2>

<div style="background: #f0fdfa; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #14b8a6;">
  <h3 style="color: #0f766e; margin: 0 0 1rem 0;">연수구 보건소 '웨딩종합검진 A+'</h3>
  <p style="margin: 0; color: #374151; line-height: 1.6;">
    <strong>대상:</strong> 결혼 및 자녀 유무와 관계없이 임신을 계획 중인 20~49세 남녀 누구나 신청 가능<br>
    <strong>혜택:</strong> 기본적인 혈액 검사(빈혈, 간 기능, 신장 기능 등)는 물론, <strong>여성 난소기능 초음파(13만원 상당)</strong>와 <strong>남성 정액검사(5만원 상당)</strong> 비용 전액 무료 지원<br>
    <strong>추가 혜택:</strong> 검사 완료 부부에게 엽산제 제공<br>
    <strong>문의:</strong> 연수구 보건소 모자건강팀(☎032-749-8153~4, 8160) 또는 송도건강생활지원센터(☎032-749-6915)<br>
    <strong>⭐ Tip:</strong> 임신 전 건강 상태를 미리 확인하고 필요한 관리를 받을 수 있는 좋은 기회입니다. 무료이니 꼭 신청하세요!
  </p>
</div>

<h2 style="font-size: 2rem; color: #be185d; border-left: 5px solid #f472b6; padding-left: 1rem; margin: 3rem 0 1.5rem 0; background: #fdf2f8; padding: 1rem 1rem 1rem 2rem; border-radius: 0.5rem;">✨ 생활 및 편의</h2>

<div style="background: #fdf2f8; padding: 1.5rem; border-radius: 1rem; margin: 2rem 0; border: 2px solid #f9a8d4;">
  <h3 style="color: #be185d; margin: 0 0 1rem 0; font-size: 1.2rem;">신혼부부를 위한 생활 꿀팁</h3>
  <ul style="margin: 0; padding-left: 1.2rem; color: #831843;">
    <li style="margin-bottom: 0.5rem;"><strong>주거 환경:</strong> 송도는 계획도시로 깨끗하고 안전한 주거 환경을 자랑합니다. 최근 '호반써밋 송도' 오피스텔처럼 3룸 구조와 피트니스센터, 도서관 등 다양한 커뮤니티 시설을 갖춘 신축 주거 공간이 신혼부부에게 인기가 많습니다.</li>
    <li style="margin-bottom: 0.5rem;"><strong>편리한 인프라:</strong> 현대프리미엄아울렛, 트리플스트리트, 코스트코 등 대형 쇼핑몰이 인접해 있어 쇼핑과 여가 생활을 즐기기 편리합니다. 또한, 인천공항과의 접근성이 좋아 신혼여행을 떠나기에도 용이합니다.</li>
    <li style="margin-bottom: 0.5rem;"><strong>교육 프로그램:</strong> 연수구 가족센터에서는 예비부부 및 신혼부부를 대상으로 '우리 둘 결혼문답'과 같은 무료 교육 프로그램을 운영하여 행복한 결혼 생활을 지원합니다. 부부 관계 증진, 재정 관리 등 다양한 주제를 다룹니다.</li>
    <li><strong>교통:</strong> 인천 지하철 1호선, 다양한 버스 노선이 잘 갖춰져 있으며, 2025년 하반기 GTX-B 노선 개통 예정으로 서울 접근성이 더욱 향상될 예정입니다.</li>
  </ul>
</div>

<p style="text-align: center; color: #6b7280; margin: 2rem 0;">송도에서의 행복한 시작을 응원합니다! 🎉</p>

<p style="text-align: center; color: #6b7280; margin: 2rem 0; font-size: 0.8rem;">
  <em>📢 정보 업데이트: 모든 정보는 2025년 7월 기준이며, 지원 정책 등은 변경될 수 있으니 신청 전 반드시 공식 홈페이지를 확인 바랍니다.</em>
</p>

</div>`,

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