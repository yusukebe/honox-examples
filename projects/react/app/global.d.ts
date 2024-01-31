import {} from 'hono'

declare module 'hono' {
  interface Env {
    Variables: {}
    Bindings: {}
  }
}

declare module '@hono/react-renderer' {
  interface Props {
    title?: string
  }
}
