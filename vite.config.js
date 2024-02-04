import { defineConfig } from 'vite';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    nodeResolve({
      exportConditions: ['development']
    }),
    dts()
  ],
  build: {
    minify: false,
    lib: {
      name: 'ui',
      entry: ['src/index.ts'],
      formats: ['es'],
      fileName: 'index'
    },
    rollupOptions: {
      external: '^lit/',
    }
  }
});
