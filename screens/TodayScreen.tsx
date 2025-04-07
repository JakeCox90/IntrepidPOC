"use client"
import React, { useState, useCallback } from "react"
import { View, StyleSheet, ScrollView, StatusBar } from "react-native"
import { useFocusEffect } from "@react-navigation/native"
import { useTheme } from "../theme/ThemeProvider"
import Stack from "../components/Stack"
import CardCatchUp from "../components/CardCatchUp"
import CardHero from "../components/CardHero"
import CardArticle from "../components/CardArticle"
import SkeletonCardHero from "../components/SkeletonCardHero"
import SkeletonCardArticle from "../components/SkeletonCardArticle"
import SkeletonCardCatchUp from "../components/SkeletonCardCatchUp"
import Header from "../components/Header"
import Typography from "../components/Typography"
import { fetchSunNews } from "../services/sunNewsService"

// Simplified component without animations
const TodayScreen = ({ navigation }) => {
  const theme = useTheme()
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Use useFocusEffect instead of useEffect to avoid potential memory leaks
  useFocusEffect(
    useCallback(() => {
      let isMounted = true

      const loadArticles = async () => {
        if (!isMounted) return

        setLoading(true)

        try {
          const data = await fetchSunNews()
          if (isMounted) {
            setNews(data)
            setLoading(false)
            setError(null)
          }
        } catch (err) {
          console.error(err)
          if (isMounted) {
            setError("Failed to load articles")
            setLoading(false)
          }
        }
      }

      loadArticles()

      return () => {
        isMounted = false
      }
    }, []),
  )

  const handleCatchUpPress = (item) => {
    if (item.id === "daily-digest") {
      navigation.navigate("AllNews")
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
    if (news.length === 0) return []

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
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      {/* Header */}
      <Header
        title="News"
        titleStyle="large"
        backgroundColor={theme.colors.Primary.Resting}
        textColor={theme.colors.Text.Inverse}
        showProfileButton
        onProfilePress={handleProfilePress}
      />

      {loading ? (
        // Show loading state
        <ScrollView style={styles.scrollView}>
          {/* Skeleton loading components */}
          <View style={styles.section}>
            <Typography variant="h5" color={theme.colors.Text.Primary} style={styles.sectionTitle}>
              Today&apos;s Catch Up
            </Typography>
            <Stack>
              <SkeletonCardCatchUp />
              <SkeletonCardCatchUp />
              <SkeletonCardCatchUp />
            </Stack>
          </View>
          <View style={styles.section}>
            <Typography variant="h5" color={theme.colors.Text.Primary} style={styles.sectionTitle}>
              Top Stories
            </Typography>
            <SkeletonCardHero />
            <SkeletonCardArticle />
            <SkeletonCardArticle />
          </View>
          <View style={styles.section}>
            <Typography variant="h5" color={theme.colors.Text.Primary} style={styles.sectionTitle}>
              All Stories
            </Typography>
            <SkeletonCardArticle />
            <SkeletonCardArticle />
            <SkeletonCardArticle />
            <SkeletonCardArticle />
          </View>
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
            </>
          </View>

          {/* All Stories Section */}
          <View style={styles.section}>
            <Typography variant="h5" color={theme.colors.Text.Primary} style={styles.sectionTitle}>
              All Stories
            </Typography>

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
  bottomPadding: {
    height: 24,
  },
})

export default TodayScreen

