"use client"
import { View, StyleSheet, TouchableOpacity, ImageBackground, Dimensions } from "react-native"
import { useTheme } from "../theme/ThemeProvider"
import Typography from "./Typography"
import { Feather } from "@expo/vector-icons"

interface BundleCardProps {
  title: string
  subtitle: string
  storyCount: number
  imageUrl: string
  titleVariant?: "h5" | "h6"
  subtitleVariant?: "body-02" | "subtitle-02"
  countVariant?: "body-02" | "annotation"
  textColor?: string
  onPress: () => void
  onNotify?: () => void
}

const { width } = Dimensions.get("window")
const cardWidth = 280
const cardHeight = 265

const BundleCard = ({
  title,
  subtitle,
  storyCount,
  imageUrl,
  titleVariant = "h5",
  subtitleVariant = "body-02",
  countVariant = "body-02",
  textColor = "#FFFFFF",
  onPress,
  onNotify,
}: BundleCardProps) => {
  const theme = useTheme()

  const handleNotifyPress = (e) => {
    e.stopPropagation()
    if (onNotify) {
      onNotify()
    }
  }

  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress}>
      <ImageBackground source={{ uri: imageUrl }} style={styles.container} imageStyle={styles.imageStyle}>
        {/* Dark gradient overlay */}
        <View style={styles.overlay}>
          <View style={styles.content}>
            <Typography variant={titleVariant} color={textColor} style={styles.title}>
              {title}
            </Typography>
            <Typography variant={subtitleVariant} color={textColor} style={styles.subtitle}>
              {subtitle}
            </Typography>
            <Typography variant={countVariant} color={textColor} style={styles.storyCount}>
              {storyCount} stories
            </Typography>
          </View>

          <TouchableOpacity style={styles.notifyButton} onPress={handleNotifyPress}>
            <View style={styles.notifyIconContainer}>
              <Feather name="bell" size={20} color="#FFFFFF" />
            </View>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    width: cardWidth,
    height: cardHeight,
    borderRadius: 12,
    overflow: "hidden",
  },
  imageStyle: {
    borderRadius: 12,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 12,
    padding: 16,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  content: {
    flex: 1,
    justifyContent: "flex-end",
  },
  title: {
    fontWeight: "700",
    marginBottom: 4,
  },
  subtitle: {
    marginBottom: 4,
    opacity: 0.9,
  },
  storyCount: {
    opacity: 0.8,
  },
  notifyButton: {
    alignSelf: "flex-end",
  },
  notifyIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
})

export default BundleCard
