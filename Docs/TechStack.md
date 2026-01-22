# TechStack for Art Frost Portfolio

**DATE:** 2026-01-23  
**VERSION:** 1.0  
**SOURCES:** PRD-ArtFrost-Portfolio.md, Context7 Documentation  
**STATUS:** Approved

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         TECHNOLOGY STACK                                 │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ┌─────────────────────────────────────────────────────────────────────┐│
│  │                        PRESENTATION LAYER                            ││
│  │  Astro 5.x (SSG) + React 19 (Islands) + Tailwind CSS v4             ││
│  └─────────────────────────────────────────────────────────────────────┘│
│                                    │                                     │
│                                    ▼                                     │
│  ┌─────────────────────────────────────────────────────────────────────┐│
│  │                         BUILD & TOOLING                              ││
│  │  Vite 6.x + TypeScript 5.7+ + ESLint 9.x + Prettier 3.x             ││
│  └─────────────────────────────────────────────────────────────────────┘│
│                                    │                                     │
│                                    ▼                                     │
│  ┌─────────────────────────────────────────────────────────────────────┐│
│  │                         DATA LAYER (Post-MVP)                        ││
│  │  Supabase (PostgreSQL) + Telegram Bot API                           ││
│  └─────────────────────────────────────────────────────────────────────┘│
│                                    │                                     │
│                                    ▼                                     │
│  ┌─────────────────────────────────────────────────────────────────────┐│
│  │                       INFRASTRUCTURE                                  ││
│  │  Vercel (CDN + Edge Functions + Analytics)                          ││
│  └─────────────────────────────────────────────────────────────────────┘│
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

**Key NFRs from PRD:**
- LCP < 2.5s (95th percentile)
- INP < 200ms
- CLS < 0.1
- Total Page Size < 500KB
- JavaScript Bundle < 50KB (gzipped)
- Lighthouse Performance > 90

---

## Technology Layers

### 1. Presentation Layer (Frontend)

#### Framework: Astro 5.x

| Property | Value |
|----------|-------|
| **Package** | `astro` |
| **Version** | `^5.0.0` |
| **License** | MIT |
| **Documentation** | https://docs.astro.build |

**Justification:**
- Zero JavaScript по умолчанию — идеален для SEO-first сайтов
- Islands Architecture — React hydration только где нужно
- Content Collections — типизированный контент с Zod-валидацией
- Встроенная оптимизация изображений
- View Transitions API для плавных переходов

**Installation:**
```bash
npm create astro@latest artfrost-portfolio -- --template minimal
cd artfrost-portfolio
```

**Key Integrations:**

| Integration | Package | Version | Purpose |
|-------------|---------|---------|---------|
| React | `@astrojs/react` | `^4.0.0` | Interactive components (theme toggle, filters) |
| Sitemap | `@astrojs/sitemap` | `^3.2.0` | Auto-generated sitemap.xml |
| Vercel | `@astrojs/vercel` | `^8.0.0` | Deployment adapter with Edge Functions |
| MDX | `@astrojs/mdx` | `^4.0.0` | Rich content for blog (Post-MVP) |

**Installation:**
```bash
npx astro add react sitemap vercel
npm install @astrojs/mdx
```

---

#### UI Framework: React 19

| Property | Value |
|----------|-------|
| **Packages** | `react`, `react-dom` |
| **Version** | `^19.0.0` |
| **Types** | `@types/react@^19.0.0`, `@types/react-dom@^19.0.0` |
| **License** | MIT |
| **Documentation** | https://react.dev |

**Justification:**
- Нужен для интерактивных компонентов (ThemeToggle, MobileMenu, ProjectFilters)
- React 19 — стабильная версия с улучшенным SSR
- Совместим с Astro Islands Architecture

**Installation:**
```bash
npm install --save-exact react@^19.0.0 react-dom@^19.0.0
npm install --save-exact -D @types/react@^19.0.0 @types/react-dom@^19.0.0
```

**Astro Client Directives (по приоритету использования):**

| Directive | When to Use | Example |
|-----------|-------------|---------|
| (none) | Статический компонент, без JS | `<Card />` |
| `client:idle` | Некритичная интерактивность | `<ProjectFilters client:idle />` |
| `client:visible` | Компонент ниже fold | `<Comments client:visible />` |
| `client:media` | Только для определённых устройств | `<MobileMenu client:media="(max-width: 768px)" />` |
| `client:load` | Критичная интерактивность сразу | `<ThemeToggle client:load />` |

---

