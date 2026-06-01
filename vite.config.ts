import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // 显式指定根路径。因为你要部署到 cysuan.github.io 的根目录下，所以用 '/'
  base: '/', 
  plugins: [react(), tailwindcss()],
  server: {
    /**
     * Some sandboxed environments fail to resolve `localhost`; bind explicitly.
     * @see https://github.com/vitejs/vite/issues/ (networkInterfaces / DNS quirks)
     */
    host: '127.0.0.1',
  },
})

