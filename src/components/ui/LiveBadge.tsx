'use client';
import { useTranslations } from 'next-intl';
import { useAlakolLive } from '@/lib/live/useAlakolLive';

export default function LiveBadge() {
  const t = useTranslations('live');
  const live = useAlakolLive();
  return (
    <div className="pointer-events-none fixed left-4 top-20 z-40 hidden rounded-2xl border border-white/10 bg-black/30 px-4 py-3 backdrop-blur sm:block">
      <div className="text-[10px] font-bold uppercase tracking-wider text-white/50">{t('label')}</div>
      <div className="mt-1 flex items-center gap-4">
        <div>
          <span className="font-display text-xl text-white">{live.temperature}°</span>
          <span className="ml-1 text-[10px] text-white/50">{t('temp')}</span>
        </div>
        <div>
          <span className="font-display text-xl text-white">
            {live.wind}
            <span className="text-xs"> {t('windUnit')}</span>
          </span>
          <span className="ml-1 text-[10px] text-white/50">{t('wind')}</span>
        </div>
        <span
          className="inline-block h-2.5 w-2.5 rounded-full"
          style={{ background: live.waterTint }}
          aria-hidden
        />
      </div>
      {!live.live && <div className="mt-1 text-[9px] text-white/35">{t('offline')}</div>}
    </div>
  );
}
