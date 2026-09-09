'use client';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

const SECTIONS = ['pillars', 'audience', 'routes', 'stays', 'reviews'] as const;

export default function ProgressPath() {
  const t = useTranslations('nav');
  const [active, setActive] = useState<string>('pillars');

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-45% 0px -45% 0px' },
    );
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <nav
      aria-label={t('overview')}
      className="fixed left-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-3 lg:flex"
    >
      {SECTIONS.map((id) => (
        <a key={id} href={`#${id}`} className="group flex items-center gap-2">
          <span
            className={`h-px transition-all duration-300 ${active === id ? 'w-8 bg-alakol-turq' : 'w-4 bg-white/30 group-hover:bg-white/60'}`}
          />
          <span
            className={`text-[11px] font-semibold uppercase tracking-wider transition ${active === id ? 'text-alakol-turq' : 'text-white/40 group-hover:text-white/70'}`}
          >
            {t(id)}
          </span>
        </a>
      ))}
    </nav>
  );
}
