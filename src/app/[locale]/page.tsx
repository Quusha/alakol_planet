import { setRequestLocale } from 'next-intl/server';
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
      <OrbitStage />
      <div id="flight-track" className="pointer-events-none absolute left-0 top-0 h-[130svh] w-px" aria-hidden />
      <LensHeader />
      <ProgressPath />
      <LiveBadge />
      <EraSlider />
      <MiniCompass />
      <main className="relative z-20">
        <Hero />
        <div className="bg-black/20 backdrop-blur-[2px]">
          <Pillars />
          <div id="practical">
            <Audience />
            <Routes />
            <Stays />
            <Reviews />
          </div>
        </div>
        <footer className="relative z-20 border-t border-white/10 bg-black/40 px-5 py-10 text-center text-sm text-white/50">
          <div className="font-display text-lg text-white">ALAKÓL</div>
          <p className="mx-auto mt-2 max-w-md">46.1° N · 81.6° E — Абай / Жетісу, Қазақстан</p>
          <p className="mt-3 text-xs text-white/30">© {new Date().getFullYear()} · демо-платформа. TODO-verify.</p>
        </footer>
      </main>
    </>
  );
}
