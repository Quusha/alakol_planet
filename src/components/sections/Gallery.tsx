'use client';
import { useTranslations } from 'next-intl';
import { asset } from '@/lib/base';

const SHOTS = ['/images/alakol-1.jpg', '/images/alakol-2.jpg', '/images/alakol-3.jpg'];

export default function Gallery() {
  const t = useTranslations('gallery');
  return (
    <section className="wrap py-28">
      <header className="max-w-3xl">
        <h2 className="title text-4xl sm:text-5xl">{t('title')}</h2>
        <div className="accent-rule my-6" />
        <p className="lead">{t('caption')}</p>
      </header>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {SHOTS.map((s) => (
          <figure key={s} className="frame aspect-[4/3]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={asset(s)} alt="" className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" />
          </figure>
        ))}
      </div>
    </section>
  );
}