#### Styling: Tailwind CSS v4

| Property | Value |
|----------|-------|
| **Package** | `tailwindcss` |
| **Version** | `^4.0.0` |
| **Vite Plugin** | `@tailwindcss/vite@^4.0.0` |
| **License** | MIT |
| **Documentation** | https://tailwindcss.com |

**Justification:**
- Utility-first — быстрая разработка
- Zero-runtime — стили генерируются в CSS при билде
- Mobile-first breakpoints из коробки
- JIT mode — только используемые классы в финальном CSS

**Installation:**
```bash
npm install tailwindcss @tailwindcss/vite
```

**Configuration (vite plugin in astro.config.mjs):**
```javascript
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
});
```

**CSS Entry Point (src/styles/global.css):**
```css
@import "tailwindcss";

/* Custom theme tokens */
@theme {
  --color-bg-primary: #ffffff;
  --color-bg-secondary: #f8fafc;
  --color-text-primary: #0f172a;
  --color-text-secondary: #475569;
  --color-accent: #6366f1;
  --color-accent-glow: #818cf8;
  
  --font-sans: 'Inter', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}

/* Dark theme */
[data-theme="dark"] {
  --color-bg-primary: #0f172a;
  --color-bg-secondary: #1e293b;
  --color-text-primary: #f8fafc;
  --color-text-secondary: #94a3b8;
  --color-accent: #818cf8;
  --color-accent-glow: #a5b4fc;
}
```

**Responsive Breakpoints (Tailwind defaults):**

| Breakpoint | Min Width | Use Case |
|------------|-----------|----------|
| `sm` | 640px | Large phones |
| `md` | 768px | Tablets |
| `lg` | 1024px | Laptops |
| `xl` | 1280px | Desktops |
| `2xl` | 1536px | Large screens |

---

### 2. Build & Development Tools

#### TypeScript 5.7+

| Property | Value |
|----------|-------|
| **Package** | `typescript` |
| **Version** | `^5.7.0` |
| **License** | Apache-2.0 |
| **Documentation** | https://www.typescriptlang.org |

**Justification:**
- Type safety для всех компонентов и утилит
- Улучшенный DX с автодополнением
- Zod-валидация Content Collections в Astro
- Требуется Node.js >=20

**Installation:**
```bash
npm install -D typescript
```

**tsconfig.json:**
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
      "@data/*": ["src/data/*"]
    },
    "jsx": "react-jsx",
    "jsxImportSource": "react"
  }
}
```

---

#### ESLint 9.x

| Property | Value |
|----------|-------|
| **Package** | `eslint` |
| **Version** | `^9.0.0` |
| **Config Format** | Flat Config (eslint.config.js) |
| **License** | MIT |

**Additional Packages:**
```bash
npm install -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-astro eslint-plugin-jsx-a11y
```

**eslint.config.js:**
```javascript
import eslint from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import astroPlugin from 'eslint-plugin-astro';
import jsxA11y from 'eslint-plugin-jsx-a11y';

export default [
  eslint.configs.recommended,
  ...astroPlugin.configs['flat/recommended'],
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      'jsx-a11y': jsxA11y,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'error',
      'jsx-a11y/alt-text': 'error',
      'jsx-a11y/anchor-is-valid': 'error',
    },
  },
];
```

---

#### Prettier 3.x

| Property | Value |
|----------|-------|
| **Package** | `prettier` |
| **Version** | `^3.4.0` |
| **Astro Plugin** | `prettier-plugin-astro@^0.14.0` |
| **Tailwind Plugin** | `prettier-plugin-tailwindcss@^0.6.0` |

**Installation:**
```bash
npm install -D prettier prettier-plugin-astro prettier-plugin-tailwindcss
```

**.prettierrc:**
```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "plugins": ["prettier-plugin-astro", "prettier-plugin-tailwindcss"],
  "overrides": [
    {
      "files": "*.astro",
      "options": {
        "parser": "astro"
      }
    }
  ]
}
```

---

#### Vite 6.x (встроен в Astro)

| Property | Value |
|----------|-------|
| **Package** | `vite` (bundled with Astro) |
| **Version** | `^6.0.0` |
| **License** | MIT |

**Justification:**
- Встроен в Astro 5 — не требует отдельной установки
- Instant HMR для быстрой разработки
- Оптимизированный production build
- Native ESM

---

### 3. Data Layer (Post-MVP)

#### Supabase

| Property | Value |
|----------|-------|
| **JS Client** | `@supabase/supabase-js` |
| **Version** | `^2.79.0` |
| **SSR Helper** | `@supabase/ssr@^0.5.0` |
| **License** | MIT |
| **Documentation** | https://supabase.com/docs |

**Requirements:**
- Node.js >=20 (обязательно с версии 2.79.0)

**Installation:**
```bash
npm install @supabase/supabase-js@latest
```

**Environment Variables (.env):**
```env
PUBLIC_SUPABASE_URL=https://your-project.supabase.co
PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

