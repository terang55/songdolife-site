export interface GuideContent {
  slug: string;
  title: string;
  description: string;
  keywords: string[];
  content: string;
  category: 'realestate' | 'transportation' | 'lifestyle' | 'moving' | 'seasonal' | 'childcare';
  lastUpdated: string;
  relatedGuides: string[];
  readingTime: number;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
  featured?: boolean;
  seasonal?: {
    season: 'spring' | 'summer' | 'fall' | 'winter';
    months: number[];
  };
}

export interface GuideCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

export interface GuideMetadata {
  title: string;
  description: string;
  keywords: string[];
  canonicalUrl: string;
  openGraph: {
    title: string;
    description: string;
    image: string;
  };
  structuredData: {
    '@context': string;
    '@type': string;
    name: string;
    description: string;
    author: {
      '@type': string;
      name: string;
    };
    datePublished: string;
    dateModified: string;
    mainEntityOfPage: {
      '@type': string;
      '@id': string;
    };
  };
}