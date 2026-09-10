import {getRequestConfig} from 'next-intl/server';

// Список поддерживаемых языков вашего проекта
const locales = ['ru', 'kk', 'en'];

export default getRequestConfig(async ({locale}) => {
  // Проверяем, поддерживается ли запрашиваемый язык, иначе fallback на 'ru'
  const currentLocale = locales.includes(locale as any) ? locale : 'ru';

  return {
    messages: (await import(`../../messages/${currentLocale}.json`)).default
  };
});