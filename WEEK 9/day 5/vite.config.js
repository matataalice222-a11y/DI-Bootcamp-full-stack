import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        books: resolve(import.meta.dirname, "index.html"),
        productivity: resolve(import.meta.dirname, "productivity.html"),
      },
    },
  },
});
