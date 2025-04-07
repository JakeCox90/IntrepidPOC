"use client"
import { View, StyleSheet, Dimensions } from "react-native"
import { Feather } from "@expo/vector-icons"
import { useTheme } from "../theme/ThemeProvider"
import Typography from "./Typography"
import Flag from "./Flag"
import LazyImage from "./LazyImage"

// Add the COMMON_FLAGS constant
// Common flags used by The Sun
const COMMON_FLAGS = [
  "EXCLUSIVE",
  "BREAKING",
  "REVEALED",
  "PICTURED",
  "WATCH",
  "UPDATED",
  "LIVE",
  "SHOCK",
  "TRAGIC",
  "HORROR",
  "URGENT",
  "WARNING",
]

interface ArticleHeaderProps {
  title: string
  subtitle?: string
  category?: string
  flag?: string
  readTime?: string
  author?: string
  timestamp?: string
  imageUrl?: string
}

const { width } = Dimensions.get("window")
const imageHeight = (width * 2) / 3 // 3:2 ratio

const ArticleHeader = ({
  title,
  subtitle,
  category,
  flag,
  readTime = "3 min read",
  author,
  timestamp,
  imageUrl,
}: ArticleHeaderProps) => {
  const theme = useTheme()

  // In the component, add this before the return statement:
  const themedStyles = {
    tagsContainer: {
      marginBottom: theme?.space?.["20"] || 8,
    },
    flag: {
      marginRight: theme?.space?.["20"] || 8,
    },
    title: {
      marginBottom: theme?.space?.["20"] || 8,
    },
    subtitle: {
      marginBottom: theme?.space?.["30"] || 12,
    },
    readingTimeContainer: {
      marginBottom: theme?.space?.["20"] || 8,
    },
    readingTime: {
      marginLeft: theme?.space?.["10"] || 4,
    },
    authorContainer: {
      marginBottom: theme?.space?.["40"] || 16,
    },
    articleImage: {
      height: imageHeight,
      backgroundColor: theme?.colors?.Border?.["Border-Primary"] || "#E5E5E5",
      marginBottom: theme?.space?.["40"] || 16,
      borderRadius: theme?.radius?.["radius-10"] || 4,
    },
  }

  return (
    <View style={baseStyles.container}>
      {/* Tags */}
      <View style={[baseStyles.tagsContainer, themedStyles.tagsContainer]}>
        {flag && COMMON_FLAGS.includes(flag.toUpperCase()) && (
          <Flag text={flag} style={[baseStyles.flag, themedStyles.flag]} />
        )}
        {category && <Flag text={category} category={category} style={[baseStyles.flag, themedStyles.flag]} />}
      </View>

      {/* Title */}
      <Typography variant="h3" color={theme.colors.Text.Primary} style={[baseStyles.title, themedStyles.title]}>
        {title || "No title available"}
      </Typography>

      {/* Subtitle */}
      {subtitle && (
        <Typography
          variant="subtitle-01"
          color={theme.colors.Text.Secondary}
          style={[baseStyles.subtitle, themedStyles.subtitle]}
        >
          {subtitle}
        </Typography>
      )}

      {/* Reading time */}
      <View style={[baseStyles.readingTimeContainer, themedStyles.readingTimeContainer]}>
        <Feather name="clock" size={14} color={theme.colors.Text.Secondary} />
        <Typography
          variant="subtitle-02"
          color={theme.colors.Text.Secondary}
          style={[baseStyles.readingTime, themedStyles.readingTime]}
        >
          {readTime}
        </Typography>
      </View>

      {/* Author info */}
      <View style={[baseStyles.authorContainer, themedStyles.authorContainer]}>
        <Typography variant="subtitle-02" color={theme.colors.Text.Primary}>
          {author || "The Sun"}
        </Typography>
        <Typography variant="body-02" color={theme.colors.Text.Secondary}>
          Published {timestamp || "Recently"}
        </Typography>
      </View>

      {/* Article Image */}
      <View style={[baseStyles.articleImage, themedStyles.articleImage]}>
        {imageUrl ? (
          <LazyImage source={{ uri: imageUrl }} style={{ width: "100%", height: "100%" }} resizeMode="cover" />
        ) : (
          <Feather name="image" size={24} color={theme.colors.Text.Secondary} />
        )}
      </View>
    </View>
  )
}

// Base styles that don't depend on theme
const baseStyles = StyleSheet.create({
  container: {
    width: "100%",
  },
  tagsContainer: {
    flexDirection: "row",
    marginBottom: 8, // Will be replaced by themed value
  },
  flag: {
    marginRight: 8, // Will be replaced by themed value
  },
  title: {
    marginBottom: 8, // Will be replaced by themed value
  },
  subtitle: {
    marginBottom: 12, // Will be replaced by themed value
  },
  readingTimeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8, // Will be replaced by themed value
  },
  readingTime: {
    marginLeft: 4, // Will be replaced by themed value
  },
  authorContainer: {
    marginBottom: 16, // Will be replaced by themed value
  },
  articleImage: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16, // Will be replaced by themed value
    borderRadius: 4,
  },
})

export default ArticleHeader

