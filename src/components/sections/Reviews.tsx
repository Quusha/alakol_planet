'use client';
import { useTranslations } from 'next-intl';
import Reveal from '@/components/ui/Reveal';
import { DATA } from '@/lib/data';
import { useLoc } from '@/lib/i18n/useLoc';

export default function Reviews() {
  const t = useTranslations('reviews');
  const loc = useLoc();
  return (
    <section id="reviews" className="relative mx-auto max-w-6xl px-5 py-24">
      <Reveal as="h2" caustic className="font-display text-3xl font-bold text-white sm:text-5xl">
        {t('title')}
      </Reveal>
      <Reveal as="p" className="mt-4 max-w-2xl text-white/70">
        {t('intro')}
      </Reveal>
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {DATA.reviews.map((r) => (
          <Reveal key={r.id}>
            <figure className="flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.04] p-6">
              <div className="flex items-center justify-between">
                <div className="font-display text-white">{r.name}</div>
                <div className="text-xs text-white/40">{r.date}</div>
              </div>
              <div className="mt-1 text-sun" aria-label={`${t('rating')}: ${r.rating}/5`}>
                {'★'.repeat(r.rating)}
                <span className="text-white/20">{'★'.repeat(5 - r.rating)}</span>
              </div>
              <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-white/80">
                “{loc(r.text)}”
              </blockquote>
              <figcaption className="mt-4 border-t border-white/8 pt-3 text-[11px] text-white/50">
                <span className="font-bold uppercase tracking-wider text-alakol-turq">{t('forWhom')}: </span>
                {loc(r.forWhom)}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
