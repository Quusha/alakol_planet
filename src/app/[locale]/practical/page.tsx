import Link from 'next/link';
import { setRequestLocale } from 'next-intl/server';
import { getMessages } from '@/lib/i18n/messages';
import { isLocale, type Locale, locales } from '@/lib/i18n/config';
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
  setRequestLocale(locale);
  const m = getMessages(locale).practical;
  const nav = getMessages(locale).nav;
  return (
    <>
      <LensHeader />
      <main className="relative min-h-screen pt-32" style={{ background: 'var(--ink)' }}>
        <div className="wrap">
          <Link href={`/${locale}`} className="link-underline text-sm" style={{ color: 'var(--aqua)' }}>
            ← {nav.overview}
          </Link>
          <h1 className="title mt-4 text-5xl sm:text-7xl">{m.title}</h1>
          <div className="accent-rule my-6" />
          <p className="lead">{m.intro}</p>
        </div>
        <Audience />
        <Routes />
        <Stays />
        <Reviews />
      </main>
    </>
  );
}
