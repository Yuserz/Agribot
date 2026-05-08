import { Colors } from "@/constants/theme";
import { ChatMessage, useBotpress } from "@/context/botpress";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useRef } from "react";
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ChatbotScreen() {
  const {
    messages,
    isLoading,
    isInitializing,
    sendMessage,
    pendingMessage,
    clearPendingMessage,
  } = useBotpress();

  const [inputText, setInputText] = React.useState("");
  const flatListRef = useRef<FlatList>(null);

  // Auto-send pending message set by quick actions
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

  const handleSend = async (text: string) => {
    if (!text.trim() || isLoading || isInitializing) return;
    setInputText("");
    scrollToBottom();
    await sendMessage(text.trim());
    scrollToBottom();
  };

  const handleSendMessage = () => handleSend(inputText);
  const handleChoiceSelect = (value: string) => handleSend(value);

  const formatTime = (date: Date) =>
    date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

  const renderMessage = ({ item }: { item: ChatMessage }) => {
    if (item.sender === "bot") {
      return (
        <View style={styles.botMessageContainer}>
          <View style={styles.botIconContainer}>
            <MaterialCommunityIcons
              name="robot-outline"
              size={24}
              color={Colors.ui.white}
            />
          </View>
          <View style={styles.botBubbleWrapper}>
            <View style={[styles.messageBubble, styles.botMessage]}>
              <Text style={styles.messageText}>{item.text}</Text>
              <Text style={styles.timestamp}>{formatTime(item.timestamp)}</Text>
            </View>
            {item.choices && item.choices.length > 0 && (
              <View style={styles.choicesContainer}>
                {item.choices.map((choice) => (
                  <Pressable
                    key={choice.value}
                    style={({ pressed }) => [
                      styles.choiceButton,
                      pressed && styles.choiceButtonPressed,
                    ]}
                    onPress={() => handleChoiceSelect(choice.value)}
                    disabled={isLoading}
                  >
                    <Text style={styles.choiceButtonText}>{choice.label}</Text>
                  </Pressable>
                ))}
              </View>
            )}
          </View>
        </View>
      );
    }

    return (
      <View style={styles.userMessageContainer}>
        <View style={[styles.messageBubble, styles.userMessage]}>
          <Text style={styles.userMessageText}>{item.text}</Text>
        </View>
      </View>
    );
  };

  if (isInitializing) {
    return (
      <SafeAreaView style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color={Colors.agribot.primary} />
        <Text style={styles.connectingText}>Connecting to AgriBot...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
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
              <MaterialCommunityIcons
                name="robot-outline"
                size={20}
                color={Colors.ui.white}
              />
            </View>
            <View style={styles.typingDots}>
              <View style={styles.dot} />
              <View style={styles.dot} />
              <View style={styles.dot} />
            </View>
          </View>
        )}

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Ask me anything..."
            placeholderTextColor={Colors.ui.textMuted}
            value={inputText}
            onChangeText={setInputText}
            multiline
            maxLength={500}
            editable={!isLoading && !isInitializing}
          />
          <Pressable
            style={[
              styles.sendButton,
              (!inputText.trim() || isLoading) && styles.sendButtonDisabled,
            ]}
            onPress={handleSendMessage}
            disabled={!inputText.trim() || isLoading}
          >
            <MaterialCommunityIcons
              name="send"
              size={24}
              color={Colors.ui.white}
            />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.ui.backgroundAlt,
  },
  centerContent: {
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
  keyboardAvoidingView: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  messagesList: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingTop: 12,
    paddingBottom: 12,
    flexGrow: 1,
    justifyContent: "flex-end",
  },
  botMessageContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
    gap: 12,
  },
  botBubbleWrapper: {
    flex: 1,
  },
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
  messageBubble: {
    maxWidth: "100%",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
  },
  botMessage: {
    backgroundColor: Colors.ui.cardBackground,
    shadowColor: Colors.ui.shadowColor,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  userMessageContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 16,
  },
  userMessage: {
    backgroundColor: Colors.agribot.primary,
    maxWidth: "80%",
  },
  messageText: {
    fontSize: 14,
    lineHeight: 20,
    color: Colors.ui.textPrimary,
    marginBottom: 4,
  },
  userMessageText: {
    fontSize: 14,
    lineHeight: 20,
    color: Colors.ui.white,
  },
  timestamp: {
    fontSize: 12,
    color: Colors.ui.textMuted,
    marginTop: 4,
  },
  choicesContainer: {
    marginTop: 8,
    gap: 8,
  },
  choiceButton: {
    borderWidth: 1.5,
    borderColor: Colors.agribot.primary,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: "flex-start",
  },
  choiceButtonPressed: {
    backgroundColor: "rgba(29, 184, 84, 0.1)",
  },
  choiceButtonText: {
    fontSize: 14,
    color: Colors.agribot.primary,
    fontWeight: "500",
  },
  loadingContainer: {
    paddingHorizontal: 16,
    paddingBottom: 12,
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 12,
  },
  typingDots: {
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.agribot.primary,
  },
  inputContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.ui.background,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    gap: 12,
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
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.agribot.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
  connectingText: {
    fontSize: 14,
    color: Colors.ui.textSecondary,
    marginTop: 8,
  },
});
