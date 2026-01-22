# Product Requirements Document: Art Frost Portfolio

**Версия:** 1.0  
**Дата:** 23 января 2026  
**Автор:** Art Frost  
**Статус:** Draft

---

## Executive Summary

### Проблема
Отсутствие единой точки входа для аудитории Art Frost. Контент разбросан по разным платформам (Telegram, YouTube, Instagram), что затрудняет:
- Узнаваемость бренда в поисковых системах
- Конвертацию случайных посетителей в подписчиков
- Демонстрацию портфолио проектов потенциальным клиентам/работодателям

### Решение
Создание персонального сайта-портфолио на Astro с автоматическим зеркалированием Telegram-канала. Сайт станет:
- **Визитной карточкой** — вся информация о Art Frost в одном месте
- **SEO-магнитом** — каждый Telegram-пост = индексируемая страница
- **Конвертером** — воронка из поиска в Telegram-канал и соцсети

### Метрики успеха (KPIs)

| Метрика | Baseline | Target (3 мес.) | Target (6 мес.) |
|---------|----------|-----------------|-----------------|
| Органический трафик | 0 | 500 visits/мес | 2000 visits/мес |
| Позиции по бренд-запросу "Art Frost" | N/A | Top 10 | Top 3 |
| Конверсия в подписчиков Telegram | N/A | 5% | 10% |
| Lighthouse Performance Score | N/A | > 90 | > 95 |
| Core Web Vitals (все метрики "Good") | N/A | 100% | 100% |

### Timeline Overview

| Фаза | Описание | Срок |
|------|----------|------|
| **MVP** | Визитка (главная, about, projects, links) | 3-4 недели |
| **Post-MVP** | Блог-зеркало Telegram | +2-3 недели |
| **Enhancement** | Мультиязычность, расширенное SEO | +2 недели |

---

## Context & Inputs

### Стейкхолдеры

| Роль | Описание | Интерес |
|------|----------|---------|
| **Art Frost** | Владелец проекта, IT-специалист, vibe coder | Узнаваемость, портфолио, рост аудитории |
| **Посетители из поиска** | Ищут информацию по ключевым словам | Найти полезный контент |
| **Подписчики Telegram** | Существующая аудитория | Удобный доступ к архиву постов |
| **Потенциальные клиенты** | Ищут специалиста для проекта | Оценить навыки и опыт |

### Связанные платформы и источники данных

| Платформа | URL | Роль |
|-----------|-----|------|
| Telegram-канал | t.me/artfrost | Основной источник контента для блога |
| YouTube | youtube.com/@artfrost | Видеоконтент, embed на сайте |
| Instagram | instagram.com/artfrost | Социальное присутствие |
| GitHub | github.com/artfrost | Хостинг проектов |

### Технологический стек (решено)

| Компонент | Технология | Обоснование |
|-----------|------------|-------------|
| **Framework** | Astro 5.x + React | Zero JS по умолчанию, Islands Architecture, идеален для SEO |
| **Styling** | Tailwind CSS v4 | Utility-first, mobile-first, быстрая разработка |
| **Database** | Supabase (PostgreSQL) | Free tier 500MB, Realtime, Row Level Security |
| **Hosting** | Vercel | Edge Functions, Analytics, отличная интеграция с Astro |
| **Domain** | *.vercel.app (MVP) | Бесплатно, позже переход на кастомный домен |

---

## Target Audience & Personas

### Persona A: Искатель из поиска

**Профиль:**
- Случайно нашёл сайт через Google/Yandex
- Искал информацию по конкретной теме (IT, код, технологии)
- Возраст: 18-35 лет
- Технически грамотный

**Цели:**
- Найти ответ на свой вопрос
- Узнать больше об авторе, если контент полезен
- Возможно, подписаться на источник полезного контента

**Pain Points:**
- Раздражают медленные сайты
- Не любит навязчивую рекламу
- Хочет быстро найти нужное

**Сценарий:**
1. Вводит запрос в Google
2. Переходит на страницу блога Art Frost
3. Читает пост, находит полезным
4. Переходит на главную, изучает автора
5. Подписывается на Telegram

### Persona B: Потенциальный клиент/работодатель

**Профиль:**
- HR, продакт-менеджер или владелец бизнеса
- Ищет специалиста для проекта
- Оценивает по портфолио и онлайн-присутствию

**Цели:**
- Оценить навыки и опыт
- Посмотреть примеры работ
- Найти контактную информацию

**Pain Points:**
- Нет времени на длинные тексты
- Нужны конкретные примеры и результаты
- Важна профессиональная подача

**Сценарий:**
1. Получает ссылку на сайт или находит в поиске
2. Смотрит главную страницу (первое впечатление)
3. Переходит в Projects, изучает кейсы
4. Читает About для понимания background
5. Связывается через контактные данные

### Persona C: Подписчик Telegram-канала

**Профиль:**
- Уже подписан на канал Art Frost
- Хочет найти старый пост или поделиться ссылкой
- Активный пользователь Telegram

**Цели:**
- Найти конкретный пост из архива
- Получить ссылку для шеринга вне Telegram
- Читать контент в удобном формате

