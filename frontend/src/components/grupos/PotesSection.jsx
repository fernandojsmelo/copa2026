import { useEffect, useState } from 'react'
import { apiGet } from '../../utils/api'
import Loader from '../common/Loader'

export default function PotesSection() {
  const [selecoes, setSelecoes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelado = false
    apiGet('/selecoes?incluir_pendentes=true')
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

  if (loading) return <Loader label="Carregando potes..." />

  const potes = [1, 2, 3, 4].map((pote) => ({
    pote,
    selecoes: selecoes.filter((s) => s.pote === pote).sort((a, b) => a.nome_pt.localeCompare(b.nome_pt)),
  }))

  return (
    <section>
      <h2 className="mb-4 text-2xl text-copa-text">Potes do Sorteio</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {potes.map(({ pote, selecoes: selecoesDoPote }) => (
          <div key={pote} className="rounded-xl border border-copa-border bg-copa-card p-4">
            <h3 className="mb-3 font-display text-lg text-copa-gold">Pote {pote}</h3>
            <ul className="space-y-1.5 text-sm">
              {selecoesDoPote.map((selecao) => (
                <li key={selecao.id} className="flex items-center gap-2">
                  <span>{selecao.bandeira_emoji}</span>
                  <span className={selecao.codigo_iso === 'TBD' ? 'text-copa-muted italic' : ''}>
                    {selecao.nome_pt}
                  </span>
                  {selecao.eh_cabeca_chave === 1 && (
                    <span className="rounded bg-copa-gold/20 px-1 text-[10px] text-copa-gold">C</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
