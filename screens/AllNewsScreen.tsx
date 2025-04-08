"use client"

import { useState, useCallback } from "react"
import { View, FlatList, StyleSheet, StatusBar as RNStatusBar, Platform } from "react-native"
import { useFocusEffect } from "@react-navigation/native"
import { useTheme } from "../theme/ThemeProvider"
import CardHorizontal from "../components/CardHorizontal"
import SkeletonLoader from "../components/SkeletonLoader"
import Typography from "../components/Typography"
import Tabs from "../components/Tabs"
import { fetchNewsByCategory } from "../services/sunNewsService"
import { getCategoryColor } from "../utils/categoryColors"

// Get status bar height
const STATUSBAR_HEIGHT = RNStatusBar.currentHeight || (Platform.OS === "ios" ? 44 : 0)

// Main categories - updated to match The Sun's exact section names
const MAIN_CATEGORIES = ["News", "Sport", "TV", "Showbiz", "Fabulous", "Money", "Travel", "Tech", "Motors", "Health"]

// Subcategories for each main category - updated to match The Sun's exact section hierarchy
const SUBCATEGORIES = {
  News: ["UK News", "World News", "Politics", "Royal Family", "US News", "Irish News", "Scottish News", "Opinion"],
  Sport: ["Football", "Boxing", "Racing", "UFC", "F1", "Cricket", "Rugby", "Golf", "Tennis", "NFL", "Dream Team"],
  TV: ["TV News", "Soaps", "Reality TV"],
  Showbiz: ["Celebrity", "Music", "Film"],
  Fabulous: ["Fashion", "Beauty", "Food", "Parenting"],
  Money: ["Property", "Bills", "Banking", "Pensions"],
  Travel: ["Beach Holidays", "UK Holidays", "City Breaks", "Cruises"],
  Tech: ["Phones", "Gaming", "Science"],
  Motors: ["New Cars", "Used Cars"],
  Health: ["Fitness", "Diet", "Health News"],
}

// Simplified component without animations
const AllNewsScreen = ({ navigation }) => {
  const theme = useTheme()
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedMainCategory, setSelectedMainCategory] = useState("News")
  const [selectedSubCategory, setSelectedSubCategory] = useState("UK News")

  // Get the current color for the header
  const currentColor = getCategoryColor(selectedMainCategory, theme)

  useFocusEffect(
    useCallback(() => {
      let isMounted = true

      const loadNews = async () => {
        if (!isMounted) return

        setLoading(true)

        try {
          let data
          // If a subcategory is selected, fetch by subcategory
          if (selectedSubCategory) {
            data = await fetchNewsByCategory(selectedSubCategory)
          }
          // Otherwise fetch by main category
          else {
            data = await fetchNewsByCategory(selectedMainCategory)
          }

          if (isMounted) {
            setNews(data)
            setLoading(false)
            setError(data.length === 0 ? "No articles found for this category." : null)
          }
        } catch (err) {
          console.error(err)
          if (isMounted) {
            setError("Failed to load news")
            setLoading(false)
          }
        }
      }

      loadNews()

      return () => {
        isMounted = false
      }
    }, [selectedMainCategory, selectedSubCategory]),
  )

  const handleMainCategoryPress = (category) => {
    if (!category) return
    setSelectedMainCategory(category)
    setSelectedSubCategory(SUBCATEGORIES[category]?.[0] || null)
  }

  const handleSubCategoryPress = (category) => {
    if (!category) return
    setSelectedSubCategory(category)
  }

  const handleNewsPress = (article) => {
    if (!article) return
    navigation.navigate("AllNewsArticle", { article })
  }

  const handleBookmark = (id) => {
    if (!id) return
    console.log("Bookmark article:", id)
  }

  const handleShare = (id) => {
    if (!id) return
    console.log("Share article:", id)
  }

  // Safely get subcategories
  const subcategories = SUBCATEGORIES[selectedMainCategory] || []

  return (
    <View style={[styles.safeArea, { backgroundColor: theme.colors.Surface.Secondary }]}>
      {/* Status bar with fixed color */}
      <View style={[styles.statusBar, { backgroundColor: currentColor }]} />

      {/* Header with fixed color */}
      <View style={[styles.header, { backgroundColor: currentColor }]}>
        <Typography variant="h3" color={theme.colors.Text.Inverse} style={styles.headerTitle}>
          All News
        </Typography>
      </View>

      {/* Main Category Tabs */}
      <Tabs
        tabs={MAIN_CATEGORIES}
        activeTab={selectedMainCategory}
        onTabPress={handleMainCategoryPress}
        variant="primary"
        backgroundColor={currentColor}
        textVariant="overline"
      />

      {/* Sub Category Tabs - Using secondary variant with correct text colors */}
      <Tabs
        tabs={subcategories}
        activeTab={selectedSubCategory}
        onTabPress={handleSubCategoryPress}
        variant="secondary"
        backgroundColor="#FFFFFF"
        activeTextColor={theme.colors.Text.Primary}
        inactiveTextColor={theme.colors.Text.Secondary}
        textVariant="body-02"
      />

      {/* News List */}
      <View style={[styles.newsListContainer, { backgroundColor: theme.colors.Surface.Secondary }]}>
        {loading ? (
          // Skeleton loading state using SkeletonLoader
          <View style={styles.newsList}>
            <SkeletonLoader type="allNews" count={5} />
          </View>
        ) : error ? (
          // Error state
          <View style={styles.errorContainer}>
            <Typography variant="subtitle-01" color={theme.colors.Error.Resting} style={styles.errorText}>
              {error}
            </Typography>
            <Typography variant="body-01" color={theme.colors.Text.Secondary} style={styles.errorSubtext}>
              Please check your connection and try again.
            </Typography>
          </View>
        ) : (
          // Actual content
          <FlatList
            data={news}
            keyExtractor={(item) => (item.id ? item.id.toString() : Math.random().toString())}
            renderItem={({ item }) => (
              <CardHorizontal
                id={item.id}
                title={item.title}
                imageUrl={item.imageUrl}
                category={item.category}
                readTime={item.readTime}
                onPress={() => handleNewsPress(item)}
                onBookmark={() => handleBookmark(item.id)}
                onShare={() => handleShare(item.id)}
              />
            )}
            contentContainerStyle={styles.newsList}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Typography variant="body-01" color={theme.colors.Text.Secondary} style={styles.emptyText}>
                  No articles found for this category.
                </Typography>
              </View>
            }
          />
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
  header: {
    paddingHorizontal: 24,
    paddingBottom: 16,
    paddingTop: 16,
  },
  headerTitle: {
    fontWeight: "700",
  },
  newsListContainer: {
    flex: 1,
  },
  newsList: {
    padding: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    marginBottom: 8,
  },
  errorSubtext: {
    textAlign: "center",
  },
  emptyContainer: {
    padding: 20,
    alignItems: "center",
  },
  emptyText: {
    textAlign: "center",
  },
})

export default AllNewsScreen
