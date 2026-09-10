'use client';

// Static caustic shimmer for reduced-motion / no-WebGL — SVG feTurbulence,
// no animation, no scripting. Safe everywhere.
export default function CausticsFallback() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[5] opacity-30">
      <svg className="h-full w-full" preserveAspectRatio="xMidYMid slice">
        <filter id="caustics">
          <feTurbulence type="fractalNoise" baseFrequency="0.012 0.03" numOctaves="2" seed="7" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.18  0 0 0 0 0.71  0 0 0 0 0.74  0 0 0 0.5 0"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#caustics)" />
      </svg>
    </div>
  );
}
