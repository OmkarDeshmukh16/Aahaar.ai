'use client'

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-[#05070b] py-12 text-neutral-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-bold text-xs">
              आ
            </div>
            <span className="font-bold text-sm tracking-tight text-white font-[var(--font-display)]">
              AAHAAR<span className="text-emerald-400">.AI</span>
            </span>
            <span className="text-xs text-neutral-500 ml-2 hidden sm:inline">
              — Ancient Wisdom Meets Algorithmic Nutrition.
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs text-neutral-400">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Systems Operational</span>
            <span className="mx-2 text-neutral-600">•</span>
            <span>Beta Batch 1 Enrolling</span>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
          <p>© {new Date().getFullYear()} Aahaar AI Inc. All rights reserved.</p>
          <p className="max-w-md text-center sm:text-right">
            Disclaimer: Aahaar AI provides algorithmic lifestyle insights and nutritional guidance, not medical diagnoses.
          </p>
        </div>
      </div>
    </footer>
  )
}
