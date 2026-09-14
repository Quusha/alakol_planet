'use client';
import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import { Suspense, Component, type ReactNode } from 'react';
import Globe from '@/components/globe/Globe';
import Atmosphere from '@/components/globe/Atmosphere';
import Markers from '@/components/globe/Markers';
import Poster from '@/components/globe/Poster';
import FlightRig from '@/components/scenes/FlightRig';

class GLBoundary extends Component<{ fallback: ReactNode; children: ReactNode }, { err: boolean }> {
  state = { err: false };
  static getDerivedStateFromError() {
    return { err: true };
  }
  render() {
    return this.state.err ? this.props.fallback : this.props.children;
  }
}

export default function Experience() {
  return (
    <GLBoundary fallback={<Poster />}>
      <Canvas camera={{ position: [0, 0, 7.2], fov: 52 }} dpr={[1, 1.75]} gl={{ antialias: true, alpha: true }}>
        <color attach="background" args={['#051519']} />
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 3, 5]} intensity={1.4} />
        <Stars radius={120} depth={60} count={2200} factor={4} saturation={0} fade speed={0.4} />
        <Suspense fallback={null}>
          <Globe />
          <Atmosphere />
          <Markers />
        </Suspense>
        <FlightRig reduced={false} />
      </Canvas>
    </GLBoundary>
  );
}
