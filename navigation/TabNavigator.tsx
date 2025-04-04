"use client"

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Feather } from "@expo/vector-icons"
import { useTheme } from "../theme/ThemeProvider"

import HomeScreen from "../screens/HomeScreen"
import AllNewsScreen from "../screens/AllNewsScreen"
import SearchScreen from "../screens/SearchScreen"
import SavedScreen from "../screens/SavedScreen"

const Tab = createBottomTabNavigator()

export default function TabNavigator() {
  const theme = useTheme()

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName

          if (route.name === "Home") {
            iconName = "home"
          } else if (route.name === "Search") {
            iconName = "search"
          } else if (route.name === "Saved") {
            iconName = "bookmark"
          } else if (route.name === "AllNews") {
            iconName = "grid"
          }

          return <Feather name={iconName} size={size} color={color} />
        },
        tabBarActiveTintColor: theme.colors.Primary.Resting,
        tabBarInactiveTintColor: theme.colors.Text.Secondary,
        tabBarStyle: {
          borderTopWidth: theme.borderWidth["10"],
          borderTopColor: theme.colors.Border["Border-Primary"],
          height: 60,
          paddingBottom: 8,
        },
        tabBarLabelStyle: {
          fontSize: theme.fontSize["8"],
          fontFamily: theme.typography.fontFamily.regular,
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="AllNews" component={AllNewsScreen} options={{ title: "All News" }} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Saved" component={SavedScreen} />
    </Tab.Navigator>
  )
}

