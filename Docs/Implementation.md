# Implementation Plan for Art Frost Portfolio

**VERSION:** 1.0  
**DATE:** 2026-01-23  
**STATUS:** Ready for Development  
**DEPENDS ON:** PRD-ArtFrost-Portfolio.md, TechStack.md, DatabaseSchema.md, UI_UX.md, ProjectStructure.md

---

## Executive Summary

Данный документ содержит детальный план реализации персонального сайта-портфолио Art Frost. План разбит на 3 основных этапа (Foundation, Core MVP, Post-MVP) с детальной декомпозицией задач.

**Общие сроки:**
- **Stage 1 (Foundation):** ~1 неделя
- **Stage 2 (Core MVP):** ~3 недели  
- **Stage 3 (Post-MVP Blog):** ~2-3 недели

**Приоритеты из PRD:**
- P0 — критичные для MVP
- P1 — важные, но можно отложить
- P2 — nice-to-have

---

## Feature Analysis

### MVP Features (P0)

| Feature | User Story | Complexity | Type |
|---------|-----------|------------|------|
| Navigation (Header, Footer) | FR-1.0 | Medium | Full-stack |
| Theme Toggle (Light/Dark) | US-5.1 | Medium | Frontend |
| Hero Section | US-1.1 | Medium | Frontend |
| Featured Projects Grid | US-1.2 | Medium | Frontend |
| Social Links Section | US-1.3 | Low | Frontend |
| About Page | US-2.1, US-2.2 | Medium | Frontend |
| Projects Gallery | US-3.1 | Medium | Frontend |
| Project Detail Page | US-3.3 | Medium | Frontend |
| Links Page | US-4.1 | Low | Frontend |
| SEO Meta Tags & OG | US-6.2 | Medium | Frontend |
| JSON-LD Structured Data | US-6.1 | Medium | Frontend |
| Sitemap & robots.txt | US-6.3 | Low | Frontend |
| Core Web Vitals Optimization | US-6.4 | High | Full-stack |

### Post-MVP Features (P1-P2)

| Feature | User Story | Complexity | Type |
|---------|-----------|------------|------|
| Project Tag Filters | US-3.2 | Low | Frontend |
| Blog Index Page | US-7.x | Medium | Full-stack |
| Blog Post Page | US-7.x | Medium | Full-stack |
| Telegram Webhook Handler | API Spec | High | Backend |
| Supabase Integration | Data Layer | High | Full-stack |
| Auto SEO Generation | US-6.x | Medium | Backend |
| RSS Feed | P1 | Low | Frontend |
| i18n Preparation | FR-3.0 | Medium | Full-stack |

---

## Implementation Stages

---

## Stage 1 — Foundation & System Setup

**Цель:** Создать рабочий скелет проекта с настроенным CI/CD и базовой инфраструктурой.  
**Срок:** ~1 неделя  
**Ресурсы:** 1 разработчик

### 1.1 Project Initialization

**Модули:** `astro.config.mjs`, `package.json`, корневые файлы  
**Время:** 2-3 часа

- [x] Создать проект через `npm create astro@latest artfrost-portfolio -- --template minimal`
- [x] Установить Node.js v20+ (проверить `.nvmrc`)
- [x] Настроить `package.json` с базовыми scripts (dev, build, preview, lint, format)
- [x] Инициализировать Git репозиторий

### 1.2 Dependencies Installation

**Модули:** `package.json`  
**Время:** 1-2 часа

- [x] Установить core integrations: `npx astro add react sitemap vercel`
- [x] Установить React 19: `npm install --save-exact react@^19.0.0 react-dom@^19.0.0`
- [x] Установить типы React: `npm install -D @types/react@^19.0.0 @types/react-dom@^19.0.0`
- [x] Установить Tailwind CSS v4: `npm install tailwindcss @tailwindcss/vite`
- [x] Установить ESLint 9.x с плагинами: `npm install -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-astro eslint-plugin-jsx-a11y`
- [x] Установить Prettier: `npm install -D prettier prettier-plugin-astro prettier-plugin-tailwindcss`
- [x] Установить Icons: `npm install astro-icon @iconify-json/lucide @iconify-json/simple-icons`
- [x] Установить RSS: `npm install @astrojs/rss`
- [x] Установить utils: `npm install clsx tailwind-merge`

### 1.3 TypeScript Configuration

**Модули:** `tsconfig.json`  
**Время:** 30 минут

- [x] Расширить `astro/tsconfigs/strict`
- [x] Настроить path aliases: `@/*`, `@components/*`, `@layouts/*`, `@lib/*`, `@data/*`, `@types/*`
- [x] Настроить JSX для React: `jsx: "react-jsx"`, `jsxImportSource: "react"`

