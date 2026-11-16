# AgriBot 🤖🌾

AgriBot is a mobile application built with [Expo](https://expo.dev) that provides intelligent agricultural solutions and assistance about Dragon Fruit Farming. This app leverages modern technology to help farmers and agricultural professionals with real-time chatbot support, frequently asked questions, user authentication, and comprehensive profile management.

## About AgriBot

AgriBot is designed to bridge the gap between technology and agriculture by offering:

- **AI-powered Chatbot**: Get instant answers to your agricultural queries
- **Frequently Asked Questions (FAQ)**: Quick access to common agricultural knowledge
- **User Authentication**: Secure login and signup functionality
- **User Profiles**: Manage your account and preferences

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app), providing a cross-platform experience for Android, iOS, and web.

## Prerequisites

Before running this app, ensure you have the following installed:

### Required

- **Node.js** (v20.19 or higher) - [Download](https://nodejs.org/)
- **pnpm** (v11 or higher; the setup script installs it for you) - Install globally using:
  ```bash
  npm install -g pnpm
  ```

## Get started

### Quick setup (recommended)

The setup script checks Node (20.19+), installs pnpm if missing, and installs dependencies.

- **Windows (PowerShell):**
  ```powershell
  powershell -ExecutionPolicy Bypass -File scripts\setup.ps1          # add -Start to launch, -Tunnel for tunnel mode
  ```
- **macOS / Linux / Git Bash:**
  ```bash
  ./scripts/setup.sh                                                   # add --start to launch, --tunnel for tunnel mode
  ```

### Manual setup

1. Install dependencies

   ```bash
   pnpm install
   ```

2. Start the app

   ```bash
   pnpm start          # scan the QR code with Expo Go (same Wi-Fi)
   pnpm start:tunnel   # phone on a different network
   pnpm start:clear    # clear the Metro cache if things act up
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
