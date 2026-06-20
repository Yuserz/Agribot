import { BOT_NAME } from "@/constants/brand";
import { Colors } from "@/constants/theme";
import { ChatMessage, useBotpress } from "@/context/botpress";
import { useLanguage } from "@/context/language";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFocusEffect } from "expo-router";
import * as Speech from "expo-speech";
import Markdown from "react-native-markdown-display";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Animated, {
  Easing,
  FadeIn,
  FadeInLeft,
  FadeInRight,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

// Pulsing dots shown while bot is typing
function TypingDots() {
  const dot1 = useSharedValue(0.3);
  const dot2 = useSharedValue(0.3);
  const dot3 = useSharedValue(0.3);

  useEffect(() => {
    const pulse = (sv: typeof dot1, delay: number) => {
      sv.value = withDelay(
        delay,
        withRepeat(
          withSequence(
            withTiming(1, { duration: 350, easing: Easing.inOut(Easing.ease) }),
            withTiming(0.3, { duration: 350, easing: Easing.inOut(Easing.ease) }),
          ),
          -1,
          false,
        ),
      );
    };
    pulse(dot1, 0);
    pulse(dot2, 200);
    pulse(dot3, 400);
  }, [dot1, dot2, dot3]);

  const s1 = useAnimatedStyle(() => ({ opacity: dot1.value }));
  const s2 = useAnimatedStyle(() => ({ opacity: dot2.value }));
  const s3 = useAnimatedStyle(() => ({ opacity: dot3.value }));

  return (
    <View style={styles.typingDots}>
      <Animated.View style={[styles.dot, s1]} />
      <Animated.View style={[styles.dot, s2]} />
      <Animated.View style={[styles.dot, s3]} />
    </View>
  );
}

export default function ChatbotScreen() {
  const {
    messages,
    isLoading,
    isInitializing,
    sendMessage,
    pendingMessage,
    clearPendingMessage,
    startNewConversation,
  } = useBotpress();

  const { isEnglish } = useLanguage();
  const [inputText, setInputText] = useState("");
  const [ttsEnabled, setTtsEnabled] = useState(false);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const flatListRef = useRef<FlatList>(null);
  const lastAutoSpokenIdRef = useRef<string | null>(null);

  useFocusEffect(
    useCallback(() => {
      if (pendingMessage && !isInitializing && !isLoading) {
        const msg = pendingMessage;
        clearPendingMessage();
        sendMessage(msg);
      }
    }, [pendingMessage, isInitializing, isLoading, sendMessage, clearPendingMessage]),
  );

  const scrollToBottom = useCallback(() => {
    setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
  }, []);

  const speakText = useCallback((id: string, text: string) => {
    const plain = text
      .replace(/#{1,6}\s+/g, "")
      .replace(/\*\*(.*?)\*\*/g, "$1")
      .replace(/\*(.*?)\*/g, "$1")
      .replace(/`{1,3}([\s\S]*?)`{1,3}/g, "$1")
      .replace(/^[-*]\s+/gm, "")
      .replace(/^\d+\.\s+/gm, "")
      .replace(/\n{2,}/g, ". ")
      .replace(/\n/g, " ")
      .trim();
    Speech.stop();
    setSpeakingId(id);
    Speech.speak(plain, {
      language: "en-US",
      rate: 0.9,
      onDone: () => setSpeakingId(null),
      onStopped: () => setSpeakingId(null),
      onError: () => setSpeakingId(null),
    });
  }, []);

  useEffect(() => {
    if (!ttsEnabled || messages.length === 0) return;
    const last = messages[messages.length - 1];
    if (last.sender !== "bot" || !last.text) return;
    if (last.id === lastAutoSpokenIdRef.current) return;
    lastAutoSpokenIdRef.current = last.id;
    speakText(last.id, last.text);
  }, [messages, ttsEnabled, speakText]);

  const handleSend = async (text: string) => {
    if (!text.trim() || isLoading || isInitializing) return;
    setInputText("");
    scrollToBottom();
    await sendMessage(text.trim());
    scrollToBottom();
  };

  const handleSendMessage = () => handleSend(inputText);

  const handleSpeakMessage = (id: string, text: string) => {
    if (speakingId === id) { Speech.stop(); setSpeakingId(null); }
    else { speakText(id, text); }
  };

  const toggleTTS = () => {
    if (ttsEnabled) { Speech.stop(); setSpeakingId(null); }
    setTtsEnabled((v) => !v);
  };

  const handleNewConversation = () => {
    Alert.alert(
      "New Conversation",
      "Start a fresh chat? The current conversation will be cleared.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Start Fresh",
          style: "destructive",
          onPress: () => {
            Speech.stop();
            setSpeakingId(null);
            setInputText("");
            lastAutoSpokenIdRef.current = null;
            startNewConversation();
          },
        },
      ],
    );
  };

  const formatTime = (date: Date) =>
    date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });

  const renderMessage = ({ item }: { item: ChatMessage }) => {
    if (item.sender === "bot") {
      const isSpeaking = speakingId === item.id;
      return (
        <Animated.View entering={FadeInLeft.duration(300)} style={styles.botMessageContainer}>
          <View style={styles.botIconContainer}>
            <MaterialCommunityIcons name="robot-outline" size={24} color={Colors.ui.white} />
          </View>
          <View style={styles.botBubbleWrapper}>
            <View style={[styles.messageBubble, styles.botMessage]}>
              <Markdown style={markdownStyles}>{item.text}</Markdown>
              <View style={styles.messageFooter}>
                <Text style={styles.timestamp}>{formatTime(item.timestamp)}</Text>
                <Pressable onPress={() => handleSpeakMessage(item.id, item.text)} style={styles.speakButton} hitSlop={8}>
                  <MaterialCommunityIcons
                    name={isSpeaking ? "volume-high" : "volume-medium"}
                    size={15}
                    color={isSpeaking ? Colors.agribot.primary : Colors.ui.textMuted}
                  />
                </Pressable>
              </View>
            </View>
            {item.choices && item.choices.length > 0 && (
              <View style={styles.choicesContainer}>
                {item.choices.map((choice) => (
                  <Pressable
                    key={choice.value}
                    style={({ pressed }) => [styles.choiceButton, pressed && styles.choiceButtonPressed]}
                    onPress={() => handleSend(choice.value)}
                    disabled={isLoading}
                  >
                    <Text style={styles.choiceButtonText}>{choice.label}</Text>
                  </Pressable>
                ))}
              </View>
            )}
          </View>
        </Animated.View>
      );
    }

    return (
      <Animated.View entering={FadeInRight.duration(250)} style={styles.userMessageContainer}>
        <View style={[styles.messageBubble, styles.userMessage]}>
          <Text style={styles.userMessageText}>{item.text}</Text>
          <Text style={styles.userTimestamp}>{formatTime(item.timestamp)}</Text>
        </View>
      </Animated.View>
    );
  };

  if (isInitializing) {
    return (
      <SafeAreaView style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color={Colors.brand.primary} />
        <Text style={styles.connectingText}>{isEnglish ? "Connecting... 🌱" : "Sandali lang, bes... 🌱"}</Text>
      </SafeAreaView>
    );
  }

  const showSend = inputText.trim().length > 0;

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>

      {/* Header */}
      <Animated.View entering={FadeIn.duration(350)} style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.headerLogo}>
            <Text style={styles.headerLogoEmoji}>🌱</Text>
          </View>
          <Text style={styles.headerTitle}>{BOT_NAME}</Text>
        </View>
        <View style={styles.headerRight}>
          <Pressable onPress={toggleTTS} style={styles.headerButton} hitSlop={8}>
            <MaterialCommunityIcons
              name={ttsEnabled ? "volume-high" : "volume-off"}
              size={22}
              color={ttsEnabled ? Colors.agribot.primary : Colors.ui.textSecondary}
            />
          </Pressable>
          <Pressable onPress={handleNewConversation} style={styles.headerButton} hitSlop={8}>
            <MaterialCommunityIcons name="chat-plus-outline" size={22} color={Colors.ui.textSecondary} />
          </Pressable>
        </View>
      </Animated.View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.messagesList}
          onContentSizeChange={scrollToBottom}
        />

        {isLoading && (
          <View style={styles.loadingContainer}>
            <View style={styles.botIconContainer}>
              <MaterialCommunityIcons name="robot-outline" size={20} color={Colors.ui.white} />
            </View>
            <TypingDots />
          </View>
        )}

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder={isEnglish ? "Ask me anything..." : "Itanong mo lang, bes..."}
            placeholderTextColor={Colors.ui.textMuted}
            value={inputText}
            onChangeText={setInputText}
            multiline
            maxLength={500}
            editable={!isLoading && !isInitializing}
          />
          {showSend && (
            <Pressable
              style={[styles.sendButton, isLoading && styles.sendButtonDisabled]}
              onPress={handleSendMessage}
              disabled={isLoading}
            >
              <MaterialCommunityIcons name="send" size={22} color={Colors.ui.white} />
            </Pressable>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const markdownStyles = {
  body: { margin: 0, padding: 0 },
  paragraph: { fontSize: 14, lineHeight: 21, color: Colors.ui.textPrimary, marginTop: 0, marginBottom: 4 },
  heading1: { fontSize: 17, fontWeight: "700" as const, color: Colors.ui.textPrimary, marginBottom: 6, marginTop: 4 },
  heading2: { fontSize: 15, fontWeight: "700" as const, color: Colors.ui.textPrimary, marginBottom: 4, marginTop: 4 },
  heading3: { fontSize: 14, fontWeight: "700" as const, color: Colors.ui.textPrimary, marginBottom: 2, marginTop: 4 },
  strong: { fontWeight: "700" as const, color: Colors.ui.textPrimary },
  em: { fontStyle: "italic" as const },
  bullet_list: { marginBottom: 4 },
  ordered_list: { marginBottom: 4 },
  list_item: { marginBottom: 2 },
  bullet_list_icon: { color: Colors.agribot.primary, marginTop: 4 },
  ordered_list_icon: { color: Colors.agribot.primary },
  code_inline: {
    backgroundColor: "#f0f0f0",
    borderRadius: 4,
    paddingHorizontal: 4,
    fontSize: 13,
    fontFamily: "monospace",
    color: Colors.agribot.dark,
  },
  fence: {
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    padding: 10,
    marginVertical: 6,
    fontSize: 13,
    fontFamily: "monospace",
    color: Colors.ui.textPrimary,
  },
  blockquote: {
    borderLeftWidth: 3,
    borderLeftColor: Colors.agribot.primary,
    paddingLeft: 10,
    marginLeft: 0,
    marginVertical: 4,
    opacity: 0.85,
  },
  hr: { backgroundColor: "#e0e0e0", height: 1, marginVertical: 8 },
  link: { color: Colors.agribot.primary },
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.ui.backgroundAlt },
  centerContent: { justifyContent: "center", alignItems: "center", gap: 16 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.ui.background,
    borderBottomWidth: 1,
    borderBottomColor: Colors.ui.hairline,
  },
  headerLeft: { flexDirection: "row", alignItems: "center", gap: 10 },
  headerLogo: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: Colors.brand.tintSoft,
    justifyContent: "center",
    alignItems: "center",
  },
  headerLogoEmoji: { fontSize: 20 },
  headerTitle: { fontSize: 18, fontWeight: "800", color: Colors.ui.textPrimary },
  headerRight: { flexDirection: "row", alignItems: "center", gap: 4 },
  headerButton: { padding: 8 },
  keyboardAvoidingView: { flex: 1, flexDirection: "column", justifyContent: "space-between" },
  messagesList: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingTop: 12,
    paddingBottom: 12,
    flexGrow: 1,
    justifyContent: "flex-end",
  },
  botMessageContainer: { flexDirection: "row", alignItems: "flex-start", marginBottom: 16, gap: 12 },
  botBubbleWrapper: { flex: 1 },
  botIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.agribot.primary,
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
    marginTop: 2,
  },
  messageBubble: { maxWidth: "100%", paddingHorizontal: 16, paddingVertical: 12, borderRadius: 16 },
  botMessage: {
    backgroundColor: Colors.ui.cardBackground,
    shadowColor: Colors.ui.shadowColor,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  messageFooter: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 4 },
  speakButton: { padding: 2 },
  userMessageContainer: { flexDirection: "row", justifyContent: "flex-end", marginBottom: 16 },
  userMessage: { backgroundColor: Colors.agribot.primary, maxWidth: "80%" },
  userMessageText: { fontSize: 14, lineHeight: 20, color: Colors.ui.white },
  timestamp: { fontSize: 11, color: Colors.ui.textMuted },
  userTimestamp: { fontSize: 11, color: "rgba(255,255,255,0.65)", marginTop: 4, alignSelf: "flex-end" },
  choicesContainer: { marginTop: 8, gap: 8 },
  choiceButton: {
    borderWidth: 1.5,
    borderColor: Colors.agribot.primary,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: "flex-start",
  },
  choiceButtonPressed: { backgroundColor: Colors.brand.tintSoft },
  choiceButtonText: { fontSize: 14, color: Colors.agribot.primary, fontWeight: "500" },
  loadingContainer: {
    paddingHorizontal: 16,
    paddingBottom: 12,
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 12,
  },
  typingDots: { flexDirection: "row", gap: 4, alignItems: "center" },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.agribot.primary },
  inputContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.ui.background,
    borderTopWidth: 1,
    borderTopColor: Colors.ui.hairline,
    gap: 8,
    alignItems: "flex-end",
  },
  input: {
    flex: 1,
    backgroundColor: Colors.ui.backgroundAlt,
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    color: Colors.ui.textPrimary,
    maxHeight: 100,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.agribot.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  sendButtonDisabled: { opacity: 0.5 },
  connectingText: { fontSize: 14, color: Colors.ui.textSecondary, marginTop: 8 },
});
