import { View, StyleSheet } from 'react-native';
import Skeleton from './Skeleton';
import { useTheme } from '../theme/ThemeProvider';

const SkeletonCardCatchUp = () => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      borderRadius: 12,
      height: 160,
      marginRight: 12,
      overflow: 'hidden',
      position: 'relative',
      width: 280,
    },
    overlay: {
      backgroundColor: theme.colors.Surface.Overlay02,
      bottom: 0,
      left: 0,
      padding: 16,
      position: 'absolute',
      right: 0,
    },
    subtitle: {
      marginBottom: 8,
    },
    title: {
      marginBottom: 4,
    },
  });

  return (
    <View style={styles.container}>
      {/* Background skeleton */}
      <Skeleton width={280} height={160} borderRadius={12} />

      {/* Content overlay - positioned absolutely */}
      <View style={styles.overlay}>
        <Skeleton width={120} height={20} style={styles.title} />
        <Skeleton width={200} height={16} style={styles.subtitle} />
        <Skeleton width={80} height={14} />
      </View>
    </View>
  );
};

export default SkeletonCardCatchUp;
