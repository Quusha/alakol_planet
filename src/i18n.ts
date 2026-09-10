import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';

// Поддерживаемые языки
export const locales = ['ru', 'kk', 'en'];
export const defaultLocale = 'ru';

export default getRequestConfig(async ({locale}) => {
  // Подтверждаем, что запрошенная локаль поддерживается
  if (!locales.includes(locale as any)) notFound();

  return {
    messages: (await import(`../messages/${locale}.json`)).default
  };
});
