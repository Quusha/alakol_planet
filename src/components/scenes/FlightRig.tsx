'use client';
import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { latLonToVec3 } from '@/lib/geo';
import { ALAKOL_LATLON } from '@/scenes/flight';

const ease = (t: number) => t * t * (3 - 2 * t);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/**
 * Calm, predictable descent: the camera always sits on the Alakol axis and
 * looks at the globe centre, so the highlighted Kazakhstan/Alakol stays dead
 * centre while we zoom straight in. No off-axis tumbling.
 */
export default function FlightRig({ reduced }: { reduced: boolean }) {
  const { camera } = useThree();

  useEffect(() => {
    const cam = camera as THREE.PerspectiveCamera;
    const axis = latLonToVec3(ALAKOL_LATLON.lat, ALAKOL_LATLON.lon, 1).normalize();

    const apply = (raw: number) => {
      const t = ease(Math.min(1, Math.max(0, raw)));
      const dist = lerp(7.2, 3.05, t); // far orbit -> close arrival (globe radius = 2)
      cam.position.copy(axis).multiplyScalar(dist);
      cam.lookAt(0, 0, 0);
      cam.fov = lerp(52, 40, t);
      cam.updateProjectionMatrix();
    };

    if (reduced) {
      apply(1); // static arrival, no scroll-driven motion
      return;
    }
    apply(0);

    let st: { kill: () => void } | null = null;
    let cancelled = false;
    (async () => {
      const gsapMod = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      const gsap = gsapMod.default ?? gsapMod;
      gsap.registerPlugin(ScrollTrigger);
      if (cancelled) return;
      const proxy = { t: 0 };
      const tween = gsap.to(proxy, {
        t: 1,
        ease: 'none',
        scrollTrigger: { trigger: '#flight-track', start: 'top top', end: 'bottom bottom', scrub: 1 },
        onUpdate: () => apply(proxy.t),
      });
      st = tween.scrollTrigger ?? null;
    })();

    return () => {
      cancelled = true;
      st?.kill();
    };
  }, [camera, reduced]);

  return null;
}
