import { build, defineConfig } from 'vite'
import honox from 'honox/vite'
import pages from '@hono/vite-cloudflare-pages'

export default defineConfig(({ mode }) => {
  if (mode === 'client') {
    return {
      build: {
        rollupOptions: {
          input: ['./app/client.ts'],
          output: {
            entryFileNames: 'static/client.js',
            chunkFileNames: 'static/assets/[name]-[hash].js',
            assetFileNames: `static/assets/[name].[ext]`
          }
        },
        emptyOutDir: false,
        copyPublicDir: false
      }
    }
  } else {
    return {
      ssr: {
        external: ['react', 'react-dom']
      },
      plugins: [honox(), pages()]
    }
  }
})
