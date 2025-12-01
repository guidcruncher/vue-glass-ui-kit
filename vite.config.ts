import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { defineConfig } from 'vite';
import { GlassUiRegistry } from './scripts/vite-plugin-glassuiregistry.ts';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    GlassUiRegistry({
      directory: './src/components', 
      outputFile: './src/components/index.ts',
      virtualModuleId: 'virtual:glassui-registry',
      scssSpa: true
    }),
  ],
  server: {
    // Enable fast refresh
    hmr: false,
    // Use native file watching
    watch: {
      usePolling: false,
    },
    port: 3010,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
