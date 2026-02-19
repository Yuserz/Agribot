/**
 * Botpress Configuration
 */

// The Botpress webchat library
export const BOTPRESS_URL = "https://cdn.botpress.cloud/webchat/v3.5/inject.js";

// Your bot-specific configuration script
export const BOTPRESS_BOT_CONFIG =
  "https://files.bpcontent.cloud/2026/01/13/04/20260113041107-2XY24W31.js";

// Optional: Configure WebView settings
export const WEBVIEW_CONFIG = {
  scalesPageToFit: true,
  javaScriptEnabled: true,
  domStorageEnabled: true,
  mixedContentMode: "always" as const,
};
