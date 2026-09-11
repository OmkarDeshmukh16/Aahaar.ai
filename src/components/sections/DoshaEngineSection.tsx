'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Flame, Moon, Sparkles, Sun, Wind, Droplets } from 'lucide-react'

const DOSHA_PROFILES = [
  {
    id: 'pitta',
    name: 'Pitta (Fire & Water)',
    accent: 'from-amber-500/20 to-orange-500/10 border-amber-500/30 text-amber-300',
    icon: Flame,
    color: 'text-amber-400',
    summary: 'High internal metabolic heat and sharp digestive fire (Agni). Prone to acidity and systemic inflammation.',
    recommendations: 'Cooling, anti-inflammatory whole foods: cucumbers, melons, coconut water, coriander, and ghee.',
  },
  {
    id: 'vata',
    name: 'Vata (Air & Space)',
    accent: 'from-cyan-500/20 to-blue-500/10 border-cyan-500/30 text-cyan-300',
    icon: Wind,
    color: 'text-cyan-400',
    summary: 'Fast, variable metabolism prone to dry skin, digestive bloat, and nervous energy fluctuations.',
    recommendations: 'Warm, unctuous, grounding meals: slow-cooked stews, roasted sweet potatoes, sesame oil, and warming spices.',
  },
  {
    id: 'kapha',
    name: 'Kapha (Earth & Water)',
    accent: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/30 text-emerald-300',
    icon: Droplets,
    color: 'text-emerald-400',
    summary: 'Strong endurance and stable structure, but slower basal metabolic clearance and fluid retention.',
    recommendations: 'Light, astringent, pungent dishes: steamed cruciferous vegetables, ginger, black pepper, and high-fiber legumes.',
  },
]

export function DoshaEngineSection() {
  const [activeDosha, setActiveDosha] = useState(DOSHA_PROFILES[0].id)

  const selected = DOSHA_PROFILES.find((d) => d.id === activeDosha) || DOSHA_PROFILES[0]
  const Icon = selected.icon

  return (
    <section id="dosha" className="relative py-20 lg:py-28 bg-[#070b13]/50 border-t border-white/[0.05]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-medium text-amber-300">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ayurvedic Bio-Individuality Engine</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-[var(--font-display)]">
            5,000-Year Wisdom.{' '}
            <span className="bg-gradient-to-r from-amber-400 via-orange-300 to-emerald-400 bg-clip-text text-transparent">
              Re-Engineered by AI.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-neutral-300 font-light leading-relaxed">
            Generic macro calculations fail because your biology is unique. Aahaar AI dynamically harmonizes your metabolic constitution (Prakriti) with the sun&apos;s circadian cycle (Dinacharya).
          </p>
        </div>

        {/* Interactive Dosha Switcher */}
        <div className="mt-12 flex justify-center gap-3">
          {DOSHA_PROFILES.map((d) => {
            const active = activeDosha === d.id
            const BtnIcon = d.icon
            return (
              <button
                key={d.id}
                onClick={() => setActiveDosha(d.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                  active
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/60 shadow-lg shadow-amber-950/50'
                    : 'bg-white/[0.03] text-neutral-400 border border-white/[0.08] hover:text-white hover:bg-white/[0.06]'
                }`}
              >
                <BtnIcon className="w-4 h-4" />
                <span>{d.name.split(' ')[0]}</span>
              </button>
            )
          })}
        </div>

        {/* Selected Dosha Card */}
        <div className="mt-6 max-w-3xl mx-auto rounded-2xl border border-white/[0.08] bg-[#0c121e]/80 p-6 backdrop-blur-xl">
          <div className="flex items-start gap-4">
            <div className={`p-3 rounded-xl bg-white/[0.04] border border-white/[0.08] ${selected.color}`}>
              <Icon className="w-6 h-6" />
            </div>
            <div className="space-y-1.5 flex-grow">
              <h3 className="text-base font-semibold text-white">{selected.name}</h3>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">{selected.summary}</p>
              <p className="text-xs text-emerald-400 pt-1">
                <strong>AI Prescription:</strong> {selected.recommendations}
              </p>
            </div>
          </div>
        </div>

        {/* Dashboard Image Visual */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="relative mt-12 max-w-5xl mx-auto"
        >
          <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-amber-500/10 via-emerald-500/10 to-teal-500/10 blur-2xl opacity-60" />
          <div className="relative overflow-hidden rounded-2xl border border-white/[0.12] bg-[#0c121e]/90 shadow-2xl">
            <Image
              src="/images/dosha-dashboard.jpg"
              alt="Aahaar AI Ayurvedic Dosha Analysis and Circadian Nutrition Dashboard"
              width={1600}
              height={1200}
              className="w-full h-auto object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
