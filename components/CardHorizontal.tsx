"use client"
import { View, Image, StyleSheet, TouchableOpacity, Text } from "react-native"
import { Feather } from "@expo/vector-icons"
import { useTheme } from "../theme/ThemeProvider"

interface CardHorizontalProps {
  id?: number | string
  title: string
  imageUrl: string
  category: string
  timestamp?: string
  readTime?: string
  onPress: () => void
  onBookmark?: () => void
  onShare?: () => void
}

const CardHorizontal = ({
  id,
  title,
  imageUrl,
  category,
  timestamp,
  readTime = "3 min read",
  onPress,
  onBookmark,
  onShare,
}: CardHorizontalProps) => {
  const theme = useTheme()

  // Safely handle title parsing
  const titleText = title || ""

  // Split title to check if it has a prefix in all caps (like "IN THE CAN")
  const titleParts = titleText.split(" ")
  let prefix = ""
  let mainTitle = titleText

  // Check if the first few words are in uppercase (typically 2-4 words)
  if (titleParts.length > 1) {
    const possiblePrefixWords = titleParts.slice(0, Math.min(4, titleParts.length))
    const prefixEndIndex = possiblePrefixWords.findIndex((word) => word !== word.toUpperCase())

    if (prefixEndIndex > 0) {
      // We found a prefix
      prefix = titleParts.slice(0, prefixEndIndex).join(" ")
      mainTitle = titleParts.slice(prefixEndIndex).join(" ")
    } else if (possiblePrefixWords.every((word) => word === word.toUpperCase())) {
      // All possible prefix words are uppercase
      prefix = possiblePrefixWords.join(" ")
      mainTitle = titleParts.slice(possiblePrefixWords.length).join(" ")
    }
  }

  // Safely handle category
  const categoryText = category || ""

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.Surface.Primary,
          borderBottomColor: theme.colors.Border["Border-Primary"],
          borderBottomWidth: theme.borderWidth["10"],
        },
      ]}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <View style={styles.cardContent}>
        {imageUrl ? (
          <Image source={{ uri: imageUrl }} style={[styles.image, { borderRadius: theme.radius["radius-default"] }]} />
        ) : (
          <View
            style={[
              styles.imagePlaceholder,
              {
                borderRadius: theme.radius["radius-default"],
                backgroundColor: theme.colors.Border["Border-Primary"],
              },
            ]}
          />
        )}

        <View style={styles.textContent}>
          <Text style={[styles.category, { color: theme.colors.Text.Secondary }]}>{categoryText.toUpperCase()}</Text>

          <View style={styles.titleContainer}>
            {prefix ? <Text style={[styles.prefix, { color: theme.colors.Primary.Resting }]}>{prefix}</Text> : null}
            <Text style={[styles.title, { color: theme.colors.Text.Primary }]}>{prefix ? mainTitle : titleText}</Text>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <View style={styles.readTimeContainer}>
          <Feather name="book-open" size={16} color={theme.colors.Text.Secondary} />
          <Text style={[styles.readTime, { color: theme.colors.Text.Secondary }]}>{readTime || "3 min read"}</Text>
        </View>

        <View style={styles.actions}>
          {onBookmark && (
            <TouchableOpacity onPress={onBookmark} style={styles.actionButton}>
              <Feather name="bookmark" size={20} color={theme.colors.Text.Secondary} />
            </TouchableOpacity>
          )}

          {onShare && (
            <TouchableOpacity onPress={onShare} style={styles.actionButton}>
              <Feather name="share" size={20} color={theme.colors.Text.Secondary} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    marginBottom: 16,
    overflow: "hidden",
  },
  cardContent: {
    padding: 16,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 16,
  },
  imagePlaceholder: {
    width: 100,
    height: 100,
    marginRight: 16,
  },
  textContent: {
    flex: 1,
  },
  category: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 8,
  },
  titleContainer: {
    flexDirection: "column",
  },
  prefix: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    lineHeight: 24,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  readTimeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  readTime: {
    marginLeft: 8,
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

export default CardHorizontal

