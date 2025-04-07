"use client"

import { useState, useCallback } from "react"
import { View, StyleSheet, ScrollView, TouchableOpacity, Dimensions, StatusBar, Animated } from "react-native"
import { useFocusEffect } from "@react-navigation/native"
import { Feather } from "@expo/vector-icons"
import { useTheme } from "../theme/ThemeProvider"
import Typography from "../components/Typography"
import Comments from "../components/Comments"
import Flag from "../components/Flag"
import Header from "../components/Header"
import LazyImage from "../components/LazyImage"
import SkeletonArticle from "../components/SkeletonArticle"
import { fetchArticleById } from "../services/sunNewsService"
import { getCategoryColor } from "../utils/categoryColors"
import { useFadeAnimation } from "../hooks/useFadeAnimation"

const { width } = Dimensions.get("window")
const imageHeight = (width * 2) / 3 // 3:2 ratio

const ArticleScreen = ({ route, navigation }) => {
  const { article: routeArticle } = route.params || {}
  const [state, setState] = useState({
    article: routeArticle || null,
    loading: !routeArticle || !routeArticle.content,
    error: null,
  })

  const { article, loading, error } = state
  const theme = useTheme()

  // Use the fade animation hook for content transitions
  const { opacity, fadeIn, fadeOut } = useFadeAnimation({ initialValue: 0 })

  useFocusEffect(
    useCallback(() => {
      let isMounted = true

      // If we don't have a full article from the route params, fetch it
      if (!routeArticle || !routeArticle.content) {
        const fetchArticle = async () => {
          if (!isMounted) return

          setState((prevState) => ({ ...prevState, loading: true }))

          try {
            if (routeArticle?.id) {
              const fullArticle = await fetchArticleById(routeArticle.id)
              if (isMounted) {
                setState({
                  article: fullArticle,
                  loading: false,
                  error: null,
                })
                // Fade in the content when loaded
                fadeIn()
              }
            } else {
              if (isMounted) {
                setState((prevState) => ({
                  ...prevState,
                  error: "No article ID provided",
                  loading: false,
                }))
              }
            }
          } catch (err) {
            console.error(err)
            if (isMounted) {
              setState((prevState) => ({
                ...prevState,
                error: "Failed to load article",
                loading: false,
              }))
            }
          }
        }

        fetchArticle()
      } else {
        // If we already have the article, fade in the content
        fadeIn()
      }

      return () => {
        isMounted = false
        // Fade out when leaving the screen
        fadeOut()
      }
    }, [routeArticle, fadeIn, fadeOut]),
  )

  // Get the appropriate section color for this article
  const sectionColor = article?.category ? getCategoryColor(article.category, theme) : theme.colors.Section.News

  // Mock comments data with replies
  const comments = [
    {
      id: 1,
      author: "Sharon McDonald",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.",
      time: "10 mins ago",
      likes: 1,
      replies: [
        {
          id: 101,
          author: "John Smith",
          text: "I agree with your point!",
          time: "5 mins ago",
          likes: 0,
        },
        {
          id: 102,
          author: "Jane Doe",
          text: "Interesting perspective.",
          time: "2 mins ago",
          likes: 0,
        },
      ],
    },
    {
      id: 2,
      author: "Sharon McDonald",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.",
      time: "10 mins ago",
      likes: 8,
      replies: [],
    },
  ]

  const handleSubmitComment = (text) => {
    console.log("New comment:", text)
    // In a real app, you would add the comment to the comments array
  }

  const handleLikeComment = (commentId, isLiked) => {
    console.log("Comment liked:", commentId, "Liked status:", isLiked)
    // In a real app, you would update the likes count on the server
  }

  const handleReplyComment = (commentId) => {
    console.log("Reply to comment:", commentId)
    // In a real app, you would show a reply input or navigate to a reply screen
  }

  const handleViewReplies = (commentId) => {
    console.log("View replies for comment:", commentId)
    // In a real app, you would expand the replies or navigate to a replies screen
  }

  const handleShowAllComments = () => {
    console.log("Show all comments")
    // In a real app, you would navigate to a comments screen or load more comments
  }

  const handleSharePress = () => {
    console.log("Share article")
  }

  const handleSavePress = () => {
    console.log("Save article")
  }

  // Safely get article content or provide default
  const articleContent = article?.content || "No content available"

  // Safely split content into paragraphs
  const contentParagraphs = articleContent.split("\n\n") || [""]
  const subtitle = contentParagraphs[0] || ""
  const remainingParagraphs = contentParagraphs.slice(1) || []

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
      <Header
        title={article?.category || "Article"}
        showBackButton
        onBackPress={() => navigation.goBack()}
        backgroundColor={sectionColor}
        textColor="#FFFFFF"
        flag={article?.flag ? { text: article.flag, category: article.category } : null}
      />

      {loading ? (
        // Skeleton loading state
        <ScrollView style={styles.scrollView}>
          <SkeletonArticle />
        </ScrollView>
      ) : error || !article ? (
        // Error state
        <View style={styles.errorContainer}>
          <Typography variant="h5" color={theme.colors.Text.Primary}>
            {error || "Article not found"}
          </Typography>
          <TouchableOpacity
            style={[styles.backToHomeButton, { backgroundColor: theme.colors.Primary.Resting }]}
            onPress={() => navigation.goBack()}
          >
            <Typography variant="button" color={theme.colors.Text.Inverse}>
              Go Back
            </Typography>
          </TouchableOpacity>
        </View>
      ) : (
        // Actual content with fade animation
        <Animated.View style={{ flex: 1, opacity }}>
          <ScrollView
            style={[styles.scrollView, { backgroundColor: theme.colors.Surface.Secondary }]}
            contentContainerStyle={[styles.scrollViewContent, { paddingHorizontal: theme.space["40"] }]}
          >
            {/* Tags */}
            <View style={styles.tagsContainer}>
              {!article.flag && (
                <Flag text={article.category || "NEWS"} category={article.category} style={styles.flag} />
              )}
            </View>

            {/* Title */}
            <Typography variant="h3" color={theme.colors.Text.Primary} style={styles.title}>
              {article.title || "No title available"}
            </Typography>

            {/* Subtitle */}
            <Typography variant="subtitle-01" color={theme.colors.Text.Secondary} style={styles.subtitle}>
              {subtitle}
            </Typography>

            {/* Reading time */}
            <View style={styles.readingTimeContainer}>
              <Feather name="clock" size={14} color={theme.colors.Text.Secondary} />
              <Typography variant="subtitle-02" color={theme.colors.Text.Secondary} style={styles.readingTime}>
                {article.readTime || "3 min read"}
              </Typography>
            </View>

            {/* Author info */}
            <View style={styles.authorContainer}>
              <Typography variant="subtitle-02" color={theme.colors.Text.Primary}>
                {article.author || "The Sun"}
              </Typography>
              <Typography variant="body-02" color={theme.colors.Text.Secondary}>
                Published {article.timestamp || "Recently"}
              </Typography>
            </View>

            {/* Article Image */}
            <View
              style={[
                styles.articleImage,
                { height: imageHeight, backgroundColor: theme.colors.Border["Border-Primary"] },
              ]}
            >
              {article.imageUrl ? (
                <LazyImage
                  source={{ uri: article.imageUrl }}
                  style={{ width: "100%", height: "100%" }}
                  resizeMode="cover"
                />
              ) : (
                <Feather name="image" size={24} color={theme.colors.Text.Secondary} />
              )}
            </View>

            {/* Article content */}
            <View style={styles.articleContent}>
              {remainingParagraphs.map((paragraph, index) => (
                <Typography key={index} variant="body-01" color={theme.colors.Text.Secondary} style={styles.paragraph}>
                  {paragraph}
                </Typography>
              ))}
            </View>

            {/* Comments Section using Comments component */}
            <Comments
              comments={comments}
              totalComments={8}
              onShowAllPress={handleShowAllComments}
              onSubmitComment={handleSubmitComment}
              onLikeComment={handleLikeComment}
              onReplyComment={handleReplyComment}
              onViewReplies={handleViewReplies}
            />

            {/* Bottom spacing */}
            <View style={styles.bottomSpacing} />
          </ScrollView>
        </Animated.View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingTop: 16,
    paddingBottom: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  backToHomeButton: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  tagsContainer: {
    flexDirection: "row",
    marginBottom: 8,
  },
  flag: {
    marginRight: 8,
  },
  title: {
    marginBottom: 8,
  },
  subtitle: {
    marginBottom: 12,
  },
  readingTimeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  readingTime: {
    marginLeft: 4,
  },
  authorContainer: {
    marginBottom: 16,
  },
  articleImage: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    borderRadius: 4,
  },
  articleContent: {
    marginBottom: 24,
  },
  paragraph: {
    marginBottom: 16,
  },
  bottomSpacing: {
    height: 20,
  },
})

export default ArticleScreen

