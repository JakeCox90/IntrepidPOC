"use client"
import React, { useState, useCallback, useEffect, useRef } from "react"
import { View, StyleSheet, ScrollView, StatusBar, Platform, Animated } from "react-native"
import { useFocusEffect } from "@react-navigation/native"
import { useTheme } from "../theme/ThemeProvider"
import CardHero from "../components/CardHero"
import CardHorizontal from "../components/CardHorizontal"
import SkeletonLoader from "../components/SkeletonLoader"
import TopNav from "../components/TopNav"
import Typography from "../components/Typography"
import { fetchSunNews } from "../services/sunNewsService"
import Stack from "../components/Stack"
import NewsCard from "../components/NewsCard"
import BundleCard from "../components/BundleCard"
import cacheService from "../services/cacheService"

// Cache key for ForYou screen
const CACHE_KEY = "forYouScreen"

// Sample bundle data
const bundles = [
  {
    id: "bundle-1",
    title: "Inside the campaign",
    subtitle: "UK Election 2025",
    storyCount: 34,
    imageUrl: "https://i.imgur.com/JfVDTLs.jpg",
  },
  {
    id: "bundle-2",
    title: "Cost of living crisis",
    subtitle: "Impact on families",
    storyCount: 28,
    imageUrl: "https://i.imgur.com/7BjQIEE.jpg",
  },
  {
    id: "bundle-3",
    title: "Ukraine war latest",
    subtitle: "Conflict updates",
    storyCount: 42,
    imageUrl: "https://i.imgur.com/QVZLMGj.jpg",
  },
]

