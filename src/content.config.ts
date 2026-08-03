import { defineCollection } from "astro:content";
import { glob, file } from "astro/loaders";
import { z } from "astro/zod";

const music = defineCollection({
  loader: file("src/components/music/music.json"),
  schema: z.object({
    title: z.string(),
    artist: z.string(),
    year: z.number(),
    localImage: z.string().optional(),
    remoteImage: z.string().optional(),
    link: z.string(),
  }),
});

export const collections = { music };
