# Arcana — Game Design Document

**Version:** 1.0 (First Release)  
**Design goals:** Simple, indie, effective. Easy to learn, hard to master. Many combos and synergies. Super fun gameplay.

---

## 1. Overview

Arcana is a **1v1 browser-based trading card game**. Two players (or player vs AI) duel using decks of 30 cards. Each player controls a **Hero** (20 HP) and wins by reducing the opponent’s Hero to 0. Gameplay is **mana-based**, **turn-based**, and **board-focused**: play creatures, cast spells, set traps, and attack to close out the game.

**Core promise:** Learn the rules in one game; spend dozens of games learning lines, synergies, and deck building.

---

## 2. Core Loop & Win Condition

- **Win:** Reduce the opponent’s Hero to **0 HP**.
- **Lose:** Your Hero reaches 0 HP (or you must draw and have no cards left — optional “fatigue” rule for first release).
- **Core loop each turn:** Gain mana → Draw 1 → Play cards (creatures, spells, traps) → Attack with creatures → End turn.

No alternate win conditions in the first release. One clear objective: **kill the enemy Hero**.

---

## 3. Resources

### 3.1 Mana

- **Source:** You gain **1 mana** on turn 1, then **+1 permanent mana each turn** (turn 2 = 2, turn 3 = 3, …).
- **Cap:** **10 mana**.
- **Spend:** Playing a card costs mana equal to its **cost** (printed on the card). Mana is spent when the card is played and does not “float” between turns.
- **No card-as-resource:** You never discard cards for mana. This keeps rules simple and encourages combos (you always have cards to sequence).

### 3.2 Cards

- **Deck:** Exactly **30 cards** per deck.
- **Copies:** Maximum **2 copies** of any non-legendary card; **1 copy** per legendary.
- **Hand:** Maximum **7 cards**. If you would draw with 7 already, you do not draw (or optionally: discard excess at end of turn — pick one rule and stick to it).
- **Mulligan:** At game start, each player draws a hand (e.g. 3–5 cards). One optional **redraw**: shuffle hand into deck, draw the same number. No mulligan after that.

---

## 4. Turn Structure

1. **Start of turn**  
   - Add 1 mana (up to 10).  
   - Draw 1 card (unless hand is full).  
   - Remove “until end of turn” and “this turn” effects from previous turn (if applicable).  
   - Unfreeze creatures that had 1 turn left of Freeze.

2. **Main phase**  
   - Play any number of cards (creatures, spells, traps) in any order, as long as you have mana and board space.  
   - Creatures enter the board and can attack **this turn** if they have **Swift**; otherwise they have **Summoning Sickness** (can’t attack until your next turn).  
   - Spells resolve immediately. Traps are set face-down and trigger when their condition is met.

3. **Combat / Attack phase**  
   - You choose which of your creatures attack.  
   - For each attacking creature, you choose **one** target: **opponent’s Hero** or **one enemy creature**.  
   - If target is a creature: that creature and your creature deal damage to each other (simultaneously). If the target dies, excess damage does **not** spill to the Hero.  
   - If target is the Hero: the Hero takes damage equal to the creature’s attack.  
   - Blocking is **optional**: if we support blocking, defender assigns blockers during declare blockers step; otherwise attacker just picks targets. **Recommendation for v1:** Attacker chooses all targets (no blocking). Simpler and faster.

4. **End of turn**  
   - “End of turn” effects trigger.  
   - Opponent becomes the active player.

**First-player advantage:** The second player draws **1 extra card** on their first turn (or gains 1 temporary mana on turn 1 — choose one and document it). This offsets going second.

---

## 5. Card Types

### 5.1 Creatures

- **Stats:** **Cost**, **Attack**, **Health**.
- **Behavior:** Played to your board. Can attack once per turn (during your attack phase) unless **Frozen** or just summoned without Swift.
- **Board limit:** e.g. **6 creature slots** per player (configurable). If full, you cannot play more creatures until one dies.
- **Damage:** When a creature takes damage equal to or greater than its Health, it is **destroyed** (removed from board). Damage does not “stick” between turns unless we add a “damage persists” rule — for v1, **no persistent damage** (each turn, treat creatures as full Health for the purpose of “have they died?”). So we need a simple rule: **damage is marked on the creature**, and when current damage ≥ Health, it dies.

