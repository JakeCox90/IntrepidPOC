'use client';
import React, { useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  PanResponder,
  Dimensions,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeProvider';
import Typography from '../components/Typography';
import Flag from '../components/Flag';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Define article interface
interface Article {
  id: string;
  title: string;
  imageUrl: string;
  category?: string;
  flag?: string;
  content?: string;
  publishDate?: string;
  readTime?: string;
}

// Define route params interface
interface ArticleSwipeScreenParams {
  articles: Article[];
}

// Define props interface
interface ArticleSwipeScreenProps {
  route: RouteProp<{ params: ArticleSwipeScreenParams }, 'params'>;
  navigation: NativeStackNavigationProp<any>;
}

// Constants
const { width, height } = Dimensions.get('window');
const SWIPE_THRESHOLD = width * 0.25;
const SWIPE_OUT_DURATION = 300;
const CARD_WIDTH = width - 32;
const CARD_HEIGHT = height * 0.6;

const COMMON_FLAGS = [
  'EXCLUSIVE',
  'BREAKING',
  'REVEALED',
  'PICTURED',
  'WATCH',
  'UPDATED',
  'LIVE',
  'SHOCK',
  'TRAGIC',
  'HORROR',
  'URGENT',
  'WARNING',
];
const ArticleSwipeScreen: React.FC<ArticleSwipeScreenProps> = ({ route, navigation }) => {
  const { articles = [] } = route.params || { articles: [] };
  const [currentIndex, setCurrentIndex] = useState(0);
  const [allSwiped, setAllSwiped] = useState(false);
  const theme = useTheme();
  const isSwipingRef = useRef<boolean>(false);

  // Create animated values for card animations
  const position = useRef(new Animated.ValueXY()).current;

  // Define card animation type
  interface CardAnimation {
    scale: Animated.Value;
    translateY: Animated.Value;
    opacity: Animated.Value;
  }

  // Create animated values for each card in the stack
  const cardAnimations = useRef<{
    card1: CardAnimation;
    card2: CardAnimation;
    card3: CardAnimation;
  }>({
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
  }).current;
  // Create pan responder for the top card
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => !isSwipingRef.current,
      onMoveShouldSetPanResponder: (_, gesture) => {
        return !isSwipingRef.current && Math.abs(gesture.dx) > Math.abs(gesture.dy * 3);
      },
      onPanResponderGrant: () => {
        position.setOffset({
          x: position.x._value,
          y: position.y._value,
        });
        position.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: (_, gesture) => {
        position.setValue({ x: gesture.dx, y: 0 });

        // As the top card moves, gradually animate the second card
        const dragRatio = Math.min(Math.abs(gesture.dx) / (SWIPE_THRESHOLD * 2), 0.5);
        cardAnimations.card2.scale.setValue(0.95 + 0.05 * dragRatio);
        cardAnimations.card2.translateY.setValue(10 - 10 * dragRatio);
        cardAnimations.card2.opacity.setValue(0.7 + 0.3 * dragRatio);
      },
      onPanResponderRelease: (_, gesture) => {
        position.flattenOffset();

        if (gesture.dx > SWIPE_THRESHOLD) {
          swipeCard('right');
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          swipeCard('left');
        } else {
          resetPosition();
        }
      },
    }),
  ).current;

  // Function to swipe the card
  const swipeCard = (direction: 'left' | 'right'): void => {
    if (isSwipingRef.current) return;
    isSwipingRef.current = true;

    const x = direction === 'right' ? width + 100 : -width - 100;

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
      setCurrentIndex(prevIndex => {
        const nextIndex = prevIndex + 1;
        if (nextIndex >= articles.length) {
          setAllSwiped(true);
        }
        return nextIndex;
      });

      // Reset position for the next card
      position.setValue({ x: 0, y: 0 });

      // Reset card animations to their default values
      cardAnimations.card1.scale.setValue(1);
      cardAnimations.card1.translateY.setValue(0);
      cardAnimations.card1.opacity.setValue(1);

      cardAnimations.card2.scale.setValue(0.95);
      cardAnimations.card2.translateY.setValue(10);
      cardAnimations.card2.opacity.setValue(0.7);

      cardAnimations.card3.scale.setValue(0.9);
      cardAnimations.card3.translateY.setValue(20);
      cardAnimations.card3.opacity.setValue(0.4);

      isSwipingRef.current = false;
    });
  };

  // Function to reset the card position when swipe is canceled
  const resetPosition = (): void => {
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
    ]).start();
  };

  // Get the animated style for the top card
  const getCardStyle = (index: number): object => {
    if (index === 0) {
      // Top card gets swipe animation
      const rotate = position.x.interpolate({
        inputRange: [-width * 1.5, 0, width * 1.5],
        outputRange: ['-10deg', '0deg', '10deg'],
      });

      return {
        transform: [
          { translateX: position.x },
          { rotate },
          { scale: cardAnimations.card1.scale },
          { translateY: cardAnimations.card1.translateY },
        ],
        opacity: cardAnimations.card1.opacity,
      };
    } else if (index === 1) {
      // Second card
      return {
        transform: [
          { scale: cardAnimations.card2.scale },
          { translateY: cardAnimations.card2.translateY },
        ],
        opacity: cardAnimations.card2.opacity,
      };
    } else {
      // Third card
      return {
        transform: [
          { scale: cardAnimations.card3.scale },
          { translateY: cardAnimations.card3.translateY },
        ],
        opacity: cardAnimations.card3.opacity,
      };
    }
  };

  const handleReload = (): void => {
    setCurrentIndex(0);
    setAllSwiped(false);
    position.setValue({ x: 0, y: 0 });
  };

  const handleBackPress = (): void => {
    navigation.goBack();
  };

  const handleArticlePress = (article: Article): void => {
    if (!isSwipingRef.current) {
      navigation.navigate('TodayArticle', { article });
    }
  };
  // Render a single card
  const renderCard = (article: Article, index: number): React.ReactNode => {
    if (!article) return null;

    const cardStyle = [
      styles.cardContainer,
      {
        zIndex: 3 - index,
      },
      getCardStyle(index),
    ];

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
          <Animated.Image
            source={{ uri: article.imageUrl }}
            style={styles.cardImage}
            resizeMode="cover"
          />

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

            <Typography
              variant="h5"
              color={theme.colors.Text.Inverse}
              style={styles.cardTitle}
              numberOfLines={3}
            >
              {article.title}
            </Typography>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  // Render the stack of cards
  const renderCards = (): React.ReactNode => {
    if (allSwiped) {
      return (
        <View style={styles.emptyStateContainer}>
          <Ionicons
            name="checkmark-circle-outline"
            size={80}
            color={theme.colors.Success.Resting}
          />
          <Typography variant="h5" color={theme.colors.Text.Primary} style={styles.emptyStateTitle}>
            That&apos;s all!
          </Typography>
          <Typography
            variant="body-01"
            color={theme.colors.Text.Secondary}
            style={styles.emptyStateSubtitle}
          >
            You&apos;ve seen all the articles
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
      );
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
      );
    }

    // Render up to 3 cards in the stack
    return (
      <View style={styles.cardsStack}>
        {/* Render cards from back to front */}
        {[2, 1, 0]
          .map(index => {
            const articleIndex = currentIndex + index;
            if (articleIndex < articles.length) {
              return renderCard(articles[articleIndex], index);
            }
            return null;
          })
          .filter(Boolean)}
      </View>
    );
  };

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
            <Typography
              variant="body-02"
              color={theme.colors.Text.Secondary}
              style={styles.swipeInstructionText}
            >
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
                    index === currentIndex ? styles.activeDot : null,
                    {
                      backgroundColor:
                        index < currentIndex
                          ? theme.colors.Primary.Resting
                          : theme.colors.Border['Border-Primary'],
                    },
                  ]}
                />
              ))}
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  activeDot: {
    width: 24,
  },
  backButton: {
    height: 40,
    justifyContent: 'center',
    marginRight: 16,
    width: 40,
  },
  bottomContainer: {
    alignItems: 'center',
    paddingBottom: 24,
    width: '100%',
  },
  card: {
    backgroundColor: 'transparent',
    borderRadius: 16,
    height: '100%',
    overflow: 'hidden',
    width: '100%',
  },
  cardContainer: {
    borderRadius: 16,
    elevation: 3,
    height: CARD_HEIGHT,
    overflow: 'hidden',
    position: 'absolute',
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    width: CARD_WIDTH,
  },
  cardContent: {
    bottom: 0,
    left: 0,
    padding: 20,
    position: 'absolute',
    right: 0,
  },
  cardImage: {
    height: '100%',
    width: '100%',
  },
  cardOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Use theme.colors.Surface['Overlay-01'] instead
    borderRadius: 16,
  },
  cardTitle: {
    textShadowColor: 'rgba(0, 0, 0, 0.5)', // Use theme.colors.Surface['Overlay-02'] instead
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  cardsContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  cardsStack: {
    alignItems: 'center',
    height: CARD_HEIGHT + 30,
    position: 'relative',
    width: CARD_WIDTH,
  },
  categoryContainer: {
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  container: {
    flex: 1,
  },
  emptyStateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  emptyStateSubtitle: {
    marginBottom: 24,
    textAlign: 'center',
  },
  emptyStateTitle: {
    marginBottom: 8,
    marginTop: 16,
  },
  flagContainer: {
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: 10,
    paddingHorizontal: 16,
    paddingTop: 44, // Account for status bar
  },
  progressBar: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 4,
    justifyContent: 'center',
  },
  progressContainer: {
    alignItems: 'center',
    paddingTop: 16,
  },
  progressDot: {
    borderRadius: 4,
    height: 8,
    width: 8,
  },
  reloadButton: {
    borderRadius: 8,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  swipeInstructionContainer: {
    alignItems: 'center',
    paddingBottom: 8,
  },
  swipeInstructionText: {
    textAlign: 'center',
  },
  titleContainer: {
    flex: 1,
  },
});

export default ArticleSwipeScreen;
