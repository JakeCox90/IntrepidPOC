"use client"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { useTheme } from "../theme/ThemeProvider"
import { useState, useCallback, useEffect } from "react"
import { Platform, View, Text } from "react-native"
import { 
  ParamListBase, 
  RouteProp, 
  useNavigation, 
  useRoute,
  getFocusedRouteNameFromRoute,
  NavigationState,
  TabNavigationState,
  EventMapBase,
  EventListenerCallback,
  NavigationHelpers
} from "@react-navigation/native"
import type { 
  BottomTabNavigationProp, 
  BottomTabScreenProps,
  BottomTabNavigationOptions,
  BottomTabBarProps,
  BottomTabNavigationEventMap
} from "@react-navigation/bottom-tabs"
import type { 
  NativeStackNavigationProp, 
  NativeStackScreenProps 
} from "@react-navigation/native-stack"
import { ErrorBoundary } from "react-error-boundary"

import ForYouScreen from "../screens/ForYouScreen"
import TodayScreen from "../screens/TodayScreen"
import AllNewsScreen from "../screens/AllNewsScreen"
import SearchScreen from "../screens/SearchScreen"
import SavedScreen from "../screens/SavedScreen"
import ArticleScreen from "../screens/ArticleScreen"
import ArticleStackScreen from "../screens/ArticleStackScreen"
import ArticleSwipeScreen from "../screens/ArticleSwipeScreen"
import CategoryScreen from "../screens/CategoryScreen"
import BottomNav from "../components/BottomNav"

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
function NavigationErrorFallback({ error, resetErrorBoundary }: { error: Error, resetErrorBoundary: () => void }) {
  const theme = useTheme();
  const errorTextColor = theme?.colors?.Error?.Text || "#DC2626";
  const errorButtonBgColor = theme?.colors?.Primary?.Resting || "#E03A3A";
  const errorButtonTextColor = theme?.colors?.Surface?.Primary || "#FFFFFF";
  
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Text style={{ fontSize: 16, marginBottom: 20, textAlign: 'center' }}>
        Something went wrong with navigation. Please try again.
      </Text>
      <Text style={{ color: errorTextColor, marginBottom: 20 }}>
        {error?.message || "Unknown navigation error"}
      </Text>
      <View style={{ 
        padding: 10, 
        backgroundColor: errorButtonBgColor, 
        borderRadius: 8 
      }}>
        <Text 
          style={{ color: errorButtonTextColor }}
          onPress={resetErrorBoundary}
        >
          Try Again
        </Text>
      </View>
    </View>
  );
}
// Define valid tab names as a type for type checking
type ValidTabName = 'Today' | 'ForYou' | 'AllNews' | 'Search' | 'Saved';

// Type guard functions to improve navigation safety
// Type guard to check if a value is a valid tab name
function isValidTabName(name: unknown): name is ValidTabName {
  if (typeof name !== 'string') return false;
  return ['Today', 'ForYou', 'AllNews', 'Search', 'Saved'].includes(name);
}

// Type guard to check if a navigation object has required methods
function isValidNavigation(nav: any): nav is NavigationType {
  return nav && 
    typeof nav.navigate === 'function' && 
    typeof nav.reset === 'function';
}

// Type guard to check if an object is a valid navigation state
function isValidNavigationState(state: any): state is NavigationState {
  return state && 
    typeof state === 'object' && 
    typeof state.index === 'number' && 
    Array.isArray(state.routeNames) &&
    state.routeNames.length > 0 &&
    state.routeNames.every((name: string) => typeof name === 'string');
}
// Type definition for focus event
interface FocusEvent {
  target?: string;
  type?: string;
  data?: any;
}

// Type guard for focus event
function isValidFocusEvent(e: any): e is FocusEvent {
  return e && typeof e === 'object' && (typeof e.target === 'string' || e.target === undefined);
}

// Error message formatter helper for consistent error messages
function formatErrorMessage(error: unknown): string {
  return error instanceof Error 
    ? error.message 
    : typeof error === 'string'
      ? error
      : "Unknown error";
}

// Define a reusable navigation type for consistent usage throughout the file
interface NavigationType {
  navigate: (name: string, params?: object) => void;
  reset: (state: { index: number; routes: { name: string; params?: object }[] }) => void;
  emit?: (event: string, ...args: any[]) => void;
}

// Type definition for the tab bar props from React Navigation
interface TypedBottomTabBarProps extends BottomTabBarProps {
  state: TabNavigationState<ParamListBase>;
  navigation: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>;
  descriptors: Record<string, {
    options: BottomTabNavigationOptions;
    navigation: any;
    route: RouteProp<ParamListBase, string>;
    render: () => React.ReactElement;
  }>;
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
  )
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
  )
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
  )
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
  )
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
  )
}

