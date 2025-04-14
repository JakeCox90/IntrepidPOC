'use client';

import React, { useState, useEffect, useRef } from 'react';
import { View, TouchableOpacity, Animated, Dimensions } from 'react-native';
import Typography from './Typography';
import Flag from './Flag';
import { useAudioPlayer } from '../contexts/AudioPlayerContext';
import { useTheme } from '@theme/ThemeProvider';
import { createAudioPlayerStyles } from '@components/styles/AudioPlayer.styles';
import { Ionicons } from '@expo/vector-icons';
import { Article as BaseArticle } from '../types';

interface AudioArticle extends BaseArticle {
  audioUrl?: string;
  duration?: number;
}

interface AudioPlayerProps {
  article?: AudioArticle;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ article }) => {
  const [remainingTime, setRemainingTime] = useState(article?.duration ?? 120); // Default to 2 minutes if no duration
  const [contentWidth, setContentWidth] = useState(0);
  const [needsScrolling, setNeedsScrolling] = useState(false);
  const scrollAnim = useRef(new Animated.Value(0)).current;
  const theme = useTheme();
  const styles = createAudioPlayerStyles(theme);
  const { isPlaying, currentArticle, showPlayer, playAudio, pauseAudio } = useAudioPlayer();

  // If no article is provided, don't render anything
  if (!article) {
    return null;
  }

  useEffect(() => {
    if (contentWidth > 0) {
      const screenWidth = Dimensions.get('window').width;
      setNeedsScrolling(contentWidth > screenWidth - 200);
    }
  }, [contentWidth]);

  useEffect(() => {
    if (needsScrolling) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(scrollAnim, {
            toValue: -contentWidth,
            duration: 10000,
            useNativeDriver: true,
          }),
          Animated.timing(scrollAnim, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [needsScrolling, contentWidth]);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (isPlaying && currentArticle?.id === article.id) {
      timer = setInterval(() => {
        setRemainingTime((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, currentArticle?.id, article.id]);

  const handlePlayPress = () => {
    if (currentArticle?.id === article.id) {
      if (isPlaying) {
        pauseAudio();
      } else {
        playAudio();
      }
    } else {
      showPlayer(article);
      playAudio();
    }
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePlayPress} style={styles.playButton}>
        <Ionicons
          name={isPlaying && currentArticle?.id === article.id ? 'pause' : 'play'}
          size={24}
          color={theme.colors.Text.Primary}
        />
      </TouchableOpacity>
      <View style={styles.contentContainer}>
        <View style={styles.leftSection}>
          <View style={styles.tickerContainer}>
            <Animated.View
              style={[
                styles.tickerContent,
                needsScrolling && {
                  transform: [{ translateX: scrollAnim }],
                },
              ]}
              onLayout={(event) => setContentWidth(event.nativeEvent.layout.width)}
            >
              <Typography variant="body-01" style={styles.truncatedTitle}>
                {article.title}
              </Typography>
            </Animated.View>
          </View>
          <View style={styles.staticTextContainer}>
            <Flag category={article.category} text={article.category} />
            <View style={styles.durationContainer}>
              <Typography variant="overline" style={styles.duration}>
                {formatTime(remainingTime)}
              </Typography>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default AudioPlayer;
