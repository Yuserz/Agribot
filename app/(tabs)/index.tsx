import { APP_NAME, greetingFor } from "@/constants/brand";
import { CARE_ACTIONS, PLANT_TOPICS } from "@/constants/plantTopics";
import { Colors } from "@/constants/theme";
import { getDisplayName, useAuth } from "@/context/auth";
import { useBotpress } from "@/context/botpress";
import { useLanguage } from "@/context/language";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInRight,
  ZoomIn,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const tips = [
  {
    id: 1,
    icon: "sprout",
    bgColor: Colors.ui.tipBgGreen,
    taglish: { title: "Start small, bes", description: "Pick one easy plant first (kangkong or herbs) before going big." },
    english: { title: "Start small", description: "Pick one easy plant first before going big — kangkong and herbs are great starters." },
  },
  {
    id: 2,
    icon: "water-percent",
    bgColor: Colors.ui.tipBgBlue,
    taglish: { title: "Don't drown them", description: "Most plants die from too much water, not too little." },
    english: { title: "Don't drown them", description: "Most plants die from too much water, not too little." },
  },
  {
    id: 3,
    icon: "white-balance-sunny",
    bgColor: Colors.ui.tipBgYellow,
    taglish: { title: "Chase the sun", description: "Know your plant's light needs — full sun vs. shade matters." },
    english: { title: "Chase the sun", description: "Know your plant's light needs — full sun vs. shade makes a big difference." },
  },
];

