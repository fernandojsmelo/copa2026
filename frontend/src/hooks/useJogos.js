import { useEffect, useState } from 'react'
import { apiGet } from '../utils/api'

export function useJogos({ status, limit = 5 } = {}) {
  const [jogos, setJogos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const params = new URLSearchParams({ limit: String(limit) })
    if (status) params.set('status', status)

    let cancelado = false
    setLoading(true)
    setError(null)

    apiGet(`/jogos?${params.toString()}`)
      .then((data) => {
        if (!cancelado) setJogos(data)
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
  }, [status, limit])

  return { jogos, loading, error }
}
