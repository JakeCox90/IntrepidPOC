'use client';

import React, { useEffect, useCallback, useMemo } from 'react';
import { View, FlatList, StatusBar, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from '../theme/ThemeProvider';
import Typography from '../components/Typography';
import Comments from '../components/Comments';
import TopNav from '../components/TopNav';
import ArticleHeader from '../components/ArticleHeader';
import AudioPlayer from '../components/AudioPlayer';
import { Accordion } from '../components/Accordion';
import { createAccordionStyles } from '../components/styles/Accordion.styles';
import { debugNavigation } from '../utils/debugUtils';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Article, Comment } from '../types';
import { createStyles } from './styles/ArticleScreen.styles';
import { useArticle } from '../hooks/useArticle';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { ErrorDisplay } from '../components/ErrorDisplay';
import { useErrorHandling } from '../hooks/useErrorHandling';

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

// Extract CommentList component for better performance
const CommentList = React.memo(({ 
  comments,
  onLike,
  onReply,
  onViewReplies
}: {
  comments: Comment[];
  onLike: (commentId: string | number, isLiked: boolean) => void;
  onReply: (commentId: string | number) => void;
  onViewReplies: (commentId: string | number) => void;
}) => (
  <Comments
    comments={comments}
    onLikeComment={onLike}
    onReplyComment={onReply}
    onViewReplies={onViewReplies}
  />
));

// Extract KeyPoints component
const KeyPoints = React.memo(({ 
  points,
  styles,
  accordionStyles,
  theme
}: {
  points: string[];
  styles: any;
  accordionStyles: any;
  theme: any;
}) => (
  <View style={styles.accordionContainer}>
    <Accordion
      title="Key Points"
      initialExpanded={true}
    >
      <View style={accordionStyles.keyPointsContainer}>
        {points.map((point, index) => (
          <Typography
            key={index}
            variant="body-02"
            color={theme.colors.Text.Secondary}
            style={accordionStyles.keyPoint}
          >
            • {point.trim()}.
          </Typography>
        ))}
      </View>
    </Accordion>
  </View>
));

