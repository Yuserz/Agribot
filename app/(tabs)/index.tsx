import { Colors } from "@/constants/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  const quickActions = [
    {
      id: 1,
      label: "Planting",
      icon: "leaf",
      bgColor: Colors.ui.plantingBg,
      iconColor: Colors.ui.plantingIcon,
    },
    {
      id: 2,
      label: "Watering",
      icon: "water",
      bgColor: Colors.ui.wateringBg,
      iconColor: Colors.ui.wateringIcon,
    },
    {
      id: 3,
      label: "Pests",
      icon: "bug",
      bgColor: Colors.ui.pestsBg,
      iconColor: Colors.ui.pestsIcon,
    },
    {
      id: 4,
      label: "Pruning",
      icon: "scissors-cutting",
      bgColor: Colors.ui.pruningBg,
      iconColor: Colors.ui.pruningIcon,
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

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: Colors.ui.background }]}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* Green Header Section */}
      <View style={styles.headerSection}>
        <Text style={styles.greeting}>Hello, guest! 👋</Text>
        <Text style={styles.subGreeting}>How can I help you today?</Text>
      </View>

      {/* Quick Actions Card */}
      <View style={[styles.card, styles.quickActionsCard]}>
        <Text style={styles.cardTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          {quickActions.map((action) => (
            <TouchableOpacity key={action.id} style={styles.actionItem}>
              <View
                style={[
                  styles.actionIconBg,
                  { backgroundColor: action.bgColor },
                ]}
              >
                <MaterialCommunityIcons
                  name={action.icon as any}
                  size={32}
                  color={action.iconColor}
                />
              </View>
              <Text
                style={[styles.actionLabel, { color: Colors.ui.textPrimary }]}
              >
                {action.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Today's Tips Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: Colors.ui.textPrimary }]}>
          Today&apos;s Tips
        </Text>
        {tips.map((tip) => (
          <View
            key={tip.id}
            style={[
              styles.tipCard,
              { backgroundColor: Colors.ui.cardBackground },
            ]}
          >
            <View style={[styles.tipIconBg, { backgroundColor: tip.bgColor }]}>
              <MaterialCommunityIcons
                name={tip.icon as any}
                size={28}
                color={tip.iconColor}
              />
            </View>
            <View style={styles.tipContent}>
              <Text style={[styles.tipTitle, { color: Colors.ui.textPrimary }]}>
                {tip.title}
              </Text>
              <Text
                style={[
                  styles.tipDescription,
                  { color: Colors.ui.textSecondary },
                ]}
              >
                {tip.description}
              </Text>
            </View>
          </View>
        ))}
      </View>

      {/* Your Progress Section */}
      <View style={styles.progressSection}>
        <View style={styles.progressHeader}>
          <MaterialCommunityIcons
            name="trending-up"
            size={24}
            color={Colors.ui.white}
          />
          <Text style={styles.progressTitle}>Your Progress</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 20,
  },
  headerSection: {
    backgroundColor: Colors.agribot.primary,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 32,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  greeting: {
    fontSize: 32,
    fontWeight: "700",
    color: Colors.ui.white,
    marginBottom: 8,
  },
  subGreeting: {
    fontSize: 16,
    fontWeight: "500",
    color: "rgba(255, 255, 255, 0.9)",
  },
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
  quickActionsCard: {
    marginBottom: 24,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.ui.textPrimary,
    marginBottom: 16,
  },
  actionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  actionItem: {
    width: "48%",
    alignItems: "center",
    marginBottom: 16,
  },
  actionIconBg: {
    width: 64,
    height: 64,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  actionLabel: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
  section: {
    marginHorizontal: 16,
    marginBottom: 20,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
  },
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
  tipContent: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  tipDescription: {
    fontSize: 13,
    lineHeight: 18,
  },
  progressSection: {
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 24,
    backgroundColor: Colors.agribot.primary,
    borderRadius: 16,
    padding: 20,
    paddingVertical: 40,
  },
  progressHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.ui.white,
  },
});
