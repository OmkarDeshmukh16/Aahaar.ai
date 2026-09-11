'use client'

import { motion } from 'framer-motion'
import { GlassCard } from '@/components/ui/GlassCard'
import { ScrollCue } from '@/components/ui/ScrollCue'

const TITLE = 'AAHAAR AI'

const letterVariants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      delay: 0.5 + i * 0.06,
      duration: 0.6,
      ease: [0.76, 0, 0.24, 1] as [number, number, number, number],
    },
  }),
}

const taglineVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 1.2,
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  },
}

export function HeroCard() {
  return (
    <div className="h-[100dvh] flex items-center justify-center px-4">
      <GlassCard className="max-w-2xl w-full text-center">
        {/* Status pill */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 mb-8 rounded-full border border-white/10 bg-white/[0.03]"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
          <span className="font-body text-[10px] tracking-[0.15em] uppercase text-white/50">
            Est. 2026 · Launching Soon
          </span>
        </motion.div>

        {/* Kinetic headline — letter-by-letter stagger reveal */}
        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white mb-6">
          {TITLE.split('').map((char, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={letterVariants}
              initial="hidden"
              animate="visible"
              className="inline-block"
              style={{ marginRight: char === ' ' ? '0.2em' : '0' }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </h1>

        {/* Tagline */}
        <motion.p
          variants={taglineVariants}
          initial="hidden"
          animate="visible"
          className="font-body text-sm sm:text-base tracking-[0.12em] uppercase text-white/40 mb-12"
        >
          Ancient Wisdom Meets Algorithmic Nutrition
        </motion.p>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
        >
          <ScrollCue />
        </motion.div>
      </GlassCard>
    </div>
  )
}
