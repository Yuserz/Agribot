import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import { Animated, Easing, Image, StyleSheet, Text, View } from "react-native";

import { Colors } from "@/constants/theme";
import { useAuth } from "@/context/auth";

export default function SplashScreen() {
  const router = useRouter();
  const { session, loading } = useAuth();
  const [dotOpacity] = useState([
    new Animated.Value(0.3),
    new Animated.Value(0.3),
    new Animated.Value(0.3),
  ]);

  useEffect(() => {
    const animateDots = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(dotOpacity[0], {
            toValue: 1,
            duration: 400,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
          Animated.parallel([
            Animated.timing(dotOpacity[0], {
              toValue: 0.3,
              duration: 200,
              easing: Easing.ease,
              useNativeDriver: true,
            }),
            Animated.timing(dotOpacity[1], {
              toValue: 1,
              duration: 400,
              easing: Easing.ease,
              useNativeDriver: true,
            }),
          ]),
          Animated.parallel([
            Animated.timing(dotOpacity[1], {
              toValue: 0.3,
              duration: 200,
              easing: Easing.ease,
              useNativeDriver: true,
            }),
            Animated.timing(dotOpacity[2], {
              toValue: 1,
              duration: 400,
              easing: Easing.ease,
              useNativeDriver: true,
            }),
          ]),
          Animated.timing(dotOpacity[2], {
            toValue: 0.3,
            duration: 200,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    };

    animateDots();

    const timer = setTimeout(() => {
      if (!loading) {
        router.replace(session ? "/(tabs)" : "/welcome");
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [loading, session]);

  return (
    <LinearGradient
      colors={["#25d366", Colors.agribot.primary, Colors.agribot.dark]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.content}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <View style={styles.logoBox}>
            <Image
              source={require("@/assets/images/logo.png")}
              style={styles.logoImage}
              resizeMode="contain"
            />
          </View>
        </View>

        <Text style={styles.title}>AgriBot</Text>
        <Text style={styles.subtitle}>Dragon Fruit Farming Assistant</Text>

        <View style={styles.dotsContainer}>
          {dotOpacity.map((opacity, index) => (
            <Animated.View
              key={index}
              style={[styles.dot, { opacity }]}
            />
          ))}
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  logoContainer: {
    marginBottom: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  logoBox: {
    width: 110,
    height: 110,
    backgroundColor: "white",
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 10,
  },
  logoImage: {
    width: 80,
    height: 80,
  },
  title: {
    fontSize: 56,
    fontWeight: "800",
    color: "white",
    marginBottom: 12,
    textAlign: "center",
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
    marginBottom: 80,
    fontWeight: "300",
    letterSpacing: 0.5,
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "white",
  },
});
