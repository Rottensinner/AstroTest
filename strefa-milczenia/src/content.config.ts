import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const rozdzialy = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/rozdzialy' }),
  schema: z.object({
    kolejnosc: z.number().int(),
    czesc: z.string(),
    tytul: z.string(),
    godzina: z.string().optional(),
    data: z.string().optional(),
  }),
});

export const collections = { rozdzialy };
