# Project Structure

**VERSION:** 1.0  
**DATE:** 2026-01-23  
**STATUS:** Draft  
**DEPENDS ON:** PRD-ArtFrost-Portfolio.md, TechStack.md, DatabaseSchema.md, UI_UX.md

---

## Overview

Структура проекта для персонального сайта-портфолио Art Frost на базе Astro 5.x с React Islands, Tailwind CSS v4 и Supabase (Post-MVP). Архитектура следует принципам:

- **SSG-first** с опциональным SSR для динамических страниц
- **Islands Architecture** для минимизации клиентского JavaScript
- **Content Collections** для типизированного контента
- **Separation of Concerns** между UI, данными и логикой

---

## Root Directory

```
ART FROST/
├── Docs/                       # Продуктовые документы (PRD, UI/UX, TechStack, etc.)
├── website/                    # Astro-приложение (вся реализация сайта)
├── .github/                    # GitHub конфигурация репозитория
└── .vscode/                    # VS Code настройки репозитория
```

### Описание корневых файлов

| Файл | Назначение |
|------|------------|
| `website/astro.config.mjs` | Конфигурация Astro: интеграции (React, Sitemap, Vercel), Vite plugins, prefetch |
| `website/tsconfig.json` | TypeScript: strict mode, path aliases (`@/*`, `@components/*`, `@lib/*`) |
| `website/vercel.json` | Vercel: headers, redirects, regions |
| `website/.env.example` | Шаблон переменных окружения для локальной разработки |
| `website/package.json` | npm scripts: `dev`, `build`, `preview`, `lint`, `format`, `new:project`, `projects` |

---

## website/scripts/

```
website/scripts/
├── create-project.mjs          # CLI для создания нового проекта
├── manage-projects.mjs         # CLI для управления проектами (list/validate, etc.)
└── download-fonts.sh           # Скрипт загрузки шрифтов
```

### create-project.mjs

Интерактивный Node.js скрипт для создания новых проектов:

```bash
npm run new:project
```

Функционал:
- Задаёт вопросы о проекте (название, описание, теги и т.д.)
- Автоматически генерирует slug из названия (с транслитерацией)
- Создаёт папку для изображений проекта
- Проверяет на дубликаты slug
- Сохраняет валидный JSON-файл

---

## .github/

```
.github/
├── workflows/
│   ├── ci.yml                  # CI: lint, type-check, tests
│   └── telegram-sync.yml       # Post-MVP: scheduled Telegram sync
├── CODEOWNERS                  # Code ownership rules
└── dependabot.yml              # Automated dependency updates
```

### Назначение

- **CI workflow** — автоматическая проверка PR (ESLint, TypeScript, Vitest)
- **telegram-sync.yml** — резервная синхронизация с Telegram (каждые 4 часа)
- **dependabot.yml** — автоматические обновления зависимостей

---

## .vscode/

```
.vscode/
├── extensions.json             # Рекомендуемые расширения
├── settings.json               # Настройки проекта
└── launch.json                 # Конфигурация отладки
```

### Рекомендуемые расширения

- `astro-build.astro-vscode`
- `bradlc.vscode-tailwindcss`
- `dbaeumer.vscode-eslint`
- `esbenp.prettier-vscode`

---

## website/public/

```
website/public/
├── assets/
│   ├── 3d/                     # 3D визуальные ассеты
│   │   ├── hero-star.webp      # Hero section 3D star
│   │   ├── floating-layers.webp
│   │   ├── avatar-sphere.webp  # About page 3D avatar
│   │   ├── code-cube.webp      # Services Dev
│   │   ├── fluid-droplet.webp  # Services Design
│   │   └── communication-orb.webp # CTA section
│   ├── images/
│   │   ├── og/                 # Open Graph images (1200x630)
│   │   │   ├── default.png     # Default OG image
│   │   │   └── ...             # Page-specific OG images
│   │   ├── projects/           # Project screenshots/previews
│   │   │   └── ...
│   │   └── avatar.webp         # Profile avatar
│   └── icons/
│       ├── favicon.svg         # Favicon
│       ├── apple-touch-icon.png
│       └── ...
├── fonts/                      # Self-hosted fonts (если нужны)
│   ├── Inter-Variable.woff2
│   ├── Roboto-Variable.woff2
│   └── JetBrainsMono-Variable.woff2
├── robots.txt                  # SEO: robots rules
└── manifest.json               # PWA manifest (optional)
```

