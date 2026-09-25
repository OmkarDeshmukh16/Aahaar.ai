'use client'

import { motion } from 'framer-motion'
import { Brain, Clock, LineChart, ShieldCheck, Sparkles } from 'lucide-react'

const BENTO_CARDS = [
  {
    title: 'Multimodal Food Decomposition',
    badge: 'Neural Vision v2',
    description:
      'Trained on over 2.4 million culinary preparations. Decomposes composite dishes, gravies, and mixed salads into discrete raw ingredients with precise gram-weight approximations.',
    stat: '99.4%',
    statLabel: 'Ingredient Detection Accuracy',
    icon: Brain,
    accent: 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10',
  },
  {
    title: 'Circadian Dinacharya Timing',
    badge: 'Chronobiology',
    description:
      'Aligns your heavy macronutrient intake with solar noon when Jatharagni (digestive fire) is naturally strongest, preserving cellular energy and deep sleep architecture.',
    stat: '4.2x',
    statLabel: 'Enhanced Digestive Efficiency',
    icon: Clock,
    accent: 'border-amber-500/30 text-amber-400 bg-amber-500/10',
  },
  {
    title: 'Additive & Seed Oil Sentry',
    badge: 'Purity Guard',
    description:
      'Identifies hidden chemical emulsifiers, inflammatory industrial seed oils (canola, soybean, cottonseed), and synthetic colorings before they enter your pantry.',
    stat: '100%',
    statLabel: 'Ingredient Transparency',
    icon: ShieldCheck,
    accent: 'border-teal-500/30 text-teal-400 bg-teal-500/10',
  },
  {
    title: 'Dynamic Biometric Macro Scaling',
    badge: 'Autonomous AI',
    description:
      'Unlike rigid apps that set fixed calorie numbers, Aahaar dynamically shifts your macro splits daily based on real-time sleep depth, HRV, and active muscular strain.',
    stat: '+38%',
    statLabel: 'Greater Long-Term Adherence',
    icon: LineChart,
    accent: 'border-cyan-500/30 text-cyan-400 bg-cyan-500/10',
  },
]

export function BentoSection() {
  return (
    <section id="features" className="relative w-full py-28 sm:py-36 bg-[#070b13]/60 border-t border-white/[0.06] flex flex-col items-center">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-medium text-emerald-300 mx-auto">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Engineered for Peak Performance</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-[var(--font-display)]">
            The Architecture of{' '}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 bg-clip-text text-transparent">
              Intelligent Nutrition.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-neutral-300 font-light leading-relaxed">
            Every feature is crafted to eliminate mental friction, automate data collection, and deliver clinical dietary personalization.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl mx-auto">
          {BENTO_CARDS.map((card, idx) => {
            const CardIcon = card.icon
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0c121e]/80 p-8 backdrop-blur-xl transition-all duration-300 hover:border-white/[0.18] hover:bg-[#0c121e]/95 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div className={`p-3 rounded-xl border ${card.accent}`}>
                      <CardIcon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-semibold tracking-wider uppercase text-neutral-400 border border-white/[0.08] rounded-full px-3 py-1 bg-white/[0.02]">
                      {card.badge}
                    </span>
                  </div>

                  <h3 className="mt-6 text-xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                    {card.title}
                  </h3>

                  <p className="mt-3 text-sm text-neutral-300 leading-relaxed font-light">
                    {card.description}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-white/[0.06] flex items-baseline gap-2">
                  <span className="text-2xl sm:text-3xl font-extrabold text-white font-[var(--font-display)]">
                    {card.stat}
                  </span>
                  <span className="text-xs text-neutral-400">{card.statLabel}</span>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
