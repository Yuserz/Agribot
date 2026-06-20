import { APP_NAME, APP_SUBTAGLINE } from "@/constants/brand";
import { Colors } from "@/constants/theme";
import { useAuth } from "@/context/auth";
import { useLanguage } from "@/context/language";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import Animated, {
  FadeInDown,
  FadeInRight,
  FadeInUp,
  ZoomIn,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

interface FeatureItem {
  id: number;
  emoji: string;
  title: string;
  description: string;
}

const features: FeatureItem[] = [
  { id: 1, emoji: "🌱", title: "Kahit anong halaman", description: "Tips for any plant — gulay, herbs, succulents, bulaklak" },
  { id: 2, emoji: "💬", title: "Itanong mo lang", description: "Chat with your plant bestie, walang judging" },
  { id: 3, emoji: "⏰", title: "24/7 na handa", description: "Get help anytime, day or night" },
];

export default function WelcomeScreen() {
  const router = useRouter();
  const { continueAsGuest } = useAuth();
  const { isEnglish } = useLanguage();

  const handleGuest = async () => {
    await continueAsGuest();
    router.replace("/(tabs)");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Logo */}
        <Animated.View entering={ZoomIn.springify().damping(13)} style={styles.logoContainer}>
          <LinearGradient
            colors={Colors.brand.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.logoBox}
          >
            <Text style={styles.logoEmoji}>🌱</Text>
          </LinearGradient>
        </Animated.View>

        {/* Title */}
        <Animated.View entering={FadeInDown.delay(260).duration(500)}>
          <Text style={styles.title}>{APP_NAME}</Text>
        </Animated.View>

        {/* Subtitle */}
        <Animated.View entering={FadeInDown.delay(400).duration(500)}>
          <Text style={styles.subtitle}>{APP_SUBTAGLINE}</Text>
        </Animated.View>

        {/* Features */}
        <View style={styles.featuresContainer}>
          {features.map((feature, index) => (
            <Animated.View
              key={feature.id}
              entering={FadeInRight.delay(560 + index * 130).duration(450)}
              style={styles.featureItem}
            >
              <View style={styles.featureEmojiBox}>
                <Text style={styles.featureEmoji}>{feature.emoji}</Text>
              </View>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDescription}>{feature.description}</Text>
              </View>
            </Animated.View>
          ))}
        </View>

        {/* Buttons */}
        <Animated.View entering={FadeInUp.delay(1000).duration(500)} style={styles.buttonsContainer}>
          <Pressable
            style={({ pressed }) => [{ opacity: pressed ? 0.85 : 1 }]}
            onPress={() => router.push("/auth/signup")}
          >
            <LinearGradient
              colors={Colors.brand.gradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.primaryButton}
            >
              <Text style={styles.primaryButtonText}>Tara, magsimula!</Text>
              <Text style={styles.arrowIcon}>→</Text>
            </LinearGradient>
          </Pressable>

          <Pressable
            style={({ pressed }) => [styles.secondaryButton, { opacity: pressed ? 0.85 : 1 }]}
            onPress={() => router.push("/auth/login")}
          >
            <Text style={styles.secondaryButtonText}>May account na ako</Text>
          </Pressable>

          {/* Divider */}
          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>{isEnglish ? "or" : "o kaya"}</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Continue as guest */}
          <Pressable
            style={({ pressed }) => [styles.guestButton, { opacity: pressed ? 0.6 : 1 }]}
            onPress={handleGuest}
          >
            <MaterialCommunityIcons name="account-arrow-right-outline" size={20} color={Colors.brand.primary} />
            <Text style={styles.guestButtonText}>
              {isEnglish ? "Continue as guest" : "Tingnan muna bilang guest"}
            </Text>
          </Pressable>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.ui.backgroundAlt },
  scrollContent: { paddingHorizontal: 24, paddingTop: 28, paddingBottom: 40 },
  logoContainer: { alignItems: "center", marginBottom: 28 },
  logoBox: {
    width: 130,
    height: 130,
    borderRadius: 34,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: Colors.brand.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 14,
    elevation: 8,
  },
  logoEmoji: { fontSize: 70 },
  title: {
    fontSize: 38,
    fontWeight: "900",
    color: "#1A1A1A",
    textAlign: "center",
    marginBottom: 10,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "400",
    color: "#666666",
    textAlign: "center",
    marginBottom: 40,
    lineHeight: 24,
  },
  featuresContainer: { gap: 20, marginBottom: 40 },
  featureItem: { flexDirection: "row", alignItems: "center", gap: 16 },
  featureEmojiBox: {
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: Colors.brand.tintSoft,
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
  },
  featureEmoji: { fontSize: 28 },
  featureContent: { flex: 1 },
  featureTitle: { fontSize: 17, fontWeight: "700", color: "#1A1A1A", marginBottom: 3 },
  featureDescription: { fontSize: 14, fontWeight: "400", color: "#666666", lineHeight: 20 },
  buttonsContainer: { gap: 12 },
  primaryButton: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    shadowColor: Colors.brand.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  primaryButtonText: { color: "white", fontSize: 17, fontWeight: "800" },
  arrowIcon: { color: "white", fontSize: 18, fontWeight: "700" },
  secondaryButton: {
    backgroundColor: "white",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: Colors.brand.primary,
  },
  secondaryButtonText: { color: Colors.brand.primary, fontSize: 16, fontWeight: "700" },
  dividerRow: { flexDirection: "row", alignItems: "center", gap: 12, marginVertical: 4 },
  dividerLine: { flex: 1, height: 1, backgroundColor: Colors.ui.hairline },
  dividerText: { fontSize: 13, fontWeight: "600", color: Colors.ui.textMuted },
  guestButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    paddingVertical: 14,
  },
  guestButtonText: { color: Colors.brand.primary, fontSize: 15, fontWeight: "700" },
});
