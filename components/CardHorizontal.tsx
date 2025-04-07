"use client"
import { View, Image, StyleSheet } from "react-native"
import { useTheme } from "../theme/ThemeProvider"
import Typography from "./Typography"
import { getCategoryColor } from "../utils/categoryColors"
import Card from "./Card"
import { cardStyles } from "../utils/cardStyles"

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

  const categoryText = category || ""
  const categoryColor = getCategoryColor(categoryText, theme)

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

  return (
    <Card
      id={id}
      onPress={onPress}
      onBookmark={onBookmark}
      onShare={onShare}
      readTime={readTime}
      style={[
        cardStyles.horizontalContainer,
        {
          backgroundColor: theme.colors.Surface.Primary,
          borderBottomColor: theme.colors.Border["Border-Primary"],
          borderBottomWidth: theme.borderWidth["10"],
        },
      ]}
    >
      <View style={cardStyles.horizontalCardContent}>
        {imageUrl ? (
          <Image
            source={{ uri: imageUrl }}
            style={[cardStyles.horizontalImage, { borderRadius: theme.radius["radius-default"] }]}
          />
        ) : (
          <View
            style={[
              cardStyles.horizontalImage,
              {
                borderRadius: theme.radius["radius-default"],
                backgroundColor: theme.colors.Border["Border-Primary"],
              },
            ]}
          />
        )}

        <View style={cardStyles.horizontalTextContent}>
          <Typography variant="overline" color={categoryColor} style={cardStyles.category}>
            {categoryText.toUpperCase()}
          </Typography>

          <View style={cardStyles.titleContainer}>
            {prefix ? (
              <Typography variant="subtitle-01" color={categoryColor} style={cardStyles.prefix}>
                {prefix}
              </Typography>
            ) : null}
            <Typography variant="subtitle-01" color={theme.colors.Text.Primary} style={styles.title}>
              {prefix ? mainTitle : titleText}
            </Typography>
          </View>
        </View>
      </View>
    </Card>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: "700",
    lineHeight: 24,
  },
})

export default CardHorizontal

