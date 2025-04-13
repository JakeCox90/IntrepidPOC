'use client';

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
  readTime,
  onPress,
  onBookmark,
  onShare,
  style,
}: CardHorizontalProps) => {
  const theme = useTheme();
  const styles = createCardHorizontalStyles(theme);

  const categoryText = category || '';
  const categoryColor = getCategoryColor(categoryText, theme);

  // If no flag is provided, use the title directly
  let mainTitle = title || '';

  if (!flag) {
    // Split title to check if it has a prefix in all caps (like "EXCLUSIVE")
    const titleParts = mainTitle.split(' ');

    if (titleParts.length > 1) {
      // Check if the first word is a common flag
      const firstWord = titleParts[0].toUpperCase();
      if (COMMON_FLAGS.includes(firstWord)) {
        // First word is a flag, remove it from the title
        mainTitle = titleParts.slice(1).join(' ');
      }
      // Check if first two words are a common flag (like "BREAKING NEWS")
      else if (titleParts.length > 2) {
        const firstTwoWords = `${titleParts[0]} ${titleParts[1]}`.toUpperCase();
        if (COMMON_FLAGS.some(f => firstTwoWords.includes(f))) {
          // First two words contain a flag, remove them from the title
          mainTitle = titleParts.slice(2).join(' ');
        }
      }
    }
  }

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
            {flag && COMMON_FLAGS.includes(flag.toUpperCase()) && (
              <Flag
                text={flag}
                variant="minimal"
                color={flag.toUpperCase() === 'BREAKING' ? theme.colors.Status.Breaking : 
                       flag.toUpperCase() === 'EXCLUSIVE' ? theme.colors.Status.Exclusive :
                       theme.colors.Error.Resting}
                style={{ marginRight: 8 }}
              />
            )}
            {categoryText && (
              <Flag
                text={categoryText}
                variant="minimal"
                category={categoryText}
              />
            )}
          </View>

          {renderColoredText({
            text: mainTitle,
            category: categoryText,
            theme,
            typographyVariant: 'h6',
            containerStyle: styles.title
          })}
        </View>
      </View>

      {/* Footer with read time and actions */}
      <View style={styles.footer}>
        <View style={styles.readTimeContainer}>
          <ReadTime readTime={readTime || '3 min read'} />
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
