import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
 
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  resolve: {
    dedupe: ['react', 'react-dom'],
  },
  build: {
    // Prevent broken runtime init order in split vendor chunks.
    minify: false,
    cssMinify: 'esbuild',
    sourcemap: mode !== 'production',
  },
}))
 