'use client'

import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useMediaQuery } from '@/hooks/useMediaQuery'

/**
 * Custom cursor: small dot + trailing ring.
 * Desktop only — hidden on touch/coarse-pointer devices.
 * Ring scales and changes color on interactive element hover.
 */
export function CustomCursor() {
  const isTouch = useMediaQuery('(pointer: coarse)')
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const springX = useSpring(cursorX, { stiffness: 150, damping: 15 })
  const springY = useSpring(cursorY, { stiffness: 150, damping: 15 })

  const isHovering = useRef(false)
  const ringScale = useMotionValue(1)
  const springScale = useSpring(ringScale, { stiffness: 300, damping: 20 })

  useEffect(() => {
    if (isTouch) return

    const handleMove = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const interactive = target.closest('button, a, input, [data-cursor-hover]')
      if (interactive && !isHovering.current) {
        isHovering.current = true
        ringScale.set(1.5)
      }
    }

    const handleOut = (e: MouseEvent) => {
      const target = e.relatedTarget as HTMLElement | null
      const interactive = target?.closest('button, a, input, [data-cursor-hover]')
      if (!interactive && isHovering.current) {
        isHovering.current = false
        ringScale.set(1)
      }
    }

    window.addEventListener('mousemove', handleMove)
    document.addEventListener('mouseover', handleOver)
    document.addEventListener('mouseout', handleOut)

    return () => {
      window.removeEventListener('mousemove', handleMove)
      document.removeEventListener('mouseover', handleOver)
      document.removeEventListener('mouseout', handleOut)
    }
  }, [isTouch, cursorX, cursorY, ringScale])

  if (isTouch) return null

  return (
    <>
      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-white rounded-full pointer-events-none z-[10000] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-white/40 rounded-full pointer-events-none z-[10000] mix-blend-difference"
        style={{
          x: springX,
          y: springY,
          scale: springScale,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
    </>
  )
}
