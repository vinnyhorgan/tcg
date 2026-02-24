import { describe, expect, it } from "bun:test";
import {
  CARD_ELEMENTS,
  CARD_RARITIES,
  CARD_TYPES,
  ELEMENT_COLORS,
  getCardElementLabel,
  getCardRarityLabel,
  getCardTypeLabel,
  RARITY_CONFIG,
  TYPE_ICONS,
} from "../card-types";

describe("card-types", () => {
  describe("constants", () => {
    it("defines all card types", () => {
      expect(CARD_TYPES).toEqual(["creature", "spell", "trap"]);
    });

    it("defines all rarities", () => {
      expect(CARD_RARITIES).toEqual(["common", "rare", "epic", "legendary"]);
    });

    it("defines all elements", () => {
      expect(CARD_ELEMENTS).toEqual([
        "fire",
        "water",
        "earth",
        "air",
        "shadow",
        "light",
      ]);
    });

    it("has color config for every element", () => {
      for (const element of CARD_ELEMENTS) {
        const colors = ELEMENT_COLORS[element];
        expect(colors).toBeDefined();
        expect(colors?.bg).toBeTruthy();
        expect(colors?.text).toBeTruthy();
        expect(colors?.accent).toBeTruthy();
      }
    });

    it("has rarity config for every rarity", () => {
      for (const rarity of CARD_RARITIES) {
        const config = RARITY_CONFIG[rarity];
        expect(config).toBeDefined();
        expect(config?.label).toBeTruthy();
        expect(config?.color).toBeTruthy();
        expect(typeof config?.shimmer).toBe("boolean");
      }
    });

    it("epic and legendary have shimmer enabled", () => {
      expect(RARITY_CONFIG.common?.shimmer).toBe(false);
      expect(RARITY_CONFIG.rare?.shimmer).toBe(false);
      expect(RARITY_CONFIG.epic?.shimmer).toBe(true);
      expect(RARITY_CONFIG.legendary?.shimmer).toBe(true);
    });

    it("has icons for every type", () => {
      for (const type of CARD_TYPES) {
        expect(TYPE_ICONS[type]).toBeTruthy();
      }
    });
  });

  describe("getCardTypeLabel", () => {
    it("capitalizes card types", () => {
      expect(getCardTypeLabel("creature")).toBe("Creature");
      expect(getCardTypeLabel("spell")).toBe("Spell");
      expect(getCardTypeLabel("trap")).toBe("Trap");
    });
  });

  describe("getCardRarityLabel", () => {
    it("returns the display label from config", () => {
      expect(getCardRarityLabel("common")).toBe("Common");
      expect(getCardRarityLabel("rare")).toBe("Rare");
      expect(getCardRarityLabel("epic")).toBe("Epic");
      expect(getCardRarityLabel("legendary")).toBe("Legendary");
    });
  });

  describe("getCardElementLabel", () => {
    it("capitalizes element names", () => {
      expect(getCardElementLabel("fire")).toBe("Fire");
      expect(getCardElementLabel("water")).toBe("Water");
      expect(getCardElementLabel("shadow")).toBe("Shadow");
    });
  });
});
