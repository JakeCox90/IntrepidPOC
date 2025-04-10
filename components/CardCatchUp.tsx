'use client';
import { View, StyleSheet } from 'react-native';
import LazyImage from './LazyImage';
import Typography from './Typography';
import Card from './Card';
import { cardStyles } from '../utils/cardStyles';

interface CardCatchUpProps {
  title: string;
  subtitle: string;
  imageUrl: string;
  count?: number;
  onPress: () => void;
}

const CardCatchUp = ({ title, subtitle, imageUrl, count, onPress }: CardCatchUpProps) => {
  return (
    <Card onPress={onPress} style={cardStyles.catchUpContainer}>
      <View style={cardStyles.catchUpImageContainer}>
        <LazyImage source={{ uri: imageUrl }} style={styles.image} resizeMode="cover" />
        <View style={cardStyles.catchUpOverlay}>
          <Typography variant="subtitle-01" color="#FFFFFF" style={styles.title}>
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
    </Card>
  );
};

const styles = StyleSheet.create({
  count: {
    fontWeight: '600',
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
