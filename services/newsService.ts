// This is a mock service that simulates fetching news from thesun.co.uk
// In a real app, you would use fetch or axios to get data from an API

// Mock data based on The Sun content
export const mockNews = [
  {
    id: 1,
    title:
      'MASTERBLASTER Tottenham Premier League chief Richard Masters with cheeky message on VAR',
    category: 'Football',
    timestamp: '2 hours ago',
    imageUrl: 'https://i.imgur.com/ZLdnUOH.jpg',
    readTime: '3 min read',
    content:
      'Premier League chief Richard Masters has sent a cheeky message about VAR after Tottenham\'s controversial win over Liverpool.\n\nThe Duke and Duchess of Sussex were all smiles as they arrived at the venue, with Meghan stunning in a cream-colored dress while Harry opted for a navy blue suit.\n\nThe couple, who stepped down as senior royals in 2020, spent nearly two hours at the event, which was organized to raise funds for children\'s education in underprivileged communities. They were seen mingling with guests and engaging in deep conversations about the cause.\n\n"They were incredibly down-to-earth and genuinely interested in the work we\'re doing," said one of the organizers, who wished to remain anonymous. "It wasn\'t just a photo opportunity for them. They asked thoughtful questions and shared their own insights on how to make a meaningful impact."\n\nThis appearance comes amid reports of ongoing tensions with the royal family, particularly following the release of their Netflix series and Harry\'s memoir, "Spare." However, sources close to the couple insist they are focused on their charitable work and building their new life in California with their two children, Archie and Lilibet.',
  },
  {
    id: 2,
    title: 'IN THE CAN Jake Paul rematch and James Canelo over failed fight',
    category: 'Boxing',
    timestamp: '5 hours ago',
    imageUrl: 'https://i.imgur.com/JaCBiCp.jpg',
    readTime: '3 min read',
    content:
      'Jake Paul has called for a rematch with Canelo Alvarez after their failed fight negotiations.\n\nThe identity of the target remains undisclosed, but insiders suggest it could be a high-profile name from one of Europe\'s top leagues. The fee is expected to be in the region of £60 million, which would make it one of the most expensive January transfers in Premier League history.\n\n"The club is working tirelessly behind the scenes to get this deal over the line," said a source familiar with the negotiations. "Ten Hag has identified specific qualities he wants in a forward, and the board is backing him fully."\n\nUnited\'s current forwards have underperformed this season, with injuries and poor form affecting their output. The new signing would be expected to hit the ground running and help the team secure a top-four finish, which is crucial for their financial projections.\n\nFans have reacted positively to the rumors, with many taking to social media to express their excitement about the potential new arrival. "We desperately need a clinical finisher," wrote one supporter on Twitter. "If this goes through, it could transform our season."',
  },
  {
    id: 3,
    title: "READY PLAYER RON Walker's wife Annie poses behind wheel of £70k Mercedes",
    category: 'Football',
    timestamp: 'Yesterday',
    imageUrl: 'https://i.imgur.com/7BjQIEE.jpg',
    readTime: '3 min read',
    content:
      'Annie Walker, wife of football star Ron Walker, has been spotted posing behind the wheel of a £70,000 Mercedes.\n\n"The perfect roast is all about respecting the basics," Oliver explained during a recent interview. "Quality ingredients, proper seasoning, and most importantly, giving yourself enough time. That\'s where most people go wrong – they rush."\n\nAccording to Oliver, the ideal roast potato – often considered the highlight of any Sunday dinner – requires par-boiling for exactly 10 minutes before roasting in hot oil or fat. "The rough edges from the par-boiling create that perfect crispy exterior," he said.\n\nFor the meat, whether it\'s beef, chicken, or lamb, Oliver recommends bringing it to room temperature before cooking and always allowing it to rest afterward. "The resting is non-negotiable. Skip that step, and you\'ll lose all those beautiful juices when you cut into it."\n\nThe chef also emphasized the importance of homemade gravy using the meat drippings, calling store-bought versions "a missed opportunity for flavor." His final tip was to add a unexpected element to traditional vegetables, such as a drizzle of honey on carrots or a sprinkle of lemon zest on peas.\n\n"These little touches elevate the whole meal without complicating things," he said. "Sunday roast should be special, but it shouldn\'t be stressful."',
  },
  {
    id: 4,
    title:
      'KANE NOT BE SERIOUS Kane tipped to make stunning Liverpool transfer by Premier League legend',
    category: 'Football',
    timestamp: '3 hours ago',
    imageUrl: 'https://i.imgur.com/JfVDTLs.jpg',
    readTime: '3 min read',
    content:
      'Harry Kane has been tipped to make a stunning transfer to Liverpool by a Premier League legend.\n\n"We\'re looking at a significant change in our weather pattern starting Monday," said Met Office chief meteorologist Dr. Sarah Thompson. "A high-pressure system moving in from the Azores will bring hot air from North Africa and the Mediterranean, resulting in temperatures well above the seasonal average."\n\nThe southeast is expected to experience the highest temperatures, with London potentially reaching 32°C by Wednesday. Even Scotland and Northern Ireland will see unusually warm conditions, with forecasts suggesting 25-27°C for Edinburgh and Belfast.\n\nHealth authorities have issued warnings, particularly for vulnerable groups such as the elderly and those with pre-existing medical conditions. "This sudden rise in temperature can be dangerous, especially coming so late in the season when people have acclimatized to cooler conditions," said Dr. James Roberts from Public Health England.\n\nWater companies are also preparing for increased demand, with some already urging customers to use water wisely. "During the last heatwave, we saw consumption increase by 40% in some areas," said a spokesperson for Thames Water. "We\'re asking people to be mindful of their usage, particularly with garden watering."\n\nThe heatwave is expected to break by the following weekend, with thunderstorms likely as the hot air mass clashes with cooler Atlantic systems.',
  },
  {
    id: 5,
    title: "DONE FER Fernandes left red-faced over antics seconds before Ronaldo's worst penalty",
    category: 'Football',
    timestamp: '1 day ago',
    imageUrl: 'https://i.imgur.com/QVZLMGj.jpg',
    readTime: '3 min read',
    content:
      "Bruno Fernandes was left red-faced after his antics seconds before Cristiano Ronaldo's worst penalty miss. The Portuguese midfielder was seen gesturing and attempting to distract Liverpool goalkeeper Alisson Becker just moments before his compatriot stepped up to take the spot kick. However, his mind games backfired spectacularly as Ronaldo proceeded to blast the penalty well over the crossbar, leaving both players visibly frustrated.\n\nThe incident occurred in the 82nd minute with United trailing 2-1, and the miss proved costly as Liverpool held on for a crucial victory. Former United captain Roy Keane was particularly critical of Fernandes' behavior, calling it 'unnecessary and unprofessional' during his post-match analysis.\n\n\"You don't need those kinds of antics, especially when you've got someone like Ronaldo taking the penalty,\" said Keane. \"It just adds unnecessary pressure to the situation and clearly didn't help.\"\n\nThe moment has since gone viral on social media, with fans and pundits alike questioning Fernandes' decision to involve himself in the build-up to such a crucial moment. The midfielder, who has previously been criticized for similar behavior, declined to comment on the incident after the match.",
  },
];

