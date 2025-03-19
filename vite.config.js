import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    open: true,//服务启动时自动在浏览器中打开应用
    proxy: {
      '/api': {
        target: 'http://10.100.230.127:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/arcgis': {
        target: 'http://10.100.230.127:6080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/arcgis/, ''),
      },
    },
  },
})
