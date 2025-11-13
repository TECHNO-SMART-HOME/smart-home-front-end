import { Tabs } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        // 1. Hide the header for all screens
        headerShown: false,

        // 2. Hide the text labels, leaving only icons
        tabBarShowLabel: false,

        // 3. Set the active icon color to orange, inactive to white
        tabBarActiveTintColor: "#FFC107",
        tabBarInactiveTintColor: "#FFFFFF",

        // 4. Define the style for the tab bar itself
        tabBarStyle: styles.tabBar,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="dots-grid" size={30} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="stats"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="stats-chart-outline" size={30} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="discover"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="compass-outline" size={30} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="settings-outline" size={30} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

// StyleSheet for the custom tab bar - updated to match Figma design
const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    height: 90,
    backgroundColor: "#E16428",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
});
