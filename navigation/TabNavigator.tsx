'use client';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from '../theme/ThemeProvider';
import { useState, useCallback, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import {
  ParamListBase,
  RouteProp,
  NavigationState,
  TabNavigationState,
  NavigationHelpers,
} from '@react-navigation/native';
import type {
  BottomTabNavigationOptions,
  BottomTabBarProps,
  BottomTabNavigationEventMap,
} from '@react-navigation/bottom-tabs';
import { ErrorBoundary } from 'react-error-boundary';
import Typography from '../components/Typography';
import { Feather } from '@expo/vector-icons';

import ForYouScreen from '../screens/ForYouScreen';
import TodayScreen from '../screens/TodayScreen';
import AllNewsScreen from '../screens/AllNewsScreen';
import SearchScreen from '../screens/SearchScreen';
import SavedScreen from '../screens/SavedScreen';
import ArticleScreen from '../screens/ArticleScreen';
import ArticleStackScreen from '../screens/ArticleStackScreen';
import ArticleSwipeScreen from '../screens/ArticleSwipeScreen';
import CategoryScreen from '../screens/CategoryScreen';
import BottomNav from '../components/BottomNav';

// Define navigation types
type ArticleParamList = {
  articleId: string;
  title?: string;
  category?: string;
};

type CategoryParamList = {
  categoryId: string;
  name?: string;
};

// Define stack navigation parameter lists
type TodayStackParamList = {
  TodayMain: undefined;
  TodayArticle: ArticleParamList;
  TodayCategory: CategoryParamList;
  ArticleSwipeScreen: { initialArticleId: string };
};

type ForYouStackParamList = {
  ForYouMain: undefined;
  ForYouArticle: ArticleParamList;
  ArticleStackScreen: { articles: ArticleParamList[] };
  ForYouCategory: CategoryParamList;
  ArticleSwipeScreen: { initialArticleId: string };
};

type AllNewsStackParamList = {
  AllNewsMain: undefined;
  AllNewsArticle: ArticleParamList;
  AllNewsCategory: CategoryParamList;
  ArticleSwipeScreen: { initialArticleId: string };
};

type SearchStackParamList = {
  SearchMain: undefined;
  SearchArticle: ArticleParamList;
  SearchCategory: CategoryParamList;
  ArticleSwipeScreen: { initialArticleId: string };
};

type SavedStackParamList = {
  SavedMain: undefined;
  SavedArticle: ArticleParamList;
  SavedCategory: CategoryParamList;
  ArticleSwipeScreen: { initialArticleId: string };
};

// Define tab navigation parameter list
type TabParamList = {
  Today: undefined;
  ForYou: undefined;
  AllNews: undefined;
  Search: undefined;
  Saved: undefined;
};

// Create stack navigators for each tab
const ForYouStack = createNativeStackNavigator<ForYouStackParamList>();
const TodayStack = createNativeStackNavigator<TodayStackParamList>();
const AllNewsStack = createNativeStackNavigator<AllNewsStackParamList>();
const SearchStack = createNativeStackNavigator<SearchStackParamList>();
const SavedStack = createNativeStackNavigator<SavedStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

// ErrorFallback component for navigation errors
function NavigationErrorFallback({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) {
  const theme = useTheme();
  const errorTextColor = theme?.colors?.Error?.Text || '#DC2626';
  const errorButtonBgColor = theme?.colors?.Primary?.Resting || '#E03A3A';
  const errorButtonTextColor = theme?.colors?.Surface?.Primary || '#FFFFFF';

  return (
    <View style={styles.errorContainer}>
      <Typography variant="body-01" style={styles.errorMessage}>
        Something went wrong with navigation. Please try again.
      </Typography>
      <Typography variant="body-02" color={errorTextColor} style={styles.errorDetails}>
        {error?.message || 'Unknown navigation error'}
      </Typography>
      <View style={[styles.errorButton, { backgroundColor: errorButtonBgColor }]}>
        <Typography variant="button" color={errorButtonTextColor} onPress={resetErrorBoundary}>
          Try Again
        </Typography>
      </View>
    </View>
  );
}
// Define valid tab names as a type for type checking
type ValidTabName = 'Today' | 'ForYou' | 'AllNews' | 'Search' | 'Saved';

// Define the valid tab names as a constant to avoid typos and improve type safety
const TAB_NAMES = {
  TODAY: 'Today',
  FOR_YOU: 'ForYou',
  ALL_NEWS: 'AllNews',
  SEARCH: 'Search',
  SAVED: 'Saved',
};

// Type guard functions to improve navigation safety
// Type guard to check if a value is a valid tab name
function isValidTabName(name: unknown): name is ValidTabName {
  if (typeof name !== 'string') return false;
  return ['Today', 'ForYou', 'AllNews', 'Search', 'Saved'].includes(name);
}

// Type guard to check if an object is a valid navigation state
function isValidNavigationState(state: unknown): state is NavigationState {
  return (
    !!state &&
    typeof state === 'object' &&
    'index' in state &&
    typeof (state as NavigationState).index === 'number' &&
    'routeNames' in state &&
    Array.isArray((state as NavigationState).routeNames) &&
    (state as NavigationState).routeNames.length > 0 &&
    (state as NavigationState).routeNames.every((name: string) => typeof name === 'string')
  );
}

// Define a reusable navigation type for consistent usage throughout the file
interface NavigationType {
  navigate: (name: string, params?: object) => void;
  reset: (state: { index: number; routes: { name: string; params?: object }[] }) => void;
  emit?: (event: string, ...args: unknown[]) => void;
}

// Type definition for the tab bar props from React Navigation
interface TypedBottomTabBarProps extends BottomTabBarProps {
  state: TabNavigationState<ParamListBase>;
  navigation: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>;
  descriptors: Record<
    string,
    {
      options: BottomTabNavigationOptions;
      navigation: NavigationType;
      route: RouteProp<ParamListBase, string>;
      render: () => React.ReactElement;
    }
  >;
}

// Today Tab Stack
function TodayStackScreen() {
  return (
    <TodayStack.Navigator screenOptions={{ headerShown: false }}>
      <TodayStack.Screen name="TodayMain" component={TodayScreen} />
      <TodayStack.Screen name="TodayArticle" component={ArticleScreen} />
      <TodayStack.Screen name="TodayCategory" component={CategoryScreen} />
      <TodayStack.Screen name="ArticleSwipeScreen" component={ArticleSwipeScreen} />
    </TodayStack.Navigator>
  );
}

// For You Tab Stack
function ForYouStackScreen() {
  return (
    <ForYouStack.Navigator screenOptions={{ headerShown: false }}>
      <ForYouStack.Screen name="ForYouMain" component={ForYouScreen} />
      <ForYouStack.Screen name="ForYouArticle" component={ArticleScreen} />
      <ForYouStack.Screen name="ArticleStackScreen" component={ArticleStackScreen} />
      <ForYouStack.Screen name="ForYouCategory" component={CategoryScreen} />
      <ForYouStack.Screen name="ArticleSwipeScreen" component={ArticleSwipeScreen} />
    </ForYouStack.Navigator>
  );
}

// All News Tab Stack
function AllNewsStackScreen() {
  return (
    <AllNewsStack.Navigator screenOptions={{ headerShown: false }}>
      <AllNewsStack.Screen name="AllNewsMain" component={AllNewsScreen} />
      <AllNewsStack.Screen name="AllNewsArticle" component={ArticleScreen} />
      <AllNewsStack.Screen name="AllNewsCategory" component={CategoryScreen} />
      <AllNewsStack.Screen name="ArticleSwipeScreen" component={ArticleSwipeScreen} />
    </AllNewsStack.Navigator>
  );
}

// Search Tab Stack
function SearchStackScreen() {
  return (
    <SearchStack.Navigator screenOptions={{ headerShown: false }}>
      <SearchStack.Screen name="SearchMain" component={SearchScreen} />
      <SearchStack.Screen name="SearchArticle" component={ArticleScreen} />
      <SearchStack.Screen name="SearchCategory" component={CategoryScreen} />
      <SearchStack.Screen name="ArticleSwipeScreen" component={ArticleSwipeScreen} />
    </SearchStack.Navigator>
  );
}

// Saved Tab Stack
function SavedStackScreen() {
  return (
    <SavedStack.Navigator screenOptions={{ headerShown: false }}>
      <SavedStack.Screen name="SavedMain" component={SavedScreen} />
      <SavedStack.Screen name="SavedArticle" component={ArticleScreen} />
      <SavedStack.Screen name="SavedCategory" component={CategoryScreen} />
      <SavedStack.Screen name="ArticleSwipeScreen" component={ArticleSwipeScreen} />
    </SavedStack.Navigator>
  );
}

export default function TabNavigator() {
  // Use a default empty object with the correct shape to avoid null checks
  const theme = useTheme() || {
    colors: {
      Primary: { Resting: '#E03A3A' },
      Text: { Secondary: '#717171' },
      Surface: { Primary: '#FFFFFF' },
    },
    space: {},
    typography: { fontFamily: {} },
  };

  // Enhanced error handler for navigation operations
  const handleNavigationError = (error: Error) => {
    console.error('Navigation error:', error.message);

    // You could add additional error logging or reporting here
    // For example, sending to a monitoring service or analytics

    // Return true to indicate the error was handled
    return true;
  };
  const [activeTab, setActiveTab] = useState('Today');
  const [tabHistory, setTabHistory] = useState<Record<string, boolean>>({
    Today: false,
    ForYou: false,
    AllNews: false,
    Search: false,
    Saved: false,
  });

  // Using the TAB_NAMES constant defined outside the component

  // Reset tab history when component mounts to ensure clean state
  useEffect(() => {
    setTabHistory({
      Today: false,
      ForYou: false,
      AllNews: false,
      Search: false,
      Saved: false,
    });
  }, []);

  // This function handles tab changes and resets stacks when needed
  const handleTabPress = useCallback(
    (tabName: string) => {
      // Validate tab name to prevent errors
      if (!Object.values(TAB_NAMES).includes(tabName)) {
        console.warn(`Invalid tab name: ${tabName}`);
        return;
      }

      // If we're already on this tab, do nothing
      if (tabName === activeTab) return;

      // Update tab history - mark the current tab as visited
      setTabHistory(prev => ({
        ...prev,
        [activeTab]: true,
      }));

      // Update the active tab
      setActiveTab(tabName);
    },
    [activeTab], // TAB_NAMES is defined outside the component and won't change
  );

  // Separate hook for handling tab reset logic
  const handleTabReset = useCallback(
    (tabName: string, navigation: NavigationType) => {
      if (!isValidTabName(tabName)) {
        return;
      }

      // Check if tab has been visited before
      if (tabHistory[tabName]) {
        // Reset stack to root screen, using a safer reset configuration
        try {
          navigation.reset({
            index: 0,
            routes: [{ name: tabName }],
          });
        } catch (error) {
          console.error(
            'Failed to reset tab navigation:',
            error instanceof Error ? error.message : String(error),
          );
        }
      }
    },
    [tabHistory],
  );
  return (
    <ErrorBoundary
      FallbackComponent={NavigationErrorFallback}
      onError={handleNavigationError}
      onReset={() => {
        // Reset to a clean state when the error boundary resets
        setActiveTab('Today');
        setTabHistory({
          Today: false,
          ForYou: false,
          AllNews: false,
          Search: false,
          Saved: false,
        });
      }}
    >
      <Tab.Navigator
        initialRouteName="Today"
        screenOptions={{
          headerShown: false,
        }}
        tabBar={props => {
          try {
            // Guard against null or invalid props
            if (!props) {
              return null;
            }

            // Safely extract the current route name
            const currentRoute = props.state.routes[props.state.index].name;
            if (!isValidTabName(currentRoute)) {
              console.warn(`Invalid route name found in state: ${currentRoute}`);
              return null;
            }

            // Check if we're in a stack navigator and the current screen is ArticleSwipeScreen
            const currentStackState = props.state.routes[props.state.index].state;
            if (currentStackState && currentStackState.routes) {
              const currentScreen = currentStackState.routes[currentStackState.index]?.name;
              if (currentScreen === 'ArticleSwipeScreen') {
                return null; // Hide tab bar when ArticleSwipeScreen is active
              }
            }

            return (
              <BottomNav
                activeTab={currentRoute}
                onTabPress={(tabName: string) => {
                  try {
                    // Validate the tab name to prevent errors
                    if (!isValidTabName(tabName)) {
                      console.warn(`Invalid tab name requested: ${tabName}`);
                      return;
                    }

                    // Update our internal tab tracking
                    handleTabPress(tabName);

                    // Navigate to the selected tab
                    props.navigation.navigate(tabName);
                  } catch (error) {
                    console.error('Tab navigation error:', error);
                  }
                }}
                isLoading={false}
              />
            );
          } catch (error) {
            console.error('Error rendering tab bar:', error);
            return null;
          }
        }}
        screenListeners={({
          navigation,
          route,
        }: {
          navigation: NavigationType;
          route: RouteProp<ParamListBase, string>;
        }) => ({
          focus: (e: { target?: string; type?: string; data?: Record<string, unknown> }) => {
            try {
              // Simple validation of key elements
              if (!e?.target || !route?.name) {
                return;
              }

              const tabName = route.name;

              // Call the tab reset handler
              handleTabReset(tabName, navigation);
            } catch (error) {
              console.error(
                'Error in tab focus handler:',
                error instanceof Error ? error.message : String(error),
              );
            }
          },
        })}
      >
        <Tab.Screen name="Today" component={TodayStackScreen} />
        <Tab.Screen name="ForYou" component={ForYouStackScreen} />
        <Tab.Screen name="AllNews" component={AllNewsStackScreen} />
        <Tab.Screen name="Search" component={SearchStackScreen} />
        <Tab.Screen name="Saved" component={SavedStackScreen} />
      </Tab.Navigator>
    </ErrorBoundary>
  );
}

// Define styles for components
const styles = StyleSheet.create({
  errorButton: {
    borderRadius: 8,
    padding: 10,
  },
  errorContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  errorDetails: {
    marginBottom: 20,
  },
  errorMessage: {
    marginBottom: 20,
    textAlign: 'center',
  },
  fallbackTabBar: {
    borderTopWidth: 1,
    height: 50,
  },
});
