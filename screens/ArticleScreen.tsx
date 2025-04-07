"use client"

import { useState, useCallback } from "react"
import { View, StyleSheet, ScrollView, TouchableOpacity, StatusBar } from "react-native"
import { useFocusEffect } from "@react-navigation/native"
import { useTheme } from "../theme/ThemeProvider"
import Typography from "../components/Typography"
import Comments from "../components/Comments"
import SkeletonLoader from "../components/SkeletonLoader"
import { fetchArticleById } from "../services/sunNewsService"
import TopNav from "../components/TopNav"
import ArticleHeader from "../components/ArticleHeader"

const ArticleScreen = ({ route, navigation }) => {
  const { article: routeArticle } = route.params || {}
  const [article, setArticle] = useState(routeArticle || null)
  const [loading, setLoading] = useState(!routeArticle || !routeArticle.content)
  const [error, setError] = useState(null)

  const theme = useTheme()

  useFocusEffect(
    useCallback(() => {
      let isMounted = true

      // If we don't have a full article from the route params, fetch it
      if (!routeArticle || !routeArticle.content) {
        const fetchArticle = async () => {
          if (!isMounted) return

          setLoading(true)

          try {
            if (routeArticle?.id) {
              const fullArticle = await fetchArticleById(routeArticle.id)
              if (isMounted) {
                setArticle(fullArticle)
                setLoading(false)
                setError(null)
              }
            } else {
              if (isMounted) {
                setError("No article ID provided")
                setLoading(false)
              }
            }
          } catch (err) {
            console.error(err)
            if (isMounted) {
              setError("Failed to load article")
              setLoading(false)
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

  // Safely get article content or provide default
  const articleContent = article?.content || "No content available"

  // Safely split content into paragraphs
  const contentParagraphs = articleContent.split("\n\n") || [""]
  const subtitle = contentParagraphs[0] || ""
  const remainingParagraphs = contentParagraphs.slice(1) || []

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />

      {/* Top Navigation */}
      <TopNav
        title={article?.category || "Article"}
        showBackButton
        onBackPress={() => navigation.goBack()}
        backgroundColor="#F5F5F5"
      />

      {loading ? (
        // Skeleton loading state using SkeletonLoader
        <ScrollView style={styles.scrollView}>
          <SkeletonLoader type="article" />
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
        // Actual content
        <ScrollView
          style={[styles.scrollView, { backgroundColor: theme.colors.Surface.Secondary }]}
          contentContainerStyle={[styles.scrollViewContent, { paddingHorizontal: theme.space["40"] }]}
        >
          {/* Article Header Component */}
          <ArticleHeader
            title={article.title}
            subtitle={subtitle}
            category={article.category}
            flag={article.flag}
            readTime={article.readTime || "3 min read"}
            author={article.author}
            timestamp={article.timestamp}
            imageUrl={article.imageUrl}
          />

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

