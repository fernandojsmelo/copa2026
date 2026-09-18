import { useEffect, useState } from 'react'
import { apiDelete, apiGet, apiPost, apiPut } from '../utils/api'
import { useAppStore } from '../store/useAppStore'

export function useEscalacoes() {
  const sessionId = useAppStore((s) => s.sessionId)
  const [escalacoes, setEscalacoes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelado = false
    setLoading(true)
    apiGet('/escalacoes', { 'X-Session-Id': sessionId })
      .then((data) => {
        if (!cancelado) setEscalacoes(data)
      })
      .finally(() => {
        if (!cancelado) setLoading(false)
      })
    return () => {
      cancelado = true
    }
  }, [sessionId])

  async function salvar(payload) {
    const nova = await apiPost('/escalacoes', payload, { 'X-Session-Id': sessionId })
    setEscalacoes((atuais) => [nova, ...atuais])
    return nova
  }

  async function atualizar(id, payload) {
    const editada = await apiPut(`/escalacoes/${id}`, payload, { 'X-Session-Id': sessionId })
    setEscalacoes((atuais) => atuais.map((e) => (e.id === id ? editada : e)))
    return editada
  }

  async function remover(id) {
    await apiDelete(`/escalacoes/${id}`, { 'X-Session-Id': sessionId })
    setEscalacoes((atuais) => atuais.filter((e) => e.id !== id))
  }

  return { escalacoes, loading, salvar, atualizar, remover }
}
