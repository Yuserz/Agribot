/**
 * App color palette and fonts.
 *
 * Brand identity: "AgriBot" — a dragon fruit (pitaya) theme.
 * Pitaya magenta + scale/leaf green over faintly pink-warm neutrals.
 * Use the `Colors.brand.*` and `Colors.ui.*` tokens instead of hardcoding hex.
 */

import { Platform } from "react-native";

const tintColorLight = "#B0206A";
const tintColorDark = "#D9457F";

// "Pitaya" brand palette
const brand = {
  primary: "#B0206A", // pitaya magenta — safe with white text
  light: "#D9457F", // magenta highlight
  dark: "#7A1247", // deep pitaya
  accent: "#2F8366", // green, for the fruit's scales/leaves
  accentDark: "#215F4B", // deep green
  // Magenta gradient (headers, splash, buttons)
  gradient: ["#7A1247", "#B0206A", "#D9457F"] as const,
  gradientShort: ["#B0206A", "#D9457F"] as const,
  // Green accent gradient for spotlight CTAs (name kept so call sites don't change)
  goldGradient: ["#3A9A78", "#2F8366"] as const,
  // Soft tints for pressed states / subtle backgrounds
  tintSoft: "rgba(176, 32, 106, 0.08)",
  tintSoftBorder: "rgba(176, 32, 106, 0.14)",
  goldSoft: "rgba(47, 131, 102, 0.14)",
  goldSoftBorder: "rgba(47, 131, 102, 0.30)",
};

export const Colors = {
  light: {
    text: "#22171C",
    background: "#fff",
    tint: tintColorLight,
    icon: "#6A5F64",
    tabIconDefault: "#A59BA0",
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: "#ECEDEE",
    background: "#160E12",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
  },
  brand,
  ui: {
    // General UI colors
    white: "#ffffff",
    textPrimary: "#22171C", // deep charcoal-plum
    textSecondary: "#6A5F64", // muted mauve-gray
    textMuted: "#A59BA0",
    background: "#ffffff",
    backgroundAlt: "#F8F3F4", // faintly pink-warm neutral
    shadowColor: "#2A1220", // magenta-tinted shadow for cohesion
    hairline: "#EFE7EA", // subtle borders/dividers

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
    tipBgYellow: "#F8E8EF", // soft pitaya pink
    tipBgBlue: "#F1E9F2", // soft orchid
    tipBgGreen: "#E4EFE9", // soft leaf green
    tipIconColor: "#B0206A",
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
