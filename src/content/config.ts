import { defineCollection, z } from 'astro:content';

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
  posts:   defineCollection({ schema: postSchema }),
  hobbies: defineCollection({ schema: hobbySchema }),
};
