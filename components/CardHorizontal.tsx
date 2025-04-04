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

  // Update the getCategoryColor function to ensure proper color mapping
  const getCategoryColor = (categoryText: string): string => {
    if (!categoryText) return theme.colors.Section.News

    const normalizedCategory = categoryText.toUpperCase()

    // Main sections
    if (
      normalizedCategory.includes("NEWS") ||
      normalizedCategory.includes("UK NEWS") ||
      normalizedCategory.includes("WORLD NEWS") ||
      normalizedCategory.includes("US NEWS") ||
      normalizedCategory.includes("IRISH NEWS") ||
      normalizedCategory.includes("SCOTTISH NEWS") ||
      normalizedCategory.includes("POLITICS") ||
      normalizedCategory.includes("OPINION") ||
      normalizedCategory.includes("ROYAL")
    ) {
      return theme.colors.Section.News
    }

    if (
      normalizedCategory.includes("SPORT") ||
      normalizedCategory.includes("FOOTBALL") ||
      normalizedCategory.includes("BOXING") ||
      normalizedCategory.includes("RACING") ||
      normalizedCategory.includes("UFC") ||
      normalizedCategory.includes("F1") ||
      normalizedCategory.includes("CRICKET") ||
      normalizedCategory.includes("RUGBY") ||
      normalizedCategory.includes("GOLF") ||
      normalizedCategory.includes("TENNIS") ||
      normalizedCategory.includes("NFL") ||
      normalizedCategory.includes("DREAM TEAM")
    ) {
      return theme.colors.Section.Sport
    }

    if (
      normalizedCategory.includes("TV") ||
      normalizedCategory.includes("TELEVISION") ||
      normalizedCategory.includes("SOAPS") ||
      normalizedCategory.includes("REALITY") ||
      normalizedCategory.includes("PUZZLES")
    ) {
      return theme.colors.Section.TV
    }

    if (
      normalizedCategory.includes("SHOWBIZ") ||
      normalizedCategory.includes("CELEBRITY") ||
      normalizedCategory.includes("MUSIC") ||
      normalizedCategory.includes("FILM") ||
      normalizedCategory.includes("DEAR DEIDRE")
    ) {
      return theme.colors.Section.Showbiz
    }

    if (
      normalizedCategory.includes("FABULOUS") ||
      normalizedCategory.includes("FASHION") ||
      normalizedCategory.includes("BEAUTY") ||
      normalizedCategory.includes("FOOD") ||
      normalizedCategory.includes("PARENTING")
    ) {
      return theme.colors.Section.Fabulous
    }

    if (
      normalizedCategory.includes("MONEY") ||
      normalizedCategory.includes("BANKING") ||
      normalizedCategory.includes("BILLS") ||
      normalizedCategory.includes("PENSIONS") ||
      normalizedCategory.includes("PROPERTY")
    ) {
      return theme.colors.Section.Money
    }

    if (
      normalizedCategory.includes("TRAVEL") ||
      normalizedCategory.includes("HOLIDAY") ||
      normalizedCategory.includes("BEACH") ||
      normalizedCategory.includes("CRUISE") ||
      normalizedCategory.includes("SUN BINGO")
    ) {
      return theme.colors.Section.Travel
    }

    if (
      normalizedCategory.includes("TECH") ||
      normalizedCategory.includes("PHONE") ||
      normalizedCategory.includes("GAMING") ||
      normalizedCategory.includes("SCIENCE") ||
      normalizedCategory.includes("HEALTH") ||
      normalizedCategory.includes("FITNESS") ||
      normalizedCategory.includes("DIET")
    ) {
      return theme.colors.Section.Tech
    }

    if (normalizedCategory.includes("MOTORS") || normalizedCategory.includes("CAR")) {
      return theme.colors.Section.Motors
    }

    if (
      normalizedCategory.includes("SUN VEGAS") ||
      normalizedCategory.includes("SUN SAVERS") ||
      normalizedCategory.includes("SUN CASINO") ||
      normalizedCategory.includes("SUN WIN")
    ) {
      return "#FFD700" // Gold
    }

    if (normalizedCategory.includes("SUN SELECTS")) {
      return theme.colors.Section.News
    }

    // Default to News if no match
    return theme.colors.Section.News
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

