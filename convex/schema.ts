import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export const cardType = v.union(
  v.literal("creature"),
  v.literal("spell"),
  v.literal("trap"),
);

export const cardRarity = v.union(
  v.literal("common"),
  v.literal("rare"),
  v.literal("epic"),
  v.literal("legendary"),
);

export const cardElement = v.union(
  v.literal("fire"),
  v.literal("water"),
  v.literal("earth"),
  v.literal("air"),
  v.literal("shadow"),
  v.literal("light"),
);

export default defineSchema({
  cards: defineTable({
    name: v.string(),
    description: v.string(),
    flavorText: v.optional(v.string()),
    cost: v.number(),
    attack: v.optional(v.number()),
    health: v.optional(v.number()),
    type: cardType,
    rarity: cardRarity,
    element: cardElement,
  })
    .index("by_type", ["type"])
    .index("by_rarity", ["rarity"])
    .index("by_element", ["element"]),
});