export const fetchLatestNews = async () => {
  // Simulate network request
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(mockNews);
    }, 1000);
  });
};

export const fetchNewsByCategory = async category => {
  // Simulate network request
  return new Promise(resolve => {
    setTimeout(() => {
      if (category === 'all') {
        resolve(mockNews);
      } else {
        // Filter by category (case insensitive)
        const filteredNews = mockNews.filter(
          item => item.category.toLowerCase() === category.toLowerCase(),
        );

        // If no news in that category, return all news
        resolve(filteredNews.length > 0 ? filteredNews : mockNews);
      }
    }, 800);
  });
};

export const fetchArticleById = async id => {
  // Simulate network request
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const article = mockNews.find(item => item.id === id);
      if (article) {
        resolve(article);
      } else {
        reject(new Error('Article not found'));
      }
    }, 500);
  });
};

export const searchNews = async query => {
  // Simulate network request
  return new Promise(resolve => {
    setTimeout(() => {
      if (!query) {
        resolve([]);
        return;
      }

      const lowerCaseQuery = query.toLowerCase();
      const results = mockNews.filter(
        item =>
          item.title.toLowerCase().includes(lowerCaseQuery) ||
          item.content.toLowerCase().includes(lowerCaseQuery) ||
          item.category.toLowerCase().includes(lowerCaseQuery),
      );

      resolve(results);
    }, 1000);
  });
};
