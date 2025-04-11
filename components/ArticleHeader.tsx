'use client';
import { View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeProvider';
import Typography from './Typography';
import Flag from './Flag';
import LazyImage from './LazyImage';
import { baseStyles, getThemedStyles } from './styles/ArticleHeaderStyles';

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

  return (
    <View style={baseStyles.container}>
      {/* Tags */}
      <View style={[baseStyles.tagsContainer, themedStyles.tagsContainer]}>
        {flag && COMMON_FLAGS.includes(flag.toUpperCase()) && (
          <Flag text={flag} style={baseStyles.flag} variant="filled" />
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
