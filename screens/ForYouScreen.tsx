'use client';
import React, { useState, useCallback, useMemo } from 'react';
import { View, StyleSheet, ScrollView, StatusBar, RefreshControl, ActivityIndicator, SafeAreaView, FlatList } from 'react-native';
import { useTheme, type ThemeType } from '../theme/ThemeProvider';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CardHorizontal from '../components/CardHorizontal';
import SkeletonLoader from '../components/SkeletonLoader';
import TopNav from '../components/TopNav';
import Typography from '../components/Typography';
import Tabs from '../components/Tabs';
import { fetchSunNews } from '../services/sunNewsService';
import Stack from '../components/Stack';
import BundleCard from '../components/BundleCard';
import { createSharedStyles } from '../utils/sharedStyles';
import { Article, Bundle } from '../types';
import { useNavigation } from '@react-navigation/native';
import { createForYouScreenStyles } from './styles/ForYouScreen.styles';

// Define the ForYouScreenProps interface
interface ForYouScreenProps {
  navigation: any;
}

// Sample bundle data
const bundles = [
  {
    id: 'bundle-1',
    title: 'Inside the campaign',
    subtitle: 'UK Election 2025',
    storyCount: 34,
    imageUrl: 'https://i.imgur.com/JfVDTLs.jpg',
  },
  {
    id: 'bundle-2',
    title: 'Cost of living crisis',
    subtitle: 'Impact on families',
    storyCount: 28,
    imageUrl: 'https://i.imgur.com/7BjQIEE.jpg',
  },
  {
    id: 'bundle-3',
    title: 'Ukraine war latest',
    subtitle: 'Conflict updates',
    storyCount: 42,
    imageUrl: 'https://i.imgur.com/QVZLMGj.jpg',
  },
];

