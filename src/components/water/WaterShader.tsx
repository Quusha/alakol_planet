'use client';
import { useEffect, useRef } from 'react';

// "Touch the water": faint moving caustics that ripple toward the cursor.
// Kept as a low-opacity 2D canvas overlay so it never blocks clicks or needs WebGL.
export default function WaterShader() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    const pointer = { x: w / 2, y: h / 2, active: false };

    const onMove = (e: PointerEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.active = true;
    };
    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('resize', onResize);

    let raf = 0;
    let t = 0;
    const loop = () => {
      t += 0.012;
      ctx.clearRect(0, 0, w, h);
      ctx.lineWidth = 1;
      const cols = 26;
      for (let i = 0; i < cols; i++) {
        const y = (h / cols) * i;
        ctx.beginPath();
        ctx.strokeStyle = `rgba(127,216,210,${0.05 + (i % 3 === 0 ? 0.05 : 0)})`;
        for (let x = 0; x <= w; x += 24) {
          const dx = x - pointer.x;
          const dy = y - pointer.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const ripple = pointer.active ? Math.cos(dist * 0.03 - t * 4) * Math.max(0, 60 - dist * 0.12) * 0.15 : 0;
          const wave = Math.sin(x * 0.01 + t + i * 0.4) * 6;
          ctx.lineTo(x, y + wave + ripple);
        }
        ctx.stroke();
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[5] h-full w-full mix-blend-screen opacity-70"
    />
  );
}
