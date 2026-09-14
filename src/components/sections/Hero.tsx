'use client';
import { useTranslations } from 'next-intl';
import SkipCinematic from '@/components/ui/SkipCinematic';

export default function Hero() {
  const t = useTranslations();
  return (
    <section className="hero-text relative flex min-h-[200svh] flex-col items-center justify-start pt-[22svh] text-center">
      <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-alakol-turq">
        {t('nav.overview')}
      </p>
      <h1 className="mt-4 font-display text-6xl font-bold tracking-tight text-white sm:text-8xl">
        ALAKÓL
      </h1>
      <p className="mt-5 max-w-xl px-6 text-balance text-white/85">{t('meta.description')}</p>

      <div className="pointer-events-auto mt-10 flex flex-col items-center gap-6">
        <SkipCinematic />
        <div className="flex flex-col items-center gap-2 text-white/75">
          <span className="text-xs uppercase tracking-wider">{t('orbit.breathe')}</span>
          <span className="h-3 w-3 rounded-full bg-alakol-turq animate-breathe" aria-hidden />
        </div>
      </div>
    </section>
  );
}
