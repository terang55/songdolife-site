import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '이용약관',
  description: '논현동 정보 허브의 이용약관입니다.',
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">이용약관</h1>
          
          <div className="prose max-w-none">
            <p className="text-gray-600 mb-6">
              논현동 정보 허브(이하 "회사")가 제공하는 인터넷 관련 서비스(이하 "서비스")를 이용함에 있어 이용자의 권리·의무 및 책임사항을 규정함을 목적으로 합니다.
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">제1조 (목적)</h2>
              <p className="text-gray-600">
                이 약관은 논현동 정보 허브(이하 "회사")가 제공하는 인터넷 관련 서비스(이하 "서비스")를 이용함에 있어 이용자의 권리·의무 및 책임사항을 규정함을 목적으로 합니다.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">제2조 (정의)</h2>
              <p className="text-gray-600 mb-4">이 약관에서 사용하는 용어의 정의는 다음과 같습니다.</p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>"서비스"란 회사가 제공하는 논현동 지역 정보 플랫폼을 의미합니다.</li>
                <li>"이용자"란 회사의 서비스에 접속하여 이 약관에 따라 회사가 제공하는 서비스를 받는 회원 및 비회원을 말합니다.</li>
                <li>"회원"이란 회사에 개인정보를 제공하여 회원등록을 한 자로서, 회사의 정보를 지속적으로 제공받으며, 회사가 제공하는 서비스를 계속적으로 이용할 수 있는 자를 말합니다.</li>
                <li>"비회원"이란 회원에 가입하지 않고 회사가 제공하는 서비스를 이용하는 자를 말합니다.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">제3조 (약관의 명시와 설명 및 개정)</h2>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>회사는 이 약관의 내용과 상호 및 대표자 성명, 영업소 소재지 주소(소비자의 불만을 처리할 수 있는 곳의 주소를 포함), 전화번호, 모사전송번호, 전자우편주소, 사업자등록번호 등을 이용자가 쉽게 알 수 있도록 서비스 초기 화면에 게시합니다.</li>
                <li>회사는 이용자가 약관에 동의하기에 앞서 약관에 정하여져 있는 내용 중 청약철회, 배송책임, 환불조건 등과 같은 중요한 내용을 이용자가 이해할 수 있도록 별도의 연결화면 또는 팝업화면 등을 제공하여 이용자의 확인을 구하여야 합니다.</li>
                <li>회사는 전자상거래 등에서의 소비자보호에 관한 법률, 약관의 규제에 관한 법률, 전자거래기본법, 전자서명법, 정보통신망 이용촉진 및 정보보호 등에 관한 법률, 방문판매 등에 관한 법률, 소비자보호법 등 관련법을 위배하지 않는 범위에서 이 약관을 개정할 수 있습니다.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">제4조 (서비스의 제공 및 변경)</h2>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>회사는 다음과 같은 업무를 수행합니다.
                  <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                    <li>논현동 지역 정보 제공</li>
                    <li>뉴스, 블로그, 유튜브 콘텐츠 큐레이션</li>
                    <li>맛집, 카페, 부동산, 육아 정보 제공</li>
                    <li>기타 회사가 정하는 업무</li>
                  </ul>
                </li>
                <li>회사는 재화 또는 용역의 품절 또는 기술적 사양의 변경 등의 경우에는 장차 체결되는 계약에 의해 제공할 재화 또는 용역의 내용을 변경할 수 있습니다. 이 경우에는 변경된 재화 또는 용역의 내용 및 제공일자를 명시하여 현재의 재화 또는 용역의 내용을 게시한 곳에 즉시 공지합니다.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">제5조 (서비스의 중단)</h2>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>회사는 컴퓨터 등 정보통신설비의 보수점검·교체 및 고장, 통신의 두절 등의 사유가 발생한 경우에는 서비스의 제공을 일시적으로 중단할 수 있습니다.</li>
                <li>회사는 제1항의 사유로 서비스의 제공이 일시적으로 중단됨으로 인하여 이용자 또는 제3자가 입은 손해에 대하여 배상합니다. 단, 회사가 고의 또는 과실이 없음을 입증하는 경우에는 그러하지 아니합니다.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">제6조 (이용자의 의무)</h2>
              <p className="text-gray-600 mb-4">이용자는 다음 행위를 하여서는 안 됩니다.</p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>신청 또는 변경시 허위내용의 등록</li>
                <li>타인의 정보 도용</li>
                <li>회사가 게시한 정보의 변경</li>
                <li>회사가 정한 정보 이외의 정보(컴퓨터 프로그램 등) 등의 송신 또는 게시</li>
                <li>회사 기타 제3자의 저작권 등 지적재산권에 대한 침해</li>
                <li>회사 기타 제3자의 명예를 손상시키거나 업무를 방해하는 행위</li>
                <li>외설 또는 폭력적인 메시지, 화상, 음성, 기타 공서양속에 반하는 정보를 회사에 공개 또는 게시하는 행위</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">제7조 (저작권의 귀속 및 이용제한)</h2>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>회사가 작성한 저작물에 대한 저작권 기타 지적재산권은 회사에 귀속합니다.</li>
                <li>이용자는 회사를 이용함으로써 얻은 정보 중 회사에게 지적재산권이 귀속된 정보를 회사의 사전 승낙 없이 복제, 송신, 출판, 배포, 방송 기타 방법에 의하여 영리목적으로 이용하거나 제3자에게 이용하게 하여서는 안됩니다.</li>
                <li>회사는 약정에 따라 이용자에게 귀속된 저작권을 사용하는 경우 당해 이용자에게 통보하여야 합니다.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">제8조 (분쟁해결)</h2>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>회사는 이용자가 제기하는 정당한 의견이나 불만을 반영하고 그 피해를 보상처리하기 위하여 피해보상처리기구를 설치·운영합니다.</li>
                <li>회사는 이용자로부터 제출되는 불만사항 및 의견은 우선적으로 그 사항을 처리합니다. 다만, 신속한 처리가 곤란한 경우에는 이용자에게 그 사유와 처리일정을 즉시 통보해 드립니다.</li>
                <li>회사와 이용자 간에 발생한 전자상거래 분쟁과 관련하여 이용자의 피해구제신청이 있는 경우에는 공정거래위원회 또는 시·도지사가 의뢰하는 분쟁조정기관의 조정에 따를 수 있습니다.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">제9조 (재판권 및 준거법)</h2>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>회사와 이용자 간에 발생한 전자상거래 분쟁에 관한 소송은 제소 당시의 이용자의 주소에 의하고, 주소가 없는 경우에는 거소를 관할하는 지방법원의 전속관할로 합니다. 다만, 제소 당시 이용자의 주소 또는 거소가 분명하지 않거나 외국 거주자의 경우에는 민사소송법상의 관할법원에 제기합니다.</li>
                <li>회사와 이용자 간에 제기된 전자상거래 소송에는 한국법을 적용합니다.</li>
              </ul>
            </section>

            <div className="bg-blue-50 p-6 rounded-lg mt-8">
              <p className="text-sm text-gray-600">
                <strong>시행일자:</strong> 2025년 6월 28일<br />
                <strong>최종 수정일:</strong> 2025년 6월 28일
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg mt-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">문의사항</h3>
              <p className="text-gray-600">
                이용약관에 대한 문의사항이 있으시면 아래로 연락해 주세요.<br />
                이메일: rainbowcr55@gmail.com<br />
                담당부서: 논현동 정보 허브 운영팀
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 