import { useState } from 'react'
import { useJogadores } from '../../hooks/useJogadores'
import Loader from '../common/Loader'

const POSICOES = [
  { valor: '', label: 'Todos' },
  { valor: 'GK', label: 'Goleiros' },
  { valor: 'DEF', label: 'Zagueiros/Laterais' },
  { valor: 'MID', label: 'Meias' },
  { valor: 'FWD', label: 'Atacantes' },
]

export default function TabelaElenco({ selecaoId }) {
  const [posicao, setPosicao] = useState('')
  const { jogadores, loading } = useJogadores(selecaoId, posicao)

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-2">
        {POSICOES.map((p) => (
          <button
            key={p.valor}
            type="button"
            onClick={() => setPosicao(p.valor)}
            className={`rounded-full px-3 py-1.5 text-sm transition-colors ${
              posicao === p.valor
                ? 'bg-copa-green text-white'
                : 'border border-copa-border text-copa-muted hover:text-copa-text'
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {loading ? (
        <Loader label="Carregando elenco..." />
      ) : (
        <div className="overflow-x-auto rounded-xl border border-copa-border bg-copa-card">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-copa-border text-left text-xs text-copa-muted">
                <th className="px-3 py-2">#</th>
                <th className="px-3 py-2">Nome</th>
                <th className="px-3 py-2">Posição</th>
                <th className="px-3 py-2">Clube</th>
                <th className="px-3 py-2">Idade</th>
              </tr>
            </thead>
            <tbody>
              {jogadores.map((jogador) => (
                <tr key={jogador.id} className="border-b border-copa-border/50 last:border-0">
                  <td className="px-3 py-2 text-copa-muted">{jogador.numero ?? '—'}</td>
                  <td className="px-3 py-2 font-medium">
                    {jogador.nome}
                    {jogador.eh_capitao && <span className="ml-1 text-copa-gold">(C)</span>}
                  </td>
                  <td className="px-3 py-2 text-copa-muted">{jogador.posicao}</td>
                  <td className="px-3 py-2 text-copa-muted">{jogador.clube ?? '—'}</td>
                  <td className="px-3 py-2 text-copa-muted">{jogador.idade ?? '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
