"use client"
import { useRef, useState, useEffect } from "react"
import { Text, ScrollView, TouchableOpacity, StyleSheet, Animated } from "react-native"
import { useTheme } from "../theme/ThemeProvider"

interface TabsProps {
  tabs: string[]
  activeTab: string
  onTabPress: (tab: string) => void
  variant?: "primary" | "secondary"
}

const Tabs = ({ tabs, activeTab, onTabPress, variant = "primary" }: TabsProps) => {
  const theme = useTheme()
  const scrollViewRef = useRef<ScrollView>(null)
  const tabPositions = useRef<{ [key: string]: { x: number; width: number } }>({})
  const animatedPosition = useRef(new Animated.Value(0)).current
  const animatedWidth = useRef(new Animated.Value(0)).current
  const [initialized, setInitialized] = useState(false)

  // Update the animated values when the active tab changes
  useEffect(() => {
    if (!initialized || !tabPositions.current[activeTab]) return

    // Get the position of the active tab
    const { x, width } = tabPositions.current[activeTab]

    // Animate to the new position
    Animated.parallel([
      Animated.timing(animatedPosition, {
        toValue: x,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(animatedWidth, {
        toValue: width,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start()

    // Scroll to make the active tab visible
    scrollViewRef.current?.scrollTo({
      x: Math.max(0, x - 50), // Scroll to position with some padding
      animated: true,
    })
  }, [activeTab, animatedPosition, animatedWidth, initialized])

  // Store the position and width of each tab
  const measureTab = (tab: string, x: number, width: number) => {
    tabPositions.current[tab] = { x, width }

    // Initialize the animated values for the first active tab
    if (tab === activeTab && !initialized) {
      animatedPosition.setValue(x)
      animatedWidth.setValue(width)
      setInitialized(true)
    }
  }

  return (
    <ScrollView
      ref={scrollViewRef}
      horizontal
      showsHorizontalScrollIndicator={false}
      style={[
        styles.container,
        {
          borderBottomWidth: theme.borderWidth["10"],
          borderBottomColor: theme.colors.Border["Border-Primary"],
          backgroundColor: variant === "primary" ? theme.colors.Primary.Resting : theme.colors.Surface.Primary,
        },
      ]}
      contentContainerStyle={styles.contentContainer}
    >
      {/* Animated background for primary variant */}
      {variant === "primary" && (
        <Animated.View
          style={[
            styles.animatedBackground,
            {
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              borderRadius: 20,
              left: animatedPosition,
              width: animatedWidth,
            },
          ]}
        />
      )}

      {/* Animated underline for secondary variant */}
      {variant === "secondary" && (
        <Animated.View
          style={[
            styles.animatedUnderline,
            {
              backgroundColor: theme.colors.Primary.Resting,
              left: animatedPosition,
              width: animatedWidth,
            },
          ]}
        />
      )}

      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab}
          style={styles.tab}
          onPress={() => onTabPress(tab)}
          onLayout={(event) => {
            const { x, width } = event.nativeEvent.layout
            measureTab(tab, x, width)
          }}
        >
          <Text
            style={[
              styles.tabText,
              {
                fontFamily: theme.typography.fontFamily.medium,
                color: variant === "primary" ? theme.colors.Text.Inverse : theme.colors.Text.Primary,
                fontSize: theme.fontSize["6"],
              },
              activeTab === tab &&
                (variant === "primary"
                  ? { fontFamily: theme.typography.fontFamily.bold }
                  : { color: theme.colors.Primary.Resting, fontFamily: theme.typography.fontFamily.bold }),
            ]}
          >
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 0,
    position: "relative",
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  tab: {
    paddingHorizontal: 16,
    marginRight: 8,
    zIndex: 1,
  },
  animatedBackground: {
    position: "absolute",
    top: 12,
    height: 36,
    zIndex: 0,
  },
  animatedUnderline: {
    position: "absolute",
    bottom: 0,
    height: 2,
    zIndex: 0,
  },
  tabText: {
    textAlign: "center",
  },
})

export default Tabs

