"use client"
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity } from "react-native"
import { useTheme } from "../theme/ThemeProvider"

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
      <ImageBackground source={{ uri: imageUrl }} style={styles.imageBackground} imageStyle={styles.image}>
        <View style={styles.overlay}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle} numberOfLines={2}>
            {subtitle}
          </Text>
          {count && <Text style={styles.count}>{count} stories</Text>}
        </View>
      </ImageBackground>
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
  imageBackground: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
  },
  image: {
    borderRadius: 12,
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 16,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 4,
  },
  subtitle: {
    color: "#FFFFFF",
    fontSize: 14,
    opacity: 0.9,
    marginBottom: 8,
  },
  count: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },
})

export default CardCatchUp

