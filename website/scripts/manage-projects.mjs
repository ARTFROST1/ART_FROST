#!/usr/bin/env node
/**
 * CRUD система для управления проектами портфолио
 * Запуск: npm run projects
 * 
 * @author Art Frost
 * @description Полное управление проектами: Create, Read, Update, Delete
 */

import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

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
  blue: '\x1b[34m',
};

const c = (color, text) => `${colors[color]}${text}${colors.reset}`;

const PROJECT_TYPES = ['website', 'app', 'library', 'tool', 'template', 'other'];
const PROJECT_STATUSES = ['completed', 'in-progress', 'planned', 'archived'];
const POPULAR_TAGS = [
  'React', 'TypeScript', 'Astro', 'Next.js', 'Tailwind CSS', 
  'Node.js', 'Python', 'Supabase', 'Vercel', 'PostgreSQL',
  'AI', 'OpenAI', 'Telegram Bot', 'iOS', 'Swift', 'Flutter',
];

// ============= MAIN MENU =============

async function main() {
  console.clear();
  console.log('\n' + c('cyan', '╔════════════════════════════════════════════════════════╗'));
  console.log(c('cyan', '║') + c('bright', '    🚀 Art Frost Portfolio — Управление проектами    ') + c('cyan', '║'));
  console.log(c('cyan', '╚════════════════════════════════════════════════════════╝') + '\n');

  const rl = readline.createInterface({ input, output });

  try {
    while (true) {
      console.log(c('magenta', '📋 Меню:\n'));
      console.log(c('cyan', '  1)') + ' Создать новый проект (Create)');
      console.log(c('cyan', '  2)') + ' Просмотреть все проекты (Read)');
      console.log(c('cyan', '  3)') + ' Редактировать проект (Update)');
      console.log(c('cyan', '  4)') + ' Удалить проект (Delete)');
      console.log(c('cyan', '  5)') + ' Выйти\n');

      const choice = await rl.question(c('bright', 'Выбери действие (1-5): '));

      switch (choice.trim()) {
        case '1':
          await createProject(rl);
          break;
        case '2':
          await listProjects(rl);
          break;
        case '3':
          await updateProject(rl);
          break;
        case '4':
          await deleteProject(rl);
          break;
        case '5':
          console.log(c('green', '\n👋 До скорой встречи!\n'));
          rl.close();
          return;
        default:
          console.log(c('red', '\n⚠️ Неверный выбор. Попробуй снова.\n'));
      }

      await rl.question(c('dim', '\nНажми Enter для продолжения...'));
      console.clear();
    }
  } catch (err) {
    console.error(c('red', '\n❌ Ошибка: ' + err.message));
    rl.close();
    process.exit(1);
  }
}

// ============= CREATE =============

