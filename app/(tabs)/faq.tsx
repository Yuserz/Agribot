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
    question: "Paano pa-ugatin ang dragon fruit cutting?",
    questionEn: "How do I root a dragon fruit cutting?",
    answer:
      "Cut a healthy 30-50 cm stem segment and let the cut end dry and callus in the shade for 5-7 days. Plant it about 5 cm deep in well-draining soil (garden soil mixed with sand or compost), water lightly, and keep it in bright shade. Roots usually form in 3-4 weeks — don't overwater while waiting.",
  },
  {
    id: "2",
    category: "Getting Started",
    question: "Bakit hindi namumunga ang dragon fruit ko?",
    questionEn: "Why isn't my dragon fruit plant fruiting?",
    answer:
      "Most plants fruit only after 12-18 months and once the stems reach the top of the post and hang down. Too little sun, too much nitrogen fertilizer, or no pruning can also delay flowering. Give it full sun, switch to a fertilizer higher in phosphorus and potassium, and let mature stems cascade over the trellis.",
  },
  {
    id: "3",
    category: "Pollination",
    question: "Kailangan bang i-hand-pollinate ang bulaklak?",
    questionEn: "Do I need to hand-pollinate the flowers?",
    answer:
      "Dragon fruit flowers open only for one night. Some varieties self-pollinate, but many (especially red-fleshed ones) need help. Between about 8 PM and early morning, use a soft brush to move pollen from the anthers to the stigma — or cross-pollinate between different plants for better fruit set.",
  },
  {
    id: "4",
    category: "Plant Health",
    question: "Bakit naninilaw ang stems ng dragon fruit?",
    questionEn: "Why are my dragon fruit stems turning yellow?",
    answer:
      "Yellow stems usually mean too much water or poor drainage, but sunburn and nutrient deficiency can cause it too. Let the soil dry between waterings, make sure the base isn't sitting in water, and give young plants some afternoon shade during the hottest months. Soft, mushy yellow patches can be stem rot — cut those off.",
  },
  {
    id: "5",
    category: "Watering",
    question: "Gaano kadalas diligan ang dragon fruit?",
    questionEn: "How often should I water a dragon fruit plant?",
    answer:
      "It's a climbing cactus, so it hates soggy roots. Water deeply when the top few cm of soil are dry — about once or twice a week in dry season, much less during rainy season. Water a bit more while it's flowering and fruiting, and always make sure excess water drains away.",
  },
  {
    id: "6",
    category: "Pest Control",
    question: "Paano puksain ang peste nang natural?",
    questionEn: "How do I control dragon fruit pests naturally?",
    answer:
      "Common pests are mealybugs, scale insects, ants, and snails or slugs. Spray neem oil or mild soapy water on affected stems, wipe off mealybugs with alcohol on cotton, and hand-pick snails at night. Keep the base weeded and airy, and cut off any rotting stems early. Ask the chatbot about the specific pest you see.",
  },
  {
    id: "7",
    category: "Harvest",
    question: "Kailan dapat anihin ang dragon fruit?",
    questionEn: "When should I harvest dragon fruit?",
    answer:
      "Harvest about 30-35 days after the flower blooms. The skin turns fully bright red or pink, the 'wings' or scales start to dry at the tips, and the fruit gives slightly when pressed. Twist it gently or cut it from the stem — don't wait too long or it may crack.",
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
          colors={Colors.brand.gradient}
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
