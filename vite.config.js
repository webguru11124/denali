import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import dynamicImport from 'vite-plugin-dynamic-import';
import { resolve } from 'path';

export default defineConfig({
  envPrefix: 'REACT_APP_',
  resolve: {
    alias: [
      {
        find: 'app',
        replacement: resolve(__dirname, 'src/app'),
      },
      {
        find: 'assets',
        replacement: resolve(__dirname, 'src/assets'),
      },
      {
        find: 'submodules',
        replacement: resolve(__dirname, 'src/submodules'),
      },
    ],
  },
  build: {
    outDir: './build',
  },

  plugins: [dynamicImport(), svgr(), react()],
});