**Database Schema (telegram_posts):**
```sql
-- Supabase SQL Editor
CREATE TABLE telegram_posts (
  id BIGINT PRIMARY KEY,
  text TEXT NOT NULL,
  html TEXT,
  date TIMESTAMPTZ NOT NULL,
  views INTEGER,
  media JSONB,
  entities JSONB,
  slug TEXT UNIQUE NOT NULL,
  seo_title TEXT,
  seo_description TEXT,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Индексы
CREATE INDEX idx_posts_date ON telegram_posts(date DESC);
CREATE INDEX idx_posts_slug ON telegram_posts(slug);
CREATE INDEX idx_posts_published ON telegram_posts(is_published) 
  WHERE is_published = true;

-- Row Level Security
ALTER TABLE telegram_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access" ON telegram_posts
  FOR SELECT USING (is_published = true);

CREATE POLICY "Service role full access" ON telegram_posts
  FOR ALL USING (auth.role() = 'service_role');
```

**Supabase Client (src/lib/supabase.ts):**
```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

---

#### Telegram Bot API (Post-MVP)

| Property | Value |
|----------|-------|
| **API** | Telegram Bot API |
| **Version** | Latest |
| **Auth** | Bot Token from @BotFather |
| **Documentation** | https://core.telegram.org/bots/api |

**Environment Variables:**
```env
TELEGRAM_BOT_TOKEN=your-bot-token
TELEGRAM_CHANNEL_ID=-1001234567890
TELEGRAM_WEBHOOK_SECRET=your-webhook-secret
```

**Webhook Handler (functions/api/telegram-webhook.ts):**
```typescript
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Verify webhook secret
  const secret = req.headers['x-telegram-bot-api-secret-token'];
  if (secret !== process.env.TELEGRAM_WEBHOOK_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const update = req.body;
  
  if (update.channel_post) {
    const post = update.channel_post;
    // Process and save to Supabase
    // ...
  }

  return res.status(200).json({ ok: true });
}
```

---

### 4. Infrastructure

#### Vercel

| Property | Value |
|----------|-------|
| **Adapter** | `@astrojs/vercel` |
| **Version** | `^8.0.0` |
| **Features** | CDN, Edge Functions, Analytics, Web Vitals |
| **Pricing** | Hobby (Free) → Pro ($20/mo) |
| **Documentation** | https://vercel.com/docs |

**Installation:**
```bash
npx astro add vercel
```

**astro.config.mjs (Hybrid SSR):**
```javascript
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://artfrost.vercel.app', // Update when custom domain
  output: 'hybrid', // SSG by default, opt-in SSR
  
  adapter: vercel({
    webAnalytics: { enabled: true },
    edgeMiddleware: true,
  }),
  
  integrations: [
    react(),
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      serialize(item) {
        if (item.url.includes('/blog/')) {
          item.changefreq = 'daily';
          item.priority = 0.9;
        }
        return item;
      },
    }),
  ],
  
  vite: {
    plugins: [tailwindcss()],
  },
});
```

**vercel.json:**
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "astro",
  "regions": ["fra1"],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        }
      ]
    }
  ]
}
```

---

### 5. SEO & Analytics Tools

#### Sitemap Generation

| Property | Value |
|----------|-------|
| **Package** | `@astrojs/sitemap` |
| **Version** | `^3.2.0` |
| **Output** | `/sitemap-index.xml` |

**Installation:**
```bash
npx astro add sitemap
```

---

#### OG Image Generation

| Property | Value |
|----------|-------|
| **Package** | `astro-opengraph-images` |
| **Version** | `^0.5.0` |
| **Dependencies** | `@resvg/resvg-js`, `satori` |

**Installation:**
```bash
npm install astro-opengraph-images @resvg/resvg-js satori
```

---

#### RSS Feed

| Property | Value |
|----------|-------|
| **Package** | `@astrojs/rss` |
| **Version** | `^4.0.0` |
| **Output** | `/rss.xml` |

**Installation:**
```bash
npm install @astrojs/rss
```

