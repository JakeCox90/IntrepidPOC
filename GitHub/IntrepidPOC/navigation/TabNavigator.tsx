"use client"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { useTheme } from "../theme/ThemeProvider"
import { useState, useCallback } from "react"

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

// Create stack navigators for each tab
const ForYouStack = createNativeStackNavigator()
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
  const theme = useTheme()
  const [activeTab, setActiveTab] = useState("Today")
  const [tabHistory, setTabHistory] = useState<Record<string, boolean>>({
    Today: false,
    ForYou: false,
    AllNews: false,
    Search: false,
    Saved: false,
  })

  // This function handles tab changes and resets stacks when needed
  const handleTabPress = useCallback(
    (tabName: string) => {
      // If we're already on this tab, do nothing
      if (tabName === activeTab) return

      // Update tab history - mark the current tab as visited
      setTabHistory((prev) => ({
        ...prev,
        [activeTab]: true,
      }))

      // Update the active tab
      setActiveTab(tabName)
    },
    [activeTab],
  )

  return (
    <Tab.Navigator
      initialRouteName="Today"
      screenOptions={{
        headerShown: false,
        tabBarStyle: { display: "none" }, // Hide the default tab bar
        // This is the key part - disable animations between tabs
        animation: "none",
      }}
      // Reset the stack when returning to a tab
      screenListeners={({ navigation, route }) => ({
        focus: (e) => {
          // Only proceed if this is a user-initiated focus event
          if (!e.target) return

          const tabName = route.name

          // If this tab was previously visited, reset its stack
          if (tabHistory[tabName]) {
            // Use a more stable key that won't change on every render
            const resetKey = `${route.name}_reset`

            navigation.reset({
              index: 0,
              routes: [{ name: route.name }],
              key: resetKey,
            })
          }
        },
      })}
      tabBar={(props) => (
        <BottomNav
          activeTab={props.state.routeNames[props.state.index]}
          onTabPress={(tabName) => {
            handleTabPress(tabName)
            props.navigation.navigate(tabName, {}, { animation: "none" })
          }}
        />
      )}
    >
      <Tab.Screen name="Today" component={TodayStackScreen} />
      <Tab.Screen name="ForYou" component={ForYouStackScreen} />
      <Tab.Screen name="AllNews" component={AllNewsStackScreen} />
      <Tab.Screen name="Search" component={SearchStackScreen} component={AllNewsStackScreen} />
      <Tab.Screen name="Saved" component={SavedStackScreen} />
    </Tab.Navigator>
  )
}
