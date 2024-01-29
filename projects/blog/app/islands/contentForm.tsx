import { css } from 'hono/css'
import { useState } from 'hono/jsx'
import { parseMarkdown } from '../utils'

const grayColor = css`
  color: rgb(107 114 128);
`

const classContentTextarea = css`
  padding: 0.5rem;
  border-color: rgb(209 213 219);
  border-width: 1px;
  border-radius: 0.375rem;
  width: 100%;
  resize: vertical;
`

interface Props {
  initialValue?: string
}

export default function ContentForm({ initialValue = '' }: Props) {
  const [value, setValue] = useState(initialValue)
  const [preview, setPreview] = useState(false)

  const handleChange = (e: Event) => {
    const target = e.target as HTMLTextAreaElement
    setValue(target.value)
  }

  return (
    <div>
      <div
        class={css`
          justify-content: space-between;
          display: flex;
        `}
      >
        <label class={grayColor} htmlFor="content">
          Content
        </label>
        <label class={grayColor}>
          Preview
          <input
            type="checkbox"
            id="preview"
            class={css`
              margin-left: 0.5rem;
            `}
            checked={preview}
            onChange={() => setPreview((prev) => !prev)}
          />
        </label>
      </div>
      {preview ? (
        <>
          <div
            id="contents"
            dangerouslySetInnerHTML={{
              __html: parseMarkdown(value)
            }}
          />
          <input type="hidden" name="content" value={value} />
        </>
      ) : (
        <textarea id="content" rows={10} class={classContentTextarea} name="content" onChange={handleChange}>
          {value}
        </textarea>
      )}
    </div>
  )
}