### 5.2 Spells

- **Cost:** Mana only.  
- **Effect:** Resolves once when played (e.g. deal damage, draw cards, freeze, destroy). Then the spell is **discarded** (no permanent spell card on board).
- **Targeting:** Spells say “any target” or “target creature” etc. Same-element or “friendly only” specified on card.

### 5.3 Traps

- **Cost:** Mana when **set** (played face-down).  
- **Trigger:** When a condition is met (e.g. “When an enemy creature attacks”, “When your opponent plays a creature”), the trap **triggers** and its effect happens once. Then the trap is discarded.
- **One trigger per trap.** No “recurring” traps in v1.

---

## 6. Keywords & Mechanics

Keywords keep rules short on the card and create **combo potential** and **synergies**. Below: name, short rule, design role.

| Keyword    | Rule | Design role |
|-----------|------|-------------|
| **Swift** | Can attack the turn it’s summoned. | Tempo, aggro, “hard to master” attack ordering. |
| **Shield** | Takes half damage (rounded down) from spells. | Anti-spell, durable. |
| **Stealth** | When this creature damages a creature, destroy that creature. | Removal, trading up. |
| **Elusive** | Cannot be targeted by enemy spells or abilities. | Evasion, must be answered by combat or board wipes. |
| **Freeze X** | Target cannot attack or use abilities for X turns. | Control, stall. |
| **Draw** | “Draw 1 card” (or N) when condition (e.g. when summoned). | Card advantage, synergies. |
| **Drain** | When this source deals damage, your Hero heals that much. | Sustain, grindy value. |
| **Rally** | “All friendly creatures get +X/+Y until end of turn” (or +0/+1 permanent). | Board-wide buff, combo with wide boards. |
| **Last Breath** | When this creature dies, do X. | Death triggers, sacrifice synergies. |
| **Overwhelm** | When this creature attacks the Hero, excess damage over the blocker’s Health goes to the Hero. (Only if we add blocking.) For v1 without blocking: can skip or repurpose. | Optional. |

**First release:** Use a **small, clear set**: e.g. **Swift**, **Shield**, **Stealth**, **Elusive**, **Freeze**, **Draw**, **Drain**, **Rally**, **Last Breath**. Implement 5–7 in v1; add rest later.

**Reminder text:** Cards should include a short reminder in parentheses, e.g. “Swift (can attack the turn it’s summoned).”

---

## 7. Elements & Identity

Six elements define **flavor** and **deck-building identity**. Each element has a clear role; **dual-element decks** (e.g. Fire + Air) create the main archetypes.

| Element | Identity | Typical effects |
|--------|-----------|------------------|
| **Fire** | Aggression, direct damage, burn | Deal X damage, attack buffs, “when this attacks” |
| **Water** | Control, card draw, freeze | Draw cards, Freeze, bounce, tap/disable |
| **Earth** | Defense, durability, buffs | Shield, +Health, Rally, big bodies |
| **Air** | Speed, evasion, multi-hit | Swift, Elusive, “deal damage to random enemy”, bounce |
| **Shadow** | Removal, stealth, copying | Stealth, destroy, copy creature/spell, trap tricks |
| **Light** | Healing, purge, board wipe | Heal Hero, destroy high-attack, “cannot be targeted” cleanse |

**Deck-building rule (recommended):** A deck may use cards from **at most 2 elements**. This keeps games readable and gives clear archetypes (e.g. Fire/Air aggro, Water/Earth control).

---

## 8. Synergies & Combos (Hard to Master)

- **Element pairs:** e.g. “Second Fire card you play this turn gets +1/+0” (Elemental Resonance). Encourages sequencing and multi-Fire turns.  
- **Tribal / type triggers:** “When you play a Water card, draw 1.” “When you play a creature, give it +0/+1.”  
- **Curve + Swift:** Cheap Swift creatures + buff spells = strong early pressure.  
- **Trap timing:** Hold traps for key attacks or key creature plays; bluffing and sequencing matter.  
- **Attack order:** Which creature attacks which target (clear a blocker vs go face) for lethal or best trade.  
- **Board state:** When to play a 2nd creature vs hold for a spell; when to trade vs go face.  
- **Deck building:** Which 30 cards, which element pair, how many copies of each.  

