"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from "react-native"
import { Ionicons, Feather } from "@expo/vector-icons"

const ArticleScreen = ({ route, navigation }) => {
  const { article } = route.params
  const [summaryExpanded, setSummaryExpanded] = useState(false)

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#007AFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Article</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.container}>
        {/* Tags */}
        <View style={styles.tagsContainer}>
          <View style={styles.tag}>
            <Text style={styles.tagText}>{article.category.toUpperCase()}</Text>
          </View>
        </View>

        {/* Title */}
        <Text style={styles.title}>{article.title}</Text>

        {/* Reading time */}
        <View style={styles.readingTimeContainer}>
          <Ionicons name="time-outline" size={14} color="#666" />
          <Text style={styles.readingTime}>3 min read</Text>
        </View>

        {/* Author info */}
        <View style={styles.authorContainer}>
          <Text style={styles.authorName}>Elizabeth Rosenberg</Text>
          <Text style={styles.publishDate}>{article.timestamp}</Text>
        </View>

        {/* Image placeholder */}
        <View style={styles.imagePlaceholder}>
          <Feather name="image" size={24} color="#999" />
        </View>

        {/* Summary section */}
        <View style={styles.summaryContainer}>
          <TouchableOpacity style={styles.summaryHeader} onPress={() => setSummaryExpanded(!summaryExpanded)}>
            <Text style={styles.summaryTitle}>Summary</Text>
            <Ionicons name={summaryExpanded ? "remove" : "add"} size={20} color="#007AFF" />
          </TouchableOpacity>

          {summaryExpanded && (
            <View style={styles.summaryContent}>
              <Text style={styles.summaryText}>Key points from the article will appear here when expanded.</Text>
            </View>
          )}
        </View>

        {/* Listen button */}
        <TouchableOpacity style={styles.listenButton}>
          <Ionicons name="play" size={18} color="#000" />
          <Text style={styles.listenButtonText}>Listen to this article</Text>
        </TouchableOpacity>

        {/* Article content */}
        <View style={styles.articleContent}>
          <Text style={styles.paragraph}>{article.content}</Text>
        </View>

        {/* Bottom spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 16,
    color: "#000",
    fontWeight: "400",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },
  tagsContainer: {
    flexDirection: "row",
    marginTop: 16,
    marginBottom: 8,
  },
  tag: {
    backgroundColor: "#E6F0FF",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 8,
  },
  tagText: {
    color: "#007AFF",
    fontSize: 12,
    fontWeight: "600",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    lineHeight: 28,
    marginBottom: 8,
    color: "#000",
  },
  readingTimeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  readingTime: {
    fontSize: 12,
    color: "#666",
    marginLeft: 4,
  },
  authorContainer: {
    marginBottom: 16,
  },
  authorName: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000",
  },
  publishDate: {
    fontSize: 12,
    color: "#666",
  },
  imagePlaceholder: {
    width: "100%",
    height: 200,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    borderRadius: 4,
  },
  summaryContainer: {
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 8,
    marginBottom: 16,
  },
  summaryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
  },
  summaryContent: {
    padding: 12,
    paddingTop: 0,
  },
  summaryText: {
    fontSize: 14,
    color: "#444",
    lineHeight: 20,
  },
  listenButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  listenButtonText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#000",
  },
  articleContent: {
    marginBottom: 16,
  },
  paragraph: {
    fontSize: 16,
    color: "#333",
    lineHeight: 24,
    marginBottom: 16,
  },
  bottomSpacing: {
    height: 20,
  },
})

export default ArticleScreen

