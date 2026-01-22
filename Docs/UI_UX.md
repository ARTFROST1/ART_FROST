# UI/UX Specification: Art Frost Portfolio

**VERSION:** 1.0  
**DATE:** 2026-01-23  
**STATUS:** Approved  
**DEPENDS ON:** PRD-ArtFrost-Portfolio.md, TechStack.md, DatabaseSchema.md  
**BRAND IDENTITY:** Dark Glassmorphism / Frost Aesthetic

---

## Executive Summary

Данный документ определяет UI/UX спецификацию для персонального сайта-портфолио Art Frost. Дизайн основан на принципах **Dark Glassmorphism** с акцентами на 3D-элементы и неоновое свечение, создавая футуристическую, но профессиональную атмосферу.

**Ключевые принципы:**
- **Dark by Default** — тёмная тема как основная с возможностью переключения на светлую
- **Glassmorphism** — эффекты матового стекла для создания глубины
- **3D Visual Anchors** — 3D-ассеты для ключевых визуальных точек
- **Performance First** — все эффекты оптимизированы под Core Web Vitals

---

## Design System

### 1. Color System

#### 1.1 Dark Theme (Default)

| Token | Value | CSS Variable | Usage |
|-------|-------|--------------|-------|
| **Background Primary** | `#050605` | `--color-bg-primary` | Основной фон страницы |
| **Background Secondary** | `#0A0C0A` | `--color-bg-secondary` | Карточки, секции |
| **Glass Background** | `rgba(255, 255, 255, 0.03)` | `--color-bg-glass` | Glassmorphism элементы |
| **Primary** | `#10B981` | `--color-primary` | CTA кнопки, акценты |
| **Primary Glow** | `#10B98180` | `--color-primary-glow` | Неоновое свечение |
| **Gradient Start** | `#10B981` | `--color-gradient-start` | Градиенты |
| **Gradient End** | `#059669` | `--color-gradient-end` | Градиенты |
| **Text Heading** | `#FFFFFF` | `--color-text-heading` | Заголовки |
| **Text Body** | `#A1A1AA` | `--color-text-body` | Основной текст |
| **Text Muted** | `#52525B` | `--color-text-muted` | Вспомогательный текст |
| **Border Glass** | `rgba(255, 255, 255, 0.08)` | `--color-border-glass` | Границы стеклянных элементов |
| **Border Active** | `#10B981` | `--color-border-active` | Активные границы |

#### 1.2 Light Theme

| Token | Value | CSS Variable | Usage |
|-------|-------|--------------|-------|
| **Background Primary** | `#F7F9F8` | `--color-bg-primary` | Основной фон страницы |
| **Background Secondary** | `#EEF2F0` | `--color-bg-secondary` | Карточки, секции |
| **Glass Background** | `rgba(5, 6, 5, 0.04)` | `--color-bg-glass` | Glassmorphism элементы |
| **Primary** | `#059669` | `--color-primary` | CTA кнопки, акценты |
| **Primary Glow** | `#05966933` | `--color-primary-glow` | Мягкое свечение |
| **Text Heading** | `#0B0F0C` | `--color-text-heading` | Заголовки |
| **Text Body** | `#1F2937` | `--color-text-body` | Основной текст |
| **Text Muted** | `#6B7280` | `--color-text-muted` | Вспомогательный текст |
| **Border Glass** | `rgba(5, 6, 5, 0.10)` | `--color-border-glass` | Границы |
| **Border Active** | `#059669` | `--color-border-active` | Активные границы |

#### 1.3 Color Contrast Requirements (WCAG 2.1 AA)

| Combination | Ratio | Status |
|-------------|-------|--------|
| Heading on Background (Dark) | 21:1 | ✅ Pass |
| Body text on Background (Dark) | 7.5:1 | ✅ Pass |
| Primary on Background (Dark) | 8.2:1 | ✅ Pass |
| Heading on Background (Light) | 18:1 | ✅ Pass |
| Body text on Background (Light) | 12:1 | ✅ Pass |

---

### 2. Typography

#### 2.1 Font Families

| Role | Font | Fallback | CSS Variable |
|------|------|----------|--------------|
| **Display/Headings** | Inter | system-ui, sans-serif | `--font-display` |
| **Body** | Roboto | system-ui, sans-serif | `--font-body` |
| **Monospace** | JetBrains Mono | ui-monospace, monospace | `--font-mono` |

#### 2.2 Type Scale

| Level | Size (Desktop) | Size (Mobile) | Weight | Line Height | Letter Spacing |
|-------|----------------|---------------|--------|-------------|----------------|
| **H1 (Hero)** | 64px / 4rem | 40px / 2.5rem | 700 | 1.1 | -0.02em |
| **H2 (Section)** | 48px / 3rem | 32px / 2rem | 600 | 1.2 | -0.01em |
| **H3 (Card Title)** | 24px / 1.5rem | 20px / 1.25rem | 600 | 1.3 | 0 |
| **H4 (Subsection)** | 20px / 1.25rem | 18px / 1.125rem | 600 | 1.4 | 0 |
| **Body Large** | 18px / 1.125rem | 16px / 1rem | 400 | 1.6 | 0 |
| **Body** | 16px / 1rem | 16px / 1rem | 400 | 1.7 | 0 |
| **Body Small** | 14px / 0.875rem | 14px / 0.875rem | 400 | 1.5 | 0 |
| **Caption** | 12px / 0.75rem | 12px / 0.75rem | 400 | 1.4 | 0.02em |

