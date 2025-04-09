"use client"
import { useState, useRef } from "react"
import { View, StyleSheet, Animated, PanResponder, Dimensions, TouchableOpacity, StatusBar } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useTheme } from "../theme/ThemeProvider"
import Typography from "../components/Typography"
import Flag from "../components/Flag"

const { width, height } = Dimensions.get("window")
const SWIPE_THRESHOLD = width * 0.25
const SWIPE_OUT_DURATION = 300
const CARD_WIDTH = width - 32
const CARD_HEIGHT = height * 0.6

const COMMON_FLAGS = [
  "EXCLUSIVE",
  "BREAKING",
  "REVEALED",
  "PICTURED",
  "WATCH",
  "UPDATED",
  "LIVE",
  "SHOCK",
  "TRAGIC",
  "HORROR",
  "URGENT",
  "WARNING",
]

const ArticleSwipeScreen = ({ route, navigation }) => {
  const { articles } = route.params || { articles: [] }
  const [currentIndex, setCurrentIndex] = useState(0)
  const [allSwiped, setAllSwiped] = useState(false)
  const theme = useTheme()
  const isSwipingRef = useRef(false)

  // Create animated values for card animations
  const position = useRef(new Animated.ValueXY()).current

  // Create animated values for each card in the stack
  const cardAnimations = useRef({
    card1: {
      scale: new Animated.Value(1),
      translateY: new Animated.Value(0),
      opacity: new Animated.Value(1),
    },
    card2: {
      scale: new Animated.Value(0.95),
      translateY: new Animated.Value(10),
      opacity: new Animated.Value(0.7),
    },
    card3: {
      scale: new Animated.Value(0.9),
      translateY: new Animated.Value(20),
      opacity: new Animated.Value(0.4),
    },
  }).current

  // Create pan responder for the top card
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => !isSwipingRef.current,
      onMoveShouldSetPanResponder: (_, gesture) => {
        return !isSwipingRef.current && Math.abs(gesture.dx) > Math.abs(gesture.dy * 3)
      },
      onPanResponderGrant: () => {
        position.setOffset({
          x: position.x._value,
          y: position.y._value,
        })
        position.setValue({ x: 0, y: 0 })
      },
      onPanResponderMove: (_, gesture) => {
        position.setValue({ x: gesture.dx, y: 0 })

        // As the top card moves, gradually animate the second card
        const dragRatio = Math.min(Math.abs(gesture.dx) / (SWIPE_THRESHOLD * 2), 0.5)
        cardAnimations.card2.scale.setValue(0.95 + 0.05 * dragRatio)
        cardAnimations.card2.translateY.setValue(10 - 10 * dragRatio)
        cardAnimations.card2.opacity.setValue(0.7 + 0.3 * dragRatio)
      },
      onPanResponderRelease: (_, gesture) => {
        position.flattenOffset()

        if (gesture.dx > SWIPE_THRESHOLD) {
          swipeCard("right")
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          swipeCard("left")
        } else {
          resetPosition()
        }
      },
    }),
  ).current

  // Function to swipe the card
  const swipeCard = (direction) => {
    if (isSwipingRef.current) return
    isSwipingRef.current = true

    const x = direction === "right" ? width + 100 : -width - 100

    // Create a sequence of animations
    Animated.parallel([
      // 1. Animate the top card out
      Animated.timing(position, {
        toValue: { x, y: 0 },
        duration: SWIPE_OUT_DURATION,
        useNativeDriver: true,
      }),

      // 2. Animate the second card to the front position
      Animated.timing(cardAnimations.card2.scale, {
        toValue: 1,
        duration: SWIPE_OUT_DURATION,
        useNativeDriver: true,
      }),
      Animated.timing(cardAnimations.card2.translateY, {
        toValue: 0,
        duration: SWIPE_OUT_DURATION,
        useNativeDriver: true,
      }),
      Animated.timing(cardAnimations.card2.opacity, {
        toValue: 1,
        duration: SWIPE_OUT_DURATION,
        useNativeDriver: true,
      }),

      // 3. Animate the third card to the second position
      Animated.timing(cardAnimations.card3.scale, {
        toValue: 0.95,
        duration: SWIPE_OUT_DURATION,
        useNativeDriver: true,
      }),
      Animated.timing(cardAnimations.card3.translateY, {
        toValue: 10,
        duration: SWIPE_OUT_DURATION,
        useNativeDriver: true,
      }),
      Animated.timing(cardAnimations.card3.opacity, {
        toValue: 0.7,
        duration: SWIPE_OUT_DURATION,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // After animation completes, update the index and reset animations
      setCurrentIndex((prevIndex) => {
        const nextIndex = prevIndex + 1
        if (nextIndex >= articles.length) {
          setAllSwiped(true)
        }
        return nextIndex
      })

      // Reset position for the next card
      position.setValue({ x: 0, y: 0 })

      // Reset card animations to their default values
      cardAnimations.card1.scale.setValue(1)
      cardAnimations.card1.translateY.setValue(0)
      cardAnimations.card1.opacity.setValue(1)

      cardAnimations.card2.scale.setValue(0.95)
      cardAnimations.card2.translateY.setValue(10)
      cardAnimations.card2.opacity.setValue(0.7)

      cardAnimations.card3.scale.setValue(0.9)
      cardAnimations.card3.translateY.setValue(20)
      cardAnimations.card3.opacity.setValue(0.4)

      isSwipingRef.current = false
    })
  }

  // Function to reset the card position when swipe is canceled
  const resetPosition = () => {
    Animated.parallel([
      // Reset the top card position
      Animated.spring(position, {
        toValue: { x: 0, y: 0 },
        friction: 5,
        tension: 40,
        useNativeDriver: true,
      }),

      // Reset the second card
      Animated.spring(cardAnimations.card2.scale, {
        toValue: 0.95,
        friction: 5,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.spring(cardAnimations.card2.translateY, {
        toValue: 10,
        friction: 5,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.spring(cardAnimations.card2.opacity, {
        toValue: 0.7,
        friction: 5,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start()
  }

  // Get the animated style for the top card
  const getCardStyle = (index) => {
    if (index === 0) {
      // Top card gets swipe animation
      const rotate = position.x.interpolate({
        inputRange: [-width * 1.5, 0, width * 1.5],
        outputRange: ["-10deg", "0deg", "10deg"],
      })

      return {
        transform: [
          { translateX: position.x },
          { rotate },
          { scale: cardAnimations.card1.scale },
          { translateY: cardAnimations.card1.translateY },
        ],
        opacity: cardAnimations.card1.opacity,
      }
    } else if (index === 1) {
      // Second card
      return {
        transform: [{ scale: cardAnimations.card2.scale }, { translateY: cardAnimations.card2.translateY }],
        opacity: cardAnimations.card2.opacity,
      }
    } else {
      // Third card
      return {
        transform: [{ scale: cardAnimations.card3.scale }, { translateY: cardAnimations.card3.translateY }],
        opacity: cardAnimations.card3.opacity,
      }
    }
  }

  const handleReload = () => {
    setCurrentIndex(0)
    setAllSwiped(false)
    position.setValue({ x: 0, y: 0 })
  }

  const handleBackPress = () => {
    navigation.goBack()
  }

  const handleArticlePress = (article) => {
    if (!isSwipingRef.current) {
      navigation.navigate("TodayArticle", { article })
    }
  }

  // Render a single card
  const renderCard = (article, index) => {
    if (!article) return null

    const cardStyle = [
      styles.cardContainer,
      {
        zIndex: 3 - index,
      },
      getCardStyle(index),
    ]

    return (
      <Animated.View
        key={`card-${currentIndex + index}`}
        style={cardStyle}
        {...(index === 0 ? panResponder.panHandlers : {})}
      >
        <TouchableOpacity
          style={styles.card}
          activeOpacity={0.9}
          onPress={() => handleArticlePress(article)}
          disabled={isSwipingRef.current || index !== 0}
        >
          {/* Card background image */}
          <Animated.Image source={{ uri: article.imageUrl }} style={styles.cardImage} resizeMode="cover" />

          {/* Dark overlay */}
          <View style={styles.cardOverlay} />

          {/* Card content */}
          <View style={styles.cardContent}>
            {article.category && (
              <View style={styles.categoryContainer}>
                <Flag text={article.category} category={article.category} variant="filled" />
              </View>
            )}

            {article.flag && COMMON_FLAGS.includes(article.flag.toUpperCase()) && (
              <View style={styles.flagContainer}>
                <Flag text={article.flag} variant="filled" />
              </View>
            )}

            <Typography variant="h5" color={theme.colors.Text.Inverse} style={styles.cardTitle} numberOfLines={3}>
              {article.title}
            </Typography>
          </View>
        </TouchableOpacity>
      </Animated.View>
    )
  }

  // Render the stack of cards
  const renderCards = () => {
    if (allSwiped) {
      return (
        <View style={styles.emptyStateContainer}>
          <Ionicons name="checkmark-circle-outline" size={80} color={theme.colors.Success.Resting} />
          <Typography variant="h5" color={theme.colors.Text.Primary} style={styles.emptyStateTitle}>
            That's all!
          </Typography>
          <Typography variant="body-01" color={theme.colors.Text.Secondary} style={styles.emptyStateSubtitle}>
            You've seen all the articles
          </Typography>
          <TouchableOpacity
            style={[styles.reloadButton, { backgroundColor: theme.colors.Primary.Resting }]}
            onPress={handleReload}
          >
            <Typography variant="button" color={theme.colors.Text.Inverse}>
              Tap here to reload
            </Typography>
          </TouchableOpacity>
        </View>
      )
    }

    if (articles.length === 0) {
      return (
        <View style={styles.emptyStateContainer}>
          <Ionicons name="alert-circle-outline" size={80} color={theme.colors.Error.Resting} />
          <Typography variant="h5" color={theme.colors.Text.Primary} style={styles.emptyStateTitle}>
            No articles found
          </Typography>
          <TouchableOpacity
            style={[styles.reloadButton, { backgroundColor: theme.colors.Primary.Resting }]}
            onPress={handleBackPress}
          >
            <Typography variant="button" color={theme.colors.Text.Inverse}>
              Go back
            </Typography>
          </TouchableOpacity>
        </View>
      )
    }

    // Render up to 3 cards in the stack
    return (
      <View style={styles.cardsStack}>
        {/* Render cards from back to front */}
        {[2, 1, 0]
          .map((index) => {
            const articleIndex = currentIndex + index
            if (articleIndex < articles.length) {
              return renderCard(articles[articleIndex], index)
            }
            return null
          })
          .filter(Boolean)}
      </View>
    )
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.Surface.Primary }]}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} />

      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.Surface.Primary }]}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Ionicons name="chevron-back" size={24} color={theme.colors.Text.Primary} />
        </TouchableOpacity>

        <View style={styles.titleContainer}>
          <Typography variant="subtitle-01" color={theme.colors.Text.Primary} numberOfLines={1}>
            Daily Digest
          </Typography>
        </View>
      </View>

      {/* Cards */}
      <View style={styles.cardsContainer}>{renderCards()}</View>

      {/* Progress indicator and swipe instruction below cards */}
      {!allSwiped && articles.length > 0 && (
        <View style={styles.bottomContainer}>
          {/* Swipe instruction */}
          <View style={styles.swipeInstructionContainer}>
            <Typography variant="body-02" color={theme.colors.Text.Secondary} style={styles.swipeInstructionText}>
              Swipe cards left or right to browse articles
            </Typography>
          </View>

          {/* Progress indicator */}
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              {articles.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.progressDot,
                    {
                      backgroundColor:
                        index < currentIndex ? theme.colors.Primary.Resting : theme.colors.Border["Border-Primary"],
                      width: index === currentIndex ? 24 : 8,
                    },
                  ]}
                />
              ))}
            </View>
          </View>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 44, // Account for status bar
    paddingBottom: 10,
    paddingHorizontal: 16,
  },
  backButton: {
    marginRight: 16,
    width: 40,
    height: 40,
    justifyContent: "center",
  },
  titleContainer: {
    flex: 1,
  },
  bottomContainer: {
    width: "100%",
    alignItems: "center",
    paddingBottom: 24,
  },
  progressContainer: {
    alignItems: "center",
    paddingTop: 16,
  },
  progressBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  progressDot: {
    height: 8,
    borderRadius: 4,
  },
  swipeInstructionContainer: {
    alignItems: "center",
    paddingBottom: 8,
  },
  swipeInstructionText: {
    textAlign: "center",
  },
  cardsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cardsStack: {
    position: "relative",
    width: CARD_WIDTH,
    height: CARD_HEIGHT + 30,
    alignItems: "center",
  },
  cardContainer: {
    position: "absolute",
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 16,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  card: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#000",
  },
  cardImage: {
    width: "100%",
    height: "100%",
  },
  cardOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    borderRadius: 16,
  },
  cardContent: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
  },
  categoryContainer: {
    marginBottom: 8,
    alignSelf: "flex-start",
  },
  flagContainer: {
    marginBottom: 8,
    alignSelf: "flex-start",
  },
  cardTitle: {
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  emptyStateContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  emptyStateTitle: {
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateSubtitle: {
    textAlign: "center",
    marginBottom: 24,
  },
  reloadButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
})

export default ArticleSwipeScreen
