// Types for our news data
export interface Article {
  id: string;
  title: string;
  category: string;
  subcategory?: string;
  imageUrl: string;
  timestamp: string;
  readTime: string;
  content: string;
  author?: string;
  url: string;
  flag?: string;
}

// Function to determine read time based on content length
// Function to determine read time based on content length
// Removed unused function:
// const calculateReadTime = (content: string): string => {
//   const wordsPerMinute = 200;
//   const words = content.split(/\s+/).length;
//   const minutes = Math.ceil(words / wordsPerMinute);
//   return `${minutes} min read`;
// };

// Function to extract flags from article titles
const extractFlagFromTitle = (title: string): { flag?: string; cleanTitle: string } => {
  // Common news flags that might appear at the start of titles
  const commonFlags = [
    'PICTURED',
    'WATCH',
    'UPDATED',
    'LIVE',
    'SHOCK',
    'TRAGIC',
    'HORROR',
    'URGENT',
    'WARNING',
  ];

  // Check if title starts with a flag followed by a colon
  const flagColonRegex = new RegExp(`^(${commonFlags.join('|')}):\\s*(.+)$`, 'i');
  const flagColonMatch = title.match(flagColonRegex);

  if (flagColonMatch) {
    return {
      flag: flagColonMatch[1].toUpperCase(),
      cleanTitle: flagColonMatch[2],
    };
  }

  // Check for all-caps words at the beginning (max 2 words)
  const words = title.split(' ');
  if (words.length > 2) {
    const firstTwoWords = words.slice(0, 2).join(' ');
    if (firstTwoWords === firstTwoWords.toUpperCase() && firstTwoWords.length > 3) {
      return {
        flag: firstTwoWords,
        cleanTitle: words.slice(2).join(' '),
      };
    }
  }

  // Check for a single all-caps word at the beginning
  if (words.length > 1) {
    const firstWord = words[0];
    if (firstWord === firstWord.toUpperCase() && firstWord.length > 3) {
      return {
        flag: firstWord,
        cleanTitle: words.slice(1).join(' '),
      };
    }
  }

  return { cleanTitle: title };
};
// Use mock reading times instead of calculating based on content length
// Update some of the mock articles to ensure proper category distribution
const mockSunArticles: Article[] = [
  {
    id: 'sun-1',
    title:
      'MASTERBLASTER Tottenham Premier League chief Richard Masters with cheeky message on VAR',
    category: 'Football',
    imageUrl: 'https://www.thesun.co.uk/wp-content/uploads/2023/01/the-sun-masthead.png',
    timestamp: '2 hours ago',
    readTime: '3 min read',
    content: `Premier League chief Richard Masters has sent a cheeky message about VAR after Tottenham's controversial win over Liverpool.

The Reds were denied a legitimate goal when Luis Diaz was wrongly flagged offside, with VAR failing to overturn the decision.

Liverpool went on to lose the match 2-1, with Jurgen Klopp left fuming at the officials.

The incident has sparked fresh debate about the effectiveness of VAR in the Premier League, with many fans and pundits calling for changes to the system.

Masters, speaking at a conference in London, acknowledged the controversy but defended the overall impact of video technology on the game.

"We know there have been some high-profile errors, and that's regrettable," Masters said. "But the statistics show that VAR has improved decision-making accuracy from 82% to 94% since its introduction."

He added: "We're constantly reviewing and refining the system to make it better. The Diaz incident was unfortunate, but we've taken steps to ensure similar mistakes don't happen again."

The Premier League has since released the audio recording of the VAR discussion during the incident, revealing a breakdown in communication between officials.`,
    author: 'Sam Morgan',
    url: 'https://www.thesun.co.uk/sport/football/23567890/premier-league-var-tottenham-liverpool/',
    flag: 'MASTERBLASTER',
  },
  {
    id: 'sun-2',
    title: 'IN THE CAN Jake Paul reveals Tommy Fury rematch and slams Canelo over failed fight',
    category: 'Boxing',
    imageUrl: 'https://www.thesun.co.uk/wp-content/uploads/2023/01/the-sun-masthead.png',
    timestamp: '5 hours ago',
    readTime: '3 min read',
    content: `Jake Paul has revealed he is in talks for a rematch with Tommy Fury and slammed Canelo Alvarez for not agreeing to fight him.

The YouTuber-turned-boxer lost to Fury by split decision in February 2023, his first defeat in the ring.

Paul has since bounced back with victories over UFC legend Nate Diaz and veteran boxer Andre August, and is now eyeing a second shot at Fury.

Speaking on his podcast, Paul said: "We're in talks with Tommy's team about running it back. I think the fans want to see it, and I want my redemption. I know I can beat him."

The 27-year-old also took aim at Mexican superstar Canelo Alvarez, who recently dismissed the idea of fighting Paul.

"Canelo's afraid, plain and simple," Paul claimed. "He talks about respect for boxing, but he's fought plenty of guys with less experience than me. It's about money, and he knows I'm a bigger draw than most of his opponents."

Alvarez, the undisputed super-middleweight champion, had previously called Paul's challenges "disrespectful" to the sport.

Paul's next fight is expected to be announced in the coming weeks, with Fury just one of several potential opponents being considered.`,
    author: 'Jack Figg',
    url: 'https://www.thesun.co.uk/sport/boxing/23567891/jake-paul-tommy-fury-canelo/',
    flag: 'IN THE CAN',
  },
  {
    id: 'sun-3',
    title: "READY PLAYER RON Walker's wife Annie poses behind wheel of £70k Mercedes",
    category: 'Football',
    imageUrl: 'https://www.thesun.co.uk/wp-content/uploads/2023/01/the-sun-masthead.png',
    timestamp: 'Yesterday',
    readTime: '3 min read',
    content: `Annie Walker, wife of football star Ron Walker, has been spotted posing behind the wheel of a £70,000 Mercedes.

The model and influencer shared photos of her new luxury vehicle on Instagram, captioning the post 'New wheels day! Thanks to my amazing husband for the surprise.'

The couple, who married last summer, are known for their lavish lifestyle and social media presence.

Ron Walker, who plays for Manchester City, recently signed a new contract worth a reported £300,000 per week, making him one of the highest-paid players in the Premier League.

The 26-year-old midfielder has been in sensational form this season, scoring 12 goals and providing 15 assists in all competitions.

Annie, who has over 2 million followers on Instagram, regularly shares glimpses into the couple's luxurious lifestyle, including exotic holidays, designer clothes, and their £4.5 million mansion in Cheshire.

The Mercedes GLE Coupe is the latest addition to their impressive car collection, which already includes a Lamborghini Urus and a Range Rover Sport.

Fans were quick to comment on Annie's post, with many expressing admiration for the couple's success.`,
    author: 'Joshua Jones',
    url: 'https://www.thesun.co.uk/sport/football/23567892/ron-walker-wife-mercedes/',
    flag: 'READY PLAYER RON',
  },
  {
    id: 'sun-4',
    title:
      'KANE NOT BE SERIOUS Harry Kane tipped to make stunning Liverpool transfer by Premier League legend',
    category: 'Football',
    imageUrl: 'https://www.thesun.co.uk/wp-content/uploads/2023/01/the-sun-masthead.png',
    timestamp: '3 hours ago',
    readTime: '3 min read',
    content: `Harry Kane has been tipped to make a stunning transfer to Liverpool by a Premier League legend.

The England captain only joined Bayern Munich last summer in a £100million move from Tottenham, but has been linked with a return to the Premier League.

Despite scoring 36 goals in 36 games for the German giants, Kane is yet to win a trophy in his professional career.

Former Liverpool striker Michael Owen believes the Reds should make a move for Kane if they lose Mohamed Salah this summer.

Speaking on TNT Sports, Owen said: "If Salah leaves, Liverpool need a world-class replacement, and Kane would be perfect. He's proven in the Premier League and would guarantee 25-30 goals a season."

Owen added: "I know he's only been at Bayern for a year, but if they don't win anything this season, I could see him wanting to come back to England. And Liverpool would be an attractive proposition with Arne Slot coming in."

Salah has been heavily linked with a move to Saudi Arabia, with Al-Ittihad reportedly preparing a £150million bid for the Egyptian.

Kane, who turns 31 in July, has a contract with Bayern until 2027, and the German club would likely demand a fee similar to what they paid Tottenham.`,
    author: 'Dave Kidd',
    url: 'https://www.thesun.co.uk/sport/football/23567893/harry-kane-liverpool-transfer/',
    flag: 'KANE NOT BE SERIOUS',
  },
  {
    id: 'sun-5',
    title: "DONE FER Fernandes left red-faced over antics seconds before Ronaldo's worst penalty",
    category: 'Football',
    imageUrl: 'https://www.thesun.co.uk/wp-content/uploads/2023/01/the-sun-masthead.png',
    timestamp: '1 day ago',
    readTime: '3 min read',
    content: `Bruno Fernandes was left red-faced after his antics seconds before Cristiano Ronaldo's penalty miss against Slovenia.

The Portugal captain was seen gesturing to the crowd to make noise and putting pressure on the goalkeeper before Ronaldo stepped up.

But his teammate then saw his spot-kick saved by Jan Oblak, forcing the Euro 2024 last-16 tie to go to extra time.

Fernandes had been trying to distract Oblak by pointing to different corners and whipping up the crowd, a tactic that has become increasingly common in modern football.

However, the plan backfired spectacularly when Atletico Madrid goalkeeper Oblak dived to his right to palm away Ronaldo's effort.

The miss was particularly painful for Ronaldo, who had scored his previous 11 penalties for Portugal and was visibly emotional after the save.

Portugal eventually won the match on penalties, with Ronaldo scoring in the shootout and Diogo Costa making three saves to send his team through to the quarter-finals.

After the game, Fernandes defended his actions, saying: "It's part of football. We try everything to help the team win. Sometimes it works, sometimes it doesn't."`,
    author: 'Jordan Davies',
    url: 'https://www.thesun.co.uk/sport/football/23567894/fernandes-ronaldo-penalty-miss/',
    flag: 'DONE FER',
  },
  {
    id: 'sun-6',
    title: "EXCLUSIVE: Royal Family 'concerned' about Prince Harry's surprise UK visit next week",
    category: 'News',
    imageUrl: 'https://www.thesun.co.uk/wp-content/uploads/2023/01/the-sun-masthead.png',
    timestamp: '30 minutes ago',
    readTime: '4 min read',
    content: `The Royal Family is said to be 'concerned' about Prince Harry's surprise visit to the UK next week, The Sun can exclusively reveal.

The Duke of Sussex is expected to fly to London for a charity event, but has reportedly not made plans to meet with King Charles or Prince William during his stay.

Royal sources have told The Sun that senior members of the family were given little notice about Harry's visit, creating tension behind palace walls.

"There's definitely concern about the timing of this visit," our source revealed. "Relations are still very strained, and this trip has caught everyone off guard."

Harry is scheduled to attend an Invictus Games fundraiser in London, marking his first return to the UK since his brief appearance at his father's coronation last year.

The Duke and Duchess of Sussex stepped down as working royals in 2020 and have since made California their home, where they live with their children Archie and Lilibet.

Their relationship with the royal family has deteriorated following their Netflix documentary and Harry's memoir 'Spare', which contained numerous allegations against the institution.

Buckingham Palace has declined to comment on whether King Charles will meet with his son during the visit.`,
    author: 'Matt Wilkinson',
    url: 'https://www.thesun.co.uk/news/23567895/royal-family-prince-harry-uk-visit/',
    flag: 'EXCLUSIVE',
  },
  {
    id: 'sun-7',
    title:
      'SOAP SHOCK EastEnders legend to return after 15 years as part of explosive Christmas storyline',
    category: 'TV',
    imageUrl: 'https://www.thesun.co.uk/wp-content/uploads/2023/01/the-sun-masthead.png',
    timestamp: '12 hours ago',
    readTime: '3 min read',
    content: `An EastEnders legend is set to make a dramatic return to Albert Square after 15 years as part of an explosive Christmas storyline.

The Sun can reveal that producers are planning to bring back a fan-favorite character who hasn't been seen in Walford since 2009.

While the identity of the returning star is being kept under wraps, sources close to the show have hinted it will send shockwaves through the Square.

"This is going to be one of the biggest returns in years," our EastEnders insider revealed. "The character has deep connections to several current residents, and their comeback will turn multiple lives upside down."

The BBC soap is famous for its dramatic Christmas episodes, which typically feature major revelations, deaths, or returns.

Last year's festive special saw The Six storyline kick off with the death of Keanu Taylor, a storyline that has dominated 2024.

Executive producer Chris Clenshaw has been credited with revitalizing the show since taking over in 2022, bringing back several iconic characters including Cindy Beale and Dean Wicks.

The returning character is expected to film their scenes in the coming months, with their first appearance scheduled for December.`,
    author: 'Carl Greenwood',
    url: 'https://www.thesun.co.uk/tv/soaps/23567896/eastenders-return-christmas/',
    flag: 'SOAP SHOCK',
  },
  {
    id: 'sun-8',
    title: 'TRAGIC LOSS Tributes pour in for British actor, 34, found dead at home',
    category: 'Showbiz',
    imageUrl: 'https://www.thesun.co.uk/wp-content/uploads/2023/01/the-sun-masthead.png',
    timestamp: '4 hours ago',
    readTime: '3 min read',
    content: `Tributes have poured in for a British actor who was found dead at his home at the age of 34.

The star, who appeared in several popular TV dramas and films over the past decade, was discovered by a friend who had become concerned after not hearing from him for several days.

Police have confirmed there are no suspicious circumstances surrounding the death.

The actor's family released a statement saying: "We are completely heartbroken. He was a loving son, brother, and uncle who lit up every room he entered. We ask for privacy as we try to come to terms with this devastating loss."

Fellow actors and industry colleagues have taken to social media to express their shock and sadness.

One co-star wrote: "I can't believe you're gone. One of the most talented, funny, and kind people I've ever had the pleasure to work with. The world is less bright without you."

Another posted: "Absolutely devastated to hear this news. We worked together just last month and were making plans for the future. A phenomenal talent taken far too soon."

The actor had recently completed filming on a new drama series set to air later this year.`,
    author: 'Simon Boyle',
    url: 'https://www.thesun.co.uk/tvandshowbiz/23567897/british-actor-dead/',
    flag: 'TRAGIC LOSS',
  },
  {
    id: 'sun-9',
    title:
      'MONEY MATTERS Martin Lewis warns millions of Brits to check their accounts before July deadline',
    category: 'Money',
    imageUrl: 'https://www.thesun.co.uk/wp-content/uploads/2023/01/the-sun-masthead.png',
    timestamp: 'Yesterday',
    readTime: '3 min read',
    content: `Money saving expert Martin Lewis has issued an urgent warning to millions of Brits to check their accounts before a crucial July deadline.

The financial guru is urging people to review their savings accounts as several major banks are set to slash their interest rates next month.

Speaking on his BBC podcast, Lewis said: "If you've got money sitting in a savings account, you need to check the rate now. Many banks are quietly cutting their rates from July 1, and you could be losing out on hundreds of pounds in interest."

He explained that while the Bank of England has kept the base rate at 5.25%, many financial institutions are reducing their savings rates anyway.

"Some easy-access accounts are dropping from 5% to as low as 3.5%," Lewis warned. "That's a massive cut that could cost someone with £20,000 saved up to £300 a year in lost interest."

The money expert recommended that savers check comparison sites to find the best current rates and be prepared to switch accounts if necessary.

"Don't be loyal to your bank – they're certainly not being loyal to you. Switching is quick and easy, and the difference in interest can be substantial," he added.

Lewis also highlighted that some fixed-rate bonds are still offering rates above 5% for those who can lock their money away for a year or more.`,
    author: 'Lucy Alderson',
    url: 'https://www.thesun.co.uk/money/23567898/martin-lewis-savings-warning/',
    flag: 'MONEY MATTERS',
  },
  {
    id: 'sun-10',
    title: 'HEALTH WARNING Urgent alert as common summer activity linked to deadly infection',
    category: 'Health',
    imageUrl: 'https://www.thesun.co.uk/wp-content/uploads/2023/01/the-sun-masthead.png',
    timestamp: '6 hours ago',
    readTime: '3 min read',
    content: `Health officials have issued an urgent alert after a common summer activity was linked to a potentially deadly infection.

The UK Health Security Agency (UKHSA) has warned that swimming in lakes, rivers, and ponds during hot weather could expose people to a dangerous bacteria that thrives in warm water.

Cases of leptospirosis, a bacterial infection that can cause life-threatening kidney and liver damage, typically spike during summer months when more people engage in outdoor water activities.

Dr. Sarah Jenkins from the UKHSA said: "While enjoying natural water sources is a popular summer pastime, it's important to be aware of the risks. Leptospirosis bacteria can enter the body through cuts in the skin or through the eyes, nose, or mouth."

Symptoms of the infection include high fever, headache, muscle pain, and jaundice. In severe cases, it can lead to organ failure and even death if left untreated.

Health experts are advising people to:
- Cover any cuts or scratches with waterproof plasters before swimming
- Shower immediately after swimming in natural water
- Avoid swallowing water while swimming
- Wear protective footwear when walking near water
- Seek medical attention if symptoms develop within two weeks of swimming

The warning comes as the UK prepares for a heatwave, with temperatures expected to reach 30°C in some parts of the country next week.`,
    author: 'Terri-Ann Williams',
    url: 'https://www.thesun.co.uk/health/23567899/summer-swimming-infection-warning/',
    flag: 'HEALTH WARNING',
  },
  // Add more articles with different categories to ensure proper distribution
  {
    id: 'sun-11',
    title: "TECH TALK Apple's new iPhone 16 to feature groundbreaking AI capabilities",
    category: 'Tech',
    imageUrl: 'https://www.thesun.co.uk/wp-content/uploads/2023/01/the-sun-masthead.png',
    timestamp: '1 day ago',
    readTime: '4 min read',
    content: `Apple's upcoming iPhone 16 will feature groundbreaking AI capabilities that could revolutionize how we use smartphones, industry insiders have revealed.

The new device, expected to launch in September, will reportedly include Apple Intelligence, the company's new AI system that works across apps and features.

Sources familiar with Apple's plans told The Sun that the iPhone 16 Pro models will have enhanced hardware specifically designed to handle complex AI tasks locally on the device, rather than relying on cloud processing.

"This is Apple's biggest push into AI yet," said our source. "They're designing custom silicon that can handle much more sophisticated on-device AI than anything we've seen before."

The new features are said to include advanced photo editing that can completely transform images based on text prompts, real-time translation in FaceTime calls, and a significantly upgraded Siri that can understand context and perform complex tasks across multiple apps.

Apple is also reportedly working on AI features that can analyze a user's health data to provide personalized wellness recommendations, though this may not be ready for the initial release.

The move comes as Apple faces increasing competition from Google and Samsung, both of which have already integrated AI features into their latest smartphones.

Apple has declined to comment on the rumors, but CEO Tim Cook has previously stated that the company is "investing significantly" in AI technology.`,
    author: 'Sean Keach',
    url: 'https://www.thesun.co.uk/tech/23567900/apple-iphone-16-ai-features/',
    flag: 'TECH TALK',
  },
  {
    id: 'sun-12',
    title:
      "TRAVEL TIPS Hidden European beach destination with £1 beers and £15 hotels that's just 3 hours from UK",
    category: 'Travel',
    imageUrl: 'https://www.thesun.co.uk/wp-content/uploads/2023/01/the-sun-masthead.png',
    timestamp: '2 days ago',
    readTime: '3 min read',
    content: `A hidden European beach destination with £1 beers and hotels for as little as £15 a night is just three hours from the UK - and Brits are only just discovering it.

While tourists flock to crowded hotspots like Spain and Greece, the Albanian Riviera remains one of Europe's best-kept secrets, offering stunning beaches and rock-bottom prices.

The coastal stretch between Vlore and Sarande features crystal-clear waters, pristine beaches, and charming villages that rival more famous Mediterranean destinations.

Travel blogger Emma Wilson told The Sun: "I couldn't believe the value for money. I stayed in a beachfront hotel for £25 a night that would have cost at least £150 in Greece or Italy."

Local beers cost around £1, while a three-course meal with wine can be found for under £15 per person in many restaurants.

The area is easily accessible with direct flights from the UK to Tirana taking around three hours, followed by a scenic drive to the coast.

Ksamil, often called the "Ionian Pearl," is particularly popular with those in the know, featuring small islands you can swim to and beaches that rival the Caribbean.

Despite its growing popularity, the Albanian Riviera remains uncrowded compared to other Mediterranean destinations, though tourism experts warn this won't last forever.

"It's where the Adriatic meets the Ionian Sea, creating some of the most beautiful coastline in Europe," Wilson added. "Go now before everyone else discovers it."

The best time to visit is between May and September, with July and August offering the warmest temperatures but slightly larger crowds.

Albania has also simplified its visa requirements, with UK tourists able to stay for up to 90 days without a visa.`,
    author: 'Lisa Minot',
    url: 'https://www.thesun.co.uk/travel/23567901/albania-beach-destination-cheap/',
    flag: 'TRAVEL TIPS',
  },
  {
    id: 'sun-13',
    title: "ROYAL EXCLUSIVE Queen's secret health battle revealed in new biography",
    category: 'Royal Family',
    imageUrl: 'https://www.thesun.co.uk/wp-content/uploads/2023/01/the-sun-masthead.png',
    timestamp: '1 day ago',
    readTime: '5 min read',
    content: `A new royal biography has revealed the Queen's secret health battle in her final years, which was kept hidden from the public.

The late monarch, who passed away in September 2022 at the age of 96, had been privately dealing with a painful condition for at least two years before her death, according to royal author Robert Hardman.

In his new book, "Charles III: New King, New Court," Hardman claims that Queen Elizabeth II had been suffering from bone cancer but was determined to continue with her royal duties despite the diagnosis.

"She was battling bone cancer in her final years, which explains her mobility issues that were often attributed simply to age," a palace source told Hardman. "But Her Majesty was determined that it should not interfere with her duties as head of state."

The revelation explains why the Queen began to use a walking stick in October 2021 and why her public appearances became increasingly limited in her final months.

Despite her health struggles, the Queen continued to carry out virtual engagements during the pandemic and made a remarkable appearance on the Buckingham Palace balcony during her Platinum Jubilee celebrations in June 2022, just three months before her death.

The book also reveals that the Queen had made all the arrangements for her funeral years in advance, including selecting the music and readings, and had been involved in planning the smooth transition to King Charles III's reign.

Buckingham Palace has not officially commented on the claims in the new biography.`,
    author: 'Matt Wilkinson',
    url: 'https://www.thesun.co.uk/royal/23567902/queen-secret-health-battle/',
    flag: 'ROYAL EXCLUSIVE',
  },
  {
    id: 'sun-14',
    title:
      "FASHION FIND I'm a fashion expert - these £30 M&S jeans look designer but cost a fraction of the price",
    category: 'Fashion',
    imageUrl: 'https://www.thesun.co.uk/wp-content/uploads/2023/01/the-sun-masthead.png',
    timestamp: '3 hours ago',
    readTime: '2 min read',
    content: `Fashion experts are raving about a pair of £30 Marks & Spencer jeans that they say look designer but cost a fraction of the price.

The high street retailer's 'Mom Jeans with Stretch' have gone viral on social media, with fashion influencers claiming they rival premium denim brands costing five times as much.

Style expert Emma Johnson told The Sun: "These M&S jeans are the best high street denim I've found this year. The cut is incredibly flattering, with a high waist that holds you in and a relaxed leg that gives that coveted vintage look."

The jeans, which come in six different washes and are available in sizes 6-24, feature added stretch for comfort while maintaining the structured look of traditional denim.

"What makes these stand out is the quality of the denim," Johnson explained. "It has that substantial feel you usually only get with premium brands, but at £30, they're an absolute steal."

The jeans have also received over 1,000 five-star reviews on the M&S website, with customers praising their fit and quality.

One reviewer wrote: "I've spent years buying expensive designer jeans, but these are now my go-to pair. The fit is perfect and they wash really well without losing their shape."

M&S has reported that sales of the jeans have increased by 156% since they started trending on TikTok last month.`,
    author: 'Abby McHale',
    url: 'https://www.thesun.co.uk/fabulous/fashion/23567903/marks-spencer-jeans-designer-look/',
    flag: 'FASHION FIND',
  },
  {
    id: 'sun-15',
    title: "FOOD FOR THOUGHT I'm a chef - here's how to make the perfect roast potatoes every time",
    category: 'Food',
    imageUrl: 'https://www.thesun.co.uk/wp-content/uploads/2023/01/the-sun-masthead.png',
    timestamp: '5 hours ago',
    readTime: '3 min read',
    content: `A top chef has revealed his foolproof method for making perfect roast potatoes every time - and the common mistakes most home cooks make.

James Martin, who has been a fixture on British cooking shows for over two decades, says the secret to crispy-on-the-outside, fluffy-on-the-inside roasties is all in the preparation.

"The biggest mistake people make is not par-boiling the potatoes for long enough," Martin told The Sun. "You want them to be almost falling apart before they go in the oven."

The chef recommends boiling peeled and chopped Maris Piper potatoes for at least 10 minutes, then draining them and giving the pan a good shake to rough up the edges.

"Those rough edges are what create the crispy exterior when roasted," he explained. "The more texture on the outside, the crispier they'll be."

For the fat, Martin is adamant that goose fat produces the best results, though he acknowledges that vegetable oil is a good alternative for vegetarians.

"Whatever fat you use, it needs to be smoking hot before the potatoes go in," he said. "And don't overcrowd the roasting tray - the potatoes need space around them to get crispy all over."

Martin also advises adding a few sprigs of rosemary and whole garlic cloves to the roasting tray for extra flavor, but only in the last 20 minutes to prevent burning.

"And never cover them when they come out of the oven," he warned. "That creates steam which will make them soggy. Just let them rest for a few minutes before serving."`,
    author: 'Hayley Minn',
    url: 'https://www.thesun.co.uk/food/23567904/chef-perfect-roast-potatoes/',
    flag: 'FOOD FOR THOUGHT',
  },
  {
    id: 'sun-16',
    title: "PUZZLING TIMES Complete today's crossword and you could win £100",
    category: 'Puzzles',
    imageUrl: 'https://www.thesun.co.uk/wp-content/uploads/2023/01/the-sun-masthead.png',
    timestamp: 'Today',
    readTime: '1 min read',
    content: `Complete today's crossword puzzle for a chance to win £100 in our daily prize draw.

Our crossword is updated daily at midnight, giving you a fresh challenge every 24 hours.

Today's puzzle features clues about current events, classic literature, and general knowledge.

Once you've completed the crossword, submit your details through our online form to be entered into the prize draw.

Winners are selected at random and notified by email within 48 hours.

Good luck!`,
    author: 'The Sun Puzzles Team',
    url: 'https://www.thesun.co.uk/puzzles/23567905/daily-crossword-competition/',
    flag: 'PUZZLING TIMES',
  },
  {
    id: 'sun-17',
    title:
      'DEAR DEIDRE My husband is having an affair with my best friend - should I confront them?',
    category: 'Dear Deidre',
    imageUrl: 'https://www.thesun.co.uk/wp-content/uploads/2023/01/the-sun-masthead.png',
    timestamp: 'Yesterday',
    readTime: '4 min read',
    content: `DEAR DEIDRE: I've discovered my husband is having an affair with my best friend, and I'm torn between confronting them or walking away without a word.

Last week, I borrowed my husband's laptop and found intimate messages between them going back six months.

They've been meeting at hotels when I'm at work, and the messages show they've been laughing about deceiving me.

I'm 42, my husband is 45, and we've been married for 15 years with two teenage children. My friend is 39 and has been part of my life since university.

I feel completely betrayed by the two people I trusted most. I haven't told anyone yet and have been pretending everything is normal while I decide what to do.

Part of me wants to confront them both and watch them squirm, but another part just wants to pack my bags and disappear from their lives without explanation.

What should I do?

DEIDRE SAYS: This double betrayal is devastating, and it's understandable you're experiencing such conflicting emotions.

While disappearing might seem appealing right now, it's unlikely to give you the closure you need, and it could complicate matters with your children.

Confrontation is necessary, but it should be done when you're feeling more emotionally prepared. Consider speaking to each of them separately rather than together.

Before any confrontation, I'd suggest talking to a counsellor to help process your feelings and plan your approach. Contact Relate (relate.org.uk) for support.

Also, gather important financial documents and consider consulting a solicitor to understand your options, regardless of whether you decide to work on the marriage or end it.

Remember, their betrayal reflects their character flaws, not your worth. You deserve honesty and respect.`,
    author: 'Deidre Sanders',
    url: 'https://www.thesun.co.uk/dear-deidre/23567906/husband-affair-best-friend/',
    flag: 'DEAR DEIDRE',
  },
  {
    id: 'sun-18',
    title: 'SUN BINGO Get a £50 bingo bonus and 50 free spins when you join Sun Bingo today',
    category: 'Sun Bingo',
    imageUrl: 'https://www.thesun.co.uk/wp-content/uploads/2023/01/the-sun-masthead.png',
    timestamp: '4 hours ago',
    readTime: '2 min read',
    content: `New Sun Bingo players can claim an exciting welcome offer of a £50 bingo bonus plus 50 free spins when they sign up today.

This exclusive offer is available to new customers who register with Sun Bingo and deposit £10 into their account.

After making your qualifying deposit, you'll receive a £50 bingo bonus to use on any of our popular bingo rooms, including exclusive themed rooms you won't find anywhere else.

Additionally, you'll get 50 free spins to use on selected slot games, giving you even more chances to win.

Sun Bingo offers a wide variety of bingo games, including 90-ball, 80-ball, 75-ball, and special themed rooms with unique features and jackpots.

Our community is known for its friendly chat hosts and regular players who create a welcoming atmosphere for newcomers.

Don't miss out on this limited-time offer – join Sun Bingo today and start your bingo adventure with a boosted balance!

18+. New customers only. Deposit £10 to get a £50 bingo bonus plus 50 free spins. Wagering requirements and full T&Cs apply.`,
    author: 'Sun Bingo',
    url: 'https://www.thesun.co.uk/sun-bingo/23567907/welcome-offer-bonus-free-spins/',
    flag: 'SUN BINGO',
  },
];

