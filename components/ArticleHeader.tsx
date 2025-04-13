'use client';
import React, { useMemo, memo } from 'react';
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
import { renderColoredText } from '../utils/textColouring';

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

// Add the COMMON_ACRONYMS constant
// Common acronyms used by The Sun
const COMMON_ACRONYMS = [
  'BBC',
  'ITV',
  'CNN',
  'NHS',
  'NASA',
  'WHO',
  'UN',
  'EU',
  'IMF',
  'G7',
  'G20',
  'OPEC',
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
  
  // Get themed styles - memoize to prevent unnecessary style recalculations
  const themedStyles = useMemo(() => getThemedStyles(theme), [theme]);

  // Format the timestamp if it exists - memoize to prevent unnecessary formatting
  const formattedTime = useMemo(() => 
    timestamp ? formatRelativeTime(timestamp) : 'Recently', 
    [timestamp]
  );

  // Memoize the flag component
  const FlagComponent = useMemo(() => {
    if (!flag || !COMMON_FLAGS.includes(flag.toUpperCase())) return null;
    
    const flagColor = flag.toUpperCase() === 'BREAKING' ? theme.colors.Status.Breaking : 
                     flag.toUpperCase() === 'EXCLUSIVE' ? theme.colors.Status.Exclusive :
                     theme.colors.Error.Resting;
    
    return (
      <Flag 
        text={flag} 
        style={baseStyles.flag} 
        variant="minimal"
        color={flagColor}
      />
    );
  }, [flag, theme.colors.Status.Breaking, theme.colors.Status.Exclusive, theme.colors.Error.Resting]);

  // Memoize the category component
  const CategoryComponent = useMemo(() => {
    if (!category) return null;
    
    return (
      <Flag
        text={category}
        category={category}
        style={baseStyles.flag}
        variant="minimal"
      />
    );
  }, [category]);

  // Memoize the title component
  const TitleComponent = useMemo(() => {
    const titleText = title || 'No title available';
    
    // Check if the title has any all-caps words that need coloring
    const words = titleText.split(' ');
    const hasAllCaps = words.some((word: string): boolean => {
      const isAllCaps = word === word.toUpperCase() && 
        word.length > 1 && 
        !COMMON_ACRONYMS.includes(word) &&
        !(/^\d+$/.test(word));
      return isAllCaps;
    });
    
    if (hasAllCaps) {
      // Use renderColoredText for titles with all-caps words
      return (
        <View style={[baseStyles.title, themedStyles.title]}>
          {renderColoredText({
            text: titleText,
            category: category || '',
            theme,
            typographyVariant: 'h3'
          })}
        </View>
      );
    } else {
      // Use regular Typography for titles without all-caps words
      return (
        <Typography
          variant="h3"
          color={theme.colors.Text.Primary}
          style={[baseStyles.title, themedStyles.title]}
        >
          {titleText}
        </Typography>
      );
    }
  }, [title, category, theme, baseStyles.title, themedStyles.title]);

  // Memoize the subtitle component
  const SubtitleComponent = useMemo(() => {
    if (!subtitle) return null;
    
    // Check if the subtitle has any all-caps words that need coloring
    const words = subtitle.split(' ');
    const hasAllCaps = words.some((word: string): boolean => {
      const isAllCaps = word === word.toUpperCase() && 
        word.length > 1 && 
        !COMMON_ACRONYMS.includes(word) &&
        !(/^\d+$/.test(word));
      return isAllCaps;
    });
    
    if (hasAllCaps) {
      // Use renderColoredText for subtitles with all-caps words
      return (
        <View style={[baseStyles.subtitle, themedStyles.subtitle]}>
          {renderColoredText({
            text: subtitle,
            category: category || '',
            theme,
            typographyVariant: 'h6'
          })}
        </View>
      );
    } else {
      // Use regular Typography for subtitles without all-caps words
      return (
        <Typography
          variant="subtitle-01"
          color={theme.colors.Text.Secondary}
          style={[baseStyles.subtitle, themedStyles.subtitle]}
        >
          {subtitle}
        </Typography>
      );
    }
  }, [subtitle, category, theme, baseStyles.subtitle, themedStyles.subtitle]);

  // Memoize the image component
  const ImageComponent = useMemo(() => {
    if (!imageUrl) {
      return (
        <View style={baseStyles.placeholderImage}>
          <Feather name="image" size={24} color={theme.colors.Text.Secondary} />
        </View>
      );
    }
    
    return (
      <LazyImage
        source={{ uri: imageUrl }}
        style={[baseStyles.image, themedStyles.image]}
        resizeMode="cover"
      />
    );
  }, [imageUrl, theme.colors.Text.Secondary, baseStyles.placeholderImage, baseStyles.image, themedStyles.image]);

  return (
    <View style={baseStyles.container}>
      {/* Tags */}
      <View style={[baseStyles.tagsContainer, themedStyles.tagsContainer]}>
        {FlagComponent}
        {CategoryComponent}
      </View>

      {/* Title */}
      {TitleComponent}

      {/* Subtitle */}
      {SubtitleComponent}

      {/* Reading time */}
      <View style={[baseStyles.readingTimeContainer, themedStyles.readingTimeContainer]}>
        <ReadTime readTime={readTime} />
      </View>

      {/* Author info */}
      <Byline authorName={author || 'The Sun'} publishDate={formattedTime} />

      {/* Article Image */}
      <View style={[baseStyles.articleImage, themedStyles.imageContainer]}>
        {ImageComponent}
      </View>
    </View>
  );
};

export default memo(ArticleHeader);
