# Refactoring Tasks: Moving Inline Styles to Separate Files

## Overview
This document outlines the tasks required to move inline styles from components to separate style files, following the project's design system and best practices.

## Priority Levels
- 🔴 High Priority - Critical for design system consistency
- 🟡 Medium Priority - Important for maintainability
- 🟢 Low Priority - Nice to have improvements

## Tasks

### 🔴 AudioPlayerDrawer Component
**File**: `components/AudioPlayerDrawer.tsx`
- [ ] Create new file `components/styles/AudioPlayerDrawer.styles.ts`
- [ ] Move animated styles to separate functions:
  - [ ] `createDrawerAnimatedStyle`
  - [ ] `createHeaderAnimatedStyle`
  - [ ] `createContentAnimatedStyle`
- [ ] Move static styles to StyleSheet
- [ ] Use theme values for colors, spacing, and borders
- [ ] Update component to use new style functions

### 🔴 Button Component
**File**: `components/Button.tsx`
- [ ] Create new file `components/styles/Button.styles.ts`
- [ ] Move text color styles to StyleSheet
- [ ] Update renderContent function to use StyleSheet styles
- [ ] Ensure proper theme integration

### 🔴 TopNav Component
**File**: `components/TopNav.tsx`
- [ ] Create new file `components/styles/TopNav.styles.ts`
- [ ] Move all inline styles to StyleSheet
- [ ] Use theme values for spacing and borders
- [ ] Update component to use new styles

### 🔴 Header Component
**File**: `components/Header.tsx`
- [ ] Create new file `components/styles/Header.styles.ts`
- [ ] Remove empty style objects
- [ ] Implement proper styles using theme values
- [ ] Update component to use new styles

### 🟡 ArticleStackScreen Component
**File**: `screens/ArticleStackScreen.tsx`
- [ ] Create new file `screens/styles/ArticleStackScreen.styles.ts`
- [ ] Move all inline styles to StyleSheet
- [ ] Use theme values for spacing and layout
- [ ] Update component to use new styles

### 🟡 ProfileScreen Component
**File**: `screens/ProfileScreen.tsx`
- [ ] Create new file `screens/styles/ProfileScreen.styles.ts`
- [ ] Move all inline styles to StyleSheet
- [ ] Use theme values for spacing and layout
- [ ] Update component to use new styles

### 🟢 App Component
**File**: `App.tsx`
- [ ] Create new file `styles/App.styles.ts`
- [ ] Move all inline styles to StyleSheet
- [ ] Use theme values for spacing and layout
- [ ] Update component to use new styles

### 🟢 TabNavigator Component
**File**: `navigation/TabNavigator.tsx`
- [ ] Create new file `navigation/styles/TabNavigator.styles.ts`
- [ ] Move all inline styles to StyleSheet
- [ ] Use theme values for spacing and layout
- [ ] Update component to use new styles

### 🟢 Skeleton Components
**Files**: 
- `components/Skeleton.tsx`
- `components/SkeletonLoader.tsx`
- [ ] Create new files:
  - `components/styles/Skeleton.styles.ts`
  - `components/styles/SkeletonLoader.styles.ts`
- [ ] Move all inline styles to respective StyleSheets
- [ ] Use theme values for spacing and layout
- [ ] Update components to use new styles

### 🟢 Stack Component
**File**: `components/Stack.tsx`
- [ ] Create new file `components/styles/Stack.styles.ts`
- [ ] Move all inline styles to StyleSheet
- [ ] Use theme values for spacing and layout
- [ ] Update component to use new styles

### 🟢 Stepper Component
**File**: `components/Stepper.tsx`
- [ ] Create new file `components/styles/Stepper.styles.ts`
- [ ] Move all inline styles to StyleSheet
- [ ] Use theme values for spacing and layout
- [ ] Update component to use new styles

## Implementation Guidelines

### Style File Structure
```typescript
import { StyleSheet } from 'react-native';
import { ThemeType } from '../../theme/ThemeProvider';

export const createComponentStyles = (theme: ThemeType) =>
  StyleSheet.create({
    // Group related styles with comments
    container: {
      // Use theme values
      padding: theme.space['40'],
      backgroundColor: theme.colors.Surface.Primary,
    },
    // ... other styles
  });
```

### Component Updates
```typescript
import { createComponentStyles } from './styles/Component.styles';

const Component: React.FC = () => {
  const theme = useTheme();
  const styles = createComponentStyles(theme);
  
  return (
    // Use styles from StyleSheet
  );
};
```

### Best Practices
1. Always use theme values for:
   - Colors
   - Spacing
   - Typography
   - Border radius
   - Border width
2. Group related styles with comments
3. Use consistent naming conventions
4. Export both base styles (if needed) and themed styles
5. Use proper TypeScript typing for all styles

## Dependencies
- Theme Provider
- React Native StyleSheet
- TypeScript

## Notes
- Ensure backward compatibility when moving styles
- Test components after style migration
- Update documentation if needed
- Consider creating a style migration guide for future reference 