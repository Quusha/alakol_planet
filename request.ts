import { getRequestConfig } from 'next-intl/server';

const locales = ['kk', 'ru', 'en'];

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (!locale || !locales.includes(locale)) locale = 'kk';
  const messages = (await import(`../../messages/${locale}.json`)).default;
  return { locale, messages };
});
