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
  rawContent?: string; // 원본 마크다운 콘텐츠
  category: 'realestate' | 'transportation' | 'lifestyle' | 'moving' | 'seasonal' | 'childcare' | 'education';
  lastUpdated: string;
  relatedGuides: string[];
  readingTime: number;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
  featured?: boolean;
  seasonal?: {
    season: 'spring' | 'summer' | 'fall' | 'winter' | 'all';
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
  structuredData: any;
  howToSchema: any;
  faqSchema?: any;
  localBusinessSchema?: any;
}