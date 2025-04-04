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
}

const Accordion = ({ title, children, initialExpanded = false }: AccordionProps) => {
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

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={toggleAccordion}
        style={[
          styles.header,
          {
            backgroundColor: theme.colors.Surface.Primary,
            borderColor: theme.colors.Border["Border-Primary"],
            borderRadius: expanded ? theme.radius["radius-default"] : theme.radius["radius-default"],
          },
        ]}
      >
        <Typography variant="h6" color={theme.colors.Text.Primary}>
          {title}
        </Typography>
        <Ionicons name={expanded ? "remove" : "add"} size={24} color={theme.colors.Text.Primary} />
      </TouchableOpacity>

      <Animated.View
        style={[
          styles.contentContainer,
          {
            height: expanded ? "auto" : 0,
            opacity: animatedHeight,
            borderColor: theme.colors.Border["Border-Primary"],
            borderBottomLeftRadius: theme.radius["radius-default"],
            borderBottomRightRadius: theme.radius["radius-default"],
            borderTopWidth: expanded ? 1 : 0,
            borderLeftWidth: expanded ? 1 : 0,
            borderRightWidth: expanded ? 1 : 0,
            borderBottomWidth: expanded ? 1 : 0,
            overflow: "hidden",
          },
        ]}
      >
        <View style={styles.content} onLayout={onContentLayout}>
          {children}
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
    borderWidth: 1,
  },
  contentContainer: {
    marginTop: -1,
  },
  content: {
    padding: 16,
  },
})

export default Accordion

