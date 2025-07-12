// ⚠️ DEPRECATED: App Router의 generateMetadata로 대체됨
// 
// Next.js 13+ App Router에서는 generateMetadata 함수 사용 권장
// layout.tsx에서 통합 관리되므로 이 컴포넌트는 더 이상 사용되지 않음
//
// 대신 각 페이지에서 generateMetadata 함수를 export하여 동적 메타태그 관리:
//
// export async function generateMetadata({ params }: { params: { category?: string } }): Promise<Metadata> {
//   return {
//     title: `${params.category} | 송도라이프`,
//     description: `송도국제도시 ${params.category} 정보`,
//     openGraph: { ... },
//     twitter: { ... }
//   }
// }

export default function SEOHead() {
  return null; // 더 이상 사용되지 않음
}