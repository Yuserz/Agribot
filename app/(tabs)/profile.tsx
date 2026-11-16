import { APP_NAME } from "@/constants/brand";
import { Colors } from "@/constants/theme";
import { getDisplayName, useAuth } from "@/context/auth";
import { useLanguage } from "@/context/language";
import { supabase } from "@/utils/supabase";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import * as ImageManipulator from "expo-image-manipulator";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";
import Animated, { FadeIn, FadeInUp, ZoomIn } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const { user, isGuest, signOut } = useAuth();
  const { isEnglish, toggleLanguage } = useLanguage();
  const router = useRouter();
  const [editNameVisible, setEditNameVisible] = useState(false);
  const [newName, setNewName] = useState("");
  const [savingName, setSavingName] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);

  const displayName = getDisplayName(user);
  const displayEmail = user?.email ?? "";
  const avatarUrl = user?.user_metadata?.avatar_url as string | undefined;

  const handleLogout = async () => {
    await signOut();
    router.replace("/welcome");
  };

  const openEditName = () => {
    setNewName(user?.user_metadata?.full_name ?? "");
    setEditNameVisible(true);
  };

  const handleSaveName = async () => {
    const trimmed = newName.trim();
    if (!trimmed) return;
    setSavingName(true);
    const { error } = await supabase.auth.updateUser({ data: { full_name: trimmed } });
    setSavingName(false);
    if (error) {
      Alert.alert("Error", error.message);
    } else {
      setEditNameVisible(false);
    }
  };

  const handlePickAvatar = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission needed", "Allow photo library access to upload a profile photo.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.9,
    });
    if (result.canceled || !result.assets[0]) return;

    setUploadingAvatar(true);
    try {
      const asset = result.assets[0];
      const manipulated = await ImageManipulator.manipulateAsync(
        asset.uri,
        [{ resize: { width: 400, height: 400 } }],
        { compress: 0.85, format: ImageManipulator.SaveFormat.WEBP }
      );

      const userId = user!.id;
      const path = `${userId}/avatar.webp`;

      const response = await fetch(manipulated.uri);
      const blob = await response.blob();

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(path, blob, { contentType: "image/webp", upsert: true });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage.from("avatars").getPublicUrl(path);

      const { error: updateError } = await supabase.auth.updateUser({
        data: { avatar_url: publicUrl },
      });
      if (updateError) throw updateError;
    } catch (err: any) {
      Alert.alert("Upload failed", err.message ?? "Something went wrong.");
    } finally {
      setUploadingAvatar(false);
    }
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "This will permanently delete your account and all data. This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            await signOut();
            router.replace("/welcome");
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

        {/* Profile Header */}
        <Animated.View entering={FadeIn.duration(400)}>
          <LinearGradient
            colors={Colors.brand.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.profileHeader}
          >
            {/* Avatar */}
            <Animated.View
              entering={ZoomIn.delay(150).springify().damping(24).stiffness(200)}
              style={styles.avatarContainer}
            >
              <Pressable
                onPress={isGuest ? undefined : handlePickAvatar}
                disabled={isGuest}
                style={styles.avatarWrapper}
              >
                {uploadingAvatar ? (
                  <View style={styles.avatarCircle}>
                    <ActivityIndicator color={Colors.brand.primary} size="large" />
                  </View>
                ) : avatarUrl ? (
                  <Image
                    source={{ uri: avatarUrl }}
                    style={styles.avatarImage}
                    contentFit="cover"
                  />
                ) : (
                  <View style={styles.avatarCircle}>
                    <MaterialCommunityIcons name="account" size={60} color={Colors.brand.primary} />
                  </View>
                )}
                {!isGuest && (
                  <View style={styles.editAvatarBadge}>
                    <MaterialCommunityIcons name="camera" size={13} color="white" />
                  </View>
                )}
              </Pressable>
            </Animated.View>

            {/* Name + edit */}
            <Animated.View entering={FadeInUp.delay(250).duration(400)} style={styles.nameRow}>
              <Text style={styles.profileName}>
                {isGuest ? (isEnglish ? "Guest" : "Bisita") : displayName}
              </Text>
              {!isGuest && (
                <Pressable onPress={openEditName} hitSlop={10} style={styles.editNameBtn}>
                  <MaterialCommunityIcons name="pencil" size={16} color="rgba(255,255,255,0.85)" />
                </Pressable>
              )}
            </Animated.View>
            <Text style={styles.profileEmail}>
              {isGuest
                ? isEnglish
                  ? "Browsing as a guest"
                  : "Naka-guest mode ka muna"
                : displayEmail}
            </Text>
          </LinearGradient>
        </Animated.View>

        {/* Account Actions */}
        <Animated.View entering={FadeInUp.delay(300).duration(400)} style={styles.menuContainer}>
          {!isGuest && (
            <Pressable
              style={({ pressed }) => [styles.menuItem, pressed && styles.menuItemPressed]}
              onPress={openEditName}
            >
              <View style={styles.iconBackground}>
                <MaterialCommunityIcons name="account-edit" size={22} color={Colors.brand.primary} />
              </View>
              <View style={styles.menuItemContent}>
                <Text style={styles.menuLabel}>Edit Name</Text>
                <Text style={styles.menuDescription}>Update your display name</Text>
              </View>
              <MaterialCommunityIcons name="chevron-right" size={24} color={Colors.ui.textMuted} />
            </Pressable>
          )}

          {/* Language toggle */}
          <View style={[styles.menuItem, isGuest && styles.menuItemLast]}>
            <View style={styles.iconBackground}>
              <MaterialCommunityIcons name="translate" size={22} color={Colors.brand.primary} />
            </View>
            <View style={styles.menuItemContent}>
              <Text style={styles.menuLabel}>Full English</Text>
              <Text style={styles.menuDescription}>
                {isEnglish ? "Taglish mode is off" : "Currently in Taglish mode"}
              </Text>
            </View>
            <Switch
              value={isEnglish}
              onValueChange={toggleLanguage}
              trackColor={{ false: "#e0e0e0", true: Colors.brand.primary }}
              thumbColor="white"
            />
          </View>

          {!isGuest && (
            <Pressable
              style={({ pressed }) => [styles.menuItem, styles.menuItemLast, pressed && styles.menuItemPressedDanger]}
              onPress={handleDeleteAccount}
            >
              <View style={[styles.iconBackground, styles.dangerIconBg]}>
                <MaterialCommunityIcons name="account-remove" size={22} color="#e53e3e" />
              </View>
              <View style={styles.menuItemContent}>
                <Text style={[styles.menuLabel, styles.dangerLabel]}>Delete Account</Text>
                <Text style={styles.menuDescription}>Permanently remove your account</Text>
              </View>
              <MaterialCommunityIcons name="chevron-right" size={24} color={Colors.ui.textMuted} />
            </Pressable>
          )}
        </Animated.View>

        {/* About */}
        <Animated.View entering={FadeInUp.delay(400).duration(400)} style={styles.aboutContainer}>
          <Text style={styles.aboutTitle}>About {APP_NAME}</Text>
          <Text style={styles.aboutBlurb}>
            {APP_NAME} is your dragon fruit (pitaya) farming assistant — ask about planting
            cuttings, trellis setup, pruning, night pollination, pests, and harvest anytime.
          </Text>
          <View style={styles.aboutContent}>
            <Text style={styles.aboutLabel}>Version</Text>
            <Text style={styles.aboutValue}>1.0.0</Text>
          </View>
        </Animated.View>

        {/* Logout / Sign-in CTA */}
        <Animated.View entering={FadeIn.delay(480).duration(400)} style={styles.logoutWrapper}>
          {isGuest ? (
            <Pressable
              style={({ pressed }) => [{ opacity: pressed ? 0.85 : 1 }]}
              onPress={handleLogout}
            >
              <LinearGradient
                colors={Colors.brand.gradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.signInButton}
              >
                <MaterialCommunityIcons name="login" size={20} color="white" />
                <Text style={styles.signInText}>
                  {isEnglish ? "Log In or Sign Up" : "Mag-log in o mag-sign up"}
                </Text>
              </LinearGradient>
            </Pressable>
          ) : (
            <Pressable
              style={({ pressed }) => [styles.logoutButton, { opacity: pressed ? 0.8 : 1 }]}
              onPress={handleLogout}
            >
              <MaterialCommunityIcons name="logout" size={20} color="#e53e3e" />
              <Text style={styles.logoutText}>Log Out</Text>
            </Pressable>
          )}
        </Animated.View>

      </ScrollView>

      {/* Edit Name Modal */}
      <Modal visible={editNameVisible} transparent animationType="fade" statusBarTranslucent>
        <Pressable style={styles.modalOverlay} onPress={() => setEditNameVisible(false)}>
          <Pressable style={styles.modalCard} onPress={() => {}}>
            <Text style={styles.modalTitle}>Edit Name</Text>
            <TextInput
              style={styles.modalInput}
              value={newName}
              onChangeText={setNewName}
              placeholder="Your display name"
              placeholderTextColor={Colors.ui.textMuted}
              autoFocus
              maxLength={50}
              returnKeyType="done"
              onSubmitEditing={handleSaveName}
            />
            <View style={styles.modalActions}>
              <Pressable
                style={styles.modalCancel}
                onPress={() => setEditNameVisible(false)}
              >
                <Text style={styles.modalCancelText}>Cancel</Text>
              </Pressable>
              <Pressable
                style={[
                  styles.modalSave,
                  (!newName.trim() || savingName) && styles.modalSaveDisabled,
                ]}
                onPress={handleSaveName}
                disabled={!newName.trim() || savingName}
              >
                {savingName ? (
                  <ActivityIndicator color="white" size="small" />
                ) : (
                  <Text style={styles.modalSaveText}>Save</Text>
                )}
              </Pressable>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.ui.backgroundAlt },
  scrollContent: { paddingBottom: 32 },

  // Header
  profileHeader: {
    alignItems: "center",
    paddingTop: 32,
    paddingBottom: 40,
    marginBottom: 24,
  },
  avatarContainer: { marginBottom: 16 },
  avatarWrapper: { position: "relative", width: 120, height: 120 },
  avatarCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.ui.white,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.ui.white,
  },
  editAvatarBadge: {
    position: "absolute",
    bottom: 4,
    right: 4,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: Colors.brand.primary,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "white",
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 4,
  },
  profileName: { fontSize: 26, fontWeight: "700", color: Colors.ui.white, textAlign: "center" },
  editNameBtn: { paddingTop: 2 },
  profileEmail: { fontSize: 14, color: "rgba(255,255,255,0.85)", textAlign: "center" },

  // Menu
  menuContainer: {
    marginHorizontal: 16,
    marginBottom: 16,
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
    borderBottomColor: Colors.ui.hairline,
  },
  menuItemLast: { borderBottomWidth: 0 },
  menuItemPressed: { backgroundColor: Colors.brand.tintSoft },
  menuItemPressedDanger: { backgroundColor: "rgba(229,62,62,0.06)" },
  iconBackground: {
    width: 44,
    height: 44,
    borderRadius: 11,
    backgroundColor: Colors.brand.tintSoft,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  dangerIconBg: { backgroundColor: "rgba(229,62,62,0.08)" },
  menuItemContent: { flex: 1 },
  menuLabel: { fontSize: 15, fontWeight: "600", color: Colors.ui.textPrimary, marginBottom: 2 },
  dangerLabel: { color: "#e53e3e" },
  menuDescription: { fontSize: 13, color: Colors.ui.textSecondary },

  // About
  aboutContainer: {
    marginHorizontal: 16,
    marginBottom: 12,
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
  aboutTitle: { fontSize: 15, fontWeight: "700", color: Colors.ui.textPrimary, marginBottom: 12 },
  aboutBlurb: { fontSize: 13, color: Colors.ui.textSecondary, lineHeight: 19, marginBottom: 12 },
  aboutContent: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  aboutLabel: { fontSize: 14, color: Colors.ui.textSecondary },
  aboutValue: { fontSize: 14, fontWeight: "600", color: Colors.brand.primary },

  // Logout
  logoutWrapper: {
    paddingHorizontal: 16,
    paddingTop: 4,
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
  signInButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    borderRadius: 12,
    gap: 8,
    shadowColor: Colors.brand.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  signInText: { fontSize: 16, fontWeight: "700", color: "white" },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  modalCard: {
    width: "100%",
    backgroundColor: Colors.ui.white,
    borderRadius: 16,
    padding: 24,
  },
  modalTitle: { fontSize: 18, fontWeight: "700", color: Colors.ui.textPrimary, marginBottom: 16 },
  modalInput: {
    borderWidth: 1,
    borderColor: Colors.ui.hairline,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: Colors.ui.textPrimary,
    backgroundColor: Colors.ui.backgroundAlt,
    marginBottom: 20,
  },
  modalActions: { flexDirection: "row", gap: 12 },
  modalCancel: {
    flex: 1,
    paddingVertical: 13,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: Colors.ui.hairline,
    alignItems: "center",
  },
  modalCancelText: { fontSize: 15, fontWeight: "600", color: Colors.ui.textSecondary },
  modalSave: {
    flex: 1,
    paddingVertical: 13,
    borderRadius: 10,
    backgroundColor: Colors.brand.primary,
    alignItems: "center",
  },
  modalSaveDisabled: { opacity: 0.45 },
  modalSaveText: { fontSize: 15, fontWeight: "600", color: "white" },
});
