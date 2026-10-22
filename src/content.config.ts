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

const essays = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/essays' }),
  schema: postSchema,
});

const notes = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/notes' }),
  schema: postSchema,
});

export const collections = { essays, notes };
