// Time axis for the region: geological -> ancient migrations/Silk Road -> present.
export interface Era { id: string; era: number; key: 'geo' | 'silkroad' | 'modern'; grade: string; }

export const ERAS: Era[] = [
  { id: 'geo', era: 0.0, key: 'geo', grade: 'geo' },
  { id: 'silkroad', era: 0.5, key: 'silkroad', grade: 'landscape' },
  { id: 'modern', era: 1.0, key: 'modern', grade: 'modern' },
];
