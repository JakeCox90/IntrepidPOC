'use client';
import { View, StyleSheet, FlatList, StatusBar } from 'react-native';
import CardHorizontal from '../components/CardHorizontal';
import { mockNews } from '../services/newsService';
import { useTheme } from '../theme/ThemeProvider';
import Header from '../components/Header';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
// Define interfaces for type safety
interface Article {
  id: string | number;
  title: string;
  imageUrl: string;
  category?: string;
  timestamp?: string;
  readTime?: string;
  content?: string;
}

interface CategoryParams {
  category: {
    id: string | number;
    name: string;
  };
  source?: string;
}

type CategoryScreenRouteProp = RouteProp<{ params: CategoryParams }, 'params'>;
type CategoryScreenNavigationProp = StackNavigationProp<{
  Category: CategoryParams;
  TodayArticle: { article: Article };
}>;

interface CategoryScreenProps {
  route: CategoryScreenRouteProp;
  navigation: CategoryScreenNavigationProp;
}

/**
 * Screen that displays articles for a specific category
 */
const CategoryScreen = ({ route, navigation }: CategoryScreenProps) => {
  const { category, source } = route.params;
  const theme = useTheme();

  /**
   * Handle press on a news article
   * @param article The article to display
   */
  const handleNewsPress = (article: Article) => {
    try {
      // Determine which article screen to navigate to based on source
      const articleRoute = source ? `${source}Article` : 'TodayArticle';
      navigation.navigate(articleRoute, { article });
    } catch (error) {
      console.error('Error navigating to article:', error);
    }
  };

  /**
   * Handle bookmark action
   * @param id ID of the article to bookmark
   */
  const handleBookmark = (id: string | number) => {
    console.log('Bookmark article:', id);
    // In a real app, you would save this article to bookmarks
  };

  /**
   * Handle share action
   * @param id ID of the article to share
   */
  const handleShare = (id: string | number) => {
    console.log('Share article:', id);
    // In a real app, you would open a share dialog
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.Surface.Primary }]}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />

      <Header
        title={category.name}
        showBackButton
        onBackPress={() => navigation.goBack()}
        backgroundColor={theme.colors.Surface.Primary}
        titleAlignment="center"
      />

      <FlatList
        data={mockNews}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <CardHorizontal
            id={item.id}
            title={item.title}
            imageUrl={item.imageUrl}
            category={item.category}
            timestamp={item.timestamp}
            readTime="3 min read"
            onPress={() => handleNewsPress(item)}
            onBookmark={() => handleBookmark(item.id)}
            onShare={() => handleShare(item.id)}
          />
        )}
        contentContainerStyle={styles.newsList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  newsList: {
    padding: 16,
  },
});

export default CategoryScreen;
