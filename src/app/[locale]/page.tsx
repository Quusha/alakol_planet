import { setRequestLocale } from 'next-intl/server';
import { asset } from '@/lib/base';
import OrbitStage from '@/components/OrbitStage';
import LensHeader from '@/components/ui/LensHeader';
import ProgressPath from '@/components/ui/ProgressPath';
import LiveBadge from '@/components/ui/LiveBadge';
import EraSlider from '@/components/scenes/EraSlider';
import MiniCompass from '@/components/globe/MiniCompass';
import Hero from '@/components/sections/Hero';
import Pillars from '@/components/sections/Pillars';
import Audience from '@/components/sections/Audience';
import Routes from '@/components/sections/Routes';
import Stays from '@/components/sections/Stays';
import Reviews from '@/components/sections/Reviews';

export default function HomePage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  return (
    <>
      {/* fixed cinematic background (globe / real-photo fallback) */}
      <OrbitStage />
      {/* taller scroll region drives the calm zoom-in */}
      <div id="flight-track" className="pointer-events-none absolute left-0 top-0 h-[200svh] w-px" aria-hidden />

      {/* UI overlays */}
      <LensHeader />
      <ProgressPath />
      <LiveBadge />
      <EraSlider />
      <MiniCompass />

      {/* content sits above the stage */}
      <main className="relative z-20">
        <Hero />

        {/* Pillars over a real Alakol photo, strongly scrimmed for readability */}
        <section className="on-photo relative">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${asset('/images/alakol-1.jpg')})` }}
            aria-hidden
          />
          <div className="absolute inset-0 bg-[#04121a]/82" aria-hidden />
          <div className="absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-[#04121a] to-transparent" aria-hidden />
          <div className="relative">
            <Pillars />
          </div>
        </section>

        {/* Practical block over a second real photo */}
        <section id="practical" className="on-photo relative">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${asset('/images/alakol-2.jpg')})` }}
            aria-hidden
          />
          <div className="absolute inset-0 bg-[#04121a]/84" aria-hidden />
          <div className="relative">
            <Audience />
            <Routes />
            <Stays />
            <Reviews />
          </div>
        </section>

        <footer className="relative z-20 border-t border-white/10 bg-black/60 px-5 py-10 text-center text-sm text-white/55">
          <div className="font-display text-lg text-white">ALAKÓL</div>
          <p className="mx-auto mt-2 max-w-md">46.1° N · 81.6° E — Абай / Жетісу, Қазақстан</p>
          <p className="mt-3 text-xs text-white/35">© {new Date().getFullYear()} · демо-платформа. TODO-verify.</p>
        </footer>
      </main>
    </>
  );
}
