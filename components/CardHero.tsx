"use client"
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from "react-native"
import { useTheme } from "../theme/ThemeProvider"
import Flag from "./Flag"
import { Feather } from "@expo/vector-icons"

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
      <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="cover" />

      <View style={styles.content}>
        {flag && (
          <View style={styles.flagContainer}>
            <Flag text={flag} />
          </View>
        )}

        {category && (
          <Text style={[styles.category, { color: theme.colors.Primary.Resting }]}>{category.toUpperCase()}</Text>
        )}

        <Text style={[styles.title, { color: theme.colors.Text.Primary }]}>{title}</Text>

        {subtitle && (
          <Text style={[styles.subtitle, { color: theme.colors.Text.Secondary }]} numberOfLines={2}>
            {subtitle}
          </Text>
        )}

        <View style={styles.footer}>
          <View style={styles.readTimeContainer}>
            <Feather name="clock" size={14} color={theme.colors.Text.Secondary} />
            <Text style={[styles.readTime, { color: theme.colors.Text.Secondary }]}>{readTime}</Text>
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
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    lineHeight: 26,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 22,
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

export default CardHero

