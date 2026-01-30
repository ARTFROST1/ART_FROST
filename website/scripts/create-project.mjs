#!/usr/bin/env node
/**
 * CLI скрипт для создания нового проекта
 * Запуск: npm run new:project
 * 
 * @author Art Frost
 * @description Интерактивный помощник для добавления проектов в портфолио
 */

import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath, URL } from 'node:url';
import https from 'node:https';
import http from 'node:http';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECTS_DIR = path.join(__dirname, '..', 'src', 'content', 'projects');
const IMAGES_DIR = path.join(__dirname, '..', 'public', 'assets', 'images', 'projects');

// Цвета для терминала
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  magenta: '\x1b[35m',
  red: '\x1b[31m',
};

const c = (color, text) => `${colors[color]}${text}${colors.reset}`;

// Допустимые значения
const PROJECT_TYPES = [
  'website',        // Веб-сайт
  'mobile-app',     // Мобильное приложение
  'telegram-bot',   // Telegram бот
  'game',           // Игра
  'desktop-app',    // Десктоп приложение
  'library',        // Библиотека
  'tool',           // Инструмент
  'template',       // Шаблон
  'api',            // API/Backend
  'other'           // Другое
];
const PROJECT_STATUSES = ['completed', 'in-progress', 'planned', 'archived'];

// Популярные теги для подсказок
const POPULAR_TAGS = [
  'React', 'TypeScript', 'Astro', 'Next.js', 'Tailwind CSS', 
  'Node.js', 'Python', 'Supabase', 'Vercel', 'PostgreSQL',
  'AI', 'OpenAI', 'Telegram Bot', 'iOS', 'Swift', 'Flutter',
];

