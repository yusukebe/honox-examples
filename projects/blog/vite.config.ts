import pagesBuild from '@hono/vite-cloudflare-pages'
import pagesPlugin from '@hono/vite-dev-server/cloudflare-pages'
import honox from 'honox/vite'
import clientBuild from 'honox/vite/client'
import { defineConfig } from 'vite'

export default defineConfig(({ mode }) => {
  if (mode === 'client') {
    return {
      plugins: [clientBuild()]
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
