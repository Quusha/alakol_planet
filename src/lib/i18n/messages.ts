import kk from '../../../messages/kk.json';
import ru from '../../../messages/ru.json';
import en from '../../../messages/en.json';
import type { Locale } from './config';

// Direct imports keep everything static-export friendly (no middleware needed).
export const MESSAGES = { kk, ru, en } as const;
export type Messages = typeof ru;

export function getMessages(locale: Locale): Messages {
  return (MESSAGES[locale] ?? MESSAGES.kk) as Messages;
}
