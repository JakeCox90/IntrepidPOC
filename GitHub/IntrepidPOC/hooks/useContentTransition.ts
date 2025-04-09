"use client"

import { useRef } from "react"
import { Animated, Easing } from "react-native"

interface ContentTransitionOptions {
  fadeOutDuration?: number
  fadeInDuration?: number
  fadeInDelay?: number
  translateY?: number
  useNativeDriver?: boolean
}

/**
 * Hook for content transition animations with fade and movement
 * @param options Animation options
 * @returns An object with the animated value and transition function
 */
export const useContentTransition = (options: ContentTransitionOptions = {}) => {
  const {
    fadeOutDuration = 150,
    fadeInDuration = 300,
    fadeInDelay = 50,
    translateY = 10,
    useNativeDriver = true,
  } = options

  const contentAnimation = useRef(new Animated.Value(1)).current
  const isAnimating = useRef(false)

  const animateTransition = (onFadeOutComplete?: () => void) => {
    // Prevent multiple animations from running simultaneously
    if (isAnimating.current) return

    isAnimating.current = true

    // Fade out
    Animated.timing(contentAnimation, {
      toValue: 0,
      duration: fadeOutDuration,
      useNativeDriver,
      easing: Easing.out(Easing.ease),
    }).start(() => {
      // Execute callback if provided
      if (onFadeOutComplete) {
        onFadeOutComplete()
      }

      // Fade in after data is loaded
      Animated.timing(contentAnimation, {
        toValue: 1,
        duration: fadeInDuration,
        delay: fadeInDelay,
        useNativeDriver,
        easing: Easing.in(Easing.ease),
      }).start(() => {
        isAnimating.current = false
      })
    })
  }

  const animatedStyle = {
    opacity: contentAnimation,
    transform: [
      {
        translateY: contentAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [translateY, 0],
        }),
      },
    ],
  }

  return {
    contentAnimation,
    animateTransition,
    animatedStyle,
  }
}