**Pain Points:**
- В Telegram сложный поиск по старым постам
- Ссылки t.me/ не всегда удобно шарить
- Хочет читать на сайте с хорошей типографикой

---

## User Journeys & Critical Paths

### Journey 1: Первое посещение из поиска → Подписка на Telegram

```
[Google Search] → [Blog Post Page] → [Read Content] → [Explore Site]
                                                            ↓
                          [Subscribe to Telegram] ← [Main Page/About]
```

**Шаги:**
1. Пользователь вводит запрос в Google
2. Видит сниппет с сайта Art Frost в результатах
3. Переходит на страницу блога
4. Читает пост, находит полезным
5. Кликает на логотип/навигацию → главная страница
6. Видит CTA "Подписаться на Telegram"
7. Переходит в Telegram, подписывается

**Ожидаемый результат:** Новый подписчик Telegram-канала

**Метрики:**
- Bounce rate < 60%
- Time on site > 2 минуты
- Conversion rate (visit → Telegram click) > 5%

### Journey 2: Прямой заход → Изучение портфолио

```
[Direct URL / Search "Art Frost"] → [Main Page] → [Projects] → [Project Detail]
                                                                      ↓
                                        [Contact / Telegram] ← [About Page]
```

**Шаги:**
1. Пользователь вводит URL или ищет "Art Frost"
2. Попадает на главную страницу
3. Изучает Hero-секцию, понимает кто Art Frost
4. Переходит в Projects
5. Кликает на интересующий проект
6. Изучает детали, технологии, ссылки
7. Возвращается, переходит в About для доп. информации
8. Связывается через контакты или подписывается

**Ожидаемый результат:** Понимание компетенций, возможный контакт

### Journey 3: Поиск поста из Telegram

```
[Telegram Channel] → [Link to Blog Post] → [Read on Website] → [Share Link]
```

**Шаги:**
1. Подписчик видит пост в Telegram
2. Хочет поделиться с коллегой, который не в Telegram
3. Кликает на ссылку "Читать на сайте"
4. Открывается красиво оформленная страница
5. Копирует URL, отправляет коллеге

**Ожидаемый результат:** Шеринг контента, новые посетители

---

## User Stories

### Epic 1: Главная страница (Landing)

#### US-1.1: Hero Section
**As a** посетитель сайта  
**I want to** сразу понять кто такой Art Frost  
**So that** я могу решить, интересен ли мне этот человек/контент

**Acceptance Criteria:**
- [ ] Given посетитель открыл главную страницу
- [ ] When страница загрузилась
- [ ] Then отображается имя "Art Frost", краткое описание (IT-специалист, vibe coder)
- [ ] And отображаются иконки соцсетей (Telegram, YouTube, Instagram, GitHub)
- [ ] And есть CTA-кнопка "Подписаться на Telegram"
- [ ] And загрузка hero-секции < 1.5s (LCP)

**Priority:** P0  
**Dependencies:** Layout component, Social icons  
**Trace to:** KPI "Конверсия в подписчиков"

#### US-1.2: Featured Projects
**As a** потенциальный клиент  
**I want to** увидеть лучшие работы на главной  
**So that** я могу быстро оценить уровень специалиста

**Acceptance Criteria:**
- [ ] Given посетитель на главной странице
- [ ] When прокрутил до секции Projects
- [ ] Then отображаются 3-4 featured проекта в виде карточек
- [ ] And каждая карточка содержит: название, краткое описание, теги технологий, превью-изображение
- [ ] And hover-эффект на карточках (микроанимация)
- [ ] And ссылка "Все проекты" ведёт на /projects

**Priority:** P0  
**Dependencies:** Project data structure, Card component

#### US-1.3: Quick Links Section
**As a** посетитель  
**I want to** быстро перейти на нужную платформу  
**So that** я могу следить за Art Frost там, где мне удобно

**Acceptance Criteria:**
- [ ] Given посетитель на главной
- [ ] When видит секцию социальных ссылок
- [ ] Then отображаются кнопки: Telegram, YouTube, Instagram, GitHub
- [ ] And каждая кнопка открывает ссылку в новой вкладке
- [ ] And кнопки имеют атрибуты rel="noopener noreferrer"

**Priority:** P0

### Epic 2: About Page

#### US-2.1: Биография
**As a** посетитель  
**I want to** узнать больше об Art Frost  
**So that** я могу понять его background и экспертизу

**Acceptance Criteria:**
- [ ] Given посетитель на странице /about
- [ ] When страница загрузилась
- [ ] Then отображается фото/аватар Art Frost
- [ ] And отображается развёрнутая биография (текст)
- [ ] And отображаются ключевые навыки/технологии
- [ ] And JSON-LD Person schema присутствует в HTML

**Priority:** P0  
**Trace to:** SEO Person schema

#### US-2.2: Timeline / Experience
**As a** потенциальный работодатель  
**I want to** увидеть опыт и достижения  
**So that** я могу оценить релевантность для моих задач

