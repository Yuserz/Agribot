import { ThemedView } from "@/components/themed-view";
import { BOTPRESS_BOT_CONFIG, BOTPRESS_URL } from "@/constants/botpress";
import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView, WebViewMessageEvent } from "react-native-webview";

export default function ChatbotScreen() {
  const webViewRef = useRef<WebView>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAvailable, setIsAvailable] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    // Set a timeout to show fallback message if chatbot doesn't load
    timeoutRef.current = setTimeout(() => {
      if (isLoading) {
        setIsAvailable(false);
        setLoadError(
          "Chatbot service is temporarily unavailable. Please try again later.",
        );
        setIsLoading(false);
      }
    }, 10000); // 10 seconds timeout

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isLoading]);

  const handleLoadEnd = () => {
    setIsLoading(false);
    setIsAvailable(true);
    setLoadError(null);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const handleLoadError = (error: any) => {
    console.log("WebView error:", error.nativeEvent);
    setIsAvailable(false);
    setLoadError(
      "Failed to load chatbot. Please check your connection and try again.",
    );
    setIsLoading(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const handleWebViewMessage = (event: WebViewMessageEvent) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      console.log("Message from WebView:", data);
    } catch {
      console.log("WebView message:", event.nativeEvent.data);
    }
  };

  const injectedJavaScript = `
    (function() {
      document.documentElement.style.height = '100%';
      document.body.style.height = '100%';
      document.body.style.margin = '0';
      document.body.style.padding = '0';
      // Example: notify RN when loaded
      window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'loaded' }));
    })();
    true;
  `;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>
          html, body {
            height: 100%;
            width: 100%;
            margin: 0;
            padding: 0;
            background: #fff;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          }
          #bp-web-widget-container {
            height: 100%;
            width: 100%;
          }
        </style>
      </head>
      <body>
        <div id="bp-web-widget-container"></div>
        <script src="${BOTPRESS_URL}"></script>
        <script src="${BOTPRESS_BOT_CONFIG}" defer></script>
      </body>
    </html>
  `;

  return (
    <SafeAreaView style={styles.container}>
      <ThemedView style={styles.content}>
        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0a7ea4" />
          </View>
        )}
        {!isAvailable && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorTitle}>⚠️ Chatbot Unavailable</Text>
            <Text style={styles.errorMessage}>{loadError}</Text>
            <Text style={styles.errorSubtext}>
              Please try refreshing the app or check back later.
            </Text>
          </View>
        )}
        {isAvailable && (
          <WebView
            ref={webViewRef}
            source={{ html: htmlContent }}
            style={styles.webview}
            onLoadStart={() => setIsLoading(true)}
            onLoadEnd={handleLoadEnd}
            onMessage={handleWebViewMessage}
            injectedJavaScript={injectedJavaScript}
            javaScriptEnabled
            domStorageEnabled
            originWhitelist={["*"]}
            startInLoadingState
            mixedContentMode="always"
            onError={handleLoadError}
          />
        )}
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  content: { flex: 1 },
  webview: { flex: 1 },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.9)",
    zIndex: 1000,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    marginBottom: 12,
    textAlign: "center",
  },
  errorMessage: {
    fontSize: 16,
    color: "#666",
    marginBottom: 16,
    textAlign: "center",
    lineHeight: 24,
  },
  errorSubtext: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
    fontStyle: "italic",
  },
});
