'use client';
import type React from 'react';
import { View, TouchableOpacity, StyleSheet, type StyleProp, type ViewStyle } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { Feather } from '@expo/vector-icons';
import Typography from './Typography';
import ReadTime from './ReadTime';
import { formatRelativeTime } from '../utils/timeFormat';
import type { CardBaseProps } from '../types/components';
import { useBookmark } from '../contexts/BookmarkContext';

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
  isBookmarked: propIsBookmarked,
}) => {
  const theme = useTheme();
  const { isBookmarked: contextIsBookmarked } = useBookmark();
  
  // Use prop value if provided, otherwise use context value
  const isBookmarked = propIsBookmarked !== undefined 
    ? propIsBookmarked 
    : id ? contextIsBookmarked(id) : false;

  // Format the timestamp if it exists
  const formattedTime = timestamp ? formatRelativeTime(timestamp) : undefined;

  const renderDefaultFooter = () => {
    if (!renderFooter || (!onBookmark && !onShare && !readTime && !formattedTime)) return null;

    return (
      <View style={[styles.footer, footerStyle]}>
        {(readTime || formattedTime) && (
          <View style={styles.metaContainer}>
            {readTime && (
              <View style={styles.readTimeContainer}>
                <ReadTime readTime={readTime} />
              </View>
            )}
            {formattedTime && (
              <Typography
                variant="body-02"
                color={theme.colors.Text.Secondary}
                style={styles.metaText}
              >
                {formattedTime}
              </Typography>
            )}
          </View>
        )}

        {(onBookmark || onShare) && (
          <View style={styles.actions}>
            {onBookmark && (
              <TouchableOpacity onPress={onBookmark} style={styles.actionButton}>
                <Feather 
                  name={isBookmarked ? "bookmark" : "bookmark"} 
                  size={18} 
                  color={isBookmarked ? theme.colors.Primary.Resting : theme.colors.Text.Secondary} 
                />
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
