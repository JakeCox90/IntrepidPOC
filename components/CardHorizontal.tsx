'use client';

import React, { useMemo, useCallback } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import Typography from './Typography';
import Card from './Card';
import { Feather } from '@expo/vector-icons';
import LazyImage from './LazyImage';
import ReadTime from './ReadTime';
import { createCardHorizontalStyles } from './styles/CardHorizontal.styles';
import { getCategoryColor } from '../utils/categoryColors';
import Flag from './Flag';
import type { CardHorizontalProps } from '../types/components';
import { renderColoredText } from '../utils/textColouring';
import { withPerformanceTracking } from '../utils/performance';

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
] as const;

const CardHorizontal = ({
  id,
  title,
  imageUrl,
  category,
  flag,
  readTime,
  onPress,
  onBookmark,
  onShare,
  style,
}: CardHorizontalProps) => {
  const theme = useTheme();
  const styles = useMemo(() => createCardHorizontalStyles(theme), [theme]);

  const categoryText = useMemo(() => category || '', [category]);
  const categoryColor = useMemo(() => getCategoryColor(categoryText, theme), [categoryText, theme]);

  // Process title and flag
  const { mainTitle, hasFlag } = useMemo(() => {
    let processedTitle = title || '';
    let hasFlag = false;

    if (!flag) {
      // Split title to check if it has a prefix in all caps (like "EXCLUSIVE")
      const titleParts = processedTitle.split(' ');

      if (titleParts.length > 1) {
        // Check if the first word is a common flag
        const firstWord = titleParts[0].toUpperCase();
        if (COMMON_FLAGS.includes(firstWord as typeof COMMON_FLAGS[number])) {
          // First word is a flag, remove it from the title
          processedTitle = titleParts.slice(1).join(' ');
          hasFlag = true;
        }
        // Check if first two words are a common flag (like "BREAKING NEWS")
        else if (titleParts.length > 2) {
          const firstTwoWords = `${titleParts[0]} ${titleParts[1]}`.toUpperCase();
          if (COMMON_FLAGS.some(f => firstTwoWords.includes(f))) {
            // First two words contain a flag, remove them from the title
            processedTitle = titleParts.slice(2).join(' ');
            hasFlag = true;
          }
        }
      }
    }

    return { mainTitle: processedTitle, hasFlag };
  }, [title, flag]);

  const handleBookmark = useCallback(() => {
    if (onBookmark) {
      onBookmark();
    }
  }, [onBookmark]);

  const handleShare = useCallback(() => {
    if (onShare) {
      onShare();
    }
  }, [onShare]);

  const flagColor = useMemo(() => 
    flag?.toUpperCase() === 'BREAKING' ? theme.colors.Status.Breaking : 
    flag?.toUpperCase() === 'EXCLUSIVE' ? theme.colors.Status.Exclusive :
    theme.colors.Error.Resting,
    [flag, theme.colors.Status.Breaking, theme.colors.Status.Exclusive, theme.colors.Error.Resting]
  );

  const FlagComponent = useMemo(() => {
    if (!flag || !COMMON_FLAGS.includes(flag.toUpperCase() as typeof COMMON_FLAGS[number])) return null;
    
    return (
      <Flag
        text={flag}
        variant="minimal"
        color={flagColor}
        style={{ marginRight: 8 }}
      />
    );
  }, [flag, flagColor]);

  const CategoryComponent = useMemo(() => {
    if (!categoryText) return null;
    
    return (
      <Flag
        text={categoryText}
        variant="minimal"
        category={categoryText}
      />
    );
  }, [categoryText]);

  const TitleComponent = useMemo(() => 
    renderColoredText({
      text: mainTitle,
      category: categoryText,
      theme,
      typographyVariant: 'h6',
      containerStyle: styles.title
    }),
    [mainTitle, categoryText, theme, styles.title]
  );

  const ImageComponent = useMemo(() => {
    if (!imageUrl || imageUrl.trim() === '') {
      return (
        <View style={styles.placeholderImage}>
          <Feather name="image" size={24} color={theme.colors.Text.Secondary} />
        </View>
      );
    }
    
    return (
      <LazyImage 
        source={{ uri: imageUrl }} 
        style={styles.image} 
        resizeMode="cover" 
      />
    );
  }, [imageUrl, styles.placeholderImage, styles.image, theme.colors.Text.Secondary]);

  return (
    <Card id={id} onPress={onPress} style={styles.container}>
      <View style={styles.contentContainer}>
        {/* Image or Placeholder */}
        <View style={styles.imageContainer}>
          {ImageComponent}
        </View>

        {/* Text Content */}
        <View style={styles.textContent}>
          <View style={styles.flagsContainer}>
            {FlagComponent}
            {CategoryComponent}
          </View>

          {TitleComponent}

          <View style={styles.readTimeContainer}>
            <ReadTime readTime={readTime || '3 min read'} />
          </View>
        </View>
      </View>
    </Card>
  );
};

export default withPerformanceTracking(React.memo(CardHorizontal), 'CardHorizontal');
