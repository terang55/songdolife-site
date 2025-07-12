import type { Metadata } from "next";
import { BASE_URL } from '@/lib/siteConfig';

export const metadata: Metadata = {
  title: "송도 지하철 시간표 | 송도라이프",
  description: "인천1호선 송도 구간(캠퍼스타운~송도달빛축제공원) 실시간 지하철 운행·시간표 정보를 제공합니다. 센트럴파크역, 인천대입구역, 국제업무지구역의 실시간 도착 정보를 확인하세요.",
  keywords: [
    "송도 지하철", "인천1호선", "센트럴파크역", "인천대입구역", "국제업무지구역",
    "송도달빛축제공원역", "캠퍼스타운역", "지하철 시간표", "실시간 도착정보",
    "송도 교통", "인천 지하철", "수인분당선", "송도 지하철역", "교통정보"
  ],
  openGraph: {
    title: "송도 지하철 시간표 | 송도라이프",
    description: "인천1호선 송도 구간 실시간 운행 정보를 확인하세요. 정확한 도착 시간과 시간표를 제공합니다.",
    url: `${BASE_URL}/subway`,
    images: [
      {
        url: `${BASE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "송도 지하철 시간표 - 송도라이프",
      },
    ],
  },
  twitter: {
    title: "송도 지하철 시간표 | 송도라이프",
    description: "인천1호선 송도 구간 실시간 지하철 정보를 확인하세요.",
    images: [`${BASE_URL}/og-image.jpg`],
  },
  alternates: {
    canonical: `${BASE_URL}/subway`,
  },
};

export default function SubwayLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}