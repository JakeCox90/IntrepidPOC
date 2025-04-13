'use client';
import React from 'react';
import { View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeProvider';
import Typography from './Typography';
import Flag from './Flag';
import LazyImage from './LazyImage';
import ReadTime from './ReadTime';
import { baseStyles, getThemedStyles } from './styles/ArticleHeaderStyles';
import { formatRelativeTime } from '../utils/timeFormat';
import { Byline } from './Byline';

// Add the COMMON_FLAGS constant
// Common flags used by The Sun
const COMMON_FLAGS = [
  'EXCLUSIVE',
  'BREAKING',
  'REVEALED',
  'PICTURED',
  'WATCH',
  'UPDATED',
  'LIVE',
  'SHOCK',
  'TRAGIC',
  'HORROR',
  'URGENT',
  'WARNING',
];

interface ArticleHeaderProps {
  title: string;
  subtitle?: string;
  category?: string;
  flag?: string;
  readTime?: string;
  author?: string;
  timestamp?: string;
  imageUrl?: string;
}

const ArticleHeader = ({
  title,
  subtitle,
  category,
  flag,
  readTime = '3 min read',
  author,
  timestamp,
  imageUrl,
}: ArticleHeaderProps) => {
  const theme = useTheme();
  
  // Get themed styles
  const themedStyles = getThemedStyles(theme);

  // Format the timestamp if it exists
  const formattedTime = timestamp ? formatRelativeTime(timestamp) : 'Recently';

  return (
    <View style={baseStyles.container}>
      {/* Tags */}
      <View style={[baseStyles.tagsContainer, themedStyles.tagsContainer]}>
        {flag && COMMON_FLAGS.includes(flag.toUpperCase()) && (
          <Flag 
            text={flag} 
            style={baseStyles.flag} 
            variant="minimal"
            color={flag.toUpperCase() === 'BREAKING' ? theme.colors.Status.Breaking : 
                   flag.toUpperCase() === 'EXCLUSIVE' ? theme.colors.Status.Exclusive :
                   theme.colors.Error.Resting}
          />
        )}
        {category && (
          <Flag
            text={category}
            category={category}
            style={baseStyles.flag}
            variant="minimal"
          />
        )}
      </View>

      {/* Title */}
      <Typography
        variant="h3"
        color={theme.colors.Text.Primary}
        style={[baseStyles.title, themedStyles.title]}
      >
        {title || 'No title available'}
      </Typography>

      {/* Subtitle */}
      {subtitle && (
        <Typography
          variant="subtitle-01"
          color={theme.colors.Text.Secondary}
          style={[baseStyles.subtitle, themedStyles.subtitle]}
        >
          {subtitle}
        </Typography>
      )}

      {/* Reading time */}
      <View style={[baseStyles.readingTimeContainer, themedStyles.readingTimeContainer]}>
        <ReadTime readTime={readTime} />
      </View>

      {/* Author info */}
      <Byline authorName={author || 'The Sun'} publishDate={formattedTime} />

      {/* Article Image */}
      <View style={[baseStyles.articleImage, themedStyles.imageContainer]}>
        {imageUrl ? (
          <LazyImage
          source={{ uri: imageUrl }}
            style={[baseStyles.image, themedStyles.image]}
            resizeMode="cover"
          />
        ) : (
          <View style={baseStyles.placeholderImage}>
            <Feather name="image" size={24} color={theme.colors.Text.Secondary} />
          </View>
        )}
      </View>
    </View>
  );
};

export default ArticleHeader;
