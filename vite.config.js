import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './',  // ← Das ist der Fix!
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'esbuild'
  }
})