"use client"
import { View, Image, StyleSheet, TouchableOpacity } from "react-native"
import { Feather } from "@expo/vector-icons"
import { useTheme } from "../theme/ThemeProvider"
import Typography from "./Typography"

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

  // Get category color based on category text
  const getCategoryColor = (categoryText: string) => {
    const normalizedCategory = categoryText?.toUpperCase() || ""

    // Map to exact section names from The Sun website
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
    } else if (
      normalizedCategory.includes("FABULOUS") ||
      normalizedCategory.includes("FASHION") ||
      normalizedCategory.includes("BEAUTY")
    ) {
      return theme.colors.Section.Fabulous
    } else if (normalizedCategory.includes("FOOD")) {
      return theme.colors.Section.Food
    } else if (normalizedCategory.includes("PROPERTY")) {
      return theme.colors.Section.Property
    } else if (normalizedCategory.includes("PUZZLES")) {
      return theme.colors.Section.Puzzles
    } else if (normalizedCategory.includes("DEAR DEIDRE")) {
      return theme.colors.Section["Dear Deidre"]
    } else if (normalizedCategory.includes("OPINION")) {
      return theme.colors.Section.Opinion
    } else if (normalizedCategory.includes("US NEWS")) {
      return theme.colors.Section["US News"]
    } else if (normalizedCategory.includes("WORLD NEWS")) {
      return theme.colors.Section["World News"]
    } else if (normalizedCategory.includes("UK NEWS")) {
      return theme.colors.Section["UK News"]
    } else {
      return theme.colors.Section.News // Default to News
    }
  }

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
  const categoryColor = getCategoryColor(categoryText)

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
          <Typography variant="overline" color={categoryColor} style={styles.category}>
            {categoryText.toUpperCase()}
          </Typography>

          <View style={styles.titleContainer}>
            {prefix ? (
              <Typography variant="subtitle-01" color={categoryColor} style={styles.prefix}>
                {prefix}
              </Typography>
            ) : null}
            <Typography variant="subtitle-01" color={theme.colors.Text.Primary} style={styles.title}>
              {prefix ? mainTitle : titleText}
            </Typography>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <View style={styles.readTimeContainer}>
          <Feather name="book-open" size={16} color={theme.colors.Text.Secondary} />
          <Typography variant="body-02" color={theme.colors.Text.Secondary} style={styles.readTime}>
            {readTime || "3 min read"}
          </Typography>
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

