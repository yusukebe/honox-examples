import Markdoc from '@markdoc/markdoc'

export const parseMarkdown = (markdown: string) => {
  const ast = Markdoc.parse(markdown)
  const content = Markdoc.transform(ast)
  const html = Markdoc.renderers.html(content)
  return html
}
