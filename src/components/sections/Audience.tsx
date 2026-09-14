'use client';
import { useTranslations } from 'next-intl';
import { DATA } from '@/lib/data';
import { useLoc } from '@/lib/i18n/useLoc';

export default function Audience() {
  const t = useTranslations('audience');
  const loc = useLoc();
  return (
    <section id="audience" className="wrap py-28">
      <header className="max-w-3xl">
        <h2 className="title text-4xl sm:text-6xl">{t('title')}</h2>
        <div className="accent-rule my-6" />
        <p className="lead">{t('intro')}</p>
      </header>

      <div className="mt-14 grid gap-6 md:grid-cols-2">
        <div className="card p-8">
          <h3 className="serif text-xl" style={{ color: 'var(--aqua)' }}>{t('forTitle')}</h3>
          <ul className="mt-6 space-y-4">
            {DATA.audience.for.map((x, i) => (
              <li key={i} className="flex gap-4 text-[15px]" style={{ color: 'var(--fg)' }}>
                <span aria-hidden style={{ color: 'var(--teal)' }}>✓</span>
                <span>{loc(x)}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="card p-8">
          <h3 className="serif text-xl" style={{ color: 'var(--sun)' }}>{t('notForTitle')}</h3>
          <ul className="mt-6 space-y-4">
            {DATA.audience.notFor.map((x, i) => (
              <li key={i} className="flex gap-4 text-[15px]" style={{ color: 'var(--muted)' }}>
                <span aria-hidden style={{ color: 'var(--coral)' }}>✕</span>
                <span>{loc(x)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
