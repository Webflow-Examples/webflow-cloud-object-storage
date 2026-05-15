import { defineConfig } from "astro/config";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  base: "/app",
  build: {
    assetsPrefix: "/app",
  },
  security: {
    checkOrigin: false,
  },
  output: "server",
  adapter: cloudflare({
    platformProxy: {
      enabled: true,
    },
  }),

  integrations: [],
});
