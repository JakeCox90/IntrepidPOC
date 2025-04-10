'use client';

import { useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, FlatList, StatusBar } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Typography from '../components/Typography';
import { useTheme } from '../theme/ThemeProvider';
import Header from '../components/Header';
import CardHorizontal from '../components/CardHorizontal';
import SkeletonLoader from '../components/SkeletonLoader';
import { searchNews, type Article } from '../services/sunNewsService';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type SearchStackParamList = {
  SearchMain: undefined;
  SearchArticle: { article: Article };
};

type Props = NativeStackScreenProps<SearchStackParamList, 'SearchMain'>;

const SearchScreen = ({ navigation }: Props) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Article[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#FFFFFF',
      flex: 1,
    },
    errorContainer: {
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center',
      padding: 20,
    },
    errorSubtext: {
      fontSize: 16,
      textAlign: 'center',
    },
    errorText: {
      fontSize: 18,
      fontWeight: '600',
      marginBottom: 8,
    },
    searchButton: {
      borderRadius: 8,
      height: 44,
      justifyContent: 'center',
      paddingHorizontal: 16,
    },
    searchContainer: {
      borderBottomColor: '#EEEEEE',
      borderBottomWidth: 1,
      flexDirection: 'row',
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
    searchIcon: {
      marginRight: 8,
    },
    searchInput: {
      flex: 1,
      fontFamily: theme.typography.fontFamily[theme.typography.variants['input-text'].weight],
      fontSize: theme.typography.scale[theme.typography.variants['input-text'].scale],
      height: 44,
      lineHeight: theme.typography.lineHeight[theme.typography.variants['input-text'].scale],
    },
    searchInputContainer: {
      alignItems: 'center',
      borderRadius: 8,
      flex: 1,
      flexDirection: 'row',
      height: 44,
      marginRight: 8,
      paddingHorizontal: 12,
    },
    searchResults: {
      padding: 16,
    },
    trendingColumns: {
      justifyContent: 'space-between',
      marginBottom: 12,
    },
    trendingContainer: {
      flex: 1,
      padding: 16,
    },
    trendingItem: {
      borderRadius: 8,
      padding: 12,
      width: '48%',
    },
    trendingList: {
      paddingBottom: 16,
    },
    trendingTitle: {
      marginBottom: 16,
    },
  });

  const handleSearch = async () => {
    if (searchQuery.trim()) {
      try {
        setIsSearching(true);
        setError(null);
        const results = await searchNews(searchQuery);
        setSearchResults(results);
      } catch (err) {
        setError('Failed to search articles');
        console.error(err);
      } finally {
        setIsSearching(false);
      }
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setError(null);
  };

  const handleArticlePress = (article: Article) => {
    navigation.navigate('SearchArticle', { article });
  };

  const handleBookmark = (id: string) => {
    console.log('Bookmark article:', id);
  };

  const handleShare = (id: string) => {
    console.log('Share article:', id);
  };

  const renderTrendingItem = ({ item }: { item: string }) => (
    <TouchableOpacity
      style={[styles.trendingItem, { backgroundColor: theme.colors.Surface.Secondary }]}
      onPress={() => {
        setSearchQuery(item);
        handleSearch();
      }}
    >
      <Typography variant="body-02" color={theme.colors.Text.Primary}>
        {item}
      </Typography>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />

      <Header title="Search" backgroundColor="#FFFFFF" />

      <View style={styles.searchContainer}>
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
            style={[styles.searchInput, { color: theme.colors.Text.Primary }]}
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
        // Use SkeletonLoader for loading state
        <View style={styles.searchResults}>
          <SkeletonLoader type="search" count={3} />
        </View>
      ) : error ? (
        // Error state
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
        // Actual content
        <FlatList
          data={searchResults}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <CardHorizontal
              id={item.id}
              title={item.title}
              imageUrl={item.imageUrl}
              category={item.category}
              readTime={item.readTime}
              onPress={() => handleArticlePress(item)}
              onBookmark={() => handleBookmark(item.id.toString())}
              onShare={() => handleShare(item.id.toString())}
            />
          )}
          contentContainerStyle={styles.searchResults}
        />
      ) : (
        <View style={styles.trendingContainer}>
          <Typography variant="h5" color={theme.colors.Text.Primary} style={styles.trendingTitle}>
            Trending Searches
          </Typography>
          <FlatList
            data={[
              'Premier League',
              'Royal Family',
              'Cost of Living',
              'Ukraine War',
              'Climate Change',
              'US Election',
            ]}
            keyExtractor={item => item}
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
