'use client';

import React, { useEffect } from 'react';
import { View, ScrollView, StatusBar, ActivityIndicator } from 'react-native';
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
import { Article } from '../types/article';
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

  // Debug navigation
  useEffect(() => {
    debugNavigation('ArticleScreen', { route, navigation });
  }, [route, navigation]);

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
            title="Article"
            showBackButton
            onBackPress={() => navigation.goBack()}
            rightButtons={[
              {
                label: "Share",
                onPress: handleShare
              }
            ]}
          />
        </>
      )}

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
        {/* Content Container */}
        <View style={styles.contentContainer}>
          {/* Article Header */}
          <ArticleHeader
            title={article.title}
            subtitle={article.summary}
            imageUrl={article.imageUrl}
            category={article.category}
            readTime={article.readTime}
            flag={article.flag}
            timestamp={article.timestamp}
          />

          {/* Audio Player */}
          <View style={styles.audioPlayerContainer}>
            <AudioPlayer
              title={article.title}
              category={article.category}
              duration={120}
              onPlay={() => console.log('Play audio')}
              onPause={() => console.log('Pause audio')}
              onComplete={() => console.log('Audio completed')}
            />
          </View>

          {/* Key Points Accordion */}
          <View style={styles.accordionContainer}>
            <Accordion
              title="Key Points"
              initialExpanded={true}
            >
              <View style={accordionStyles.keyPointsContainer}>
                <Typography
                  variant="body-02"
                  color={theme.colors.Text.Secondary}
                  style={accordionStyles.keyPoint}
                >
                  • {article.content.split('.')[0]}.
                </Typography>
                {article.content.split('.').length > 1 && (
                  <Typography
                    variant="body-02"
                    color={theme.colors.Text.Secondary}
                    style={accordionStyles.keyPoint}
                  >
                    • {article.content.split('.')[1]}.
                  </Typography>
                )}
              </View>
            </Accordion>
          </View>

          {/* Article content */}
          <View style={styles.articleContent}>
            {article.content.split('.').slice(2).map((paragraph, index) => (
              <Typography
                key={index}
                variant="body-01"
                color={theme.colors.Text.Secondary}
                style={styles.paragraph}
              >
                {paragraph}.
              </Typography>
            ))}
          </View>
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

export default ArticleScreen;