// Process the mock data to extract flags and clean titles
const processedMockArticles: Article[] = mockSunArticles.map(article => {
  if (!article.flag) {
    const { flag, cleanTitle } = extractFlagFromTitle(article.title);
    return {
      ...article,
      flag,
      title: cleanTitle || article.title,
    };
  }
  return article;
});

// Function to fetch news from The Sun (using mock data for now)
export const fetchSunNews = async (): Promise<Article[]> => {
  // Simulate network request
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(processedMockArticles);
    }, 1000);
  });
};

// Update the fetchNewsByCategory function to properly filter by category
export const fetchNewsByCategory = async (category: string): Promise<Article[]> => {
  // Simulate network request
  return new Promise(resolve => {
    setTimeout(() => {
      if (category.toLowerCase() === 'all') {
        resolve(processedMockArticles);
      } else {
        // Improved category filtering logic
        const filteredNews = processedMockArticles.filter(item => {
          const itemCategory = item.category.toLowerCase();
          const searchCategory = category.toLowerCase();

          // Main category matching
          if (searchCategory === 'news') {
            return [
              'news',
              'uk news',
              'world news',
              'politics',
              'irish news',
              'scottish news',
              'us news',
              'royal family',
            ].includes(itemCategory);
          }

          if (searchCategory === 'sport') {
            return [
              'sport',
              'football',
              'boxing',
              'racing',
              'ufc',
              'f1',
              'cricket',
              'rugby',
              'golf',
              'tennis',
              'nfl',
              'dream team',
            ].includes(itemCategory);
          }

          if (searchCategory === 'tv') {
            return ['tv', 'tv news', 'soaps', 'reality tv'].includes(itemCategory);
          }

          if (searchCategory === 'showbiz') {
            return ['showbiz', 'celebrity', 'music', 'film'].includes(itemCategory);
          }

          if (searchCategory === 'fabulous') {
            return ['fabulous', 'fashion', 'beauty', 'food', 'parenting'].includes(itemCategory);
          }

          if (searchCategory === 'money') {
            return ['money', 'property', 'bills', 'banking', 'pensions'].includes(itemCategory);
          }

          if (searchCategory === 'travel') {
            return ['travel', 'beach holidays', 'uk holidays', 'city breaks', 'cruises'].includes(
              itemCategory,
            );
          }

          if (searchCategory === 'tech') {
            return ['tech', 'phones', 'gaming', 'science'].includes(itemCategory);
          }

          if (searchCategory === 'motors') {
            return ['motors', 'new cars', 'used cars'].includes(itemCategory);
          }

          if (searchCategory === 'health') {
            return ['health', 'fitness', 'diet', 'health news'].includes(itemCategory);
          }

          // Subcategory matching for News
          if (
            [
              'uk news',
              'world news',
              'politics',
              'royal family',
              'us news',
              'irish news',
              'scottish news',
              'opinion',
            ].includes(searchCategory)
          ) {
            return itemCategory === searchCategory;
          }

          // Subcategory matching for Sport
          if (
            [
              'football',
              'boxing',
              'racing',
              'ufc',
              'f1',
              'cricket',
              'rugby',
              'golf',
              'tennis',
              'nfl',
              'dream team',
            ].includes(searchCategory)
          ) {
            return itemCategory === searchCategory;
          }

          // Subcategory matching for TV
          if (['tv news', 'soaps', 'reality tv'].includes(searchCategory)) {
            return itemCategory === searchCategory;
          }

          // Subcategory matching for Showbiz
          if (['celebrity', 'music', 'film'].includes(searchCategory)) {
            return itemCategory === searchCategory;
          }

          // Subcategory matching for Fabulous
          if (['fashion', 'beauty', 'food', 'parenting'].includes(searchCategory)) {
            return itemCategory === searchCategory;
          }

          // Subcategory matching for Money
          if (['property', 'bills', 'banking', 'pensions'].includes(searchCategory)) {
            return itemCategory === searchCategory;
          }

          // Subcategory matching for Travel
          if (
            ['beach holidays', 'uk holidays', 'city breaks', 'cruises'].includes(searchCategory)
          ) {
            return itemCategory === searchCategory;
          }

          // Subcategory matching for Tech
          if (['phones', 'gaming', 'science'].includes(searchCategory)) {
            return itemCategory === searchCategory;
          }

          // Subcategory matching for Motors
          if (['new cars', 'used cars'].includes(searchCategory)) {
            return itemCategory === searchCategory;
          }

          // Subcategory matching for Health
          if (['fitness', 'diet', 'health news'].includes(searchCategory)) {
            return itemCategory === searchCategory;
          }

          // Additional sections
          if (
            [
              'puzzles',
              'dear deidre',
              'sun bingo',
              'sun vegas',
              'sun savers',
              'sun casino',
              'sun win',
              'sun selects',
            ].includes(searchCategory)
          ) {
            return itemCategory === searchCategory;
          }

          // Exact subcategory matching as fallback
          return itemCategory === searchCategory;
        });

        // If no news in that category, return empty array instead of all news
        resolve(filteredNews.length > 0 ? filteredNews : []);
      }
    }, 800);
  });
};

// Function to fetch a single article by ID
export const fetchArticleById = async (id: string): Promise<Article | null> => {
  // Simulate network request
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const article = processedMockArticles.find(item => item.id === id);
      if (article) {
        resolve(article);
      } else {
        reject(new Error('Article not found'));
      }
    }, 500);
  });
};

// Function to search news
export const searchNews = async (query: string): Promise<Article[]> => {
  // Simulate network request
  return new Promise(resolve => {
    setTimeout(() => {
      if (!query) {
        resolve([]);
        return;
      }

      const lowerCaseQuery = query.toLowerCase();
      const results = processedMockArticles.filter(
        item =>
          item.title.toLowerCase().includes(lowerCaseQuery) ||
          item.content.toLowerCase().includes(lowerCaseQuery) ||
          item.category.toLowerCase().includes(lowerCaseQuery),
      );

      resolve(results);
    }, 1000);
  });
};
