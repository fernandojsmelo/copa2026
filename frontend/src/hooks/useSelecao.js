import { useEffect, useState } from 'react'
import { apiGet } from '../utils/api'

export function useSelecao(selecaoId) {
  const [selecao, setSelecao] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!selecaoId) return
    let cancelado = false
    setLoading(true)
    setError(null)

    apiGet(`/selecoes/${selecaoId}`)
      .then((data) => {
        if (!cancelado) setSelecao(data)
      })
      .catch((err) => {
        if (!cancelado) setError(err)
      })
      .finally(() => {
        if (!cancelado) setLoading(false)
      })

    return () => {
      cancelado = true
    }
  }, [selecaoId])

  return { selecao, loading, error }
}
