'use client';

import React, { useState } from 'react';
import {
  Image,
  View,
  StyleSheet,
  ActivityIndicator,
  StyleProp,
  ImageStyle,
  ViewStyle,
} from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import Skeleton from '../components/Skeleton';

interface LazyImageProps {
  source: { uri: string } | number;
  style: StyleProp<ImageStyle>;
  showLoader?: boolean;
  useSkeleton?: boolean;
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'repeat' | 'center';
  onLoad?: () => void;
  onError?: () => void;
}

const LazyImage: React.FC<LazyImageProps> = ({
  source,
  style,
  showLoader = false,
  useSkeleton = false,
  resizeMode = 'cover',
}) => {
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleLoad = (): void => {
    setLoading(false);
  };

  const handleError = (): void => {
    setLoading(false);
    setError(true);
  };

  return (
    <View style={styles.container}>
      {loading && useSkeleton && <Skeleton width="100%" height={200} />}
      {loading && showLoader && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="small" color={theme.colors.Primary.Resting} />
        </View>
      )}
      {error ? (
        <View style={[styles.errorContainer, { backgroundColor: theme.colors.Border.Skeleton }]}>
          <View style={[styles.errorIcon, { backgroundColor: theme.colors.Border.Disabled }]} />
        </View>
      ) : (
        <Image
          source={source}
          style={[style, loading && styles.hiddenImage]}
          onLoad={handleLoad}
          onError={handleError}
          resizeMode={resizeMode}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  errorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorIcon: {
    borderRadius: 20,
    height: 40,
    width: 40,
  },
  hiddenImage: {
    opacity: 0,
  },
  loaderContainer: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
});

export default LazyImage;
