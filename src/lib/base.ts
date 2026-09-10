// Prepend the GitHub Pages base path to raw asset URLs (textures, audio) that
// are loaded outside next/image & next/link (e.g. three.js TextureLoader).
export const BASE = process.env.NEXT_PUBLIC_BASE_PATH || '';
export const asset = (p: string): string => `${BASE}${p.startsWith('/') ? p : `/${p}`}`;
