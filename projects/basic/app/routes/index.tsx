import { createRoute } from 'honox/factory'

export default createRoute((c) => {
  const name = c.req.query('name') ?? 'no name'
  return c.render(
    <div>
      <h1>Hello, {name}!</h1>
    </div>,
    {
      title: name
    }
  )
})
