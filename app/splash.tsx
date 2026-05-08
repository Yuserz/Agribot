import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Animated, Easing, StyleSheet, Text, View } from "react-native";
import Svg, { Path } from "react-native-svg";

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
    <View style={styles.container}>
      {/* Content */}
      <View style={styles.content}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <View style={styles.logoBox}>
            <Svg width={80} height={80} viewBox="0 0 100 100">
              {/* Leaf icon */}
              <Path
                d="M 50 20 Q 70 30 75 55 Q 75 80 50 85 Q 25 80 25 55 Q 30 30 50 20"
                fill="none"
                stroke={Colors.agribot.primary}
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Leaf vein */}
              <Path
                d="M 50 20 Q 50 50 50 85"
                fill="none"
                stroke={Colors.agribot.primary}
                strokeWidth="5"
                strokeLinecap="round"
              />
            </Svg>
          </View>
        </View>

        {/* Title and Subtitle */}
        <Text style={styles.title}>AgriBot</Text>
        <Text style={styles.subtitle}>Dragon Fruit Farming Assistant</Text>

        {/* Loading Animation - Three Dots */}
        <View style={styles.dotsContainer}>
          {dotOpacity.map((opacity, index) => (
            <Animated.View
              key={index}
              style={[
                styles.dot,
                {
                  opacity: opacity,
                },
              ]}
            />
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.agribot.primary,
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
    width: 100,
    height: 100,
    backgroundColor: "white",
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
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
