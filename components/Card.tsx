'use client';
import type React from 'react';
import { View, TouchableOpacity, StyleSheet, type StyleProp, type ViewStyle } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { Feather } from '@expo/vector-icons';
import Typography from './Typography';

export interface CardBaseProps {
  id?: number | string;
  onPress?: () => void;
  onBookmark?: () => void;
  onShare?: () => void;
  style?: StyleProp<ViewStyle>;
  footerStyle?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
  readTime?: string;
  timestamp?: string;
  renderFooter?: boolean;
}

const Card: React.FC<CardBaseProps> = ({
  id,
  onPress,
  onBookmark,
  onShare,
  style,
  footerStyle,
  children,
  readTime,
  timestamp,
  renderFooter = false,
}) => {
  const theme = useTheme();

  const renderDefaultFooter = () => {
    if (!renderFooter || (!onBookmark && !onShare && !readTime && !timestamp)) return null;

    return (
      <View style={[styles.footer, footerStyle]}>
        {(readTime || timestamp) && (
          <View style={styles.metaContainer}>
            {readTime && (
              <View style={styles.readTimeContainer}>
                <Feather name="clock" size={14} color={theme.colors.Text.Secondary} />
                <Typography
                  variant="body-02"
                  color={theme.colors.Text.Secondary}
                  style={styles.metaText}
                >
                  {readTime}
                </Typography>
              </View>
            )}
            {timestamp && (
              <Typography
                variant="body-02"
                color={theme.colors.Text.Secondary}
                style={styles.metaText}
              >
                {timestamp}
              </Typography>
            )}
          </View>
        )}

        {(onBookmark || onShare) && (
          <View style={styles.actions}>
            {onBookmark && (
              <TouchableOpacity onPress={onBookmark} style={styles.actionButton}>
                <Feather name="bookmark" size={18} color={theme.colors.Text.Secondary} />
              </TouchableOpacity>
            )}
            {onShare && (
              <TouchableOpacity onPress={onShare} style={styles.actionButton}>
                <Feather name="share" size={18} color={theme.colors.Text.Secondary} />
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
    );
  };

  const content = (
    <>
      <View style={styles.content}>{children}</View>
      {renderFooter && renderDefaultFooter()}
    </>
  );

  if (onPress) {
    return (
      <TouchableOpacity
        style={[styles.container, style]}
        onPress={onPress}
        activeOpacity={0.9}
        testID={`card-${id}`}
      >
        {content}
      </TouchableOpacity>
    );
  }

  return (
    <View style={[styles.container, style]} testID={`card-${id}`}>
      {content}
    </View>
  );
};

const styles = StyleSheet.create({
  actionButton: {
    marginLeft: 16,
    padding: 4,
  },
  actions: {
    flexDirection: 'row',
  },
  container: {
    overflow: 'hidden',
  },
  content: {
    flex: 1,
  },
  footer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 4,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  metaContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  metaText: {
    marginLeft: 6,
  },
  readTimeContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginRight: 12,
  },
});

export default Card;
