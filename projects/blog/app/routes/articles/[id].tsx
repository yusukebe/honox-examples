import dayjs from 'dayjs/esm'
import relativeTime from 'dayjs/esm/plugin/relativeTime'
import { css } from 'hono/css'
import { createRoute } from 'honox/factory'
import Time from '../../components/time'
import { findArticleById } from '../../db'
import { parseMarkdown } from '../../utils'

dayjs.extend(relativeTime)

const articleClass = css`
  background-color: #fff;
  padding: 1.5rem;
  margin-bottom: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`

const titleClass = css`
  color: rgb(31 41 55);
  font-weight: 800;
  font-size: 2rem;
`

export default createRoute(async (c) => {
  const { id } = c.req.param()
  const article = await findArticleById(c.env.DB, id)

  if (!article) {
    return c.notFound()
  }

  const parsedContent = parseMarkdown(article.content)

  return c.render(
    <div
      class={css`
        margin-top: 2rem;
      `}
    >
      <article class={articleClass}>
        <header>
          <h2 class={titleClass}>{article.title}</h2>
          <Time created_at={article.created_at}>{dayjs(article.created_at).format('YYYY-MM-DD HH:mm:ss')}</Time>
        </header>
        <section
          class={css`
            margin-top: 1.5rem;
          `}
        >
          <div id="contents" dangerouslySetInnerHTML={{ __html: parsedContent }} />
        </section>
      </article>
    </div>
  )
})
