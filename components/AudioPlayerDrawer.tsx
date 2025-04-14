import React, { useCallback, useEffect } from 'react';
import { View, Dimensions, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '@theme/ThemeProvider';
import Typography from '@components/Typography';
import { useAudioPlayer } from '../contexts/AudioPlayerContext';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const MINI_PLAYER_HEIGHT = 60;
const TAB_NAV_HEIGHT = 49;
const FULL_SCREEN_HEIGHT = SCREEN_HEIGHT * 0.9;
const MAX_TRANSLATE = FULL_SCREEN_HEIGHT - MINI_PLAYER_HEIGHT;
const SPRING_CONFIG = {
  damping: 20,
  mass: 1,
  stiffness: 200,
};

export const AudioPlayerDrawer: React.FC = () => {
  const theme = useTheme();
  const {
    isVisible,
    isPlaying,
    currentArticle,
    hidePlayer,
    playAudio,
    pauseAudio,
    seekBackward,
    seekForward,
  } = useAudioPlayer();

  // Animation values
  const translateY = useSharedValue(0);
  const isMaximized = useSharedValue(false);
  const context = useSharedValue({ y: 0 });

  // Reset animation when visibility changes
  useEffect(() => {
    if (isVisible) {
      // Start in minimized state at the bottom
      translateY.value = withSpring(0, SPRING_CONFIG);
      isMaximized.value = false;
    } else {
      // Hide the drawer by moving it off-screen
      translateY.value = withSpring(SCREEN_HEIGHT, SPRING_CONFIG);
    }
  }, [isVisible, translateY, isMaximized]);

  const maximizeDrawer = useCallback(() => {
    // Move up to show the full player
    translateY.value = withSpring(-MAX_TRANSLATE, SPRING_CONFIG);
    isMaximized.value = true;
  }, [translateY, isMaximized]);

  const minimizeDrawer = useCallback(() => {
    // Move down to show only the mini player
    translateY.value = withSpring(0, SPRING_CONFIG);
    isMaximized.value = false;
  }, [translateY, isMaximized]);

  const handleMiniPlayerPress = useCallback(() => {
    if (!isMaximized.value) {
      maximizeDrawer();
    }
  }, [isMaximized.value, maximizeDrawer]);

  // Pan gesture for drawer
  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = { y: translateY.value };
    })
    .onUpdate((event) => {
      // Allow dragging within bounds
      const newPosition = context.value.y + event.translationY;
      
      // Allow dragging down to dismiss
      if (newPosition >= 0) {
        translateY.value = newPosition;
      } 
      // Allow dragging within normal range
      else if (newPosition >= -MAX_TRANSLATE) {
        translateY.value = newPosition;
      }
    })
    .onEnd((event) => {
      // If dragged down significantly, dismiss
      if (translateY.value > 100 || event.velocityY > 500) {
        // Animate to the bottom of the screen before hiding
        translateY.value = withSpring(SCREEN_HEIGHT, SPRING_CONFIG, () => {
          runOnJS(hidePlayer)();
        });
        return;
      }

      // Otherwise snap to nearest position
      if (translateY.value > -MAX_TRANSLATE / 2) {
        runOnJS(minimizeDrawer)();
      } else {
        runOnJS(maximizeDrawer)();
      }
    });

  // Animated styles for the drawer
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: SCREEN_HEIGHT,
      backgroundColor: theme.colors.Surface.Primary,
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      shadowColor: theme.colors.Text.Primary,
      shadowOffset: { width: 0, height: -2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      zIndex: 9999,
    };
  });

  // Animated styles for the header
  const headerAnimatedStyle = useAnimatedStyle(() => {
    // Interpolate opacity based on position
    const opacity = interpolate(
      translateY.value,
      [-MAX_TRANSLATE, -MAX_TRANSLATE / 2, 0],
      [1, 0.5, 0],
      Extrapolate.CLAMP
    );

    return {
      opacity,
      height: MINI_PLAYER_HEIGHT,
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      backgroundColor: 'transparent',
      borderTopWidth: 1,
      borderTopColor: 'rgba(0,0,0,0.1)',
      paddingHorizontal: 16,
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 10,
    };
  });

  // Animated styles for the content
  const contentAnimatedStyle = useAnimatedStyle(() => {
    return {
      flex: 1,
      padding: 16,
      paddingTop: MINI_PLAYER_HEIGHT + 16,
      paddingBottom: 16 + TAB_NAV_HEIGHT,
    };
  });

  // Only render when visible and there's a current article
  if (!isVisible || !currentArticle) {
    return null;
  }

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={animatedStyle}>
        {/* Header that transitions between minimized and expanded states */}
        <Animated.View style={headerAnimatedStyle}>
          <TouchableOpacity 
            onPress={handleMiniPlayerPress}
            activeOpacity={0.9}
            style={styles.headerContent}
          >
            <View style={styles.miniPlayerImage} />
            <View style={styles.miniPlayerTextContainer}>
              <Typography variant="subtitle-02" color={theme.colors.Text.Primary} numberOfLines={1}>
                {currentArticle.title}
              </Typography>
              <Typography variant="caption" color={theme.colors.Text.Secondary} numberOfLines={1}>
                {currentArticle.category}
              </Typography>
            </View>
            <TouchableOpacity onPress={isPlaying ? pauseAudio : playAudio}>
              <Ionicons
                name={isPlaying ? 'pause' : 'play'}
                size={24}
                color={theme.colors.Text.Primary}
              />
            </TouchableOpacity>
          </TouchableOpacity>
        </Animated.View>

        {/* Full Screen Content */}
        <Animated.View style={contentAnimatedStyle}>
          <View style={styles.header}>
            <TouchableOpacity onPress={minimizeDrawer} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
              <Ionicons
                name="chevron-down"
                size={24}
                color={theme.colors.Text.Primary}
              />
            </TouchableOpacity>
            <Typography variant="subtitle-01" color={theme.colors.Text.Primary}>
              Now Playing
            </Typography>
            <Ionicons name="ellipsis-horizontal" size={24} color={theme.colors.Text.Primary} />
          </View>

          <View style={styles.albumArt} />

          <View style={styles.controls}>
            <Typography variant="h6" color={theme.colors.Text.Primary} style={{ marginBottom: 8 }}>
              {currentArticle.title}
            </Typography>
            <Typography variant="body-01" color={theme.colors.Text.Secondary}>
              {currentArticle.category}
            </Typography>

            <View style={styles.playbackControls}>
              <TouchableOpacity onPress={seekBackward}>
                <Ionicons
                  name="play-skip-back"
                  size={32}
                  color={theme.colors.Text.Primary}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={isPlaying ? pauseAudio : playAudio}>
                <Ionicons
                  name={isPlaying ? 'pause-circle' : 'play-circle'}
                  size={64}
                  color={theme.colors.Primary.Resting}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={seekForward}>
                <Ionicons
                  name="play-skip-forward"
                  size={32}
                  color={theme.colors.Text.Primary}
                />
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    height: MINI_PLAYER_HEIGHT,
  },
  miniPlayerImage: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,0.1)',
    marginRight: 16,
  },
  miniPlayerTextContainer: {
    flex: 1,
    marginRight: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  albumArt: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.1)',
    marginBottom: 16,
  },
  controls: {
    alignItems: 'center',
  },
  playbackControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '60%',
    marginTop: 16,
  },
}); 