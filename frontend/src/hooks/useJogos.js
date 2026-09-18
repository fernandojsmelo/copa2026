import { useEffect, useState } from 'react'
import { apiGet } from '../utils/api'

export function useJogos({
  status,
  fase,
  grupo,
  selecaoId,
  data,
  order = 'asc',
  page = 1,
  perPage = 20,
} = {}) {
  const [jogos, setJogos] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const params = new URLSearchParams({ order, page: String(page), per_page: String(perPage) })
    if (status) params.set('status', status)
    if (fase) params.set('fase', fase)
    if (grupo) params.set('grupo', grupo)
    if (selecaoId) params.set('selecao_id', String(selecaoId))
    if (data) params.set('data', data)

    let cancelado = false
    setLoading(true)
    setError(null)

    apiGet(`/jogos?${params.toString()}`)
      .then((resposta) => {
        if (cancelado) return
        setJogos(resposta.jogos)
        setTotal(resposta.total)
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
  }, [status, fase, grupo, selecaoId, data, order, page, perPage])

  return { jogos, total, loading, error }
}
