'use client';
import { useEffect, useRef, useState, type ElementType, type ReactNode } from 'react';

export default function Reveal({
  as: Tag = 'div',
  className = '',
  caustic = false,
  children,
}: {
  as?: ElementType;
  className?: string;
  caustic?: boolean;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  const base = caustic ? 'caustic-reveal' : 'reveal';
  return (
    <Tag ref={ref} className={`${base} ${seen ? 'in' : ''} ${className}`}>
      {children}
    </Tag>
  );
}
