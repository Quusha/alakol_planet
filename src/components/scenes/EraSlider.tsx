'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useMotion } from '@/components/ui/AppProviders';
import { ERAS } from '@/scenes/eras';

export default function EraSlider() {
  const t = useTranslations('eras');
  const { reduced } = useMotion();
  const [idx, setIdx] = useState(2); // default: present day

  const setEra = (i: number) => {
    setIdx(i);
    const era = ERAS[i];
    document.documentElement.style.setProperty('--era', String(era.era));
    document.body.dataset.era = era.grade;
    // notify 3D scene
    window.dispatchEvent(new CustomEvent('alakol:era', { detail: era.era }));
    // brief archaic<->digital seam glitch (skipped when motion reduced)
    if (!reduced) {
      document.body.classList.add('era-glitch');
      window.setTimeout(() => document.body.classList.remove('era-glitch'), 210);
    }
  };

  return (
    <div className="pointer-events-auto fixed bottom-4 left-1/2 z-40 -translate-x-1/2">
      <div className="flex items-center gap-3 rounded-full border border-white/12 bg-black/35 px-4 py-2 backdrop-blur">
        <span className="hidden text-[11px] font-semibold uppercase tracking-wider text-white/50 sm:inline">
          {t('title')}
        </span>
        <div className="flex items-center gap-1.5">
          {ERAS.map((e, i) => (
            <button
              key={e.id}
              onClick={() => setEra(i)}
              aria-pressed={idx === i}
              className={`rounded-full px-3 py-1.5 text-[11px] font-bold transition ${
                idx === i ? 'bg-sun text-[#2a1e10]' : 'text-white/70 hover:bg-white/10'
              }`}
            >
              {t(e.key)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
