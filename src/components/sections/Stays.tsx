'use client';
import { useTranslations } from 'next-intl';
import { DATA } from '@/lib/data';
import { useLoc } from '@/lib/i18n/useLoc';

export default function Stays() {
  const t = useTranslations('stays');
  const loc = useLoc();
  const fmt = (n: number) => new Intl.NumberFormat('ru-RU').format(n) + ' ₸';
  return (
    <section id="stays" className="wrap py-28">
      <header className="max-w-3xl">
        <h2 className="title text-4xl sm:text-6xl">{t('title')}</h2>
        <div className="accent-rule my-6" />
        <p className="lead">{t('intro')}</p>
      </header>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {DATA.stays.map((s) => (
          <article key={s.id} className="card flex h-full flex-col p-8">
            <h3 className="serif text-lg" style={{ color: 'var(--fg)' }}>{loc(s.type)}</h3>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-xs" style={{ color: 'var(--muted)' }}>{t('priceFrom')}</span>
              <span className="title tnum text-2xl" style={{ color: 'var(--aqua)' }}>{fmt(s.priceFrom)}</span>
              <span className="text-xs" style={{ color: 'var(--muted)' }}>/ {t('perNight')}</span>
            </div>

            <div className="mt-6 text-xs font-semibold" style={{ color: 'var(--teal)' }}>{t('amenities')}</div>
            <ul className="mt-2 space-y-1.5 text-sm" style={{ color: 'var(--fg)' }}>
              {s.amenities.map((a, i) => <li key={i}>+ {loc(a)}</li>)}
            </ul>

            <div className="mt-5 text-xs font-semibold" style={{ color: 'var(--sun)' }}>{t('missing')}</div>
            <ul className="mt-2 space-y-1.5 text-sm" style={{ color: 'var(--muted)' }}>
              {s.missing.map((a, i) => <li key={i}>− {loc(a)}</li>)}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
