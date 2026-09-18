import { Link } from 'react-router-dom'
import { toHorarioBrasilia } from '../../utils/formatDate'

const STATUS_ROW_CLASSES = {
  classificado: 'bg-copa-green/10 border-l-2 border-copa-green',
  em_disputa: 'bg-yellow-500/10 border-l-2 border-yellow-500',
  eliminado: 'bg-red-500/10 border-l-2 border-red-500',
  indefinido: 'border-l-2 border-transparent',
}

function agruparPorRodada(jogos) {
  const rodadas = {}
  for (const jogo of jogos) {
    ;(rodadas[jogo.rodada] ??= []).push(jogo)
  }
  return Object.entries(rodadas).sort(([a], [b]) => Number(a) - Number(b))
}

export default function TabelaGrupo({ grupo, selecoes, jogos }) {
  const cabecaChave = selecoes.find((linha) => linha.selecao.eh_cabeca_chave)

  return (
    <div className="rounded-xl border border-copa-border bg-copa-card p-4">
      <div className="mb-3 flex items-center gap-2">
        <span className="text-xl">{cabecaChave?.selecao.bandeira_emoji}</span>
        <h3 className="font-display text-xl text-copa-text">Grupo {grupo}</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-copa-muted">
              <th className="py-1 pr-2">#</th>
              <th className="py-1 pr-2">Seleção</th>
              <th className="px-1 text-center">J</th>
              <th className="px-1 text-center">V</th>
              <th className="px-1 text-center">E</th>
              <th className="px-1 text-center">D</th>
              <th className="px-1 text-center">GP</th>
              <th className="px-1 text-center">GC</th>
              <th className="px-1 text-center">SG</th>
              <th className="py-1 pl-1 text-center">Pts</th>
            </tr>
          </thead>
          <tbody>
            {selecoes.map((linha) => (
              <tr key={linha.selecao.id} className={STATUS_ROW_CLASSES[linha.status]}>
                <td className="py-1.5 pr-2 text-copa-muted">{linha.posicao}</td>
                <td className="py-1.5 pr-2">
                  <span className="mr-1">{linha.selecao.bandeira_emoji}</span>
                  <span>{linha.selecao.nome_pt}</span>
                  {linha.selecao.eh_cabeca_chave && (
                    <span className="ml-1 rounded bg-copa-gold/20 px-1 text-[10px] text-copa-gold">C</span>
                  )}
                </td>
                <td className="px-1 text-center">{linha.jogos}</td>
                <td className="px-1 text-center">{linha.vitorias}</td>
                <td className="px-1 text-center">{linha.empates}</td>
                <td className="px-1 text-center">{linha.derrotas}</td>
                <td className="px-1 text-center">{linha.gols_pro}</td>
                <td className="px-1 text-center">{linha.gols_contra}</td>
                <td className="px-1 text-center">{linha.saldo_gols}</td>
                <td className="py-1.5 pl-1 text-center font-semibold">{linha.pontos}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {jogos.length > 0 && (
        <div className="mt-4 space-y-2 border-t border-copa-border pt-3">
          {agruparPorRodada(jogos).map(([rodada, jogosRodada]) => (
            <div key={rodada}>
              <p className="mb-1 text-[11px] uppercase text-copa-muted">Rodada {rodada}</p>
              {jogosRodada.map((jogo) => (
                <Link
                  key={jogo.id}
                  to={`/jogos/${jogo.id}`}
                  className="flex items-center justify-between rounded px-1 py-1 text-xs text-copa-muted hover:bg-copa-border/40 hover:text-copa-text"
                >
                  <span>
                    {jogo.selecao_a.bandeira_emoji} {jogo.selecao_a.nome_pt} x {jogo.selecao_b.nome_pt}{' '}
                    {jogo.selecao_b.bandeira_emoji}
                  </span>
                  <span>
                    {jogo.gols_a !== null ? `${jogo.gols_a}-${jogo.gols_b}` : toHorarioBrasilia(jogo.data_hora_utc)}
                  </span>
                </Link>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
