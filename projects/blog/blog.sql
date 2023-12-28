CREATE TABLE articles (
  id TEXT PRIMARY KEY,
  created_at TEXT DEFAULT (datetime('now')),
  title TEXT,
  content TEXT
);