async function createProject(rl) {
  console.log('\n' + c('cyan', '═══════════════════════════════════════════════════════════'));
  console.log(c('green', '✨ Создание нового проекта\n'));

  // Основная информация
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
    return;
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

  // Тип и статус
  console.log('\n' + c('magenta', '🏷️ Тип и статус\n'));
  const type = await askChoice(rl, 'Тип проекта', PROJECT_TYPES, 'website');
  const status = await askChoice(rl, 'Статус', PROJECT_STATUSES, 'completed');

  // Технологии
  console.log('\n' + c('magenta', '💻 Технологии\n'));
  console.log(c('dim', `Популярные теги: ${POPULAR_TAGS.join(', ')}`));
  
  const tagsInput = await ask(rl, 'Теги (через запятую)', {
    default: '',
    hint: 'например: React, TypeScript, Tailwind CSS'
  });
  const tags = tagsInput.split(',').map(t => t.trim()).filter(Boolean);

  // Ссылки
  console.log('\n' + c('magenta', '🔗 Ссылки\n'));
  const github = await ask(rl, 'GitHub URL', { hint: 'оставь пустым если нет' });
  const demo = await ask(rl, 'Demo URL', { hint: 'оставь пустым если нет' });

  // Изображения
  console.log('\n' + c('magenta', '🖼️ Изображения\n'));
  console.log(c('dim', `Изображения будут в папке: public/assets/images/projects/${slug}/\n`));
  
  const imageName = await ask(rl, 'Имя файла главного изображения', {
    default: `${slug}.png`,
    hint: 'только имя файла, например: project.png'
  });
  const image = `/assets/images/projects/${slug}/${imageName}`;

  const additionalImages = await ask(rl, 'Дополнительные изображения', {
    hint: 'через запятую, например: screen1.png, screen2.png'
  });
  const images = additionalImages
    .split(',')
    .map(i => `/assets/images/projects/${slug}/${i.trim()}`)
    .filter(i => i !== `/assets/images/projects/${slug}/`);

  // Дополнительно
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
  const highlights = highlightsInput.split(',').map(h => h.trim()).filter(Boolean);

  // Формируем объект проекта
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

  // Показываем результат
  console.log('\n' + c('cyan', '═══════════════════════════════════════════════════════════'));
  console.log(c('green', '\n📋 Созданный проект:\n'));
  console.log(JSON.stringify(project, null, 2));
  console.log('\n' + c('cyan', '═══════════════════════════════════════════════════════════'));

  // Подтверждение
  const confirm = await askYesNo(rl, 'Сохранить проект?', true);

  if (confirm) {
    // Создаём директорию для изображений проекта
    const projectImagesDir = path.join(IMAGES_DIR, slug);
    if (!fs.existsSync(projectImagesDir)) {
      fs.mkdirSync(projectImagesDir, { recursive: true });
    }

    // Сохраняем JSON
    fs.writeFileSync(filePath, JSON.stringify(project, null, 2) + '\n');

    console.log('\n' + c('green', '✅ Проект успешно создан!'));
    console.log(c('dim', `   Файл: ${filePath}`));
    console.log(c('dim', `   Папка изображений: ${projectImagesDir}/`));
    console.log('\n' + c('yellow', '📌 Не забудь:'));
    console.log(c('dim', `   1. Добавить главное изображение: ${projectImagesDir}/${imageName}`));
    if (images.length > 0) {
      console.log(c('dim', `   2. Добавить дополнительные изображения в папку проекта`));
    }
    console.log(c('dim', `   3. Запустить dev-сервер: npm run dev`));
    console.log(c('dim', `   4. Проверить на /projects`));
  } else {
    console.log(c('yellow', '\n⚠️ Создание отменено.'));
  }
}

// ============= READ =============

async function listProjects(rl) {
  console.log('\n' + c('cyan', '═══════════════════════════════════════════════════════════'));
  console.log(c('green', '📚 Все проекты\n'));

  const projects = getAllProjects();

  if (projects.length === 0) {
    console.log(c('yellow', '⚠️ Проектов пока нет. Создай первый!'));
    return;
  }

  // Сортируем по order
  projects.sort((a, b) => (a.data.order || 999) - (b.data.order || 999));

  console.log(c('dim', `Всего проектов: ${projects.length}\n`));

  projects.forEach((project, index) => {
    const data = project.data;
    const statusColor = {
      'completed': 'green',
      'in-progress': 'yellow',
      'planned': 'blue',
      'archived': 'dim'
    }[data.status] || 'dim';

    console.log(c('bright', `${index + 1}. ${data.title}`));
    console.log(c('dim', `   Slug: ${project.slug}`));
    console.log(c('dim', `   Тип: ${data.type} | Статус: `) + c(statusColor, data.status));
    console.log(c('dim', `   Теги: ${data.tags.join(', ')}`));
    console.log(c('dim', `   Featured: ${data.featured ? '⭐ Да' : 'Нет'} | Order: ${data.order || 'N/A'}`));
    if (data.github) console.log(c('dim', `   GitHub: ${data.github}`));
    if (data.demo) console.log(c('dim', `   Demo: ${data.demo}`));
    console.log('');
  });

  console.log(c('cyan', '═══════════════════════════════════════════════════════════'));
}

// ============= UPDATE =============

