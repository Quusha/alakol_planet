'use client';
import { useTranslations } from 'next-intl';
import { DATA } from '@/lib/data';

export default function Pillars() {
  const t = useTranslations('pillars');
  return (
    <section id="pillars" className="wrap py-28">
      <header className="max-w-3xl">
        <h2 className="title text-4xl sm:text-6xl">{t('title')}</h2>
        <div className="accent-rule my-6" />
        <p className="lead">{t('intro')}</p>
      </header>

      <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {DATA.pillars.map((p) => (
          <article key={p.id} className="card group relative overflow-hidden p-8 transition-colors">
            <span
              className="absolute inset-x-0 top-0 h-[3px]"
              style={{ background: `linear-gradient(90deg, ${p.accent}, transparent 85%)` }}
              aria-hidden
            />
            <div
              className="flex h-12 w-12 items-center justify-center rounded-2xl text-xl"
              style={{ background: `${p.accent}1f`, color: p.accent }}
              aria-hidden
            >
              {p.icon}
            </div>
            <h3 className="title mt-6 text-2xl">{t(`${p.id}.title` as never)}</h3>
            <p className="serif mt-1 text-[15px] italic" style={{ color: 'var(--sand)' }}>
              {t(`${p.id}.tagline` as never)}
            </p>
            <p className="mt-4 text-[15px] leading-relaxed" style={{ color: 'var(--muted)' }}>
              {t(`${p.id}.body` as never)}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
