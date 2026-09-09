'use client';
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { useSystemReducedMotion } from '@/lib/motion/usePrefersReducedMotion';

interface MotionState { reduced: boolean; toggle: () => void; }
interface SoundState { on: boolean; toggle: () => void; }

const MotionCtx = createContext<MotionState>({ reduced: false, toggle: () => {} });
const SoundCtx = createContext<SoundState>({ on: false, toggle: () => {} });

export const useMotion = () => useContext(MotionCtx);
export const useSound = () => useContext(SoundCtx);

export default function AppProviders({ locale, children }: { locale: string; children: ReactNode }) {
  const system = useSystemReducedMotion();
  const [override, setOverride] = useState<boolean | null>(null);
  const [sound, setSound] = useState(false);

  // restore persisted preferences
  useEffect(() => {
    const m = localStorage.getItem('alakol_reduced');
    if (m === 'true' || m === 'false') setOverride(m === 'true');
    setSound(localStorage.getItem('alakol_sound') === 'true');
  }, []);

  const reduced = override ?? system;

  useEffect(() => {
    document.documentElement.dataset.reduced = String(reduced);
  }, [reduced]);
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  // Smooth scroll (Lenis) + GSAP ScrollTrigger, disabled when motion is reduced.
  useEffect(() => {
    if (reduced) return;
    let lenis: { raf: (t: number) => void; destroy: () => void; on: (e: string, cb: () => void) => void } | null = null;
    let raf = 0;
    let mounted = true;
    (async () => {
      const [{ default: Lenis }, gsapMod] = await Promise.all([import('lenis'), import('gsap')]);
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      const gsap = gsapMod.default ?? gsapMod;
      gsap.registerPlugin(ScrollTrigger);
      if (!mounted) return;
      lenis = new Lenis({ lerp: 0.1, smoothWheel: true }) as unknown as typeof lenis;
      lenis!.on('scroll', ScrollTrigger.update);
      const loop = (t: number) => {
        lenis!.raf(t);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    })();
    return () => {
      mounted = false;
      cancelAnimationFrame(raf);
      lenis?.destroy();
    };
  }, [reduced]);

  const motion = useMemo<MotionState>(
    () => ({
      reduced,
      toggle: () => setOverride((o) => {
        const next = !(o ?? system);
        localStorage.setItem('alakol_reduced', String(next));
        return next;
      }),
    }),
    [reduced, system],
  );
  const soundState = useMemo<SoundState>(
    () => ({
      on: sound,
      toggle: () => setSound((s) => {
        const next = !s;
        localStorage.setItem('alakol_sound', String(next));
        return next;
      }),
    }),
    [sound],
  );

  return (
    <MotionCtx.Provider value={motion}>
      <SoundCtx.Provider value={soundState}>{children}</SoundCtx.Provider>
    </MotionCtx.Provider>
  );
}
