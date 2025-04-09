"use client"
import React, { useState, useCallback, useEffect } from "react"
import { View, StyleSheet, ScrollView, StatusBar } from "react-native"
import { useFocusEffect } from "@react-navigation/native"
import { useTheme } from "../theme/ThemeProvider"
import CardCatchUp from "../components/CardCatchUp"
import CardHero from "../components/CardHero"
import CardHorizontal from "../components/CardHorizontal"
import SkeletonLoader from "../components/SkeletonLoader"
import TopNav from "../components/TopNav"
import Typography from "../components/Typography"
import { fetchSunNews } from "../services/sunNewsService"
import cacheService from "../services/cacheService"

// Cache key for Today screen
const CACHE_KEY = "todayScreen"

// Simplified component without animations
const TodayScreen = ({ navigation }) => {
  const theme = useTheme()
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Load data on initial mount
  useEffect(() => {
    const cachedData = cacheService.getData(CACHE_KEY)
    if (cachedData) {
      setNews(cachedData)
    } else {
      loadArticles(true)
    }
  }, [])

  // Function to load articles
  const loadArticles = async (showLoading = false) => {
    // Only show loading state if explicitly requested
    if (showLoading) {
      setLoading(true)
    }

    try {
      const data = await fetchSunNews()
      setNews(data)
      setError(null)

      // Cache the fetched data
      cacheService.setData(CACHE_KEY, data)
    } catch (err) {
      console.error("Error loading articles:", err)
      setError("Failed to load articles")
      // Set empty array to prevent undefined errors
      setNews([])
    } finally {
      setLoading(false)
    }
  }

  // Use useFocusEffect to check if we need to refresh data
  useFocusEffect(
    useCallback(() => {
      // If we don't have data and we're not already loading, load it
      if (news.length === 0 && !loading) {
        loadArticles(true)
      }
    }, [news.length, loading]),
  )

  const handleCatchUpPress = (item) => {
    if (item.id === "daily-digest") {
      // Navigate to the ArticleSwipeScreen with the first 10 articles
      navigation.navigate("ArticleSwipeScreen", {
        articles: news.slice(0, 10), // Pass the first 10 articles
      })
    } else if (item.id === "sport") {
      navigation.navigate("AllNewsCategory", {
        category: { name: "Sport" },
        source: "Today",
      })
    } else if (item.id === "showbiz") {
      navigation.navigate("AllNewsCategory", {
        category: { name: "Showbiz" },
        source: "Today",
      })
    }
  }

  const handleArticlePress = (article) => {
    navigation.navigate("TodayArticle", { article })
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

  // Create catch-up items based on categories
  const catchUpItems = React.useMemo(() => {
    if (!news || news.length === 0) return []

    return [
      {
        id: "daily-digest",
        title: "Daily Digest",
        subtitle: "All of the recent updates from the news today",
        imageUrl: news[0]?.imageUrl || "https://www.thesun.co.uk/wp-content/uploads/2023/01/the-sun-masthead.png",
        count: news.length,
      },
      {
        id: "sport",
        title: "Sport",
        subtitle: "Football, cricket, F1 and more",
        imageUrl:
          news.find((a) => a.category.toLowerCase().includes("sport"))?.imageUrl ||
          "https://www.thesun.co.uk/wp-content/uploads/2023/01/the-sun-masthead.png",
        count: news.filter((a) => a.category.toLowerCase().includes("sport")).length,
      },
      {
        id: "showbiz",
        title: "Showbiz",
        subtitle: "Celebrity news and entertainment",
        imageUrl:
          news.find((a) => a.category.toLowerCase().includes("showbiz") || a.category.toLowerCase().includes("tv"))
            ?.imageUrl || "https://www.thesun.co.uk/wp-content/uploads/2023/01/the-sun-masthead.png",
        count: news.filter(
          (a) => a.category.toLowerCase().includes("showbiz") || a.category.toLowerCase().includes("tv"),
        ).length,
      },
    ]
  }, [news])

  // Get top stories and all stories
  const topStories = React.useMemo(() => news.slice(0, 3), [news])
  const allStories = React.useMemo(() => news.slice(3, 10), [news])

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.Surface.Secondary }]}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      {/* Header - replaced with TopNav */}
      <TopNav
        title="Welcome, Jake"
        backgroundColor={theme.colors.Surface.Secondary}
        textColor={theme.colors.Text.Primary}
        variant="explore"
        rightButtons={[
          {
            label: "Profile",
            onPress: handleProfilePress,
          },
        ]}
      />

      {loading ? (
        // Show loading state using the SkeletonLoader component
        <ScrollView style={styles.scrollView}>
          <SkeletonLoader type="today" count={4} />
        </ScrollView>
      ) : error ? (
        // Error state
        <View style={[styles.container, styles.centerContainer]}>
          <Typography variant="subtitle-01" color={theme.colors.Error.Resting} style={{ marginBottom: 16 }}>
            {error}
          </Typography>
          <Typography variant="body-01" color={theme.colors.Text.Secondary}>
            Please check your connection and try again.
          </Typography>
        </View>
      ) : (
        // Actual content
        <ScrollView style={styles.scrollView}>
          {/* Today's Catch Up Section */}
          <View style={styles.section}>
            <Typography variant="h5" color={theme.colors.Text.Primary} style={styles.sectionTitle}>
              Today&apos;s Catch Up
            </Typography>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.catchUpScroll}
              contentContainerStyle={styles.catchUpScrollContent}
            >
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
            </ScrollView>
          </View>

          {/* Top Stories Section */}
          <View style={styles.section}>
            <Typography variant="h5" color={theme.colors.Text.Primary} style={styles.sectionTitle}>
              Top Stories
            </Typography>

            <>
              {/* Hero Card */}
              {topStories.length > 0 && (
                <CardHero
                  title={topStories[0].title}
                  imageUrl={topStories[0].imageUrl}
                  flag={topStories[0].flag}
                  category={topStories[0].category}
                  readTime={topStories[0].readTime}
                  onPress={() => handleArticlePress(topStories[0])}
                  onBookmark={() => handleBookmark(topStories[0].id)}
                  onShare={() => handleShare(topStories[0].id)}
                />
              )}

              {/* Other Top Stories */}
              {topStories.slice(1).map((story) => (
                <CardHorizontal
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
            </>
          </View>

          {/* All Stories Section */}
          <View style={styles.section}>
            <Typography variant="h5" color={theme.colors.Text.Primary} style={styles.sectionTitle}>
              All Stories
            </Typography>

            {allStories.map((story) => (
              <CardHorizontal
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
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  centerContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  scrollView: {
    flex: 1,
  },
  section: {
    padding: 16,
    paddingBottom: 0,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  stackContainer: {
    flexDirection: "row",
    overflow: "scroll",
    marginHorizontal: -16,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  catchUpScroll: {
    marginLeft: -16,
    paddingLeft: 16,
  },
  catchUpScrollContent: {
    paddingRight: 16,
    gap: 12,
  },
  cardWrapper: {
    marginRight: 12,
    width: 280, // Match the width of CardCatchUp
  },
  bottomPadding: {
    height: 24,
  },
})

export default TodayScreen
