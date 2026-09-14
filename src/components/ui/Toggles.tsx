'use client';
import { useTranslations } from 'next-intl';
import { useMotion, useSound } from './AppProviders';

const btn =
  'flex h-9 w-9 items-center justify-center rounded-full border text-sm transition-colors';

export function MotionToggle() {
  const t = useTranslations('ui');
  const { reduced, toggle } = useMotion();
  return (
    <button
      onClick={toggle}
      className={btn}
      style={{ borderColor: 'var(--line)', color: 'var(--fg)' }}
      aria-pressed={reduced}
      aria-label={reduced ? t('fullMotion') : t('reduceMotion')}
      title={reduced ? t('fullMotion') : t('reduceMotion')}
    >
      {reduced ? '▶' : '⏸'}
    </button>
  );
}

export function SoundToggle() {
  const t = useTranslations('ui');
  const { on, toggle } = useSound();
  return (
    <button
      onClick={toggle}
      className={btn}
      style={{ borderColor: 'var(--line)', color: 'var(--fg)' }}
      aria-pressed={on}
      aria-label={t('sound')}
      title={t('sound')}
    >
      {on ? '🔊' : '🔈'}
    </button>
  );
}
