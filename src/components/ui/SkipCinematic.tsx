'use client';
import { useTranslations } from 'next-intl';

export default function SkipCinematic() {
  const t = useTranslations('nav');
  return (
    <a
      href="#practical"
      className="pointer-events-auto rounded-full border border-white/25 bg-black/25 px-4 py-2 text-xs font-semibold text-white/90 backdrop-blur transition hover:bg-black/40"
    >
      {t('skip')} ↓
    </a>
  );
}
