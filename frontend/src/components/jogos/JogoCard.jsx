import { Link } from 'react-router-dom'
import { toHorarioBrasilia } from '../../utils/formatDate'
import { STATUS_LABEL, FASE_LABEL } from '../../utils/jogos'

const STATUS_CLASSES = {
  agendado: 'bg-gray-700 text-gray-300',
  em_andamento: 'bg-green-900 text-green-400 animate-pulse',
  encerrado: 'bg-gray-800 text-gray-400',
}

function Selecao({ selecao, align }) {
  return (
    <div className={`flex flex-1 items-center gap-2 ${align === 'right' ? 'flex-row-reverse text-right' : ''}`}>
      <span className="text-2xl leading-none">{selecao.bandeira_emoji}</span>
      <span className="truncate text-sm font-medium">{selecao.nome_pt}</span>
    </div>
  )
}

export default function JogoCard({ jogo }) {
  const temPlacar = jogo.gols_a !== null && jogo.gols_b !== null

  return (
    <Link
      to={`/jogos/${jogo.id}`}
      className="flex min-w-[260px] flex-col gap-3 rounded-xl border border-copa-border bg-copa-card p-4 transition-colors hover:border-copa-green"
    >
      <div className="flex items-start justify-between gap-2 text-xs text-copa-muted">
        <div className="flex flex-col gap-0.5">
          <span>
            {FASE_LABEL[jogo.fase]}
            {jogo.grupo ? ` · Grupo ${jogo.grupo}` : ''}
          </span>
          <span>{toHorarioBrasilia(jogo.data_hora_utc)}</span>
        </div>
        <span className={`shrink-0 rounded-full px-2 py-0.5 font-medium ${STATUS_CLASSES[jogo.status]}`}>
          {STATUS_LABEL[jogo.status]}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <Selecao selecao={jogo.selecao_a} />
        <span className="font-mono-score text-lg text-copa-text">
          {temPlacar ? `${jogo.gols_a} - ${jogo.gols_b}` : 'x'}
        </span>
        <Selecao selecao={jogo.selecao_b} align="right" />
      </div>

      <p className="truncate text-xs text-copa-muted">
        {jogo.estadio} · {jogo.cidade}
      </p>
    </Link>
  )
}
