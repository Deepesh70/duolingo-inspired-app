import "../global.css";

import { ClerkProvider } from "@clerk/expo";
import { tokenCache } from "@clerk/expo/token-cache";
import { useEffect } from "react";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";

import { colors, fontAssets } from "@/theme";

void SplashScreen.preventAutoHideAsync();

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY ?? "";

if (!publishableKey) {
  throw new Error("Add EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY to your .env file.");
}

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts(fontAssets);

  useEffect(() => {
    if (fontsLoaded || fontError) {
      void SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.neutral.surface },
        }}
      />
    </ClerkProvider>
  );
}
