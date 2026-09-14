'use client';
import { useEffect, useRef, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import LangSwitcher from './LangSwitcher';
import { MotionToggle, SoundToggle } from './Toggles';

const NAV = ['pillars', 'audience', 'routes', 'stays', 'reviews'] as const;

export default function LensHeader() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);
  const pause = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setSolid(y > 60);
      setHidden(y > 300 && y > lastY.current);
      lastY.current = y;
      clearTimeout(pause.current);
      pause.current = setTimeout(() => setHidden(false), 600);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-transform duration-500 ${hidden ? '-translate-y-full' : ''}`}
      style={solid ? { background: 'rgba(5,21,25,0.72)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--line)' } : {}}
    >
      <div className="mx-auto flex max-w-[1160px] items-center gap-6 px-6 py-4">
        <Link href={`/${locale}`} className="serif text-xl font-bold tracking-wide text-white">
          ALAKÓL
        </Link>

        <nav className="ml-auto hidden items-center gap-6 lg:flex">
          {NAV.map((n) => (
            <a
              key={n}
              href={`#${n}`}
              className="link-underline pb-0.5 text-sm"
              style={{ color: 'var(--muted)' }}
            >
              {t(n)}
            </a>
          ))}
          <Link
            href={`/${locale}/practical`}
            className="rounded-full border px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-white/5"
            style={{ borderColor: 'var(--line-strong)' }}
          >
            {t('practical')}
          </Link>
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-2">
          <div className="hidden sm:flex sm:items-center sm:gap-2">
            <MotionToggle />
            <SoundToggle />
          </div>
          <LangSwitcher />
          <button
            className="flex h-9 w-9 items-center justify-center rounded-full border text-white lg:hidden"
            style={{ borderColor: 'var(--line)' }}
            aria-expanded={open}
            aria-label={t('menu')}
            onClick={() => setOpen((o) => !o)}
          >
            ☰
          </button>
        </div>
      </div>

      {open && (
        <div className="mx-4 mb-3 rounded-2xl border p-3 lg:hidden" style={{ borderColor: 'var(--line)', background: 'rgba(5,21,25,0.95)' }}>
          <div className="grid gap-1">
            {NAV.map((n) => (
              <a key={n} href={`#${n}`} onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 text-sm" style={{ color: 'var(--fg)' }}>
                {t(n)}
              </a>
            ))}
            <Link href={`/${locale}/practical`} onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 text-sm font-medium" style={{ color: 'var(--aqua)' }}>
              {t('practical')}
            </Link>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <MotionToggle />
            <SoundToggle />
          </div>
        </div>
      )}
    </header>
  );
}
