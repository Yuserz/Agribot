import AsyncStorage from "@react-native-async-storage/async-storage";

const CLIENT_ID = "bc12ddf0-d04e-4a6c-a9f7-9b9081f22bcc";
const BASE_URL = `https://webchat.botpress.cloud/${CLIENT_ID}`;

const STORAGE = {
  USER_KEY: "@botpress_user_key",
  USER_ID: "@botpress_user_id",
  CONV_ID: "@botpress_conv_id",
};

export type BotpressPayload =
  | { type: "text"; text: string }
  | { type: "choice"; text: string; options: { label: string; value: string }[] };

export type BotpressMessage = {
  id: string;
  createdAt: string;
  conversationId: string;
  userId: string;
  payload: BotpressPayload;
};

export type BotpressSession = {
  userId: string;
  userKey: string;
  conversationId: string;
};

async function api<T>(
  path: string,
  options: RequestInit = {},
  userKey?: string,
): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(userKey ? { "x-user-key": userKey } : {}),
  };
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers,
  });
  const body = await res.json();
  if (!res.ok) throw new Error(body?.message ?? `Botpress error ${res.status}`);
  return body as T;
}

export async function initSession(): Promise<BotpressSession> {
  let [userKey, userId, conversationId] = await Promise.all([
    AsyncStorage.getItem(STORAGE.USER_KEY),
    AsyncStorage.getItem(STORAGE.USER_ID),
    AsyncStorage.getItem(STORAGE.CONV_ID),
  ]);

  if (!userKey || !userId) {
    const data = await api<{ user: { id: string }; key: string }>("/users", {
      method: "POST",
      body: "{}",
    });
    userKey = data.key;
    userId = data.user.id;
    conversationId = null;
    await Promise.all([
      AsyncStorage.setItem(STORAGE.USER_KEY, userKey),
      AsyncStorage.setItem(STORAGE.USER_ID, userId),
      AsyncStorage.removeItem(STORAGE.CONV_ID),
    ]);
  }

  if (!conversationId) {
    const data = await api<{ conversation: { id: string } }>(
      "/conversations",
      { method: "POST", body: "{}" },
      userKey,
    );
    conversationId = data.conversation.id;
    await AsyncStorage.setItem(STORAGE.CONV_ID, conversationId);
  }

  return { userId, userKey, conversationId };
}

export async function sendMessage(
  session: BotpressSession,
  text: string,
): Promise<BotpressMessage> {
  const data = await api<{ message: BotpressMessage }>(
    "/messages",
    {
      method: "POST",
      body: JSON.stringify({
        conversationId: session.conversationId,
        payload: { type: "text", text },
        type: "text",
      }),
    },
    session.userKey,
  );
  return data.message;
}

export async function getMessages(
  session: BotpressSession,
): Promise<BotpressMessage[]> {
  const data = await api<{ messages: BotpressMessage[] }>(
    `/conversations/${session.conversationId}/messages`,
    {},
    session.userKey,
  );
  // API returns newest-first; reverse to chronological order
  return [...data.messages].reverse();
}

export async function resetConversation(): Promise<void> {
  await AsyncStorage.removeItem(STORAGE.CONV_ID);
}

export async function pollForBotReply(
  session: BotpressSession,
  afterTimestamp: string,
  maxWaitMs = 15000,
  intervalMs = 1500,
): Promise<BotpressMessage | null> {
  const deadline = Date.now() + maxWaitMs;
  while (Date.now() < deadline) {
    await new Promise((r) => setTimeout(r, intervalMs));
    const messages = await getMessages(session);
    const reply = messages.find(
      (m) =>
        m.userId !== session.userId &&
        new Date(m.createdAt) > new Date(afterTimestamp),
    );
    if (reply) return reply;
  }
  return null;
}
