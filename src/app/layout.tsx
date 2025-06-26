import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "논현동 정보 허브 | 인천 남동구 논현동 지역 정보",
  description: "논현동 주민들을 위한 실시간 지역 정보 - 뉴스, 맛집, 카페, 부동산, 육아 정보를 한눈에",
  keywords: "논현동, 인천 남동구, 지역정보, 맛집, 카페, 부동산, 육아, 뉴스",
  authors: [{ name: "논현동 정보 허브" }],
  openGraph: {
    title: "논현동 정보 허브",
    description: "논현동 주민들을 위한 실시간 지역 정보",
    type: "website",
    locale: "ko_KR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${inter.variable} font-sans antialiased bg-gray-50`}
      >
        {children}
      </body>
    </html>
  );
}
