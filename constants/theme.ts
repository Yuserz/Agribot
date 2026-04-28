/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from "react-native";

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";
const agribotGreen = "#1DB854";

export const Colors = {
  light: {
    text: "#11181C",
    background: "#fff",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: "#ECEDEE",
    background: "#151718",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
  },
  agribot: {
    primary: agribotGreen,
    light: "#1DB854",
    dark: "#16a043",
  },
  ui: {
    // General UI colors
    white: "#ffffff",
    textPrimary: "#1a1a1a",
    textSecondary: "#666666",
    textMuted: "#aaaaaa",
    background: "#ffffff",
    backgroundAlt: "#f5f5f5",
    shadowColor: "#000000",

    // Card colors
    cardBackground: "#ffffff",

    // Quick Actions icon colors
    plantingIcon: "#2e7d32",
    wateringIcon: "#1976d2",
    pestsIcon: "#d32f2f",
    pruningIcon: "#7b1fa2",

    // Quick Actions backgrounds
    plantingBg: "#C8E6C9",
    wateringBg: "#B3E5FC",
    pestsBg: "#FFCCBC",
    pruningBg: "#E1BEE7",

    // Tips backgrounds
    tipBgYellow: "#FFF9C4",
    tipBgBlue: "#B3E5FC",
    tipBgGreen: "#C8E6C9",
    tipIconColor: "#424242",
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: "system-ui",
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: "ui-serif",
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: "ui-rounded",
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
