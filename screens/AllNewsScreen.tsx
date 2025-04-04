"use client"

import { useState, useCallback } from "react"
import {
  View,
  FlatList,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar as RNStatusBar,
  Platform,
} from "react-native"
import { useFocusEffect } from "@react-navigation/native"
import { useTheme } from "../theme/ThemeProvider"
import CardHorizontal from "../components/CardHorizontal"
import SkeletonCardArticle from "../components/SkeletonCardArticle"
import Typography from "../components/Typography"
import { fetchNewsByCategory } from "../services/sunNewsService"

// Get status bar height
const STATUSBAR_HEIGHT = RNStatusBar.currentHeight || (Platform.OS === "ios" ? 44 : 0)

// Main categories - updated to match The Sun's exact section names
const MAIN_CATEGORIES = ["News", "Sport", "Showbiz", "TV"]

// Subcategories for each main category - updated to match The Sun's exact section names
const SUBCATEGORIES = {
  News: ["UK News", "World News", "Politics", "Health", "Money", "Tech"],
  Sport: ["Football", "Boxing", "F1", "Cricket", "Rugby", "Tennis", "Golf"],
  Showbiz: ["Celebrity", "Music", "Film"],
  TV: ["TV News", "Soaps", "Reality TV"],
}

// Map categories to section colors
const getCategoryColor = (category, theme) => {
  switch (category) {
    case "News":
      return theme.colors.Section.News
    case "Sport":
      return theme.colors.Section.Sport
    case "Showbiz":
      return theme.colors.Section.Showbiz
    case "TV":
      return theme.colors.Section.TV
    case "Politics":
      return theme.colors.Section.Politics
    case "Health":
      return theme.colors.Section.Health
    case "Money":
      return theme.colors.Section.Money
    case "Tech":
      return theme.colors.Section.Tech
    default:
      return theme.colors.Section.News
  }
}

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

  // Get current section color
  const currentSectionColor = getCategoryColor(selectedMainCategory, theme)

  useFocusEffect(
    useCallback(() => {
      let isMounted = true

      const loadNews = async () => {
        if (!isMounted) return

        setState((prevState) => ({ ...prevState, loading: true }))

        try {
          let data
          if (selectedSubCategory) {
            data = await fetchNewsByCategory(selectedSubCategory)
          } else {
            data = await fetchNewsByCategory(selectedMainCategory)
          }

          if (isMounted) {
            setState((prevState) => ({
              ...prevState,
              news: data,
              loading: false,
              error: null,
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
    }, [selectedMainCategory, selectedSubCategory]),
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
      {/* Status bar with section color background */}
      <View style={[styles.statusBar, { backgroundColor: currentSectionColor }]} />

      {/* Header */}
      <View style={[styles.header, { backgroundColor: currentSectionColor }]}>
        <Typography variant="h3" color={theme.colors.Text.Inverse} style={styles.headerTitle}>
          All News
        </Typography>
      </View>

      {/* Main Category Tabs */}
      <View style={[styles.mainCategoryContainer, { backgroundColor: currentSectionColor }]}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.mainCategoryScrollContent}
        >
          {MAIN_CATEGORIES.map((category) => (
            <TouchableOpacity
              key={category}
              style={[styles.mainCategoryTab, selectedMainCategory === category && styles.selectedMainCategoryTab]}
              onPress={() => handleMainCategoryPress(category)}
            >
              <Typography
                variant="overline"
                color={selectedMainCategory === category ? "#FFFFFF" : "rgba(255, 255, 255, 0.7)"}
              >
                {category}
              </Typography>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Sub Category Tabs */}
      <View style={styles.subCategoryContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.subCategoryScrollContent}
        >
          {subcategories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.subCategoryTab,
                selectedSubCategory === category && [
                  styles.selectedSubCategoryTab,
                  { borderBottomColor: currentSectionColor },
                ],
              ]}
              onPress={() => handleSubCategoryPress(category)}
            >
              <Typography
                variant="body-02"
                color={selectedSubCategory === category ? currentSectionColor : theme.colors.Text.Secondary}
                style={selectedSubCategory === category ? { fontWeight: "600" } : {}}
              >
                {category}
              </Typography>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* News List with Skeleton Loading */}
      <View style={styles.newsListContainer}>
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
      </View>
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
  mainCategoryContainer: {
    paddingVertical: 16,
  },
  mainCategoryScrollContent: {
    paddingHorizontal: 16,
  },
  mainCategoryTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
  },
  selectedMainCategoryTab: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 20,
  },
  subCategoryContainer: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  subCategoryScrollContent: {
    paddingHorizontal: 16,
  },
  subCategoryTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
  },
  selectedSubCategoryTab: {
    borderBottomWidth: 2,
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

