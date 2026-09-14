'use client';
import { useTranslations } from 'next-intl';
import { DATA } from '@/lib/data';
import { useLoc } from '@/lib/i18n/useLoc';

export default function Reviews() {
  const t = useTranslations('reviews');
  const loc = useLoc();
  return (
    <section id="reviews" className="wrap py-28">
      <header className="max-w-3xl">
        <h2 className="title text-4xl sm:text-6xl">{t('title')}</h2>
        <div className="accent-rule my-6" />
        <p className="lead">{t('intro')}</p>
      </header>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {DATA.reviews.map((r) => (
          <figure key={r.id} className="card flex h-full flex-col p-8">
            <div className="text-lg" style={{ color: 'var(--sun)' }} aria-label={`${t('rating')}: ${r.rating}/5`}>
              {'★'.repeat(r.rating)}<span style={{ color: 'var(--line-strong)' }}>{'★'.repeat(5 - r.rating)}</span>
            </div>
            <blockquote className="serif mt-4 flex-1 text-[17px] leading-relaxed" style={{ color: 'var(--fg)' }}>
              {loc(r.text)}
            </blockquote>
            <figcaption className="mt-6 border-t pt-4 text-sm" style={{ borderColor: 'var(--line)', color: 'var(--muted)' }}>
              <span style={{ color: 'var(--fg)' }}>{r.name}</span> · {r.date}
              <div className="mt-1 text-xs">{t('forWhom')}: {loc(r.forWhom)}</div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
