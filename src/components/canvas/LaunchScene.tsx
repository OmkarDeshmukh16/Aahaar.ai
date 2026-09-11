'use client'

import { Suspense } from 'react'
import { Canvas, useFrame, RootState } from '@react-three/fiber'
import { ScrollControls, Scroll, AdaptiveDpr, AdaptiveEvents, Preload, useScroll } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette, Noise } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import * as THREE from 'three'
import { SCENE_CONFIG } from '@/lib/constants'
import { SeedScene } from './SeedScene'
import { AwakeningScene } from './AwakeningScene'
import { VerdictScene } from './VerdictScene'
import { ResultScene } from './ResultScene'
import { Overlay } from '@/components/dom/Overlay'

export interface LaunchSceneProps {
  isMobile: boolean
  reducedMotion: boolean
}

/**
 * Camera rig that drifts subtly with scroll progress.
 * Uses damped interpolation for a cinematic glide feel.
 */
function CameraRig({ reducedMotion }: { reducedMotion: boolean }) {
  const scroll = useScroll()

  useFrame((state: RootState, delta: number) => {
    if (reducedMotion) return

    const offset = scroll.offset
    // Subtle Y drift based on scroll
    const targetY = offset * -0.5
    const targetZ = 5 - offset * 0.3

    state.camera.position.y = THREE.MathUtils.damp(
      state.camera.position.y,
      targetY,
      2,
      delta
    )
    state.camera.position.z = THREE.MathUtils.damp(
      state.camera.position.z,
      targetZ,
      2,
      delta
    )
    state.camera.lookAt(0, state.camera.position.y * 0.5, 0)
  })

  return null
}

/**
 * Master 3D scene with ScrollControls, postprocessing, and all 4 sub-scenes.
 * ScrollControls is the sole scroll authority — no Lenis.
 */
export function LaunchScene({ isMobile, reducedMotion }: LaunchSceneProps) {
  return (
    <Canvas
      dpr={isMobile ? [1, SCENE_CONFIG.mobileDprCap] : SCENE_CONFIG.dprRange}
      gl={{
        antialias: false,
        alpha: false,
        powerPreference: 'high-performance',
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.0,
      }}
      camera={{
        position: SCENE_CONFIG.camera.position as unknown as THREE.Vector3Tuple,
        fov: SCENE_CONFIG.camera.fov,
        near: 0.1,
        far: 100,
      }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
      }}
    >
      <color attach="background" args={['#09090b']} />

      <Suspense fallback={null}>
        <ScrollControls
          pages={SCENE_CONFIG.scrollPages}
          damping={SCENE_CONFIG.scrollDamping}
        >
          {/* Camera rig */}
          <CameraRig reducedMotion={reducedMotion} />

          {/* 3D Scenes */}
          <SeedScene isMobile={isMobile} />
          <AwakeningScene isMobile={isMobile} />
          <VerdictScene isMobile={isMobile} />
          <ResultScene isMobile={isMobile} />

          {/* DOM Overlay */}
          <Scroll html style={{ width: '100%' }}>
            <Overlay />
          </Scroll>
        </ScrollControls>

        {/* Postprocessing — desktop only, respect reduced motion */}
        {!isMobile && !reducedMotion && (
          <EffectComposer multisampling={0}>
            <Bloom
              luminanceThreshold={SCENE_CONFIG.bloom.threshold}
              luminanceSmoothing={SCENE_CONFIG.bloom.luminanceSmoothing}
              intensity={SCENE_CONFIG.bloom.intensity}
            />
            <Vignette
              darkness={SCENE_CONFIG.vignette.darkness}
              offset={SCENE_CONFIG.vignette.offset}
              blendFunction={BlendFunction.NORMAL}
            />
            <Noise
              premultiply
              blendFunction={BlendFunction.SOFT_LIGHT}
              opacity={SCENE_CONFIG.noise.opacity}
            />
          </EffectComposer>
        )}

        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
        <Preload all />
      </Suspense>
    </Canvas>
  )
}
