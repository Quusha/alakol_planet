'use client';
import { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { asset } from '@/lib/base';
import { GLOBE_RADIUS } from '@/scenes/flight';

export default function Globe({ spin = true }: { spin?: boolean }) {
  const ref = useRef<THREE.Mesh>(null);
  const [day, night, clouds] = useLoader(THREE.TextureLoader, [
    asset('/textures/earth-day.png'),
    asset('/textures/earth-night.png'),
    asset('/textures/clouds.png'),
  ]);
  const cloudRef = useRef<THREE.Mesh>(null);

  useFrame((_, dt) => {
    if (spin && ref.current) ref.current.rotation.y += dt * 0.03;
    if (spin && cloudRef.current) cloudRef.current.rotation.y += dt * 0.045;
  });

  return (
    <group>
      <mesh ref={ref}>
        <sphereGeometry args={[GLOBE_RADIUS, 64, 64]} />
        <meshStandardMaterial
          map={day}
          emissiveMap={night}
          emissive={new THREE.Color('#ffd27a')}
          emissiveIntensity={0.25}
          roughness={0.9}
          metalness={0.0}
        />
      </mesh>
      <mesh ref={cloudRef} scale={1.01}>
        <sphereGeometry args={[GLOBE_RADIUS, 48, 48]} />
        <meshStandardMaterial map={clouds} transparent opacity={0.5} depthWrite={false} />
      </mesh>
    </group>
  );
}