#### 2.3 Typography Tailwind Classes

```css
/* Headings */
.heading-hero { @apply text-4xl md:text-6xl font-bold tracking-tight leading-tight; }
.heading-section { @apply text-2xl md:text-4xl font-semibold tracking-tight; }
.heading-card { @apply text-xl md:text-2xl font-semibold; }

/* Body */
.body-large { @apply text-base md:text-lg leading-relaxed; }
.body { @apply text-base leading-relaxed; }
.body-small { @apply text-sm leading-normal; }
.caption { @apply text-xs tracking-wide; }
```

---

### 3. Spacing System

#### 3.1 Base Unit: 4px

| Token | Value | Tailwind | Usage |
|-------|-------|----------|-------|
| `space-1` | 4px | `p-1`, `m-1` | Минимальный отступ |
| `space-2` | 8px | `p-2`, `m-2` | Внутренние отступы иконок |
| `space-3` | 12px | `p-3`, `m-3` | Внутренние отступы малых элементов |
| `space-4` | 16px | `p-4`, `m-4` | Стандартный padding |
| `space-6` | 24px | `p-6`, `m-6` | Padding карточек |
| `space-8` | 32px | `p-8`, `m-8` | Секционные отступы (mobile) |
| `space-12` | 48px | `p-12`, `m-12` | Секционные отступы (tablet) |
| `space-16` | 64px | `p-16`, `m-16` | Секционные отступы (desktop) |
| `space-24` | 96px | `p-24`, `m-24` | Hero spacing |
| `space-32` | 128px | `p-32`, `m-32` | Large section gaps |

#### 3.2 Component Spacing

| Component | Padding | Gap |
|-----------|---------|-----|
| **Button (SM)** | `py-2 px-4` (8px 16px) | — |
| **Button (MD)** | `py-3 px-6` (12px 24px) | — |
| **Button (LG)** | `py-4 px-8` (16px 32px) | — |
| **Card** | `p-6` (24px) | — |
| **Card Grid** | — | `gap-6` (24px) |
| **Section** | `py-16 md:py-24` | `gap-8 md:gap-12` |
| **Navigation** | `py-4 px-6` | `gap-6 md:gap-8` |

---

### 4. Effects & Glassmorphism

#### 4.1 Glass Effect

```css
/* Glass Card */
.glass {
  background: var(--color-bg-glass);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--color-border-glass);
  border-radius: 16px;
}

/* Glass Gradient Overlay */
.glass-gradient {
  background: linear-gradient(
    180deg, 
    rgba(255, 255, 255, 0.05) 0%, 
    rgba(255, 255, 255, 0.01) 100%
  );
}
```

#### 4.2 Glow Effect

```css
/* Primary Glow */
.glow-primary {
  box-shadow: 0 0 40px -10px var(--color-primary-glow);
}

/* Text Glow (for headings) */
.text-glow {
  text-shadow: 0 0 30px var(--color-primary-glow);
}

/* Button Glow on Hover */
.btn-glow:hover {
  box-shadow: 
    0 0 20px -5px var(--color-primary-glow),
    0 4px 20px -8px var(--color-primary);
}
```

#### 4.3 Radial Glow Background (for 3D assets)

```css
/* Behind 3D elements */
.radial-glow {
  background: radial-gradient(
    50% 50% at 50% 50%,
    rgba(16, 185, 129, 0.2) 0%,
    transparent 70%
  );
}
```

---

### 5. Border & Radius

| Token | Value | Tailwind | Usage |
|-------|-------|----------|-------|
| `radius-sm` | 8px | `rounded-lg` | Кнопки, теги |
| `radius-md` | 12px | `rounded-xl` | Малые карточки |
| `radius-lg` | 16px | `rounded-2xl` | Карточки, модалы |
| `radius-xl` | 24px | `rounded-3xl` | Hero секции |
| `radius-full` | 9999px | `rounded-full` | Аватары, пилюли |

---

### 6. Shadows

#### 6.1 Elevation Levels

| Level | Shadow | Usage |
|-------|--------|-------|
| **Elevation 0** | `none` | Flat elements |
| **Elevation 1** | `0 1px 2px rgba(0,0,0,0.1)` | Subtle depth |
| **Elevation 2** | `0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)` | Cards |
| **Elevation 3** | `0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)` | Dropdowns |
| **Elevation 4** | `0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)` | Modals |

#### 6.2 Glow Shadows (Dark Theme)

| Type | Shadow | Usage |
|------|--------|-------|
| **Primary Glow** | `0 0 40px -10px rgba(16, 185, 129, 0.3)` | CTA buttons |
| **Subtle Glow** | `0 0 20px -5px rgba(16, 185, 129, 0.15)` | Cards on hover |
| **Intense Glow** | `0 0 60px -10px rgba(16, 185, 129, 0.4)` | Hero elements |

