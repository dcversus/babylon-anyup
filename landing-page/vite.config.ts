import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Use root path for custom domain (anyup.theedgestory.org)
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
})