async function main() {
  console.log('\n' + c('cyan', '╔════════════════════════════════════════════════════════╗'));
  console.log(c('cyan', '║') + c('bright', '  🚀 Art Frost Portfolio — Создание нового проекта   ') + c('cyan', '║'));
  console.log(c('cyan', '╚════════════════════════════════════════════════════════╝') + '\n');

  const rl = readline.createInterface({ input, output });

  try {
    // === Основная информация ===
    console.log(c('magenta', '📝 Основная информация\n'));

    const title = await ask(rl, 'Название проекта', { required: true });
    const slug = await ask(rl, 'Slug (URL)', { 
      default: slugify(title),
      hint: 'только латиница, цифры и дефисы'
    });

    // Проверка на существование
    const filePath = path.join(PROJECTS_DIR, `${slug}.json`);
    if (fs.existsSync(filePath)) {
      console.log(c('red', `\n❌ Проект с slug "${slug}" уже существует!`));
      process.exit(1);
    }

    const description = await ask(rl, 'Полное описание', { 
      required: true,
      multiline: true,
      hint: 'поддерживает markdown, Enter для переноса строки, пустая строка для завершения'
    });

    const shortDescription = await ask(rl, 'Короткое описание (для карточки)', {
      default: description.slice(0, 155) + (description.length > 155 ? '...' : ''),
      hint: 'макс. 160 символов'
    });

    // === Тип и статус ===
    console.log('\n' + c('magenta', '🏷️ Тип и статус\n'));

    const type = await askChoice(rl, 'Тип проекта', PROJECT_TYPES, 'website');
    const status = await askChoice(rl, 'Статус', PROJECT_STATUSES, 'completed');

    // === Технологии ===
    console.log('\n' + c('magenta', '💻 Технологии\n'));
    console.log(c('dim', `Популярные теги: ${POPULAR_TAGS.join(', ')}`));
    
    const tagsInput = await ask(rl, 'Теги (через запятую)', {
      default: '',
      hint: 'например: React, TypeScript, Tailwind CSS'
    });
    const tags = tagsInput
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    // === Ссылки ===
    console.log('\n' + c('magenta', '🔗 Ссылки\n'));

    const github = await ask(rl, 'GitHub URL', { hint: 'оставь пустым если нет' });
    const demo = await ask(rl, 'Demo URL', { hint: 'оставь пустым если нет' });

    // === Изображения ===
    console.log('\n' + c('magenta', '🖼️ Изображения\n'));
    console.log(c('dim', `Изображения будут в папке: public/assets/images/projects/${slug}/\n`));
    
    // Создаём директорию для изображений проекта заранее
    const projectImagesDir = path.join(IMAGES_DIR, slug);
    if (!fs.existsSync(projectImagesDir)) {
      fs.mkdirSync(projectImagesDir, { recursive: true });
    }
    
    const imageInput = await ask(rl, 'Главное изображение', {
      default: `${slug}.png`,
      hint: 'имя файла (cover.png) или URL (https://...)'
    });
    
    const imageName = await processImage(imageInput, projectImagesDir, slug, 'cover');
    const image = `/assets/images/projects/${slug}/${imageName}`;

    const additionalImagesInput = await ask(rl, 'Дополнительные изображения', {
      hint: 'через запятую: screen1.png, https://..., screen2.png'
    });
    
    const images = [];
    if (additionalImagesInput.trim()) {
      const imageInputs = additionalImagesInput.split(',').map(i => i.trim()).filter(Boolean);
      for (let i = 0; i < imageInputs.length; i++) {
        try {
          const fileName = await processImage(imageInputs[i], projectImagesDir, slug, `screen-${i + 1}`);
          images.push(`/assets/images/projects/${slug}/${fileName}`);
        } catch {
          console.log(c('yellow', `⚠️  Не удалось обработать изображение: ${imageInputs[i]}`));
        }
      }
    }

    // === Дополнительно ===
    console.log('\n' + c('magenta', '⭐ Дополнительно\n'));

    const featured = await askYesNo(rl, 'Показать на главной?', false);
    const role = await ask(rl, 'Твоя роль', { default: 'Full-Stack Developer' });
    const date = await ask(rl, 'Дата старта', { 
      default: new Date().toISOString().slice(0, 7),
      hint: 'формат: YYYY-MM'
    });

    const highlightsInput = await ask(rl, 'Ключевые достижения', {
      hint: 'через запятую, например: 95+ Lighthouse, 10k пользователей'
    });
    const highlights = highlightsInput
      .split(',')
      .map(h => h.trim())
      .filter(Boolean);

    // === Формируем объект проекта ===
    const project = {
      title,
      description,
      shortDescription: shortDescription.slice(0, 160),
      image,
      ...(images.length > 0 && { images }),
      tags,
      ...(github && { github }),
      ...(demo && { demo }),
      featured,
      order: await getNextOrder(),
      date,
      status,
      type,
      role,
      ...(highlights.length > 0 && { highlights }),
      draft: false,
    };

    // === Показываем результат ===
    console.log('\n' + c('cyan', '═══════════════════════════════════════════════════════════'));
    console.log(c('green', '\n📋 Созданный проект:\n'));
    console.log(JSON.stringify(project, null, 2));
    console.log('\n' + c('cyan', '═══════════════════════════════════════════════════════════'));

    // === Подтверждение ===
    const confirm = await askYesNo(rl, 'Сохранить проект?', true);

    if (confirm) {
      // Сохраняем JSON
      fs.writeFileSync(filePath, JSON.stringify(project, null, 2) + '\n');

      console.log('\n' + c('green', '✅ Проект успешно создан!'));
      console.log(c('dim', `   Файл: ${filePath}`));
      console.log(c('dim', `   Изображения: ${projectImagesDir}/`));
      console.log('\n' + c('yellow', '📌 Проверь:'));
      console.log(c('dim', `   1. Запустить dev-сервер: npm run dev`));
      console.log(c('dim', `   2. Открыть проект: /projects/${slug}`));
    } else {
      console.log(c('yellow', '\n⚠️ Создание отменено.'));
    }

    rl.close();
  } catch (err) {
    console.error(c('red', '\n❌ Ошибка: ' + err.message));
    rl.close();
    process.exit(1);
  }
}

// === Вспомогательные функции ===

async function ask(rl, question, options = {}) {
  const { required = false, default: defaultValue, hint, multiline = false } = options;
  
  let prompt = c('cyan', '? ') + c('bright', question);
  if (hint) prompt += c('dim', ` (${hint})`);
  if (defaultValue) prompt += c('dim', ` [${defaultValue}]`);
  prompt += ': ';

  if (multiline) {
    console.log(prompt);
    const lines = [];
    while (true) {
      const line = await rl.question(c('dim', '  > '));
      if (line === '') break;
      lines.push(line);
    }
    const value = lines.join('\n');
    if (required && !value && !defaultValue) {
      console.log(c('red', '  Это поле обязательно!'));
      return ask(rl, question, options);
    }
    return value || defaultValue || '';
  }

  const answer = await rl.question(prompt);
  const value = answer.trim();

  if (required && !value && !defaultValue) {
    console.log(c('red', '  Это поле обязательно!'));
    return ask(rl, question, options);
  }

  return value || defaultValue || '';
}