### 1.4 Linting & Formatting Configuration

**Модули:** `eslint.config.js`, `.prettierrc`  
**Время:** 1 час

- [x] Создать `eslint.config.js` с flat config (ESLint 9.x)
- [x] Добавить правила для TypeScript, Astro, JSX-a11y
- [x] Создать `.prettierrc` с plugins для Astro и Tailwind
- [x] Добавить `.editorconfig` для консистентности

### 1.5 Astro Configuration

**Модули:** `astro.config.mjs`  
**Время:** 1 час

- [x] Настроить `site` URL (временно `https://artfrost.vercel.app`)
- [x] Настроить `output: 'static'` для SSG
- [x] Подключить Vercel adapter с webAnalytics
- [x] Подключить интеграции: react, sitemap
- [x] Настроить Vite plugins для Tailwind CSS v4
- [x] Настроить prefetch стратегию

### 1.6 Vercel Configuration

**Модули:** `vercel.json`  
**Время:** 30 минут

- [x] Настроить `framework: "astro"`
- [x] Настроить `regions: ["fra1"]` для Европы
- [x] Добавить security headers (X-Content-Type-Options, X-Frame-Options, Referrer-Policy)

### 1.7 Folder Structure Creation

**Модули:** Вся структура `src/`  
**Время:** 1 час

- [x] Создать структуру папок согласно ProjectStructure.md

### 1.8 Environment Setup

**Модули:** `.env.example`, `.gitignore`  
**Время:** 30 минут

- [x] Создать `.env.example` с шаблоном переменных
- [x] Настроить `.gitignore` (node_modules, dist, .env, .astro)
- [x] Создать `.nvmrc` с версией Node.js 20

### 1.9 VS Code Configuration

**Модули:** `.vscode/`  
**Время:** 30 минут

- [x] Создать `.vscode/extensions.json` с рекомендуемыми расширениями
- [x] Создать `.vscode/settings.json` с настройками проекта
- [x] Настроить format on save, ESLint autofix

### 1.10 CI/CD Pipeline Setup

**Модули:** `.github/workflows/ci.yml`  
**Время:** 1 час

- [x] Создать GitHub workflow для CI (lint, typecheck, build)
- [x] Настроить триггер на push/PR в main
- [x] Создать `dependabot.yml` для автоматических обновлений

### 1.11 Vercel Deployment

**Модули:** Vercel Dashboard  
**Время:** 1 час

- [ ] Подключить GitHub репозиторий к Vercel
- [ ] Настроить Preview deployments для PR
- [ ] Проверить первый деплой пустого проекта
- [ ] Настроить Environment Variables (если нужны)

---

## Stage 2 — Core MVP Features

**Цель:** Реализовать полноценную визитку со всеми P0 фичами.  
**Срок:** ~3 недели  
**Ресурсы:** 1 разработчик

---

### 2.1 Design System & Global Styles

**Модули:** `src/styles/global.css`, `src/styles/fonts.css`  
**Время:** 3-4 часа  
**Зависимости:** 1.x (Foundation)

- [x] Настроить Tailwind CSS импорт в `global.css`
- [x] Определить CSS переменные для Dark Theme (default):
  - `--color-bg-primary: #050605`
  - `--color-bg-secondary: #0A0C0A`
  - `--color-bg-glass: rgba(255, 255, 255, 0.03)`
  - `--color-primary: #10B981`
  - `--color-primary-glow: #10B98180`
  - `--color-text-heading: #FFFFFF`
  - `--color-text-body: #A1A1AA`
  - `--color-text-muted: #52525B`
  - `--color-border-glass: rgba(255, 255, 255, 0.08)`
- [x] Определить CSS переменные для Light Theme:
  - `--color-bg-primary: #F7F9F8`
  - `--color-bg-secondary: #EEF2F0`
  - `--color-primary: #059669`
  - `--color-text-heading: #0B0F0C`
  - `--color-text-body: #1F2937`
- [x] Настроить font-family variables: `--font-display`, `--font-body`, `--font-mono`
- [x] Создать `fonts.css` с @font-face для Inter, Roboto, JetBrains Mono
- [x] Добавить utility классы: `.glass`, `.glow-primary`, `.text-glow`
- [x] Добавить `prefers-reduced-motion` media query
- [x] Важно: не использовать reset `* { padding: 0; margin: 0; }` в `global.css` — это ломает Tailwind spacing (`px-*`, `py-*`) и приводит к «прилипшим» кнопкам/меню.

### 2.2 Typography System

