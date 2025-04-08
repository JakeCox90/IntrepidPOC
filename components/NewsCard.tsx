"use client"

import { View, StyleSheet, TouchableOpacity, Dimensions } from "react-native"
import { useTheme } from "../theme/ThemeProvider"
import Typography from "../components/Typography"
import Flag from "./Flag"
import LazyImage from "./LazyImage"

interface NewsCardProps {
  title: string
  imageUrl: string
  category: string
  timestamp: string
  onPress: () => void
}

const { width } = Dimensions.get("window")
const cardWidth = 200 // Width for horizontal scrolling cards

const NewsCard = ({ title, imageUrl, category, timestamp, onPress }: NewsCardProps) => {
  const theme = useTheme()

  return (
    <TouchableOpacity
      style={styles.container(theme)}
      onPress={onPress}
      activeOpacity={0.9}
      testID="news-card-touchable"
    >
      <View style={styles.imageContainer}>
        <LazyImage source={{ uri: imageUrl }} style={styles.image} resizeMode="cover" showLoader={false} />
      </View>
      <View style={styles.content}>
        {category && (
          <View style={styles.flagContainer}>
            <Flag text={category} category={category} variant="minimal" />
          </View>
        )}
        <Typography variant="h6" color={theme.colors.Text.Primary} numberOfLines={4} style={styles.title}>
          {title}
        </Typography>
        <Typography variant="annotation" color={theme.colors.Text.Secondary} style={styles.timestamp}>
          {timestamp}
        </Typography>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: (theme: any) => ({
    width: cardWidth,
    backgroundColor: theme.colors.Surface.Primary,
    borderRadius: theme.radius["radius-default"],
    borderWidth: theme.borderWidth["10"],
    borderColor: theme.colors.Border["Border-Primary"],
    overflow: "hidden",
  }),
  imageContainer: {
    width: "100%",
    height: 100,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  content: {
    padding: 12,
  },
  flagContainer: {
    marginBottom: 4,
  },
  title: {
    marginBottom: 8,
  },
  timestamp: {},
})

export default NewsCard
