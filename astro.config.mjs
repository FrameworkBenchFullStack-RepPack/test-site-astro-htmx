// @ts-check
import { defineConfig, envField } from "astro/config";

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: node({
    mode: "middleware",
    staticHeaders: true,
  }),
  security: {
    csp: {
      directives: [
        "default-src 'self' data:",
        "base-uri 'none'",
        "frame-ancestors 'none'",
        "object-src 'none'",
        "form-action 'self'",
      ],
    },
  },
  env: {
    schema: {
      DATABASE_URL: envField.string({ context: "server", access: "secret" }),
    },
  },
});
