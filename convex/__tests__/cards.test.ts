import { beforeEach, describe, expect, it } from "bun:test";
import type { TestConvex } from "convex-test";
import { convexTest } from "convex-test";
import { api, internal } from "../_generated/api";
import schema from "../schema";

const modules = {
  "../cards.ts": () => import("../cards"),
  "../seed.ts": () => import("../seed"),
  "../schema.ts": () => import("../schema"),
  "../_generated/api.js": () => import("../_generated/api"),
  "../_generated/server.js": () => import("../_generated/server"),
};

describe("cards", () => {
  let t: TestConvex<typeof schema>;

  beforeEach(() => {
    t = convexTest(schema, modules);
  });

  describe("seed", () => {
    it("populates cards when the table is empty", async () => {
      await t.mutation(internal.seed.seed, {});
      const cards = await t.query(api.cards.list, {});
      expect(cards.length).toBe(15);
    });

    it("skips seeding when cards already exist", async () => {
      await t.mutation(internal.seed.seed, {});
      await t.mutation(internal.seed.seed, {});
      const cards = await t.query(api.cards.list, {});
      expect(cards.length).toBe(15);
    });
  });

  describe("list", () => {
    it("returns an empty array when no cards exist", async () => {
      const cards = await t.query(api.cards.list, {});
      expect(cards).toEqual([]);
    });

    it("returns all seeded cards", async () => {
      await t.mutation(internal.seed.seed, {});
      const cards = await t.query(api.cards.list, {});
      expect(cards.length).toBe(15);
      for (const card of cards) {
        expect(card).toHaveProperty("_id");
        expect(card).toHaveProperty("name");
        expect(card).toHaveProperty("type");
        expect(card).toHaveProperty("rarity");
        expect(card).toHaveProperty("element");
      }
    });
  });

  describe("getById", () => {
    it("returns a card by its ID", async () => {
      await t.mutation(internal.seed.seed, {});
      const cards = await t.query(api.cards.list, {});
      const first = cards[0];
      if (!first) throw new Error("No cards found");

      const card = await t.query(api.cards.getById, { id: first._id });
      expect(card).not.toBeNull();
      expect(card?.name).toBe(first.name);
    });
  });

  describe("listByType", () => {
    beforeEach(async () => {
      await t.mutation(internal.seed.seed, {});
    });

    it("filters creatures correctly", async () => {
      const creatures = await t.query(api.cards.listByType, {
        type: "creature",
      });
      expect(creatures.length).toBeGreaterThan(0);
      for (const card of creatures) {
        expect(card.type).toBe("creature");
      }
    });

    it("filters spells correctly", async () => {
      const spells = await t.query(api.cards.listByType, { type: "spell" });
      expect(spells.length).toBeGreaterThan(0);
      for (const card of spells) {
        expect(card.type).toBe("spell");
      }
    });

    it("filters traps correctly", async () => {
      const traps = await t.query(api.cards.listByType, { type: "trap" });
      expect(traps.length).toBeGreaterThan(0);
      for (const card of traps) {
        expect(card.type).toBe("trap");
      }
    });
  });

  describe("listByRarity", () => {
    beforeEach(async () => {
      await t.mutation(internal.seed.seed, {});
    });

    it("filters common cards", async () => {
      const commons = await t.query(api.cards.listByRarity, {
        rarity: "common",
      });
      expect(commons.length).toBeGreaterThan(0);
      for (const card of commons) {
        expect(card.rarity).toBe("common");
      }
    });

    it("filters legendary cards", async () => {
      const legendaries = await t.query(api.cards.listByRarity, {
        rarity: "legendary",
      });
      expect(legendaries.length).toBeGreaterThan(0);
      for (const card of legendaries) {
        expect(card.rarity).toBe("legendary");
      }
    });
  });

  describe("listByElement", () => {
    beforeEach(async () => {
      await t.mutation(internal.seed.seed, {});
    });

    it("filters fire cards", async () => {
      const fireCards = await t.query(api.cards.listByElement, {
        element: "fire",
      });
      expect(fireCards.length).toBeGreaterThan(0);
      for (const card of fireCards) {
        expect(card.element).toBe("fire");
      }
    });

    it("filters water cards", async () => {
      const waterCards = await t.query(api.cards.listByElement, {
        element: "water",
      });
      expect(waterCards.length).toBeGreaterThan(0);
      for (const card of waterCards) {
        expect(card.element).toBe("water");
      }
    });
  });
});
