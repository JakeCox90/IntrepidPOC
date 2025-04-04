"use client"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Feather } from "@expo/vector-icons"
import { useTheme } from "../theme/ThemeProvider"

import TodayScreen from "../screens/TodayScreen"
import AllNewsScreen from "../screens/AllNewsScreen"
import SearchScreen from "../screens/SearchScreen"
import SavedScreen from "../screens/SavedScreen"
import ArticleScreen from "../screens/ArticleScreen"
import CategoryScreen from "../screens/CategoryScreen"

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

  // Ensure we have fallback values if theme properties are undefined
  const fontFamily = theme?.typography?.fontFamily?.regular || "System"
  const fontSize = theme?.fontSize?.["8"] || 12
  const primaryColor = theme?.colors?.Primary?.Resting || "#E03A3A"
  const secondaryColor = theme?.colors?.Text?.Secondary || "#717171"
  const borderColor = theme?.colors?.Border?.["Border-Primary"] || "#E5E5E5"
  const borderWidth = theme?.borderWidth?.["10"] || 1

  return (
    <Tab.Navigator
      initialRouteName="Today"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = "home"

          if (route.name === "Today") {
            iconName = "home"
          } else if (route.name === "AllNews") {
            iconName = "grid"
          } else if (route.name === "Search") {
            iconName = "search"
          } else if (route.name === "Saved") {
            iconName = "bookmark"
          }

          return <Feather name={iconName} size={size} color={color} />
        },
        tabBarActiveTintColor: primaryColor,
        tabBarInactiveTintColor: secondaryColor,
        tabBarStyle: {
          borderTopWidth: borderWidth,
          borderTopColor: borderColor,
          height: 60,
          paddingBottom: 8,
        },
        tabBarLabelStyle: {
          fontSize: fontSize,
          fontFamily: fontFamily,
        },
      })}
    >
      <Tab.Screen name="Today" component={TodayStackScreen} />
      <Tab.Screen name="AllNews" component={AllNewsStackScreen} options={{ title: "All News" }} />
      <Tab.Screen name="Search" component={SearchStackScreen} />
      <Tab.Screen name="Saved" component={SavedStackScreen} />
    </Tab.Navigator>
  )
}

