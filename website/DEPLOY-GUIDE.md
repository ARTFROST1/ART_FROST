# 🚀 Инструкция по деплою на Vercel через GitHub

## ✅ Статус готовности

Проект полностью готов к деплою:
- ✅ TypeScript проверка пройдена (0 ошибок)
- ✅ Build успешный (10 страниц сгенерировано)
- ✅ Все конфигурационные файлы настроены
- ✅ Git репозиторий подключен

---

## 📋 Шаги для деплоя

### 1. Закоммитьте все изменения

```bash
cd "/Users/artfrost/Projects/ART FROST/website"
git add .
git commit -m "feat: готов к production деплою на Vercel"
git push origin main
```

### 2. Подключите репозиторий к Vercel

1. Откройте [vercel.com](https://vercel.com)
2. Нажмите **"Add New Project"** или **"Import Project"**
3. Выберите **GitHub** в качестве Git Provider
4. Найдите репозиторий `ARTFROST1/ART_FROST`
5. Нажмите **"Import"**

### 3. Настройте проект в Vercel

Vercel автоматически определит настройки из `vercel.json`, но проверьте:

#### Framework Preset
- **Framework:** Astro (автоматически определяется)

#### Root Directory
- **Root Directory:** `website` ⚠️ **ВАЖНО!** Укажите подпапку `website`

#### Build Settings (должны заполниться автоматически из vercel.json)
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

#### Environment Variables (опционально на этом этапе)
Сейчас не требуются, но в будущем для Stage 3 нужно будет добавить:
- `PUBLIC_SITE_URL` (после получения production URL)
- `SUPABASE_URL` (когда подключите Supabase)
- `SUPABASE_ANON_KEY`
- `TELEGRAM_BOT_TOKEN`

### 4. Deploy!

1. Нажмите **"Deploy"**
2. Дождитесь завершения деплоя (~1-2 минуты)
3. Vercel выдаст вам URL вида: `https://art-frost-xxx.vercel.app`

### 5. Настройте Production Domain (опционально)

1. В Vercel Dashboard → Settings → Domains
2. Добавьте свой кастомный домен (например, `artfrost.dev`)
3. Следуйте инструкциям для настройки DNS

---

## 🔧 Важные конфигурационные файлы

### `vercel.json`
```json
{
  "framework": "astro",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "installCommand": "npm install",
  "regions": ["fra1"]
}
```

### `astro.config.mjs`
- **Output:** `static` (SSG)
- **Adapter:** `@astrojs/vercel`
- **Analytics:** Включена Vercel Web Analytics
- **Site URL:** Обновите на production URL после деплоя

---

## 📝 После первого деплоя

### 1. Обновите Site URL

После получения production URL обновите `astro.config.mjs`:

```javascript
export default defineConfig({
  site: 'https://your-production-url.vercel.app', // или ваш домен
  // ...
});
```

Закоммитьте и запушьте изменения — Vercel автоматически задеплоит.

### 2. Обновите документацию

Отметьте задачу **1.11 Vercel Deployment** в `Implementation.md` как выполненную:

```markdown
### 1.11 Vercel Deployment
- [x] Подключить GitHub репозиторий к Vercel
- [x] Настроить Preview deployments для PR
- [x] Проверить первый деплой пустого проекта
- [x] Настроить Environment Variables (если нужны)
```

---

## 🌿 Automatic Deployments

После подключения Vercel будет автоматически:

✅ **Production deployments** — при пуше в `main` ветку  
✅ **Preview deployments** — при создании Pull Request  
✅ **Instant rollbacks** — откат к предыдущей версии в один клик

---

## 🔍 Проверка после деплоя

1. **Lighthouse Audit:**
   - Откройте DevTools → Lighthouse
   - Запустите аудит для Production URL
   - Проверьте Performance, SEO, Accessibility > 90

2. **SEO проверки:**
   - [Google Rich Results Test](https://search.google.com/test/rich-results) — проверьте JSON-LD
   - [OpenGraph Preview](https://opengraph.xyz) — проверьте OG images
   - Проверьте `https://your-url/sitemap-index.xml`

3. **Analytics:**
   - В Vercel Dashboard → Analytics увидите метрики Web Vitals
   - Core Web Vitals должны быть в зелёной зоне

---

## 🐛 Troubleshooting

### Build Failed

1. Проверьте логи в Vercel Dashboard
2. Локально запустите: `npm run build`
3. Проверьте версию Node.js (должна быть 20+)

### 404 на страницах

1. Убедитесь, что Root Directory = `website`
2. Проверьте, что Output Directory = `dist`

### Environment Variables не работают

1. В Vercel Dashboard → Settings → Environment Variables
2. Добавьте переменные для всех окружений (Production, Preview, Development)
3. Redeploy проекта

---

## 📚 Дополнительные ресурсы

- [Vercel Documentation](https://vercel.com/docs)
- [Astro Deploy to Vercel](https://docs.astro.build/en/guides/deploy/vercel/)
- [Vercel Git Integration](https://vercel.com/docs/deployments/git)

---

## 🎉 Готово!

После успешного деплоя ваш сайт будет доступен по адресу, выданному Vercel.

**Текущий статус:** MVP Stage 2 в разработке  
**Следующий этап:** Stage 3 — Blog & Telegram Integration
