import { Colors } from "@/constants/theme";
import { useRouter } from "expo-router";
import React from "react";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Svg, { Circle, Path } from "react-native-svg";

interface FeatureItem {
  id: number;
  title: string;
  description: string;
}

const features: FeatureItem[] = [
  {
    id: 1,
    title: "Expert Guidance",
    description: "Get answers on planting, care, and harvesting",
  },
  {
    id: 2,
    title: "Sustainable Practices",
    description: "Learn eco-friendly farming methods",
  },
  {
    id: 3,
    title: "24/7 Support",
    description: "Get help anytime, anywhere",
  },
];

export default function WelcomeScreen() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push("/(tabs)");
  };

  const handleAlreadyHaveAccount = () => {
    // Navigate to login/auth screen when available
    router.push("/(tabs)");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Logo */}
        <View style={styles.logoContainer}>
          <View style={styles.logoBox}>
            <Svg width={100} height={100} viewBox="0 0 100 100">
              <Circle cx="50" cy="50" r="45" fill={Colors.agribot.primary} />
              <Path
                d="M 50 30 Q 65 35 68 55 Q 68 72 50 75 Q 32 72 32 55 Q 35 35 50 30"
                fill="none"
                stroke="white"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <Path
                d="M 50 30 Q 50 50 50 75"
                fill="none"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </Svg>
          </View>
        </View>

        {/* Title */}
        <Text style={styles.title}>Welcome to AgriBot</Text>

        {/* Subtitle */}
        <Text style={styles.subtitle}>
          Your expert guide for sustainable dragon fruit farming
        </Text>

        {/* Features */}
        <View style={styles.featuresContainer}>
          {features.map((feature) => (
            <View key={feature.id} style={styles.featureItem}>
              <View style={styles.featureNumber}>
                <Text style={styles.featureNumberText}>{feature.id}</Text>
              </View>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDescription}>
                  {feature.description}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Buttons */}
        <View style={styles.buttonsContainer}>
          <Pressable
            style={({ pressed }) => [
              styles.primaryButton,
              { opacity: pressed ? 0.85 : 1 },
            ]}
            onPress={handleGetStarted}
          >
            <Text style={styles.primaryButtonText}>Get Started</Text>
            <Text style={styles.arrowIcon}>→</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.secondaryButton,
              { opacity: pressed ? 0.85 : 1 },
            ]}
            onPress={handleAlreadyHaveAccount}
          >
            <Text style={styles.secondaryButtonText}>
              I Already Have an Account
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F8F5",
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 40,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 32,
  },
  logoBox: {
    width: 140,
    height: 140,
    backgroundColor: "white",
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#1A1A1A",
    textAlign: "center",
    marginBottom: 12,
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
  featuresContainer: {
    gap: 24,
    marginBottom: 40,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 16,
  },
  featureNumber: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#E8F5E9",
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
  },
  featureNumberText: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.agribot.primary,
  },
  featureContent: {
    flex: 1,
    paddingTop: 4,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1A1A1A",
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    fontWeight: "400",
    color: "#666666",
    lineHeight: 20,
  },
  buttonsContainer: {
    gap: 12,
  },
  primaryButton: {
    backgroundColor: Colors.agribot.primary,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    shadowColor: Colors.agribot.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  primaryButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  arrowIcon: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  secondaryButton: {
    backgroundColor: "white",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.agribot.primary,
  },
  secondaryButtonText: {
    color: Colors.agribot.primary,
    fontSize: 16,
    fontWeight: "600",
  },
});
