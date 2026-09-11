'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { useScroll } from '@react-three/drei'
import * as THREE from 'three'
import { SCENE_RANGES, COLORS } from '@/lib/constants'

interface ResultSceneProps {
  isMobile: boolean
}

/**
 * Mannequin body part definition.
 */
interface BodyPart {
  name: string
  type: 'sphere' | 'capsule' | 'cylinder'
  position: [number, number, number]
  args: number[]
  rotation?: [number, number, number]
  activationOrder: number // 0-7, stagger timing for emissive pulse
}

const BODY_PARTS: BodyPart[] = [
  // Legs (activate first)
  { name: 'leftShin', type: 'cylinder', position: [-0.3, -2.2, 0], args: [0.08, 0.07, 0.8, 8], activationOrder: 0 },
  { name: 'rightShin', type: 'cylinder', position: [0.3, -2.2, 0], args: [0.08, 0.07, 0.8, 8], activationOrder: 0 },
  { name: 'leftThigh', type: 'cylinder', position: [-0.3, -1.4, 0], args: [0.1, 0.09, 0.8, 8], activationOrder: 1 },
  { name: 'rightThigh', type: 'cylinder', position: [0.3, -1.4, 0], args: [0.1, 0.09, 0.8, 8], activationOrder: 1 },
  // Hips / joints
  { name: 'leftHip', type: 'sphere', position: [-0.3, -1.0, 0], args: [0.12, 12, 12], activationOrder: 2 },
  { name: 'rightHip', type: 'sphere', position: [0.3, -1.0, 0], args: [0.12, 12, 12], activationOrder: 2 },
  // Core (torso)
  { name: 'torso', type: 'capsule', position: [0, -0.1, 0], args: [0.3, 0.8, 12, 24], activationOrder: 3 },
  // Shoulders
  { name: 'leftShoulder', type: 'sphere', position: [-0.5, 0.5, 0], args: [0.14, 12, 12], activationOrder: 4 },
  { name: 'rightShoulder', type: 'sphere', position: [0.5, 0.5, 0], args: [0.14, 12, 12], activationOrder: 4 },
  // Arms
  { name: 'leftUpperArm', type: 'cylinder', position: [-0.6, 0.15, 0], args: [0.07, 0.06, 0.6, 8], activationOrder: 5 },
  { name: 'rightUpperArm', type: 'cylinder', position: [0.6, 0.15, 0], args: [0.07, 0.06, 0.6, 8], activationOrder: 5 },
  { name: 'leftForearm', type: 'cylinder', position: [-0.65, -0.35, 0.1], args: [0.06, 0.05, 0.5, 8], rotation: [0.2, 0, 0], activationOrder: 6 },
  { name: 'rightForearm', type: 'cylinder', position: [0.65, -0.35, 0.1], args: [0.06, 0.05, 0.5, 8], rotation: [-0.2, 0, 0], activationOrder: 6 },
  // Head
  { name: 'head', type: 'sphere', position: [0, 0.85, 0], args: [0.18, 16, 16], activationOrder: 7 },
]

const MAX_ACTIVATION_ORDER = 7

/**
 * Scene 4 — The Result (73–100%)
 * Stylized wireframe mannequin with muscle groups that light up sequentially.
 */
export function ResultScene({ isMobile }: ResultSceneProps) {
  const groupRef = useRef<THREE.Group>(null)
  const materialsRef = useRef<THREE.MeshStandardMaterial[]>([])
  const scroll = useScroll()

  // Create materials for each body part
  const materials = useMemo(() => {
    const mats = BODY_PARTS.map(
      () =>
        new THREE.MeshStandardMaterial({
          color: '#ffffff',
          wireframe: true,
          transparent: true,
          opacity: 0.15,
          emissive: COLORS.emerald,
          emissiveIntensity: 0,
        })
    )
    materialsRef.current = mats
    return mats
  }, [])

  useFrame((_state, delta) => {
    if (!groupRef.current) return

    const offset = scroll.offset
    const { start, end, fadeIn } = SCENE_RANGES.result

    // Visibility
    let opacity = 0
    if (offset >= fadeIn) opacity = 1
    if (offset >= start && offset < fadeIn + 0.05) {
      opacity = (offset - start) / 0.05
    }
    opacity = THREE.MathUtils.clamp(opacity, 0, 1)

    groupRef.current.visible = opacity > 0.01
    if (!groupRef.current.visible) return

    // Scene progress within 75–100%
    const sceneProgress = THREE.MathUtils.clamp(
      (offset - start) / (end - start),
      0,
      1
    )

    // Update each material's emissive intensity based on activation order
    materials.forEach((mat, i) => {
      const part = BODY_PARTS[i]
      const activationStart = part.activationOrder / (MAX_ACTIVATION_ORDER + 1)
      const activationEnd = (part.activationOrder + 1) / (MAX_ACTIVATION_ORDER + 1)

      let activation = 0
      if (sceneProgress >= activationEnd) {
        activation = 1
      } else if (sceneProgress > activationStart) {
        activation = (sceneProgress - activationStart) / (activationEnd - activationStart)
      }

      // Ease-out
      activation = 1 - Math.pow(1 - activation, 3)

      const targetEmissive = activation * 0.8
      mat.emissiveIntensity = THREE.MathUtils.damp(
        mat.emissiveIntensity,
        targetEmissive,
        4,
        delta
      )
      mat.opacity = THREE.MathUtils.lerp(0.08, 0.3, activation) * opacity
    })

    // Final hero pulse at scroll end
    if (sceneProgress > 0.95) {
      const pulse = 1 + Math.sin(sceneProgress * Math.PI * 10) * 0.02
      groupRef.current.scale.setScalar(pulse)
    } else {
      groupRef.current.scale.setScalar(THREE.MathUtils.lerp(0.9, 1, opacity))
    }

    // Slow rotation
    groupRef.current.rotation.y += delta * 0.08
  })

  return (
    <group ref={groupRef} position={[0, 0.5, 0]}>
      {/* Lighting */}
      <pointLight position={[2, 3, 3]} color={COLORS.emerald} intensity={1} />
      <pointLight position={[-2, -1, 2]} color={COLORS.gold} intensity={0.4} />
      <ambientLight intensity={0.1} />

      {/* Body parts */}
      {BODY_PARTS.map((part, i) => {
        const geo = (() => {
          switch (part.type) {
            case 'sphere':
              return <sphereGeometry args={part.args as [number, number, number]} />
            case 'capsule':
              return <capsuleGeometry args={part.args as [number, number, number, number]} />
            case 'cylinder':
              return <cylinderGeometry args={part.args as [number, number, number, number]} />
          }
        })()

        return (
          <mesh
            key={part.name}
            material={materials[i]}
            position={part.position}
            rotation={part.rotation || [0, 0, 0]}
          >
            {geo}
          </mesh>
        )
      })}
    </group>
  )
}
