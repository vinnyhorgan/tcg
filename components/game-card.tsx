"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { type MouseEvent, useCallback, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import type { Card, CardElement } from "@/lib/card-types";
import {
  ELEMENT_COLORS,
  getCardTypeLabel,
  RARITY_CONFIG,
  TYPE_ICONS,
} from "@/lib/card-types";
import { cn } from "@/lib/utils";

const ELEMENT_GRADIENTS: Record<CardElement, string> = {
  fire: "from-red-500 via-orange-400 to-amber-300",
  water: "from-blue-500 via-cyan-400 to-teal-300",
  earth: "from-amber-600 via-yellow-500 to-lime-400",
  air: "from-sky-400 via-indigo-300 to-violet-300",
  shadow: "from-purple-600 via-violet-500 to-fuchsia-400",
  light: "from-yellow-300 via-amber-200 to-orange-300",
};

type GameCardSize = "sm" | "md" | "lg";

const SIZE_MAP: Record<
  GameCardSize,
  { width: string; height: string; text: string }
> = {
  sm: { width: "w-44", height: "h-64", text: "text-xs" },
  md: { width: "w-56", height: "h-80", text: "text-sm" },
  lg: { width: "w-72", height: "h-[26rem]", text: "text-base" },
};

interface GameCardProps {
  card: Card;
  size?: GameCardSize;
  className?: string;
  interactive?: boolean;
}

