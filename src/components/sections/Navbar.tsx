'use client'

import { Sparkles } from 'lucide-react'

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.06] bg-[#06090e]/75 backdrop-blur-xl transition-all">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-400/20 to-teal-500/20 border border-emerald-500/40 text-emerald-400 group-hover:border-emerald-400 transition-colors">
            <span className="font-bold text-sm">आ</span>
            <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400"></span>
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-base tracking-tight text-white font-[var(--font-display)]">
              AAHAAR<span className="text-emerald-400">.AI</span>
            </span>
            <span className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-[10px] font-medium tracking-wide text-emerald-300">
              BETA
            </span>
          </div>
        </a>

        {/* Navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-medium text-neutral-400">
          <a href="#vision" className="transition-colors hover:text-white">
            AI Vision Scanner
          </a>
          <a href="#dosha" className="transition-colors hover:text-white">
            Dosha Engine
          </a>
          <a href="#biometrics" className="transition-colors hover:text-white">
            Biometric Sync
          </a>
          <a href="#features" className="transition-colors hover:text-white">
            Capabilities
          </a>
        </nav>

        {/* Right CTA */}
        <div className="flex items-center gap-3">
          <a
            href="#waitlist"
            className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.06] hover:bg-emerald-500/20 border border-white/[0.12] hover:border-emerald-500/50 px-4 py-2 text-xs font-medium text-neutral-200 hover:text-emerald-300 transition-all shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Join Waitlist</span>
          </a>
        </div>
      </div>
    </header>
  )
}