---

#### Icons

| Property | Value |
|----------|-------|
| **Package** | `astro-icon` |
| **Version** | `^1.1.0` |
| **Icon Sets** | `@iconify-json/lucide`, `@iconify-json/simple-icons` |

**Installation:**
```bash
npm install astro-icon @iconify-json/lucide @iconify-json/simple-icons
```

---

### 6. Testing (Phase 2+)

#### Vitest

| Property | Value |
|----------|-------|
| **Package** | `vitest` |
| **Version** | `^2.1.0` |
| **License** | MIT |

**Installation:**
```bash
npm install -D vitest @testing-library/react jsdom
```

---

#### Playwright (E2E)

| Property | Value |
|----------|-------|
| **Package** | `@playwright/test` |
| **Version** | `^1.48.0` |

**Installation:**
```bash
npm install -D @playwright/test
npx playwright install
```

---

## Compatibility Matrix

| Component A | Component B | Version A | Version B | Status | Notes |
|-------------|-------------|-----------|-----------|--------|-------|
| Astro | React | 5.x | 19.x | ✅ OK | Official integration |
| Astro | Tailwind CSS | 5.x | 4.x | ✅ OK | Via Vite plugin |
| Astro | Vercel Adapter | 5.x | 8.x | ✅ OK | Official adapter |
| Astro | TypeScript | 5.x | 5.7+ | ✅ OK | Built-in support |
| Supabase JS | Node.js | 2.79+ | 20+ | ✅ OK | Node 18 deprecated |
| React | TypeScript | 19.x | 5.7+ | ✅ OK | @types/react@19 |
| Tailwind CSS | Vite | 4.x | 6.x | ✅ OK | @tailwindcss/vite |
| ESLint | TypeScript ESLint | 9.x | 8.x | ✅ OK | Flat config |

---

## Dependencies Summary

### Production Dependencies

```json
{
  "dependencies": {
    "astro": "^5.0.0",
    "@astrojs/react": "^4.0.0",
    "@astrojs/sitemap": "^3.2.0",
    "@astrojs/vercel": "^8.0.0",
    "@astrojs/rss": "^4.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "astro-icon": "^1.1.0",
    "@iconify-json/lucide": "^1.2.0",
    "@iconify-json/simple-icons": "^1.2.0"
  }
}
```

### Development Dependencies

```json
{
  "devDependencies": {
    "typescript": "^5.7.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "tailwindcss": "^4.0.0",
    "@tailwindcss/vite": "^4.0.0",
    "eslint": "^9.0.0",
    "@typescript-eslint/parser": "^8.0.0",
    "@typescript-eslint/eslint-plugin": "^8.0.0",
    "eslint-plugin-astro": "^1.3.0",
    "eslint-plugin-jsx-a11y": "^6.10.0",
    "prettier": "^3.4.0",
    "prettier-plugin-astro": "^0.14.0",
    "prettier-plugin-tailwindcss": "^0.6.0"
  }
}
```

### Post-MVP Dependencies

```json
{
  "dependencies": {
    "@supabase/supabase-js": "^2.79.0",
    "@astrojs/mdx": "^4.0.0",
    "astro-opengraph-images": "^0.5.0"
  },
  "devDependencies": {
    "vitest": "^2.1.0",
    "@testing-library/react": "^16.0.0",
    "@playwright/test": "^1.48.0"
  }
}
```

---

## Installation Commands

### Initial Project Setup

```bash
# 1. Create Astro project
npm create astro@latest artfrost-portfolio -- --template minimal
cd artfrost-portfolio

# 2. Install core integrations
npx astro add react sitemap vercel

# 3. Install React and types
npm install --save-exact react@^19.0.0 react-dom@^19.0.0
npm install -D --save-exact @types/react@^19.0.0 @types/react-dom@^19.0.0

# 4. Install Tailwind CSS v4
npm install tailwindcss @tailwindcss/vite

# 5. Install development tools
npm install -D typescript eslint prettier
npm install -D @typescript-eslint/parser @typescript-eslint/eslint-plugin
npm install -D eslint-plugin-astro eslint-plugin-jsx-a11y
npm install -D prettier-plugin-astro prettier-plugin-tailwindcss

# 6. Install icons
npm install astro-icon @iconify-json/lucide @iconify-json/simple-icons

# 7. Install RSS
npm install @astrojs/rss
```

### Post-MVP Setup

