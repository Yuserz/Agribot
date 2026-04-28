import { Colors } from "@/constants/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function ProfileScreen() {
  const handleLogout = () => {
    // Implement logout logic
    console.log("Logout pressed");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <MaterialCommunityIcons
              name="account-circle"
              size={80}
              color={Colors.agribot.primary}
            />
          </View>
          <Text style={styles.profileName}>Guest User</Text>
          <Text style={styles.profileEmail}>Welcome to AgriBot</Text>
        </View>

        {/* Profile Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>0</Text>
            <Text style={styles.statLabel}>Farm Size (acres)</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>0</Text>
            <Text style={styles.statLabel}>Questions Asked</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>0</Text>
            <Text style={styles.statLabel}>Tips Saved</Text>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          <MenuItem
            icon="cog"
            label="Settings"
            onPress={() => console.log("Settings pressed")}
          />
          <MenuItem
            icon="bookmark-outline"
            label="Saved Tips"
            onPress={() => console.log("Saved Tips pressed")}
          />
          <MenuItem
            icon="help-circle-outline"
            label="Help & Support"
            onPress={() => console.log("Help pressed")}
          />
          <MenuItem
            icon="information-outline"
            label="About AgriBot"
            onPress={() => console.log("About pressed")}
          />
        </View>

        {/* Logout Button */}
        <Pressable style={styles.logoutButton} onPress={handleLogout}>
          <MaterialCommunityIcons
            name="logout"
            size={20}
            color={Colors.ui.white}
            style={styles.logoutIcon}
          />
          <Text style={styles.logoutText}>Logout</Text>
        </Pressable>

        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>AgriBot v1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

interface MenuItemProps {
  icon: string;
  label: string;
  onPress: () => void;
}

function MenuItem({ icon, label, onPress }: MenuItemProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.menuItem,
        pressed && styles.menuItemPressed,
      ]}
      onPress={onPress}
    >
      <MaterialCommunityIcons
        name={icon as any}
        size={24}
        color={Colors.agribot.primary}
        style={styles.menuIcon}
      />
      <Text style={styles.menuLabel}>{label}</Text>
      <MaterialCommunityIcons
        name="chevron-right"
        size={24}
        color={Colors.ui.textMuted}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.ui.background,
  },
  profileHeader: {
    alignItems: "center",
    paddingVertical: 32,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  avatarContainer: {
    marginBottom: 16,
  },
  profileName: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.ui.textPrimary,
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: Colors.ui.textSecondary,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 16,
    paddingVertical: 24,
    backgroundColor: "rgba(29, 184, 84, 0.05)",
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    fontSize: 24,
    fontWeight: "800",
    color: Colors.agribot.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.ui.textSecondary,
  },
  menuContainer: {
    marginTop: 24,
    marginHorizontal: 16,
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
  menuItemPressed: {
    backgroundColor: "rgba(29, 184, 84, 0.05)",
  },
  menuIcon: {
    marginRight: 12,
  },
  menuLabel: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
    color: Colors.ui.textPrimary,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 32,
    paddingVertical: 14,
    backgroundColor: "#d32f2f",
    borderRadius: 12,
  },
  logoutIcon: {
    marginRight: 8,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.ui.white,
  },
  versionContainer: {
    alignItems: "center",
    paddingVertical: 16,
    marginBottom: 16,
  },
  versionText: {
    fontSize: 12,
    color: Colors.ui.textMuted,
  },
});