---

## Component Guidelines

### 1. Buttons

#### 1.1 Button Variants

| Variant | Background | Text | Border | Hover State |
|---------|------------|------|--------|-------------|
| **Primary** | Gradient (primary → primary-dark) | White | None | Glow shadow + scale(1.02) |
| **Secondary** | Transparent | Primary | 1px primary | bg-primary/10 |
| **Ghost** | Transparent | Text body | None | bg-white/5 |
| **Outline** | Transparent | White | 1px glass | bg-white/5 + border-white/20 |

#### 1.2 Button Sizes

| Size | Height | Padding | Font Size | Icon Size |
|------|--------|---------|-----------|-----------|
| **Small** | 36px | `py-2 px-4` | 14px | 16px |
| **Medium** | 44px | `py-3 px-6` | 16px | 20px |
| **Large** | 52px | `py-4 px-8` | 18px | 24px |

#### 1.3 Button States

| State | Visual Change | Duration |
|-------|---------------|----------|
| **Default** | Base styles | — |
| **Hover** | Glow + scale(1.02) | 200ms ease-out |
| **Active** | scale(0.98) + reduced glow | 100ms |
| **Focus** | 2px focus ring (primary) | instant |
| **Disabled** | opacity: 0.5, cursor: not-allowed | — |

#### 1.4 Button Implementation

```jsx
// Primary Button
<button className="
  relative inline-flex items-center justify-center
  px-6 py-3 text-base font-medium text-white
  bg-gradient-to-r from-primary to-primary-dark
  rounded-lg
  transition-all duration-200 ease-out
  hover:shadow-[0_0_30px_-5px_var(--color-primary-glow)]
  hover:scale-[1.02]
  active:scale-[0.98]
  focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-bg-primary
  disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
">
  Get Started
</button>

// Secondary Button
<button className="
  inline-flex items-center justify-center
  px-6 py-3 text-base font-medium
  text-primary border border-primary
  rounded-lg bg-transparent
  transition-all duration-200
  hover:bg-primary/10
  focus:outline-none focus:ring-2 focus:ring-primary
">
  Explore Now
</button>
```

---

### 2. Cards

#### 2.1 Card Variants

| Variant | Usage | Features |
|---------|-------|----------|
| **Glass Card** | General content | Glassmorphism background |
| **Project Card** | Project gallery | Image + info + hover effect |
| **Link Card** | Links page | Icon + title + hover glow |
| **Blog Card** | Blog posts | Featured image + meta |

#### 2.2 Glass Card Structure

```
┌─────────────────────────────────────────┐
│  Glass Card                             │
│  ┌─────────────────────────────────────┐│
│  │ [Optional Image/Media]              ││
│  └─────────────────────────────────────┘│
│                                         │
│  [Optional Badge/Tag]                   │
│                                         │
│  Title                                  │
│  Description text goes here...          │
│                                         │
│  [Optional Footer: Tags/Meta/Actions]   │
│                                         │
└─────────────────────────────────────────┘
```

#### 2.3 Card States

| State | Visual Change |
|-------|---------------|
| **Default** | Glass background, subtle border |
| **Hover** | Border brightens, subtle glow, translateY(-4px) |
| **Active/Pressed** | translateY(-2px) |
| **Focus** | 2px focus ring |

#### 2.4 Project Card Implementation

```jsx
<article className="
  group relative overflow-hidden
  bg-glass backdrop-blur-xl
  border border-border-glass
  rounded-2xl
  transition-all duration-300 ease-out
  hover:border-primary/30
  hover:shadow-[0_0_30px_-10px_var(--color-primary-glow)]
  hover:-translate-y-1
">
  {/* Image Container */}
  <div className="aspect-video overflow-hidden">
    <img 
      src={project.image} 
      alt={project.title}
      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
    />
  </div>
  
  {/* Content */}
  <div className="p-6">
    {/* Tags */}
    <div className="flex flex-wrap gap-2 mb-3">
      {project.tags.map(tag => (
        <span className="px-2 py-1 text-xs font-medium text-primary bg-primary/10 rounded-md">
          {tag}
        </span>
      ))}
    </div>
    
    {/* Title */}
    <h3 className="text-xl font-semibold text-heading mb-2 group-hover:text-primary transition-colors">
      {project.title}
    </h3>
    
    {/* Description */}
    <p className="text-body text-sm line-clamp-2">
      {project.description}
    </p>
  </div>
</article>
```

---

### 3. Navigation

#### 3.1 Header Structure (Desktop)

```
┌──────────────────────────────────────────────────────────────────────────┐
│  [Logo/Name]        [Home] [About] [Projects] [Links]    [Theme] [CTA]   │
└──────────────────────────────────────────────────────────────────────────┘
```

#### 3.2 Header Structure (Mobile)

