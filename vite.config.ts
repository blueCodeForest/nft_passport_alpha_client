import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import { Plugin } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// プロテクションバイパスプラグインの作成
const protectionBypassPlugin = (): Plugin => {
  return {
    name: 'protection-bypass-plugin',
    configureServer(server) {
      // オリジナルのミドルウェアを置き換える
      server.middlewares.use((req, res, next) => {
        const url = new URL(req.url || '', `http://${req.headers.host}`);

        // バイパスパラメータが既に設定されていない場合のみ追加
        if (!url.searchParams.has('x-vercel-protection-bypass')) {
          url.searchParams.set(
            'x-vercel-protection-bypass',
            process.env.VITE_VERCEL_AUTOMATION_BYPASS_SECRET || ''
          );
          req.url = url.pathname + url.search;
        }

        next();
      });
    },
  };
};

export default defineConfig({
  base: '/',
  plugins: [react(), protectionBypassPlugin()],
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
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      external: [/src\/authBackup\/.*/],
    },
  },
  define: {
    'process.env.VITE_LIFF_ID': JSON.stringify(process.env.VITE_LIFF_ID),
    'process.env.VITE_VERCEL_AUTOMATION_BYPASS_SECRET': JSON.stringify(
      process.env.VITE_VERCEL_AUTOMATION_BYPASS_SECRET
    ),
  },
});
