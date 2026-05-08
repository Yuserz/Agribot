import { Colors } from "@/constants/theme";
import { useAuth } from "@/context/auth";
import { useBotpress } from "@/context/botpress";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeIn, FadeInDown, FadeInRight, ZoomIn } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { user } = useAuth();
  const { setPendingMessage } = useBotpress();
  const router = useRouter();
  const displayName =
    user?.user_metadata?.full_name || user?.email?.split("@")[0] || "guest";

  const quickActions = [
    {
      id: 1,
      label: "Planting",
      icon: "leaf",
      bgColor: Colors.ui.plantingBg,
      iconColor: Colors.ui.plantingIcon,
      message: "I need help with planting dragon fruit. What should I know?",
    },
    {
      id: 2,
      label: "Watering",
      icon: "water",
      bgColor: Colors.ui.wateringBg,
      iconColor: Colors.ui.wateringIcon,
      message: "Can you guide me on watering schedules for dragon fruit?",
    },
    {
      id: 3,
      label: "Pests",
      icon: "bug",
      bgColor: Colors.ui.pestsBg,
      iconColor: Colors.ui.pestsIcon,
      message: "How do I deal with pests and diseases in dragon fruit farming?",
    },
    {
      id: 4,
      label: "Pruning",
      icon: "scissors-cutting",
      bgColor: Colors.ui.pruningBg,
      iconColor: Colors.ui.pruningIcon,
      message: "What is the proper way to prune dragon fruit plants?",
    },
  ];

  const tips = [
    {
      id: 1,
      title: "Optimal Growing Season",
      description: "Spring is the best time to plant dragon fruit cuttings",
      icon: "white-balance-sunny",
      bgColor: Colors.ui.tipBgYellow,
      iconColor: Colors.ui.tipIconColor,
    },
    {
      id: 2,
      title: "Water Management",
      description: "Use drip irrigation to save water and prevent root rot",
      icon: "water-percent",
      bgColor: Colors.ui.tipBgBlue,
      iconColor: Colors.ui.tipIconColor,
    },
    {
      id: 3,
      title: "Sustainable Practice",
      description: "Add compost regularly to enrich soil naturally",
      icon: "leaf",
      bgColor: Colors.ui.tipBgGreen,
      iconColor: Colors.ui.tipIconColor,
    },
  ];

  const handleQuickAction = (message: string) => {
    setPendingMessage(message);
    router.push("/(tabs)/chatbot");
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Colors.ui.background }]} edges={["top", "left", "right"]}>
      <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>

        {/* Green Header */}
        <Animated.View entering={FadeIn.duration(450)}>
          <LinearGradient
            colors={["#25d366", Colors.agribot.primary, Colors.agribot.dark]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.headerSection}
          >
            <Text style={styles.greeting}>Hello, {displayName}! 👋</Text>
            <Text style={styles.subGreeting}>How can I help you today?</Text>
          </LinearGradient>
        </Animated.View>

        {/* Quick Actions Card */}
        <Animated.View entering={FadeInDown.delay(150).duration(450)} style={[styles.card, styles.quickActionsCard]}>
          <Text style={styles.cardTitle}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            {quickActions.map((action, index) => (
              <Animated.View
                key={action.id}
                entering={ZoomIn.delay(200 + index * 80).duration(350)}
                style={styles.actionItem}
              >
                <TouchableOpacity onPress={() => handleQuickAction(action.message)} style={styles.actionTouchable}>
                  <View style={[styles.actionIconBg, { backgroundColor: action.bgColor }]}>
                    <MaterialCommunityIcons name={action.icon as any} size={32} color={action.iconColor} />
                  </View>
                  <Text style={[styles.actionLabel, { color: Colors.ui.textPrimary }]}>{action.label}</Text>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </View>
        </Animated.View>

        {/* Today's Tips */}
        <Animated.View entering={FadeIn.delay(320).duration(400)} style={styles.section}>
          <Text style={[styles.sectionTitle, { color: Colors.ui.textPrimary }]}>Today&apos;s Tips</Text>
          {tips.map((tip, index) => (
            <Animated.View
              key={tip.id}
              entering={FadeInRight.delay(420 + index * 110).duration(400)}
              style={[styles.tipCard, { backgroundColor: Colors.ui.cardBackground }]}
            >
              <View style={[styles.tipIconBg, { backgroundColor: tip.bgColor }]}>
                <MaterialCommunityIcons name={tip.icon as any} size={28} color={tip.iconColor} />
              </View>
              <View style={styles.tipContent}>
                <Text style={[styles.tipTitle, { color: Colors.ui.textPrimary }]}>{tip.title}</Text>
                <Text style={[styles.tipDescription, { color: Colors.ui.textSecondary }]}>{tip.description}</Text>
              </View>
            </Animated.View>
          ))}
        </Animated.View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  contentContainer: { paddingBottom: 0 },
  headerSection: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 32,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  greeting: { fontSize: 32, fontWeight: "700", color: Colors.ui.white, marginBottom: 8 },
  subGreeting: { fontSize: 16, fontWeight: "500", color: "rgba(255, 255, 255, 0.9)" },
  card: {
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 0,
    padding: 20,
    backgroundColor: Colors.ui.cardBackground,
    borderRadius: 16,
    shadowColor: Colors.ui.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  quickActionsCard: { marginBottom: 24 },
  cardTitle: { fontSize: 18, fontWeight: "700", color: Colors.ui.textPrimary, marginBottom: 16 },
  actionsGrid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  actionItem: { width: "48%", marginBottom: 16 },
  actionTouchable: { alignItems: "center" },
  actionIconBg: {
    width: 64,
    height: 64,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  actionLabel: { fontSize: 14, fontWeight: "600", textAlign: "center" },
  section: { marginHorizontal: 16, marginBottom: 20, marginTop: 8 },
  sectionTitle: { fontSize: 18, fontWeight: "700", marginBottom: 12 },
  tipCard: {
    flexDirection: "row",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: Colors.ui.shadowColor,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  tipIconBg: {
    width: 56,
    height: 56,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    flexShrink: 0,
  },
  tipContent: { flex: 1 },
  tipTitle: { fontSize: 16, fontWeight: "600", marginBottom: 4 },
  tipDescription: { fontSize: 13, lineHeight: 18 },
});
