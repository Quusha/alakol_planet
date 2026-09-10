'use client';
import { useTranslations } from 'next-intl';

export default function MiniCompass() {
  const t = useTranslations();
  const backToOrbit = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  return (
    <button
      onClick={backToOrbit}
      title={t('ui.expand')}
      className="pointer-events-auto fixed bottom-4 right-4 z-40 flex h-16 w-16 items-center justify-center rounded-full border border-white/15 bg-black/35 backdrop-blur transition hover:scale-105"
    >
      <svg viewBox="0 0 64 64" className="h-12 w-12">
        <circle cx="32" cy="32" r="28" fill="none" stroke="rgba(127,216,210,.4)" strokeWidth="1.5" />
        <path d="M32 8 L37 32 L32 30 L27 32 Z" fill="#E8B667" />
        <path d="M32 56 L27 32 L32 34 L37 32 Z" fill="rgba(255,255,255,.5)" />
        <circle cx="32" cy="32" r="3" fill="#2FB6BE" />
      </svg>
      <span className="absolute -top-1 left-1/2 -translate-x-1/2 rounded bg-black/60 px-1 text-[9px] font-bold text-white/80">
        {t('compass.north')}
      </span>
      <span className="sr-only">{t('ui.youAreHere')}</span>
    </button>
  );
}
