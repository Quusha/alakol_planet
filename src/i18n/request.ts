import {getRequestConfig} from 'next-intl/server';

const locales = ['ru', 'kk', 'en'];

export default getRequestConfig(async ({locale}) => {
  const currentLocale = locales.includes(locale as any) ? locale : 'ru';

  return {
    messages: (await import(`../../messages/${currentLocale}.json`)).default
  };
});