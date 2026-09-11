'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { useScroll } from '@react-three/drei'
import * as THREE from 'three'
import { DustParticles } from './Particles'
import { SCENE_RANGES, COLORS, LIGHTING } from '@/lib/constants'

interface SeedSceneProps {
  isMobile: boolean
}

/**
 * Scene 1 — The Seed (0–27%)
 * Floating ceramic egg with 3-point lighting, gold rim, cursor parallax, dust particles.
 */
export function SeedScene({ isMobile }: SeedSceneProps) {
  const groupRef = useRef<THREE.Group>(null)
  const eggRef = useRef<THREE.Mesh>(null)
  const rimRef = useRef<THREE.Mesh>(null)
  const scroll = useScroll()

  // Target rotation for cursor-driven parallax
  const targetRotation = useRef({ x: 0, y: 0 })

  // Egg geometry (sphere stretched on Y for egg shape)
  const eggGeometry = useMemo(() => {
    const geo = new THREE.SphereGeometry(1, 64, 64)
    // Stretch Y for egg shape
    const positions = geo.attributes.position.array as Float32Array
    for (let i = 0; i < positions.length; i += 3) {
      positions[i + 1] *= 1.3
    }
    geo.attributes.position.needsUpdate = true
    geo.computeVertexNormals()
    return geo
  }, [])

  const eggMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: COLORS.ceramic,
        roughness: 0.3,
        metalness: 0.05,
      }),
    []
  )

  useFrame((state, delta) => {
    if (!groupRef.current) return

    const offset = scroll.offset
    const { start, end, fadeOut } = SCENE_RANGES.seed

    // Visibility
    let opacity = 1
    if (offset > fadeOut) {
      opacity = 1 - (offset - fadeOut) / (end - fadeOut)
    }
    opacity = THREE.MathUtils.clamp(opacity, 0, 1)

    // Show/hide
    groupRef.current.visible = offset >= start && offset <= end
    if (!groupRef.current.visible) return

    // Apply opacity via material
    eggMaterial.transparent = true
    eggMaterial.opacity = opacity

    // Slow rotation
    if (eggRef.current) {
      eggRef.current.rotation.y += delta * 0.15
    }

    // Cursor-driven parallax (desktop only, damped)
    if (!isMobile) {
      const pointer = state.pointer
      targetRotation.current.x = pointer.y * 0.1
      targetRotation.current.y = pointer.x * 0.15
    }

    groupRef.current.rotation.x = THREE.MathUtils.damp(
      groupRef.current.rotation.x,
      targetRotation.current.x,
      4,
      delta
    )
    groupRef.current.rotation.y = THREE.MathUtils.damp(
      groupRef.current.rotation.y,
      targetRotation.current.y,
      4,
      delta
    )

    // Scale for opacity (slight shrink on exit)
    const scale = THREE.MathUtils.lerp(1, 0.95, 1 - opacity)
    groupRef.current.scale.setScalar(scale)
  })

  return (
    <group ref={groupRef}>
      {/* 3-point lighting rig */}
      <directionalLight
        position={LIGHTING.key.position as unknown as THREE.Vector3Tuple}
        color={LIGHTING.key.color}
        intensity={LIGHTING.key.intensity}
      />
      <directionalLight
        position={LIGHTING.fill.position as unknown as THREE.Vector3Tuple}
        color={LIGHTING.fill.color}
        intensity={LIGHTING.fill.intensity}
      />
      <pointLight
        position={LIGHTING.rim.position as unknown as THREE.Vector3Tuple}
        color={LIGHTING.rim.color}
        intensity={LIGHTING.rim.intensity}
      />
      <ambientLight intensity={LIGHTING.ambient.intensity} />

      {/* Ceramic egg */}
      <mesh ref={eggRef} geometry={eggGeometry} material={eggMaterial} />

      {/* Gold rim ring */}
      <mesh ref={rimRef} position={[0, 0, -0.1]} rotation={[0, 0, 0]}>
        <ringGeometry args={[1.08, 1.12, 64]} />
        <meshBasicMaterial
          color={COLORS.gold}
          transparent
          opacity={0.4}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Volumetric dust */}
      <DustParticles
        count={isMobile ? 100 : 200}
        spread={6}
        size={0.008}
        opacity={0.2}
      />
    </group>
  )
}
