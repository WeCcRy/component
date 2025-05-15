import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import VueMacros from 'vue-macros/vite'
import { resolve } from 'node:path'
import dts from 'vite-plugin-dts'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    VueMacros({
      plugins: {
        vue: vue(),
        vueJsx: vueJsx(),
        
      },
    }),
    vueDevTools(),
    dts(
    {
      tsconfigPath:'./tsconfig.build.json',
      outDir: 'dist/types',
    }
    ),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  build: {
    outDir: 'dist/es',
    lib: {
      entry:resolve(__dirname, 'src/index.ts'),
      name: 'wy-comp',
      fileName:'wy-components',
      formats: ['es'],
    },
    rollupOptions: {
      external: ['vue','@fortawesome/fontawesome-svg-core','@fortawesome/free-solid-svg-icons','@fortawesome/vue-fontawesome','@fortawesome/free-brands-svg-icons','@fortawesome/free-regular-svg-icons','@popperjs/core','async-validator','axios'],
    },
  },
})
