'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Eye, Gauge, ShieldAlert, Zap } from 'lucide-react'

export function VisionScannerSection() {
  return (
    <section id="vision" className="relative w-full py-28 sm:py-36 border-t border-white/[0.06] flex flex-col items-center">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center w-full">
          {/* Left Column: Copy & Feature Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-6 flex flex-col justify-center"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-500/10 px-3.5 py-1 text-xs font-medium text-teal-300 w-fit">
              <Eye className="w-3.5 h-3.5" />
              <span>Real-Time Plate & Grocery Vision</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-[var(--font-display)] leading-tight">
              Molecular Truth in Under{' '}
              <span className="bg-gradient-to-r from-teal-400 to-emerald-300 bg-clip-text text-transparent">
                200 Milliseconds.
              </span>
            </h2>

            <p className="text-base sm:text-lg text-neutral-300 font-light leading-relaxed">
              No barcodes required. Aahaar AI&apos;s multimodal vision model dissects homemade meals, packaged groceries, and restaurant dishes into molecular components, calculating exact macronutrients and purity ratings instantly.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3.5 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 transition-colors hover:border-white/[0.12] hover:bg-white/[0.04]">
                <div className="rounded-lg bg-emerald-500/15 p-2 text-emerald-400 flex-shrink-0">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Sub-Second Multi-Ingredient Detection</h4>
                  <p className="text-xs text-neutral-400 mt-0.5 leading-relaxed">
                    Recognizes overlapping foods, hidden oils, seed oils, and marinades with 98%+ precision.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 transition-colors hover:border-white/[0.12] hover:bg-white/[0.04]">
                <div className="rounded-lg bg-amber-500/15 p-2 text-amber-400 flex-shrink-0">
                  <Gauge className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Glycemic Index & Spike Predictor</h4>
                  <p className="text-xs text-neutral-400 mt-0.5 leading-relaxed">
                    Forecasts post-prandial blood sugar response based on fiber-to-carb ratios and meal sequencing.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 transition-colors hover:border-white/[0.12] hover:bg-white/[0.04]">
                <div className="rounded-lg bg-teal-500/15 p-2 text-teal-400 flex-shrink-0">
                  <ShieldAlert className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Micro-Toxin & Ultra-Processed Flags</h4>
                  <p className="text-xs text-neutral-400 mt-0.5 leading-relaxed">
                    Automated screening for synthetic emulsifiers, microplastics, high fructose syrups, and bio-contaminants.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Visual UI Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-7 relative flex justify-center items-center w-full"
          >
            <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-teal-500/15 to-emerald-500/10 blur-2xl opacity-60" />
            <div className="relative w-full overflow-hidden rounded-2xl border border-white/[0.12] bg-[#0c121e]/90 shadow-2xl">
              <Image
                src="/images/vision-scanner.jpg"
                alt="Aahaar AI Vision Sensor and Purity Score Dashboard"
                width={1400}
                height={1050}
                className="w-full h-auto object-cover rounded-xl"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
