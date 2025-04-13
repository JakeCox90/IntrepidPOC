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

// Define the main categories and subcategories to match the UI
const MAIN_CATEGORIES = [
  'News',
  'Sport',
  'TV',
  'Showbiz',
  'Fabulous',
  'Money',
  'Travel',
  'Tech',
  'Motors',
  'Health',
];

const SUBCATEGORIES: Record<string, string[]> = {
  News: [
    'UKNews',
    'WorldNews',
    'Politics',
    'RoyalFamily',
    'USNews',
    'IrishNews',
    'ScottishNews',
    'Opinion',
  ],
  Sport: [
    'Football',
    'Boxing',
    'Racing',
    'UFC',
    'F1',
    'Cricket',
    'Rugby',
    'Golf',
    'Tennis',
    'NFL',
    'DreamTeam',
  ],
  TV: ['TVNews', 'Soaps', 'RealityTV'],
  Showbiz: ['Celebrity', 'Music', 'Film'],
  Fabulous: ['Fashion', 'Beauty', 'Food', 'Parenting'],
  Money: ['Property', 'Bills', 'Banking', 'Pensions'],
  Travel: ['BeachHolidays', 'UKHolidays', 'CityBreaks', 'Cruises'],
  Tech: ['Phones', 'Gaming', 'Science'],
  Motors: ['NewCars', 'UsedCars'],
  Health: ['Fitness', 'Diet', 'HealthNews'],
};