**Модули:** `src/styles/global.css`  
**Время:** 1-2 часа  
**Зависимости:** 2.1

- [x] Определить type scale классы согласно UI_UX.md:
  - `.heading-hero`: text-4xl md:text-6xl font-bold tracking-tight
  - `.heading-section`: text-2xl md:text-4xl font-semibold
  - `.heading-card`: text-xl md:text-2xl font-semibold
  - `.body-large`: text-base md:text-lg leading-relaxed
  - `.body`: text-base leading-relaxed
  - `.body-small`: text-sm leading-normal
  - `.caption`: text-xs tracking-wide

### 2.3 Base Utility Functions

**Модули:** `src/lib/utils/`  
**Время:** 1-2 часа  
**Зависимости:** 1.2

- [x] Создать `cn.ts` — className merger (clsx + tailwind-merge)
- [x] Создать `formatDate.ts` — форматирование дат для locale ru-RU
- [x] Создать `slugify.ts` — генерация URL-friendly slugs с транслитерацией
- [x] Создать `readingTime.ts` — расчёт времени чтения
- [x] Создать `seo.ts` — helpers для truncate, generate meta

### 2.4 Theme System

**Модули:** `src/lib/theme/`, `src/components/layout/ThemeToggle.tsx`  
**Время:** 2-3 часа  
**Зависимости:** 2.1

- [x] Создать `theme-script.ts` — inline script для FOUC prevention
- [x] Создать `constants.ts` — theme constants ('light', 'dark')
- [x] Создать `ThemeToggle.tsx` (React component):
  - useState для текущей темы
  - useEffect для инициализации из localStorage/system preference
  - Функция toggle с сохранением в localStorage
  - Aria-label для accessibility
  - Использовать `client:load` directive

### 2.5 Base Layout Components

**Модули:** `src/layouts/BaseLayout.astro`  
**Время:** 2-3 часа  
**Зависимости:** 2.1, 2.2, 2.4

- [x] Создать `BaseLayout.astro`:
  - HTML doctype с lang="ru"
  - `<head>`: charset, viewport, inline theme script
  - Slot для SEOHead component
  - Global CSS import
  - Vercel Analytics script (если включено)
  - `<body>` с base styles

### 2.6 SEO Components

**Модули:** `src/components/seo/`  
**Время:** 3-4 часа  
**Зависимости:** 2.5

- [x] Создать `SEOHead.astro`:
  - Props: title, description, image, type, noindex
  - Canonical URL генерация
  - Meta tags: description, author
  - Open Graph tags: og:title, og:description, og:image, og:url, og:type
  - Twitter Card tags
  - Favicon links
- [x] Создать `JsonLd.astro` — wrapper для JSON-LD scripts
- [x] Создать `WebSiteJsonLd.astro` — WebSite schema для главной
- [x] Создать `PersonJsonLd.astro` — Person schema для About
- [x] Создать `CreativeWorkJsonLd.astro` — CreativeWork schema для Projects
- [x] Создать `BreadcrumbJsonLd.astro` — BreadcrumbList schema

### 2.7 Common UI Components

**Модули:** `src/components/common/`  
**Время:** 4-5 часов  
**Зависимости:** 2.1, 2.2, 2.3

- [x] Создать `Button.astro`:
  - Variants: primary, secondary, ghost, outline
  - Sizes: sm, md, lg
  - Props: href, disabled, fullWidth
  - Hover/focus states с glow effect
  - Зафиксировать форму и отступы как в референсе:
    - Radius: `rounded-xl` (не `rounded-full`)
    - SM: `px-5 py-2.5`
    - MD: `px-7 py-3`
    - LG: `px-10 py-4`
  - Использовать `Button.astro` для всех CTA (Hero + Header), не оставлять «ручные» `<a class=...>` с отдельными стилями.
- [x] Создать `Card.astro`:
  - Glass background с backdrop-blur
  - Border glass style
  - Hover state с lift и glow
  - Slots для content
- [x] Создать `Tag.astro`:
  - Variants: default, primary, outline, active
  - Sizes: sm, md, lg
- [x] Создать `Icon.astro`:
  - Wrapper для astro-icon
  - Props: name, size, class
- [x] Создать `Container.astro`:
  - Max-width container с responsive padding
- [x] Создать `Section.astro`:
  - Section wrapper с vertical spacing
- [x] Создать `SkipLink.astro`:
  - Accessibility skip to main content link

### 2.8 UI Pattern Components

**Модули:** `src/components/ui/`  
**Время:** 2-3 часа  
**Зависимости:** 2.7

- [x] Создать `GlowBackground.astro`:
  - Radial gradient background для 3D assets
  - Props: color, intensity
