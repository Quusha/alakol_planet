'use client';
import { useTranslations } from 'next-intl';
import { asset } from '@/lib/base';

export default function ArrivalBand() {
  const t = useTranslations();
  return (
    <section className="wrap pt-20">
      <figure className="frame on-photo aspect-[21/10]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={asset('/images/alakol-1.jpg')} alt="" className="h-full w-full object-cover" />
        <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent p-8 sm:p-10">
          <p className="serif max-w-2xl text-xl text-white sm:text-3xl">{t('arrival.caption')}</p>
        </figcaption>
      </figure>
    </section>
  );
}
