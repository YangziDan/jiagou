import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 5175, // 启动端口
    open: false, // 启动后是否打开浏览器。建议关闭，首次打开的页面会热更新，否则每次都会打开新的tab页。
    cors: true, // 允许跨域
    // 本地代理接口
    }
})
