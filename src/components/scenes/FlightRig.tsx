'use client';
import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { latLonToVec3 } from '@/lib/geo';
import { ALAKOL_LATLON, GLOBE_RADIUS } from '@/scenes/flight';

const smooth = (t: number) => t * t * (3 - 2 * t);

export default function FlightRig({ reduced }: { reduced: boolean }) {
  const { camera } = useThree();

  useEffect(() => {
    const cam = camera as THREE.PerspectiveCamera;
    const lakeDir = latLonToVec3(ALAKOL_LATLON.lat, ALAKOL_LATLON.lon, 1).normalize();
    const startPos = new THREE.Vector3(0, 0.7, 7);
    const endPos = lakeDir.clone().multiplyScalar(GLOBE_RADIUS + 0.35).add(new THREE.Vector3(0, 0.15, 0));
    const lakePoint = lakeDir.clone().multiplyScalar(GLOBE_RADIUS);
    const center = new THREE.Vector3(0, 0, 0);
    const tmpPos = new THREE.Vector3();
    const tmpLook = new THREE.Vector3();

    const apply = (raw: number) => {
      const t = smooth(Math.min(1, Math.max(0, raw)));
      tmpPos.lerpVectors(startPos, endPos, t);
      tmpPos.y += Math.sin(t * Math.PI) * 0.6; // gentle arc
      cam.position.copy(tmpPos);
      tmpLook.lerpVectors(center, lakePoint, smooth(Math.min(1, raw * 1.3)));
      cam.lookAt(tmpLook);
      cam.fov = 46 - 16 * t;
      cam.updateProjectionMatrix();
    };

    if (reduced) {
      apply(1); // jump straight to arrival, no scroll-driven motion
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
        scrollTrigger: {
          trigger: '#flight-track',
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
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
