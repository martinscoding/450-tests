import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    strictPort: true,
    port: 5173,
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: path.resolve(__dirname, 'tests/setup.js'),
    exclude: [
      'tests/app.spec.js',
      'tests/selenium/**',
      'node_modules/**',
      'dist/**',
    ],
  },
});
