// Master camera keyframes for the orbit -> descent -> arrival flight.
// `at` is normalised scroll progress [0..1]; `dist` is camera distance from the
// globe centre (globe radius = 2); `look` chooses the camera target.
export interface FlightKey { at: number; dist: number; fov: number; look: 'center' | 'lake'; }

export const FLIGHT: FlightKey[] = [
  { at: 0.0, dist: 7.0, fov: 46, look: 'center' }, // Kadr 0 — orbit
  { at: 0.25, dist: 5.2, fov: 42, look: 'lake' }, // Kadr 1 — aiming
  { at: 0.55, dist: 3.6, fov: 38, look: 'lake' }, // Kadr 2 — atmospheric entry
  { at: 0.8, dist: 2.55, fov: 33, look: 'lake' }, // Kadr 3 — arrival
  { at: 1.0, dist: 2.3, fov: 30, look: 'lake' }, // Kadr 4 — docked (mini-globe)
];

export const GLOBE_RADIUS = 2;
export const ALAKOL_LATLON = { lat: 46.1, lon: 81.6 };
