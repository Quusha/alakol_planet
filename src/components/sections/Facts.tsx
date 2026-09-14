'use client';
import { useTranslations } from 'next-intl';

// TODO-verify: заглушки, уточнить перед публикацией.
const VALUES = ['≈2 650 км²', '≈ +23 °C', '≈ 560 км', 'Ramsar'];

export default function Facts() {
  const t = useTranslations('facts');
  const labels = [t('area'), t('water'), t('from'), t('status')];
  return (
    <section className="border-y" style={{ borderColor: 'var(--line)', background: 'var(--bg-2)' }}>
      <div className="wrap grid grid-cols-2 gap-y-10 py-14 md:grid-cols-4">
        {VALUES.map((v, i) => (
          <div
            key={i}
            className={`px-2 ${i > 0 ? 'md:border-l' : ''}`}
            style={{ borderColor: 'var(--line)' }}
          >
            <div className="title tnum text-3xl sm:text-4xl" style={{ color: 'var(--aqua)' }}>{v}</div>
            <div className="mt-2 text-sm" style={{ color: 'var(--muted)' }}>{labels[i]}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