**Acceptance Criteria:**
- [ ] Given посетитель на /about
- [ ] When прокрутил до секции Experience
- [ ] Then отображается timeline с ключевыми этапами
- [ ] And каждый этап содержит: год, название, описание

**Priority:** P1

### Epic 3: Projects Page

#### US-3.1: Галерея проектов
**As a** посетитель  
**I want to** просмотреть все проекты Art Frost  
**So that** я могу найти интересующие меня работы

**Acceptance Criteria:**
- [ ] Given посетитель на /projects
- [ ] When страница загрузилась
- [ ] Then отображается сетка карточек проектов (Bento grid)
- [ ] And каждая карточка: название, описание, теги, превью
- [ ] And карточки адаптивны (1 колонка mobile, 2-3 desktop)

**Priority:** P0

#### US-3.2: Фильтрация по тегам
**As a** посетитель  
**I want to** отфильтровать проекты по технологиям  
**So that** я могу найти релевантные работы

**Acceptance Criteria:**
- [ ] Given посетитель на /projects
- [ ] When кликает на тег (например, "React")
- [ ] Then отображаются только проекты с этим тегом
- [ ] And URL обновляется (?tag=react) для шеринга

**Priority:** P1

#### US-3.3: Детальная страница проекта
**As a** посетитель  
**I want to** изучить конкретный проект подробнее  
**So that** я могу понять технологии и подход

**Acceptance Criteria:**
- [ ] Given посетитель кликнул на карточку проекта
- [ ] When открылась страница /projects/[slug]
- [ ] Then отображается: название, полное описание, скриншоты/видео
- [ ] And отображаются технологии (теги)
- [ ] And есть ссылки: GitHub (если есть), Demo (если есть)
- [ ] And JSON-LD CreativeWork schema присутствует

**Priority:** P0

### Epic 4: Links Page

#### US-4.1: Linktree-style страница
**As a** пользователь соцсетей  
**I want to** видеть все ссылки Art Frost в одном месте  
**So that** я могу быстро перейти на нужную платформу

**Acceptance Criteria:**
- [ ] Given посетитель на /links
- [ ] When страница загрузилась
- [ ] Then отображается аватар Art Frost сверху
- [ ] And отображается список кнопок-ссылок вертикально
- [ ] And ссылки: Telegram, YouTube, Instagram, GitHub, Email
- [ ] And каждая кнопка с иконкой и названием
- [ ] And страница оптимизирована для мобильных (основной use case)

**Priority:** P0

### Epic 5: Темы и UI (Design System)

#### US-5.1: Переключение тем
**As a** пользователь  
**I want to** выбрать светлую или тёмную тему  
**So that** я могу читать контент комфортно

**Acceptance Criteria:**
- [ ] Given пользователь на любой странице
- [ ] When кликает на переключатель темы
- [ ] Then тема меняется (light ↔ dark) с плавной анимацией
- [ ] And выбор сохраняется в localStorage
- [ ] And при первом визите используется системная тема (prefers-color-scheme)
- [ ] And нет FOUC (Flash of Unstyled Content) при загрузке

**Priority:** P0

#### US-5.2: Микроанимации
**As a** посетитель  
**I want to** видеть приятные анимации при взаимодействии  
**So that** сайт ощущается современным и живым

**Acceptance Criteria:**
- [ ] Given посетитель взаимодействует с элементами
- [ ] When hover на кнопках/карточках
- [ ] Then элементы плавно анимируются (scale, shadow, цвет)
- [ ] And анимации не превышают 300ms
- [ ] And анимации отключены для prefers-reduced-motion
- [ ] And нет негативного влияния на CLS

**Priority:** P1

#### US-5.3: Неоновые акценты
**As a** посетитель  
**I want to** видеть уникальный визуальный стиль  
**So that** сайт запоминается и выделяется

**Acceptance Criteria:**
- [ ] Given пользователь на сайте
- [ ] When просматривает интерактивные элементы
- [ ] Then CTA-кнопки, ссылки, акценты имеют неоновый glow (умеренный)
- [ ] And эффект адаптируется под тему (ярче в dark, мягче в light)
- [ ] And эффекты не отвлекают от контента (в меру)

**Priority:** P2

### Epic 6: SEO & Performance

#### US-6.1: Structured Data
**As a** поисковая система  
**I want to** получить структурированные данные  
**So that** я могу правильно индексировать и показывать rich snippets

**Acceptance Criteria:**
- [ ] Given краулер сканирует сайт
- [ ] When парсит HTML страниц
- [ ] Then находит JSON-LD schema на каждой странице:
  - Главная: WebSite, Person
  - About: Person с sameAs
  - Projects: CreativeWork
  - Blog posts: BlogPosting
  - All pages: BreadcrumbList
- [ ] And schema валидна (Google Rich Results Test)

**Priority:** P0  
**Trace to:** KPI "Позиции в поиске"

#### US-6.2: Meta Tags & Open Graph
**As a** пользователь, который делится ссылкой  
**I want to** видеть красивое превью  
**So that** ссылка привлекательно выглядит в Telegram/соцсетях

