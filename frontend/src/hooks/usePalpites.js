import { useCallback, useEffect, useRef, useState } from 'react'
import { apiGet, apiPost } from '../utils/api'
import { useAppStore } from '../store/useAppStore'

const DEBOUNCE_MS = 800

function chavePalpite(palpite) {
  return palpite.jogo_id != null ? `jogo:${palpite.jogo_id}` : `slot:${palpite.chave_slot}`
}

export function usePalpites(bolaoId) {
  const sessionId = useAppStore((s) => s.sessionId)
  const [porChave, setPorChave] = useState({})
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState('idle') // idle | salvando | salvo
  const timers = useRef({})

  useEffect(() => {
    if (!bolaoId) return
    let cancelado = false
    setLoading(true)
    apiGet(`/boloes/${bolaoId}/palpites`, { 'X-Session-Id': sessionId })
      .then((data) => {
        if (cancelado) return
        const indexado = {}
        for (const p of data) indexado[chavePalpite(p)] = p
        setPorChave(indexado)
      })
      .finally(() => {
        if (!cancelado) setLoading(false)
      })
    return () => {
      cancelado = true
      Object.values(timers.current).forEach(clearTimeout)
      timers.current = {}
    }
  }, [bolaoId, sessionId])

  const salvar = useCallback(
    (chaveDebounce, corpo, onSalvo) => {
      const chaveLocal = corpo.jogo_id != null ? `jogo:${corpo.jogo_id}` : `slot:${corpo.chave_slot}`
      setPorChave((atuais) => ({ ...atuais, [chaveLocal]: { ...atuais[chaveLocal], ...corpo } }))
      setStatus('salvando')

      clearTimeout(timers.current[chaveDebounce])
      timers.current[chaveDebounce] = setTimeout(async () => {
        try {
          const salvo = await apiPost(`/boloes/${bolaoId}/palpites`, corpo, { 'X-Session-Id': sessionId })
          setPorChave((atuais) => ({ ...atuais, [chaveLocal]: salvo }))
          setStatus('salvo')
          onSalvo?.(salvo)
        } catch {
          setStatus('idle')
        }
      }, DEBOUNCE_MS)
    },
    [bolaoId, sessionId],
  )

  function palpiteJogo(jogoId) {
    return porChave[`jogo:${jogoId}`]
  }

  function palpiteSlot(chaveSlot) {
    return porChave[`slot:${chaveSlot}`]
  }

  function definirPlacarJogo(jogoId, gols_a, gols_b, onSalvo) {
    salvar(`jogo:${jogoId}`, { jogo_id: jogoId, gols_a, gols_b }, onSalvo)
  }

  function definirPalpiteChave(chaveSlot, dados, onSalvo) {
    const atual = palpiteSlot(chaveSlot) ?? {}
    salvar(`slot:${chaveSlot}`, { chave_slot: chaveSlot, gols_a: 0, gols_b: 0, ...atual, ...dados }, onSalvo)
  }

  return { loading, status, palpiteJogo, palpiteSlot, definirPlacarJogo, definirPalpiteChave }
}
