"use client"
import { View, StyleSheet, Dimensions } from "react-native"
import { Feather } from "@expo/vector-icons"
import { useTheme } from "../theme/ThemeProvider"
import Typography from "./Typography"
import Flag from "./Flag"
import LazyImage from "./LazyImage"

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

  return (
    <View style={styles.container}>
      {/* Tags */}
      <View style={styles.tagsContainer}>
        {category && !flag && <Flag text={category} category={category} style={styles.flag} />}
        {flag && <Flag text={flag} style={styles.flag} />}
      </View>

      {/* Title */}
      <Typography variant="h3" color={theme.colors.Text.Primary} style={styles.title}>
        {title || "No title available"}
      </Typography>

      {/* Subtitle */}
      {subtitle && (
        <Typography variant="subtitle-01" color={theme.colors.Text.Secondary} style={styles.subtitle}>
          {subtitle}
        </Typography>
      )}

      {/* Reading time */}
      <View style={styles.readingTimeContainer}>
        <Feather name="clock" size={14} color={theme.colors.Text.Secondary} />
        <Typography variant="subtitle-02" color={theme.colors.Text.Secondary} style={styles.readingTime}>
          {readTime}
        </Typography>
      </View>

      {/* Author info */}
      <View style={styles.authorContainer}>
        <Typography variant="subtitle-02" color={theme.colors.Text.Primary}>
          {author || "The Sun"}
        </Typography>
        <Typography variant="body-02" color={theme.colors.Text.Secondary}>
          Published {timestamp || "Recently"}
        </Typography>
      </View>

      {/* Article Image */}
      <View
        style={[styles.articleImage, { height: imageHeight, backgroundColor: theme.colors.Border["Border-Primary"] }]}
      >
        {imageUrl ? (
          <LazyImage source={{ uri: imageUrl }} style={{ width: "100%", height: "100%" }} resizeMode="cover" />
        ) : (
          <Feather name="image" size={24} color={theme.colors.Text.Secondary} />
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
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
})

export default ArticleHeader

