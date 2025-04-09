"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { View, StyleSheet, FlatList, Dimensions, StatusBar, TouchableOpacity } from "react-native"
import { useTheme } from "../theme/ThemeProvider"
import Typography from "../components/Typography"
import Stepper from "../components/Stepper"
import ArticleScreen from "./ArticleScreen"
import TopNav from "../components/TopNav"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { setStatusBarBackgroundColor } from "expo-status-bar"

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
  const insets = useSafeAreaInsets()

  // Calculate the height of the TopNav
  const topNavHeight = insets.top + 48 // Safe area top + content height

  // Scroll to the initial article when the component mounts
  useEffect(() => {
    // Only attempt to scroll if we have valid articles and a valid initialIndex
    if (flatListRef.current && articles.length > 0 && initialIndex >= 0 && initialIndex < articles.length) {
      // Set the current index immediately to ensure the stepper shows the correct position
      setCurrentIndex(initialIndex)

      // Use a timeout to ensure the FlatList has rendered
      const timer = setTimeout(() => {
        try {
          flatListRef.current?.scrollToIndex({
            index: initialIndex,
            animated: false,
            viewPosition: 0,
            viewOffset: 0,
          })
        } catch (error) {
          console.error("Error scrolling to index:", error)
        }
      }, 300) // Longer timeout to ensure rendering is complete

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
    // and remove top padding
    return (
      <View style={styles.articleContainer}>
        <ArticleScreen
          route={{ params: { article: safeArticle } }}
          navigation={navigation}
          hideHeader={true}
          removeTopPadding={true}
        />
      </View>
    )
  }

  // Handle errors with empty articles array
  if (!articles.length) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

        {/* TopNav */}
        <View style={[styles.topNavContainer, { backgroundColor: "transparent" }]}>
          <TopNav
            showBackButton
            onBackPress={handleBackPress}
            backgroundColor="transparent"
            textColor={theme.colors.Text.Primary}
          />
        </View>

        {/* Error message */}
        <View style={[styles.errorContainer, { marginTop: topNavHeight }]}>
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
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      {/* Fixed position stepper below TopNav */}
      <View style={[styles.stepperContainer, { top: topNavHeight }]}>
        <Stepper totalSteps={articles.length} currentStep={currentIndex} />
      </View>

      {/* Article content */}
      <View style={[styles.articlesContainer, { marginTop: topNavHeight + 24 }]}>
        <FlatList
          ref={flatListRef}
          data={articles}
          renderItem={renderArticle}
          keyExtractor={(item, index) => (item.id ? item.id.toString() : `article-${index}`)}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={handleScroll}
          initialNumToRender={articles.length}
          maxToRenderPerBatch={3}
          windowSize={5}
          contentContainerStyle={styles.flatListContent}
          getItemLayout={(data, index) => ({
            length: width,
            offset: width * index,
            index,
          })}
        />
      </View>

      {/* TopNav on top */}
      <View style={[styles.topNavContainer, { backgroundColor: "transparent" }]}>
        <TopNav
          showBackButton
          onBackPress={handleBackPress}
          textColor={theme.colors.Text.Primary}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  topNavContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: "transparent",
  },
  stepperContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    zIndex: 5,
    backgroundColor: "transparent",
  },
  articlesContainer: {
    flex: 1,
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
  flatListContent: {
    paddingTop: 0,
  },
})

export default ArticleStackScreen
