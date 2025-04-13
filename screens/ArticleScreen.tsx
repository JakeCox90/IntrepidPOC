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

const ArticleScreen = ({ route, navigation, hideHeader = false }: ArticleScreenProps) => {
  const theme = useTheme();
  const { articleId, article: routeArticle } = route.params || {};
  const accordionStyles = createAccordionStyles(theme);
  const styles = createStyles(theme);
  const [isBookmarked, setIsBookmarked] = React.useState(false);

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

  // Toggle bookmark state
  const handleBookmark = useCallback(() => {
    setIsBookmarked(prev => !prev);
    console.log('Bookmark toggled:', !isBookmarked);
  }, [isBookmarked]);

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
  const renderItem = useCallback(() => (
    <>
      {/* Content Container */}
      <View style={styles.contentContainer}>
        {/* Article Header */}
        <ArticleHeader
          title={article?.title || ''}
          subtitle={article?.summary || ''}
          imageUrl={article?.imageUrl || ''}
          category={article?.category || ''}
          readTime={article?.readTime || ''}
          flag={article?.flag || ''}
          timestamp={article?.timestamp || ''}
        />

        {/* Audio Player */}
        <View style={styles.audioPlayerContainer}>
          <AudioPlayer
            title={article?.title || ''}
            category={article?.category || ''}
            duration={120}
            onPlay={() => console.log('Play audio')}
            onPause={() => console.log('Pause audio')}
          />
        </View>

        {/* Key Points Accordion */}
        <View style={styles.accordionContainer}>
          <Accordion
            title="Key Points"
            initialExpanded={true}
          >
            <View style={accordionStyles.keyPointsContainer}>
              {article?.content?.split('.')
                .filter(sentence => sentence.trim().length > 0)
                .slice(0, 2)
                .map((sentence, index) => (
                  <Typography
                    key={index}
                    variant="body-02"
                    color={theme.colors.Text.Secondary}
                    style={accordionStyles.keyPoint}
                  >
                    • {sentence.trim()}.
                  </Typography>
                ))}
            </View>
          </Accordion>
        </View>

        {/* Article Body Content */}
        <View style={styles.articleContent}>
          <Typography
            variant="body-01"
            color={theme.colors.Text.Secondary}
            style={styles.paragraph}
          >
            {article?.content}
          </Typography>
        </View>

        {/* Comments Section */}
        <Comments
          comments={comments}
          totalComments={comments.length}
          onShowAllPress={handleShowAllComments}
          onSubmitComment={handleSubmitComment}
          onLikeComment={handleLikeComment}
          onReplyComment={handleReplyComment}
          onViewReplies={handleViewReplies}
        />
      </View>
    </>
  ), [article, styles, comments, handleShowAllComments, handleSubmitComment, handleLikeComment, handleReplyComment, handleViewReplies]);

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
    <View style={styles.container}>
      {!hideHeader && (
        <>
          <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
          {/* Top Navigation */}
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
        </>
      )}

      <FlatList
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollViewContent,
          { paddingBottom: theme.space['80'] }
        ]}
        data={[{ key: 'content' }]}
        renderItem={renderItem}
        keyExtractor={() => 'content'}
        removeClippedSubviews={true}
        maxToRenderPerBatch={5}
        windowSize={3}
        initialNumToRender={1}
        updateCellsBatchingPeriod={50}
      />
    </View>
  );
};

export default React.memo(ArticleScreen);
