import { defineConfig } from 'astro/config';

import tailwind from "@astrojs/tailwind";

// Import the Vercel adapter
import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  site: "https://vitraga.netlify.app/",
  integrations: [tailwind()],
  output: 'server',
  adapter: netlify(),
});