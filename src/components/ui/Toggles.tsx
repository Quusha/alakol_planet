'use client';
import { useTranslations } from 'next-intl';
import { useMotion, useSound } from './AppProviders';

export function MotionToggle() {
  const t = useTranslations('ui');
  const { reduced, toggle } = useMotion();
  return (
    <button
      onClick={toggle}
      className="rounded-full border border-white/15 bg-black/20 px-3 py-1.5 text-[11px] font-semibold text-white/80 backdrop-blur transition hover:text-white"
      aria-pressed={reduced}
      title={reduced ? t('fullMotion') : t('reduceMotion')}
    >
      {reduced ? '▷ ' + t('fullMotion') : '❙❙ ' + t('reduceMotion')}
    </button>
  );
}

export function SoundToggle() {
  const t = useTranslations('ui');
  const { on, toggle } = useSound();
  return (
    <button
      onClick={toggle}
      className="rounded-full border border-white/15 bg-black/20 px-3 py-1.5 text-[11px] font-semibold text-white/80 backdrop-blur transition hover:text-white"
      aria-pressed={on}
      title={t('sound')}
    >
      {on ? '🔊' : '🔈'} {t('sound')}
    </button>
  );
}
