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
        tabBarItemStyle: styles.tabBarItem,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarItemStyle: styles.tabBarItemLeft,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="dots-grid" size={30} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="stats"
        options={{
          tabBarItemStyle: styles.tabBarItemCenter,
          tabBarIcon: ({ color }) => (
            <Ionicons name="stats-chart-outline" size={30} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="discover"
        options={{
          tabBarItemStyle: styles.tabBarItemCenter,
          tabBarIcon: ({ color }) => (
            <Ionicons name="compass-outline" size={30} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          tabBarItemStyle: styles.tabBarItemRight,
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
    paddingHorizontal: 32,
    paddingTop: 18,
    paddingBottom: 24,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  tabBarItem: {
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 4,
    flex: 1,
  },
  tabBarItemLeft: {
    alignItems: "flex-start",
    paddingTop: 4,
    paddingLeft: 12,
    flex: 1,
  },
  tabBarItemCenter: {
    alignItems: "center",
    paddingTop: 4,
    flex: 1,
  },
  tabBarItemRight: {
    alignItems: "flex-end",
    paddingTop: 4,
    paddingRight: 12,
    flex: 1,
  },
});
