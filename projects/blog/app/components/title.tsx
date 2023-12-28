import { css } from 'hono/css'
import type { FC } from 'hono/jsx'

const titleClass = css`
  color: rgb(31 41 55);
  font-weight: 700;
  font-size: 2.5rem;
  line-height: 2.5rem;
  padding: 1rem 0;
`

const Title: FC = ({ children }) => {
  return <h2 class={titleClass}>{children}</h2>
}

export default Title
