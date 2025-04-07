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

  return (
    <Card
      onPress={onPress}
      onBookmark={onBookmark}
      onShare={onShare}
      readTime={readTime}
      style={[cardStyles.container, cardStyles.heroContainer]}
    >
      <LazyImage source={{ uri: imageUrl }} style={cardStyles.heroImage} resizeMode="cover" />

      <View style={cardStyles.heroContent}>
        {flag && (
          <View style={cardStyles.flagContainer}>
            <Flag text={flag} />
          </View>
        )}

        {category && (
          <Typography variant="overline" color={theme.colors.Primary.Resting} style={cardStyles.category}>
            {category.toUpperCase()}
          </Typography>
        )}

        <Typography variant="h5" color={theme.colors.Text.Primary} style={cardStyles.title}>
          {title}
        </Typography>

        {subtitle && (
          <Typography
            variant="subtitle-01"
            color={theme.colors.Text.Secondary}
            numberOfLines={2}
            style={cardStyles.subtitle}
          >
            {subtitle}
          </Typography>
        )}
      </View>
    </Card>
  )
}

export default CardHero

