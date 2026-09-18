import { useEffect } from 'react'

const SUFIXO = ' | Copa do Mundo 2026'

export function useDocumentTitle(titulo, descricao) {
  useEffect(() => {
    document.title = titulo ? `${titulo}${SUFIXO}` : 'Copa do Mundo 2026'

    if (descricao) {
      let meta = document.querySelector('meta[name="description"]')
      if (!meta) {
        meta = document.createElement('meta')
        meta.setAttribute('name', 'description')
        document.head.appendChild(meta)
      }
      meta.setAttribute('content', descricao)
    }
  }, [titulo, descricao])
}
