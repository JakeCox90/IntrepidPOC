"use client"

import { useState } from "react"
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  StatusBar,
  ActivityIndicator,
  Text,
} from "react-native"
import { Feather } from "@expo/vector-icons"
import Typography from "../components/Typography"
import { useTheme } from "../theme/ThemeProvider"
import Header from "../components/Header"
import CardHorizontal from "../components/CardHorizontal"
import { searchNews, type Article } from "../services/sunNewsService"

const SearchScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<Article[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const theme = useTheme()

  const handleSearch = async () => {
    if (searchQuery.trim()) {
      try {
        setIsSearching(true)
        setError(null)
        const results = await searchNews(searchQuery)
        setSearchResults(results)
      } catch (err) {
        setError("Failed to search articles")
        console.error(err)
      } finally {
        setIsSearching(false)
      }
    }
  }

  const handleClearSearch = () => {
    setSearchQuery("")
    setSearchResults([])
    setError(null)
  }

  const handleArticlePress = (article) => {
    navigation.navigate("SearchArticle", { article })
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

      {isSearching ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.Primary.Resting} />
          <Text style={[styles.loadingText, { color: theme.colors.Text.Secondary }]}>Searching...</Text>
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={[styles.errorText, { color: theme.colors.Error.Resting }]}>{error}</Text>
          <Text style={[styles.errorSubtext, { color: theme.colors.Text.Secondary }]}>Please try again.</Text>
        </View>
      ) : searchResults.length > 0 ? (
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  errorSubtext: {
    fontSize: 16,
    textAlign: "center",
  },
})

export default SearchScreen

