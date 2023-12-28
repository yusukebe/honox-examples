import { css } from 'hono/css'
import type { FC } from 'hono/jsx'

const timeClass = css`
  color: rgb(107 114 128);
  font-size: 0.875rem;
  line-height: 1.25rem;
`

const Time: FC<{ created_at: string }> = ({ children, created_at }) => {
  return (
    <time class={timeClass} dateTime={created_at}>
      {children}
    </time>
  )
}

export default Time
