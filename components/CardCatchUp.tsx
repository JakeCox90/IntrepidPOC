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
  onPress: () => void
}

const CardCatchUp = ({ title, subtitle, imageUrl, count, onPress }: CardCatchUpProps) => {
  return (
    <Card onPress={onPress} style={cardStyles.catchUpContainer}>
      <View style={cardStyles.catchUpImageContainer}>
        <LazyImage
          source={{ uri: imageUrl }}
          style={{ width: "100%", height: "100%", borderRadius: 12 }}
          resizeMode="cover"
        />
        <View style={cardStyles.catchUpOverlay}>
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