export default function HomeScreen() {
  const { user } = useAuth();
  const { setPendingMessage } = useBotpress();
  const { isEnglish } = useLanguage();
  const router = useRouter();
  const displayName = getDisplayName(user, isEnglish ? "friend" : "ka-tanim");
  const lang = isEnglish ? "english" : "taglish";

  const ask = (message: string) => {
    setPendingMessage(message);
    router.push("/(tabs)/chatbot");
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: Colors.ui.backgroundAlt }]}
      edges={["top", "left", "right"]}
    >
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Brand Header */}
        <Animated.View entering={FadeIn.duration(450)}>
          <LinearGradient
            colors={Colors.brand.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.headerSection}
          >
            <Text style={styles.brandTag}>{APP_NAME}</Text>
            <Text style={styles.greeting}>{isEnglish ? `Hey, ${displayName}! 👋` : greetingFor(displayName)}</Text>
            <Text style={styles.subGreeting}>{isEnglish ? "What are we planting today?" : "Anong itatanim natin ngayon?"}</Text>
          </LinearGradient>
        </Animated.View>

        {/* Plant Topics */}
        <Animated.View
          entering={FadeInDown.delay(140).duration(450)}
          style={styles.section}
        >
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{isEnglish ? "Plants 🌱" : "Mga Halaman 🌱"}</Text>
            <Text style={styles.sectionHint}>Tap to ask</Text>
          </View>
          <View style={styles.topicsGrid}>
            {PLANT_TOPICS.map((topic, index) => (
              <Animated.View
                key={topic.id}
                entering={ZoomIn.delay(200 + index * 60).duration(320)}
                style={styles.topicWrap}
              >
                <Pressable
                  onPress={() => ask(topic.prompt)}
                  style={({ pressed }) => [
                    styles.topicCard,
                    { backgroundColor: topic.bgColor },
                    pressed && styles.pressed,
                  ]}
                >
                  <Text style={styles.topicEmoji}>{topic.emoji}</Text>
                  <Text style={[styles.topicName, { color: topic.color }]} numberOfLines={1}>
                    {topic.name}
                  </Text>
                </Pressable>
              </Animated.View>
            ))}
          </View>
        </Animated.View>

        {/* Care Actions */}
        <Animated.View
          entering={FadeIn.delay(320).duration(400)}
          style={styles.section}
        >
          <Text style={styles.sectionTitle}>Need help with…</Text>
          <View style={styles.chipsRow}>
            {CARE_ACTIONS.map((action, index) => (
              <Animated.View
                key={action.id}
                entering={FadeInRight.delay(380 + index * 80).duration(380)}
              >
                <Pressable
                  onPress={() => ask(action.prompt)}
                  style={({ pressed }) => [
                    styles.chip,
                    { backgroundColor: action.bgColor },
                    pressed && styles.pressed,
                  ]}
                >
                  <MaterialCommunityIcons
                    name={action.icon as any}
                    size={18}
                    color={action.color}
                  />
                  <Text style={[styles.chipText, { color: action.color }]}>
                    {action.label}
                  </Text>
                </Pressable>
              </Animated.View>
            ))}
          </View>
        </Animated.View>

        {/* Ask anything CTA */}
        <Animated.View
          entering={FadeInDown.delay(560).duration(420)}
          style={styles.section}
        >
          <Pressable
            onPress={() => router.push("/(tabs)/chatbot")}
            style={({ pressed }) => [pressed && styles.pressed]}
          >
            <View style={styles.ctaCard}>
              <View style={styles.ctaIcon}>
                <MaterialCommunityIcons name="chat-processing" size={24} color={Colors.ui.white} />
              </View>
              <View style={styles.ctaTextWrap}>
                <Text style={styles.ctaTitle}>{isEnglish ? "Not on the list? Just ask!" : "Wala sa list? Itanong mo!"}</Text>
                <Text style={styles.ctaSub}>Chat about any plant, any question.</Text>
              </View>
              <View style={styles.ctaArrow}>
                <MaterialCommunityIcons name="arrow-right" size={20} color={Colors.brand.dark} />
              </View>
            </View>
          </Pressable>
        </Animated.View>

        {/* Today's Tips */}
        <Animated.View
          entering={FadeIn.delay(680).duration(400)}
          style={styles.section}
        >
          <Text style={styles.sectionTitle}>Tips for the day</Text>
          {tips.map((tip, index) => (
            <Animated.View
              key={tip.id}
              entering={FadeInRight.delay(740 + index * 100).duration(400)}
              style={styles.tipCard}
            >
              <View style={[styles.tipIconBg, { backgroundColor: tip.bgColor }]}>
                <MaterialCommunityIcons
                  name={tip.icon as any}
                  size={26}
                  color={Colors.ui.tipIconColor}
                />
              </View>
              <View style={styles.tipContent}>
                <Text style={styles.tipTitle}>{tip[lang].title}</Text>
                <Text style={styles.tipDescription}>{tip[lang].description}</Text>
              </View>
            </Animated.View>
          ))}
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const CARD_SHADOW = {
  shadowColor: Colors.ui.shadowColor,
  shadowOffset: { width: 0, height: 6 },
  shadowOpacity: 0.07,
  shadowRadius: 14,
  elevation: 2,
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  contentContainer: { paddingBottom: 28 },
  pressed: { opacity: 0.85, transform: [{ scale: 0.98 }] },
  headerSection: {
    paddingHorizontal: 22,
    paddingTop: 24,
    paddingBottom: 32,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  brandTag: {
    fontSize: 12,
    fontWeight: "800",
    color: Colors.brand.accent,
    letterSpacing: 2,
    textTransform: "uppercase",
    marginBottom: 12,
  },
  greeting: {
    fontSize: 29,
    fontWeight: "800",
    color: Colors.ui.white,
    marginBottom: 6,
    letterSpacing: -0.3,
  },
  subGreeting: {
    fontSize: 15,
    fontWeight: "500",
    color: "rgba(255,255,255,0.85)",
  },
  section: { marginHorizontal: 18, marginTop: 26 },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  sectionTitle: { fontSize: 18, fontWeight: "800", color: Colors.ui.textPrimary, marginBottom: 16, letterSpacing: -0.2 },
  sectionHint: {
    fontSize: 12,
    fontWeight: "700",
    color: Colors.brand.accentDark,
    letterSpacing: 0.2,
    marginBottom: 16,
  },
  topicsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 14,
  },
  topicWrap: { width: "23.5%" },
  topicCard: {
    aspectRatio: 1,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
    gap: 5,
    borderWidth: 1,
    borderColor: "rgba(19, 36, 28, 0.05)",
    ...CARD_SHADOW,
  },
  topicEmoji: { fontSize: 28 },
  topicName: { fontSize: 11, fontWeight: "700", letterSpacing: 0.1 },
  chipsRow: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 15,
    paddingVertical: 11,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(19, 36, 28, 0.05)",
  },
  chipText: { fontSize: 14, fontWeight: "700" },
  ctaCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    padding: 18,
    borderRadius: 22,
    backgroundColor: Colors.brand.primary,
    shadowColor: Colors.brand.dark,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.28,
    shadowRadius: 16,
    elevation: 5,
  },
  ctaIcon: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.14)",
    justifyContent: "center",
    alignItems: "center",
  },
  ctaTextWrap: { flex: 1 },
  ctaTitle: { fontSize: 16, fontWeight: "800", color: Colors.ui.white, marginBottom: 3, letterSpacing: -0.2 },
  ctaSub: { fontSize: 13, fontWeight: "500", color: "rgba(255,255,255,0.7)" },
  ctaArrow: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.brand.accent,
    justifyContent: "center",
    alignItems: "center",
  },
  tipCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderRadius: 18,
    marginBottom: 12,
    backgroundColor: Colors.ui.cardBackground,
    borderWidth: 1,
    borderColor: Colors.ui.hairline,
    ...CARD_SHADOW,
  },
  tipIconBg: {
    width: 52,
    height: 52,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
    flexShrink: 0,
  },
  tipContent: { flex: 1 },
  tipTitle: { fontSize: 15, fontWeight: "700", color: Colors.ui.textPrimary, marginBottom: 3 },
  tipDescription: { fontSize: 13, lineHeight: 18, color: Colors.ui.textSecondary },
});
