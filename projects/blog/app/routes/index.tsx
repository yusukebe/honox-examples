import dayjs from 'dayjs/esm'
import relativeTime from 'dayjs/esm/plugin/relativeTime'
import { css } from 'hono/css'
import type { FC } from 'hono/jsx'
import { createRoute } from '../factory'
import { classButton } from '../components/button'
import Time from '../components/time'
import Title from '../components/title'
import type { Article } from '../db'
import { findAllArticles } from '../db'

dayjs.extend(relativeTime)

const ArticleList: FC<{ article: Article }> = ({ article }) => {
  const listClass = css`
    background-color: #fff;
    padding: 1.5rem;
    margin-bottom: 1rem;
    border-radius: 0.5rem;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  `

  const titleClass = css`
    color: rgb(31 41 55);
    font-weight: 700;
    font-size: 1.5rem;
    line-height: 2rem;
    margin-bottom: 0.5rem;
  `

  return (
    <li class={listClass}>
      <a href={`articles/${article.id}`}>
        <h3 class={titleClass}>{article.title}</h3>
        <Time created_at={article.created_at}>{dayjs(article.created_at).fromNow()}</Time>
      </a>
    </li>
  )
}

export const GET = createRoute(async (c) => {
  const articles = await findAllArticles(c.env.DB)

  return c.render(
    <>
      <title>Hono Blog</title>
      <section
        class={css`
          margin-top: 1rem;
        `}
      >
        <div
          class={css`
            justify-content: space-between;
            align-items: center;
            display: flex;
          `}
        >
          <Title>Posts</Title>
          <a class={classButton} href="/articles/create">
            Create Post
          </a>
        </div>
        <ul>
          {articles.map((article) => (
            <ArticleList article={article} />
          ))}
        </ul>
      </section>
    </>
  )
})