```
┌──────────────────────────────────────────────────────────────────────────┐
│  [Logo/Name]                                           [Theme] [Menu ☰]  │
└──────────────────────────────────────────────────────────────────────────┘

// Mobile Menu (Expanded)
┌──────────────────────────────────────────────────────────────────────────┐
│                                                                    [✕]   │
│                                                                          │
│                              Home                                        │
│                              About                                       │
│                              Projects                                    │
│                              Links                                       │
│                                                                          │
│                         [Subscribe to Telegram]                          │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
```

#### 3.3 Navigation States

| State | Desktop | Mobile |
|-------|---------|--------|
| **Default** | Glassmorphism header fixed at top | Same |
| **Scrolled** | Increased blur, border visible | Same |
| **Menu Open** | — | Full-screen overlay |

#### 3.4 Navigation Implementation

```jsx
// Desktop Navigation
<header className="
  fixed top-0 left-0 right-0 z-50
  bg-bg-primary/80 backdrop-blur-xl
  border-b border-border-glass
  transition-all duration-300
">
  <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
    {/* Logo */}
    <a href="/" className="text-xl font-bold text-heading hover:text-primary transition-colors">
      Art Frost
    </a>
    
    {/* Desktop Links */}
    <div className="hidden md:flex items-center gap-8">
      <a href="/" className="text-body hover:text-heading transition-colors">Home</a>
      <a href="/about" className="text-body hover:text-heading transition-colors">About</a>
      <a href="/projects" className="text-body hover:text-heading transition-colors">Projects</a>
      <a href="/links" className="text-body hover:text-heading transition-colors">Links</a>
    </div>
    
    {/* Actions */}
    <div className="flex items-center gap-4">
      <ThemeToggle client:load />
      <a href="https://t.me/artfrost" className="hidden md:inline-flex btn-primary">
        Subscribe
      </a>
      <MobileMenuButton client:media="(max-width: 768px)" />
    </div>
  </nav>
</header>
```

---

### 4. Form Elements

#### 4.1 Input Fields

| State | Border | Background | Shadow |
|-------|--------|------------|--------|
| **Default** | `border-glass` | `bg-glass` | none |
| **Hover** | `border-white/20` | `bg-glass` | none |
| **Focus** | `border-primary` | `bg-glass` | `0 0 0 3px primary/20` |
| **Error** | `border-red-500` | `bg-glass` | `0 0 0 3px red-500/20` |
| **Disabled** | `border-glass` | `bg-white/5` | none, opacity: 0.5 |

#### 4.2 Input Implementation

```jsx
<input 
  type="text"
  className="
    w-full px-4 py-3
    bg-glass backdrop-blur-md
    border border-border-glass rounded-lg
    text-heading placeholder:text-muted
    transition-all duration-200
    hover:border-white/20
    focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/20
    disabled:opacity-50 disabled:cursor-not-allowed
  "
  placeholder="Enter text..."
/>
```

---

### 5. Tags & Badges

#### 5.1 Tag Variants

| Variant | Background | Text | Border |
|---------|------------|------|--------|
| **Default** | `bg-white/5` | `text-body` | none |
| **Primary** | `bg-primary/10` | `text-primary` | none |
| **Outline** | transparent | `text-primary` | `border-primary` |
| **Active** | `bg-primary` | `text-white` | none |

#### 5.2 Tag Sizes

| Size | Padding | Font Size |
|------|---------|-----------|
| **Small** | `px-2 py-0.5` | 10px |
| **Medium** | `px-3 py-1` | 12px |
| **Large** | `px-4 py-1.5` | 14px |

---

### 6. Icons

#### 6.1 Icon Hierarchy

| Type | Usage | Source |
|------|-------|--------|
| **Flat UI Icons** | Navigation, buttons, social links, controls | Lucide Icons |
| **Brand Icons** | Social platforms (Telegram, YouTube, GitHub) | Simple Icons |
| **3D Assets** | Hero sections, visual anchors | Custom 3D renders |

#### 6.2 Icon Sizes

| Size | Dimensions | Usage |
|------|------------|-------|
| **XS** | 16px | Inline text |
| **SM** | 20px | Button icons |
| **MD** | 24px | Navigation, cards |
| **LG** | 32px | Social links |
| **XL** | 48px | Feature icons |

---

### 7. 3D Assets & Visual Anchors

#### 7.1 3D Asset Manifest

| Location | Asset Name | Description | Style |
|----------|------------|-------------|-------|
| **Hero Section** | The Core Star | 6-8 pointed 3D star/geometric knot | Metallic green, soft edges |
| **Value Prop** | Floating Layers | Stacked glass sheets/interface panels | Frosted glass, depth |
| **About Me** | Abstract Avatar | Stylized glass bust/creative sphere | Frost particles |
| **Services - Dev** | Code Cube | Glossy cube with `{}` brackets | Glowing embossed |
| **Services - Design** | Fluid Droplet | Metallic liquid shape | Creativity, flow |
| **Contact/CTA** | Communication Orb | Glowing orb/3D mail envelope | Glass texture |

#### 7.2 3D Asset Implementation Rules

