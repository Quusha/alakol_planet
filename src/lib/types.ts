import type { Locale } from './i18n/config';
export type I18nString = Record<Locale, string>;

export interface Pillar { id: string; icon: string; accent: string; era: number; }
export interface Route { id: string; from: I18nString; transport: I18nString; km: number; hours: number; season: I18nString; }
export interface Stay { id: string; type: I18nString; priceFrom: number; amenities: I18nString[]; missing: I18nString[]; }
export interface Review { id: string; name: string; date: string; rating: number; text: I18nString; forWhom: I18nString; }
export interface Audience { for: I18nString[]; notFor: I18nString[]; }
export interface Species { id: string; latin: string; name: I18nString; note: I18nString; }