export function GameCard({
  card,
  size = "md",
  className,
  interactive = true,
}: GameCardProps): React.ReactElement {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(mouseY, [0, 1], [12, -12]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-12, 12]), {
    stiffness: 300,
    damping: 30,
  });

  const shimmerX = useTransform(mouseX, [0, 1], ["-100%", "200%"]);
  const shimmerY = useTransform(mouseY, [0, 1], ["-100%", "200%"]);

  const handleMouseMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (!interactive || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width);
      mouseY.set((e.clientY - rect.top) / rect.height);
    },
    [interactive, mouseX, mouseY],
  );

  const handleMouseEnter = useCallback(() => {
    if (interactive) setIsHovered(true);
  }, [interactive]);

  const handleMouseLeave = useCallback(() => {
    if (!interactive) return;
    setIsHovered(false);
    mouseX.set(0.5);
    mouseY.set(0.5);
  }, [interactive, mouseX, mouseY]);

  const sizeConfig = SIZE_MAP[size] ?? SIZE_MAP.md;
  const elementColors = ELEMENT_COLORS[card.element] ?? ELEMENT_COLORS.fire;
  const rarityConfig = RARITY_CONFIG[card.rarity] ?? RARITY_CONFIG.common;
  const artGradient = ELEMENT_GRADIENTS[card.element] ?? ELEMENT_GRADIENTS.fire;
  const typeIcon = TYPE_ICONS[card.type] ?? "⚔️";
  const isCreature = card.type === "creature";

  return (
    <div
      className={cn("perspective-[1200px]", className)}
      style={{ perspective: "1200px" }}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: interactive ? rotateX : 0,
          rotateY: interactive ? rotateY : 0,
          transformStyle: "preserve-3d",
        }}
        {...(interactive ? { whileHover: { scale: 1.05, z: 30 } } : {})}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className={cn(
          sizeConfig.width,
          sizeConfig.height,
          "relative flex flex-col rounded-2xl border-2 border-white/10 bg-zinc-900/95 p-2.5 select-none",
          "shadow-xl backdrop-blur-sm",
          interactive && "cursor-pointer",
          rarityConfig.glow && `shadow-lg ${rarityConfig.glow}`,
        )}
      >
        {/* Cost badge */}
        <div
          className={cn(
            "absolute -top-2.5 -left-2.5 z-20 flex size-10 items-center justify-center rounded-full",
            "border-2 border-white/20 bg-zinc-800 font-bold text-lg shadow-lg",
            elementColors.text,
          )}
          style={{ transform: "translateZ(20px)" }}
        >
          {card.cost}
        </div>

        {/* Art area */}
        <div
          className={cn(
            "relative mb-2 flex-shrink-0 overflow-hidden rounded-xl",
            size === "sm" ? "h-24" : size === "md" ? "h-32" : "h-44",
          )}
        >
          <div
            className={cn(
              "absolute inset-0 bg-gradient-to-br opacity-80",
              artGradient,
            )}
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(255,255,255,0.3),transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(0,0,0,0.4),transparent_60%)]" />

          {/* Holographic shimmer for epic/legendary */}
          {rarityConfig.shimmer && isHovered && (
            <motion.div
              className="pointer-events-none absolute inset-0 z-10"
              style={{
                background: `linear-gradient(115deg, transparent, rgba(255,255,255,0.4), transparent)`,
                backgroundSize: "200% 200%",
                backgroundPositionX: shimmerX,
                backgroundPositionY: shimmerY,
                mixBlendMode: "overlay",
              }}
            />
          )}

          {/* Rarity gem */}
          <div
            className={cn(
              "absolute right-2 bottom-2 rounded-full px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
              "bg-black/50 backdrop-blur-sm",
              rarityConfig.color,
            )}
          >
            {rarityConfig.label}
          </div>
        </div>

        {/* Name + type line */}
        <div className="mb-1 flex items-center gap-1.5 px-0.5">
          <span className="text-sm">{typeIcon}</span>
          <h3
            className={cn(
              "flex-1 truncate font-semibold leading-tight text-white",
              size === "sm" ? "text-xs" : "text-sm",
            )}
          >
            {card.name}
          </h3>
        </div>

        {/* Element + type badges */}
        <div className="mb-1.5 flex gap-1 px-0.5">
          <Badge
            variant="outline"
            className={cn(
              "border-white/10 px-1.5 py-0 text-[10px]",
              elementColors.text,
            )}
          >
            {card.element}
          </Badge>
          <Badge
            variant="outline"
            className="border-white/10 px-1.5 py-0 text-[10px] text-zinc-400"
          >
            {getCardTypeLabel(card.type)}
          </Badge>
        </div>

        {/* Description */}
        <div
          className={cn(
            "min-h-0 flex-1 overflow-hidden rounded-lg bg-black/30 p-2",
            "border border-white/5",
          )}
        >
          <p
            className={cn(
              "leading-snug text-zinc-300",
              size === "sm" ? "text-[10px]" : "text-xs",
            )}
          >
            {card.description}
          </p>
          {card.flavorText && (
            <p
              className={cn(
                "mt-1 border-t border-white/5 pt-1 italic text-zinc-500",
                size === "sm" ? "text-[9px]" : "text-[10px]",
              )}
            >
              {card.flavorText}
            </p>
          )}
        </div>

        {/* Stats for creatures */}
        {isCreature && card.attack != null && card.health != null && (
          <div className="mt-1.5 flex items-center justify-between px-1">
            <div
              className={cn(
                "flex items-center gap-1 rounded-lg bg-red-900/40 px-2 py-0.5",
                "border border-red-500/20 font-bold text-red-400",
                sizeConfig.text,
              )}
            >
              <span className="text-xs">⚔</span>
              {card.attack}
            </div>
            <div
              className={cn(
                "flex items-center gap-1 rounded-lg bg-emerald-900/40 px-2 py-0.5",
                "border border-emerald-500/20 font-bold text-emerald-400",
                sizeConfig.text,
              )}
            >
              <span className="text-xs">♥</span>
              {card.health}
            </div>
          </div>
        )}

        {/* Ambient border glow for legendary */}
        {card.rarity === "legendary" && (
          <div
            className={cn(
              "pointer-events-none absolute -inset-[1px] rounded-2xl",
              "bg-gradient-to-r from-amber-500/20 via-yellow-300/30 to-amber-500/20",
              "animate-pulse",
            )}
            style={{ zIndex: -1 }}
          />
        )}
      </motion.div>
    </div>
  );
}

export function GameCardSkeleton({
  size = "md",
}: {
  size?: GameCardSize;
}): React.ReactElement {
  const sizeConfig = SIZE_MAP[size] ?? SIZE_MAP.md;
  return (
    <div
      className={cn(
        sizeConfig.width,
        sizeConfig.height,
        "animate-pulse rounded-2xl border-2 border-white/5 bg-zinc-900/50",
      )}
    >
      <div className="m-2.5 h-32 rounded-xl bg-zinc-800/50" />
      <div className="mx-3 mb-2 h-4 w-2/3 rounded bg-zinc-800/50" />
      <div className="mx-3 mb-2 h-3 w-1/3 rounded bg-zinc-800/50" />
      <div className="mx-3 h-16 rounded-lg bg-zinc-800/30" />
    </div>
  );
}
