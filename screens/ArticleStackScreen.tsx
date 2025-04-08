"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { View, StyleSheet, TouchableOpacity, FlatList, Dimensions, StatusBar } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useTheme } from "../theme/ThemeProvider"
import Typography from "../components/Typography"
import Stepper from "../components/Stepper"
import ArticleScreen from "./ArticleScreen"

const { width } = Dimensions.get("window")

const ArticleStackScreen = ({ route, navigation }) => {
  // Extract and validate params with defaults
  const params = route.params || {}
  const articles = Array.isArray(params.articles) ? params.articles : []
  const initialIndex = typeof params.initialIndex === "number" ? params.initialIndex : 0
  const title = params.title || "Top stories"

  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const flatListRef = useRef(null)
  const theme = useTheme()

  // Scroll to the initial article when the component mounts
  useEffect(() => {
    // Only attempt to scroll if we have valid articles and a valid initialIndex
    if (flatListRef.current && articles.length > 0 && initialIndex >= 0 && initialIndex < articles.length) {
      // Use a timeout to ensure the FlatList has rendered
      const timer = setTimeout(() => {
        try {
          flatListRef.current?.scrollToIndex({
            index: initialIndex,
            animated: false,
          })
        } catch (error) {
          console.error("Error scrolling to index:", error)
        }
      }, 100)

      return () => clearTimeout(timer)
    }
  }, [initialIndex, articles.length])

  const handleScroll = useCallback(
    (event) => {
      try {
        const contentOffsetX = event.nativeEvent.contentOffset.x
        const newIndex = Math.round(contentOffsetX / width)

        // Only update state if the index has actually changed and is valid
        if (newIndex !== currentIndex && newIndex >= 0 && newIndex < articles.length) {
          setCurrentIndex(newIndex)
        }
      } catch (error) {
        console.error("Error handling scroll:", error)
      }
    },
    [currentIndex, articles.length, width],
  )

  const handleBackPress = () => {
    navigation.goBack()
  }

  const renderArticle = ({ item, index }) => {
    // Ensure the article has all required properties
    const safeArticle = {
      id: item.id || `article-${index}`,
      title: item.title || "Untitled Article",
      category: item.category || "",
      flag: item.flag || "",
      imageUrl: item.imageUrl || "",
      readTime: item.readTime || "3 min read",
      timestamp: item.timestamp || "Today",
      content: item.content || "",
      author: item.author || "The Sun",
    }

    // Pass the article to the ArticleScreen component
    // but hide the header since we're providing our own
    return (
      <View style={styles.articleContainer}>
        <ArticleScreen route={{ params: { article: safeArticle } }} navigation={navigation} hideHeader={true} />
      </View>
    )
  }

  // Handle errors with empty articles array
  if (!articles.length) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#F5F5F5" />

        {/* Header */}
        <View style={[styles.header, { backgroundColor: theme.colors.Surface.Primary }]}>
          <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
            <View style={styles.backButtonCircle}>
              <Ionicons name="chevron-back" size={24} color={theme.colors.Text.Primary} />
            </View>
          </TouchableOpacity>

          <View style={styles.titleContainer}>
            <Typography variant="subtitle-01" color={theme.colors.Text.Primary} numberOfLines={1}>
              {title}
            </Typography>
          </View>
        </View>

        {/* Error message */}
        <View style={styles.errorContainer}>
          <Typography variant="subtitle-01" color={theme.colors.Error.Resting}>
            No articles available
          </Typography>
          <TouchableOpacity
            style={[styles.backToHomeButton, { backgroundColor: theme.colors.Primary.Resting }]}
            onPress={handleBackPress}
          >
            <Typography variant="button" color={theme.colors.Text.Inverse}>
              Go Back
            </Typography>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F5F5" />

      {/* Custom header with stepper */}
      <View style={[styles.header, { backgroundColor: theme.colors.Surface.Primary }]}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <View style={styles.backButtonCircle}>
            <Ionicons name="chevron-back" size={24} color={theme.colors.Text.Primary} />
          </View>
        </TouchableOpacity>

        <View style={styles.titleContainer}>
          <Typography variant="subtitle-01" color={theme.colors.Text.Primary} numberOfLines={1}>
            {title}
          </Typography>
        </View>
      </View>

      {/* Stepper component */}
      <View style={styles.stepperContainer}>
        <Stepper totalSteps={articles.length} currentStep={currentIndex} />
      </View>

      {/* Article content */}
      <FlatList
        ref={flatListRef}
        data={articles}
        renderItem={renderArticle}
        keyExtractor={(item, index) => (item.id ? item.id.toString() : `article-${index}`)}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        initialNumToRender={1}
        maxToRenderPerBatch={2}
        windowSize={3}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 44, // Account for status bar
    paddingBottom: 10,
    paddingHorizontal: 16,
  },
  backButton: {
    marginRight: 16,
  },
  backButtonCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F0F0F0",
    justifyContent: "center",
    alignItems: "center",
  },
  titleContainer: {
    flex: 1,
  },
  stepperContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  articleContainer: {
    width,
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  backToHomeButton: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
})

export default ArticleStackScreen