**First release:** Implement a few **explicit synergy cards** (e.g. “When you play your second Fire card this turn, deal 1 to the enemy Hero”) so combos are visible; add more in later sets.

---

## 9. Deck Building (First Release)

- **Deck size:** 30 cards.  
- **Copy limits:** 2 per non-legendary, 1 per legendary.  
- **Element limit:** Up to **2 elements** per deck.  
- **No minimum per element;** e.g. 28 Fire + 2 Light is legal if we allow that pair.  
- **Sideboard:** None in v1 (best-of-1 only).

---

## 10. Summary: Easy to Learn vs Hard to Master

| Easy to learn | Hard to master |
|---------------|----------------|
| One goal: reduce Hero to 0 | When to trade vs go face |
| Mana = turn number, cap 10 | Mana curve and sequencing |
| Play cards → Attack → Pass | Trap timing and bluffing |
| Creatures attack Hero or creature | Element resonance and multi-card turns |
| Few keywords, clear reminder text | Keyword stacking and combos |
| 2 elements per deck | Which pair and which 30 cards |

---

# First Release: Scope & Art Brief

**Release name:** **First Spark** (working title)  
**Goal:** One playable set, one game mode, full art for every card and core UI so you can start making art immediately.

---

## 11. First Release Content

### 11.1 Game Modes

- **Casual 1v1** — Unranked matchmaking (or invite/link).  
- **vs AI** — Single-player vs a simple AI (e.g. plays on curve, attacks, uses one obvious spell).  
- **No ranked, no draft, no alternate arts** in v1.

### 11.2 Set: “First Spark”

- **Total unique cards:** **60**.  
- **Breakdown by type:**  
  - Creatures: **30**  
  - Spells: **15**  
  - Traps: **15**  
- **Breakdown by element:** **10 cards per element** (each element has creatures, spells, and traps).  
- **Breakdown by rarity (suggested):**  
  - Common: **36** (e.g. 6 per element)  
  - Rare: **14** (e.g. 2–3 per element)  
  - Epic: **7** (e.g. 1 per element + 1 extra)  
  - Legendary: **3** (e.g. 1 in Fire, 1 in Water, 1 in Light or Shadow — iconic finishers).  

This supports 2-element decks (e.g. 15 Fire + 15 Air) with variety and clear rarities.

### 11.3 Card List (Conceptual Slots)

You can fill these with concrete names and effects; below is a **slot plan** for art and design.

**Fire (10):** 5 creatures, 3 spells, 2 traps.  
**Water (10):** 5 creatures, 3 spells, 2 traps.  
**Earth (10):** 5 creatures, 3 spells, 2 traps.  
**Air (10):** 5 creatures, 3 spells, 2 traps.  
**Shadow (10):** 5 creatures, 3 spells, 2 traps.  
**Light (10):** 5 creatures, 3 spells, 2 traps.  

**Rarity spread (example):**  
- Commons: mostly 1–3 cost, simple effects.  
- Rares: 3–5 cost, one keyword or clear synergy.  
- Epics: 4–6 cost, strong effect or two keywords.  
- Legendaries: 6–8 cost, big impact (board wipe, copy, huge body, etc.).

---

## 12. Complete Art Brief (First Release)

Everything an artist needs to produce assets for **First Spark**.

### 12.1 Card Art

- **Quantity:** **60 unique illustrations** (one per unique card).  
- **Format:** Same aspect ratio for all (e.g. **3:4** or **2:3** for portrait). Recommended **resolution:** e.g. **1200×1600 px** or **900×1200 px** at 72–150 DPI for web.  
- **Style:** Match **Arcana vibe** — dark, atmospheric, elemental. Avoid generic “AI slop”; distinctive lighting and palette per element (see Element Art Direction below).  
- **Content:** Each illustration should read at **small size** (thumbnail): one clear subject (creature, object, or moment). No tiny details that vanish at card size.  
- **Safe zone:** Important content within **~85%** of frame; edges may be cropped for frame/bleed.  
- **Consistency:** Agreed style guide (e.g. line weight, rendering style, color saturation) so all 60 feel like one set.

**Element art direction (short):**

