// app/routes/_renderer.tsx
import { reactRenderer } from '@hono/react-renderer'

export default reactRenderer(({ children }) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {import.meta.env.PROD ? (
          <>
            <script type="module" src="/static/client.js"></script>
            <link href="/static/assets/style.css" rel="stylesheet" />
          </>
        ) : (
          <>
            <script type="module" src="/app/client.ts"></script>
            <link href="/app/style.css" rel="stylesheet" />
          </>
        )}
      </head>
      <body>{children}</body>
    </html>
  )
})
