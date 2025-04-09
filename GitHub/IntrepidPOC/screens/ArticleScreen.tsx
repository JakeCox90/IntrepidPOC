"use client"

import { useState, useCallback, useRef } from "react"
import { View, StyleSheet, ScrollView, TouchableOpacity, StatusBar, Platform, Animated } from "react-native"
import { useFocusEffect } from "@react-navigation/native"
import { useTheme } from "../theme/ThemeProvider"
import Typography from "../components/Typography"
import Comments from "../components/Comments"
import SkeletonLoader from "../components/SkeletonLoader"
import { fetchArticleById } from "../services/sunNewsService"
import TopNav from "../components/TopNav"
import ArticleHeader from "../components/ArticleHeader"
import AudioPlayer from "../components/AudioPlayer"
import Accordion from "../components/Accordion"

const ArticleScreen = ({ route, navigation, hideHeader = false }) => {
  const { article: routeArticle } = route.params || {}
  const [article, setArticle] = useState(routeArticle || null)
  const [loading, setLoading] = useState(!routeArticle || !routeArticle.content)
  const [error, setError] = useState(null)
  const scrollY = useRef(new Animated.Value(0)).current
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

  // Calculate the height of the TopNav with additional padding
  const topNavHeight = Platform.OS === "ios" ? 88 : 44 + (StatusBar.currentHeight || 0)
  const contentPaddingTop = topNavHeight + 24 // Add extra padding to prevent overlap

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

      {loading ? (
        // Skeleton loading state using SkeletonLoader
        <ScrollView style={styles.scrollView} contentContainerStyle={{ paddingTop: contentPaddingTop }}>
          <SkeletonLoader type="article" />
        </ScrollView>
      ) : error || !article ? (
        // Error state
        <View style={[styles.errorContainer, { paddingTop: contentPaddingTop }]}>
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
        <Animated.ScrollView
          style={[styles.scrollView, { backgroundColor: theme.colors.Surface.Secondary }]}
          contentContainerStyle={[
            styles.scrollViewContent,
            { paddingHorizontal: theme.space["40"], paddingTop: contentPaddingTop },
          ]}
          scrollEventThrottle={16}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })}
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

          {/* Rest of the content remains the same */}
          <View style={styles.audioPlayerContainer}>
            <AudioPlayer
              title={article.title}
              category={article.category}
              duration={321} // Default duration in seconds (5m 21s)
              onPlay={() => console.log("Audio started playing")}
              onPause={() => console.log("Audio paused")}
              onComplete={() => console.log("Audio playback completed")}
            />
          </View>

          {/* Accordion Component */}
          <View style={styles.accordionContainer}>
            <Accordion title="Key Points" initialExpanded={true} titleVariant="h6" contentVariant="body-02">
              <View style={styles.keyPointsContainer}>
                <Typography variant="body-02" color={theme.colors.Text.Secondary} style={styles.keyPoint}>
                  • {article.title.split(" ").slice(0, 5).join(" ")}...
                </Typography>
                <Typography variant="body-02" color={theme.colors.Text.Secondary} style={styles.keyPoint}>
                  • {contentParagraphs[0].split(".")[0]}.
                </Typography>
                {contentParagraphs.length > 1 && (
                  <Typography variant="body-02" color={theme.colors.Text.Secondary} style={styles.keyPoint}>
                    • {contentParagraphs[1].split(".")[0]}.
                  </Typography>
                )}
              </View>
            </Accordion>
          </View>

          <View style={styles.articleContent}>
            {remainingParagraphs.map((paragraph, index) => (
              <Typography key={index} variant="body-02" color={theme.colors.Text.Secondary} style={styles.paragraph}>
                {paragraph}
              </Typography>
            ))}
          </View>

          <Comments
            comments={comments}
            totalComments={8}
            onShowAllPress={handleShowAllComments}
            onSubmitComment={handleSubmitComment}
            onLikeComment={handleLikeComment}
            onReplyComment={handleReplyComment}
            onViewReplies={handleViewReplies}
          />

          <View style={styles.bottomSpacing} />
        </Animated.ScrollView>
      )}

      {/* TopNav rendered last to ensure it's on top */}
      {!hideHeader && (
        <View style={styles.topNavContainer}>
          <TopNav showBackButton onBackPress={() => navigation.goBack()} />
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  topNavContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: "transparent",
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
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
  audioPlayerContainer: {
    marginTop: 16,
    marginBottom: 16,
  },
  accordionContainer: {
    marginBottom: 24,
  },
  keyPointsContainer: {
    paddingVertical: 8,
  },
  keyPoint: {
    marginBottom: 8,
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
