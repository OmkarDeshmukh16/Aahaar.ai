'use client'

import { useState, useEffect } from 'react'

/**
 * Generic media query hook.
 * Returns true when the media query matches, false otherwise.
 * SSR-safe: returns false during server render.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const mql = window.matchMedia(query)
    setMatches(mql.matches)

    const handler = (e: MediaQueryListEvent) => setMatches(e.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [query])

  return matches
}
