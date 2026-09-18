import JogoCard from '../jogos/JogoCard'

export default function PerfilSelecao({ selecao, jogos, classificacaoGrupo }) {
  return (
    <div>
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-copa-border bg-copa-card p-8 text-center sm:flex-row sm:text-left">
        <span className="text-7xl leading-none">{selecao.bandeira_emoji}</span>
        <div>
          <h1 className="text-3xl text-copa-text">{selecao.nome_pt}</h1>
          {selecao.eh_cabeca_chave && (
            <span className="mt-1 inline-block rounded bg-copa-gold/20 px-2 py-0.5 text-xs text-copa-gold">
              Cabeça de Chave
            </span>
          )}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <InfoCard label="Treinador" valor={selecao.treinador ?? '—'} />
        <InfoCard label="Confederação" valor={selecao.confederacao} />
        <InfoCard label="Ranking FIFA" valor={selecao.ranking_fifa ?? '—'} />
        <InfoCard label="Grupo / Pote" valor={`Grupo ${selecao.grupo} · Pote ${selecao.pote}`} />
      </div>

      {classificacaoGrupo && (
        <p className="mt-4 text-center text-sm text-copa-muted sm:text-left">
          {classificacaoGrupo.posicao}º colocado no Grupo {selecao.grupo} — {classificacaoGrupo.pontos} pts (
          {classificacaoGrupo.vitorias}V {classificacaoGrupo.empates}E {classificacaoGrupo.derrotas}D)
        </p>
      )}

      <div className="mt-8">
        <h2 className="mb-3 text-xl text-copa-text">Jogos na Copa</h2>
        {jogos.length === 0 ? (
          <p className="text-sm text-copa-muted">Nenhum jogo encontrado.</p>
        ) : (
          <div className="flex flex-wrap gap-4">
            {jogos.map((jogo) => (
              <JogoCard key={jogo.id} jogo={jogo} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function InfoCard({ label, valor }) {
  return (
    <div className="rounded-lg border border-copa-border bg-copa-card px-3 py-2 text-center">
      <p className="text-[11px] uppercase text-copa-muted">{label}</p>
      <p className="mt-0.5 text-sm font-medium text-copa-text">{valor}</p>
    </div>
  )
}
