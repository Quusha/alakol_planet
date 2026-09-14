'use client';
import { useTranslations } from 'next-intl';
import SkipCinematic from '@/components/ui/SkipCinematic';

export default function Hero() {
  const t = useTranslations();
  return (
    <section className="hero-text relative min-h-[200svh]">
      <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <h1 className="rise rise-1 serif text-7xl font-bold tracking-tight text-white sm:text-[9rem]">
          ALAKÓL
        </h1>
        <p className="rise rise-2 mt-6 max-w-xl text-pretty text-lg" style={{ color: 'rgba(234,244,241,.9)' }}>
          {t('meta.description')}
        </p>
        <div className="rise rise-3 pointer-events-auto mt-10 flex flex-col items-center gap-7">
          <SkipCinematic />
          <div className="flex flex-col items-center gap-2" style={{ color: 'rgba(234,244,241,.7)' }}>
            <span className="text-xs tracking-wide">{t('orbit.breathe')}</span>
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--aqua)] animate-breathe" aria-hidden />
          </div>
        </div>
      </div>
    </section>
  );
}
