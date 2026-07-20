# Tanim, Bes! 🌱

**Tanim, Bes!** is a mobile application built with [Expo](https://expo.dev) — a friendly, general plant-care assistant for *any* plant, with a Taglish/Gen Z tone. It pairs Supabase email/password authentication with a Botpress-backed chat assistant to help you plan, grow, and care for your halaman.

## About Tanim, Bes!

Tanim, Bes! makes plant care approachable for everyone by offering:

- **AI-powered Chatbot**: Ask anything about any plant and get instant, friendly answers
- **Quick-access Plant Topics**: Tap a plant or care action on the Home screen to jump straight into a chat
- **Frequently Asked Questions (FAQ)**: Common plant-care knowledge at a glance
- **Bilingual UI**: Taglish by default, with a one-tap toggle to full English
- **User Authentication**: Secure login and signup via Supabase
- **User Profiles**: Edit your name, upload an avatar, and manage your account

Cross-platform for Android, iOS, and web.

## Prerequisites

Before running this app, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **pnpm** (v8 or higher) - Install globally using:
  ```bash
  npm install -g pnpm
  ```

## Required environment

Create a `.env.local` with your Supabase credentials (must be `EXPO_PUBLIC_`-prefixed to reach the client bundle):

```bash
EXPO_PUBLIC_SUPABASE_URL=your-supabase-url
EXPO_PUBLIC_SUPABASE_KEY=your-supabase-anon-key
```

## Get started

1. Install dependencies

   ```bash
   make install
   ```

2. Start the app

   ```bash
   make dev
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Make commands

A `Makefile` wraps the common `pnpm` scripts so you can type less. Run `make help` to see them all.

| Command        | What it does                                   | Wraps               |
| -------------- | ---------------------------------------------- | ------------------- |
| `make install` | Install dependencies                           | `pnpm install`      |
| `make dev`     | Start the Expo dev server (alias for `start`)  | `pnpm start`        |
| `make start`   | Start the Expo dev server                      | `pnpm start`        |
| `make android` | Run on an Android emulator/device              | `pnpm android`      |
| `make ios`     | Run on an iOS simulator/device                 | `pnpm ios`          |
| `make web`     | Run in the browser                             | `pnpm web`          |
| `make lint`    | Lint with ESLint                               | `pnpm lint`         |
| `make clean`   | Clear the Expo/Metro cache and restart         | `pnpm start --clear`|
| `make reset`   | Reset to a blank `app/` (destructive)          | `pnpm reset-project`|
| `make help`    | List all available commands                    | —                   |

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
