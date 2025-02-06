import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  base: '/',
  plugins: [react()],
  resolve: {
    alias: {
      src: path.resolve(__dirname, 'src'),
    },
  },
  server: {
    host: '0.0.0.0', // ローカルネットワーク上のデバイスからアクセス可能
    port: 5173,
  },
  build: {
    outDir: 'dist', // Vercel で `dist/` を正しく使うための設定
  },
});
