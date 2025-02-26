import { createFactory } from 'hono/factory'

interface Env {
  Bindings: {
    DB: D1Database
  }
}

const factory = createFactory<Env>()
export const createRoute = factory.createHandlers
