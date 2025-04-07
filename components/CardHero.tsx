"use client"
import { View, Dimensions } from "react-native"
import { useTheme } from "../theme/ThemeProvider"
import Flag from "./Flag"
import Typography from "./Typography"
import LazyImage from "./LazyImage"
import Card from "./Card"
import { cardStyles } from "../utils/cardStyles"

interface CardHeroProps {
  title: string
  subtitle?: string
  imageUrl: string
  category?: string
  flag?: string
  readTime?: string
  onPress: () => void
  onBookmark?: () => void
  onShare?: () => void
}

const { width } = Dimensions.get("window")

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

const CardHero = ({
  title,
  subtitle,
  imageUrl,
  category,
  flag,
  readTime = "3 min read",
  onPress,
  onBookmark,
  onShare,
}: CardHeroProps) => {
  const theme = useTheme()

  // Check if the flag is a common flag type
  const isCommonFlag = flag && COMMON_FLAGS.includes(flag.toUpperCase())

  const themedStyles = {
    heroContent: {
      padding: 16,
    },
    flagContainer: {
      marginBottom: 8,
    },
    category: {
      marginBottom: 4,
    },
    title: {
      marginBottom: 8,
    },
    subtitle: {
      marginBottom: 12,
    },
  }

  return (
    <Card
      onPress={onPress}
      onBookmark={onBookmark}
      onShare={onShare}
      readTime={readTime}
      style={[cardStyles.container, cardStyles.heroContainer]}
    >
      <LazyImage source={{ uri: imageUrl }} style={cardStyles.heroImage} resizeMode="cover" />

      <View style={[cardStyles.heroContent, themedStyles.heroContent]}>
        <View style={[cardStyles.flagContainer, { flexDirection: "row" }]}>
          {isCommonFlag && <Flag text={flag} style={{ marginRight: 8 }} variant="filled" />}
          {category && <Flag text={category} category={category} variant="minimal" />}
        </View>

        <Typography variant="h5" color={theme.colors.Text.Primary} style={[cardStyles.title, themedStyles.title]}>
          {title}
        </Typography>

        {subtitle && (
          <Typography
            variant="subtitle-01"
            color={theme.colors.Text.Secondary}
            numberOfLines={2}
            style={[cardStyles.subtitle, themedStyles.subtitle]}
          >
            {subtitle}
          </Typography>
        )}
      </View>
    </Card>
  )
}

export default CardHero

