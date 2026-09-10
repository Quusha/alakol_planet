'use client';
import { useLocale } from 'next-intl';
import type { Locale } from './config';
import type { I18nString } from '../types';

/** Pick the string for the active locale from an { kk, ru, en } object. */
export function useLoc() {
  const locale = useLocale() as Locale;
  return (s: I18nString) => s[locale] ?? s.kk;
}
