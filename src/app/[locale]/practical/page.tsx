import Link from 'next/link';
import { getMessages } from '@/lib/i18n/messages';
import { isLocale, type Locale } from '@/lib/i18n/config';
import { locales } from '@/lib/i18n/config';
import LensHeader from '@/components/ui/LensHeader';
import Audience from '@/components/sections/Audience';
import Routes from '@/components/sections/Routes';
import Stays from '@/components/sections/Stays';
import Reviews from '@/components/sections/Reviews';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function PracticalPage({ params }: { params: { locale: string } }) {
  const locale = (isLocale(params.locale) ? params.locale : 'kk') as Locale;
  const m = getMessages(locale).practical;
  const nav = getMessages(locale).nav;
  return (
    <>
      <LensHeader />
      <main className="relative z-20 min-h-screen bg-[var(--bg)] pt-28">
        <div className="mx-auto max-w-6xl px-5">
          <Link href={`/${locale}`} className="text-sm text-alakol-shallow hover:text-white">
            ← {nav.overview}
          </Link>
          <h1 className="mt-3 font-display text-4xl font-bold text-white sm:text-6xl">{m.title}</h1>
          <p className="mt-4 max-w-2xl text-white/70">{m.intro}</p>
        </div>
        <Audience />
        <Routes />
        <Stays />
        <Reviews />
      </main>
    </>
  );
}
