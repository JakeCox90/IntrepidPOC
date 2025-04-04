"use client"

import React from "react"
import { View, StyleSheet, Animated, Easing } from "react-native"
import { useTheme } from "../theme/ThemeProvider"

interface SkeletonProps {
  width?: number | string
  height?: number | string
  borderRadius?: number
  style?: any
}

const Skeleton: React.FC<SkeletonProps> = ({ width = "100%", height = 20, borderRadius = 4, style }) => {
  const theme = useTheme()
  const animatedValue = React.useRef(new Animated.Value(0)).current

  React.useEffect(() => {
    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 1500,
        easing: Easing.bezier(0.4, 0.0, 0.6, 1),
        useNativeDriver: true,
      }),
    ).start()
  }, [animatedValue])

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-350, 350],
  })

  return (
    <View
      style={[
        styles.container,
        {
          width,
          height,
          borderRadius,
          backgroundColor: theme.colors.Border["Skeleton-01"],
          overflow: "hidden",
        },
        style,
      ]}
    >
      <Animated.View
        style={[
          styles.shimmer,
          {
            backgroundColor: theme.colors.Border["Skeleton-02"],
            transform: [{ translateX }],
          },
        ]}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  shimmer: {
    width: 350,
    height: "100%",
    position: "absolute",
    opacity: 0.3,
  },
})

export default Skeleton

