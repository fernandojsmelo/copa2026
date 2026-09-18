import { useEffect, useState } from 'react'
import { apiGet } from '../utils/api'

export function useSelecoes() {
  const [selecoes, setSelecoes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelado = false
    apiGet('/selecoes')
      .then((data) => {
        if (!cancelado) setSelecoes(data)
      })
      .finally(() => {
        if (!cancelado) setLoading(false)
      })
    return () => {
      cancelado = true
    }
  }, [])

  return { selecoes, loading }
}