**Acceptance Criteria:**
- [ ] Given пользователь делится ссылкой на страницу
- [ ] When мессенджер/соцсеть запрашивает meta-данные
- [ ] Then возвращаются: og:title, og:description, og:image (1200x630)
- [ ] And каждая страница имеет уникальный title и description
- [ ] And OG-изображения генерируются автоматически или вручную созданы

**Priority:** P0

#### US-6.3: Sitemap & robots.txt
**As a** поисковая система  
**I want to** получить карту сайта  
**So that** я могу эффективно индексировать все страницы

**Acceptance Criteria:**
- [ ] Given краулер запрашивает /sitemap.xml
- [ ] When файл возвращается
- [ ] Then содержит все публичные страницы с приоритетами
- [ ] And /robots.txt указывает на sitemap
- [ ] And /robots.txt не блокирует нужные страницы

**Priority:** P0

#### US-6.4: Core Web Vitals
**As a** посетитель  
**I want to** быстрый и отзывчивый сайт  
**So that** я не уйду из-за медленной загрузки

**Acceptance Criteria:**
- [ ] Given пользователь открывает любую страницу
- [ ] When страница загружается
- [ ] Then LCP < 2.5s
- [ ] And INP < 200ms
- [ ] And CLS < 0.1
- [ ] And Lighthouse Performance > 90

**Priority:** P0  
**Trace to:** KPI "Lighthouse Score"

---

## Functional Requirements

### FR-1.0: Навигация (P0)
**Description:** Глобальная навигация доступна на всех страницах  
**Acceptance:**
- Header с логотипом/именем, ссылками на разделы, переключателем темы
- Mobile: hamburger menu с анимацией
- Desktop: горизонтальное меню
- Sticky header при скролле (опционально)

**Dependencies:** Layout component  
**Trace to:** UX consistency

### FR-2.0: Responsive Design (P0)
**Description:** Сайт адаптирован для всех устройств  
**Acceptance:**
- Mobile-first CSS (min-width breakpoints)
- Breakpoints: 640px (sm), 768px (md), 1024px (lg), 1280px (xl)
- Touch-friendly элементы (min 44x44px)
- Тестирование на реальных устройствах

**Trace to:** Persona A, B, C (разные устройства)

### FR-3.0: Internationalization Ready (P1)
**Description:** Архитектура поддерживает мультиязычность  
**Acceptance:**
- Текстовый контент вынесен в отдельные файлы (i18n)
- URL-структура готова для /ru/, /en/ (будущее)
- Основной язык: русский
- hreflang теги (при добавлении языков)

**Trace to:** Будущая экспансия на англоязычную аудиторию

### FR-4.0: Analytics Integration (P1)
**Description:** Отслеживание поведения пользователей  
**Acceptance:**
- Vercel Analytics (встроено)
- Google Search Console подключена
- Отслеживание кликов на Telegram CTA
- Core Web Vitals мониторинг

**Trace to:** KPIs

---

## Non-Functional Requirements

### Performance

| Требование | Метрика | Значение | Приоритет |
|------------|---------|----------|-----------|
| **NFR-P1** | LCP (Largest Contentful Paint) | < 2.5s (95th percentile) | P0 |
| **NFR-P2** | INP (Interaction to Next Paint) | < 200ms | P0 |
| **NFR-P3** | CLS (Cumulative Layout Shift) | < 0.1 | P0 |
| **NFR-P4** | TTFB (Time to First Byte) | < 600ms | P1 |
| **NFR-P5** | Total Page Size | < 500KB (initial load) | P1 |
| **NFR-P6** | JavaScript Bundle | < 50KB (gzipped) | P1 |

### Availability

| Требование | Метрика | Значение | Приоритет |
|------------|---------|----------|-----------|
| **NFR-A1** | Uptime | 99.9% (Vercel SLA) | P0 |
| **NFR-A2** | Global CDN | Edge locations worldwide | P0 |

### Security

| Требование | Описание | Приоритет |
|------------|----------|-----------|
| **NFR-S1** | HTTPS only | Весь трафик через TLS | P0 |
| **NFR-S2** | CSP Headers | Content Security Policy | P1 |
| **NFR-S3** | External links | rel="noopener noreferrer" | P0 |

### SEO

| Требование | Описание | Приоритет |
|------------|----------|-----------|
| **NFR-SEO1** | Semantic HTML | Правильная иерархия h1-h6 | P0 |
| **NFR-SEO2** | Unique titles | Уникальный title на каждой странице | P0 |
| **NFR-SEO3** | Meta descriptions | 150-160 символов, с CTA | P0 |
| **NFR-SEO4** | Canonical URLs | На всех страницах | P0 |
| **NFR-SEO5** | Mobile-friendly | Google Mobile-Friendly Test pass | P0 |

### Accessibility

| Требование | Описание | Приоритет |
|------------|----------|-----------|
| **NFR-ACC1** | WCAG 2.1 AA | Минимальный уровень соответствия | P1 |
| **NFR-ACC2** | Keyboard navigation | Все интерактивные элементы доступны | P0 |
| **NFR-ACC3** | Color contrast | Минимум 4.5:1 для текста | P0 |
| **NFR-ACC4** | Alt texts | Все изображения с осмысленным alt | P0 |
| **NFR-ACC5** | Reduced motion | Анимации отключаются при prefers-reduced-motion | P1 |

