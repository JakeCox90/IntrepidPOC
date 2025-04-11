'use client';

import type React from 'react';
import { useState, useRef, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Animated, LayoutChangeEvent } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeProvider';
import Typography from './Typography';

interface AccordionProps {
  title: string;
  children: React.ReactNode;
  initialExpanded?: boolean;
}

/**
 * Accordion component that can expand/collapse to show/hide content
 *
 * @param title - The title displayed in the header
 * @param children - The content to show when expanded
 * @param initialExpanded - Whether the accordion starts expanded (default: false)
 */
export default function Accordion({ title, children, initialExpanded = false }: AccordionProps) {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(initialExpanded);
  const animatedHeight = useRef(new Animated.Value(initialExpanded ? 1 : 0)).current;
  const contentHeight = useRef(0);

  useEffect(() => {
    Animated.timing(animatedHeight, {
      toValue: expanded ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [expanded, animatedHeight]);

  const toggleAccordion = () => {
    setExpanded(!expanded);
  };

  const onContentLayout = (event: LayoutChangeEvent) => {
    if (contentHeight.current === 0) {
      contentHeight.current = event.nativeEvent.layout.height;
    }
  };

  const height = animatedHeight.interpolate({
    inputRange: [0, 1],
    outputRange: [0, contentHeight.current],
  });

  return (
    <View
      style={[
        styles.wrapper,
        {
          backgroundColor: theme.colors.Surface.Primary,
          borderWidth: theme.borderWidth['10'],
          borderRadius: theme.radius['radius-default'],
        },
      ]}
    >
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={toggleAccordion}
        style={[
          styles.header,
          {
            backgroundColor: theme.colors.Surface.Primary,
            borderBottomColor: expanded
              ? theme.colors.Primary.Resting
              : theme.colors.Border.Primary,
          },
          expanded ? styles.expandedHeader : styles.collapsedHeader,
        ]}
      >
        <Typography variant="h6" color={theme.colors.Text.Primary}>
          {title}
        </Typography>
        <Ionicons name={expanded ? 'remove' : 'add'} size={24} color={theme.colors.Text.Primary} />
      </TouchableOpacity>

      <Animated.View
        style={[
          styles.contentContainer,
          {
            opacity: animatedHeight,
            backgroundColor: theme.colors.Surface.Primary,
          },
          expanded ? styles.expandedContent : { height },
        ]}
      >
        <View style={styles.content} onLayout={onContentLayout}>
          {children}
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  collapsedHeader: {
    borderBottomWidth: 0,
    borderRadius: 0,
  },
  content: {
    padding: 16,
  },
  contentContainer: {
    overflow: 'hidden',
  },
  expandedContent: {
    height: 'auto',
  },
  expandedHeader: {
    borderBottomWidth: 1,
    borderRadius: 0,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 68,
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  wrapper: {
    marginBottom: 16,
    overflow: 'hidden',
  },
});
