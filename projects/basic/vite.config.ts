import { defineConfig } from 'vite'
import honox from 'honox/vite'

export default defineConfig({
  build: {
    minify: true,
    rollupOptions: {
      output: {
        entryFileNames: '_worker.js'
      }
    }
  },
  plugins: [honox()]
})
