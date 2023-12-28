import { zValidator } from '@hono/zod-validator'
import { createRoute } from 'honox/factory'
import { z } from 'zod'
import { parseMarkdown } from '../../utils'

const schema = z.object({
  content: z.string()
})

export const POST = createRoute(zValidator('form', schema), (c) => {
  const { content } = c.req.valid('form')
  const parsedMarkdown = parseMarkdown(content)
  const html = <div id="contents" dangerouslySetInnerHTML={{ __html: parsedMarkdown }}></div>
  return c.text(html.toString())
})
