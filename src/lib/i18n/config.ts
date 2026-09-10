export const locales = ['kk', 'ru', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'kk';

export const localeNames: Record<Locale, string> = { kk: 'ҚАЗ', ru: 'РУС', en: 'ENG' };

export function isLocale(x: string): x is Locale {
  return (locales as readonly string[]).includes(x);
}
