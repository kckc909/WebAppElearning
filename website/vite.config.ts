import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    server: {
      port: 3000,
      host: '0.0.0.0',
      // CRITICAL: Enable historyApiFallback for BrowserRouter
      // This ensures all routes are handled by React app (no 404 on refresh)
      historyApiFallback: true,
    },
    plugins: [react()],
    define: {
      'process.env.BACK_END_API_PATH': JSON.stringify(env.BACK_END_API_PATH),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      }
    }
  };
});
