import { Colors } from "@/constants/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const userProfile = {
    name: "guest",
    email: "guest@gmail.com",
    stats: {
      chats: 24,
      topics: 12,
      days: 7,
    },
  };

  const menuItems = [
    {
      id: "1",
      icon: "cog",
      label: "Account Settings",
      description: "Manage your account preferences",
      onPress: () => console.log("Account Settings pressed"),
    },
    {
      id: "2",
      icon: "bell",
      label: "Notifications",
      description: "Configure notification preferences",
      onPress: () => console.log("Notifications pressed"),
    },
    {
      id: "3",
      icon: "help-circle",
      label: "Help & Support",
      description: "Get help and contact support",
      onPress: () => console.log("Help & Support pressed"),
    },
    {
      id: "4",
      icon: "shield",
      label: "Privacy & Security",
      description: "Manage your privacy settings",
      onPress: () => console.log("Privacy & Security pressed"),
    },
  ];

  return (
    <SafeAreaView
      style={styles.container}
      edges={["top", "left", "right", "bottom"]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatarCircle}>
              <MaterialCommunityIcons
                name="account"
                size={60}
                color={Colors.agribot.primary}
              />
            </View>
          </View>
          <Text style={styles.profileName}>{userProfile.name}</Text>
          <Text style={styles.profileEmail}>{userProfile.email}</Text>
        </View>

        {/* Your Activity Section */}
        <View style={styles.activityContainer}>
          <Text style={styles.activityTitle}>Your Activity</Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{userProfile.stats.chats}</Text>
              <Text style={styles.statLabel}>Chats</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{userProfile.stats.topics}</Text>
              <Text style={styles.statLabel}>Topics</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{userProfile.stats.days}</Text>
              <Text style={styles.statLabel}>Days</Text>
            </View>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {menuItems.map((item) => (
            <MenuItem
              key={item.id}
              icon={item.icon}
              label={item.label}
              description={item.description}
              onPress={item.onPress}
            />
          ))}
        </View>

        {/* About AgriBot */}
        <View style={styles.aboutContainer}>
          <Text style={styles.aboutTitle}>About AgriBot</Text>
          <View style={styles.aboutContent}>
            <Text style={styles.aboutLabel}>Version</Text>
            <Text style={styles.aboutValue}>1.0.0</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

interface MenuItemProps {
  icon: string;
  label: string;
  description: string;
  onPress: () => void;
}

function MenuItem({ icon, label, description, onPress }: MenuItemProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.menuItem,
        pressed && styles.menuItemPressed,
      ]}
      onPress={onPress}
    >
      <View style={styles.iconBackground}>
        <MaterialCommunityIcons
          name={icon as any}
          size={24}
          color={Colors.agribot.primary}
        />
      </View>
      <View style={styles.menuItemContent}>
        <Text style={styles.menuLabel}>{label}</Text>
        <Text style={styles.menuDescription}>{description}</Text>
      </View>
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
    backgroundColor: Colors.ui.backgroundAlt,
  },
  profileHeader: {
    alignItems: "center",
    paddingVertical: 32,
    paddingBottom: 40,
    backgroundColor: Colors.agribot.primary,
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatarCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.ui.white,
    justifyContent: "center",
    alignItems: "center",
  },
  profileName: {
    fontSize: 28,
    fontWeight: "700",
    color: Colors.ui.white,
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.9)",
  },
  activityContainer: {
    marginHorizontal: 16,
    marginTop: -30,
    marginBottom: 24,
    backgroundColor: Colors.ui.cardBackground,
    borderRadius: 16,
    padding: 20,
    shadowColor: Colors.ui.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  activityTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.ui.textPrimary,
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statValue: {
    fontSize: 28,
    fontWeight: "800",
    color: Colors.agribot.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 13,
    color: Colors.ui.textSecondary,
    fontWeight: "500",
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    marginHorizontal: 12,
  },
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
  menuItemPressed: {
    backgroundColor: "rgba(29, 184, 84, 0.05)",
  },
  iconBackground: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: "rgba(29, 184, 84, 0.15)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  menuItemContent: {
    flex: 1,
  },
  menuLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.ui.textPrimary,
    marginBottom: 2,
  },
  menuDescription: {
    fontSize: 13,
    color: Colors.ui.textSecondary,
  },
  aboutContainer: {
    marginHorizontal: 16,
    marginBottom: 32,
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
  aboutTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.ui.textPrimary,
    marginBottom: 12,
  },
  aboutContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  aboutLabel: {
    fontSize: 14,
    color: Colors.ui.textSecondary,
  },
  aboutValue: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.agribot.primary,
  },
  scrollContent: {
    paddingBottom: 80,
  },
});
