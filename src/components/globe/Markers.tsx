'use client';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { latLonToVec3 } from '@/lib/geo';
import { ALAKOL_LATLON, GLOBE_RADIUS } from '@/scenes/flight';

// Animated "you are here" pin over the (already highlighted) Alakol zone.
export default function Markers() {
  const pos = latLonToVec3(ALAKOL_LATLON.lat, ALAKOL_LATLON.lon, GLOBE_RADIUS * 1.005);
  const ring = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (ring.current) {
      const s = 1 + (Math.sin(clock.elapsedTime * 2) * 0.5 + 0.5) * 2.2;
      ring.current.scale.setScalar(s);
      (ring.current.material as THREE.MeshBasicMaterial).opacity = 0.85 - (s - 1) / 3.2;
    }
  });

  return (
    <group position={pos} onUpdate={(g) => g.lookAt(0, 0, 0)}>
      {/* beam / pin */}
      <mesh position={[0, 0, 0.14]}>
        <cylinderGeometry args={[0.006, 0.006, 0.28, 8]} />
        <meshBasicMaterial color="#FFC24B" />
      </mesh>
      <mesh position={[0, 0, 0.02]}>
        <sphereGeometry args={[0.035, 16, 16]} />
        <meshBasicMaterial color="#FFF3D0" />
      </mesh>
      {/* static + pulsing halo rings */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.05, 0.07, 40]} />
        <meshBasicMaterial color="#FF7A45" transparent opacity={0.9} side={THREE.DoubleSide} />
      </mesh>
      <mesh ref={ring} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.05, 0.062, 40]} />
        <meshBasicMaterial color="#FFC24B" transparent opacity={0.8} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}
