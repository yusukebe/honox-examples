import { getEnv } from '@hono/vite-dev-server/cloudflare-pages'
import honox from 'honox/vite'
import { defineConfig } from 'vite'

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
      build: {
        minify: true,
        rollupOptions: {
          output: {
            entryFileNames: '_worker.js'
          }
        }
      },
      plugins: [
        honox({
          devServer: {
            env: getEnv({
              d1Databases: ['DB'],
              d1Persist: true
            })
          }
        })
      ]
    }
  }
})
