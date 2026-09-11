'use client'

import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

/**
 * Animated scroll indicator with looping bounce.
 * Positioned at the bottom of the hero card.
 */
export function ScrollCue() {
  return (
    <motion.div
      className="flex flex-col items-center gap-2 text-white/30"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2, duration: 1 }}
    >
      <span className="font-body text-[10px] tracking-[0.2em] uppercase">
        Scroll to explore
      </span>
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <ChevronDown className="w-5 h-5" />
      </motion.div>
    </motion.div>
  )
}
