import 'hono'

type Head = {
  title?: string
  hasScript?: boolean
}

declare module 'hono' {
  interface Env {
    Bindings: {
      DB: D1Database
    }
  }
  interface ContextRenderer {
    (content: string | Promise<string>, head?: Head): Response | Promise<Response>
  }
}
