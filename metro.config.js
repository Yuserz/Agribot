const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

// Fix for Windows file watcher issues with pnpm
config.watchFolders = [];
config.resolver.disableHierarchicalLookup = false;

// Properly handle symlinks from pnpm
config.resolver.symlinksEnabled = true;

// Use better watchman settings for Windows
if (process.platform === "win32") {
  config.maxWorkers = 1;
  config.watchman = false; // Disable watchman on Windows, use native watcher
}

module.exports = config;
