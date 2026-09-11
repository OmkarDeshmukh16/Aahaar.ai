'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { GlassCard } from '@/components/ui/GlassCard'
import { TrendingUp, Zap, RotateCcw } from 'lucide-react'

const features = [
  {
    icon: TrendingUp,
    title: 'Plateau Detection',
    desc: 'Spots metabolic adaptation before you feel it',
  },
  {
    icon: Zap,
    title: 'Auto-Adjust',
    desc: 'Recalibrates macros weekly based on your biometrics',
  },
  {
    icon: RotateCcw,
    title: 'Recovery Sync',
    desc: 'Integrates sleep & HRV data for rest-day nutrition',
  },
]

/**
 * SVG trend line that draws itself on scroll-in.
 */
function TrendLine() {
  const ref = useRef<SVGSVGElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })

  // Upward trend path
  const path = 'M 0 60 Q 20 55, 40 48 T 80 35 T 120 28 T 160 15 T 200 8'

  return (
    <svg
      ref={ref}
      viewBox="0 0 200 70"
      className="w-full h-16 mb-6"
      fill="none"
    >
      {/* Grid lines */}
      {[0, 1, 2, 3].map((i) => (
        <line
          key={i}
          x1="0"
          y1={i * 20 + 10}
          x2="200"
          y2={i * 20 + 10}
          stroke="rgba(255,255,255,0.04)"
          strokeWidth="0.5"
        />
      ))}

      {/* Gradient fill under the line */}
      <defs>
        <linearGradient id="trendGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
        </linearGradient>
      </defs>

      {isInView && (
        <>
          <motion.path
            d={`${path} L 200 70 L 0 70 Z`}
            fill="url(#trendGradient)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          />
          <motion.path
            d={path}
            stroke="#10b981"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1], delay: 0.3 }}
          />
          {/* End dot */}
          <motion.circle
            cx="200"
            cy="8"
            r="3"
            fill="#10b981"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.3 }}
          />
        </>
      )}
    </svg>
  )
}

export function FitnessCard() {
  return (
    <div className="min-h-[100dvh] flex items-center justify-center px-4 py-20">
      <GlassCard className="max-w-xl w-full" delay={0.1}>
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-body text-[10px] tracking-[0.2em] uppercase text-emerald-500/80 mb-4 block"
        >
          Continuous Recalibration
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white mb-2"
        >
          Adaptive Fitness
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="font-body text-sm text-white/40 mb-6 leading-relaxed"
        >
          Your nutrition plan evolves with you — never static, never stale.
        </motion.p>

        {/* SVG trend line */}
        <TrendLine />

        {/* Feature list */}
        <div className="space-y-4">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + i * 0.12, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              className="flex items-start gap-3"
            >
              <div className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.06] flex-shrink-0">
                <feature.icon className="w-4 h-4 text-emerald-500/70" />
              </div>
              <div>
                <div className="font-body text-sm font-medium text-white/80">{feature.title}</div>
                <div className="font-body text-xs text-white/30">{feature.desc}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </GlassCard>
    </div>
  )
}
