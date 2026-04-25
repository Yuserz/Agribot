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

export default function SignUpScreen() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleSignUp = () => {
    // TODO: Implement sign up logic
    router.push("/(tabs)");
  };

  const handleLogin = () => {
    router.push("/auth/login");
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
          <Text style={styles.headerTitle}>Sign Up</Text>
          <View style={{ width: 28 }} />
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Title */}
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>
          Join AgriBot and start your farming journey
        </Text>

        {/* Full Name Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Full Name</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="person" size={20} color="#999" />
            <TextInput
              style={styles.input}
              placeholder="Enter your full name"
              placeholderTextColor="#ccc"
              value={fullName}
              onChangeText={setFullName}
            />
          </View>
        </View>

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

        {/* Phone Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Phone Number</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="call" size={20} color="#999" />
            <TextInput
              style={styles.input}
              placeholder="Enter your phone number"
              placeholderTextColor="#ccc"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
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
              placeholder="Create a password"
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

        {/* Confirm Password Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Confirm Password</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="lock-closed" size={20} color="#999" />
            <TextInput
              style={styles.input}
              placeholder="Confirm your password"
              placeholderTextColor="#ccc"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword}
            />
            <Pressable
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              style={styles.eyeIcon}
            >
              <Ionicons
                name={showConfirmPassword ? "eye" : "eye-off"}
                size={20}
                color="#999"
              />
            </Pressable>
          </View>
        </View>

        {/* Terms & Conditions */}
        <View style={styles.termsContainer}>
          <Switch
            value={agreedToTerms}
            onValueChange={setAgreedToTerms}
            trackColor={{ false: "#e0e0e0", true: Colors.agribot.primary }}
            thumbColor={agreedToTerms ? "white" : "#f0f0f0"}
          />
          <View style={styles.termsText}>
            <Text style={styles.termsLabel}>I agree to the </Text>
            <Pressable>
              <Text style={styles.termsLink}>Terms of Service</Text>
            </Pressable>
            <Text style={styles.termsLabel}> and </Text>
            <Pressable>
              <Text style={styles.termsLink}>Privacy Policy</Text>
            </Pressable>
          </View>
        </View>

        {/* Sign Up Button */}
        <Pressable
          style={({ pressed }) => [
            styles.signUpButton,
            { opacity: pressed ? 0.85 : 1 },
          ]}
          onPress={handleSignUp}
        >
          <Text style={styles.signUpButtonText}>Sign Up</Text>
        </Pressable>

        {/* Login Link */}
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already have an account? </Text>
          <Pressable onPress={handleLogin}>
            <Text style={styles.loginLink}>Login</Text>
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
    paddingBottom: 40,
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
  termsContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 24,
    gap: 8,
  },
  termsText: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  termsLabel: {
    fontSize: 14,
    fontWeight: "400",
    color: "#666",
  },
  termsLink: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.agribot.primary,
  },
  signUpButton: {
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
  signUpButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  loginText: {
    fontSize: 14,
    fontWeight: "400",
    color: "#666",
  },
  loginLink: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.agribot.primary,
  },
});
