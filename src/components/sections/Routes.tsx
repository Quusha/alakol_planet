'use client';
import { useTranslations } from 'next-intl';
import { DATA } from '@/lib/data';
import { useLoc } from '@/lib/i18n/useLoc';

export default function Routes() {
  const t = useTranslations('routes');
  const loc = useLoc();
  return (
    <section id="routes" className="wrap py-28">
      <header className="max-w-3xl">
        <h2 className="title text-4xl sm:text-6xl">{t('title')}</h2>
        <div className="accent-rule my-6" />
        <p className="lead">{t('intro')}</p>
      </header>

      <div className="mt-12 overflow-hidden rounded-2xl border" style={{ borderColor: 'var(--line)' }}>
        <table className="w-full border-collapse text-left">
          <thead>
            <tr style={{ color: 'var(--muted)', background: 'var(--panel)' }}>
              <th className="px-6 py-4 text-xs font-semibold tracking-wide">{t('season')}</th>
              <th className="px-6 py-4 text-xs font-semibold tracking-wide">{t('transport')}</th>
              <th className="px-6 py-4 text-right text-xs font-semibold tracking-wide">{t('distance')}</th>
              <th className="px-6 py-4 text-right text-xs font-semibold tracking-wide">{t('time')}</th>
            </tr>
          </thead>
          <tbody>
            {DATA.routes.map((r) => (
              <tr key={r.id} className="border-t transition-colors hover:bg-white/[0.03]" style={{ borderColor: 'var(--line)' }}>
                <td className="px-6 py-5">
                  <div className="serif text-lg" style={{ color: 'var(--fg)' }}>{loc(r.from)}</div>
                  <div className="mt-0.5 text-xs" style={{ color: 'var(--muted)' }}>{loc(r.season)}</div>
                </td>
                <td className="px-6 py-5 text-[15px]" style={{ color: 'var(--muted)' }}>{loc(r.transport)}</td>
                <td className="tnum px-6 py-5 text-right text-[15px]" style={{ color: 'var(--fg)' }}>{r.km} {t('kmUnit')}</td>
                <td className="tnum px-6 py-5 text-right text-[15px]" style={{ color: 'var(--fg)' }}>~{r.hours} {t('hoursUnit')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-sm" style={{ color: 'var(--muted)' }}>{t('note')}</p>
    </section>
  );
}
