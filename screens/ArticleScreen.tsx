"use client"

import { useState } from "react"
import { View, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Dimensions } from "react-native"
import { Ionicons, Feather } from "@expo/vector-icons"
import { mockNews } from "../services/newsService"
import { useTheme } from "../theme/ThemeProvider"
import Typography from "../components/Typography"
import Accordion from "../components/Accordion"
import Comments from "../components/Comments"
import AudioPlayer from "../components/AudioPlayer"

const { width } = Dimensions.get("window")
const imageHeight = (width * 2) / 3 // 3:2 ratio

const ArticleScreen = ({ route, navigation }) => {
  const { article } = route.params
  const theme = useTheme()
  const [selectedPollOption, setSelectedPollOption] = useState(null)
  const [totalVotes, setTotalVotes] = useState(129)

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
  const relatedArticles = mockNews.filter((item) => item.id !== article.id).slice(0, 5)

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

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.colors.Surface.Secondary }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: theme.colors.Border["Border-Primary"] }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color={theme.colors.Primary.Resting} />
          <Typography variant="body-01" color={theme.colors.Text.Primary}>
            {article.category}
          </Typography>
        </TouchableOpacity>
        <View style={styles.headerButtons}>
          <TouchableOpacity style={styles.headerButton}>
            <Typography variant="button" color={theme.colors.Primary.Resting}>
              SHARE
            </Typography>
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Typography variant="button" color={theme.colors.Primary.Resting}>
              SAVE
            </Typography>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={[styles.container, { backgroundColor: theme.colors.Surface.Secondary }]}>
        {/* Tags */}
        <View style={styles.tagsContainer}>
          <View style={[styles.tag, { backgroundColor: theme.colors.Primary.Resting }]}>
            <Typography variant="annotation" color={theme.colors.Text.Inverse}>
              {article.category.toUpperCase()}
            </Typography>
          </View>
        </View>

        {/* Title */}
        <Typography variant="h3" color={theme.colors.Text.Primary} style={styles.title}>
          {article.title}
        </Typography>

        {/* Subtitle */}
        <Typography variant="subtitle-01" color={theme.colors.Text.Secondary} style={styles.subtitle}>
          {article.content.split("\n\n")[0]}
        </Typography>

        {/* Reading time */}
        <View style={styles.readingTimeContainer}>
          <Ionicons name="time-outline" size={14} color={theme.colors.Text.Secondary} />
          <Typography variant="subtitle-02" color={theme.colors.Text.Secondary} style={styles.readingTime}>
            3 min read
          </Typography>
        </View>

        {/* Author info */}
        <View style={styles.authorContainer}>
          <Typography variant="subtitle-02" color={theme.colors.Text.Primary}>
            Elizabeth Rosenberg
          </Typography>
          <Typography variant="subtitle-02" color={theme.colors.Text.Secondary}>
            Published 15th January 2023, 10:21am
          </Typography>
        </View>

        {/* Article Image */}
        <View
          style={[styles.articleImage, { height: imageHeight, backgroundColor: theme.colors.Border["Border-Primary"] }]}
        >
          <Feather name="image" size={24} color={theme.colors.Text.Secondary} />
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
          {article.content
            .split("\n\n")
            .slice(1)
            .map((paragraph, index) => (
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
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerButtons: {
    flexDirection: "row",
  },
  headerButton: {
    marginLeft: 15,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  tagsContainer: {
    flexDirection: "row",
    marginTop: 16,
    marginBottom: 8,
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
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
  imagePlaceholder: {
    width: "100%",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    borderRadius: 4,
  },
  pollContainer: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  pollTitle: {
    marginBottom: 8,
  },
  pollQuestion: {
    marginBottom: 16,
  },
  pollOption: {
    marginBottom: 12,
  },
  pollOptionContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  pollRadioContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  pollRadio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  pollRadioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  pollProgressContainer: {
    height: 4,
    borderRadius: 2,
    overflow: "hidden",
  },
  pollProgress: {
    height: "100%",
  },
  totalVotes: {
    marginTop: 8,
    textAlign: "right",
  },
  bottomSpacing: {
    height: 20,
  },
})

export default ArticleScreen