### Naming Conventions

- **3D assets:** `kebab-case.webp` (WebP/AVIF для оптимизации)
- **OG images:** `page-name.png` (1200x630px, PNG для совместимости)
- **Project images:** `project-slug-preview.webp`

---

## website/src/
## website/src/components/
```
src/
website/src/components/
├── content/                    # Astro Content Collections
├── data/                       # Статические данные (JSON, constants)
├── layouts/                    # Page layouts
├── lib/                        # Утилиты и сервисы
├── pages/                      # Маршруты (file-based routing)
└── types/                      # TypeScript типы
```

---

## src/components/

```
src/components/
├── common/                     # Переиспользуемые базовые компоненты
│   ├── Button.astro            # Button variants (Primary, Secondary, Ghost, Outline)
│   ├── Card.astro              # Glass Card base component
│   ├── Tag.astro               # Tag/Badge component
│   ├── Icon.astro              # Icon wrapper (astro-icon)
│   ├── Link.astro              # Styled link component
│   ├── Container.astro         # Max-width container
│   ├── Section.astro           # Section wrapper with spacing
│   └── SkipLink.astro          # Accessibility: skip to content
│
├── layout/                     # Layout-specific компоненты
│   ├── Header.astro            # Глобальный header с навигацией
│   ├── Footer.astro            # Глобальный footer
│   ├── Navigation.astro        # Desktop navigation links
│   ├── MobileMenu.tsx          # React: Mobile hamburger menu (client:media)
│   └── ThemeToggle.tsx         # React: Theme switcher (client:load)
│   ├── ImageLightbox.tsx       # React: lightbox/галерея изображений (client:load)
│   └── ProjectDetail.astro     # Детальная информация о проекте
│   ├── ProjectCard.astro       # Карточка проекта для grid
│   ├── ProjectGrid.astro       # Grid layout для проектов
│   ├── ProjectFilters.tsx      # React: фильтры по тегам (client:idle)
│   └── ProjectDetail.astro     # Детальная информация о проекте
│
├── links/                      # Компоненты Links страницы
│   ├── LinkCard.astro          # Карточка ссылки (Linktree style)
│   └── CreativeWorkJsonLd.astro # CreativeWork schema (Projects)
├── blog/                       # Post-MVP: Blog компоненты
│   ├── BlogCard.astro          # Карточка поста для списка
│   ├── BlogGrid.astro          # Grid layout для постов
│   ├── BlogPostContent.astro   # Контент поста (parsed HTML)
│   ├── BlogMeta.astro          # Мета-информация (дата, время чтения)
  ├── ResponsiveImage.astro   # Optimized responsive image
  └── ScrollFrameAnimation.tsx # React: анимация рамок (client:visible/idle)
│   └── ShareButtons.tsx        # React: кнопки шеринга (client:visible)
│
├── seo/                        # SEO компоненты
│   ├── SEOHead.astro           # Meta tags, OG, Twitter Cards
│   ├── JsonLd.astro            # JSON-LD structured data wrapper
│   ├── BreadcrumbJsonLd.astro  # BreadcrumbList schema
│   ├── PersonJsonLd.astro      # Person schema (About)
│   ├── WebSiteJsonLd.astro     # WebSite schema (Home)
│   ├── CreativeWorkJsonLd.astro # CreativeWork schema (Projects)
│   └── BlogPostingJsonLd.astro # BlogPosting schema (Post-MVP)
│
└── ui/                         # Переиспользуемые UI паттерны
    ├── GlowBackground.astro    # Radial glow behind 3D assets
    ├── GlassOverlay.astro      # Glass gradient overlay
    ├── AnimatedContainer.astro # Container с hover анимацией
    └── ResponsiveImage.astro   # Optimized responsive image
```

### Component Naming Conventions

| Тип | Суффикс/Формат | Пример |
|-----|----------------|--------|
| **Astro компоненты** | `PascalCase.astro` | `ProjectCard.astro` |
| **React компоненты (интерактивные)** | `PascalCase.tsx` | `ThemeToggle.tsx` |
| **Page-specific** | В папке страницы | `home/Hero.astro` |
| **Reusable** | В `common/` или `ui/` | `common/Button.astro` |

### Client Directives Guide

| Компонент | Директива | Причина |
|-----------|-----------|---------|
| `ThemeToggle.tsx` | `client:load` | Критично для UX, должно работать сразу |
| `MobileMenu.tsx` | `client:media="(max-width: 768px)"` | Нужен только на мобильных |
| `ProjectFilters.tsx` | `client:idle` | Некритичная интерактивность |
| `ImageLightbox.tsx` | `client:load` | Галерея/лайтбокс должна быть интерактивной сразу |

