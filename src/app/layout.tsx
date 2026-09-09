import type { Metadata, Viewport } from 'next';
import { Inter, Noto_Serif } from 'next/font/google';
import '../styles/tokens.css';
import '../styles/globals.css';

// Both families cover Kazakh Cyrillic (Әә Ғғ Ққ Ңң Өө Ұұ Үү Һһ Іі) in-style,
// so glyphs never fall back to a system font. Subsets pinned explicitly.
const sans = Inter({
  subsets: ['cyrillic', 'cyrillic-ext', 'latin', 'latin-ext'],
  variable: '--font-sans',
  display: 'swap',
});
const serif = Noto_Serif({
  subsets: ['cyrillic', 'cyrillic-ext', 'latin', 'latin-ext'],
  weight: ['400', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

export const viewport: Viewport = { themeColor: '#0B3D46', width: 'device-width', initialScale: 1 };

export const metadata: Metadata = {
  title: 'ALAKÓL',
  description: 'Alakol — a documentary-digital experience.',
  manifest: `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/manifest.webmanifest`,
  icons: { icon: `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/favicon.svg` },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="kk" className={`${sans.variable} ${serif.variable}`} suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
