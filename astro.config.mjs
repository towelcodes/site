// @ts-check
import {defineConfig, envField} from 'astro/config';

import tailwind from '@astrojs/tailwind';

import svelte from '@astrojs/svelte';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), svelte()],
  image: {
    domains: ["skillicons.dev"],
  },
  env: {
    schema: {
      BASE_GITHUB: envField.string({ context: "client", access: "public", default: "https://github.com/towelcodes/site" }),
      COMMIT_HASH: envField.string({ context: "client", access: "public", default: "unknown" }),
      COMMIT_TIME: envField.number({ context: "client", access: "public", default: 0 }),
      COMMIT_MSG: envField.string({ context: "client", access: "public", default: "no message"}),
      POSTGREST_ENDPOINT: envField.string({ context: "client", access: "public"}),
      POSTGREST_KEY: envField.string({ context: "client", access: "public"}),
    }
  }
});