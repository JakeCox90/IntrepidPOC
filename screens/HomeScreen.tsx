"use client"

import { useState, useEffect } from "react"
import { View, Text, FlatList, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native"
import { useTheme } from "../theme/ThemeProvider"
import NewsCard from "../components/NewsCard"
import { fetchLatestNews } from "../services/newsService"

const CATEGORIES = [
  { id: "all", name: "All" },
  { id: "news", name: "News" },
  { id: "sport", name: "Sport" },
  { id: "showbiz", name: "Showbiz" },
  { id: "tech", name: "Tech" },
]

const HomeScreen = ({ navigation }) => {
  const theme = useTheme()
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState("all")

  useEffect(() => {
    loadNews()
  }, [])

  const loadNews = async () => {
    try {
      setLoading(true)
      const newsData = await fetchLatestNews()
      setNews(newsData)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleNewsPress = (article) => {
    navigation.navigate("Article", { article })
  }

  const handleCategoryPress = (category) => {
    navigation.navigate("Category", { category })
  }

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.categoryItem, selectedCategory === item.id && styles.selectedCategoryItem]}
      onPress={() => setSelectedCategory(item.id)}
    >
      <Text style={[styles.categoryText, selectedCategory === item.id && styles.selectedCategoryText]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>THE SUN</Text>
      </View>

      {/* Categories */}
      <View style={styles.categoriesContainer}>
        <FlatList
          data={CATEGORIES}
          renderItem={renderCategoryItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesList}
        />
      </View>

      {/* News List */}
      <FlatList
        data={news}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <NewsCard
            title={item.title}
            imageUrl={item.imageUrl}
            category={item.category}
            timestamp={item.timestamp}
            onPress={() => handleNewsPress(item)}
          />
        )}
        contentContainerStyle={styles.newsList}
      />
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
    backgroundColor: "#FFFFFF",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#E03A3A",
    textAlign: "center",
  },
  categoriesContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  categoriesList: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  categoryItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: "#F5F5F5",
  },
  selectedCategoryItem: {
    backgroundColor: "#E03A3A",
  },
  categoryText: {
    fontSize: 14,
    color: "#333333",
  },
  selectedCategoryText: {
    color: "#FFFFFF",
    fontWeight: "500",
  },
  newsList: {
    padding: 16,
  },
})

export default HomeScreen

