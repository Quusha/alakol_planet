import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#05131a] px-6 text-center text-white">
      <div className="font-display text-7xl font-bold text-alakol-turq">404</div>
      <div className="mt-4 space-y-1 text-white/70">
        <p>Мұндай бет жоқ. Аймаққа шолуға оралыңыз.</p>
        <p>Такой страницы нет. Вернитесь к обзору региона.</p>
        <p>This page does not exist. Return to the region overview.</p>
      </div>
      <Link
        href="/kk"
        className="mt-8 rounded-full bg-alakol-turq px-6 py-3 font-bold text-[#04232a] transition hover:scale-105"
      >
        ALAKÓL →
      </Link>
    </main>
  );
}
