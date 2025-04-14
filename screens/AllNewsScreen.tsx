'use client';

import { useState, useCallback } from 'react';
import { View, FlatList, StyleSheet, StatusBar as RNStatusBar, Platform, SafeAreaView, ListRenderItem } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from '../theme/ThemeProvider';
import CardHorizontal from '../components/CardHorizontal';
import SkeletonLoader from '../components/SkeletonLoader';
import Typography from '../components/Typography';
import Tabs from '../components/Tabs';
import { fetchNewsByCategory } from '../services/sunNewsService';
import { getCategoryColor } from '../utils/categoryColors';
import { createSharedStyles } from '../utils/sharedStyles';
import { Article } from '../types/article';
import { StackNavigationProp } from '@react-navigation/stack';
import { CardHorizontalProps } from '../types/components/cards';

// Define navigation types
type RootStackParamList = {
  AllNewsArticle: { article: Article };
  AllNewsCategory: { category: { name: string }; source: string };
};

type AllNewsScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'AllNewsArticle'>;
};

// Get status bar height
const STATUSBAR_HEIGHT = RNStatusBar.currentHeight || (Platform.OS === 'ios' ? 44 : 0);

// Main categories - updated to match The Sun's exact section names
const MAIN_CATEGORIES = [
  'News',
  'Sport',
  'TV',
  'Showbiz',
  'Fabulous',
  'Money',
  'Travel',
  'Tech',
  'Motors',
  'Health',
];

// Define the subcategories type
type SubcategoriesType = {
  [key: string]: string[];
};

// Define the subcategories
const SUBCATEGORIES: SubcategoriesType = {
  News: ['UKNews', 'WorldNews', 'Politics', 'Crime'],
  Sport: ['Football', 'Rugby', 'Cricket', 'Tennis'],
  TV: ['TVNews', 'TVReviews', 'Soaps'],
  Showbiz: ['Celebrity', 'Movies', 'Music'],
  Fabulous: ['Fashion', 'Beauty', 'Health'],
  Money: ['PersonalFinance', 'Property', 'Investments'],
  Travel: ['UKTravel', 'WorldTravel', 'Cruises'],
  Tech: ['Gadgets', 'Apps', 'Gaming'],
  Motors: ['Cars', 'Motorbikes', 'EVs'],
  Health: ['Wellbeing', 'Fitness', 'Diet']
};

// Simplified component without animations
const AllNewsScreen = ({ navigation }: AllNewsScreenProps) => {
  const theme = useTheme();
  const sharedStyles = createSharedStyles(theme);
  const [news, setNews] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMainCategory, setSelectedMainCategory] = useState('News');
  const [selectedSubCategory, setSelectedSubCategory] = useState('UKNews');

  // Get the current color for the header
  const currentColor = getCategoryColor(selectedMainCategory, theme);

  useFocusEffect(
    useCallback(() => {
      let isMounted = true;

      const loadNews = async () => {
        if (!isMounted) return;

        setLoading(true);

        try {
          let data;
          // If a subcategory is selected, fetch by subcategory
          if (selectedSubCategory) {
            console.log(`Fetching news for subcategory: ${selectedSubCategory}`);
            data = await fetchNewsByCategory(selectedSubCategory);
          }
          // Otherwise fetch by main category
          else {
            console.log(`Fetching news for main category: ${selectedMainCategory}`);
            data = await fetchNewsByCategory(selectedMainCategory);
          }

          if (isMounted) {
            console.log(`Received ${data.length} articles`);
            setNews(data);
            setLoading(false);
            setError(data.length === 0 ? 'No articles found for this category.' : null);
          }
        } catch (err) {
          console.error(err);
          if (isMounted) {
            setError('Failed to load news');
            setLoading(false);
          }
        }
      };

      loadNews();

      return () => {
        isMounted = false;
      };
    }, [selectedMainCategory, selectedSubCategory]),
  );

  const handleMainCategoryPress = (category: string) => {
    if (!category) return;
    setSelectedMainCategory(category);
    setSelectedSubCategory(SUBCATEGORIES[category as keyof typeof SUBCATEGORIES]?.[0] || '');
  };

  const handleSubCategoryPress = (category: string) => {
    if (!category) return;
    setSelectedSubCategory(category);
  };

  const handleNewsPress = (article: Article) => {
    if (!article) return;
    navigation.navigate('AllNewsArticle', { article });
  };

  const handleBookmark = (id: string) => {
    if (!id) return;
    console.log('Bookmark article:', id);
  };

  const handleShare = (id: string) => {
    if (!id) return;
    console.log('Share article:', id);
  };

  // Safely get subcategories
  const subcategories = SUBCATEGORIES[selectedMainCategory] || [];

  const renderItem: ListRenderItem<Article> = ({ item }) => (
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
  );

  const renderEmptyComponent = (
    <View style={styles.emptyContainer}>
      <Typography
        variant="body-01"
        color={theme.colors.Text.Secondary}
        style={styles.emptyText}
      >
        No articles found for this category.
      </Typography>
    </View>
  );

  const handleRefresh = () => {
    // Refresh logic would go here
    console.log('Refreshing news...');
  };

  return (
    <View style={[styles.safeArea, { backgroundColor: theme.colors.Surface.Secondary }]}>
      {/* Status bar with fixed color */}
      <View style={[styles.statusBar, { backgroundColor: currentColor }]} />

      {/* Header with fixed color */}
      <View style={[styles.header, { backgroundColor: currentColor }]}>
        <Typography variant="h3" color={theme.colors.Text.Inverse} style={styles.headerTitle}>
          All News
        </Typography>
      </View>

      {/* Main Category Tabs */}
      <Tabs
        tabs={MAIN_CATEGORIES}
        activeTab={selectedMainCategory}
        onTabPress={handleMainCategoryPress}
        variant="primary"
        backgroundColor={currentColor}
        textVariant="overline"
      />

      {/* Sub Category Tabs - Using secondary variant with correct text colors */}
      <Tabs
        tabs={subcategories}
        activeTab={selectedSubCategory}
        onTabPress={handleSubCategoryPress}
        variant="secondary"
        backgroundColor="#FFFFFF"
        activeTextColor={theme.colors.Text.Primary}
        inactiveTextColor={theme.colors.Text.Secondary}
        textVariant="body-02"
      />

      {/* News List */}
      <View style={[styles.newsListContainer, { backgroundColor: theme.colors.Surface.Secondary }]}>
        {loading ? (
          // Skeleton loading state using SkeletonLoader
          <View style={styles.newsList}>
            <SkeletonLoader type="allNews" count={5} />
          </View>
        ) : error ? (
          // Error state
          <View style={styles.errorContainer}>
            <Typography
              variant="subtitle-01"
              color={theme.colors.Error.Resting}
              style={styles.errorText}
            >
              {error}
            </Typography>
            <Typography
              variant="body-01"
              color={theme.colors.Text.Secondary}
              style={styles.errorSubtext}
            >
              Please check your connection and try again.
            </Typography>
          </View>
        ) : (
          // Actual content
          <FlatList<Article>
            data={news}
            renderItem={renderItem}
            keyExtractor={(item: Article) => item.id}
            contentContainerStyle={styles.newsList}
            ListEmptyComponent={renderEmptyComponent}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    textAlign: 'center',
  },
  errorContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  errorSubtext: {
    textAlign: 'center',
  },
  errorText: {
    marginBottom: 8,
  },
  header: {
    paddingBottom: 16,
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  headerTitle: {
    fontWeight: '700',
  },
  newsList: {
    padding: 16,
  },
  newsListContainer: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
});

export default AllNewsScreen;
