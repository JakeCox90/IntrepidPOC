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

// Define valid tab names as a type for type checking
type ValidTabName = 'Today' | 'ForYou' | 'AllNews' | 'Search';

// Define the valid tab names as a constant to avoid typos and improve type safety
const TAB_NAMES = {
  TODAY: 'Today' as const,
  FOR_YOU: 'ForYou' as const,
  ALL_NEWS: 'AllNews' as const,
  SEARCH: 'Search' as const,
} as const;

// Define tab navigation parameter list
type TabParamList = {
  Today: undefined;
  ForYou: undefined;
  AllNews: undefined;
  Search: undefined;
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

// Type guard functions to improve navigation safety
// Type guard to check if a value is a valid tab name
function isValidTabName(name: unknown): name is ValidTabName {
  if (typeof name !== 'string') return false;
  return ['Today', 'ForYou', 'AllNews', 'Search'].includes(name);
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
  navigate: <RouteName extends string>(
    ...args: RouteName extends unknown
      ? [screen: RouteName] | [screen: RouteName, params: object | undefined]
      : never
  ) => void;
  reset: (state: { index: number; routes: { name: string; params?: object }[] }) => void;
  emit?: (event: string, ...args: unknown[]) => void;
}

// Today Tab Stack
function TodayStackScreen() {
  return (
    <TodayStack.Navigator screenOptions={{ headerShown: false }}>
      <TodayStack.Screen name="TodayMain" component={TodayScreen} />
      <TodayStack.Screen 
        name="TodayArticle" 
        component={ArticleScreen as React.ComponentType<any>} 
      />
      <TodayStack.Screen 
        name="TodayCategory" 
        component={CategoryScreen as React.ComponentType<any>} 
      />
      <TodayStack.Screen 
        name="ArticleSwipeScreen" 
        component={ArticleSwipeScreen as React.ComponentType<any>} 
      />
    </TodayStack.Navigator>
  );
}

// For You Tab Stack
function ForYouStackScreen() {
  const theme = useTheme();
  
  return (
    <ForYouStack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: theme.colors.Surface.Secondary,
        },
        headerTintColor: theme.colors.Text.Primary,
        headerTitleStyle: {
          ...theme.typography.variants['h5'],
          color: theme.colors.Text.Primary,
        },
        headerShadowVisible: false,
        headerLargeTitle: true,
        headerLargeTitleStyle: {
          ...theme.typography.variants['h3'],
          color: theme.colors.Text.Primary,
        },
        statusBarStyle: 'dark',
        statusBarColor: '#000000',
      }}
    >
      <ForYouStack.Screen 
        name="ForYouMain" 
        component={ForYouScreen}
        options={{
          title: 'For You',
        }}
      />
      <ForYouStack.Screen 
        name="ForYouArticle" 
        component={ArticleScreen as React.ComponentType<any>} 
      />
      <ForYouStack.Screen 
        name="ArticleStackScreen" 
        component={ArticleStackScreen as React.ComponentType<any>} 
      />
      <ForYouStack.Screen 
        name="ForYouCategory" 
        component={CategoryScreen as React.ComponentType<any>} 
      />
      <ForYouStack.Screen 
        name="ArticleSwipeScreen" 
        component={ArticleSwipeScreen as React.ComponentType<any>} 
      />
    </ForYouStack.Navigator>
  );
}

// All News Tab Stack
function AllNewsStackScreen() {
  const theme = useTheme();
  
  return (
    <AllNewsStack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: theme.colors.Surface.Secondary,
        },
        headerTintColor: theme.colors.Text.Primary,
        headerTitleStyle: {
          ...theme.typography.variants['h5'],
          color: theme.colors.Text.Primary,
        },
        headerShadowVisible: false,
        headerLargeTitle: true,
        headerLargeTitleStyle: {
          ...theme.typography.variants['h3'],
          color: theme.colors.Text.Primary,
        },
        statusBarStyle: 'dark',
        statusBarColor: '#000000',
      }}
    >
      <AllNewsStack.Screen 
        name="AllNewsMain" 
        component={AllNewsScreen}
        options={{
          headerShown: false,
        }}
      />
      <AllNewsStack.Screen 
        name="AllNewsArticle" 
        component={ArticleScreen as React.ComponentType<any>} 
      />
      <AllNewsStack.Screen 
        name="AllNewsCategory" 
        component={CategoryScreen as React.ComponentType<any>} 
      />
      <AllNewsStack.Screen 
        name="ArticleSwipeScreen" 
        component={ArticleSwipeScreen as React.ComponentType<any>} 
      />
    </AllNewsStack.Navigator>
  );
}

