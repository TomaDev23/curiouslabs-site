import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./",   // 🔥 Needed so Vite relative paths resolve in dist
  build: {
    outDir: "dist",
  },
})
