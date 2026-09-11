'use client'

import { HeroCard } from './HeroCard'
import { NutritionCard } from './NutritionCard'
import { VisionCard } from './VisionCard'
import { FitnessCard } from './FitnessCard'
import { WaitlistCard } from './WaitlistCard'

/**
 * DOM overlay — all 5 cards positioned to align with 3D scene milestones.
 * Rendered inside <Scroll html> from drei, so positions are relative
 * to the scroll pages (4 pages total).
 */
export function Overlay() {
  return (
    <div className="w-full">
      {/* Card 1 — Hero (Page 1, 0–25%) */}
      <HeroCard />

      {/* Card 2 — Nutrition (Page 2, 25–50%) */}
      <NutritionCard />

      {/* Card 3 — Vision (Page 3, 50–75%) */}
      <VisionCard />

      {/* Card 4 — Fitness (between pages 3–4) */}
      <FitnessCard />

      {/* Card 5 — Waitlist (Page 4, 75–100%) */}
      <WaitlistCard />
    </div>
  )
}