- [x] Создать `GlassOverlay.astro`:
  - Glass gradient overlay component
- [x] Создать `AnimatedContainer.astro`:
  - Container с hover animation
- [x] Создать `ResponsiveImage.astro`:
  - Optimized image с srcset и lazy loading

### 2.9 Navigation Components

**Модули:** `src/components/layout/`  
**Время:** 4-5 часов  
**Зависимости:** 2.7, 2.4

- [x] Создать `Header.astro`:
  - Fixed position с glassmorphism background
  - Logo/Name слева
  - Desktop navigation links
  - Theme toggle и CTA справа
  - Mobile menu button (visible только на mobile)
- [x] Создать `Navigation.astro`:
  - Desktop navigation links
  - Active state для текущей страницы
  - Обязательный `gap` между пунктами (не 0)
  - Паддинги у каждого пункта навигации (как у tab-кнопки) и паддинг у контейнера (pill)
  - Radius: tabs `rounded-xl`, container `rounded-2xl` (без `rounded-full`)
- [x] Создать `MobileMenu.tsx` (React):
  - Hamburger button
  - Full-screen overlay с menu items
  - Close button
  - Анимация открытия/закрытия
  - Использовать `client:media="(max-width: 768px)"`
- [x] Создать `Footer.astro`:
  - Copyright text
  - Social icons
  - Navigation links (optional)

### 2.10 Data Layer Setup

**Модули:** `src/data/`, `src/content/config.ts`  
**Время:** 2-3 часа  
**Зависимости:** 1.7

- [x] Создать `site-config.ts`:
  - name, title, description, url
  - author info (name, email, telegram)
  - social links (telegram, youtube, instagram, github)
  - locale, themeColor
- [x] Создать `navigation.ts`:
  - Array навигационных ссылок (label, href, icon)
- [x] Создать `social-links.ts`:
  - Array социальных ссылок с icon, url, description
- [x] Создать `profile.ts`:
  - Bio text, skills array, avatar URL
- [x] Создать `skills.ts`:
  - Array навыков с categories
- [x] Создать `experience.ts`:
  - Timeline entries (year, title, description)
- [x] Настроить `src/content/config.ts`:
  - Projects collection schema с Zod validation

### 2.11 Page Layout

**Модули:** `src/layouts/PageLayout.astro`  
**Время:** 1-2 часа  
**Зависимости:** 2.5, 2.6, 2.9

- [x] Создать `PageLayout.astro`:
  - Extends BaseLayout
  - Header component
  - SkipLink component
  - `<main>` с slot
  - Footer component
  - Props для SEO (title, description, image)

### 2.12 Home Page Components

**Модули:** `src/components/home/`  
**Время:** 5-6 часов  
**Зависимости:** 2.7, 2.8, 2.10

- [x] Создать `Hero.astro`:
  - Two-column layout (text + 3D asset)
  - Badge component ("AI Powered Dev")
  - Heading с gradient text
  - Description paragraph
  - CTA buttons (Get Started, Explore Now)
  - 3D star asset с GlowBackground
  - Responsive: стек на mobile
- [x] Создать `FeaturedProjects.astro`:
  - Section title "Latest Work"
  - Grid 4 колонки (responsive)
  - ProjectCard для каждого featured проекта
  - "View All Projects" link
- [x] Создать `SocialLinks.astro`:
  - Grid социальных иконок
  - Icon buttons с hover glow effect
  - External links с noopener noreferrer
- [ ] Создать `ValueProposition.astro` (optional):
  - Cards с ценностным предложением

### 2.13 Home Page

**Модули:** `src/pages/index.astro`  
**Время:** 2-3 часа  
**Зависимости:** 2.11, 2.12

- [x] Создать `index.astro`:
  - PageLayout с SEO props
  - WebSiteJsonLd schema
  - Hero section
  - FeaturedProjects section
  - SocialLinks section
  - Проверить LCP < 2.5s
  - Проверить Core Web Vitals

### 2.14 About Page Components

**Модули:** `src/components/about/`  
**Время:** 3-4 часа  
**Зависимости:** 2.7, 2.8, 2.10

- [ ] Создать `AboutHero.astro`:
  - Two-column layout (avatar + text)
  - 3D avatar asset с GlowBackground
  - Name, title, bio text
- [ ] Создать `SkillsList.astro`:
  - Grid Tags компонентов
  - Группировка по категориям (optional)
- [ ] Создать `Timeline.astro`:
  - Vertical timeline layout
  - Timeline entries из experience data
  - Year markers

### 2.15 About Page

**Модули:** `src/pages/about.astro`  
**Время:** 1-2 часа  
**Зависимости:** 2.11, 2.14