---

## website/src/content/

```
src/content/
├── config.ts                   # Content Collections schema (Zod)
├── projects/                   # Проекты (JSON или MDX)
│   ├── project-1.json
│   ├── project-2.json
│   └── ...
└── blog/                       # Post-MVP: Blog posts (если локально)
    └── ...                     # Или данные из Supabase
```

### config.ts

```typescript
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    shortDescription: z.string().max(160),
    image: z.string(),
    tags: z.array(z.string()),
    github: z.string().url().optional(),
    demo: z.string().url().optional(),
    featured: z.boolean().default(false),
    order: z.number().optional(),
    date: z.coerce.date(),
  }),
});

export const collections = { projects };
```

### Система управления проектами

Проекты хранятся как JSON-файлы в `src/content/projects/`. Для добавления нового проекта есть три способа:

#### Способ 1: CLI скрипт (рекомендуется)

```bash
npm run new:project
```

Интерактивный скрипт `scripts/create-project.mjs` задаёт вопросы и создаёт готовый JSON-файл.

#### Способ 2: Копирование шаблона

1. Скопировать `src/content/projects/_template.json`
2. Переименовать в `project-slug.json`
3. Удалить поля с `_` (комментарии)
4. Заполнить данные

#### Способ 3: Создание вручную

Создать JSON-файл по схеме ниже.

### Project JSON Schema

| Поле | Тип | Обязательное | Описание |
|------|-----|--------------|----------|
| `title` | string | ✅ | Название проекта |
| `description` | string | ✅ | Полное описание (markdown) |
| `shortDescription` | string | - | Краткое описание (макс 160 символов) |
| `image` | string | - | Путь к главному изображению |
| `images` | string[] | - | Дополнительные скриншоты |
| `tags` | string[] | - | Теги технологий |
| `github` | string | - | URL GitHub репозитория |
| `demo` | string | - | URL демо/продакшн |
| `links` | object[] | - | Другие ссылки |
| `featured` | boolean | - | Показать на главной |
| `order` | number | - | Порядок сортировки |
| `date` | string | - | Дата старта (YYYY-MM) |
| `completedDate` | string | - | Дата завершения |
| `status` | enum | - | completed / in-progress / planned / archived |
| `type` | enum | - | website / app / library / tool / template / other |
| `role` | string | - | Роль в проекте |
| `teamSize` | number | - | Размер команды |
| `highlights` | string[] | - | Ключевые достижения |
| `seoTitle` | string | - | Кастомный SEO title |
| `seoDescription` | string | - | Кастомный SEO description |
| `ogImage` | string | - | Кастомное OG-изображение |
| `draft` | boolean | - | Скрыть из списков |

### Project JSON Example

```json
// src/content/projects/ai-chatbot.json
{
  "title": "AI Chatbot Platform",
  "description": "Full description...",
  "shortDescription": "AI-powered chatbot for customer support",
  "image": "/assets/images/projects/ai-chatbot-preview.webp",
  "tags": ["React", "TypeScript", "OpenAI", "Node.js"],
  "github": "https://github.com/artfrost/ai-chatbot",
  "demo": "https://chatbot.artfrost.dev",
  "featured": true,
  "order": 1,
  "date": "2025-12-01"
}
```

---

## website/src/data/

```
src/data/
├── navigation.ts               # Navigation links
├── social-links.ts             # Social media links
├── profile.ts                  # Profile/About info
├── skills.ts                   # Skills list
├── experience.ts               # Experience timeline
└── site-config.ts              # Site-wide configuration
```

### site-config.ts Example

```typescript
// src/data/site-config.ts
export const siteConfig = {
  name: 'Art Frost',
  title: 'Art Frost — IT-специалист & Vibe Coder',
  description: 'Персональное портфолио Art Frost. Разработка, дизайн, AI.',
  url: 'https://artfrost.dev',
  author: {
    name: 'Art Frost',
    email: 'hello@artfrost.dev',
    telegram: 'artfrost',
  },
  social: {
    telegram: 'https://t.me/artfrost',
    youtube: 'https://youtube.com/@artfrost',
    instagram: 'https://instagram.com/artfrost',
    github: 'https://github.com/artfrost',
  },
  locale: 'ru-RU',
  themeColor: '#10B981',
} as const;
```

