'use client';

import type React from 'react';
import { useState } from 'react';
import { Image, type ImageProps, View, StyleSheet, ActivityIndicator } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import Skeleton from './Skeleton';

interface LazyImageProps extends ImageProps {
  showLoader?: boolean;
  useSkeleton?: boolean;
}

const LazyImage: React.FC<LazyImageProps> = ({
  style,
  source,
  showLoader = true,
  useSkeleton = true,
  ...props
}) => {
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Extract dimensions from style
  const flattenedStyle = StyleSheet.flatten(style || {});
  const { width, height, borderRadius } = flattenedStyle;

  const handleLoad = () => {
    setLoading(false);
  };

  const handleError = () => {
    setLoading(false);
    setError(true);
  };

  return (
    <View style={[styles.container, { width, height, borderRadius }]}>
      {loading && useSkeleton && (
        <Skeleton
          width={width || '100%'}
          height={height || 200}
          borderRadius={borderRadius || 0}
          style={styles.skeleton}
        />
      )}

      {loading && showLoader && !useSkeleton && (
        <View style={[styles.loaderContainer, { width, height }]}>
          <ActivityIndicator size="small" color={theme.colors.Primary.Resting} />
        </View>
      )}

      {error ? (
        <View style={[styles.errorContainer, { width, height, borderRadius }]}>
          {/* You could use an icon here instead */}
          <View style={styles.errorIcon} />
        </View>
      ) : (
        <Image
          {...props}
          source={source}
          style={[style, loading && styles.hiddenImage]}
          onLoad={handleLoad}
          onError={handleError}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    position: 'relative',
  },
  errorContainer: {
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
  },
  errorIcon: {
    backgroundColor: '#e0e0e0',
    borderRadius: 20,
    height: 40,
    width: 40,
  },
  hiddenImage: {
    opacity: 0,
  },
  loaderContainer: {
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    bottom: 0,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1,
  },
  skeleton: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1,
  },
});

export default LazyImage;
