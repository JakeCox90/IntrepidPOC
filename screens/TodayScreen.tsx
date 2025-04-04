"use client"
import { View, Text, StyleSheet, ScrollView, StatusBar } from "react-native"
import { useTheme } from "../theme/ThemeProvider"
import Stack from "../components/Stack"
import CardCatchUp from "../components/CardCatchUp"
import CardHero from "../components/CardHero"
import CardArticle from "../components/CardArticle"
import Header from "../components/Header"

// Sample data
const catchUpItems = [
  {
    id: 1,
    title: "Daily Digest",
    subtitle: "All of the recent updates from the news today",
    imageUrl: "https://i.imgur.com/ZLdnUOH.jpg",
    count: 12,
  },
  {
    id: 2,
    title: "Politics",
    subtitle: "Latest updates from Westminster and beyond",
    imageUrl: "https://i.imgur.com/JfVDTLs.jpg",
    count: 8,
  },
  {
    id: 3,
    title: "Sport",
    subtitle: "Football, cricket, F1 and more",
    imageUrl: "https://i.imgur.com/7BjQIEE.jpg",
    count: 15,
  },
]

const topStories = [
  {
    id: 1,
    title:
      "COLEEN ON ME Rooney leads Wags rallying around Kilner at lunch days after husband Kyle spent night with two girls",
    imageUrl: "https://i.imgur.com/JaCBiCp.jpg",
    flag: "EXCLUSIVE",
    readTime: "3 min read",
  },
  {
    id: 2,
    title: "Urgent search for young boy, 12, missing for four days after he suddenly disappeared",
    imageUrl: "https://i.imgur.com/QVZLMGj.jpg",
    flag: "FIND JOE",
    readTime: "3 min read",
  },
  {
    id: 3,
    title: "Warning over holiday scam targeting tourists with fake beach rentals",
    imageUrl: "https://i.imgur.com/7BjQIEE.jpg",
    flag: "SEA-RIO",
    readTime: "3 min read",
  },
]

const allStories = [
  {
    id: 1,
    title: "How SAS-style arctic forces who train UNDER ice will defend greenland",
    imageUrl: "https://i.imgur.com/ZLdnUOH.jpg",
    category: "WORLD NEWS",
    flag: "ICE WARS",
    readTime: "3 min read",
  },
  {
    id: 2,
    title: "Step up bid to unlock £250bn frozen Russian assets to help Ukraine, PM told",
    imageUrl: "https://i.imgur.com/JaCBiCp.jpg",
    category: "WORLD NEWS",
    flag: "KYIVS BANK",
    readTime: "3 min read",
  },
  {
    id: 3,
    title: "Students 'hot mugshot' goes viral as 'she's guilty of stealing hearts'",
    imageUrl: "https://i.imgur.com/QVZLMGj.jpg",
    category: "WORLD NEWS",
    flag: "PRETTY CRIMINAL",
    readTime: "3 min read",
  },
  {
    id: 4,
    title: "Trump says Ukraine can 'forget about NATO' before meeting Zelensky",
    imageUrl: "https://i.imgur.com/JfVDTLs.jpg",
    category: "NEWS",
    flag: "PEACE DEAL",
    readTime: "3 min read",
  },
]

const TodayScreen = ({ navigation }) => {
  const theme = useTheme()

  const handleCatchUpPress = (item) => {
    console.log("Catch Up pressed:", item.title)
  }

  const handleArticlePress = (article) => {
    // Navigate to article screen with the article data
    navigation.navigate("TodayArticle", {
      article: {
        ...article,
        content:
          "This is a placeholder content for the article. The actual content will be fetched from The Sun website in a production environment.",
      },
    })
  }

  const handleBookmark = (id) => {
    console.log("Bookmark article:", id)
  }

  const handleShare = (id) => {
    console.log("Share article:", id)
  }

  const handleProfilePress = () => {
    console.log("Profile pressed")
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      {/* Header */}
      <Header title="News" titleStyle="large" showProfileButton onProfilePress={handleProfilePress} />

      <ScrollView style={styles.scrollView}>
        {/* Today's Catch Up Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.Text.Primary }]}>Today's Catch Up</Text>
          <Stack>
            {catchUpItems.map((item) => (
              <CardCatchUp
                key={item.id}
                title={item.title}
                subtitle={item.subtitle}
                imageUrl={item.imageUrl}
                count={item.count}
                onPress={() => handleCatchUpPress(item)}
              />
            ))}
          </Stack>
        </View>

        {/* Top Stories Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.Text.Primary }]}>Top Stories</Text>

          {/* Hero Card */}
          <CardHero
            title={topStories[0].title}
            imageUrl={topStories[0].imageUrl}
            flag={topStories[0].flag}
            readTime={topStories[0].readTime}
            onPress={() => handleArticlePress(topStories[0])}
            onBookmark={() => handleBookmark(topStories[0].id)}
            onShare={() => handleShare(topStories[0].id)}
          />

          {/* Other Top Stories */}
          {topStories.slice(1).map((story) => (
            <CardArticle
              key={story.id}
              id={story.id}
              title={story.title}
              imageUrl={story.imageUrl}
              flag={story.flag}
              readTime={story.readTime}
              onPress={() => handleArticlePress(story)}
              onBookmark={() => handleBookmark(story.id)}
              onShare={() => handleShare(story.id)}
            />
          ))}
        </View>

        {/* All Stories Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.Text.Primary }]}>All Stories</Text>

          {allStories.map((story) => (
            <CardArticle
              key={story.id}
              id={story.id}
              title={story.title}
              imageUrl={story.imageUrl}
              category={story.category}
              flag={story.flag}
              readTime={story.readTime}
              onPress={() => handleArticlePress(story)}
              onBookmark={() => handleBookmark(story.id)}
              onShare={() => handleShare(story.id)}
            />
          ))}
        </View>

        {/* Bottom padding */}
        <View style={styles.bottomPadding} />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  scrollView: {
    flex: 1,
  },
  section: {
    padding: 16,
    paddingBottom: 0,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 16,
  },
  bottomPadding: {
    height: 24,
  },
})

export default TodayScreen