- **Fire:** Warm palette (red, orange, amber); flames, magma, embers; aggressive, dynamic.  
- **Water:** Cool (blue, cyan, teal); waves, ice, deep sea; calm or ominous.  
- **Earth:** Browns, greens, stone; roots, rock, bark; heavy, grounded.  
- **Air:** Light blues, whites, greys; wind, feathers, lightning; speed, elevation.  
- **Shadow:** Purple, violet, black; silhouettes, fog, blades; stealth, dread.  
- **Light:** Gold, yellow, white; radiance, wings, judgment; hope, purity, or divine wrath.

### 12.2 Card Frames

- **Quantity:** **6 frame variants** (one per element). Each frame is a template: border + element accent (color/pattern) + zones for art, name, cost, text, stats.  
- **Sizes:** Same frame works for all card sizes in UI (sm/md/lg); one set of 6 is enough.  
- **Contents:** Border, cost circle, name bar, text box, attack/health areas for creatures. Trap frame can have a “face-down” version (e.g. same frame with a generic back or question mark).  
- **Format:** Layered (e.g. PSD/Figma) or exported PNG with transparency so the client can composite art behind.

### 12.3 Keyword Icons

- **Quantity:** **~10 icons** (one per keyword used in First Spark).  
- **List:** Swift, Shield, Stealth, Elusive, Freeze, Draw, Drain, Rally, Last Breath, (optional: Overwhelm).  
- **Format:** Simple, readable at **~24×24 px** and **~48×48 px**. SVG or PNG with transparency.  
- **Style:** Match UI — outline or flat; same stroke weight and corner style as the rest of the game.

### 12.4 Hero Avatars

- **Quantity:** **4** (2 per “side” — e.g. 2 default heroes for player, 2 for opponent, or 4 selectable).  
- **Format:** Portrait or bust, e.g. **256×256 px** or **512×512 px**. Used in lobby, HUD, and end screen.  
- **Style:** Same universe as card art; readable at small size.  
- **Optional:** Idle and “damaged” or “low HP” variant per hero (can be v2).

### 12.5 Board & Environment

- **Quantity:** **1 main board background** for the playmat (where cards and Hero sit).  
- **Format:** Wide aspect (e.g. **1920×1080** or **2560×1440**); tiling or single image.  
- **Content:** Atmospheric, non-distracting; subtle pattern or gradient that fits Arcana’s dark, elemental vibe.  
- **Optional:** Separate “your side” vs “opponent side” accents (e.g. different glow or tint). Can be one image with two zones.

### 12.6 UI Assets

- **Mana / resource:** Icon or orb for “current mana” (e.g. gem or crystal). **1–2 variants** (full, empty, or “+1 this turn”).  
- **Health:** Heart, life bar, or orb for Hero HP. **1 asset** (or a bar that stretches).  
- **Buttons:** Primary CTA (e.g. “Play”, “Attack”, “End Turn”), secondary, disabled. **3 states × 1–2 button types.**  
- **Panels:** Background for hand area, opponent hand placeholder, and maybe a “card zoom” panel. **2–3 panel styles.**  
- **Logo:** “Arcana” wordmark or logo for splash, nav, and loading. **1 asset.**

### 12.7 Art Summary Checklist

| Asset type        | Count   | Notes                          |
|-------------------|---------|--------------------------------|
| Card illustrations | 60      | One per unique card            |
| Card frames       | 6       | One per element               |
| Keyword icons     | ~10     | Swift, Shield, Stealth, …      |
| Hero avatars      | 4       | Default playable heroes       |
| Board background  | 1       | Main playmat                  |
| Mana/health orbs  | 1–2     | Resource/HP display           |
| Buttons           | 3–6     | States × types                |
| Panels            | 2–3     | Hand, zoom, etc.              |
| Logo              | 1       | Arcana wordmark/logo          |

---

## 13. Data & Copy for Artists

For each of the **60 cards**, provide (e.g. in a spreadsheet or JSON):

- **Card name**  
- **Element**  
- **Type** (creature / spell / trap)  
- **Rarity**  
- **Short art brief:** 1–3 sentences (subject, mood, key elements to include).  
- **Flavor text** (optional; can appear on card).  
- **Reminder:** Cost, attack/health if creature, and one-line effect so art supports the fantasy.

Example row:

| Name           | Element | Type    | Rarity   | Art brief                                           |
|----------------|---------|---------|----------|-----------------------------------------------------|
| Ember Whelp    | Fire    | Creature| Common   | Small dragon hatchling, flames, fierce; warm lighting. |
| Frozen Grasp  | Water   | Spell   | Rare     | Icy hand or tendril gripping a creature; cold, blue.   |