// Search Tab Stack
function SearchStackScreen() {
  const theme = useTheme();
  
  return (
    <SearchStack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: theme.colors.Surface.Secondary,
        },
        headerTintColor: theme.colors.Text.Primary,
        headerTitleStyle: {
          ...theme.typography.variants['h5'],
          color: theme.colors.Text.Primary,
        },
        headerShadowVisible: false,
        headerLargeTitle: true,
        headerLargeTitleStyle: {
          ...theme.typography.variants['h3'],
          color: theme.colors.Text.Primary,
        },
        statusBarStyle: 'dark',
        statusBarColor: '#000000',
      }}
    >
      <SearchStack.Screen 
        name="SearchMain" 
        component={SearchScreen}
        options={{
          title: 'Search',
          headerSearchBarOptions: {
            placeholder: 'Search for news...',
            barTintColor: theme.colors.Surface.Secondary,
            textColor: theme.colors.Text.Primary,
            tintColor: theme.colors.Text.Primary,
            hideWhenScrolling: false,
          },
        }}
      />
      <SearchStack.Screen 
        name="SearchArticle" 
        component={ArticleScreen as React.ComponentType<any>} 
      />
      <SearchStack.Screen 
        name="SearchCategory" 
        component={CategoryScreen as React.ComponentType<any>} 
      />
      <SearchStack.Screen 
        name="ArticleSwipeScreen" 
        component={ArticleSwipeScreen as React.ComponentType<any>} 
      />
    </SearchStack.Navigator>
  );
}

// Saved Tab Stack
function SavedStackScreen() {
  return (
    <SavedStack.Navigator screenOptions={{ headerShown: false }}>
      <SavedStack.Screen name="SavedMain" component={SavedScreen} />
      <SavedStack.Screen 
        name="SavedArticle" 
        component={ArticleScreen as React.ComponentType<any>} 
      />
      <SavedStack.Screen 
        name="SavedCategory" 
        component={CategoryScreen as React.ComponentType<any>} 
      />
      <SavedStack.Screen 
        name="ArticleSwipeScreen" 
        component={ArticleSwipeScreen as React.ComponentType<any>} 
      />
    </SavedStack.Navigator>
  );
}

// Main Tab Navigator
export default function TabNavigator() {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState<ValidTabName>(TAB_NAMES.TODAY);
  const [tabHistory, setTabHistory] = useState<Record<ValidTabName, boolean>>({
    Today: false,
    ForYou: false,
    AllNews: false,
    Search: false,
  });

  // Reset tab history when component mounts to ensure clean state
  useEffect(() => {
    setTabHistory({
      Today: false,
      ForYou: false,
      AllNews: false,
      Search: false,
    });
  }, []);

  // This function handles tab changes and resets stacks when needed
  const handleTabPress = useCallback(
    (tabName: string, navigation: BottomTabBarProps['navigation']) => {
      if (!isValidTabName(tabName)) return;
      
      // If we're already on this tab, do nothing
      if (tabName === activeTab) return;

      // Update tab history - mark the current tab as visited
      setTabHistory(prev => ({
        ...prev,
        [activeTab]: true,
      }));

      // Update the active tab
      setActiveTab(tabName);

      // Navigate to the selected tab
      navigation.navigate(tabName);
    },
    [activeTab],
  );

  return (
    <ErrorBoundary
      FallbackComponent={NavigationErrorFallback}
      onError={() => {
        // Reset to a clean state when the error boundary resets
        setActiveTab(TAB_NAMES.TODAY);
        setTabHistory({
          Today: false,
          ForYou: false,
          AllNews: false,
          Search: false,
        });
      }}
    >
      <Tab.Navigator
        tabBar={props => (
          <BottomNav
            {...props}
            activeTab={activeTab}
            onTabPress={(tabName) => handleTabPress(tabName, props.navigation)}
          />
        )}
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            display: 'none',
          },
        }}
      >
        <Tab.Screen
          name="Today"
          component={TodayStackScreen}
          options={{
            tabBarLabel: 'Today',
            tabBarIcon: ({ color }) => <Feather name="home" size={24} color={color} />,
          }}
        />
        <Tab.Screen
          name="ForYou"
          component={ForYouStackScreen}
          options={{
            tabBarLabel: 'For You',
            tabBarIcon: ({ color }) => <Feather name="heart" size={24} color={color} />,
          }}
        />
        <Tab.Screen
          name="AllNews"
          component={AllNewsStackScreen}
          options={{
            tabBarLabel: 'All News',
            tabBarIcon: ({ color }) => <Feather name="list" size={24} color={color} />,
          }}
        />
        <Tab.Screen
          name="Search"
          component={SearchStackScreen}
          options={{
            tabBarLabel: 'Search',
            tabBarIcon: ({ color }) => <Feather name="search" size={24} color={color} />,
          }}
        />
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
