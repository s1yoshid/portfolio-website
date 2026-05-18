import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const postSchema = z.object({
  title:   z.string(),
  date:    z.string(),
  summary: z.string(),
  tags:    z.array(z.string()).default([]),
  draft:   z.boolean().default(false),
});

const hobbySchema = z.object({
  title:   z.string(),
  date:    z.string(),
  summary: z.string(),
  tags:    z.array(z.string()).default([]),
});

export const collections = {
  posts: defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
    schema: postSchema,
  }),
  hobbies: defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/hobbies' }),
    schema: hobbySchema,
  }),
};