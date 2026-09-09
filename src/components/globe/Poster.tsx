'use client';
import { asset } from '@/lib/base';

// Still "arrival" frame used for reduced-motion and no-WebGL fallbacks.
export default function Poster() {
  return (
    <div className="fixed inset-0 -z-0">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={asset('/images/arrival-poster.png')}
        alt=""
        aria-hidden
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-[var(--bg)]" />
    </div>
  );
}
