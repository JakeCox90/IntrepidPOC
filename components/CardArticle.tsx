"use client"
import { View } from "react-native"
import { useTheme } from "../theme/ThemeProvider"
import Flag from "./Flag"
import Typography from "./Typography"
import LazyImage from "./LazyImage"
import Card from "./Card"
import { cardStyles } from "../utils/cardStyles"

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

  // Check if the flag is a common flag type
  const isCommonFlag = flag && COMMON_FLAGS.includes(flag.toUpperCase())

  const themedStyles = {
    articleContainer: {
      paddingVertical: 16,
      borderBottomColor: theme?.colors?.Border?.["Border-Primary"] || "#EEEEEE",
    },
    articleContent: {
      marginBottom: 12,
    },
    articleTextContent: {
      marginRight: 12,
    },
    flagContainer: {
      marginBottom: 8,
    },
    title: {
      marginBottom: 0,
    },
  }

  return (
    <Card
      id={id}
      onPress={onPress}
      onBookmark={onBookmark}
      onShare={onShare}
      readTime={readTime}
      style={[cardStyles.articleContainer, themedStyles.articleContainer]}
    >
      <View style={[cardStyles.articleContent, themedStyles.articleContent]}>
        <View style={[cardStyles.articleTextContent, themedStyles.articleTextContent]}>
          <View style={[cardStyles.flagContainer, { flexDirection: "row" }]}>
            {isCommonFlag && <Flag text={flag} style={{ marginRight: 8 }} variant="filled" />}
            {category && <Flag text={category} category={category} variant="minimal" />}
          </View>

          <Typography
            variant="subtitle-01"
            color={theme.colors.Text.Primary}
            numberOfLines={3}
            style={[cardStyles.title, themedStyles.title]}
          >
            {title}
          </Typography>
        </View>

        <LazyImage source={{ uri: imageUrl }} style={cardStyles.articleImage} resizeMode="cover" />
      </View>
    </Card>
  )
}

export default CardArticle

