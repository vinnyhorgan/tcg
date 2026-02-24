"use client";

import { useQuery } from "convex/react";
import { motion } from "motion/react";
import Link from "next/link";
import { GameCard, GameCardSkeleton } from "@/components/game-card";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import type { Card } from "@/lib/card-types";
import { cn } from "@/lib/utils";

function pickFeatured(cards: Card[]): Card[] {
  const legendary = cards.filter((c) => c.rarity === "legendary");
  const epic = cards.filter((c) => c.rarity === "epic");
  const rare = cards.filter((c) => c.rarity === "rare");
  const pool = [...legendary, ...epic, ...rare];
  return pool.slice(0, 5);
}

export default function Home(): React.ReactElement {
  const cards = useQuery(api.cards.list);
  const featured = cards ? pickFeatured(cards) : [];

  return (
    <div className="relative overflow-hidden">
      {/* Atmospheric background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-zinc-950" />
        <div className="absolute top-0 left-1/4 h-[600px] w-[600px] rounded-full bg-amber-500/5 blur-[128px]" />
        <div className="absolute right-1/4 bottom-0 h-[500px] w-[500px] rounded-full bg-purple-500/5 blur-[128px]" />
        <div className="absolute top-1/2 left-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/3 blur-[100px]" />
        {/* Noise texture overlay */}
        <div className="absolute inset-0 opacity-[0.03] [background-image:url('data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%220%200%20256%20256%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cfilter%20id%3D%22noise%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.9%22%20numOctaves%3D%224%22%20stitchTiles%3D%22stitch%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20filter%3D%22url(%23noise)%22%2F%3E%3C%2Fsvg%3E')]" />
      </div>

      {/* Hero section */}
      <section className="relative flex min-h-[80vh] flex-col items-center justify-center px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <h1
              className={cn(
                "font-[family-name:var(--font-display)] font-black text-6xl tracking-tight sm:text-8xl",
                "bg-gradient-to-b from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent",
              )}
            >
              Arcana
            </h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mx-auto mt-4 max-w-lg text-lg text-zinc-400 sm:text-xl"
          >
            Collect elemental cards. Build powerful decks. Battle for glory.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-8 flex items-center justify-center gap-4"
          >
            <Button
              asChild
              size="lg"
              className={cn(
                "rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 px-8 font-semibold text-zinc-950",
                "shadow-lg shadow-amber-500/20 transition-shadow hover:shadow-amber-500/40",
              )}
            >
              <Link href="/collection">Browse Collection</Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Featured cards fan */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.7,
            duration: 0.8,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="relative mt-16 flex items-end justify-center"
        >
          {cards === undefined ? (
            <div className="flex gap-4">
              {Array.from({ length: 3 }, (_, i) => (
                <GameCardSkeleton key={`hero-skel-${i.toString()}`} size="sm" />
              ))}
            </div>
          ) : featured.length > 0 ? (
            <div className="flex items-end justify-center">
              {featured.slice(0, 5).map((card, index) => {
                const mid = Math.floor(Math.min(featured.length, 5) / 2);
                const offset = index - mid;
                const rotation = offset * 8;
                const yOffset = Math.abs(offset) * 16;

                return (
                  <motion.div
                    key={card._id}
                    initial={{ opacity: 0, y: 40, rotate: 0 }}
                    animate={{
                      opacity: 1,
                      y: -yOffset,
                      rotate: rotation,
                    }}
                    transition={{
                      delay: 0.8 + index * 0.1,
                      duration: 0.6,
                      ease: "easeOut",
                    }}
                    className="-mx-4 origin-bottom"
                    style={{ zIndex: featured.length - Math.abs(offset) }}
                  >
                    <GameCard card={card} size="sm" interactive={false} />
                  </motion.div>
                );
              })}
            </div>
          ) : null}
        </motion.div>
      </section>

      {/* Bottom section with subtle card count */}
      {cards && cards.length > 0 && (
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="pb-20 text-center"
        >
          <p className="text-sm text-zinc-600">
            {cards.length} cards in the collection
          </p>
        </motion.section>
      )}
    </div>
  );
}