### social-links.ts Example

```typescript
// src/data/social-links.ts
export const socialLinks = [
  {
    id: 'telegram',
    name: 'Telegram',
    url: 'https://t.me/artfrost',
    icon: 'simple-icons:telegram',
    description: 'Подписаться на канал',
  },
  {
    id: 'youtube',
    name: 'YouTube',
    url: 'https://youtube.com/@artfrost',
    icon: 'simple-icons:youtube',
    description: 'Смотреть видео',
  },
  // ...
] as const;
```

---

## website/src/layouts/

```
src/layouts/
├── BaseLayout.astro            # Базовый layout: HTML, head, body
├── PageLayout.astro            # Layout для стандартных страниц
├── BlogLayout.astro            # Post-MVP: Layout для блог-постов
└── LinksLayout.astro           # Минималистичный layout для /links
```

### Layout Hierarchy

```
BaseLayout.astro
├── <html>, <head>, <body>
├── SEOHead component
├── Theme script (inline, blocking)
├── Global styles
└── Analytics (Vercel)

PageLayout.astro extends BaseLayout
├── Header
├── <main> slot
├── Footer
└── Skip link

BlogLayout.astro extends BaseLayout
├── Header
├── Article structure
├── Back navigation
├── Related posts
└── Footer

LinksLayout.astro extends BaseLayout
├── Minimal header (logo only)
├── Centered content
└── Minimal footer
```

---

## website/src/lib/

```
src/lib/
├── utils/                      # Утилитарные функции
│   ├── cn.ts                   # Class names merger (clsx + tailwind-merge)
│   ├── formatDate.ts           # Date formatting utilities
│   ├── slugify.ts              # URL slug generation
│   ├── readingTime.ts          # Calculate reading time
│   └── seo.ts                  # SEO helpers (truncate, generate meta)
│
├── theme/                      # Theme management
│   ├── constants.ts            # Theme constants
│   └── theme-script.ts         # Inline script for theme (no FOUC)
│
├── supabase/                   # Post-MVP: Supabase integration
│   ├── client.ts               # Supabase client initialization
│   ├── posts.ts                # Posts queries
│   └── types.ts                # Database types (generated)
│
├── telegram/                   # Post-MVP: Telegram integration
│   ├── parser.ts               # Parse Telegram entities to HTML
│   ├── seo-generator.ts        # Auto-generate SEO from post
│   └── types.ts                # Telegram API types
│
└── api/                        # Post-MVP: API helpers
    └── webhook-handler.ts      # Telegram webhook processing
```

### utils/cn.ts

```typescript
// src/lib/utils/cn.ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

---

## website/src/pages/

```
src/pages/
├── index.astro                 # Главная страница (/)
├── about.astro                 # О себе (/about)
├── projects/
│   ├── index.astro             # Список проектов (/projects)
│   └── [slug].astro            # Детальная страница проекта (/projects/[slug])
├── links.astro                 # Linktree-style страница (/links)
├── blog/                       # Post-MVP: Blog
│   ├── index.astro             # Список постов (/blog)
│   └── [slug].astro            # Пост (/blog/[slug])
├── api/                        # API routes (Vercel Edge Functions)
│   └── telegram-webhook.ts     # Post-MVP: Telegram webhook
├── rss.xml.ts                  # RSS feed (/rss.xml)
├── sitemap-index.xml           # Auto-generated by @astrojs/sitemap
├── 404.astro                   # Custom 404 page
└── [...slug].astro             # Optional: catch-all for redirects
```

### Routing Table

| URL | Файл | Тип | Описание |
|-----|------|-----|----------|
| `/` | `index.astro` | SSG | Главная страница |
| `/about` | `about.astro` | SSG | О себе |
| `/projects` | `projects/index.astro` | SSG | Список проектов |
| `/projects/[slug]` | `projects/[slug].astro` | SSG | Детальная страница проекта |
| `/links` | `links.astro` | SSG | Linktree-style |
| `/blog` | `blog/index.astro` | SSG/SSR | Список постов (Post-MVP) |
| `/blog/[slug]` | `blog/[slug].astro` | SSG/SSR | Пост (Post-MVP) |
| `/rss.xml` | `rss.xml.ts` | SSG | RSS feed |
| `/api/telegram-webhook` | `api/telegram-webhook.ts` | SSR | Webhook (Post-MVP) |

---

## website/src/styles/

```
src/styles/
├── global.css                  # Глобальные стили и Tailwind
├── fonts.css                   # Font-face declarations
└── components/                 # Компонент-специфичные стили (при необходимости)
    └── ...
