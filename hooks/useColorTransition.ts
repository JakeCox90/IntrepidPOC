"use client"

import { useRef, useEffect } from "react"
import { Animated, Easing } from "react-native"

/**
 * Hook for smooth color transitions
 * @param currentColor The current color value
 * @param duration Animation duration in milliseconds
 * @returns An object containing the animated value and interpolated color
 */
export const useColorTransition = (currentColor: string, previousColor?: string, duration = 300) => {
  const colorAnimation = useRef(new Animated.Value(0)).current
  const prevColorRef = useRef(previousColor || currentColor)
  const currentColorRef = useRef(currentColor)
  const isFirstRender = useRef(true)

  useEffect(() => {
    // Skip animation on first render
    if (isFirstRender.current) {
      isFirstRender.current = false
      currentColorRef.current = currentColor
      return
    }

    // Skip if color hasn't changed
    if (currentColorRef.current === currentColor) {
      return
    }

    // Store previous color before updating
    prevColorRef.current = currentColorRef.current
    currentColorRef.current = currentColor

    // Reset animation value
    colorAnimation.setValue(0)

    // Start color transition animation
    Animated.timing(colorAnimation, {
      toValue: 1,
      duration,
      useNativeDriver: false,
      easing: Easing.out(Easing.ease),
    }).start()
  }, [currentColor, colorAnimation, duration])

  // Interpolate between previous and current color
  const animatedColor = colorAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [prevColorRef.current, currentColorRef.current],
  })

  return {
    colorAnimation,
    animatedColor,
  }
}

