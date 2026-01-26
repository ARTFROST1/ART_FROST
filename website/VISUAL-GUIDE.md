# 📊 Visual Guide — Где что находится

## 🗂️ Структура папок Assets

```
website/
└── public/
    ├── assets/
    │   ├── 3d/                                    ← 3D-изображения
    │   │   ├── README.md                          ← Инструкция
    │   │   ├── hero-star.webp                     ← ДОБАВЬ: Hero section
    │   │   └── avatar-sphere.webp                 ← ДОБАВЬ: About page
    │   │
    │   └── images/
    │       ├── og/                                ← OG Images (соцсети)
    │       │   ├── README.md                      ← Инструкция
    │       │   ├── default.png                    ← ДОБАВЬ: Главная (1200×630)
    │       │   ├── about.png                      ← ДОБАВЬ: О себе (1200×630)
    │       │   ├── projects.png                   ← ДОБАВЬ: Проекты (1200×630)
    │       │   └── links.png                      ← ДОБАВЬ: Links (1200×630)
    │       │
    │       └── projects/                          ← Скриншоты проектов
    │           ├── ai-telegram-bot-preview.webp   ✅ Уже есть
    │           └── ...
    │
    ├── fonts/                                     ← Self-hosted шрифты
    │   ├── README.md                              ← Инструкция
    │   ├── inter-var-latin.woff2                  ← ДОБАВЬ (опционально)
    │   ├── roboto-regular.woff2                   ← ДОБАВЬ (опционально)
    │   └── jetbrains-mono-regular.woff2           ← ДОБАВЬ (опционально)
    │
    ├── favicon.svg                                ← ДОБАВЬ: Векторная иконка
    ├── favicon.ico                                ← ДОБАВЬ: Fallback для IE
    └── apple-touch-icon.png                       ← ДОБАВЬ: iOS иконка (180×180)
```

---

## 🎨 Где используются assets

### 1. OG Images (Open Graph для соцсетей)

```
┌─────────────────────────────────────┐
│  Telegram / WhatsApp / Facebook     │
│  ┌───────────────────────────────┐  │
│  │                               │  │
│  │   [OG Image Preview]          │  │  ← Это то, что видят при
│  │   Art Frost                   │  │    вставке ссылки
│  │   IT-специалист & Vibe Coder  │  │
│  │                               │  │
│  └───────────────────────────────┘  │
│  artfrost.vercel.app                │
└─────────────────────────────────────┘
```

**Файлы:**
- `og/default.png` → Главная (`/`)
- `og/about.png` → О себе (`/about`)
- `og/projects.png` → Проекты (`/projects`)
- `og/links.png` → Links (`/links`)

**Как работает:**
1. Ты добавляешь PNG в `public/assets/images/og/`
2. SEOHead автоматически подхватывает
3. При вставке ссылки в Telegram/WhatsApp — показывается красивое превью

---

### 2. Favicon (иконка в табе браузера)

```
Browser Tab:
┌─────────────────────────────────┐
│ [🎯] Art Frost — IT-специалист  │  ← Твоя иконка
└─────────────────────────────────┘
```

**Файлы:**
- `favicon.svg` → Основная векторная иконка
- `favicon.ico` → Fallback для старых браузеров
- `apple-touch-icon.png` → iOS home screen

**Как работает:**
1. Добавляешь файлы в `public/`
2. BaseLayout автоматически подхватывает
3. Иконка появляется в табе и закладках

---

### 3. 3D Assets (визуальные якоры)

#### Hero Section (главная страница)

```
┌──────────────────────────────────────────┐
│  Главная страница (/)                    │
│                                          │
│  Art Frost                [3D Star] ◄─── hero-star.webp
│  Developer                               │
│  [CTA Buttons]                           │
│                                          │
└──────────────────────────────────────────┘
```

**Файл:** `assets/3d/hero-star.webp`  
**Компонент:** `src/components/home/Hero.astro`  
**Использование:** `<Asset3D name="hero-star" alt="" priority />`

---

#### About Page (страница обо мне)

