"use client"

import { useState } from "react"
import { Image, View, StyleSheet, ActivityIndicator } from "react-native"
import { useTheme } from "../theme/ThemeProvider"
import Skeleton from "../components/Skeleton"

interface LazyImageProps {
  source: any
  style: any
  showLoader?: boolean
  useSkeleton?: boolean
}

const LazyImage = ({ source, style, showLoader = true, useSkeleton = true }: LazyImageProps) => {
  const theme = useTheme()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const handleLoad = () => {
    setLoading(false)
  }

  const handleError = () => {
    setLoading(false)
    setError(true)
  }

  return (
    <View style={styles.container}>
      {loading && useSkeleton && <Skeleton width="100%" height={200} />}
      {loading && showLoader && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="small" color={theme.colors.Primary.Resting} />
        </View>
      )}
      {error ? (
        <View style={styles.errorContainer}>
          <View style={styles.errorIcon} />
        </View>
      ) : (
        <Image
          source={source}
          style={[style, loading && styles.hiddenImage]}
          onLoad={handleLoad}
          onError={handleError}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  loaderContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  hiddenImage: {
    opacity: 0,
  },
  errorContainer: {
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  errorIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#e0e0e0",
  },
})

export default LazyImage

