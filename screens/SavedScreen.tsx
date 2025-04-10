'use client';
import React from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import Typography from '../components/Typography';
import { useTheme } from '../theme/ThemeProvider';

// Define types for screen navigation props
type SavedStackParamList = {
  SavedMain: undefined;
  SavedArticle: { articleId: string; title?: string; category?: string };
  SavedCategory: { categoryId: string; name?: string };
  ArticleSwipeScreen: { initialArticleId: string };
};

type SavedScreenProps = StackScreenProps<SavedStackParamList, 'SavedMain'>;

const SavedScreen: React.FC<SavedScreenProps> = ({ navigation }) => {
  const theme = useTheme();

  // Placeholder data for saved articles
  const placeholderSavedArticles = [
    {
      id: 'saved-1',
      title: 'Example Saved Article 1',
      category: 'News',
      timestamp: '2 hours ago'
    },
    {
      id: 'saved-2',
      title: 'Example Saved Article 2',
      category: 'Sport',
      timestamp: '1 day ago'
    },
    {
      id: 'saved-3',
      title: 'Example Saved Article 3',
      category: 'Technology',
      timestamp: '3 days ago'
    }
  ];

  const navigateToArticle = (articleId: string) => {
    navigation.navigate('SavedArticle', {
      articleId,
      title: placeholderSavedArticles.find(article => article.id === articleId)?.title,
      category: placeholderSavedArticles.find(article => article.id === articleId)?.category
    });
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme?.colors?.Surface?.Primary || '#ffffff' }]}>
      <View style={styles.header}>
        <Typography variant="title-01">Saved Articles</Typography>
      </View>
      
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {placeholderSavedArticles.length > 0 ? (
          placeholderSavedArticles.map((article) => (
            <TouchableOpacity
              key={article.id}
              style={[
                styles.articleCard,
                { backgroundColor: theme?.colors?.Surface?.Secondary || '#f5f5f5' }
              ]}
              onPress={() => navigateToArticle(article.id)}
            >
              <View style={styles.articleContent}>
                <Typography variant="subtitle-01">{article.title}</Typography>
                <View style={styles.articleMeta}>
                  <Typography 
                    variant="caption-01" 
                    color={theme?.colors?.Text?.Secondary || '#717171'}
                  >
                    {article.category}
                  </Typography>
                  <Typography 
                    variant="caption-01" 
                    color={theme?.colors?.Text?.Secondary || '#717171'}
                  >
                    {article.timestamp}
                  </Typography>
                </View>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.emptyState}>
            <Typography variant="body-01" style={styles.emptyText}>
              You haven't saved any articles yet.
            </Typography>
            <Typography variant="body-02" color={theme?.colors?.Text?.Secondary || '#717171'}>
              Articles you save will appear here for easy access.
            </Typography>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  articleCard: {
    borderRadius: 8,
    marginBottom: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  articleContent: {
    flex: 1,
  },
  articleMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  container: {
    flex: 1,
  },
  emptyState: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  emptyText: {
    marginBottom: 8,
    textAlign: 'center',
  },
  header: {
    alignItems: 'flex-start',
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 16,
  },
});

export default SavedScreen;

