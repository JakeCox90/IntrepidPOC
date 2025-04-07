"use client"
import React from "react"
import { View, ScrollView, TouchableOpacity, StyleSheet } from "react-native"
import { useTheme } from "../theme/ThemeProvider"
import Typography from "./Typography"

interface TabsWithIndicatorProps {
  tabs: string[]
  activeTab: string
  onTabPress: (tab: string) => void
  variant: "primary" | "secondary"
  backgroundColor?: any
  indicatorColor?: string
  activeTextColor?: string
  inactiveTextColor?: string
  textVariant?: "overline" | "body-02" | "subtitle-02"
}

// Create a simplified version without animations for now
const TabsWithIndicator = React.memo(
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

    // Default colors based on variant
    const defaultActiveTextColor = variant === "primary" ? "#FFFFFF" : theme.colors.Primary.Resting
    const defaultInactiveTextColor = variant === "primary" ? "rgba(255, 255, 255, 0.7)" : theme.colors.Text.Secondary

    // Use provided colors or defaults
    const finalActiveTextColor = activeTextColor || defaultActiveTextColor
    const finalInactiveTextColor = inactiveTextColor || defaultInactiveTextColor

    return (
      <View
        style={[
          styles.container,
          backgroundColor ? { backgroundColor } : null,
          variant === "secondary" ? styles.secondaryContainer : null,
        ]}
      >
        <View style={styles.tabsContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
            {tabs.map((tab) => (
              <TouchableOpacity
                key={tab}
                style={[styles.tab, variant === "secondary" ? styles.secondaryTab : styles.primaryTab]}
                onPress={() => onTabPress(tab)}
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
      </View>
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
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 20,
  },
  secondaryTab: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    height: 44,
  },
  activeTabText: {
    fontWeight: "700",
  },
  activeSecondaryTabText: {
    fontWeight: "600",
  },
})

export default TabsWithIndicator

