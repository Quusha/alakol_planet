'use client';
import { useEffect, useState } from 'react';

// Alakol lake centre (approx). TODO-verify precise station coordinates.
export const ALAKOL_COORDS = { lat: 46.1, lon: 81.6 };

export interface LiveData {
  wind: number; // m/s
  temperature: number; // °C
  sky: 'clear' | 'clouds' | 'night';
  sunElevation: number; // degrees above horizon (negative = night)
  waterTint: string; // hex, derived
  live: boolean; // false => graceful fallback values
}

const FALLBACK: LiveData = {
  wind: 4,
  temperature: 24,
  sky: 'clear',
  sunElevation: 40,
  waterTint: '#2FB6BE',
  live: false,
};

/** Rough solar elevation for tinting/day-night (not astronomical-grade). */
function solarElevation(date: Date, lat: number): number {
  const day = Math.floor((date.getTime() - Date.UTC(date.getUTCFullYear(), 0, 0)) / 86400000);
  const decl = 23.44 * Math.sin(((360 / 365) * (day - 81) * Math.PI) / 180);
  const hour = date.getUTCHours() + date.getUTCMinutes() / 60 + ALAKOL_COORDS.lon / 15; // local solar time approx
  const hourAngle = 15 * (hour - 12);
  const rad = Math.PI / 180;
  const elev =
    Math.asin(
      Math.sin(lat * rad) * Math.sin(decl * rad) +
        Math.cos(lat * rad) * Math.cos(decl * rad) * Math.cos(hourAngle * rad),
    ) / rad;
  return elev;
}

function tintFor(elev: number): string {
  if (elev < -2) return '#0B3D46'; // night
  if (elev < 8) return '#E8B667'; // low sun — warm
  if (elev < 25) return '#7FD8D2';
  return '#2FB6BE'; // high sun — bright turquoise
}

/**
 * Live environment hook. Returns graceful fallbacks immediately, then upgrades
 * to real data if NEXT_PUBLIC_OPENWEATHER_KEY is set (feature-flagged).
 */
export function useAlakolLive(): LiveData {
  const [data, setData] = useState<LiveData>(FALLBACK);

  useEffect(() => {
    // Always compute a plausible sun/tint locally so the scene feels alive offline.
    const elev = solarElevation(new Date(), ALAKOL_COORDS.lat);
    setData((d) => ({ ...d, sunElevation: elev, waterTint: tintFor(elev), sky: elev < -2 ? 'night' : d.sky }));

    const key = process.env.NEXT_PUBLIC_OPENWEATHER_KEY;
    if (!key) return; // feature flag off -> stay on fallback

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${ALAKOL_COORDS.lat}&lon=${ALAKOL_COORDS.lon}&units=metric&appid=${key}`;
    let cancelled = false;
    fetch(url)
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((j) => {
        if (cancelled) return;
        const sky: LiveData['sky'] = elev < -2 ? 'night' : (j.clouds?.all ?? 0) > 40 ? 'clouds' : 'clear';
        setData({
          wind: Math.round((j.wind?.speed ?? FALLBACK.wind) * 10) / 10,
          temperature: Math.round(j.main?.temp ?? FALLBACK.temperature),
          sky,
          sunElevation: elev,
          waterTint: tintFor(elev),
          live: true,
        });
      })
      .catch(() => void 0); // keep graceful fallback
    return () => {
      cancelled = true;
    };
  }, []);

  return data;
}
