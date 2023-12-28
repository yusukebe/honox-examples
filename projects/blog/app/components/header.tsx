import { css } from 'hono/css'
import type { FC } from 'hono/jsx'

const headerClass = css`
  color: rgb(31 41 55);
  font-weight: 800;
  font-size: 3rem;
  line-height: 1;
`

const Header: FC = () => {
  return (
    <h1 class={headerClass}>
      <a href="/">Hono Blog</a>
    </h1>
  )
}

export default Header
