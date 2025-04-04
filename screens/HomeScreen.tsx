"use client"
import { View, StyleSheet, SafeAreaView, Text } from "react-native"
import { useTheme } from "../theme/ThemeProvider"
import { StatusBar } from "expo-status-bar"

const HomeScreen = () => {
  const theme = useTheme()

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />

      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.Primary.Resting }]}>
        <Text style={styles.headerTitle}>Today</Text>
      </View>

      {/* Placeholder content */}
      <View style={[styles.placeholderContainer, { backgroundColor: theme.colors.Surface.Primary }]}>
        <Text style={[styles.placeholderText, { color: theme.colors.Text.Secondary }]}>Coming soon...</Text>
        <Text style={[styles.placeholderSubtext, { color: theme.colors.Text.Secondary }]}>
          This feature is currently under development
        </Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 40,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  placeholderText: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 12,
    textAlign: "center",
  },
  placeholderSubtext: {
    fontSize: 16,
    textAlign: "center",
  },
})

export default HomeScreen

