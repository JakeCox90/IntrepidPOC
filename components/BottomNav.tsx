"use client"
import { View, TouchableOpacity, StyleSheet, Text } from "react-native"
import { Feather } from "@expo/vector-icons"
import { useTheme } from "../theme/ThemeProvider"
import { useSafeAreaInsets } from "react-native-safe-area-context"

interface BottomNavProps {
  activeTab: string
  onTabPress: (tabName: string) => void
}

const BottomNav = ({ activeTab, onTabPress }: BottomNavProps) => {
  const theme = useTheme()
  const insets = useSafeAreaInsets()

  // Ensure we have fallback values if theme properties are undefined
  const fontFamily = theme?.typography?.fontFamily?.regular || "System"
  const fontSize = theme?.fontSize?.["8"] || 12
  const primaryColor = theme?.colors?.Primary?.Resting || "#E03A3A"
  const secondaryColor = theme?.colors?.Text?.Secondary || "#717171"
  const borderColor = theme?.colors?.Border?.["Border-Primary"] || "#E5E5E5"
  const borderWidth = theme?.borderWidth?.["10"] || 1

  const tabs = [
    { name: "Today", icon: "home" },
    { name: "ForYou", icon: "user", label: "For You" },
    { name: "AllNews", icon: "grid", label: "All News" },
    { name: "Search", icon: "search" },
    { name: "Saved", icon: "bookmark" },
  ]

  return (
    <View
      style={[
        styles.container,
        {
          borderTopWidth: borderWidth,
          borderTopColor: borderColor,
          paddingBottom: insets.bottom || 0,
          backgroundColor: theme.colors.Surface.Primary,
        },
      ]}
    >
      {tabs.map((tab) => (
        <TouchableOpacity key={tab.name} style={styles.tab} onPress={() => onTabPress(tab.name)}>
          <Feather name={tab.icon} size={24} color={activeTab === tab.name ? primaryColor : secondaryColor} />
          <Text
            style={[
              styles.tabLabel,
              {
                color: activeTab === tab.name ? primaryColor : secondaryColor,
                fontFamily: fontFamily,
                fontSize: fontSize,
              },
            ]}
          >
            {tab.label || tab.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
  },
  tabLabel: {
    marginTop: 4,
  },
})

export default BottomNav
