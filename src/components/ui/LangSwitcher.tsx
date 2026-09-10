'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import { locales, localeNames } from '@/lib/i18n/config';

export default function LangSwitcher() {
  const active = useLocale();
  const pathname = usePathname() || '/';
  // pathname begins with /<locale>; swap the first segment.
  const rest = pathname.replace(/^\/(kk|ru|en)(?=\/|$)/, '') || '/';

  return (
    <div className="flex items-center gap-1 rounded-full border border-white/15 bg-black/20 p-1 backdrop-blur">
      {locales.map((l) => (
        <Link
          key={l}
          href={`/${l}${rest}`}
          hrefLang={l}
          aria-current={l === active ? 'true' : undefined}
          className={`rounded-full px-2.5 py-1 text-[11px] font-bold tracking-wide transition ${
            l === active ? 'bg-alakol-turq text-[#04232a]' : 'text-white/70 hover:text-white'
          }`}
        >
          {localeNames[l]}
        </Link>
      ))}
    </div>
  );
}
