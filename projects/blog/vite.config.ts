import pagesPlugin from '@hono/vite-dev-server/cloudflare-pages'
import honox from 'honox/vite'
import { defineConfig } from 'vite'
import pagesBuild from '@hono/vite-cloudflare-pages'

export default defineConfig(({ mode }) => {
  if (mode === 'client') {
    return {
      build: {
        rollupOptions: {
          input: ['./app/client.ts', './app/style.css'],
          output: {
            entryFileNames: 'static/client.js',
            chunkFileNames: 'static/assets/[name]-[hash].js',
            assetFileNames: 'static/assets/[name].[ext]'
          }
        },
        emptyOutDir: false,
        copyPublicDir: false
      }
    }
  } else {
    return {
      plugins: [
        honox({
          devServer: {
            plugins: [
              pagesPlugin({
                d1Databases: ['DB'],
                d1Persist: true
              })
            ]
          }
        }),
        pagesBuild()
      ]
    }
  }
})
