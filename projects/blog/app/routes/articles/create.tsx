import { zValidator } from '@hono/zod-validator'
import { css } from 'hono/css'
import type { FC } from 'hono/jsx'
import { createRoute } from '../../factory'
import { z } from 'zod'
import { classButton } from '../../components/button'
import Title from '../../components/title'
import { createArticle } from '../../db'
import ContentForm from '../../islands/contentForm'

type Data = {
  error?: Record<string, string[] | undefined>
  title?: string
  content?: string
}

const classForm = css`
  background-color: #fff;
  padding: 1.5rem;
  border-width: 1px;
  border-radius: 0.75rem;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 1rem;
`

const classDivInputs = css`
  row-gap: 0.5rem;
  flex-direction: column;
  display: flex;
`

const classDivButton = css`
  justify-content: flex-end;
  display: flex;
  margin-top: 1rem;
`

const classInputTitle = css`
  padding: 0.5rem;
  border-color: rgb(209 213 219);
  border-width: 1px;
  border-radius: 0.375rem;
  width: 100%;
`

const grayColor = css`
  color: rgb(107 114 128);
`

const classTextRed = css`
  color: rgb(239 68 68);
  font-size: 0.875rem;
  line-height: 1.25rem;
`

const Page: FC<{ data?: Data }> = ({ data }) => {
  return (
    <div
      class={css`
        margin-top: 1rem;
      `}
    >
      <Title>Create Post</Title>
      <div x-data>
        <form class={classForm} method="post">
          <div class={classDivInputs}>
            <div>
              <label class={grayColor} htmlFor="title">
                Title
              </label>
              <input id="title" class={classInputTitle} type="text" name="title" value={data?.title} />
              {data?.error?.title && <p class={classTextRed}>{data.error.title}</p>}
            </div>
            <div>
              <ContentForm initialValue={data?.content} />
              {data?.error?.content && <p class="text-red-500 text-sm">{data.error.content}</p>}
            </div>
          </div>
          <div class={classDivButton}>
            <button class={classButton} type="submit">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default createRoute((c) => {
  return c.render(<Page />)
})

const schema = z.object({
  title: z.string().min(1),
  content: z.string().min(1)
})

export const POST = createRoute(
  zValidator('form', schema, (result, c) => {
    if (!result.success) {
      const { title, content } = result.data
      return c.render(<Page data={{ title, content, error: result.error.flatten().fieldErrors }} />)
    }
  }),
  async (c) => {
    const { title, content } = c.req.valid('form')
    await createArticle(c.env.DB, {
      title,
      content
    })
    return c.redirect('/', 303)
  }
)
