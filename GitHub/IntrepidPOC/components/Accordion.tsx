"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { View, TouchableOpacity, StyleSheet, Animated } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useTheme } from "../theme/ThemeProvider"
import Typography from "./Typography"

interface AccordionProps {
  title: string
  children: React.ReactNode
  initialExpanded?: boolean
  titleVariant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "subtitle-01" | "subtitle-02" | "body-01" | "body-02"
  contentVariant?: "body-01" | "body-02" | "subtitle-01" | "subtitle-02"
  titleColor?: string
  contentColor?: string
}

export default function Accordion({
  title,
  children,
  initialExpanded = false,
  titleVariant = "h6",
  contentVariant = "body-02",
  titleColor,
  contentColor,
}: AccordionProps) {
  const theme = useTheme()
  const [expanded, setExpanded] = useState(initialExpanded)
  const animatedHeight = useRef(new Animated.Value(initialExpanded ? 1 : 0)).current
  const contentHeight = useRef(0)

  // Default colors if not provided
  const defaultTitleColor = titleColor || theme.colors.Text.Primary
  const defaultContentColor = contentColor || theme.colors.Text.Secondary

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

  // Helper function to render children with proper Typography
  const renderContent = () => {
    // If children is a string, wrap it in Typography
    if (typeof children === "string") {
      return (
        <Typography variant={contentVariant} color={defaultContentColor}>
          {children}
        </Typography>
      )
    }

    // If children is already a React element, return as is
    // This allows for complex content while still using Typography
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
        <Typography variant={titleVariant} color={defaultTitleColor}>
          {title}
        </Typography>
        <Ionicons name={expanded ? "remove" : "add"} size={24} color={defaultTitleColor} />
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