async function askChoice(rl, question, choices, defaultValue) {
  const choicesStr = choices
    .map((choice) => (choice === defaultValue ? `[${choice}]` : choice))
    .join(' / ');
  
  const prompt = c('cyan', '? ') + c('bright', question) + c('dim', ` (${choicesStr}): `);
  const answer = (await rl.question(prompt)).trim().toLowerCase();

  if (!answer) return defaultValue;
  
  const match = choices.find(c => c.toLowerCase() === answer);
  if (!match) {
    console.log(c('red', `  Выбери один из: ${choices.join(', ')}`));
    return askChoice(rl, question, choices, defaultValue);
  }
  
  return match;
}

async function askYesNo(rl, question, defaultValue) {
  const defaultStr = defaultValue ? 'Y/n' : 'y/N';
  const prompt = c('cyan', '? ') + c('bright', question) + c('dim', ` (${defaultStr}): `);
  const answer = (await rl.question(prompt)).trim().toLowerCase();

  if (!answer) return defaultValue;
  return answer === 'y' || answer === 'yes' || answer === 'да';
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[а-яё]/g, (char) => {
      const map = {
        'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo',
        'ж': 'zh', 'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm',
        'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u',
        'ф': 'f', 'х': 'h', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'sch', 'ъ': '',
        'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu', 'я': 'ya'
      };
      return map[char] || char;
    })
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function getNextOrder() {
  const files = fs.readdirSync(PROJECTS_DIR).filter(f => f.endsWith('.json'));
  let maxOrder = 0;
  
  for (const file of files) {
    try {
      const content = JSON.parse(fs.readFileSync(path.join(PROJECTS_DIR, file), 'utf8'));
      if (content.order && content.order > maxOrder) {
        maxOrder = content.order;
      }
    } catch {
      // ignore
    }
  }
  
  return maxOrder + 1;
}

/**
 * Обрабатывает изображение: скачивает по URL или использует локальный файл
 * @param {string} input - URL или имя файла
 * @param {string} targetDir - директория для сохранения
 * @param {string} slug - slug проекта
 * @param {string} defaultName - имя по умолчанию без расширения
 * @returns {Promise<string>} - итоговое имя файла
 */
async function processImage(input, targetDir, slug, defaultName) {
  const isUrl = input.startsWith('http://') || input.startsWith('https://');
  
  if (isUrl) {
    // Скачиваем изображение
    console.log(c('dim', `   📥 Скачиваю изображение...`));
    const ext = getExtensionFromUrl(input) || 'png';
    const fileName = `${defaultName}.${ext}`;
    const targetPath = path.join(targetDir, fileName);
    
    await downloadImage(input, targetPath);
    console.log(c('green', `   ✓ Сохранено как ${fileName}`));
    return fileName;
  } else {
    // Используем локальное имя файла
    const fileName = input;
    const sourcePath = path.join(targetDir, fileName);
    
    // Проверяем существование файла
    if (!fs.existsSync(sourcePath)) {
      console.log(c('yellow', `   ⚠️  Файл ${fileName} не найден в ${targetDir}/`));
      console.log(c('dim', `   💡 Не забудь добавить его перед деплоем!`));
    } else {
      console.log(c('green', `   ✓ Файл ${fileName} найден`));
    }
    
    return fileName;
  }
}

/**
 * Скачивает изображение по URL
 */
function downloadImage(url, targetPath) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    
    client.get(url, (response) => {
      // Следуем редиректам
      if (response.statusCode === 301 || response.statusCode === 302) {
        return downloadImage(response.headers.location, targetPath)
          .then(resolve)
          .catch(reject);
      }
      
      if (response.statusCode !== 200) {
        reject(new Error(`Не удалось скачать: ${response.statusCode}`));
        return;
      }
      
      const fileStream = fs.createWriteStream(targetPath);
      response.pipe(fileStream);
      
      fileStream.on('finish', () => {
        fileStream.close();
        resolve();
      });
      
      fileStream.on('error', (err) => {
        fs.unlink(targetPath, () => {});
        reject(err);
      });
    }).on('error', reject);
  });
}

/**
 * Определяет расширение файла из URL
 */
function getExtensionFromUrl(url) {
  try {
    const urlObj = new URL(url);
    const pathname = urlObj.pathname;
    const match = pathname.match(/\.([a-z0-9]+)$/i);
    if (match) {
      const ext = match[1].toLowerCase();
      // Поддерживаемые форматы
      if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(ext)) {
        return ext;
      }
    }
  } catch {
    // ignore
  }
  return null;
}

// Запуск
main();
