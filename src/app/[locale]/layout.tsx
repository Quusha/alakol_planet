import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { locales, isLocale, type Locale } from '@/lib/i18n/config';
import { getMessages } from '@/lib/i18n/messages';
import AppProviders from '@/components/ui/AppProviders';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const locale = (isLocale(params.locale) ? params.locale : 'kk') as Locale;
  const m = getMessages(locale).meta;
  const base = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return {
    title: m.title,
    description: m.description,
    alternates: { languages: { kk: '/kk', ru: '/ru', en: '/en' } },
    openGraph: {
      title: m.title,
      description: m.description,
      type: 'website',
      locale,
      images: [{ url: `${base}/og-image.png`, width: 1200, height: 630 }],
    },
    twitter: { card: 'summary_large_image', title: m.title, description: m.description },
  };
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  setRequestLocale(locale);
  const messages = getMessages(locale);
  return (
    <NextIntlClientProvider locale={locale} messages={messages} timeZone="Asia/Almaty">
      <AppProviders locale={locale}>{children}</AppProviders>
    </NextIntlClientProvider>
  );
}
