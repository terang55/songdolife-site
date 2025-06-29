import { Metadata } from 'next';

interface MetaParams {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
}

export function buildMeta({ title, description, keywords = [], image = "/og-image.jpg" }: MetaParams): Metadata {
  const BASE_URL = 'https://nonhyeon.life';
  const fullTitle = `${title} | 인천논현라이프`;

  return {
    title: fullTitle,
    description,
    keywords: keywords.join(', '),
    openGraph: {
      title: fullTitle,
      description,
      url: BASE_URL,
      images: [
        {
          url: `${BASE_URL}${image}`,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      siteName: '인천논현라이프',
      locale: 'ko_KR',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [`${BASE_URL}${image}`],
    },
    alternates: {
      canonical: BASE_URL,
    },
  };
} 