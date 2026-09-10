'use client';
import { useMemo } from 'react';
import * as THREE from 'three';
import { GLOBE_RADIUS } from '@/scenes/flight';

// Backside fresnel rim — a standard, cheap atmosphere glow.
export default function Atmosphere() {
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide,
        depthWrite: false,
        uniforms: { uColor: { value: new THREE.Color('#2FB6BE') } },
        vertexShader: `
          varying vec3 vNormal;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          varying vec3 vNormal;
          uniform vec3 uColor;
          void main() {
            float intensity = pow(0.72 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.0);
            gl_FragColor = vec4(uColor, 1.0) * intensity;
          }
        `,
      }),
    [],
  );
  return (
    <mesh scale={1.18} material={material}>
      <sphereGeometry args={[GLOBE_RADIUS, 48, 48]} />
    </mesh>
  );
}
