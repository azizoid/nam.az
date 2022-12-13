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
      utility: path.resolve('src/utility'),
      components: path.resolve('src/components'),
      assist: path.resolve('src/assist'),
    },
  },
});
