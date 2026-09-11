'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { WaitlistForm } from '@/components/ui/WaitlistForm'
import { Activity, ShieldCheck, Sparkles, Zap } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-12 pb-24 lg:pt-20 lg:pb-32">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-gradient-to-b from-emerald-500/15 via-teal-500/5 to-transparent blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-medium text-emerald-300 backdrop-blur-md shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Introducing Aahaar AI — Early Beta Access</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 max-w-4xl text-4xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl font-[var(--font-display)] leading-[1.08]"
          >
            Ancient Wisdom Meets{' '}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 bg-clip-text text-transparent">
              Algorithmic Nutrition.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 max-w-2xl text-base text-neutral-300 sm:text-lg lg:text-xl font-light leading-relaxed"
          >
            Say goodbye to exhausting calorie tracking. Simply point your camera to unlock real-time macro analysis, biological purity scores, and personalized 5,000-year Ayurvedic Dosha alignment.
          </motion.p>

          {/* Hero Waitlist Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 w-full max-w-md"
          >
            <WaitlistForm variant="hero" />
          </motion.div>

          {/* Social Proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-neutral-400"
          >
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                <span className="inline-block h-6 w-6 rounded-full ring-2 ring-[#06090e] bg-gradient-to-br from-emerald-400 to-teal-600 text-[10px] font-bold text-black flex items-center justify-center">
                  V
                </span>
                <span className="inline-block h-6 w-6 rounded-full ring-2 ring-[#06090e] bg-gradient-to-br from-amber-400 to-yellow-600 text-[10px] font-bold text-black flex items-center justify-center">
                  P
                </span>
                <span className="inline-block h-6 w-6 rounded-full ring-2 ring-[#06090e] bg-gradient-to-br from-cyan-400 to-blue-600 text-[10px] font-bold text-black flex items-center justify-center">
                  K
                </span>
              </div>
              <span>
                <strong className="text-white font-medium">1,420+</strong> pioneers in early queue
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="text-neutral-300">Zero Calorie Counting Fatigue</span>
            </div>
          </motion.div>

          {/* Hero Mockup Showcase */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="relative mt-14 w-full max-w-5xl"
          >
            {/* Glowing backdrop border */}
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-emerald-500/20 via-teal-500/10 to-amber-500/20 blur-xl opacity-75" />

            <div className="relative overflow-hidden rounded-2xl border border-white/[0.12] bg-[#0c121e]/80 shadow-2xl backdrop-blur-2xl">
              <Image
                src="/images/hero-app-mockup.jpg"
                alt="Aahaar AI Real-Time Food Scanner and Ayurvedic Nutrition Interface"
                width={1920}
                height={1080}
                priority
                className="w-full h-auto object-cover transform transition-transform duration-700 hover:scale-[1.01]"
              />

              {/* Floating Stat Chips */}
              <div className="absolute top-4 left-4 hidden sm:flex items-center gap-2 rounded-xl bg-black/60 border border-white/10 px-3.5 py-2 backdrop-blur-md text-xs text-white shadow-lg">
                <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-semibold text-emerald-300">Live AI Scanner:</span>
                <span className="text-neutral-300">99.4% Instant Dish Detection</span>
              </div>

              <div className="absolute bottom-4 right-4 hidden sm:flex items-center gap-3 rounded-xl bg-black/70 border border-amber-500/20 px-4 py-2.5 backdrop-blur-md text-xs text-white shadow-xl">
                <div className="p-1 rounded-md bg-amber-500/20 text-amber-400">
                  <Activity className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-amber-300">Pitta Rebalancing Meal</p>
                  <p className="text-[11px] text-neutral-400">Low Glycemic Index • Satvik Grade A</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
