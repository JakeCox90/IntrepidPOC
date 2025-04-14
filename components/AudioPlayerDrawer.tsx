import React, { useRef, useEffect } from 'react';
import { View, Animated, PanResponder, Dimensions } from 'react-native';
import { Typography } from './Typography';
import { Icon } from './Icon';
import { useAudioPlayer } from '../contexts/AudioPlayerContext';
import { createStyles } from './styles/AudioPlayerDrawer.styles';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const MINI_PLAYER_HEIGHT = 60;
const FULL_SCREEN_HEIGHT = SCREEN_HEIGHT * 0.9;

export const AudioPlayerDrawer: React.FC = () => {
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

  const pan = useRef(new Animated.Value(0)).current;
  const lastGestureDy = useRef(0);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        const newPosition = lastGestureDy.current + gestureState.dy;
        if (newPosition >= 0 && newPosition <= FULL_SCREEN_HEIGHT) {
          pan.setValue(newPosition);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        lastGestureDy.current += gestureState.dy;
        if (gestureState.dy > 50) {
          // Dragging down
          Animated.spring(pan, {
            toValue: 0,
            useNativeDriver: true,
          }).start(() => {
            lastGestureDy.current = 0;
          });
        } else if (gestureState.dy < -50) {
          // Dragging up
          Animated.spring(pan, {
            toValue: FULL_SCREEN_HEIGHT,
            useNativeDriver: true,
          }).start(() => {
            lastGestureDy.current = FULL_SCREEN_HEIGHT;
          });
        } else {
          // Return to previous position
          Animated.spring(pan, {
            toValue: lastGestureDy.current,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  const translateY = pan.interpolate({
    inputRange: [0, FULL_SCREEN_HEIGHT],
    outputRange: [0, FULL_SCREEN_HEIGHT - MINI_PLAYER_HEIGHT],
  });

  const styles = createStyles();

  if (!isVisible || !currentArticle) {
    return null;
  }

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateY }],
        },
      ]}
      {...panResponder.panHandlers}
    >
      <View style={styles.miniPlayerContainer}>
        <View style={styles.miniPlayerContent}>
          <View style={styles.miniPlayerImage} />
          <View style={styles.miniPlayerTextContainer}>
            <Typography variant="caption" color="text.primary">
              {currentArticle.title}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {currentArticle.category}
            </Typography>
          </View>
          <Icon
            name={isPlaying ? 'pause' : 'play'}
            size={24}
            onPress={isPlaying ? pauseAudio : playAudio}
          />
        </View>
      </View>

      <View style={styles.fullScreenContainer}>
        <View style={styles.header}>
          <Icon name="chevron-down" size={24} onPress={hidePlayer} />
          <Typography variant="subtitle" color="text.primary">
            Now Playing
          </Typography>
          <Icon name="more-vertical" size={24} />
        </View>

        <View style={styles.albumArt} />

        <View style={styles.controls}>
          <Typography variant="title" color="text.primary">
            {currentArticle.title}
          </Typography>
          <Typography variant="body" color="text.secondary">
            {currentArticle.category}
          </Typography>

          <View style={styles.playbackControls}>
            <Icon name="skip-back" size={32} onPress={seekBackward} />
            <Icon
              name={isPlaying ? 'pause-circle' : 'play-circle'}
              size={64}
              onPress={isPlaying ? pauseAudio : playAudio}
            />
            <Icon name="skip-forward" size={32} onPress={seekForward} />
          </View>
        </View>
      </View>
    </Animated.View>
  );
}; 