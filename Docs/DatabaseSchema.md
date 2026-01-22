# Database Schema for Art Frost Portfolio

**VERSION:** 1.0  
**DATE:** 2026-01-23  
**STATUS:** Approved  
**DEPENDS ON:** PRD-ArtFrost-Portfolio.md, TechStack.md

---

## Scope and Purpose

Схема базы данных для сайта-портфолио Art Frost. Основное назначение — хранение постов из Telegram-канала для создания SEO-оптимизированного блога-зеркала.

**Ключевые требования:**
- Хранение Telegram-постов с полным сохранением форматирования
- Автоматическая генерация SEO-friendly slug'ов
- Поддержка медиа-файлов (фото, видео)
- Модерация контента (is_published)
- Быстрый поиск по дате и slug

**Объём данных (прогноз):**
- ~50-100 постов в год
- ~500 постов за 5 лет (max)
- Размер таблицы: < 10 MB (в рамках Supabase Free Tier 500 MB)

---

## Chosen Database Engine

**PostgreSQL 15+ (Supabase)**

**Обоснование:**
- Встроенный в Supabase (бесплатный tier 500 MB)
- JSONB для хранения структурированных данных (media, entities)
- Row Level Security (RLS) для безопасности
- Полнотекстовый поиск на будущее
- Совместимость с `@supabase/supabase-js ^2.79.0`

---

## Conceptual Model

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        CONCEPTUAL MODEL                                  │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ┌────────────────────────────────────────────────────────────────────┐ │
│  │                      TELEGRAM DOMAIN                                │ │
│  │                                                                     │ │
│  │  ┌──────────────┐         ┌──────────────┐                         │ │
│  │  │ telegram_    │ 1:N     │ post_media   │                         │ │
│  │  │ posts        │────────>│              │                         │ │
│  │  └──────────────┘         └──────────────┘                         │ │
│  │         │                                                           │ │
│  │         │ 1:N                                                       │ │
│  │         ▼                                                           │ │
│  │  ┌──────────────┐                                                   │ │
│  │  │ post_tags    │                                                   │ │
│  │  └──────────────┘                                                   │ │
│  │                                                                     │ │
│  └────────────────────────────────────────────────────────────────────┘ │
│                                                                          │
│  ┌────────────────────────────────────────────────────────────────────┐ │
│  │                      ANALYTICS DOMAIN (Future)                      │ │
│  │                                                                     │ │
│  │  ┌──────────────┐         ┌──────────────┐                         │ │
│  │  │ page_views   │         │ cta_clicks   │                         │ │
│  │  │ (optional)   │         │ (optional)   │                         │ │
│  │  └──────────────┘         └──────────────┘                         │ │
│  │                                                                     │ │
│  └────────────────────────────────────────────────────────────────────┘ │
│                                                                          │
│  ┌────────────────────────────────────────────────────────────────────┐ │
│  │                      SYSTEM DOMAIN                                  │ │
│  │                                                                     │ │
│  │  ┌──────────────┐         ┌──────────────┐                         │ │
│  │  │ sync_logs    │         │ settings     │                         │ │
│  │  └──────────────┘         └──────────────┘                         │ │
│  │                                                                     │ │
│  └────────────────────────────────────────────────────────────────────┘ │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

**Домены:**
1. **Telegram Domain** — основной домен для хранения постов из канала
2. **Analytics Domain** — опциональный домен для расширенной аналитики
3. **System Domain** — служебные таблицы для синхронизации и настроек

---

## Logical Model

### Table: telegram_posts

**Purpose:** Основная таблица для хранения постов из Telegram-канала Art Frost. Каждый пост становится отдельной SEO-страницей блога.

**Columns:**

