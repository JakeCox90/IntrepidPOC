"use client"
import { View, Image, StyleSheet, TouchableOpacity } from "react-native"
import { useTheme } from "../theme/ThemeProvider"
import Typography from "../components/Typography" // Changed from "../theme/Typography"

interface NewsCardProps {
  title: string
  imageUrl: string
  category: string
  timestamp: string
  onPress: () => void
}

const NewsCard = ({ title, imageUrl, category, timestamp, onPress }: NewsCardProps) => {
  const theme = useTheme()

  return (
    <TouchableOpacity style={styles.container(theme)} onPress={onPress} activeOpacity={0.9}>
      <Image source={{ uri: imageUrl }} style={styles.image(theme)} />
      <View style={styles.content}>
        <Typography variant="annotation" color={theme.colors.Primary.Resting} style={styles.category}>
          {category.toUpperCase()}
        </Typography>
        <Typography variant="h6" color={theme.colors.Text.Primary} numberOfLines={2} style={styles.title}>
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
    flexDirection: "row",
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.Border["Border-Primary"],
    paddingBottom: 16,
  }),
  image: (theme: any) => ({
    width: 100,
    height: 80,
    borderRadius: theme.radius["radius-default"],
  }),
  content: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "space-between",
  },
  category: {
    marginBottom: 4,
  },
  title: {
    marginBottom: 4,
  },
  timestamp: {},
})

export default NewsCard

