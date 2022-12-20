import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    manifest: true,
    outDir: './build',
  },
  server: {
    port: 3000,
  },
  plugins: [react()],
  resolve: {
    alias: {
      assist: path.resolve('src/assist'),
      utility: path.resolve('src/components/utility'),
      ui: path.resolve('src/components/ui'),
    },
  },
});
