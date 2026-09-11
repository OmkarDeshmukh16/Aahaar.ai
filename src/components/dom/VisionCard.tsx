'use client'

import { motion } from 'framer-motion'
import { GlassCard } from '@/components/ui/GlassCard'
import { ScanLine, ShieldCheck, ShieldAlert } from 'lucide-react'

const ingredients = [
  { name: 'Turmeric', safe: true },
  { name: 'Black Pepper', safe: true },
  { name: 'Coconut Oil', safe: true },
  { name: 'Aspartame', safe: false },
  { name: 'Ashwagandha', safe: true },
  { name: 'MSG', safe: false },
]

export function VisionCard() {
  return (
    <div className="h-[100dvh] flex items-center justify-center px-4">
      <GlassCard className="max-w-xl w-full" delay={0.1}>
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-body text-[10px] tracking-[0.2em] uppercase text-emerald-500/80 mb-4 block"
        >
          Aahaar Vision
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4"
        >
          Smart Ingredient Scanner
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="font-body text-sm text-white/40 mb-8 leading-relaxed"
        >
          Point your camera at any grocery label. Aahaar Vision reads, parses, and
          cross-references every ingredient against your dietary profile in real time.
        </motion.p>

        {/* Mock scanner chip */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="relative p-4 rounded-xl bg-black/30 border border-white/[0.06] mb-6 overflow-hidden"
        >
          <div className="flex items-center gap-2 mb-3">
            <ScanLine className="w-4 h-4 text-emerald-500" />
            <span className="font-body text-xs tracking-wide text-white/50">
              SCANNING INGREDIENTS...
            </span>
          </div>

          {/* Animated scan line */}
          <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent animate-scan" />
        </motion.div>

        {/* Ingredient badges */}
        <div className="flex flex-wrap gap-2">
          {ingredients.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.5 + i * 0.08,
                duration: 0.4,
                ease: [0.34, 1.56, 0.64, 1],
              }}
              className={`
                inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-body
                border
                ${item.safe
                  ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                  : 'bg-red-500/10 border-red-500/20 text-red-400'
                }
              `}
            >
              {item.safe ? (
                <ShieldCheck className="w-3 h-3" />
              ) : (
                <ShieldAlert className="w-3 h-3" />
              )}
              {item.name}
            </motion.div>
          ))}
        </div>
      </GlassCard>
    </div>
  )
}
