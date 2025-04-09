"use client"
import { View } from "react-native"
import { useTheme } from "../theme/ThemeProvider"
import Flag from "./Flag"
import Typography from "./Typography"
import LazyImage from "./LazyImage"
import Card from "./Card"
import { createCardHeroStyles } from "./styles/CardHero.styles"

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
  const styles = createCardHeroStyles(theme)

  // Check if the flag is a common flag type
  const isCommonFlag = flag && COMMON_FLAGS.includes(flag.toUpperCase())

  return (
    <Card onPress={onPress} onBookmark={onBookmark} onShare={onShare} readTime={readTime} style={styles.container}>
      <LazyImage source={{ uri: imageUrl }} style={styles.image} resizeMode="cover" />

      <View style={styles.heroContent}>
        <View style={styles.flagContainer}>
          {isCommonFlag && <Flag text={flag} style={{ marginRight: 8 }} variant="filled" />}
          {category && <Flag text={category} category={category} variant="minimal" />}
        </View>

        <Typography variant="h5" color={theme.colors.Text.Primary} style={styles.title}>
          {title}
        </Typography>

        {subtitle && (
          <Typography
            variant="subtitle-01"
            color={theme.colors.Text.Secondary}
            numberOfLines={2}
            style={styles.subtitle}
          >
            {subtitle}
          </Typography>
        )}
      </View>
    </Card>
  )
}

export default CardHero
