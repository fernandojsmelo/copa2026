import { useEffect, useState } from 'react'
import { apiGet } from '../utils/api'

export function useGrupos() {
  const [grupos, setGrupos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelado = false
    apiGet('/grupos')
      .then((data) => {
        if (!cancelado) setGrupos(data)
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
  }, [])

  return { grupos, loading, error }
}