export default function TabNavigator() {
  // Use a default empty object with the correct shape to avoid null checks
  const theme = useTheme() || {
    colors: {
      Primary: { Resting: "#E03A3A" },
      Text: { Secondary: "#717171" },
      Surface: { Primary: "#FFFFFF" }
    },
    space: {},
    typography: { fontFamily: {} }
  };
  
  // Enhanced error handler for navigation operations
  const handleNavigationError = (error: Error) => {
    console.error("Navigation error:", error.message);
    
    // You could add additional error logging or reporting here
    // For example, sending to a monitoring service or analytics
    
    // Return true to indicate the error was handled
    return true;
  };
  const [activeTab, setActiveTab] = useState("Today")
  const [tabHistory, setTabHistory] = useState<Record<string, boolean>>({
    Today: false,
    ForYou: false,
    AllNews: false,
    Search: false,
    Saved: false,
  })

  // Define the valid tab names as a constant to avoid typos and improve type safety
  const TAB_NAMES = {
    TODAY: "Today",
    FOR_YOU: "ForYou",
    ALL_NEWS: "AllNews",
    SEARCH: "Search",
    SAVED: "Saved"
  }

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
      setTabHistory((prev) => ({
        ...prev,
        [activeTab]: true,
      }));
      
      // Update the active tab
      setActiveTab(tabName);
    },
    [activeTab],
  );
  
  // Separate hook for handling tab reset logic
  const handleTabReset = useCallback((tabName: string, navigation: NavigationType) => {
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
        console.error("Failed to reset tab navigation:", 
          error instanceof Error ? error.message : String(error)
        );
      }
    }
  }, [tabHistory]);
  return (
    <ErrorBoundary 
      FallbackComponent={NavigationErrorFallback}
      onError={handleNavigationError}
      onReset={() => {
        // Reset to a clean state when the error boundary resets
        setActiveTab("Today");
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
          tabBarStyle: { display: "none" }, // Hide the default tab bar
          tabBarActiveTintColor: theme?.colors?.Primary?.Resting || "#E03A3A",
          tabBarInactiveTintColor: theme?.colors?.Text?.Secondary || "#717171",
          // Improve tabBar prop implementation with better error handling
          tabBar: (props: any) => {
            try {
              // Guard against null or invalid props
              if (!props) {
                return null;
              }
              
              // Type-safe approach: cast 'any' to our defined typed interface if it passes basic validation
              const typedProps = props as TypedBottomTabBarProps;
              
              // Type check the navigation state
              if (!isValidNavigationState(typedProps.state)) {
                console.warn("Invalid navigation state in tab bar props");
                return null;
              }
              
              // Type check the navigation object
              if (!typedProps.navigation || typeof typedProps.navigation.navigate !== 'function') {
                console.warn("Invalid navigation object in tab bar props");
                return null;
              }
              
              // Safely extract the current route name with better validation
              let currentRoute: ValidTabName = "Today"; // Default to Today
              
              if (typedProps.state.index >= 0 && 
                  typedProps.state.routeNames.length > typedProps.state.index) {
                
                const possibleRoute = typedProps.state.routeNames[typedProps.state.index];
                if (isValidTabName(possibleRoute)) {
                  currentRoute = possibleRoute;
                } else {
                  console.warn(`Invalid route name found in state: ${possibleRoute}`);
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
                      
                      // Validate navigation is available with better type checking
                      if (!typedProps.navigation || typeof typedProps.navigation.navigate !== 'function') {
                        console.warn("Navigation object is unavailable or invalid");
                        return;
                      }
                      
                      // Update our internal tab tracking
                      handleTabPress(tabName);
                      
                      // Navigate to the selected tab
                      typedProps.navigation.navigate(tabName);
                    } catch (error) {
                      // Unified error handling
                      const errorMessage = error instanceof Error 
                        ? error.message 
                        : typeof error === 'string'
                          ? error
                          : "Unknown navigation error";
                          
                      console.error("Tab navigation error:", errorMessage);
                      // Prevent app crashes by handling errors here
                    }
                  }}
                  isLoading={false}
                />
              );
            } catch (error) {
              console.error("Error rendering tab bar:", error);
              // Provide a fallback tab bar in case of error
              const fallbackBgColor = theme?.colors?.Surface?.Primary || "#FFFFFF";
              const fallbackBorderColor = theme?.colors?.Border?.["Border-Primary"] || "#E5E5E5";
              
              return (
                <View style={{ 
                  backgroundColor: fallbackBgColor, 
                  height: 50, 
                  borderTopWidth: 1, 
                  borderTopColor: fallbackBorderColor 
                }} />
              );
            }
          }
        } as any}
        screenListeners={({ navigation, route }: { 
          navigation: NavigationType; 
          route: RouteProp<ParamListBase, string> 
        }) => ({
          focus: (e: any) => {
            try {
              // Simple validation of key elements
              if (!e?.target || !route?.name) {
                return;
              }
              
              const tabName = route.name;
              
              // Call the tab reset handler
              handleTabReset(tabName, navigation);
            } catch (error) {
              console.error("Error in tab focus handler:", 
                error instanceof Error ? error.message : String(error)
              );
            }
          }
        })}
      >
        <Tab.Screen name="Today" component={TodayStackScreen} />
        <Tab.Screen name="ForYou" component={ForYouStackScreen} />
        <Tab.Screen name="AllNews" component={AllNewsStackScreen} />
        <Tab.Screen name="Search" component={SearchStackScreen} />
        <Tab.Screen name="Saved" component={SavedStackScreen} />
      </Tab.Navigator>
    </ErrorBoundary>
  )
}
