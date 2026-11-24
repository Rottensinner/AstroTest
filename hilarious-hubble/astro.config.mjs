import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    server: {
      fs: {
        strict: true,
        allow: [root],
      },
    },
  },
});
