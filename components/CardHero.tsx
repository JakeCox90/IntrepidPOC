"use client"
import { View, StyleSheet, TouchableOpacity, Dimensions } from "react-native"
import { useTheme } from "../theme/ThemeProvider"
import Flag from "./Flag"
import { Feather } from "@expo/vector-icons"
import Typography from "./Typography"
import LazyImage from "./LazyImage"

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
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.9}>
      <LazyImage source={{ uri: imageUrl }} style={styles.image} resizeMode="cover" />

      <View style={styles.content}>
        {flag && (
          <View style={styles.flagContainer}>
            <Flag text={flag} />
          </View>
        )}

        {category && (
          <Typography variant="overline" color={theme.colors.Primary.Resting} style={styles.category}>
            {category.toUpperCase()}
          </Typography>
        )}

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

        <View style={styles.footer}>
          <View style={styles.readTimeContainer}>
            <Feather name="clock" size={14} color={theme.colors.Text.Secondary} />
            <Typography variant="body-02" color={theme.colors.Text.Secondary} style={styles.readTime}>
              {readTime}
            </Typography>
          </View>

          {onBookmark && onShare && (
            <View style={styles.actions}>
              <TouchableOpacity onPress={onBookmark} style={styles.actionButton}>
                <Feather name="bookmark" size={18} color={theme.colors.Text.Secondary} />
              </TouchableOpacity>
              <TouchableOpacity onPress={onShare} style={styles.actionButton}>
                <Feather name="share" size={18} color={theme.colors.Text.Secondary} />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    width: width - 32,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    marginBottom: 16,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 200,
  },
  content: {
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
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  readTimeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  readTime: {
    marginLeft: 6,
  },
  actions: {
    flexDirection: "row",
  },
  actionButton: {
    marginLeft: 16,
    padding: 4,
  },
})

export default CardHero

