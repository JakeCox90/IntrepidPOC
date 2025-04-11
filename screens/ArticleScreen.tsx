'use client';

import React, { useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, StatusBar, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from '../theme/ThemeProvider';
import Typography from '../components/Typography';
import Comments from '../components/Comments';
import SkeletonLoader from '../components/SkeletonLoader';
import { useContentCache } from '../hooks/useContentCache';
import TopNav from '../components/TopNav';
import ArticleHeader from '../components/ArticleHeader';
import AudioPlayer from '../components/AudioPlayer';
import { Accordion } from '../components/Accordion';
import { createAccordionStyles } from '../components/styles/Accordion.styles';
import { debugNavigation } from '../utils/debugUtils';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Share } from 'react-native';
import { getArticleById } from '../services/mockArticleService';
import { Article } from '../types/article';

// Cache key prefix for articles
const ARTICLE_CACHE_PREFIX = 'article_';

// Define the navigation types
type RootStackParamList = {
  Article: { articleId: string; article?: Article };
  // Add other screens as needed
};

type ArticleScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Article'>;
type ArticleScreenRouteProp = RouteProp<RootStackParamList, 'Article'>;

interface ArticleScreenProps {
  route: ArticleScreenRouteProp;
  navigation: ArticleScreenNavigationProp;
  hideHeader?: boolean;
}

// Define types for comment handlers
interface Comment {
  id: string | number;
  text: string;
  isLiked?: boolean;
}

