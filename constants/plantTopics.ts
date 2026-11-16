/**
 * Dragon fruit topics & care actions for the home quick-access grid.
 *
 * 👩‍🌾 ADMIN / EDITOR GUIDE
 * ------------------------------------------------------------------
 * Each card is one dragon fruit (pitaya) subtopic — planting, trellis,
 * pruning, pollination, and so on. To add a subtopic your users can ask
 * about, just add an object to `PLANT_TOPICS` below. Nothing else needs to
 * change — the home screen renders this list automatically and taps send
 * `prompt` to the chatbot.
 *
 * Fields:
 *   id       unique string (keep it stable once shipped)
 *   name     short display name, Taglish is welcome (e.g. "Pruning")
 *   emoji    one emoji shown big on the card
 *   color    accent / icon color (hex)
 *   bgColor  soft card background (hex, light tint of `color`)
 *   prompt   the exact dragon fruit question sent to the chatbot when tapped
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

/** Dragon fruit subtopics users can tap to start a chat. Add freely. */
export const PLANT_TOPICS: PlantTopic[] = [
  {
    id: "pagtatanim",
    name: "Pagtatanim",
    emoji: "🌱",
    color: "#2F8366",
    bgColor: "#E4EFE9",
    prompt: "Paano magtanim ng dragon fruit mula sa cutting? Teach me the basics, bes!",
  },
  {
    id: "poste",
    name: "Poste/Trellis",
    emoji: "🪵",
    color: "#8A6A45",
    bgColor: "#F2EBE2",
    prompt: "Anong klaseng poste o trellis ang best para sa dragon fruit, and paano i-setup?",
  },
  {
    id: "pruning",
    name: "Pruning",
    emoji: "✂️",
    color: "#6B5A8A",
    bgColor: "#EBE7F0",
    prompt: "Kailan at paano mag-prune ng dragon fruit para dumami ang bunga?",
  },
  {
    id: "pollination",
    name: "Pollination",
    emoji: "🐝",
    color: "#A37E33",
    bgColor: "#F4EEDD",
    prompt: "How do I hand-pollinate dragon fruit flowers at night? Step by step please.",
  },
  {
    id: "pamumulaklak",
    name: "Pamumulaklak",
    emoji: "🌼",
    color: "#B0206A",
    bgColor: "#F7E6EE",
    prompt: "Bakit hindi namumulaklak ang dragon fruit ko? Paano siya pamumulaklakin?",
  },
  {
    id: "pamumunga",
    name: "Pamumunga",
    emoji: "🐉",
    color: "#C2386F",
    bgColor: "#F8E8EF",
    prompt: "Paano palakihin at padamihin ang bunga ng dragon fruit? Fertilizer tips too!",
  },
  {
    id: "peste",
    name: "Peste",
    emoji: "🐛",
    color: "#A85C4A",
    bgColor: "#F3E7E3",
    prompt: "Anong mga peste at sakit ang common sa dragon fruit, and paano sila i-treat naturally?",
  },
  {
    id: "ani",
    name: "Ani",
    emoji: "🧺",
    color: "#215F4B",
    bgColor: "#E3EDE8",
    prompt: "Kailan dapat anihin ang dragon fruit? Paano malalaman kung hinog na?",
  },
];

/** Core dragon fruit care actions. */
export const CARE_ACTIONS: CareAction[] = [
  {
    id: "cutting",
    label: "Cutting",
    icon: "content-cut",
    color: "#2F8366",
    bgColor: "#E6EFE6",
    prompt: "Paano mag-propagate ng dragon fruit from cuttings? Gaano katagal bago mag-ugat?",
  },
  {
    id: "watering",
    label: "Watering",
    icon: "water",
    color: "#3E6B7A",
    bgColor: "#E2ECEC",
    prompt: "Gaano kadalas dapat diligan ang dragon fruit? Cactus siya, so ayokong ma-overwater.",
  },
  {
    id: "pests",
    label: "Pests",
    icon: "bug",
    color: "#A85C4A",
    bgColor: "#F3E7E3",
    prompt: "How do I deal with common dragon fruit pests and stem rot naturally?",
  },
  {
    id: "trellis",
    label: "Trellis",
    icon: "fence",
    color: "#8A6A45",
    bgColor: "#F2EBE2",
    prompt: "How do I build and train a dragon fruit plant on a trellis or post?",
  },
];
