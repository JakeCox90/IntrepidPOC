"use client"

import { useState, useEffect, useRef } from "react"
import { View, StyleSheet, TouchableOpacity, Animated, Easing } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useTheme } from "../theme/ThemeProvider"
import Typography from "./Typography"

interface AudioPlayerProps {
  title: string
  category?: string
  duration: number // in seconds
  titleVariant?: "subtitle-01" | "subtitle-02" | "h6"
  categoryVariant?: "subtitle-02" | "overline"
  durationVariant?: "body-02" | "annotation"
  titleColor?: string
  categoryColor?: string
  durationColor?: string
  onPlay?: () => void
  onPause?: () => void
  onComplete?: () => void
}

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}m ${secs}s`
}

const AudioPlayer = ({
  title,
  category = "US NEWS",
  duration = 321, // 5m 21s default
  titleVariant = "subtitle-02",
  categoryVariant = "subtitle-02",
  durationVariant = "body-02",
  titleColor,
  categoryColor,
  durationColor,
  onPlay,
  onPause,
  onComplete,
}: AudioPlayerProps) => {
  const theme = useTheme()
  const [isPlaying, setIsPlaying] = useState(false)
  const [remainingTime, setRemainingTime] = useState(duration)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const scrollX = useRef(new Animated.Value(0)).current
  const [contentWidth, setContentWidth] = useState(0)
  const [containerWidth, setContainerWidth] = useState(0)
  const [shouldScroll, setShouldScroll] = useState(false)

  // Determine if scrolling is needed when content or container width changes
  useEffect(() => {
    if (contentWidth > 0 && containerWidth > 0) {
      const needsScrolling = contentWidth > containerWidth
      setShouldScroll(needsScrolling)

      if (needsScrolling) {
        startTickerAnimation()
      }
    }
  }, [contentWidth, containerWidth])

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [])

  const startTickerAnimation = () => {
    // Reset to starting position
    scrollX.setValue(containerWidth)

    // Create the scrolling animation
    Animated.loop(
      Animated.timing(scrollX, {
        toValue: -contentWidth,
        duration: 15000, // Adjust speed as needed
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start()
  }

  const togglePlayPause = () => {
    if (isPlaying) {
      // Pause
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
      setIsPlaying(false)
      if (onPause) onPause()
    } else {
      // Play
      setIsPlaying(true)
      timerRef.current = setInterval(() => {
        setRemainingTime((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!)
            setIsPlaying(false)
            if (onComplete) onComplete()
            return 0
          }
          return prev - 1
        })
      }, 1000)
      if (onPlay) onPlay()
    }
  }

  return (
    <View
      style={[
        styles.container,
        {
          borderColor: theme.colors.Border["Border-Primary"],
          borderWidth: theme.borderWidth["10"],
          borderRadius: theme.radius["radius-default"],
          backgroundColor: theme.colors.Surface.Primary,
        },
      ]}
    >
      <View style={styles.contentContainer}>
        <View
          style={styles.leftSection}
          onLayout={(event) => {
            setContainerWidth(event.nativeEvent.layout.width)
          }}
        >
          {shouldScroll ? (
            // Scrolling ticker for long content
            <View style={styles.tickerContainer}>
              <Animated.View
                style={[
                  styles.tickerContent,
                  {
                    transform: [{ translateX: scrollX }],
                  },
                ]}
                onLayout={(event) => {
                  setContentWidth(event.nativeEvent.layout.width)
                }}
              >
                <Typography variant={categoryVariant} color={categoryColor || theme.colors.Primary.Resting}>
                  {category}
                </Typography>
                <Typography variant={titleVariant} color={titleColor || theme.colors.Text.Primary}>
                  {" " + title}
                </Typography>
              </Animated.View>
            </View>
          ) : (
            // Static text with truncation for content that fits
            <View
              style={styles.staticTextContainer}
              onLayout={(event) => {
                setContentWidth(event.nativeEvent.layout.width)
              }}
            >
              <Typography
                variant={categoryVariant}
                color={categoryColor || theme.colors.Primary.Resting}
                numberOfLines={1}
              >
                {category}
              </Typography>
              <Typography
                variant={titleVariant}
                color={titleColor || theme.colors.Text.Primary}
                numberOfLines={1}
                style={styles.truncatedTitle}
              >
                {" " + title}
              </Typography>
            </View>
          )}

          <View style={styles.durationContainer}>
            <Ionicons name="volume-medium-outline" size={20} color={theme.colors.Text.Secondary} />
            <Typography
              variant={durationVariant}
              color={durationColor || theme.colors.Text.Secondary}
              style={styles.duration}
            >
              {formatTime(remainingTime)} remaining
            </Typography>
          </View>
        </View>

        <TouchableOpacity style={styles.playButton} onPress={togglePlayPause} activeOpacity={0.7}>
          <Ionicons name={isPlaying ? "pause" : "play"} size={32} color={theme.colors.Text.Primary} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 68,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    overflow: "hidden",
  },
  contentContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  leftSection: {
    flex: 1,
    justifyContent: "center",
  },
  tickerContainer: {
    overflow: "hidden",
    marginBottom: 4,
  },
  tickerContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  staticTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  truncatedTitle: {
    flex: 1,
  },
  durationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  duration: {
    marginLeft: 4,
  },
  playButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 16,
  },
})

export default AudioPlayer
