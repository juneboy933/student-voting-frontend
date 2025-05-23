import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: parseInt(process.env.PORT) || 5173,
    allowedHosts: 'student-voting-frontend-2.onrender.com',
  },
});