| Column | Type | Constraints | Default | Description |
|--------|------|-------------|---------|-------------|
| `id` | `BIGINT` | `PRIMARY KEY` | — | Telegram message_id (уникальный в пределах канала) |
| `channel_id` | `BIGINT` | `NOT NULL` | — | ID Telegram-канала (для возможности нескольких каналов в будущем) |
| `text` | `TEXT` | `NOT NULL` | — | Оригинальный текст поста из Telegram |
| `html` | `TEXT` | — | `NULL` | HTML-версия с обработанными entities (bold, italic, links) |
| `date` | `TIMESTAMPTZ` | `NOT NULL` | — | Дата/время публикации в Telegram (Unix timestamp → TIMESTAMPTZ) |
| `edit_date` | `TIMESTAMPTZ` | — | `NULL` | Дата последнего редактирования в Telegram |
| `views` | `INTEGER` | — | `0` | Количество просмотров в Telegram (если доступно) |
| `forwards` | `INTEGER` | — | `0` | Количество репостов |
| `media` | `JSONB` | — | `NULL` | Медиа-вложения: `{type, url, thumbnail_url, width, height}` |
| `entities` | `JSONB` | — | `NULL` | Telegram MessageEntity[] для сохранения форматирования |
| `slug` | `TEXT` | `UNIQUE NOT NULL` | — | URL-friendly идентификатор для SEO (auto-generated) |
| `seo_title` | `TEXT` | — | `NULL` | SEO-заголовок (авто-генерация или ручной override) |
| `seo_description` | `TEXT` | — | `NULL` | SEO-описание для meta description |
| `og_image_url` | `TEXT` | — | `NULL` | URL OG-изображения (генерируется или из media) |
| `reading_time` | `INTEGER` | — | `NULL` | Время чтения в минутах (вычисляется) |
| `is_published` | `BOOLEAN` | `NOT NULL` | `true` | Флаг публикации на сайте |
| `is_pinned` | `BOOLEAN` | `NOT NULL` | `false` | Закреплённый пост (показывать первым) |
| `created_at` | `TIMESTAMPTZ` | `NOT NULL` | `now()` | Дата создания записи в БД |
| `updated_at` | `TIMESTAMPTZ` | `NOT NULL` | `now()` | Дата последнего обновления записи |

**Primary Key:** `id`

**Unique Constraints:**
- `slug` — каждый пост имеет уникальный URL

**Indexes:**

| Index Name | Columns | Type | Purpose |
|------------|---------|------|---------|
| `idx_posts_slug` | `slug` | `BTREE` | Быстрый поиск по URL (основной use case) |
| `idx_posts_date` | `date DESC` | `BTREE` | Сортировка по дате (лента блога) |
| `idx_posts_published` | `is_published` | `BTREE (partial)` | Фильтрация только опубликованных (`WHERE is_published = true`) |
| `idx_posts_channel` | `channel_id` | `BTREE` | Фильтрация по каналу (для multi-channel в будущем) |

**Business Rules:**
- `slug` генерируется автоматически из первых 50 символов текста (транслитерация)
- `seo_title` если NULL → берётся первая строка текста (max 60 символов)
- `seo_description` если NULL → берётся первые 160 символов текста
- `reading_time` = ceil(word_count / 200)

---

### Table: post_tags

**Purpose:** Теги для категоризации постов. Связь Many-to-Many через junction table.

**Columns:**

| Column | Type | Constraints | Default | Description |
|--------|------|-------------|---------|-------------|
| `id` | `UUID` | `PRIMARY KEY` | `gen_random_uuid()` | Уникальный идентификатор связи |
| `post_id` | `BIGINT` | `NOT NULL REFERENCES telegram_posts(id)` | — | FK на пост |
| `tag` | `TEXT` | `NOT NULL` | — | Название тега (lowercase) |
| `created_at` | `TIMESTAMPTZ` | `NOT NULL` | `now()` | Дата создания |

**Primary Key:** `id`

**Foreign Keys:**
- `fk_post_tags_post` → `telegram_posts.id` (`ON DELETE CASCADE`)

**Unique Constraints:**
- `(post_id, tag)` — один тег на пост только один раз

**Indexes:**

| Index Name | Columns | Type | Purpose |
|------------|---------|------|---------|
| `idx_post_tags_post` | `post_id` | `BTREE` | Поиск тегов по посту |
| `idx_post_tags_tag` | `tag` | `BTREE` | Поиск постов по тегу |
| `idx_post_tags_unique` | `(post_id, tag)` | `UNIQUE` | Уникальность связи |

