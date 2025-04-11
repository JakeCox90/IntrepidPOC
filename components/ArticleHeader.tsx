'use client';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeProvider';
import Typography from './Typography';
import Flag from './Flag';
import LazyImage from './LazyImage';

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

const { width } = Dimensions.get('window');
const imageHeight = (width * 2) / 3; // 3:2 ratio

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

  // Get the border radius from theme
  const borderRadius = theme?.radius?.['radius-default'] || 8;

  // All themed styles with proper theme values
  const themedStyles = {
    articleImage: {
      backgroundColor:
        theme?.colors?.Border?.Primary || theme?.colors?.Surface?.Secondary,
      borderRadius: borderRadius,
      height: imageHeight,
      marginBottom: theme?.space?.['40'] || 16,
      overflow: 'hidden',
    },
    authorContainer: {
      marginBottom: theme?.space?.['40'] || 16,
    },
    flag: {
      marginRight: theme?.space?.['20'] || 8,
    },
    readingTime: {
      marginLeft: theme?.space?.['10'] || 4,
    },
    readingTimeContainer: {
      marginBottom: theme?.space?.['20'] || 8,
    },
    subtitle: {
      marginBottom: theme?.space?.['30'] || 12,
    },
    tagsContainer: {
      marginBottom: theme?.space?.['20'] || 8,
    },
    title: {
      marginBottom: theme?.space?.['20'] || 8,
    },
  };

  return (
    <View style={baseStyles.container}>
      {/* Tags */}
      <View style={[baseStyles.tagsContainer, themedStyles.tagsContainer]}>
        {flag && COMMON_FLAGS.includes(flag.toUpperCase()) && (
          <Flag text={flag} style={[baseStyles.flag, themedStyles.flag]} variant="filled" />
        )}
        {category && (
          <Flag
            text={category}
            category={category}
            style={[baseStyles.flag, themedStyles.flag]}
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
        <Feather name="clock" size={14} color={theme.colors.Text.Secondary} />
        <Typography
          variant="subtitle-02"
          color={theme.colors.Text.Secondary}
          style={[baseStyles.readingTime, themedStyles.readingTime]}
        >
          {readTime}
        </Typography>
      </View>

      {/* Author info */}
      <View style={[baseStyles.authorContainer, themedStyles.authorContainer]}>
        <Typography variant="subtitle-02" color={theme.colors.Text.Primary}>
          {author || 'The Sun'}
        </Typography>
        <Typography variant="body-02" color={theme.colors.Text.Secondary}>
          Published {timestamp || 'Recently'}
        </Typography>
      </View>

      {/* Article Image */}
      <View
        style={[
          baseStyles.articleImage,
          themedStyles.articleImage,
          {
            borderWidth: theme.borderWidth['10'],
            borderColor: theme.colors.Border.Primary,
          },
        ]}
      >
        {imageUrl ? (
          <LazyImage
            source={{ uri: imageUrl }}
            style={[baseStyles.image, { borderRadius: borderRadius - 1 }]}
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

// Base styles that don't depend on theme
const baseStyles = StyleSheet.create({
  articleImage: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    width: '100%',
  },
  container: {
    width: '100%',
  },
  image: {
    height: '100%',
    width: '100%',
  },
  placeholderImage: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
    width: '100%',
  }, // This style is used on line 165
  readingTimeContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  tagsContainer: {
    flexDirection: 'row',
  },
});

export default ArticleHeader;
