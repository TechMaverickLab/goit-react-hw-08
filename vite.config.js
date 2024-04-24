import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Конфігурація сервера, якщо вам потрібно
  },
  build: {
    // Налаштування збірки, якщо потрібно
  }
});
