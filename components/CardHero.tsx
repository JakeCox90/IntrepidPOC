'use client';
import React, { useMemo, useCallback } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import Flag from './Flag';
import Typography from './Typography';
import LazyImage from './LazyImage';
import Card from './Card';
import ReadTime from './ReadTime';
import { createCardHeroStyles } from './styles/CardHero.styles';
import { getCategoryColor } from '../utils/categoryColors';
import { Feather } from '@expo/vector-icons';
import type { CardHeroProps } from '../types/components';
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

const CardHero = ({
  title,
  subtitle,
  imageUrl,
  category = 'News',
  flag,
  readTime,
  onPress,
  onBookmark,
  onShare,
  style,
}: CardHeroProps) => {
  const theme = useTheme();
  const styles = useMemo(() => createCardHeroStyles(theme), [theme]);
  const categoryColor = useMemo(() => getCategoryColor(category, theme), [category, theme]);

  // Check if the flag is a common flag type
  const isCommonFlag = useMemo(() => 
    flag && COMMON_FLAGS.includes(flag.toUpperCase() as typeof COMMON_FLAGS[number]),
    [flag]
  );

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
    if (!isCommonFlag || !flag) return null;
    
    return (
      <Flag 
        text={flag} 
        style={styles.flag} 
        variant="minimal"
        color={flagColor}
      />
    );
  }, [isCommonFlag, flag, styles.flag, flagColor]);

  const CategoryComponent = useMemo(() => {
    if (!category) return null;
    
    return (
      <Flag 
        text={category} 
        category={category} 
        variant="minimal" 
      />
    );
  }, [category]);

  const TitleComponent = useMemo(() => 
    renderColoredText({
      text: title,
      category,
      theme,
      typographyVariant: 'h5',
      containerStyle: styles.titleContainer
    }),
    [title, category, theme, styles.titleContainer]
  );

  const SubtitleComponent = useMemo(() => {
    if (!subtitle) return null;
    
    return (
      <Typography
        variant="subtitle-01"
        color={theme.colors.Text.Secondary}
        numberOfLines={2}
        style={styles.subtitle}
      >
        {subtitle}
      </Typography>
    );
  }, [subtitle, theme.colors.Text.Secondary, styles.subtitle]);

  const ImageComponent = useMemo(() => (
    <LazyImage 
      source={{ uri: imageUrl }} 
      style={styles.image} 
      resizeMode="cover" 
    />
  ), [imageUrl, styles.image]);

  return (
    <Card
      onPress={onPress}
      onBookmark={onBookmark}
      onShare={onShare}
      readTime={readTime}
      style={styles.container}
    >
      {ImageComponent}

      <View style={styles.heroContent}>
        <View style={styles.flagContainer}>
          {FlagComponent}
          {CategoryComponent}
        </View>

        {TitleComponent}
        {SubtitleComponent}
      </View>

      {/* Footer with read time and actions - moved outside of heroContent */}
      <View style={styles.footer}>
        <View style={styles.readTimeContainer}>
          <ReadTime readTime={readTime || '3 min read'} />
        </View>

        <View style={styles.actionsContainer}>
          {onBookmark && (
            <TouchableOpacity onPress={handleBookmark} style={styles.actionButton}>
              <Feather name="bookmark" size={20} color={theme.colors.Text.Secondary} />
            </TouchableOpacity>
          )}

          {onShare && (
            <TouchableOpacity onPress={handleShare} style={styles.actionButton}>
              <Feather name="share" size={20} color={theme.colors.Text.Secondary} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Card>
  );
};

// Add styles directly to the component props where needed
// const styles = StyleSheet.create({
//   flag: {
//     marginRight: 8,
//   },
// });

export default withPerformanceTracking(React.memo(CardHero), 'CardHero');
