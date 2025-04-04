"use client"

import React from "react"
import { View, StyleSheet, TouchableOpacity, SafeAreaView, FlatList } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import CardHorizontal from "../components/CardHorizontal"
import { mockNews } from "../services/newsService"
import { useTheme } from "../theme/ThemeProvider"
import Typography from "../components/Typography"
import BottomTabs from "../components/BottomTabs"

const CategoryScreen = ({ route, navigation }) => {
  const { category } = route.params
  const theme = useTheme()
  const [activeBottomTab, setActiveBottomTab] = React.useState("today")

  const handleNewsPress = (article) => {
    navigation.navigate("Article", { article })
  }

  const handleBottomTabPress = (tab) => {
    if (tab === "today") {
      navigation.navigate("Home")
    } else if (tab === "allNews") {
      navigation.navigate("AllNews")
    } else if (tab === "search") {
      navigation.navigate("Search")
    }
  }

  const handleBookmark = (id) => {
    console.log("Bookmark article:", id)
    // In a real app, you would save this article to bookmarks
  }

  const handleShare = (id) => {
    console.log("Share article:", id)
    // In a real app, you would open a share dialog
  }

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.colors.Surface.Primary }]}>
      <View
        style={[
          styles.header,
          {
            borderBottomColor: theme.colors.Border["Border-Primary"],
            borderBottomWidth: theme.borderWidth["10"],
          },
        ]}
      >
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={theme.colors.Text.Primary} />
        </TouchableOpacity>
        <Typography variant="h5" color={theme.colors.Text.Primary}>
          {category.name}
        </Typography>
        <View style={{ width: 24 }} />
      </View>

      <FlatList
        data={mockNews}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CardHorizontal
            id={item.id}
            title={item.title}
            imageUrl={item.imageUrl}
            category={item.category}
            timestamp={item.timestamp}
            readTime="3 min read"
            onPress={() => handleNewsPress(item)}
            onBookmark={() => handleBookmark(item.id)}
            onShare={() => handleShare(item.id)}
          />
        )}
        contentContainerStyle={styles.newsList}
      />

      {/* Bottom Tabs */}
      <BottomTabs activeTab={activeBottomTab} onTabPress={handleBottomTabPress} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    padding: 4,
  },
  newsList: {
    paddingHorizontal: 16,
  },
})

export default CategoryScreen

