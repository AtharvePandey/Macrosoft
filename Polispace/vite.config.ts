import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],

import { fileURLToPath, URL } from "node:url";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      "@asset": fileURLToPath(new URL("./src/assets", import.meta.url)),
      "@component": fileURLToPath(new URL("./src/components", import.meta.url)),
      "@page": fileURLToPath(new URL("./src/pages", import.meta.url)),
      "@style": fileURLToPath(new URL("./src/styles", import.meta.url)),
    },
  },

});
