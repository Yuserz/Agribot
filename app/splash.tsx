import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Animated, Easing, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { APP_NAME, APP_TAGLINE } from "@/constants/brand";
import { Colors } from "@/constants/theme";
import { useAuth } from "@/context/auth";

export default function SplashScreen() {
  const router = useRouter();
  const { session, isGuest, loading } = useAuth();
  const insets = useSafeAreaInsets();

  // Lazy useState keeps these Animated values stable across renders without reading refs during render.
  const [logoScale] = useState(() => new Animated.Value(0.5));
  const [logoOpacity] = useState(() => new Animated.Value(0));
  const [textOpacity] = useState(() => new Animated.Value(0));
  const [dotOpacity] = useState(() => [
    new Animated.Value(0.3),
    new Animated.Value(0.3),
    new Animated.Value(0.3),
  ]);

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.spring(logoScale, { toValue: 1, friction: 5, tension: 60, useNativeDriver: true }),
        Animated.timing(logoOpacity, { toValue: 1, duration: 500, useNativeDriver: true }),
      ]),
      Animated.timing(textOpacity, { toValue: 1, duration: 450, useNativeDriver: true }),
    ]).start();

    const pulse = (val: Animated.Value, delay: number) =>
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(val, { toValue: 1, duration: 400, easing: Easing.ease, useNativeDriver: true }),
        Animated.timing(val, { toValue: 0.3, duration: 300, easing: Easing.ease, useNativeDriver: true }),
      ]);

    Animated.loop(
      Animated.parallel([
        pulse(dotOpacity[0], 0),
        pulse(dotOpacity[1], 200),
        pulse(dotOpacity[2], 400),
      ]),
    ).start();

    const timer = setTimeout(() => {
      if (!loading) {
        router.replace(session || isGuest ? "/(tabs)" : "/welcome");
      }
    }, 2800);

    return () => clearTimeout(timer);
  }, [loading, session, isGuest, router, logoScale, logoOpacity, textOpacity, dotOpacity]);

  return (
    <LinearGradient
      colors={Colors.brand.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.content}>
        <Animated.View
          style={[
            styles.logoBox,
            { opacity: logoOpacity, transform: [{ scale: logoScale }] },
          ]}
        >
          <Text style={styles.logoEmoji}>🐉</Text>
        </Animated.View>

        <Animated.View style={{ opacity: textOpacity, alignItems: "center" }}>
          <Text style={styles.title}>{APP_NAME}</Text>
          <Text style={styles.subtitle}>{APP_TAGLINE}</Text>
        </Animated.View>

        <View style={[styles.dotsContainer, { bottom: insets.bottom + 32 }]}>
          {dotOpacity.map((opacity, index) => (
            <Animated.View key={index} style={[styles.dot, { opacity }]} />
          ))}
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  logoBox: {
    width: 120,
    height: 120,
    backgroundColor: "white",
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 36,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.22,
    shadowRadius: 14,
    elevation: 12,
  },
  logoEmoji: { fontSize: 64 },
  title: {
    fontSize: 48,
    fontWeight: "900",
    color: "white",
    marginBottom: 14,
    textAlign: "center",
    letterSpacing: 0.5,
    textShadowColor: "rgba(0,0,0,0.2)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 17,
    color: "white",
    textAlign: "center",
    marginBottom: 70,
    fontWeight: "500",
    letterSpacing: 0.3,
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
    position: "absolute",
    bottom: 0,
  },
  dot: { width: 12, height: 12, borderRadius: 6, backgroundColor: "white" },
});
