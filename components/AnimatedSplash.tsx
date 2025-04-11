import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Animated, Dimensions } from 'react-native';

interface AnimatedSplashProps {
  onAnimationComplete?: () => void;
}

const AnimatedSplash: React.FC<AnimatedSplashProps> = ({ onAnimationComplete }) => {
  const scaleValue = new Animated.Value(1);

  useEffect(() => {
    const pulseAnimation = Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 1.1,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
    ]);

    // Create a loop of the pulse animation
    Animated.loop(pulseAnimation, {
      iterations: -1, // Infinite loop
    }).start();

    // Optional: Call onAnimationComplete when ready to transition
    const timeout = setTimeout(() => {
      onAnimationComplete?.();
    }, 2000); // Adjust timing as needed

    return () => clearTimeout(timeout);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.logoContainer, { transform: [{ scale: scaleValue }] }]}>
        <Image
          source={require('../assets/splash-icon.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E03A3A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    width: 200, // Adjust size as needed
    height: 200, // Adjust size as needed
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: '100%',
    height: '100%',
  },
});

export default AnimatedSplash; 