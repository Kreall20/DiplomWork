import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 7584, // Порт, на котором будет запускаться сервер
    host: 'localhost', // Хост, на котором будет запускаться сервер
    open: true, // Открывать ли браузер по умолчанию при запуске
    proxy: {
      // Настройки прокси, если необходимо
    },
  },
});
