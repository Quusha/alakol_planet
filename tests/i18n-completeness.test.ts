import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const dir = dirname(fileURLToPath(import.meta.url));
const load = (l: string) => JSON.parse(readFileSync(join(dir, '..', 'messages', `${l}.json`), 'utf8'));

function keys(obj: unknown, prefix = ''): string[] {
  if (obj && typeof obj === 'object' && !Array.isArray(obj)) {
    return Object.entries(obj as Record<string, unknown>).flatMap(([k, v]) =>
      keys(v, prefix ? `${prefix}.${k}` : k),
    );
  }
  return [prefix];
}

describe('i18n completeness', () => {
  const kk = keys(load('kk')).sort();
  const ru = keys(load('ru')).sort();
  const en = keys(load('en')).sort();

  it('ru has the same keys as kk', () => expect(ru).toEqual(kk));
  it('en has the same keys as kk', () => expect(en).toEqual(kk));
  it('has a non-trivial number of keys', () => expect(kk.length).toBeGreaterThan(40));
});
