'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { View, StyleSheet, TouchableOpacity, FlatList, Dimensions, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeProvider';
import Typography from '../components/Typography';
import Stepper from '../components/Stepper';
import ArticleScreen from './ArticleScreen';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

const { width } = Dimensions.get('window');

// Define types for route params
interface Article {
  id?: string | number;
  title?: string;
  category?: string;
  flag?: string;
  imageUrl?: string;
  readTime?: string;
  timestamp?: string;
  content?: string;
  author?: string;
}

interface ArticleStackParams {
  articles?: Article[];
  initialIndex?: number;
  title?: string;
}

type ArticleStackRouteProp = RouteProp<{ params: ArticleStackParams }, 'params'>;
type ArticleStackNavigationProp = StackNavigationProp<{
  ArticleStack: ArticleStackParams;
  Article: { article: Article };
}>;

interface ArticleStackScreenProps {
  route: ArticleStackRouteProp;
  navigation: ArticleStackNavigationProp;
}

const ArticleStackScreen = ({ route, navigation }: ArticleStackScreenProps) => {
  // Extract and validate params with defaults
  const params = route.params || {};
  const articles = Array.isArray(params.articles) ? params.articles : [];
  const initialIndex = typeof params.initialIndex === 'number' ? params.initialIndex : 0;
  const title = params.title || 'Top stories';

  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const flatListRef = useRef(null);
  const theme = useTheme();

  // Scroll to the initial article when the component mounts
  useEffect(() => {
    // Only attempt to scroll if we have valid articles and a valid initialIndex
    if (
      flatListRef.current &&
      articles.length > 0 &&
      initialIndex >= 0 &&
      initialIndex < articles.length
    ) {
      // Use a timeout to ensure the FlatList has rendered
      const timer = setTimeout(() => {
        try {
          flatListRef.current?.scrollToIndex({
            index: initialIndex,
            animated: false,
          });
        } catch (error) {
          console.error('Error scrolling to index:', error);
        }
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [initialIndex, articles.length]);

  const handleScroll = useCallback(
    event => {
      try {
        const contentOffsetX = event.nativeEvent.contentOffset.x;
        const newIndex = Math.round(contentOffsetX / width);

        // Only update state if the index has actually changed and is valid
        if (newIndex !== currentIndex && newIndex >= 0 && newIndex < articles.length) {
          setCurrentIndex(newIndex);
        }
      } catch (error) {
        console.error('Error handling scroll:', error);
      }
    },
    [currentIndex, articles.length], // width is a constant outside component, doesn't need to be in dependencies
  );

  const handleBackPress = () => {
    navigation.goBack();
  };
  // Define RenderItem type
  type RenderItemProps = {
    item: Article;
    index: number;
  };

  const renderArticle = ({ item, index }: RenderItemProps) => {
    // Ensure the article has all required properties
    const safeArticle = {
      id: item.id || `article-${index}`,
      title: item.title || 'Untitled Article',
      category: item.category || '',
      flag: item.flag || '',
      imageUrl: item.imageUrl || '',
      readTime: item.readTime || '3 min read',
      timestamp: item.timestamp || 'Today',
      content: item.content || '',
      author: item.author || 'The Sun',
    };

    // Pass the article to the ArticleScreen component
    // but hide the header since we're providing our own
    return (
      <View style={styles.articleContainer}>
        <ArticleScreen
          route={{ params: { article: safeArticle } }}
          navigation={navigation}
          hideHeader={true}
        />
      </View>
    );
  };

  // Handle errors with empty articles array
  if (!articles.length) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.Surface.Primary }]}>
        <StatusBar barStyle="dark-content" backgroundColor={theme.colors.Surface.Secondary} />
        {/* Header */}
        <View style={[styles.header, { backgroundColor: theme.colors.Surface.Primary }]}>
          <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
            <View
              style={[styles.backButtonCircle, { backgroundColor: theme.colors.Surface.Secondary }]}
            >
              <Ionicons name="chevron-back" size={24} color={theme.colors.Text.Primary} />
            </View>
          </TouchableOpacity>

          <View style={styles.titleContainer}>
            <Typography variant="subtitle-01" color={theme.colors.Text.Primary} numberOfLines={1}>
              {title}
            </Typography>
          </View>
        </View>

        {/* Error message */}
        <View style={styles.errorContainer}>
          <Typography variant="subtitle-01" color={theme.colors.Error.Resting}>
            No articles available
          </Typography>
          <TouchableOpacity
            style={[styles.backToHomeButton, { backgroundColor: theme.colors.Primary.Resting }]}
            onPress={handleBackPress}
          >
            <Typography variant="button" color={theme.colors.Text.Inverse}>
              Go Back
            </Typography>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.Surface.Primary }]}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.Surface.Secondary} />
      {/* Custom header with stepper */}
      <View style={[styles.header, { backgroundColor: theme.colors.Surface.Primary }]}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <View
            style={[styles.backButtonCircle, { backgroundColor: theme.colors.Surface.Secondary }]}
          >
            <Ionicons name="chevron-back" size={24} color={theme.colors.Text.Primary} />
          </View>
        </TouchableOpacity>

        <View style={styles.titleContainer}>
          <Typography variant="subtitle-01" color={theme.colors.Text.Primary} numberOfLines={1}>
            {title}
          </Typography>
        </View>
      </View>

      {/* Stepper component */}
      <View style={styles.stepperContainer}>
        <Stepper totalSteps={articles.length} currentStep={currentIndex} />
      </View>

      {/* Article content */}
      <FlatList
        ref={flatListRef}
        data={articles}
        renderItem={renderArticle}
        keyExtractor={(item, index) => (item.id ? item.id.toString() : `article-${index}`)}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        initialNumToRender={1}
        maxToRenderPerBatch={2}
        windowSize={3}
      />
    </View>
  );
};

// Define static styles
const styles = StyleSheet.create({
  articleContainer: {
    flex: 1,
    width,
  },
  backButton: {
    marginRight: 16,
  },
  backButtonCircle: {
    alignItems: 'center',
    borderRadius: 20,
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
  backToHomeButton: {
    borderRadius: 8,
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  container: {
    flex: 1,
  },
  errorContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: 10,
    paddingHorizontal: 16,
    paddingTop: 44, // Account for status bar
  },
  stepperContainer: {
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  titleContainer: {
    flex: 1,
  },
});

export default ArticleStackScreen;
