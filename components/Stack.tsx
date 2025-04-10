import type React from 'react';
import { ScrollView, StyleSheet, type ViewStyle } from 'react-native';

interface StackProps {
  children: React.ReactNode;
  spacing?: number;
  style?: ViewStyle;
  contentContainerStyle?: ViewStyle;
}

// Update the Stack component to ensure proper spacing between items
const Stack = ({ children, spacing = 8, style, contentContainerStyle }: StackProps) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={[styles.container, style]}
      contentContainerStyle={[styles.contentContainer, { gap: spacing }, contentContainerStyle]}
    >
      {children}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 0,
  },
  contentContainer: {
    paddingLeft: 16,
    paddingRight: 16,
  },
});

export default Stack;
