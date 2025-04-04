"use client"
import { View, StyleSheet, TouchableOpacity } from "react-native"
import { useTheme } from "../theme/ThemeProvider"
import LazyImage from "./LazyImage"
import Typography from "./Typography"

interface CardCatchUpProps {
  title: string
  subtitle: string
  imageUrl: string
  count?: number
  onPress: () => void
}

const CardCatchUp = ({ title, subtitle, imageUrl, count, onPress }: CardCatchUpProps) => {
  const theme = useTheme()

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.9}>
      <View style={styles.imageContainer}>
        <LazyImage source={{ uri: imageUrl }} style={styles.image} resizeMode="cover" />
        <View style={styles.overlay}>
          <Typography variant="subtitle-01" color="#FFFFFF" style={styles.title}>
            {title}
          </Typography>
          <Typography variant="body-02" color="#FFFFFF" style={styles.subtitle} numberOfLines={2}>
            {subtitle}
          </Typography>
          {count !== undefined && (
            <Typography variant="annotation" color="#FFFFFF" style={styles.count}>
              {count} stories
            </Typography>
          )}
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 280,
    height: 160,
    borderRadius: 12,
    overflow: "hidden",
    marginRight: 12,
  },
  imageContainer: {
    width: "100%",
    height: "100%",
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 16,
  },
  title: {
    marginBottom: 4,
  },
  subtitle: {
    opacity: 0.9,
    marginBottom: 8,
  },
  count: {
    fontWeight: "600",
  },
})

export default CardCatchUp

