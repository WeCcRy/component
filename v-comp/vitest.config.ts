// 引入vitest的类型定义
/// <reference types="vitest" />

import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import VueMacros from 'vue-macros/vite'
import { T } from 'vitest/dist/chunks/reporters.d.79o4mouw.js'

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
  ],
  test:{
    globals:true,
    environment:'jsdom',
  },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      },
    },
})
