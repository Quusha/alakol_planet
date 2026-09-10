'use client';
import { useTranslations } from 'next-intl';
import Reveal from '@/components/ui/Reveal';
import { DATA } from '@/lib/data';
import { useLoc } from '@/lib/i18n/useLoc';

export default function Audience() {
  const t = useTranslations('audience');
  const loc = useLoc();
  return (
    <section id="audience" className="relative border-y border-white/5 bg-black/20">
      <div className="mx-auto max-w-6xl px-5 py-24">
        <Reveal as="h2" caustic className="font-display text-3xl font-bold text-white sm:text-5xl">
          {t('title')}
        </Reveal>
        <Reveal as="p" className="mt-4 max-w-2xl text-white/70">
          {t('intro')}
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          <Reveal className="rounded-3xl border border-alakol-turq/30 bg-alakol-turq/[0.06] p-7">
            <h3 className="font-display text-xl text-alakol-shallow">✓ {t('forTitle')}</h3>
            <ul className="mt-4 space-y-3">
              {DATA.audience.for.map((x, i) => (
                <li key={i} className="flex gap-3 text-sm text-white/80">
                  <span className="text-alakol-turq">◆</span>
                  {loc(x)}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal className="rounded-3xl border border-sun/30 bg-sun/[0.06] p-7">
            <h3 className="font-display text-xl text-sun">✕ {t('notForTitle')}</h3>
            <ul className="mt-4 space-y-3">
              {DATA.audience.notFor.map((x, i) => (
                <li key={i} className="flex gap-3 text-sm text-white/80">
                  <span className="text-sun">◆</span>
                  {loc(x)}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
