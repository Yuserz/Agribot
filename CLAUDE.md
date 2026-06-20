# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

**Tanim, Bes!** is an Expo (React Native) mobile app — a general plant-care assistant (any plant, Taglish/Gen Z tone). It pairs Supabase email/password auth with a Botpress-backed chat assistant. Cross-platform (Android, iOS, web). (Branched from the original "AgriBot" dragon-fruit variant.)

Branding strings live in [constants/brand.ts](constants/brand.ts) (`APP_NAME`, taglines, `BOT_NAME`) — change these to re-skin the identity. The app icon/wordmark is currently a 🌱 emoji (no logo image dependency on splash/welcome/chat).

## Commands

Package manager is **pnpm**.

```bash
pnpm install          # install dependencies
pnpm start            # expo start (dev server + QR)
pnpm android          # open on Android emulator/device
pnpm ios              # open on iOS simulator/device
pnpm web              # run in browser
pnpm lint             # expo lint (ESLint, eslint-config-expo)
```

There is no test suite. `pnpm reset-project` (scripts/reset-project.js) moves starter code to `app-example/` and scaffolds a blank `app/` — destructive, do not run casually.

## Required environment

`utils/supabase.ts` reads two env vars at runtime; the app cannot authenticate without them (they must be `EXPO_PUBLIC_`-prefixed to reach the client bundle):

- `EXPO_PUBLIC_SUPABASE_URL`
- `EXPO_PUBLIC_SUPABASE_KEY`

Botpress IDs (client ID, webchat config URLs) are hardcoded in `utils/botpress.ts` and `constants/botpress.ts`, not env-driven.

## Architecture

**Routing** is expo-router file-based (`app/`), with `typedRoutes` and React Compiler enabled (app.json `experiments`). Path alias `@/*` maps to the repo root (tsconfig.json), e.g. `@/context/auth`.

**Provider nesting** is established once in `app/_layout.tsx`: `AuthProvider` → `BotpressProvider` → navigation `ThemeProvider`. Order matters — Botpress depends on auth.

**Navigation flow:**
- `splash` is the entry anchor (`unstable_settings.anchor`). It waits for auth `loading`, then `router.replace`s to `/(tabs)` if a session exists, else `/welcome` (3s minimum).
- `welcome` → `auth/` stack (`login`, `signup`) → on success `router.replace("/(tabs)")`.
- `(tabs)` is the authed app: `index` (Home), `chatbot` (Chat), `faq`, `profile`.

There is **no route guard component**. Gating is done imperatively: the splash screen redirects based on session, and login/signup navigate on success. `BotpressProvider` also reacts to `user` becoming null by clearing chat state. If you add protected routes, follow this imperative pattern rather than expecting a central guard.

**Auth** (`context/auth.tsx`): wraps Supabase. `useAuth()` exposes `{ user, session, loading, signOut }`. Session is persisted via AsyncStorage (configured in `utils/supabase.ts`) and kept live through `onAuthStateChange`. Helper `getDisplayName(user, fallback)` derives a display name (full_name → email handle → fallback).

**Chat** (`context/botpress.tsx` + `utils/botpress.ts`): the chat is **not** a WebView — it talks directly to the Botpress webchat REST API (`https://webchat.botpress.cloud/<CLIENT_ID>`). Key behaviors:
- `utils/botpress.ts` is the stateless API layer: `initSession` (creates/restores user + conversation, persisted in AsyncStorage under `@botpress_*` keys), `sendMessage`, `getMessages` (API returns newest-first; it reverses to chronological), `resetConversation`, and `pollForBotReply` (polls every 1.5s up to 15s for a bot message newer than a timestamp — there are no webhooks/streaming).
- `context/botpress.tsx` holds UI state (`ChatMessage[]`, loading flags) and exposes `useBotpress()`. On first init with empty history it sends a silent `"hi"` ping; that ping is stripped from history so it never renders. `pendingMessage` lets other screens (e.g. Home quick-actions) preload text into the chat input. `startNewConversation` clears the stored conversation id and re-inits via a `sessionKey` bump.
- The WebView config in `constants/botpress.ts` (`BOTPRESS_URL`, `WEBVIEW_CONFIG`) is legacy/unused by the current REST-based flow.

**Home quick-access topics** ([constants/plantTopics.ts](constants/plantTopics.ts)): the plants and care actions shown on the Home screen come from `PLANT_TOPICS` and `CARE_ACTIONS` here — this is the "admin/me-editable" list. Add an object to `PLANT_TOPICS` (id, name, emoji, color, bgColor, prompt) and the Home grid renders it automatically; tapping a card sets `pendingMessage` to its `prompt` and navigates to the chat. No backend — to make it remotely editable later, swap this static array for a Supabase fetch.

**Theming** (`constants/theme.ts`): centralized `Colors` object, "Lime + Sunny Yellow" palette. Use `Colors.brand.*` (`primary` `#65A30D`, `accent` `#FACC15`, `gradient`, `gradientShort`, `tintSoft`). `Colors.agribot` is kept as an **alias of `Colors.brand`** so older screens referencing `Colors.agribot.*` still recolor automatically — prefer `Colors.brand` in new code. `Colors.ui.*` holds the flat UI palette and tip color sets. Header text over the gradient uses a `textShadow` for legibility on the yellow end. `light`/`dark` blocks exist but the app is effectively brand-colored, not dark-mode-themed.

UI uses `react-native-reanimated` for entrance animations (`FadeIn`, `FadeInDown`, etc.), `expo-linear-gradient` for the brand gradient, `@expo/vector-icons` (MaterialCommunityIcons / Ionicons) for icons, `react-native-markdown-display` for bot message rendering, and `expo-speech` for TTS.
