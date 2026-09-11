'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Activity, Cpu, HeartPulse, RefreshCw, Smartphone, Zap } from 'lucide-react'

export function BiometricSection() {
  return (
    <section id="biometrics" className="relative py-20 lg:py-28 border-t border-white/[0.05]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Biometrics Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 relative order-2 lg:order-1"
          >
            <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-emerald-500/15 to-cyan-500/10 blur-2xl opacity-60" />
            <div className="relative overflow-hidden rounded-2xl border border-white/[0.12] bg-[#0c121e]/90 shadow-2xl">
              <Image
                src="/images/fitness-analytics.jpg"
                alt="Aahaar AI Wearable Biometric Sync and Metabolic Recovery Analytics"
                width={1400}
                height={1050}
                className="w-full h-auto object-cover rounded-xl"
              />
            </div>
          </motion.div>

          {/* Right Column: Copy & Insights */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-6 order-1 lg:order-2"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-medium text-emerald-300">
              <HeartPulse className="w-3.5 h-3.5 text-emerald-400" />
              <span>Adaptive Biometric Intelligence</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-[var(--font-display)] leading-tight">
              Synchronized to Your{' '}
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                Biological Clock.
              </span>
            </h2>

            <p className="text-base sm:text-lg text-neutral-300 font-light leading-relaxed">
              Your diet shouldn&apos;t be static when your days are dynamic. Aahaar AI ingests real-time biometrics from your wearable ecosystem to predict energy expenditure, insulin sensitivity, and post-workout protein synthesis windows.
            </p>

            <div className="space-y-4 pt-2">
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 transition-colors hover:border-white/[0.12]">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-emerald-500/15 p-2 text-emerald-400">
                    <Activity className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Metabolic Flexibility Mapping</h4>
                    <p className="text-xs text-neutral-400 mt-0.5">
                      Tracks fat oxidation vs carb oxidation efficiency throughout your active and resting hours.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 transition-colors hover:border-white/[0.12]">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-cyan-500/15 p-2 text-cyan-400">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Nutrient Timing Algorithm</h4>
                    <p className="text-xs text-neutral-400 mt-0.5">
                      Calculates optimal pre- and post-workout nutrient composition to maximize recovery and minimize inflammation.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 transition-colors hover:border-white/[0.12]">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-amber-500/15 p-2 text-amber-400">
                    <RefreshCw className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Universal Wearable Interoperability</h4>
                    <p className="text-xs text-neutral-400 mt-0.5">
                      Instant sync with Apple Health, WHOOP, Oura Ring, Garmin, and continuous glucose monitors (CGM).
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
