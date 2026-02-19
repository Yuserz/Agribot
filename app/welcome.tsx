import { useRouter } from "expo-router";
import {
  Pressable,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";

export default function WelcomeScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const handleProceed = () => {
    router.push("/(tabs)");
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDark ? "#1a1a1a" : "#ffffff" },
      ]}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <Text
            style={[styles.title, { color: isDark ? "#ffffff" : "#1a1a1a" }]}
          >
            AgriBot
          </Text>
          <Text
            style={[styles.subtitle, { color: isDark ? "#e0e0e0" : "#666666" }]}
          >
            A Knowledge-Based Chatbot for Sustainable Dragon Fruit Farming
          </Text>
        </View>

        <View style={styles.textSection}>
          <Text
            style={[
              styles.welcomeText,
              { color: isDark ? "#ffffff" : "#1a1a1a" },
            ]}
          >
            Welcome to AgriBot - Your Intelligent Farming Assistant
          </Text>
          <Text
            style={[
              styles.descriptionText,
              { color: isDark ? "#cccccc" : "#555555" },
            ]}
          >
            Discover sustainable practices for dragon fruit farming with our
            AI-powered chatbot. Get expert advice, best practices, and real-time
            solutions for your farming needs.
          </Text>
        </View>

        <Pressable
          style={({ pressed }) => [
            styles.proceedButton,
            { opacity: pressed ? 0.7 : 1 },
          ]}
          onPress={handleProceed}
        >
          <Text style={styles.buttonText}>Proceed to Home</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  content: {
    width: "100%",
    maxWidth: 400,
    gap: 32,
  },
  header: {
    gap: 12,
    alignItems: "center",
  },
  title: {
    fontSize: 48,
    fontWeight: "700",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    lineHeight: 24,
  },
  textSection: {
    gap: 16,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
  },
  descriptionText: {
    fontSize: 14,
    lineHeight: 22,
    textAlign: "center",
  },
  proceedButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
});
