import { createApp } from 'honox/server'
import { showRoutes } from 'hono/dev'
import { serveStatic } from 'hono/cloudflare-pages'

const app = createApp({
  init: (app) => app.get('/static/*', serveStatic())
})

showRoutes(app)

export default app