1. **Z-index:** Place on `z-10` above background
2. **Glow Background:** Add radial gradient glow behind (color: `#10B981`, opacity: `0.2`)
3. **Optimization:** Use WebP/AVIF format, sensible dimensions
4. **Accessibility:** Meaningful `alt` text if informative, empty `alt=""` if decorative

```jsx
// 3D Asset with Glow
<div className="relative">
  {/* Radial Glow Background */}
  <div className="
    absolute inset-0 -z-10
    bg-[radial-gradient(50%_50%_at_50%_50%,rgba(16,185,129,0.2)_0%,transparent_70%)]
  " />
  
  {/* 3D Asset */}
  <img 
    src="/assets/3d/hero-star.webp"
    alt=""
    className="relative z-10 w-full max-w-md mx-auto"
    loading="eager"
  />
</div>
```

---

## User Flows

### 1. Journey 1: Первое посещение из поиска → Подписка на Telegram

```
┌─────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Google    │───►│   Blog Post     │───►│   Read & Enjoy  │
│   Search    │    │   Page          │    │   Content       │
└─────────────┘    └─────────────────┘    └────────┬────────┘
                                                    │
                                                    ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Subscribe to  │◄───│   Main Page /   │◄───│   Click Logo /  │
│   Telegram      │    │   Explore       │    │   Navigation    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

**UI Points:**
- **Blog Post Page:** Clear header with logo, sticky CTA "Subscribe to Telegram"
- **Main Page:** Hero with prominent CTA, social proof
- **Subscribe Flow:** External link opens in new tab

---

### 2. Journey 2: Изучение портфолио

```
┌─────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Direct    │───►│   Hero Section  │───►│   View Featured │
│   URL       │    │   First Impact  │    │   Projects      │
└─────────────┘    └─────────────────┘    └────────┬────────┘
                                                    │
                                                    ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Contact /     │◄───│   Read About    │◄───│   Project       │
│   Subscribe     │    │   Background    │    │   Details       │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

**UI Points:**
- **Hero:** Name, tagline, CTA, 3D visual anchor
- **Projects Grid:** Bento layout, hover effects
- **Project Detail:** Full case study, technologies, links
- **About:** Avatar, bio, skills, timeline

---

### 3. Main Page (Home) Layout

```
┌──────────────────────────────────────────────────────────────────────────┐
│  ┌────────────────────────────────────────────────────────────────────┐  │
│  │                         NAVIGATION                                  │  │
│  │  [Logo]           [Home] [About] [Projects] [Links]    [🌙] [CTA]  │  │
│  └────────────────────────────────────────────────────────────────────┘  │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│                           HERO SECTION                                   │
│                                                                          │
│    ┌─────────────────────────────────┐ ┌───────────────────────────┐    │
│    │                                 │ │                           │    │
│    │  [Badge: AI Powered Dev]        │ │                           │    │
│    │                                 │ │        [3D STAR           │    │
│    │  FUTURE-DRIVEN                  │ │         ASSET]            │    │
│    │  AI SOFTWARE                    │ │                           │    │
│    │  [ DEVELOPMENT ]                │ │                           │    │
│    │                                 │ │                           │    │
│    │  Description text here...       │ │                           │    │
│    │                                 │ │                           │    │
│    │  [Get Started] [Explore Now]    │ │                           │    │
│    │                                 │ │                           │    │
│    └─────────────────────────────────┘ └───────────────────────────┘    │
│                                                                          │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│                        FEATURED PROJECTS                                 │
│                                                                          │
│    [Section Title: Latest Work]                                          │
│                                                                          │
│    ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐      │
│    │  [Image]    │ │  [Image]    │ │  [Image]    │ │  [Image]    │      │
│    │             │ │             │ │             │ │             │      │
│    │  [Tags]     │ │  [Tags]     │ │  [Tags]     │ │  [Tags]     │      │
│    │  Title      │ │  Title      │ │  Title      │ │  Title      │      │
│    │  Desc...    │ │  Desc...    │ │  Desc...    │ │  Desc...    │      │
│    └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘      │
│                                                                          │
│                          [View All Projects →]                           │
│                                                                          │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│                          SOCIAL LINKS                                    │
│                                                                          │
│          ┌────┐  ┌────┐  ┌────┐  ┌────┐                                 │
│          │ TG │  │ YT │  │ IG │  │ GH │                                 │
│          └────┘  └────┘  └────┘  └────┘                                 │
│                                                                          │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│                             FOOTER                                       │
│     © 2026 Art Frost. All rights reserved.        [Social Icons]         │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
```

---

### 4. About Page Layout