async function updateProject(rl) {
  console.log('\n' + c('cyan', '═══════════════════════════════════════════════════════════'));
  console.log(c('green', '✏️ Редактирование проекта\n'));

  const projects = getAllProjects();

  if (projects.length === 0) {
    console.log(c('yellow', '⚠️ Проектов пока нет.'));
    return;
  }

  // Показываем список
  console.log(c('magenta', 'Выбери проект для редактирования:\n'));
  projects.forEach((project, index) => {
    console.log(c('cyan', `  ${index + 1})`) + ` ${project.data.title} ${c('dim', `(${project.slug})`)}`);
  });

  const choiceStr = await rl.question(c('bright', `\nВыбери номер (1-${projects.length}): `));
  const choice = parseInt(choiceStr.trim()) - 1;

  if (isNaN(choice) || choice < 0 || choice >= projects.length) {
    console.log(c('red', '\n⚠️ Неверный выбор.'));
    return;
  }

  const project = projects[choice];
  const filePath = path.join(PROJECTS_DIR, `${project.slug}.json`);

  console.log('\n' + c('green', `📝 Редактирование: ${project.data.title}\n`));
  console.log(c('dim', 'Оставь поле пустым, чтобы не изменять.\n'));

  // Редактируемые поля
  const updatedData = { ...project.data };

  updatedData.title = await ask(rl, 'Название', { default: updatedData.title }) || updatedData.title;
  
  const editDesc = await askYesNo(rl, 'Изменить описание?', false);
  if (editDesc) {
    updatedData.description = await ask(rl, 'Полное описание', { 
      multiline: true,
      hint: 'markdown, Enter для переноса, пустая строка для завершения'
    });
  }

  updatedData.shortDescription = await ask(rl, 'Короткое описание', { 
    default: updatedData.shortDescription 
  }) || updatedData.shortDescription;

  updatedData.type = await askChoice(rl, 'Тип проекта', PROJECT_TYPES, updatedData.type);
  updatedData.status = await askChoice(rl, 'Статус', PROJECT_STATUSES, updatedData.status);

  const tagsInput = await ask(rl, 'Теги (через запятую)', {
    default: updatedData.tags.join(', ')
  });
  updatedData.tags = tagsInput.split(',').map(t => t.trim()).filter(Boolean);

  updatedData.github = await ask(rl, 'GitHub URL', { default: updatedData.github || '' }) || undefined;
  updatedData.demo = await ask(rl, 'Demo URL', { default: updatedData.demo || '' }) || undefined;

  // Изображения
  console.log('\n' + c('magenta', '🖼️ Изображения\n'));
  console.log(c('dim', `Текущее главное изображение: ${updatedData.image || 'не указано'}`));
  
  const changeMainImage = await askYesNo(rl, 'Изменить главное изображение?', false);
  if (changeMainImage) {
    const imageInput = await ask(rl, 'Путь к главному изображению', {
      hint: 'например: /assets/images/projects/my-project.png'
    });
    if (imageInput) {
      updatedData.image = imageInput;
    }
  }

  if (updatedData.images && updatedData.images.length > 0) {
    console.log(c('dim', `Текущие доп. изображения: ${updatedData.images.join(', ')}`));
  }
  
  const changeImages = await askYesNo(rl, 'Изменить дополнительные изображения?', false);
  if (changeImages) {
    const imagesInput = await ask(rl, 'Дополнительные изображения (через запятую)', {
      hint: 'например: screen1.png, screen2.png (автоматически добавится путь к проекту)'
    });
    if (imagesInput) {
      updatedData.images = imagesInput
        .split(',')
        .map(i => {
          const trimmed = i.trim();
          // Если путь начинается с /, используем как есть
          if (trimmed.startsWith('/')) return trimmed;
          // Иначе добавляем путь к папке проекта
          return `/assets/images/projects/${project.slug}/${trimmed}`;
        })
        .filter(i => i !== `/assets/images/projects/${project.slug}/`);
    } else {
      // Если ввод пустой, удаляем массив изображений
      delete updatedData.images;
    }
  }

  updatedData.featured = await askYesNo(rl, 'Показать на главной?', updatedData.featured);
  
  const orderInput = await ask(rl, 'Order (порядок)', { default: String(updatedData.order || '') });
  updatedData.order = orderInput ? parseInt(orderInput) : updatedData.order;

  updatedData.date = await ask(rl, 'Дата старта (YYYY-MM)', { default: updatedData.date }) || updatedData.date;

  const roleInput = await ask(rl, 'Роль', { default: updatedData.role || '' });
  updatedData.role = roleInput || updatedData.role;

  const highlightsInput = await ask(rl, 'Достижения (через запятую)', {
    default: (updatedData.highlights || []).join(', ')
  });
  updatedData.highlights = highlightsInput.split(',').map(h => h.trim()).filter(Boolean);

  // Показываем результат
  console.log('\n' + c('cyan', '═══════════════════════════════════════════════════════════'));
  console.log(c('green', '\n📋 Обновлённый проект:\n'));
  console.log(JSON.stringify(updatedData, null, 2));
  console.log('\n' + c('cyan', '═══════════════════════════════════════════════════════════'));

  const confirm = await askYesNo(rl, 'Сохранить изменения?', true);

  if (confirm) {
    fs.writeFileSync(filePath, JSON.stringify(updatedData, null, 2) + '\n');
    console.log('\n' + c('green', '✅ Проект успешно обновлён!'));
    console.log(c('dim', `   Файл: ${filePath}`));
  } else {
    console.log(c('yellow', '\n⚠️ Изменения отменены.'));
  }
}

