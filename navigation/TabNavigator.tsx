"use client"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Feather } from "@expo/vector-icons"
import { useTheme } from "../theme/ThemeProvider"
import AllNewsScreen from "../screens/AllNewsScreen"
import SearchScreen from "../screens/SearchScreen"
import SavedScreen from "../screens/SavedScreen"

const Tab = createBottomTabNavigator()

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
      initialRouteName="AllNews"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = "grid"

          if (route.name === "AllNews") {
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
      <Tab.Screen name="AllNews" component={AllNewsScreen} options={{ title: "All News" }} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Saved" component={SavedScreen} />
    </Tab.Navigator>
  )
}

