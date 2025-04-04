"use client"
import { View, StyleSheet } from "react-native"
import { useTheme } from "../theme/ThemeProvider"
import Skeleton from "./Skeleton"

const SkeletonCardArticle = () => {
  const theme = useTheme()

  return (
    <View
      style={[
        styles.container,
        {
          borderBottomColor: theme.colors.Border["Border-Primary"],
          borderBottomWidth: theme.borderWidth["10"],
        },
      ]}
    >
      <View style={styles.content}>
        <View style={styles.textContent}>
          {/* Flag skeleton */}
          <Skeleton width={80} height={24} borderRadius={4} style={styles.flag} />

          {/* Category skeleton */}
          <Skeleton width={100} height={16} style={styles.category} />

          {/* Title skeleton */}
          <Skeleton height={20} style={styles.titleLine} />
          <Skeleton height={20} width="90%" style={styles.titleLine} />
        </View>

        {/* Image skeleton */}
        <Skeleton width={100} height={100} borderRadius={8} />
      </View>

      <View style={styles.footer}>
        <Skeleton width={100} height={16} />
        <View style={styles.actions}>
          <Skeleton width={24} height={24} borderRadius={12} style={styles.action} />
          <Skeleton width={24} height={24} borderRadius={12} />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
  },
  content: {
    flexDirection: "row",
    marginBottom: 12,
  },
  textContent: {
    flex: 1,
    marginRight: 12,
  },
  flag: {
    marginBottom: 8,
  },
  category: {
    marginBottom: 8,
  },
  titleLine: {
    marginBottom: 4,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  actions: {
    flexDirection: "row",
  },
  action: {
    marginRight: 16,
  },
})

export default SkeletonCardArticle

