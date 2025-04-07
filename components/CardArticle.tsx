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
    <Card
      id={id}
      onPress={onPress}
      onBookmark={onBookmark}
      onShare={onShare}
      readTime={readTime}
      style={[cardStyles.articleContainer, { borderBottomColor: theme.colors.Border["Border-Primary"] }]}
    >
      <View style={cardStyles.articleContent}>
        <View style={cardStyles.articleTextContent}>
          {flag && (
            <View style={cardStyles.flagContainer}>
              <Flag text={flag} />
            </View>
          )}

          {category && (
            <Typography variant="overline" color={theme.colors.Text.Secondary} style={cardStyles.category}>
              {category.toUpperCase()}
            </Typography>
          )}

          <Typography
            variant="subtitle-01"
            color={theme.colors.Text.Primary}
            numberOfLines={3}
            style={cardStyles.title}
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

