// @ts-check
import { defineConfig, envField } from "astro/config";
import svelte from "@astrojs/svelte";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  integrations: [svelte()],

  image: {
    domains: ["skillicons.dev"],
  },

  env: {
    schema: {
      BASE_GITHUB: envField.string({
        context: "client",
        access: "public",
        default: "https://github.com/towelcodes/site",
      }),
      COMMIT_HASH: envField.string({
        context: "client",
        access: "public",
        default: "unknown",
      }),
      COMMIT_TIME: envField.number({
        context: "client",
        access: "public",
        default: 0,
      }),
      COMMIT_MSG: envField.string({
        context: "client",
        access: "public",
        default: "no message",
      }),
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
