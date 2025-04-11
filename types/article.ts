export interface Article {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  imageUrl?: string;
  category: string;
  subcategory?: string;
  flag?: 'Featured' | 'Trending' | 'Analysis' | 'Breaking' | 'Exclusive';
  readTime?: string;
  timestamp: string;
  summary?: string;
  tags?: string[];
  relatedArticles?: string[];
} 