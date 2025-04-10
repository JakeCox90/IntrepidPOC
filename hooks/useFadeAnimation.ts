'use client';

import { useRef } from 'react';
import { Animated, Easing } from 'react-native';

interface FadeAnimationOptions {
  initialValue?: number;
  duration?: number;
  useNativeDriver?: boolean;
  easing?: (value: number) => number;
}

/**
 * Hook for fade in/out animations
 * @param options Animation options
 * @returns An object with the animated value and fade functions
 */
export const useFadeAnimation = (options: FadeAnimationOptions = {}) => {
  const {
    initialValue = 1,
    duration = 300,
    useNativeDriver = true,
    easing = Easing.inOut(Easing.ease),
  } = options;

  const opacity = useRef(new Animated.Value(initialValue)).current;

  const fadeIn = (callback?: () => void) => {
    Animated.timing(opacity, {
      toValue: 1,
      duration,
      useNativeDriver,
      easing,
    }).start(callback ? ({ finished }) => finished && callback() : undefined);
  };

  const fadeOut = (callback?: () => void) => {
    Animated.timing(opacity, {
      toValue: 0,
      duration,
      useNativeDriver,
      easing,
    }).start(callback ? ({ finished }) => finished && callback() : undefined);
  };

  const fadeTo = (value: number, callback?: () => void) => {
    Animated.timing(opacity, {
      toValue: value,
      duration,
      useNativeDriver,
      easing,
    }).start(callback ? ({ finished }) => finished && callback() : undefined);
  };

  return {
    opacity,
    fadeIn,
    fadeOut,
    fadeTo,
  };
};
