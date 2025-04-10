'use client';

import { View, TouchableOpacity } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import Typography from './Typography';
import Card from './Card';
import { Feather } from '@expo/vector-icons';
import LazyImage from './LazyImage';
import { createCardHorizontalStyles } from './styles/CardHorizontal.styles';
import { getCategoryColor } from '../utils/categoryColors';

interface CardHorizontalProps {
  id?: number | string;
  title: string;
  imageUrl: string;
  category: string;
  flag?: string;
  timestamp?: string;
  readTime?: string;
  onPress: () => void;
  onBookmark?: () => void;
  onShare?: () => void;
}

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

const CardHorizontal = ({
  id,
  title,
  imageUrl,
  category,
  flag,
  readTime = '3 min read',
  onPress,
  onBookmark,
  onShare,
}: CardHorizontalProps) => {
  const theme = useTheme();
  const styles = createCardHorizontalStyles(theme);

  const categoryText = category || '';

  // Check if the flag is a common flag type
  const isCommonFlag = flag && COMMON_FLAGS.includes(flag.toUpperCase());

  // If no flag is provided, try to extract it from the title
  let extractedFlag = null;
  let mainTitle = title || '';

  if (!flag) {
    // Split title to check if it has a prefix in all caps (like "EXCLUSIVE")
    const titleParts = mainTitle.split(' ');

    if (titleParts.length > 1) {
      // Check if the first word is a common flag
      const firstWord = titleParts[0].toUpperCase();
      if (COMMON_FLAGS.includes(firstWord)) {
        extractedFlag = firstWord;
        mainTitle = titleParts.slice(1).join(' ');
      }
      // Check if first two words are a common flag (like "BREAKING NEWS")
      else if (titleParts.length > 2) {
        const firstTwoWords = `${titleParts[0]} ${titleParts[1]}`.toUpperCase();
        if (COMMON_FLAGS.some(f => firstTwoWords.includes(f))) {
          extractedFlag = firstTwoWords;
          mainTitle = titleParts.slice(2).join(' ');
        }
      }
    }
  }

  // Using category directly in rendering logic instead of flagToShow variable
  // const flagToShow = flag || (category && COMMON_FLAGS.includes(category.toUpperCase()) ? category : null);

  return (
    <Card id={id} onPress={onPress} style={styles.container}>
      <View style={styles.contentContainer}>
        {/* Image or Placeholder */}
        <View style={styles.imageContainer}>
          {imageUrl && imageUrl.trim() !== '' ? (
            <LazyImage source={{ uri: imageUrl }} style={styles.image} resizeMode="cover" />
          ) : (
            <View style={styles.placeholderImage}>
              <Feather name="image" size={24} color={theme.colors.Text.Secondary} />
            </View>
          )}
        </View>

        {/* Text Content */}
        <View style={styles.textContent}>
          <View style={styles.flagsContainer}>
            {categoryText && (
              <Typography
                variant="overline"
                color={getCategoryColor(categoryText, theme)}
                style={styles.categoryText}
              >
                {categoryText.toUpperCase()}
              </Typography>
            )}
          </View>

          <Typography
            variant="h6"
            color={theme.colors.Text.Primary}
            style={styles.title}
            numberOfLines={3}
          >
            {mainTitle}
          </Typography>
        </View>
      </View>

      {/* Footer with read time and actions */}
      <View style={styles.footer}>
        <View style={styles.readTimeContainer}>
          <Feather name="book-open" size={16} color={theme.colors.Text.Secondary} />
          <Typography
            variant="body-02"
            color={theme.colors.Text.Secondary}
            style={styles.readTimeText}
          >
            {readTime}
          </Typography>
        </View>

        <View style={styles.actionsContainer}>
          {onBookmark && (
            <TouchableOpacity onPress={onBookmark} style={styles.actionButton}>
              <Feather name="bookmark" size={20} color={theme.colors.Text.Secondary} />
            </TouchableOpacity>
          )}

          {onShare && (
            <TouchableOpacity onPress={onShare} style={styles.actionButton}>
              <Feather name="share" size={20} color={theme.colors.Text.Secondary} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Card>
  );
};

export default CardHorizontal;
