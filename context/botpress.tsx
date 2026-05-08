import {
  BotpressMessage,
  BotpressSession,
  getMessages,
  initSession,
  pollForBotReply,
  sendMessage as apiSendMessage,
} from "@/utils/botpress";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useAuth } from "./auth";

export interface ChatMessage {
  id: string;
  text: string;
  sender: "bot" | "user";
  timestamp: Date;
  choices?: { label: string; value: string }[];
}

type BotpressContextType = {
  messages: ChatMessage[];
  isLoading: boolean;
  isInitializing: boolean;
  sendMessage: (text: string) => Promise<void>;
  pendingMessage: string;
  setPendingMessage: (text: string) => void;
  clearPendingMessage: () => void;
};

const BotpressContext = createContext<BotpressContextType>({
  messages: [],
  isLoading: false,
  isInitializing: true,
  sendMessage: async () => {},
  pendingMessage: "",
  setPendingMessage: () => {},
  clearPendingMessage: () => {},
});

function toChatMessage(msg: BotpressMessage, userId: string): ChatMessage {
  const { payload } = msg;
  return {
    id: msg.id,
    text: payload.type === "text" || payload.type === "choice" ? payload.text : "",
    sender: msg.userId === userId ? "user" : "bot",
    timestamp: new Date(msg.createdAt),
    choices: payload.type === "choice" ? payload.options : undefined,
  };
}

export function BotpressProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [pendingMessage, setPendingMessage] = useState("");
  const sessionRef = useRef<BotpressSession | null>(null);

  const doSend = useCallback(
    async (session: BotpressSession, text: string, showUserBubble: boolean) => {
      if (showUserBubble) {
        setMessages((prev) => [
          ...prev,
          {
            id: "user-" + Date.now(),
            text,
            sender: "user",
            timestamp: new Date(),
          },
        ]);
      }
      setIsLoading(true);
      try {
        const sent = await apiSendMessage(session, text);
        const reply = await pollForBotReply(session, sent.createdAt);
        if (reply) {
          setMessages((prev) => [...prev, toChatMessage(reply, session.userId)]);
        }
      } catch {
        if (showUserBubble) {
          setMessages((prev) => [
            ...prev,
            {
              id: "err-" + Date.now(),
              text: "Something went wrong. Please try again.",
              sender: "bot",
              timestamp: new Date(),
            },
          ]);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    if (!user) {
      sessionRef.current = null;
      setMessages([]);
      setIsInitializing(true);
      return;
    }

    let cancelled = false;

    (async () => {
      setIsInitializing(true);
      try {
        const session = await initSession();
        if (cancelled) return;
        sessionRef.current = session;

        const history = await getMessages(session);
        if (cancelled) return;

        if (history.length > 0) {
          setMessages(history.map((m) => toChatMessage(m, session.userId)));
        } else {
          // Fresh conversation — ping the bot silently to get the welcome message
          await doSend(session, "hi", false);
        }
      } catch {
        // Session init failed silently; chatbot screen will show its retry UI
      } finally {
        if (!cancelled) setIsInitializing(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [user, doSend]);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!sessionRef.current || isLoading) return;
      await doSend(sessionRef.current, text, true);
    },
    [isLoading, doSend],
  );

  const clearPendingMessage = useCallback(() => setPendingMessage(""), []);

  return (
    <BotpressContext.Provider
      value={{
        messages,
        isLoading,
        isInitializing,
        sendMessage,
        pendingMessage,
        setPendingMessage,
        clearPendingMessage,
      }}
    >
      {children}
    </BotpressContext.Provider>
  );
}

export const useBotpress = () => useContext(BotpressContext);
