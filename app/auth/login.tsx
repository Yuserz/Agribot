import { Colors } from "@/constants/theme";
import { supabase } from "@/utils/supabase";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";
import Animated, { FadeIn, FadeInDown, FadeInUp } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!email || !password) { setError("Please enter your email and password."); return; }
    setError("");
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) { setError(error.message); } else { router.replace("/(tabs)"); }
  };

  const handleForgotPassword = async () => {
    if (!email) { Alert.alert("Reset Password", "Enter your email above, then tap Forgot Password."); return; }
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) { Alert.alert("Error", error.message); }
    else { Alert.alert("Check your email", "A password reset link has been sent."); }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Header */}
        <Animated.View entering={FadeIn.duration(400)} style={styles.header}>
          <Pressable
            style={({ pressed }) => [styles.backButton, { opacity: pressed ? 0.6 : 1 }]}
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back" size={28} color="#333" />
          </Pressable>
          <Text style={styles.headerTitle}>Login</Text>
          <View style={{ width: 28 }} />
        </Animated.View>

        <View style={styles.divider} />

        {/* Title */}
        <Animated.View entering={FadeInDown.delay(100).duration(450)}>
          <Text style={styles.title}>Welcome Back!</Text>
          <Text style={styles.subtitle}>Sign in to continue to AgriBot</Text>
        </Animated.View>

        {/* Email */}
        <Animated.View entering={FadeInDown.delay(220).duration(450)} style={styles.inputContainer}>
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
        </Animated.View>

        {/* Password */}
        <Animated.View entering={FadeInDown.delay(330).duration(450)} style={styles.inputContainer}>
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
            <Pressable onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
              <Ionicons name={showPassword ? "eye" : "eye-off"} size={20} color="#999" />
            </Pressable>
          </View>
        </Animated.View>

        {/* Remember Me & Forgot */}
        <Animated.View entering={FadeInDown.delay(420).duration(450)} style={styles.bottomSection}>
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
        </Animated.View>

        {!!error && (
          <Animated.View entering={FadeIn.duration(300)}>
            <Text style={styles.errorText}>{error}</Text>
          </Animated.View>
        )}

        {/* Login Button */}
        <Animated.View entering={FadeInUp.delay(480).duration(450)}>
          <Pressable
            style={({ pressed }) => [{ opacity: pressed || loading ? 0.85 : 1 }]}
            onPress={handleLogin}
            disabled={loading}
          >
            <LinearGradient
              colors={["#25d366", Colors.agribot.primary, Colors.agribot.dark]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.loginButton}
            >
              {loading ? <ActivityIndicator color="white" /> : <Text style={styles.loginButtonText}>Login</Text>}
            </LinearGradient>
          </Pressable>
        </Animated.View>

        {/* Sign Up Link */}
        <Animated.View entering={FadeIn.delay(580).duration(400)} style={styles.signUpContainer}>
          <Text style={styles.signUpText}>Dont have an account? </Text>
          <Pressable onPress={() => router.push("/auth/signup")}>
            <Text style={styles.signUpLink}>Sign Up</Text>
          </Pressable>
        </Animated.View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  scrollContent: { paddingHorizontal: 24, paddingVertical: 16 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  backButton: { width: 28, height: 28, justifyContent: "center", alignItems: "center" },
  headerTitle: { fontSize: 18, fontWeight: "600", color: "#333" },
  divider: { height: 1, backgroundColor: "#f0f0f0", marginBottom: 32 },
  title: { fontSize: 32, fontWeight: "800", color: "#1a1a1a", marginBottom: 8 },
  subtitle: { fontSize: 16, fontWeight: "400", color: "#666", marginBottom: 32 },
  inputContainer: { marginBottom: 20 },
  label: { fontSize: 14, fontWeight: "600", color: "#1a1a1a", marginBottom: 8 },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 12,
    paddingHorizontal: 16,
    backgroundColor: "#f8f9fa",
  },
  input: { flex: 1, paddingVertical: 14, marginHorizontal: 12, fontSize: 16, color: "#333" },
  eyeIcon: { padding: 4 },
  bottomSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  checkboxContainer: { flexDirection: "row", alignItems: "center", gap: 8 },
  checkbox: { width: 18, height: 18 },
  checkboxLabel: { fontSize: 14, fontWeight: "400", color: "#666" },
  forgotPasswordLink: { fontSize: 14, fontWeight: "600", color: Colors.agribot.primary },
  loginButton: {
    paddingVertical: 16,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
    shadowColor: Colors.agribot.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  loginButtonText: { color: "white", fontSize: 18, fontWeight: "600" },
  signUpContainer: { flexDirection: "row", justifyContent: "center", alignItems: "center" },
  signUpText: { fontSize: 14, fontWeight: "400", color: "#666" },
  signUpLink: { fontSize: 14, fontWeight: "600", color: Colors.agribot.primary },
  errorText: { fontSize: 14, color: "#e53e3e", marginBottom: 12, textAlign: "center" },
});
