import type { Metadata } from "next";
import { BASE_URL } from '@/lib/siteConfig';

export const metadata: Metadata = {
  title: "송도동 학원 정보 | 송도라이프",
  description: "인천 연수구 송도동 학원·교습소·교육기관 정보를 과목별로 검색하고 필터링하세요. 영어, 수학, 논술, 예체능 등 다양한 분야의 학원 정보를 제공합니다.",
  keywords: [
    "송도동 학원", "송도 교육", "송도 학원 추천", "인천 연수구 학원",
    "송도 영어학원", "송도 수학학원", "송도 논술학원", "송도 예체능학원",
    "센트럴파크 학원", "송도국제도시 교육", "송도 입시학원", "송도 보습학원"
  ],
  openGraph: {
    title: "송도동 학원 정보 | 송도라이프",
    description: "송도국제도시 교육·학원 정보를 실시간으로 제공합니다. 과목별 학원 검색과 상세 정보를 확인하세요.",
    url: `${BASE_URL}/academy`,
    images: [
      {
        url: `${BASE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "송도동 학원 정보 - 송도라이프",
      },
    ],
  },
  twitter: {
    title: "송도동 학원 정보 | 송도라이프",
    description: "송도국제도시 학원·교육 정보를 확인하세요.",
    images: [`${BASE_URL}/og-image.jpg`],
  },
  alternates: {
    canonical: `${BASE_URL}/academy`,
  },
};

export default function AcademyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}