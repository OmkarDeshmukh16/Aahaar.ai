'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface DustParticlesProps {
  count?: number
  spread?: number
  size?: number
  color?: string
  opacity?: number
}

/**
 * Volumetric dust particles with sine-wave drift.
 * Used for atmospheric depth in Scene 1 and general background ambience.
 */
export function DustParticles({
  count = 200,
  spread = 5,
  size = 0.008,
  color = '#ffffff',
  opacity = 0.3,
}: DustParticlesProps) {
  const ref = useRef<THREE.Points>(null)

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * spread
      pos[i * 3 + 1] = (Math.random() - 0.5) * spread
      pos[i * 3 + 2] = (Math.random() - 0.5) * spread
    }
    return pos
  }, [count, spread])

  // Store initial positions for drift calculation
  const initialPositions = useMemo(() => new Float32Array(positions), [positions])

  useFrame((state) => {
    if (!ref.current) return
    const geo = ref.current.geometry
    const pos = geo.attributes.position.array as Float32Array
    const t = state.clock.elapsedTime

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      // Gentle sine-wave drift
      pos[i3] = initialPositions[i3] + Math.sin(t * 0.3 + i * 0.5) * 0.02
      pos[i3 + 1] = initialPositions[i3 + 1] + Math.sin(t * 0.2 + i * 0.3) * 0.03
      pos[i3 + 2] = initialPositions[i3 + 2] + Math.cos(t * 0.25 + i * 0.4) * 0.02
    }
    geo.attributes.position.needsUpdate = true
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
        />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        color={color}
        transparent
        opacity={opacity}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

interface StreamParticlesProps {
  count?: number
  color?: string
  targetPosition?: [number, number, number]
  spread?: number
  speed?: number
}

/**
 * Streaming particles that converge toward a target point.
 * Used for nutrient absorption streams in Scene 3.
 */
export function StreamParticles({
  count = 60,
  color = '#10b981',
  targetPosition = [0, 0, 0],
  spread = 4,
  speed = 0.5,
}: StreamParticlesProps) {
  const ref = useRef<THREE.Points>(null)

  const { positions, velocities } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const vel = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      // Random start positions in a sphere around the target
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = spread * (0.5 + Math.random() * 0.5)
      pos[i * 3] = targetPosition[0] + r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = targetPosition[1] + r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = targetPosition[2] + r * Math.cos(phi)

      // Random phase offset for varied timing
      vel[i * 3] = Math.random()
      vel[i * 3 + 1] = Math.random() * 0.5 + 0.5 // speed multiplier
      vel[i * 3 + 2] = 0
    }
    return { positions: pos, velocities: vel }
  }, [count, spread, targetPosition])

  const initialPositions = useMemo(() => new Float32Array(positions), [positions])

  useFrame((state) => {
    if (!ref.current) return
    const geo = ref.current.geometry
    const pos = geo.attributes.position.array as Float32Array
    const t = state.clock.elapsedTime

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      const phase = velocities[i3]
      const spd = velocities[i3 + 1]

      // Oscillating convergence — particles pulse inward and reset
      const progress = ((t * speed * spd + phase) % 1)
      const ease = 1 - Math.pow(1 - progress, 2) // ease-out

      pos[i3] = THREE.MathUtils.lerp(initialPositions[i3], targetPosition[0], ease)
      pos[i3 + 1] = THREE.MathUtils.lerp(initialPositions[i3 + 1], targetPosition[1], ease)
      pos[i3 + 2] = THREE.MathUtils.lerp(initialPositions[i3 + 2], targetPosition[2], ease)
    }
    geo.attributes.position.needsUpdate = true
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color={color}
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}
