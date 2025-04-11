import { Article } from '../types/article';

// Define the main sections and their subsections
export const SECTIONS = {
  NEWS: {
    name: 'News',
    subsections: ['UK News', 'World News', 'Politics', 'Health', 'Money', 'Tech']
  },
  SPORT: {
    name: 'Sport',
    subsections: ['Football', 'Boxing', 'F1', 'Cricket', 'Rugby Union', 'UFC', 'WWE']
  },
  TV: {
    name: 'TV',
    subsections: ['Soaps', 'TV News', 'Reality TV', 'Netflix', 'Amazon Prime']
  },
  SHOWBIZ: {
    name: 'Showbiz',
    subsections: ['Celebrity News', 'Music', 'Film', 'Entertainment']
  },
  LIFESTYLE: {
    name: 'Lifestyle',
    subsections: ['Fashion', 'Food', 'Travel', 'Motors']
  }
};

// Mock articles data based on The Sun's content
const mockArticles: Article[] = [
  {
    id: '1',
    title: 'ROYAL EXCLUSIVE: Prince Harry and Meghan set for UK return',
    content: `In a surprising turn of events, Prince Harry and Meghan Markle are planning their first joint return to the UK since 2023.

The Duke and Duchess of Sussex are reportedly in talks to attend a major royal event this summer, marking a significant step in healing family relations.

Sources close to the couple reveal they've been in "positive discussions" with senior royal officials about the visit, which could see them bringing their children, Archie and Lilibet.

The potential reunion comes as the Royal Family continues to adapt to recent changes, including King Charles's health situation and Princess Kate's recovery.`,
    author: 'Matt Wilkinson',
    date: '2024-03-15',
    imageUrl: 'https://source.unsplash.com/random/800x600/?royal-family',
    category: 'News',
    subcategory: 'UK News',
    flag: 'Exclusive',
    readTime: '3 min read',
    timestamp: '2024-03-15T09:30:00Z',
    summary: 'Duke and Duchess of Sussex in talks for UK return, marking first joint visit since 2023',
    tags: ['Royal Family', 'Prince Harry', 'Meghan Markle', 'UK News']
  },
  {
    id: '2',
    title: 'TRANSFER NEWS LIVE: Arsenal eye £100m striker as Man Utd plot summer clear-out',
    content: `Arsenal are preparing a club-record bid for Napoli striker Victor Osimhen as Mikel Arteta looks to bolster his attacking options for next season.

The Gunners are ready to battle it out with Chelsea and PSG for the Nigerian international, who has a £100m release clause in his contract.

Meanwhile, Manchester United's new part-owner Sir Jim Ratcliffe is planning a major squad overhaul, with up to seven first-team players potentially leaving Old Trafford this summer.

The Red Devils are also monitoring several targets, including Crystal Palace's Michael Olise and Everton's Jarrad Branthwaite.`,
    author: 'Jordan Davies',
    date: '2024-03-15',
    imageUrl: 'https://source.unsplash.com/random/800x600/?football',
    category: 'Sport',
    subcategory: 'Football',
    flag: 'Breaking',
    readTime: '4 min read',
    timestamp: '2024-03-15T10:15:00Z',
    summary: 'Latest transfer news as Arsenal target Osimhen and Man Utd plan summer exodus',
    tags: ['Football', 'Transfer News', 'Arsenal', 'Manchester United']
  },
  {
    id: '3',
    title: 'CORRIE SHOCK: Major character set for dramatic exit after 15 years',
    content: `Coronation Street fans are in for a shock as a beloved character is set to leave the cobbles after 15 years on the show.

The dramatic exit storyline, which will air in the coming months, is being kept tightly under wraps, but sources say it will be one of the biggest departures in recent years.

Show insiders reveal the exit will have major repercussions for several key storylines and will leave viewers on the edge of their seats.

The character's departure is expected to air during the show's crucial summer ratings period.`,
    author: 'Sarah Tetteh',
    date: '2024-03-15',
    imageUrl: 'https://source.unsplash.com/random/800x600/?tv-show',
    category: 'TV',
    subcategory: 'Soaps',
    flag: 'Exclusive',
    readTime: '2 min read',
    timestamp: '2024-03-15T11:00:00Z',
    summary: 'Long-standing Coronation Street character to leave in dramatic summer storyline',
    tags: ['Coronation Street', 'Soaps', 'TV Drama']
  },
  {
    id: '4',
    title: 'MONEY MATTERS: Martin Lewis warns millions about energy bill changes',
    content: `Money saving expert Martin Lewis has issued an urgent warning about upcoming changes to energy bills that could affect millions of households.

The financial guru explained that the Ofgem price cap is set to change, potentially impacting household budgets significantly.

"From April, we're seeing a major shift in how energy prices are calculated," Lewis explained. "Some households could see their bills rise, while others might benefit from the changes."

He advised viewers to check their current tariffs and consider switching providers before the new rules take effect.`,
    author: 'Lucy Alderson',
    date: '2024-03-15',
    imageUrl: 'https://source.unsplash.com/random/800x600/?money',
    category: 'News',
    subcategory: 'Money',
    flag: 'Breaking',
    readTime: '3 min read',
    timestamp: '2024-03-15T12:00:00Z',
    summary: 'Martin Lewis warns about upcoming changes to energy bills and price caps',
    tags: ['Money Saving', 'Energy Bills', 'Martin Lewis', 'Cost of Living']
  },
  {
    id: '5',
    title: 'F1 DRAMA: Hamilton and Verstappen clash in dramatic Australian GP practice',
    content: `Lewis Hamilton and Max Verstappen were involved in a dramatic incident during practice for the Australian Grand Prix, setting up a potentially explosive race weekend.

The two championship rivals came close to contact at Turn 3, with both drivers later expressing their frustration over team radio.

Mercedes team principal Toto Wolff described the incident as "unnecessary" but insisted his team remains focused on delivering a strong performance in Sunday's race.

The incident has added extra spice to what was already shaping up to be a crucial weekend in the championship battle.`,
    author: 'Ben Hunt',
    date: '2024-03-15',
    imageUrl: 'https://source.unsplash.com/random/800x600/?formula1',
    category: 'Sport',
    subcategory: 'F1',
    flag: 'Breaking',
    readTime: '4 min read',
    timestamp: '2024-03-15T13:30:00Z',
    summary: 'Hamilton and Verstappen involved in close call during Australian GP practice',
    tags: ['F1', 'Lewis Hamilton', 'Max Verstappen', 'Australian GP']
  },
  {
    id: '6',
    title: 'LOVE ISLAND SHOCK: Former winners announce split after eight months',
    content: `Love Island winners have announced their shock split just eight months after taking home the £50,000 prize.

The couple, who won viewers' hearts during their time in the villa, confirmed the news through their social media accounts, citing the pressures of their newfound fame and busy schedules.

Sources close to the pair reveal that tensions had been building for several weeks, with their work commitments keeping them apart for extended periods.

Fans have expressed their disappointment at the news, with many having followed their journey since their time on the show.`,
    author: 'Carl Greenwood',
    date: '2024-03-15',
    imageUrl: 'https://source.unsplash.com/random/800x600/?reality-tv',
    category: 'TV',
    subcategory: 'Reality TV',
    flag: 'Exclusive',
    readTime: '3 min read',
    timestamp: '2024-03-15T14:45:00Z',
    summary: 'Love Island winners announce their separation after eight months together',
    tags: ['Love Island', 'Reality TV', 'Celebrity News']
  },
  {
    id: '7',
    title: 'FASHION FINDS: High street store selling designer dupes from just £12',
    content: `Fashion enthusiasts are flocking to a popular high street store for their incredible designer dupes, with prices starting from just £12.

The collection includes pieces that look remarkably similar to items from luxury brands like Prada, Gucci, and Bottega Veneta, but at a fraction of the cost.

Style experts have praised the quality and attention to detail in the designs, with many pieces already selling out online.

Fashion influencers have been showcasing the items on social media, leading to unprecedented demand.`,
    author: 'Abby McHale',
    date: '2024-03-15',
    imageUrl: 'https://source.unsplash.com/random/800x600/?fashion',
    category: 'Lifestyle',
    subcategory: 'Fashion',
    flag: 'Trending',
    readTime: '3 min read',
    timestamp: '2024-03-15T15:15:00Z',
    summary: 'High street retailer launches affordable designer-inspired collection',
    tags: ['Fashion', 'Shopping', 'Designer Dupes', 'High Street']
  },
  {
    id: '8',
    title: "WORLD EXCLUSIVE: Inside Taylor Swift's secret London visit",
    content: `Taylor Swift made a secret trip to London last weekend, The Sun can exclusively reveal.

The global superstar was spotted at a private members' club in Mayfair with boyfriend Travis Kelce, where they enjoyed a romantic dinner away from prying eyes.

Sources tell The Sun that the couple are house-hunting in the capital, with Swift reportedly interested in purchasing a permanent base in the UK.

The visit comes ahead of Swift's highly anticipated European tour dates, which include six nights at Wembley Stadium.`,
    author: 'Simon Boyle',
    date: '2024-03-15',
    imageUrl: 'https://source.unsplash.com/random/800x600/?concert',
    category: 'Showbiz',
    subcategory: 'Celebrity News',
    flag: 'Exclusive',
    readTime: '4 min read',
    timestamp: '2024-03-15T16:00:00Z',
    summary: 'Taylor Swift and Travis Kelce spotted house-hunting in London',
    tags: ['Taylor Swift', 'Travis Kelce', 'Celebrity News', 'Music']
  },
  {
    id: '9',
    title: 'BOXING SHOWDOWN: Joshua vs Fury finally agreed for December',
    content: `Anthony Joshua and Tyson Fury have finally agreed terms for their long-awaited heavyweight showdown this December.

The all-British clash, which has been years in the making, will take place at Wembley Stadium on December 7th, with both fighters reportedly set to earn upwards of £50million.

Promoter Eddie Hearn confirmed to The Sun that contracts have been signed by both parties, with only the venue agreement left to finalize.

The fight is expected to be the biggest boxing event in British history, with pay-per-view numbers predicted to break all previous records.`,
    author: 'Wally Downes Jr',
    date: '2024-03-15',
    imageUrl: 'https://source.unsplash.com/random/800x600/?boxing',
    category: 'Sport',
    subcategory: 'Boxing',
    flag: 'Breaking',
    readTime: '5 min read',
    timestamp: '2024-03-15T16:30:00Z',
    summary: 'Anthony Joshua and Tyson Fury agree terms for December showdown at Wembley',
    tags: ['Boxing', 'Anthony Joshua', 'Tyson Fury', 'Heavyweight Boxing']
  },
  {
    id: '10',
    title: 'TECH REVIEW: iPhone 16 Pro Max - worth the upgrade?',
    content: `Apple's latest flagship phone has arrived, but is it worth the hefty price tag? The Sun puts the iPhone 16 Pro Max through its paces.

The new device boasts significant camera improvements, including a 48MP main sensor and enhanced AI capabilities for photo processing.

Battery life has also seen a notable boost, with our tests showing up to 20% longer usage compared to the iPhone 15 Pro Max.

However, with prices starting at £1,199, potential buyers will need to carefully consider if the upgrades justify the investment.`,
    author: 'Sean Keach',
    date: '2024-03-15',
    imageUrl: 'https://source.unsplash.com/random/800x600/?iphone',
    category: 'News',
    subcategory: 'Tech',
    flag: 'Analysis',
    readTime: '6 min read',
    timestamp: '2024-03-15T17:00:00Z',
    summary: "Comprehensive review of Apple's latest flagship smartphone",
    tags: ['iPhone', 'Apple', 'Tech Review', 'Smartphones']
  },
  {
    id: '11',
    title: 'EMMERDALE SPOILER: Major character death rocks the village',
    content: `Emmerdale fans are in for a shock next week as a beloved character meets a tragic end in dramatic scenes.

The storyline, which has been carefully planned for months, will have far-reaching consequences for several of the show's key families.

Sources tell The Sun that the scenes were so emotional that several cast members were left in tears after filming.

The aftermath of the death will play out over several weeks, leading to a explosive summer storyline.`,
    author: 'Sarah Tetteh',
    date: '2024-03-15',
    imageUrl: 'https://source.unsplash.com/random/800x600/?village',
    category: 'TV',
    subcategory: 'Soaps',
    flag: 'Exclusive',
    readTime: '3 min read',
    timestamp: '2024-03-15T17:30:00Z',
    summary: 'Major death to shock Emmerdale viewers in upcoming episodes',
    tags: ['Emmerdale', 'Soaps', 'TV Drama', 'ITV']
  },
  {
    id: '12',
    title: 'TRAVEL BARGAIN: Five-star Turkey holidays from £299pp',
    content: `Holiday-makers can bag an incredible deal on five-star Turkey holidays, with prices starting from just £299 per person.

The offer includes seven nights at a luxury beachfront resort, return flights, and all-inclusive board, making it perfect for families looking for a summer getaway.

Travel expert Lisa Minot says: "This is one of the best value deals I've seen this year. Turkey continues to offer incredible value for British tourists."

The deal is available for selected dates between May and October, with peak summer dates available at a supplement.`,
    author: 'Lisa Minot',
    date: '2024-03-15',
    imageUrl: 'https://source.unsplash.com/random/800x600/?beach-resort',
    category: 'Lifestyle',
    subcategory: 'Travel',
    flag: 'Featured',
    readTime: '4 min read',
    timestamp: '2024-03-15T18:00:00Z',
    summary: 'Incredible deal on luxury Turkey holidays perfect for summer getaway',
    tags: ['Travel Deals', 'Turkey', 'Holidays', 'All Inclusive']
  }
];

