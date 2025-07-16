

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
  'songdo-childcare-guide': `<div style="max-width: 100%; margin: 0 auto; line-height: 1.8; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">

<h1 style="font-size: 2.5rem; color: #f59e0b; text-align: center; margin-bottom: 1rem; border-bottom: 3px solid #fbbf24; padding-bottom: 1rem;">👶 송도 육아 완벽 가이드</h1>

<div style="text-align: center; background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); color: white; padding: 1.5rem; border-radius: 1rem; margin: 2rem 0; box-shadow: 0 8px 25px rgba(249, 115, 22, 0.3);">
  <h2 style="margin: 0; font-size: 1.5rem;">아이와 함께 살기 좋은 송도국제도시 👶</h2>
  <p style="margin: 0.5rem 0 0 0; font-size: 1.1rem; opacity: 0.9;">어린이집, 유치원, 놀이시설부터 의료진까지, 송도에서 아이 키우기에 필요한 모든 정보를 완벽 정리했습니다.</p>
  <p style="margin: 0.5rem 0 0 0; font-size: 0.9rem; opacity: 0.8;">최종 업데이트: 2025년 7월</p>
  <p style="margin: 0.5rem 0 0 0; font-size: 0.9rem; opacity: 0.8;">⚠️ 2025년 국공립 어린이집 50% 이용률 목표에 따른 지속적 확충 예정</p>
</div>

<h2 style="font-size: 2rem; color: #c2410c; border-left: 5px solid #f97316; padding-left: 1rem; margin: 3rem 0 1.5rem 0; background: #fff7ed; padding: 1rem 1rem 1rem 2rem; border-radius: 0.5rem;">🏫 송도 어린이집 & 유치원 정보</h2>

<div style="display: grid; gap: 1.5rem;">
  <div style="background: #fffbeb; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #f59e0b;">
    <h3 style="color: #d97706; margin: 0 0 1rem 0;">🏛️ 공립 유치원</h3>
    <div style="margin: 1rem 0;">
      <h4 style="color: #d97706; margin: 0.5rem 0;">인천송도꿈유치원</h4>
      <p style="margin: 0; color: #374151; line-height: 1.6;">
        <strong>개원:</strong> 2021년<br>
        <strong>정원:</strong> 306명<br>
        <strong>특징:</strong> 송도 지역 최신 공립 유치원<br>
        <strong>장점:</strong> 합리적인 비용, 체계적인 교육 프로그램
      </p>
    </div>
  </div>
  
  <div style="background: #fffbeb; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #f59e0b;">
    <h3 style="color: #d97706; margin: 0 0 1rem 0;">🏢 사립 유치원</h3>
    <div style="margin: 1rem 0;">
      <h4 style="color: #d97706; margin: 0.5rem 0;">글로벌레인보우유치원</h4>
      <p style="margin: 0; color: #374151; line-height: 1.6;">
        <strong>개원:</strong> 2015년 | <strong>정원:</strong> 600명<br>
        <strong>특징:</strong> 대규모 사립 유치원, 다양한 프로그램 운영
      </p>
    </div>
    <div style="margin: 1rem 0;">
      <h4 style="color: #d97706; margin: 0.5rem 0;">송도국제유치원</h4>
      <p style="margin: 0; color: #374151; line-height: 1.6;">
        <strong>개원:</strong> 2015년 | <strong>정원:</strong> 510명<br>
        <strong>특징:</strong> 국제 교육 프로그램, 영어 중심 교육
      </p>
    </div>
    <div style="margin: 1rem 0;">
      <h4 style="color: #d97706; margin: 0.5rem 0;">유엔유치원</h4>
      <p style="margin: 0; color: #374151; line-height: 1.6;">
        <strong>개원:</strong> 2019년 | <strong>정원:</strong> 370명<br>
        <strong>특징:</strong> 국제기구 명칭 활용, 글로벌 교육
      </p>
    </div>
  </div>
  
  <div style="background: #fffbeb; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #f59e0b;">
    <h3 style="color: #d97706; margin: 0 0 1rem 0;">🏘️ 국공립 어린이집</h3>
    <div style="margin: 1rem 0;">
      <h4 style="color: #d97706; margin: 0.5rem 0;">최신 개원 시설 (2020년 이후)</h4>
      <p style="margin: 0; color: #374151; line-height: 1.6;">
        <strong>국공립송도도랜드마크시티어린이집:</strong> 2020년 12월 개원, 정원 85명<br>
        <strong>국공립송도에듀포레푸르지오어린이집:</strong> 단지 내 위치, 접근성 우수<br>
        <strong>국공립송도센트럴시티어린이집:</strong> 센트럴파크 인근 위치
      </p>
    </div>
    <div style="margin: 1rem 0;">
      <h4 style="color: #d97706; margin: 0.5rem 0;">기존 주요 시설</h4>
      <p style="margin: 0; color: #374151; line-height: 1.6;">
        <strong>기타 시설:</strong> 구립그린워크1·2차어린이집, 구립송도국제어린이집, 국공립그린스퀘어어린이집, 국공립글로벌키즈어린이집, 국공립글로벌파크어린이집, 국공립더테라스어린이집, 국공립레이크1·2·3차어린이집<br>
        <strong>공통 특징:</strong> 아파트 단지 내 위치, 접근성 우수, 안정적인 운영, 합리적인 비용
      </p>
    </div>
    <div style="margin: 1rem 0; padding: 1rem; background: #fef3c7; border-radius: 0.5rem; border-left: 3px solid #f59e0b;">
      <h4 style="color: #d97706; margin: 0 0 0.5rem 0;">📈 2025년 확충 계획</h4>
      <p style="margin: 0; color: #374151; font-size: 0.95rem;">
        • 전국적으로 연간 550개 이상 국공립어린이집 신규 개원 예정<br>
        • 2025년 국공립 보육 이용률 50% 달성 목표<br>
        • 송도 지역 추가 확충 계획은 연수구청 문의 필요
      </p>
    </div>
  </div>
</div>

<h2 style="font-size: 2rem; color: #c2410c; border-left: 5px solid #f97316; padding-left: 1rem; margin: 3rem 0 1.5rem 0; background: #fff7ed; padding: 1rem 1rem 1rem 2rem; border-radius: 0.5rem;">🎠 송도 놀이시설 & 키즈카페</h2>

<div style="display: grid; gap: 1.5rem;">
  <div style="background: #f0fdf4; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #22c55e;">
    <h3 style="color: #16a34a; margin: 0 0 1rem 0;">🏢 연수구 공공시설</h3>
    <div style="margin: 1rem 0;">
      <h4 style="color: #16a34a; margin: 0.5rem 0;">연수 꿈빛나래 키즈카페</h4>
      <p style="margin: 0; color: #374151; line-height: 1.6;">
        <strong>위치:</strong> 연수구 센트럴로 418 (송도5동 행정복지센터 2층)<br>
        <strong>대상:</strong> 3세 이상 12세 이하 (2013년~2022년생)<br>
        <strong>운영:</strong> 화~일요일, 일 3회 (회당 2시간)<br>
        <strong>예약:</strong> 매주 수요일 10시 네이버플레이스 예약<br>
        <strong>특징:</strong> 2024년 7월 개관, 공공시설로 합리적 이용료
      </p>
    </div>
  </div>
  
  <div style="background: #fdf2f8; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #ec4899;">
    <h3 style="color: #be185d; margin: 0 0 1rem 0;">🎮 민간 키즈카페</h3>
    <div style="margin: 1rem 0;">
      <h4 style="color: #be185d; margin: 0.5rem 0;">아이사랑꿈터</h4>
      <p style="margin: 0; color: #374151; line-height: 1.6;">
        <strong>위치:</strong> 송도문화로28번길 28 글로벌캠퍼스푸르지오 주민공동시설 1층<br>
        <strong>이용료:</strong> 2시간 1,000원<br>
        <strong>특징:</strong> 초저가 이용료, 주민 시설
      </p>
    </div>
    <div style="margin: 1rem 0;">
      <h4 style="color: #be185d; margin: 0.5rem 0;">우리끼리 키즈카페</h4>
      <p style="margin: 0; color: #374151; line-height: 1.6;">
        <strong>특징:</strong> 무인 단독대관 시스템<br>
        <strong>장점:</strong> 프라이빗한 공간, 가족 단위 이용 적합
      </p>
    </div>
    <div style="margin: 1rem 0;">
      <h4 style="color: #be185d; margin: 0.5rem 0;">키즈스케이프 송도점</h4>
      <p style="margin: 0; color: #374151; line-height: 1.6;">
        <strong>특징:</strong> 대형 키즈카페 체인점<br>
        <strong>시설:</strong> 다양한 놀이기구, 체험 시설
      </p>
    </div>
    <div style="margin: 1rem 0;">
      <h4 style="color: #be185d; margin: 0.5rem 0;">송도 상상체험 키즈월드</h4>
      <p style="margin: 0; color: #374151; line-height: 1.6;">
        <strong>특징:</strong> 테마형 키즈카페<br>
        <strong>시설:</strong> 실내썰매, 짚라인, 서바이벌 체험 가능
      </p>
    </div>
  </div>
  
  <div style="background: #fefce8; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #eab308;">
    <h3 style="color: #a16207; margin: 0 0 1rem 0;">🏠 아파트 단지 내 실내놀이터</h3>
    <p style="margin: 0; color: #374151; line-height: 1.6;">
      <strong>송도 더샵 퍼스트파크:</strong> 키즈룸 및 실내놀이터 운영<br>
      <strong>송도 더샵 마스터뷰:</strong> 주민 전용 키즈룸<br>
      <strong>송도 글로벌파크베르디움:</strong> 실내놀이터 완비<br>
      <strong>힐스테이트레이크송도:</strong> 키즈룸 및 놀이시설<br>
      <strong>특징:</strong> 거주민 전용, 안전한 환경, 무료 이용
    </p>
  </div>
</div>

<h2 style="font-size: 2rem; color: #c2410c; border-left: 5px solid #f97316; padding-left: 1rem; margin: 3rem 0 1.5rem 0; background: #fff7ed; padding: 1rem 1rem 1rem 2rem; border-radius: 0.5rem;">🏥 송도 의료진 & 응급실 정보</h2>

<div style="display: grid; gap: 1.5rem;">
  <div style="background: #fef2f2; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #ef4444;">
    <h3 style="color: #dc2626; margin: 0 0 1rem 0;">🚨 응급의료 현황</h3>
    <div style="padding: 1rem; background: #fee2e2; border-radius: 0.5rem; margin: 1rem 0;">
      <h4 style="color: #dc2626; margin: 0 0 0.5rem 0;">⚠️ 중요 안내</h4>
      <p style="margin: 0; color: #374151; line-height: 1.6;">
        <strong>현재 상황:</strong> 송도 지역 내 대형 종합병원 부족<br>
        <strong>응급실 이용:</strong> 동춘동 나사렛국제병원, 남동구 가천대 길병원, 중구 인하대학교병원 이용 필요<br>
        <strong>교통편:</strong> 응급상황 시 택시 또는 119 구급차 이용
      </p>
    </div>
  </div>
  
  <div style="background: #fffbeb; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #f59e0b;">
    <h3 style="color: #d97706; margin: 0 0 1rem 0;">🏥 주요 의료기관</h3>
    <div style="margin: 1rem 0;">
      <h4 style="color: #d97706; margin: 0.5rem 0;">나사렛국제병원</h4>
      <p style="margin: 0; color: #374151; line-height: 1.6;">
        <strong>위치:</strong> 인천 연수구 동춘동<br>
        <strong>특징:</strong> 종합병원, 응급실 운영<br>
        <strong>비전:</strong> 전문성을 갖춘 의료진, 만족스러운 치료 제공
      </p>
    </div>
    <div style="margin: 1rem 0;">
      <h4 style="color: #d97706; margin: 0.5rem 0;">VIC365소아청소년과의원</h4>
      <p style="margin: 0; color: #374151; line-height: 1.6;">
        <strong>특징:</strong> 송도 지역 전문 소아과<br>
        <strong>시설:</strong> 깔끔한 입원시설 완비<br>
        <strong>서비스:</strong> 송도 어린이 전문 의료 서비스
      </p>
    </div>
  </div>
  
  <div style="background: #f0f9ff; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #3b82f6;">
    <h3 style="color: #1d4ed8; margin: 0 0 1rem 0;">🏗️ 미래 의료 계획</h3>
    <div style="margin: 1rem 0;">
      <h4 style="color: #1d4ed8; margin: 0.5rem 0;">송도세브란스병원 (계획)</h4>
      <p style="margin: 0; color: #374151; line-height: 1.6;">
        <strong>규모:</strong> 1,000병상 규모<br>
        <strong>위치:</strong> 송도 국제캠퍼스 북동쪽 7공구<br>
        <strong>현재 상황:</strong> 부지 확보 완료, 건립 일정 미정<br>
        <strong>기대 효과:</strong> 송도 지역 의료 접근성 대폭 개선 예상
      </p>
    </div>
  </div>
</div>

<h2 style="font-size: 2rem; color: #c2410c; border-left: 5px solid #f97316; padding-left: 1rem; margin: 3rem 0 1.5rem 0; background: #fff7ed; padding: 1rem 1rem 1rem 2rem; border-radius: 0.5rem;">🏞️ 아이와 함께 가볼 만한 곳</h2>

<div style="display: grid; gap: 1.5rem;">
  <div style="background: #f0fdf4; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #22c55e;">
    <h3 style="color: #16a34a; margin: 0 0 1rem 0;">🌊 송도 센트럴파크</h3>
    <p style="margin: 0; color: #374151; line-height: 1.6;">
      <strong>위치:</strong> 인천 연수구 컨벤시아대로 160<br>
      <strong>교통:</strong> 센트럴파크역 도보 5분<br>
      <strong>특징:</strong> 국내 최초 해수공원, 넓은 산책로와 자전거길<br>
      <strong>아이 추천:</strong> 사슴농장 & 토끼섬 견학, 해수 운하 체험<br>
      <strong>시설:</strong> 카약, 드래곤보트, 수상택시 (09:00-18:00)<br>
      <strong>주변 시설:</strong> 호텔, 대형마트, 상가 다수
    </p>
    <h4 style="color: #16a34a; margin: 1rem 0 0.5rem 0;">🦌 특별한 체험</h4>
    <ul style="margin: 0; padding-left: 1.5rem; color: #374151;">
      <li><strong>사슴농장:</strong> 한옥마을 옆 경원재 맞은편, 꽃사슴정원</li>
      <li><strong>토끼섬:</strong> 호수 내 인공섬, 토끼 관찰 가능</li>
      <li><strong>G타워 전망대:</strong> 32층 전망 라운지 (무료)</li>
    </ul>
  </div>
  
  <div style="background: #fdf2f8; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #ec4899;">
    <h3 style="color: #be185d; margin: 0 0 1rem 0;">🎪 달빛축제공원</h3>
    <p style="margin: 0; color: #374151; line-height: 1.6;">
      <strong>면적:</strong> 170,543㎡<br>
      <strong>교통:</strong> 송도달빛축제공원역 도보 11분<br>
      <strong>특징:</strong> 펜타포트 락 페스티벌, 송도 맥주축제 개최지<br>
      <strong>시설:</strong> 야외공연장, 실내 체육시설 (농구장, 테니스장, 탁구장)<br>
      <strong>아이 추천:</strong> 넓은 잔디광장에서 뛰어놀기, 야외무대 구경
    </p>
  </div>
  
  <div style="background: #fefce8; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #eab308;">
    <h3 style="color: #a16207; margin: 0 0 1rem 0;">🌙 달빛공원</h3>
    <p style="margin: 0; color: #374151; line-height: 1.6;">
      <strong>위치:</strong> 인천 연수구 송도동 14번지, 송도동 1번지 일원<br>
      <strong>특징:</strong> 자연 생태공원, 금빛갈대 습지<br>
      <strong>아이 추천:</strong> 새들의 군무 관찰, 곤충 소리 체험, 시원한 강 바람<br>
      <strong>시설:</strong> 야외무대, 산책로, 계절별 다채로운 풍경<br>
      <strong>교육적 가치:</strong> 자연 생태 학습, 환경 교육 체험
    </p>
  </div>
</div>

<h2 style="font-size: 2rem; color: #c2410c; border-left: 5px solid #f97316; padding-left: 1rem; margin: 3rem 0 1.5rem 0; background: #fff7ed; padding: 1rem 1rem 1rem 2rem; border-radius: 0.5rem;">💡 송도 육아 꿀팁</h2>

<div style="display: grid; gap: 1.5rem;">
  <div style="background: #f0f9ff; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #3b82f6;">
    <h3 style="color: #1d4ed8; margin: 0 0 1rem 0;">🎯 어린이집 & 유치원 선택 가이드</h3>
    <ul style="margin: 0; padding-left: 1.5rem; color: #374151;">
      <li><strong>공립 vs 사립:</strong> 공립은 비용 절약, 사립은 특화 프로그램</li>
      <li><strong>접근성:</strong> 지하철역 근처 또는 아파트 단지 내 위치 고려</li>
      <li><strong>정원:</strong> 대규모(500명 이상) vs 소규모(300명 이하) 장단점 비교</li>
      <li><strong>개원 연도:</strong> 최신 시설일수록 안전성과 편의성 우수</li>
    </ul>
  </div>
  
  <div style="background: #fefce8; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #eab308;">
    <h3 style="color: #a16207; margin: 0 0 1rem 0;">🏥 2025년 송도 의료시설 현황</h3>
    <div style="margin: 1rem 0; padding: 1rem; background: #fef3c7; border-radius: 0.5rem; border-left: 3px solid #f59e0b;">
      <h4 style="color: #d97706; margin: 0 0 0.5rem 0;">⚠️ 대형병원 개원 지연 소식</h4>
      <p style="margin: 0; color: #374151; font-size: 0.95rem;">
        <strong>송도세브란스병원:</strong> 2026년 개원 예정이었으나 지연 가능성<br>
        <strong>규모:</strong> 800병상 (1,000병상 확장 가능)<br>
        <strong>차병원 글로벌 전문병원:</strong> 2030년 개원 목표 (항노화, 난임치료 특화)
      </p>
    </div>
    <ul style="margin: 0; padding-left: 1.5rem; color: #374151;">
      <li><strong>현재 상황:</strong> 송도 내 대형 종합병원 부재, 1차 의료기관 120여 개소</li>
      <li><strong>응급실 경로:</strong> 나사렛국제병원, 인천세종병원 등 인천 본토 이용</li>
      <li><strong>소아과 추천:</strong> 곽생로여성의원(소아과 진료 가능), VIC365소아청소년과</li>
      <li><strong>119 신고:</strong> 응급상황 시 주저하지 말고 구급차 요청</li>
    </ul>
  </div>
  
  <div style="background: #f0fdf4; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #22c55e;">
    <h3 style="color: #16a34a; margin: 0 0 1rem 0;">🎠 놀이시설 이용 팁</h3>
    <ul style="margin: 0; padding-left: 1.5rem; color: #374151;">
      <li><strong>예약 필수:</strong> 연수 꿈빛나래 키즈카페는 매주 수요일 10시 예약</li>
      <li><strong>비용 절약:</strong> 공공시설 우선 이용, 아파트 단지 내 시설 활용</li>
      <li><strong>날씨 대비:</strong> 실내 놀이터와 야외 공원 조합 계획</li>
      <li><strong>시간대 고려:</strong> 평일 오전 또는 오후 늦은 시간 이용 추천</li>
    </ul>
  </div>
</div>

<div style="text-align: center; background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); color: white; padding: 2rem; border-radius: 1rem; margin: 3rem 0;">
  <h2 style="margin: 0 0 1rem 0; font-size: 1.5rem;">🏡 송도, 아이와 함께 살기 좋은 도시</h2>
  <p style="margin: 0; font-size: 1.1rem; opacity: 0.9;">체계적인 교육 시설, 다양한 놀이공간, 그리고 쾌적한 환경까지. 송도국제도시는 아이들이 건강하고 행복하게 성장할 수 있는 최적의 육아 도시입니다.</p>
</div>

</div>`,
  'songdo-spring-guide': `<div style="max-width: 100%; margin: 0 auto; line-height: 1.8; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">

<h1 style="font-size: 2.5rem; color: #f59e0b; text-align: center; margin-bottom: 1rem; border-bottom: 3px solid #fbbf24; padding-bottom: 1rem;">🌸 송도 봄 완벽 가이드</h1>

<div style="text-align: center; background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); color: white; padding: 1.5rem; border-radius: 1rem; margin: 2rem 0; box-shadow: 0 8px 25px rgba(249, 115, 22, 0.3);">
  <h2 style="margin: 0; font-size: 1.5rem;">송도국제도시의 봄을 완벽하게 즐기는 방법 🌸</h2>
  <p style="margin: 0.5rem 0 0 0; font-size: 1.1rem; opacity: 0.9;">화사한 벚꽃과 따뜻한 바다바람이 어우러진 최고의 계절입니다. 3월부터 5월까지 송도만의 특별한 봄을 만끽할 수 있는 완벽한 가이드를 준비했습니다.</p>
  <p style="margin: 0.5rem 0 0 0; font-size: 0.9rem; opacity: 0.8;">최종 업데이트: 2025년 7월</p>
</div>

<h2 style="font-size: 2rem; color: #c2410c; border-left: 5px solid #f97316; padding-left: 1rem; margin: 3rem 0 1.5rem 0; background: #fff7ed; padding: 1rem 1rem 1rem 2rem; border-radius: 0.5rem;">🌸 2025년 송도 벚꽃 개화 정보</h2>

<div style="background: #fef3c7; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #f59e0b; margin: 2rem 0;">
  <h3 style="color: #d97706; margin: 0 0 1rem 0;">🌸 2025년 개화 예상 시기</h3>
  <p style="margin: 0; color: #374151; line-height: 1.6;">
    <strong>인천 지역 개화 시작:</strong> 4월 4일 (예상)<br>
    <strong>만개 시기:</strong> 4월 10일 ~ 4월 15일<br>
    <strong>최적 관람 기간:</strong> 4월 둘째 주 ~ 셋째 주<br>
    <strong>특이사항:</strong> 기후변화로 인해 평년보다 2-3일 빠른 개화 예상
  </p>
  <div style="background: #fbbf24; color: white; padding: 1rem; border-radius: 0.5rem; margin: 1rem 0;">
    <p style="margin: 0; font-weight: bold;">💡 꿀팁: 주말보다는 평일에 방문하면 더 여유롭게 벚꽃을 즐길 수 있습니다!</p>
  </div>
</div>

<h2 style="font-size: 2rem; color: #c2410c; border-left: 5px solid #f97316; padding-left: 1rem; margin: 3rem 0 1.5rem 0; background: #fff7ed; padding: 1rem 1rem 1rem 2rem; border-radius: 0.5rem;">🏞️ 송도 벚꽃 명소 BEST 3</h2>

<div style="display: grid; gap: 1.5rem;">
  <div style="background: #fffbeb; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #f59e0b;">
    <h3 style="color: #d97706; margin: 0 0 1rem 0;">🥇 송도 센트럴파크</h3>
    <p style="margin: 0; color: #374151; line-height: 1.6;">
      <strong>특징:</strong> 국내 최초 해수공원, 뉴욕 센트럴파크를 모티브로 조성<br>
      <strong>벚꽃 포인트:</strong> 한옥마을 일대, 호수 건너편 작은 동물원 일대<br>
      <strong>추천 활동:</strong> 벚꽃 터널 산책, 인공수로변 피크닉, 인생샷 촬영<br>
      <strong>접근성:</strong> 지하철 1호선 센트럴파크역 도보 5분<br>
      <strong>주차:</strong> 센트럴파크 지하주차장 (유료)
    </p>
    <h4 style="color: #d97706; margin: 1rem 0 0.5rem 0;">🚤 센트럴파크 수상레저 (봄 시즌)</h4>
    <ul style="margin: 0; padding-left: 1.5rem; color: #374151;">
      <li><strong>수상택시:</strong> 38인승 미추홀 3호, 3인 가족 기준 1만원, 평일 매시 정각 출발</li>
      <li><strong>카약:</strong> 3명 50분 25,000원, 투명카약 3명 40분 25,000원</li>
      <li><strong>운영시간:</strong> 10:00-19:00 (평일), 10:00-21:00 (주말)</li>
      <li><strong>휴무:</strong> 매주 월요일</li>
    </ul>
    <h4 style="color: #d97706; margin: 1rem 0 0.5rem 0;">📸 인스타 포토존</h4>
    <ul style="margin: 0; padding-left: 1.5rem; color: #374151;">
      <li><strong>한옥마을:</strong> 전통 한옥과 벚꽃의 조화</li>
      <li><strong>워터프런트:</strong> 물과 벚꽃이 만나는 로맨틱한 장면</li>
      <li><strong>테크노파크:</strong> 현대적 건축물과 봄꽃의 대비</li>
    </ul>
  </div>
  
  <div style="background: #fffbeb; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #f59e0b;">
    <h3 style="color: #d97706; margin: 0 0 1rem 0;">🥈 달빛축제공원</h3>
    <p style="margin: 0; color: #374151; line-height: 1.6;">
      <strong>특징:</strong> 송도 대표 축제 개최지, 총면적 170,543㎡<br>
      <strong>벚꽃 명소:</strong> 공원 둘레길, 중앙 광장 주변<br>
      <strong>추천 시간:</strong> 오후 5-6시 (골든아워), 야간 조명 시간<br>
      <strong>교통:</strong> 송도달빛축제공원역 도보 11분<br>
      <strong>특별함:</strong> 펜타포트 락 페스티벌, 송도맥주축제 개최지
    </p>
    <h4 style="color: #d97706; margin: 1rem 0 0.5rem 0;">🎪 2025년 봄 축제 일정</h4>
    <ul style="margin: 0; padding-left: 1.5rem; color: #374151;">
      <li><strong>송도 맥주축제:</strong> 15회 개최 예정 (정확한 일정은 공식 발표 대기)</li>
      <li><strong>펜타포트 락 페스티벌:</strong> 5월 22일 예정</li>
      <li><strong>예상 방문객:</strong> 축제 시 10만 명 이상 추가 방문</li>
    </ul>
  </div>
  
  <div style="background: #fffbeb; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #f59e0b;">
    <h3 style="color: #d97706; margin: 0 0 1rem 0;">🥉 해돋이공원 (2025년 업데이트)</h3>
    <p style="margin: 0; color: #374151; line-height: 1.6;">
      <strong>특징:</strong> 송도 근대화를 상징하는 테마공원 (총면적 210,468㎡)<br>
      <strong>벚꽃 명소:</strong> 산책로 일대, 전망대 주변<br>
      <strong>추천 활동:</strong> 일출 감상 + 벚꽃 구경 조합<br>
      <strong>특별함:</strong> 송도 전경을 한눈에 조망<br>
      <strong>주요시설:</strong> 송도동산, 인공연못, 음악분수, 바닥분수, 포토존, 야외무대, 산책로<br>
      <strong>새로운 시설:</strong> 백만송이 장미원 (2022년 완공)
    </p>
  </div>
  
  <div style="background: #f0fdf4; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #22c55e;">
    <h3 style="color: #16a34a; margin: 0 0 1rem 0;">🌙 달빛공원 (자연 생태공원)</h3>
    <p style="margin: 0; color: #374151; line-height: 1.6;">
      <strong>특징:</strong> 금빛갈대 습지를 품은 자연 생태공원<br>
      <strong>위치:</strong> 인천 연수구 송도동 14번지, 송도동 1번지 일원<br>
      <strong>추천 활동:</strong> 새들의 군무 관찰, 곤충 소리 체험, 생태학습<br>
      <strong>시설:</strong> 야외무대, 산책로, 4계절 다채로운 풍경<br>
      <strong>특별함:</strong> 시원한 강 바람과 풀내음을 느낄 수 있는 힐링 공간
    </p>
  </div>
</div>

<h2 style="font-size: 2rem; color: #c2410c; border-left: 5px solid #f97316; padding-left: 1rem; margin: 3rem 0 1.5rem 0; background: #fff7ed; padding: 1rem 1rem 1rem 2rem; border-radius: 0.5rem;">🎯 월별 봄 활동 가이드</h2>

<div style="display: grid; gap: 1.5rem;">
  <div style="background: #f0fdf4; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #22c55e;">
    <h3 style="color: #16a34a; margin: 0 0 1rem 0;">🌱 3월 - 봄의 전령</h3>
    <h4 style="color: #16a34a; margin: 1rem 0 0.5rem 0;">추천 활동</h4>
    <ul style="margin: 0; padding-left: 1.5rem; color: #374151;">
      <li><strong>센트럴파크 산책:</strong> 이른 봄꽃과 따뜻한 햇살</li>
      <li><strong>G타워 전망대:</strong> 29층에서 송도 전경 감상 (무료)</li>
      <li><strong>트라이볼 문화활동:</strong> 실내 전시 및 공연 관람</li>
    </ul>
    <h4 style="color: #16a34a; margin: 1rem 0 0.5rem 0;">날씨 & 복장</h4>
    <ul style="margin: 0; padding-left: 1.5rem; color: #374151;">
      <li><strong>평균 기온:</strong> 5-15°C</li>
      <li><strong>추천 복장:</strong> 가디건, 얇은 자켓, 스카프</li>
      <li><strong>주의사항:</strong> 일교차 크므로 레이어링 필수</li>
    </ul>
  </div>
  
  <div style="background: #fdf2f8; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #ec4899;">
    <h3 style="color: #be185d; margin: 0 0 1rem 0;">🌸 4월 - 벚꽃 절정</h3>
    <h4 style="color: #be185d; margin: 1rem 0 0.5rem 0;">추천 활동</h4>
    <ul style="margin: 0; padding-left: 1.5rem; color: #374151;">
      <li><strong>벚꽃 페스티벌:</strong> 송도 센트럴파크 벚꽃 구경</li>
      <li><strong>수상택시:</strong> 물 위에서 보는 벚꽃 풍경 (성인 4,000원)</li>
      <li><strong>피크닉:</strong> 달빛축제공원 잔디광장에서 꽃놀이</li>
    </ul>
    <h4 style="color: #be185d; margin: 1rem 0 0.5rem 0;">벚꽃 개화 정보 (2025년 업데이트)</h4>
    <ul style="margin: 0; padding-left: 1.5rem; color: #374151;">
      <li><strong>개화 시기:</strong> 4월 3일경 (평년보다 2-3일 빨라짐)</li>
      <li><strong>만개 시기:</strong> 4월 10일경 (4월 둘째 주 절정)</li>
      <li><strong>절정 포인트:</strong> 센트럴파크 한옥마을, 워터프런트</li>
      <li><strong>특징:</strong> 기후 변화로 인해 2025년 벚꽃은 전국적으로 평년보다 2-3일 빠른 개화 예상</li>
    </ul>
  </div>
  
  <div style="background: #ecfdf5; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #10b981;">
    <h3 style="color: #059669; margin: 0 0 1rem 0;">🌿 5월 - 신록의 계절</h3>
    <h4 style="color: #059669; margin: 1rem 0 0.5rem 0;">추천 활동</h4>
    <ul style="margin: 0; padding-left: 1.5rem; color: #374151;">
      <li><strong>카누 & 카약:</strong> 센트럴파크 수상레저 본격 시즌</li>
      <li><strong>자전거 투어:</strong> 송도미래길 따라 봄바람 만끽</li>
      <li><strong>야외 운동:</strong> 각종 공원에서 조깅, 요가, 산책</li>
    </ul>
    <h4 style="color: #059669; margin: 1rem 0 0.5rem 0;">가정의 달 특별 활동</h4>
    <ul style="margin: 0; padding-left: 1.5rem; color: #374151;">
      <li><strong>가족 피크닉:</strong> 달빛공원, 해돋이공원 추천</li>
      <li><strong>어린이날 행사:</strong> 센트럴파크 각종 체험활동</li>
      <li><strong>어버이날 나들이:</strong> G타워 전망대에서 가족사진</li>
    </ul>
  </div>
</div>

<h2 style="font-size: 2rem; color: #c2410c; border-left: 5px solid #f97316; padding-left: 1rem; margin: 3rem 0 1.5rem 0; background: #fff7ed; padding: 1rem 1rem 1rem 2rem; border-radius: 0.5rem;">🚤 봄철 수상활동 완벽 가이드</h2>

<div style="display: grid; gap: 1.5rem;">
  <div style="background: #e0f2fe; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #0284c7;">
    <h3 style="color: #0369a1; margin: 0 0 1rem 0;">수상택시 (2025년 업데이트)</h3>
    <ul style="margin: 0; padding-left: 1.5rem; color: #374151;">
      <li><strong>운행시간:</strong> 평일 10:00-19:00 (매시 정각), 주말 10:00-21:00</li>
      <li><strong>요금:</strong> 성인 4,000원, 소인 2,000원</li>
      <li><strong>코스:</strong> 센트럴파크 순환 (약 15분)</li>
      <li><strong>추천 시간:</strong> 오후 4-6시 (벚꽃 + 석양 조합)</li>
      <li><strong>이용장소:</strong> 웨스트 보트하우스에서 탑승</li>
    </ul>
  </div>
  
  <div style="background: #e0f2fe; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #0284c7;">
    <h3 style="color: #0369a1; margin: 0 0 1rem 0;">카누 & 카약 체험 (2025년 업데이트)</h3>
    <ul style="margin: 0; padding-left: 1.5rem; color: #374151;">
      <li><strong>장소:</strong> 이스트 보트하우스 (센트럴파크 내)</li>
      <li><strong>운영시간:</strong> 10:00-19:00 (매주 월요일 휴무)</li>
      <li><strong>문의:</strong> 070-4189-4609</li>
      <li><strong>추천:</strong> 4-5월 날씨가 따뜻해지면서 본격 시즌</li>
    </ul>
    <h4 style="color: #0369a1; margin: 1rem 0 0.5rem 0;">체험 종류 및 요금</h4>
    <ul style="margin: 0; padding-left: 1.5rem; color: #374151;">
      <li>카누: 3명, 50분, 25,000원</li>
      <li>카약: 3명, 50분, 25,000원</li>
      <li>투명카약: 3명, 40분, 25,000원</li>
      <li>패밀리보트: 5명, 30분, 35,000원</li>
      <li>파티보트: 6명, 40분, 40,000원</li>
    </ul>
  </div>
</div>

<div style="background: #fef3c7; padding: 1.5rem; border-radius: 1rem; border: 2px solid #f59e0b; margin: 2rem 0;">
  <h3 style="color: #92400e; margin: 0 0 1rem 0;">💡 봄철 방문 꿀팁</h3>
  <ul style="margin: 0; padding-left: 1.5rem; color: #92400e; line-height: 1.6;">
    <li><strong>벚꽃 최적 시간:</strong> 오전 10-11시, 오후 4-6시</li>
    <li><strong>주차 정보:</strong> 센트럴파크 공영주차장 30분당 1,000원 (24시간 개방)</li>
    <li><strong>대중교통:</strong> 지하철 1호선 센트럴파크역 이용</li>
    <li><strong>날씨 대비:</strong> 4-5월 잦은 봄비, 우산/우비 준비</li>
    <li><strong>복장:</strong> 10°C 이상 일교차, 레이어링 의상 필수</li>
  </ul>
</div>

<h2 style="font-size: 2rem; color: #c2410c; border-left: 5px solid #f97316; padding-left: 1rem; margin: 3rem 0 1.5rem 0; background: #fff7ed; padding: 1rem 1rem 1rem 2rem; border-radius: 0.5rem;">🍽️ 송도 봄 맛집 & 카페 가이드</h2>

<div style="display: grid; gap: 1.5rem;">
  <div style="background: #fef3c7; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #f59e0b;">
    <h3 style="color: #d97706; margin: 0 0 1rem 0;">🛍️ 트리플스트리트 맛집</h3>
    <p style="margin: 0; color: #374151; line-height: 1.6;">
      <strong>위치:</strong> 송도 현대아울렛 근처, A동부터 D동까지<br>
      <strong>특징:</strong> 한국 대표 걷고 싶은 거리, 스트리트형 복합 쇼핑몰<br>
      <strong>봄 추천:</strong> 3월 말 저녁 시간 방문 추천 (한가하고 날씨 좋음)
    </p>
    <h4 style="color: #d97706; margin: 1rem 0 0.5rem 0;">🍔 대표 맛집</h4>
    <ul style="margin: 0; padding-left: 1.5rem; color: #374151;">
      <li><strong>쉑쉑버거 (Shake Shack):</strong> 공항 제외 송도 트리플스트리트 유일점</li>
      <li><strong>스타벅스 송도트리플R점:</strong> 인천광역시 최초이자 유일한 리저브 매장</li>
      <li><strong>다양한 카페:</strong> 벚꽃 시즌 야외 테라스 추천</li>
    </ul>
  </div>
  
  <div style="background: #f0fdf4; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #22c55e;">
    <h3 style="color: #16a34a; margin: 0 0 1rem 0;">☕ 센트럴파크 주변 카페</h3>
    <h4 style="color: #16a34a; margin: 1rem 0 0.5rem 0;">Top 카페 추천</h4>
    <ul style="margin: 0; padding-left: 1.5rem; color: #374151;">
      <li><strong>스타벅스 송도센트럴파크점:</strong> 카스텔라, 두유, 주차 가능, 기와집 특별 매장</li>
      <li><strong>기노스코:</strong> 아이스아메리카노, 앙버터, 무료주차, 깔끔한 분위기</li>
      <li><strong>곤트란쉐리에:</strong> 크로아상, 브런치카페, 조용한 분위기</li>
      <li><strong>그리다 디저트:</strong> 아메리카노, 케이크, 애완동물 동반 가능</li>
    </ul>
  </div>
  
  <div style="background: #fdf2f8; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #ec4899;">
    <h3 style="color: #be185d; margin: 0 0 1rem 0;">🍴 센트럴파크 주변 맛집</h3>
    <ul style="margin: 0; padding-left: 1.5rem; color: #374151;">
      <li><strong>속초코다리냉면:</strong> 봄철 시원한 냉면 추천</li>
      <li><strong>칭칭차이나:</strong> 중식 전문점</li>
      <li><strong>진시황뼈다귀감자탕:</strong> 봄철 든든한 한식</li>
      <li><strong>베테랑 종합어시장:</strong> 신선한 해산물</li>
      <li><strong>메종드크루아상:</strong> 프랑스식 베이커리</li>
    </ul>
    <h4 style="color: #be185d; margin: 1rem 0 0.5rem 0;">🌸 봄 특별 추천</h4>
    <p style="margin: 0; color: #374151; line-height: 1.6;">
      벚꽃이 활짝 핀 4월에는 야외 테라스가 있는 카페에서 꽃구경을 하며 브런치를 즐기는 것을 추천합니다. 트리플스트리트 조형물 벚꽃도 실물 같아서 봄 분위기를 만끽할 수 있습니다.
    </p>
  </div>
</div>

<h2 style="font-size: 2rem; color: #c2410c; border-left: 5px solid #f97316; padding-left: 1rem; margin: 3rem 0 1.5rem 0; background: #fff7ed; padding: 1rem 1rem 1rem 2rem; border-radius: 0.5rem;">📅 2025년 송도 봄 이벤트 캘린더</h2>

<div style="display: grid; gap: 1.5rem;">
  <div style="background: #f0fdf4; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #22c55e;">
    <h3 style="color: #16a34a; margin: 0 0 1rem 0;">🌱 3월 이벤트</h3>
    <ul style="margin: 0; padding-left: 1.5rem; color: #374151;">
      <li><strong>3월 중순:</strong> 봄 새싹 관찰 프로그램 (달빛공원)</li>
      <li><strong>3월 말:</strong> 이른 봄꽃 산책 이벤트 (센트럴파크)</li>
      <li><strong>매주 주말:</strong> G타워 전망대 무료 개방</li>
    </ul>
  </div>
  
  <div style="background: #fdf2f8; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #ec4899;">
    <h3 style="color: #be185d; margin: 0 0 1rem 0;">🌸 4월 이벤트</h3>
    <ul style="margin: 0; padding-left: 1.5rem; color: #374151;">
      <li><strong>4월 4일~:</strong> 벚꽃 개화 시작 (날씨에 따라 변동)</li>
      <li><strong>4월 10일~15일:</strong> 벚꽃 만개 최적 관람 기간</li>
      <li><strong>4월 둘째 주:</strong> 센트럴파크 벚꽃 포토존 이벤트</li>
      <li><strong>4월 말:</strong> 봄 피크닉 페스티벌 (달빛축제공원)</li>
    </ul>
  </div>
  
  <div style="background: #ecfdf5; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #10b981;">
    <h3 style="color: #059669; margin: 0 0 1rem 0;">🌿 5월 이벤트</h3>
    <ul style="margin: 0; padding-left: 1.5rem; color: #374151;">
      <li><strong>5월 5일:</strong> 어린이날 특별 체험 행사 (센트럴파크)</li>
      <li><strong>5월 8일:</strong> 어버이날 가족 나들이 프로그램</li>
      <li><strong>5월 22일:</strong> 펜타포트 락 페스티벌 (달빛축제공원)</li>
      <li><strong>5월 말:</strong> 송도 국제걷기대회 (각 공원 연결)</li>
    </ul>
  </div>
</div>

<div style="text-align: center; background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); color: white; padding: 2rem; border-radius: 1rem; margin: 3rem 0;">
  <h2 style="margin: 0 0 1rem 0; font-size: 1.5rem;">🌸 송도에서 만나는 특별한 봄</h2>
  <p style="margin: 0; font-size: 1.1rem; opacity: 0.9;">
    해수 공원의 벚꽃, 시원한 바다바람, 그리고 다양한 축제까지. 송도국제도시에서만 경험할 수 있는 특별한 봄 여행을 만끽해보세요.
  </p>
</div>

<div style="text-align: center; background: #f3f4f6; padding: 1.5rem; border-radius: 1rem; margin: 2rem 0;">
  <p style="margin: 0; font-size: 0.9rem; color: #6b7280;">본 가이드는 2025년 7월 기준으로 최신 정보로 업데이트되었습니다. 기상 상황이나 행사 일정 변경이 있을 수 있으니 방문 전 공식 홈페이지를 확인해주세요.</p>
</div>

</div>`,

  'songdo-summer-guide': `<div style="max-width: 100%; margin: 0 auto; line-height: 1.8; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">

<h1 style="font-size: 2.5rem; color: #0ea5e9; text-align: center; margin-bottom: 1rem; border-bottom: 3px solid #38bdf8; padding-bottom: 1rem;">🌞 송도 여름 완벽 가이드</h1>

<div style="text-align: center; background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%); color: white; padding: 1.5rem; border-radius: 1rem; margin: 2rem 0; box-shadow: 0 8px 25px rgba(14, 165, 233, 0.3);">
  <h2 style="margin: 0; font-size: 1.5rem;">시원한 여름을 만끽하는 송도국제도시 🌊</h2>
  <p style="margin: 0.5rem 0 0 0; font-size: 1.1rem; opacity: 0.9;">펜타포트 락 페스티벌, 맥주축제, 수상레저까지 송도의 뜨거운 여름을 즐기는 완벽한 방법을 안내합니다.</p>
  <p style="margin: 0.5rem 0 0 0; font-size: 0.9rem; opacity: 0.8;">최종 업데이트: 2025년 7월</p>
</div>

<h2 style="font-size: 2rem; color: #0369a1; border-left: 5px solid #0ea5e9; padding-left: 1rem; margin: 3rem 0 1.5rem 0; background: #f0f9ff; padding: 1rem 1rem 1rem 2rem; border-radius: 0.5rem;">🎵 송도 여름 대표 축제</h2>

<div style="display: grid; gap: 2rem; margin: 2rem 0;">
  <div style="background: #fef3c7; padding: 2rem; border-radius: 1rem; border-left: 4px solid #f59e0b; box-shadow: 0 4px 15px rgba(245, 158, 11, 0.2);">
    <h3 style="color: #d97706; margin: 0 0 1rem 0; font-size: 1.8rem;">🎸 2025 인천 펜타포트 락 페스티벌</h3>
    <p style="margin: 0; color: #374151; line-height: 1.8; font-size: 1.1rem;">
      <strong>일정:</strong> 2025년 8월 1일(금) ~ 8월 3일(일) 3일간<br>
      <strong>장소:</strong> 송도 달빛축제공원<br>
      <strong>시간:</strong> 매일 11:00 ~ 22:00<br>
      <strong>특징:</strong> 20주년 기념 '펜타포트 2.0' 특별 에디션<br>
      <strong>규모:</strong> 국내외 아티스트 60여 팀, 3개 스테이지 운영<br>
      <strong>수상:</strong> 3년 연속 피너클 어워드 한국대회 수상
    </p>
    <div style="margin: 1rem 0; padding: 1rem; background: #fffbeb; border-radius: 0.5rem; border-left: 3px solid #f59e0b;">
      <h4 style="color: #d97706; margin: 0 0 0.5rem 0;">🎫 2025 티켓 정보</h4>
      <p style="margin: 0; color: #374151; font-size: 0.95rem;">
        <strong>3일권:</strong> 240,000원 (얼리버드 192,000원, 20% 할인)<br>
        <strong>2일권:</strong> 180,000원<br>
        <strong>1일권:</strong> 120,000원<br>
        <strong>국민카드 할인:</strong> 15% 추가 할인 (180,000원)<br>
        <strong>문화누리카드:</strong> 30% 할인 적용 가능
      </p>
    </div>
  </div>
  
  <div style="background: #fef3c7; padding: 2rem; border-radius: 1rem; border-left: 4px solid #f59e0b; box-shadow: 0 4px 15px rgba(245, 158, 11, 0.2);">
    <h3 style="color: #d97706; margin: 0 0 1rem 0; font-size: 1.8rem;">🍺 2025 송도 맥주축제</h3>
    <p style="margin: 0; color: #374151; line-height: 1.8; font-size: 1.1rem;">
      <strong>일정:</strong> 2025년 8월 22일(금) ~ 8월 30일(토) 9일간<br>
      <strong>시간:</strong> 매일 오후 5시 ~ 10시<br>
      <strong>장소:</strong> 송도 달빛축제공원<br>
      <strong>슬로건:</strong> "Drop the Beer!"<br>
      <strong>규모:</strong> 국내 최대 뮤직 페스티벌+맥주 축제 (2019년 80만 명 방문)<br>
      <strong>특징:</strong> 시원한 생맥주, 라이브 공연, 불꽃놀이, 다양한 음식 및 F&B존
    </p>
    <div style="margin: 1rem 0; padding: 1rem; background: #fffbeb; border-radius: 0.5rem; border-left: 3px solid #f59e0b;">
      <h4 style="color: #d97706; margin: 0 0 0.5rem 0;">🍻 축제 하이라이트</h4>
      <p style="margin: 0; color: #374151; font-size: 0.95rem;">
        • 국내외 프리미엄 맥주 20여 브랜드 체험<br>
        • 실시간 음악 공연 및 DJ 세트<br>
        • 맥주 안주 전문 푸드트럭 운영<br>
        • 맥주 관련 게임 및 이벤트 진행
      </p>
    </div>
  </div>
</div>

<h2 style="font-size: 2rem; color: #0369a1; border-left: 5px solid #0ea5e9; padding-left: 1rem; margin: 3rem 0 1.5rem 0; background: #f0f9ff; padding: 1rem 1rem 1rem 2rem; border-radius: 0.5rem;">🌊 센트럴파크 수상레저 완벽 가이드</h2>

<div style="background: #e0f2fe; padding: 2rem; border-radius: 1rem; margin: 2rem 0; box-shadow: 0 4px 15px rgba(14, 165, 233, 0.1);">
  <h3 style="color: #0369a1; margin: 0 0 1.5rem 0; font-size: 1.6rem;">🏊 2025년 수상레저 시설 완벽 정보</h3>
  
  <div style="display: grid; gap: 1.5rem; margin: 1rem 0;">
    <div style="background: white; padding: 1.5rem; border-radius: 0.8rem; border: 1px solid #bae6fd; box-shadow: 0 2px 8px rgba(14, 165, 233, 0.05);">
      <h4 style="color: #0369a1; margin: 0 0 0.8rem 0; font-size: 1.3rem;">🚤 패밀리보트</h4>
      <p style="margin: 0; color: #374151; line-height: 1.7;">
        <strong>요금:</strong> 35,000원 (5명 탑승, 30분 이용)<br>
        <strong>특징:</strong> 가족 단위 이용 최적화, 안전한 승선감<br>
        <strong>추천:</strong> 어린이 동반 가족, 편안한 수상 체험
      </p>
    </div>
    
    <div style="background: white; padding: 1.5rem; border-radius: 0.8rem; border: 1px solid #bae6fd; box-shadow: 0 2px 8px rgba(14, 165, 233, 0.05);">
      <h4 style="color: #0369a1; margin: 0 0 0.8rem 0; font-size: 1.3rem;">🌊 파티보트</h4>
      <p style="margin: 0; color: #374151; line-height: 1.7;">
        <strong>요금:</strong> 40,000원 (6명 탑승, 40분 이용)<br>
        <strong>특징:</strong> 그룹 이용 최적화, 파티 분위기<br>
        <strong>추천:</strong> 친구 모임, 커플 데이트, 소규모 단체
      </p>
    </div>
    
    <div style="background: white; padding: 1.5rem; border-radius: 0.8rem; border: 1px solid #bae6fd; box-shadow: 0 2px 8px rgba(14, 165, 233, 0.05);">
      <h4 style="color: #0369a1; margin: 0 0 0.8rem 0; font-size: 1.3rem;">🛶 투명카약 (수도권 유일)</h4>
      <p style="margin: 0; color: #374151; line-height: 1.7;">
        <strong>요금:</strong> 25,000원 (3명 탑승, 40분 이용)<br>
        <strong>특징:</strong> 배 전체가 투명한 특수 카약, 수중 관찰 가능<br>
        <strong>추천:</strong> 인스타그램 사진 촬영, 독특한 체험
      </p>
    </div>
    
    <div style="background: white; padding: 1.5rem; border-radius: 0.8rem; border: 1px solid #bae6fd; box-shadow: 0 2px 8px rgba(14, 165, 233, 0.05);">
      <h4 style="color: #0369a1; margin: 0 0 0.8rem 0; font-size: 1.3rem;">🚣 카약 & 카누</h4>
      <p style="margin: 0; color: #374151; line-height: 1.7;">
        <strong>요금:</strong> 25,000원 (3명 탑승, 50분 이용)<br>
        <strong>카약:</strong> 다리를 앞으로 하고 앉아서 양날 노(Double Paddle) 사용<br>
        <strong>카누:</strong> 4.5m 캐네디언 카누, 싱글 노(Single Paddle) 사용<br>
        <strong>추천:</strong> 본격적인 수상스포츠 체험, 운동 효과
      </p>
    </div>
    
    <div style="background: white; padding: 1.5rem; border-radius: 0.8rem; border: 1px solid #bae6fd; box-shadow: 0 2px 8px rgba(14, 165, 233, 0.05);">
      <h4 style="color: #0369a1; margin: 0 0 0.8rem 0; font-size: 1.3rem;">🚢 수상택시</h4>
      <p style="margin: 0; color: #374151; line-height: 1.7;">
        <strong>운영시간:</strong> 10:00 ~ 22:00 (매일 운행)<br>
        <strong>코스:</strong> 센트럴파크 내 인공수로 순환 코스<br>
        <strong>특징:</strong> 해수를 이용한 국내 최초 인공수로 체험<br>
        <strong>야간 운행:</strong> 저녁 시간 로맨틱한 분위기
      </p>
    </div>
  </div>
  
  <div style="background: #f0f9ff; padding: 1.5rem; border-radius: 0.8rem; margin: 1.5rem 0; border-left: 3px solid #0ea5e9;">
    <h4 style="color: #0369a1; margin: 0 0 0.8rem 0;">📍 이용 안내</h4>
    <p style="margin: 0; color: #374151; line-height: 1.7;">
      <strong>발권장소:</strong> 이스트 보트하우스 매표소<br>
      <strong>운영시간:</strong> 카누/카약/보트 10:00~19:00 (매주 월요일 휴무)<br>
      <strong>안전장비:</strong> 구명조끼 착용 필수 (현장 제공)<br>
      <strong>주의사항:</strong> 주말 대기시간 발생 가능, 사전 예약 권장
    </p>
  </div>
</div>

<h2 style="font-size: 2rem; color: #0369a1; border-left: 5px solid #0ea5e9; padding-left: 1rem; margin: 3rem 0 1.5rem 0; background: #f0f9ff; padding: 1rem 1rem 1rem 2rem; border-radius: 0.5rem;">💧 해돋이공원 물놀이 천국</h2>

<div style="background: #ecfdf5; padding: 2rem; border-radius: 1rem; margin: 2rem 0; box-shadow: 0 4px 15px rgba(16, 185, 129, 0.1);">
  <h3 style="color: #059669; margin: 0 0 1.5rem 0; font-size: 1.6rem;">🐋 고래의 꿈 - 송도 대표 물놀이 시설</h3>
  
  <div style="display: grid; gap: 1.5rem; margin: 1rem 0;">
    <div style="background: white; padding: 1.5rem; border-radius: 0.8rem; border: 1px solid #a7f3d0; box-shadow: 0 2px 8px rgba(16, 185, 129, 0.05);">
      <h4 style="color: #059669; margin: 0 0 0.8rem 0; font-size: 1.3rem;">🌊 음악분수광장</h4>
      <p style="margin: 0; color: #374151; line-height: 1.7;">
        <strong>위치:</strong> 해돋이공원 정중앙<br>
        <strong>규모:</strong> 폭 91m의 대형 분수광장<br>
        <strong>특징:</strong> 음악에 맞춰 다양한 포물선을 그리며 솟구치는 분수<br>
        <strong>운영:</strong> 여름철 주간 시간대 집중 운영
      </p>
    </div>
    
    <div style="background: white; padding: 1.5rem; border-radius: 0.8rem; border: 1px solid #a7f3d0; box-shadow: 0 2px 8px rgba(16, 185, 129, 0.05);">
      <h4 style="color: #059669; margin: 0 0 0.8rem 0; font-size: 1.3rem;">🏊 바닥분수</h4>
      <p style="margin: 0; color: #374151; line-height: 1.7;">
        <strong>규모:</strong> 1,087㎡ 대형 바닥분수<br>
        <strong>특징:</strong> 바다를 헤엄치는 고래를 모티브로 한 디자인<br>
        <strong>이용대상:</strong> 어린이 물놀이 최적화<br>
        <strong>안전:</strong> 얕은 수심으로 안전한 물놀이 가능
      </p>
    </div>
    
    <div style="background: white; padding: 1.5rem; border-radius: 0.8rem; border: 1px solid #a7f3d0; box-shadow: 0 2px 8px rgba(16, 185, 129, 0.05);">
      <h4 style="color: #059669; margin: 0 0 0.8rem 0; font-size: 1.3rem;">🏖️ 물놀이 완벽 가이드</h4>
      <p style="margin: 0; color: #374151; line-height: 1.7;">
        <strong>준비물:</strong> 물놀이 용품, 여분의 옷, 수건, 선크림<br>
        <strong>최적시간:</strong> 오전 10시 ~ 오후 6시 (그늘막 설치 권장)<br>
        <strong>주의사항:</strong> 어린이 보호자 동반 필수, 미끄러운 바닥 주의<br>
        <strong>편의시설:</strong> 인근 화장실, 샤워실, 매점 이용 가능
      </p>
    </div>
  </div>
  
  <div style="background: #f0fdf4; padding: 1.5rem; border-radius: 0.8rem; margin: 1.5rem 0; border-left: 3px solid #10b981;">
    <h4 style="color: #059669; margin: 0 0 0.8rem 0;">📞 문의 및 이용 안내</h4>
    <p style="margin: 0; color: #374151; line-height: 1.7;">
      <strong>관리:</strong> 인천광역시 시설관리공단<br>
      <strong>전화:</strong> 032-456-2860<br>
      <strong>주소:</strong> 인천 연수구 해돋이로 51 (송도동 5-1)<br>
      <strong>교통:</strong> 지하철 수인선 센트럴파크역 하차 후 도보 10분
    </p>
  </div>
</div>

<h2 style="font-size: 2rem; color: #0369a1; border-left: 5px solid #0ea5e9; padding-left: 1rem; margin: 3rem 0 1.5rem 0; background: #f0f9ff; padding: 1rem 1rem 1rem 2rem; border-radius: 0.5rem;">🛍️ 여름 피서 쇼핑 & 실내 활동</h2>

<div style="display: grid; gap: 2rem; margin: 2rem 0;">
  <div style="background: #f8fafc; padding: 2rem; border-radius: 1rem; border-left: 4px solid #64748b; box-shadow: 0 4px 15px rgba(100, 116, 139, 0.1);">
    <h3 style="color: #475569; margin: 0 0 1rem 0; font-size: 1.6rem;">🏢 트리플스트리트 - 지하 연결 쇼핑</h3>
    <p style="margin: 0; color: #374151; line-height: 1.8; font-size: 1.05rem;">
      <strong>특징:</strong> 지하 연결통로로 더위를 피해 쇼핑 가능<br>
      <strong>여름 추천:</strong> 여름 의류, 수영복, 선글라스, 썬크림<br>
      <strong>편의시설:</strong> 다양한 카페, 레스토랑, CGV 영화관<br>
      <strong>운영시간:</strong> 10:30 ~ 22:00 (매일 운영)<br>
      <strong>주차:</strong> 지하 주차장 완비, 쇼핑 시 할인 혜택
    </p>
    <div style="margin: 1rem 0; padding: 1rem; background: #f1f5f9; border-radius: 0.5rem;">
      <h4 style="color: #475569; margin: 0 0 0.5rem 0;">🏪 추천 매장</h4>
      <p style="margin: 0; color: #374151; font-size: 0.95rem;">
        • 유니클로: 여름 기능성 의류, 에어리즘 컬렉션<br>
        • 자라: 트렌디한 여름 패션, 수영복<br>
        • 올리브영: 썬크림, 여름 스킨케어 제품
      </p>
    </div>
  </div>
  
  <div style="background: #f8fafc; padding: 2rem; border-radius: 1rem; border-left: 4px solid #64748b; box-shadow: 0 4px 15px rgba(100, 116, 139, 0.1);">
    <h3 style="color: #475569; margin: 0 0 1rem 0; font-size: 1.6rem;">🏪 현대프리미엄아울렛 송도점</h3>
    <p style="margin: 0; color: #374151; line-height: 1.8; font-size: 1.05rem;">
      <strong>특징:</strong> 대형 실내 아울렛, 완벽한 에어컨 시설<br>
      <strong>여름 할인:</strong> 여름 브랜드 세일, 스포츠웨어 할인<br>
      <strong>편의시설:</strong> 푸드코트, 카페, 키즈존, 수유실<br>
      <strong>운영시간:</strong> 10:30 ~ 22:00 (매일 운영)<br>
      <strong>주차:</strong> 무료 주차 (첫 2시간), 구매 시 연장 가능
    </p>
    <div style="margin: 1rem 0; padding: 1rem; background: #f1f5f9; border-radius: 0.5rem;">
      <h4 style="color: #475569; margin: 0 0 0.5rem 0;">🛍️ 여름 특가 브랜드</h4>
      <p style="margin: 0; color: #374151; font-size: 0.95rem;">
        • 나이키: 여름 운동복, 수영복, 스포츠 샌들<br>
        • 아디다스: 여름 스포츠웨어, 운동화<br>
        • 갭: 여름 캐주얼 의류, 어린이 의류
      </p>
    </div>
  </div>
</div>

<h2 style="font-size: 2rem; color: #0369a1; border-left: 5px solid #0ea5e9; padding-left: 1rem; margin: 3rem 0 1.5rem 0; background: #f0f9ff; padding: 1rem 1rem 1rem 2rem; border-radius: 0.5rem;">🍦 여름 시원한 맛집 & 디저트</h2>

<div style="display: grid; gap: 2rem; margin: 2rem 0;">
  <div style="background: #fef7ed; padding: 2rem; border-radius: 1rem; border-left: 4px solid #ea580c; box-shadow: 0 4px 15px rgba(234, 88, 12, 0.1);">
    <h3 style="color: #c2410c; margin: 0 0 1rem 0; font-size: 1.6rem;">🧊 시원한 디저트 전문점</h3>
    
    <div style="margin: 1.5rem 0;">
      <h4 style="color: #c2410c; margin: 0 0 0.8rem 0; font-size: 1.3rem;">🍧 설빙 (트리플스트리트점)</h4>
      <p style="margin: 0; color: #374151; line-height: 1.7;">
        <strong>추천메뉴:</strong> 망고빙수 (18,000원), 인절미빙수 (16,000원)<br>
        <strong>특징:</strong> 시원한 실내 공간, 프리미엄 빙수 브랜드<br>
        <strong>운영시간:</strong> 11:00 ~ 23:00<br>
        <strong>여름 특별:</strong> 계절 한정 열대과일 빙수 출시
      </p>
    </div>
    
    <div style="margin: 1.5rem 0;">
      <h4 style="color: #c2410c; margin: 0 0 0.8rem 0; font-size: 1.3rem;">🍦 베스킨라빈스31 (센트럴파크점)</h4>
      <p style="margin: 0; color: #374151; line-height: 1.7;">
        <strong>추천메뉴:</strong> 여름 한정 아이스크림, 아이스크림 케이크<br>
        <strong>특징:</strong> 공원 산책 후 시원한 아이스크림 필수 코스<br>
        <strong>운영시간:</strong> 10:00 ~ 22:00<br>
        <strong>야외 테이블:</strong> 센트럴파크 뷰를 감상하며 즐기는 아이스크림
      </p>
    </div>
  </div>
  
  <div style="background: #fef7ed; padding: 2rem; border-radius: 1rem; border-left: 4px solid #ea580c; box-shadow: 0 4px 15px rgba(234, 88, 12, 0.1);">
    <h3 style="color: #c2410c; margin: 0 0 1rem 0; font-size: 1.6rem;">🥤 시원한 음료 & 카페</h3>
    
    <div style="margin: 1.5rem 0;">
      <h4 style="color: #c2410c; margin: 0 0 0.8rem 0; font-size: 1.3rem;">☕ 스타벅스 (센트럴파크점)</h4>
      <p style="margin: 0; color: #374151; line-height: 1.7;">
        <strong>추천메뉴:</strong> 망고 패션 프라푸치노, 아이스 아메리카노<br>
        <strong>특징:</strong> 센트럴파크 전망 테라스, 야외 좌석 운영<br>
        <strong>운영시간:</strong> 06:00 ~ 22:00<br>
        <strong>여름 특별:</strong> 테라스에서 수상택시 감상하며 음료 즐기기
      </p>
    </div>
    
    <div style="margin: 1.5rem 0;">
      <h4 style="color: #c2410c; margin: 0 0 0.8rem 0; font-size: 1.3rem;">🍰 투썸플레이스 (송도점)</h4>
      <p style="margin: 0; color: #374151; line-height: 1.7;">
        <strong>추천메뉴:</strong> 아이스크림 음료, 시원한 케이크, 빙수<br>
        <strong>특징:</strong> 넓은 공간, 그룹 모임 최적화<br>
        <strong>운영시간:</strong> 08:00 ~ 22:00<br>
        <strong>편의시설:</strong> 와이파이, 콘센트, 스터디룸
      </p>
    </div>
    
    <div style="margin: 1.5rem 0;">
      <h4 style="color: #c2410c; margin: 0 0 0.8rem 0; font-size: 1.3rem;">🧋 공차 (트리플스트리트점)</h4>
      <p style="margin: 0; color: #374151; line-height: 1.7;">
        <strong>추천메뉴:</strong> 망고 스무디, 타로 밀크티, 흑당 펄 밀크티<br>
        <strong>특징:</strong> 대만식 음료 전문점, 시원한 스무디 메뉴<br>
        <strong>운영시간:</strong> 10:00 ~ 22:00<br>
        <strong>여름 특별:</strong> 열대과일 시리즈 음료 출시
      </p>
    </div>
  </div>
</div>

<h2 style="font-size: 2rem; color: #0369a1; border-left: 5px solid #0ea5e9; padding-left: 1rem; margin: 3rem 0 1.5rem 0; background: #f0f9ff; padding: 1rem 1rem 1rem 2rem; border-radius: 0.5rem;">📅 2025년 여름 월별 완벽 가이드</h2>

<div style="display: grid; gap: 2rem; margin: 2rem 0;">
  <div style="background: #fff7ed; padding: 2rem; border-radius: 1rem; border-left: 4px solid #f97316; box-shadow: 0 4px 15px rgba(249, 115, 22, 0.1);">
    <h3 style="color: #ea580c; margin: 0 0 1rem 0; font-size: 1.6rem;">🌤️ 6월 - 초여름 활동 시작</h3>
    <ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
      <li><strong>수상레저:</strong> 센트럴파크 수상레저 시즌 개막, 대기시간 적음</li>
      <li><strong>분수시설:</strong> 해돋이공원 분수 정식 가동 시작</li>
      <li><strong>축제:</strong> 송도 맥주축제 (6월 14일) - 펜타포트 예열</li>
      <li><strong>쇼핑:</strong> 여름 세일 시즌 시작, 썸머 컬렉션 출시</li>
      <li><strong>추천활동:</strong> 야외 카페 테라스 이용, 저녁 센트럴파크 산책</li>
    </ul>
  </div>
  
  <div style="background: #fff7ed; padding: 2rem; border-radius: 1rem; border-left: 4px solid #f97316; box-shadow: 0 4px 15px rgba(249, 115, 22, 0.1);">
    <h3 style="color: #ea580c; margin: 0 0 1rem 0; font-size: 1.6rem;">🌡️ 7월 - 한여름 성수기 절정</h3>
    <ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
      <li><strong>수상레저:</strong> 성수기 돌입, 주말 예약 필수 (특히 투명카약)</li>
      <li><strong>물놀이:</strong> 해돋이공원 물놀이 시설 최대 활용 시기</li>
      <li><strong>피서:</strong> 실내 쇼핑몰 (트리플스트리트, 현대아울렛) 활용</li>
      <li><strong>야간활동:</strong> 센트럴파크 야간 수상택시 (22시까지)</li>
      <li><strong>주의사항:</strong> 자외선 차단 필수, 충분한 수분 섭취</li>
    </ul>
  </div>
  
  <div style="background: #fff7ed; padding: 2rem; border-radius: 1rem; border-left: 4px solid #f97316; box-shadow: 0 4px 15px rgba(249, 115, 22, 0.1);">
    <h3 style="color: #ea580c; margin: 0 0 1rem 0; font-size: 1.6rem;">🎸 8월 - 축제의 절정과 마무리</h3>
    <ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
      <li><strong>대형축제:</strong> 펜타포트 락 페스티벌 (8월 1일~3일)</li>
      <li><strong>연계축제:</strong> 송도 맥주축제 동시 개최</li>
      <li><strong>교통:</strong> 달빛축제공원 주변 교통 혼잡 예상</li>
      <li><strong>숙박:</strong> 축제 기간 중 송도 호텔 예약 필수</li>
      <li><strong>마무리:</strong> 여름 시즌 마지막 수상레저 활동</li>
    </ul>
  </div>
</div>

<div style="background: #eff6ff; padding: 2rem; border-radius: 1rem; margin: 2rem 0; border: 1px solid #bfdbfe; box-shadow: 0 4px 15px rgba(59, 130, 246, 0.1);">
  <h3 style="color: #1d4ed8; margin: 0 0 1.5rem 0; text-align: center; font-size: 1.8rem;">🎯 송도 여름 완벽 이용 가이드</h3>
  <div style="display: grid; gap: 1.5rem; margin: 1rem 0;">
    <div style="background: white; padding: 1.5rem; border-radius: 0.8rem; box-shadow: 0 2px 8px rgba(59, 130, 246, 0.05);">
      <h4 style="color: #1d4ed8; margin: 0 0 0.8rem 0; font-size: 1.3rem;">💧 물놀이 필수 준비물</h4>
      <p style="margin: 0; color: #374151; line-height: 1.7;">
        • 여분의 옷 (속옷 포함), 수건, 선크림 (SPF 50+ 추천)<br>
        • 물놀이 용품 (튜브, 물총), 그늘막 또는 파라솔<br>
        • 충분한 음료와 간식, 방수 가방
      </p>
    </div>
    <div style="background: white; padding: 1.5rem; border-radius: 0.8rem; box-shadow: 0 2px 8px rgba(59, 130, 246, 0.05);">
      <h4 style="color: #1d4ed8; margin: 0 0 0.8rem 0; font-size: 1.3rem;">🅿️ 주차 및 교통 정보</h4>
      <p style="margin: 0; color: #374151; line-height: 1.7;">
        • 축제 기간 중 주차 극심한 혼잡 예상<br>
        • 지하철 수인선 센트럴파크역 이용 권장<br>
        • 주말 오후 2시~6시 교통 혼잡 시간대
      </p>
    </div>
    <div style="background: white; padding: 1.5rem; border-radius: 0.8rem; box-shadow: 0 2px 8px rgba(59, 130, 246, 0.05);">
      <h4 style="color: #1d4ed8; margin: 0 0 0.8rem 0; font-size: 1.3rem;">🎫 예약 및 할인 정보</h4>
      <p style="margin: 0; color: #374151; line-height: 1.7;">
        • 수상레저 및 축제 티켓 온라인 사전 예약 필수<br>
        • 국민카드 결제 시 펜타포트 티켓 15% 할인<br>
        • 문화누리카드 사용 시 30% 할인 혜택
      </p>
    </div>
  </div>
</div>

</div>`,

  'songdo-autumn-guide': `<div style="max-width: 100%; margin: 0 auto; line-height: 1.8; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">

<h1 style="font-size: 2.5rem; color: #dc2626; text-align: center; margin-bottom: 1rem; border-bottom: 3px solid #f87171; padding-bottom: 1rem;">🍂 송도 가을 완벽 가이드</h1>

<div style="text-align: center; background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); color: white; padding: 1.5rem; border-radius: 1rem; margin: 2rem 0; box-shadow: 0 8px 25px rgba(220, 38, 38, 0.3);">
  <h2 style="margin: 0; font-size: 1.5rem;">황금빛 단풍과 선선한 바닷바람이 어우러진 최고의 계절 🍁</h2>
  <p style="margin: 0.5rem 0 0 0; font-size: 1.1rem; opacity: 0.9;">9월부터 11월까지 단풍 명소부터 가을 축제, 야외활동까지 송도만의 특별한 가을을 만끽할 수 있는 완벽한 가이드를 준비했습니다.</p>
  <p style="margin: 0.5rem 0 0 0; font-size: 0.9rem; opacity: 0.8;">최종 업데이트: 2025년 7월</p>
</div>

<h2 style="font-size: 2rem; color: #991b1b; border-left: 5px solid #dc2626; padding-left: 1rem; margin: 3rem 0 1.5rem 0; background: #fef2f2; padding: 1rem 1rem 1rem 2rem; border-radius: 0.5rem;">🍁 송도 단풍 명소 완벽 가이드</h2>

<div style="background: #fef2f2; padding: 2rem; border-radius: 1rem; margin: 2rem 0; box-shadow: 0 4px 15px rgba(220, 38, 38, 0.1);">
  <h3 style="color: #991b1b; margin: 0 0 1.5rem 0; font-size: 1.6rem;">🌿 2025년 단풍 시기 완벽 예측</h3>
  <div style="background: #fed7d7; padding: 1.5rem; border-radius: 0.8rem; margin: 1rem 0; border-left: 3px solid #dc2626;">
    <h4 style="color: #991b1b; margin: 0 0 0.8rem 0;">📅 기후변화 반영 단풍 일정</h4>
    <p style="margin: 0; color: #374151; line-height: 1.7;">
      <strong>절정 시기:</strong> 10월 28일 ~ 11월 5일 (평년 대비 늦어짐)<br>
      <strong>은행나무:</strong> 10월 28일 절정 예상<br>
      <strong>당단풍나무:</strong> 10월 26일 절정 예상<br>
      <strong>신갈나무:</strong> 10월 26일 절정 예상<br>
      <strong>기후 영향:</strong> 매년 0.33일씩 단풍 시기 지연, 2040년엔 11월 단풍 예상
    </p>
  </div>
</div>

<div style="display: grid; gap: 2rem; margin: 2rem 0;">
  <div style="background: #fef2f2; padding: 2rem; border-radius: 1rem; border-left: 4px solid #dc2626; box-shadow: 0 4px 15px rgba(220, 38, 38, 0.1);">
    <h3 style="color: #991b1b; margin: 0 0 1rem 0; font-size: 1.8rem;">🥇 센트럴파크 단풍 산책로</h3>
    <p style="margin: 0; color: #374151; line-height: 1.8; font-size: 1.1rem;">
      <strong>특징:</strong> 3.5km 순환 코스, 국내 최초 해수공원<br>
      <strong>단풍 포인트:</strong> 인공수로변 메타세쿼이아, 한옥마을 단풍나무<br>
      <strong>2025년 절정 시기:</strong> 10월 28일 ~ 11월 5일<br>
      <strong>특별 체험:</strong> 낙엽 밟는 ASMR 소리 감상<br>
      <strong>평일 추천:</strong> 사람이 적어 여유로운 산책 가능
    </p>
    <div style="margin: 1rem 0; padding: 1rem; background: #fef7f7; border-radius: 0.5rem; border-left: 3px solid #dc2626;">
      <h4 style="color: #991b1b; margin: 0 0 0.5rem 0;">📸 단풍 포토존 완벽 가이드</h4>
      <p style="margin: 0; color: #374151; font-size: 0.95rem;">
        • <strong>워터프런트:</strong> 물에 비친 단풍 리플렉션 사진<br>
        • <strong>한옥마을:</strong> 전통 건축물과 단풍의 조화<br>
        • <strong>메타세쿼이아길:</strong> 황금빛 터널 같은 산책로<br>
        • <strong>최적 시간:</strong> 오후 4-6시 (골든아워)
      </p>
    </div>
  </div>
  
  <div style="background: #fef2f2; padding: 2rem; border-radius: 1rem; border-left: 4px solid #dc2626; box-shadow: 0 4px 15px rgba(220, 38, 38, 0.1);">
    <h3 style="color: #991b1b; margin: 0 0 1rem 0; font-size: 1.8rem;">🥈 달빛축제공원</h3>
    <p style="margin: 0; color: #374151; line-height: 1.8; font-size: 1.1rem;">
      <strong>특징:</strong> 170,543㎡ 대규모 공원, 축제 개최지<br>
      <strong>단풍 명소:</strong> 공원 둘레길, 야외공연장 주변<br>
      <strong>2025년 절정 시기:</strong> 10월 28일 ~ 11월 5일<br>
      <strong>야간 조명:</strong> 조명과 함께하는 단풍 야경<br>
      <strong>축제 연계:</strong> 펜타포트 락 페스티벌 후 가을 단풍 산책
    </p>
    <div style="margin: 1rem 0; padding: 1rem; background: #fef7f7; border-radius: 0.5rem; border-left: 3px solid #dc2626;">
      <h4 style="color: #991b1b; margin: 0 0 0.5rem 0;">🎪 축제 연계 활동</h4>
      <p style="margin: 0; color: #374151; font-size: 0.95rem;">
        • 야외공연장 주변 단풍 감상<br>
        • 24개 벤치에서 휴식<br>
        • 10개 자전거 보관소 이용<br>
        • 교통: 달빛축제공원역 4번 출구 도보 20분
      </p>
    </div>
  </div>
  
  <div style="background: #fef2f2; padding: 2rem; border-radius: 1rem; border-left: 4px solid #dc2626; box-shadow: 0 4px 15px rgba(220, 38, 38, 0.1);">
    <h3 style="color: #991b1b; margin: 0 0 1rem 0; font-size: 1.8rem;">🥉 해돋이공원</h3>
    <p style="margin: 0; color: #374151; line-height: 1.8; font-size: 1.1rem;">
      <strong>특징:</strong> 근대화 테마 공원, 송도 전망 명소<br>
      <strong>총면적:</strong> 210,468㎡ 대규모 공원<br>
      <strong>단풍 코스:</strong> 전망대 오름길, 산책로 일대<br>
      <strong>2025년 절정 시기:</strong> 10월 28일 ~ 11월 5일<br>
      <strong>추천 활동:</strong> 일출 + 단풍 감상, 송도 파노라마 뷰
    </p>
    <div style="margin: 1rem 0; padding: 1rem; background: #fef7f7; border-radius: 0.5rem; border-left: 3px solid #dc2626;">
      <h4 style="color: #991b1b; margin: 0 0 0.5rem 0;">🌅 최적 관람 시간</h4>
      <p style="margin: 0; color: #374151; font-size: 0.95rem;">
        • <strong>새벽 일출:</strong> 6:30~7:00 (일출과 단풍 동시 감상)<br>
        • <strong>오후 노을:</strong> 17:00~18:00 (석양과 단풍 조화)<br>
        • <strong>주요 시설:</strong> 송도동산, 인공연못, 음악분수, 장미원<br>
        • <strong>접근성:</strong> 차량 접근 가능, 주차장 완비
      </p>
    </div>
  </div>
</div>

<h2 style="font-size: 2rem; color: #991b1b; border-left: 5px solid #dc2626; padding-left: 1rem; margin: 3rem 0 1.5rem 0; background: #fef2f2; padding: 1rem 1rem 1rem 2rem; border-radius: 0.5rem;">🚴 2025년 가을 야외활동 완벽 가이드</h2>

<div style="background: #ecfdf5; padding: 2rem; border-radius: 1rem; margin: 2rem 0; box-shadow: 0 4px 15px rgba(16, 185, 129, 0.1);">
  <h3 style="color: #059669; margin: 0 0 1.5rem 0; font-size: 1.6rem;">🚲 송도 자전거 투어 - 가을 라이딩 완벽 코스</h3>
  
  <div style="display: grid; gap: 1.5rem; margin: 1rem 0;">
    <div style="background: white; padding: 1.5rem; border-radius: 0.8rem; border: 1px solid #a7f3d0; box-shadow: 0 2px 8px rgba(16, 185, 129, 0.05);">
      <h4 style="color: #059669; margin: 0 0 0.8rem 0; font-size: 1.3rem;">🏞️ 송도 공원 투어 (15km)</h4>
      <p style="margin: 0 0 0.5rem 0; color: #374151; font-weight: bold;">센트럴파크 → 달빛축제공원 → 해돋이공원 → 달빛공원 → 새아침공원</p>
      <p style="margin: 0; color: #374151; line-height: 1.7;">
        <strong>소요시간:</strong> 2-3시간<br>
        <strong>난이도:</strong> ★★☆☆☆ (평지, 초보자 가능)<br>
        <strong>특징:</strong> 평탄한 지형으로 자전거 이용 최적 환경<br>
        <strong>가을 추천:</strong> 단풍 감상하며 라이딩, 시원한 바닷바람
      </p>
    </div>
    
    <div style="background: white; padding: 1.5rem; border-radius: 0.8rem; border: 1px solid #a7f3d0; box-shadow: 0 2px 8px rgba(16, 185, 129, 0.05);">
      <h4 style="color: #059669; margin: 0 0 0.8rem 0; font-size: 1.3rem;">🆕 송도 자전거 관광 노선 (신규 개발)</h4>
      <p style="margin: 0; color: #374151; line-height: 1.7;">
        <strong>첨단에코길:</strong> 10km 구간<br>
        <strong>노을둘레길:</strong> 10km 구간<br>
        <strong>수변공간 코스:</strong> 24km 구간 (6·8공구호수~남측수로~11공구호수~북측수로)<br>
        <strong>편의시설:</strong> 공기주입기, 자전거 쉼터, 안내판 설치<br>
        <strong>추천 시간:</strong> 오후 3-6시 (가을 햇살과 단풍 감상)
      </p>
    </div>
    
    <div style="background: white; padding: 1.5rem; border-radius: 0.8rem; border: 1px solid #a7f3d0; box-shadow: 0 2px 8px rgba(16, 185, 129, 0.05);">
      <h4 style="color: #059669; margin: 0 0 0.8rem 0; font-size: 1.3rem;">🚵 송도 도심 MTB 코스 (고급자 전용)</h4>
      <p style="margin: 0; color: #374151; line-height: 1.7;">
        <strong>위치:</strong> 송도제1교~송도제2교 사이 1.5km 구간<br>
        <strong>총 거리:</strong> 왕복 3km<br>
        <strong>특징:</strong> 44개 종류의 다양한 코스<br>
        <strong>편의시설:</strong> 그늘막 쉼터, 화장실 완비<br>
        <strong>난이도:</strong> ★★★★☆ (고급 코스, 전문 장비 필요)
      </p>
    </div>
  </div>
  
  <div style="background: #f0fdf4; padding: 1.5rem; border-radius: 0.8rem; margin: 1.5rem 0; border-left: 3px solid #10b981;">
    <h4 style="color: #059669; margin: 0 0 0.8rem 0;">🆕 2025 자전거 특별 서비스</h4>
    <p style="margin: 0; color: #374151; line-height: 1.7;">
      <strong>공공자전거:</strong> 500대 공공자전거 운영 예정<br>
      <strong>자전거 스테이션:</strong> 7개소 설립<br>
      <strong>이동수리점:</strong> 현장 수리 서비스 제공<br>
      <strong>환경 우수:</strong> 미세먼지 적고 평탄한 지형으로 자전거 이용 최적
    </p>
  </div>
</div>

<h2 style="font-size: 2rem; color: #991b1b; border-left: 5px solid #dc2626; padding-left: 1rem; margin: 3rem 0 1.5rem 0; background: #fef2f2; padding: 1rem 1rem 1rem 2rem; border-radius: 0.5rem;">🍂 가을 맛집 & 따뜻한 간식</h2>

<div style="background: #fef7ed; padding: 2rem; border-radius: 1rem; margin: 2rem 0; box-shadow: 0 4px 15px rgba(234, 88, 12, 0.1);">
  <h3 style="color: #c2410c; margin: 0 0 1.5rem 0; font-size: 1.6rem;">🧊 가을 대표 따뜻한 간식</h3>
  
  <div style="display: grid; gap: 1.5rem; margin: 1rem 0;">
    <div style="background: white; padding: 1.5rem; border-radius: 0.8rem; border: 1px solid #fed7aa; box-shadow: 0 2px 8px rgba(234, 88, 12, 0.05);">
      <h4 style="color: #c2410c; margin: 0 0 0.8rem 0; font-size: 1.3rem;">🐟 송도붕어빵</h4>
      <p style="margin: 0; color: #374151; line-height: 1.7;">
        <strong>위치:</strong> 송도 전문 붕어빵 카페<br>
        <strong>메뉴:</strong> 피자 붕어빵(3,700원), 통모짜 붕어빵(3,500원)<br>
        <strong>특별메뉴:</strong> 고구마 붕어빵(3,000원), 슈크림 붕어빵(3,000원)<br>
        <strong>추천 시간:</strong> 오후 3-6시 (갓 구운 따뜻한 붕어빵)
      </p>
    </div>
    
    <div style="background: white; padding: 1.5rem; border-radius: 0.8rem; border: 1px solid #fed7aa; box-shadow: 0 2px 8px rgba(234, 88, 12, 0.05);">
      <h4 style="color: #c2410c; margin: 0 0 0.8rem 0; font-size: 1.3rem;">🍠 이지붕어빵</h4>
      <p style="margin: 0; color: #374151; line-height: 1.7;">
        <strong>특징:</strong> 이전 아트스페이스 이지 갤러리 카페에서 전환<br>
        <strong>분위기:</strong> 갤러리 카페 감성 + 따뜻한 붕어빵<br>
        <strong>추천:</strong> 예술적 분위기에서 즐기는 가을 간식<br>
        <strong>운영:</strong> 가을 시즌 따뜻한 간식 특화
      </p>
    </div>
    
    <div style="background: white; padding: 1.5rem; border-radius: 0.8rem; border: 1px solid #fed7aa; box-shadow: 0 2px 8px rgba(234, 88, 12, 0.05);">
      <h4 style="color: #c2410c; margin: 0 0 0.8rem 0; font-size: 1.3rem;">☕ 솔트스테인 (SALT STAIN)</h4>
      <p style="margin: 0; color: #374151; line-height: 1.7;">
        <strong>위치:</strong> 송도 베이커리 카페<br>
        <strong>특징:</strong> 송도 커피 마니아 사이에서 입소문 자자<br>
        <strong>메뉴:</strong> 붕어빵, 베이커리, 수준급 커피<br>
        <strong>평가:</strong> 쫀득하고 맛있는 붕어빵으로 유명
      </p>
    </div>
    
    <div style="background: white; padding: 1.5rem; border-radius: 0.8rem; border: 1px solid #fed7aa; box-shadow: 0 2px 8px rgba(234, 88, 12, 0.05);">
      <h4 style="color: #c2410c; margin: 0 0 0.8rem 0; font-size: 1.3rem;">🍪 드렁큰아이스 (글캠 푸르지오)</h4>
      <p style="margin: 0; color: #374151; line-height: 1.7;">
        <strong>위치:</strong> 송도 5공구 글로벌캠퍼스푸르지오 상가 1층<br>
        <strong>특징:</strong> 송도 5공구 '붕세권' (붕어빵 상권)<br>
        <strong>접근성:</strong> 아파트 단지 내 위치로 접근 용이<br>
        <strong>추천:</strong> 주민들이 즐겨 찾는 동네 간식
      </p>
    </div>
  </div>
  
  <div style="background: #fff7ed; padding: 1.5rem; border-radius: 0.8rem; margin: 1.5rem 0; border-left: 3px solid #ea580c;">
    <h4 style="color: #c2410c; margin: 0 0 0.8rem 0;">🍂 가을 간식 트렌드</h4>
    <p style="margin: 0; color: #374151; line-height: 1.7;">
      • 편의점에서도 호빵, 군고구마, 붕어빵 등 따뜻한 간식 인기<br>
      • 호떡, 호빵, 군고구마까지 다양한 겨울 간식 준비<br>
      • 붕어빵은 겨울철 대표 간식 자리 공고히 유지<br>
      • 가을 시즌에 맞춰 따뜻한 음료와 함께 즐기는 문화 확산
    </p>
  </div>
</div>

<h2 style="font-size: 2rem; color: #991b1b; border-left: 5px solid #dc2626; padding-left: 1rem; margin: 3rem 0 1.5rem 0; background: #fef2f2; padding: 1rem 1rem 1rem 2rem; border-radius: 0.5rem;">🎪 가을 축제 & 이벤트</h2>

<div style="display: grid; gap: 2rem; margin: 2rem 0;">
  <div style="background: #fef3c7; padding: 2rem; border-radius: 1rem; border-left: 4px solid #f59e0b; box-shadow: 0 4px 15px rgba(245, 158, 11, 0.1);">
    <h3 style="color: #d97706; margin: 0 0 1rem 0; font-size: 1.6rem;">🏃 2025 송도 마라톤 & 런닝 축제</h3>
    <p style="margin: 0; color: #374151; line-height: 1.8; font-size: 1.1rem;">
      <strong>예상 시기:</strong> 10월 ~ 11월 (단풍 절정 시기 연계)<br>
      <strong>코스:</strong> 센트럴파크 및 송도 일대<br>
      <strong>참가 종목:</strong> 5km, 10km, 하프마라톤<br>
      <strong>특징:</strong> 단풍길을 달리는 특별한 경험<br>
      <strong>참고:</strong> 2024년 10월 6일 인천대학교 송도캠퍼스에서 개최
    </p>
    <div style="margin: 1rem 0; padding: 1rem; background: #fffbeb; border-radius: 0.5rem; border-left: 3px solid #f59e0b;">
      <h4 style="color: #d97706; margin: 0 0 0.5rem 0;">🍂 가을 런닝 포인트</h4>
      <p style="margin: 0; color: #374151; font-size: 0.95rem;">
        • 단풍 명소를 지나는 특별한 코스<br>
        • 시원한 가을 바닷바람과 함께 달리기<br>
        • 센트럴파크 3.5km 순환 코스 활용<br>
        • 평탄한 지형으로 초보자도 참가 가능
      </p>
    </div>
  </div>
  
  <div style="background: #fef3c7; padding: 2rem; border-radius: 1rem; border-left: 4px solid #f59e0b; box-shadow: 0 4px 15px rgba(245, 158, 11, 0.1);">
    <h3 style="color: #d97706; margin: 0 0 1rem 0; font-size: 1.6rem;">🚴 가을 자전거 투어 이벤트</h3>
    <p style="margin: 0; color: #374151; line-height: 1.8; font-size: 1.1rem;">
      <strong>시기:</strong> 10월 ~ 11월 (단풍 시즌)<br>
      <strong>특징:</strong> 송도 3개 공원 가을 라이딩<br>
      <strong>추천 코스:</strong> 센트럴파크 → 달빛축제공원 → 해돋이공원<br>
      <strong>이용 시설:</strong> 500대 공공자전거, 7개 스테이션<br>
      <strong>서비스:</strong> 이동수리점, 현장 수리 서비스
    </p>
    <div style="margin: 1rem 0; padding: 1rem; background: #fffbeb; border-radius: 0.5rem; border-left: 3px solid #f59e0b;">
      <h4 style="color: #d97706; margin: 0 0 0.5rem 0;">🌿 가을 라이딩 추천 시간</h4>
      <p style="margin: 0; color: #374151; font-size: 0.95rem;">
        • 오후 3-6시 (가을 햇살과 단풍 감상 최적)<br>
        • 미세먼지 적고 평탄한 지형으로 최적 환경<br>
        • 24개 종류 다양한 코스 선택 가능<br>
        • 44개 종류 MTB 코스 (고급자 전용)
      </p>
    </div>
  </div>
</div>

<h2 style="font-size: 2rem; color: #991b1b; border-left: 5px solid #dc2626; padding-left: 1rem; margin: 3rem 0 1.5rem 0; background: #fef2f2; padding: 1rem 1rem 1rem 2rem; border-radius: 0.5rem;">📅 2025년 가을 월별 완벽 가이드</h2>

<div style="display: grid; gap: 2rem; margin: 2rem 0;">
  <div style="background: #fff7ed; padding: 2rem; border-radius: 1rem; border-left: 4px solid #f97316; box-shadow: 0 4px 15px rgba(249, 115, 22, 0.1);">
    <h3 style="color: #ea580c; margin: 0 0 1rem 0; font-size: 1.6rem;">🌾 9월 - 초가을 준비</h3>
    <ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
      <li><strong>날씨:</strong> 아직 따뜻하지만 선선한 바람 시작</li>
      <li><strong>활동:</strong> 자전거 투어 시작하기 좋은 시기</li>
      <li><strong>준비:</strong> 가을 옷 준비, 레이어링 의상</li>
      <li><strong>추천:</strong> 야외 활동 계획 수립</li>
      <li><strong>특징:</strong> 아직 무더위가 남아있어 수상활동도 가능</li>
    </ul>
  </div>
  
  <div style="background: #fff7ed; padding: 2rem; border-radius: 1rem; border-left: 4px solid #f97316; box-shadow: 0 4px 15px rgba(249, 115, 22, 0.1);">
    <h3 style="color: #ea580c; margin: 0 0 1rem 0; font-size: 1.6rem;">🍂 10월 - 단풍 절정</h3>
    <ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
      <li><strong>단풍 시작:</strong> 10월 둘째 주부터 단풍 시작</li>
      <li><strong>절정 시기:</strong> 10월 28일 ~ 11월 5일</li>
      <li><strong>추천 활동:</strong> 단풍 사진 촬영, 센트럴파크 산책</li>
      <li><strong>런닝 축제:</strong> 단풍길 마라톤 대회 개최 예정</li>
      <li><strong>간식:</strong> 따뜻한 붕어빵, 호빵 시즌 시작</li>
    </ul>
  </div>
  
  <div style="background: #fff7ed; padding: 2rem; border-radius: 1rem; border-left: 4px solid #f97316; box-shadow: 0 4px 15px rgba(249, 115, 22, 0.1);">
    <h3 style="color: #ea580c; margin: 0 0 1rem 0; font-size: 1.6rem;">🍁 11월 - 가을 마무리</h3>
    <ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
      <li><strong>단풍 절정:</strong> 11월 첫째 주까지 단풍 절정</li>
      <li><strong>낙엽 시작:</strong> 11월 첫째 주~둘째 주 낙엽 시작</li>
      <li><strong>추천 활동:</strong> 낙엽 밟기, ASMR 소리 감상</li>
      <li><strong>준비:</strong> 겨울 의류 준비, 따뜻한 음료 필수</li>
      <li><strong>특징:</strong> 일교차 심해짐, 레이어링 의상 필수</li>
    </ul>
  </div>
</div>

<h2 style="font-size: 2rem; color: #991b1b; border-left: 5px solid #dc2626; padding-left: 1rem; margin: 3rem 0 1.5rem 0; background: #fef2f2; padding: 1rem 1rem 1rem 2rem; border-radius: 0.5rem;">🎯 2025년 단풍 절정 타이밍 (기후변화 반영)</h2>

<div style="background: #fef2f2; padding: 1.5rem; border-radius: 1rem; border: 2px solid #dc2626;">
  <h3 style="color: #991b1b; margin: 0 0 1rem 0;">🍂 10월 - 단풍 절정</h3>
  <ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.6;">
    <li><strong>첫 단풍:</strong> 10월 둘째 주 (평년 대비 늦음)</li>
    <li><strong>절정 시기:</strong> 10월 28일 ~ 11월 5일 (참나무류, 단풍나무류 기준)</li>
    <li><strong>은행나무:</strong> 10월 31일 절정 예상</li>
    <li><strong>낙엽 시작:</strong> 11월 첫째 주 ~ 둘째 주</li>
    <li><strong>기후 특징:</strong> 매년 0.33일씩 단풍 시기가 늦어지는 추세</li>
  </ul>
</div>

<div style="background: #fef3c7; padding: 1.5rem; border-radius: 1rem; border: 2px solid #f59e0b; margin: 2rem 0;">
  <h3 style="color: #92400e; margin: 0 0 1rem 0;">💡 가을 방문 꿀팁</h3>
  <ul style="margin: 0; padding-left: 1.5rem; color: #92400e; line-height: 1.6;">
    <li><strong>단풍 최적 시간:</strong> 오전 9-10시, 오후 4-5시 (골든아워)</li>
    <li><strong>자전거 대여:</strong> 공공자전거 500대 운영, 7개 스테이션</li>
    <li><strong>복장:</strong> 10-15°C 일교차, 레이어링 필수</li>
    <li><strong>건조함 대비:</strong> 충분한 수분 섭취, 보습제 사용</li>
    <li><strong>교통:</strong> 지하철 1호선 센트럴파크역, 인천2호선 달빛축제공원역</li>
  </ul>
</div>

<div style="text-align: center; background: #f3f4f6; padding: 1.5rem; border-radius: 1rem; margin: 2rem 0;">
  <p style="margin: 0; font-size: 0.9rem; color: #6b7280;">본 가이드는 2025년 7월 기준으로 최신 정보로 업데이트되었습니다. 기상 상황이나 행사 일정은 변경될 수 있으니 방문 전 공식 홈페이지를 확인하시기 바랍니다.</p>
</div>

</div>`,

  'songdo-winter-guide': `<div style="max-width: 100%; margin: 0 auto; line-height: 1.8; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">

<h1 style="font-size: 2.5rem; color: #2563eb; text-align: center; margin-bottom: 1rem; border-bottom: 3px solid #60a5fa; padding-bottom: 1rem;">❄️ 송도 겨울 완벽 가이드</h1>

<div style="text-align: center; background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); color: white; padding: 1.5rem; border-radius: 1rem; margin: 2rem 0; box-shadow: 0 8px 25px rgba(37, 99, 235, 0.3);">
  <h2 style="margin: 0; font-size: 1.5rem;">따뜻한 실내 공간과 시원한 바닷바람이 조화를 이루는 특별한 계절 ❄️</h2>
  <p style="margin: 0.5rem 0 0 0; font-size: 1.1rem; opacity: 0.9;">12월부터 2월까지 추위를 피해 즐길 수 있는 실내 활동부터 겨울만의 독특한 매력까지, 송도 겨울을 완벽하게 즐기는 가이드를 준비했습니다.</p>
  <p style="margin: 0.5rem 0 0 0; font-size: 0.9rem; opacity: 0.8;">최종 업데이트: 2025년 7월</p>
</div>

<h2 style="font-size: 2rem; color: #1e40af; border-left: 5px solid #2563eb; padding-left: 1rem; margin: 3rem 0 1.5rem 0; background: #eff6ff; padding: 1rem 1rem 1rem 2rem; border-radius: 0.5rem;">🔥 송도 겨울 실내 명소 TOP 5</h2>

<div style="display: grid; gap: 1.5rem;">
  <div style="background: #fef3c7; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #f59e0b;">
    <h3 style="color: #d97706; margin: 0 0 1rem 0;">🛍️ 현대프리미엄아울렛 송도점 2025</h3>
    <p style="margin: 0; color: #374151; line-height: 1.6;">
      <strong>특징:</strong> 송도 첫 도심형 프리미엄 아울렛, 완벽한 실내 난방<br>
      <strong>운영시간:</strong> 평일/주말 10:30-21:00, 식당가 10:30-21:00<br>
      <strong>브랜드:</strong> 보테가 베네타, 몽클레르, 페라가모, 아르마니 등<br>
      <strong>연결성:</strong> 트리플스트리트와 지하 연결, 테크노파크역과 지하 통로 연결
    </p>
    <h4 style="color: #d97706; margin: 1rem 0 0.5rem 0;">🛒 겨울 쇼핑 포인트</h4>
    <ul style="margin: 0; padding-left: 1.5rem; color: #374151;">
      <li><strong>겨울 의류:</strong> 코트, 패딩, 니트 특가 행사</li>
      <li><strong>할인:</strong> 연중 30-70% 할인, 겨울 세일 특가</li>
      <li><strong>체험형 공간:</strong> 고객 체험을 위한 새로운 공간</li>
      <li><strong>유아휴게실:</strong> 어린이 대동 가족을 위한 시설 완비</li>
    </ul>
  </div>
  
  <div style="background: #fef3c7; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #f59e0b;">
    <h3 style="color: #d97706; margin: 0 0 1rem 0;">🎬 트리플스트리트 2025 업데이트</h3>
    <p style="margin: 0; color: #374151; line-height: 1.6;">
      <strong>특징:</strong> 스트리트형 복합쇼핑몰, 도심 속 놀이터<br>
      <strong>영업시간:</strong> 매일 10:30 ~ 22:00 (365일 연중무휴)<br>
      <strong>실내 온도:</strong> 연중 쾌적한 22-24°C 유지<br>
      <strong>주차:</strong> 무료 주차 가능<br>
      <strong>연결성:</strong> 현대아울렛과 지하 연결
    </p>
    <h4 style="color: #d97706; margin: 1rem 0 0.5rem 0;">🎯 2025년 겨울 즐길거리</h4>
    <ul style="margin: 0; padding-left: 1.5rem; color: #374151;">
      <li><strong>무신사 스탠다드:</strong> 1-2층 330평 대형 매장 (새로 오픈)</li>
      <li><strong>CGV 송도타임스페이스:</strong> 7개관, 212석~58석 규모</li>
      <li><strong>게임존:</strong> 오락실, VR체험, 볼링장</li>
      <li><strong>키즈카페:</strong> 어린이 놀이공간, 실내 놀이터</li>
    </ul>
  </div>
  
  <div style="background: #fef3c7; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #f59e0b;">
    <h3 style="color: #d97706; margin: 0 0 1rem 0;">🛁 송해온 (2025 업데이트)</h3>
    <p style="margin: 0; color: #374151; line-height: 1.6;">
      <strong>특징:</strong> 지하 993m 고농도 중성 온천수 (pH 6.94)<br>
      <strong>위치:</strong> 인천 연수구 송도국제도시<br>
      <strong>운영시간:</strong> 매일 06:00 ~ 22:00<br>
      <strong>요금:</strong> 1인당 약 23,000원 (2025년 기준)<br>
      <strong>특별함:</strong> 미네랄 함유량 20,000mg/L 이상의 초고장성 해수온천<br>
      <strong>공식 웹사이트:</strong> songhaeon.com
    </p>
    <h4 style="color: #d97706; margin: 1rem 0 0.5rem 0;">♨️ 온천 체험 2025</h4>
    <ul style="margin: 0; padding-left: 1.5rem; color: #374151;">
      <li><strong>온천수:</strong> 다량의 미네랄 함유 천연 온천</li>
      <li><strong>사우나:</strong> 다양한 테마 사우나실</li>
      <li><strong>찜질방:</strong> 24시간 이용 가능한 휴식 공간</li>
      <li><strong>추천:</strong> 겨울철 실내 온천 및 찜질 시설로 최적</li>
    </ul>
  </div>
  
  <div style="background: #fef3c7; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #f59e0b;">
    <h3 style="color: #d97706; margin: 0 0 1rem 0;">🏛️ G타워 전망대 2025 업데이트</h3>
    <p style="margin: 0; color: #374151; line-height: 1.6;">
      <strong>층수:</strong> 33층 IFEZ 홍보관<br>
      <strong>입장료:</strong> 무료<br>
      <strong>운영시간:</strong> 평일 10:00-21:00 (입장마감 20:30), 주말 13:00-21:00<br>
      <strong>휴무일:</strong> 월요일, 설날 연휴<br>
      <strong>예약:</strong> 10인 이상 시 온라인 예약 필수<br>
      <strong>카페:</strong> 따뜻한 음료와 함께 겨울 바다 조망
    </p>
  </div>
</div>

<h2 style="font-size: 2rem; color: #1e40af; border-left: 5px solid #2563eb; padding-left: 1rem; margin: 3rem 0 1.5rem 0; background: #eff6ff; padding: 1rem 1rem 1rem 2rem; border-radius: 0.5rem;">🧸️ 실내 키즈카페 & 놀이시설 2025</h2>

<div style="display: grid; gap: 1.5rem;">
  <div style="background: #fef2f8; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #ec4899;">
    <h3 style="color: #be185d; margin: 0 0 1rem 0;">상상체험 키즈월드</h3>
    <ul style="margin: 0; padding-left: 1.5rem; color: #374151;">
      <li><strong>특징:</strong> 대형 실내 키즈카페</li>
      <li><strong>운영시간:</strong> 10:30 ~ 16:30</li>
      <li><strong>시설:</strong> 전천후 실내 놀이시설</li>
    </ul>
  </div>
  
  <div style="background: #fef2f8; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #ec4899;">
    <h3 style="color: #be185d; margin: 0 0 1rem 0;">아틀란티스 송도점</h3>
    <ul style="margin: 0; padding-left: 1.5rem; color: #374151;">
      <li><strong>위치:</strong> 아라플라자 5층</li>
      <li><strong>운영시간:</strong> 11:00 ~ 19:30</li>
      <li><strong>요금:</strong> 성인 10,000원, 어린이 35,000원 (종일권)</li>
      <li><strong>오후 할인:</strong> 15:30 이후 성인 5,000원, 어린이 25,000원</li>
      <li><strong>시설:</strong> 대형 정글짐, 튜브 슬라이드, 수영장, 미니 어항</li>
    </ul>
  </div>
  
  <div style="background: #fef2f8; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #ec4899;">
    <h3 style="color: #be185d; margin: 0 0 1rem 0;">연수 꿈빛나래 키즈카페</h3>
    <ul style="margin: 0; padding-left: 1.5rem; color: #374151;">
      <li><strong>위치:</strong> 송도5동 행정복지센터 2층</li>
      <li><strong>대상:</strong> 3-12세 (2013-2022년생)</li>
      <li><strong>운영:</strong> 화~일요일 (월요일 휴무)</li>
      <li><strong>예약:</strong> 네이버 플레이스 사전 예약</li>
    </ul>
  </div>
  
  <div style="background: #fef2f8; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #ec4899;">
    <h3 style="color: #be185d; margin: 0 0 1rem 0;">아이사랑꿈터</h3>
    <ul style="margin: 0; padding-left: 1.5rem; color: #374151;">
      <li><strong>요금:</strong> 2시간 1,000원 (저렴한 이용료)</li>
      <li><strong>위치:</strong> 송도문화로28번길 28</li>
    </ul>
  </div>
</div>

<h2 style="font-size: 2rem; color: #1e40af; border-left: 5px solid #2563eb; padding-left: 1rem; margin: 3rem 0 1.5rem 0; background: #eff6ff; padding: 1rem 1rem 1rem 2rem; border-radius: 0.5rem;">🎄 2025년 겨울 이벤트 & 축제</h2>

<div style="display: grid; gap: 1.5rem;">
  <div style="background: #ecfdf5; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #10b981;">
    <h3 style="color: #059669; margin: 0 0 1rem 0;">정기 축제</h3>
    <ul style="margin: 0; padding-left: 1.5rem; color: #374151;">
      <li><strong>송도맥주축제:</strong> 제15회 개최 예정 (2025년)</li>
      <li><strong>송도달빛축제공원:</strong> 연중 다양한 계절 이벤트</li>
    </ul>
  </div>
  
  <div style="background: #ecfdf5; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #10b981;">
    <h3 style="color: #059669; margin: 0 0 1rem 0;">크리스마스 이벤트</h3>
    <ul style="margin: 0; padding-left: 1.5rem; color: #374151;">
      <li><strong>센트럴파크:</strong> 크리스마스 장식 및 조명</li>
      <li><strong>송도센트럴파크:</strong> "숲파티포레" 크리스마스 이벤트</li>
    </ul>
  </div>
  
  <div style="background: #ecfdf5; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #10b981;">
    <h3 style="color: #059669; margin: 0 0 1rem 0;">야간 추천</h3>
    <ul style="margin: 0; padding-left: 1.5rem; color: #374151;">
      <li><strong>센트럴파크 야간 조명:</strong> 조형물, 다리, 건물 조명</li>
      <li><strong>계절별 테마 장식:</strong> 다양한 테마의 야간 장식</li>
    </ul>
  </div>
</div>

<div style="background: #dbeafe; padding: 1.5rem; border-radius: 1rem; border: 2px solid #2563eb; margin: 2rem 0;">
  <h3 style="color: #1e40af; margin: 0 0 1rem 0;">💡 겨울철 이용 팁</h3>
  <ol style="margin: 0; padding-left: 1.5rem; color: #1e40af; line-height: 1.6;">
    <li><strong>실내 시설 적극 활용:</strong> 트리플스트리트 지하 공간, 키즈카페 등</li>
    <li><strong>복장:</strong> 키즈카페 이용 시 미끄럼 방지 양말 필수</li>
    <li><strong>주차:</strong> 대부분 시설에서 무료 주차 제공</li>
    <li><strong>예약:</strong> 인기 시설은 사전 예약 권장</li>
    <li><strong>연계 이용:</strong> 트리플스트리트-현대아울렛 지하 연결 활용</li>
  </ol>
</div>

<h2 style="font-size: 2rem; color: #1e40af; border-left: 5px solid #2563eb; padding-left: 1rem; margin: 3rem 0 1.5rem 0; background: #eff6ff; padding: 1rem 1rem 1rem 2rem; border-radius: 0.5rem;">📝 2025년 업데이트 정보</h2>

<div style="display: grid; gap: 1.5rem;">
  <div style="background: #f0f9ff; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #0ea5e9;">
    <h3 style="color: #0369a1; margin: 0 0 1rem 0;">📱 최신 정보 확인처</h3>
    <ul style="margin: 0; padding-left: 1.5rem; color: #374151;">
      <li><strong>송해온 공식:</strong> songhaeon.com</li>
      <li><strong>트리플스트리트:</strong> 방문 전 사전 확인</li>
      <li><strong>CGV 송도:</strong> 1544-1122</li>
      <li><strong>송도스포츠파크:</strong> 032-899-4863</li>
      <li><strong>G타워 전망대:</strong> 10인 이상 시 온라인 예약 필수</li>
    </ul>
  </div>
  
  <div style="background: #f0f9ff; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #0ea5e9;">
    <h3 style="color: #0369a1; margin: 0 0 1rem 0;">⚠️ 주의사항</h3>
    <ul style="margin: 0; padding-left: 1.5rem; color: #374151;">
      <li><strong>예약:</strong> 인기 시설은 사전 예약 권장</li>
      <li><strong>복장:</strong> 키즈카페 이용 시 미끄럼 방지 양말 필수</li>
      <li><strong>주차:</strong> 대부분 시설에서 무료 주차 제공</li>
      <li><strong>연계 이용:</strong> 트리플스트리트-현대아울렛 지하 연결 활용</li>
    </ul>
  </div>
</div>

<div style="text-align: center; background: #f3f4f6; padding: 1.5rem; border-radius: 1rem; margin: 2rem 0;">
  <p style="margin: 0; font-size: 0.9rem; color: #6b7280;">본 가이드는 2025년 최신 정보로 업데이트되었으며, 기상 상황이나 시설 운영 상황에 따라 변경될 수 있으니 방문 전 각 시설의 공식 홈페이지나 전화로 확인해주세요.</p>
</div>

</div>`,
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
  ,
  'songdo-education-guide': `<div style="max-width: 100%; margin: 0 auto; line-height: 1.8; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">

<h1 style="font-size: 2.5rem; color: #3b82f6; text-align: center; margin-bottom: 1rem; border-bottom: 3px solid #60a5fa; padding-bottom: 1rem;">🎓 송도 교육 완벽 가이드</h1>

<div style="text-align: center; background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; padding: 1.5rem; border-radius: 1rem; margin: 2rem 0; box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3);">
  <h2 style="margin: 0; font-size: 1.5rem;">송도국제도시는 대한민국 최고의 국제교육 허브입니다 ✨</h2>
  <p style="margin: 0.5rem 0 0 0; font-size: 1.1rem; opacity: 0.9;">채드윅 국제학교를 비롯한 세계적 수준의 교육기관과 우수한 학군으로 자녀 교육을 중시하는 가정들의 1순위 선택지입니다.</p>
  <p style="margin: 0.5rem 0 0 0; font-size: 0.9rem; opacity: 0.8;">최종 업데이트: 2025년 7월</p>
  <p style="margin: 0.5rem 0 0 0; font-size: 0.9rem; opacity: 0.8;">🚨 2025년 9월 송도국제학교 신규 개교 | 과밀학급 해소를 위한 추가 학교 건립 계획</p>
</div>

<h2 style="font-size: 2rem; color: #059669; border-left: 5px solid #10b981; padding-left: 1rem; margin: 3rem 0 1.5rem 0; background: #ecfdf5; padding: 1rem 1rem 1rem 2rem; border-radius: 0.5rem;">🌍 송도만의 특별한 교육 환경</h2>

<div style="display: grid; gap: 1.5rem;">
  <div style="background: #f0fdfa; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #14b8a6;">
    <h3 style="color: #0f766e; margin: 0 0 1rem 0;">국제교육의 메카</h3>
    <ul style="margin: 0; color: #374151; line-height: 1.6;">
      <li><strong>3개 국제학교 운영</strong>: 채드윅, CMIS, 송도국제학교 (2025년 신규)</li>
      <li><strong>IB 교육</strong>: 전 과정 IB 인증받은 채드윅 국제학교</li>
      <li><strong>특성화 교육</strong>: 바이오·AI 특성화 송도국제학교</li>
      <li><strong>글로벌 환경</strong>: 다국적 거주민들과 함께하는 자연스러운 국제교육</li>
      <li><strong>영어 몰입</strong>: 일상생활에서 영어 사용 기회 풍부</li>
    </ul>
    <div style="margin: 1rem 0; padding: 1rem; background: #ecfdf5; border-radius: 0.5rem; border-left: 3px solid #10b981;">
      <h4 style="color: #065f46; margin: 0 0 0.5rem 0;">🆕 2025년 9월 송도국제학교 개교</h4>
      <p style="margin: 0; color: #374151; font-size: 0.95rem;">
        <strong>위치:</strong> 재능대학교 송도캠퍼스 부지<br>
        <strong>모집 대상:</strong> 6학년~10학년 120명<br>
        <strong>특성화 분야:</strong> 바이오, 인공지능(AI), 메디컬, 간호학<br>
        <strong>특별 시설:</strong> 셀트리온 기증 최고급 바이오랩<br>
        <strong>교육 연계:</strong> 재능대 바이오학과 공동 활용 프로그램<br>
        <strong>대학 연계:</strong> 조지 메이슨대·유타대 듀얼 인롤먼트 시스템<br>
        <strong>초대 교장:</strong> 크리스 윤 박사 (5차례 국제학교 설립 경험)<br>
        <strong>학비:</strong> 중학생 2,600만원, 고등학생 2,800만원<br>
        <strong>기숙사:</strong> 2인 1실 기숙사 운영 (전국 단위 학생 모집)
      </p>
    </div>
  </div>
  <div style="background: #f0fdfa; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #14b8a6;">
    <h3 style="color: #0f766e; margin: 0 0 1rem 0;">우수한 학군 시스템</h3>
    <ul style="margin: 0; color: #374151; line-height: 1.6;">
      <li><strong>전국 상위권</strong>: 인천신정중학교 44% 특목고 진학률</li>
      <li><strong>명문 학군</strong>: 목동·강남 수준의 학업성취도</li>
      <li><strong>교육 열기</strong>: 높은 학부모 교육 관심도</li>
      <li><strong>과밀학급 해소</strong>: 국제업무단지 내 4개 신규 학교 건립 계획 (2029년 개교 목표)</li>
    </ul>
    <div style="margin: 1rem 0; padding: 1rem; background: #fef3c7; border-radius: 0.5rem; border-left: 3px solid #f59e0b;">
      <h4 style="color: #d97706; margin: 0 0 0.5rem 0;">⚠️ 과밀학급 해소 계획 (2025년 기준)</h4>
      <p style="margin: 0; color: #374151; font-size: 0.95rem;">
        <strong>신규 학교 건립 계획:</strong> 국제업무단지 내 4개 학교 신설<br>
        <strong>구성:</strong> 유치원 1개소, 초등학교 2개소, 중학교 1개소<br>
        <strong>개교 목표:</strong> 2029년 3월 (중학교 기준)<br>
        <strong>교육환경평가:</strong> 통과 완료 (2024년 11월)<br>
        <strong>현재 상황:</strong> 중앙투자심사 대기 중 (2025년 상반기)
      </p>
    </div>
    </div>
    <div style="margin: 1rem 0; padding: 1rem; background: #ecfdf5; border-radius: 0.5rem; border-left: 3px solid #10b981;">
      <h4 style="color: #065f46; margin: 0 0 0.5rem 0;">🏗️ 신규 학교 건립 계획 (국제업무단지 내)</h4>
      <p style="margin: 0; color: #374151; font-size: 0.95rem;">
        <strong>1공구:</strong> 유치원 1개소, 초등학교 1개소, 중학교 1개소<br>
        <strong>3공구:</strong> 초등학교 1개소<br>
        <strong>국제업무단지 중학교:</strong> 2029년 3월 개교 예정<br>
        <strong>고등학교 이전:</strong> 명신여고, 인일여고, 제일고등학교 이전 계획
      </p>
    </div>
  </div>
</div>

<h2 style="font-size: 2rem; color: #dc2626; border-left: 5px solid #ef4444; padding-left: 1rem; margin: 3rem 0 1.5rem 0; background: #fef2f2; padding: 1rem 1rem 1rem 2rem; border-radius: 0.5rem;">🎓 연령대별 교육 가이드</h2>

<div style="display: grid; gap: 2rem;">
  <div style="background: #fffbeb; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #f59e0b;">
    <h3 style="color: #d97706; margin: 0 0 1rem 0;">👶 영유아 교육 (0-6세)</h3>
    <div style="margin: 1rem 0;">
      <h4 style="color: #b45309; margin: 0 0 0.5rem 0;">국공립 어린이집 & 유치원</h4>
      <ul style="margin: 0; color: #374151; line-height: 1.6;">
        <li><strong>국공립송도에듀포레푸르지오어린이집</strong>: 2022년 개원, 33명 정원</li>
        <li><strong>구립송도국제어린이집</strong>: 2015년 개원, 33명 정원</li>
        <li><strong>인천송도꿈유치원</strong>: 2021년 개원, 306명 규모</li>
      </ul>
    </div>
    <div style="margin: 1rem 0;">
      <h4 style="color: #b45309; margin: 0 0 0.5rem 0;">영어유치원 & 국제교육</h4>
      <ul style="margin: 0; color: #374151; line-height: 1.6;">
        <li><strong>채드윅 유치원</strong>: 연 3,804만원, 100:1 경쟁률</li>
        <li><strong>CMIS 유치원</strong>: 연 1,900만원</li>
        <li><strong>영어유치원</strong>: 다양한 민간 영어유치원 운영</li>
      </ul>
    </div>
  </div>

  <div style="background: #eff6ff; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #3b82f6;">
    <h3 style="color: #1d4ed8; margin: 0 0 1rem 0;">🎒 초등교육 (7-12세)</h3>
    <div style="margin: 1rem 0;">
      <h4 style="color: #1e40af; margin: 0 0 0.5rem 0;">주요 초등학교</h4>
      <ul style="margin: 0; color: #374151; line-height: 1.6;">
        <li><strong>인천신정초등학교</strong>: 송도 1공구 대표 학교</li>
        <li><strong>인천명선초등학교</strong>: 우수한 교육과정</li>
        <li><strong>인천연송초등학교</strong>: 신설 학교, 최신 시설</li>
        <li><strong>인천연성초등학교</strong>: 연수구 소재 공립학교</li>
      </ul>
    </div>
    <div style="margin: 1rem 0;">
      <h4 style="color: #1e40af; margin: 0 0 0.5rem 0;">특색 프로그램</h4>
      <ul style="margin: 0; color: #374151; line-height: 1.6;">
        <li><strong>원어민 교사</strong>: EPIK 프로그램을 통한 원어민 영어수업</li>
        <li><strong>방과후 교실</strong>: 늘봄학교 프로그램 운영</li>
        <li><strong>돌봄교실</strong>: 맞벌이 가정 지원 시스템</li>
      </ul>
    </div>
  </div>

  <div style="background: #fef3f2; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #ef4444;">
    <h3 style="color: #dc2626; margin: 0 0 1rem 0;">📚 중등교육 (13-15세)</h3>
    <div style="margin: 1rem 0;">
      <h4 style="color: #b91c1c; margin: 0 0 0.5rem 0;">주요 중학교</h4>
      <ul style="margin: 0; color: #374151; line-height: 1.6;">
        <li><strong>인천신정중학교</strong>: 44% 특목고 진학률, 과밀학급 이슈</li>
        <li><strong>송도중학교</strong>: 인천 송도 지역 대표 중학교</li>
      </ul>
    </div>
    <div style="margin: 1rem 0;">
      <h4 style="color: #b91c1c; margin: 0 0 0.5rem 0;">진학 실적</h4>
      <ul style="margin: 0; color: #374151; line-height: 1.6;">
        <li><strong>특목고 진학률</strong>: 신정중 44% (일반고 462명, 특목고 363명)</li>
        <li><strong>자유학구제</strong>: 연수구 내 중학교 선택 가능</li>
        <li><strong>전국 상위</strong>: 목동·강남 수준 학업성취도</li>
      </ul>
    </div>
  </div>
</div>

<h2 style="font-size: 2rem; color: #7c2d12; border-left: 5px solid #ea580c; padding-left: 1rem; margin: 3rem 0 1.5rem 0; background: #fff7ed; padding: 1rem 1rem 1rem 2rem; border-radius: 0.5rem;">🌟 송도 국제학교 완벽 분석</h2>

<div style="display: grid; gap: 2rem;">
  <div style="background: #fffbeb; padding: 2rem; border-radius: 1rem; border: 2px solid #f59e0b;">
    <h3 style="color: #d97706; margin: 0 0 1.5rem 0; font-size: 1.5rem;">채드윅 송도 국제학교</h3>
    
    <div style="display: grid; gap: 1rem;">
      <div style="background: #fef3c7; padding: 1rem; border-radius: 0.5rem;">
        <h4 style="color: #92400e; margin: 0 0 0.5rem 0;">기본 정보</h4>
        <ul style="margin: 0; color: #374151; line-height: 1.6;">
          <li><strong>개교</strong>: 2010년 (대한민국 2번째 외국교육기관)</li>
          <li><strong>교육과정</strong>: 미국 교육과정 + IB 4개 과정 모두 제공</li>
          <li><strong>학년</strong>: Pre-K ~ Grade 12</li>
          <li><strong>인가</strong>: 교육부 공식인가, 양국 학력 인정</li>
        </ul>
      </div>
      
      <div style="background: #fef3c7; padding: 1rem; border-radius: 0.5rem;">
        <h4 style="color: #92400e; margin: 0 0 0.5rem 0;">학비 & 경쟁률</h4>
        <ul style="margin: 0; color: #374151; line-height: 1.6;">
          <li><strong>유치원</strong>: 연 3,804만원</li>
          <li><strong>중학생</strong>: 연 4,089만원</li>
          <li><strong>고등학생</strong>: 연 4,476만원</li>
          <li><strong>전체 비용</strong>: 12년 총 5억 6,799만원</li>
          <li><strong>경쟁률</strong>: 내국인 쿼터 100:1 이상</li>
        </ul>
      </div>
    </div>
  </div>

  <div style="background: #f0f9ff; padding: 2rem; border-radius: 1rem; border: 2px solid #0ea5e9;">
    <h3 style="color: #0369a1; margin: 0 0 1.5rem 0; font-size: 1.5rem;">CMIS (칼빈매니토바 국제학교)</h3>
    
    <div style="display: grid; gap: 1rem;">
      <div style="background: #e0f2fe; padding: 1rem; border-radius: 0.5rem;">
        <h4 style="color: #0c4a6e; margin: 0 0 0.5rem 0;">기본 정보</h4>
        <ul style="margin: 0; color: #374151; line-height: 1.6;">
          <li><strong>인가</strong>: 2023년 송도에서 정식 인가</li>
          <li><strong>교육과정</strong>: 캐나다 매니토바주 공립교육과정</li>
          <li><strong>특징</strong>: AP 사립국제학교</li>
        </ul>
      </div>
      
      <div style="background: #e0f2fe; padding: 1rem; border-radius: 0.5rem;">
        <h4 style="color: #0c4a6e; margin: 0 0 0.5rem 0;">학비 비교</h4>
        <ul style="margin: 0; color: #374151; line-height: 1.6;">
          <li><strong>유치원</strong>: 1,900만원 (채드윅의 절반 수준)</li>
          <li><strong>초등학교</strong>: 2,100만원</li>
          <li><strong>중학교</strong>: 2,350만원</li>
          <li><strong>고등학교</strong>: 2,600만원</li>
        </ul>
      </div>
    </div>
  </div>
</div>

<h2 style="font-size: 2rem; color: #9333ea; border-left: 5px solid #a855f7; padding-left: 1rem; margin: 3rem 0 1.5rem 0; background: #faf5ff; padding: 1rem 1rem 1rem 2rem; border-radius: 0.5rem;">💰 교육비 가이드 & 예산 계획</h2>

<div style="display: grid; gap: 1.5rem;">
  <div style="background: #f5f3ff; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #9333ea;">
    <h3 style="color: #7e22ce; margin: 0 0 1rem 0;">국제학교 교육비</h3>
    <div style="background: #e9d5ff; padding: 1rem; border-radius: 0.5rem; margin: 1rem 0;">
      <h4 style="color: #6b21a8; margin: 0 0 0.5rem 0;">채드윅 국제학교 (12년 총 비용)</h4>
      <ul style="margin: 0; color: #374151; line-height: 1.6;">
        <li>유치원 (3년): 1억 1,412만원</li>
        <li>초등학교 (6년): 2억 2,824만원</li>
        <li>중학교 (3년): 1억 2,267만원</li>
        <li>고등학교 (3년): 1억 3,428만원</li>
        <li><strong>총 합계: 5억 9,931만원</strong></li>
      </ul>
    </div>
    <div style="background: #e9d5ff; padding: 1rem; border-radius: 0.5rem;">
      <h4 style="color: #6b21a8; margin: 0 0 0.5rem 0;">CMIS (12년 총 비용)</h4>
      <ul style="margin: 0; color: #374151; line-height: 1.6;">
        <li>유치원 (3년): 5,700만원</li>
        <li>초등학교 (6년): 1억 2,600만원</li>
        <li>중학교 (3년): 7,050만원</li>
        <li>고등학교 (3년): 7,800만원</li>
        <li><strong>총 합계: 3억 3,150만원</strong></li>
      </ul>
    </div>
  </div>
  
  <div style="background: #f5f3ff; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #9333ea;">
    <h3 style="color: #7e22ce; margin: 0 0 1rem 0;">일반 사교육비 예상</h3>
    <div style="background: #e9d5ff; padding: 1rem; border-radius: 0.5rem;">
      <h4 style="color: #6b21a8; margin: 0 0 0.5rem 0;">월 평균 사교육비 (송도 추정)</h4>
      <ul style="margin: 0; color: #374151; line-height: 1.6;">
        <li><strong>초등학생</strong>: 50-70만원</li>
        <li><strong>중학생</strong>: 60-80만원</li>
        <li><strong>고등학생</strong>: 70-90만원</li>
      </ul>
    </div>
  </div>
</div>

<h2 style="font-size: 2rem; color: #0891b2; border-left: 5px solid #06b6d4; padding-left: 1rem; margin: 3rem 0 1.5rem 0; background: #f0fdfa; padding: 1rem 1rem 1rem 2rem; border-radius: 0.5rem;">🎯 학부모 FAQ</h2>

<div style="display: grid; gap: 1.5rem;">
  <div style="background: #f0fdfa; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #06b6d4;">
    <h3 style="color: #0e7490; margin: 0 0 1rem 0;">Q1. 송도로 이사 시 전학 절차는?</h3>
    <div style="color: #374151; line-height: 1.6;">
      <strong>A.</strong>
      <ol style="margin: 0.5rem 0 0 1rem; padding-left: 1rem;">
        <li>거주지 이전 확인서류 준비</li>
        <li>재적 학교에서 전학 신청</li>
        <li>인천교육청에서 배정받기</li>
        <li>배정일로부터 7일 내 등록</li>
      </ol>
    </div>
  </div>
  
  <div style="background: #f0fdfa; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #06b6d4;">
    <h3 style="color: #0e7490; margin: 0 0 1rem 0;">Q2. 송도 국제학교 입학은 어떻게?</h3>
    <div style="color: #374151; line-height: 1.6;">
      <strong>A.</strong>
      <ul style="margin: 0.5rem 0 0 1rem; padding-left: 1rem;">
        <li><strong>채드윅</strong>: 매년 입학설명회 → 원서접수 → 입학시험 → 면접</li>
        <li><strong>경쟁률</strong>: 100:1 이상, 조기 준비 필수</li>
        <li><strong>자격</strong>: 내국인 40% 쿼터, 해외거주 조건 없음</li>
      </ul>
    </div>
  </div>

  <div style="background: #f0fdfa; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #06b6d4;">
    <h3 style="color: #0e7490; margin: 0 0 1rem 0;">Q3. 송도 학군이 정말 좋나요?</h3>
    <div style="color: #374151; line-height: 1.6;">
      <strong>A.</strong>
      <ul style="margin: 0.5rem 0 0 1rem; padding-left: 1rem;">
        <li><strong>전국 상위권</strong>: 신정중 44% 특목고 진학률</li>
        <li><strong>목동·강남 수준</strong>: 비슷한 학업성취도</li>
        <li><strong>국제교육</strong>: 타 지역 대비 압도적 우위</li>
      </ul>
    </div>
  </div>
</div>

<h2 style="font-size: 2rem; color: #dc2626; border-left: 5px solid #ef4444; padding-left: 1rem; margin: 3rem 0 1.5rem 0; background: #fef2f2; padding: 1rem 1rem 1rem 2rem; border-radius: 0.5rem;">📞 유용한 연락처</h2>

<div style="display: grid; gap: 1.5rem;">
  <div style="background: #fef2f2; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #ef4444;">
    <h3 style="color: #dc2626; margin: 0 0 1rem 0;">교육청 및 관련 기관</h3>
    <ul style="margin: 0; color: #374151; line-height: 1.6;">
      <li><strong>인천광역시교육청</strong>: 032-420-8114</li>
      <li><strong>연수구청 교육지원과</strong>: 032-749-8000</li>
      <li><strong>인천교육청 송도교육지원센터</strong>: 032-420-8200</li>
    </ul>
  </div>
  
  <div style="background: #fef2f2; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #ef4444;">
    <h3 style="color: #dc2626; margin: 0 0 1rem 0;">주요 학교 연락처</h3>
    <ul style="margin: 0; color: #374151; line-height: 1.6;">
      <li><strong>채드윅 송도국제학교</strong>: 032-250-5000</li>
      <li><strong>CMIS</strong>: 032-626-0509</li>
      <li><strong>송도국제학교</strong>: 032-XXX-XXXX (2025년 9월 개교)</li>
      <li><strong>인천신정초등학교</strong>: 032-832-5901</li>
      <li><strong>인천신정중학교</strong>: 032-832-0515</li>
    </ul>
  </div>
</div>

<h2 style="font-size: 2rem; color: #7c3aed; border-left: 5px solid #a855f7; padding-left: 1rem; margin: 3rem 0 1.5rem 0; background: #faf5ff; padding: 1rem 1rem 1rem 2rem; border-radius: 0.5rem;">🎓 송도 고등교육 허브</h2>

<div style="display: grid; gap: 1.5rem;">
  <div style="background: #f5f3ff; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #7c3aed;">
    <h3 style="color: #6b21a8; margin: 0 0 1rem 0;">🌏 인천글로벌캠퍼스 (IGC)</h3>
    <div style="margin: 1rem 0;">
      <h4 style="color: #581c87; margin: 0.5rem 0;">기본 현황 (2024년 11월 기준)</h4>
      <p style="margin: 0; color: #374151; line-height: 1.6;">
        <strong>총 학생 수:</strong> 2,700여 명<br>
        <strong>운영 대학:</strong> 5개교 (국내 대학 + 해외 대학 분교)<br>
        <strong>특징:</strong> 정원 초과 달성, 치열한 경쟁률
      </p>
    </div>
    <div style="margin: 1rem 0;">
      <h4 style="color: #581c87; margin: 0.5rem 0;">주요 대학</h4>
      <ul style="margin: 0; color: #374151; line-height: 1.6;">
        <li><strong>한국뉴욕주립대학교:</strong> 치열한 경쟁률, 정원 초과</li>
        <li><strong>연세대학교 국제캠퍼스:</strong> 언더우드국제대학</li>
        <li><strong>인하대학교:</strong> 글로벌 프로그램 운영</li>
        <li><strong>기타 해외 대학 분교:</strong> 다양한 국제 교육 프로그램</li>
      </ul>
    </div>
    <div style="margin: 1rem 0; padding: 1rem; background: #e9d5ff; border-radius: 0.5rem; border-left: 3px solid #a855f7;">
      <h4 style="color: #6b21a8; margin: 0 0 0.5rem 0;">🎯 2025년 전망</h4>
      <p style="margin: 0; color: #374151; font-size: 0.95rem;">
        • 지속적인 학생 수 증가 및 정원 확대<br>
        • 국제 교육 프로그램 다양화<br>
        • 송도 지역 고등교육 허브로서의 위상 강화
      </p>
    </div>
  </div>
</div>

<hr style="border: none; height: 2px; background: linear-gradient(90deg, #3b82f6, #60a5fa, #3b82f6); margin: 3rem 0;">

<div style="text-align: center; background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; padding: 2rem; border-radius: 1rem; margin: 3rem 0;">
  <p style="margin: 0; font-size: 1rem; opacity: 0.9; line-height: 1.6;">
    <em>본 가이드는 2024-2025년 기준으로 작성되었으며, 학교별 세부 정보는 해당 학교에 직접 문의하시기 바랍니다. 교육 정책 변경이나 학교 현황 변화가 있을 수 있으니, 중요한 결정 전에는 최신 정보를 확인해주세요.</em>
  </p>
</div>

</div>`
  ,
  'songdo-winter-guide': `<div style="max-width: 100%; margin: 0 auto; line-height: 1.8; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">

<h1 style="font-size: 2.5rem; color: #1e40af; text-align: center; margin-bottom: 1rem; border-bottom: 3px solid #3b82f6; padding-bottom: 1rem;">❄️ 송도 겨울 완벽 가이드</h1>

<div style="text-align: center; background: linear-gradient(135deg, #1e40af 0%, #1d4ed8 100%); color: white; padding: 1.5rem; border-radius: 1rem; margin: 2rem 0; box-shadow: 0 8px 25px rgba(30, 64, 175, 0.3);">
  <h2 style="margin: 0; font-size: 1.5rem;">차가운 바닷바람도 따뜻한 실내 공간들이 만들어내는 특별한 겨울 🌊</h2>
  <p style="margin: 0.5rem 0 0 0; font-size: 1.1rem; opacity: 0.9;">12월부터 2월까지 추위를 피해 즐길 수 있는 실내 활동부터 겨울만의 독특한 매력까지, 송도 겨울을 완벽하게 즐기는 가이드를 준비했습니다.</p>
  <p style="margin: 0.5rem 0 0 0; font-size: 0.9rem; opacity: 0.8;">최종 업데이트: 2025년 7월</p>
</div>

<h2 style="font-size: 2rem; color: #dc2626; border-left: 5px solid #ef4444; padding-left: 1rem; margin: 3rem 0 1.5rem 0; background: #fef2f2; padding: 1rem 1rem 1rem 2rem; border-radius: 0.5rem;">🔥 송도 겨울 실내 명소 TOP 8</h2>

<div style="display: grid; gap: 1.5rem;">
  <div style="background: #fef3c7; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #f59e0b;">
    <h3 style="color: #d97706; margin: 0 0 1rem 0;">🛍️ 현대프리미엄아울렛 송도점</h3>
    <p style="margin: 0; color: #374151; line-height: 1.6;">
      <strong>위치:</strong> 인천 연수구 송도국제대로 123<br>
      <strong>운영시간:</strong> 10:30-21:00 (365일 연중무휴)<br>
      <strong>특징:</strong> 송도 첫 도심형 프리미엄 아울렛, 완벽한 실내 난방 시설<br>
      <strong>브랜드:</strong> 보테가 베네타, 몽클레르, 페라가모, 아르마니, 에트로 등 200여개 브랜드<br>
      <strong>연결성:</strong> 트리플스트리트와 지하 연결, 테크노파크역과 지하 통로 연결
    </p>
    <h4 style="color: #d97706; margin: 1rem 0 0.5rem 0;">🛒 겨울 쇼핑 포인트</h4>
    <ul style="margin: 0; padding-left: 1.5rem; color: #374151;">
      <li><strong>겨울 의류:</strong> 코트, 패딩, 니트 특가 행사 (30-70% 할인)</li>
      <li><strong>할인 혜택:</strong> 롯데카드 추가 15% 할인 (2025년 12월 31일까지)</li>
      <li><strong>체험형 공간:</strong> 고객 체험을 위한 새로운 공간 운영</li>
      <li><strong>유아휴게실:</strong> 어린이 대동 가족을 위한 시설 완비</li>
    </ul>
  </div>
  
  <div style="background: #f3f4f6; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #6b7280;">
    <h3 style="color: #4b5563; margin: 0 0 1rem 0;">🎬 트리플스트리트 복합문화공간</h3>
    <p style="margin: 0; color: #374151; line-height: 1.6;">
      <strong>위치:</strong> 인천 연수구 송도동<br>
      <strong>영업시간:</strong> 매일 10:30 ~ 22:00 (365일 연중무휴)<br>
      <strong>특징:</strong> 스트리트형 복합쇼핑몰, 도심 속 놀이터<br>
      <strong>실내 온도:</strong> 연중 쾌적한 22-24°C 유지<br>
      <strong>주차:</strong> 지하 주차장 무료 이용 가능
    </p>
    <h4 style="color: #4b5563; margin: 1rem 0 0.5rem 0;">🎯 2025년 겨울 즐길거리</h4>
    <ul style="margin: 0; padding-left: 1.5rem; color: #374151;">
      <li><strong>무신사 스탠다드:</strong> 1-2층 330평 대형 매장 (신규 오픈)</li>
      <li><strong>CGV 송도타임스페이스:</strong> 7개관, 최신 영화 관람</li>
      <li><strong>게임존:</strong> 오락실, VR체험, 볼링장</li>
      <li><strong>키즈카페:</strong> 어린이 놀이공간, 실내 놀이터</li>
      <li><strong>주말 송도시장:</strong> 지하 1층, 다양한 먹거리와 체험</li>
    </ul>
  </div>
  
  <div style="background: #ecfdf5; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #10b981;">
    <h3 style="color: #059669; margin: 0 0 1rem 0;">♨️ 파라다이스시티 씨메르 (인천공항 인근)</h3>
    <p style="margin: 0; color: #374151; line-height: 1.6;">
      <strong>위치:</strong> 인천 중구 영종도 파라다이스시티 내<br>
      <strong>운영시간:</strong> 평일 10:00-19:00, 주말 10:00-21:00<br>
      <strong>면적:</strong> 약 13,000㎡ (4,000평)<br>
      <strong>수용인원:</strong> 최대 2,000명 동시 이용 가능<br>
      <strong>주요 시설:</strong> 서해 노을 감상 인피니티 풀, 동굴 스파, 버추얼 스파<br>
      <strong>특징:</strong> 만 7세 이상 이용 가능 (초등학생은 법정대리인 동반 필요)
    </p>
    <h4 style="color: #059669; margin: 1rem 0 0.5rem 0;">🛁 스파 시설</h4>
    <ul style="margin: 0; padding-left: 1.5rem; color: #374151;">
      <li><strong>찜질방:</strong> 자수정방, 릴랙스룸, 화가마, 족욕탕</li>
      <li><strong>겨울 특화:</strong> 따뜻한 실내 온천과 야외 온천의 완벽 조화</li>
      <li><strong>부대시설:</strong> 레스토랑, 휴식공간, 마사지실</li>
      <li><strong>주의사항:</strong> 2025년 3월 20일(목) 시설 정비로 이용 제한</li>
    </ul>
  </div>
  
  <div style="background: #f0fdf4; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #22c55e;">
    <h3 style="color: #16a34a; margin: 0 0 1rem 0;">☕ 송도 겨울 따뜻한 카페 TOP 5</h3>
    <div style="margin: 1rem 0;">
      <h4 style="color: #15803d; margin: 0 0 0.5rem 0;">1. 포레스트아웃팅스 송도점</h4>
      <p style="margin: 0; color: #374151; line-height: 1.6;">
        <strong>위치:</strong> 인천 연수구 청량로 145<br>
        <strong>영업시간:</strong> 10:00 ~ 22:00 (라스트오더 21:00)<br>
        <strong>특징:</strong> 화려한 조명과 실내정원이 멋진 대형 카페, 완벽한 난방 시설<br>
        <strong>포인트:</strong> 매 시즌마다 바뀌는 실내장식으로 겨울 분위기 연출
      </p>
    </div>
    <div style="margin: 1rem 0;">
      <h4 style="color: #15803d; margin: 0 0 0.5rem 0;">2. 브런치빈</h4>
      <p style="margin: 0; color: #374151; line-height: 1.6;">
        <strong>위치:</strong> 인천 연수구 해돋이로 151번길 4 인피니티타워 8층<br>
        <strong>특징:</strong> 휴양지 감성의 씨티뷰 맛집, 겨울 실내 난방 완벽<br>
        <strong>포인트:</strong> 아기 식탁 의자와 기저귀 가리대 등 유아 동반 고객 배려
      </p>
    </div>
    <div style="margin: 1rem 0;">
      <h4 style="color: #15803d; margin: 0 0 0.5rem 0;">3. 카페 메이드림</h4>
      <p style="margin: 0; color: #374151; line-height: 1.6;">
        <strong>위치:</strong> 인천 연수구 인천타워대로 132번길 24<br>
        <strong>특징:</strong> 120년 넘은 교회를 리모델링한 4층 구조의 독특한 카페<br>
        <strong>포인트:</strong> 몽환적인 인테리어와 따뜻한 실내 분위기
      </p>
    </div>
    <div style="margin: 1rem 0;">
      <h4 style="color: #15803d; margin: 0 0 0.5rem 0;">4. 고트커피</h4>
      <p style="margin: 0; color: #374151; line-height: 1.6;">
        <strong>위치:</strong> 인천 연수구 송도과학로 16번길 13-18<br>
        <strong>특징:</strong> 모던하고 심플한 인테리어의 트리플스트리트 신상 카페<br>
        <strong>시그니처:</strong> 고트라떼 (직접 블렌딩 크림과 시나몬 파우더)
      </p>
    </div>
    <div style="margin: 1rem 0;">
      <h4 style="color: #15803d; margin: 0 0 0.5rem 0;">5. 대형 카페 투어</h4>
      <p style="margin: 0; color: #374151; line-height: 1.6;">
        <strong>특징:</strong> 3층까지 뚫린 천장과 유리창을 통한 자연 채광<br>
        <strong>포인트:</strong> 푸릇한 식물들로 꾸며진 플랜테리어 컨셉의 힐링 공간
      </p>
    </div>
  </div>
  
  <div style="background: #fef7ff; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #a855f7;">
    <h3 style="color: #9333ea; margin: 0 0 1rem 0;">🎮 키즈카페 & 어린이 실내 활동</h3>
    <div style="margin: 1rem 0;">
      <h4 style="color: #7c3aed; margin: 0 0 0.5rem 0;">연수 꿈빛나래 키즈카페</h4>
      <p style="margin: 0; color: #374151; line-height: 1.6;">
        <strong>위치:</strong> 연수구 센트럴로 418 (송도5동 행정복지센터 2층)<br>
        <strong>대상:</strong> 3세 이상 12세 이하 (2013년~2022년생)<br>
        <strong>운영:</strong> 화~일요일, 일 3회 (회당 2시간)<br>
        <strong>예약:</strong> 매주 수요일 10시 네이버플레이스 사전예약<br>
        <strong>특징:</strong> 2024년 7월 개관한 공공시설로 합리적 이용료
      </p>
    </div>
    <div style="margin: 1rem 0;">
      <h4 style="color: #7c3aed; margin: 0 0 0.5rem 0;">아틀란티스 송도점</h4>
      <p style="margin: 0; color: #374151; line-height: 1.6;">
        <strong>위치:</strong> 연수구 컨벤시아대로 230번길 42 아라플라자 5층<br>
        <strong>영업시간:</strong> 11:00-19:30<br>
        <strong>가격:</strong> 종일권 어른 10,000원, 아이 35,000원 / 반일권 어른 5,000원, 아이 25,000원<br>
        <strong>이벤트:</strong> 월요일 여성 보호자 무료, 화요일 소인 2+1 등<br>
        <strong>시설:</strong> 정글짐, 유격놀이 시설, 스피드 튜브 썰매, 풀장
      </p>
    </div>
    <div style="margin: 1rem 0;">
      <h4 style="color: #7c3aed; margin: 0 0 0.5rem 0;">아파트 단지 내 시설</h4>
      <ul style="margin: 0; padding-left: 1.5rem; color: #374151;">
        <li><strong>송도더샵마스터뷰3단지:</strong> 실내 놀이시설</li>
        <li><strong>송도 에듀포레 푸르지오:</strong> 어린이키즈룸</li>
        <li><strong>힐스테이트레이크:</strong> 어린이 키즈카페</li>
      </ul>
    </div>
  </div>
  
  <div style="background: #f0f9ff; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #3b82f6;">
    <h3 style="color: #2563eb; margin: 0 0 1rem 0;">🎵 문화공간 & 실내 엔터테인먼트</h3>
    <div style="margin: 1rem 0;">
      <h4 style="color: #1d4ed8; margin: 0 0 0.5rem 0;">G타워 전망대</h4>
      <p style="margin: 0; color: #374151; line-height: 1.6;">
        <strong>특징:</strong> 겨울 서해바다와 설경을 한눈에 조망할 수 있는 실내 전망대<br>
        <strong>포인트:</strong> 따뜻한 실내에서 겨울 송도 전경 감상<br>
        <strong>추천 시간:</strong> 일몰 시간대 (17:00-18:00)
      </p>
    </div>
    <div style="margin: 1rem 0;">
      <h4 style="color: #1d4ed8; margin: 0 0 0.5rem 0;">트라이볼 실내 공연장</h4>
      <p style="margin: 0; color: #374151; line-height: 1.6;">
        <strong>특징:</strong> 복합문화공간에서 즐기는 겨울 문화 행사<br>
        <strong>프로그램:</strong> 콘서트, 전시회, 문화 공연<br>
        <strong>포인트:</strong> 독특한 건축물 내부의 따뜻한 공간
      </p>
    </div>
    <div style="margin: 1rem 0;">
      <h4 style="color: #1d4ed8; margin: 0 0 0.5rem 0;">파라다이스시티 원더박스</h4>
      <p style="margin: 0; color: #374151; line-height: 1.6;">
        <strong>위치:</strong> 인천 중구 영종도 파라다이스시티 내<br>
        <strong>특징:</strong> 밤의 유원지 콘셉트로 동화 속 같은 분위기<br>
        <strong>시설:</strong> 실내 놀이기구 (회전목마, 관람차, 메가믹스, 스카이트레일)<br>
        <strong>포인트:</strong> 겨울철 실내에서 즐기는 놀이공원
      </p>
    </div>
  </div>
  
  <div style="background: #fff7ed; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #f97316;">
    <h3 style="color: #ea580c; margin: 0 0 1rem 0;">🏋️ 실내 체육시설</h3>
    <div style="margin: 1rem 0;">
      <h4 style="color: #dc2626; margin: 0 0 0.5rem 0;">달빛축제공원 보조공연장</h4>
      <p style="margin: 0; color: #374151; line-height: 1.6;">
        <strong>위치:</strong> 연수구 송도동 달빛축제공원 내<br>
        <strong>시설:</strong> 실내 체육시설 (농구장, 테니스장, 탁구장)<br>
        <strong>특징:</strong> 시민들의 건강증진을 위한 실내 활동 공간<br>
        <strong>포인트:</strong> 겨울철 실내 운동 최적의 장소
      </p>
    </div>
  </div>
</div>

<h2 style="font-size: 2rem; color: #059669; border-left: 5px solid #10b981; padding-left: 1rem; margin: 3rem 0 1.5rem 0; background: #ecfdf5; padding: 1rem 1rem 1rem 2rem; border-radius: 0.5rem;">🍲 송도 겨울 따뜻한 맛집</h2>

<div style="display: grid; gap: 1.5rem;">
  <div style="background: #fef2f2; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #ef4444;">
    <h3 style="color: #dc2626; margin: 0 0 1rem 0;">🥘 국물 요리 전문점</h3>
    <div style="margin: 1rem 0;">
      <h4 style="color: #b91c1c; margin: 0 0 0.5rem 0;">송도 할매 순대국</h4>
      <p style="margin: 0; color: #374151; line-height: 1.6;">
        <strong>특징:</strong> 진한 국물과 푸짐한 순대로 겨울 추위 해소<br>
        <strong>메뉴:</strong> 순대국, 순댓국밥, 내장탕 등 다양한 순대국 메뉴<br>
        <strong>포인트:</strong> 뜨끈한 국물로 몸과 마음을 따뜻하게
      </p>
    </div>
    <div style="margin: 1rem 0;">
      <h4 style="color: #b91c1c; margin: 0 0 0.5rem 0;">진시황뼈다귀감자탕</h4>
      <p style="margin: 0; color: #374151; line-height: 1.6;">
        <strong>운영시간:</strong> 24시간 영업<br>
        <strong>특징:</strong> 감자탕 전문점, 뜨끈한 국물과 푸짐한 감자<br>
        <strong>포인트:</strong> 밤늦게도 따뜻한 국물 요리 즐길 수 있음
      </p>
    </div>
  </div>
  
  <div style="background: #fffbeb; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #f59e0b;">
    <h3 style="color: #d97706; margin: 0 0 1rem 0;">🍜 면 요리 전문점</h3>
    <div style="margin: 1rem 0;">
      <h4 style="color: #b45309; margin: 0 0 0.5rem 0;">북촌막국수</h4>
      <p style="margin: 0; color: #374151; line-height: 1.6;">
        <strong>특징:</strong> 담백한 막국수와 따뜻한 육전<br>
        <strong>포인트:</strong> 겨울철 따뜻한 육전으로 몸을 데우고 막국수로 마무리
      </p>
    </div>
    <div style="margin: 1rem 0;">
      <h4 style="color: #b45309; margin: 0 0 0.5rem 0;">라멘나츠</h4>
      <p style="margin: 0; color: #374151; line-height: 1.6;">
        <strong>특징:</strong> 토리빠이탄 라멘으로 따뜻한 겨울 한 끼<br>
        <strong>포인트:</strong> 진한 국물과 부드러운 면발로 겨울 추위 해소
      </p>
    </div>
  </div>
  
  <div style="background: #f3f4f6; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #6b7280;">
    <h3 style="color: #4b5563; margin: 0 0 1rem 0;">🍱 일식 전문점</h3>
    <div style="margin: 1rem 0;">
      <h4 style="color: #374151; margin: 0 0 0.5rem 0;">명월카츠</h4>
      <p style="margin: 0; color: #374151; line-height: 1.6;">
        <strong>특징:</strong> 따뜻한 소스의 돈가스와 다양한 카츠 메뉴<br>
        <strong>포인트:</strong> 뜨끈한 돈가스로 겨울 든든한 한 끼
      </p>
    </div>
    <div style="margin: 1rem 0;">
      <h4 style="color: #374151; margin: 0 0 0.5rem 0;">시즈쿠</h4>
      <p style="margin: 0; color: #374151; line-height: 1.6;">
        <strong>특징:</strong> 겨울 제철 해산물을 활용한 일식 코스 요리<br>
        <strong>포인트:</strong> 따뜻한 실내에서 즐기는 고급 일식
      </p>
    </div>
  </div>
  
  <div style="background: #fef7ff; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #a855f7;">
    <h3 style="color: #9333ea; margin: 0 0 1rem 0;">🥗 중식 & 기타 요리</h3>
    <div style="margin: 1rem 0;">
      <h4 style="color: #7c3aed; margin: 0 0 0.5rem 0;">화화쿵주마라탕</h4>
      <p style="margin: 0; color: #374151; line-height: 1.6;">
        <strong>특징:</strong> 0~3단계 매운맛 조절 가능한 마라탕<br>
        <strong>포인트:</strong> 뜨끈한 마라탕으로 겨울 몸을 따뜻하게
      </p>
    </div>
    <div style="margin: 1rem 0;">
      <h4 style="color: #7c3aed; margin: 0 0 0.5rem 0;">광명대창집</h4>
      <p style="margin: 0; color: #374151; line-height: 1.6;">
        <strong>특징:</strong> 겨울철 따뜻한 곱창과 대창으로 몸보신<br>
        <strong>포인트:</strong> 뜨끈한 곱창 요리로 겨울 추위 극복
      </p>
    </div>
    <div style="margin: 1rem 0;">
      <h4 style="color: #7c3aed; margin: 0 0 0.5rem 0;">신계동장어</h4>
      <p style="margin: 0; color: #374151; line-height: 1.6;">
        <strong>특징:</strong> 장어 전문점, 셀프구이 방식<br>
        <strong>포인트:</strong> 겨울 보양식으로 인기, 국내산 대물장어와 뚝배기 계란찜
      </p>
    </div>
  </div>
</div>

<h2 style="font-size: 2rem; color: #7c2d12; border-left: 5px solid #ea580c; padding-left: 1rem; margin: 3rem 0 1.5rem 0; background: #fff7ed; padding: 1rem 1rem 1rem 2rem; border-radius: 0.5rem;">❄️ 겨울 이벤트 & 축제</h2>

<div style="display: grid; gap: 1.5rem;">
  <div style="background: #eff6ff; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #3b82f6;">
    <h3 style="color: #1d4ed8; margin: 0 0 1rem 0;">✨ 겨울 일루미네이션</h3>
    <div style="margin: 1rem 0;">
      <h4 style="color: #1e40af; margin: 0 0 0.5rem 0;">센트럴파크 겨울 조명</h4>
      <p style="margin: 0; color: #374151; line-height: 1.6;">
        <strong>기간:</strong> 12월 ~ 2월<br>
        <strong>특징:</strong> 고층 빌딩들의 화려한 조명과 겨울 정취<br>
        <strong>포인트:</strong> 추운 겨울 밤을 따뜻하게 만드는 조명 축제
      </p>
    </div>
    <div style="margin: 1rem 0;">
      <h4 style="color: #1e40af; margin: 0 0 0.5rem 0;">송도달빛축제공원 연말 이벤트</h4>
      <p style="margin: 0; color: #374151; line-height: 1.6;">
        <strong>기간:</strong> 12월 말 ~ 1월 초<br>
        <strong>특징:</strong> 겨울철 특별 공연 및 연말 행사<br>
        <strong>포인트:</strong> 따뜻한 실내에서 즐기는 연말 문화 행사
      </p>
    </div>
  </div>
  
  <div style="background: #fef7ff; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #a855f7;">
    <h3 style="color: #9333ea; margin: 0 0 1rem 0;">🎄 송도 크리스마스 마켓</h3>
    <div style="margin: 1rem 0;">
      <h4 style="color: #7c3aed; margin: 0 0 0.5rem 0;">기본 정보</h4>
      <p style="margin: 0; color: #374151; line-height: 1.6;">
        <strong>기간:</strong> 12월 15일 ~ 12월 31일<br>
        <strong>장소:</strong> 트리플스트리트 일원<br>
        <strong>특징:</strong> 크리스마스 용품, 수공예품, 겨울 먹거리 판매<br>
        <strong>하이라이트:</strong> 대형 크리스마스 트리, 캐롤 공연, 겨울 야시장
      </p>
    </div>
    <div style="margin: 1rem 0;">
      <h4 style="color: #7c3aed; margin: 0 0 0.5rem 0;">즐길거리</h4>
      <ul style="margin: 0; padding-left: 1.5rem; color: #374151;">
        <li><strong>크리스마스 장식품:</strong> 핸드메이드 장식품, 선물용품</li>
        <li><strong>겨울 먹거리:</strong> 호떡, 붕어빵, 군고구마, 따뜻한 음료</li>
        <li><strong>공연:</strong> 크리스마스 캐롤, 거리 공연</li>
        <li><strong>포토존:</strong> 대형 크리스마스 트리, 겨울 테마 장식</li>
      </ul>
    </div>
  </div>
</div>

<h2 style="font-size: 2rem; color: #991b1b; border-left: 5px solid #ef4444; padding-left: 1rem; margin: 3rem 0 1.5rem 0; background: #fef2f2; padding: 1rem 1rem 1rem 2rem; border-radius: 0.5rem;">🌃 겨울 야경 & 데이트 명소</h2>

<div style="display: grid; gap: 1.5rem;">
  <div style="background: #f1f5f9; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #475569;">
    <h3 style="color: #334155; margin: 0 0 1rem 0;">🌙 겨울 야경 베스트</h3>
    <div style="margin: 1rem 0;">
      <h4 style="color: #1e293b; margin: 0 0 0.5rem 0;">센트럴파크 겨울 야경</h4>
      <p style="margin: 0; color: #374151; line-height: 1.6;">
        <strong>특징:</strong> 겨울철 특별한 조명과 함께하는 야경 산책<br>
        <strong>포인트:</strong> 따뜻한 카페에서 야경을 감상하며 휴식<br>
        <strong>추천 시간:</strong> 18:00 ~ 22:00
      </p>
    </div>
    <div style="margin: 1rem 0;">
      <h4 style="color: #1e293b; margin: 0 0 0.5rem 0;">인천대교 겨울 조망</h4>
      <p style="margin: 0; color: #374151; line-height: 1.6;">
        <strong>특징:</strong> 겨울 해넘이와 야경의 환상적 조화<br>
        <strong>포인트:</strong> 추운 겨울 바람을 피해 실내에서 조망<br>
        <strong>추천 장소:</strong> G타워 전망대, 고층 카페
      </p>
    </div>
  </div>
  
  <div style="background: #fdf2f8; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #ec4899;">
    <h3 style="color: #be185d; margin: 0 0 1rem 0;">💕 겨울 실내 데이트 코스</h3>
    <div style="margin: 1rem 0;">
      <h4 style="color: #9d174d; margin: 0 0 0.5rem 0;">코스 1: 쇼핑 & 맛집</h4>
      <p style="margin: 0; color: #374151; line-height: 1.6;">
        <strong>1단계:</strong> 현대프리미엄아울렛 쇼핑 (10:30-13:00)<br>
        <strong>2단계:</strong> 트리플스트리트 점심 식사 (13:00-14:30)<br>
        <strong>3단계:</strong> 포레스트아웃팅스 카페 데이트 (14:30-16:00)<br>
        <strong>4단계:</strong> CGV 송도 영화 관람 (16:00-18:00)
      </p>
    </div>
    <div style="margin: 1rem 0;">
      <h4 style="color: #9d174d; margin: 0 0 0.5rem 0;">코스 2: 온천 & 휴식</h4>
      <p style="margin: 0; color: #374151; line-height: 1.6;">
        <strong>1단계:</strong> 파라다이스시티 씨메르 온천 (10:00-15:00)<br>
        <strong>2단계:</strong> 원더박스 실내 놀이시설 (15:00-17:00)<br>
        <strong>3단계:</strong> 파라다이스시티 레스토랑 저녁 식사 (17:00-19:00)
      </p>
    </div>
  </div>
</div>

<h2 style="font-size: 2rem; color: #065f46; border-left: 5px solid #10b981; padding-left: 1rem; margin: 3rem 0 1.5rem 0; background: #ecfdf5; padding: 1rem 1rem 1rem 2rem; border-radius: 0.5rem;">🚗 겨울 교통 정보 & 주의사항</h2>

<div style="display: grid; gap: 1.5rem;">
  <div style="background: #ecfdf5; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #10b981;">
    <h3 style="color: #065f46; margin: 0 0 1rem 0;">🚇 겨울 대중교통 정보</h3>
    <div style="margin: 1rem 0;">
      <h4 style="color: #047857; margin: 0 0 0.5rem 0;">지하철</h4>
      <p style="margin: 0; color: #374151; line-height: 1.6;">
        <strong>인천지하철 1호선:</strong> 센트럴파크역, 국제업무지구역, 송도달빛축제공원역<br>
        <strong>2025년 업데이트:</strong> 검단 연장선 개통 예정 (공정률 83%)<br>
        <strong>겨울 운행:</strong> 정상 운행, 눈 오는 날에도 안정적
      </p>
    </div>
    <div style="margin: 1rem 0;">
      <h4 style="color: #047857; margin: 0 0 0.5rem 0;">버스</h4>
      <p style="margin: 0; color: #374151; line-height: 1.6;">
        <strong>송도 내부 버스:</strong> 30~40분 배차간격 (겨울철 지연 가능)<br>
        <strong>광역급행버스 M6405:</strong> 송도 ↔ 서울 강남 직행<br>
        <strong>문의:</strong> 인천교통공사 1899-4446
      </p>
    </div>
  </div>
  
  <div style="background: #fef2f2; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #ef4444;">
    <h3 style="color: #dc2626; margin: 0 0 1rem 0;">❄️ 겨울철 교통 주의사항</h3>
    <div style="margin: 1rem 0;">
      <h4 style="color: #b91c1c; margin: 0 0 0.5rem 0;">눈과 빙판길 대비</h4>
      <ul style="margin: 0; padding-left: 1.5rem; color: #374151;">
        <li><strong>예상 적설량:</strong> 3~8cm (많은 곳은 10cm 이상)</li>
        <li><strong>교통 지연:</strong> 눈과 빙판길로 인한 교통 지연 가능성</li>
        <li><strong>이동 시간:</strong> 충분한 시간 여유를 두고 이동 권장</li>
        <li><strong>안전 운전:</strong> 차량 운행 시 스노우 체인 준비</li>
      </ul>
    </div>
    <div style="margin: 1rem 0;">
      <h4 style="color: #b91c1c; margin: 0 0 0.5rem 0;">주차 정보</h4>
      <ul style="margin: 0; padding-left: 1.5rem; color: #374151;">
        <li><strong>센트럴파크:</strong> 인근 공영주차장 및 상업시설 주차장</li>
        <li><strong>현대아울렛:</strong> 지하 주차장 이용 (실내 주차 권장)</li>
        <li><strong>트리플스트리트:</strong> 지하 주차장 무료 이용</li>
        <li><strong>겨울 주의:</strong> 지하 주차장 이용으로 결빙 방지</li>
      </ul>
    </div>
  </div>
</div>

<h2 style="font-size: 2rem; color: #7c2d12; border-left: 5px solid #ea580c; padding-left: 1rem; margin: 3rem 0 1.5rem 0; background: #fff7ed; padding: 1rem 1rem 1rem 2rem; border-radius: 0.5rem;">💡 겨울 여행 실용 팁</h2>

<div style="display: grid; gap: 1.5rem;">
  <div style="background: #fef7ff; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #a855f7;">
    <h3 style="color: #9333ea; margin: 0 0 1rem 0;">🧥 겨울 복장 가이드</h3>
    <div style="margin: 1rem 0;">
      <h4 style="color: #7c3aed; margin: 0 0 0.5rem 0;">필수 아이템</h4>
      <ul style="margin: 0; padding-left: 1.5rem; color: #374151;">
        <li><strong>바람막이:</strong> 해풍으로 인한 체감온도 하락 대비</li>
        <li><strong>목도리:</strong> 목 보온은 필수 (바닷바람 차단)</li>
        <li><strong>장갑:</strong> 실내외 온도차로 인한 손 보온</li>
        <li><strong>보온 신발:</strong> 눈길과 빙판길 대비 미끄럼 방지</li>
      </ul>
    </div>
    <div style="margin: 1rem 0;">
      <h4 style="color: #7c3aed; margin: 0 0 0.5rem 0;">레이어링 팁</h4>
      <ul style="margin: 0; padding-left: 1.5rem; color: #374151;">
        <li><strong>1차:</strong> 땀 흡수 기능성 속옷</li>
        <li><strong>2차:</strong> 보온 니트 또는 플리스</li>
        <li><strong>3차:</strong> 바람막이 겸용 패딩 또는 코트</li>
        <li><strong>포인트:</strong> 실내 난방이 잘되어 있어 탈의 용이한 옷차림</li>
      </ul>
    </div>
  </div>
  
  <div style="background: #ecfdf5; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #10b981;">
    <h3 style="color: #059669; margin: 0 0 1rem 0;">💰 겨울 예산 가이드</h3>
    <div style="margin: 1rem 0;">
      <h4 style="color: #047857; margin: 0 0 0.5rem 0;">무료 활동</h4>
      <ul style="margin: 0; padding-left: 1.5rem; color: #374151;">
        <li><strong>실내 산책:</strong> 트리플스트리트, 현대아울렛 윈도우 쇼핑</li>
        <li><strong>G타워 전망대:</strong> 무료 입장으로 겨울 야경 감상</li>
        <li><strong>달빛축제공원:</strong> 실내 체육시설 무료 이용</li>
        <li><strong>센트럴파크:</strong> 겨울 조명 감상 (무료)</li>
      </ul>
    </div>
    <div style="margin: 1rem 0;">
      <h4 style="color: #047857; margin: 0 0 0.5rem 0;">유료 활동 예산</h4>
      <ul style="margin: 0; padding-left: 1.5rem; color: #374151;">
        <li><strong>카페 음료:</strong> 5,000-10,000원 (대형 카페 기준)</li>
        <li><strong>영화 관람:</strong> 14,000-18,000원 (CGV 송도 기준)</li>
        <li><strong>키즈카페:</strong> 어른 5,000-10,000원, 아이 25,000-35,000원</li>
        <li><strong>온천 (씨메르):</strong> 성인 평일 50,000원, 주말 60,000원</li>
      </ul>
    </div>
  </div>
  
  <div style="background: #fff7ed; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #f97316;">
    <h3 style="color: #ea580c; margin: 0 0 1rem 0;">📱 겨울 필수 앱 & 정보</h3>
    <div style="margin: 1rem 0;">
      <h4 style="color: #dc2626; margin: 0 0 0.5rem 0;">날씨 & 교통</h4>
      <ul style="margin: 0; padding-left: 1.5rem; color: #374151;">
        <li><strong>날씨:</strong> 기상청 날씨누리, 웨더채널 (겨울 날씨 확인)</li>
        <li><strong>교통:</strong> 지하철 종결자, 버스타고 (실시간 교통 정보)</li>
        <li><strong>주차:</strong> 파킹프렌즈, 모두의주차장 (실내 주차장 찾기)</li>
      </ul>
    </div>
    <div style="margin: 1rem 0;">
      <h4 style="color: #dc2626; margin: 0 0 0.5rem 0;">쇼핑 & 할인</h4>
      <ul style="margin: 0; padding-left: 1.5rem; color: #374151;">
        <li><strong>쇼핑:</strong> 현대백화점 앱, 무신사 (겨울 할인 정보)</li>
        <li><strong>맛집:</strong> 망고플레이트, 요기요 (실내 맛집 정보)</li>
        <li><strong>예약:</strong> 네이버 예약 (키즈카페, 온천 사전 예약)</li>
      </ul>
    </div>
  </div>
</div>

<h2 style="font-size: 2rem; color: #be185d; border-left: 5px solid #ec4899; padding-left: 1rem; margin: 3rem 0 1.5rem 0; background: #fdf2f8; padding: 1rem 1rem 1rem 2rem; border-radius: 0.5rem;">🏥 겨울 의료정보 & 응급상황</h2>

<div style="display: grid; gap: 1.5rem;">
  <div style="background: #fef2f2; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #ef4444;">
    <h3 style="color: #dc2626; margin: 0 0 1rem 0;">🏥 겨울철 의료시설 정보</h3>
    <div style="margin: 1rem 0;">
      <h4 style="color: #b91c1c; margin: 0 0 0.5rem 0;">현재 상황</h4>
      <p style="margin: 0; color: #374151; line-height: 1.6;">
        <strong>송도 내 병원:</strong> 송도국제도시 내 대형 종합병원 부재<br>
        <strong>1차 의료기관:</strong> 120여 곳 의원급 의료기관 운영 중<br>
        <strong>겨울 특이사항:</strong> 감기, 독감 환자 증가로 대기시간 길어질 수 있음
      </p>
    </div>
    <div style="margin: 1rem 0;">
      <h4 style="color: #b91c1c; margin: 0 0 0.5rem 0;">응급실 이용 추천 병원</h4>
      <ul style="margin: 0; padding-left: 1.5rem; color: #374151;">
        <li><strong>나사렛국제병원:</strong> 동춘동 소재 (송도에서 가장 가까운 종합병원)</li>
        <li><strong>가천대학교 길병원:</strong> 남동구 소재 (24시간 응급실)</li>
        <li><strong>인하대학교병원:</strong> 중구 소재 (대학병원급 의료서비스)</li>
      </ul>
    </div>
  </div>
  
  <div style="background: #f0f9ff; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #3b82f6;">
    <h3 style="color: #1d4ed8; margin: 0 0 1rem 0;">🔮 향후 의료 인프라 계획</h3>
    <div style="margin: 1rem 0;">
      <h4 style="color: #1e40af; margin: 0 0 0.5rem 0;">송도세브란스병원</h4>
      <p style="margin: 0; color: #374151; line-height: 1.6;">
        <strong>개원 예정:</strong> 2026년 (지연 가능성 있음)<br>
        <strong>규모:</strong> 대형 종합병원급<br>
        <strong>특징:</strong> 송도 지역 최초 대형 종합병원
      </p>
    </div>
    <div style="margin: 1rem 0;">
      <h4 style="color: #1e40af; margin: 0 0 0.5rem 0;">CHA병원 글로벌 전문병원</h4>
      <p style="margin: 0; color: #374151; line-height: 1.6;">
        <strong>현재 상황:</strong> 건설 계획 진행 중<br>
        <strong>특징:</strong> 국제 의료 서비스 제공 예정
      </p>
    </div>
  </div>
</div>

<hr style="border: none; height: 2px; background: linear-gradient(90deg, #1e40af, #3b82f6, #1e40af); margin: 3rem 0;">

<div style="text-align: center; background: linear-gradient(135deg, #1e40af 0%, #1d4ed8 100%); color: white; padding: 2rem; border-radius: 1rem; margin: 3rem 0;">
  <h3 style="margin: 0 0 1rem 0; font-size: 1.4rem;">❄️ 송도 겨울 완벽 가이드 마무리</h3>
  <p style="margin: 0; font-size: 1rem; opacity: 0.9; line-height: 1.6;">
    차가운 겨울 바닷바람도 따뜻한 실내 공간들이 만들어내는 특별한 계절입니다.<br>
    쇼핑몰부터 온천, 카페, 맛집까지 송도만의 겨울 매력을 만끽하세요!
  </p>
</div>

<div style="background: #f8fafc; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #64748b; margin: 2rem 0;">
  <p style="margin: 0; color: #475569; font-size: 0.9rem; line-height: 1.6;">
    <strong>📢 정보 안내:</strong> 본 가이드는 2025년 7월 기준으로 작성되었습니다. 운영시간, 가격, 행사 일정 등은 변경될 수 있으니 방문 전 공식 홈페이지나 전화로 확인하시기 바랍니다. 특히 겨울 날씨로 인한 교통 지연이나 시설 운영 변경 사항을 사전에 확인하시고 방문하시길 권장합니다.
  </p>
</div>

</div>`
};

export function loadGuideContent(category: string, slug: string): string {
  return PREGENERATED_CONTENT[slug] || '';
}