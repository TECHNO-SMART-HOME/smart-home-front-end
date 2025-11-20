import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../global.css";

// 1. Import your new Global Alert Component
import GlobalFireAlert from "./components/GlobalFireAlert";
import { NotificationSettingsProvider } from "../src/context/NotificationSettingsContext";
import { LocationProvider } from "../src/context/LocationContext";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <NotificationSettingsProvider>
        <LocationProvider>
          {/* Wrap everything in a View with flex: 1 */}
          <View style={{ flex: 1 }}>
            {/* Place the Alert here. It sits "invisible" on top of your App */}
            <GlobalFireAlert />

            {/* Your Standard Navigation Stack */}
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="index" />
            </Stack>

            <StatusBar style="light" />
          </View>
        </LocationProvider>
      </NotificationSettingsProvider>
    </SafeAreaProvider>
  );
}