```

### global.css Structure

```css
/* src/styles/global.css */

/* 1. Tailwind import */
@import "tailwindcss";

/* 2. Font imports */
@import "./fonts.css";

/* 3. Theme tokens */
@theme {
  /* Colors - Dark Theme (default) */
  --color-bg-primary: #050605;
  --color-bg-secondary: #0A0C0A;
  --color-bg-glass: rgba(255, 255, 255, 0.03);
  --color-primary: #10B981;
  --color-primary-glow: rgba(16, 185, 129, 0.5);
  --color-text-heading: #FFFFFF;
  --color-text-body: #A1A1AA;
  --color-text-muted: #52525B;
  --color-border-glass: rgba(255, 255, 255, 0.08);
  
  /* Typography */
  --font-display: 'Inter', system-ui, sans-serif;
  --font-body: 'Roboto', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', ui-monospace, monospace;
}

/* 4. Light theme overrides */
[data-theme="light"] {
  --color-bg-primary: #F7F9F8;
  --color-bg-secondary: #EEF2F0;
  --color-bg-glass: rgba(5, 6, 5, 0.04);
  --color-primary: #059669;
  --color-primary-glow: rgba(5, 150, 105, 0.2);
  --color-text-heading: #0B0F0C;
  --color-text-body: #1F2937;
  --color-text-muted: #6B7280;
  --color-border-glass: rgba(5, 6, 5, 0.10);
}

/* 5. Base styles */
html {
  scroll-behavior: smooth;
}

body {
  @apply bg-[--color-bg-primary] text-[--color-text-body];
  @apply font-[family-name:--font-body];
  @apply antialiased;
}

/* 6. Utility classes */
.glass {
  @apply bg-[--color-bg-glass] backdrop-blur-xl;
  @apply border border-[--color-border-glass];
}

.glow-primary {
  box-shadow: 0 0 40px -10px var(--color-primary-glow);
}

/* 7. Reduced motion */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## website/src/types/

```
src/types/
├── index.ts                    # Re-exports
├── project.ts                  # Project type definitions
├── social.ts                   # Social link types
├── navigation.ts               # Navigation types
├── blog.ts                     # Post-MVP: Blog post types
└── database.ts                 # Post-MVP: Supabase generated types
```

### project.ts Example

```typescript
// src/types/project.ts
export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  shortDescription: string;
  image: string;
  tags: string[];
  github?: string;
  demo?: string;
  featured: boolean;
  order?: number;
  date: Date;
}

export type ProjectTag = 
  | 'React' 
  | 'TypeScript' 
  | 'Astro' 
  | 'Node.js' 
  | 'Python'
  | 'AI'
  | 'Mobile';
```

---

## tests/ (Phase 2+)

```
tests/
├── unit/                       # Unit tests (Vitest)
│   ├── utils/
│   │   ├── cn.test.ts
│   │   ├── formatDate.test.ts
│   │   └── slugify.test.ts
│   ├── telegram/
│   │   └── parser.test.ts
│   └── seo/
│       └── seo-generator.test.ts
│
├── integration/                # Integration tests
│   └── api/
│       └── webhook.test.ts
│
├── e2e/                        # E2E tests (Playwright)
│   ├── home.spec.ts
│   ├── navigation.spec.ts
│   ├── theme.spec.ts
│   └── projects.spec.ts
│
└── setup/
    ├── vitest.setup.ts
    └── playwright.config.ts
```

---

## Configuration Files

### astro.config.mjs

```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';

export default defineConfig({
  site: 'https://artfrost.dev',
  output: 'hybrid',
  
  adapter: vercel({
    webAnalytics: { enabled: true },
    edgeMiddleware: true,
  }),
  
  integrations: [
    react(),
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
    }),
    icon({
      include: {
        lucide: ['*'],
        'simple-icons': ['telegram', 'youtube', 'instagram', 'github'],
      },
    }),
  ],
  
  vite: {
    plugins: [tailwindcss()],
  },
  
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
});
```

### tsconfig.json

