import { Colors } from "@/constants/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useMemo, useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

interface FAQCategory {
  category: string;
  items: FAQItem[];
}

const faqData: FAQItem[] = [
  // Getting Started
  {
    id: "1",
    category: "Getting Started",
    question: "What climate is best for dragon fruit?",
    answer:
      "Dragon fruit thrives in warm, tropical and subtropical climates. It prefers temperatures between 24-29°C (75-84°F) and needs protection from frost.",
  },
  {
    id: "2",
    category: "Getting Started",
    question: "How do I start growing dragon fruit?",
    answer:
      "Start by obtaining healthy cuttings or seeds from reputable sources. Plant in well-draining soil with plenty of organic matter. Provide support structures like trellises and ensure the location gets 6+ hours of sunlight daily.",
  },
  // Watering
  {
    id: "3",
    category: "Watering",
    question: "How often should I water dragon fruit?",
    answer:
      "Water dragon fruit when the top inch of soil feels dry, typically 2-3 times per week during growing season. Reduce frequency during winter. Ensure soil drains well to prevent waterlogging.",
  },
  {
    id: "4",
    category: "Watering",
    question: "What are signs of overwatering?",
    answer:
      "Signs of overwatering include yellow leaves, root rot, mold on soil, and soft stems. Reduce watering frequency and improve soil drainage if you notice these symptoms.",
  },
  // Fertilization
  {
    id: "5",
    category: "Fertilization",
    question: "What fertilizer should I use?",
    answer:
      "Use a balanced fertilizer (NPK ratio like 10-10-10) during growing season. Switch to a phosphorus-rich fertilizer during flowering. Apply fertilizer every 4-6 weeks, or use slow-release fertilizers.",
  },
  // Pest Control
  {
    id: "6",
    category: "Pest Control",
    question: "How do I control pests organically?",
    answer:
      "Use neem oil, insecticidal soaps, or companion planting. Remove affected parts manually if possible. Maintain good plant health and hygiene. Consult AgriBot for specific pest issues.",
  },
  {
    id: "7",
    category: "Pest Control",
    question: "What are common dragon fruit diseases?",
    answer:
      "Common diseases include anthracnose, leaf spot, and stem rot. Prevent by ensuring good air circulation, avoiding overhead watering, and maintaining proper hygiene.",
  },
];

export default function FAQScreen() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleExpanded = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const filteredAndGroupedData = useMemo(() => {
    let filtered = faqData;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = faqData.filter(
        (item) =>
          item.question.toLowerCase().includes(query) ||
          item.answer.toLowerCase().includes(query),
      );
    }

    // Group by category
    const grouped: { [key: string]: FAQItem[] } = {};
    filtered.forEach((item) => {
      if (!grouped[item.category]) {
        grouped[item.category] = [];
      }
      grouped[item.category].push(item);
    });

    return Object.entries(grouped).map(([category, items]) => ({
      category,
      items,
    }));
  }, [searchQuery]);

  const renderFAQItem = ({ item }: { item: FAQItem }) => {
    const isExpanded = expandedId === item.id;

    return (
      <View style={styles.faqItemContainer}>
        <Pressable
          onPress={() => toggleExpanded(item.id)}
          style={styles.faqHeader}
        >
          <View style={styles.faqHeaderContent}>
            <Text style={styles.question}>{item.question}</Text>
          </View>
          <MaterialCommunityIcons
            name={isExpanded ? "chevron-up" : "chevron-down"}
            size={20}
            color={Colors.ui.textSecondary}
          />
        </Pressable>
        {isExpanded && (
          <View style={styles.answerContainer}>
            <Text style={styles.answer}>{item.answer}</Text>
          </View>
        )}
      </View>
    );
  };

  const renderCategorySection = ({ item }: { item: FAQCategory }) => {
    return (
      <View key={item.category} style={styles.categorySection}>
        <Text style={styles.categoryTitle}>{item.category}</Text>
        <View style={styles.categoryContent}>
          {item.items.map((faqItem) => (
            <View key={faqItem.id}>{renderFAQItem({ item: faqItem })}</View>
          ))}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={styles.container}
      edges={["top", "left", "right"]}
    >
      <LinearGradient
        colors={["#25d366", Colors.agribot.primary, Colors.agribot.dark]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headerSection}
      >
        <Text style={styles.headerTitle}>Frequently Asked Questions</Text>
        <View style={styles.searchBar}>
          <MaterialCommunityIcons
            name="magnify"
            size={20}
            color={Colors.ui.textMuted}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search FAQs..."
            placeholderTextColor={Colors.ui.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </LinearGradient>

      <FlatList
        data={filteredAndGroupedData}
        renderItem={renderCategorySection}
        keyExtractor={(item) => item.category}
        contentContainerStyle={styles.listContent}
        scrollEnabled={true}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.ui.backgroundAlt,
  },
  headerSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: Colors.ui.white,
    marginBottom: 16,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.ui.white,
    borderRadius: 24,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: Colors.ui.textPrimary,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingBottom: 80,
  },
  categorySection: {
    marginBottom: 24,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.ui.textPrimary,
    marginBottom: 12,
  },
  categoryContent: {
    gap: 8,
  },
  faqItemContainer: {
    backgroundColor: Colors.ui.cardBackground,
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: Colors.ui.shadowColor,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  faqHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  faqHeaderContent: {
    flex: 1,
    marginRight: 12,
  },
  question: {
    flex: 1,
    fontSize: 15,
    fontWeight: "600",
    color: Colors.ui.textPrimary,
    lineHeight: 20,
  },
  answerContainer: {
    backgroundColor: "rgba(29, 184, 84, 0.08)",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "rgba(29, 184, 84, 0.15)",
  },
  answer: {
    fontSize: 14,
    color: Colors.ui.textSecondary,
    lineHeight: 22,
  },
});
