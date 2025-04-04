"use client"

import { useState } from "react"
import { View, FlatList, StyleSheet, SafeAreaView } from "react-native"
import { useTheme } from "../theme/ThemeProvider"
import Typography from "../components/Typography"
import CardHorizontal from "../components/CardHorizontal"
import Tabs from "../components/Tabs"
import BottomTabs from "../components/BottomTabs"

// Categories based on The Sun website
const CATEGORIES = ["All", "UK News", "Sport", "Politics", "Showbiz", "Health", "Tech"]
const SPORT_CATEGORIES = ["Football", "Rugby", "Cricket", "Boxing", "F1", "Tennis", "Golf"]

// Sample news content from The Sun website
const sunNewsContent = [
  {
    id: 1,
    title: "MASTERBLASTER Tottenham Premier League chief Richard Masters with cheeky message on VAR",
    category: "Football",
    imageUrl: "https://i.imgur.com/ZLdnUOH.jpg",
    timestamp: "2 hours ago",
    readTime: "3 min read",
    content:
      "Premier League chief Richard Masters has sent a cheeky message about VAR after Tottenham's controversial win over Liverpool.",
  },
  {
    id: 2,
    title: "IN THE CAN Jake Paul rematch and James Canelo over failed fight",
    category: "Boxing",
    imageUrl: "https://i.imgur.com/JaCBiCp.jpg",
    timestamp: "5 hours ago",
    readTime: "3 min read",
    content: "Jake Paul has called for a rematch with Canelo Alvarez after their failed fight negotiations.",
  },
  {
    id: 3,
    title: "READY PLAYER RON Walker's wife Annie poses behind wheel of £70k Mercedes",
    category: "Football",
    imageUrl: "https://i.imgur.com/7BjQIEE.jpg",
    timestamp: "Yesterday",
    readTime: "3 min read",
    content:
      "Annie Walker, wife of football star Ron Walker, has been spotted posing behind the wheel of a £70,000 Mercedes.",
  },
  {
    id: 4,
    title: "KANE NOT BE SERIOUS Kane tipped to make stunning Liverpool transfer by Premier League legend",
    category: "Football",
    imageUrl: "https://i.imgur.com/JfVDTLs.jpg",
    timestamp: "3 hours ago",
    readTime: "3 min read",
    content: "Harry Kane has been tipped to make a stunning transfer to Liverpool by a Premier League legend.",
  },
  {
    id: 5,
    title: "DONE FER Fernandes left red-faced over antics seconds before Ronaldo's worst penalty",
    category: "Football",
    imageUrl: "https://i.imgur.com/QVZLMGj.jpg",
    timestamp: "1 day ago",
    readTime: "3 min read",
    content:
      "Bruno Fernandes was left red-faced after his antics seconds before Cristiano Ronaldo's worst penalty miss.",
  },
]

const AllNewsScreen = ({ navigation }) => {
  const theme = useTheme()
  const [news, setNews] = useState(sunNewsContent)
  const [selectedMainCategory, setSelectedMainCategory] = useState("Sport")
  const [selectedSubCategory, setSelectedSubCategory] = useState("Football")
  const [activeBottomTab, setActiveBottomTab] = useState("allNews")

  const handleMainCategoryPress = (category) => {
    setSelectedMainCategory(category)
    // In a real app, you would fetch subcategories for this main category
  }

  const handleSubCategoryPress = (category) => {
    setSelectedSubCategory(category)
    // In a real app, you would fetch news for this subcategory
  }

  const handleNewsPress = (article) => {
    navigation.navigate("Article", { article })
  }

  const handleBottomTabPress = (tab) => {
    if (tab === "today") {
      navigation.navigate("Home")
    } else if (tab === "search") {
      navigation.navigate("Search")
    } else {
      setActiveBottomTab(tab)
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
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.Primary.Resting }]}>
        <Typography variant="h4" color={theme.colors.Text.Inverse} style={styles.headerTitle}>
          All News
        </Typography>
      </View>

      {/* Main Category Tabs */}
      <Tabs tabs={CATEGORIES} activeTab={selectedMainCategory} onTabPress={handleMainCategoryPress} variant="primary" />

      {/* Sub Category Tabs */}
      <Tabs
        tabs={SPORT_CATEGORIES}
        activeTab={selectedSubCategory}
        onTabPress={handleSubCategoryPress}
        variant="secondary"
      />

      {/* News List */}
      <FlatList
        data={news}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CardHorizontal
            id={item.id}
            title={item.title}
            imageUrl={item.imageUrl}
            category={item.category}
            timestamp={item.timestamp}
            readTime={item.readTime}
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
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: {
    fontWeight: "bold",
  },
  newsList: {
    paddingHorizontal: 16,
  },
})

export default AllNewsScreen

