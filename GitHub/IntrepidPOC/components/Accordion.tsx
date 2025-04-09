"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { View, TouchableOpacity, StyleSheet, Animated } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useTheme } from "../theme/ThemeProvider"
import Typography from "./Typography"
import { defaultTypographyVariants } from "../config/typography-guidelines"

interface AccordionProps {
  title: string
  children: React.ReactNode
  initialExpanded?: boolean
  titleVariant?: "h5" | "h6" | "subtitle-01"
  contentVariant?: "body-01" | "body-02" | "subtitle-02"
  titleColor?: string
  contentColor?: string
}

export default function Accordion({
  title,
  children,
  initialExpanded = false,
  titleVariant = defaultTypographyVariants.accordion.title,
  contentVariant = defaultTypographyVariants.accordion.content,
  titleColor,
  contentColor,
}: AccordionProps) {
  const theme = useTheme()
  const [expanded, setExpanded] = useState(initialExpanded)
  const animatedHeight = useRef(new Animated.Value(initialExpanded ? 1 : 0)).current
  const contentHeight = useRef(0)

  useEffect(() => {
    Animated.timing(animatedHeight, {
      toValue: expanded ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start()
  }, [expanded])

  const toggleAccordion = () => {
    setExpanded(!expanded)
  }

  const onContentLayout = (event) => {
    if (contentHeight.current === 0) {
      contentHeight.current = event.nativeEvent.layout.height
    }
  }

  const height = animatedHeight.interpolate({
    inputRange: [0, 1],
    outputRange: [0, contentHeight.current],
  })

  // Helper function to render content with Typography if it's a string
  const renderContent = () => {
    // If children is a string, wrap it in Typography
    if (typeof children === "string") {
      return (
        <Typography variant={contentVariant} color={contentColor || theme.colors.Text.Secondary}>
          {children}
        </Typography>
      )
    }

    // Otherwise, return children as is
    return children
  }

  return (
    <View
      style={[
        styles.container,
        {
          borderColor: theme.colors.Border["Border-Primary"],
          borderWidth: theme.borderWidth["10"],
          borderRadius: theme.radius["radius-default"],
          overflow: "hidden",
        },
      ]}
    >
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={toggleAccordion}
        style={[
          styles.header,
          {
            backgroundColor: theme.colors.Surface.Primary,
            borderBottomColor: expanded ? theme.colors.Border["Border-Primary"] : "transparent",
            borderBottomWidth: expanded ? 1 : 0,
            borderRadius: 0,
          },
        ]}
      >
        <Typography variant={titleVariant} color={titleColor || theme.colors.Text.Primary}>
          {title}
        </Typography>
        <Ionicons name={expanded ? "remove" : "add"} size={24} color={theme.colors.Text.Primary} />
      </TouchableOpacity>

      <Animated.View
        style={[
          styles.contentContainer,
          {
            height: expanded ? "auto" : height,
            opacity: animatedHeight,
            backgroundColor: theme.colors.Surface.Primary,
          },
        ]}
      >
        <View style={styles.content} onLayout={onContentLayout}>
          {renderContent()}
        </View>
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  header: {
    height: 68,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  contentContainer: {
    overflow: "hidden",
  },
  content: {
    padding: 16,
  },
})
