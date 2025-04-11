'use client';

import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import Typography from '../components/Typography';
import Flag from './Flag';
import LazyImage from './LazyImage';

interface NewsCardProps {
  title: string;
  imageUrl: string;
  category: string;
  timestamp: string;
  onPress: () => void;
}

const cardWidth = 200; // Width for horizontal scrolling cards

const NewsCard = ({ title, imageUrl, category, timestamp, onPress }: NewsCardProps) => {
  const theme = useTheme();

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
        <Typography
          variant="h6"
          color={theme.colors.Text.Primary}
          numberOfLines={4}
          style={styles.title}
        >
          {title}
        </Typography>
        <Typography
          variant="annotation"
          color={theme.colors.Text.Secondary}
          style={styles.timestamp}
        >
          {timestamp}
        </Typography>
      </View>
    </TouchableOpacity>
  );
};

// Create standard StyleSheet with static styles
const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    width: cardWidth,
  },
  content: {
    padding: 12,
  },
  flagContainer: {
    marginBottom: 4,
  },
  image: {
    height: '100%',
    width: '100%',
  },
  imageContainer: {
    height: 100,
    width: '100%',
  },
  timestamp: {},
  title: {
    marginBottom: 8,
  },
});

export default NewsCard;
