'use client';
import { useTranslations } from 'next-intl';
import Reveal from '@/components/ui/Reveal';
import { DATA } from '@/lib/data';
import { useLoc } from '@/lib/i18n/useLoc';

export default function Stays() {
  const t = useTranslations('stays');
  const loc = useLoc();
  const fmt = (n: number) => new Intl.NumberFormat('ru-RU').format(n) + ' ₸';
  return (
    <section id="stays" className="relative border-y border-white/5 bg-black/20">
      <div className="mx-auto max-w-6xl px-5 py-24">
        <Reveal as="h2" caustic className="font-display text-3xl font-bold text-white sm:text-5xl">
          {t('title')}
        </Reveal>
        <Reveal as="p" className="mt-4 max-w-2xl text-white/70">
          {t('intro')}
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {DATA.stays.map((s) => (
            <Reveal key={s.id}>
              <article className="flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.04] p-6">
                <h3 className="font-display text-lg text-white">{loc(s.type)}</h3>
                <div className="mt-1 text-alakol-shallow">
                  <span className="text-xs text-white/50">{t('priceFrom')} </span>
                  <span className="font-display text-xl">{fmt(s.priceFrom)}</span>
                  <span className="text-xs text-white/50"> / {t('perNight')}</span>
                </div>
                <div className="mt-4 text-[11px] font-bold uppercase tracking-wider text-alakol-turq">
                  {t('amenities')}
                </div>
                <ul className="mt-1 space-y-1 text-sm text-white/75">
                  {s.amenities.map((a, i) => (
                    <li key={i}>+ {loc(a)}</li>
                  ))}
                </ul>
                <div className="mt-4 text-[11px] font-bold uppercase tracking-wider text-sun">
                  {t('missing')}
                </div>
                <ul className="mt-1 space-y-1 text-sm text-white/60">
                  {s.missing.map((a, i) => (
                    <li key={i}>− {loc(a)}</li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
