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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignUp = async () => {
    if (!fullName || !email || !password || !confirmPassword) { setError("Please fill in all required fields."); return; }
    if (password !== confirmPassword) { setError("Passwords do not match."); return; }
    if (password.length < 6) { setError("Password must be at least 6 characters."); return; }
    if (!agreedToTerms) { setError("You must agree to the Terms of Service and Privacy Policy."); return; }
    setError("");
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName, phone } },
    });
    setLoading(false);
    if (error) { setError(error.message); return; }
    if (data.session) {
      router.replace("/(tabs)");
    } else {
      Alert.alert(
        "Check your email",
        "A confirmation link has been sent to your email. Please verify before logging in.",
        [{ text: "OK", onPress: () => router.replace("/auth/login") }],
      );
    }
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
          <Text style={styles.headerTitle}>Sign Up</Text>
          <View style={{ width: 28 }} />
        </Animated.View>

        <View style={styles.divider} />

        {/* Title */}
        <Animated.View entering={FadeInDown.delay(100).duration(450)}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Join AgriBot and start your farming journey</Text>
        </Animated.View>

        {/* Full Name */}
        <Animated.View entering={FadeInDown.delay(200).duration(450)} style={styles.inputContainer}>
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
        </Animated.View>

        {/* Email */}
        <Animated.View entering={FadeInDown.delay(290).duration(450)} style={styles.inputContainer}>
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

        {/* Phone */}
        <Animated.View entering={FadeInDown.delay(370).duration(450)} style={styles.inputContainer}>
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
        </Animated.View>

        {/* Password */}
        <Animated.View entering={FadeInDown.delay(440).duration(450)} style={styles.inputContainer}>
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
            <Pressable onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
              <Ionicons name={showPassword ? "eye" : "eye-off"} size={20} color="#999" />
            </Pressable>
          </View>
        </Animated.View>

        {/* Confirm Password */}
        <Animated.View entering={FadeInDown.delay(510).duration(450)} style={styles.inputContainer}>
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
            <Pressable onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={styles.eyeIcon}>
              <Ionicons name={showConfirmPassword ? "eye" : "eye-off"} size={20} color="#999" />
            </Pressable>
          </View>
        </Animated.View>

        {/* Terms */}
        <Animated.View entering={FadeInDown.delay(580).duration(450)} style={styles.termsContainer}>
          <Switch
            value={agreedToTerms}
            onValueChange={setAgreedToTerms}
            trackColor={{ false: "#e0e0e0", true: Colors.agribot.primary }}
            thumbColor={agreedToTerms ? "white" : "#f0f0f0"}
          />
          <View style={styles.termsText}>
            <Text style={styles.termsLabel}>I agree to the </Text>
            <Pressable><Text style={styles.termsLink}>Terms of Service</Text></Pressable>
            <Text style={styles.termsLabel}> and </Text>
            <Pressable><Text style={styles.termsLink}>Privacy Policy</Text></Pressable>
          </View>
        </Animated.View>

        {!!error && (
          <Animated.View entering={FadeIn.duration(300)}>
            <Text style={styles.errorText}>{error}</Text>
          </Animated.View>
        )}

        {/* Sign Up Button */}
        <Animated.View entering={FadeInUp.delay(620).duration(450)}>
          <Pressable
            style={({ pressed }) => [{ opacity: pressed || loading ? 0.85 : 1 }]}
            onPress={handleSignUp}
            disabled={loading}
          >
            <LinearGradient
              colors={["#25d366", Colors.agribot.primary, Colors.agribot.dark]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.signUpButton}
            >
              {loading ? <ActivityIndicator color="white" /> : <Text style={styles.signUpButtonText}>Sign Up</Text>}
            </LinearGradient>
          </Pressable>
        </Animated.View>

        {/* Login Link */}
        <Animated.View entering={FadeIn.delay(720).duration(400)} style={styles.loginContainer}>
          <Text style={styles.loginText}>Already have an account? </Text>
          <Pressable onPress={() => router.push("/auth/login")}>
            <Text style={styles.loginLink}>Login</Text>
          </Pressable>
        </Animated.View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  scrollContent: { paddingHorizontal: 24, paddingVertical: 16, paddingBottom: 40 },
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
  termsContainer: { flexDirection: "row", alignItems: "flex-start", marginBottom: 24, gap: 8 },
  termsText: { flex: 1, flexDirection: "row", flexWrap: "wrap" },
  termsLabel: { fontSize: 14, fontWeight: "400", color: "#666" },
  termsLink: { fontSize: 14, fontWeight: "600", color: Colors.agribot.primary },
  signUpButton: {
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
  signUpButtonText: { color: "white", fontSize: 18, fontWeight: "600" },
  loginContainer: { flexDirection: "row", justifyContent: "center", alignItems: "center" },
  loginText: { fontSize: 14, fontWeight: "400", color: "#666" },
  loginLink: { fontSize: 14, fontWeight: "600", color: Colors.agribot.primary },
  errorText: { fontSize: 14, color: "#e53e3e", marginBottom: 12, textAlign: "center" },
});
