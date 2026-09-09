'use client';
import { useTranslations } from 'next-intl';
import Reveal from '@/components/ui/Reveal';
import { DATA } from '@/lib/data';
import { useLoc } from '@/lib/i18n/useLoc';

export default function Routes() {
  const t = useTranslations('routes');
  const loc = useLoc();
  return (
    <section id="routes" className="relative mx-auto max-w-6xl px-5 py-24">
      <Reveal as="h2" caustic className="font-display text-3xl font-bold text-white sm:text-5xl">
        {t('title')}
      </Reveal>
      <Reveal as="p" className="mt-4 max-w-2xl text-white/70">
        {t('intro')}
      </Reveal>
      <div className="mt-10 overflow-hidden rounded-3xl border border-white/10">
        <table className="w-full border-collapse text-left text-sm">
          <thead className="bg-white/[0.04] text-[11px] uppercase tracking-wider text-white/50">
            <tr>
              <th className="px-4 py-3 font-semibold">{t('season')}</th>
              <th className="px-4 py-3 font-semibold">{t('transport')}</th>
              <th className="px-4 py-3 text-right font-semibold">{t('distance')}</th>
              <th className="px-4 py-3 text-right font-semibold">{t('time')}</th>
            </tr>
          </thead>
          <tbody>
            {DATA.routes.map((r) => (
              <tr key={r.id} className="border-t border-white/8 transition hover:bg-white/[0.03]">
                <td className="px-4 py-4">
                  <div className="font-display text-base text-white">{loc(r.from)}</div>
                  <div className="text-[11px] text-white/45">{loc(r.season)}</div>
                </td>
                <td className="px-4 py-4 text-white/80">{loc(r.transport)}</td>
                <td className="px-4 py-4 text-right text-white/80">
                  {r.km} {t('kmUnit')}
                </td>
                <td className="px-4 py-4 text-right text-white/80">
                  ~{r.hours} {t('hoursUnit')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-xs text-white/40">{t('note')}</p>
    </section>
  );
}
