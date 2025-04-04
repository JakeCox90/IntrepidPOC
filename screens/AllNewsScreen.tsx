"use client"

import { useState } from "react"
import { View, FlatList, StyleSheet, SafeAreaView, Text, ScrollView, TouchableOpacity } from "react-native"
import { useTheme } from "../theme/ThemeProvider"
import CardHorizontal from "../components/CardHorizontal"
import { StatusBar } from "expo-status-bar"

// Sample news content from The Sun website
const sunNewsContent = [
  {
    id: 1,
    title: "IN THE CAN Jake Paul reveals Tommy Fury rematch and slams Canelo over failed fight",
    category: "Boxing",
    imageUrl: "https://i.imgur.com/JaCBiCp.jpg",
    timestamp: "5 hours ago",
    readTime: "3 min read",
    content:
      "Jake Paul has revealed he is in talks for a rematch with Tommy Fury and slammed Canelo Alvarez for not agreeing to fight him.\n\nThe YouTuber-turned-boxer lost to Fury by split decision in February 2023, his first defeat in the ring.\n\nPaul has since bounced back with victories over UFC legend Nate Diaz and veteran boxer Andre August, and is now eyeing a second shot at Fury.",
  },
  {
    id: 2,
    title: "MASTERBLASTER Tottenham Premier League chief Richard Masters with cheeky message on VAR",
    category: "Football",
    imageUrl: "https://i.imgur.com/ZLdnUOH.jpg",
    timestamp: "2 hours ago",
    readTime: "3 min read",
    content:
      "Premier League chief Richard Masters has sent a cheeky message about VAR after Tottenham's controversial win over Liverpool.\n\nThe Reds were denied a legitimate goal when Luis Diaz was wrongly flagged offside, with VAR failing to overturn the decision.\n\nLiverpool went on to lose the match 2-1, with Jurgen Klopp left fuming at the officials.",
  },
  {
    id: 3,
    title: "READY PLAYER RON Walker's wife Annie poses behind wheel of £70k Mercedes",
    category: "Football",
    imageUrl: "https://i.imgur.com/7BjQIEE.jpg",
    timestamp: "Yesterday",
    readTime: "3 min read",
    content:
      "Annie Walker, wife of football star Ron Walker, has been spotted posing behind the wheel of a £70,000 Mercedes.\n\nThe model and influencer shared photos of her new luxury vehicle on Instagram, captioning the post 'New wheels day! Thanks to my amazing husband for the surprise.'\n\nThe couple, who married last summer, are known for their lavish lifestyle and social media presence.",
  },
  {
    id: 4,
    title: "KANE NOT BE SERIOUS Kane tipped to make stunning Liverpool transfer by Premier League legend",
    category: "Football",
    imageUrl: "https://i.imgur.com/JfVDTLs.jpg",
    timestamp: "3 hours ago",
    readTime: "3 min read",
    content:
      "Harry Kane has been tipped to make a stunning transfer to Liverpool by a Premier League legend.\n\nThe England captain only joined Bayern Munich last summer in a £100million move from Tottenham, but has been linked with a return to the Premier League.\n\nDespite scoring 36 goals in 36 games for the German giants, Kane is yet to win a trophy in his professional career.",
  },
  {
    id: 5,
    title: "DONE FER Fernandes left red-faced over antics seconds before Ronaldo's worst penalty",
    category: "Football",
    imageUrl: "https://i.imgur.com/QVZLMGj.jpg",
    timestamp: "1 day ago",
    readTime: "3 min read",
    content:
      "Bruno Fernandes was left red-faced after his antics seconds before Cristiano Ronaldo's penalty miss against Slovenia.\n\nThe Portugal captain was seen gesturing to the crowd to make noise and putting pressure on the goalkeeper before Ronaldo stepped up.\n\nBut his teammate then saw his spot-kick saved by Jan Oblak, forcing the Euro 2024 last-16 tie to go to extra time.",
  },
]

// Main categories
const MAIN_CATEGORIES = ["News", "Sport", "Politics", "Showbiz"]

