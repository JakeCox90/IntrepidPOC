'use client';

import { useState, useCallback, useMemo } from 'react';
import { View, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Typography from '../components/Typography';
import { useTheme } from '../theme/ThemeProvider';
import CardHorizontal from '../components/CardHorizontal';
import SkeletonLoader from '../components/SkeletonLoader';
import { searchArticles } from '../services/sunNewsService';
import { Article } from '../types/article';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { styles, createDynamicStyles } from './styles/SearchScreen.styles';

type SearchStackParamList = {
  SearchMain: undefined;
  SearchArticle: { article: Article };
};

type Props = NativeStackScreenProps<SearchStackParamList, 'SearchMain'>;

/**
 * Search screen component that allows users to search for articles and shows trending topics
 */
const SearchScreen = ({ navigation }: Props) => {
  // State management
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Article[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const theme = useTheme();

  // Create dynamic styles with theme
  const dynamicStyles = useMemo(() => createDynamicStyles(theme), [theme]);

  // Define trending topics with their corresponding section colors
  const trendingTopics = useMemo(() => [
    { name: 'Breaking News', color: theme.colors.Section.News },
    { name: 'Sports', color: theme.colors.Section.Sport },
    { name: 'Technology', color: theme.colors.Section.Tech },
    { name: 'Entertainment', color: theme.colors.Section.Showbiz },
    { name: 'Politics', color: theme.colors.Section.Politics },
    { name: 'Health', color: theme.colors.Section.Health },
    { name: 'Money', color: theme.colors.Section.Money },
    { name: 'Travel', color: theme.colors.Section.Travel },
  ], [theme.colors.Section]);

  /**
   * Execute search query and fetch results
   */
  const handleSearch = useCallback(async () => {
    if (searchQuery.trim()) {
      try {
        setIsSearching(true);
        setError(null);
        const results = await searchArticles(searchQuery);
        setSearchResults(results);
      } catch (err) {
        setError('Failed to search articles');
        console.error(err);
      } finally {
        setIsSearching(false);
      }
    }
  }, [searchQuery]);

  /**
   * Clear search query and results
   */
  const handleClearSearch = useCallback(() => {
    setSearchQuery('');
    setSearchResults([]);
    setError(null);
  }, []);

  /**
   * Navigate to article detail screen
   */
  const handleArticlePress = useCallback((article: Article) => {
    navigation.navigate('SearchArticle', { article });
  }, [navigation]);

  /**
   * Handle bookmarking an article
   */
  const handleBookmark = useCallback((id: string) => {
    console.log('Bookmark article:', id);
  }, []);

  /**
   * Handle sharing an article
   */
  const handleShare = useCallback((id: string) => {
    console.log('Share article:', id);
  }, []);

  /**
   * Render a trending search item
   */
  const renderTrendingItem = useCallback(({ item }: { item: { name: string; color: string } }) => (
    <TouchableOpacity
      style={[
        styles.trendingItem,
        { 
          backgroundColor: item.color,
          shadowColor: item.color,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.3,
          shadowRadius: 4,
          elevation: 3,
          height: 80,
          justifyContent: 'flex-end',
          alignItems: 'flex-start',
        }
      ]}
      onPress={() => {
        setSearchQuery(item.name);
        handleSearch();
      }}
    >
      <Typography 
        variant="subtitle-02" 
        color={theme.colors.Text.Inverse}
        style={{ 
          fontWeight: '600',
        }}
      >
        {item.name}
      </Typography>
    </TouchableOpacity>
  ), [theme.colors.Text.Inverse, handleSearch]);

  return (
    <View style={[styles.container, dynamicStyles.container]}>
      <View style={[styles.searchContainer, dynamicStyles.searchContainer]}>
        <View
          style={[styles.searchInputContainer, { backgroundColor: theme.colors.Surface.Secondary }]}
        >
          <Feather
            name="search"
            size={20}
            color={theme.colors.Text.Secondary}
            style={styles.searchIcon}
          />
          <TextInput
            style={[
              styles.searchInput,
              dynamicStyles.searchInput,
              { color: theme.colors.Text.Primary },
            ]}
            placeholder="Search for news..."
            placeholderTextColor={theme.colors.Text.Secondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
            returnKeyType="search"
            onSubmitEditing={handleSearch}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={handleClearSearch}>
              <Feather name="x-circle" size={20} color={theme.colors.Text.Secondary} />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity
          style={[styles.searchButton, { backgroundColor: theme.colors.Primary.Resting }]}
          onPress={handleSearch}
        >
          <Typography variant="button" color={theme.colors.Text.Inverse}>
            Search
          </Typography>
        </TouchableOpacity>
      </View>

      {isSearching ? (
        <View style={styles.searchResults}>
          <SkeletonLoader type="search" count={3} />
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Typography variant="body-01" color={theme.colors.Error.Resting} style={styles.errorText}>
            {error}
          </Typography>
          <Typography
            variant="body-02"
            color={theme.colors.Text.Secondary}
            style={styles.errorSubtext}
          >
            Please try again.
          </Typography>
        </View>
      ) : searchResults.length > 0 ? (
        <FlatList
          data={searchResults}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <CardHorizontal
              id={item.id}
              title={item.title}
              imageUrl={item.imageUrl}
              category={item.category}
              timestamp={item.timestamp}
              readTime={item.readTime}
              onPress={() => handleArticlePress(item)}
              onBookmark={() => handleBookmark(item.id)}
              onShare={() => handleShare(item.id)}
            />
          )}
          contentContainerStyle={styles.searchResults}
        />
      ) : (
        <View style={styles.trendingContainer}>
          <Typography variant="h5" color={theme.colors.Text.Primary} style={styles.trendingTitle}>
            Trending Topics
          </Typography>
          <FlatList
            data={trendingTopics}
            keyExtractor={item => item.name}
            renderItem={renderTrendingItem}
            numColumns={2}
            columnWrapperStyle={styles.trendingColumns}
            contentContainerStyle={styles.trendingList}
          />
        </View>
      )}
    </View>
  );
};

export default SearchScreen;