// Add more mock articles for each section...

// Service functions
export const getArticles = async (): Promise<Article[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockArticles;
};

export const getArticleById = async (id: string): Promise<Article | undefined> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockArticles.find(article => article.id === id);
};

export const getArticlesByCategory = async (category: string, subcategory?: string): Promise<Article[]> => {
  await new Promise(resolve => setTimeout(resolve, 400));
  return mockArticles.filter(article => {
    if (subcategory) {
      return article.category === category && article.subcategory === subcategory;
    }
    return article.category === category;
  });
};

export const getFeaturedArticles = async (): Promise<Article[]> => {
  await new Promise(resolve => setTimeout(resolve, 400));
  return mockArticles.filter(article => article.flag === 'Featured' || article.flag === 'Exclusive');
};

export const getTrendingArticles = async (): Promise<Article[]> => {
  await new Promise(resolve => setTimeout(resolve, 400));
  return mockArticles.filter(article => article.flag === 'Trending');
};

export const getBreakingNews = async (): Promise<Article[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockArticles.filter(article => article.flag === 'Breaking');
};

export const searchArticles = async (query: string): Promise<Article[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const lowercaseQuery = query.toLowerCase();
  return mockArticles.filter(article => 
    article.title.toLowerCase().includes(lowercaseQuery) ||
    article.content.toLowerCase().includes(lowercaseQuery) ||
    article.tags?.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
};

export const getRelatedArticles = async (articleId: string): Promise<Article[]> => {
  await new Promise(resolve => setTimeout(resolve, 400));
  const article = mockArticles.find(a => a.id === articleId);
  if (!article) return [];
  
  return mockArticles.filter(a => 
    a.id !== articleId && (
      a.category === article.category ||
      a.subcategory === article.subcategory ||
      article.tags?.some(tag => a.tags?.includes(tag))
    )
  );
};

// Helper function to get all available sections
export const getSections = async (): Promise<typeof SECTIONS> => {
  await new Promise(resolve => setTimeout(resolve, 200));
  return SECTIONS;
};

// Helper function to get subsections for a specific section
export const getSubsections = async (category: string): Promise<string[]> => {
  await new Promise(resolve => setTimeout(resolve, 200));
  const section = Object.values(SECTIONS).find(s => s.name === category);
  return section?.subsections || [];
};

// Alias for getArticlesByCategory to maintain compatibility with existing code
export const fetchNewsByCategory = async (category: string): Promise<Article[]> => {
  return getArticlesByCategory(category);
};

// Function to fetch all Sun news articles
export const fetchSunNews = async (): Promise<Article[]> => {
  return getArticles();
};