const ArticleScreen = ({ route, navigation, hideHeader = false }: ArticleScreenProps) => {
  const theme = useTheme();
  const { articleId, article: routeArticle } = route.params || {};
  const accordionStyles = createAccordionStyles(theme);

  // Use the useContentCache hook to manage article data
  const { data: article, loading, error, setData } = useContentCache<Article>(
    `${ARTICLE_CACHE_PREFIX}${articleId}`,
    async () => {
      const fetchedArticle = await getArticleById(articleId);
      if (!fetchedArticle) {
        throw new Error('Article not found');
      }
      return fetchedArticle;
    },
    routeArticle // Use the article passed in route params as initial data if available
  );

  // Debug navigation and caching
  useEffect(() => {
    debugNavigation('ArticleScreen', { route, navigation });
  }, [route, navigation]);

  // Fetch article data when the component mounts or articleId changes
  useEffect(() => {
    if (articleId && !routeArticle) {
      getArticleById(articleId).then(fetchedArticle => {
        if (fetchedArticle) {
          setData(fetchedArticle);
        }
      });
    }
  }, [articleId, routeArticle, setData]);

  // Determine if we should show the skeleton
  const showSkeleton = loading && !article;

  // Mock comments data with replies
  const comments = [
    {
      id: 1,
      author: 'Sharon McDonald',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.',
      time: '10 mins ago',
      likes: 1,
      replies: [
        {
          id: 101,
          author: 'John Smith',
          text: 'I agree with your point!',
          time: '5 mins ago',
          likes: 0,
        },
        {
          id: 102,
          author: 'Jane Doe',
          text: 'Interesting perspective.',
          time: '2 mins ago',
          likes: 0,
        },
      ],
    },
    {
      id: 2,
      author: 'Sharon McDonald',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.',
      time: '10 mins ago',
      likes: 8,
      replies: [],
    },
  ];

  // Handler functions with proper type annotations
  const handleSubmitComment = (text: string): void => {
    console.log('New comment:', text);
    // In a real app, you would add the comment to the comments array
  };

  const handleLikeComment = (commentId: string | number, isLiked: boolean): void => {
    console.log('Comment liked:', commentId, 'Liked status:', isLiked);
    // In a real app, you would update the likes count on the server
  };

  const handleReplyComment = (commentId: string | number): void => {
    console.log('Reply to comment:', commentId);
    // In a real app, you would show a reply input or navigate to a reply screen
  };

  const handleViewReplies = (commentId: string | number): void => {
    console.log('View replies for comment:', commentId);
    // In a real app, you would expand the replies or navigate to a replies screen
  };

  const handleShowAllComments = () => {
    console.log('Show all comments');
    // In a real app, you would navigate to a comments screen or load more comments
  };

  // Safely get article content or provide default
  const articleContent = article?.content || 'No content available';

  // Safely split content into paragraphs
  const contentParagraphs = articleContent.split('\n\n') || [''];
  const subtitle = contentParagraphs[0] || '';
  const remainingParagraphs = contentParagraphs.slice(1) || [];

  // Handler functions with proper type annotations
  const handleShare = (text: string): void => {
    Share.share({ message: text });
  };

  const handleLike = (commentId: string, isLiked: boolean): void => {
    // Update comment like status
    console.log('Like comment:', commentId, isLiked);
  };

  const handleReply = (commentId: string): void => {
    // Handle reply to comment
    console.log('Reply to comment:', commentId);
  };

  const handleDelete = (commentId: string): void => {
    // Delete comment
    console.log('Delete comment:', commentId);
  };

  if (error) {
    return (
      <View style={styles.container}>
        <Typography variant="body-01" color="error">
          Error loading article: {error.message}
        </Typography>
      </View>
    );
  }

  if (showSkeleton) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={theme?.colors?.Primary?.Resting || '#E03A3A'} />
      </View>
    );
  }

  if (!article) {
    return (
      <View style={styles.container}>
        <Typography variant="body-01">Article not found</Typography>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {!hideHeader && (
        <>
          <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
          {/* Top Navigation */}
          <TopNav
            title={article?.category || 'Article'}
            showBackButton
            onBackPress={() => navigation.goBack()}
            backgroundColor="#F5F5F5"
          />
        </>
      )}

      <ScrollView
        style={[styles.scrollView, { backgroundColor: theme.colors.Surface.Secondary }]}
        contentContainerStyle={[
          styles.scrollViewContent,
          { paddingHorizontal: theme.space['40'] },
        ]}
      >
        {/* Article Header Component */}
        <ArticleHeader
          title={article.title}
          subtitle={subtitle}
          category={article.category}
          flag={article.flag}
          readTime={article.readTime || '3 min read'}
          author={article.author}
          timestamp={article.timestamp}
          imageUrl={article.imageUrl}
        />

        {/* Audio Player Component */}
        <View style={styles.audioPlayerContainer}>
          <AudioPlayer
            title={article.title}
            category={article.category}
            duration={321} // Default duration in seconds (5m 21s)
            onPlay={() => console.log('Audio started playing')}
            onPause={() => console.log('Audio paused')}
            onComplete={() => console.log('Audio playback completed')}
          />
        </View>

        {/* Accordion Component */}
        <View style={styles.accordionContainer}>
          <Accordion title="Key Points" initialExpanded={true}>
            <View style={accordionStyles.keyPointsContainer}>
              <Typography
                variant="body-02"
                color={theme.colors.Text.Secondary}
                style={accordionStyles.keyPoint}
              >
                • {article.title.split(' ').slice(0, 5).join(' ')}...
              </Typography>
              <Typography
                variant="body-02"
                color={theme.colors.Text.Secondary}
                style={accordionStyles.keyPoint}
              >
                • {contentParagraphs[0].split('.')[0]}.
              </Typography>
              {contentParagraphs.length > 1 && (
                <Typography
                  variant="body-02"
                  color={theme.colors.Text.Secondary}
                  style={accordionStyles.keyPoint}
                >
                  • {contentParagraphs[1].split('.')[0]}.
                </Typography>
              )}
            </View>
          </Accordion>
        </View>

        {/* Article content */}
        <View style={styles.articleContent}>
          {remainingParagraphs.map((paragraph, index) => (
            <Typography
              key={index}
              variant="body-01"
              color={theme.colors.Text.Secondary}
              style={styles.paragraph}
            >
              {paragraph}
            </Typography>
          ))}
        </View>

        {/* Comments Section using Comments component */}
        <Comments
          comments={comments}
          totalComments={8}
          onShowAllPress={handleShowAllComments}
          onSubmitComment={handleSubmitComment}
          onLikeComment={handleLikeComment}
          onReplyComment={handleReplyComment}
          onViewReplies={handleViewReplies}
        />

        {/* Bottom spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  accordionContainer: {
    marginBottom: 24,
  },
  articleContent: {
    marginBottom: 24,
  },
  audioPlayerContainer: {
    marginBottom: 16,
    marginTop: 16,
  },
  backToHomeButton: {
    borderRadius: 8,
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  bottomSpacing: {
    height: 20,
  },
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
  paragraph: {
    marginBottom: 16,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 16,
    paddingTop: 16,
  },
});

export default ArticleScreen;
