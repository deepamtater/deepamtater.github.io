import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { TOPICS } from './site.config';

const postSchema = z.object({
  title: z.string(),
  date: z.coerce.date(),
  summary: z.string(),
  tags: z.array(z.enum(TOPICS)).default([]),
  draft: z.boolean().default(false),
});

const thoughtSchema = z.object({
  date: z.coerce.date(),
  time: z.string().default('02:00 AM'),
  draft: z.boolean().default(false),
});

const essays = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/essays' }),
  schema: postSchema,
});

const notes = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/notes' }),
  schema: postSchema,
});

const thoughts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/thoughts' }),
  schema: thoughtSchema,
});

export const collections = { essays, notes, thoughts };
