"use client"
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native"
import { useTheme } from "../theme/ThemeProvider"
import Flag from "./Flag"
import { Feather } from "@expo/vector-icons"

interface CardArticleProps {
  id?: number | string
  title: string
  imageUrl: string
  category?: string
  flag?: string
  readTime?: string
  onPress: () => void
  onBookmark?: () => void
  onShare?: () => void
}

const CardArticle = ({
  id,
  title,
  imageUrl,
  category,
  flag,
  readTime = "3 min read",
  onPress,
  onBookmark,
  onShare,
}: CardArticleProps) => {
  const theme = useTheme()

  return (
    <TouchableOpacity
      style={[styles.container, { borderBottomColor: theme.colors.Border["Border-Primary"] }]}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <View style={styles.content}>
        <View style={styles.textContent}>
          {flag && (
            <View style={styles.flagContainer}>
              <Flag text={flag} />
            </View>
          )}

          {category && (
            <Text style={[styles.category, { color: theme.colors.Text.Secondary }]}>{category.toUpperCase()}</Text>
          )}

          <Text style={[styles.title, { color: theme.colors.Text.Primary }]} numberOfLines={3}>
            {title}
          </Text>
        </View>

        <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="cover" />
      </View>

      <View style={styles.footer}>
        <View style={styles.readTimeContainer}>
          <Feather name="clock" size={14} color={theme.colors.Text.Secondary} />
          <Text style={[styles.readTime, { color: theme.colors.Text.Secondary }]}>{readTime}</Text>
        </View>

        {onBookmark && onShare && (
          <View style={styles.actions}>
            <TouchableOpacity onPress={onBookmark} style={styles.actionButton}>
              <Feather name="bookmark" size={18} color={theme.colors.Text.Secondary} />
            </TouchableOpacity>
            <TouchableOpacity onPress={onShare} style={styles.actionButton}>
              <Feather name="share" size={18} color={theme.colors.Text.Secondary} />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  content: {
    flexDirection: "row",
    marginBottom: 12,
  },
  textContent: {
    flex: 1,
    marginRight: 12,
  },
  flagContainer: {
    marginBottom: 8,
  },
  category: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 22,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  readTimeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  readTime: {
    marginLeft: 6,
    fontSize: 14,
  },
  actions: {
    flexDirection: "row",
  },
  actionButton: {
    marginLeft: 16,
    padding: 4,
  },
})

export default CardArticle

