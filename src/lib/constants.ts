'use client'

// ─── Color Palette ──────────────────────────────────────────────
export const COLORS = {
  void: '#09090b',
  voidDeep: '#0c0c0f',
  gold: '#f59e0b',
  emerald: '#10b981',
  destructive: '#ef4444',
  white: '#ffffff',
  warmWhite: '#fff5e6',
  coolBlue: '#e6f0ff',
  ceramic: '#f5f0e8',
} as const

// ─── Scene Scroll Ranges ────────────────────────────────────────
// Each scene has a [start, end] normalized to 0–1 scroll progress
// Overlap zones enable cross-fade between scenes
export const SCENE_RANGES = {
  seed: { start: 0, end: 0.27, fadeIn: 0, fadeOut: 0.22 },
  awakening: { start: 0.23, end: 0.53, fadeIn: 0.23, fadeOut: 0.48 },
  verdict: { start: 0.48, end: 0.78, fadeIn: 0.48, fadeOut: 0.73 },
  result: { start: 0.73, end: 1.0, fadeIn: 0.73, fadeOut: 1.0 },
} as const

// ─── Easing Curves ──────────────────────────────────────────────
export const EASING = {
  smooth: [0.25, 0.1, 0.25, 1.0] as const,
  snappy: [0.4, 0.0, 0.2, 1.0] as const,
  bounce: [0.34, 1.56, 0.64, 1.0] as const,
  cinematic: [0.76, 0.0, 0.24, 1.0] as const,
} as const

// ─── Animation Config ───────────────────────────────────────────
export const ANIMATION = {
  staggerDelay: 0.05,
  cardEnterDuration: 0.8,
  cardExitDuration: 0.4,
  letterRevealDuration: 0.6,
  counterDuration: 2000, // ms for stat counters
  magneticRange: 8, // px max offset for magnetic button
  cursorSpringStiffness: 150,
  cursorSpringDamping: 15,
} as const

// ─── 3D Scene Config ────────────────────────────────────────────
export const SCENE_CONFIG = {
  camera: { position: [0, 0, 5] as const, fov: 45 },
  scrollPages: 4,
  scrollDamping: 0.15,
  dprRange: [1, 1.5] as [number, number],
  mobileDprCap: 1.0,
  particleCount: { desktop: 200, mobile: 100 },
  bloom: { threshold: 0.8, intensity: 0.4, luminanceSmoothing: 0.9 },
  vignette: { darkness: 0.5, offset: 0.5 },
  noise: { opacity: 0.04 },
} as const

// ─── Lighting Rig ───────────────────────────────────────────────
export const LIGHTING = {
  key: {
    position: [2, 3, 4] as const,
    color: COLORS.warmWhite,
    intensity: 1.2,
  },
  fill: {
    position: [-3, 1, 2] as const,
    color: COLORS.coolBlue,
    intensity: 0.5,
  },
  rim: {
    position: [0, 1, -3] as const,
    color: COLORS.gold,
    intensity: 0.8,
  },
  ambient: {
    intensity: 0.15,
  },
} as const
