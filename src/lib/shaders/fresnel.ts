'use client'

import * as THREE from 'three'

/**
 * Fresnel rim-glow ShaderMaterial.
 *
 * Used for:
 * - Helix ribbon rim glow (Scene 2)
 * - Torso wireframe rim on mobile (Scene 3 fallback)
 * - Athletic figure emissive accents (Scene 4)
 *
 * The Fresnel effect makes edges glow brighter than face-on surfaces,
 * producing a premium sci-fi rim-light look without environment maps.
 */
export function createFresnelMaterial(options: {
  rimColor?: string
  baseColor?: string
  rimPower?: number
  rimIntensity?: number
  opacity?: number
  wireframe?: boolean
} = {}) {
  const {
    rimColor = '#10b981',
    baseColor = '#000000',
    rimPower = 2.0,
    rimIntensity = 1.5,
    opacity = 1.0,
    wireframe = false,
  } = options

  return new THREE.ShaderMaterial({
    transparent: true,
    wireframe,
    uniforms: {
      uRimColor: { value: new THREE.Color(rimColor) },
      uBaseColor: { value: new THREE.Color(baseColor) },
      uRimPower: { value: rimPower },
      uRimIntensity: { value: rimIntensity },
      uOpacity: { value: opacity },
      uTime: { value: 0 },
    },
    vertexShader: /* glsl */ `
      varying vec3 vNormal;
      varying vec3 vViewPosition;

      void main() {
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        vViewPosition = -mvPosition.xyz;
        vNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: /* glsl */ `
      uniform vec3 uRimColor;
      uniform vec3 uBaseColor;
      uniform float uRimPower;
      uniform float uRimIntensity;
      uniform float uOpacity;
      uniform float uTime;

      varying vec3 vNormal;
      varying vec3 vViewPosition;

      void main() {
        vec3 viewDir = normalize(vViewPosition);
        float fresnel = 1.0 - abs(dot(viewDir, vNormal));
        fresnel = pow(fresnel, uRimPower) * uRimIntensity;

        vec3 color = mix(uBaseColor, uRimColor, fresnel);
        float alpha = clamp(fresnel * 0.8 + 0.05, 0.0, 1.0) * uOpacity;

        gl_FragColor = vec4(color, alpha);
      }
    `,
  })
}
