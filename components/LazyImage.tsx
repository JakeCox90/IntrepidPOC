'use client';

import type React from 'react';
import { useState } from 'react';
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
          width={typeof width === 'number' ? width : '100%'}
          height={typeof height === 'number' ? height : 200}
          borderRadius={typeof borderRadius === 'number' ? borderRadius : 0}
          style={styles.skeleton}
        />
      )}

      {loading && showLoader && !useSkeleton && (
        <View
          style={[
            styles.loaderContainer,
            {
              width,
              height,
              backgroundColor: theme.colors.Border.Skeleton,
            },
          ]}
        >
          <ActivityIndicator size="small" color={theme.colors.Primary.Resting} />
        </View>
      )}

      {error ? (
        <View
          style={[
            styles.errorContainer,
            {
              width,
              height,
              borderRadius,
              backgroundColor: theme.colors.Border.Skeleton,
            },
          ]}
        >
          {/* You could use an icon here instead */}
          <View style={[styles.errorIcon, { backgroundColor: theme.colors.Border.Disabled }]} />
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

export default LazyImage;
