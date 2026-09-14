'use client';
import { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { asset } from '@/lib/base';
import { GLOBE_RADIUS } from '@/scenes/flight';

// The land texture stays at rotation 0 so the baked Kazakhstan highlight aligns
// exactly with the 3D marker. Only the cloud shell drifts, for a sense of life.
export default function Globe() {
  const [day, night, clouds] = useLoader(THREE.TextureLoader, [
    asset('/textures/earth-day.png'),
    asset('/textures/earth-night.png'),
    asset('/textures/clouds.png'),
  ]);
  [day, night, clouds].forEach((t) => (t.anisotropy = 8));
  const cloudRef = useRef<THREE.Mesh>(null);

  useFrame((_, dt) => {
    if (cloudRef.current) cloudRef.current.rotation.y += dt * 0.012;
  });

  return (
    <group>
      <mesh>
        <sphereGeometry args={[GLOBE_RADIUS, 96, 96]} />
        <meshStandardMaterial
          map={day}
          emissiveMap={night}
          emissive={new THREE.Color('#ffcf8a')}
          emissiveIntensity={0.35}
          roughness={0.85}
          metalness={0.0}
        />
      </mesh>
      <mesh ref={cloudRef} scale={1.012}>
        <sphereGeometry args={[GLOBE_RADIUS, 64, 64]} />
        <meshStandardMaterial map={clouds} transparent opacity={0.35} depthWrite={false} />
      </mesh>
    </group>
  );
}
