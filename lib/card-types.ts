import type { Doc } from "@/convex/_generated/dataModel";

export type Card = Doc<"cards">;

export type CardType = Card["type"];
export type CardRarity = Card["rarity"];
export type CardElement = Card["element"];

export const CARD_TYPES: CardType[] = ["creature", "spell", "trap"];
export const CARD_RARITIES: CardRarity[] = [
  "common",
  "rare",
  "epic",
  "legendary",
];
export const CARD_ELEMENTS: CardElement[] = [
  "fire",
  "water",
  "earth",
  "air",
  "shadow",
  "light",
];

export const ELEMENT_COLORS: Record<
  CardElement,
  { bg: string; text: string; accent: string }
> = {
  fire: {
    bg: "from-red-900/60 to-orange-900/40",
    text: "text-orange-300",
    accent: "#f97316",
  },
  water: {
    bg: "from-blue-900/60 to-cyan-900/40",
    text: "text-cyan-300",
    accent: "#06b6d4",
  },
  earth: {
    bg: "from-amber-900/60 to-yellow-900/40",
    text: "text-amber-300",
    accent: "#d97706",
  },
  air: {
    bg: "from-sky-900/60 to-teal-900/40",
    text: "text-sky-300",
    accent: "#0ea5e9",
  },
  shadow: {
    bg: "from-purple-900/60 to-violet-900/40",
    text: "text-violet-300",
    accent: "#8b5cf6",
  },
  light: {
    bg: "from-yellow-800/60 to-amber-700/40",
    text: "text-yellow-200",
    accent: "#fbbf24",
  },
};

export const RARITY_CONFIG: Record<
  CardRarity,
  { label: string; color: string; glow: string; shimmer: boolean }
> = {
  common: { label: "Common", color: "text-zinc-400", glow: "", shimmer: false },
  rare: {
    label: "Rare",
    color: "text-blue-400",
    glow: "shadow-blue-500/20",
    shimmer: false,
  },
  epic: {
    label: "Epic",
    color: "text-purple-400",
    glow: "shadow-purple-500/30",
    shimmer: true,
  },
  legendary: {
    label: "Legendary",
    color: "text-amber-400",
    glow: "shadow-amber-500/40",
    shimmer: true,
  },
};

export const TYPE_ICONS: Record<CardType, string> = {
  creature: "⚔️",
  spell: "✨",
  trap: "🪤",
};

export function getCardTypeLabel(type: CardType): string {
  return type.charAt(0).toUpperCase() + type.slice(1);
}

export function getCardRarityLabel(rarity: CardRarity): string {
  return RARITY_CONFIG[rarity]?.label ?? rarity;
}

export function getCardElementLabel(element: CardElement): string {
  return element.charAt(0).toUpperCase() + element.slice(1);
}
