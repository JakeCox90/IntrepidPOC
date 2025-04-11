'use client';
import React, { useState, useRef } from 'react';
import {
  View,
  Animated,
  PanResponder,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeProvider';
import Typography from '../components/Typography';
import Flag from '../components/Flag';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { styles, createDynamicStyles } from './styles/ArticleSwipeScreen.styles';

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

// Define RootStackParamList for type-safe navigation
type RootStackParamList = {
  params: ArticleSwipeScreenParams;
  TodayArticle: { article: Article };
};

// Define props interface
interface ArticleSwipeScreenProps {
  route: RouteProp<{ params: ArticleSwipeScreenParams }, 'params'>;
  navigation: NativeStackNavigationProp<RootStackParamList>;
}

// Constants
const { width } = Dimensions.get('window');
const SWIPE_THRESHOLD = width * 0.25;
const SWIPE_OUT_DURATION = 300;

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

  // Create dynamic styles with theme
  const dynamicStyles = createDynamicStyles(theme);

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
      dynamicStyles.cardContainer,
      {
        zIndex: 3 - index,
      },
      getCardStyle(index),
    ];

    return (
      <Animated.View
        key={`card-${currentIndex + index}`}
        style={[cardStyle, dynamicStyles.cardShadow]}
        {...(index === 0 ? panResponder.panHandlers : {})}
      >
        <TouchableOpacity
          style={dynamicStyles.card}
          activeOpacity={0.9}
          onPress={() => handleArticlePress(article)}
          disabled={isSwipingRef.current || index !== 0}
        >
          {/* Card background image */}
          <Animated.Image
            source={{ uri: article.imageUrl }}
            style={dynamicStyles.cardImage}
            resizeMode="cover"
          />

          {/* Dark overlay */}
          <View style={dynamicStyles.cardOverlay} />

          {/* Card content */}
          <View style={dynamicStyles.cardContent}>
            <View style={styles.flagsContainer}>
              {article.category && (
                <View style={styles.flagItem}>
                  <Flag text={article.category} category={article.category} variant="filled" />
                </View>
              )}

              {article.flag && COMMON_FLAGS.includes(article.flag.toUpperCase()) && (
                <View style={styles.flagItem}>
                  <Flag text={article.flag} variant="filled" />
                </View>
              )}
            </View>

            <Typography
              variant="h5"
              color={theme.colors.Text.Inverse}
              style={dynamicStyles.cardTitle}
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
      <StatusBar barStyle="dark-content" backgroundColor="white" translucent={true} />
      
      <SafeAreaView style={{ flex: 1 }}>
        {/* Header */}
        <View style={[styles.header, { backgroundColor: theme.colors.Surface.Primary, borderBottomWidth: 0, paddingTop: Platform.OS === 'ios' ? 0 : 16 }]}>
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
      </SafeAreaView>
    </View>
  );
};

export default ArticleSwipeScreen;
