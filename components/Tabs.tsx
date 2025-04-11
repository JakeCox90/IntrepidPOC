'use client';
import { useRef, useState, useEffect } from 'react';
import { View, ScrollView, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import Typography from './Typography';

interface TabsProps {
  tabs: string[];
  activeTab: string;
  onTabPress: (tab: string) => void;
  variant?: 'primary' | 'secondary';
  backgroundColor?: string;
  activeTextColor?: string;
  inactiveTextColor?: string;
  textVariant?: 'overline' | 'body-02' | 'subtitle-02';
  animated?: boolean;
}

const Tabs = ({
  tabs,
  activeTab,
  onTabPress,
  variant = 'primary',
  backgroundColor,
  activeTextColor,
  inactiveTextColor,
  textVariant = 'overline',
  animated = true,
}: TabsProps) => {
  const theme = useTheme();
  const [initialized, setInitialized] = useState(false);

  // Refs for scrolling and position tracking
  const scrollViewRef = useRef<ScrollView>(null);
  const tabPositions = useRef<Record<string, { x: number; width: number }>>({});

  // Animation values
  const animatedPosition = useRef(new Animated.Value(0)).current;
  const animatedWidth = useRef(new Animated.Value(0)).current;

  // Constants for animations and opacity values
  const ANIMATION_DURATION = 300;
  const ACTIVE_TAB_OPACITY = 0.7;

  // Default colors based on variant
  const defaultBgColor =
    variant === 'primary'
      ? backgroundColor || theme.colors.Primary.Resting
      : backgroundColor || theme.colors.Surface.Primary;

  // Set text colors based on variant
  const defaultActiveTextColor =
    variant === 'primary'
      ? activeTextColor || theme.colors.Text.Inverse
      : activeTextColor || theme.colors.Text.Primary;

  const defaultInactiveTextColor =
    variant === 'primary'
      ? inactiveTextColor || `rgba(255, 255, 255, ${ACTIVE_TAB_OPACITY})`
      : inactiveTextColor || theme.colors.Text.Secondary;

  // Border radius from theme
  const borderRadius = theme.radius['radius-pill'] || 9999;

  // Update the animated values when the active tab changes
  useEffect(() => {
    if (!animated || !initialized || !tabPositions.current[activeTab]) return;

    // Get the position of the active tab
    const { x, width } = tabPositions.current[activeTab];

    // Animate to the new position
    Animated.parallel([
      Animated.timing(animatedPosition, {
        toValue: x,
        duration: ANIMATION_DURATION,
        useNativeDriver: false,
      }),
      Animated.timing(animatedWidth, {
        toValue: width,
        duration: ANIMATION_DURATION,
        useNativeDriver: false,
      }),
    ]).start();

    // Scroll to make the active tab visible
    scrollViewRef.current?.scrollTo({
      x: Math.max(0, x - 50), // Scroll to position with some padding
      animated: true,
    });
  }, [activeTab, animatedPosition, animatedWidth, initialized, animated]);

  // Store the position and width of each tab
  const measureTab = (tab: string, x: number, width: number) => {
    tabPositions.current[tab] = { x, width };

    // Initialize the animated values for the first active tab
    if (tab === activeTab && !initialized) {
      animatedPosition.setValue(x);
      animatedWidth.setValue(width);
      setInitialized(true);
    }
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: defaultBgColor },
        variant === 'secondary' && {
          borderBottomWidth: theme.borderWidth['10'],
          borderBottomColor: theme.colors.Border.Primary,
        },
      ]}
    >
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {tabs.map(tab => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tab,
              styles.tabPadding,
              {
                borderRadius: borderRadius,
              },
              activeTab === tab && styles.activeTab,
              activeTab === tab && {
                borderColor:
                  variant === 'primary' ? theme.colors.Text.Inverse : theme.colors.Border.Primary,
              },
            ]}
            onPress={() => onTabPress(tab)}
            onLayout={event => {
              if (animated) {
                const { x, width } = event.nativeEvent.layout;
                measureTab(tab, x, width);
              }
            }}
          >
            <Typography
              variant={textVariant}
              color={activeTab === tab ? defaultActiveTextColor : defaultInactiveTextColor}
              style={[styles.tabText, activeTab === tab && styles.activeTabText]}
            >
              {tab}
            </Typography>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  activeTab: {
    borderWidth: 1,
  },
  activeTabText: {
    fontWeight: '700',
  },
  container: {
    paddingVertical: 8,
    width: '100%',
  },
  contentContainer: {
    paddingHorizontal: 16,
  },
  tab: {
    alignItems: 'center',
    height: 36,
    justifyContent: 'center',
    marginRight: 8,
    zIndex: 1,
  },
  tabPadding: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  tabText: {
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});

export default Tabs;
