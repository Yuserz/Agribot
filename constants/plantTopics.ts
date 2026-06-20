/**
 * Plant topics & care actions for the home quick-access grid.
 *
 * 👩‍🌾 ADMIN / EDITOR GUIDE
 * ------------------------------------------------------------------
 * To add a plant your users can ask about, just add an object to
 * `PLANT_TOPICS` below. Nothing else needs to change — the home screen
 * renders this list automatically and taps send `prompt` to the chatbot.
 *
 * Fields:
 *   id       unique string (keep it stable once shipped)
 *   name     short display name, Taglish is welcome (e.g. "Kamatis")
 *   emoji    one emoji shown big on the card
 *   color    accent / icon color (hex)
 *   bgColor  soft card background (hex, light tint of `color`)
 *   prompt   the exact message sent to the chatbot when tapped
 *
 * `icon` names come from MaterialCommunityIcons.
 * ------------------------------------------------------------------
 */

export interface PlantTopic {
  id: string;
  name: string;
  emoji: string;
  color: string;
  bgColor: string;
  prompt: string;
}

export interface CareAction {
  id: string;
  label: string;
  icon: string; // MaterialCommunityIcons name
  color: string;
  bgColor: string;
  prompt: string;
}

/** Plants users can tap to start a chat. Add freely. */
export const PLANT_TOPICS: PlantTopic[] = [
  {
    id: "kamatis",
    name: "Kamatis",
    emoji: "🍅",
    color: "#A85C4A",
    bgColor: "#F3E7E3",
    prompt: "Paano magtanim at mag-alaga ng kamatis (tomato)? Teach me the basics, bes!",
  },
  {
    id: "sili",
    name: "Sili",
    emoji: "🌶️",
    color: "#B5763E",
    bgColor: "#F4E9DE",
    prompt: "How do I grow chili (sili) at home? Give me a beginner-friendly guide.",
  },
  {
    id: "kangkong",
    name: "Kangkong",
    emoji: "🥬",
    color: "#3E7A52",
    bgColor: "#E6EFE6",
    prompt: "Paano magtanim ng kangkong sa maliit na space? Quick tips please!",
  },
  {
    id: "talong",
    name: "Talong",
    emoji: "🍆",
    color: "#6B5A8A",
    bgColor: "#EBE7F0",
    prompt: "Help me grow eggplant (talong) — planting, watering, and harvesting.",
  },
  {
    id: "herbs",
    name: "Herbs",
    emoji: "🌿",
    color: "#2F8366",
    bgColor: "#E4EFE9",
    prompt: "I want to start a small herb garden (basil, mint, oregano). Where do I begin?",
  },
  {
    id: "succulents",
    name: "Succulents",
    emoji: "🪴",
    color: "#2C857A",
    bgColor: "#E2EFEC",
    prompt: "How do I take care of succulents indoors? They keep dying, bes 😭",
  },
  {
    id: "bulaklak",
    name: "Bulaklak",
    emoji: "🌸",
    color: "#A8567C",
    bgColor: "#F3E8EE",
    prompt: "Give me tips for growing flowering plants (bulaklak) that bloom well.",
  },
  {
    id: "saging",
    name: "Saging",
    emoji: "🍌",
    color: "#9C7E33",
    bgColor: "#F4EEDD",
    prompt: "Paano magtanim ng saging (banana) sa backyard? Walk me through it.",
  },
];

/** Generic care actions that work for any plant. */
export const CARE_ACTIONS: CareAction[] = [
  {
    id: "planting",
    label: "Planting",
    icon: "seed",
    color: "#2F8366",
    bgColor: "#E6EFE6",
    prompt: "Give me general beginner tips for planting any plant from scratch.",
  },
  {
    id: "watering",
    label: "Watering",
    icon: "water",
    color: "#3E6B7A",
    bgColor: "#E2ECEC",
    prompt: "How do I know when and how much to water my plants?",
  },
  {
    id: "pests",
    label: "Pests",
    icon: "bug",
    color: "#A85C4A",
    bgColor: "#F3E7E3",
    prompt: "How do I deal with common pests and plant diseases naturally?",
  },
  {
    id: "sunlight",
    label: "Sunlight",
    icon: "white-balance-sunny",
    color: "#A37E33",
    bgColor: "#F4EEDD",
    prompt: "How much sunlight do different plants need? Help me place them right.",
  },
];
