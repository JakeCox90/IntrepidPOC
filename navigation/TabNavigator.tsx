import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Ionicons } from "@expo/vector-icons"

import HomeScreen from "../screens/HomeScreen"
import SearchScreen from "../screens/SearchScreen"
import SavedScreen from "../screens/SavedScreen"
import ProfileScreen from "../screens/ProfileScreen"

const Tab = createBottomTabNavigator()

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline"
          } else if (route.name === "Search") {
            iconName = focused ? "search" : "search-outline"
          } else if (route.name === "Saved") {
            iconName = focused ? "heart" : "heart-outline"
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline"
          }

          return <Ionicons name={iconName} size={size} color={color} />
        },
        tabBarActiveTintColor: "#E03A3A",
        tabBarInactiveTintColor: "#666666",
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: "#EEEEEE",
          height: 55,
          paddingBottom: 5,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Saved" component={SavedScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  )
}

