import { Article } from '../types/article';

// Mock articles data
export const mockArticles: Article[] = [
  {
    id: '1',
    title: 'Understanding Market Trends in 2024',
    subheading: 'EXCLUSIVE: Sustainable investments outperform traditional sectors as renewable energy leads the charge in emerging markets.',
    content: 'The financial landscape is evolving rapidly in 2024. Market analysts are closely watching several key indicators that suggest significant shifts in traditional investment patterns.\n\nRecent data shows that sustainable investments continue to outperform traditional sectors, with renewable energy leading the charge. This trend is particularly evident in emerging markets, where government initiatives are driving unprecedented growth in green technologies.\n\nHowever, challenges remain. Inflation concerns and geopolitical tensions continue to create market volatility. Experts recommend a diversified portfolio approach, with a focus on both defensive and growth sectors.',
    author: 'Sarah Chen',
    date: '2024-03-15',
    imageUrl: 'https://source.unsplash.com/random/800x600/?finance',
    category: 'Markets',
    flag: 'Featured',
    readTime: '5 min read',
    timestamp: '2024-03-15T09:30:00Z'
  },
  {
    id: '2',
    title: 'Tech Innovation: AIs Impact on Financial Services',
    subheading: 'BREAKING: Financial institutions invest heavily in AI capabilities as machine learning transforms traditional banking.',
    content: "Artificial Intelligence is revolutionizing the financial services industry at an unprecedented pace. From algorithmic trading to personalized banking experiences, AI's fingerprints are everywhere in modern finance.\n\nLeading financial institutions are investing heavily in AI capabilities, with machine learning models now handling everything from risk assessment to customer service. This shift is not just about automation - it's about creating more intelligent, responsive financial systems.\n\nThe implications for traditional banking are profound. As AI systems become more sophisticated, we're seeing the emergence of new financial products and services that were previously impossible to implement at scale.",
    author: 'Michael Rodriguez',
    date: '2024-03-14',
    imageUrl: 'https://source.unsplash.com/random/800x600/?technology',
    category: 'Technology',
    flag: 'Trending',
    readTime: '4 min read',
    timestamp: '2024-03-14T14:15:00Z'
  },
  {
    id: '3',
    title: 'Global Economic Outlook: Q2 2024',
    subheading: 'ANALYSIS: Southeast Asia emerging markets show strong growth potential despite global economic uncertainties.',
    content: 'As we enter the second quarter of 2024, global economic indicators present a mixed picture. Major economies are showing resilience despite ongoing challenges in supply chains and labor markets.\n\nEmerging markets, particularly in Southeast Asia, are demonstrating strong growth potential. However, concerns about debt levels in some regions continue to worry investors and policymakers alike.\n\nCentral banks worldwide are maintaining their cautious stance on monetary policy, with most indicating a preference for data-driven decision-making in the coming months.',
    author: 'David Thompson',
    date: '2024-03-13',
    imageUrl: 'https://source.unsplash.com/random/800x600/?economy',
    category: 'Economy',
    flag: 'Analysis',
    readTime: '6 min read',
    timestamp: '2024-03-13T11:45:00Z'
  }
];

// Simulate API calls
export const getArticles = async (): Promise<Article[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockArticles;
};

export const getArticleById = async (id: string): Promise<Article | undefined> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockArticles.find(article => article.id === id);
};

export const getArticlesByCategory = async (category: string): Promise<Article[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 400));
  return mockArticles.filter(article => article.category === category);
};

export const getFeaturedArticles = async (): Promise<Article[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 400));
  return mockArticles.filter(article => article.flag === 'Featured');
};

export const getTrendingArticles = async (): Promise<Article[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 400));
  return mockArticles.filter(article => article.flag === 'Trending');
}; 