"use client"
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native"
import { useTheme } from "../theme/ThemeProvider"

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
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.9}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.category}>{category.toUpperCase()}</Text>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
        <Text style={styles.timestamp}>{timestamp}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
    paddingBottom: 16,
  },
  image: {
    width: 100,
    height: 80,
    borderRadius: 8,
  },
  content: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "space-between",
  },
  category: {
    fontSize: 12,
    fontWeight: "600",
    color: "#E03A3A",
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000000",
    lineHeight: 22,
    marginBottom: 4,
  },
  timestamp: {
    fontSize: 12,
    color: "#666666",
  },
})

export default NewsCard

