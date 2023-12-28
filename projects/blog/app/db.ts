export type Article = {
  id: string
  title: string
  content: string
  created_at: string
}

export const findAllArticles = async (db: D1Database) => {
  const { results } = await db.prepare('SELECT * FROM articles ORDER BY created_at DESC').all<Article>()
  const articles = results
  return articles
}

export const findArticleById = async (db: D1Database, id: string) => {
  const article = await db.prepare('SELECT * FROM articles WHERE id = ?').bind(id).first<Article>()
  return article
}

export const createArticle = async (db: D1Database, article: Pick<Article, 'title' | 'content'>) => {
  const id = crypto.randomUUID()
  const { results } = await db
    .prepare('INSERT INTO articles(id, title, content) VALUES(?, ?, ?)')
    .bind(id, article.title, article.content)
    .run()
  const articles = results
  return articles
}
