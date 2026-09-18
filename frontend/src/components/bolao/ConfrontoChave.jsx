import PlacarStepper from './PlacarStepper'

function LinhaSelecao({ selecao, gols, onGols, vencedor }) {
  return (
    <div className={`flex items-center justify-between gap-2 rounded px-1.5 py-1 ${vencedor ? 'bg-copa-green/10' : ''}`}>
      <div className="flex min-w-0 flex-1 items-center gap-1.5">
        <span className="text-lg">{selecao?.bandeira_emoji ?? '❓'}</span>
        <span className={`truncate text-xs ${vencedor ? 'font-semibold text-copa-green' : ''}`}>
          {selecao?.nome_pt ?? 'A definir'}
        </span>
      </div>
      <PlacarStepper valor={gols} onChange={onGols} tamanho="pequeno" />
    </div>
  )
}

export default function ConfrontoChave({ slot, confronto, onAlterar }) {
  const { selecao_a: selecaoA, selecao_b: selecaoB, vencedor_id: vencedorId, palpite } = confronto
  const pendente = !selecaoA || !selecaoB

  const golsA = palpite?.gols_a ?? 0
  const golsB = palpite?.gols_b ?? 0
  const empatado = palpite != null && golsA === golsB
  const penaltisA = palpite?.penaltis_a ?? 0
  const penaltisB = palpite?.penaltis_b ?? 0
  const prorrogacao = palpite?.prorrogacao ?? false

  if (pendente) {
    return (
      <div className="rounded-lg border border-dashed border-copa-border p-3 text-center text-xs text-copa-muted">
        Aguardando classificados
      </div>
    )
  }

  return (
    <div className="rounded-lg border border-copa-border bg-copa-card p-3">
      <LinhaSelecao
        selecao={selecaoA}
        gols={golsA}
        onGols={(v) => onAlterar(slot, { gols_a: v, gols_b: golsB })}
        vencedor={vencedorId === selecaoA.id}
      />
      <LinhaSelecao
        selecao={selecaoB}
        gols={golsB}
        onGols={(v) => onAlterar(slot, { gols_a: golsA, gols_b: v })}
        vencedor={vencedorId === selecaoB.id}
      />

      {empatado && (
        <div className="mt-2 space-y-2 border-t border-copa-border pt-2">
          <label className="flex items-center gap-1.5 text-[11px] text-copa-muted">
            <input
              type="checkbox"
              checked={prorrogacao}
              onChange={(e) => onAlterar(slot, { prorrogacao: e.target.checked })}
            />
            Foi para a prorrogação
          </label>
          <p className="text-[11px] text-copa-muted">Empate — defina os pênaltis:</p>
          <div className="flex items-center justify-between gap-2 px-1.5">
            <span className="text-xs">{selecaoA.bandeira_emoji}</span>
            <PlacarStepper
              valor={penaltisA}
              onChange={(v) => onAlterar(slot, { penaltis_a: v, penaltis_b: penaltisB })}
              tamanho="pequeno"
            />
          </div>
          <div className="flex items-center justify-between gap-2 px-1.5">
            <span className="text-xs">{selecaoB.bandeira_emoji}</span>
            <PlacarStepper
              valor={penaltisB}
              onChange={(v) => onAlterar(slot, { penaltis_a: penaltisA, penaltis_b: v })}
              tamanho="pequeno"
            />
          </div>
          {penaltisA === penaltisB && (
            <p className="text-[11px] text-copa-gold">Pênaltis também empatados — ajuste para definir o vencedor.</p>
          )}
        </div>
      )}
    </div>
  )
}
