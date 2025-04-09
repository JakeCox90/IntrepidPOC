"use client"
import { View, StyleSheet } from "react-native"
import { useTheme } from "../theme/ThemeProvider"
import Skeleton from "./Skeleton"

const SkeletonCardHero = () => {
  const theme = useTheme()

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.Surface.Primary }]}>
      {/* Image skeleton */}
      <Skeleton height={200} borderRadius={0} />

      <View style={styles.content}>
        {/* Flag skeleton */}
        <Skeleton width={80} height={24} borderRadius={4} style={styles.flag} />

        {/* Category skeleton */}
        <Skeleton width={100} height={16} style={styles.category} />

        {/* Title skeleton */}
        <Skeleton height={24} style={styles.titleLine} />
        <Skeleton height={24} style={styles.titleLine} />

        {/* Subtitle skeleton */}
        <Skeleton height={18} width="90%" style={styles.subtitle} />
        <Skeleton height={18} width="70%" style={styles.subtitle} />

        {/* Footer skeleton */}
        <View style={styles.footer}>
          <Skeleton width={100} height={16} />
          <View style={styles.actions}>
            <Skeleton width={24} height={24} borderRadius={12} style={styles.action} />
            <Skeleton width={24} height={24} borderRadius={12} />
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
  },
  content: {
    padding: 16,
  },
  flag: {
    marginBottom: 8,
  },
  category: {
    marginBottom: 8,
  },
  titleLine: {
    marginBottom: 8,
  },
  subtitle: {
    marginBottom: 4,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
  },
  actions: {
    flexDirection: "row",
  },
  action: {
    marginRight: 16,
  },
})

export default SkeletonCardHero