```
┌──────────────────────────────────────────┐
│  О себе (/about)                         │
│                                          │
│  ┌─────────┐  ┌─────────────────┐       │
│  │ [Photo] │  │ Обо мне         │       │
│  └─────────┘  │ Bio text...     │       │
│               └─────────────────┘       │
│                                          │
│  [3D Avatar Sphere] ◄─── avatar-sphere.webp
│                                          │
└──────────────────────────────────────────┘
```

**Файл:** `assets/3d/avatar-sphere.webp`  
**Компонент:** Будет добавлен в `src/components/about/AboutHero.astro`  
**Использование:** `<Asset3D name="avatar-sphere" alt="Avatar" animation="float-slow" />`

---

### 4. Self-hosted Fonts

```
┌──────────────────────────────────────────┐
│  Весь сайт                               │
│                                          │
│  Заголовки → Inter (Display)             │
│  Текст     → Roboto (Body)               │
│  Код       → JetBrains Mono (Monospace)  │
│                                          │
└──────────────────────────────────────────┘
```

**Файлы:**
- `fonts/inter-var-latin.woff2` → Заголовки, навигация
- `fonts/roboto-regular.woff2` → Основной текст
- `fonts/jetbrains-mono-regular.woff2` → Код, технические блоки

**Как работает:**
1. Добавляешь WOFF2 в `public/fonts/`
2. `src/styles/fonts.css` автоматически подхватывает
3. Шрифты загружаются быстрее (self-hosted)

---

## 🔄 Автоматические процессы

### OG Images
```
Добавил PNG → SEOHead подхватывает → Telegram показывает превью
    ↓               ↓                        ↓
public/assets/  Компонент       Автоматически работает
images/og/      генерирует      в соцсетях
                og:image теги
```

### 3D Assets
```
Добавил WebP → Используешь <Asset3D /> → Автоматически glow + анимация
    ↓                  ↓                         ↓
public/assets/    Компонент          Красивый эффект
3d/               применяет          без дополнительного кода
                  эффекты
```

### Favicon
```
Добавил в public/ → BaseLayout подхватывает → Иконка в табе
    ↓                      ↓                        ↓
favicon.svg        Автоматические          Браузер показывает
favicon.ico        <link> теги             иконку
apple-touch-icon
```

### Fonts
```
Добавил в fonts/ → fonts.css подхватывает → Быстрая загрузка
    ↓                     ↓                        ↓
WOFF2 файлы       @font-face           Self-hosted,
                  правила              нет внешних запросов
```

---

## 📋 Приоритеты

### 🔴 Критично (без этого не запускать)
1. **OG Images (4 файла)** — иначе в соцсетях будет некрасиво
2. **Favicon (3 файла)** — иначе в табе будет пустота

### 🟡 Важно (желательно)
3. **3D hero-star** — Hero section выглядит эффектнее
4. **3D avatar-sphere** — About page выглядит профессиональнее

### 🟢 Nice-to-have
5. **Self-hosted Fonts** — быстрее загрузка, но работает и так
6. **Project Screenshots** — есть fallback градиенты

---

## ✅ Быстрая проверка

### После добавления OG Images:
1. Запусти `npm run dev`
2. Открой [opengraph.xyz](https://www.opengraph.xyz/)
3. Вставь `http://localhost:4321`
4. Должен показаться твой OG image

### После добавления Favicon:
1. Запусти `npm run dev`
2. Открой `http://localhost:4321`
3. Посмотри на таб браузера — должна быть иконка

### После добавления 3D Assets:
1. Запусти `npm run dev`
2. Открой `http://localhost:4321` — проверь Hero section
3. Открой `http://localhost:4321/about` — проверь About page

---

## 📖 Связанные документы

- **[START-HERE.md](./START-HERE.md)** — с чего начать
- **[CHECKLIST.md](./CHECKLIST.md)** — простой чеклист
- **[OG-IMAGE-TEMPLATE.md](./OG-IMAGE-TEMPLATE.md)** — шаблон для OG
- **[ASSETS-INSTRUCTION.md](./ASSETS-INSTRUCTION.md)** — полная инструкция

---

**Теперь ты знаешь, где что находится и как это работает!** 🎉
