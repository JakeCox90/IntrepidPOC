'use client';

import React, { useMemo, useCallback } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import Typography from './Typography';
import Flag from './Flag';
import LazyImage from './LazyImage';
import { formatRelativeTime } from '../utils/timeFormat';
import { getCategoryColor } from '../utils/categoryColors';
import { renderColoredText } from '../utils/textColouring';
import { withPerformanceTracking } from '../utils/performance';

interface NewsCardProps {
  title: string;
  imageUrl: string;
  category: string;
  timestamp: string;
  onPress: () => void;
}

const cardWidth = 200; // Width for horizontal scrolling cards

const baseStyles = StyleSheet.create({
  container: {
    width: cardWidth,
    marginRight: 16,
    overflow: 'hidden',
  },
  imageContainer: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  content: {
    padding: 12,
  },
  flagContainer: {
    marginBottom: 8,
  },
  titleContainer: {
    marginBottom: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  timestamp: {
    marginTop: 4,
  },
});

const NewsCard = ({ title, imageUrl, category, timestamp, onPress }: NewsCardProps) => {
  const theme = useTheme();
  
  const styles = useMemo(() => ({
    ...baseStyles,
    container: [
      baseStyles.container,
      {
        backgroundColor: theme.colors.Surface.Primary,
        borderRadius: theme.radius['radius-default'],
        borderWidth: theme.borderWidth['10'],
        borderColor: theme.colors.Border.Primary,
      },
    ],
  }), [theme]);

  const categoryColor = useMemo(() => getCategoryColor(category, theme), [category, theme]);

  // Format the timestamp
  const formattedTime = useMemo(() => formatRelativeTime(timestamp), [timestamp]);

  const handlePress = useCallback(() => {
    onPress();
  }, [onPress]);

  const CategoryComponent = useMemo(() => {
    if (!category) return null;
    
    return (
      <View style={styles.flagContainer}>
        <Flag text={category} category={category} variant="minimal" />
      </View>
    );
  }, [category, styles.flagContainer]);

  const TitleComponent = useMemo(() => 
    renderColoredText({
      text: title,
      category,
      theme,
      typographyVariant: 'h6',
      containerStyle: styles.titleContainer
    }),
    [title, category, theme, styles.titleContainer]
  );

  const ImageComponent = useMemo(() => (
    <LazyImage
      source={{ uri: imageUrl }}
      style={styles.image}
      resizeMode="cover"
      showLoader={false}
    />
  ), [imageUrl, styles.image]);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handlePress}
      activeOpacity={0.9}
      testID="news-card-touchable"
    >
      <View style={styles.imageContainer}>
        {ImageComponent}
      </View>
      <View style={styles.content}>
        {CategoryComponent}
        {TitleComponent}
        <Typography
          variant="annotation"
          color={theme.colors.Text.Secondary}
          style={styles.timestamp}
        >
          {formattedTime}
        </Typography>
      </View>
    </TouchableOpacity>
  );
};

export default withPerformanceTracking(React.memo(NewsCard), 'NewsCard');
