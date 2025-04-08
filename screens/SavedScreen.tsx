"use client"

import { View, StyleSheet, StatusBar } from "react-native"
import { Feather } from "@expo/vector-icons"
import { useTheme } from "../theme/ThemeProvider"
import Typography from "../components/Typography"
import Header from "../components/Header"

const SavedScreen = ({ navigation }) => {
  const theme = useTheme()

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />

      <Header title="Saved Articles" backgroundColor="#FFFFFF" />

      <View style={styles.emptyContainer}>
        <Feather name="bookmark" size={64} color={theme.colors.Text.Secondary} />
        <Typography variant="h5" color={theme.colors.Text.Primary} style={styles.emptyText}>
          No saved articles
        </Typography>
        <Typography variant="body-02" color={theme.colors.Text.Secondary} style={styles.emptySubtext}>
          Articles you save will appear here
        </Typography>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtext: {
    textAlign: "center",
  },
})

export default SavedScreen
