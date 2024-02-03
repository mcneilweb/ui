import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [dts()],
  build: {
    minify: false,
    lib: {
      name: 'ui',
      entry: 'src/index.ts',
      formats: ['es'],
      fileName: 'index',
    },
    watch: {
      include: 'src/**/*',
    }
  },
});