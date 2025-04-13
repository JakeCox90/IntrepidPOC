'use client';

import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import Typography from './Typography';
import Flag from './Flag';
import LazyImage from './LazyImage';
import { formatRelativeTime } from '../utils/timeFormat';
import { getCategoryColor } from '../utils/categoryColors';
import { renderColoredText } from '../utils/textColouring';

interface NewsCardProps {
  title: string;
  imageUrl: string;
  category: string;
  timestamp: string;
  onPress: () => void;
}

const cardWidth = 200; // Width for horizontal scrolling cards

const styles = StyleSheet.create({
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
  const categoryColor = getCategoryColor(category, theme);

  // Format the timestamp
  const formattedTime = formatRelativeTime(timestamp);

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.Surface.Primary,
          borderRadius: theme.radius['radius-default'],
          borderWidth: theme.borderWidth['10'],
          borderColor: theme.colors.Border.Primary,
        },
      ]}
      onPress={onPress}
      activeOpacity={0.9}
      testID="news-card-touchable"
    >
      <View style={styles.imageContainer}>
        <LazyImage
          source={{ uri: imageUrl }}
          style={styles.image}
          resizeMode="cover"
          showLoader={false}
        />
      </View>
      <View style={styles.content}>
        {category && (
          <View style={styles.flagContainer}>
            <Flag text={category} category={category} variant="minimal" />
          </View>
        )}
        {renderColoredText({
          text: title,
          category,
          theme,
          typographyVariant: 'h6',
          containerStyle: styles.titleContainer
        })}
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

export default NewsCard;
