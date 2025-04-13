'use client';

import type React from 'react';
import { useState, useCallback, useMemo, memo } from 'react';
import {
  Image,
  type ImageProps,
  View,
  StyleSheet,
  ActivityIndicator,
  StyleProp,
  ImageStyle,
} from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import Skeleton from './Skeleton';

interface LazyImageProps extends ImageProps {
  showLoader?: boolean;
  useSkeleton?: boolean;
  style?: StyleProp<ImageStyle>;
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

  // Extract dimensions from style - memoize to prevent unnecessary calculations
  const { width, height, borderRadius } = useMemo(() => {
    const flattenedStyle = StyleSheet.flatten(style || {});
    return {
      width: flattenedStyle.width,
      height: flattenedStyle.height,
      borderRadius: flattenedStyle.borderRadius
    };
  }, [style]);

  const handleLoad = useCallback(() => {
    setLoading(false);
  }, []);

  const handleError = useCallback(() => {
    setLoading(false);
    setError(true);
  }, []);

  // Memoize the container style
  const containerStyle = useMemo(() => [
    styles.container, 
    { width, height, borderRadius }
  ], [width, height, borderRadius]);

  // Memoize the skeleton component
  const SkeletonComponent = useMemo(() => {
    if (!loading || !useSkeleton) return null;
    
    return (
      <Skeleton
        width={typeof width === 'number' ? width : '100%'}
        height={typeof height === 'number' ? height : 200}
        borderRadius={typeof borderRadius === 'number' ? borderRadius : 0}
        style={styles.skeleton}
      />
    );
  }, [loading, useSkeleton, width, height, borderRadius]);

  // Memoize the loader component
  const LoaderComponent = useMemo(() => {
    if (!loading || !showLoader || useSkeleton) return null;
    
    return (
      <View
        style={[
          styles.loaderContainer,
          {
            width,
            height,
            backgroundColor: theme.colors.Border.Skeleton01,
          },
        ]}
      >
        <ActivityIndicator size="small" color={theme.colors.Primary.Resting} />
      </View>
    );
  }, [loading, showLoader, useSkeleton, width, height, theme.colors.Border.Skeleton01, theme.colors.Primary.Resting]);

  // Memoize the error component
  const ErrorComponent = useMemo(() => {
    if (!error) return null;
    
    return (
      <View
        style={[
          styles.errorContainer,
          {
            width,
            height,
            borderRadius,
            backgroundColor: theme.colors.Border.Skeleton01,
          },
        ]}
      >
        <View style={[styles.errorIcon, { backgroundColor: theme.colors.Border.Secondary }]} />
      </View>
    );
  }, [error, width, height, borderRadius, theme.colors.Border.Skeleton01, theme.colors.Border.Secondary]);

  // Memoize the image component
  const ImageComponent = useMemo(() => {
    if (error) return null;
    
    return (
      <Image
        {...props}
        source={source}
        style={[style, loading && styles.hiddenImage]}
        onLoad={handleLoad}
        onError={handleError}
      />
    );
  }, [error, props, source, style, loading, handleLoad, handleError]);

  return (
    <View style={containerStyle}>
      {SkeletonComponent}
      {LoaderComponent}
      {ErrorComponent}
      {ImageComponent}
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
    backgroundColor: 'transparent',
    justifyContent: 'center',
  },
  errorIcon: {
    backgroundColor: 'transparent',
    borderRadius: 20,
    height: 40,
    width: 40,
  },
  hiddenImage: {
    opacity: 0,
  },
  loaderContainer: {
    alignItems: 'center',
    backgroundColor: 'transparent',
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

export default memo(LazyImage);
