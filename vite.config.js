import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  base: '/dennyskbellos/',
  build: {
    outDir: 'docs', // ¡IMPORTANTE! Esto le dice a Vite que guarde todo en docs
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})