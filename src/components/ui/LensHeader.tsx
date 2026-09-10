'use client';
import { useEffect, useRef, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import LangSwitcher from './LangSwitcher';
import { MotionToggle, SoundToggle } from './Toggles';

const NAV = [
  { id: 'pillars', href: '#pillars' },
  { id: 'audience', href: '#audience' },
  { id: 'routes', href: '#routes' },
  { id: 'stays', href: '#stays' },
  { id: 'reviews', href: '#reviews' },
] as const;

export default function LensHeader() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);
  const pause = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      // hide while actively scrolling down past the orbit; reveal on pause / up
      setHidden(y > 240 && y > lastY.current);
      lastY.current = y;
      clearTimeout(pause.current);
      pause.current = setTimeout(() => setHidden(false), 600);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-transform duration-500 ${hidden ? '-translate-y-full' : 'translate-y-0'}`}
    >
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
        <Link href={`/${locale}`} className="font-display text-lg font-bold tracking-wide text-white">
          ALAKÓL
        </Link>
        <nav className="ml-auto hidden items-center gap-1 md:flex">
          {NAV.map((n) => (
            <a
              key={n.id}
              href={n.href}
              className="rounded-full px-3 py-1.5 text-sm font-semibold text-white/75 transition hover:bg-white/10 hover:text-white"
            >
              {t(n.id)}
            </a>
          ))}
          <Link
            href={`/${locale}/practical`}
            className="rounded-full bg-alakol-turq/90 px-3 py-1.5 text-sm font-bold text-[#04232a] transition hover:bg-alakol-turq"
          >
            {t('practical')}
          </Link>
        </nav>
        <div className="ml-auto flex items-center gap-2 md:ml-2">
          <div className="hidden sm:flex sm:items-center sm:gap-2">
            <MotionToggle />
            <SoundToggle />
          </div>
          <LangSwitcher />
          <button
            className="rounded-full border border-white/15 bg-black/20 px-3 py-2 text-white md:hidden"
            aria-expanded={open}
            aria-label={t('menu')}
            onClick={() => setOpen((o) => !o)}
          >
            ☰
          </button>
        </div>
      </div>
      {open && (
        <div className="mx-3 mb-2 rounded-2xl border border-white/10 bg-black/60 p-3 backdrop-blur md:hidden">
          <div className="grid gap-1">
            {NAV.map((n) => (
              <a
                key={n.id}
                href={n.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-semibold text-white/85 hover:bg-white/10"
              >
                {t(n.id)}
              </a>
            ))}
            <Link
              href={`/${locale}/practical`}
              onClick={() => setOpen(false)}
              className="rounded-lg bg-alakol-turq/90 px-3 py-2 text-sm font-bold text-[#04232a]"
            >
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
