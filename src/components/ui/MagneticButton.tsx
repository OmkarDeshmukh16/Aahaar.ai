'use client'

import { useRef, useState, ReactNode, MouseEvent } from 'react'
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'
import { Check, Loader2 } from 'lucide-react'
import { ANIMATION } from '@/lib/constants'

interface MagneticButtonProps {
  children: ReactNode
  onClick?: () => void
  disabled?: boolean
  loading?: boolean
  success?: boolean
  className?: string
  type?: 'button' | 'submit'
}

export function MagneticButton({
  children,
  onClick,
  disabled = false,
  loading = false,
  success = false,
  className = '',
  type = 'button',
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: ANIMATION.cursorSpringStiffness, damping: ANIMATION.cursorSpringDamping })
  const springY = useSpring(y, { stiffness: ANIMATION.cursorSpringStiffness, damping: ANIMATION.cursorSpringDamping })

  const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
    if (!ref.current || disabled) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const deltaX = (e.clientX - centerX) / (rect.width / 2)
    const deltaY = (e.clientY - centerY) / (rect.height / 2)
    x.set(deltaX * ANIMATION.magneticRange)
    y.set(deltaY * ANIMATION.magneticRange)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    x.set(0)
    y.set(0)
  }

  return (
    <motion.button
      ref={ref}
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      whileTap={{ scale: 0.97 }}
      className={`
        relative overflow-hidden
        px-8 py-3.5
        rounded-xl
        font-body font-medium text-sm tracking-wide
        transition-colors duration-300
        disabled:opacity-50 disabled:cursor-not-allowed
        cursor-pointer
        ${success
          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
          : 'bg-amber-500/90 text-black hover:bg-amber-400 border border-amber-500/20'
        }
        ${className}
      `}
    >
      {/* Hover glow effect */}
      {isHovered && !disabled && (
        <motion.div
          className="absolute inset-0 bg-white/10 rounded-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        />
      )}

      <AnimatePresence mode="wait">
        {loading ? (
          <motion.span
            key="loading"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex items-center justify-center gap-2"
          >
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Joining...</span>
          </motion.span>
        ) : success ? (
          <motion.span
            key="success"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex items-center justify-center gap-2"
          >
            <Check className="w-4 h-4" />
            <span>You&apos;re In!</span>
          </motion.span>
        ) : (
          <motion.span
            key="default"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10"
          >
            {children}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  )
}
