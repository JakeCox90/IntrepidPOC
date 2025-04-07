"use client"
import { useRef, useState, useEffect, memo } from "react"
import { View, ScrollView, TouchableOpacity, StyleSheet, Animated, Easing } from "react-native"
import { useTheme } from "../theme/ThemeProvider"
import Typography from "./Typography"

interface TabsWithIndicatorProps {
  tabs: string[]
  activeTab: string
  onTabPress: (tab: string) => void
  variant: "primary" | "secondary"
  backgroundColor?: string | Animated.AnimatedInterpolation<string | number>
  indicatorColor?: string
  activeTextColor?: string
  inactiveTextColor?: string
  textVariant?: "overline" | "body-02" | "subtitle-02"
}

// Memoize the component to prevent unnecessary re-renders
const TabsWithIndicator = memo(
  ({
    tabs,
    activeTab,
    onTabPress,
    variant = "primary",
    backgroundColor,
    indicatorColor,
    activeTextColor,
    inactiveTextColor,
    textVariant = "overline",
  }: TabsWithIndicatorProps) => {
    const theme = useTheme()
    const scrollViewRef = useRef<ScrollView>(null)
    const tabPositions = useRef<{ [key: string]: { x: number; width: number } }>({})
    const animatedPosition = useRef(new Animated.Value(0)).current
    const animatedWidth = useRef(new Animated.Value(0)).current
    const [initialized, setInitialized] = useState(false)
    const prevActiveTabRef = useRef(activeTab)

    // Default colors based on variant
    const defaultIndicatorColor = variant === "primary" ? "rgba(255, 255, 255, 0.2)" : theme.colors.Primary.Resting

    const defaultActiveTextColor = variant === "primary" ? "#FFFFFF" : theme.colors.Primary.Resting

    const defaultInactiveTextColor = variant === "primary" ? "rgba(255, 255, 255, 0.7)" : theme.colors.Text.Secondary

    // Use provided colors or defaults
    const finalIndicatorColor = indicatorColor || defaultIndicatorColor
    const finalActiveTextColor = activeTextColor || defaultActiveTextColor
    const finalInactiveTextColor = inactiveTextColor || defaultInactiveTextColor

    // Update the animated values when the active tab changes
    useEffect(() => {
      // Skip animation if it's the first render or if the active tab hasn't changed
      if (!initialized || !tabPositions.current[activeTab] || prevActiveTabRef.current === activeTab) {
        prevActiveTabRef.current = activeTab
        return
      }

      // Get the position of the active tab
      const { x, width } = tabPositions.current[activeTab]

      // Animate to the new position
      Animated.parallel([
        Animated.timing(animatedPosition, {
          toValue: x,
          duration: 300,
          useNativeDriver: false,
          easing: Easing.out(Easing.ease),
        }),
        Animated.timing(animatedWidth, {
          toValue: width,
          duration: 300,
          useNativeDriver: false,
          easing: Easing.out(Easing.ease),
        }),
      ]).start()

      // Scroll to make the active tab visible
      scrollViewRef.current?.scrollTo({
        x: Math.max(0, x - 50), // Scroll to position with some padding
        animated: true,
      })

      // Update the previous active tab ref
      prevActiveTabRef.current = activeTab
    }, [activeTab, animatedPosition, animatedWidth, initialized])

    // Store the position and width of each tab
    const measureTab = (tab: string, event: any) => {
      const { x, width } = event.nativeEvent.layout
      tabPositions.current[tab] = { x, width }

      // Initialize the animated values for the first active tab
      if (tab === activeTab && !initialized) {
        animatedPosition.setValue(x)
        animatedWidth.setValue(width)
        setInitialized(true)
      }
    }

    return (
      <Animated.View
        style={[
          styles.container,
          backgroundColor ? { backgroundColor } : null,
          variant === "secondary" ? styles.secondaryContainer : null,
        ]}
      >
        <View style={styles.tabsContainer}>
          <ScrollView
            ref={scrollViewRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {/* Animated indicator */}
            <Animated.View
              style={[
                variant === "primary" ? styles.primaryIndicator : styles.secondaryIndicator,
                {
                  backgroundColor: finalIndicatorColor,
                  left: animatedPosition,
                  width: animatedWidth,
                },
              ]}
            />

            {tabs.map((tab) => (
              <TouchableOpacity
                key={tab}
                style={[styles.tab, variant === "secondary" ? styles.secondaryTab : styles.primaryTab]}
                onPress={() => onTabPress(tab)}
                onLayout={(event) => measureTab(tab, event)}
              >
                <Typography
                  variant={textVariant}
                  color={activeTab === tab ? finalActiveTextColor : finalInactiveTextColor}
                  style={[
                    activeTab === tab && variant === "primary" ? styles.activeTabText : null,
                    activeTab === tab && variant === "secondary" ? styles.activeSecondaryTabText : null,
                  ]}
                >
                  {tab}
                </Typography>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </Animated.View>
    )
  },
)

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingVertical: 8,
  },
  secondaryContainer: {
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
    paddingVertical: 0,
  },
  tabsContainer: {
    position: "relative",
    height: 44,
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  tab: {
    marginRight: 8,
    zIndex: 1,
    justifyContent: "center",
  },
  primaryTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    height: 36,
  },
  secondaryTab: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    height: 44,
  },
  primaryIndicator: {
    position: "absolute",
    height: 36,
    borderRadius: 20,
    top: 4,
    zIndex: 0,
  },
  secondaryIndicator: {
    position: "absolute",
    height: 2,
    bottom: 0,
    zIndex: 0,
  },
  activeTabText: {
    fontWeight: "700",
  },
  activeSecondaryTabText: {
    fontWeight: "600",
  },
})

export default TabsWithIndicator

