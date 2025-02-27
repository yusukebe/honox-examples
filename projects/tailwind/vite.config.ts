import build from '@hono/vite-build/cloudflare-workers'
import honox from 'honox/vite'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
    honox({
      client: {
        input: ['./app/style.css']
      }
    }),
    build()
  ]
})
