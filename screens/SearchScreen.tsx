"use client"

import { useState } from "react"
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView } from "react-native"
import { Ionicons } from "@expo/vector-icons"

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Search</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Ionicons name="search" size={20} color="#999999" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for news..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            returnKeyType="search"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Ionicons name="close-circle" size={20} color="#999999" />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity style={styles.searchButton}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.trendingContainer}>
        <Text style={styles.trendingTitle}>Trending Searches</Text>
        <View style={styles.trendingList}>
          {["Premier League", "Royal Family", "Cost of Living", "Ukraine War"].map((item) => (
            <TouchableOpacity key={item} style={styles.trendingItem}>
              <Text style={styles.trendingText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
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
  searchContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginRight: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  searchButton: {
    backgroundColor: "#E03A3A",
    borderRadius: 8,
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  searchButtonText: {
    color: "#FFFFFF",
    fontWeight: "500",
  },
  trendingContainer: {
    padding: 16,
  },
  trendingTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 16,
  },
  trendingList: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  trendingItem: {
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    padding: 12,
    margin: 4,
    minWidth: "45%",
  },
  trendingText: {
    fontSize: 14,
    color: "#333333",
  },
})

export default SearchScreen