- [ ] Создать `about.astro`:
  - PageLayout с SEO props
  - PersonJsonLd schema с sameAs links
  - BreadcrumbJsonLd
  - AboutHero section
  - SkillsList section
  - Timeline section

### 2.16 Projects Components

**Модули:** `src/components/projects/`  
**Время:** 4-5 часов  
**Зависимости:** 2.7, 2.8

- [ ] Создать `ProjectCard.astro`:
  - Glass card с image, tags, title, description
  - Hover effect: lift + glow + image scale
  - Link на детальную страницу
- [ ] Создать `ProjectGrid.astro`:
  - Bento grid layout
  - Responsive columns (1 → 2 → 3-4)
  - Featured project large card
- [ ] Создать `ProjectDetail.astro`:
  - Full project information
  - Image gallery
  - Technologies tags
  - Links (GitHub, Demo)
  - Back navigation

### 2.17 Projects Pages

**Модули:** `src/pages/projects/`  
**Время:** 3-4 часа  
**Зависимости:** 2.11, 2.16, 2.10

- [ ] Создать `projects/index.astro`:
  - PageLayout с SEO props
  - Page header (title, description)
  - BreadcrumbJsonLd
  - ProjectGrid с всеми проектами
  - Static paths generation
- [ ] Создать `projects/[slug].astro`:
  - getStaticPaths для всех проектов
  - PageLayout с dynamic SEO
  - CreativeWorkJsonLd schema
  - BreadcrumbJsonLd
  - ProjectDetail component
  - Back to projects link

### 2.18 Sample Projects Content

**Модули:** `src/content/projects/`  
**Время:** 2-3 часа  
**Зависимости:** 2.10

- [ ] Создать 4-6 sample project JSON files:
  - `ai-chatbot.json`
  - `portfolio-site.json`
  - `mobile-app.json`
  - `telegram-bot.json`
- [ ] Каждый файл содержит: title, description, shortDescription, image, tags, github, demo, featured, order, date
- [ ] Создать placeholder images в `public/assets/images/projects/`

### 2.19 Links Page Components

**Модули:** `src/components/links/`  
**Время:** 2-3 часа  
**Зависимости:** 2.7

- [ ] Создать `LinkCard.astro`:
  - Vertical button-style card
  - Icon + title
  - Hover glow effect
  - External link с noopener noreferrer
- [ ] Создать `LinksList.astro`:
  - Vertical stack LinkCard компонентов
  - Centered layout

### 2.20 Links Page & Layout

**Модули:** `src/pages/links.astro`, `src/layouts/LinksLayout.astro`  
**Время:** 2-3 часа  
**Зависимости:** 2.19

- [ ] Создать `LinksLayout.astro`:
  - Minimal header (logo only)
  - Centered content area
  - Minimal footer
  - Mobile-first design
- [ ] Создать `links.astro`:
  - LinksLayout
  - Avatar/Logo сверху
  - Name и tagline
  - LinksList component
  - SEO optimized для social sharing

### 2.21 Error Pages

**Модули:** `src/pages/404.astro`  
**Время:** 1 час  
**Зависимости:** 2.11

- [ ] Создать `404.astro`:
  - PageLayout
  - Friendly error message
  - Link back to home
  - Search suggestion (optional)

### 2.22 Sitemap & Robots

**Модули:** `src/pages/robots.txt.ts`  
**Время:** 1 час  
**Зависимости:** 1.5

- [ ] Проверить работу @astrojs/sitemap integration
- [ ] Создать `robots.txt.ts` (dynamic):
  - Allow all user-agents
  - Sitemap reference
  - Disallow /api/ (если есть)

### 2.23 RSS Feed

**Модули:** `src/pages/rss.xml.ts`  
**Время:** 1-2 часа  
**Зависимости:** 2.10

- [ ] Создать `rss.xml.ts`:
  - @astrojs/rss integration
  - Include projects и blog posts (когда будет)
  - Proper feed metadata

### 2.24 3D Assets & Images

**Модули:** `public/assets/`  
**Время:** 2-3 часа  
**Зависимости:** нет

- [ ] Создать/найти 3D assets согласно UI_UX.md:
  - `hero-star.webp` — Hero section star
  - `floating-layers.webp` — Value proposition
  - `avatar-sphere.webp` — About page avatar
  - `code-cube.webp` — Services Dev
  - `fluid-droplet.webp` — Services Design
  - `communication-orb.webp` — CTA section
- [ ] Оптимизировать все изображения (WebP/AVIF, правильные размеры)
- [ ] Создать OG images:
  - `og/default.png` (1200x630)
  - Page-specific OG images
