import { setRequestLocale } from 'next-intl/server';
import OrbitStage from '@/components/OrbitStage';
import LensHeader from '@/components/ui/LensHeader';
import ProgressPath from '@/components/ui/ProgressPath';
import LiveBadge from '@/components/ui/LiveBadge';
import EraSlider from '@/components/scenes/EraSlider';
import MiniCompass from '@/components/globe/MiniCompass';
import Hero from '@/components/sections/Hero';
import ArrivalBand from '@/components/sections/ArrivalBand';
import Pillars from '@/components/sections/Pillars';
import Facts from '@/components/sections/Facts';
import Audience from '@/components/sections/Audience';
import Routes from '@/components/sections/Routes';
import Stays from '@/components/sections/Stays';
import Reviews from '@/components/sections/Reviews';
import Gallery from '@/components/sections/Gallery';

export default function HomePage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  return (
    <>
      {/* fixed cinematic background (globe / photo fallback) — only visible behind the hero */}
      <OrbitStage />
      <div id="flight-track" className="pointer-events-none absolute left-0 top-0 h-[200svh] w-px" aria-hidden />

      {/* overlays */}
      <LensHeader />
      <ProgressPath />
      <LiveBadge />
      <EraSlider />
      <MiniCompass />

      <main className="relative z-20">
        <Hero />

        {/* solid editorial surface that covers the globe as you scroll in */}
        <div className="relative z-20" style={{ background: 'var(--ink)' }}>
          <ArrivalBand />
          <Pillars />
          <Facts />
          <div id="practical">
            <Audience />
            <Routes />
            <Stays />
            <Reviews />
          </div>
          <Gallery />

          <footer className="border-t py-14 text-center" style={{ borderColor: 'var(--line)' }}>
            <div className="serif text-2xl text-white">ALAKÓL</div>
            <p className="mt-3 text-sm" style={{ color: 'var(--muted)' }}>
              46.1° N · 81.6° E — Абай / Жетісу, Қазақстан
            </p>
            <p className="mt-2 text-xs" style={{ color: 'var(--muted)', opacity: 0.7 }}>
              © {new Date().getFullYear()} · демо-платформа · деректер тексеруді қажет етеді (TODO-verify)
            </p>
          </footer>
        </div>
      </main>
    </>
  );
}
