import { defineConfig } from "astro/config";

import cloudflare from "@astrojs/cloudflare";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";

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

export default defineConfig({
  base: "/YOUR_MOUNT_PATH",
  build: {
    assetsPrefix: "/YOUR_MOUNT_PATH",
  },

  // Additional configuration options...
});