// ForYou screen with optimized implementation
const ForYouScreen: React.FC<ForYouScreenProps> = ({ navigation }) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const sharedStyles = useMemo(() => createSharedStyles(theme), [theme]);
  const styles = useMemo(() => createForYouScreenStyles(theme, insets), [theme, insets]);
  const [selectedTab, setSelectedTab] = useState<string>('Top Stories');
  const [news, setNews] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isTabTransitioning, setIsTabTransitioning] = useState(false);

  // Extract list components for better performance
  const TopStoriesList = React.memo(({ 
    stories, 
    onPress 
  }: { 
    stories: Article[], 
    onPress: (article: Article) => void 
  }) => (
    <Stack spacing={12} style={styles.topStoriesStack}>
      {stories.map((article, index) => (
        <CardHorizontal
          key={article.id || `top-story-${index}`}
          id={article.id}
          title={article.title || ''}
          imageUrl={article.imageUrl || ''}
          category={article.category || ''}
          flag={article.flag || ''}
          readTime={article.readTime || '3 min read'}
          onPress={() => onPress(article)}
          onBookmark={() => handleBookmark(article.id)}
          onShare={() => handleShare(article.id)}
        />
      ))}
    </Stack>
  ));

  const RecommendedList = React.memo(({ 
    articles, 
    onPress, 
    onBookmark, 
    onShare 
  }: { 
    articles: Article[], 
    onPress: (article: Article) => void,
    onBookmark: (id: string) => void,
    onShare: (id: string) => void
  }) => (
    <>
      {articles.map(article => (
        <CardHorizontal
          key={article.id || Math.random().toString()}
          id={article.id}
          title={article.title || ''}
          imageUrl={article.imageUrl || ''}
          category={article.category || ''}
          flag={article.flag || ''}
          readTime={article.readTime || '3 min read'}
          onPress={() => onPress(article)}
          onBookmark={() => onBookmark(article.id)}
          onShare={() => onShare(article.id)}
        />
      ))}
    </>
  ));

  const BundlesList = React.memo(({ 
    bundles, 
    onPress, 
    onNotify 
  }: { 
    bundles: Bundle[], 
    onPress: (bundle: Bundle) => void,
    onNotify: (bundle: Bundle) => void
  }) => (
    <Stack spacing={16} style={styles.bundlesStack}>
      {bundles.map(bundle => (
        <BundleCard
          key={bundle.id}
          title={bundle.title}
          subtitle={bundle.subtitle}
          storyCount={bundle.storyCount}
          imageUrl={bundle.imageUrl}
          onPress={() => onPress(bundle)}
          onNotify={() => onNotify(bundle)}
        />
      ))}
    </Stack>
  ));

  // Memoize the tabs to prevent unnecessary re-renders
  const tabs = useMemo(() => [
    'Top Stories',
    'Recommended',
    'Bundles'
  ], []);

  // Memoize the tab press handler
  const handleTabPress = useCallback((tabId: string) => {
    if (tabId === selectedTab || isTabTransitioning) return;
    
    setIsTabTransitioning(true);
    setSelectedTab(tabId);
    
    // Use a short timeout to prevent rapid tab switching
    setTimeout(() => {
      setIsTabTransitioning(false);
    }, 100);
  }, [selectedTab, isTabTransitioning]);

  // Memoize article data processing
  const { topStories, featuredArticles, recommendedArticles, topicBasedArticles } = useMemo(() => ({
    topStories: news.slice(0, 8),
    featuredArticles: news.slice(8, 9),
    recommendedArticles: news.slice(9, 14),
    topicBasedArticles: news.slice(14, 19)
  }), [news]);

  // Function to load articles
  const loadArticles = useCallback(async (forceRefresh = false) => {
    try {
      setLoading(true);
      const articles = await fetchSunNews();
      setNews(articles);
      setError(null);
    } catch (error) {
      setError('Failed to load articles');
      console.error('Error loading articles:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Load articles on component mount
  React.useEffect(() => {
    loadArticles();
  }, [loadArticles]);

  // Fix the handleArticlePress function to not require an index parameter
  const handleArticlePress = useCallback((article: Article) => {
    navigation.navigate('ArticleDetail', { article });
  }, [navigation]);

  const handleTopStoryPress = useCallback((article: Article, index: number) => {
    try {
      const safeArticles = topStories.map(item => ({
        id: item.id || `article-${Math.random().toString(36).substr(2, 9)}`,
        title: item.title || 'Untitled Article',
        category: item.category || '',
        flag: item.flag || '',
        imageUrl: item.imageUrl || '',
        readTime: item.readTime || '3 min read',
        timestamp: item.timestamp || 'Today',
        content: item.content || '',
        author: item.author || 'The Sun',
      }));

      navigation.navigate('ArticleStackScreen', {
        articles: safeArticles,
        initialIndex: index,
        title: 'Top stories',
      });
    } catch (error) {
      console.error('Navigation error:', error);
      navigation.navigate('ForYouArticle', { 
        articleId: article.id || 'fallback-id',
        article: article
      });
    }
  }, [navigation, topStories]);

  const handleBookmark = useCallback((id: string) => {
    console.log('Bookmark article:', id);
  }, []);

  const handleShare = useCallback((id: string) => {
    console.log('Share article:', id);
  }, []);

  const handleProfilePress = useCallback(() => {
    console.log('Profile pressed');
  }, []);

  const handleBundlePress = useCallback((bundle: Bundle) => {
    console.log('Bundle pressed:', bundle.title);
  }, []);

  const handleBundleNotify = useCallback((bundle: Bundle) => {
    console.log('Bundle notification toggled:', bundle.title);
  }, []);

  // Add a simple usage of navigation to resolve the unused variable warning
  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    loadArticles(true).finally(() => {
      setRefreshing(false);
      // Use navigation to demonstrate it's being used
      navigation.setParams({ refreshed: true });
    });
  }, [loadArticles, navigation]);

  const handleLoadMore = useCallback(async () => {
    if (!hasMore || isLoadingMore) return;
    setIsLoadingMore(true);
    try {
      const newArticles = await fetchSunNews();
      setNews(prevArticles => [...prevArticles, ...newArticles]);
      setHasMore(newArticles.length > 0);
      setPage(prevPage => prevPage + 1);
    } catch (error) {
      console.error('Error loading more articles:', error);
    } finally {
      setIsLoadingMore(false);
    }
  }, [hasMore, isLoadingMore]);

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#000000"
        translucent={true}
      />
      
      <Tabs
        tabs={tabs}
        activeTab={selectedTab}
        onTabPress={handleTabPress}
        variant="secondary"
        backgroundColor={theme.colors.Surface.Primary}
        activeTextColor={theme.colors.Primary.Resting}
        inactiveTextColor={theme.colors.Text.Secondary}
        textVariant="body-02"
        animated={true}
      />
      
      <View style={styles.content}>
        {loading ? (
          <ActivityIndicator size="large" color={theme.colors.Primary.Resting} />
        ) : error ? (
          <Typography variant="body-01" color={theme.colors.Error.Text} style={styles.errorText}>
            {error}
          </Typography>
        ) : (
          <>
            {selectedTab === 'Top Stories' && (
              <View style={styles.section}>
                <Typography variant="h5" color={theme.colors.Text.Primary} style={styles.sectionTitle}>
                  Top stories
                </Typography>
                <ScrollView
                  refreshControl={
                    <RefreshControl 
                      refreshing={refreshing} 
                      onRefresh={handleRefresh}
                      colors={[theme.colors.Primary.Resting]} 
                    />
                  }
                >
                  <TopStoriesList
                    stories={topStories}
                    onPress={handleArticlePress}
                  />
                </ScrollView>
              </View>
            )}
            
            {selectedTab === 'Recommended' && (
              <View style={styles.section}>
                <Typography variant="h5" color={theme.colors.Text.Primary} style={styles.sectionTitle}>
                  Recommended
                </Typography>
                <ScrollView
                  refreshControl={
                    <RefreshControl 
                      refreshing={refreshing} 
                      onRefresh={handleRefresh}
                      colors={[theme.colors.Primary.Resting]} 
                    />
                  }
                >
                  <Stack spacing={12}>
                    {recommendedArticles.map((article) => (
                      <CardHorizontal
                        key={article.id}
                        id={article.id}
                        title={article.title}
                        imageUrl={article.imageUrl || ''}
                        category={article.category || ''}
                        flag={article.flag || ''}
                        readTime={article.readTime || '3 min read'}
                        onPress={() => handleArticlePress(article)}
                        onBookmark={() => handleBookmark(article.id)}
                        onShare={() => handleShare(article.id)}
                      />
                    ))}
                  </Stack>
                </ScrollView>
              </View>
            )}
            
            {selectedTab === 'Bundles' && (
              <View style={styles.section}>
                <Typography variant="h5" color={theme.colors.Text.Primary} style={styles.sectionTitle}>
                  Bundles for you
                </Typography>
                <ScrollView
                  refreshControl={
                    <RefreshControl 
                      refreshing={refreshing} 
                      onRefresh={handleRefresh}
                      colors={[theme.colors.Primary.Resting]} 
                    />
                  }
                >
                  <Stack spacing={12}>
                    {bundles.map((bundle) => (
                      <BundleCard
                        key={bundle.id}
                        title={bundle.title}
                        subtitle={bundle.subtitle}
                        storyCount={bundle.storyCount}
                        imageUrl={bundle.imageUrl}
                        onPress={() => handleBundlePress(bundle)}
                        onNotify={() => handleBundleNotify(bundle)}
                      />
                    ))}
                  </Stack>
                </ScrollView>
              </View>
            )}
          </>
        )}
      </View>
    </View>
  );
};

export default ForYouScreen;
