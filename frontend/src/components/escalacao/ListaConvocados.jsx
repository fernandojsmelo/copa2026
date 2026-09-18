import { useState } from 'react'

const POSICOES = [
  { valor: '', label: 'Todos' },
  { valor: 'GK', label: 'GK' },
  { valor: 'DEF', label: 'DEF' },
  { valor: 'MID', label: 'MEI' },
  { valor: 'FWD', label: 'ATA' },
]

export default function ListaConvocados({ jogadores, titularesIds, jogadorSelecionadoId, onSelecionarJogador }) {
  const [posicao, setPosicao] = useState('')

  const filtrados = posicao ? jogadores.filter((j) => j.posicao === posicao) : jogadores

  return (
    <div className="rounded-xl border border-copa-border bg-copa-card p-4">
      <h3 className="mb-3 text-lg text-copa-text">Convocados</h3>

      <div className="mb-3 flex flex-wrap gap-1.5">
        {POSICOES.map((p) => (
          <button
            key={p.valor}
            type="button"
            onClick={() => setPosicao(p.valor)}
            className={`rounded-full px-2.5 py-1 text-xs transition-colors ${
              posicao === p.valor
                ? 'bg-copa-green text-white'
                : 'border border-copa-border text-copa-muted hover:text-copa-text'
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      <ul className="max-h-[420px] space-y-1 overflow-y-auto pr-1">
        {filtrados.map((jogador) => {
          const titular = titularesIds.has(jogador.id)
          const selecionado = jogadorSelecionadoId === jogador.id
          return (
            <li key={jogador.id}>
              <button
                type="button"
                draggable
                onDragStart={(e) => e.dataTransfer.setData('text/plain', String(jogador.id))}
                onClick={() => onSelecionarJogador(jogador.id)}
                className={`flex w-full cursor-grab items-center gap-2 rounded-lg px-2 py-1.5 text-left text-sm transition-colors active:cursor-grabbing ${
                  selecionado
                    ? 'bg-copa-gold/20 ring-1 ring-copa-gold'
                    : titular
                      ? 'bg-copa-green/10 text-copa-muted'
                      : 'hover:bg-copa-border/40'
                }`}
              >
                <span className="w-6 shrink-0 text-center text-xs text-copa-muted">{jogador.numero ?? '—'}</span>
                <span className="flex-1 truncate">{jogador.nome}</span>
                <span className="shrink-0 text-[10px] text-copa-muted">{jogador.posicao}</span>
                {titular && <span className="shrink-0 text-[10px] text-copa-green">titular</span>}
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
