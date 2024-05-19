import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    server: {
      watch: {
        usePolling: true,
      },
      host: true,
      strictPort: true,
      port: +env.VITE_APP_PORT,
    },
    define: {
      'process.env': env,
    },
    optimizeDeps: {
      exclude: ['js-big-decimal'],
    },
  };
});
