import { Colors } from "@/constants/theme";
import { useLanguage } from "@/context/language";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useMemo, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeOut,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

interface FAQItem {
  id: string;
  category: string;
  question: string;
  questionEn: string;
  answer: string;
}

interface FAQCategory {
  category: string;
  items: FAQItem[];
}

const faqData: FAQItem[] = [
  {
    id: "1",
    category: "Getting Started",
    question: "Saan ako magsisimula bilang baguhan?",
    questionEn: "Where do I start as a beginner?",
    answer:
      "Start with one easy, forgiving plant like kangkong, herbs, or succulents. Use a pot with drainage holes, good potting mix, and place it where it gets the right amount of light. Master one plant before adding more.",
  },
  {
    id: "2",
    category: "Getting Started",
    question: "Seeds ba o seedlings ang mas madali?",
    questionEn: "Are seeds or seedlings easier to use?",
    answer:
      "Seedlings (already-sprouted plants) are easier and faster for beginners. Seeds are cheaper and more rewarding but need more patience and care. Many gulay like kamatis and sili are also easy to grow from kitchen scraps.",
  },
  {
    id: "3",
    category: "Watering",
    question: "Gaano kadalas dapat magdilig?",
    questionEn: "How often should I water my plants?",
    answer:
      "Check the soil first — stick a finger about 2-3 cm deep. If it's dry, water; if it's still moist, wait. Most plants prefer a deep soak when dry over a little water every day.",
  },
  {
    id: "4",
    category: "Watering",
    question: "Ano ang signs ng sobrang tubig?",
    questionEn: "What are the signs of overwatering?",
    answer:
      "Yellowing leaves, mushy stems, mold on the soil, and a sour smell usually mean overwatering. Let the soil dry out, improve drainage, and make sure the pot isn't sitting in standing water.",
  },
  {
    id: "5",
    category: "Sunlight & Soil",
    question: "Magkano dapat ang sikat ng araw?",
    questionEn: "How much sunlight do my plants need?",
    answer:
      "Most gulay and fruiting plants want 6+ hours of direct sun. Leafy greens and many indoor plants do fine with bright, indirect light. Observe your space for a day to find the sunniest spots.",
  },
  {
    id: "6",
    category: "Pest Control",
    question: "Paano puksain ang peste nang natural?",
    questionEn: "How do I get rid of pests naturally?",
    answer:
      "Try neem oil, a mild soap-and-water spray, or hand-picking pests off leaves. Keep plants healthy and spaced for airflow, and remove affected leaves early. Ask the chatbot for the specific pest you're seeing.",
  },
  {
    id: "7",
    category: "Pest Control",
    question: "Bakit naninilaw ang dahon?",
    questionEn: "Why are my leaves turning yellow?",
    answer:
      "Yellow leaves can mean overwatering, poor drainage, too little light, or nutrient deficiency. Check watering and light first — those are the most common causes. Describe it to the chatbot for a tailored fix.",
  },
];

function FAQItemRow({
  item,
  isExpanded,
  isEnglish,
  onToggle,
}: {
  item: FAQItem;
  isExpanded: boolean;
  isEnglish: boolean;
  onToggle: () => void;
}) {
  const rotation = useSharedValue(isExpanded ? 1 : 0);

  useEffect(() => {
    rotation.value = withTiming(isExpanded ? 1 : 0, { duration: 250 });
  }, [isExpanded, rotation]);

  const chevronStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value * 180}deg` }],
  }));

  return (
    <View style={styles.faqItemContainer}>
      <Pressable onPress={onToggle} style={styles.faqHeader}>
        <View style={styles.faqHeaderContent}>
          <Text style={styles.question}>{isEnglish ? item.questionEn : item.question}</Text>
        </View>
        <Animated.View style={chevronStyle}>
          <MaterialCommunityIcons name="chevron-down" size={20} color={Colors.ui.textSecondary} />
        </Animated.View>
      </Pressable>

      {isExpanded && (
        <Animated.View
          entering={FadeInDown.duration(220)}
          exiting={FadeOut.duration(150)}
          style={styles.answerContainer}
        >
          <Text style={styles.answer}>{item.answer}</Text>
        </Animated.View>
      )}
    </View>
  );
}

export default function FAQScreen() {
  const { isEnglish } = useLanguage();
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
          item.questionEn.toLowerCase().includes(query) ||
          item.answer.toLowerCase().includes(query),
      );
    }
    const grouped: { [key: string]: FAQItem[] } = {};
    filtered.forEach((item) => {
      if (!grouped[item.category]) grouped[item.category] = [];
      grouped[item.category].push(item);
    });
    return Object.entries(grouped).map(([category, items]) => ({ category, items }));
  }, [searchQuery]);

  const renderCategorySection = ({ item, index }: { item: FAQCategory; index: number }) => (
    <Animated.View
      key={item.category}
      entering={FadeInDown.delay(index * 80).duration(400)}
      style={styles.categorySection}
    >
      <Text style={styles.categoryTitle}>{item.category}</Text>
      <View style={styles.categoryContent}>
        {item.items.map((faqItem) => (
          <FAQItemRow
            key={faqItem.id}
            item={faqItem}
            isExpanded={expandedId === faqItem.id}
            isEnglish={isEnglish}
            onToggle={() => toggleExpanded(faqItem.id)}
          />
        ))}
      </View>
    </Animated.View>
  );

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <Animated.View entering={FadeIn.duration(400)}>
        <LinearGradient
          colors={Colors.agribot.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.headerSection}
        >
          <Text style={styles.headerTitle}>
            {isEnglish ? "Frequently Asked Questions 🌿" : "Mga Madalas Itanong 🌿"}
          </Text>
          <View style={styles.searchBar}>
            <MaterialCommunityIcons
              name="magnify"
              size={20}
              color={Colors.ui.textMuted}
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.searchInput}
              placeholder={isEnglish ? "Search questions..." : "Maghanap ng tanong..."}
              placeholderTextColor={Colors.ui.textMuted}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </LinearGradient>
      </Animated.View>

      <FlatList
        data={filteredAndGroupedData}
        renderItem={renderCategorySection}
        keyExtractor={(item) => item.category}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.ui.backgroundAlt },
  headerSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  headerTitle: { fontSize: 28, fontWeight: "700", color: Colors.ui.white, marginBottom: 16 },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.ui.white,
    borderRadius: 24,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, fontSize: 16, color: Colors.ui.textPrimary },
  listContent: { paddingHorizontal: 16, paddingVertical: 16, paddingBottom: 80 },
  categorySection: { marginBottom: 24 },
  categoryTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.ui.textPrimary,
    marginBottom: 12,
  },
  categoryContent: { gap: 8 },
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
  faqHeaderContent: { flex: 1, marginRight: 12 },
  question: { flex: 1, fontSize: 15, fontWeight: "600", color: Colors.ui.textPrimary, lineHeight: 20 },
  answerContainer: {
    backgroundColor: Colors.brand.tintSoft,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.brand.tintSoftBorder,
  },
  answer: { fontSize: 14, color: Colors.ui.textSecondary, lineHeight: 22 },
});
