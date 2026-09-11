'use client'

import { createContext, useContext, ReactNode } from 'react'
import { useMediaQuery } from '@/hooks/useMediaQuery'

const ReducedMotionContext = createContext(false)

export function useReducedMotion(): boolean {
  return useContext(ReducedMotionContext)
}

export function ReducedMotionProvider({ children }: { children: ReactNode }) {
  const prefersReduced = useMediaQuery('(prefers-reduced-motion: reduce)')

  return (
    <ReducedMotionContext.Provider value={prefersReduced}>
      {children}
    </ReducedMotionContext.Provider>
  )
}