// Subcategories for each main category
const SUBCATEGORIES = {
  News: ["UK News", "World News", "Health", "Money"],
  Sport: ["Football", "Rugby", "Cricket", "Boxing", "F1", "Tennis", "Golf"],
  Politics: ["UK Politics", "US Politics", "Brexit"],
  Showbiz: ["TV", "Film", "Music", "Celebrity"],
}

const AllNewsScreen = ({ navigation }) => {
  const theme = useTheme()
  const [news, setNews] = useState(sunNewsContent)
  const [selectedMainCategory, setSelectedMainCategory] = useState("Sport")
  const [selectedSubCategory, setSelectedSubCategory] = useState("Football")

  const handleMainCategoryPress = (category) => {
    if (!category) return
    setSelectedMainCategory(category)
    // Safely get subcategories
    const subcategories = SUBCATEGORIES[category] || []
    if (subcategories.length > 0) {
      setSelectedSubCategory(subcategories[0])
    }
  }

  const handleSubCategoryPress = (category) => {
    if (!category) return
    setSelectedSubCategory(category)
  }

  const handleNewsPress = (article) => {
    if (!article) return
    // Make sure article has content before navigating
    const fullArticle = article.content
      ? article
      : {
          ...article,
          content:
            "This is a placeholder content for the article. The actual content will be fetched from The Sun website in a production environment.",
        }
    navigation.navigate("Article", { article: fullArticle })
  }

  const handleBookmark = (id) => {
    if (!id) return
    console.log("Bookmark article:", id)
  }

  const handleShare = (id) => {
    if (!id) return
    console.log("Share article:", id)
  }

  // Safely get subcategories
  const subcategories = SUBCATEGORIES[selectedMainCategory] || []

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />

      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.Primary.Resting }]}>
        <Text style={styles.headerTitle}>All News</Text>
      </View>

      {/* Main Category Tabs */}
      <View style={[styles.mainCategoryContainer, { backgroundColor: theme.colors.Primary.Resting }]}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.mainCategoryScrollContent}
        >
          {MAIN_CATEGORIES.map((category) => (
            <TouchableOpacity
              key={category}
              style={[styles.mainCategoryTab, selectedMainCategory === category && styles.selectedMainCategoryTab]}
              onPress={() => handleMainCategoryPress(category)}
            >
              <Text
                style={[
                  styles.mainCategoryText,
                  selectedMainCategory === category
                    ? styles.selectedMainCategoryText
                    : { color: "rgba(255, 255, 255, 0.7)" },
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Sub Category Tabs */}
      <View style={styles.subCategoryContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.subCategoryScrollContent}
        >
          {subcategories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[styles.subCategoryTab, selectedSubCategory === category && styles.selectedSubCategoryTab]}
              onPress={() => handleSubCategoryPress(category)}
            >
              <Text
                style={[
                  styles.subCategoryText,
                  selectedSubCategory === category
                    ? { color: theme.colors.Text.Primary, fontWeight: "600" }
                    : { color: theme.colors.Text.Secondary },
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* News List */}
      <FlatList
        data={news}
        keyExtractor={(item) => (item.id ? item.id.toString() : Math.random().toString())}
        renderItem={({ item }) => (
          <CardHorizontal
            id={item.id}
            title={item.title}
            imageUrl={item.imageUrl}
            category={item.category}
            readTime={item.readTime}
            onPress={() => handleNewsPress(item)}
            onBookmark={() => handleBookmark(item.id)}
            onShare={() => handleShare(item.id)}
          />
        )}
        contentContainerStyle={styles.newsList}
      />
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
  mainCategoryContainer: {
    paddingVertical: 16,
  },
  mainCategoryScrollContent: {
    paddingHorizontal: 16,
  },
  mainCategoryTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
  },
  selectedMainCategoryTab: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 20,
  },
  mainCategoryText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#FFFFFF",
  },
  selectedMainCategoryText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  subCategoryContainer: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  subCategoryScrollContent: {
    paddingHorizontal: 16,
  },
  subCategoryTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
  },
  selectedSubCategoryTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#E03A3A",
  },
  subCategoryText: {
    fontSize: 16,
    fontWeight: "500",
  },
  newsList: {
    padding: 16,
  },
})

export default AllNewsScreen

