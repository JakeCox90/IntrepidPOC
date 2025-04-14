import React, { createContext, useContext, useState, useCallback } from 'react';
import { Article as BaseArticle } from '../types';

interface AudioArticle extends BaseArticle {
  audioUrl?: string;
  duration?: number;
}

interface AudioPlayerContextType {
  isVisible: boolean;
  isPlaying: boolean;
  currentArticle: AudioArticle | null;
  showPlayer: (article: AudioArticle) => void;
  hidePlayer: () => void;
  playAudio: () => void;
  pauseAudio: () => void;
  seekBackward: () => void;
  seekForward: () => void;
}

const AudioPlayerContext = createContext<AudioPlayerContextType | undefined>(undefined);

export const AudioPlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentArticle, setCurrentArticle] = useState<AudioArticle | null>(null);

  const showPlayer = useCallback((article: AudioArticle) => {
    console.log('Showing player with article:', article);
    setCurrentArticle(article);
    setIsVisible(true);
    setIsPlaying(true);
  }, []);

  const hidePlayer = useCallback(() => {
    console.log('Hiding player');
    setIsVisible(false);
    setIsPlaying(false);
    setCurrentArticle(null);
  }, []);

  const playAudio = useCallback(() => {
    console.log('Playing audio');
    setIsPlaying(true);
  }, []);

  const pauseAudio = useCallback(() => {
    console.log('Pausing audio');
    setIsPlaying(false);
  }, []);

  const seekBackward = useCallback(() => {
    console.log('Seeking backward');
    // Implement seek backward logic
  }, []);

  const seekForward = useCallback(() => {
    console.log('Seeking forward');
    // Implement seek forward logic
  }, []);

  return (
    <AudioPlayerContext.Provider
      value={{
        isVisible,
        isPlaying,
        currentArticle,
        showPlayer,
        hidePlayer,
        playAudio,
        pauseAudio,
        seekBackward,
        seekForward,
      }}
    >
      {children}
    </AudioPlayerContext.Provider>
  );
};

export const useAudioPlayer = () => {
  const context = useContext(AudioPlayerContext);
  if (context === undefined) {
    throw new Error('useAudioPlayer must be used within an AudioPlayerProvider');
  }
  return context;
}; 