// Update the component to include the top stories section
const ForYouScreen = ({ navigation }) => {
  const theme = useTheme()
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const scrollY = useRef(new Animated.Value(0)).current

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
      // Simulate personalized content by shuffling the articles
      const shuffled = [...data].sort(() => 0.5 - Math.random())
      setNews(shuffled)
      setError(null)

      // Cache the fetched data
      cacheService.setData(CACHE_KEY, shuffled)
    } catch (err) {
      console.error("Error loading articles:", err)
      setError("Failed to load personalized content")
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

  const handleArticlePress = (article) => {
    navigation.navigate("ForYouArticle", { article })
  }

  const handleTopStoryPress = (article, index) => {
    try {
      // Create a safe copy of all articles with default values for missing properties
      const safeArticles = topStories.map((item) => ({
        id: item.id || `article-${Math.random().toString(36).substr(2, 9)}`,
        title: item.title || "Untitled Article",
        category: item.category || "",
        flag: item.flag || "",
        imageUrl: item.imageUrl || "",
        readTime: item.readTime || "3 min read",
        timestamp: item.timestamp || "Today",
        content: item.content || "",
        author: item.author || "The Sun",
        url: item.url || "",
      }))

      // Navigate to the ArticleStack screen with properly formatted data
      navigation.navigate("ArticleStackScreen", {
        articles: safeArticles,
        initialIndex: index,
        title: "Top stories",
      })
    } catch (error) {
      console.error("Navigation error:", error)
      // Fallback to single article view if stack navigation fails
      navigation.navigate("ForYouArticle", { article })
    }
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

  const handleBundlePress = (bundle) => {
    console.log("Bundle pressed:", bundle.title)
    // In a real app, this would navigate to a bundle detail screen
  }

  const handleBundleNotify = (bundle) => {
    console.log("Bundle notification toggled:", bundle.title)
    // In a real app, this would toggle notifications for the bundle
  }

  // Calculate the height of the TopNav with additional padding
  const topNavHeight = Platform.OS === "ios" ? 88 : 44 + (StatusBar.currentHeight || 0)
  const contentPaddingTop = topNavHeight + 24 // Add extra padding to prevent overlap

  // Get top stories for the horizontal rail (8 stories)
  const topStories = React.useMemo(() => news.slice(0, 8), [news])

  // Get featured and recommended articles (adjust indices to avoid overlap)
  const featuredArticles = React.useMemo(() => news.slice(8, 9), [news])
  const recommendedArticles = React.useMemo(() => news.slice(9, 14), [news])
  const topicBasedArticles = React.useMemo(() => news.slice(14, 19), [news])

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.Surface.Secondary }]}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />

      {loading ? (
        // Show loading state
        <ScrollView style={styles.scrollView} contentContainerStyle={{ paddingTop: contentPaddingTop }}>
          <SkeletonLoader type="forYou" count={3} />
        </ScrollView>
      ) : error ? (
        // Error state
        <View style={[styles.container, styles.centerContainer, { paddingTop: contentPaddingTop }]}>
          <Typography variant="subtitle-01" color={theme.colors.Error.Resting} style={{ marginBottom: 16 }}>
            {error}
          </Typography>
          <Typography variant="body-01" color={theme.colors.Text.Secondary}>
            Please check your connection and try again.
          </Typography>
        </View>
      ) : (
        // Actual content
        <Animated.ScrollView
          style={styles.scrollView}
          contentContainerStyle={{ backgroundColor: theme.colors.Surface.Secondary, paddingTop: contentPaddingTop }}
          scrollEventThrottle={16}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })}
        >
          {/* Top Stories Section (renamed from Featured For You) */}
          <View style={styles.section}>
            <Typography variant="h5" color={theme.colors.Text.Primary} style={styles.sectionTitle}>
              Top stories
            </Typography>

            {featuredArticles.length > 0 && (
              <CardHero
                title={featuredArticles[0].title}
                imageUrl={featuredArticles[0].imageUrl}
                flag={featuredArticles[0].flag}
                category={featuredArticles[0].category}
                readTime={featuredArticles[0].readTime}
                onPress={() => handleTopStoryPress(featuredArticles[0], 0)}
                onBookmark={() => handleBookmark(featuredArticles[0].id)}
                onShare={() => handleShare(featuredArticles[0].id)}
              />
            )}
          </View>

          {/* Top Stories Horizontal Rail (without title) */}
          <View style={styles.horizontalRailContainer}>
            <Stack spacing={12} style={styles.topStoriesStack}>
              {topStories.map((article, index) => (
                <NewsCard
                  key={article.id || `top-story-${index}`}
                  title={article.title || ""}
                  imageUrl={article.imageUrl || ""}
                  category={article.category || ""}
                  timestamp={article.timestamp || "Today"}
                  onPress={() => handleTopStoryPress(article, index)}
                />
              ))}
            </Stack>
          </View>

          {/* Recommended Section */}
          <View style={styles.section}>
            <Typography variant="h5" color={theme.colors.Text.Primary} style={styles.sectionTitle}>
              Recommended
            </Typography>

            {recommendedArticles.map((article) => (
              <CardHorizontal
                key={article.id || Math.random().toString()}
                id={article.id}
                title={article.title || ""}
                imageUrl={article.imageUrl || ""}
                category={article.category || ""}
                flag={article.flag}
                readTime={article.readTime || "3 min read"}
                onPress={() => handleArticlePress(article)}
                onBookmark={() => handleBookmark(article.id)}
                onShare={() => handleShare(article.id)}
              />
            ))}
          </View>

          {/* Bundles For You Section */}
          <View style={styles.section}>
            <Typography variant="h5" color={theme.colors.Text.Primary} style={styles.sectionTitle}>
              Bundles for you
            </Typography>

            <Stack spacing={16} style={styles.bundlesStack}>
              {bundles.map((bundle) => (
                <BundleCard
                  key={bundle.id}
                  title={bundle.title}
                  subtitle={bundle.subtitle}
                  storyCount={bundle.storyCount}
                  imageUrl={bundle.imageUrl}
                  onPress={() => handleBundlePress(bundle)}
                  onNotify={() => handleBundleNotify(bundle)}
                />
              ))}
            </Stack>
          </View>

          {/* Topics You Follow Section */}
          <View style={styles.section}>
            <Typography variant="h5" color={theme.colors.Text.Primary} style={styles.sectionTitle}>
              Topics You Follow
            </Typography>

            {topicBasedArticles.map((article) => (
              <CardHorizontal
                key={article.id || Math.random().toString()}
                id={article.id}
                title={article.title || ""}
                imageUrl={article.imageUrl || ""}
                category={article.category || ""}
                flag={article.flag}
                readTime={article.readTime || "3 min read"}
                onPress={() => handleArticlePress(article)}
                onBookmark={() => handleBookmark(article.id)}
                onShare={() => handleShare(article.id)}
              />
            ))}
          </View>

          {/* Bottom padding */}
          <View style={styles.bottomPadding} />
        </Animated.ScrollView>
      )}

      {/* TopNav rendered last to ensure it's on top */}
      <View style={styles.topNavContainer}>
        <TopNav
          showBackButton={false}
          rightButtons={[
            {
              label: "Profile",
              icon: "person-circle-outline",
              onPress: handleProfilePress,
            },
          ]}
          variant="explore"
        />
      </View>
    </View>
  )
}

// Update the styles to include the bundlesStack
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topNavContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: "transparent",
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
  horizontalRailContainer: {
    marginTop: 16, // Set to 16 as requested for spacing between hero card and stack
    paddingBottom: 16,
  },
  topStoriesStack: {
    marginBottom: 16,
  },
  bundlesStack: {
    marginBottom: 16,
  },
  bottomPadding: {
    height: 24,
  },
})

export default ForYouScreen