---

## Data Model

### Entities

```
┌─────────────────────────────────────────────────────────────────┐
│                         DATA MODEL                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────┐     ┌──────────────┐     ┌──────────────┐     │
│  │   Project    │     │  SocialLink  │     │    Theme     │     │
│  ├──────────────┤     ├──────────────┤     ├──────────────┤     │
│  │ id: string   │     │ id: string   │     │ mode: enum   │     │
│  │ slug: string │     │ platform: str│     │ (light/dark) │     │
│  │ title: string│     │ url: string  │     │              │     │
│  │ description  │     │ icon: string │     │ localStorage │     │
│  │ image: string│     │ order: number│     └──────────────┘     │
│  │ tags: string[]     └──────────────┘                          │
│  │ github?: url │                                                │
│  │ demo?: url   │     ┌──────────────────────────────────┐      │
│  │ featured: bool     │         TelegramPost             │      │
│  │ date: Date   │     │         (Post-MVP)               │      │
│  └──────────────┘     ├──────────────────────────────────┤      │
│                       │ id: number (message_id)          │      │
│  ┌──────────────┐     │ text: string                     │      │
│  │   Profile    │     │ html: string (parsed entities)   │      │
│  ├──────────────┤     │ date: timestamp                  │      │
│  │ name: string │     │ views?: number                   │      │
│  │ title: string│     │ media?: {type, url, thumb}       │      │
│  │ bio: string  │     │ entities: TelegramEntity[]       │      │
│  │ avatar: url  │     │ slug: string (auto-generated)    │      │
│  │ skills: str[]│     │ seo_title: string                │      │
│  │ experience   │     │ seo_description: string          │      │
│  └──────────────┘     │ created_at: timestamp            │      │
│                       │ updated_at: timestamp            │      │
│                       └──────────────────────────────────┘      │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Project Schema (Astro Content Collection)

```typescript
// src/content/config.ts
import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';

const projects = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string(),
    tags: z.array(z.string()),
    github: z.string().url().optional(),
    demo: z.string().url().optional(),
    featured: z.boolean().default(false),
    date: z.coerce.date(),
    order: z.number().optional()
  })
});

