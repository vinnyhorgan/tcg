import { internalMutation } from "./_generated/server";

const STARTER_CARDS = [
  // Fire creatures
  {
    name: "Ember Whelp",
    description:
      "A young dragon hatchling. Small but fierce, its flames grow hotter with every battle.",
    flavorText: "Even the mightiest inferno begins with a single spark.",
    cost: 2,
    attack: 3,
    health: 2,
    type: "creature" as const,
    rarity: "common" as const,
    element: "fire" as const,
  },
  {
    name: "Inferno Titan",
    description:
      "Deals 4 damage to all enemy creatures when summoned. A walking cataclysm.",
    flavorText: "The ground cracks and weeps magma in its wake.",
    cost: 8,
    attack: 7,
    health: 7,
    type: "creature" as const,
    rarity: "legendary" as const,
    element: "fire" as const,
  },

  // Water creatures
  {
    name: "Tide Caller",
    description:
      "Draw a card when summoned. The ocean whispers its secrets to those who listen.",
    cost: 3,
    attack: 2,
    health: 4,
    type: "creature" as const,
    rarity: "rare" as const,
    element: "water" as const,
  },
  {
    name: "Abyssal Leviathan",
    description:
      "Cannot be targeted by spells. The deep holds terrors beyond imagination.",
    flavorText: "Sailors speak of it only in hushed tones, and only on land.",
    cost: 7,
    attack: 6,
    health: 8,
    type: "creature" as const,
    rarity: "epic" as const,
    element: "water" as const,
  },

  // Earth creatures
  {
    name: "Stone Sentinel",
    description:
      "Shield. Takes reduced damage from spells. An ancient guardian carved from living rock.",
    cost: 4,
    attack: 2,
    health: 7,
    type: "creature" as const,
    rarity: "common" as const,
    element: "earth" as const,
  },
  {
    name: "Ironbark Elder",
    description:
      "All friendly creatures gain +0/+2. The forest bends to its ancient will.",
    flavorText: "Its roots drink from the memory of the world.",
    cost: 5,
    attack: 3,
    health: 6,
    type: "creature" as const,
    rarity: "rare" as const,
    element: "earth" as const,
  },

  // Air creatures
  {
    name: "Zephyr Scout",
    description:
      "Swift. Can attack the turn it's summoned. A blur of feathers and wind.",
    cost: 1,
    attack: 1,
    health: 1,
    type: "creature" as const,
    rarity: "common" as const,
    element: "air" as const,
  },
  {
    name: "Storm Wyvern",
    description: "Swift. Deals 2 damage to a random enemy when it attacks.",
    flavorText: "Lightning is not its weapon. Lightning is its herald.",
    cost: 6,
    attack: 5,
    health: 4,
    type: "creature" as const,
    rarity: "epic" as const,
    element: "air" as const,
  },

  // Shadow creatures
  {
    name: "Shade Assassin",
    description:
      "Stealth. Destroys any creature it damages. A whisper of death in the dark.",
    cost: 4,
    attack: 1,
    health: 1,
    type: "creature" as const,
    rarity: "rare" as const,
    element: "shadow" as const,
  },

  // Light creatures
  {
    name: "Radiant Seraph",
    description:
      "Restore 4 health to your hero when summoned. A beacon in the darkest hour.",
    flavorText: "Where it treads, despair cannot follow.",
    cost: 5,
    attack: 4,
    health: 5,
    type: "creature" as const,
    rarity: "epic" as const,
    element: "light" as const,
  },

  // Spells
  {
    name: "Arcane Bolt",
    description: "Deal 3 damage to any target.",
    cost: 2,
    type: "spell" as const,
    rarity: "common" as const,
    element: "fire" as const,
  },
  {
    name: "Frozen Grasp",
    description:
      "Freeze a creature for 2 turns. It cannot attack or use abilities.",
    flavorText: "The ice remembers what the living forget.",
    cost: 3,
    type: "spell" as const,
    rarity: "rare" as const,
    element: "water" as const,
  },
  {
    name: "Celestial Judgment",
    description:
      "Destroy all creatures with 4 or more attack. The light spares no tyrant.",
    cost: 6,
    type: "spell" as const,
    rarity: "legendary" as const,
    element: "light" as const,
  },

  // Traps
  {
    name: "Shadow Snare",
    description:
      "When an enemy creature attacks, reduce its attack to 0 until end of turn.",
    cost: 2,
    type: "trap" as const,
    rarity: "common" as const,
    element: "shadow" as const,
  },
  {
    name: "Mirror of Souls",
    description:
      "When your opponent plays a creature, summon a copy of it on your side.",
    flavorText: "Every reflection holds a truth the original fears.",
    cost: 5,
    type: "trap" as const,
    rarity: "legendary" as const,
    element: "light" as const,
  },
] as const;

export const seed = internalMutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db.query("cards").first();
    if (existing) {
      console.log("Cards already seeded, skipping.");
      return;
    }

    for (const card of STARTER_CARDS) {
      await ctx.db.insert("cards", card);
    }
    console.log(`Seeded ${STARTER_CARDS.length} cards.`);
  },
});
