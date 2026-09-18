import PlacarStepper from './PlacarStepper'

export default function JogoPalpiteCard({ jogo, palpite, onAlterar }) {
  const golsA = palpite?.gols_a ?? 0
  const golsB = palpite?.gols_b ?? 0

  return (
    <div className="flex flex-col gap-2 rounded-lg border border-copa-border bg-copa-card p-3">
      <div className="flex items-center justify-between gap-2">
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <span className="text-xl">{jogo.selecao_a.bandeira_emoji}</span>
          <span className="truncate text-sm">{jogo.selecao_a.nome_pt}</span>
        </div>
        <PlacarStepper valor={golsA} onChange={(v) => onAlterar(v, golsB)} tamanho="pequeno" />
      </div>
      <div className="flex items-center justify-between gap-2">
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <span className="text-xl">{jogo.selecao_b.bandeira_emoji}</span>
          <span className="truncate text-sm">{jogo.selecao_b.nome_pt}</span>
        </div>
        <PlacarStepper valor={golsB} onChange={(v) => onAlterar(golsA, v)} tamanho="pequeno" />
      </div>
      <button
        type="button"
        onClick={() => onAlterar(golsA, golsA)}
        className="self-start text-[11px] text-copa-muted underline hover:text-copa-text"
      >
        Empate rápido
      </button>
    </div>
  )
}
