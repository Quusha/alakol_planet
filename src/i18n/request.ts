import { getRequestConfig } from 'next-intl/server';

// Minimal config so next-intl's build step is satisfied.
// Messages are still provided via NextIntlClientProvider in [locale]/layout.tsx.
export default getRequestConfig(async ({ locale }) => {
  const messages = (await import(`../../messages/${locale}.json`)).default;
  return { locale: locale ?? 'kk', messages };
});
