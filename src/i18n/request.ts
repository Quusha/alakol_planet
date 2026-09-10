import {getRequestConfig} from 'next-intl/server';
import {routing} from './routing'; // или ваш массив локалей

export default getRequestConfig(async ({locale}) => {
  return {
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});