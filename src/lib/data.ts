import pillars from '../../data/pillars.json';
import routes from '../../data/routes.json';
import stays from '../../data/stays.json';
import reviews from '../../data/reviews.json';
import audience from '../../data/audience.json';
import biodiversity from '../../data/biodiversity.json';
import type { Pillar, Route, Stay, Review, Audience, Species } from './types';

// TODO: replace these local JSON files with a headless CMS/API (see README "Backend contracts").
export const DATA = {
  pillars: pillars as Pillar[],
  routes: routes as Route[],
  stays: stays as Stay[],
  reviews: reviews as Review[],
  audience: audience as Audience,
  biodiversity: biodiversity as Species[],
};