```
┌──────────────────────────────────────────────────────────────────────────┐
│                            NAVIGATION                                     │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│                          ABOUT HERO                                      │
│                                                                          │
│    ┌───────────────┐  ┌────────────────────────────────────────────┐    │
│    │               │  │                                            │    │
│    │   [Avatar     │  │  Art Frost                                 │    │
│    │    3D Asset]  │  │                                            │    │
│    │               │  │  IT-специалист • Vibe Coder • Creator      │    │
│    │               │  │                                            │    │
│    │               │  │  Bio text goes here. Multiple lines of     │    │
│    │               │  │  description about background, passion,    │    │
│    │               │  │  and expertise...                          │    │
│    │               │  │                                            │    │
│    └───────────────┘  └────────────────────────────────────────────┘    │
│                                                                          │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│                            SKILLS                                        │
│                                                                          │
│    [React] [TypeScript] [Astro] [Tailwind] [Node.js] [Python]...        │
│                                                                          │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│                          EXPERIENCE                                      │
│                                                                          │
│    ○────────────────○────────────────○────────────────○                  │
│    2020             2022             2024             Now                │
│    Started          Freelance        Company X        Creator            │
│    Journey          Projects         Senior Dev       Building           │
│                                                                          │
├──────────────────────────────────────────────────────────────────────────┤
│                            FOOTER                                        │
└──────────────────────────────────────────────────────────────────────────┘
```

---

### 5. Projects Page Layout

```
┌──────────────────────────────────────────────────────────────────────────┐
│                            NAVIGATION                                     │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│                          PAGE HEADER                                     │
│                                                                          │
│      Projects                                                            │
│      A showcase of my work in software development and design            │
│                                                                          │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│                          TAG FILTERS                                     │
│                                                                          │
│    [All] [React] [TypeScript] [Astro] [Mobile] [AI] ...                 │
│                                                                          │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│                       PROJECTS GRID (Bento)                              │
│                                                                          │
│    ┌──────────────────────────┐ ┌─────────────┐ ┌─────────────┐         │
│    │                          │ │             │ │             │         │
│    │     FEATURED PROJECT     │ │  Project 2  │ │  Project 3  │         │
│    │     (Large Card)         │ │             │ │             │         │
│    │                          │ │             │ │             │         │
│    │                          │ └─────────────┘ └─────────────┘         │
│    │                          │ ┌─────────────┐ ┌─────────────┐         │
│    │                          │ │             │ │             │         │
│    └──────────────────────────┘ │  Project 4  │ │  Project 5  │         │
│    ┌─────────────┐ ┌─────────────┐             │ │             │         │
│    │  Project 6  │ │  Project 7  │             │ │             │         │
│    │             │ │             │ └─────────────┘ └─────────────┘       │
│    └─────────────┘ └─────────────┘                                       │
│                                                                          │
├──────────────────────────────────────────────────────────────────────────┤
│                            FOOTER                                        │
└──────────────────────────────────────────────────────────────────────────┘
```

---

### 6. Links Page Layout (Mobile-First)

```
┌────────────────────────────────┐
│                                │
│         [Avatar/Logo]          │
│                                │
│          Art Frost             │
│     IT-специалист • Creator    │
│                                │
├────────────────────────────────┤
│                                │
│  ┌──────────────────────────┐  │
│  │  📱  Telegram Channel    │  │
│  └──────────────────────────┘  │
│                                │
│  ┌──────────────────────────┐  │
│  │  ▶️  YouTube             │  │
│  └──────────────────────────┘  │
│                                │
│  ┌──────────────────────────┐  │
│  │  📸  Instagram           │  │
│  └──────────────────────────┘  │
│                                │
│  ┌──────────────────────────┐  │
│  │  💻  GitHub              │  │
│  └──────────────────────────┘  │
│                                │
│  ┌──────────────────────────┐  │
│  │  ✉️  Email               │  │
│  └──────────────────────────┘  │
│                                │
├────────────────────────────────┤
│     © 2026 Art Frost           │
└────────────────────────────────┘
```

---

### 7. Blog Post Page Layout (Post-MVP)

```
┌──────────────────────────────────────────────────────────────────────────┐
│                            NAVIGATION                                     │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│    ← Back to Blog                                                        │
│                                                                          │
│    ┌────────────────────────────────────────────────────────────────┐    │
│    │                                                                │    │
│    │                      [FEATURED IMAGE]                          │    │
│    │                                                                │    │
│    └────────────────────────────────────────────────────────────────┘    │
│                                                                          │
│    [Tag] [Tag]                                                           │
│                                                                          │
│    # Post Title Here                                                     │
│                                                                          │
│    📅 January 23, 2026  •  ⏱ 5 min read  •  👁 1.2K views               │
│                                                                          │
│    ────────────────────────────────────────────────────────────────      │
│                                                                          │
│    Post content goes here. This is the main body of the blog post.       │
│    It can include:                                                       │
│                                                                          │
│    - Formatted text                                                      │
│    - Code blocks                                                         │
│    - Images                                                              │
│    - Links                                                               │
│                                                                          │
│    ────────────────────────────────────────────────────────────────      │
│                                                                          │
│    [Share on Telegram] [Copy Link]                                       │
│                                                                          │
│    ────────────────────────────────────────────────────────────────      │
│                                                                          │
│    Related Posts:                                                        │
│    ┌─────────────┐ ┌─────────────┐ ┌─────────────┐                      │
│    │  Related 1  │ │  Related 2  │ │  Related 3  │                      │
│    └─────────────┘ └─────────────┘ └─────────────┘                      │
│                                                                          │
├──────────────────────────────────────────────────────────────────────────┤
│                            FOOTER                                        │
└──────────────────────────────────────────────────────────────────────────┘
```

