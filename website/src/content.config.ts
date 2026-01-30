import { defineCollection, z } from 'astro:content';

/**
 * Project status enum
 */
const projectStatusSchema = z.enum([
  'completed',
  'in-progress',
  'planned',
  'archived',
]);

/**
 * Project type enum
 */
const projectTypeSchema = z.enum([
  'website',        // Веб-сайт
  'mobile-app',     // Мобильное приложение
  'telegram-bot',   // Telegram бот
  'game',           // Игра
  'desktop-app',    // Десктоп приложение
  'library',        // Библиотека
  'tool',           // Инструмент
  'template',       // Шаблон
  'api',            // API/Backend
  'other',          // Другое
]);

/**
 * Projects Collection Schema
 * Comprehensive schema for portfolio projects with Zod validation
 */
const projects = defineCollection({
  type: 'data',
  schema: z.object({
    /** Project title */
    title: z.string().min(1, 'Title is required'),

    /** Full description (supports markdown) */
    description: z.string().min(1, 'Description is required'),

    /** Short description for cards (max 160 chars) */
    shortDescription: z
      .string()
      .max(160, 'Short description should be under 160 characters')
      .optional(),

    /** Main project image/screenshot */
    image: z.string().optional(),

    /** Additional images for gallery */
    images: z.array(z.string()).optional(),

    /** Technology tags */
    tags: z.array(z.string()).default([]),

    /** GitHub repository URL */
    github: z.string().url('Invalid GitHub URL').optional(),

    /** Live demo URL */
    demo: z.string().url('Invalid demo URL').optional(),

    /** Other relevant links */
    links: z
      .array(
        z.object({
          label: z.string(),
          url: z.string().url(),
          icon: z.string().optional(),
        })
      )
      .optional(),

    /** Featured on homepage */
    featured: z.boolean().default(false),

    /** Sort order (lower = first) */
    order: z.number().int().default(0),

    /** Project start date */
    date: z.string().optional(),

    /** Project completion date */
    completedDate: z.string().optional(),

    /** Project status */
    status: projectStatusSchema.default('completed'),

    /** Project type */
    type: projectTypeSchema.default('website'),

    /** Role in the project */
    role: z.string().optional(),

    /** Team size (if applicable) */
    teamSize: z.number().int().positive().optional(),

    /** Project highlights/achievements */
    highlights: z.array(z.string()).optional(),

    /** SEO: Custom meta title */
    seoTitle: z.string().optional(),

    /** SEO: Custom meta description */
    seoDescription: z.string().optional(),

    /** SEO: Custom OG image */
    ogImage: z.string().optional(),

    /** Hide from listings (draft) */
    draft: z.boolean().default(false),
  }),
});

/**
 * Blog Posts Collection Schema (Post-MVP)
 * For Telegram mirror blog
 */
const blog = defineCollection({
  type: 'content',
  schema: z.object({
    /** Post title */
    title: z.string().min(1, 'Title is required'),

    /** Post description/excerpt */
    description: z.string().optional(),

    /** Publication date */
    pubDate: z.coerce.date(),

    /** Last updated date */
    updatedDate: z.coerce.date().optional(),

    /** Hero image */
    heroImage: z.string().optional(),

    /** Tags/categories */
    tags: z.array(z.string()).default([]),

    /** Author name */
    author: z.string().default('Art Frost'),

    /** Reading time in minutes */
    readingTime: z.number().int().positive().optional(),

    /** Telegram post ID (for mirror) */
    telegramId: z.number().int().optional(),

    /** Draft status */
    draft: z.boolean().default(false),

    /** Featured post */
    featured: z.boolean().default(false),
  }),
});

export const collections = {
  projects,
  blog,
};
