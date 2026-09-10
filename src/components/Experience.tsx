'use client';
import { Canvas } from '@react-three/fiber';
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
      <Canvas
        camera={{ position: [0, 0.7, 7], fov: 46 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['#04121a']} />
        <ambientLight intensity={0.55} />
        <directionalLight position={[5, 3, 5]} intensity={1.2} />
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
