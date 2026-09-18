import { useCallback, useEffect, useState } from 'react'
import { apiGet } from '../utils/api'
import { useAppStore } from '../store/useAppStore'

export function useChaveamento(bolaoId) {
  const sessionId = useAppStore((s) => s.sessionId)
  const [chaveamento, setChaveamento] = useState(null)
  const [loading, setLoading] = useState(true)

  const recarregar = useCallback(() => {
    if (!bolaoId) return Promise.resolve()
    return apiGet(`/boloes/${bolaoId}/chaveamento`, { 'X-Session-Id': sessionId }).then(setChaveamento)
  }, [bolaoId, sessionId])

  useEffect(() => {
    if (!bolaoId) return
    let cancelado = false
    setLoading(true)
    recarregar().finally(() => {
      if (!cancelado) setLoading(false)
    })
    return () => {
      cancelado = true
    }
  }, [bolaoId, recarregar])

  return { chaveamento, loading, recarregar }
}
