"use client"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { useTheme } from "../theme/ThemeProvider"
import { getFocusedRouteNameFromRoute } from "@react-navigation/native"

import TodayScreen from "../screens/TodayScreen"
import AllNewsScreen from "../screens/AllNewsScreen"
import SearchScreen from "../screens/SearchScreen"
import SavedScreen from "../screens/SavedScreen"
import ArticleScreen from "../screens/ArticleScreen"
import CategoryScreen from "../screens/CategoryScreen"
import BottomNav from "../components/BottomNav"

// Create stack navigators for each tab
const TodayStack = createNativeStackNavigator()
const AllNewsStack = createNativeStackNavigator()
const SearchStack = createNativeStackNavigator()
const SavedStack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

// Today Tab Stack
function TodayStackScreen() {
  return (
    <TodayStack.Navigator screenOptions={{ headerShown: false }}>
      <TodayStack.Screen name="TodayMain" component={TodayScreen} />
      <TodayStack.Screen name="TodayArticle" component={ArticleScreen} />
      <TodayStack.Screen name="TodayCategory" component={CategoryScreen} />
    </TodayStack.Navigator>
  )
}

// All News Tab Stack
function AllNewsStackScreen() {
  return (
    <AllNewsStack.Navigator screenOptions={{ headerShown: false }}>
      <AllNewsStack.Screen name="AllNewsMain" component={AllNewsScreen} />
      <AllNewsStack.Screen name="AllNewsArticle" component={ArticleScreen} />
      <AllNewsStack.Screen name="AllNewsCategory" component={CategoryScreen} />
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
    </SavedStack.Navigator>
  )
}

export default function TabNavigator() {
  const theme = useTheme()

  // Helper function to get the root screen name for each tab
  const getRootRouteName = (tabName) => {
    switch (tabName) {
      case "Today":
        return "TodayMain"
      case "AllNews":
        return "AllNewsMain"
      case "Search":
        return "SearchMain"
      case "Saved":
        return "SavedMain"
      default:
        return null
    }
  }

  return (
    <Tab.Navigator
      initialRouteName="Today"
      screenOptions={{
        headerShown: false,
        tabBarStyle: { display: "none" }, // Hide the default tab bar
      }}
      screenListeners={({ navigation, route }) => ({
        tabPress: (e) => {
          // Prevent default behavior for already focused tab
          const currentRouteName = getFocusedRouteNameFromRoute(route) || getRootRouteName(route.name)
          const rootRouteName = getRootRouteName(route.name)

          // If we're already on this tab and not at the root screen
          if (navigation.isFocused() && currentRouteName !== rootRouteName && rootRouteName) {
            // Prevent default action
            e.preventDefault()

            // Navigate to the first screen in the stack
            navigation.navigate(rootRouteName)
          }
        },
      })}
      tabBar={(props) => (
        <BottomNav
          activeTab={props.state.routeNames[props.state.index]}
          onTabPress={(tabName) => {
            const event = props.navigation.emit({
              type: "tabPress",
              target: props.state.routes.find((r) => r.name === tabName).key,
              canPreventDefault: true,
            })

            if (!event.defaultPrevented) {
              props.navigation.navigate(tabName)
            }
          }}
        />
      )}
    >
      <Tab.Screen name="Today" component={TodayStackScreen} />
      <Tab.Screen name="AllNews" component={AllNewsStackScreen} />
      <Tab.Screen name="Search" component={SearchStackScreen} />
      <Tab.Screen name="Saved" component={SavedStackScreen} />
    </Tab.Navigator>
  )
}