- [ ] Добавить favicon.svg и apple-touch-icon.png
- [ ] Добавить self-hosted fonts (woff2)

### 2.25 Performance Optimization

**Модули:** Все страницы  
**Время:** 2-3 часа  
**Зависимости:** 2.13-2.21

- [ ] Проверить и оптимизировать LCP < 2.5s:
  - Hero image preload
  - fetchpriority="high" на LCP элементе
- [ ] Проверить CLS < 0.1:
  - Зарезервировать место для изображений (aspect-ratio)
  - Избегать layout shifts
- [ ] Проверить INP < 200ms:
  - Минимизировать JavaScript
  - Использовать правильные client directives
- [ ] Проверить Total Page Size < 500KB
- [ ] Проверить JavaScript Bundle < 50KB gzipped
- [ ] Запустить Lighthouse audit > 90

### 2.26 Accessibility Audit

**Модули:** Все страницы  
**Время:** 2-3 часа  
**Зависимости:** 2.25

- [ ] Проверить WCAG 2.1 AA compliance:
  - Color contrast ratios (4.5:1 минимум)
  - Alt texts на всех изображениях
  - Proper heading hierarchy
  - Keyboard navigation
  - Focus visible states
- [ ] Проверить Skip link работает
- [ ] Проверить prefers-reduced-motion
- [ ] Тестировать с VoiceOver/NVDA

### 2.27 Final MVP Testing

**Время:** 4-6 часов  
**Зависимости:** Все 2.x

- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Mobile device testing (iOS Safari, Android Chrome)
- [ ] Проверить все ссылки работают
- [ ] Проверить OG previews (opengraph.xyz)
- [ ] Проверить JSON-LD schemas (Google Rich Results Test)
- [ ] Проверить sitemap.xml доступен
- [ ] Проверить robots.txt корректен
- [ ] Проверить theme toggle работает и сохраняется
- [ ] Проверить Vercel Analytics работает

---

## Stage 3 — Post-MVP Blog & Telegram Integration

**Цель:** Реализовать блог-зеркало Telegram-канала.  
**Срок:** ~2-3 недели  
**Ресурсы:** 1 разработчик

---

### 3.1 Supabase Project Setup

**Модули:** Supabase Dashboard  
**Время:** 1-2 часа  
**Зависимости:** MVP завершён

- [ ] Создать новый Supabase проект
- [ ] Получить URL и ключи (anon, service_role)
- [ ] Добавить environment variables в Vercel

### 3.2 Database Schema Creation

**Модули:** Supabase SQL Editor  
**Время:** 2-3 часа  
**Зависимости:** 3.1

- [ ] Создать таблицу `telegram_posts` согласно DatabaseSchema.md:
  - id (BIGINT PK), channel_id, text, html
  - date, edit_date, views, forwards
  - media (JSONB), entities (JSONB)
  - slug (UNIQUE), seo_title, seo_description, og_image_url
  - reading_time, is_published, is_pinned
  - created_at, updated_at
- [ ] Создать таблицу `post_tags`:
  - id (UUID PK), post_id (FK), tag, created_at
  - Unique constraint на (post_id, tag)
- [ ] Создать таблицу `post_media`:
  - id (UUID PK), post_id (FK), type, file_id
  - url, thumbnail_url, width, height, duration, file_size
  - order, created_at
- [ ] Создать таблицу `sync_logs`:
  - id (UUID PK), sync_type, status
  - posts_created, posts_updated, error_message, error_details
  - duration_ms, created_at
- [ ] Создать таблицу `settings`:
  - key (TEXT PK), value (JSONB), description, updated_at
- [ ] Создать все необходимые индексы

### 3.3 Row Level Security Setup

**Модули:** Supabase SQL Editor  
**Время:** 1 час  
**Зависимости:** 3.2

- [ ] Включить RLS на всех таблицах
- [ ] Создать policy "Public read" для telegram_posts (is_published = true)
- [ ] Создать policy "Service role full" для telegram_posts
- [ ] Настроить RLS для post_tags и post_media
- [ ] Настроить RLS для sync_logs и settings (service_role only)

### 3.4 Supabase Storage Setup

**Модули:** Supabase Dashboard  
**Время:** 30 минут  
**Зависимости:** 3.1

- [ ] Создать bucket `post-media` (public)
- [ ] Создать bucket `og-images` (public)
- [ ] Настроить storage policies

### 3.5 Supabase Client Integration

**Модули:** `src/lib/supabase/`  
**Время:** 2-3 часа  
**Зависимости:** 3.1

