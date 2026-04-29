import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  server: {
    port: 5173,
    proxy: {
      // Bất cứ request nào bắt đầu bằng /api sẽ được đẩy sang Backend
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      }
    }
  },
})