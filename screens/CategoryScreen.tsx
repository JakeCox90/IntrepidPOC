'use client';
import { View, StyleSheet, FlatList, StatusBar } from 'react-native';
import CardHorizontal from '../components/CardHorizontal';
import { mockNews } from '../services/newsService';
import { useTheme } from '../theme/ThemeProvider';
import Header from '../components/Header';

const CategoryScreen = ({ route, navigation }) => {
  const { category, source } = route.params;
  const theme = useTheme();

  const handleNewsPress = article => {
    // Determine which article screen to navigate to based on source
    const articleRoute = source ? `${source}Article` : 'TodayArticle';

    navigation.navigate(articleRoute, { article });
  };

  const handleBookmark = id => {
    console.log('Bookmark article:', id);
    // In a real app, you would save this article to bookmarks
  };

  const handleShare = id => {
    console.log('Share article:', id);
    // In a real app, you would open a share dialog
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />

      <Header
        title={category.name}
        showBackButton
        onBackPress={() => navigation.goBack()}
        backgroundColor="#FFFFFF"
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
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  newsList: {
    padding: 16,
  },
});

export default CategoryScreen;
