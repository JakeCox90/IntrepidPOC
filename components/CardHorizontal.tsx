"use client"
import { View, Image, StyleSheet, TouchableOpacity } from "react-native"
import { Feather } from "@expo/vector-icons"
import { useTheme } from "../theme/ThemeProvider"
import Typography from "./Typography"

interface CardHorizontalProps {
  id: number
  title: string
  imageUrl: string
  category: string
  timestamp: string
  readTime?: string
  onPress: () => void
  onBookmark?: () => void
  onShare?: () => void
}

const CardHorizontal = ({
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

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          borderBottomColor: theme.colors.Border["Border-Primary"],
          borderBottomWidth: theme.borderWidth["10"],
        },
      ]}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <View style={styles.content}>
        <View style={styles.categoryContainer}>
          <Typography variant="overline" color={theme.colors.Primary.Resting} style={styles.category}>
            {category.toUpperCase()}
          </Typography>
        </View>

        <Typography variant="subtitle-01" color={theme.colors.Text.Primary} numberOfLines={3} style={styles.title}>
          {title}
        </Typography>

        <View style={styles.metaContainer}>
          <View style={styles.readTimeContainer}>
            <Feather name="clock" size={14} color={theme.colors.Text.Secondary} />
            <Typography variant="annotation" color={theme.colors.Text.Secondary} style={styles.readTime}>
              {readTime}
            </Typography>
          </View>
        </View>
      </View>

      <View style={styles.imageContainer}>
        <Image source={{ uri: imageUrl }} style={[styles.image, { borderRadius: theme.radius["radius-default"] }]} />
        <View style={styles.actions}>
          {onBookmark && (
            <TouchableOpacity style={[styles.actionButton, { marginRight: theme.space["20"] }]} onPress={onBookmark}>
              <Feather name="bookmark" size={18} color={theme.colors.Text.Primary} />
            </TouchableOpacity>
          )}

          {onShare && (
            <TouchableOpacity style={styles.actionButton} onPress={onShare}>
              <Feather name="share" size={18} color={theme.colors.Text.Primary} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: 16,
  },
  content: {
    flex: 1,
    marginRight: 12,
    justifyContent: "space-between",
  },
  categoryContainer: {
    marginBottom: 4,
  },
  category: {
    textTransform: "uppercase",
  },
  title: {
    marginBottom: 8,
  },
  metaContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  readTimeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  readTime: {
    marginLeft: 4,
  },
  imageContainer: {
    width: 120,
    position: "relative",
  },
  image: {
    width: "100%",
    height: 90,
  },
  actions: {
    position: "absolute",
    bottom: 8,
    right: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  actionButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
})

export default CardHorizontal