---

## Responsive Rules

### 1. Breakpoints

| Breakpoint | Min Width | Target Devices |
|------------|-----------|----------------|
| **Default** | 0px | Mobile phones (portrait) |
| **sm** | 640px | Large phones (landscape) |
| **md** | 768px | Tablets |
| **lg** | 1024px | Laptops |
| **xl** | 1280px | Desktops |
| **2xl** | 1536px | Large screens |

### 2. Layout Changes

| Component | Mobile (< 768px) | Tablet (768-1024px) | Desktop (> 1024px) |
|-----------|------------------|---------------------|---------------------|
| **Navigation** | Hamburger menu | Hamburger menu | Horizontal nav |
| **Hero** | Single column, stacked | Two columns | Two columns |
| **Projects Grid** | 1 column | 2 columns | 3-4 columns (Bento) |
| **Cards** | Full width | 2-up | 3-up or Bento |
| **Typography** | Reduced sizes | Standard sizes | Full sizes |
| **Spacing** | `py-8` sections | `py-12` sections | `py-16` sections |

### 3. Touch Targets

- Minimum touch target size: **44x44px**
- Spacing between touch targets: **8px minimum**
- Interactive elements must be easily tappable

### 4. Mobile-First CSS Approach

```css
/* Base styles (mobile) */
.container {
  @apply px-4;
}

.section {
  @apply py-8;
}

.grid-projects {
  @apply grid grid-cols-1 gap-4;
}

/* Tablet and up */
@screen md {
  .container {
    @apply px-6;
  }
  
  .section {
    @apply py-12;
  }
  
  .grid-projects {
    @apply grid-cols-2 gap-6;
  }
}

/* Desktop and up */
@screen lg {
  .container {
    @apply px-8 max-w-7xl mx-auto;
  }
  
  .section {
    @apply py-16;
  }
  
  .grid-projects {
    @apply grid-cols-3 gap-8;
  }
}
```

---

## Accessibility

### 1. WCAG 2.1 AA Compliance

| Criterion | Implementation |
|-----------|----------------|
| **1.1.1 Non-text Content** | All images have meaningful `alt` text or `alt=""` for decorative |
| **1.4.3 Contrast (Minimum)** | All text meets 4.5:1 contrast ratio |
| **1.4.11 Non-text Contrast** | UI components meet 3:1 contrast |
| **2.1.1 Keyboard** | All functionality accessible via keyboard |
| **2.4.1 Bypass Blocks** | Skip to main content link provided |
| **2.4.3 Focus Order** | Logical tab order maintained |
| **2.4.7 Focus Visible** | Clear focus indicators on all interactive elements |

### 2. Keyboard Navigation

| Key | Action |
|-----|--------|
| **Tab** | Move to next focusable element |
| **Shift + Tab** | Move to previous focusable element |
| **Enter/Space** | Activate buttons and links |
| **Escape** | Close modals and menus |
| **Arrow Keys** | Navigate within menus |

### 3. Focus Styles

```css
/* Custom focus ring */
*:focus-visible {
  @apply outline-none ring-2 ring-primary ring-offset-2 ring-offset-bg-primary;
}

/* Skip link */
.skip-link {
  @apply sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4;
  @apply bg-primary text-white px-4 py-2 rounded-lg;
}
```

### 4. Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### 5. Screen Reader Support

- Use semantic HTML (`<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`)
- Proper heading hierarchy (single `<h1>`, logical `<h2>`-`<h6>`)
- ARIA labels where needed (`aria-label`, `aria-labelledby`, `aria-describedby`)
- Live regions for dynamic content (`aria-live="polite"`)

---

## Animation Guidelines

### 1. Animation Principles

- **Purposeful:** Animations serve a UX purpose (feedback, orientation, delight)
- **Subtle:** Never distract from content
- **Performant:** Use `transform` and `opacity` only (GPU-accelerated)
- **Respectful:** Honor `prefers-reduced-motion`

### 2. Timing Functions

| Type | Easing | Duration | Usage |
|------|--------|----------|-------|
| **Micro** | `ease-out` | 100-150ms | Button press, toggles |
| **Short** | `ease-out` | 200ms | Hovers, focus states |
| **Medium** | `ease-in-out` | 300ms | Cards, panels |
| **Long** | `cubic-bezier(0.4, 0, 0.2, 1)` | 500ms | Page transitions |

### 3. Common Animations

```css
/* Hover scale */
.hover-scale {
  @apply transition-transform duration-200 ease-out hover:scale-[1.02];
}

/* Hover lift */
.hover-lift {
  @apply transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg;
}

/* Fade in */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fadeIn 0.5s ease-out forwards;
}

/* Glow pulse */
@keyframes glowPulse {
  0%, 100% { box-shadow: 0 0 20px -5px var(--color-primary-glow); }
  50% { box-shadow: 0 0 30px -5px var(--color-primary-glow); }
}

.animate-glow-pulse {
  animation: glowPulse 2s ease-in-out infinite;
}
```

### 4. Page Transitions (View Transitions API)

