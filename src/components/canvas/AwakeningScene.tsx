'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { useScroll } from '@react-three/drei'
import * as THREE from 'three'
import { SCENE_RANGES, COLORS } from '@/lib/constants'

interface AwakeningSceneProps {
  isMobile: boolean
}

/**
 * Scene 2 — The Awakening (23–53%)
 * Egg cracks open, revealing a glowing rotating helix ribbon (torus knot)
 * with emissive amber→emerald gradient and trailing particle streaks.
 */
export function AwakeningScene({ isMobile }: AwakeningSceneProps) {
  const groupRef = useRef<THREE.Group>(null)
  const leftHalfRef = useRef<THREE.Mesh>(null)
  const rightHalfRef = useRef<THREE.Mesh>(null)
  const helixRef = useRef<THREE.Mesh>(null)
  const trailRef = useRef<THREE.Points>(null)
  const scroll = useScroll()

  // Egg half geometries (clipped sphere halves)
  const eggHalfGeo = useMemo(() => {
    const geo = new THREE.SphereGeometry(1, 48, 48, 0, Math.PI)
    const positions = geo.attributes.position.array as Float32Array
    for (let i = 0; i < positions.length; i += 3) {
      positions[i + 1] *= 1.3
    }
    geo.attributes.position.needsUpdate = true
    geo.computeVertexNormals()
    return geo
  }, [])

  const shellMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: COLORS.ceramic,
        roughness: 0.3,
        metalness: 0.05,
        transparent: true,
        side: THREE.DoubleSide,
      }),
    []
  )

  // Helix (torus knot) with emissive gradient
  const helixMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        uniforms: {
          uTime: { value: 0 },
          uOpacity: { value: 0 },
          uColor1: { value: new THREE.Color(COLORS.gold) },
          uColor2: { value: new THREE.Color(COLORS.emerald) },
        },
        vertexShader: /* glsl */ `
          varying vec2 vUv;
          varying vec3 vNormal;
          varying vec3 vViewPosition;
          void main() {
            vUv = uv;
            vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
            vViewPosition = -mvPos.xyz;
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * mvPos;
          }
        `,
        fragmentShader: /* glsl */ `
          uniform float uTime;
          uniform float uOpacity;
          uniform vec3 uColor1;
          uniform vec3 uColor2;
          varying vec2 vUv;
          varying vec3 vNormal;
          varying vec3 vViewPosition;
          void main() {
            // Gradient along UV.y
            vec3 baseColor = mix(uColor1, uColor2, vUv.y);

            // Fresnel rim glow
            vec3 viewDir = normalize(vViewPosition);
            float fresnel = pow(1.0 - abs(dot(viewDir, vNormal)), 2.5);
            vec3 color = baseColor + baseColor * fresnel * 1.2;

            // Slight shimmer
            float shimmer = sin(vUv.x * 20.0 + uTime * 2.0) * 0.1 + 0.9;
            color *= shimmer;

            gl_FragColor = vec4(color, uOpacity * (0.6 + fresnel * 0.4));
          }
        `,
      }),
    []
  )

  // Trail particle positions along the helix
  const trailCount = isMobile ? 50 : 100
  const trailPositions = useMemo(() => {
    const curve = new THREE.TorusKnotGeometry(0.8, 0.15, 128, 16, 2, 3)
    const posAttr = curve.attributes.position
    const pos = new Float32Array(trailCount * 3)
    const step = Math.floor(posAttr.count / trailCount)
    for (let i = 0; i < trailCount; i++) {
      const idx = (i * step) % posAttr.count
      pos[i * 3] = posAttr.getX(idx)
      pos[i * 3 + 1] = posAttr.getY(idx)
      pos[i * 3 + 2] = posAttr.getZ(idx)
    }
    curve.dispose()
    return pos
  }, [trailCount])

  useFrame((state, delta) => {
    if (!groupRef.current) return

    const offset = scroll.offset
    const { start, end, fadeIn, fadeOut } = SCENE_RANGES.awakening

    // Visibility with cross-fade
    let opacity = 0
    if (offset >= fadeIn && offset <= fadeOut) {
      opacity = 1
    }
    if (offset >= start && offset < fadeIn + 0.05) {
      opacity = (offset - start) / 0.05
    }
    if (offset > fadeOut && offset <= end) {
      opacity = 1 - (offset - fadeOut) / (end - fadeOut)
    }
    opacity = THREE.MathUtils.clamp(opacity, 0, 1)

    groupRef.current.visible = opacity > 0.01
    if (!groupRef.current.visible) return

    // Local progress within this scene (0–1)
    const sceneProgress = THREE.MathUtils.clamp(
      (offset - start) / (end - start),
      0,
      1
    )

    // Egg crack: halves separate based on progress
    const separation = sceneProgress * 1.8
    if (leftHalfRef.current) {
      leftHalfRef.current.position.x = -separation * 0.5
      leftHalfRef.current.rotation.z = sceneProgress * 0.3
      shellMaterial.opacity = opacity * Math.max(0, 1 - sceneProgress * 1.5)
    }
    if (rightHalfRef.current) {
      rightHalfRef.current.position.x = separation * 0.5
      rightHalfRef.current.rotation.z = -sceneProgress * 0.3
    }

    // Helix: emerge and rotate
    if (helixRef.current) {
      const helixProgress = Math.max(0, (sceneProgress - 0.2) / 0.8)
      helixRef.current.scale.setScalar(helixProgress * 0.8)
      helixRef.current.rotation.y += delta * 0.4
      helixRef.current.rotation.x += delta * 0.1
      helixMaterial.uniforms.uTime.value = state.clock.elapsedTime
      helixMaterial.uniforms.uOpacity.value = opacity * helixProgress
    }

    // Trail particles
    if (trailRef.current) {
      trailRef.current.rotation.y += delta * 0.3
      const mat = trailRef.current.material as THREE.PointsMaterial
      mat.opacity = opacity * Math.max(0, (sceneProgress - 0.3) / 0.7) * 0.5
    }

    groupRef.current.scale.setScalar(THREE.MathUtils.lerp(0.95, 1, opacity))
  })

  return (
    <group ref={groupRef}>
      {/* Lighting */}
      <pointLight position={[0, 2, 3]} color={COLORS.gold} intensity={0.8} />
      <pointLight position={[0, -1, -2]} color={COLORS.emerald} intensity={0.5} />
      <ambientLight intensity={0.2} />

      {/* Egg halves */}
      <mesh
        ref={leftHalfRef}
        geometry={eggHalfGeo}
        material={shellMaterial}
        rotation={[0, Math.PI / 2, 0]}
      />
      <mesh
        ref={rightHalfRef}
        geometry={eggHalfGeo}
        material={shellMaterial}
        rotation={[0, -Math.PI / 2, 0]}
      />

      {/* Helix ribbon */}
      <mesh ref={helixRef} material={helixMaterial}>
        <torusKnotGeometry args={[0.8, 0.15, 128, 16, 2, 3]} />
      </mesh>

      {/* Trailing particles */}
      <points ref={trailRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[trailPositions, 3]}
            count={trailCount}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.02}
          color={COLORS.gold}
          transparent
          opacity={0}
          sizeAttenuation
          depthWrite={false}
        />
      </points>
    </group>
  )
}
