import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Relative base so the built app runs from any sub-path or even
// directly from the file system (offline / PWA friendly).
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
})