```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"],
      "@layouts/*": ["src/layouts/*"],
      "@lib/*": ["src/lib/*"],
      "@data/*": ["src/data/*"],
      "@types/*": ["src/types/*"]
    },
    "jsx": "react-jsx",
    "jsxImportSource": "react"
  },
  "include": ["src/**/*", "tests/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### package.json Scripts

```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "check": "astro check",
    "lint": "eslint . --ext .js,.ts,.astro,.tsx",
    "lint:fix": "eslint . --ext .js,.ts,.astro,.tsx --fix",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "test": "vitest",
    "test:e2e": "playwright test",
    "typecheck": "tsc --noEmit"
  }
}
```

---

## Environment Variables

### .env.example

```env
# Site Configuration
PUBLIC_SITE_URL=https://artfrost.dev

# Supabase (Post-MVP)
PUBLIC_SUPABASE_URL=
PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Telegram Bot (Post-MVP)
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHANNEL_ID=
TELEGRAM_WEBHOOK_SECRET=

# Analytics (Optional)
PUBLIC_GA_ID=
```

---

## Feature-to-Module Mapping

| Фича из PRD | Модули/Файлы |
|-------------|--------------|
| Hero Section | `components/home/Hero.astro`, `public/assets/3d/hero-star.webp` |
| Featured Projects | `components/home/FeaturedProjects.astro`, `components/projects/ProjectCard.astro` |
| Social Links | `components/home/SocialLinks.astro`, `data/social-links.ts` |
| Theme Toggle | `components/layout/ThemeToggle.tsx`, `lib/theme/` |
| Navigation | `components/layout/Header.astro`, `components/layout/MobileMenu.tsx` |
| About Page | `pages/about.astro`, `components/about/*` |
| Projects Gallery | `pages/projects/index.astro`, `components/projects/ProjectGrid.astro` |
| Project Filters | `components/projects/ProjectFilters.tsx` |
| Project Detail | `pages/projects/[slug].astro`, `components/projects/ProjectDetail.astro` |
| Links Page | `pages/links.astro`, `components/links/*` |
| SEO (Meta/OG) | `components/seo/SEOHead.astro` |
| JSON-LD Schemas | `components/seo/*JsonLd.astro` |
| Blog (Post-MVP) | `pages/blog/*`, `components/blog/*`, `lib/supabase/*` |
| Telegram Sync | `pages/api/telegram-webhook.ts`, `lib/telegram/*` |

---

## Reconciliation Notes

### Соответствие TechStack.md

✅ Структура использует:
- Astro 5.x conventions (Content Collections, file-based routing)
- React components с правильными client directives
- Tailwind CSS v4 через Vite plugin
- Vercel adapter с Edge Functions
- TypeScript с path aliases

### Соответствие DatabaseSchema.md

✅ Data layer подготовлен:
- `lib/supabase/` для интеграции с Supabase
- `types/database.ts` для типов из схемы
- Webhook handler в `pages/api/`
- Telegram parser в `lib/telegram/`

### Соответствие UI_UX.md

✅ Компоненты покрывают:
- Все UI компоненты (Button, Card, Tag, etc.)
- Navigation variants (Header, MobileMenu)
- Page-specific секции (Hero, FeaturedProjects, etc.)
- 3D assets в `public/assets/3d/`
- Glass/Glow effects в `styles/global.css`

### Соответствие PRD

✅ Все страницы и фичи имеют модули:
- Главная, About, Projects, Links — в `pages/`
- Blog (Post-MVP) — подготовлена структура
- SEO требования — `components/seo/`
- Accessibility — Skip link, semantic HTML в layouts

---

## Scaling Notes

1. **Добавление языков (i18n):**
   - Создать `src/i18n/` для переводов
   - Использовать `[lang]/` prefix в pages
   - Добавить hreflang в SEOHead

2. **Добавление новых страниц:**
   - Создать `.astro` файл в `pages/`
   - Добавить в `data/navigation.ts`
   - Создать компоненты в соответствующей папке

3. **Масштабирование блога:**
   - Использовать pagination в `blog/index.astro`
   - Добавить категории через post_tags
   - Кэширование через Vercel Edge

4. **Добавление новых 3D ассетов:**
   - Поместить в `public/assets/3d/`
   - Использовать WebP/AVIF формат
   - Добавить GlowBackground компонент

---

## Next Steps

1. Инициализировать проект через `npm create astro@latest`
2. Установить зависимости согласно TechStack.md
3. Создать базовую структуру папок
4. Настроить конфигурационные файлы
5. Начать с BaseLayout и PageLayout
6. Реализовать Design System (colors, typography)
7. Создать Theme Toggle
8. Последовательно реализовать страницы MVP
