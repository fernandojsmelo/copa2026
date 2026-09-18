import { useEffect, useState } from 'react'
import { apiDelete, apiGet, apiPost } from '../utils/api'
import { useAppStore } from '../store/useAppStore'

export function useBoloes() {
  const sessionId = useAppStore((s) => s.sessionId)
  const [boloes, setBoloes] = useState([])
  const [loading, setLoading] = useState(true)
  const [bolaoAtivoId, setBolaoAtivoId] = useState(null)

  useEffect(() => {
    let cancelado = false
    apiGet('/boloes', { 'X-Session-Id': sessionId })
      .then((data) => {
        if (cancelado) return
        setBoloes(data)
        if (data.length > 0) setBolaoAtivoId(data[0].id)
      })
      .finally(() => {
        if (!cancelado) setLoading(false)
      })
    return () => {
      cancelado = true
    }
  }, [sessionId])

  async function criar(nome) {
    const novo = await apiPost('/boloes', { nome }, { 'X-Session-Id': sessionId })
    setBoloes((atuais) => [novo, ...atuais])
    setBolaoAtivoId(novo.id)
    return novo
  }

  async function duplicar(id) {
    const copia = await apiPost(`/boloes/${id}/duplicar`, undefined, { 'X-Session-Id': sessionId })
    setBoloes((atuais) => [copia, ...atuais])
    setBolaoAtivoId(copia.id)
    return copia
  }

  async function remover(id) {
    await apiDelete(`/boloes/${id}`, { 'X-Session-Id': sessionId })
    setBoloes((atuais) => {
      const restantes = atuais.filter((b) => b.id !== id)
      if (bolaoAtivoId === id) setBolaoAtivoId(restantes[0]?.id ?? null)
      return restantes
    })
  }

  return { boloes, loading, bolaoAtivoId, setBolaoAtivoId, criar, duplicar, remover }
}
