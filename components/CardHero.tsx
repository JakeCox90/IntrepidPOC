'use client';
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
  const styles = createCardHeroStyles(theme);
  const categoryColor = getCategoryColor(category, theme);

  // Check if the flag is a common flag type
  const isCommonFlag = flag && COMMON_FLAGS.includes(flag.toUpperCase());

  return (
    <Card
      onPress={onPress}
      onBookmark={onBookmark}
      onShare={onShare}
      readTime={readTime}
      style={styles.container}
    >
      <LazyImage source={{ uri: imageUrl }} style={styles.image} resizeMode="cover" />

      <View style={styles.heroContent}>
        <View style={styles.flagContainer}>
          {isCommonFlag && (
            <Flag 
              text={flag} 
              style={styles.flag} 
              variant="minimal"
              color={flag.toUpperCase() === 'BREAKING' ? theme.colors.Status.Breaking : 
                     flag.toUpperCase() === 'EXCLUSIVE' ? theme.colors.Status.Exclusive :
                     theme.colors.Error.Resting}
            />
          )}
          {category && <Flag text={category} category={category} variant="minimal" />}
        </View>

        {renderColoredText({
          text: title,
          category,
          theme,
          typographyVariant: 'h5',
          containerStyle: styles.titleContainer
        })}

        {subtitle && (
          <Typography
            variant="subtitle-01"
            color={theme.colors.Text.Secondary}
            numberOfLines={2}
            style={styles.subtitle}
          >
            {subtitle}
          </Typography>
        )}
      </View>

      {/* Footer with read time and actions - moved outside of heroContent */}
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

// Add styles directly to the component props where needed
// const styles = StyleSheet.create({
//   flag: {
//     marginRight: 8,
//   },
// });

export default CardHero;
