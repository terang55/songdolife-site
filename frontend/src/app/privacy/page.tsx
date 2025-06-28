import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '개인정보처리방침',
  description: '논현동 정보 허브의 개인정보처리방침입니다.',
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">개인정보처리방침</h1>
          
          <div className="prose max-w-none">
            <p className="text-gray-600 mb-6">
              논현동 정보 허브(이하 "회사")는 개인정보보호법에 따라 이용자의 개인정보 보호 및 권익을 보호하고 개인정보와 관련한 이용자의 고충을 원활하게 처리할 수 있도록 다음과 같은 처리방침을 두고 있습니다.
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. 개인정보의 처리목적</h2>
              <p className="text-gray-600 mb-4">
                회사는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 개인정보보호법 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>홈페이지 회원가입 및 관리</li>
                <li>재화 또는 서비스 제공</li>
                <li>마케팅 및 광고에의 활용</li>
                <li>서비스 개선 및 맞춤형 콘텐츠 제공</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. 개인정보의 처리 및 보유기간</h2>
              <p className="text-gray-600 mb-4">
                회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>홈페이지 회원가입 및 관리: 회원 탈퇴 시까지</li>
                <li>재화 또는 서비스 제공: 계약 종료 후 3년</li>
                <li>불만처리에 관한 기록: 3년</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. 처리하는 개인정보 항목</h2>
              <p className="text-gray-600 mb-4">
                회사는 다음의 개인정보 항목을 처리하고 있습니다.
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>필수항목: 이메일, 접속 IP 정보, 쿠키, 접속 로그</li>
                <li>선택항목: 서비스 이용 기록, 접속 로그, 쿠키, 접속 IP 정보</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. 개인정보의 제3자 제공</h2>
              <p className="text-gray-600">
                회사는 정보주체의 개인정보를 개인정보의 처리목적에서 명시한 범위 내에서만 처리하며, 정보주체의 동의, 법률의 특별한 규정 등 개인정보보호법 제17조에 해당하는 경우에만 개인정보를 제3자에게 제공합니다.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. 개인정보처리의 위탁</h2>
              <p className="text-gray-600 mb-4">
                회사는 원활한 개인정보 업무처리를 위하여 다음과 같이 개인정보 처리업무를 위탁하고 있습니다.
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Google Analytics: 웹사이트 이용 통계 분석</li>
                <li>Vercel: 웹사이트 호스팅 및 운영</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. 정보주체의 권리·의무 및 행사방법</h2>
              <p className="text-gray-600 mb-4">
                이용자는 개인정보주체로서 다음과 같은 권리를 행사할 수 있습니다.
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>개인정보 처리정지 요구권</li>
                <li>개인정보 열람요구권</li>
                <li>개인정보 정정·삭제요구권</li>
                <li>개인정보 처리정지 요구권</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. 개인정보의 안전성 확보조치</h2>
              <p className="text-gray-600">
                회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다.
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 mt-4">
                <li>관리적 조치: 내부관리계획 수립·시행, 정기적 직원 교육 등</li>
                <li>기술적 조치: 개인정보처리시스템 등의 접근권한 관리, 접근통제시스템 설치, 고유식별정보 등의 암호화, 보안프로그램 설치</li>
                <li>물리적 조치: 전산실, 자료보관실 등의 접근통제</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. 개인정보보호책임자</h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-600 mb-2"><strong>개인정보보호책임자</strong></p>
                <p className="text-gray-600 mb-1">이메일: rainbowcr55@gmail.com</p>
                <p className="text-gray-600">담당부서: 논현동 정보 허브 운영팀</p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">9. 개인정보 처리방침 변경</h2>
              <p className="text-gray-600">
                이 개인정보처리방침은 시행일로부터 적용되며, 법령 및 방침에 따른 변경내용의 추가, 삭제 및 정정이 있는 경우에는 변경사항의 시행 7일 전부터 공지사항을 통하여 고지할 것입니다.
              </p>
            </section>

            <div className="bg-blue-50 p-6 rounded-lg mt-8">
              <p className="text-sm text-gray-600">
                <strong>시행일자:</strong> 2025년 6월 28일<br />
                <strong>최종 수정일:</strong> 2025년 6월 28일
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 