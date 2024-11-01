import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import vercel from 'vite-plugin-vercel'

// https://vite.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      external: ['config'],
    },
  },
  plugins: [vue(), vueJsx(), vueDevTools(), vercel()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