You can generate the full 60 from the slot plan above and existing seed names, then add new names for the remaining slots.

---

## 14. What Exists in Code Today

- **Schema:** Cards have `name`, `description`, `flavorText`, `cost`, `attack`, `health`, `type` (creature/spell/trap), `rarity`, `element`. No `keywords` array yet — keywords can be parsed from `description` or added as a new field later.  
- **Seed:** 15 starter cards (subset of the 60 above).  
- **UI:** Collection browser and filters; no game board or match flow yet.  

First release **gameplay** will need: matchmaking or “create game” link, game state (Hero HP, mana, board, hand, deck), turn logic, combat resolution, and trap/trigger system. Art can proceed in parallel with this doc and the **60-card list + art briefs**.

---

---

## Appendix A: Full 60-Card List (First Spark) — Names & Art Briefs

Use this table to brief artists. Each row = one card illustration. Cost, stats, and effect text are for design; art brief is for the artist.

### Fire (10 cards)

| # | Name | Type | Rarity | Art brief |
|---|------|------|--------|-----------|
| 1 | Ember Whelp | Creature | Common | Small dragon hatchling, flames, fierce; warm orange/amber lighting. |
| 2 | Cinder Pup | Creature | Common | Tiny fire-dog or elemental pup; sparks, playful but dangerous. |
| 3 | Flame Dancer | Creature | Common | Humanoid figure wreathed in fire, mid-motion; dance, embers. |
| 4 | Pyre Guard | Creature | Common | Armored figure with torch/shield; defensive, burning brazier. |
| 5 | Inferno Titan | Creature | Legendary | Huge humanoid of magma and flame; ground cracks, apocalyptic. |
| 6 | Arcane Bolt | Spell | Common | Bolt of fire/arcane energy striking a target; impact, sparks. |
| 7 | Scorch | Spell | Common | Wave of heat or single scorch mark; dry, red-orange. |
| 8 | Wildfire | Spell | Rare | Spreading flames across terrain; chaos, smoke, unstoppable. |
| 9 | Ember Trap | Trap | Common | Hidden coals or fuse about to ignite; ambush, ground-level. |
| 10 | Inferno Ward | Trap | Rare | Wall of flame rising to block; defensive, last stand. |

### Water (10 cards)

| # | Name | Type | Rarity | Art brief |
|---|------|------|--------|-----------|
| 11 | Tide Caller | Creature | Rare | Figure at shoreline, arms raised; waves responding, mystical. |
| 12 | Brook Sprite | Creature | Common | Small water spirit in a stream; bubbles, light, playful. |
| 13 | Frost Wisp | Creature | Common | Ghostly icy figure; cold mist, pale blue-white. |
| 14 | Coral Sentinel | Creature | Common | Creature of coral and shell; underwater, still, guarding. |
| 15 | Abyssal Leviathan | Creature | Epic | Massive sea creature in the deep; dark water, tentacles or scales, dread. |
| 16 | Frozen Grasp | Spell | Rare | Icy hand or tendril gripping a creature; cold, blue, immobilizing. |
| 17 | Tidal Surge | Spell | Common | Wave crashing toward viewer; foam, power, blue-green. |
| 18 | Deep Dive | Spell | Common | Figure or light plunging into dark water; mystery, depth. |
| 19 | Frostbite Trap | Trap | Common | Frozen ground or spikes under surface; ambush, winter. |
| 20 | Reflection Trap | Trap | Rare | Mirror-like water surface; duplicate, illusion. |

### Earth (10 cards)

| # | Name | Type | Rarity | Art brief |
|---|------|------|--------|-----------|
| 21 | Stone Sentinel | Creature | Common | Tall figure of living rock; ancient, moss, guardian. |
| 22 | Rootling | Creature | Common | Small creature of roots and leaves; forest floor, shy. |
| 23 | Boulderback | Creature | Common | Heavy creature with rocky shell; slow, immovable. |
| 24 | Vine Lasher | Creature | Common | Plant with whip-like vines; aggressive growth, green. |
| 25 | Ironbark Elder | Creature | Rare | Massive tree-person; bark, iron, wisdom. |
| 26 | Earth Spike | Spell | Common | Stone spike erupting from ground; brown, grey, sudden. |
| 27 | Fortify | Spell | Common | Shield of earth or bark forming; defensive, growth. |
| 28 | Quake | Spell | Rare | Ground cracking, rocks rising; chaos, dust. |
| 29 | Pitfall | Trap | Common | Hidden hole or soft earth; trapdoor, surprise. |
| 30 | Stonewall Trap | Trap | Rare | Wall of stone slamming down; block, last moment. |