**Business Rules:**
- Теги приводятся к lowercase при вставке
- Теги извлекаются автоматически из хэштегов в тексте (#vibe → "vibe")

---

### Table: post_media

**Purpose:** Отдельное хранение медиа-файлов для постов с несколькими изображениями/видео (media group).

**Columns:**

| Column | Type | Constraints | Default | Description |
|--------|------|-------------|---------|-------------|
| `id` | `UUID` | `PRIMARY KEY` | `gen_random_uuid()` | Уникальный идентификатор медиа |
| `post_id` | `BIGINT` | `NOT NULL REFERENCES telegram_posts(id)` | — | FK на пост |
| `type` | `TEXT` | `NOT NULL CHECK (type IN ('photo', 'video', 'document', 'audio'))` | — | Тип медиа |
| `file_id` | `TEXT` | `NOT NULL` | — | Telegram file_id для скачивания |
| `url` | `TEXT` | — | `NULL` | URL после загрузки в Supabase Storage |
| `thumbnail_url` | `TEXT` | — | `NULL` | URL миниатюры |
| `width` | `INTEGER` | — | `NULL` | Ширина (для фото/видео) |
| `height` | `INTEGER` | — | `NULL` | Высота (для фото/видео) |
| `duration` | `INTEGER` | — | `NULL` | Длительность в секундах (для видео/аудио) |
| `file_size` | `INTEGER` | — | `NULL` | Размер файла в байтах |
| `order` | `INTEGER` | `NOT NULL` | `0` | Порядок в media group |
| `created_at` | `TIMESTAMPTZ` | `NOT NULL` | `now()` | Дата создания |

**Primary Key:** `id`

**Foreign Keys:**
- `fk_post_media_post` → `telegram_posts.id` (`ON DELETE CASCADE`)

**Indexes:**

| Index Name | Columns | Type | Purpose |
|------------|---------|------|---------|
| `idx_post_media_post` | `post_id` | `BTREE` | Поиск медиа по посту |
| `idx_post_media_order` | `(post_id, order)` | `BTREE` | Сортировка медиа в группе |

**Business Rules:**
- При удалении поста все связанные медиа удаляются (`CASCADE`)
- `url` заполняется после загрузки файла в Supabase Storage
- `order` начинается с 0

---

### Table: sync_logs

**Purpose:** Логирование операций синхронизации с Telegram для отладки и мониторинга.

**Columns:**

| Column | Type | Constraints | Default | Description |
|--------|------|-------------|---------|-------------|
| `id` | `UUID` | `PRIMARY KEY` | `gen_random_uuid()` | Уникальный идентификатор |
| `sync_type` | `TEXT` | `NOT NULL CHECK (sync_type IN ('webhook', 'scheduled', 'manual'))` | — | Тип синхронизации |
| `status` | `TEXT` | `NOT NULL CHECK (status IN ('success', 'error', 'partial'))` | — | Статус операции |
| `posts_created` | `INTEGER` | `NOT NULL` | `0` | Количество созданных постов |
| `posts_updated` | `INTEGER` | `NOT NULL` | `0` | Количество обновлённых постов |
| `error_message` | `TEXT` | — | `NULL` | Сообщение об ошибке (если есть) |
| `error_details` | `JSONB` | — | `NULL` | Детали ошибки (stack trace, request body) |
| `duration_ms` | `INTEGER` | — | `NULL` | Длительность операции в миллисекундах |
| `created_at` | `TIMESTAMPTZ` | `NOT NULL` | `now()` | Дата операции |

**Primary Key:** `id`

**Indexes:**

| Index Name | Columns | Type | Purpose |
|------------|---------|------|---------|
| `idx_sync_logs_date` | `created_at DESC` | `BTREE` | Просмотр последних синхронизаций |
| `idx_sync_logs_status` | `status` | `BTREE` | Фильтрация по статусу |

**Business Rules:**
- Логи старше 30 дней могут быть удалены (scheduled cleanup)
- Используется для алертинга при статусе `error`

---

### Table: settings

**Purpose:** Хранение глобальных настроек системы (key-value store).

**Columns:**

| Column | Type | Constraints | Default | Description |
|--------|------|-------------|---------|-------------|
| `key` | `TEXT` | `PRIMARY KEY` | — | Ключ настройки |
| `value` | `JSONB` | `NOT NULL` | — | Значение (JSON для гибкости) |
| `description` | `TEXT` | — | `NULL` | Описание настройки |
| `updated_at` | `TIMESTAMPTZ` | `NOT NULL` | `now()` | Дата последнего изменения |

**Primary Key:** `key`

**Предопределённые настройки:**

| Key | Value Example | Description |
|-----|---------------|-------------|
| `telegram_last_update_id` | `{"value": 123456789}` | ID последнего обработанного update |
| `telegram_channel_id` | `{"value": -1001234567890}` | ID основного Telegram-канала |
| `sync_enabled` | `{"value": true}` | Флаг включения синхронизации |
| `auto_publish` | `{"value": true}` | Автоматическая публикация новых постов |

---

## Relationships

```
┌─────────────────────────────────────────────────────────────────────────┐
│                      ENTITY RELATIONSHIPS                                │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  telegram_posts                                                          │
│       │                                                                  │
│       │ 1:N (CASCADE)                                                    │
│       ├─────────────────────────> post_tags                              │
│       │                           (junction table)                       │
│       │                                                                  │
│       │ 1:N (CASCADE)                                                    │
│       └─────────────────────────> post_media                             │
│                                   (media attachments)                    │
│                                                                          │
│                                                                          │
│  sync_logs ──── standalone (no FK)                                       │
│                                                                          │
│  settings ──── standalone (no FK)                                        │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

**Relationship Details:**

| From | To | Type | On Delete | Description |
|------|-----|------|-----------|-------------|
| `telegram_posts` | `post_tags` | 1:N | CASCADE | Пост может иметь множество тегов |
| `telegram_posts` | `post_media` | 1:N | CASCADE | Пост может иметь множество медиа-вложений |

---

## Indexing Strategy

### Primary Indexes (Auto-created)

- `telegram_posts_pkey` on `telegram_posts(id)`
- `post_tags_pkey` on `post_tags(id)`
- `post_media_pkey` on `post_media(id)`
- `sync_logs_pkey` on `sync_logs(id)`
- `settings_pkey` on `settings(key)`

### Query-Optimized Indexes

| Query Pattern | Index | Justification |
|---------------|-------|---------------|
| Get post by slug | `idx_posts_slug` | Основной паттерн: `/blog/{slug}` → пост |
| List posts by date | `idx_posts_date` | Лента блога с пагинацией |
| Filter published only | `idx_posts_published` (partial) | 99% запросов к опубликованным |
| Get post tags | `idx_post_tags_post` | JOIN при загрузке поста |
| Filter by tag | `idx_post_tags_tag` | Страница `/blog?tag=vibe` |
| Get post media | `idx_post_media_post` | JOIN при загрузке поста |

### Composite Indexes

| Index | Columns | Use Case |
|-------|---------|----------|
| `idx_posts_published_date` | `(is_published, date DESC)` | Оптимизация для `WHERE is_published = true ORDER BY date DESC` |

---

## Supabase-Specific Notes

### UUID vs BIGINT

- `telegram_posts.id` → **BIGINT** (используем Telegram message_id напрямую)
- `post_tags.id` → **UUID** с `gen_random_uuid()` (нет внешнего ID)
- `post_media.id` → **UUID** с `gen_random_uuid()`
- `sync_logs.id` → **UUID** с `gen_random_uuid()`

### Default Values

```sql
-- Supabase использует gen_random_uuid() для UUID
-- Supabase использует now() для timestamps
DEFAULT gen_random_uuid()
DEFAULT now()
```

### Row Level Security (RLS)

RLS будет настроен для безопасного доступа:

| Table | Policy | Rule |
|-------|--------|------|
| `telegram_posts` | `Public read` | `SELECT WHERE is_published = true` |
| `telegram_posts` | `Service role full` | `ALL USING (auth.role() = 'service_role')` |
| `post_tags` | `Public read` | `SELECT` (через JOIN с published posts) |
| `post_media` | `Public read` | `SELECT` (через JOIN с published posts) |
| `sync_logs` | `Service role only` | `ALL USING (auth.role() = 'service_role')` |
| `settings` | `Service role only` | `ALL USING (auth.role() = 'service_role')` |

### Auth Integration

- `user_id` не используется (публичный контент, один автор)
- Для админ-операций используется `service_role` ключ
- Публичный доступ через `anon` ключ (только чтение published)

### Supabase Storage

Медиа-файлы будут храниться в Supabase Storage:

| Bucket | Access | Purpose |
|--------|--------|---------|
| `post-media` | Public | Изображения и видео из постов |
| `og-images` | Public | Сгенерированные OG-изображения |

---

## JSONB Schemas

### media (в telegram_posts)

```json
{
  "type": "photo",
  "url": "https://supabase.co/storage/v1/object/public/post-media/123.jpg",
  "thumbnail_url": "https://...",
  "width": 1280,
  "height": 720
}
```

**Возможные типы:** `photo`, `video`, `document`, `audio`

### entities (в telegram_posts)

```json
[
  {
    "type": "bold",
    "offset": 0,
    "length": 6
  },
  {
    "type": "text_link",
    "offset": 20,
    "length": 10,
    "url": "https://example.com"
  },
  {
    "type": "hashtag",
    "offset": 50,
    "length": 5
  }
]
```

**Поддерживаемые типы:** `bold`, `italic`, `code`, `pre`, `text_link`, `hashtag`, `mention`, `url`

### error_details (в sync_logs)

```json
{
  "error_code": "ECONNRESET",
  "request_body": { "update_id": 123 },
  "stack_trace": "Error: ...",
  "telegram_error_code": 429
}
```

---

## Migration Notes

### Migration 001: Initial Schema

```sql
-- 001_initial_schema.sql
-- Создание всех таблиц и индексов
-- Выполняется через Supabase Tool (mcp_supabase_apply_migration)
```

### Migration 002: RLS Policies

```sql
-- 002_rls_policies.sql
-- Включение RLS и создание политик
-- Выполняется после создания таблиц
```

### Migration 003: Seed Settings

```sql
-- 003_seed_settings.sql
-- Начальные значения для settings
-- telegram_last_update_id, sync_enabled, auto_publish
```

### Rollback Strategy

- Каждая миграция имеет обратную миграцию (down)
- Используется `supabase db reset` для полного сброса в dev
- Production: точечный rollback через Supabase Dashboard

---

## Validation Rules

### Checklist

- [x] Все таблицы имеют PRIMARY KEY
- [x] Все FK ссылаются на существующие таблицы
- [x] UUID vs BIGINT выбран осознанно
- [x] Индексы созданы для всех FK
- [x] Constraints соответствуют PRD
- [x] Нет циклических зависимостей
- [x] RLS политики документированы
- [x] Defaults используют Supabase-совместимый синтаксис

### Data Types Compatibility

| PRD Data Model | Supabase Type | Notes |
|----------------|---------------|-------|
| `id: number (message_id)` | `BIGINT` | Telegram использует int64 |
| `text: string` | `TEXT` | Без ограничения длины |
| `html: string` | `TEXT` | Parsed entities |
| `date: timestamp` | `TIMESTAMPTZ` | С timezone |
| `media: object` | `JSONB` | Flexible structure |
| `entities: array` | `JSONB` | Telegram entities |
| `slug: string` | `TEXT UNIQUE` | URL-friendly |
| `is_published: boolean` | `BOOLEAN` | Default true |

---

## Reconciliation Notes

### PRD Alignment

| PRD Requirement | Schema Implementation | Status |
|-----------------|----------------------|--------|
| TelegramPost entity | `telegram_posts` table | ✅ |
| Media attachments | `post_media` table + `media` JSONB | ✅ |
| SEO fields (title, description) | `seo_title`, `seo_description` columns | ✅ |
| Slug for URL | `slug` column with UNIQUE | ✅ |
| Published flag | `is_published` column | ✅ |
| Timestamps | `created_at`, `updated_at` | ✅ |

### TechStack Alignment

| TechStack Requirement | Schema Implementation | Status |
|----------------------|----------------------|--------|
| Supabase PostgreSQL | All tables designed for Postgres | ✅ |
| @supabase/supabase-js ^2.79.0 | Compatible types and queries | ✅ |
| Node.js >=20 | N/A (runtime requirement) | ✅ |
| RLS for security | Policies documented | ✅ |

### Differences from TechStack Example

TechStack содержал упрощённый пример схемы. Расширено:
- Добавлена таблица `post_media` для media groups
- Добавлена таблица `post_tags` для категоризации
- Добавлена таблица `sync_logs` для мониторинга
- Добавлена таблица `settings` для конфигурации
- Добавлены дополнительные поля: `og_image_url`, `reading_time`, `is_pinned`, `edit_date`, `forwards`

---

## Versioning

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-01-23 | Initial schema design |

---

## SQL Reference (for Supabase Tool)

Все миграции будут выполняться через `mcp_supabase_apply_migration`. Ниже полный SQL для справки:

```sql
-- =====================================================
-- MIGRATION 001: Create Tables
-- =====================================================

-- Table: telegram_posts
CREATE TABLE telegram_posts (
  id BIGINT PRIMARY KEY,
  channel_id BIGINT NOT NULL,
  text TEXT NOT NULL,
  html TEXT,
  date TIMESTAMPTZ NOT NULL,
  edit_date TIMESTAMPTZ,
  views INTEGER DEFAULT 0,
  forwards INTEGER DEFAULT 0,
  media JSONB,
  entities JSONB,
  slug TEXT UNIQUE NOT NULL,
  seo_title TEXT,
  seo_description TEXT,
  og_image_url TEXT,
  reading_time INTEGER,
  is_published BOOLEAN NOT NULL DEFAULT true,
  is_pinned BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Table: post_tags
CREATE TABLE post_tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id BIGINT NOT NULL REFERENCES telegram_posts(id) ON DELETE CASCADE,
  tag TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(post_id, tag)
);

-- Table: post_media
CREATE TABLE post_media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id BIGINT NOT NULL REFERENCES telegram_posts(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('photo', 'video', 'document', 'audio')),
  file_id TEXT NOT NULL,
  url TEXT,
  thumbnail_url TEXT,
  width INTEGER,
  height INTEGER,
  duration INTEGER,
  file_size INTEGER,
  "order" INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Table: sync_logs
CREATE TABLE sync_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sync_type TEXT NOT NULL CHECK (sync_type IN ('webhook', 'scheduled', 'manual')),
  status TEXT NOT NULL CHECK (status IN ('success', 'error', 'partial')),
  posts_created INTEGER NOT NULL DEFAULT 0,
  posts_updated INTEGER NOT NULL DEFAULT 0,
  error_message TEXT,
  error_details JSONB,
  duration_ms INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Table: settings
CREATE TABLE settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  description TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- =====================================================
-- MIGRATION 002: Create Indexes
-- =====================================================

-- telegram_posts indexes
CREATE INDEX idx_posts_slug ON telegram_posts(slug);
CREATE INDEX idx_posts_date ON telegram_posts(date DESC);
CREATE INDEX idx_posts_published ON telegram_posts(is_published) WHERE is_published = true;
CREATE INDEX idx_posts_channel ON telegram_posts(channel_id);
CREATE INDEX idx_posts_published_date ON telegram_posts(is_published, date DESC);

-- post_tags indexes
CREATE INDEX idx_post_tags_post ON post_tags(post_id);
CREATE INDEX idx_post_tags_tag ON post_tags(tag);

-- post_media indexes
CREATE INDEX idx_post_media_post ON post_media(post_id);
CREATE INDEX idx_post_media_order ON post_media(post_id, "order");

-- sync_logs indexes
CREATE INDEX idx_sync_logs_date ON sync_logs(created_at DESC);
CREATE INDEX idx_sync_logs_status ON sync_logs(status);

-- =====================================================
-- MIGRATION 003: Enable RLS
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE telegram_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE sync_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- telegram_posts policies
CREATE POLICY "Public read published posts" ON telegram_posts
  FOR SELECT USING (is_published = true);

CREATE POLICY "Service role full access posts" ON telegram_posts
  FOR ALL USING (auth.role() = 'service_role');

-- post_tags policies
CREATE POLICY "Public read tags" ON post_tags
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM telegram_posts 
      WHERE telegram_posts.id = post_tags.post_id 
      AND telegram_posts.is_published = true
    )
  );

