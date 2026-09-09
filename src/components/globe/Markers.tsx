'use client';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { latLonToVec3 } from '@/lib/geo';
import { ALAKOL_LATLON, GLOBE_RADIUS } from '@/scenes/flight';

export default function Markers() {
  const pos = latLonToVec3(ALAKOL_LATLON.lat, ALAKOL_LATLON.lon, GLOBE_RADIUS * 1.01);
  const ring = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (ring.current) {
      const s = 1 + (Math.sin(clock.elapsedTime * 2) * 0.5 + 0.5) * 1.6;
      ring.current.scale.setScalar(s);
      (ring.current.material as THREE.MeshBasicMaterial).opacity = 0.8 - (s - 1) / 2;
    }
  });

  return (
    <group position={pos} onUpdate={(g) => g.lookAt(0, 0, 0)}>
      <mesh>
        <sphereGeometry args={[0.03, 16, 16]} />
        <meshBasicMaterial color="#E8B667" />
      </mesh>
      <mesh ref={ring} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.04, 0.055, 32]} />
        <meshBasicMaterial color="#2FB6BE" transparent opacity={0.8} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}
