"use client"
import { View, Image, StyleSheet } from "react-native"
import { useTheme } from "../theme/ThemeProvider"
import Typography from "./Typography"
import Card from "./Card"
import { cardStyles } from "../utils/cardStyles"
import Flag from "./Flag"

interface CardHorizontalProps {
  id?: number | string
  title: string
  imageUrl: string
  category: string
  flag?: string
  timestamp?: string
  readTime?: string
  onPress: () => void
  onBookmark?: () => void
  onShare?: () => void
}

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

const CardHorizontal = ({
  id,
  title,
  imageUrl,
  category,
  flag,
  timestamp,
  readTime = "3 min read",
  onPress,
  onBookmark,
  onShare,
}: CardHorizontalProps) => {
  const theme = useTheme()

  const categoryText = category || ""

  // Check if the flag is a common flag type
  const isCommonFlag = flag && COMMON_FLAGS.includes(flag.toUpperCase())

  // If no flag is provided, try to extract it from the title
  let extractedFlag = null
  let mainTitle = title || ""

  if (!flag) {
    // Split title to check if it has a prefix in all caps (like "EXCLUSIVE")
    const titleParts = mainTitle.split(" ")

    if (titleParts.length > 1) {
      // Check if the first word is a common flag
      const firstWord = titleParts[0].toUpperCase()
      if (COMMON_FLAGS.includes(firstWord)) {
        extractedFlag = firstWord
        mainTitle = titleParts.slice(1).join(" ")
      }
      // Check if first two words are a common flag (like "BREAKING NEWS")
      else if (titleParts.length > 2) {
        const firstTwoWords = `${titleParts[0]} ${titleParts[1]}`.toUpperCase()
        if (COMMON_FLAGS.some((f) => firstTwoWords.includes(f))) {
          extractedFlag = firstTwoWords
          mainTitle = titleParts.slice(2).join(" ")
        }
      }
    }
  }

  const flagToShow = isCommonFlag ? flag : extractedFlag

  const themedStyles = {
    horizontalContainer: {
      backgroundColor: theme?.colors?.Surface?.Primary || "#FFFFFF",
      borderBottomColor: theme?.colors?.Border?.["Border-Primary"] || "#EEEEEE",
      borderBottomWidth: theme?.borderWidth?.["10"] || 1,
      marginBottom: theme?.space?.["40"] || 16,
    },
    horizontalCardContent: {
      padding: theme?.space?.["40"] || 16,
    },
    horizontalImage: {
      borderRadius: theme?.radius?.["radius-default"] || 8,
      marginRight: theme?.space?.["40"] || 16,
    },
    flagContainer: {
      marginBottom: theme?.space?.["20"] || 8,
    },
  }

  return (
    <Card
      id={id}
      onPress={onPress}
      onBookmark={onBookmark}
      onShare={onShare}
      readTime={readTime}
      style={[cardStyles.horizontalContainer, themedStyles.horizontalContainer]}
    >
      <View style={[cardStyles.horizontalCardContent, themedStyles.horizontalCardContent]}>
        {imageUrl ? (
          <Image source={{ uri: imageUrl }} style={[cardStyles.horizontalImage, themedStyles.horizontalImage]} />
        ) : (
          <View
            style={[
              cardStyles.horizontalImage,
              themedStyles.horizontalImage,
              { backgroundColor: theme.colors.Border["Border-Primary"] },
            ]}
          />
        )}

        <View style={cardStyles.horizontalTextContent}>
          <View style={[cardStyles.flagContainer, { flexDirection: "row" }]}>
            {flagToShow && <Flag text={flagToShow} style={{ marginRight: 8 }} variant="minimal" />}
            {categoryText && <Flag text={categoryText} category={categoryText} variant="minimal" />}
          </View>

          <Typography variant="subtitle-01" color={theme.colors.Text.Primary} style={styles.title}>
            {mainTitle}
          </Typography>
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

