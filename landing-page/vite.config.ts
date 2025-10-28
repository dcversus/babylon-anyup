import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Use environment variable or default to subdirectory path
  base: process.env.VITE_BASE_PATH || '/babylon-anyup/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
})
