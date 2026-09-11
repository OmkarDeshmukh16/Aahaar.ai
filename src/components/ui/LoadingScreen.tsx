'use client'

import { motion } from 'framer-motion'

/**
 * Branded loading screen displayed while the 3D canvas and assets preload.
 * Shows "AAHAAR AI" in the display font with an animated gold underline.
 */
export function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#09090b]">
      {/* Brand mark */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        className="flex flex-col items-center gap-4"
      >
        <h1 className="font-display text-3xl font-bold tracking-tighter text-white">
          AAHAAR AI
        </h1>

        {/* Animated underline */}
        <div className="relative w-24 h-0.5 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 w-1/3 bg-amber-500 rounded-full"
            animate={{
              x: ['-100%', '400%'],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>

        <p className="font-body text-xs tracking-widest uppercase text-white/40">
          Loading experience
        </p>
      </motion.div>
    </div>
  )
}
