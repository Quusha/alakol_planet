# ALAKÓL — «Планета / Time-Travel»

Интерактивный документально-мистический цифровой опыт об озере **Алаколь** (Абай / Жетісу, Казахстан). Скролл — это полёт из орбиты к бирюзовой воде; ось времени меняет «эпоху» региона; шесть опор уникальности и честный практический блок (как добраться / где жить / цены / отзывы / для кого).

Стек: **Next.js 14 (App Router) · React 18 · TypeScript (strict) · React Three Fiber / three · GSAP + Lenis · next-intl (kk/ru/en) · Tailwind**. Собирается в статику и публикуется на **GitHub Pages**.

---

## Запуск

```bash
npm install
npm run dev        # http://localhost:3000  (откроется /kk/)
npm run build      # статический экспорт в ./out
npm run test       # vitest: полнота словарей + казахские глифы
npm run e2e        # playwright smoke (нужен запущенный dev-сервер)
```

Node ≥ 18.18.

---

## Публикация на GitHub Pages (автоматически)

1. Создайте репозиторий и запушьте код в ветку `main`.
2. В настройках репозитория: **Settings → Pages → Build and deployment → Source = GitHub Actions**.
3. Пуш в `main` запускает `.github/workflows/deploy.yml`, который:
   - собирает сайт с `PAGES_BASE_PATH=/<имя-репозитория>` (чтобы ассеты грузились из подпапки Pages);
   - добавляет `.nojekyll`;
   - публикует папку `out/` в Pages.
4. Сайт появится по адресу `https://<username>.github.io/<repo>/`.

> Локальная сборка идёт без `basePath` (корень `/`). Base path подставляется только в CI.

**Свой домен?** Уберите `PAGES_BASE_PATH` из workflow (или задайте пустым) и добавьте `public/CNAME`.

---

## Принятые допущения (важно)

ТЗ описывает идеальную архитектуру; ниже — решения, принятые для честной работы именно на **статическом хостинге** Pages:

1. **`output: 'export'`.** Pages не умеет запускать сервер Next, поэтому весь сайт — статические HTML/JS. Серверных функций и `next/image`-оптимизации нет (`images.unoptimized`).
2. **i18n без middleware.** `next-intl` подключён через `NextIntlClientProvider` с прямым импортом словарей и `generateStaticParams` для локалей `kk/ru/en`. Middleware на Pages не исполняется, поэтому маршрутизация локалей — статическая (`/kk/`, `/ru/`, `/en/`), а корень `/` делает клиентский редирект на `/kk/`. Дефолтная локаль — **kk**.
3. **Тяжёлый WebGL — только на клиенте.** `Experience` (глобус) грузится через `dynamic(..., { ssr: false })`. Текстовые секции остаются в статическом HTML (SEO). Есть детект WebGL и `prefers-reduced-motion`: при их отсутствии показывается статичный кадр-постер (`public/images/arrival-poster.png`) + SVG-каустика вместо анимации.
4. **Текстуры — заглушки.** `public/textures/*` и постеры сгенерированы программно и помечены как placeholder. Замените на реальные: земля — **NASA Blue Marble** (public domain, https://visibleearth.nasa.gov/collection/1484/blue-marble), вода/каустики — своя съёмка. Файлы можно просто перезаписать под теми же именами.
5. **Живые данные — за фиче-флагом.** `useAlakolLive()` по умолчанию отдаёт красивые дефолты (ветер/температура/цвет воды из расчёта высоты солнца). Реальные данные включаются переменной окружения `NEXT_PUBLIC_OPENWEATHER_KEY` (адаптер OpenWeather по координатам 46.1, 81.6).
6. **Факты и цифры — `TODO-verify`.** Расстояния/время в пути/цены в `data/*.json` — реалистичные заглушки, требуют проверки перед публикацией.
7. **Шрифты.** Заголовки — Noto Serif, текст — Inter; оба подключены через `next/font` с сабсетами `cyrillic, cyrillic-ext, latin, latin-ext` — казахские глифы `Әә Ғғ Ққ Ңң Өө Ұұ Үү Һһ Іі` рисуются одним шрифтом без fallback-разнобоя.

---

## Backend contracts (готовность к CMS)

Компоненты не читают JSON напрямую — между ними слой `src/lib/api/index.ts`:

```ts
api.getPillars()      // Pillar[]
api.getRoutes()       // Route[]
api.getStays()        // Stay[]
api.getReviews()      // Review[]   // модерация-ready коллекция
api.getAudience()     // Audience
api.getBiodiversity() // Species[]
```

Чтобы перейти на headless CMS (Sanity / Strapi / Directus): замените тела методов на `fetch()`, сохранив возвращаемые типы из `src/lib/types.ts`. Локализованные поля — объекты `{ kk, ru, en }` (тип `I18nString`); текст интерфейса — в `messages/*.json`. Отзывы — коллекция с полями `name, date, rating, text, forWhom` и статусом модерации на стороне CMS.

---

## Структура

```
messages/            kk.json · ru.json · en.json   (100% паритет ключей)
data/                pillars · routes · stays · reviews · audience · biodiversity
public/              textures/ · images/ · og-image · favicon · manifest · robots · sitemap
src/app/             layout · page(redirect) · [locale]/{layout,page,practical} · not-found
src/components/       globe/ · scenes/ · water/ · particles/ · sections/ · ui/ · Experience · OrbitStage
src/lib/             api/ · i18n/ · live/ · motion/ · data · types · geo · base
src/scenes/          flight.ts (кадры камеры) · eras.ts
src/styles/          tokens.css (бирюза + --era) · globals.css
tests/               i18n-completeness · kazakh-glyphs · smoke(e2e)
.github/workflows/   deploy.yml (Pages)
```

---

## Чек-лист приёмки (§11 ТЗ)

- [x] `npm i && npm run dev` / `npm run build` — статический экспорт в `out/`.
- [x] 6 опор + практический блок (как добраться / где жить / цены / отзывы / для кого) на **kk/ru/en**; словари 100% заполнены (тест `i18n-completeness`).
- [x] Казахские глифы одним шрифтом; тест-строка `glyphTest` во всех локалях (тест `kazakh-glyphs`).
- [x] Полёт орбита→озеро (GSAP ScrollTrigger + Lenis), мини-компас, слайдер эпох, честный блок «для кого / не для кого».
- [x] `prefers-reduced-motion` + UI-тумблеры движения и звука; одно ведущее движение на экран, плавные easing'и.
- [x] Бирюзовые токены; цветокоррекция по `--era`.
- [x] `useAlakolLive()` с моком и адаптером к погодному API за фиче-флагом.
- [x] SEO: мета/OG/Twitter на каждый язык, `hreflang`, sitemap, robots, manifest, 404.
- [~] Lighthouse-цели — конфиг `lighthouserc.json` приложен; прогон делайте на задеплоенной сборке.
- [x] Тексты-заглушки осмысленны; факты помечены `TODO-verify`.

> Полную типизацию и рантайм-сцену проверяйте локально (`npm run build`): окружение-генератор не запускало тяжёлую сборку three.js/Next.
