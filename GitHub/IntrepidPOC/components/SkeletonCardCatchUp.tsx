import { View, StyleSheet } from "react-native"
import Skeleton from "./Skeleton"

const SkeletonCardCatchUp = () => {
  return (
    <View style={styles.container}>
      {/* Background skeleton */}
      <Skeleton width={280} height={160} borderRadius={12} />

      {/* Content overlay - positioned absolutely */}
      <View style={styles.overlay}>
        <Skeleton width={120} height={20} style={styles.title} />
        <Skeleton width={200} height={16} style={styles.subtitle} />
        <Skeleton width={80} height={14} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 280,
    height: 160,
    borderRadius: 12,
    overflow: "hidden",
    marginRight: 12,
    position: "relative",
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  title: {
    marginBottom: 4,
  },
  subtitle: {
    marginBottom: 8,
  },
})

export default SkeletonCardCatchUp