// Mock articles data based on The Sun's content
const mockArticles: Article[] = [
  {
    id: '1',
    title: 'ROYAL EXCLUSIVE: Prince Harry and Meghan set for UK return',
    subheading: 'Duke and Duchess of Sussex in talks for UK return, marking first joint visit since 2023',
    content: `In a surprising turn of events, Prince Harry and Meghan Markle are planning their first joint return to the UK since 2023.

The Duke and Duchess of Sussex are reportedly in talks to attend a major royal event this summer, marking a significant step in healing family relations.

Sources close to the couple reveal they've been in "positive discussions" with senior royal officials about the visit, which could see them bringing their children, Archie and Lilibet.

The potential reunion comes as the Royal Family continues to adapt to recent changes, including King Charles's health situation and Princess Kate's recovery.`,
    author: 'Matt Wilkinson',
    date: '2024-03-15',
    imageUrl: 'https://images.pexels.com/photos/1024969/pexels-photo-1024969.jpeg',
    category: 'News',
    subcategory: 'UK News',
    flag: 'Exclusive',
    readTime: '3 min read',
    timestamp: '2024-03-15T09:30:00Z',
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
    imageUrl: 'https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg',
    category: 'Sport',
    subcategory: 'Football',
    flag: 'Breaking',
    readTime: '4 min read',
    timestamp: '2024-03-15T10:15:00Z',
    subheading: 'Latest transfer news as Arsenal target Osimhen and Man Utd plan summer exodus',
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
    imageUrl: 'https://images.pexels.com/photos/2510428/pexels-photo-2510428.jpeg',
    category: 'TV',
    subcategory: 'Soaps',
    flag: 'Exclusive',
    readTime: '2 min read',
    timestamp: '2024-03-15T11:00:00Z',
    subheading: 'Long-standing Coronation Street character to leave in dramatic summer storyline',
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
    imageUrl: 'https://images.pexels.com/photos/7567434/pexels-photo-7567434.jpeg',
    category: 'News',
    subcategory: 'Money',
    flag: 'Breaking',
    readTime: '3 min read',
    timestamp: '2024-03-15T12:00:00Z',
    subheading: 'Martin Lewis warns about upcoming changes to energy bills and price caps',
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
    imageUrl: 'https://images.pexels.com/photos/3786091/pexels-photo-3786091.jpeg',
    category: 'Sport',
    subcategory: 'F1',
    flag: 'Breaking',
    readTime: '4 min read',
    timestamp: '2024-03-15T13:30:00Z',
    subheading: 'Hamilton and Verstappen involved in close call during Australian GP practice',
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
    imageUrl: 'https://images.pexels.com/photos/3771069/pexels-photo-3771069.jpeg',
    category: 'TV',
    subcategory: 'Reality TV',
    flag: 'Exclusive',
    readTime: '3 min read',
    timestamp: '2024-03-15T14:45:00Z',
    subheading: 'Love Island winners announce their separation after eight months together',
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
    imageUrl: 'https://images.pexels.com/photos/6567607/pexels-photo-6567607.jpeg',
    category: 'Lifestyle',
    subcategory: 'Fashion',
    flag: 'Trending',
    readTime: '3 min read',
    timestamp: '2024-03-15T15:15:00Z',
    subheading: 'High street retailer launches affordable designer-inspired collection',
    tags: ['Fashion', 'Shopping', 'High Street']
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
    imageUrl: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg',
    category: 'Showbiz',
    subcategory: 'Celebrity News',
    flag: 'Exclusive',
    readTime: '4 min read',
    timestamp: '2024-03-15T16:15:00Z',
    subheading: 'Taylor Swift and Travis Kelce spotted house-hunting in London',
    tags: ['Celebrity News', 'Taylor Swift', 'Travis Kelce']
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
    imageUrl: 'https://images.pexels.com/photos/2294361/pexels-photo-2294361.jpeg',
    category: 'Sport',
    subcategory: 'Boxing',
    flag: 'Breaking',
    readTime: '5 min read',
    timestamp: '2024-03-15T17:00:00Z',
    subheading: 'Anthony Joshua and Tyson Fury agree terms for December showdown at Wembley',
    tags: ['Boxing', 'Anthony Joshua', 'Tyson Fury']
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
    imageUrl: 'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg',
    category: 'News',
    subcategory: 'Tech',
    flag: 'Analysis',
    readTime: '6 min read',
    timestamp: '2024-03-15T17:45:00Z',
    subheading: "Comprehensive review of Apple's latest flagship smartphone",
    tags: ['Tech', 'Apple', 'Smartphones']
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
    imageUrl: 'https://images.pexels.com/photos/2510428/pexels-photo-2510428.jpeg',
    category: 'TV',
    subcategory: 'Soaps',
    flag: 'Exclusive',
    readTime: '3 min read',
    timestamp: '2024-03-15T18:30:00Z',
    subheading: 'Major death to shock Emmerdale viewers in upcoming episodes',
    tags: ['Emmerdale', 'Soaps', 'TV Drama']
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
    imageUrl: 'https://images.pexels.com/photos/3155666/pexels-photo-3155666.jpeg',
    category: 'Lifestyle',
    subcategory: 'Travel',
    flag: 'Featured',
    readTime: '4 min read',
    timestamp: '2024-03-15T19:15:00Z',
    subheading: 'Incredible deal on luxury Turkey holidays perfect for summer getaway',
    tags: ['Travel', 'Holidays', 'Deals']
  },
  {
    id: '13',
    title: 'WORLD NEWS: Global leaders meet for climate summit',
    content: `World leaders have gathered in Paris for a crucial climate summit aimed at accelerating global efforts to combat climate change.

The summit, which brings together representatives from over 100 countries, comes amid growing concerns about rising global temperatures and extreme weather events.

Key topics on the agenda include reducing carbon emissions, transitioning to renewable energy, and providing financial support to developing nations most affected by climate change.

Scientists have warned that without immediate and substantial action, the world is on track to exceed the critical 1.5°C temperature rise threshold within the next decade.`,
    author: 'James Wilson',
    date: '2024-03-14',
    imageUrl: 'https://images.pexels.com/photos/414837/pexels-photo-414837.jpeg',
    category: 'News',
    subcategory: 'World News',
    flag: 'Breaking',
    readTime: '4 min read',
    timestamp: '2024-03-15T20:00:00Z',
    subheading: 'Global leaders gather in Paris for crucial climate summit',
    tags: ['World News', 'Climate Change', 'Politics']
  },
  {
    id: '14',
    title: 'POLITICS: Government announces new housing policy',
    content: `The government has unveiled a comprehensive new housing policy aimed at addressing the ongoing housing crisis and making homeownership more accessible to first-time buyers.

The policy includes measures to increase housing supply, streamline planning processes, and provide financial incentives for developers to build affordable homes.

Housing Secretary Michael Gove described the policy as "a bold step forward" that would "transform the housing market for generations to come."

Opposition parties have criticized the announcement as "too little, too late" and called for more radical measures to address the housing shortage.`,
    author: 'Emma Thompson',
    date: '2024-03-14',
    imageUrl: 'https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg',
    category: 'News',
    subcategory: 'Politics',
    flag: 'Analysis',
    readTime: '5 min read',
    timestamp: '2024-03-15T20:45:00Z',
    subheading: 'Government unveils new housing policy to address crisis',
    tags: ['UK News', 'Politics', 'Housing']
  },
  {
    id: '15',
    title: 'FOOTBALL: Champions League quarter-finals draw announced',
    content: `The draw for the Champions League quarter-finals has been completed, setting up several exciting matches between Europe's top teams.

Defending champions Manchester City will face Bayern Munich in a rematch of last season's semi-final, while Arsenal take on Real Madrid in their first Champions League quarter-final in 14 years.

Barcelona will play Paris Saint-Germain in a clash that will see former PSG star Lionel Messi return to the Parc des Princes, and Inter Milan face Atletico Madrid in the remaining tie.

The first legs will be played on April 9-10, with the return fixtures scheduled for April 16-17.`,
    author: 'David Smith',
    date: '2024-03-15',
    imageUrl: 'https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg',
    category: 'Sport',
    subcategory: 'Football',
    flag: 'Breaking',
    readTime: '3 min read',
    timestamp: '2024-03-15T21:30:00Z',
    subheading: 'Champions League quarter-finals draw sets up exciting matches',
    tags: ['Football', 'Champions League', 'Sport']
  },
  {
    id: '16',
    title: 'BOXING: Fury vs Joshua finally confirmed for summer',
    content: `The long-awaited heavyweight showdown between Tyson Fury and Anthony Joshua has finally been confirmed for this summer.

The all-British clash, which has been years in the making, will take place at Wembley Stadium on July 15th, with both fighters reportedly set to earn upwards of £50million.

Promoter Eddie Hearn confirmed the news at a press conference in London, describing it as "the biggest fight in British boxing history."

The fight is expected to be the biggest boxing event in British history, with pay-per-view numbers predicted to break all previous records.`,
    author: 'Wally Downes Jr',
    date: '2024-03-15',
    imageUrl: 'https://images.pexels.com/photos/2294361/pexels-photo-2294361.jpeg',
    category: 'Sport',
    subcategory: 'Boxing',
    flag: 'Exclusive',
    readTime: '4 min read',
    timestamp: '2024-03-15T15:30:00Z',
    subheading: 'Fury vs Joshua finally confirmed for summer showdown',
    tags: ['Boxing', 'Tyson Fury', 'Anthony Joshua', 'Heavyweight Boxing']
  },
  {
    id: '17',
    title: 'TV NEWS: BBC announces new drama series',
    content: `The BBC has announced a new high-profile drama series set to air later this year, starring several A-list actors.

The series, which has been described as "a gripping political thriller," will explore themes of power, corruption, and redemption in modern British politics.

Filming is set to begin next month, with the first episode expected to air in September as part of the BBC's autumn schedule.

The announcement comes as the broadcaster continues to face competition from streaming services and looks to strengthen its drama output.`,
    author: 'Sarah Johnson',
    date: '2024-03-14',
    imageUrl: 'https://images.pexels.com/photos/2510428/pexels-photo-2510428.jpeg',
    category: 'TV',
    subcategory: 'TV News',
    flag: 'Exclusive',
    readTime: '3 min read',
    timestamp: '2024-03-14T16:45:00Z',
    subheading: 'BBC announces new drama series with A-list cast',
    tags: ['TV', 'BBC', 'Drama', 'Entertainment']
  },
  {
    id: '18',
    title: 'SOAPS: EastEnders star announces departure',
    content: `A long-standing EastEnders star has announced they will be leaving the soap after 15 years on the show.

The actor, who plays one of the show's most beloved characters, revealed the news in an emotional statement, thanking fans for their support over the years.

Show bosses have confirmed that the character will be given a dramatic exit storyline, which will air later this year.

The departure will have major repercussions for several key storylines and will leave viewers on the edge of their seats.`,
    author: 'Michael Brown',
    date: '2024-03-15',
    imageUrl: 'https://images.pexels.com/photos/2510428/pexels-photo-2510428.jpeg',
    category: 'TV',
    subcategory: 'Soaps',
    flag: 'Exclusive',
    readTime: '3 min read',
    timestamp: '2024-03-15T17:15:00Z',
    subheading: 'EastEnders star announces departure after 15 years',
    tags: ['TV', 'Soaps', 'EastEnders', 'Entertainment']
  },
  {
    id: '19',
    title: 'CELEBRITY: Hollywood star spotted in London',
    content: `A Hollywood A-lister has been spotted enjoying a low-key visit to London, sparking rumors of a potential new project in the UK.

The actor, who has starred in several blockbuster films, was seen dining at a restaurant in Mayfair with a small group of friends, away from the usual paparazzi attention.

Sources close to the star suggest they are in town to discuss a potential role in an upcoming British film project, though no official announcement has been made.

The visit comes amid speculation that the actor is looking to expand their career beyond Hollywood and take on more diverse roles.`,
    author: 'Jennifer Parker',
    date: '2024-03-15',
    imageUrl: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg',
    category: 'Showbiz',
    subcategory: 'Celebrity',
    flag: 'Exclusive',
    readTime: '3 min read',
    timestamp: '2024-03-15T18:00:00Z',
    subheading: 'Hollywood star spotted in London amid project rumors',
    tags: ['Celebrity', 'Hollywood', 'London', 'Entertainment']
  },
  {
    id: '20',
    title: 'MUSIC: Chart-topping band announce reunion tour',
    content: `A legendary band that dominated the charts in the 90s has announced a surprise reunion tour, sending fans into a frenzy.

The group, which split acrimoniously 15 years ago, revealed the news at a press conference in London, confirming that all original members will be taking part.

The tour, which will kick off in the UK before heading to Europe and North America, is expected to be one of the biggest music events of the year.

Tickets for the shows are expected to sell out within minutes when they go on sale next week, with fans already camping outside venues.`,
    author: 'Robert Taylor',
    date: '2024-03-14',
    imageUrl: 'https://images.pexels.com/photos/167636/pexels-photo-167636.jpeg',
    category: 'Showbiz',
    subcategory: 'Music',
    flag: 'Breaking',
    readTime: '4 min read',
    timestamp: '2024-03-14T19:30:00Z',
    subheading: 'Legendary band announce reunion tour after 15 years',
    tags: ['Music', 'Tour', 'Reunion', 'Entertainment']
  },
  {
    id: '21',
    title: 'PROPERTY: House prices continue to fall',
    content: `House prices have fallen for the sixth consecutive month, according to the latest data from the UK's largest mortgage lender.

The average property price now stands at £285,000, down 2.5% from the same period last year, marking the longest period of decline since the 2008 financial crisis.

Experts attribute the fall to higher mortgage rates, the cost of living crisis, and economic uncertainty, which have combined to dampen buyer confidence.

The data suggests that the housing market is entering a period of adjustment after the pandemic-driven boom, with prices expected to continue falling gradually throughout the year.`,
    author: 'Lucy Alderson',
    date: '2024-03-15',
    imageUrl: 'https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg',
    category: 'Money',
    subcategory: 'Property',
    flag: 'Analysis',
    readTime: '5 min read',
    timestamp: '2024-03-15T09:45:00Z',
    subheading: 'House prices fall for sixth consecutive month',
    tags: ['Property', 'House Prices', 'Money', 'Economy']
  },
  {
    id: '22',
    title: 'BANKING: Major bank announces branch closures',
    content: `One of the UK's largest banks has announced plans to close 100 branches across the country, citing a shift towards digital banking.

The closures, which will affect both rural and urban areas, are part of a wider restructuring plan aimed at reducing costs and improving efficiency.

The bank has reassured customers that all affected branches will have alternative banking facilities within a reasonable distance, and staff will be offered redeployment opportunities.

The announcement has sparked concern among consumer groups, who warn that vulnerable customers who rely on face-to-face banking services will be hardest hit.`,
    author: 'David Williams',
    date: '2024-03-14',
    imageUrl: 'https://images.pexels.com/photos/7567434/pexels-photo-7567434.jpeg',
    category: 'Money',
    subcategory: 'Banking',
    flag: 'Breaking',
    readTime: '4 min read',
    timestamp: '2024-03-14T11:15:00Z',
    subheading: 'Major bank announces closure of 100 branches',
    tags: ['Banking', 'Branches', 'Money', 'Finance']
  },
  {
    id: '23',
    title: 'BEACH HOLIDAYS: Best value destinations for summer 2024',
    content: `With summer just around the corner, holiday experts have revealed the best value beach destinations for British tourists in 2024.

The list, compiled based on flight costs, accommodation prices, and the strength of the pound against local currencies, highlights several surprising destinations offering excellent value.

Topping the list is Turkey, where the pound is currently strong against the lira, making everything from meals to activities significantly cheaper than in previous years.

Other destinations offering good value include Bulgaria, Greece, and Portugal, though prices in some popular Spanish resorts have increased due to high demand.`,
    author: 'Lisa Minot',
    date: '2024-03-15',
    imageUrl: 'https://images.pexels.com/photos/3155666/pexels-photo-3155666.jpeg',
    category: 'Travel',
    subcategory: 'Beach Holidays',
    flag: 'Featured',
    readTime: '5 min read',
    timestamp: '2024-03-15T10:30:00Z',
    subheading: 'Best value beach destinations for summer 2024 revealed',
    tags: ['Travel', 'Beach Holidays', 'Summer', 'Holidays']
  },
  {
    id: '24',
    title: 'CITY BREAKS: European capitals ranked by value',
    content: `A new study has ranked European capital cities by value for money, revealing which destinations offer the best experience for British tourists on a budget.

The research, which compared accommodation costs, restaurant prices, public transport fares, and the cost of popular attractions, found significant variations between cities.

Eastern European capitals dominated the value rankings, with Budapest, Prague, and Warsaw offering the best combination of culture, history, and affordability.

Paris and London were among the most expensive destinations, though the study noted that both cities offer many free attractions that can help keep costs down.`,
    author: 'James Wilson',
    date: '2024-03-14',
    imageUrl: 'https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg',
    category: 'Travel',
    subcategory: 'City Breaks',
    flag: 'Analysis',
    readTime: '4 min read',
    timestamp: '2024-03-14T13:45:00Z',
    subheading: 'European capitals ranked by value for money',
    tags: ['Travel', 'City Breaks', 'Europe', 'Holidays']
  },
  {
    id: '25',
    title: 'PHONES: New smartphone features revealed',
    content: `Details of the next generation of smartphones have been leaked, revealing several innovative features that could transform how we use our devices.

The leaks, which appear to be from a reliable source within the industry, suggest that manufacturers are focusing on improving battery life, camera capabilities, and AI integration.

One of the most intriguing features is a new type of foldable screen that can be bent in multiple directions, potentially allowing for entirely new form factors.

The leaks also suggest that the next wave of smartphones will place a greater emphasis on sustainability, with more recyclable materials and longer product lifecycles.`,
    author: 'Sean Keach',
    date: '2024-03-15',
    imageUrl: 'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg',
    category: 'Tech',
    subcategory: 'Phones',
    flag: 'Exclusive',
    readTime: '4 min read',
    timestamp: '2024-03-15T14:30:00Z',
    subheading: 'Next generation smartphone features revealed in leak',
    tags: ['Tech', 'Smartphones', 'Innovation', 'Technology']
  },
  {
    id: '26',
    title: 'GAMING: Major console release date confirmed',
    content: `The release date for one of the most anticipated gaming consoles of the year has been confirmed, ending months of speculation.

The new console, which promises to deliver unprecedented graphical fidelity and processing power, will be available in stores from November 15th.

Pre-orders will open next month, with the manufacturer expecting high demand based on the positive reception to early previews of the system.

The console will launch with a strong lineup of exclusive games, including several new franchises and remasters of beloved classics.`,
    author: 'Tom Phillips',
    date: '2024-03-14',
    imageUrl: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg',
    category: 'Tech',
    subcategory: 'Gaming',
    flag: 'Breaking',
    readTime: '3 min read',
    timestamp: '2024-03-14T15:15:00Z',
    subheading: 'Release date confirmed for major new gaming console',
    tags: ['Gaming', 'Console', 'Technology', 'Entertainment']
  },
  {
    id: '27',
    title: 'NEW CARS: Electric vehicle range records broken',
    content: `A new electric vehicle has broken the record for the longest range on a single charge, marking a significant milestone in the development of battery technology.

The car, which is due to go on sale later this year, managed to travel over 600 miles on a single charge during a controlled test, far exceeding the current industry standard.

The achievement has been hailed as a "game-changer" for the electric vehicle market, potentially addressing one of the main concerns for potential buyers: range anxiety.

Manufacturers are now racing to incorporate similar battery technology into their own models, with several promising to match or exceed this range within the next two years.`,
    author: 'John Smith',
    date: '2024-03-15',
    imageUrl: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg',
    category: 'Motors',
    subcategory: 'New Cars',
    flag: 'Breaking',
    readTime: '4 min read',
    timestamp: '2024-03-15T16:00:00Z',
    subheading: 'Electric vehicle breaks range record with 600-mile journey',
    tags: ['Motors', 'Electric Vehicles', 'Technology', 'Cars']
  },
  {
    id: '28',
    title: 'USED CARS: Best value models revealed',
    content: `A new study has identified the best value used cars on the market, helping buyers make informed decisions in the current economic climate.

The research, which analyzed depreciation rates, running costs, reliability data, and resale values, found that some models offer significantly better value than others.

Small family cars dominated the top spots, with several Japanese models praised for their combination of reliability, fuel efficiency, and low maintenance costs.

The study also highlighted the growing value of used electric and hybrid vehicles, which are becoming increasingly affordable as more enter the second-hand market.`,
    author: 'Sarah Johnson',
    date: '2024-03-14',
    imageUrl: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg',
    category: 'Motors',
    subcategory: 'Used Cars',
    flag: 'Analysis',
    readTime: '5 min read',
    timestamp: '2024-03-14T17:30:00Z',
    subheading: 'Best value used cars revealed in new study',
    tags: ['Motors', 'Used Cars', 'Value', 'Cars']
  },
  {
    id: '29',
    title: 'FITNESS: New exercise trend takes social media by storm',
    content: `A new fitness trend has gone viral on social media, with millions of people sharing videos of themselves participating in the latest workout craze.

The exercise, which combines elements of dance, yoga, and high-intensity interval training, has been praised for its accessibility and effectiveness.

Fitness experts have analyzed the trend and confirmed that it does offer genuine health benefits, particularly for cardiovascular fitness and flexibility.

The phenomenon has also sparked a broader conversation about how social media is changing the fitness industry, making workouts more accessible and community-driven.`,
    author: 'Emma Thompson',
    date: '2024-03-15',
    imageUrl: 'https://images.pexels.com/photos/2294361/pexels-photo-2294361.jpeg',
    category: 'Health',
    subcategory: 'Fitness',
    flag: 'Trending',
    readTime: '4 min read',
    timestamp: '2024-03-15T18:30:00Z',
    subheading: 'New fitness trend goes viral on social media',
    tags: ['Health', 'Fitness', 'Social Media', 'Exercise']
  },
  {
    id: '30',
    title: 'DIET: Revolutionary weight loss study published',
    content: `A groundbreaking study on weight loss has been published, challenging long-held assumptions about dieting and metabolism.

The research, which followed 1,000 participants over a two-year period, found that the timing of meals may be more important than previously thought for successful weight loss.

Participants who ate their largest meal earlier in the day lost significantly more weight than those who consumed the same calories but ate later, suggesting that our body's circadian rhythm plays a crucial role in metabolism.

The study's authors hope that these findings will lead to more personalized and effective weight loss strategies, moving away from the one-size-fits-all approach that has dominated the diet industry.`,
    author: 'Michael Brown',
    date: '2024-03-14',
    imageUrl: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg',
    category: 'Health',
    subcategory: 'Diet',
    flag: 'Analysis',
    readTime: '5 min read',
    timestamp: '2024-03-14T19:00:00Z',
    subheading: 'Revolutionary weight loss study challenges dieting assumptions',
    tags: ['Health', 'Diet', 'Weight Loss', 'Science']
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
  // Handle the mismatch between UI subcategories and mock data subcategories
  // Map UI subcategories to mock data subcategories
  const categoryMap: Record<string, string> = {
    'UKNews': 'UK News',
    'WorldNews': 'World News',
    'RoyalFamily': 'Royal Family',
    'USNews': 'US News',
    'IrishNews': 'Irish News',
    'ScottishNews': 'Scottish News',
    'TVNews': 'TV News',
    'RealityTV': 'Reality TV',
    'BeachHolidays': 'Beach Holidays',
    'UKHolidays': 'UK Holidays',
    'CityBreaks': 'City Breaks',
    'HealthNews': 'Health News'
  };
  
  // If the category is in our mapping, use the mapped value
  const mappedCategory = categoryMap[category] || category;
  
  // For main categories, just use getArticlesByCategory
  if (MAIN_CATEGORIES.includes(category)) {
    return getArticlesByCategory(category);
  }
  
  // For subcategories, we need to find the main category first
  let mainCategory = '';
  for (const [main, subs] of Object.entries(SUBCATEGORIES)) {
    if (subs.includes(category)) {
      mainCategory = main;
      break;
    }
  }
  
  // If we found a main category, use it with the mapped subcategory
  if (mainCategory) {
    return getArticlesByCategory(mainCategory, mappedCategory);
  }
  
  // Fallback to just using the category as is
  return getArticlesByCategory(category);
};

// Function to fetch all Sun news articles
export const fetchSunNews = async (): Promise<Article[]> => {
  return getArticles();
};
