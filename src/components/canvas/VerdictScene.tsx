'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { useScroll } from '@react-three/drei'
import * as THREE from 'three'
import { StreamParticles } from './Particles'
import { SCENE_RANGES, COLORS } from '@/lib/constants'

interface VerdictSceneProps {
  isMobile: boolean
}

/**
 * Scene 3 — The Verdict (48–78%)
 * Stylized primitive torso with glassmorphic material (desktop) or wireframe + Fresnel (mobile).
 * Emerald nutrient streams converge inward. Red laser scan-line sweeps and rejects particles.
 */
export function VerdictScene({ isMobile }: VerdictSceneProps) {
  const groupRef = useRef<THREE.Group>(null)
  const scanLineRef = useRef<THREE.Mesh>(null)
  const rejectedRef = useRef<THREE.Points>(null)
  const scroll = useScroll()

  // Torso — primitive composition
  const torsoMaterial = useMemo(() => {
    if (isMobile) {
      // Mobile: simple wireframe + emissive
      return new THREE.MeshStandardMaterial({
        color: COLORS.emerald,
        wireframe: true,
        transparent: true,
        opacity: 0.2,
        emissive: COLORS.emerald,
        emissiveIntensity: 0.3,
      })
    }
    // Desktop: translucent glass-like material
    return new THREE.MeshPhysicalMaterial({
      color: COLORS.emerald,
      transparent: true,
      opacity: 0.12,
      roughness: 0.1,
      metalness: 0.0,
      transmission: 0.8,
      thickness: 0.5,
      wireframe: false,
      side: THREE.DoubleSide,
    })
  }, [isMobile])

  // Scan line material (red emissive)
  const scanMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: COLORS.destructive,
        transparent: true,
        opacity: 0.8,
        side: THREE.DoubleSide,
      }),
    []
  )

  // Rejected particles
  const rejectedCount = isMobile ? 15 : 30
  const rejectedData = useMemo(() => {
    const pos = new Float32Array(rejectedCount * 3)
    const vel = new Float32Array(rejectedCount * 3)
    for (let i = 0; i < rejectedCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 2
      pos[i * 3 + 1] = 0
      pos[i * 3 + 2] = (Math.random() - 0.5) * 1
      vel[i * 3] = (Math.random() - 0.5) * 2
      vel[i * 3 + 1] = Math.random() * 2 + 1
      vel[i * 3 + 2] = (Math.random() - 0.5) * 2
    }
    return { positions: pos, velocities: vel }
  }, [rejectedCount])

  const rejectedInitial = useMemo(
    () => new Float32Array(rejectedData.positions),
    [rejectedData.positions]
  )

  useFrame((state, delta) => {
    if (!groupRef.current) return

    const offset = scroll.offset
    const { start, end, fadeIn, fadeOut } = SCENE_RANGES.verdict

    // Visibility
    let opacity = 0
    if (offset >= fadeIn && offset <= fadeOut) opacity = 1
    if (offset >= start && offset < fadeIn + 0.05) {
      opacity = (offset - start) / 0.05
    }
    if (offset > fadeOut && offset <= end) {
      opacity = 1 - (offset - fadeOut) / (end - fadeOut)
    }
    opacity = THREE.MathUtils.clamp(opacity, 0, 1)

    groupRef.current.visible = opacity > 0.01
    if (!groupRef.current.visible) return

    const sceneProgress = THREE.MathUtils.clamp(
      (offset - start) / (end - start),
      0,
      1
    )

    // Update torso opacity
    if (torsoMaterial instanceof THREE.MeshPhysicalMaterial || torsoMaterial instanceof THREE.MeshStandardMaterial) {
      torsoMaterial.opacity = (isMobile ? 0.2 : 0.12) * opacity
    }

    // Scan line sweep (Y position keyed to scroll)
    if (scanLineRef.current) {
      const scanY = THREE.MathUtils.lerp(2.5, -2.5, sceneProgress)
      scanLineRef.current.position.y = scanY
      scanMaterial.opacity = 0.7 * opacity

      // Pulse the scan line width
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 8) * 0.1
      scanLineRef.current.scale.set(pulse, 1, 1)
    }

    // Rejected particles — deflect away from scan line
    if (rejectedRef.current) {
      const pos = rejectedRef.current.geometry.attributes.position.array as Float32Array
      const t = state.clock.elapsedTime

      for (let i = 0; i < rejectedCount; i++) {
        const i3 = i * 3
        const phase = i * 0.3
        const burst = (Math.sin(t * 1.5 + phase) * 0.5 + 0.5)

        pos[i3] = rejectedInitial[i3] + rejectedData.velocities[i3] * burst
        pos[i3 + 1] = rejectedData.velocities[i3 + 1] * burst * 0.5
        pos[i3 + 2] = rejectedInitial[i3 + 2] + rejectedData.velocities[i3 + 2] * burst
      }
      rejectedRef.current.geometry.attributes.position.needsUpdate = true;

      (rejectedRef.current.material as THREE.PointsMaterial).opacity =
        opacity * sceneProgress * 0.8
    }

    // Slow rotation of the entire group
    groupRef.current.rotation.y += delta * 0.05
    groupRef.current.scale.setScalar(THREE.MathUtils.lerp(0.9, 1, opacity))
  })

  return (
    <group ref={groupRef}>
      {/* Lighting */}
      <pointLight position={[3, 2, 3]} color={COLORS.emerald} intensity={0.8} />
      <pointLight position={[-2, -1, 2]} color={COLORS.destructive} intensity={0.3} />
      <ambientLight intensity={0.15} />

      {/* Primitive torso */}
      <group>
        {/* Main body capsule */}
        <mesh material={torsoMaterial} position={[0, 0, 0]}>
          <capsuleGeometry args={[0.5, 1.5, 16, 32]} />
        </mesh>
        {/* Left shoulder */}
        <mesh material={torsoMaterial} position={[-0.8, 0.6, 0]}>
          <sphereGeometry args={[0.25, 16, 16]} />
        </mesh>
        {/* Right shoulder */}
        <mesh material={torsoMaterial} position={[0.8, 0.6, 0]}>
          <sphereGeometry args={[0.25, 16, 16]} />
        </mesh>
        {/* Rib outline segments */}
        {[-0.2, 0, 0.2, 0.4].map((y, i) => (
          <mesh key={i} material={torsoMaterial} position={[0, y, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.02, 0.02, 1.0 - Math.abs(y) * 0.5, 8]} />
          </mesh>
        ))}
      </group>

      {/* Red scan line */}
      <mesh ref={scanLineRef} position={[0, 0, 0]}>
        <planeGeometry args={[4, 0.02]} />
        <primitive object={scanMaterial} attach="material" />
      </mesh>

      {/* Scan grid lines (static red grid) */}
      {[-0.8, -0.4, 0, 0.4, 0.8].map((x, i) => (
        <mesh key={`grid-${i}`} position={[x, 0, 0.01]}>
          <planeGeometry args={[0.005, 5]} />
          <meshBasicMaterial color={COLORS.destructive} transparent opacity={0.08} />
        </mesh>
      ))}

      {/* Emerald nutrient streams */}
      <StreamParticles
        count={isMobile ? 30 : 60}
        color={COLORS.emerald}
        targetPosition={[0, 0, 0]}
        spread={3.5}
        speed={0.4}
      />

      {/* Rejected particles (red) */}
      <points ref={rejectedRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[rejectedData.positions, 3]}
            count={rejectedCount}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.04}
          color={COLORS.destructive}
          transparent
          opacity={0}
          sizeAttenuation
          depthWrite={false}
        />
      </points>
    </group>
  )
}
