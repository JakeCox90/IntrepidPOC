import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, FlatList } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import NewsCard from "../components/NewsCard"
import { mockNews } from "../services/newsService"

const CategoryScreen = ({ route, navigation }) => {
  const { category } = route.params

  const handleNewsPress = (article) => {
    navigation.navigate("Article", { article })
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{category.name}</Text>
        <View style={{ width: 24 }} />
      </View>

      <FlatList
        data={mockNews}
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
  },
  newsList: {
    padding: 16,
  },
})

export default CategoryScreen

