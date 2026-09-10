'use client';
import { useTranslations } from 'next-intl';
import Reveal from '@/components/ui/Reveal';
import { DATA } from '@/lib/data';

export default function Pillars() {
  const t = useTranslations('pillars');
  return (
    <section id="pillars" className="relative mx-auto max-w-6xl px-5 py-24">
      <Reveal as="h2" caustic className="font-display text-3xl font-bold text-white sm:text-5xl">
        {t('title')}
      </Reveal>
      <Reveal as="p" className="mt-4 max-w-2xl text-white/70">
        {t('intro')}
      </Reveal>
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {DATA.pillars.map((p, i) => (
          <Reveal key={p.id}>
            <article
              className="group h-full rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur transition hover:-translate-y-1 hover:bg-white/[0.07]"
              style={{ boxShadow: `inset 0 0 0 1px ${p.accent}22` }}
            >
              <div
                className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl text-2xl"
                style={{ background: `${p.accent}22` }}
              >
                {p.icon}
              </div>
              <div className="text-[11px] font-bold uppercase tracking-wider" style={{ color: p.accent }}>
                {String(i + 1).padStart(2, '0')} · {t(`${p.id}.tagline` as never)}
              </div>
              <h3 className="mt-1 font-display text-xl text-white">{t(`${p.id}.title` as never)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/70">{t(`${p.id}.body` as never)}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
