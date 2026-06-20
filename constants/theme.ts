/**
 * App color palette and fonts.
 *
 * Brand identity: "Tanim, Bes!" — a premium botanical theme.
 * Deep emerald + champagne gold over warm ivory neutrals.
 * Use the `Colors.brand.*` and `Colors.ui.*` tokens instead of hardcoding hex.
 */

import { Platform } from "react-native";

const tintColorLight = "#15654A";
const tintColorDark = "#1F8A63";

// Premium "Emerald & Gold" brand palette
const brand = {
  primary: "#15654A", // deep emerald — safe with white text
  light: "#1F8A63", // emerald highlight
  dark: "#0C4030", // forest
  accent: "#C9A24B", // champagne gold
  accentDark: "#A37E33", // deep gold
  // Refined, near-monochrome emerald gradient (headers, splash, buttons)
  gradient: ["#0C4030", "#15654A", "#1F8A63"] as const,
  gradientShort: ["#15654A", "#1F8A63"] as const,
  // Gold gradient reserved for premium accents / spotlight CTAs
  goldGradient: ["#D8B85F", "#C9A24B"] as const,
  // Soft tints for pressed states / subtle backgrounds
  tintSoft: "rgba(21, 101, 74, 0.08)",
  tintSoftBorder: "rgba(21, 101, 74, 0.14)",
  goldSoft: "rgba(201, 162, 75, 0.14)",
  goldSoftBorder: "rgba(201, 162, 75, 0.30)",
};

export const Colors = {
  light: {
    text: "#16201B",
    background: "#fff",
    tint: tintColorLight,
    icon: "#5C6660",
    tabIconDefault: "#9AA39D",
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: "#ECEDEE",
    background: "#0E1512",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
  },
  brand,
  ui: {
    // General UI colors
    white: "#ffffff",
    textPrimary: "#16201B", // deep charcoal-green
    textSecondary: "#5C6660", // muted sage-gray
    textMuted: "#9AA39D",
    background: "#ffffff",
    backgroundAlt: "#F6F4EE", // warm ivory
    shadowColor: "#13241C", // green-tinted shadow for cohesion
    hairline: "#ECEAE2", // subtle borders/dividers

    // Card colors
    cardBackground: "#ffffff",

    // Legacy quick-action color slots (kept for any remaining references)
    plantingIcon: "#2F8366",
    wateringIcon: "#3E6B7A",
    pestsIcon: "#A85C4A",
    pruningIcon: "#6B5A8A",
    plantingBg: "#E6EFE6",
    wateringBg: "#E2ECEC",
    pestsBg: "#F3E7E3",
    pruningBg: "#EBE7F0",

    // Tips backgrounds (muted, tonal)
    tipBgYellow: "#F4EEDD",
    tipBgBlue: "#E2ECEA",
    tipBgGreen: "#E6EFE6",
    tipIconColor: "#15654A",
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