// ============= DELETE =============

async function deleteProject(rl) {
  console.log('\n' + c('cyan', '═══════════════════════════════════════════════════════════'));
  console.log(c('red', '🗑️ Удаление проекта\n'));

  const projects = getAllProjects();

  if (projects.length === 0) {
    console.log(c('yellow', '⚠️ Проектов пока нет.'));
    return;
  }

  // Показываем список
  console.log(c('magenta', 'Выбери проект для удаления:\n'));
  projects.forEach((project, index) => {
    console.log(c('cyan', `  ${index + 1})`) + ` ${project.data.title} ${c('dim', `(${project.slug})`)}`);
  });

  const choiceStr = await rl.question(c('bright', `\nВыбери номер (1-${projects.length}): `));
  const choice = parseInt(choiceStr.trim()) - 1;

  if (isNaN(choice) || choice < 0 || choice >= projects.length) {
    console.log(c('red', '\n⚠️ Неверный выбор.'));
    return;
  }

  const project = projects[choice];
  const filePath = path.join(PROJECTS_DIR, `${project.slug}.json`);
  const imagesDir = path.join(IMAGES_DIR, project.slug);

  console.log('\n' + c('yellow', `⚠️ Удаление: ${project.data.title}`));
  console.log(c('dim', `   Файл: ${filePath}`));
  if (fs.existsSync(imagesDir)) {
    console.log(c('dim', `   Папка с изображениями: ${imagesDir}`));
  }

  const confirm = await askYesNo(rl, '\n❗ Точно удалить? (это нельзя отменить)', false);

  if (confirm) {
    // Удаляем JSON
    fs.unlinkSync(filePath);

    // Удаляем папку с изображениями (если существует)
    if (fs.existsSync(imagesDir)) {
      fs.rmSync(imagesDir, { recursive: true, force: true });
    }

    console.log('\n' + c('green', '✅ Проект успешно удалён!'));
  } else {
    console.log(c('yellow', '\n⚠️ Удаление отменено.'));
  }
}

// ============= HELPERS =============

function getAllProjects() {
  const files = fs.readdirSync(PROJECTS_DIR)
    .filter(f => f.endsWith('.json') && !f.startsWith('_'));

  return files.map(file => {
    const slug = file.replace('.json', '');
    const content = JSON.parse(fs.readFileSync(path.join(PROJECTS_DIR, file), 'utf8'));
    return { slug, data: content };
  });
}

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
    .map((c, i) => (c === defaultValue ? `[${c}]` : c))
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
  const projects = getAllProjects();
  let maxOrder = 0;
  
  for (const project of projects) {
    if (project.data.order && project.data.order > maxOrder) {
      maxOrder = project.data.order;
    }
  }
  
  return maxOrder + 1;
}

// Запуск
main();
