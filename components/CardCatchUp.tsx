'use client';
import { View, StyleSheet, Image } from 'react-native';
import LazyImage from './LazyImage';
import Typography from './Typography';
import Card from './Card';
import { cardStyles } from '../utils/cardStyles';
import { useTheme } from '../theme/ThemeProvider';
import { palette } from '../design-system/primitives';

interface CardCatchUpProps {
  title: string;
  subtitle: string;
  imageUrl: string;
  count?: number;
  onPress: () => void;
}

const CardCatchUp = ({ title, subtitle, imageUrl, count, onPress }: CardCatchUpProps) => {
  const theme = useTheme();
  const isDailyDigest = title === 'Daily Digest';

  return (
    <Card onPress={onPress} style={cardStyles.catchUpContainer}>
      <View style={cardStyles.catchUpImageContainer}>
        {isDailyDigest ? (
          <Image source={require('../assets/DigestBg.png')} style={styles.image} resizeMode="cover" />
        ) : (
          <LazyImage source={{ uri: imageUrl }} style={styles.image} resizeMode="cover" />
        )}
        <View style={[cardStyles.catchUpOverlay, { backgroundColor: palette.blackTint[10] }]}>
          <View style={styles.content}>
            <Typography variant="h5" color="#FFFFFF" style={styles.title}>
              {title}
            </Typography>
            <Typography variant="body-02" color="#FFFFFF" style={styles.subtitle} numberOfLines={2}>
              {subtitle}
            </Typography>
            {count !== undefined && (
              <Typography variant="annotation" color="#FFFFFF" style={styles.count}>
                {count} stories
              </Typography>
            )}
          </View>
        </View>
      </View>
    </Card>
  );
};
const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  count: {
    opacity: 0.8,
  },
  image: {
    borderRadius: 12,
    height: '100%',
    width: '100%',
  },
  subtitle: {
    marginBottom: 8,
    opacity: 0.9,
  },
  title: {
    marginBottom: 4,
  },
});

export default CardCatchUp;