export const collections = { projects };
```

### TelegramPost Schema (Supabase — Post-MVP)

```sql
-- Supabase SQL
CREATE TABLE telegram_posts (
  id BIGINT PRIMARY KEY,           -- Telegram message_id
  text TEXT NOT NULL,              -- Оригинальный текст
  html TEXT,                       -- HTML после парсинга entities
  date TIMESTAMPTZ NOT NULL,       -- Дата публикации
  views INTEGER,                   -- Просмотры (если доступно)
  media JSONB,                     -- {type: 'photo'|'video', url, thumbnail}
  entities JSONB,                  -- Telegram entities для форматирования
  slug TEXT UNIQUE,                -- URL-friendly идентификатор
  seo_title TEXT,                  -- SEO заголовок (авто или вручную)
  seo_description TEXT,            -- SEO описание
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Индексы для быстрого поиска
CREATE INDEX idx_posts_date ON telegram_posts(date DESC);
CREATE INDEX idx_posts_slug ON telegram_posts(slug);
CREATE INDEX idx_posts_published ON telegram_posts(is_published) WHERE is_published = true;
```

---

## API & Integration Specs

### Telegram Bot Webhook (Post-MVP)

**Endpoint:** `POST /api/telegram-webhook`  
**Auth:** Telegram webhook secret verification  
**Hosting:** Vercel Edge Function

**Request (from Telegram):**
```json
{
  "update_id": 123456789,
  "channel_post": {
    "message_id": 42,
    "chat": {
      "id": -1001234567890,
      "title": "Art Frost",
      "type": "channel"
    },
    "date": 1706000000,
    "text": "Привет! Это пост о vibe coding...",
    "entities": [
      {"type": "bold", "offset": 0, "length": 6}
    ],
    "photo": [
      {"file_id": "xxx", "width": 1280, "height": 720}
    ]
  }
}
```

**Response:**
```json
{
  "ok": true,
  "post_id": 42,
  "slug": "privet-eto-post-o-vibe-coding"
}
```

**Error Handling:**
- 401: Invalid webhook secret
- 400: Missing required fields
- 500: Database error (retry with exponential backoff)

### Telegram Bot API — Get Updates (Fallback)

**Endpoint:** `GET https://api.telegram.org/bot{TOKEN}/getUpdates`  
**Usage:** Scheduled job (GitHub Actions) каждые 2-4 часа

**Flow:**
1. GitHub Action запускается по расписанию
2. Запрашивает новые посты через getUpdates
3. Парсит entities → HTML
4. Сохраняет в Supabase
5. Триггерит Vercel rebuild через Deploy Hook

---

## Architecture Overview

### System Components

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        ARCHITECTURE OVERVIEW                             │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ┌─────────────┐                                                        │
│  │   Browser   │◄───────────────────────────────────────────┐           │
│  └──────┬──────┘                                            │           │
│         │ HTTPS                                             │           │
│         ▼                                                   │           │
│  ┌─────────────────────────────────────────────────────┐   │           │
│  │                    Vercel Edge                       │   │           │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  │   │           │
│  │  │   CDN       │  │  Edge Fn    │  │  Analytics  │  │   │           │
│  │  │  (Static)   │  │  (Webhook)  │  │             │  │   │           │
│  │  └──────┬──────┘  └──────┬──────┘  └─────────────┘  │   │           │
│  └─────────┼────────────────┼──────────────────────────┘   │           │
│            │                │                               │           │
│            │                │                               │           │
│            ▼                ▼                               │           │
│  ┌─────────────────────────────────────┐    ┌─────────────────────────┐│
│  │            Astro Site               │    │       Supabase          ││
│  │  ┌───────────┐  ┌───────────────┐   │    │  ┌─────────────────┐    ││
│  │  │  Pages    │  │  Components   │   │◄───┤  │  PostgreSQL     │    ││
│  │  │  (SSG)    │  │  (React)      │   │    │  │  telegram_posts │    ││
│  │  └───────────┘  └───────────────┘   │    │  └─────────────────┘    ││
│  │  ┌───────────┐  ┌───────────────┐   │    │  ┌─────────────────┐    ││
│  │  │  Content  │  │  Layouts      │   │    │  │  Realtime       │    ││
│  │  │  (JSON)   │  │               │   │    │  │  (optional)     │    ││
│  │  └───────────┘  └───────────────┘   │    │  └─────────────────┘    ││
│  └─────────────────────────────────────┘    └─────────────────────────┘│
│                                                                          │
│  ┌─────────────────────────────────────────────────────────────────────┐│
│  │                         External Services                            ││
│  │  ┌───────────┐  ┌───────────┐  ┌───────────┐  ┌───────────────┐    ││
│  │  │ Telegram  │  │  GitHub   │  │  Google   │  │    YouTube     │    ││
│  │  │ Bot API   │  │  Actions  │  │  Search   │  │    (embed)     │    ││
│  │  └───────────┘  └───────────┘  │  Console  │  └───────────────┘    ││
│  │                                 └───────────┘                        ││
│  └─────────────────────────────────────────────────────────────────────┘│
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

### Build & Deploy Flow

```
┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│  GitHub  │───>│  Vercel  │───>│   Build  │───>│   CDN    │
│   Push   │    │  Webhook │    │  (Astro) │    │  Deploy  │
└──────────┘    └──────────┘    └──────────┘    └──────────┘
                                     │
                                     ▼
                              ┌──────────────┐
                              │   Supabase   │
                              │  (fetch at   │
                              │  build time) │
                              └──────────────┘
```

### Telegram Sync Flow (Post-MVP)

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Telegram   │────>│  Webhook     │────>│   Supabase   │
│   Channel    │     │  (Vercel)    │     │   (save)     │
└──────────────┘     └──────────────┘     └──────┬───────┘
                                                  │
                                                  ▼
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  Vercel CDN  │<────│  Astro Build │<────│ Deploy Hook  │
│  (new pages) │     │  (generate)  │     │  (trigger)   │
└──────────────┘     └──────────────┘     └──────────────┘
```

---

## Implementation Plan

### Phase 0: Project Setup (Week 1)

| Task | Description | Owner |
|------|-------------|-------|
| **0.1** | Инициализация Astro проекта с React, Tailwind v4 | Dev |
| **0.2** | Настройка TypeScript, ESLint, Prettier | Dev |
| **0.3** | Создание базовых layouts (Base, Page) | Dev |
| **0.4** | Настройка Vercel deployment (preview + production) | Dev |
| **0.5** | Настройка структуры папок согласно архитектуре | Dev |

**Deliverables:**
- Рабочий скелет проекта на Vercel
- CI/CD pipeline (GitHub → Vercel)

### Phase 1: MVP — Визитка (Weeks 2-4)

| Task | Description | Priority | Dependencies |
|------|-------------|----------|--------------|
| **1.1** | Design System: цвета, типографика, spacing | P0 | 0.x |
| **1.2** | Theme switcher (light/dark) | P0 | 1.1 |
| **1.3** | Компонент Navigation (Header) | P0 | 1.1, 1.2 |
| **1.4** | Компонент Footer | P0 | 1.1 |
| **1.5** | Главная страница: Hero section | P0 | 1.3, 1.4 |
| **1.6** | Главная страница: Featured Projects | P0 | 1.5 |
| **1.7** | Главная страница: Social Links | P0 | 1.5 |
| **1.8** | About страница | P0 | 1.3 |
| **1.9** | Projects страница (галерея) | P0 | 1.3 |
| **1.10** | Project detail страница | P0 | 1.9 |
| **1.11** | Links страница | P0 | 1.3 |
| **1.12** | SEO: Meta tags, OG images | P0 | 1.5-1.11 |
| **1.13** | SEO: JSON-LD schemas | P0 | 1.12 |
| **1.14** | SEO: Sitemap, robots.txt | P0 | 1.12 |
| **1.15** | Performance optimization | P0 | 1.12 |
| **1.16** | Accessibility audit | P1 | 1.15 |
| **1.17** | Content: заполнение проектов | P0 | 1.9, 1.10 |
| **1.18** | Content: About текст | P0 | 1.8 |

**Milestone:** MVP Launch — полноценная визитка на *.vercel.app

### Phase 2: Post-MVP — Blog/Telegram (Weeks 5-7)

| Task | Description | Priority | Dependencies |
|------|-------------|----------|--------------|
| **2.1** | Создание Telegram бота через @BotFather | P0 | — |
| **2.2** | Настройка Supabase: таблица telegram_posts | P0 | — |
| **2.3** | Vercel Edge Function: webhook handler | P0 | 2.1, 2.2 |
| **2.4** | Parser: Telegram entities → HTML | P0 | 2.3 |
| **2.5** | SEO generator: auto title/description | P0 | 2.4 |
| **2.6** | Astro Content Loader для Supabase | P0 | 2.2 |
| **2.7** | Blog index страница | P0 | 2.6 |
| **2.8** | Blog post страница | P0 | 2.6 |
| **2.9** | RSS feed для блога | P1 | 2.7 |
| **2.10** | OG images для постов (auto-generation) | P1 | 2.8 |
| **2.11** | GitHub Action: scheduled sync (fallback) | P2 | 2.3 |

**Milestone:** Блог-зеркало Telegram работает, посты индексируются

### Phase 3: Enhancement (Weeks 8-9)

| Task | Description | Priority |
|------|-------------|----------|
| **3.1** | i18n: подготовка к мультиязычности | P1 |
| **3.2** | English version (partial) | P2 |
| **3.3** | Расширенная аналитика (events tracking) | P2 |
| **3.4** | A/B тестирование CTA | P2 |
| **3.5** | Custom domain setup | P1 |
| **3.6** | Мониторинг SEO позиций | P1 |

---

## Testing Strategy

### Unit Tests

| Область | Инструмент | Покрытие |
|---------|------------|----------|
| Utility functions | Vitest | 80%+ |
| Telegram parser | Vitest | 90%+ |
| SEO generators | Vitest | 80%+ |

### Integration Tests

| Область | Инструмент | Сценарии |
|---------|------------|----------|
| API endpoints | Vitest + MSW | Webhook handler, error cases |
| Content loading | Vitest | Astro content collections |

### E2E Tests

| Область | Инструмент | Сценарии |
|---------|------------|----------|
| Critical paths | Playwright | Homepage → Telegram link |
| Navigation | Playwright | All pages accessible |
| Theme switch | Playwright | Toggle works, persists |

### Manual Testing Checklist

- [ ] Chrome DevTools Mobile view (iPhone SE, Pixel 5)
- [ ] Real device testing (iOS Safari, Android Chrome)
- [ ] Theme switching in all pages
- [ ] All external links work (target="_blank")
- [ ] OG previews correct (opengraph.xyz)
- [ ] Lighthouse audit > 90 all categories
- [ ] Google Rich Results Test (all schemas valid)
- [ ] Screen reader testing (VoiceOver)

---

## Rollout & Monitoring

### Rollout Plan

| Stage | Description | Duration |
|-------|-------------|----------|
| **Stage 1** | Soft launch (только для себя, друзей) | 1 неделя |
| **Stage 2** | Публикация ссылки в Telegram-канале | — |
| **Stage 3** | Добавление в Google Search Console | — |
| **Stage 4** | Мониторинг, исправление багов | Ongoing |

### Monitoring & Alerts

| Метрика | Инструмент | Alert threshold |
|---------|------------|-----------------|
| Uptime | Vercel Status | < 99.9% |
| Performance (LCP) | Vercel Analytics | > 2.5s |
| Error rate | Vercel Logs | > 1% |
| SEO positions | Google Search Console | Drop > 10 positions |

### Metrics to Track

**Engagement:**
- Pageviews per session
- Time on site
- Bounce rate
- Telegram CTA clicks

**SEO:**
- Organic traffic (Search Console)
- Impressions & CTR
- Indexed pages count
- Core Web Vitals (field data)

**Technical:**
- Lighthouse scores (weekly)
- Build times
- Edge function invocations

---

## Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| **Telegram API rate limits** | Medium | Medium | Использовать webhook вместо polling; кэшировать в Supabase |
| **SEO дублирование с Telegram** | Medium | Low | Canonical URL на сайт; добавлять уникальный контент |
| **Медленная индексация** | Medium | Medium | Sitemap + IndexNow; качественный контент |
| **Telegram API изменения** | Low | High | Абстрактный слой; мониторинг изменений API |
| **Vercel free tier лимиты** | Low | Medium | Мониторинг usage; оптимизация edge functions |
| **Content без SEO-value** | Medium | Medium | Авто-генерация title/description; ручная правка важных постов |

---

## Glossary

| Термин | Определение |
|--------|-------------|
| **Astro** | Static site generator с Islands Architecture |
| **SSG** | Static Site Generation — генерация HTML на этапе билда |
| **SSR** | Server-Side Rendering — генерация HTML на сервере при запросе |
| **LCP** | Largest Contentful Paint — метрика скорости загрузки основного контента |
| **CLS** | Cumulative Layout Shift — метрика стабильности layout |
| **INP** | Interaction to Next Paint — метрика отзывчивости |
| **JSON-LD** | Формат структурированных данных для SEO |
| **OG** | Open Graph — протокол для превью ссылок в соцсетях |
| **Webhook** | HTTP callback для получения real-time уведомлений |
| **Edge Function** | Serverless функция, выполняемая на CDN edge |
| **Vibe Coding** | Стиль программирования с акцентом на творчество и flow state |

---

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-01-23 | PRD Agent | Initial PRD creation |

---

## Appendix A: Project File Structure

```
artfrost-portfolio/
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
├── package.json
├── .env.example
├── .gitignore
│
├── public/
│   ├── favicon.svg
│   ├── og-image.png              # Default OG
│   ├── robots.txt
│   └── fonts/
│       └── inter-var-latin.woff2
│
├── src/
│   ├── content/
│   │   ├── config.ts             # Content collections
│   │   └── projects/             # Project JSON files
│   │       ├── project-1.json
│   │       └── project-2.json
│   │
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button.astro
│   │   │   ├── Card.astro
│   │   │   ├── Icon.astro
│   │   │   └── ThemeToggle.tsx   # React (needs state)
│   │   ├── layout/
│   │   │   ├── Header.astro
│   │   │   ├── Footer.astro
│   │   │   └── Navigation.astro
│   │   ├── home/
│   │   │   ├── Hero.astro
│   │   │   ├── FeaturedProjects.astro
│   │   │   └── SocialLinks.astro
│   │   ├── projects/
│   │   │   ├── ProjectCard.astro
│   │   │   └── ProjectGrid.astro
│   │   ├── blog/                 # Post-MVP
│   │   │   ├── PostCard.astro
│   │   │   └── PostContent.astro
│   │   └── seo/
│   │       ├── Meta.astro
│   │       └── JsonLd.astro
│   │
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   └── BlogLayout.astro      # Post-MVP
│   │
│   ├── pages/
│   │   ├── index.astro           # Главная
│   │   ├── about.astro           # О себе
│   │   ├── links.astro           # Linktree-style
│   │   ├── projects/
│   │   │   ├── index.astro       # Список проектов
│   │   │   └── [slug].astro      # Детальная страница
│   │   ├── blog/                 # Post-MVP
│   │   │   ├── index.astro
│   │   │   └── [id].astro
│   │   ├── rss.xml.ts            # RSS feed
│   │   └── robots.txt.ts         # Dynamic robots
│   │
│   ├── styles/
│   │   └── global.css            # Tailwind imports, custom CSS
│   │
│   ├── lib/
│   │   ├── utils.ts              # Helper functions
│   │   ├── seo.ts                # SEO utilities
│   │   └── telegram/             # Post-MVP
│   │       ├── parser.ts
│   │       └── api.ts
│   │
│   └── data/
│       ├── profile.json          # Personal info
│       └── social-links.json     # Social media links
│
├── functions/                    # Vercel Edge Functions (Post-MVP)
│   └── api/
│       └── telegram-webhook.ts
│
└── scripts/
    └── generate-og-images.ts     # OG image generation
```

---

## Appendix B: Design Tokens

```css
/* Цветовая палитра */
:root {
  /* Light theme */
  --color-bg-primary: #ffffff;
  --color-bg-secondary: #f8fafc;
  --color-text-primary: #0f172a;
  --color-text-secondary: #475569;
  --color-accent: #6366f1;        /* Indigo */
  --color-accent-glow: #818cf8;   /* Neon accent */
  
  /* Spacing */
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 1.5rem;
  --space-xl: 2rem;
  --space-2xl: 3rem;
  
  /* Typography */
  --font-sans: 'Inter', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
  
  /* Animations */
  --transition-fast: 150ms ease;
  --transition-base: 300ms ease;
}

[data-theme="dark"] {
  --color-bg-primary: #0f172a;
  --color-bg-secondary: #1e293b;
  --color-text-primary: #f8fafc;
  --color-text-secondary: #94a3b8;
  --color-accent: #818cf8;
  --color-accent-glow: #a5b4fc;
}
```

---

## Appendix C: Traceability Matrix

| Requirement | Business Objective | User Story | Acceptance Test |
|-------------|-------------------|------------|-----------------|
| FR-1.0 Navigation | UX Consistency | US-1.1, US-2.1 | E2E: All pages navigable |
| FR-2.0 Responsive | Mobile audience | US-1.1, US-4.1 | Manual: Device testing |
| NFR-P1 LCP | Low bounce rate | US-6.4 | Lighthouse < 2.5s |
| NFR-SEO1 Semantic HTML | Search visibility | US-6.1 | Rich Results Test |
| US-1.1 Hero Section | First impression | KPI: Conversion | Visual: Hero renders correctly |
| US-5.1 Theme Switch | User comfort | Accessibility | E2E: Toggle persists |

---

**Документ готов к review и реализации.**
