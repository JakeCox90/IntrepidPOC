'use client';
import React, { useState, useCallback } from 'react';
import { View, StyleSheet, ScrollView, StatusBar, RefreshControl } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import CardHero from '../components/CardHero';
import CardHorizontal from '../components/CardHorizontal';
import SkeletonLoader from '../components/SkeletonLoader';
import TopNav from '../components/TopNav';
import Typography from '../components/Typography';
import { fetchSunNews } from '../services/sunNewsService';
import Stack from '../components/Stack';
import NewsCard from '../components/NewsCard';
import BundleCard from '../components/BundleCard';
import { createSharedStyles } from '../utils/sharedStyles';

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

// Define Article interface
interface Article {
  id: string;
  title: string;
  category?: string;
  flag?: string;
  imageUrl?: string;
  readTime?: string;
  timestamp?: string;
  content?: string;
  author?: string;
  url?: string;
}

// Define Bundle interface
interface Bundle {
  id: string;
  title: string;
  subtitle: string;
  storyCount: number;
  imageUrl: string;
}

// ForYou screen with simplified implementation
const ForYouScreen = ({ navigation }: { navigation: any }) => {
  const theme = useTheme();
  const sharedStyles = createSharedStyles(theme);
  const [news, setNews] = useState<Article[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

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

  const handleArticlePress = (article: Article) => {
    try {
      navigation.navigate('ForYouArticle', { 
        articleId: article.id || 'fallback-id',
        article: article
      });
    } catch (error) {
      console.error('Navigation error in handleArticlePress:', error);
    }
  };

  const handleTopStoryPress = (article: Article, index: number) => {
    try {
      // Create a safe copy of all articles with default values for missing properties
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
        url: item.url || '',
      }));

      // Navigate to the ArticleStack screen with properly formatted data
      navigation.navigate('ArticleStackScreen', {
        articles: safeArticles,
        initialIndex: index,
        title: 'Top stories',
      });
    } catch (error) {
      console.error('Navigation error:', error);
      // Fallback to single article view if stack navigation fails
      navigation.navigate('ForYouArticle', { 
        articleId: article.id || 'fallback-id',
        article: article
      });
    }
  };

  const handleBookmark = (id: string) => {
    console.log('Bookmark article:', id);
  };

  const handleShare = (id: string) => {
    console.log('Share article:', id);
  };

  const handleProfilePress = () => {
    console.log('Profile pressed');
  };

  const handleBundlePress = (bundle: Bundle) => {
    console.log('Bundle pressed:', bundle.title);
    // In a real app, this would navigate to a bundle detail screen
  };

  const handleBundleNotify = (bundle: Bundle) => {
    console.log('Bundle notification toggled:', bundle.title);
    // In a real app, this would toggle notifications for the bundle
  };

  // Get top stories for the horizontal rail (8 stories)
  const topStories = React.useMemo(() => news.slice(0, 8), [news]);

  // Get featured and recommended articles (adjust indices to avoid overlap)
  const featuredArticles = React.useMemo(() => news.slice(8, 9), [news]);
  const recommendedArticles = React.useMemo(() => news.slice(9, 14), [news]);
  const topicBasedArticles = React.useMemo(() => news.slice(14, 19), [news]);

  // Add a simple usage of navigation to resolve the unused variable warning
  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    loadArticles(true).finally(() => {
      setRefreshing(false);
      // Use navigation to demonstrate it's being used
      navigation.setParams({ refreshed: true });
    });
  }, [loadArticles, navigation]);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.Surface.Secondary }]}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />

      {/* Header - updated to use the explore variant */}
      <TopNav
        title="For you"
        backgroundColor={theme.colors.Surface.Secondary}
        textColor={theme.colors.Text.Primary}
        variant="explore"
        rightButtons={[
          {
            label: 'Profile',
            onPress: handleProfilePress,
          },
        ]}
      />

      {loading ? (
        // Show loading state
        <ScrollView 
          style={styles.scrollView}
          refreshControl={
            <RefreshControl 
              refreshing={refreshing} 
              onRefresh={handleRefresh}
              colors={[theme.colors.Primary.Resting]} 
            />
          }
        >
          <SkeletonLoader type="forYou" count={3} />
        </ScrollView>
      ) : error ? (
        // Error state
        <View style={[styles.container, styles.centerContainer]}>
          <Typography
            variant="subtitle-01"
            color={theme.colors.Error.Resting}
            style={styles.errorText}
          >
            {error}
          </Typography>
          <Typography variant="body-01" color={theme.colors.Text.Secondary}>
            Please check your connection and try again.
          </Typography>
        </View>
      ) : (
        // Actual content
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={{ backgroundColor: theme.colors.Surface.Secondary }}
          refreshControl={
            <RefreshControl 
              refreshing={refreshing} 
              onRefresh={handleRefresh}
              colors={[theme.colors.Primary.Resting]} 
            />
          }
        >
          {/* Top Stories Section (renamed from Featured For You) */}
          <View style={styles.section}>
            <Typography variant="h5" color={theme.colors.Text.Primary} style={styles.sectionTitle}>
              Top stories
            </Typography>

            {featuredArticles.length > 0 && (
              <CardHero
                title={featuredArticles[0].title}
                imageUrl={featuredArticles[0].imageUrl || ''}
                flag={featuredArticles[0].flag || ''}
                category={featuredArticles[0].category || ''}
                readTime={featuredArticles[0].readTime || '3 min read'}
                onPress={() => handleTopStoryPress(featuredArticles[0], 0)}
                onBookmark={() => handleBookmark(featuredArticles[0].id)}
                onShare={() => handleShare(featuredArticles[0].id)}
              />
            )}
          </View>

          {/* Top Stories Horizontal Rail (without title) */}
          <View style={styles.horizontalRailContainer}>
            <Stack spacing={12} style={styles.topStoriesStack}>
              {topStories.map((article, index) => (
                <NewsCard
                  key={article.id || `top-story-${index}`}
                  title={article.title || ''}
                  imageUrl={article.imageUrl || ''}
                  category={article.category || ''}
                  timestamp={article.timestamp || 'Today'}
                  onPress={() => handleTopStoryPress(article, index)}
                />
              ))}
            </Stack>
          </View>

          {/* Recommended Section */}
          <View style={styles.section}>
            <Typography variant="h5" color={theme.colors.Text.Primary} style={styles.sectionTitle}>
              Recommended
            </Typography>

            {recommendedArticles.map(article => (
              <CardHorizontal
                key={article.id || Math.random().toString()}
                id={article.id}
                title={article.title || ''}
                imageUrl={article.imageUrl || ''}
                category={article.category || ''}
                flag={article.flag || ''}
                readTime={article.readTime || '3 min read'}
                onPress={() => handleArticlePress(article)}
                onBookmark={() => handleBookmark(article.id)}
                onShare={() => handleShare(article.id)}
              />
            ))}
          </View>

          {/* Bundles For You Section */}
          <View style={styles.section}>
            <Typography variant="h5" color={theme.colors.Text.Primary} style={styles.sectionTitle}>
              Bundles for you
            </Typography>

            <Stack spacing={16} style={styles.bundlesStack}>
              {bundles.map(bundle => (
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
          </View>

          {/* Topics You Follow Section */}
          <View style={styles.section}>
            <Typography variant="h5" color={theme.colors.Text.Primary} style={styles.sectionTitle}>
              Topics You Follow
            </Typography>

            {topicBasedArticles.map(article => (
              <CardHorizontal
                key={article.id || Math.random().toString()}
                id={article.id}
                title={article.title || ''}
                imageUrl={article.imageUrl || ''}
                category={article.category || ''}
                flag={article.flag || ''}
                readTime={article.readTime || '3 min read'}
                onPress={() => handleArticlePress(article)}
                onBookmark={() => handleBookmark(article.id)}
                onShare={() => handleShare(article.id)}
              />
            ))}
          </View>

          {/* Bottom padding */}
          <View style={styles.bottomPadding} />

          {/* Bottom spacing for navigation */}
          <View style={sharedStyles.bottomNavSpacing} />
        </ScrollView>
      )}
    </View>
  );
};

// Update the styles to include the bundlesStack
const styles = StyleSheet.create({
  bottomPadding: {
    height: 24,
  },
  bundlesStack: {
    marginBottom: 16,
  },
  centerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
  },
  errorText: {
    marginBottom: 16,
  },
  horizontalRailContainer: {
    marginTop: 0, // Reduced from 16 to 8 to halve the space between hero card and stack
    paddingBottom: 16,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    padding: 16,
    paddingBottom: 0,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  topStoriesStack: {
    marginBottom: 16,
  },
});

export default ForYouScreen;