- [ ] Установить `@supabase/supabase-js@latest`
- [ ] Создать `client.ts` — Supabase client initialization
- [ ] Создать `types.ts` — TypeScript types для таблиц
- [ ] Создать `posts.ts` — Query functions:
  - `getPublishedPosts()` — список постов
  - `getPostBySlug(slug)` — один пост
  - `getPostsByTag(tag)` — посты по тегу
  - `getRelatedPosts(postId)` — связанные посты

### 3.6 Telegram Bot Setup

**Модули:** Telegram @BotFather  
**Время:** 1 час  
**Зависимости:** нет

- [ ] Создать нового бота через @BotFather
- [ ] Получить Bot Token
- [ ] Добавить бота как админа в канал (read only)
- [ ] Получить Channel ID
- [ ] Добавить environment variables

### 3.7 Telegram Parser

**Модули:** `src/lib/telegram/`  
**Время:** 4-5 часов  
**Зависимости:** 3.5

- [ ] Создать `types.ts` — Telegram API types
- [ ] Создать `parser.ts`:
  - `parseEntities(text, entities)` — convert to HTML
  - Поддержка: bold, italic, underline, strikethrough
  - Поддержка: link, mention, hashtag, code, pre
  - Proper HTML escaping
- [ ] Создать `seo-generator.ts`:
  - `generateSlug(text)` — транслитерация, первые 50 символов
  - `generateTitle(text)` — первая строка, max 60 символов
  - `generateDescription(text)` — первые 160 символов
  - `calculateReadingTime(text)` — ceil(words / 200)
- [ ] Написать unit tests для parser

### 3.8 Webhook Handler

**Модули:** `src/pages/api/telegram-webhook.ts`  
**Время:** 4-5 часов  
**Зависимости:** 3.5, 3.7

- [ ] Создать `telegram-webhook.ts` (Vercel Edge Function):
  - POST only
  - Verify webhook secret
  - Parse update body
  - Handle channel_post events
  - Process text и entities
  - Generate SEO fields
  - Save to Supabase
  - Handle media (photo, video)
  - Return 200 OK
- [ ] Error handling и logging в sync_logs
- [ ] Rate limiting (если нужно)

### 3.9 Webhook Registration

**Модули:** Telegram API, Vercel  
**Время:** 1 час  
**Зависимости:** 3.8

- [ ] Deploy webhook endpoint
- [ ] Register webhook через Telegram API:
  ```
  https://api.telegram.org/bot{TOKEN}/setWebhook?url=https://artfrost.dev/api/telegram-webhook&secret_token={SECRET}
  ```
- [ ] Проверить webhook работает
- [ ] Тестировать с реальным постом

### 3.10 Blog Components

**Модули:** `src/components/blog/`  
**Время:** 4-5 часов  
**Зависимости:** 2.7, 2.8

- [ ] Создать `BlogCard.astro`:
  - Glass card с image, tags, title, date, reading time
  - Hover effect
  - Link на детальную страницу
- [ ] Создать `BlogGrid.astro`:
  - Grid layout для постов
  - Responsive columns
- [ ] Создать `BlogPostContent.astro`:
  - Render parsed HTML content
  - Proper typography styling
  - Code block styling
- [ ] Создать `BlogMeta.astro`:
  - Date, reading time, views count
- [ ] Создать `RelatedPosts.astro`:
  - Grid 3 related posts
- [ ] Создать `ShareButtons.tsx` (React):
  - Share to Telegram button
  - Copy link button
  - Использовать `client:visible`

### 3.11 Blog Layout

**Модули:** `src/layouts/BlogLayout.astro`  
**Время:** 2-3 часа  
**Зависимости:** 3.10

- [ ] Создать `BlogLayout.astro`:
  - Extends BaseLayout
  - Header
  - Article structure с proper semantic HTML
  - Back navigation
  - ShareButtons
  - RelatedPosts section
  - Footer

### 3.12 Blog Pages

**Модули:** `src/pages/blog/`  
**Время:** 4-5 часов  
**Зависимости:** 3.10, 3.11, 3.5

- [ ] Создать `blog/index.astro`:
  - PageLayout
  - Page header
  - BreadcrumbJsonLd
  - BlogGrid с постами из Supabase
  - Pagination (если нужно)
  - Tag filter links
- [ ] Создать `blog/[slug].astro`:
  - getStaticPaths или SSR mode
  - BlogLayout
  - BlogPostingJsonLd schema
  - BreadcrumbJsonLd
  - BlogPostContent
  - BlogMeta
  - ShareButtons
  - RelatedPosts
  - Dynamic OG image

### 3.13 SEO Components for Blog

