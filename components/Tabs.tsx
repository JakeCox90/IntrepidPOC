"use client"
import { Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native"
import { useTheme } from "../theme/ThemeProvider"

interface TabsProps {
  tabs: string[]
  activeTab: string
  onTabPress: (tab: string) => void
  variant?: "primary" | "secondary"
}

const Tabs = ({ tabs, activeTab, onTabPress, variant = "primary" }: TabsProps) => {
  const theme = useTheme()

  return (
    <ScrollView
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
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab}
          style={[
            styles.tab,
            activeTab === tab &&
              (variant === "primary"
                ? styles.activeTabPrimary
                : [styles.activeTabSecondary, { borderBottomColor: theme.colors.Primary.Resting }]),
          ]}
          onPress={() => onTabPress(tab)}
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
  },
  contentContainer: {
    paddingHorizontal: 16,
  },
  tab: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginRight: 8,
  },
  activeTabPrimary: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 20,
  },
  activeTabSecondary: {
    borderBottomWidth: 2,
  },
  tabText: {
    textAlign: "center",
  },
})

export default Tabs

