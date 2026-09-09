import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        alakol: {
          deep: '#0B3D46',
          teal: '#12808C',
          turq: '#2FB6BE',
          shallow: '#7FD8D2',
          mist: '#DCEFEC',
        },
        stone: { DEFAULT: '#B9A488', dark: '#4A4038' },
        sun: '#E8B667',
        ink: '#14231F',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Noto Serif', 'serif'],
        sans: ['var(--font-sans)', 'Inter', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        breathe: { '0%,100%': { opacity: '0.4', transform: 'scale(1)' }, '50%': { opacity: '1', transform: 'scale(1.25)' } },
        floaty: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-6px)' } },
      },
      animation: {
        breathe: 'breathe 2.6s ease-in-out infinite',
        floaty: 'floaty 5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
export default config;
