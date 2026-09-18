import { useEffect, useState } from 'react'
import { apiGet } from '../utils/api'

export function useJogadores(selecaoId, posicao) {
  const [jogadores, setJogadores] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!selecaoId) return
    let cancelado = false
    setLoading(true)
    setError(null)

    const params = posicao ? `?posicao=${posicao}` : ''
    apiGet(`/selecoes/${selecaoId}/jogadores${params}`)
      .then((data) => {
        if (!cancelado) setJogadores(data)
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
  }, [selecaoId, posicao])

  return { jogadores, loading, error }
}
