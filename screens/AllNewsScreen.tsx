"use client"

import { useState, useCallback } from "react"
import { View, FlatList, StyleSheet, StatusBar as RNStatusBar, Platform, Animated } from "react-native"
import { useFocusEffect } from "@react-navigation/native"
import { useTheme } from "../theme/ThemeProvider"
import CardHorizontal from "../components/CardHorizontal"
import SkeletonCardArticle from "../components/SkeletonCardArticle"
import Typography from "../components/Typography"
import TabsWithIndicator from "../components/TabsWithIndicator"
import { fetchNewsByCategory } from "../services/sunNewsService"
import { getCategoryColor } from "../utils/categoryColors"

// Import the custom hooks
import { useColorTransition } from "../hooks/useColorTransition"
import { useContentTransition } from "../hooks/useContentTransition"

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

// Replace the animation code in the component with the hooks
const AllNewsScreen = ({ navigation }) => {
  const theme = useTheme()
  const [state, setState] = useState({
    news: [],
    loading: true,
    error: null,
    selectedMainCategory: "News",
    selectedSubCategory: "UK News",
  })

  const { news, loading, error, selectedMainCategory, selectedSubCategory } = state

  // Use the color transition hook
  const currentColor = getCategoryColor(selectedMainCategory, theme)
  const { animatedColor: animatedHeaderColor } = useColorTransition(currentColor)

  // Use the content transition hook
  const { animateTransition, animatedStyle } = useContentTransition()

  useFocusEffect(
    useCallback(() => {
      let isMounted = true

      const loadNews = async () => {
        if (!isMounted) return

        setState((prevState) => ({ ...prevState, loading: true }))
        animateTransition()

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
            setState((prevState) => ({
              ...prevState,
              news: data,
              loading: false,
              error: data.length === 0 ? "No articles found for this category." : null,
            }))
          }
        } catch (err) {
          console.error(err)
          if (isMounted) {
            setState((prevState) => ({
              ...prevState,
              error: "Failed to load news",
              loading: false,
            }))
          }
        }
      }

      loadNews()

      return () => {
        isMounted = false
      }
    }, [selectedMainCategory, selectedSubCategory, animateTransition]),
  )

  const handleMainCategoryPress = (category) => {
    if (!category) return

    setState((prevState) => ({
      ...prevState,
      selectedMainCategory: category,
      selectedSubCategory: SUBCATEGORIES[category]?.[0] || null,
    }))
  }

  const handleSubCategoryPress = (category) => {
    if (!category) return

    setState((prevState) => ({
      ...prevState,
      selectedSubCategory: category,
    }))

    // Animate content transition when subcategory changes
    animateTransition()
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

  // Render skeleton items
  const renderSkeletonItems = () => {
    return Array(5)
      .fill(0)
      .map((_, index) => <SkeletonCardArticle key={`skeleton-${index}`} />)
  }

  return (
    <View style={styles.safeArea}>
      {/* Status bar with animated section color background */}
      <Animated.View style={[styles.statusBar, { backgroundColor: animatedHeaderColor }]} />

      {/* Header with animated background */}
      <Animated.View style={[styles.header, { backgroundColor: animatedHeaderColor }]}>
        <Typography variant="h3" color={theme.colors.Text.Inverse} style={styles.headerTitle}>
          All News
        </Typography>
      </Animated.View>

      {/* Main Category Tabs with animated background */}
      <TabsWithIndicator
        tabs={MAIN_CATEGORIES}
        activeTab={selectedMainCategory}
        onTabPress={handleMainCategoryPress}
        variant="primary"
        backgroundColor={animatedHeaderColor}
        textVariant="overline"
      />

      {/* Sub Category Tabs */}
      <TabsWithIndicator
        tabs={subcategories}
        activeTab={selectedSubCategory}
        onTabPress={handleSubCategoryPress}
        variant="secondary"
        indicatorColor={currentColor}
        activeTextColor={currentColor}
        textVariant="body-02"
      />

      {/* News List with Animated Transition */}
      <Animated.View style={[styles.newsListContainer, animatedStyle]}>
        {loading ? (
          // Skeleton loading state
          <View style={styles.newsList}>{renderSkeletonItems()}</View>
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
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
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

