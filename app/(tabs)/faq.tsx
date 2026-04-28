import { Colors } from "@/constants/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    id: "1",
    question: "What is the best season to plant dragon fruit?",
    answer:
      "Spring is the optimal season for planting dragon fruit cuttings. The warm weather promotes root development and faster growth.",
  },
  {
    id: "2",
    question: "How often should I water my dragon fruit plants?",
    answer:
      "Dragon fruit requires regular watering during growing season. Water when the top inch of soil feels dry, typically 2-3 times per week.",
  },
  {
    id: "3",
    question: "What are common pests that affect dragon fruit?",
    answer:
      "Common pests include mealybugs, scales, and spider mites. Use organic pest management methods or consult with AgriBot for solutions.",
  },
  {
    id: "4",
    question: "How long before I can harvest dragon fruit?",
    answer:
      "Dragon fruit typically starts producing 1-2 years after planting. The fruits mature 30-40 days after flowering.",
  },
];

export default function FAQScreen() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpanded = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const renderFAQItem = ({ item }: { item: FAQItem }) => {
    const isExpanded = expandedId === item.id;

    return (
      <View style={styles.faqItemContainer}>
        <Pressable
          onPress={() => toggleExpanded(item.id)}
          style={styles.faqHeader}
        >
          <View style={styles.faqHeaderContent}>
            <MaterialCommunityIcons
              name="help-circle-outline"
              size={24}
              color={Colors.agribot.primary}
              style={styles.questionIcon}
            />
            <Text style={styles.question}>{item.question}</Text>
          </View>
          <MaterialCommunityIcons
            name={isExpanded ? "chevron-up" : "chevron-down"}
            size={24}
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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Frequently Asked Questions</Text>
        <Text style={styles.headerSubtitle}>
          Find answers to common questions about dragon fruit farming
        </Text>
      </View>
      <FlatList
        data={faqData}
        renderItem={renderFAQItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.ui.background,
  },
  header: {
    backgroundColor: Colors.agribot.primary,
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: Colors.ui.white,
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.9)",
  },
  listContent: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  faqItemContainer: {
    marginBottom: 12,
    backgroundColor: Colors.ui.cardBackground,
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: Colors.ui.shadowColor,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 1,
  },
  faqHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  faqHeaderContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  questionIcon: {
    marginTop: 2,
    flexShrink: 0,
  },
  question: {
    flex: 1,
    fontSize: 15,
    fontWeight: "600",
    color: Colors.ui.textPrimary,
    lineHeight: 20,
  },
  answerContainer: {
    backgroundColor: "rgba(29, 184, 84, 0.05)",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: "rgba(29, 184, 84, 0.1)",
  },
  answer: {
    fontSize: 14,
    color: Colors.ui.textSecondary,
    lineHeight: 22,
  },
});
