import { css, Style } from 'hono/css'
import { jsxRenderer } from 'hono/jsx-renderer'
import { Link, Script } from 'honox/server'
import Header from '../components/header'

const bodyClass = css`
  background-color: rgb(229 231 235);
`

const containerClass = css`
  max-width: 760px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding-top: 3rem;
  padding-bottom: 5rem;

  padding-left: 1rem;
  padding-right: 1rem;

  @media (min-width: 640px) {
    padding-left: 2rem;
    padding-right: 2rem;
  }
`

export default jsxRenderer(({ children }) => {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <Link href="/app/style.css" rel="stylesheet" />
        <Style />
        <Script src="/app/client.ts" />
      </head>
      <body class={bodyClass}>
        <div class={containerClass}>
          <Header />
          {children}
        </div>
      </body>
    </html>
  )
})