```bash
# Supabase client
npm install @supabase/supabase-js@latest

# MDX support
npx astro add mdx

# OG Image generation
npm install astro-opengraph-images @resvg/resvg-js satori

# Testing
npm install -D vitest @testing-library/react jsdom
npm install -D @playwright/test
npx playwright install
```

---

## Lockfiles & CI

### Package Manager

| Property | Value |
|----------|-------|
| **Manager** | npm (default) or pnpm |
| **Lockfile** | `package-lock.json` or `pnpm-lock.yaml` |
| **Node.js** | `>=20.0.0` |

**.nvmrc:**
```
20
```

**engines in package.json:**
```json
{
  "engines": {
    "node": ">=20.0.0"
  }
}
```

### CI/CD Pipeline (Vercel)

Vercel автоматически:
1. Обнаруживает Astro framework
2. Устанавливает зависимости
3. Запускает `npm run build`
4. Деплоит в CDN

**GitHub Actions (optional, для тестов):**
```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
      - run: npm run typecheck
      - run: npm run build
```

### Dependency Updates

| Tool | Purpose | Frequency |
|------|---------|-----------|
| **Dependabot** | Security updates | Automatic |
| **Renovate** | Version updates | Weekly (PR) |

**renovate.json:**
```json
{
  "extends": ["config:recommended"],
  "packageRules": [
    {
      "groupName": "astro",
      "matchPackagePatterns": ["^astro", "^@astrojs/"]
    },
    {
      "groupName": "react",
      "matchPackagePatterns": ["^react", "^@types/react"]
    }
  ],
  "schedule": ["every weekend"]
}
```

---

## Scripts (package.json)

```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro check && astro build",
    "preview": "astro preview",
    "start": "astro dev",
    "lint": "eslint . --ext .js,.ts,.astro,.tsx",
    "lint:fix": "eslint . --ext .js,.ts,.astro,.tsx --fix",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "typecheck": "astro check && tsc --noEmit",
    "test": "vitest",
    "test:e2e": "playwright test"
  }
}
```

---

## Environment Variables

### Development (.env.local)

```env
# Site
PUBLIC_SITE_URL=http://localhost:4321

# Supabase (Post-MVP)
PUBLIC_SUPABASE_URL=https://your-project.supabase.co
PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Telegram (Post-MVP)
TELEGRAM_BOT_TOKEN=your-bot-token
TELEGRAM_CHANNEL_ID=-1001234567890
TELEGRAM_WEBHOOK_SECRET=your-webhook-secret

# Analytics
VERCEL_ANALYTICS_ID=auto
```

### Production (Vercel Dashboard)

Same variables, but set via Vercel Project Settings → Environment Variables.

---

## Reconciliation Notes

### Resolved Conflicts

1. **Tailwind CSS v4 + Astro:** Используем `@tailwindcss/vite` вместо `@astrojs/tailwind` (deprecated)
2. **Node.js Version:** Минимум 20.0.0 из-за Supabase JS 2.79+ требований
3. **ESLint 9.x:** Используем flat config вместо `.eslintrc`

### Assumptions

1. **Custom Domain:** Будет добавлен позже, MVP на `*.vercel.app`
2. **i18n:** Архитектура готова, но реализация в Phase 3
3. **Blog:** Реализация в Post-MVP фазе с Supabase и Telegram

---

## Performance Budget

| Resource | Budget | Warning | Critical |
|----------|--------|---------|----------|
| **Total Page Size** | < 500 KB | 750 KB | 1 MB |
| **JavaScript** | < 50 KB | 75 KB | 100 KB |
| **CSS** | < 30 KB | 40 KB | 50 KB |
| **Images (above fold)** | < 200 KB | 300 KB | 400 KB |
| **Web Fonts** | < 100 KB | 120 KB | 150 KB |
| **LCP** | < 2.5s | < 3s | < 4s |
| **CLS** | < 0.1 | < 0.15 | < 0.25 |
| **INP** | < 200ms | < 300ms | < 500ms |

---

## Sources & Documentation

| Technology | Documentation URL |
|------------|-------------------|
| Astro | https://docs.astro.build |
| React | https://react.dev |
| Tailwind CSS | https://tailwindcss.com/docs |
| Supabase | https://supabase.com/docs |
| Vercel | https://vercel.com/docs |
| TypeScript | https://www.typescriptlang.org/docs |
| ESLint | https://eslint.org/docs |
| Telegram Bot API | https://core.telegram.org/bots/api |

---

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-01-23 | TechStack Agent | Initial TechStack creation |

---

**Документ готов для использования в разработке.**
