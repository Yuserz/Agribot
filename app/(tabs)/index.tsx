import {
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <ScrollView
      style={[
        styles.container,
        { backgroundColor: isDark ? "#1a1a1a" : "#ffffff" },
      ]}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.header}>
        <Text
          style={[styles.pageTitle, { color: isDark ? "#ffffff" : "#1a1a1a" }]}
        >
          Dragon Fruit Farming
        </Text>
        <Text
          style={[
            styles.pageSubtitle,
            { color: isDark ? "#cccccc" : "#666666" },
          ]}
        >
          Sustainable Agricultural Practices
        </Text>
      </View>

      <View style={styles.section}>
        <Text
          style={[
            styles.sectionTitle,
            { color: isDark ? "#4CAF50" : "#2e7d32" },
          ]}
        >
          Why Dragon Fruit Farming?
        </Text>
        <Text
          style={[
            styles.sectionText,
            { color: isDark ? "#cccccc" : "#555555" },
          ]}
        >
          Dragon fruit (Pitaya) is a highly profitable crop with growing global
          demand. It thrives in warm climates and requires relatively low water
          compared to many other fruits, making it ideal for sustainable
          agriculture.
        </Text>
      </View>

      <View style={styles.section}>
        <Text
          style={[
            styles.sectionTitle,
            { color: isDark ? "#4CAF50" : "#2e7d32" },
          ]}
        >
          Key Benefits of AgriBot
        </Text>
        <View style={styles.listContainer}>
          <BulletPoint
            text="Real-time pest and disease identification"
            isDark={isDark}
          />
          <BulletPoint
            text="Optimal irrigation scheduling and soil management"
            isDark={isDark}
          />
          <BulletPoint
            text="Sustainable fertilization recommendations"
            isDark={isDark}
          />
          <BulletPoint
            text="Climate-adaptive farming strategies"
            isDark={isDark}
          />
          <BulletPoint
            text="Market price insights and harvesting tips"
            isDark={isDark}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text
          style={[
            styles.sectionTitle,
            { color: isDark ? "#4CAF50" : "#2e7d32" },
          ]}
        >
          Sustainable Practices
        </Text>
        <Text
          style={[
            styles.sectionText,
            { color: isDark ? "#cccccc" : "#555555" },
          ]}
        >
          AgriBot guides you through implementing sustainable practices such as:
        </Text>
        <View style={styles.listContainer}>
          <BulletPoint
            text="Organic pest management techniques"
            isDark={isDark}
          />
          <BulletPoint text="Water conservation methods" isDark={isDark} />
          <BulletPoint
            text="Soil health improvement strategies"
            isDark={isDark}
          />
          <BulletPoint
            text="Biodiversity promotion in your farm"
            isDark={isDark}
          />
        </View>
      </View>

      <View style={[styles.section, styles.lastSection]}>
        <Text
          style={[
            styles.sectionTitle,
            { color: isDark ? "#4CAF50" : "#2e7d32" },
          ]}
        >
          How to Use AgriBot
        </Text>
        <Text
          style={[
            styles.sectionText,
            { color: isDark ? "#cccccc" : "#555555" },
          ]}
        >
          1. Start a conversation with our AI chatbot in the Chatbot tab{"\n"}
          2. Ask questions about dragon fruit farming challenges{"\n"}
          3. Receive personalized recommendations based on your farm conditions
          {"\n"}
          4. Implement sustainable practices for better yields and environmental
          health
        </Text>
      </View>
    </ScrollView>
  );
}

function BulletPoint({ text, isDark }: { text: string; isDark: boolean }) {
  return (
    <View style={styles.bulletPoint}>
      <Text style={[styles.bullet, { color: isDark ? "#4CAF50" : "#2e7d32" }]}>
        •
      </Text>
      <Text
        style={[styles.bulletText, { color: isDark ? "#cccccc" : "#555555" }]}
      >
        {text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 32,
  },
  pageTitle: {
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 8,
  },
  pageSubtitle: {
    fontSize: 16,
    fontWeight: "500",
  },
  section: {
    marginBottom: 28,
  },
  lastSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 12,
  },
  sectionText: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 12,
  },
  listContainer: {
    gap: 8,
  },
  bulletPoint: {
    flexDirection: "row",
    gap: 10,
    paddingLeft: 8,
  },
  bullet: {
    fontSize: 16,
    fontWeight: "bold",
  },
  bulletText: {
    fontSize: 14,
    lineHeight: 22,
    flex: 1,
  },
});
