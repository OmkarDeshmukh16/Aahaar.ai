'use client'

import { useState, useEffect } from 'react'

interface MobileDetectResult {
  /** True for phones/tablets (viewport ≤ 768px) */
  isMobile: boolean
  /** True for low-power devices (≤ 4 cores OR mobile viewport) */
  isLowPower: boolean
}

/**
 * Detects mobile/low-power devices for 3D scene simplification.
 *
 * Primary signal: viewport width ≤ 768px (via matchMedia).
 * Secondary signal: navigator.hardwareConcurrency ≤ 4 (low core count).
 *
 * DPR is deliberately NOT used — modern phones report DPR 2–3 (retina),
 * so dpr < 2 would miss them, while touchscreen laptops would false-positive.
 */
export function useMobileDetect(): MobileDetectResult {
  const [result, setResult] = useState<MobileDetectResult>({
    isMobile: false,
    isLowPower: false,
  })

  useEffect(() => {
    const mql = window.matchMedia('(max-width: 768px)')
    const cores = navigator.hardwareConcurrency || 4

    const update = () => {
      const mobile = mql.matches
      const lowPower = mobile || cores <= 4
      setResult({ isMobile: mobile, isLowPower: lowPower })
    }

    update()
    mql.addEventListener('change', update)
    return () => mql.removeEventListener('change', update)
  }, [])

  return result
}
