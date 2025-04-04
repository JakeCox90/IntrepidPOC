"use client"

import { useState } from "react"
import { View, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Image, StatusBar } from "react-native"
import { Feather } from "@expo/vector-icons"
import { mockNews } from "../services/newsService"
import { useTheme } from "../theme/ThemeProvider"
import Typography from "../components/Typography"
import Accordion from "../components/Accordion"
import Comments from "../components/Comments"
import AudioPlayer from "../components/AudioPlayer"
import Flag from "../components/Flag"
import Header from "../components/Header"

const { width } = Dimensions.get("window")
const imageHeight = (width * 2) / 3 // 3:2 ratio

const ArticleScreen = ({ route, navigation }) => {
  const { article } = route.params || {}
  const theme = useTheme()
  const [selectedPollOption, setSelectedPollOption] = useState(null)
  const [totalVotes, setTotalVotes] = useState(129)

  // Get category color based on article category
  const getCategoryColor = (categoryText) => {
    const normalizedCategory = categoryText?.toUpperCase() || ""

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
    } else if (normalizedCategory.includes("TV") || normalizedCategory.includes("TELEVISION")) {
      return theme.colors.Section.TV
    } else if (normalizedCategory.includes("SHOWBIZ") || normalizedCategory.includes("CELEBRITY")) {
      return theme.colors.Section.Showbiz
    } else if (normalizedCategory.includes("TECH") || normalizedCategory.includes("TECHNOLOGY")) {
      return theme.colors.Section.Tech
    } else if (normalizedCategory.includes("TRAVEL")) {
      return theme.colors.Section.Travel
    } else if (normalizedCategory.includes("MONEY") || normalizedCategory.includes("FINANCE")) {
      return theme.colors.Section.Money
    } else if (normalizedCategory.includes("HEALTH")) {
      return theme.colors.Section.Health
    } else if (normalizedCategory.includes("POLITICS")) {
      return theme.colors.Section.Politics
    } else if (normalizedCategory.includes("MOTORS") || normalizedCategory.includes("CAR")) {
      return theme.colors.Section.Motors
    } else if (normalizedCategory.includes("FABULOUS")) {
      return theme.colors.Section.Fabulous
    } else if (normalizedCategory.includes("FOOD")) {
      return theme.colors.Section.Food
    } else {
      return theme.colors.Section.News // Default to News
    }
  }

  // Get the appropriate section color for this article
  const sectionColor = article?.category ? getCategoryColor(article.category) : theme.colors.Section.News

  // Safely get article content or provide default
  const articleContent = article?.content || "No content available"

  // Safely split content into paragraphs
  const contentParagraphs = articleContent.split("\n\n") || [""]
  const subtitle = contentParagraphs[0] || ""
  const remainingParagraphs = contentParagraphs.slice(1) || []

  // Poll options
  const pollOptions = [
    { id: 1, text: "Public safety", votes: 45 },
    { id: 2, text: "Immigrant rights", votes: 32 },
    { id: 3, text: "Border security", votes: 38 },
    { id: 4, text: "Balanced approach", votes: 14 },
  ]

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
    {
      id: 3,
      author: "Sharon McDonald",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.",
      time: "10 mins ago",
      likes: 10,
      replies: [],
    },
  ]

  // Get related articles (excluding current article)
  const relatedArticles = article?.id
    ? mockNews.filter((item) => item.id !== article.id).slice(0, 5)
    : mockNews.slice(0, 5)

  const handleVote = (optionId) => {
    if (!selectedPollOption) {
      setSelectedPollOption(optionId)
      setTotalVotes(totalVotes + 1)
    }
  }

  const getVotePercentage = (votes) => {
    return Math.round((votes / totalVotes) * 100)
  }

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

  const handleAudioPlay = () => {
    console.log("Audio started playing")
  }

  const handleAudioPause = () => {
    console.log("Audio paused")
  }

  const handleAudioComplete = () => {
    console.log("Audio playback completed")
  }

  const handleSharePress = () => {
    console.log("Share article")
  }

  const handleSavePress = () => {
    console.log("Save article")
  }

  // If article is undefined, show an error message
  if (!article) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
        <Header title="Article" showBackButton onBackPress={() => navigation.goBack()} />
        <View style={styles.errorContainer}>
          <Typography variant="h5" color={theme.colors.Text.Primary}>
            Article not found
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
            Elizabeth Rosenberg
          </Typography>
          <Typography variant="body-02" color={theme.colors.Text.Secondary}>
            Published 15th January 2023, 10:21am
          </Typography>
        </View>

        {/* Article Image */}
        <View
          style={[styles.articleImage, { height: imageHeight, backgroundColor: theme.colors.Border["Border-Primary"] }]}
        >
          {article.imageUrl ? (
            <Image source={{ uri: article.imageUrl }} style={{ width: "100%", height: "100%" }} resizeMode="cover" />
          ) : (
            <Feather name="image" size={24} color={theme.colors.Text.Secondary} />
          )}
        </View>

        {/* Summary section using Accordion component */}
        <Accordion title="Summary">
          <Typography variant="body-02" color={theme.colors.Text.Secondary}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Maecenas vel tincidunt nunc, eget
            tincidunt nisl. Donec at justo eget magna pulvinar feugiat.
          </Typography>
        </Accordion>

        {/* Audio Player */}
        <View style={styles.audioPlayerContainer}>
          <AudioPlayer
            title="Danish PM tells Trump 'Greenland is not for sale'"
            duration={321} // 5m 21s
            onPlay={handleAudioPlay}
            onPause={handleAudioPause}
            onComplete={handleAudioComplete}
          />
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
  audioPlayerContainer: {
    marginBottom: 16,
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