CREATE POLICY "Service role full access tags" ON post_tags
  FOR ALL USING (auth.role() = 'service_role');

-- post_media policies
CREATE POLICY "Public read media" ON post_media
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM telegram_posts 
      WHERE telegram_posts.id = post_media.post_id 
      AND telegram_posts.is_published = true
    )
  );

CREATE POLICY "Service role full access media" ON post_media
  FOR ALL USING (auth.role() = 'service_role');

-- sync_logs policies (service role only)
CREATE POLICY "Service role only sync_logs" ON sync_logs
  FOR ALL USING (auth.role() = 'service_role');

-- settings policies (service role only)
CREATE POLICY "Service role only settings" ON settings
  FOR ALL USING (auth.role() = 'service_role');

-- =====================================================
-- MIGRATION 004: Seed Initial Settings
-- =====================================================

INSERT INTO settings (key, value, description) VALUES
  ('telegram_last_update_id', '{"value": 0}', 'ID последнего обработанного Telegram update'),
  ('telegram_channel_id', '{"value": null}', 'ID основного Telegram-канала'),
  ('sync_enabled', '{"value": true}', 'Флаг включения синхронизации'),
  ('auto_publish', '{"value": true}', 'Автоматическая публикация новых постов');

-- =====================================================
-- MIGRATION 005: Create updated_at Trigger
-- =====================================================

-- Function to auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger for telegram_posts
CREATE TRIGGER update_telegram_posts_updated_at
  BEFORE UPDATE ON telegram_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Trigger for settings
CREATE TRIGGER update_settings_updated_at
  BEFORE UPDATE ON settings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

---

**Документ готов для использования с Supabase Tool.**
