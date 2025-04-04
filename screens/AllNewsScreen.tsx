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

// Additional sections that don't fit in the main navigation
const ADDITIONAL_SECTIONS = [
  "Puzzles",
  "Dear Deidre",
  "Sun Bingo",
  "Sun Vegas",
  "Sun Savers",
  "Sun Casino",
  "Sun Win",
  "Sun Selects",
]

// Map categories to section colors
const getCategoryColor = (category, theme) => {
  if (!category || !theme) return "#E03A3A" // Default to red if missing data

  // Normalize the category name for comparison
  const normalizedCategory = category.toLowerCase()

  // Main sections
  if (normalizedCategory === "news") return theme.colors.Section.News
  if (normalizedCategory === "sport") return theme.colors.Section.Sport
  if (normalizedCategory === "tv") return theme.colors.Section.TV
  if (normalizedCategory === "showbiz") return theme.colors.Section.Showbiz
  if (normalizedCategory === "fabulous") return theme.colors.Section.Fabulous
  if (normalizedCategory === "money") return theme.colors.Section.Money
  if (normalizedCategory === "travel") return theme.colors.Section.Travel
  if (normalizedCategory === "tech") return theme.colors.Section.Tech
  if (normalizedCategory === "motors") return theme.colors.Section.Motors
  if (normalizedCategory === "health") return theme.colors.Section.Health

  // News subsections
  if (normalizedCategory === "uk news") return theme.colors.Section["UK News"]
  if (normalizedCategory === "world news") return theme.colors.Section["World News"]
  if (normalizedCategory === "politics") return theme.colors.Section.Politics
  if (normalizedCategory === "royal family") return theme.colors.Section["Royal Family"]
  if (normalizedCategory === "us news") return theme.colors.Section["US News"]
  if (normalizedCategory === "irish news") return theme.colors.Section["Irish News"]
  if (normalizedCategory === "scottish news") return theme.colors.Section["Scottish News"]
  if (normalizedCategory === "opinion") return theme.colors.Section.Opinion

  // Sport subsections
  if (normalizedCategory === "football") return theme.colors.Section.Football
  if (normalizedCategory === "boxing") return theme.colors.Section.Boxing
  if (normalizedCategory === "racing") return theme.colors.Section.Racing
  if (normalizedCategory === "ufc") return theme.colors.Section.UFC
  if (normalizedCategory === "f1") return theme.colors.Section.F1
  if (normalizedCategory === "cricket") return theme.colors.Section.Cricket
  if (normalizedCategory === "rugby") return theme.colors.Section.Rugby
  if (normalizedCategory === "golf") return theme.colors.Section.Golf
  if (normalizedCategory === "tennis") return theme.colors.Section.Tennis
  if (normalizedCategory === "nfl") return theme.colors.Section.NFL
  if (normalizedCategory === "dream team") return theme.colors.Section["Dream Team"]

  // Other subsections
  if (normalizedCategory === "soaps") return theme.colors.Section.Soaps
  if (normalizedCategory === "reality tv") return theme.colors.Section["Reality TV"]
  if (normalizedCategory === "tv news") return theme.colors.Section["TV News"]
  if (normalizedCategory === "celebrity") return theme.colors.Section.Celebrity
  if (normalizedCategory === "music") return theme.colors.Section.Music
  if (normalizedCategory === "film") return theme.colors.Section.Film
  if (normalizedCategory === "fashion") return theme.colors.Section.Fashion
  if (normalizedCategory === "beauty") return theme.colors.Section.Beauty
  if (normalizedCategory === "food") return theme.colors.Section.Food
  if (normalizedCategory === "parenting") return theme.colors.Section.Parenting
  if (normalizedCategory === "property") return theme.colors.Section.Property
  if (normalizedCategory === "bills") return theme.colors.Section.Bills
  if (normalizedCategory === "banking") return theme.colors.Section.Banking
  if (normalizedCategory === "pensions") return theme.colors.Section.Pensions
  if (normalizedCategory === "beach holidays") return theme.colors.Section["Beach Holidays"]
  if (normalizedCategory === "uk holidays") return theme.colors.Section["UK Holidays"]
  if (normalizedCategory === "city breaks") return theme.colors.Section["City Breaks"]
  if (normalizedCategory === "cruises") return theme.colors.Section.Cruises
  if (normalizedCategory === "phones") return theme.colors.Section.Phones
  if (normalizedCategory === "gaming") return theme.colors.Section.Gaming
  if (normalizedCategory === "science") return theme.colors.Section.Science
  if (normalizedCategory === "new cars") return theme.colors.Section["New Cars"]
  if (normalizedCategory === "used cars") return theme.colors.Section["Used Cars"]
  if (normalizedCategory === "fitness") return theme.colors.Section.Fitness
  if (normalizedCategory === "diet") return theme.colors.Section.Diet
  if (normalizedCategory === "health news") return theme.colors.Section["Health News"]

  // Additional sections
  if (normalizedCategory === "puzzles") return theme.colors.Section.Puzzles
  if (normalizedCategory === "dear deidre") return theme.colors.Section["Dear Deidre"]
  if (normalizedCategory === "sun bingo") return theme.colors.Section["Sun Bingo"]
  if (normalizedCategory === "sun vegas") return theme.colors.Section["Sun Vegas"]
  if (normalizedCategory === "sun savers") return theme.colors.Section["Sun Savers"]
  if (normalizedCategory === "sun casino") return theme.colors.Section["Sun Casino"]
  if (normalizedCategory === "sun win") return theme.colors.Section["Sun Win"]
  if (normalizedCategory === "sun selects") return theme.colors.Section["Sun Selects"]

  // Default to News if no match
  return theme.colors.Section.News
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

