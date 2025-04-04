"use client"

import { useState } from "react"
import { View, StyleSheet, TextInput, TouchableOpacity, FlatList, StatusBar } from "react-native"
import { Feather } from "@expo/vector-icons"
import Typography from "../components/Typography"
import { useTheme } from "../theme/ThemeProvider"
import Header from "../components/Header"
import CardHorizontal from "../components/CardHorizontal"

// Mock search results
const mockSearchResults = [
  {
    id: 1,
    title: "Premier League chief Richard Masters with cheeky message on VAR",
    category: "Football",
    imageUrl: "https://i.imgur.com/ZLdnUOH.jpg",
    readTime: "3 min read",
  },
  {
    id: 2,
    title: "Jake Paul reveals Tommy Fury rematch and slams Canelo over failed fight",
    category: "Boxing",
    imageUrl: "https://i.imgur.com/JaCBiCp.jpg",
    readTime: "3 min read",
  },
]

const SearchScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const theme = useTheme()

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setIsSearching(true)
      // Simulate API call
      setTimeout(() => {
        setSearchResults(mockSearchResults)
        setIsSearching(false)
      }, 1000)
    }
  }

  const handleClearSearch = () => {
    setSearchQuery("")
    setSearchResults([])
  }

  const handleArticlePress = (article) => {
    navigation.navigate("Article", {
      article: {
        ...article,
        content:
          "This is a placeholder content for the article. The actual content will be fetched from The Sun website in a production environment.",
      },
    })
  }

  const handleBookmark = (id) => {
    console.log("Bookmark article:", id)
  }

  const handleShare = (id) => {
    console.log("Share article:", id)
  }

  const renderTrendingItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.trendingItem, { backgroundColor: theme.colors.Surface.Secondary }]}
      onPress={() => {
        setSearchQuery(item)
        handleSearch()
      }}
    >
      <Typography variant="body-02" color={theme.colors.Text.Primary}>
        {item}
      </Typography>
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />

      <Header title="Search" backgroundColor="#FFFFFF" />

      <View style={styles.searchContainer}>
        <View style={[styles.searchInputContainer, { backgroundColor: theme.colors.Surface.Secondary }]}>
          <Feather name="search" size={20} color={theme.colors.Text.Secondary} style={styles.searchIcon} />
          <TextInput
            style={[styles.searchInput, { color: theme.colors.Text.Primary }]}
            placeholder="Search for news..."
            placeholderTextColor={theme.colors.Text.Secondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
            returnKeyType="search"
            onSubmitEditing={handleSearch}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={handleClearSearch}>
              <Feather name="x-circle" size={20} color={theme.colors.Text.Secondary} />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity
          style={[styles.searchButton, { backgroundColor: theme.colors.Primary.Resting }]}
          onPress={handleSearch}
        >
          <Typography variant="button" color={theme.colors.Text.Inverse}>
            Search
          </Typography>
        </TouchableOpacity>
      </View>

      {searchResults.length > 0 ? (
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <CardHorizontal
              id={item.id}
              title={item.title}
              imageUrl={item.imageUrl}
              category={item.category}
              readTime={item.readTime}
              onPress={() => handleArticlePress(item)}
              onBookmark={() => handleBookmark(item.id)}
              onShare={() => handleShare(item.id)}
            />
          )}
          contentContainerStyle={styles.searchResults}
        />
      ) : (
        <View style={styles.trendingContainer}>
          <Typography variant="h5" color={theme.colors.Text.Primary} style={styles.trendingTitle}>
            Trending Searches
          </Typography>
          <FlatList
            data={["Premier League", "Royal Family", "Cost of Living", "Ukraine War", "Climate Change", "US Election"]}
            keyExtractor={(item) => item}
            renderItem={renderTrendingItem}
            numColumns={2}
            columnWrapperStyle={styles.trendingColumns}
            contentContainerStyle={styles.trendingList}
          />
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
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
    borderRadius: 8,
    paddingHorizontal: 12,
    marginRight: 8,
    height: 44,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 44,
    fontSize: 16,
  },
  searchButton: {
    borderRadius: 8,
    justifyContent: "center",
    paddingHorizontal: 16,
    height: 44,
  },
  searchResults: {
    padding: 16,
  },
  trendingContainer: {
    padding: 16,
    flex: 1,
  },
  trendingTitle: {
    marginBottom: 16,
  },
  trendingList: {
    paddingBottom: 16,
  },
  trendingColumns: {
    justifyContent: "space-between",
    marginBottom: 12,
  },
  trendingItem: {
    borderRadius: 8,
    padding: 12,
    width: "48%",
  },
})

export default SearchScreen

