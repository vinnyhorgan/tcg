import { v } from "convex/values";
import { query } from "./_generated/server";
import { cardElement, cardRarity, cardType } from "./schema";

export const list = query({
  args: {},
  returns: v.array(
    v.object({
      _id: v.id("cards"),
      _creationTime: v.number(),
      name: v.string(),
      description: v.string(),
      flavorText: v.optional(v.string()),
      cost: v.number(),
      attack: v.optional(v.number()),
      health: v.optional(v.number()),
      type: cardType,
      rarity: cardRarity,
      element: cardElement,
    }),
  ),
  handler: async (ctx) => {
    return await ctx.db.query("cards").collect();
  },
});

export const getById = query({
  args: { id: v.id("cards") },
  returns: v.union(
    v.object({
      _id: v.id("cards"),
      _creationTime: v.number(),
      name: v.string(),
      description: v.string(),
      flavorText: v.optional(v.string()),
      cost: v.number(),
      attack: v.optional(v.number()),
      health: v.optional(v.number()),
      type: cardType,
      rarity: cardRarity,
      element: cardElement,
    }),
    v.null(),
  ),
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const listByType = query({
  args: { type: cardType },
  returns: v.array(
    v.object({
      _id: v.id("cards"),
      _creationTime: v.number(),
      name: v.string(),
      description: v.string(),
      flavorText: v.optional(v.string()),
      cost: v.number(),
      attack: v.optional(v.number()),
      health: v.optional(v.number()),
      type: cardType,
      rarity: cardRarity,
      element: cardElement,
    }),
  ),
  handler: async (ctx, args) => {
    return await ctx.db
      .query("cards")
      .withIndex("by_type", (q) => q.eq("type", args.type))
      .collect();
  },
});

export const listByRarity = query({
  args: { rarity: cardRarity },
  returns: v.array(
    v.object({
      _id: v.id("cards"),
      _creationTime: v.number(),
      name: v.string(),
      description: v.string(),
      flavorText: v.optional(v.string()),
      cost: v.number(),
      attack: v.optional(v.number()),
      health: v.optional(v.number()),
      type: cardType,
      rarity: cardRarity,
      element: cardElement,
    }),
  ),
  handler: async (ctx, args) => {
    return await ctx.db
      .query("cards")
      .withIndex("by_rarity", (q) => q.eq("rarity", args.rarity))
      .collect();
  },
});

export const listByElement = query({
  args: { element: cardElement },
  returns: v.array(
    v.object({
      _id: v.id("cards"),
      _creationTime: v.number(),
      name: v.string(),
      description: v.string(),
      flavorText: v.optional(v.string()),
      cost: v.number(),
      attack: v.optional(v.number()),
      health: v.optional(v.number()),
      type: cardType,
      rarity: cardRarity,
      element: cardElement,
    }),
  ),
  handler: async (ctx, args) => {
    return await ctx.db
      .query("cards")
      .withIndex("by_element", (q) => q.eq("element", args.element))
      .collect();
  },
});
