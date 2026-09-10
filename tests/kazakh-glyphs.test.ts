import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const dir = dirname(fileURLToPath(import.meta.url));
const load = (l: string) => JSON.parse(readFileSync(join(dir, '..', 'messages', `${l}.json`), 'utf8'));

// Every Kazakh-specific glyph must appear in the acceptance string.
const GLYPHS = ['Ә', 'ә', 'Ғ', 'ғ', 'Қ', 'қ', 'Ң', 'ң', 'Ө', 'ө', 'Ұ', 'ұ', 'Ү', 'ү', 'Һ', 'һ', 'І', 'і'];

describe('Kazakh glyph acceptance string', () => {
  for (const l of ['kk', 'ru', 'en']) {
    it(`${l}.json exposes glyphTest`, () => {
      const s = load(l).glyphTest as string;
      expect(typeof s).toBe('string');
      expect(s.length).toBeGreaterThan(10);
    });
  }
  it('kk glyphTest contains every Kazakh glyph', () => {
    const s = load('kk').glyphTest as string;
    for (const g of GLYPHS) expect(s.includes(g), `missing ${g}`).toBe(true);
  });
});
