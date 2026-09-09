'use client';
import { useEffect, useRef } from 'react';

// Airborne dust/pollen on a Perlin-ish flow field, drifting right->left along the
// migration axis. Scroll speed becomes a gust. Pure 2D canvas — no WebGL needed.
export default function WindField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    const N = Math.min(120, Math.floor((w * h) / 16000));
    const parts = Array.from({ length: N }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      s: 0.4 + Math.random() * 1.2,
    }));

    let gust = 0;
    let lastY = window.scrollY;
    const onScroll = () => {
      gust = Math.min(6, gust + Math.abs(window.scrollY - lastY) * 0.05);
      lastY = window.scrollY;
    };
    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    const flow = (x: number, y: number, t: number) =>
      Math.sin(x * 0.004 + t) * 0.6 + Math.cos(y * 0.005 - t * 0.7) * 0.6;

    let raf = 0;
    let t = 0;
    const loop = () => {
      t += 0.005;
      gust *= 0.94;
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = 'rgba(220,239,236,0.5)';
      for (const p of parts) {
        const a = flow(p.x, p.y, t);
        p.x -= (1.1 + gust) * p.s; // right -> left
        p.y += a * p.s;
        if (p.x < -5) { p.x = w + 5; p.y = Math.random() * h; }
        if (p.y < -5) p.y = h + 5;
        if (p.y > h + 5) p.y = -5;
        ctx.globalAlpha = 0.25 + p.s * 0.3;
        ctx.fillRect(p.x, p.y, p.s, p.s);
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-10 h-full w-full opacity-60"
    />
  );
}
