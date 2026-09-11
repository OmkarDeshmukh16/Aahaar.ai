'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { GlassCard } from '@/components/ui/GlassCard'
import { Flame, Beef, Droplets, Wheat } from 'lucide-react'

interface AnimatedCounterProps {
  target: number
  suffix?: string
  duration?: number
}

function AnimatedCounter({ target, suffix = '', duration = 2000 }: AnimatedCounterProps) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!isInView || hasAnimated.current) return
    hasAnimated.current = true

    const startTime = performance.now()
    const step = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [isInView, target, duration])

  return (
    <span ref={ref} className="tabular-nums">
      {count.toLocaleString()}{suffix}
    </span>
  )
}

const stats = [
  { icon: Flame, label: 'Daily Target', value: 2847, suffix: ' kcal', color: 'text-amber-500' },
  { icon: Beef, label: 'Protein', value: 168, suffix: 'g', color: 'text-red-400' },
  { icon: Droplets, label: 'Fats', value: 78, suffix: 'g', color: 'text-blue-400' },
  { icon: Wheat, label: 'Carbs', value: 312, suffix: 'g', color: 'text-emerald-400' },
]

const features = [
  'Personalized macro targets based on your body composition',
  'Custom kitchen calibration — your recipes, your portions',
  'Region-aware ingredient database (Indian, Asian, Western)',
]

export function NutritionCard() {
  return (
    <div className="h-[100dvh] flex items-center justify-center px-4">
      <GlassCard className="max-w-xl w-full" delay={0.1}>
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-body text-[10px] tracking-[0.2em] uppercase text-amber-500/80 mb-4 block"
        >
          Target-Calculated Nutrition
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white mb-8"
        >
          Your Macro Engine
        </motion.h2>

        {/* Animated stat chips */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]"
            >
              <stat.icon className={`w-4 h-4 ${stat.color} flex-shrink-0`} />
              <div>
                <div className="font-display text-lg font-bold text-white">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="font-body text-[10px] tracking-wide uppercase text-white/30">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Feature bullets */}
        <div className="space-y-3">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 + i * 0.1, duration: 0.5 }}
              className="flex items-start gap-3"
            >
              <span className="w-1 h-1 mt-2 rounded-full bg-amber-500/60 flex-shrink-0" />
              <span className="font-body text-sm text-white/50 leading-relaxed">{feature}</span>
            </motion.div>
          ))}
        </div>
      </GlassCard>
    </div>
  )
}
