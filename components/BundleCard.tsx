'use client';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import Typography from './Typography';
import { Feather } from '@expo/vector-icons';

interface BundleCardProps {
  title: string;
  subtitle: string;
  storyCount: number;
  imageUrl: string;
  onPress: () => void;
  onNotify?: () => void;
}

const cardWidth = 280;
const cardHeight = 265;

const BundleCard = ({
  title,
  subtitle,
  storyCount,
  imageUrl,
  onPress,
  onNotify,
}: BundleCardProps) => {
  const theme = useTheme();
  const handleNotifyPress = e => {
    e.stopPropagation();
    if (onNotify) {
      onNotify();
    }
  };

  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress}>
      <ImageBackground
        source={{ uri: imageUrl }}
        style={styles.container}
        imageStyle={styles.imageStyle}
      >
        {/* Dark gradient overlay */}
        <View style={styles.overlay}>
          <View style={styles.content}>
            <Typography variant="h5" color="#FFFFFF" style={styles.title}>
              {title}
            </Typography>
            <Typography variant="body-02" color="#FFFFFF" style={styles.subtitle}>
              {subtitle}
            </Typography>
            <Typography variant="body-02" color="#FFFFFF" style={styles.storyCount}>
              {storyCount} stories
            </Typography>
          </View>

          <TouchableOpacity style={styles.notifyButton} onPress={handleNotifyPress}>
            <View style={styles.notifyIconContainer}>
              <Feather name="bell" size={20} color="#FFFFFF" />
            </View>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    height: cardHeight,
    overflow: 'hidden',
    width: cardWidth,
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  imageStyle: {
    borderRadius: 12,
  },
  notifyButton: {
    alignSelf: 'flex-end',
  },
  notifyIconContainer: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 18,
    height: 36,
    justifyContent: 'center',
    width: 36,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  storyCount: {
    opacity: 0.8,
  },
  subtitle: {
    marginBottom: 4,
    opacity: 0.9,
  },
  title: {
    fontWeight: '700',
    marginBottom: 4,
  },
});

export default BundleCard;
