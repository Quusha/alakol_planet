'use client';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useMotion } from '@/components/ui/AppProviders';
import Poster from '@/components/globe/Poster';
import CausticsFallback from '@/components/water/CausticsFallback';
import WaterShader from '@/components/water/WaterShader';
import WindField from '@/components/particles/WindField';

// Heavy WebGL scene is client-only (never server-rendered).
const Experience = dynamic(() => import('@/components/Experience'), { ssr: false });

function hasWebGL(): boolean {
  try {
    const c = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && c.getContext('webgl'));
  } catch {
    return false;
  }
}

export default function OrbitStage() {
  const { reduced } = useMotion();
  const [webgl, setWebgl] = useState<boolean | null>(null);
  useEffect(() => setWebgl(hasWebGL()), []);

  const cinematic = !reduced && webgl === true;

  return (
    <div className="fixed inset-0 z-0" aria-hidden>
      {cinematic ? <Experience /> : <Poster />}
      {cinematic ? (
        <>
          <WaterShader />
          <WindField />
        </>
      ) : (
        <CausticsFallback />
      )}
    </div>
  );
}
