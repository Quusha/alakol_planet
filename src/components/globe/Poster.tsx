'use client';
import { useEffect, useState } from 'react';
import { asset } from '@/lib/base';
import { useMotion } from '@/components/ui/AppProviders';

// Real Alakol photos. Used as the fixed background for reduced-motion / no-WebGL,
// and as the cross-fading "arrival" backdrop.
const PHOTOS = ['/images/alakol-1.jpg', '/images/alakol-2.jpg', '/images/alakol-3.jpg'];

export default function Poster() {
  const { reduced } = useMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (reduced) return; // static single frame when motion is reduced
    const id = setInterval(() => setI((v) => (v + 1) % PHOTOS.length), 7000);
    return () => clearInterval(id);
  }, [reduced]);

  return (
    <div className="fixed inset-0 -z-0 bg-[#04121a]">
      {PHOTOS.map((p, idx) => (
        <div
          key={p}
          aria-hidden
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-[1500ms] ease-in-out"
          style={{ backgroundImage: `url(${asset(p)})`, opacity: idx === i ? 1 : 0 }}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[var(--bg)]" />
    </div>
  );
}
