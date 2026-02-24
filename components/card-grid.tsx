"use client";

import { AnimatePresence, motion } from "motion/react";
import { GameCard, GameCardSkeleton } from "@/components/game-card";
import type { Card } from "@/lib/card-types";
import { cn } from "@/lib/utils";

interface CardGridProps {
  cards: Card[];
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function CardGrid({
  cards,
  size = "md",
  className,
}: CardGridProps): React.ReactElement {
  return (
    <div
      className={cn(
        "grid place-items-center gap-6",
        size === "sm"
          ? "grid-cols-[repeat(auto-fill,minmax(11rem,1fr))]"
          : size === "md"
            ? "grid-cols-[repeat(auto-fill,minmax(14rem,1fr))]"
            : "grid-cols-[repeat(auto-fill,minmax(18rem,1fr))]",
        className,
      )}
    >
      <AnimatePresence mode="popLayout">
        {cards.map((card, index) => (
          <motion.div
            key={card._id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{
              duration: 0.4,
              delay: index * 0.05,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            <GameCard card={card} size={size} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

export function CardGridSkeleton({
  count = 8,
  size = "md",
  className,
}: {
  count?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}): React.ReactElement {
  return (
    <div
      className={cn(
        "grid place-items-center gap-6",
        size === "sm"
          ? "grid-cols-[repeat(auto-fill,minmax(11rem,1fr))]"
          : size === "md"
            ? "grid-cols-[repeat(auto-fill,minmax(14rem,1fr))]"
            : "grid-cols-[repeat(auto-fill,minmax(18rem,1fr))]",
        className,
      )}
    >
      {Array.from({ length: count }, (_, i) => (
        <GameCardSkeleton key={`skeleton-${i.toString()}`} size={size} />
      ))}
    </div>
  );
}
