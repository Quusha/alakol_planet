'use client';
import { useEffect } from 'react';

// The site lives under /<locale>/. Static export has no server redirects,
// so the root index bounces to the default locale on the client.
export default function RootIndex() {
  useEffect(() => {
    const base = process.env.NEXT_PUBLIC_BASE_PATH || '';
    window.location.replace(`${base}/kk/`);
  }, []);
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#04121a] text-white">
      <a href="./kk/" className="font-display text-2xl text-alakol-turq">
        ALAKÓL →
      </a>
    </main>
  );
}