**Модули:** `src/components/seo/`  
**Время:** 1-2 часа  
**Зависимости:** 2.6

- [ ] Создать `BlogPostingJsonLd.astro`:
  - Article schema
  - datePublished, dateModified
  - author (Person)
  - publisher (Organization)
  - headline, description, image

### 3.14 OG Image Generation (Optional)

**Модули:** OG image service  
**Время:** 3-4 часа  
**Зависимости:** 3.5

- [ ] Установить `astro-opengraph-images`, `@resvg/resvg-js`, `satori`
- [ ] Создать OG image template
- [ ] Генерировать OG images для блог-постов
- [ ] Сохранять в Supabase Storage

### 3.15 RSS Feed Update

**Модули:** `src/pages/rss.xml.ts`  
**Время:** 1 час  
**Зависимости:** 3.12

- [ ] Обновить RSS feed для включения блог-постов
- [ ] Proper feed items с content

### 3.16 GitHub Action: Scheduled Sync (Fallback)

**Модули:** `.github/workflows/telegram-sync.yml`  
**Время:** 2-3 часа  
**Зависимости:** 3.7

- [ ] Создать workflow для scheduled sync (каждые 4 часа)
- [ ] Script для getUpdates API
- [ ] Trigger Vercel rebuild через Deploy Hook

### 3.17 Blog Testing

**Время:** 2-3 часа  
**Зависимости:** Все 3.x

- [ ] Тестировать webhook с реальными постами
- [ ] Проверить SEO fields генерируются корректно
- [ ] Проверить media обрабатывается
- [ ] Проверить blog pages рендерятся
- [ ] Проверить JSON-LD schemas валидны
- [ ] Проверить RSS feed работает
- [ ] Performance testing для blog pages

---

## Resource Links

### Official Documentation

| Resource | URL |
|----------|-----|
| Astro Docs | https://docs.astro.build |
| React Docs | https://react.dev |
| Tailwind CSS Docs | https://tailwindcss.com/docs |
| Supabase Docs | https://supabase.com/docs |
| Vercel Docs | https://vercel.com/docs |
| TypeScript Docs | https://www.typescriptlang.org/docs |
| Telegram Bot API | https://core.telegram.org/bots/api |

### Testing & Validation Tools

| Tool | URL | Purpose |
|------|-----|---------|
| Lighthouse | Chrome DevTools | Performance audit |
| Google Rich Results Test | https://search.google.com/test/rich-results | JSON-LD validation |
| OpenGraph Preview | https://opengraph.xyz | OG tags preview |
| WAVE | https://wave.webaim.org | Accessibility testing |
| GTmetrix | https://gtmetrix.com | Performance testing |
| Google Search Console | https://search.google.com/search-console | SEO monitoring |

### Design Resources

| Resource | Purpose |
|----------|---------|
| Lucide Icons | UI icons |
| Simple Icons | Brand icons |
| Inter Font | Display typography |
| JetBrains Mono | Monospace typography |

---

## Estimated Timeline Summary

| Stage | Duration | Deliverables |
|-------|----------|--------------|
| **Stage 1: Foundation** | ~1 неделя | Working project skeleton, CI/CD, deployment |
| **Stage 2: Core MVP** | ~3 недели | Full portfolio site (Home, About, Projects, Links) |
| **Stage 3: Post-MVP** | ~2-3 недели | Blog with Telegram integration |
| **Total** | ~6-7 недель | Complete Art Frost Portfolio |

---

## Reconciliation Notes

### PRD Alignment ✅

- Все P0 User Stories покрыты в Stage 2
- Все P1/P2 User Stories покрыты в Stage 3
- NFR requirements (Performance, SEO, Accessibility) интегрированы в задачи

### TechStack Alignment ✅

- Astro 5.x, React 19, Tailwind CSS v4 — Stage 1
- TypeScript, ESLint 9.x, Prettier — Stage 1
- Supabase, Telegram Bot API — Stage 3
- Vercel deployment — Stage 1

### DatabaseSchema Alignment ✅

- Все таблицы создаются в Stage 3.2
- RLS policies в Stage 3.3
- Types generation в Stage 3.5

### UI_UX Alignment ✅

- Design System tokens — Stage 2.1-2.2
- All components — Stage 2.7-2.20
- Accessibility — Stage 2.26
- Animations — integrated in components

### ProjectStructure Alignment ✅

- Folder structure — Stage 1.7
- All modules mapped to implementation tasks
- Feature-to-module mapping maintained

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-01-23 | Implementation Agent | Initial implementation plan |

---

**План готов к реализации. Начинайте со Stage 1 и двигайтесь последовательно по чекбоксам.**
