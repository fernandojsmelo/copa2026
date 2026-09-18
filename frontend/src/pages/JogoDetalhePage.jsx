import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { apiGet } from '../utils/api'
import { toDataLongaBrasilia, toHorarioBrasilia } from '../utils/formatDate'
import { FASE_LABEL, STATUS_LABEL } from '../utils/jogos'
import Loader from '../components/common/Loader'

export default function JogoDetalhePage() {
  const { id } = useParams()
  const [jogo, setJogo] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelado = false
    setLoading(true)
    setError(null)
    apiGet(`/jogos/${id}`)
      .then((data) => {
        if (!cancelado) setJogo(data)
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
  }, [id])

  if (loading) return <Loader label="Carregando jogo..." />
  if (error || !jogo) {
    return (
      <div className="py-16 text-center">
        <p className="text-copa-muted">Jogo não encontrado.</p>
        <Link to="/tabela" className="mt-4 inline-block text-copa-green underline">
          Voltar para a tabela
        </Link>
      </div>
    )
  }

  const temPlacar = jogo.gols_a !== null && jogo.gols_b !== null

  return (
    <div className="mx-auto max-w-xl">
      <Link to="/tabela" className="text-sm text-copa-muted hover:text-copa-text">
        ← Voltar para a tabela
      </Link>

      <div className="mt-4 rounded-2xl border border-copa-border bg-copa-card p-6">
        <p className="text-center text-xs text-copa-muted">
          {FASE_LABEL[jogo.fase]}
          {jogo.grupo ? ` · Grupo ${jogo.grupo}` : ''}
        </p>
        <p className="mt-1 text-center text-sm text-copa-gold">
          {toDataLongaBrasilia(jogo.data_hora_utc)} · {toHorarioBrasilia(jogo.data_hora_utc)}
        </p>

        <div className="mt-6 flex items-center justify-center gap-6">
          <div className="flex flex-col items-center gap-2">
            <span className="text-5xl">{jogo.selecao_a.bandeira_emoji}</span>
            <span className="font-medium">{jogo.selecao_a.nome_pt}</span>
          </div>
          <span className="font-mono-score text-3xl text-copa-text">
            {temPlacar ? `${jogo.gols_a} - ${jogo.gols_b}` : 'x'}
          </span>
          <div className="flex flex-col items-center gap-2">
            <span className="text-5xl">{jogo.selecao_b.bandeira_emoji}</span>
            <span className="font-medium">{jogo.selecao_b.nome_pt}</span>
          </div>
        </div>

        {jogo.penaltis_a !== null && jogo.penaltis_b !== null && (
          <p className="mt-2 text-center text-sm text-copa-muted">
            Pênaltis: {jogo.penaltis_a} - {jogo.penaltis_b}
          </p>
        )}

        <p className="mt-6 text-center text-sm text-copa-muted">
          {jogo.estadio} · {jogo.cidade}, {jogo.pais_sede}
        </p>

        <p className="mt-4 text-center">
          <span className="rounded-full bg-copa-border px-3 py-1 text-xs font-medium text-copa-text">
            {STATUS_LABEL[jogo.status]}
          </span>
        </p>
      </div>
    </div>
  )
}
