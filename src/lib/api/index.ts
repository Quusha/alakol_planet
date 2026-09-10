import { DATA } from '../data';
import type { Pillar, Route, Stay, Review, Audience, Species } from '../types';

/**
 * Data-access abstraction. Today it reads local JSON; swap the bodies for
 * fetch() calls to a headless CMS/API without touching components.
 * See README "Backend contracts".
 */
export const api = {
  async getPillars(): Promise<Pillar[]> {
    return DATA.pillars;
  },
  async getRoutes(): Promise<Route[]> {
    return DATA.routes;
  },
  async getStays(): Promise<Stay[]> {
    return DATA.stays;
  },
  async getReviews(): Promise<Review[]> {
    return DATA.reviews;
  },
  async getAudience(): Promise<Audience> {
    return DATA.audience;
  },
  async getBiodiversity(): Promise<Species[]> {
    return DATA.biodiversity;
  },
};
