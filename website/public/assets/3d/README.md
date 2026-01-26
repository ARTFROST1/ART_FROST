# 3D Assets

Эта папка содержит 3D-изображения для визуальных якорей на сайте.

## Требуемые файлы

### MVP (обязательно):

1. **hero-star.webp** — Hero section (главная страница)
   - Размер: 800×800 px — 1200×1200 px
   - Формат: WebP с прозрачным фоном
   - Размер файла: < 200 KB (идеально < 100 KB)
   - Описание: 6-8 конечная 3D-звезда, металлический зеленый цвет

2. **avatar-sphere.webp** — About page (страница обо мне)
   - Размер: 800×800 px — 1200×1200 px
   - Формат: WebP с прозрачным фоном
   - Размер файла: < 200 KB
   - Описание: Абстрактный 3D-аватар, стилизованная сфера с эффектом glassmorphism

### Post-MVP (будущее):

3. **floating-layers.webp** — Value proposition section
4. **code-cube.webp** — Services Dev section
5. **fluid-droplet.webp** — Services Design section
6. **communication-orb.webp** — CTA section

## Стиль и дизайн

- **Цветовая схема:** Зеленый (#10B981) + темные тона
- **Стиль:** Glassmorphism, футуристичный, hi-tech
- **Освещение:** Мягкое неоновое свечение
- **Края:** Мягкие, сглаженные

## Как добавить

1. Создай/найди 3D-изображение согласно требованиям
2. Оптимизируй через `cwebp -q 85 input.png -o output.webp`
3. Положи файл в эту папку (`website/public/assets/3d/`)
4. Изображение автоматически подхватится компонентом `<Asset3D name="hero-star" />`

## Примеры использования

```astro
<!-- В компоненте Hero.astro -->
<Asset3D name="hero-star" alt="" priority />

<!-- В компоненте AboutHero.astro -->
<Asset3D name="avatar-sphere" alt="Avatar" animation="float-slow" />
```

## Источники 3D-ассетов

- **Blender** (бесплатно) — создать свои 3D-модели
- **Spline** (spline.design) — 3D-дизайн в браузере с экспортом
- **Ready Player Me** — генератор 3D-аватаров
- **Poly Haven** (polyhaven.com) — бесплатные 3D-модели
- **Sketchfab** — marketplace 3D-моделей

Подробная инструкция: `ASSETS-INSTRUCTION.md` в корне проекта.
