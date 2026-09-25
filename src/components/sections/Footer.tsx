'use client'

export function Footer() {
  return (
    <footer className="w-full border-t border-white/[0.06] bg-[#05070b] py-16 sm:py-20 text-neutral-400 flex flex-col items-center">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-bold text-xs">
              आ
            </div>
            <span className="font-bold text-base tracking-tight text-white font-[var(--font-display)]">
              AAHAAR<span className="text-emerald-400">.AI</span>
            </span>
            <span className="text-xs text-neutral-500 ml-2 hidden sm:inline">
              — Ancient Wisdom Meets Algorithmic Nutrition.
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs text-neutral-400">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-neutral-300 font-medium">Systems Operational</span>
            <span className="mx-2 text-neutral-600">•</span>
            <span>Beta Cohort 1 Enrolling</span>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© {new Date().getFullYear()} Aahaar AI Inc. All rights reserved.</p>
          <p className="max-w-md text-center sm:text-right leading-relaxed">
            Disclaimer: Aahaar AI provides algorithmic lifestyle insights and nutritional guidance, not medical diagnoses.
          </p>
        </div>
      </div>
    </footer>
  )
}
