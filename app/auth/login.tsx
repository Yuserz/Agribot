import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Colors } from "@/constants/theme";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = () => {
    // TODO: Implement login logic
    router.push("/(tabs)");
  };

  const handleSignUp = () => {
    router.push("/auth/signup");
  };

  const handleForgotPassword = () => {
    // TODO: Navigate to forgot password screen
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Pressable
            style={({ pressed }) => [
              styles.backButton,
              { opacity: pressed ? 0.6 : 1 },
            ]}
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back" size={28} color="#333" />
          </Pressable>
          <Text style={styles.headerTitle}>Login</Text>
          <View style={{ width: 28 }} />
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Title */}
        <Text style={styles.title}>Welcome Back!</Text>
        <Text style={styles.subtitle}>Sign in to continue to AgriBot</Text>

        {/* Email Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="mail" size={20} color="#999" />
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor="#ccc"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
          </View>
        </View>

        {/* Password Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="lock-closed" size={20} color="#999" />
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              placeholderTextColor="#ccc"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <Pressable
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeIcon}
            >
              <Ionicons
                name={showPassword ? "eye" : "eye-off"}
                size={20}
                color="#999"
              />
            </Pressable>
          </View>
        </View>

        {/* Remember Me & Forgot Password */}
        <View style={styles.bottomSection}>
          <View style={styles.checkboxContainer}>
            <Switch
              value={rememberMe}
              onValueChange={setRememberMe}
              trackColor={{ false: "#e0e0e0", true: Colors.agribot.primary }}
              thumbColor={rememberMe ? "white" : "#f0f0f0"}
              style={styles.checkbox}
            />
            <Text style={styles.checkboxLabel}>Remember me</Text>
          </View>
          <Pressable onPress={handleForgotPassword}>
            <Text style={styles.forgotPasswordLink}>Forgot Password?</Text>
          </Pressable>
        </View>

        {/* Login Button */}
        <Pressable
          style={({ pressed }) => [
            styles.loginButton,
            { opacity: pressed ? 0.85 : 1 },
          ]}
          onPress={handleLogin}
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </Pressable>

        {/* Sign Up Link */}
        <View style={styles.signUpContainer}>
          <Text style={styles.signUpText}>Dont have an account? </Text>
          <Pressable onPress={handleSignUp}>
            <Text style={styles.signUpLink}>Sign Up</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  backButton: {
    width: 28,
    height: 28,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  divider: {
    height: 1,
    backgroundColor: "#f0f0f0",
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#1a1a1a",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "400",
    color: "#666",
    marginBottom: 32,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 12,
    paddingHorizontal: 16,
    backgroundColor: "#f8f9fa",
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    marginHorizontal: 12,
    fontSize: 16,
    color: "#333",
  },
  eyeIcon: {
    padding: 4,
  },
  bottomSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  checkbox: {
    width: 18,
    height: 18,
  },
  checkboxLabel: {
    fontSize: 14,
    fontWeight: "400",
    color: "#666",
  },
  forgotPasswordLink: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.agribot.primary,
  },
  loginButton: {
    backgroundColor: Colors.agribot.primary,
    paddingVertical: 16,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
    shadowColor: Colors.agribot.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  loginButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  signUpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  signUpText: {
    fontSize: 14,
    fontWeight: "400",
    color: "#666",
  },
  signUpLink: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.agribot.primary,
  },
});
