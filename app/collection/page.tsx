"use client";

import { useQuery } from "convex/react";
import { motion } from "motion/react";
import { useMemo, useState } from "react";
import { CardGrid, CardGridSkeleton } from "@/components/card-grid";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { api } from "@/convex/_generated/api";
import type { Card, CardElement, CardRarity, CardType } from "@/lib/card-types";
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
} from "@/lib/card-types";
import { cn } from "@/lib/utils";

function filterCards(
  cards: Card[],
  search: string,
  typeFilter: CardType | "all",
  rarityFilter: CardRarity | "all",
  elementFilter: CardElement | "all",
): Card[] {
  let filtered = cards;

  if (search.trim()) {
    const q = search.toLowerCase();
    filtered = filtered.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q),
    );
  }

  if (typeFilter !== "all") {
    filtered = filtered.filter((c) => c.type === typeFilter);
  }

  if (rarityFilter !== "all") {
    filtered = filtered.filter((c) => c.rarity === rarityFilter);
  }

  if (elementFilter !== "all") {
    filtered = filtered.filter((c) => c.element === elementFilter);
  }

  return filtered;
}

export default function CollectionPage(): React.ReactElement {
  const cards = useQuery(api.cards.list);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<CardType | "all">("all");
  const [rarityFilter, setRarityFilter] = useState<CardRarity | "all">("all");
  const [elementFilter, setElementFilter] = useState<CardElement | "all">(
    "all",
  );

  const filtered = useMemo(
    () =>
      cards
        ? filterCards(cards, search, typeFilter, rarityFilter, elementFilter)
        : [],
    [cards, search, typeFilter, rarityFilter, elementFilter],
  );

  const isLoading = cards === undefined;

  return (
    <div className="relative min-h-screen">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-zinc-950">
        <div className="absolute top-0 right-0 h-[400px] w-[400px] rounded-full bg-purple-500/3 blur-[100px]" />
        <div className="absolute bottom-0 left-0 h-[300px] w-[300px] rounded-full bg-amber-500/3 blur-[80px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-[family-name:var(--font-display)] font-bold text-3xl text-white tracking-tight">
            Collection
          </h1>
          <p className="mt-1 text-zinc-500">
            {isLoading
              ? "Loading cards..."
              : `${filtered.length} of ${cards.length} cards`}
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mt-6 space-y-4"
        >
          {/* Search */}
          <Input
            placeholder="Search cards..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-sm border-white/10 bg-zinc-900/50 text-white placeholder:text-zinc-600"
          />

          {/* Filter row */}
          <div className="flex flex-wrap gap-4">
            {/* Type filter */}
            <div className="space-y-1.5">
              <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
                Type
              </span>
              <ToggleGroup
                type="single"
                value={typeFilter}
                onValueChange={(v) => {
                  if (v) setTypeFilter(v as CardType | "all");
                }}
                variant="outline"
                size="sm"
              >
                <ToggleGroupItem
                  value="all"
                  className="border-white/10 text-xs text-zinc-400 data-[state=on]:bg-white/10 data-[state=on]:text-white"
                >
                  All
                </ToggleGroupItem>
                {CARD_TYPES.map((type) => (
                  <ToggleGroupItem
                    key={type}
                    value={type}
                    className="border-white/10 text-xs text-zinc-400 data-[state=on]:bg-white/10 data-[state=on]:text-white"
                  >
                    {TYPE_ICONS[type]} {getCardTypeLabel(type)}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </div>

            {/* Rarity filter */}
            <div className="space-y-1.5">
              <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
                Rarity
              </span>
              <ToggleGroup
                type="single"
                value={rarityFilter}
                onValueChange={(v) => {
                  if (v) setRarityFilter(v as CardRarity | "all");
                }}
                variant="outline"
                size="sm"
              >
                <ToggleGroupItem
                  value="all"
                  className="border-white/10 text-xs text-zinc-400 data-[state=on]:bg-white/10 data-[state=on]:text-white"
                >
                  All
                </ToggleGroupItem>
                {CARD_RARITIES.map((rarity) => (
                  <ToggleGroupItem
                    key={rarity}
                    value={rarity}
                    className={cn(
                      "border-white/10 text-xs text-zinc-400",
                      "data-[state=on]:bg-white/10",
                      `data-[state=on]:${RARITY_CONFIG[rarity].color}`,
                    )}
                  >
                    {getCardRarityLabel(rarity)}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </div>

            {/* Element filter */}
            <div className="space-y-1.5">
              <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
                Element
              </span>
              <ToggleGroup
                type="single"
                value={elementFilter}
                onValueChange={(v) => {
                  if (v) setElementFilter(v as CardElement | "all");
                }}
                variant="outline"
                size="sm"
              >
                <ToggleGroupItem
                  value="all"
                  className="border-white/10 text-xs text-zinc-400 data-[state=on]:bg-white/10 data-[state=on]:text-white"
                >
                  All
                </ToggleGroupItem>
                {CARD_ELEMENTS.map((element) => (
                  <ToggleGroupItem
                    key={element}
                    value={element}
                    className={cn(
                      "border-white/10 text-xs text-zinc-400",
                      "data-[state=on]:bg-white/10",
                      `data-[state=on]:${ELEMENT_COLORS[element].text}`,
                    )}
                  >
                    {getCardElementLabel(element)}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </div>
          </div>
        </motion.div>

        {/* Card grid */}
        <div className="mt-8">
          {isLoading ? (
            <CardGridSkeleton count={8} />
          ) : filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <p className="text-lg text-zinc-500">
                No cards match your filters
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setTypeFilter("all");
                  setRarityFilter("all");
                  setElementFilter("all");
                }}
                className="mt-2 text-sm text-amber-500 hover:underline"
              >
                Clear all filters
              </button>
            </motion.div>
          ) : (
            <CardGrid cards={filtered} />
          )}
        </div>
      </div>
    </div>
  );
}
