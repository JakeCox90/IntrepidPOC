import type { ThemeType } from '../theme/ThemeProvider';

/**
 * Get the appropriate section color for a category
 * @param category The category name
 * @param theme The current theme
 * @returns The color for the category
 */
export const getCategoryColor = (category: string, theme: ThemeType): string => {
  if (!category || !theme) return '#E03A3A'; // Default to red if missing data

  // Normalize the category name for comparison
  const normalizedCategory = category.toUpperCase();

  // Sport categories
  if (
    normalizedCategory.includes('FOOTBALL') ||
    normalizedCategory.includes('BOXING') ||
    normalizedCategory.includes('SPORT') ||
    normalizedCategory.includes('RUGBY') ||
    normalizedCategory.includes('CRICKET') ||
    normalizedCategory.includes('F1') ||
    normalizedCategory.includes('TENNIS') ||
    normalizedCategory.includes('GOLF') ||
    normalizedCategory.includes('UFC') ||
    normalizedCategory.includes('NFL') ||
    normalizedCategory.includes('RACING') ||
    normalizedCategory.includes('DREAMTEAM')
  ) {
    return theme.colors.Section.Sport;
  }

  // TV categories
  if (
    normalizedCategory.includes('TV') ||
    normalizedCategory.includes('TELEVISION') ||
    normalizedCategory.includes('SOAPS') ||
    normalizedCategory.includes('REALITY') ||
    normalizedCategory.includes('PUZZLES')
  ) {
    return theme.colors.Section.TV;
  }

  // Showbiz categories
  if (
    normalizedCategory.includes('SHOWBIZ') ||
    normalizedCategory.includes('CELEBRITY') ||
    normalizedCategory.includes('MUSIC') ||
    normalizedCategory.includes('FILM') ||
    normalizedCategory.includes('DEARDEIDRE')
  ) {
    return theme.colors.Section.Showbiz;
  }

  // Tech categories
  if (
    normalizedCategory.includes('TECH') ||
    normalizedCategory.includes('PHONE') ||
    normalizedCategory.includes('GAMING') ||
    normalizedCategory.includes('SCIENCE')
  ) {
    return theme.colors.Section.Tech;
  }

  // Travel categories
  if (
    normalizedCategory.includes('TRAVEL') ||
    normalizedCategory.includes('HOLIDAY') ||
    normalizedCategory.includes('BEACH') ||
    normalizedCategory.includes('CRUISE') ||
    normalizedCategory.includes('SUNBINGO')
  ) {
    return theme.colors.Section.Travel;
  }

  // Money categories
  if (
    normalizedCategory.includes('MONEY') ||
    normalizedCategory.includes('BANKING') ||
    normalizedCategory.includes('BILLS') ||
    normalizedCategory.includes('PENSIONS') ||
    normalizedCategory.includes('PROPERTY')
  ) {
    return theme.colors.Section.Money;
  }

  // Health categories
  if (
    normalizedCategory.includes('HEALTH') ||
    normalizedCategory.includes('FITNESS') ||
    normalizedCategory.includes('DIET')
  ) {
    return theme.colors.Section.Health;
  }

  // Politics categories
  if (normalizedCategory.includes('POLITICS')) {
    return theme.colors.Section.News;
  }

  // Motors categories
  if (normalizedCategory.includes('MOTORS') || normalizedCategory.includes('CAR')) {
    return theme.colors.Section.Motors;
  }

  // Fabulous/Fashion categories
  if (
    normalizedCategory.includes('FABULOUS') ||
    normalizedCategory.includes('FASHION') ||
    normalizedCategory.includes('BEAUTY') ||
    normalizedCategory.includes('FOOD') ||
    normalizedCategory.includes('PARENTING')
  ) {
    return theme.colors.Section.Fabulous;
  }

  // News categories (including RoyalFamily)
  if (
    normalizedCategory.includes('UKNEWS') ||
    normalizedCategory.includes('WORLDNEWS') ||
    normalizedCategory.includes('USNEWS') ||
    normalizedCategory.includes('IRISHNEWS') ||
    normalizedCategory.includes('SCOTTISHNEWS') ||
    normalizedCategory.includes('POLITICS') ||
    normalizedCategory.includes('ROYALFAMILY') ||
    normalizedCategory.includes('OPINION')
  ) {
    return theme.colors.Section.News;
  }

  // Special flags
  if (normalizedCategory === 'EXCLUSIVE') {
    return '#4361ee'; // Blue color for EXCLUSIVE
  } else if (normalizedCategory.includes('BREAKING')) {
    return '#E03A3A'; // Red for BREAKING news
  } else if (normalizedCategory.includes('LIVE')) {
    return '#E03A3A'; // Red for LIVE updates
  }

  // Sun branded sections
  if (
    normalizedCategory.includes('SUNVEGAS') ||
    normalizedCategory.includes('SUNSAVERS') ||
    normalizedCategory.includes('SUNCASINO') ||
    normalizedCategory.includes('SUNWIN')
  ) {
    return theme.colors.Section.SunVegas;
  }

  if (normalizedCategory.includes('SUNSELECTS')) {
    return theme.colors.Section.SunSelects;
  }

  // Default to News if no match
  return theme.colors.Section.News;
};
