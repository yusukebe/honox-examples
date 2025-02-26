import { css } from 'hono/css'
import type { FC, PropsWithChildren } from 'hono/jsx'

const timeClass = css`
  color: rgb(107 114 128);
  font-size: 0.875rem;
  line-height: 1.25rem;
`

const Time = ({ children, created_at }: PropsWithChildren<{ created_at: string }>) => {
  return (
    <time class={timeClass} dateTime={created_at}>
      {children}
    </time>
  )
}

export default Time
