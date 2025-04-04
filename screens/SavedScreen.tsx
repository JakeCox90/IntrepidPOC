import { View, Text, StyleSheet, SafeAreaView } from "react-native"
import { Ionicons } from "@expo/vector-icons"

const SavedScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Saved Articles</Text>
      </View>

      <View style={styles.emptyContainer}>
        <Ionicons name="heart-outline" size={64} color="#CCCCCC" />
        <Text style={styles.emptyText}>No saved articles</Text>
        <Text style={styles.emptySubtext}>Articles you save will appear here</Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000000",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#333333",
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#666666",
  },
})

export default SavedScreen

