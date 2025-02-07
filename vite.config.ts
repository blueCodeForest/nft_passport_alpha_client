import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  base: '/', // ビルド時のパス設定（Vercelで正しく動作させる）
  plugins: [react()],
  resolve: {
    alias: {
      src: path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
  },
  build: {
    outDir: 'dist', // Vercel で `dist/` を正しく使うための設定
    emptyOutDir: true, // 古いビルドを削除してから新しいビルドを作成
  },
});
