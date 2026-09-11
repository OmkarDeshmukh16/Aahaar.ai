'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { EASING } from '@/lib/constants'

interface GlassCardProps {
  children: ReactNode
  className?: string
  delay?: number
}

export function GlassCard({ children, className = '', delay = 0 }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.8,
        delay,
        ease: EASING.cinematic,
      }}
      className={`
        relative
        backdrop-blur-md
        bg-white/[0.03]
        border border-white/10
        shadow-[0_8px_32px_rgba(0,0,0,0.4)]
        rounded-2xl
        p-8
        ${className}
      `}
    >
      {children}
    </motion.div>
  )
}
