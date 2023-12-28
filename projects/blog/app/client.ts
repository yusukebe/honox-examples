// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import 'htmx.org'
import Alpine from 'alpinejs'

window.Alpine = Alpine

Alpine.store('preview', false)
Alpine.store('loading', false)
Alpine.store('showPreview', false)

Alpine.start()

document.body.addEventListener('htmx:afterSwap', function () {
  Alpine.store('showPreview', Alpine.store('preview'))
  Alpine.store('loading', false)
})

document.getElementById('preview').addEventListener('change', function () {
  Alpine.store('loading', this.checked)
  if (!this.checked) {
    Alpine.store('showPreview', false)
  }
})
