import { Colors } from "@/constants/theme";
import { useAuth } from "@/context/auth";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import Animated, { FadeIn, FadeInRight, FadeInUp, ZoomIn } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const { user, signOut } = useAuth();
  const router = useRouter();

  const displayName = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "User";
  const displayEmail = user?.email || "";

  const handleLogout = async () => {
    await signOut();
    router.replace("/welcome");
  };

  const menuItems = [
    { id: "1", icon: "cog", label: "Account Settings", description: "Manage your account preferences", onPress: () => {} },
    { id: "2", icon: "bell", label: "Notifications", description: "Configure notification preferences", onPress: () => {} },
    { id: "3", icon: "help-circle", label: "Help & Support", description: "Get help and contact support", onPress: () => {} },
    { id: "4", icon: "shield", label: "Privacy & Security", description: "Manage your privacy settings", onPress: () => {} },
  ];

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

        {/* Profile Header */}
        <Animated.View entering={FadeIn.duration(400)}>
          <LinearGradient
            colors={["#25d366", Colors.agribot.primary, Colors.agribot.dark]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.profileHeader}
          >
            <Animated.View entering={ZoomIn.delay(150).springify().damping(14)} style={styles.avatarContainer}>
              <View style={styles.avatarCircle}>
                <MaterialCommunityIcons name="account" size={60} color={Colors.agribot.primary} />
              </View>
            </Animated.View>
            <Animated.View entering={FadeInUp.delay(250).duration(400)}>
              <Text style={styles.profileName}>{displayName}</Text>
              <Text style={styles.profileEmail}>{displayEmail}</Text>
            </Animated.View>
          </LinearGradient>
        </Animated.View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <Animated.View
              key={item.id}
              entering={FadeInRight.delay(300 + index * 80).duration(400)}
            >
              <MenuItem
                icon={item.icon}
                label={item.label}
                description={item.description}
                onPress={item.onPress}
                isLast={index === menuItems.length - 1}
              />
            </Animated.View>
          ))}
        </View>

        {/* About AgriBot */}
        <Animated.View entering={FadeInUp.delay(620).duration(400)} style={styles.aboutContainer}>
          <Text style={styles.aboutTitle}>About AgriBot</Text>
          <View style={styles.aboutContent}>
            <Text style={styles.aboutLabel}>Version</Text>
            <Text style={styles.aboutValue}>1.0.0</Text>
          </View>
        </Animated.View>

        {/* Logout */}
        <Animated.View entering={FadeIn.delay(720).duration(400)} style={styles.logoutWrapper}>
          <Pressable
            style={({ pressed }) => [styles.logoutButton, { opacity: pressed ? 0.8 : 1 }]}
            onPress={handleLogout}
          >
            <MaterialCommunityIcons name="logout" size={20} color="#e53e3e" />
            <Text style={styles.logoutText}>Log Out</Text>
          </Pressable>
        </Animated.View>

      </ScrollView>
    </SafeAreaView>
  );
}

interface MenuItemProps {
  icon: string;
  label: string;
  description: string;
  onPress: () => void;
  isLast?: boolean;
}

function MenuItem({ icon, label, description, onPress, isLast }: MenuItemProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.menuItem,
        pressed && styles.menuItemPressed,
        isLast && styles.menuItemLast,
      ]}
      onPress={onPress}
    >
      <View style={styles.iconBackground}>
        <MaterialCommunityIcons name={icon as any} size={24} color={Colors.agribot.primary} />
      </View>
      <View style={styles.menuItemContent}>
        <Text style={styles.menuLabel}>{label}</Text>
        <Text style={styles.menuDescription}>{description}</Text>
      </View>
      <MaterialCommunityIcons name="chevron-right" size={24} color={Colors.ui.textMuted} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.ui.backgroundAlt },
  scrollContent: { paddingBottom: 24 },
  profileHeader: {
    alignItems: "center",
    paddingVertical: 32,
    paddingBottom: 40,
    marginBottom: 24,
  },
  avatarContainer: { marginBottom: 16 },
  avatarCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.ui.white,
    justifyContent: "center",
    alignItems: "center",
  },
  profileName: { fontSize: 28, fontWeight: "700", color: Colors.ui.white, marginBottom: 4, textAlign: "center" },
  profileEmail: { fontSize: 14, color: "rgba(255, 255, 255, 0.9)", textAlign: "center" },
  menuContainer: {
    marginHorizontal: 16,
    marginBottom: 24,
    backgroundColor: Colors.ui.cardBackground,
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: Colors.ui.shadowColor,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 1,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  menuItemLast: { borderBottomWidth: 0 },
  menuItemPressed: { backgroundColor: "rgba(29, 184, 84, 0.05)" },
  iconBackground: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: "rgba(29, 184, 84, 0.15)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  menuItemContent: { flex: 1 },
  menuLabel: { fontSize: 16, fontWeight: "600", color: Colors.ui.textPrimary, marginBottom: 2 },
  menuDescription: { fontSize: 13, color: Colors.ui.textSecondary },
  aboutContainer: {
    marginHorizontal: 16,
    marginBottom: 8,
    backgroundColor: Colors.ui.cardBackground,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    shadowColor: Colors.ui.shadowColor,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 1,
  },
  aboutTitle: { fontSize: 16, fontWeight: "700", color: Colors.ui.textPrimary, marginBottom: 12 },
  aboutContent: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  aboutLabel: { fontSize: 14, color: Colors.ui.textSecondary },
  aboutValue: { fontSize: 14, fontWeight: "600", color: Colors.agribot.primary },
  logoutWrapper: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    backgroundColor: Colors.ui.backgroundAlt,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#e53e3e",
    gap: 8,
  },
  logoutText: { fontSize: 16, fontWeight: "600", color: "#e53e3e" },
});