const ArticleScreen = ({ route, navigation, hideHeader = false }: ArticleScreenProps) => {
  const theme = useTheme();
  const { articleId, article: routeArticle } = route.params || {};
  const accordionStyles = useMemo(() => createAccordionStyles(theme), [theme]);
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [isBookmarked, setIsBookmarked] = React.useState(false);
  const { handleError, lastError, clearError } = useErrorHandling();

  // Use the custom hook for article-related business logic
  const {
    article,
    loading,
    error,
    handleShare,
    handleShowAllComments,
    handleSubmitComment,
    handleLikeComment,
    handleReplyComment,
    handleViewReplies,
  } = useArticle({
    articleId,
    initialArticle: routeArticle,
  });

  // Memoize handlers
  const handleBookmark = useCallback(() => {
    setIsBookmarked(prev => !prev);
    console.log('Bookmark toggled:', !isBookmarked);
  }, [isBookmarked]);

  const handleAudioPlay = useCallback(() => {
    console.log('Play audio');
  }, []);

  const handleAudioPause = useCallback(() => {
    console.log('Pause audio');
  }, []);

  // Memoize article data processing
  const articleData = useMemo(() => ({
    title: article?.title || '',
    subtitle: article?.subheading || (article?.content ? article.content.split('.')[0] + '.' : ''),
    imageUrl: article?.imageUrl || '',
    category: article?.category || '',
    readTime: article?.readTime || '',
    flag: article?.flag || '',
    timestamp: article?.timestamp || '',
    keyPoints: article?.content?.split('.')
      .filter(sentence => sentence.trim().length > 0)
      .slice(0, 2) || []
  }), [article]);

  // Debug navigation
  useEffect(() => {
    debugNavigation('ArticleScreen', { route, navigation });
  }, [route, navigation]);

  // Determine if we should show the skeleton
  const showSkeleton = loading && !article;

  // Memoize comments data
  const comments: Comment[] = useMemo(() => [
    {
      id: 1,
      userId: "user1",
      author: {
        id: "user1",
        name: "Sharon McDonald",
        avatar: "https://randomuser.me/api/portraits/women/1.jpg",
        role: "Senior Editor",
        isVerified: true
      },
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.",
      createdAt: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
      likes: 1,
      likedBy: ["user2", "user3"],
      metadata: {
        isPinned: true,
        isHidden: false,
        isReported: false
      },
      replies: [
        {
          id: 101,
          userId: "user2",
          author: {
            id: "user2",
            name: "John Smith",
            avatar: "https://randomuser.me/api/portraits/men/1.jpg",
            isVerified: true
          },
          text: "I agree with your point!",
          createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
          updatedAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
          likes: 0,
          parentId: 1,
          metadata: {
            isHidden: false,
            isReported: false
          }
        },
        {
          id: 102,
          userId: "user3",
          author: {
            id: "user3",
            name: "Jane Doe",
            avatar: "https://randomuser.me/api/portraits/women/2.jpg",
            isVerified: false
          },
          text: "Interesting perspective.",
          createdAt: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
          updatedAt: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
          likes: 0,
          parentId: 1,
          metadata: {
            isHidden: false,
            isReported: false
          }
        },
      ],
    },
    {
      id: 2,
      userId: "user1",
      author: {
        id: "user1",
        name: "Sharon McDonald",
        avatar: "https://randomuser.me/api/portraits/women/1.jpg",
        role: "Senior Editor",
        isVerified: true
      },
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.",
      createdAt: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
      likes: 8,
      likedBy: ["user2", "user3", "user4", "user5", "user6", "user7", "user8", "user9"],
      metadata: {
        isPinned: false,
        isHidden: false,
        isReported: false
      },
      replies: [],
    },
  ], []);

  // Memoize the render item function
  const renderItem = useCallback(() => {
    return (
      <>
        {/* Content Container */}
        <View style={styles.contentContainer}>
          {/* Article Header */}
          <ArticleHeader
            title={articleData.title}
            subtitle={articleData.subtitle}
            imageUrl={articleData.imageUrl}
            category={articleData.category}
            readTime={articleData.readTime}
            flag={articleData.flag}
            timestamp={articleData.timestamp}
          />

          {/* Audio Player */}
          <View style={styles.audioPlayerContainer}>
            <AudioPlayer
              title={articleData.title}
              category={articleData.category}
              duration={120}
              onPlay={handleAudioPlay}
              onPause={handleAudioPause}
            />
          </View>

          {/* Key Points Accordion */}
          <KeyPoints
            points={articleData.keyPoints}
            styles={styles}
            accordionStyles={accordionStyles}
            theme={theme}
          />

          {/* Comments Section */}
          <CommentList
            comments={comments}
            onLike={handleLikeComment}
            onReply={handleReplyComment}
            onViewReplies={handleViewReplies}
          />
        </View>
      </>
    );
  }, [articleData, styles, accordionStyles, comments, handleAudioPlay, handleAudioPause, handleLikeComment, handleReplyComment, handleViewReplies]);

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
        <ActivityIndicator size="large" color={theme.colors.Primary.Resting} />
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
    <ErrorBoundary
      onError={(error, info) => {
        console.error('ArticleScreen Error:', error, info);
      }}
    >
      <View style={styles.container}>
        {lastError && (
          <ErrorDisplay
            error={lastError}
            onDismiss={clearError}
            showDetails={__DEV__}
          />
        )}
        <StatusBar
          barStyle="dark-content"
          backgroundColor={theme.colors.Surface.Primary}
        />
        {!hideHeader && (
          <TopNav
            title=""
            showBackButton
            onBackPress={() => navigation.goBack()}
            rightButtons={[
              {
                label: "Bookmark",
                icon: isBookmarked ? "bookmark" : "bookmark-outline",
                onPress: handleBookmark
              },
              {
                label: "Share",
                icon: "share-outline",
                onPress: handleShare
              }
            ]}
          />
        )}
        <FlatList
          data={[{ key: 'content' }]}
          renderItem={renderItem}
          keyExtractor={() => 'content'}
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </ErrorBoundary>
  );
};

export default React.memo(ArticleScreen);
