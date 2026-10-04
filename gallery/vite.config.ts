import path from "node:path"
import { fileURLToPath } from "node:url"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "vite"

const here = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  // Relative asset paths, so the build works from any GitHub Pages subpath.
  base: "./",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { "@": path.resolve(here, "../packages/snow-ui/src") },
  },
})
