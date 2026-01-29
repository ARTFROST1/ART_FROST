# ✅ Pre-Deploy Checklist

Перед деплоем на Vercel проверьте все пункты:

## 🔧 Конфигурация

- [x] `package.json` содержит все необходимые scripts
- [x] `astro.config.mjs` настроен корректно
  - [x] `output: 'static'`
  - [x] `adapter: vercel`
  - [x] `site` URL указан
- [x] `vercel.json` содержит правильные настройки
  - [x] `framework: "astro"`
  - [x] `outputDirectory: "dist"`
  - [x] Security headers настроены
- [x] `tsconfig.json` с path aliases
- [x] `.gitignore` корректный (исключает `node_modules`, `dist`, `.env`)

## 🏗️ Build & TypeScript

- [x] `npm run typecheck` — проходит без ошибок
- [x] `npm run build` — успешно собирается
- [x] `npm run preview` — работает локально
- [x] Все страницы генерируются (index, about, links, projects, projects/[slug])

## 📝 Content

- [x] Sample projects созданы в `src/content/projects/`
- [x] Все компоненты имеют корректные imports
- [x] SEO компоненты настроены (SEOHead, JSON-LD)
- [x] Navigation links работают

## 🎨 Assets

- [x] Структура папок `public/assets/` создана
- [x] README файлы в asset папках созданы
- [ ] ⚠️ 3D assets добавлены (опционально для MVP)
- [ ] ⚠️ OG images созданы (опционально, есть fallback)
- [ ] ⚠️ Favicon добавлен (опционально)

## 🔐 Environment Variables

- [x] `.env.example` создан
- [x] `.env` в `.gitignore`
- [ ] Production environment variables настроены в Vercel (если нужны)

## 📦 Git Repository

- [x] Git репозиторий инициализирован
- [x] Remote настроен на GitHub
- [ ] Все изменения закоммичены
- [ ] Изменения запушены в `main` ветку

## 🚀 Vercel Ready

- [ ] GitHub репозиторий подключен к Vercel
- [ ] Root Directory: `website` указан в Vercel
- [ ] Первый деплой успешен
- [ ] Production URL получен

## 🧪 Post-Deploy Tests

После деплоя проверьте:

- [ ] Все страницы открываются без ошибок
- [ ] Navigation работает
- [ ] Theme toggle работает
- [ ] Projects отображаются корректно
- [ ] Links страница работает
- [ ] SEO meta tags присутствуют (View Source)
- [ ] JSON-LD schemas валидны (Google Rich Results Test)
- [ ] Sitemap доступен (`/sitemap-index.xml`)
- [ ] Lighthouse Score > 90 (Performance, SEO, Accessibility)

---

## 📌 Текущий статус

**Build:** ✅ Успешный  
**TypeCheck:** ✅ Без ошибок  
**Git Status:** Готов к push  
**Vercel:** Готов к подключению

**Следующий шаг:** См. `DEPLOY-GUIDE.md` для инструкций по деплою
