export interface TocItem {
  id: string;
  text: string;
  level: number;
  anchor: string;
}

export interface GuideContent {
  slug: string;
  title: string;
  description: string;
  keywords: string[];
  content: string;
  rawContent?: string;
  category: 'realestate' | 'transportation' | 'lifestyle' | 'moving' | 'seasonal' | 'childcare' | 'education';
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
  tocItems?: TocItem[];
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
    image: string;
  };
  howToSchema: {
    '@context': string;
    '@type': string;
    name: string;
    description: string;
    image: string;
    totalTime: string;
    estimatedCost: {
      '@type': string;
      currency: string;
      value: string;
    };
    step: Array<{
      '@type': string;
      name: string;
      text: string;
      position: number;
    }>;
  };
}