```javascript
// Astro View Transitions
---
import { ViewTransitions } from 'astro:transitions';
---
<head>
  <ViewTransitions />
</head>
```

---

## Theme Switching

### 1. Implementation Strategy

1. **Default:** Dark theme
2. **Initial Load:** Check `localStorage` → fallback to `prefers-color-scheme`
3. **Toggle:** Save to `localStorage`, apply immediately
4. **Transition:** 200ms smooth transition for all color properties
5. **FOUC Prevention:** Inline script in `<head>` before render

### 2. Theme Toggle Component

```jsx
// ThemeToggle.tsx (React Island)
import { useState, useEffect } from 'react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  
  useEffect(() => {
    const saved = localStorage.getItem('theme');
    const system = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    setTheme((saved as 'light' | 'dark') || system);
  }, []);
  
  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem('theme', next);
    document.documentElement.setAttribute('data-theme', next);
  };
  
  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
      className="p-2 rounded-lg hover:bg-white/5 transition-colors"
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  );
}
```

### 3. FOUC Prevention Script

```html
<!-- In <head> before any CSS -->
<script>
  (function() {
    const theme = localStorage.getItem('theme') || 
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);
  })();
</script>
```

---

## Voice & Tone

### 1. Brand Personality

| Attribute | Description |
|-----------|-------------|
| **Visionary yet Grounded** | Speak about the future of tech, deliver concrete results today |
| **Sophisticated** | Precise language, no slang, not overly dry |
| **"Cool" Confidence** | Calm, collected, sharp (like "Frost") |

### 2. Copywriting Rules

| Element | Rule | Example |
|---------|------|---------|
| **Headings** | Short, punchy, 2-5 words | "Future-Driven Development" |
| **CTAs** | Action-oriented | "Get Started", "Explore Now" |
| **Descriptions** | Focus on value & transformation | "Craft digital experiences that scale" |

### 3. Terminology

| Avoid | Use |
|-------|-----|
| "Coding services" | "Digital Solutions" |
| "I make websites" | "I craft digital experiences" |
| "Cheap" | "Efficient / Scalable" |
| "Future" (repetitively) | "Next-Gen", "Forward-thinking", "Modern" |

---

## Reconciliation Notes

### PRD Alignment

| PRD Requirement | UI/UX Implementation | Status |
|-----------------|---------------------|--------|
| **US-1.1 Hero Section** | Hero layout with 3D asset, CTA | ✅ Aligned |
| **US-1.2 Featured Projects** | Bento grid with glass cards | ✅ Aligned |
| **US-5.1 Theme Toggle** | Theme system with FOUC prevention | ✅ Aligned |
| **US-5.2 Microanimations** | Animation guidelines, timing | ✅ Aligned |
| **US-5.3 Neon Accents** | Glow effects, glow shadows | ✅ Aligned |
| **NFR-ACC1 WCAG 2.1 AA** | Accessibility section, contrast | ✅ Aligned |
| **NFR-P3 CLS < 0.1** | No layout shift animations | ✅ Aligned |

### TechStack Alignment

| TechStack Choice | Design System Support | Status |
|------------------|----------------------|--------|
| **Tailwind CSS v4** | All tokens mapped to Tailwind | ✅ Compatible |
| **Astro + React** | Islands for interactive components | ✅ Compatible |
| **View Transitions API** | Page transition guidelines | ✅ Compatible |
| **Mobile-first breakpoints** | Responsive rules match Tailwind defaults | ✅ Compatible |

### DatabaseSchema Alignment

| Data Entity | UI Component | Status |
|-------------|--------------|--------|
| `telegram_posts` | Blog Post Card, Blog Post Page | ✅ Mapped |
| `post_tags` | Tag filters, Tag badges | ✅ Mapped |
| `post_media` | Media gallery in posts | ✅ Mapped |

---

## Appendix: Tailwind CSS Configuration

```javascript
// tailwind.config.js (conceptual)
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: 'var(--color-bg-primary)',
          secondary: 'var(--color-bg-secondary)',
          glass: 'var(--color-bg-glass)',
        },
        primary: {
          DEFAULT: 'var(--color-primary)',
          glow: 'var(--color-primary-glow)',
        },
        heading: 'var(--color-text-heading)',
        body: 'var(--color-text-body)',
        muted: 'var(--color-text-muted)',
        border: {
          glass: 'var(--color-border-glass)',
          active: 'var(--color-border-active)',
        },
      },
      fontFamily: {
        display: ['Inter', 'system-ui', 'sans-serif'],
        body: ['Roboto', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      backdropBlur: {
        glass: '12px',
      },
      boxShadow: {
        glow: '0 0 40px -10px var(--color-primary-glow)',
        'glow-sm': '0 0 20px -5px var(--color-primary-glow)',
        'glow-lg': '0 0 60px -10px var(--color-primary-glow)',
      },
    },
  },
};
```

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-01-23 | UI/UX Agent | Initial specification |

---

**Next Steps:**
1. Agent 5 (Implementation Plan) uses this spec to structure component development
2. Agent 6 (Code Generator) implements components following these guidelines
3. Design review after MVP implementation
