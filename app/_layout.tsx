import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import "../global.css";

// 1. Import your new Global Alert Component
import GlobalFireAlert from "./components/GlobalFireAlert";

export default function RootLayout() {
  return (
    // 2. Wrap everything in a View with flex: 1
    <View style={{ flex: 1 }}>
      
      {/* 3. Place the Alert here. It sits "invisible" on top of your App */}
      <GlobalFireAlert />

      {/* 4. Your Standard Navigation Stack */}
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
      </Stack>
      
      <StatusBar style="light" />
    </View>
  );
}