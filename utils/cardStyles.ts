import { StyleSheet } from "react-native"
import { Dimensions } from "react-native"

const { width } = Dimensions.get("window")

export const cardStyles = StyleSheet.create({
  // Common card styles
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    overflow: "hidden",
  },

  // Hero card specific
  heroContainer: {
    width: width - 32,
    marginBottom: 16,
  },
  heroImage: {
    width: "100%",
    height: 200,
  },
  heroContent: {
    padding: 16,
  },

  // Article card specific
  articleContainer: {
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  articleContent: {
    flexDirection: "row",
    marginBottom: 12,
  },
  articleTextContent: {
    flex: 1,
    marginRight: 12,
  },
  articleImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },

  // Horizontal card specific
  horizontalContainer: {
    borderRadius: 16,
    marginBottom: 16,
  },
  horizontalCardContent: {
    padding: 16,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  horizontalImage: {
    width: 100,
    height: 100,
    marginRight: 16,
  },
  horizontalTextContent: {
    flex: 1,
  },

  // CatchUp card specific
  catchUpContainer: {
    width: 280,
    height: 160,
    borderRadius: 12,
    marginRight: 12,
  },
  catchUpImageContainer: {
    width: "100%",
    height: "100%",
    position: "relative",
  },
  catchUpOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 16,
  },

  // Common text elements
  flagContainer: {
    marginBottom: 8,
  },
  category: {
    marginBottom: 4,
  },
  title: {
    marginBottom: 8,
  },
  subtitle: {
    marginBottom: 12,
  },

  // Footer elements
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  readTimeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  readTime: {
    marginLeft: 6,
  },
  actions: {
    flexDirection: "row",
  },
  actionButton: {
    marginLeft: 16,
    padding: 4,
  },

  // Title elements
  titleContainer: {
    flexDirection: "column",
  },
  prefix: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 4,
  },
})