### Air (10 cards)

| # | Name | Type | Rarity | Art brief |
|---|------|------|--------|-----------|
| 31 | Zephyr Scout | Creature | Common | Small winged creature or wind spirit; speed, feathers. |
| 32 | Cloud Drifter | Creature | Common | Figure floating on or in clouds; serene, high up. |
| 33 | Gust Rider | Creature | Common | Rider on a gust or bird; motion, hair/cloak flying. |
| 34 | Static Mite | Creature | Common | Tiny creature crackling with lightning; sparks, blue-white. |
| 35 | Storm Wyvern | Creature | Epic | Dragon-like creature in storm clouds; lightning, wings, epic. |
| 36 | Zephyr Strike | Spell | Common | Blade of wind or cutting gust; invisible force, impact. |
| 37 | Tailwind | Spell | Common | Wind at the back of a figure or ship; boost, speed. |
| 38 | Chain Lightning | Spell | Rare | Lightning jumping between points; electric, branching. |
| 39 | Gust Trap | Trap | Common | Sudden burst of wind from below or side; knockback, surprise. |
| 40 | Storm Front | Trap | Rare | Approaching wall of storm clouds; ominous, pressure. |

### Shadow (10 cards)

| # | Name | Type | Rarity | Art brief |
|---|------|------|--------|-----------|
| 41 | Shade Assassin | Creature | Rare | Silhouette with blade; darkness, one strike. |
| 42 | Whisper | Creature | Common | Half-visible figure in fog; eerie, listening. |
| 43 | Cursed Idol | Creature | Common | Small idol with dark aura; purple, cursed object. |
| 44 | Night Crawler | Creature | Common | Creature emerging from shadow; many legs or coils, dark. |
| 45 | Void Walker | Creature | Epic | Figure stepping out of a rift; black, purple, otherworldly. |
| 46 | Shadow Snare | Trap | Common | Nets or tendrils of shadow; entangle, trap. |
| 47 | Dark Pact | Spell | Common | Handshake or bond in darkness; pact, sacrifice. |
| 48 | Soul Siphon | Spell | Rare | Energy draining from one form to another; violet, life force. |
| 49 | Cloak Trap | Trap | Rare | Cloak dropping to reveal nothing; misdirection. |
| 50 | Mirror of Souls | Trap | Legendary | Mirror reflecting a soul or creature; duality, light and dark. |

### Light (10 cards)

| # | Name | Type | Rarity | Art brief |
|---|------|------|--------|-----------|
| 51 | Radiant Seraph | Creature | Epic | Angelic figure with wings of light; gold, hope, healing. |
| 52 | Sunward Page | Creature | Common | Young figure holding a sun symbol; devotion, bright. |
| 53 | Beacon Keeper | Creature | Common | Figure with lantern or beacon; guiding light, warm. |
| 54 | Dawn Strider | Creature | Common | Figure walking toward sunrise; silhouette, hope. |
| 55 | Pureheart | Creature | Rare | Figure with glowing heart or chest; purity, gold-white. |
| 56 | Celestial Judgment | Spell | Legendary | Divine light from above striking down; judgment, rays. |
| 57 | Heal | Spell | Common | Warm light washing over a wounded figure; restoration. |
| 58 | Purge | Spell | Rare | Light burning away darkness or corruption; cleansing. |
| 59 | Blessing Trap | Trap | Common | Hidden symbol that glows when triggered; protection. |
| 60 | Last Stand | Trap | Rare | Lone figure in light against encroaching dark; defiance. |

---

**End of document.** Use this for design reference and for briefing artists on **First Spark**. The appendix gives every card a name and art brief; adjust names or briefs as needed. Adjust set size (e.g. 60 → 80) or hero count as needed; keep the structure so “everything” for the first release is in one place.
