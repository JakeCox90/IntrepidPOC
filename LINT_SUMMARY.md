# Lint Issues Summary and Recommendations

## Fixed Issues

We've successfully fixed the following critical issues:

1. **ArticleSwipeScreen.tsx**
   - ✅ Replaced `any` type with proper navigation type
   - ✅ Moved color literals to theme-based colors
   - ✅ Fixed shadow styles and style orders

2. **BundleCard.tsx**
   - ✅ Added proper TypeScript types
   - ✅ Moved styles inside component for proper theme access
   - ✅ Added proper ImageBackground import

3. **SavedScreen.tsx**
   - ✅ Fixed HTML entities (`'` -> `&apos;`)
   - ✅ Moved shadow color to theme system

4. **App.tsx**
   - ✅ Removed unused Typography import
   - ✅ Replaced color literals with theme colors

5. **Tabs.tsx**
   - ✅ Removed unused variables
   - ✅ Fixed inline style issues

6. **TopNav.tsx**
   - ✅ Sorted style class names alphabetically
   - ✅ Moved inline styles to StyleSheet

7. **utils/cardStyles.ts**
   - ✅ Reorganized styles with proper grouping
   - ✅ Added clear documentation
   - ✅ Provided guidance for theme color usage

## Remaining Issues

### High Priority Issues

1. **ArticleHeader.tsx**
   - Issues: Undefined styles reference, unused styles
   - Recommendation: Fix line 165 to use proper style reference, remove unused styles

2. **SkeletonLoader.tsx**
   - Issues: Multiple `any` types
   - Recommendation: Replace with proper component types like `React.ComponentType<unknown>`

3. **Comments.tsx**
   - Issues: Unused handleSubmitComment, inline styles, color literals
   - Recommendation: Remove unused function or implement it on submit button, move inline styles to StyleSheet

4. **NewsCard.tsx**
   - Issues: Unexpected any type
   - Recommendation: Replace with Theme type or proper component type

### Medium Priority Issues

1. **LazyImage.tsx**
   - Issues: Color literals (#f0f0f0, #e0e0e0)
   - Recommendation: Use theme.colors.Border.Skeleton and theme.colors.Border.Disabled

2. **ArticleStackScreen.tsx**
   - Issues: Unnecessary width dependency, color literals, style order
   - Recommendation: Remove width from dependencies, use theme colors, fix style ordering

3. **CardHorizontal.styles.ts**
   - Issues: Color literals (#FFFFFF, #E5E5E5)
   - Recommendation: Add theme color comments like in cardStyles.ts

4. **Flag.styles.ts**
   - Issues: Unused theme parameter
   - Recommendation: Rename to _theme to indicate intentional non-use

### Low Priority Issues

1. **Accordion.tsx**
   - Issues: Missing dependency, inline styles
   - Recommendation: Add animatedHeight to dependencies, move conditional styles to StyleSheet

## Implementation Strategy

For the remaining issues, we recommend:

1. Focus on fixing critical errors first (undefined references, unused variables, type issues)
2. Then address color literals by moving them to theme system
3. Finally tackle inline styles by moving them to StyleSheet definitions

This approach will prioritize fixing errors that could cause runtime issues before addressing style and code quality concerns.

