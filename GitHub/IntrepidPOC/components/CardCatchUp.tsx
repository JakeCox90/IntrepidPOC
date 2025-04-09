"use client"
import { View, StyleSheet } from "react-native"
import LazyImage from "./LazyImage"
import Typography from "./Typography"
import Card from "./Card"
import { cardStyles } from "../utils/cardStyles"

interface CardCatchUpProps {
  title: string
  subtitle: string
  imageUrl: string
  count?: number
  titleVariant?: "subtitle-01" | "h6"
  subtitleVariant?: "body-02" | "caption"
  countVariant?: "annotation" | "body-02"
  textColor?: string
  onPress: () => void
}

const CardCatchUp = ({
  title,
  subtitle,
  imageUrl,
  count,
  titleVariant = "subtitle-01",
  subtitleVariant = "body-02",
  countVariant = "annotation",
  textColor = "#FFFFFF",
  onPress,
}: CardCatchUpProps) => {
  return (
    <Card onPress={onPress} style={cardStyles.catchUpContainer}>
      <View style={cardStyles.catchUpImageContainer}>
        <LazyImage
          source={{ uri: imageUrl }}
          style={{ width: "100%", height: "100%", borderRadius: 12 }}
          resizeMode="cover"
        />
        <View style={cardStyles.catchUpOverlay}>
          <Typography variant={titleVariant} color={textColor} style={styles.title}>
            {title}
          </Typography>
          <Typography variant={subtitleVariant} color={textColor} style={styles.subtitle} numberOfLines={2}>
            {subtitle}
          </Typography>
          {count !== undefined && (
            <Typography variant={countVariant} color={textColor} style={styles.count}>
              {count} stories
            </Typography>
          )}
        </View>
      </View>
    </Card>
  )
}

const styles = StyleSheet.create({
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
