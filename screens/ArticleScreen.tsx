"use client"

import { useState, useCallback } from "react"
import { View, StyleSheet, ScrollView, TouchableOpacity, Dimensions, StatusBar } from "react-native"
import { useFocusEffect } from "@react-navigation/native"
import { Feather } from "@expo/vector-icons"
import { useTheme } from "../theme/ThemeProvider"
import Typography from "../components/Typography"
import Comments from "../components/Comments"
import Flag from "../components/Flag"
import Header from "../components/Header"
import LazyImage from "./LazyImage"
import SkeletonArticle from "../components/SkeletonArticle"
import { fetchArticleById } from "../services/sunNewsService"

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
      }

      return () => {
        isMounted = false
      }
    }, [routeArticle]),
  )

  // Get category color based on article category
  const getCategoryColor = (categoryText) => {
    if (!categoryText) return theme.colors.Section.News

    const normalizedCategory = categoryText.toUpperCase()

    // Sport categories
    if (
      normalizedCategory.includes("FOOTBALL") ||
      normalizedCategory.includes("BOXING") ||
      normalizedCategory.includes("SPORT") ||
      normalizedCategory.includes("RUGBY") ||
      normalizedCategory.includes("CRICKET") ||
      normalizedCategory.includes("F1") ||
      normalizedCategory.includes("TENNIS") ||
      normalizedCategory.includes("GOLF")
    ) {
      return theme.colors.Section.Sport
    }
    // TV categories
    else if (
      normalizedCategory.includes("TV") ||
      normalizedCategory.includes("TELEVISION") ||
      normalizedCategory.includes("SOAPS") ||
      normalizedCategory.includes("REALITY")
    ) {
      return theme.colors.Section.TV
    }
    // Showbiz categories
    else if (
      normalizedCategory.includes("SHOWBIZ") ||
      normalizedCategory.includes("CELEBRITY") ||
      normalizedCategory.includes("MUSIC") ||
      normalizedCategory.includes("FILM")
    ) {
      return theme.colors.Section.Showbiz
    }
    // Tech categories
    else if (normalizedCategory.includes("TECH") || normalizedCategory.includes("TECHNOLOGY")) {
      return theme.colors.Section.Tech
    }
    // Travel categories
    else if (normalizedCategory.includes("TRAVEL")) {
      return theme.colors.Section.Travel
    }
    // Money categories
    else if (normalizedCategory.includes("MONEY") || normalizedCategory.includes("FINANCE")) {
      return theme.colors.Section.Money
    }
    // Health categories
    else if (normalizedCategory.includes("HEALTH")) {
      return theme.colors.Section.Health
    }
    // Politics categories
    else if (normalizedCategory.includes("POLITICS")) {
      return theme.colors.Section.Politics
    }
    // Motors categories
    else if (normalizedCategory.includes("MOTORS") || normalizedCategory.includes("CAR")) {
      return theme.colors.Section.Motors
    }
    // Fabulous/Fashion categories
    else if (
      normalizedCategory.includes("FABULOUS") ||
      normalizedCategory.includes("FASHION") ||
      normalizedCategory.includes("BEAUTY")
    ) {
      return theme.colors.Section.Fabulous
    }
    // Food categories
    else if (normalizedCategory.includes("FOOD")) {
      return theme.colors.Section.Food
    }
    // Default to News
    else {
      return theme.colors.Section.News
    }
  }

  // Get the appropriate section color for this article
  const sectionColor = article?.category ? getCategoryColor(article.category) : theme.colors.Section.News

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

  // Render skeleton loading state
  if (loading) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
        <Header
          title={article?.category || "Article"}
          showBackButton
          onBackPress={() => navigation.goBack()}
          backgroundColor={sectionColor}
          textColor="#FFFFFF"
        />
        <ScrollView style={styles.scrollView}>
          <SkeletonArticle />
        </ScrollView>
      </View>
    )
  }

  // If error or article is undefined, show an error message
  if (error || !article) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
        <Header title="Article" showBackButton onBackPress={() => navigation.goBack()} />
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
      </View>
    )
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

      {/* Header */}
      <Header
        title={article.category || "News"}
        showBackButton
        onBackPress={() => navigation.goBack()}
        rightButtons={[
          { label: "SHARE", onPress: handleSharePress },
          { label: "SAVE", onPress: handleSavePress },
        ]}
        backgroundColor={sectionColor}
        textColor="#FFFFFF"
        flag={article.flag ? { text: article.flag, category: article.category } : null}
      />

      <ScrollView
        style={[styles.scrollView, { backgroundColor: theme.colors.Surface.Secondary }]}
        contentContainerStyle={[styles.scrollViewContent, { paddingHorizontal: theme.space["40"] }]}
      >
        {/* Tags */}
        <View style={styles.tagsContainer}>
          {!article.flag && <Flag text={article.category || "NEWS"} category={article.category} style={styles.flag} />}
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
          style={[styles.articleImage, { height: imageHeight, backgroundColor: theme.colors.Border["Border-Primary"] }]}
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

