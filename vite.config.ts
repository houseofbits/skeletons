import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'app'),
      '@src': path.resolve(__dirname, 'app/src'),
      '@assets': path.resolve(__dirname, 'app/assets'),
      '@fonts': path.resolve(__dirname, 'app/fonts'),
      '@styles': path.resolve(__dirname, 'app/styles'),
    }
  },
  plugins: [vue()],
})
