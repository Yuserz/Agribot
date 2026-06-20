import {
    DarkTheme,
    DefaultTheme,
    Stack,
    ThemeProvider,
} from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import "react-native-reanimated";

import { AuthProvider } from "@/context/auth";
import { BotpressProvider } from "@/context/botpress";
import { LanguageProvider } from "@/context/language";
import { useColorScheme } from "@/hooks/use-color-scheme";

export const unstable_settings = {
  anchor: "splash",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <AuthProvider>
      <LanguageProvider>
        <BotpressProvider>
          <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
            <Stack>
              <Stack.Screen name="splash" options={{ headerShown: false }} />
              <Stack.Screen name="welcome" options={{ headerShown: false }} />
              <Stack.Screen name="auth" options={{ headerShown: false }} />
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen
                name="modal"
                options={{ presentation: "modal", title: "Modal" }}
              />
            </Stack>
            <StatusBar style="auto" />
          </ThemeProvider>
        </BotpressProvider>
      </LanguageProvider>
    </AuthProvider>
  );
}
