'use client'

import { motion } from 'framer-motion'
import { WaitlistForm } from '@/components/ui/WaitlistForm'
import { Crown, Sparkles, Star, Users } from 'lucide-react'

export function WaitlistSection() {
  return (
    <section id="waitlist" className="relative py-20 lg:py-32 border-t border-white/[0.05] overflow-hidden">
      {/* Background Glow */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 h-[450px] w-[800px] rounded-full bg-gradient-to-t from-emerald-500/15 via-teal-500/5 to-transparent blur-3xl" />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative">
        <div className="relative rounded-3xl border border-white/[0.12] bg-[#0c121e]/90 p-8 sm:p-12 backdrop-blur-2xl shadow-2xl">
          {/* Subtle top border glow */}
          <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent" />

          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1 text-xs font-medium text-emerald-300">
              <Crown className="w-3.5 h-3.5 text-amber-400" />
              <span>Founding Pioneer Early Access</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white font-[var(--font-display)]">
              Step Into the Future of{' '}
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 bg-clip-text text-transparent">
                Human Nourishment.
              </span>
            </h2>

            <p className="max-w-xl mx-auto text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
              We are rolling out private beta cohorts sequentially to ensure dedicated compute resources for real-time vision inference. Secure your spot below.
            </p>
          </div>

          {/* Form */}
          <div className="mt-8 max-w-xl mx-auto">
            <WaitlistForm variant="detailed" />
          </div>

          {/* Pioneer Perks */}
          <div className="mt-12 pt-8 border-t border-white/[0.08] grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
                <Star className="w-3.5 h-3.5 text-amber-400" />
                <span>Founding Member Rate</span>
              </div>
              <p className="text-xs text-neutral-400">
                Guaranteed lock-in on lowest tier pricing for life upon official launch.
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>Beta Feature Access</span>
              </div>
              <p className="text-xs text-neutral-400">
                Immediate access to experimental neural vision and circadian sleep sync algorithms.
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
                <Users className="w-3.5 h-3.5 text-teal-400" />
                <span>Direct Product Input</span>
              </div>
              <p className="text-xs text-neutral-400">
                Exclusive community channel with Aahaar AI engineers and Ayurvedic nutritionists.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
